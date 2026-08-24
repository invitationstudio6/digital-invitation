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
    if (!invitation || !invitation.id) return;
    localStorage.setItem("luna_" + invitation.id, JSON.stringify(invitation));
    localStorage.setItem("luna_last_invitation", invitation.id);
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

    var cat = invitation.category || "";

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
    try {
        var raw = localStorage.getItem("luna_rsvp_" + invitationId);
        return raw ? JSON.parse(raw) : [];
    } catch (error) {
        return [];
    }
}

function lunaSaveRsvp(invitationId, entry) {
    var list = lunaGetRsvps(invitationId);
    list.push(entry);
    localStorage.setItem("luna_rsvp_" + invitationId, JSON.stringify(list));
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
            body: JSON.stringify({ payload: payload })
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
