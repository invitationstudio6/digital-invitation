/* =====================================================
   LUNA UTILITIES
   Core functions for the Luna platform
   ===================================================== */

function lunaCreateSlug(text) {
    return String(text || "")
        .toLowerCase()
        .trim()
        .replace(/ə/g, "e")
        .replace(/ı/g, "i")
        .replace(/ö/g, "o")
        .replace(/ü/g, "u")
        .replace(/ş/g, "s")
        .replace(/ç/g, "c")
        .replace(/ğ/g, "g")
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-+|-+$/g, "");
}

/* Keep a human-friendly slug but avoid collisions between clients with the same
   name. Checks EVERY source of taken invitation IDs — current device localStorage,
   any other client invitations stored across the account (window.LUNA_TAKEN_IDS),
   and the Supabase-published invitation list — so same-name clients on any device
   or published remotely never end up with an identical link. */
function lunaIsIdTaken(id) {
    if (!id) return false;
    try { if (localStorage.getItem("luna_" + id)) return true; } catch (e) {}
    try {
        var list = JSON.parse(localStorage.getItem("luna_client_invitations") || "[]");
        if (list.some(function(c){ return c && c.id === id; })) return true;
    } catch (e) {}
    if (window.LUNA_TAKEN_IDS && window.LUNA_TAKEN_IDS[id]) return true;
    return false;
}
function lunaUniqueInvitationId(base) {
    var id = base || "invitation";
    /* avoid infinite loop if base itself is somehow taken with no suffix possible */
    if (!base && lunaIsIdTaken(id)) id = "invitation-2";
    var n = 2;
    while (lunaIsIdTaken(id)) {
        var suffix = "-" + n;
        var candidate = base + suffix;
        if (candidate.length <= 48) id = candidate;
        else id = (base.slice(0, Math.max(1, 48 - 3)) + suffix);
        n++;
        if (n > 1000) break;
    }
    return id;
}

function lunaEscapeHtml(text) {
    return String(text || "")
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;");
}

function lunaFormatStory(story) {
    if (!story) return "";
    if (/<[a-z][\s\S]*>/i.test(story)) return story;
    return String(story)
        .split(/\n+/)
        .map(function(p) { return "<p>" + lunaEscapeHtml(p.trim()) + "</p>"; })
        .filter(function(p) { return p !== "<p></p>"; })
        .join("<br>");
}

function lunaGetInvitation(id) {
    var invitationId = String(id || "").toLowerCase().trim();
    if (!invitationId) return null;

    try {
        var stored = localStorage.getItem("luna_" + invitationId);
        if (stored) return JSON.parse(stored);
    } catch (error) {
        console.warn("Luna localStorage read failed", error);
    }

    /* Supabase fallback — link istənilən cihazda işləsin */
    var fetched = _lunaFetchRemoteInvitation(invitationId);
    if (fetched) return fetched;

    if (typeof invitations !== "undefined" && invitations[invitationId]) {
        return invitations[invitationId];
    }

    return null;
}

function _lunaFetchRemoteInvitation(invitationId) {
    var cfg = window.LUNA_SUPABASE;
    if (!cfg || !cfg.url || !cfg.anonKey) return null;
    if (navigator.onLine === false) return null;
    try {
        /* Səhifə sinxron init olduğundan burada sync XHR işlədirik —
           yalnız lokal tapılmadıqda, bir dəfəyə çağırılır */
        var xhr = new XMLHttpRequest();
        xhr.open(
            "GET",
            cfg.url + "/rest/v1/luna_invitations?id=eq." + encodeURIComponent(invitationId) + "&select=value",
            false
        );
        xhr.setRequestHeader("apikey", cfg.anonKey);
        xhr.setRequestHeader("Authorization", "Bearer " + cfg.anonKey);
        xhr.send(null);
        if (xhr.status !== 200) return null;
        var rows = JSON.parse(xhr.responseText);
        if (!rows || !rows.length || !rows[0].value) return null;
        var inv = rows[0].value;
        try { localStorage.setItem("luna_" + invitationId, JSON.stringify(inv)); } catch (e) {}
        return inv;
    } catch (error) {
        console.warn("Luna remote invitation fetch failed", error);
        return null;
    }
}

