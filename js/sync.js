/* =====================================================
   LUNA SYNC — hibrid localStorage ↔ Supabase mühərriki
   - Konfiq boşdursa: heç nə etmir (lokal rejim)
   - Yazma hook-u: luna_* açarları avtomatik Supabase-ə itələnir
   - Pull: hər 30 saniyədə uzaqdan yeni dəyişiklikləri çəkir
   - Sifarişlər: formalar birbaşa luna_orders cədvəlinə yazır
   Qayda: last-write-wins (updated_at müqayisəsi)
===================================================== */
(function () {
    "use strict";

    var cfg = window.LUNA_SUPABASE || {};
    var ENABLED = !!(cfg.url && cfg.anonKey);
    var DEBOUNCE_MS = 1500;
    var PULL_INTERVAL_MS = 30000;

    var state = "off"; /* off | connecting | locked | online | error */
    var client = null;
    var user = null;
    var onChangeCb = null;
    var dirty = {};          /* key -> true */
    var localStamp = {};     /* key -> ms of last local write */
    var flushTimer = null;
    var pullTimer = null;
    var syncing = false;
    var firstPullDone = false;
    var rawSetItem = null;
    var rawRemoveItem = null;

    var ADMIN_KEYS = {
        "luna_designs": 1,
        "luna_custom_templates": 1,
        "luna_template_overrides": 1,
        "luna_client_invitations": 1,
        "luna_form_config": 1,
        "luna_invitation_theme": 1,
        "luna_video_invitations": 1,
        "luna_last_invitation": 1,
        "luna_seeded_v1": 1
    };

    function meta() {
        try { return JSON.parse(localStorage.getItem("luna_sync_meta") || "{}"); }
        catch (e) { return {}; }
    }
    function saveMeta(m) {
        try { rawSetItem("luna_sync_meta", JSON.stringify(m)); } catch (e) {}
    }

    function setState(s) {
        if (state === s) return;
        console.log('[SYNC-STATE] ' + state + ' -> ' + s);
        state = s;
        if (onChangeCb) { try { onChangeCb(state, user); } catch (e) {} }
    }

    /* key routing: kv (admin data) | invitations (public) | null */
    function route(key) {
        if (ADMIN_KEYS[key]) return { table: "luna_kv", key: key };
        if (/^luna_rsvp_/.test(key)) return { table: "luna_kv", key: key };
        var m = /^luna_([a-z0-9][a-z0-9-]{1,60})$/.exec(key);
        if (m) return { table: "luna_invitations", key: m[1] };
        return null;
    }

    var hooksInstalled = false;
    function installHooks() {
        if (hooksInstalled) return;
        hooksInstalled = true;
        /* closure-lokal saxla — təkrar init-də öz-özünə recurse etməsin */
        var prevSet = localStorage.setItem.bind(localStorage);
        var prevDel = localStorage.removeItem.bind(localStorage);
        rawSetItem = prevSet;
        rawRemoveItem = prevDel;
        localStorage.setItem = function (k, v) {
            prevSet(k, v);
            onLocalWrite(k);
        };
        localStorage.removeItem = function (k) {
            prevDel(k);
            if (route(k)) { localStamp[k] = Date.now(); queueDelete(k); }
        };
    }

    function queueDelete(k) {
        if (!ENABLED || !user) return;
        dirty[k] = "__del__";
        clearTimeout(flushTimer);
        flushTimer = setTimeout(flush, DEBOUNCE_MS);
    }

    function onLocalWrite(k) {
        if (!ENABLED || !user || !route(k)) return;
        if (k === "luna_sync_meta") return;
        localStamp[k] = Date.now();
        markDirty(k);
    }

    function markDirty(k) {
        dirty[k] = true;
        clearTimeout(flushTimer);
        flushTimer = setTimeout(flush, DEBOUNCE_MS);
    }

    function flush() {
        if (!client || !user) return;
        var keys = Object.keys(dirty);
        if (!keys.length) return;
        keys.forEach(function (k) {
            var r = route(k);
            if (!r) { delete dirty[k]; return; }
            var nowIso = new Date().toISOString();
            if (dirty[k] === "__del__") {
                client.from(r.table).delete().eq(r.table === "luna_kv" ? "key" : "id", r.key)
                    .then(function () { delete dirty[k]; })
                    .catch(function () { scheduleRetry(); });
                return;
            }
            var raw = rawGet(k);
            if (raw === null) {
                client.from(r.table).delete().eq(r.table === "luna_kv" ? "key" : "id", r.key)
                    .then(function () { delete dirty[k]; })
                    .catch(function () { scheduleRetry(); });
                return;
            }
            var val;
            try { val = JSON.parse(raw); } catch (e) { delete dirty[k]; return; }
            var row = r.table === "luna_kv"
                ? { key: r.key, value: val, updated_at: nowIso }
                : { id: r.key, value: val, updated_at: nowIso };
            client.from(r.table).upsert(row)
                .then(function () { delete dirty[k]; })
                .catch(function () { scheduleRetry(); });
        });
    }

    function rawGet(k) {
        try { return localStorage.getItem(k); } catch (e) { return null; }
    }

    function scheduleRetry() {
        clearTimeout(flushTimer);
        flushTimer = setTimeout(flush, 10000);
        setState("error");
    }

    function applyRemote(table, keyCol, rows) {
        rows.forEach(function (row) {
            var lk = table === "luna_kv" ? row.key : "luna_" + row.id;
            var ra = new Date(row.updated_at).getTime();
            var ls = localStamp[lk] || 0;
            if (ra + 2000 < ls) return; /* lokal daha yeni — üstələmə */
            try {
                rawSetItem(lk, JSON.stringify(row.value));
                localStamp[lk] = ra;
            } catch (e) {}
        });
    }

    function pull() {
        if (!client || !user || syncing) return;
        syncing = true;
        var m = meta();
        var wm = m.wm || null;

        var q1 = client.from("luna_kv").select("*");
        if (wm) q1 = q1.gt("updated_at", wm);
        var q2 = client.from("luna_invitations").select("*");
        if (m.invWm) q2 = q2.gt("updated_at", m.invWm);
        var q3 = wm ? Promise.resolve({ data: [], error: null })
                    : client.from("luna_orders").select("*").eq("status", "new");

        Promise.all([q1.then(toData), q2.then(toData), q3.then(toData)])
            .then(function (res) {
                applyRemote("luna_kv", "key", res[0] || []);
                applyRemote("luna_invitations", "id", res[1] || []);

                /* yeni sifarişləri lokal siyahıya birləşdir */
                var newOrders = res[2] || [];
                if (newOrders.length) {
                    var arr;
                    try { arr = JSON.parse(rawGet("luna_orders") || "[]"); } catch (e) { arr = []; }
                    var have = {};
                    arr.forEach(function (o) { if (o && o._remoteId) have[o._remoteId] = 1; });
                    newOrders.forEach(function (ro) {
                        if (have[ro.id]) return;
                        var p = ro.payload || {};
                        p._remoteId = ro.id;
                        arr.push(p);
                        client.from("luna_orders").update({ status: "synced" }).eq("id", ro.id).then(function () {});
                    });
                    rawSetItem("luna_orders", JSON.stringify(arr));
                }

                var nowIso = new Date().toISOString();
                saveMeta({ wm: nowIso, invWm: nowIso });

                syncing = false;
                if (!firstPullDone) {
                    firstPullDone = true;
                    setState("online");
                    if (onChangeCb) { try { onChangeCb(state, user, true); } catch (e) {} }
                } else {
                    setState("online");
                    if (onChangeCb) { try { onChangeCb(state, user, true); } catch (e) {} }
                }
            })
            .catch(function () {
                syncing = false;
                setState(firstPullDone ? "error" : "locked");
            });
    }

    function toData(res) { return (res && res.data) ? res.data : []; }

    function startLoops() {
        clearInterval(pullTimer);
        pullTimer = setInterval(pull, PULL_INTERVAL_MS);
        document.addEventListener("visibilitychange", function () {
            if (!document.hidden && user) pull();
        });
    }

    function loadSdk(cb) {
        if (window.supabase && window.supabase.createClient) { cb(); return; }
        var s = document.createElement("script");
        s.src = "https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/dist/umd/supabase.js";
        s.onload = cb;
        s.onerror = function () { setState("error"); };
        document.head.appendChild(s);
    }

    function init(cb) {
        onChangeCb = cb || onChangeCb;
        cfg = window.LUNA_SUPABASE || {};
        ENABLED = !!(cfg.url && cfg.anonKey);
        console.log('[SYNC-I] enabled=' + ENABLED);
        if (!ENABLED) { setState("off"); installHooks(); return; }
        setState("connecting");
        installHooks();
        loadSdk(function () {
            try {
                client = window.supabase.createClient(cfg.url, cfg.anonKey);
                console.log('[SYNC-II] client created');
            } catch (e) { console.log('[SYNC-II-ERR] ' + e.message); setState("error"); return; }
            client.auth.getSession().then(function (res) {
                console.log('[SYNC-III] session resolved, has=' + !!(res && res.data && res.data.session));
                user = (res && res.data && res.data.session) ? res.data.session.user : null;
                if (!user) { setState("locked"); return; }
                client.auth.onAuthStateChange(function (evt, session) {
                    user = session ? session.user : null;
                    if (!user) { setState("locked"); stopLoops(); }
                });
                startLoops();
                pull();
            }).catch(function (e2) { console.log('[SYNC-III-ERR] ' + e2.message); setState("error"); });
        });
    }

    function stopLoops() { clearInterval(pullTimer); pullTimer = null; }

    function signIn(email, password) {
        if (!client) return Promise.reject(new Error("sync-off"));
        setState("connecting");
        return client.auth.signInWithPassword({ email: email, password: password })
            .then(function (res) {
                if (res.error) { setState("locked"); throw res.error; }
                user = res.data.session.user;
                startLoops();
                pull();
                return user;
            })
            .catch(function (err) { setState("locked"); throw err; });
    }

    function signOut() {
        if (!client) return Promise.resolve();
        return client.auth.signOut().then(function () {
            user = null;
            stopLoops();
            dirty = {};
            setState("locked");
        });
    }

    window.LunaSync = {
        init: init,
        signIn: signIn,
        signOut: signOut,
        pullNow: pull,
        status: function () { return state; },
        currentUser: function () { return user; },
        enabled: function () { return ENABLED; },
        onChange: function (cb) { onChangeCb = cb; if (state !== "off") cb(state, user); }
    };
})();