function lunaSaveInvitation(invitation) {
    if (!invitation || !invitation.id) return false;
    var heavy = ["videoUrl", "video", "images", "photoInvitation", "logoUrl", "music"];
    function trySave(obj) {
        try {
            localStorage.setItem("luna_" + obj.id, JSON.stringify(obj));
            return true;
        } catch (e) { return false; }
    }
    if (trySave(invitation)) {
        try { localStorage.setItem("luna_last_invitation", invitation.id); } catch (e) {}
        return true;
    }
    /* Quota exceeded — strip heavy media progressively and retry */
    var copy = JSON.parse(JSON.stringify(invitation));
    for (var i = 0; i < heavy.length; i++) {
        if (copy[heavy[i]] !== undefined) delete copy[heavy[i]];
        if (trySave(copy)) {
            try { localStorage.setItem("luna_last_invitation", invitation.id); } catch (e) {}
            return true;
        }
    }
    return false;
}

/* ===== IndexedDB media store (shared with admin / home / viewer) ===== */
var _lunaIDB = null;
function lunaOpenIDB(cb) {
    if (_lunaIDB) { cb(_lunaIDB); return; }
    if (!window.indexedDB) { cb(null); return; }
    try {
        var req = indexedDB.open("LunaFiles", 1);
        req.onupgradeneeded = function(e) {
            var db = e.target.result;
            if (!db.objectStoreNames.contains("blobs")) db.createObjectStore("blobs");
        };
        req.onsuccess = function(e) { _lunaIDB = e.target.result; cb(_lunaIDB); };
        req.onerror = function() { cb(null); };
    } catch (e) { cb(null); }
}
function lunaIDBSave(key, blob, cb) {
    lunaOpenIDB(function(db) {
        if (!db) { cb && cb(false); return; }
        try {
            var tx = db.transaction("blobs", "readwrite");
            tx.objectStore("blobs").put(blob, key);
            tx.oncomplete = function() { cb && cb(true); };
            tx.onerror = function() { cb && cb(false); };
        } catch (e) { cb && cb(false); }
    });
}
function lunaIDBLoad(key, cb) {
    lunaOpenIDB(function(db) {
        if (!db) { cb && cb(null); return; }
        try {
            var tx = db.transaction("blobs", "readonly");
            var rq = tx.objectStore("blobs").get(key);
            rq.onsuccess = function() { cb && cb(rq.result || null); };
            rq.onerror = function() { cb && cb(null); };
        } catch (e) { cb && cb(null); }
    });
}

function lunaCountdownTarget(invitation) {
    if (!invitation) return null;

    var countdown = invitation.countdown;

    if (typeof countdown === "string" && countdown.trim()) {
        if (countdown.indexOf("+") !== -1 || /z$/i.test(countdown)) return countdown;
        return countdown + "+04:00";
    }

    if (countdown && countdown.date && countdown.time) {
        return countdown.date + "T" + countdown.time + ":00+04:00";
    }

    if (invitation.date && invitation.time && /^\d{4}-\d{2}-\d{2}$/.test(invitation.date)) {
        return invitation.date + "T" + invitation.time + ":00+04:00";
    }

    return null;
}

function lunaDisplayNames(invitation) {
    if (!invitation) return "Luna";

    var cat = invitation.category || "wedding";

    /* Wedding / Engagement / Anniversary */
    if (cat === "wedding" || cat === "engagement" || cat === "anniversary") {
        var bride = invitation.bride || "";
        var groom = invitation.groom || "";
        if (bride && groom) return bride + " & " + groom;
        return bride || groom || "Luna";
    }

    /* Birthday */
    if (cat === "birthday") {
        return (invitation.bride || invitation.celebrant || "Luna");
    }

    /* Graduation */
    if (cat === "graduation") {
        return (invitation.bride || invitation.graduate || "Luna");
    }

    /* Business */
    if (cat === "business") {
        return (invitation.bride || invitation.companyName || invitation.eventName || "Luna");
    }

    /* Henna */
    if (cat === "henna") {
        var hBride = invitation.bride || "";
        var hGroom = invitation.groom || "";
        if (hBride && hGroom) return hBride + " & " + hGroom;
        return hBride || hGroom || "Luna";
    }

    /* Other / default */
    return (invitation.bride || invitation.eventName || "Luna");
}

function lunaGetRsvps(invitationId) {
    var seen = {};
    var out = [];
    function add(e) {
        if (!e) return;
        var u = e.uid || (e.at + "|" + (e.name || ""));
        if (seen[u]) return;
        seen[u] = 1;
        out.push(e);
    }
    /* köhnə format: tək açarda massiv (luna_rsvp_<id>) */
    try {
        var raw = localStorage.getItem("luna_rsvp_" + invitationId);
        var arr = raw ? JSON.parse(raw) : [];
        if (Array.isArray(arr)) arr.forEach(add);
    } catch (e) {}
    /* yeni format: hər RSVP ayrı açar (luna_rsvp_<id>__<uid>) — cloud-dan gəlir */
    var prefix = "luna_rsvp_" + invitationId + "__";
    for (var i = 0; i < localStorage.length; i++) {
        var key = localStorage.key(i);
        if (key.indexOf(prefix) !== 0) continue;
        try {
            var val = JSON.parse(localStorage.getItem(key));
            if (val && typeof val === "object" && !Array.isArray(val)) add(val);
        } catch (e) {}
    }
    out.sort(function (a, b) { return (Date.parse(a.at) || 0) - (Date.parse(b.at) || 0); });
    return out;
}

function lunaSaveRsvp(invitationId, entry) {
    if (!invitationId) return;
    entry = entry || {};
    if (!entry.uid) entry.uid = Date.now() + "_" + Math.random().toString(36).slice(2, 10);
    if (!entry.at) entry.at = new Date().toISOString();
    entry.invitationId = invitationId;

    /* 1) köhnə massiv-format açara yaz (ani göstəriş + geriyə uyğunluq) */
    var list = lunaGetRsvps(invitationId);
    list.push(entry);
    try {
        localStorage.setItem("luna_rsvp_" + invitationId, JSON.stringify(list));
    } catch (e) {}

    /* 2) kanonik per-RSVP açar — hər RSVP ayrıca sətir (cloud üçün) */
    var rowKey = "luna_rsvp_" + invitationId + "__" + entry.uid;
    try {
        localStorage.setItem(rowKey, JSON.stringify(entry));
    } catch (e) {}

    /* 3) buluda anon INSERT — qonağın devayıcısında belə saxlanır */
    _lunaPushRsvpToDb(rowKey, entry);
}

/* Hər RSVP-ni luna_kv cədvəlinə ayrıca sətir kimi yaz.
   Schema-da anon INSERT yalnız key LIKE 'luna_rsvp_%' üçün açıqdır,
   buna görə hər RSVP üçün unikal açardan istifadə edilir. */
function _lunaPushRsvpToDb(rowKey, entry) {
    var cfg = window.LUNA_SUPABASE || {};
    if (!cfg.url || !cfg.anonKey) return;
    try {
        fetch(cfg.url + "/rest/v1/luna_kv", {
            method: "POST",
            headers: {
                "apikey": cfg.anonKey,
                "Authorization": "Bearer " + cfg.anonKey,
                "Content-Type": "application/json",
                "Prefer": "return=minimal"
            },
            body: JSON.stringify({
                key: rowKey,
                value: entry,
                updated_at: new Date().toISOString()
            })
        }).catch(function (err) {
            console.warn("Luna RSVP cloud sync failed", err);
        });
    } catch (err) {
        console.warn("Luna RSVP cloud sync failed", err);
    }
}

/* Get all customer invitations from localStorage */
function lunaGetAllInvitations() {
    var list = [];
    for (var i = 0; i < localStorage.length; i++) {
        var key = localStorage.key(i);
        if (!key.startsWith("luna_") || key === "luna_last_invitation" || key === "lunaLanguage" || key.startsWith("luna_rsvp_") || key === "luna_designs" || key === "luna_video_invitations") continue;
        try {
            var data = JSON.parse(localStorage.getItem(key));
            if (data && data.id) list.push(data);
        } catch (e) {}
    }
    return list;
}

function lunaDeleteInvitation(id) {
    localStorage.removeItem("luna_" + id);
    localStorage.removeItem("luna_rsvp_" + id);
}

/* =====================================================
   FORMSPREE — SEND ORDER NOTIFICATION TO OWNER EMAIL
   Accepts a Formspree endpoint (https://formspree.io/f/<id>)
===================================================== */
function lunaNotifyOrder(payload, endpoint) {
    var url = endpoint ||
        (typeof LUNA_FORMSPREE_ENDPOINT !== "undefined" ? LUNA_FORMSPREE_ENDPOINT : null) ||
        "https://formspree.io/f/mqpzyklb";

    var body = payload || {};
    if (!body._subject) {
        body._subject = "Luna — Yeni sifariş (" + (body.category || body.package || "dəvətnamə") + ")";
    }

    /* Supabase — sifarişi birbaşa admin bazasına yaz */
    _lunaPushOrderToDb(body);

    return fetch(url, {
        method: "POST",
        headers: { "Accept": "application/json", "Content-Type": "application/json" },
        body: JSON.stringify(body)
    }).catch(function(err) {
        /* Never block the customer's flow if email notification fails. */
        console.warn("Luna Formspree notify failed", err);
    });
}

function _lunaPushOrderToDb(payload) {
    var cfg = window.LUNA_SUPABASE;
    if (!cfg || !cfg.url || !cfg.anonKey) return;
    try {
        fetch(cfg.url + "/rest/v1/luna_orders", {
            method: "POST",
            headers: {
                "apikey": cfg.anonKey,
                "Authorization": "Bearer " + cfg.anonKey,
                "Content-Type": "application/json",
                "Prefer": "return=minimal"
            },
            body: JSON.stringify({ payload: payload, status: "new", created_at: new Date().toISOString() })
        }).catch(function (err) {
            console.warn("Luna order sync failed", err);
        });
    } catch (err) {
        console.warn("Luna order sync failed", err);
    }
}

/* Compute date short display: DD · MM · YYYY */
function lunaDateShort(dateStr) {
    if (!dateStr) return "";
    var parts = dateStr.split("-");
    if (parts.length === 3) return parts[2] + " · " + parts[1] + " · " + parts[0];
    return dateStr;
}

/* Category-specific display heading for invitation */
function lunaInvitationHeading(invitation) {
    if (!invitation) return "";
    var cat = invitation.category || "wedding";
    var lang = LUNA_LANG || "az";

    var headings = {
        wedding: { az: "SİZİ SEVGİ İLƏ DƏVƏT EDİRİK", en: "YOU ARE CORDIALLY INVITED", ru: "МИЛОСТИ ПРОСИМ", tr: "SİZLERİ DAVET EDİYORUZ" },
        engagement: { az: "NİŞAN DƏVƏTNAMƏSİ", en: "ENGAGEMENT INVITATION", ru: "ПРИГЛАШЕНИЕ НА ПОМОЛВКУ", tr: "NİŞAN DAVETİYESİ" },
        henna: { az: "XINA GECƏSİ", en: "HENNA NIGHT", ru: "ВЕЧЕР ХНЫ", tr: "KINA GECESİ" },
        birthday: { az: "AD GÜNÜN MÜBARƏK", en: "HAPPY BIRTHDAY", ru: "С ДНЁМ РОЖДЕНИЯ", tr: "DOĞUM GÜNÜN KUTLU OLSUN" },
        graduation: { az: "MƏZUNİYYƏT", en: "GRADUATION", ru: "ВЫПУСКНОЙ", tr: "MEZUNİYET" },
        "baby-shower": { az: "KÖRPƏ PARTİSİ", en: "BABY SHOWER", ru: "БЭБИ-ШАУЭР", tr: "BEBEK ŞEKERİ" },
        business: { az: "BİZNES TƏDBİRİ", en: "BUSINESS EVENT", ru: "ДЕЛОВОЕ МЕРОПРИЯТИЕ", tr: "İŞ ETKİNLİĞİ" },
        other: { az: "SİZİ DƏVƏT EDİRİK", en: "YOU ARE INVITED", ru: "ВАС ПРИГЛАШАЮТ", tr: "SİZLERİ DAVET EDİYORUZ" }
    };

    return (headings[cat] && headings[cat][lang]) || (headings[cat] && headings[cat].az) || "SİZİ DƏVƏT EDİRİK";
}

/* RSVP text based on category */
function lunaRsvpText(invitation) {
    if (!invitation) return "";
    var cat = invitation.category || "wedding";
    var lang = LUNA_LANG || "az";

    var texts = {
        wedding: { az: "Bu xüsusi gündə bizimlə olmağınızı səbirsizliklə gözləyirik.", en: "We eagerly await your presence on this special day.", ru: "Мы с нетерпением ждём вашего присутствия.", tr: "Bu özel günde bizimle olmanızı sabırsızlıkla bekliyoruz." },
        birthday: { az: "Doğum günümüzü sizinlə birlikdə qeyd etmək istəyirik.", en: "We want to celebrate our birthday with you.", ru: "Мы хотим отпраздновать день рождения с вами.", tr: "Doğum günümüzü sizinle birlikte kutlamak istiyoruz." },
        business: { az: "Bu vacib tədbirdə iştirakınızı gözləyirik.", en: "We look forward to your participation in this important event.", ru: "Мы ждём вашего участия в этом важном мероприятии.", tr: "Bu önemli etkinlikte katılımınızı bekliyoruz." },
        graduation: { az: "Məzuniyyət sevincimi sizinlə bölüşmək istəyirəm.", en: "I want to share my graduation joy with you.", ru: "Я хочу поделиться радостью выпуска с вами.", tr: "Mezuniyet sevincimi sizinle paylaşmak istiyorum." }
    };

    return (texts[cat] && texts[cat][lang]) || (texts.wedding && texts.wedding[lang]) || texts.wedding.az;
}

/* =====================================================
   CÜTLÜK RSVP PANELİ — klientlər üçün məxfilik istiqaməti
   Qonaq heç nə görmür; cütlük yalnız ÖZ dəvətnaməsinin
   RSVP-lərini görür (Supabase Auth magic-link vasitəsilə).
   RLS siyasətləri: supabase/rsvp-client-panel.sql
===================================================== */

/* Supabase SDK-nı bir dəfə yüklə (admin paneldəki kimidir) */
function _lunaLoadSupabase(cb) {
    if (window.lunaSbClient && window.lunaSbClient.auth) { cb(); return; }
    if (window.supabase && window.supabase.createClient) {
        var cfg = window.LUNA_SUPABASE || {};
        window.lunaSbClient = window.supabase.createClient(cfg.url, cfg.anonKey);
        cb(); return;
    }
    var s = document.createElement("script");
    s.src = "https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/dist/umd/supabase.js";
    s.onload = function () {
        var cfg = window.LUNA_SUPABASE || {};
        try { window.lunaSbClient = window.supabase.createClient(cfg.url, cfg.anonKey); } catch (e) {}
        cb();
    };
    s.onerror = function () { cb(); };
    document.head.appendChild(s);
}

function lunaRsvpClientRef() {
    var cfg = window.LUNA_SUPABASE || {};
    if (!window.lunaSbClient && window.supabase && window.supabase.createClient && cfg.url) {
        window.lunaSbClient = window.supabase.createClient(cfg.url, cfg.anonKey);
    }
    return window.lunaSbClient || null;
}

/* Cütlük üçün magic-link məktubu göndər */
function lunaCoupleSendMagicLink(email) {
    return new Promise(function (resolve) {
        _lunaLoadSupabase(function () {
            var sb = lunaRsvpClientRef();
            if (!sb) { resolve({ error: { message: "Sinkronizasiya deaktivdir" } }); return; }
            sb.auth.signInWithOtp({
                email: email,
                options: {
                    emailRedirectTo: window.location.href.split("#")[0]
                }
            }).then(function (res) {
                resolve(res);
            }).catch(function (err) { resolve({ error: err }); });
        });
    });
}

/* Cari cütlük session-u (magic-link ilə) */
function lunaCoupleSession() {
    return new Promise(function (resolve) {
        _lunaLoadSupabase(function () {
            var sb = lunaRsvpClientRef();
            if (!sb) { resolve(null); return; }
            sb.auth.getSession().then(function (res) {
                resolve(res && res.data && res.data.session ? res.data.session : null);
            }).catch(function () { resolve(null); });
        });
    });
}

function lunaCoupleSignOut() {
    return new Promise(function (resolve) {
        var sb = lunaRsvpClientRef();
        if (!sb) { resolve(); return; }
        sb.auth.signOut().then(resolve).catch(resolve);
    });
}

/* Cütlüyün ÖZ dəvətnaməsinin RSVP-lərini Supabase-dən çək.
   RLS yalnız sahibin email-inə aid luna_rsvp_<id>__* sətirləri qaytarır —
   başqa cütlüyün RSVP-ləri qayıtmaz, qonaq (anon) ümumiyyətlə çəkə bilməz. */
function lunaCoupleFetchOwnRsvps(invitationId) {
    return new Promise(function (resolve) {
        var cfg = window.LUNA_SUPABASE || {};
        if (!cfg.url) { resolve([]); return; }
        _lunaLoadSupabase(function () {
            var sb = lunaRsvpClientRef();
            if (!sb) { resolve([]); return; }
            var prefix = "luna_rsvp_" + String(invitationId).toLowerCase() + "__";
            sb.from("luna_kv")
                .select("key,value")
                .like("key", prefix + "%")
                .then(function (res) {
                    if (res.error) { resolve({ error: res.error }); return; }
                    var out = [];
                    (res.data || []).forEach(function (row) {
                        var v = row.value;
                        if (v && typeof v === "object" && !Array.isArray(v)) {
                            if (!v.uid) v.uid = (row.key || "").split("__").pop() || "";
                            out.push(v);
                        }
                    });
                    out.sort(function (a, b) { return (Date.parse(a.at) || 0) - (Date.parse(b.at) || 0); });
                    resolve(out);
                })
                .catch(function (err) { resolve({ error: err }); });
        });
    });
}
