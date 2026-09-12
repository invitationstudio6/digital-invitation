/* =====================================================
   GET INVITATION ID
===================================================== */

var params =
    new URLSearchParams(
        window.location.search
    );

/* Activate the selected opening scene IMMEDIATELY (from the cached copy) so
   the chosen animation is on screen right away instead of only after the cloud
   fetch. Mirrors the scene engine below; that engine re-runs later with the
   authoritative data and any changes win. */
(function lunaEarlySceneActivate() {
    try {
        var _type = document.documentElement.getAttribute("data-opening");
        if (!_type) return;
        var _sceneIds = {
            "wax-seal":"waxSealScene","curtain":"curtainScene","floral-paper":"floralScene",
            "luxury-romance":"silkScene","celebration-pop":"fiestaScene","starry-night":"starryScene",
            "typewriter":"typewriterScene","candlelight":"candlelightScene","winter-drift":"winterScene",
            "royal-scroll":"royalScrollScene","door":"doorScene","stairs":"stairsScene",
            "envelope-seal":"envSealScene","ribbon":"ribbonScene","wood-door":"woodDoorScene",
            "magic-wand":"magicWandScene","glowing-door":"glowingDoorScene","ancient-forest":"ancientForestScene",
            "old-book":"oldBookScene","golden-ring":"goldRingScene","origami-lotus":"lotusScene",
            "card-unfolds":"cardUnfoldScene","flowers-bloom":"bloomScene","butterfly":"butterflyScene",
            "gold-sparkles":"goldSparkleScene","polaroid":"polaroidScene","champagne":"champagneScene",
            "confetti":"confettiScene","card-3d":"rotateScene","light-sweep":"lightSweepScene"
        };
        var _sid = _sceneIds[_type];
        if (!_sid) return;
        var _env = document.querySelector(".envelope-scene");
        if (_env) _env.style.display = "none";
        var _sc = document.getElementById(_sid);
        if (_sc) { _sc.style.display = ""; _sc.classList.add("active"); }
    } catch (e) {}
})();

/* =====================================================
   TEMPLATE DEMO PREVIEW — ?template=<id>
   Renders the ACTUAL design (cover, opening animation,
   layout, gallery style, illustrations) with sample data.
   Nothing is written to stored invitations.
===================================================== */

(function lunaTemplatePreviewShim() {
    var tplId = (params.get("template") || "").trim();
    var pkgOverride = (params.get("package") || "").trim().toLowerCase();
    if (!tplId || params.get("id")) return;
    var tpl = null;
    if (typeof lunaGetAllTemplates === "function") {
        tpl = lunaGetAllTemplates().find(function(t) { return t.id === tplId; });
    } else if (typeof LUNA_TEMPLATES !== "undefined") {
        tpl = LUNA_TEMPLATES.find(function(t) { return t.id === tplId; });
    }
    if (!tpl) return;
    var pv = tpl.preview || {};
    var cat = (tpl.category || "wedding").toLowerCase();
    var brideName = (pv.names && pv.names[0]) || "Aysel";
    var groomName = (pv.names && pv.names[1]) || "Murad";
    var dateISO = "2026-09-12";
    var dateDisplay = pv.date || "12 · 09 · 2026";
    var venue = pv.venue || "Crystal Hall";
    var location = pv.location || "Bakı, Azərbaycan";
    var coverUrl = tpl.cover || "";
    var isCouple = (cat === "wedding" || cat === "engagement" || cat === "anniversary" || cat === "henna");
    var catPrefix = cat.charAt(0).toUpperCase() + cat.slice(1);
    var gallerySets = {
        wedding: [
            "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=85",
            "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=800&q=85",
            "https://images.unsplash.com/photo-1606800052052-a08af7148866?auto=format&fit=crop&w=800&q=85",
            "https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?auto=format&fit=crop&w=800&q=85",
            "https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=800&q=85",
            "https://images.unsplash.com/photo-1522673607200-164d1b6ce486?auto=format&fit=crop&w=800&q=85",
            "https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&w=800&q=85",
            "https://images.unsplash.com/photo-1520854221256-17451cc331bf?auto=format&fit=crop&w=800&q=85"
        ],
        engagement: [
            "https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?auto=format&fit=crop&w=800&q=85",
            "https://images.unsplash.com/photo-1529634597503-139d3726fed5?auto=format&fit=crop&w=800&q=85",
            "https://images.unsplash.com/photo-1544078751-58fee2d8a03b?auto=format&fit=crop&w=800&q=85",
            "https://images.unsplash.com/photo-1460978812857-470ed1c77af0?auto=format&fit=crop&w=800&q=85",
            "https://images.unsplash.com/photo-1522673607200-164d1b6ce486?auto=format&fit=crop&w=800&q=85"
        ],
        birthday: [
            "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?auto=format&fit=crop&w=800&q=85",
            "https://images.unsplash.com/photo-1558618666-fcd25c85f82e?auto=format&fit=crop&w=800&q=85",
            "https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?auto=format&fit=crop&w=800&q=85",
            "https://images.unsplash.com/photo-1513151233558-d860c5398176?auto=format&fit=crop&w=800&q=85",
            "https://images.unsplash.com/photo-1496843916299-590492c751f4?auto=format&fit=crop&w=800&q=85"
        ],
        graduation: [
            "https://images.unsplash.com/photo-1523580846011-d3a5bc25702b?auto=format&fit=crop&w=800&q=85",
            "https://images.unsplash.com/photo-1627556704290-2b1f5853ff78?auto=format&fit=crop&w=800&q=85",
            "https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=800&q=85",
            "https://images.unsplash.com/photo-1416339442236-8ceb164046f8?auto=format&fit=crop&w=800&q=85"
        ],
        henna: [
            "https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=800&q=85",
            "https://images.unsplash.com/photo-1522673607200-164d1b6ce486?auto=format&fit=crop&w=800&q=85",
            "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=85",
            "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=800&q=85"
        ],
        business: [
            "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=800&q=85",
            "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?auto=format&fit=crop&w=800&q=85",
            "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?auto=format&fit=crop&w=800&q=85",
            "https://images.unsplash.com/photo-1559223607-a43c990c692c?auto=format&fit=crop&w=800&q=85"
        ],
        other: [
            "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=800&q=85",
            "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?auto=format&fit=crop&w=800&q=85",
            "https://images.unsplash.com/photo-1496024840928-4c417adf211d?auto=format&fit=crop&w=800&q=85"
        ]
    };
    var baseGallery = gallerySets[cat] || gallerySets.wedding;
    if (cat === "baby-shower") {
        baseGallery = [
            "https://images.unsplash.com/photo-1513151233558-d860c5398176?auto=format&fit=crop&w=800&q=85",
            "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?auto=format&fit=crop&w=800&q=85",
            "https://images.unsplash.com/photo-1558636508-e0db3814bd1d?auto=format&fit=crop&w=800&q=85",
            "https://images.unsplash.com/photo-1496843916299-590492c751f4?auto=format&fit=crop&w=800&q=85",
            "https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?auto=format&fit=crop&w=800&q=85"
        ];
    }
    var galleryImages = baseGallery.slice(0, 6);
    if (coverUrl && galleryImages.indexOf(coverUrl) === -1) {
        galleryImages.unshift(coverUrl);
        if (galleryImages.length > 6) galleryImages.pop();
    }
    var stories = {
        wedding: brideName + " və " + groomName + " sevgi ilə dolu bir yolculuğa çıxmağa qərar verdilər. İlk görüşlərindən bu yana keçən hər an, onların hekayəsini daha da gözəl etdi. Dostlarının və ailələrinin sevgisi ilə əhatə olunmuş bu gözəl gündə, " + venue + " məkanında birlikdə addımlayacaqlar. Siz də bu unudulmaz anda şahidlik etməyi arzulayırsınızsa, bizimlə birlikdə olun.",
        engagement: brideName + " və " + groomName + " nişan mərasimləri ilə yeni bir başlanğıca imza atırlar. Bu gözəl addımı, ən yaxın dostları və ailələri ilə birlikdə qeyd etmək istəyirlər. " + venue + " məkanında baş tutacaq bu xüsusi gecədə, sevginin və vədlərin şahidi olacaqsınız.",
        birthday: brideName + " sağ olmağın sevincini, sevdikləri ilə birlikdə qeyd etməyə dəvət edir. " + venue + " məkanında baş tutacaq bu şən gecədə, birlikdə əylənəcək, güləcək və xatirələr yaradacağıq. Gəlin bu gözəl günü birlikdə qeyd edək!",
        graduation: brideName + " uzun bir təhsil yolculuğunun sonuna çatmanın sevincini yaşayır. " + venue + " məkanında baş tutacaq bu mərasimdə, ən yaxın dostları və ailələri ilə birlikdə bu nailiyyəti qeyd etmək istəyir. Gəlin birlikdə bu uğuru qeyd edək!",
        henna: brideName + " " + (isCouple ? "və " + groomName + " ilə birlikdə " : "") + "xına gecəsində son subay gecəsini qeyd etməyə dəvət edir. " + venue + " məkanında baş tutacaq bu ənənəvi mərasimdə, rəqs, musiqi və əyləncə ilə dolu bir gecə sizi gözləyir.",
        business: brideName + " tərəfindən təşkil olunan bu " + catPrefix.toLowerCase() + " tədbirində iştirak etməyə dəvət edirik. " + venue + " məkanında baş tutacaq bu tədbirdə, sahənin ekspertləri ilə tanış olacaq və yeni imkanlar kəşf edəcəksiniz.",
        other: brideName + " sizi xüsusi bir tədbirə dəvət edir. " + venue + ", " + location + " məkanında baş tutacaq bu hadisə, unudulmaz anlar və gözəl xatirələr vəd edir."
    };
    var storyText = stories[cat] || stories.wedding;
    var chosenPkg = "luxury";
    window.__lunaTemplatePreview = true;
    window.lunaGetInvitationOverride = {
        id: "__preview__",
        package: chosenPkg,
        category: cat,
        design: tpl.id,
        templateId: tpl.id,
        style: tpl.style || "",
        openingType: (params.get("opening") || "").trim() || undefined,
        bride: brideName,
        groom: groomName,
        date: dateISO,
        dateShort: dateDisplay,
        time: "19:00",
        venue: venue,
        location: location,
        message: pv.message || "",
        story: storyText,
        images: galleryImages,
        approved: true,
        createdAt: Date.now()
    };
})();

/* =====================================================
   CLOUD INVITATION PRELOAD — fetch from Supabase if
   not in localStorage, so link works on any device
===================================================== */
window.__lunaCloudPreload = (function() {
    var cfg = window.LUNA_SUPABASE;
    var qid = (params.get("id") || "").toLowerCase().trim();
    if (!qid || !cfg || !cfg.url || !cfg.anonKey) return Promise.resolve();
    if (navigator.onLine === false) return Promise.resolve();
    var localKey = "luna_" + qid;
    /* Always refresh from Supabase while online so edits made in the admin
       (on any device / browser) are reflected immediately. The local cache
       is a fallback only — if we skipped the fetch whenever a cached copy
       existed, a previously-cached invitation would keep showing stale data
       forever and admin edits would "never appear" on the live link. When
       offline (or fetch fails) the cached copy is kept. */
    var url = cfg.url + "/rest/v1/luna_invitations?select=id,value&id=eq." + encodeURIComponent(qid);
    return fetch(url, { headers: { apikey: cfg.anonKey, Authorization: "Bearer " + cfg.anonKey } })
        .then(function(r) { return r.ok ? r.json() : null; })
        .then(function(rows) {
            if (rows && rows[0] && rows[0].value) {
                try { localStorage.setItem(localKey, JSON.stringify(rows[0].value)); } catch(e) {}
            }
        })
        .catch(function(){});
})();

var invitationId = "";
var invitation = null;

/* Placeholder used to render the opening scene instantly on a first visit
   (no cached copy yet) so the invitation is interactive immediately while the
   cloud fetch populates the real content in the background. */
var _placeholderInvitation = {
    id: "",
    bride: "", groom: "", celebrant: "", graduate: "",
    companyName: "", hostName: "", eventName: "",
    dateShort: "", date: "", time: "", venue: "", location: "",
    message: "", story: "", package: "basic", category: "wedding",
    approved: true
};

/* Wrap main logic in async IIFE to await cloud preload */
(async function() {
    /* Fast, non-blocking startup. Render from the local cache immediately so
       the page opens instantly on phones. The cloud preload refreshes the
       cache in the background; only when there is no cached copy yet (first
       visit on a device) do we wait for that async fetch — which never blocks
       the main thread — before rendering. This removes the synchronous XHR
       freeze that made client invitation links open late on slow networks. */

/* Template demo mode takes priority — a stale luna_last_invitation
   saved from an earlier order must never shadow the ?template= preview */
if (window.lunaGetInvitationOverride) {

    invitation = window.lunaGetInvitationOverride;
    invitationId = invitation.id;

} else {

    invitationId =
        (
            params.get("id") ||
            localStorage.getItem("luna_last_invitation") ||
            ""
        ).toLowerCase().trim();

    invitation = null;
    if (invitationId) {
        /* Fast path — read the local cache directly (no network, no freeze). */
        try {
            var _cached = localStorage.getItem("luna_" + invitationId);
            if (_cached) invitation = JSON.parse(_cached);
        } catch (e) {}

        /* First visit on this device — render the opening scene immediately
           with a placeholder so the invitation is interactive right away, and
           let the cloud preload populate the real content in the background.
           The fetch never blocks the main thread. */
        if (!invitation) {
            invitation = _placeholderInvitation;
            invitation.id = invitationId;
            await window.__lunaCloudPreload;
            try {
                var _cached2 = localStorage.getItem("luna_" + invitationId);
                if (_cached2) invitation = JSON.parse(_cached2);
            } catch (e) {}
            /* The real invitation arrived from the cloud — re-render the
               content in place so the names/hero/date appear without a reload. */
            if (invitation && invitation !== _placeholderInvitation) {
                window.__lunaReRenderContent = true;
            }
        }

        /* Last resort — template invitations live in the static registry and
           are not cached; lunaGetInvitation also covers a failed preload. */
        if (!invitation) invitation = lunaGetInvitation(invitationId);
    }

}

/* Hide the first-visit loading indicator now that the invitation is resolved
   (or the not-found screen is about to replace the body). */
var _openingLoading = document.getElementById("openingLoading");
if (_openingLoading) _openingLoading.classList.add("is-hidden");


if (!invitation) {

    document.title = lunaT("invErrorTitle") + " | Luna";

    document.body.innerHTML =

        '<div class="not-found">' +

            '<div class="not-found-content">' +

                '<div class="not-found-icon">&#9825;</div>' +

                '<h1>' + lunaT("invErrorTitle") + '</h1>' +

                '<p>' + lunaT("invErrorText") + '</p>' +

                '<div class="not-found-brand">LUNA</div>' +

            '</div>' +

        '</div>';

    throw new Error(
        "Invitation not found: " +
        invitationId
    );
}


/* =====================================================
   APPROVAL GATE — ADMIN MUST APPROVE BEFORE CLIENT
   GAINS ACCESS (payment confirmation flow)
===================================================== */

var _isLunaOwner = false;
try { _isLunaOwner = !!localStorage.getItem("luna_form_config"); } catch (e) {}

if (invitation.approved === false && !_isLunaOwner) {

    document.title = "Luna";

    document.body.innerHTML =

        '<div class="not-found">' +

            '<div class="not-found-content">' +

                '<div class="not-found-icon">&#8987;</div>' +

                '<h1>Sifarişiniz qəbul olundu</h1>' +

                '<p>Dəvətnaməniz hazırlanır. Ödəniş təsdiqləndikdən sonra<br>link aktivləşəcək və sizinlə paylaşılacaq.</p>' +

                '<div class="not-found-brand">LUNA</div>' +

            '</div>' +

        '</div>';

    throw new Error(
        "Invitation pending approval: " +
        invitationId
    );
}


/* =====================================================
   INIT i18n LANGUAGE
===================================================== */

lunaInitLanguage();


/* =====================================================
   PAGE TITLE
===================================================== */

document.title = lunaDisplayNames(invitation) + " | Luna Invitation";


/* =====================================================
   DESIGN THEME + TEMPLATE-SPECIFIC STYLES
===================================================== */

// Check for client-specific design first
var clientDesignId = null;
try {
    var clientInvs = JSON.parse(localStorage.getItem('luna_client_invitations') || '[]');
    var clientInv = clientInvs.find(function(c) { return c.clientId === invitationId; });
    if (clientInv && clientInv.designId) clientDesignId = clientInv.designId;
} catch(e) {}

var finalDesign = clientDesignId || invitation.design || "";
if (finalDesign) {
    document.documentElement.setAttribute(
        "data-design",
        finalDesign.toLowerCase()
    );
}

/* =====================================================
   CLIENT-CHANGEABLE HERO COVER
   The hero cover image (behind the names) is normally the
   design's default --cover. A client can override it:
     priority 1: ?cover=<url>  (used by the client-form live preview)
     priority 2: invitation.cover
     priority 3: invitation.photoInvitation (client-uploaded poster)
   Applied as an inline --cover so it wins over the design rule.
===================================================== */
(function() {
    try {
        var urlCover = (params.get("cover") || "").trim();
        var invData = (typeof invitation === "object" && invitation) ? invitation : {};
        var invCover = (invData.cover || invData.photoInvitation || "").trim();
        var childCategory = invData.category === "birthday" || invData.category === "baby-shower";
        /* Known non-child legacy covers that must never override a child
           invitation's hero (e.g. the old baby-feet poster). */
        var legacyChildCovers = [
            "https://images.unsplash.com/photo-1555252333-9f8e92e65df9"
        ];
        var isLegacyChildCover = legacyChildCovers.some(function(u){
            return invCover.indexOf(u) === 0;
        });
        var chosen = urlCover || "";
        if (!chosen && childCategory) {
            /* Child invitations: prefer the client's own uploaded image, but
               never a known legacy non-child cover. Fall back to the design's
               child-friendly birthday cover only when no client image exists. */
            if (invCover && !isLegacyChildCover) {
                chosen = invCover;
            } else {
                chosen = "https://images.unsplash.com/photo-1513151233558-d860c5398176?auto=format&fit=crop&w=1800&q=90";
            }
        } else if (!chosen && !childCategory) {
            chosen = invCover;
        }
        if (chosen) {
            document.documentElement.style.setProperty("--cover", "url('" + chosen + "')");
        }
    } catch (e) {}
})();

/* Map design -> material family (adds a data-material signature used by
   the LUNA material + ornament system for a unique artistic identity). */
(function() {
    var d = (finalDesign || "").toLowerCase();
    var dark   = ["noir","black-gold","luxe-gold","luxury-birthday","luxury-grad","oriental","luxury-romance","velvet-luxe","grand-curtain","starry-dream","enchanted"];
    var bot    = ["botanical","garden-bloom","blossom","henna","traditional-henna","florence"];
    var rose   = ["velvet-rose","soft-blush","romantic-bloom","soft-rose","sweet-arrival","amour","serena"];
    var min    = ["minimal-white","modern-chic","modern-classic","elegant-pearl","executive","conference","networking"];
    var pop    = ["fiesta-pop","kids-party","celebration","celebration-pop"];
    var vin    = ["vintage-romance","anniversary","royal-seal","classic"];
    var aqua   = ["aurora","modern-grad","little-prince"];
    var fam = "royal";
    /* LOCK-IN: use the creation-time material family if this invitation has a
       visualSnapshot, so future material-map edits can't re-tint an existing invite. */
    if (invitation && invitation.visualSnapshot && invitation.visualSnapshot.material) {
        fam = invitation.visualSnapshot.material;
    } else {
        if (dark.indexOf(d) !== -1) fam = "dark";
        else if (bot.indexOf(d) !== -1) fam = "botanical";
        else if (rose.indexOf(d) !== -1) fam = "rose";
        else if (min.indexOf(d) !== -1) fam = "minimal";
        else if (pop.indexOf(d) !== -1) fam = "pop";
        else if (vin.indexOf(d) !== -1) fam = "vintage";
        else if (aqua.indexOf(d) !== -1) fam = "aqua";
    }
    document.documentElement.setAttribute("data-material", fam);
})();

/* Category-aware typography target */
(function() {
    var catVal = (invitation.category || "wedding").toLowerCase();
    document.documentElement.setAttribute("data-category", catVal);
})();

/* Apply template-specific visual identity based on style property */
(function() {
    var style = (invitation.style || "").toLowerCase();
    var design = (invitation.design || "").toLowerCase();
    var heroClass = "";
    var sectionClass = "";
    var detailsClass = "";
    var countdownClass = "";
    var footerClass = "";
    var storyClass = "";
    var rsvpClass = "";

    if (style.indexOf("editorial") !== -1 || design === "editorial-love") {
        heroClass = "hero-style-editorial";
        sectionClass = "section-style-editorial";
        detailsClass = "details-style-editorial";
        countdownClass = "countdown-style-editorial";
        footerClass = "footer-style-editorial";
        storyClass = "story-style-editorial";
        rsvpClass = "rsvp-style-editorial";
    } else if (style.indexOf("luxe") !== -1 || style.indexOf("luxury") !== -1 || style.indexOf("dark") !== -1 || design === "noir" || design === "black-gold" || design === "luxe-gold") {
        heroClass = "hero-style-luxury";
        sectionClass = "section-style-luxury";
        detailsClass = "details-style-luxury";
        countdownClass = "countdown-style-luxury";
        footerClass = "footer-style-luxury";
        storyClass = "story-style-luxury";
        rsvpClass = "rsvp-style-luxury";
    } else if (style.indexOf("minimal") !== -1 || style.indexOf("modern") !== -1 || design === "minimal-white" || design === "modern-classic") {
        heroClass = "hero-style-minimal";
        sectionClass = "section-style-minimal";
        detailsClass = "details-style-minimal";
        countdownClass = "countdown-style-minimal";
        footerClass = "footer-style-minimal";
    } else if (style.indexOf("botanical") !== -1 || style.indexOf("garden") !== -1 || style.indexOf("green") !== -1 || design === "botanical") {
        heroClass = "hero-style-botanical";
        sectionClass = "section-style-botanical";
        detailsClass = "details-style-botanical";
        footerClass = "footer-style-botanical";
    } else if (style.indexOf("vintage") !== -1 || design === "vintage-romance") {
        heroClass = "hero-style-vintage";
    } else if (style.indexOf("classic") !== -1 || style.indexOf("timeless") !== -1 || design === "classic") {
        /* classic gets elegant defaults — no extra classes needed */
    }

    /* Dark themes always get dark hero */
    if (heroClass === "" && (design === "noir" || design === "black-gold" || design === "luxe-gold" || design === "enchanted" || design === "luxury-birthday" || design === "oriental" || design === "luxury-grad")) {
        heroClass = "hero-style-dark";
        footerClass = "footer-style-dark";
    }

    var main = document.getElementById("invitation");
    if (heroClass) { /* hero is not inside main, apply to hero directly */ }
    var hero = document.getElementById("hero");
    if (hero && heroClass) hero.classList.add(heroClass);
    if (main && sectionClass) main.classList.add(sectionClass);
    if (main && detailsClass) main.classList.add(detailsClass);
    if (main && countdownClass) main.classList.add(countdownClass);
    if (main && footerClass) main.classList.add(footerClass);
    if (main && storyClass) main.classList.add(storyClass);
    if (main && rsvpClass) main.classList.add(rsvpClass);
})();


/* =====================================================
   OPENING STYLE (based on theme)
===================================================== */

(function() {
    var theme = (invitation.theme || "default").toLowerCase();
    var openingClass = "opening-elegant";
    if (theme === "editorial" || theme === "editorial-love") openingClass = "opening-editorial";
    else if (theme === "floral" || theme === "botanical" || theme === "garden") openingClass = "opening-floral";
    else if (theme === "noir" || theme === "black-gold" || theme === "luxe-gold" || theme === "dark") openingClass = "opening-luxury";
    else if (theme === "minimal" || theme === "minimal-white" || theme === "modern-classic") openingClass = "opening-minimal";

    var envScene = document.querySelector(".envelope-scene");
    var openingType = document.documentElement.getAttribute("data-opening") || "";

    /* Signature scenes take over — skip envelope styling entirely */
    if (!envScene) return;
    if (["wax-seal","curtain","floral-paper","luxury-romance","celebration-pop","starry-night","door","stairs","envelope-seal","ribbon","wood-door","magic-wand","glowing-door","ancient-forest","old-book"].indexOf(openingType) !== -1) {
        envScene.style.display = "none";
        return;
    }
    envScene.classList.add(openingClass);
})();


/* =====================================================
   HELPERS
===================================================== */

var pkg = (invitation.package || "basic").toLowerCase();
var cat = (invitation.category || "wedding").toLowerCase();
var isCouple = (
    cat === "wedding" ||
    cat === "engagement" ||
    cat === "anniversary" ||
    cat === "henna"
);
var displayDate = invitation.dateShort
    || lunaDateShort(invitation.date)
    || (function() {
        /* If the plain date fields were never saved, recover the date from the
           date part of a countdown value (e.g. "2026-09-12T14:00:00"). */
        var cd = (typeof invitation.countdown === "string") ? invitation.countdown : "";
        var m = cd.match(/^(\d{4})-(\d{2})-(\d{2})/);
        if (m) return lunaDateShort(m[1] + "-" + m[2] + "-" + m[3]);
        return "";
    })()
    || invitation.date
    || "";


/* =====================================================
   OPENING — LETTER CONTENT
===================================================== */

document.getElementById("letterEyebrow").textContent =
    lunaT("invOpen");

document.getElementById("letterNames").textContent =
    lunaDisplayNames(invitation);

document.getElementById("letterDate").textContent =
    displayDate;

document.getElementById("openButton").textContent =
    lunaT("invOpen");


/* =====================================================
   HERO — CATEGORY-AWARE NAMES
===================================================== */

(function applyTemplateLayout() {
    // Use client-specific design if available
    var finalDesignId = clientDesignId || invitation.design || "";
    var finalTemplateId = invitation.templateId || finalDesignId;
    
    var tplData = null;
    var _allTpl = (typeof lunaGetAllTemplates === "function") ? lunaGetAllTemplates() : ((typeof LUNA_TEMPLATES !== "undefined") ? LUNA_TEMPLATES : []);
    if (finalTemplateId && _allTpl.length) {
        tplData = _allTpl.find(function(t) { return t.id === finalTemplateId; });
    }
    /* Fallback: find template by design field */
    if (!tplData && finalDesignId && _allTpl.length) {
        tplData = _allTpl.find(function(t) { return t.id === finalDesignId; });
    }
    /* LOCK-IN: if this invitation was created after the versioning system,
       its visual layout was frozen into visualSnapshot at creation time.
       Prefer the snapshot so FUTURE template-library edits can never change
       an already-created customer's invitation. Pre-snapshot invitations
       keep the old live-lookup behaviour. */
    var _snapLc = (invitation && invitation.visualSnapshot && invitation.visualSnapshot.layoutConfig) || null;
    var cfg = _snapLc || (tplData && tplData.layoutConfig) || {};
    var sectionOrder = cfg.sectionOrder || ["hero","details","gallery","countdown","rsvp","story"];
    var heroType = cfg.heroType || "hero-centered";
    var bgStyle = cfg.backgroundStyle || "default";
    /* Admin-created templates may carry opening/animation type directly */
    var _theme = {};
    try { _theme = JSON.parse(localStorage.getItem("luna_invitation_theme") || "{}"); } catch(e) {}
    var clientOpening = invitation ? (invitation.openingType || invitation.openingStyle || invitation.animationType || invitation.animationStyle || "") : "";
    var snapOpening = (invitation && invitation.visualSnapshot && invitation.visualSnapshot.openingType) || "";
    var tplOpening = cfg.openingType
        || (tplData && (tplData.openingType || tplData.openingStyle || tplData.animationStyle || tplData.animationType));
    var openingType = clientOpening
        || snapOpening
        || tplOpening
        || (_theme.openingType)
        || _designatedOpening(cat, document.documentElement.getAttribute("data-material") || "", finalDesignId, finalTemplateId);

    /* Auto-designated opening — gives every invitation its own fitting,
       physically-real "wow" scene when nothing was configured manually.
       Matches the design's material family + occasion so the reveal feels
       bespoke, not a generic envelope for all. */
    function _designatedOpening(category, material, design, template) {
        var c = (category || "").toLowerCase();
        var d = (design || template || "").toLowerCase();
        /* Explicit per-design favourites (highest priority) */
        var fav = {
            "royal-gold": "royal-scroll",
            "royal-seal": "wax-seal",
            "black-gold": "luxury-romance",
            "luxe-gold": "luxury-romance",
            "golden-ring": "golden-ring",
            "oriental": "ornata",
            "orchid": "origami-lotus",
            "lotus": "origami-lotus",
            "henna": "floral-paper",
            "botanical": "floral-paper",
            "garden-bloom": "floral-paper",
            "blossom": "origami-lotus",
            "soft-rose": "origami-lotus",
            "velvet-rose": "floral-paper",
            "luxury-birthday": "stairs",
            "vintage-romance": "old-book",
            "anniversary": "old-book",
            "classic": "wax-seal",
            "little-prince": "starry-night",
            "aurora": "starry-night",
            "starry-dream": "starry-night",
            "celebration": "celebration-pop",
            "fiesta-pop": "celebration-pop",
            "kids-party": "celebration-pop",
            "executive": "editorial-card",
            "conference": "editorial-card",
            "networking": "editorial-card",
            "minimal-white": "minimal",
            "modern-chic": "editorial-card",
            "modern-classic": "minimal",
            "elegant-pearl": "minimal",
            "grand-curtain": "curtain",
            "enchanted": "glowing-door",
            "winter": "winter-drift",
            "typewriter": "typewriter",
            "storybook": "old-book",
            "flame": "candlelight",
            "bonfire": "candlelight",
            "forest": "ancient-forest",
            "magic": "magic-wand"
        };
        if (fav[d]) return fav[d];
        if (d && d.indexOf("birthday") !== -1) return "celebration-pop";
        /* Occasion-driven defaults */
        if (c === "birthday") return "golden-ring";
        if (c === "graduation") return "candlelight";
        if (c === "business") return "editorial-card";
        if (c === "kids") return "celebration-pop";
        if (c === "engagement" || c === "anniversary") return "golden-ring";
        if (c === "henna") return "floral-paper";
        /* Material-family defaults (wedding & everything else) */
        switch (material) {
            case "dark":      return "luxury-romance";
            case "botanical": return "floral-paper";
            case "rose":      return "origami-lotus";
            case "minimal":   return "minimal";
            case "pop":       return "celebration-pop";
            case "vintage":   return "wax-seal";
            case "aqua":      return "starry-night";
            default:          return "royal-scroll";
        }
    }

    /* Map openingStyle aliases to actual scene types */
    var _openingMap = {
        "floral-reveal": "floral-paper", "editorial-reveal": "editorial-card",
        "luxury-reveal": "luxury-romance", "envelope-reveal": "envelope-seal",
        "stairs-reveal": "stairs", "wax-reveal": "wax-seal",
        "curtain-reveal": "curtain", "ribbon-reveal": "ribbon",
        "door-reveal": "door", "wood-door-reveal": "wood-door",
        "starry-reveal": "starry-night", "celebration-reveal": "celebration-pop",
        "candlelight-reveal": "candlelight", "winter-reveal": "winter-drift",
        "royal-reveal": "royal-scroll", "typewriter-reveal": "typewriter",
        "magic-reveal": "magic-wand", "glow-door": "glowing-door",
        "forest-walk": "ancient-forest", "book-reveal": "old-book"
    };
    openingType = _openingMap[openingType] || openingType;

    /* Apply opening type to root element */
    document.documentElement.setAttribute("data-opening", openingType);

    /* Apply hero type class */
    var heroEl = document.getElementById("hero");
    if (heroEl) {
        heroEl.className = "hero " + heroType;
    }

    /* Apply background style to main invitation wrapper */
    var invEl = document.getElementById("invitation");
    if (invEl) {
        invEl.classList.add("bg-" + bgStyle);
    }

    /* Reorder sections */
    var sectionsEl = invEl || document.querySelector("main.invitation");
    if (sectionsEl) {
        var allSections = sectionsEl.querySelectorAll("section[id$='Section']");
        /* Build map of section elements */
        var sectionMap = {};
        allSections.forEach(function(sec) {
            var id = sec.id.replace("Section","");
            sectionMap[id] = sec;
        });
        /* Remove all and re-append in order */
        allSections.forEach(function(sec) { sec.remove(); });
        sectionOrder.forEach(function(key) {
            var el = sectionMap[key];
            if (el && !el.closest("main")) sectionsEl.appendChild(el);
        });
    }
})();

/* ===== ADMIN DECORATOR: theme, styling & ambient animation ===== */
(function applyInvitationTheme() {
    var th = {};
    try { th = JSON.parse(localStorage.getItem("luna_invitation_theme") || "{}"); } catch(e) {}

    var css = "";
    if (th.accent) css += ":root{--gold:" + th.accent + "!important;--accent:" + th.accent + "!important;--accent-light:" + th.accent + "22!important}";
    if (th.bgTint) css += "body{background:" + th.bgTint + "!important}";
    var r = parseInt(th.radius);
    if (!isNaN(r)) css += ".detail,.sig-card,.stairs-card,#rsvpForm input,#rsvpForm select,#rsvpForm textarea,.gallery-grid img{border-radius:" + r + "px!important;overflow:hidden}";
    if (th.btnStyle === "pill") css += "#invitation button{border-radius:100px!important}";
    else if (th.btnStyle === "sharp") css += "#invitation button{border-radius:0!important}";

    /* Wax seal studio — custom wax color (envelope seal + big wax scene) */
    function shadeHex(hex, amt) {
        var h = hex.replace("#", "");
        if (h.length === 3) h = h[0] + h[0] + h[1] + h[1] + h[2] + h[2];
        var r = Math.min(255, Math.max(0, parseInt(h.substr(0, 2), 16) + amt));
        var g = Math.min(255, Math.max(0, parseInt(h.substr(2, 2), 16) + amt));
        var b = Math.min(255, Math.max(0, parseInt(h.substr(4, 2), 16) + amt));
        return "#" + [r, g, b].map(function(x) { return ("0" + x.toString(16)).slice(-2); }).join("");
    }
    if (th.waxColor) {
        var wl = shadeHex(th.waxColor, 30);
        var wd = shadeHex(th.waxColor, -34);
        css += ".wax-seal-big{background:radial-gradient(circle at 34% 30%,rgba(255,255,255,.3),transparent 42%),radial-gradient(circle at 68% 74%,rgba(0,0,0,.3),transparent 48%),radial-gradient(circle at 50% 50%," + wl + "," + th.waxColor + " 72%)!important;box-shadow:inset 0 -6px 14px rgba(0,0,0,.4),inset 0 6px 10px rgba(255,235,205,.3),0 14px 30px " + wd + "55!important}";
        css += ".wax-half-l,.wax-half-r{background:linear-gradient(135deg," + wl + "," + wd + ")!important}";
    }

    if (th.font) {
        try {
            var fl = document.createElement("link");
            fl.rel = "stylesheet";
            fl.href = "https://fonts.googleapis.com/css2?family=" + encodeURIComponent(th.font).replace(/%20/g, "+") + ":wght@300;400;500;600;700&display=swap";
            document.head.appendChild(fl);
        } catch(e) {}
        css += "#invitation h1,#invitation h2,#invitation h3,.hero-content h1{font-family:'" + th.font + "',serif!important}";
    }

    var EFFECTS = {
        petals:     ["🌸", "🌺"],
        rosepetals: ["🌹", "🌸", "💮"],
        sparkles:   ["✨", "⭐"],
        hearts:     ["💗", "💞", "❤︎"],
        snow:       ["❄", "❅", "❆"],
        stars:      ["✦", "✧", "⋆"],
        leaves:     ["🍃", "🍂"],
        bubbles:    ["◌", "◯", "◍"]
    };
    if (th.effect && EFFECTS[th.effect]) {
        css += "@keyframes lunaFall{0%{transform:translateY(-8vh) translateX(0) rotate(0deg);opacity:0}8%{opacity:1}90%{opacity:.85}100%{transform:translateY(106vh) translateX(7vw) rotate(320deg);opacity:0}}" +
               ".luna-deco{position:fixed;top:-6vh;z-index:1500;pointer-events:none;-webkit-user-select:none;user-select:none;animation:lunaFall linear infinite;text-shadow:0 1px 6px rgba(0,0,0,.08)}" +
               "@media(prefers-reduced-motion:reduce){.luna-deco{display:none!important}}";
        var chars = EFFECTS[th.effect];
        for (var i = 0; i < 16; i++) {
            var sp = document.createElement("span");
            sp.className = "luna-deco";
            sp.textContent = chars[i % chars.length];
            sp.style.left = (Math.random() * 98) + "vw";
            sp.style.fontSize = (11 + Math.random() * 18) + "px";
            sp.style.animationDuration = (7 + Math.random() * 9) + "s";
            sp.style.animationDelay = (-Math.random() * 12) + "s";
            sp.style.opacity = (0.45 + Math.random() * 0.5).toFixed(2);
            document.body.appendChild(sp);
        }
    }

    /* Per-template design identity (colors/font from the invitation's own
       template) — applied AFTER the global admin theme so it wins */
    try {
        var _tplId = (typeof clientDesignId !== "undefined" && clientDesignId) || invitation.design || invitation.templateId || "";
        var _tplAll = (typeof lunaGetAllTemplates === "function") ? lunaGetAllTemplates() : [];
        var _tpl = _tplAll.find(function(t) { return t.id === _tplId; });
        var td = (_tpl && (_tpl.design || null)) || {};
        /* LOCK-IN: a visualSnapshot freezes the exact template colours/font at
           creation time, so later edits to a template's design can't recolour an
           existing customer's invitation. Only untagged (pre-versioning) invites
           use the live template design. */
        var _snapD = (invitation && invitation.visualSnapshot && invitation.visualSnapshot.design) || null;
        if (_snapD) {
            if (_snapD.primaryColor) td = Object.assign({}, td, { primaryColor: _snapD.primaryColor, secondaryColor: _snapD.secondaryColor || _snapD.primaryColor });
            if (_snapD.font) td = Object.assign({}, td, { font: _snapD.font });
        }
        /* Distinct colour identity for EVERY template:
           use design colours when present, otherwise fall back to the same
           deterministic per-template palette used on the homepage cards, so no
           invitation renders in the default beige and no two look the same */
        var _acc = td.primaryColor || td.secondaryColor;
        var _acc2 = td.secondaryColor || td.primaryColor;
        var _tplId2 = (_tpl && _tpl.id) || _tplId;
        if ((!_acc || !_acc2) && typeof lunaTemplatePalette === "function") {
            try {
                var _pal = lunaTemplatePalette(_tpl || { id: _tplId2 });
                if (_pal && _pal.c1) { _acc = _acc || _pal.c1; _acc2 = _acc2 || _pal.c2; }
            } catch (ePal) {}
        }
        if (_acc && _acc2) {
            css += ":root{--gold:" + _acc + "!important;--accent:" + _acc + "!important;--accent-light:" + _acc2 + "33!important;--tpl-c1:" + _acc + "!important;--tpl-c2:" + _acc2 + "!important}";
        }
        if (td.font && (!th.font || td.font !== th.font)) {
            try {
                var tfl = document.createElement("link");
                tfl.rel = "stylesheet";
                tfl.href = "https://fonts.googleapis.com/css2?family=" + encodeURIComponent(td.font).replace(/%20/g, "+") + ":wght@300;400;500;600;700&display=swap";
                document.head.appendChild(tfl);
            } catch (e2) {}
            css += "#invitation h1,#invitation h2,#invitation h3,.hero-content h1{font-family:'" + td.font + "',serif!important}";
        }
    } catch (eTpl) {}

    if (css) {
        var st = document.createElement("style");
        st.id = "lunaInvitationTheme";
        st.textContent = css;
        document.head.appendChild(st);
    }
})();

/* Per-design hero watermark — a giant faded monogram/motif behind the
   names, injected as a dedicated `.luna-mark` element (kept separate from
   the `.hero::before/::after` overlays so nothing collides). */
(function injectLunaMark() {
    var _mk = [];
    function _m(id, glyph, cls) { _mk[id] = [glyph, cls || ""]; }
    /* wedding */
    _m("amelia","A"); _m("amour","A"); _m("noir","N"); _m("serena","S");
    _m("garden","❧","is-floral"); _m("royal-gold","R"); _m("blossom","✿","is-floral");
    _m("editorial","&"); _m("luxe-gold","L"); _m("velvet-rose","V","is-floral");
    _m("minimal-white","M"); _m("vintage-romance","❦","is-floral"); _m("black-gold","B");
    _m("soft-blush","S"); _m("botanical","❧","is-floral"); _m("modern-classic","&");
    _m("enchanted","E","is-floral"); _m("royal-seal","M"); _m("velvet-luxe","V","is-floral");
    _m("typewriter-elegance","&"); _m("candlelight-gold","C"); _m("winter-drift","❄","is-floral");
    _m("grand-premiere","G"); _m("grand-staircase","G","is-floral"); _m("sealed-with-love","♥","is-floral");
    _m("starry-vow","✦","is-floral"); _m("grand-door","&"); _m("love-letter","L","is-floral");
    _m("venue-journey","&"); _m("envelope-reveal","E"); _m("party-journey","★","is-floral");
    _m("conference-journey","C");
    /* engagement / henna */
    _m("classic","C"); _m("romantic-bloom","✿","is-floral"); _m("elegant-pearl","P");
    _m("modern-chic","&"); _m("soft-rose","R"); _m("grand-curtain","C"); _m("starry-dream","✦","is-floral");
    _m("royal-scroll","R","is-floral"); _m("spotlight","S"); _m("ascend","A","is-floral");
    _m("oriental","O","is-floral"); _m("traditional-henna","❦","is-floral"); _m("garden-bloom","❧","is-floral");
    _m("backstage-henna","✿","is-floral");
    /* birthday / grad / baby / business */
    _m("florence","F"); _m("elegant-birthday","E"); _m("luxury-birthday","B","is-floral");
    _m("kids-party","✿","is-floral"); _m("fiesta-pop","★","is-floral"); _m("showtime","★","is-floral");
    _m("unwrap-gift","✓","is-floral"); _m("aurora","A"); _m("modern-grad","&");
    _m("luxury-grad","G"); _m("steps-to-success","G","is-floral"); _m("sweet-arrival","✿","is-floral");
    _m("little-prince","✦","is-floral"); _m("executive","E"); _m("conference","C");
    _m("networking","&"); _m("digital-card","D"); _m("qr-contact","❏","is-floral");
    _m("corporate-profile","C"); _m("launch-stage","L"); _m("anniversary","&");
    _m("celebration","★","is-floral");

    try {
        var _did = (typeof finalDesignId !== "undefined" && finalDesignId) ||
                   (typeof finalDesign !== "undefined" && finalDesign) ||
                   (document.documentElement.getAttribute("data-design") || "").toLowerCase();
        var _ent = _mk[_did] || _mk[(document.documentElement.getAttribute("data-design") || "").toLowerCase()];
        if (!_ent) return;
        var _hero = document.querySelector(".hero");
        if (!_hero) return;
        var _heroContent = _hero.querySelector(".hero-content");
        var _host = _heroContent || _hero;
        if (_host.querySelector(".luna-mark")) return;
        var _i = document.createElement("i");
        _i.className = "luna-mark" + (_ent[1] ? " " + _ent[1] : "");
        _i.setAttribute("aria-hidden", "true");
        _i.textContent = _ent[0];
        _host.insertBefore(_i, _host.firstChild);
    } catch (eMark) {}
})();

document.getElementById("heroEyebrow").textContent =
    lunaInvitationHeading(invitation);

document.getElementById("date").textContent =
    displayDate;

function lunaFitHeroNames(container) {
    if (!container) return;
    var names = container.querySelectorAll(".name");
    if (!names.length) return;
    var longest = "";
    for (var i = 0; i < names.length; i++) {
        var t = (names[i].textContent || "").replace(/\s+/g, " ").trim();
        if (t.length > longest.length) longest = t;
    }
    var len = longest.length;
    if (len <= 9) return;
    var cap;
    if (len <= 13)      cap = "clamp(52px,9vw,104px)";
    else if (len <= 18) cap = "clamp(42px,7vw,80px)";
    else                cap = "clamp(34px,5.5vw,64px)";
    for (var j = 0; j < names.length; j++) {
        names[j].style.fontSize = cap;
    }
}

(function buildHeroNames() {

    var container = document.getElementById("heroNames");

    if (isCouple) {

        var bride = invitation.bride || "";
        var groom = invitation.groom || "";

        var html = '<span class="name">' + lunaEscapeHtml(bride) + '</span>';

        if (groom) {
            html += '<span class="hero-amp">&amp;</span>';
            html += '<span class="name">' + lunaEscapeHtml(groom) + '</span>';
        }

        container.innerHTML = html;

    } else if (cat === "birthday") {

        var name = invitation.bride || invitation.celebrant || "";
        container.innerHTML =
            '<span class="name" style="font-size:clamp(48px,10vw,110px)">' +
            lunaEscapeHtml(name) +
            '</span>';

    } else if (cat === "graduation") {

        var name2 = invitation.bride || invitation.graduate || "";
        container.innerHTML =
            '<span class="name" style="font-size:clamp(48px,10vw,110px)">' +
            lunaEscapeHtml(name2) +
            '</span>';

    } else if (cat === "business") {

        var eventName = invitation.eventName || invitation.companyName || invitation.bride || "";
        container.innerHTML =
            '<span class="name" style="font-size:clamp(36px,7vw,80px)">' +
            lunaEscapeHtml(eventName) +
            '</span>';

    } else {

        container.innerHTML =
            '<span class="name" style="font-size:clamp(48px,10vw,110px)">' +
            lunaT("invRsvpHeading") +
            '</span>';

    }

    lunaFitHeroNames(container);

})();


/* =====================================================
   HERO — VIDEO BACKGROUND
===================================================== */

if (invitation.videoUrl) {

    var hero = document.getElementById("hero");
    var _isYT = /(?:youtube\.com\/(?:watch\?v=|embed\/|shorts\/|live\/)|youtu\.be\/)/.test(invitation.videoUrl);

    if (_isYT) {
        /* YouTube — use iframe embed, but only boot it when the invitation is
           revealed so it doesn't compete with the opening scene on slow mobile */
        var _ytMatch = invitation.videoUrl.match(/(?:youtube\.com\/(?:watch\?v=|embed\/|shorts\/|live\/)|youtu\.be\/)([\w-]{6,})/);
        var _ytId = _ytMatch ? _ytMatch[1] : "";
        if (_ytId) {
            var _ytInit = function() {
                if (_ytInit._done) return;
                _ytInit._done = true;
                var iframe = document.createElement("iframe");
                iframe.src = "https://www.youtube.com/embed/" + _ytId + "?autoplay=1&mute=1&loop=1&playlist=" + _ytId + "&controls=0&showinfo=0&rel=0&playsinline=1&enablejsapi=1";
                iframe.allow = "autoplay;encrypted-media;fullscreen";
                iframe.setAttribute("playsinline", "");
                iframe.className = "hero-video-bg";
                iframe.style.cssText = "position:absolute;top:0;left:0;width:100%;height:100%;border:none;";
                hero.insertBefore(iframe, hero.firstChild);

                /* Play button overlay in case autoplay is blocked */
                var ytPlay = document.createElement("button");
                ytPlay.className = "hero-yt-play";
                ytPlay.setAttribute("aria-label", "Video oynat");
                ytPlay.style.cssText = "position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);width:72px;height:72px;border-radius:50%;background:rgba(255,255,255,.15);border:2px solid rgba(255,255,255,.3);color:#fff;display:flex;align-items:center;justify-content:center;cursor:pointer;z-index:2;pointer-events:none;opacity:0;transition:opacity .3s";
                ytPlay.innerHTML = '<svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor"><polygon points="5,3 19,12 5,21"></polygon></svg>';
                hero.appendChild(ytPlay);

                /* Show play button on hover or if autoplay fails */
                hero.addEventListener("mouseenter", function(){ ytPlay.style.opacity = "1"; ytPlay.style.pointerEvents = "auto"; });
                hero.addEventListener("mouseleave", function(){ ytPlay.style.opacity = "0"; ytPlay.style.pointerEvents = "none"; });

                /* Try to play via YouTube API on click */
                ytPlay.addEventListener("click", function(e){
                    e.stopPropagation();
                    iframe.contentWindow.postMessage('{"event":"command","func":"playVideo","args":[]}', '*');
                    ytPlay.style.opacity = "0";
                    ytPlay.style.pointerEvents = "none";
                });

                /* Detect if autoplay was blocked - show play button */
                var _ytCheck = 0;
                function checkYTAutoplay(){
                    if (_ytCheck++ > 20) return; // ~2s
                    iframe.contentWindow.postMessage('{"event":"command","func":"getPlayerState","args":[]}', '*');
                }
                window.addEventListener("message", function(ev){
                    if (ev.data && ev.data.info && ev.data.info.playerState === 5) { // video cued/unstarted
                        ytPlay.style.opacity = "1";
                        ytPlay.style.pointerEvents = "auto";
                    }
                });
                setTimeout(checkYTAutoplay, 1000);
            };
            (window.__lunaOnReveal = window.__lunaOnReveal || []).push(_ytInit);
            if (window.__lunaRevealed) _ytInit();
        }
    } else {
        /* Regular video file */
        var video = document.createElement("video");
        video.muted = true;
        video.loop = true;
        video.playsInline = true;
        video.className = "hero-video-bg";
        /* Auto-play once the opening scene is revealed (matches user flow),
           so the video doesn't download/compete during the opening */
        video.autoplay = true;
        window.__lunaHeroVideo = video;
        var _vu = invitation.videoUrl;
        var _vdInit = function() {
            if (!video.getAttribute("src")) {
                if (_vu.indexOf("__idb:") === 0) {
                    lunaIDBLoad(_vu.slice(6), function(blob) {
                        if (blob) {
                            video.src = URL.createObjectURL(blob);
                            video.play().catch(function(){});
                        }
                    });
                } else {
                    /* This page lives in /data/, so repo-relative media paths (media/videos/...) need ../ */
                    var _v2 = _vu;
                    if (/^media\//i.test(_v2)) _v2 = "../" + _v2;
                    video.src = _v2;
                    var _tryPlay = function() { video.play().catch(function(){}); };
                    video.addEventListener("loadeddata", _tryPlay);
                    _tryPlay();
                }
            }
        };
        (window.__lunaOnReveal = window.__lunaOnReveal || []).push(_vdInit);
        hero.insertBefore(video, hero.firstChild);
        if (window.__lunaRevealed) _vdInit();
    }

    var overlay = document.createElement("div");
    overlay.className = "hero-video-overlay";
    hero.insertBefore(overlay, document.getElementById("heroContent"));

    /* Keep the client-selected cover authoritative after the video setup.
       This block runs after the initial hero assignment and otherwise would
       replace the chosen image with the template CSS variable. */
    if (postOpeningHeroImage) {
        hero.style.setProperty("background-image", "url('" + postOpeningHeroImage + "')", "important");
        hero.style.setProperty("background-size", "cover", "important");
        hero.style.setProperty("background-position", "center", "important");
    } else {
        hero.style.background = "var(--cover)";
    }

}


/* =====================================================
   STORY SECTION (Luxury only)
===================================================== */

if (pkg !== "luxury") {
    document.getElementById("storySection").hidden = true;
}

document.getElementById("storyEyebrow").textContent =
    lunaT("invStoryTitle");

document.getElementById("storyHeading").innerHTML =
    lunaT("invStoryHeading");

/* The client's written text may be stored in `message` (single-message form)
   rather than `story`. Fall back so the guest's personal words always show. */
var storySource = invitation.story || invitation.message || "";
if (storySource) {
    document.getElementById("story").innerHTML =
        lunaFormatStory(storySource);
}


/* =====================================================
   DETAILS SECTION
===================================================== */

document.getElementById("detailsEyebrow").textContent =
    lunaT("invDetailsTitle");

document.getElementById("detailsHeading").innerHTML =
    lunaT("invDetailsHeading");

document.getElementById("dateLabel").textContent =
    lunaT("invDateLabel");

document.getElementById("detailDate").textContent =
    displayDate;

document.getElementById("timeLabel").textContent =
    lunaT("invTimeLabel");

document.getElementById("time").textContent =
    invitation.time || "";

document.getElementById("venueLabel").textContent =
    lunaT("invVenueLabel");

document.getElementById("venue").textContent =
    invitation.venue || "";

document.getElementById("location").textContent =
    invitation.location || "";

var mapButton = document.getElementById("mapButton");
mapButton.textContent = lunaT("invMapBtn");

if (invitation.map) {
    mapButton.href = invitation.map;
} else {
    mapButton.hidden = true;
}

/* Time subtext based on category */
(function() {
    var sub = document.getElementById("timeSubtext");
    if (cat === "wedding" || cat === "engagement" || cat === "anniversary" || cat === "henna") {
        /* Qonaqların qarşılanması — keep generic */
    }
})();

/* Day name */
(function() {
    var dayEl = document.getElementById("dayName");
    var d = null;

    /* First try lunaCountdownTarget (handles countdown ISO field) */
    var countdownStr = typeof lunaCountdownTarget === "function" ? lunaCountdownTarget(invitation) : null;
    if (countdownStr) {
        d = new Date(countdownStr);
    }

    /* Fallback: YYYY-MM-DD date format */
    if ((!d || isNaN(d.getTime())) && invitation.date && /^\d{4}-\d{2}-\d{2}$/.test(invitation.date)) {
        d = new Date(invitation.date + "T12:00:00");
    }

    if (d && !isNaN(d.getTime())) {
        var dayNames = {
            az: ["Bazar","Bazar ertəsi","Çərşənbə axşamı","Çərşənbə","Cümə axşamı","Cümə","Şənbə"],
            en: ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],
            ru: ["Воскресенье","Понедельник","Вторник","Среда","Четверг","Пятница","Суббота"],
            tr: ["Pazar","Pazartesi","Salı","Çarşamba","Perşembe","Cuma","Cumartesi"]
        };
        var lang = LUNA_LANG || "az";
        var arr = dayNames[lang] || dayNames.az;
        dayEl.textContent = arr[d.getDay()];
    } else {
        dayEl.textContent = "";
    }
})();


/* =====================================================
   GALLERY (Premium / Luxury)
   Gallery style from template, images from customer data
===================================================== */

if (pkg !== "premium" && pkg !== "luxury") {
    document.getElementById("gallerySection").hidden = true;
}

document.getElementById("galleryEyebrow").textContent =
    lunaT("invGalleryTitle");

document.getElementById("galleryHeading").textContent =
    lunaT("invGalleryHeading");

var galleryEl = document.getElementById("gallery");
var galleryImages = [];

/* Determine gallery style from template data (built-in + admin-created) */
var currentTemplate = null;
var _allTplGallery = (typeof lunaGetAllTemplates === "function") ? lunaGetAllTemplates() : ((typeof LUNA_TEMPLATES !== "undefined") ? LUNA_TEMPLATES : []);
if (invitation.templateId && _allTplGallery.length) {
    currentTemplate = _allTplGallery.find(function(t) {
        return t.id === invitation.templateId;
    }) || null;
}

/* LOCK-IN: visualSnapshot freezes the gallery layout at creation time so future
   template edits can't re-lay-out an existing customer's gallery. */
var galleryStyle = (invitation.visualSnapshot && invitation.visualSnapshot.galleryStyle) ||
                   ((currentTemplate && currentTemplate.galleryStyle) || "editorial");
galleryEl.className = "gallery gallery-style-" + galleryStyle + " reveal-scale";

/* Use customer images ONLY (separated from template demo images) */
var customerImages = [];

/* Gallery is opt-in. A client's cover/scroll hero must never be copied into
   the gallery, and an invitation with no explicit gallery selection should
   not receive category demo photos. */
if (invitation.galleryEnabled !== false && invitation.images && invitation.images.length) {
    customerImages = invitation.images.filter(function(src) {
        return src && typeof src === "string" && src.trim() !== "";
    });
    /* Drop exact duplicate photos (e.g. the same poster re-uploaded in the
       gallery) so guests never see the same picture twice in a row. */
    var _seenImg = {};
    customerImages = customerImages.filter(function(src) {
        if (_seenImg[src]) return false;
        _seenImg[src] = true;
        return true;
    });
}

/* The selected post-opening image is the invitation's actual hero image.
   It must be applied after all data and design CSS have loaded, otherwise
   the template's default cover can win over the client selection. */
var postOpeningHeroImage = invitation.cover || invitation.photoInvitation || "";

/* Apply the client photo to BOTH the hero and the parallax backdrop layer.
   The backdrop (`.lx-hero-bg`) is injected by js/physical-invitation.js at
   DOMContentLoaded — i.e. BEFORE this async init resolves the invitation
   from the cloud — so it starts out painted with the design's DEFAULT cover.
   If left alone it sits on top of the hero and hides the client's photo, so
   we re-point it at the real image the moment the cover is known. */
function lunaApplyClientHeroCover(img) {
    if (!img) return;
    var _hero = document.getElementById("hero");
    if (!_hero) return;

    _hero.style.setProperty("background-image", "url('" + img + "')", "important");
    _hero.style.setProperty("background-size", "cover", "important");
    _hero.style.setProperty("background-position", "center", "important");

    /* Suppress the decorative gradient/foil overlays that would otherwise
       sit on top of the client's image and hide it. */
    _hero.classList.add("has-client-cover");

    /* Keep the parallax backdrop in sync — it paints above the hero. */
    var _lx = _hero.querySelector(".lx-hero-bg");
    if (_lx) {
        _lx.classList.add("lx-hero-photo");
        _lx.style.backgroundImage = "url('" + img + "')";
    }
}

if (postOpeningHeroImage) {
    document.documentElement.style.setProperty("--cover", "url('" + postOpeningHeroImage + "')");
    lunaApplyClientHeroCover(postOpeningHeroImage);
}

/* Hide gallery entirely if no valid customer images */
if (customerImages.length === 0) {
    document.getElementById("gallerySection").hidden = true;
} else {
    galleryImages = customerImages.slice(0, 20);

    galleryImages.forEach(function(src, i) {
        var img = document.createElement("img");
        img.alt = lunaDisplayNames(invitation) + " — " + (i + 1);
        img.loading = "lazy";
        img.dataset.index = i;

        /* Image error fallback: hide broken images gracefully */
        img.onerror = function() {
            this.style.display = "none";
            /* If all images fail, hide the whole gallery section */
            var visibleImgs = galleryEl.querySelectorAll("img:not([style*='display: none'])");
            if (visibleImgs.length === 0) {
                document.getElementById("gallerySection").hidden = true;
            }
        };

        if (src.indexOf("__idb:") === 0) {
            lunaIDBLoad(src.slice(6), function(blob) {
                if (blob) img.src = URL.createObjectURL(blob);
            });
        } else {
            img.src = src;
        }

        galleryEl.appendChild(img);
    });
}


/* =====================================================
   LIGHTBOX
===================================================== */

var lightbox = document.getElementById("lightbox");
var lightboxImg = document.getElementById("lightboxImg");
lightboxImg.onerror = function() {
    this.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='300'%3E%3Crect fill='%23F5EDE3' width='400' height='300'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' fill='%23C4A882' font-family='DM Sans' font-size='14'%3EImage unavailable%3C/text%3E%3C/svg%3E";
};
var lightboxCounter = document.getElementById("lightboxCounter");
var lightboxIndex = 0;

function lightboxOpen(index) {
    if (!galleryImages.length) return;
    lightboxIndex = index;
    lightboxImg.src = galleryImages[lightboxIndex];
    lightboxCounter.textContent =
        (lightboxIndex + 1) + " / " + galleryImages.length;
    lightbox.classList.add("active");
    document.body.style.overflow = "hidden";
}

function lightboxClose() {
    lightbox.classList.remove("active");
    document.body.style.overflow = "";
}

function lightboxPrev() {
    lightboxIndex =
        (lightboxIndex - 1 + galleryImages.length) % galleryImages.length;
    lightboxImg.src = galleryImages[lightboxIndex];
    lightboxCounter.textContent =
        (lightboxIndex + 1) + " / " + galleryImages.length;
}

function lightboxNext() {
    lightboxIndex =
        (lightboxIndex + 1) % galleryImages.length;
    lightboxImg.src = galleryImages[lightboxIndex];
    lightboxCounter.textContent =
        (lightboxIndex + 1) + " / " + galleryImages.length;
}

galleryEl.addEventListener("click", function(e) {
    if (e.target.tagName === "IMG") {
        var idx = parseInt(e.target.dataset.index, 10);
        if (!isNaN(idx)) lightboxOpen(idx);
    }
});

document.getElementById("lightboxClose").addEventListener("click", lightboxClose);
document.getElementById("lightboxPrev").addEventListener("click", lightboxPrev);
document.getElementById("lightboxNext").addEventListener("click", lightboxNext);

lightbox.addEventListener("click", function(e) {
    if (e.target === lightbox) lightboxClose();
});

document.addEventListener("keydown", function(e) {
    if (!lightbox.classList.contains("active")) return;
    if (e.key === "Escape") lightboxClose();
    if (e.key === "ArrowLeft") lightboxPrev();
    if (e.key === "ArrowRight") lightboxNext();
});


/* =====================================================
   COUNTDOWN (Premium / Luxury)
===================================================== */

if (pkg !== "premium" && pkg !== "luxury") {
    document.getElementById("countdownSection").hidden = true;
}

document.getElementById("countdownEyebrow").textContent =
    lunaT("invCountdownTitle");

document.getElementById("countdownHeading").textContent =
    lunaT("invCountdownHeading");

document.getElementById("daysLabel").textContent = lunaT("invDays");
document.getElementById("hoursLabel").textContent = lunaT("invHours");
document.getElementById("minutesLabel").textContent = lunaT("invMinutes");
document.getElementById("secondsLabel").textContent = lunaT("invSeconds");

function updateCountdown() {

    var daysEl = document.getElementById("days");
    var hoursEl = document.getElementById("hours");
    var minutesEl = document.getElementById("minutes");
    var secondsEl = document.getElementById("seconds");

    /* Build target date explicitly — avoid parsing issues */
    var target = null;

    /* First try lunaCountdownTarget (handles countdown ISO field + date fallback) */
    var countdownStr = typeof lunaCountdownTarget === "function" ? lunaCountdownTarget(invitation) : null;
    if (countdownStr) {
        target = new Date(countdownStr);
    }

    /* Fallback: YYYY-MM-DD date format */
    if ((!target || isNaN(target.getTime())) && invitation.date && /^\d{4}-\d{2}-\d{2}$/.test(invitation.date)) {
        var parts = invitation.date.split("-");
        var timeParts = (invitation.time || "19:00").split(":");
        target = new Date(
            parseInt(parts[0], 10),
            parseInt(parts[1], 10) - 1,
            parseInt(parts[2], 10),
            parseInt(timeParts[0], 10) || 19,
            parseInt(timeParts[1], 10) || 0,
            0, 0
        );
    }

    if (!target || isNaN(target.getTime())) {
        /* No usable event date — hide the countdown instead of showing a
           frozen "00:00:00:00" that looks broken to guests. */
        document.getElementById("countdownSection").hidden = true;
        return;
    }

    var now = new Date();
    var difference = target.getTime() - now.getTime();

    if (difference <= 0) {
        daysEl.textContent = "00";
        hoursEl.textContent = "00";
        minutesEl.textContent = "00";
        secondsEl.textContent = "00";
        document.getElementById("countdownHeading").textContent = lunaT("invToday");
        return;
    }

    var days = Math.floor(difference / (1000 * 60 * 60 * 24));
    var hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    var minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = Math.floor((difference % (1000 * 60)) / 1000);

    daysEl.textContent = String(days).padStart(2, "0");
    hoursEl.textContent = String(hours).padStart(2, "0");
    minutesEl.textContent = String(minutes).padStart(2, "0");
    secondsEl.textContent = String(seconds).padStart(2, "0");
}

updateCountdown();
setInterval(updateCountdown, 1000);


/* =====================================================
   RSVP (Premium / Luxury)
===================================================== */

if (pkg !== "premium" && pkg !== "luxury") {
    document.getElementById("rsvpSection").hidden = true;
}

document.getElementById("rsvpHeading").textContent =
    lunaT("invRsvpHeading");

var rsvpCatText = lunaRsvpText(invitation);
document.getElementById("rsvpText").textContent =
    rsvpCatText || lunaT("invRsvpText");

document.getElementById("rsvpButton").textContent =
    lunaT("invRsvpBtn");

document.getElementById("rsvpOptYes").textContent =
    lunaT("invRsvpYes");
document.getElementById("rsvpOptMaybe").textContent =
    lunaT("invRsvpMaybe");
document.getElementById("rsvpOptNo").textContent =
    lunaT("invRsvpNo");

document.getElementById("rsvpSubmitBtn").textContent =
    lunaT("invRsvpSubmit");

document.getElementById("rsvpGuests").placeholder = "1";

var _rsvpNameLabel = document.getElementById("rsvpNameLabel");
if (_rsvpNameLabel) _rsvpNameLabel.textContent =
    LUNA_LANG === "en" ? "Your name" :
    LUNA_LANG === "ru" ? "Ваше имя" :
    LUNA_LANG === "tr" ? "Adınız" :
    "Adınız";

var _rsvpMsgLabel = document.getElementById("rsvpMessageLabel");
if (_rsvpMsgLabel) _rsvpMsgLabel.textContent =
    LUNA_LANG === "en" ? "Message (optional)" :
    LUNA_LANG === "ru" ? "Сообщение (необязательно)" :
    LUNA_LANG === "tr" ? "Mesaj (isteğe bağlı)" :
    "Mesaj (ixtiyari)";

document.getElementById("rsvpThanks").textContent =
    lunaT("invRsvpThanks");


var rsvpButton = document.getElementById("rsvpButton");
var rsvpForm = document.getElementById("rsvpForm");
var rsvpThanks = document.getElementById("rsvpThanks");
var rsvpCounts = document.getElementById("rsvpCounts");

function renderRsvpCounts() {
    var rsvps = lunaGetRsvps(invitationId);
    if (rsvps.length === 0) {
        rsvpCounts.hidden = true;
        return;
    }
    var yes = rsvps.filter(function(r) { return r.status === "yes"; }).length;
    var maybe = rsvps.filter(function(r) { return r.status === "maybe"; }).length;
    var no = rsvps.filter(function(r) { return r.status === "no"; }).length;

    document.getElementById("rsvpYesCount").innerHTML =
        "<strong>" + yes + "</strong>" + lunaT("invYesCount");
    document.getElementById("rsvpMaybeCount").innerHTML =
        "<strong>" + maybe + "</strong>" + lunaT("invMaybeCount");
    document.getElementById("rsvpNoCount").innerHTML =
        "<strong>" + no + "</strong>" + lunaT("invNoCount");

    rsvpCounts.hidden = false;
}

renderRsvpCounts();

rsvpButton.addEventListener("click", function() {
    rsvpForm.hidden = false;
    rsvpButton.hidden = true;
});

rsvpForm.addEventListener("submit", function(event) {
    event.preventDefault();

    var guestCount = parseInt(
        document.getElementById("rsvpGuests").value, 10
    ) || 1;

    var message = document.getElementById("rsvpMessage").value.trim();

    lunaSaveRsvp(invitationId, {
        name: document.getElementById("rsvpName").value.trim(),
        status: document.getElementById("rsvpStatus").value,
        guests: guestCount,
        message: message,
        at: new Date().toISOString()
    });

    rsvpForm.hidden = true;
    rsvpThanks.hidden = false;
    document.getElementById("rsvpName").value = "";
    document.getElementById("rsvpGuests").value = "1";
    document.getElementById("rsvpMessage").value = "";
    renderRsvpCounts();
});


/* =====================================================
   MODERN RSVP — segmented status + guest stepper
   (native select stays synced for submit logic)
===================================================== */

(function rsvpModern() {

    var statusSel = document.getElementById("rsvpStatus");
    var segmented = document.getElementById("rsvpSegmented");

    /* Segmented control ↔ hidden select sync */
    if (statusSel && segmented) {

        var segBtns = segmented.querySelectorAll(".rsvp-seg");

        var syncSeg = function() {
            segBtns.forEach(function(b) {
                b.classList.toggle(
                    "active",
                    b.getAttribute("data-val") === statusSel.value
                );
                b.setAttribute(
                    "aria-checked",
                    b.getAttribute("data-val") === statusSel.value ? "true" : "false"
                );
            });
        };

        segBtns.forEach(function(btn) {
            /* Labels come from the already-translated <option> texts */
            var opt = document.getElementById(
                "rsvpOpt" + btn.getAttribute("data-val").charAt(0).toUpperCase() +
                btn.getAttribute("data-val").slice(1)
            );
            var label = btn.querySelector("span");
            if (opt && label) label.textContent = opt.textContent;

            btn.addEventListener("click", function() {
                statusSel.value = this.getAttribute("data-val");
                syncSeg();
            });
        });

        syncSeg();
    }

    /* Guest stepper */
    var guests = document.getElementById("rsvpGuests");
    var minus = document.getElementById("rsvpGuestMinus");
    var plus = document.getElementById("rsvpGuestPlus");

    if (guests && minus && plus) {

        var clampGuests = function() {
            var v = parseInt(guests.value, 10);
            if (isNaN(v) || v < 1) v = 1;
            if (v > 20) v = 20;
            guests.value = v;
        };

        minus.addEventListener("click", function() {
            guests.value = (parseInt(guests.value, 10) || 1) - 1;
            clampGuests();
        });

        plus.addEventListener("click", function() {
            guests.value = (parseInt(guests.value, 10) || 1) + 1;
            clampGuests();
        });

        guests.addEventListener("change", clampGuests);
    }

    /* Re-sync segmented labels if language changes at runtime */
    var _origRsvpSetLang = window.lunaSetLanguage;
    if (typeof _origRsvpSetLang === "function") {
        window.lunaSetLanguage = function(lang) {
            _origRsvpSetLang(lang);
            if (!segmented) return;
            segmented.querySelectorAll(".rsvp-seg").forEach(function(btn) {
                var opt = document.getElementById(
                    "rsvpOpt" + btn.getAttribute("data-val").charAt(0).toUpperCase() +
                    btn.getAttribute("data-val").slice(1)
                );
                var label = btn.querySelector("span");
                if (opt && label) label.textContent = opt.textContent;
            });
        };
    }

})();


/* =====================================================
   MUSIC (Luxury only)
===================================================== */

var musicButton = document.getElementById("musicButton");
var musicPlayer = document.getElementById("musicPlayer");

if (pkg !== "luxury" || !invitation.music) {
    musicButton.hidden = true;
} else {
    musicPlayer.src = invitation.music;
    musicButton.hidden = false;
    musicButton.textContent = lunaT("invMusicBtn");

    musicButton.addEventListener("click", function() {
        if (musicPlayer.paused) {
            musicPlayer.play();
            musicButton.textContent = lunaT("invMusicMute");
        } else {
            musicPlayer.pause();
            musicButton.textContent = lunaT("invMusicBtn");
        }
    });
}


/* =====================================================
   FOOTER
===================================================== */

document.getElementById("footerNames").textContent =
    lunaDisplayNames(invitation);

document.getElementById("footerTagline").textContent =
    lunaT("invLunaFooter");


/* =====================================================
   SCROLL REVEAL
===================================================== */

(function() {
    var reveals = document.querySelectorAll(
        ".reveal-up, .reveal-scale, .reveal-left, .reveal-right, .stagger-reveal"
    );

    if (!reveals.length) return;

    var observer = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry) {
            if (entry.isIntersecting) {
                entry.target.classList.add("visible");
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.12,
        rootMargin: "0px 0px -30px 0px"
    });

    reveals.forEach(function(el) {
        observer.observe(el);
    });
})();


/* =====================================================
   PARALLAX HERO EFFECT
===================================================== */

/* Hero scroll-parallax removed: couple names stay rock-still while the
   invitation scrolls (no drifting names, no fading hero content). */

/* =====================================================
   POINTER TILT HERO + AMBIENT CURSOR GLOW + INTERACTIVE
   A real, luxurious physical depth: the hero gently tilts
   and a soft light follows the cursor. Sections get a
   subtle magnetic hover on their art.
===================================================== */
(function() {
    /* Pointer-tilt removed: names no longer follow the cursor. */

    /* ---- Ambient cursor light (golden orb) on hero & opening ---- */
    function makeGlow(scope) {
        var el = document.getElementById(scope);
        if (!el || !window.matchMedia || !window.matchMedia("(pointer:fine)").matches) return;
        var orb = document.createElement("i");
        orb.className = "luna-cursor-glow";
        el.appendChild(orb);
        el.addEventListener("pointermove", function(e) {
            var r = el.getBoundingClientRect();
            orb.style.setProperty("--gx", (e.clientX - r.left) + "px");
            orb.style.setProperty("--gy", (e.clientY - r.top) + "px");
        });
        el.addEventListener("pointerleave", function() {
            orb.style.opacity = "0";
        });
        el.addEventListener("pointerenter", function() {
            orb.style.opacity = "1";
        });
    }
    makeGlow("opening");
    makeGlow("hero");

    /* ---- Magnetic + glow hover on section headings / art ---- */
    document.querySelectorAll(".section-divider, .story-quote, .hero-ornament, .gallery .photo, .gallery-style-slider .gallery-item, .detail").forEach(function(el) {
        el.classList.add("lx-hover");
    });
})();

/* =====================================================
   SMOOTH SECTION TRANSITIONS
===================================================== */

(function() {
    var sections = document.querySelectorAll(".section");
    sections.forEach(function(section) {
        section.style.opacity = "0";
        section.style.transition = "opacity 1s ease";
    });

    var sectionObserver = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry) {
            if (entry.isIntersecting) {
                entry.target.style.opacity = "1";
                sectionObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.08 });

    sections.forEach(function(s) { sectionObserver.observe(s); });
})();


/* =====================================================
   RE-RENDER CONTENT AFTER CLOUD FETCH
   On a first visit the opening scene renders immediately with a
   placeholder; when the real invitation arrives from the cloud we
   re-populate the visible content in place (no reload, no flash).
===================================================== */
if (window.__lunaReRenderContent) {
    try {
        /* Letter + open button */
        var _le = document.getElementById("letterEyebrow");
        if (_le) _le.textContent = lunaT("invOpen");
        var _ln = document.getElementById("letterNames");
        if (_ln) _ln.textContent = lunaDisplayNames(invitation);
        var _ld = document.getElementById("letterDate");
        if (_ld) _ld.textContent = displayDate;
        var _ob = document.getElementById("openButton");
        if (_ob) _ob.textContent = lunaT("invOpen");

        /* Hero eyebrow + date */
        var _he = document.getElementById("heroEyebrow");
        if (_he) _he.textContent = lunaInvitationHeading(invitation);
        var _dt = document.getElementById("date");
        if (_dt) _dt.textContent = displayDate;

        /* Hero names (category-aware) */
        var _hn = document.getElementById("heroNames");
        if (_hn) {
            var _hc = (invitation.category || "wedding").toLowerCase();
            var _couple = (_hc === "wedding" || _hc === "engagement" || _hc === "anniversary" || _hc === "henna");
            var _html = "";
            if (_couple) {
                var _b = invitation.bride || "";
                var _g = invitation.groom || "";
                _html = '<span class="name">' + lunaEscapeHtml(_b) + '</span>';
                if (_g) { _html += '<span class="hero-amp">&amp;</span><span class="name">' + lunaEscapeHtml(_g) + '</span>'; }
            } else if (_hc === "birthday") {
                _html = '<span class="name" style="font-size:clamp(48px,10vw,110px)">' + lunaEscapeHtml(invitation.bride || invitation.celebrant || "") + '</span>';
            } else if (_hc === "graduation") {
                _html = '<span class="name" style="font-size:clamp(48px,10vw,110px)">' + lunaEscapeHtml(invitation.bride || invitation.graduate || "") + '</span>';
            } else if (_hc === "business") {
                _html = '<span class="name" style="font-size:clamp(36px,7vw,80px)">' + lunaEscapeHtml(invitation.eventName || invitation.companyName || invitation.bride || "") + '</span>';
            } else {
                _html = '<span class="name" style="font-size:clamp(48px,10vw,110px)">' + lunaT("invRsvpHeading") + '</span>';
            }
            _hn.innerHTML = _html;
            if (typeof lunaFitHeroNames === "function") { try { lunaFitHeroNames(_hn); } catch (eFH) {} }
        }

        /* Story + details */
        var _story = document.getElementById("story");
        if (_story) {
            var _ss = invitation.story || invitation.message || "";
            if (_ss) _story.innerHTML = lunaFormatStory(_ss);
        }
        var _dd = document.getElementById("detailDate");
        if (_dd) _dd.textContent = displayDate;
        var _tm = document.getElementById("time");
        if (_tm) _tm.textContent = invitation.time || "";
        var _vn = document.getElementById("venue");
        if (_vn) _vn.textContent = invitation.venue || "";
        var _lc = document.getElementById("location");
        if (_lc) _lc.textContent = invitation.location || "";

        /* Countdown */
        if (typeof updateCountdown === "function") {
            try { updateCountdown(); } catch (eCD) {}
        }

        /* Client hero cover + opening background */
        var _postHero = invitation.cover || invitation.photoInvitation || "";
        if (_postHero && typeof lunaApplyClientHeroCover === "function") {
            try { lunaApplyClientHeroCover(_postHero); } catch (eHC) {}
        }

        /* Resolve the client's selected opening animation and apply it so the
           correct scene shows on a first visit (the early data-opening set ran
           before the fetch, so it was empty). Mirrors _openingStyle below. */
        var _curOpen = document.documentElement.getAttribute("data-opening") || "";
        if (!_curOpen || _curOpen === "envelope") {
            var _rawOpen = invitation.openingType || invitation.openingStyle || invitation.animationType || invitation.animationStyle
                || (invitation.visualSnapshot && invitation.visualSnapshot.openingType) || "";
            var _aliasOpen = {
                "floral-reveal":"floral-paper","editorial-reveal":"editorial-card","luxury-reveal":"luxury-romance",
                "envelope-reveal":"envelope-seal","stairs-reveal":"stairs","wax-reveal":"wax-seal",
                "curtain-reveal":"curtain","ribbon-reveal":"ribbon","door-reveal":"door","wood-door-reveal":"wood-door",
                "starry-reveal":"starry-night","celebration-reveal":"celebration-pop","candlelight-reveal":"candlelight",
                "winter-reveal":"winter-drift","royal-reveal":"royal-scroll","typewriter-reveal":"typewriter",
                "magic-reveal":"magic-wand","glow-door":"glowing-door","forest-walk":"ancient-forest","book-reveal":"old-book"
            };
            var _resolvedOpen = _aliasOpen[_rawOpen] || _rawOpen || "";
            if (_resolvedOpen) {
                document.documentElement.setAttribute("data-opening", _resolvedOpen);
                /* Activate the scene immediately (mirrors lunaEarlySceneActivate) */
                var _sceneIds = {
                    "wax-seal":"waxSealScene","curtain":"curtainScene","floral-paper":"floralScene",
                    "luxury-romance":"silkScene","celebration-pop":"fiestaScene","starry-night":"starryScene",
                    "typewriter":"typewriterScene","candlelight":"candlelightScene","winter-drift":"winterScene",
                    "royal-scroll":"royalScrollScene","door":"doorScene","stairs":"stairsScene",
                    "envelope-seal":"envSealScene","ribbon":"ribbonScene","wood-door":"woodDoorScene",
                    "magic-wand":"magicWandScene","glowing-door":"glowingDoorScene","ancient-forest":"ancientForestScene",
                    "old-book":"oldBookScene","golden-ring":"goldRingScene","origami-lotus":"lotusScene",
                    "card-unfolds":"cardUnfoldScene","flowers-bloom":"bloomScene","butterfly":"butterflyScene",
                    "gold-sparkles":"goldSparkleScene","polaroid":"polaroidScene","champagne":"champagneScene",
                    "confetti":"confettiScene","card-3d":"rotateScene","light-sweep":"lightSweepScene"
                };
                var _sid = _sceneIds[_resolvedOpen];
                if (_sid) {
                    var _envS = document.querySelector(".envelope-scene");
                    if (_envS) _envS.style.display = "none";
                    var _sc = document.getElementById(_sid);
                    if (_sc) { _sc.style.display = ""; _sc.classList.add("active"); }
                }
            }
        }
        var _opImg = (invitation.scrollHeroImage || invitation.cover || invitation.photoInvitation) || "";
        if (_opImg) {
            var _opEl = document.getElementById("opening");
            if (_opEl) {
                _opEl.style.backgroundImage = "linear-gradient(rgba(255,248,241,.10), rgba(255,248,241,.10)), url('" + _opImg + "')";
                _opEl.style.backgroundSize = "cover";
                _opEl.style.backgroundPosition = "center";
            }
        }
    } catch (eRe) {}
}


/* =====================================================
   OPEN ENVELOPE
===================================================== */

/* Apply opening style from template data */
(function() {
    var openingEl = document.getElementById("opening");
    var templateData = null;
    if (typeof LUNA_TEMPLATES !== "undefined" && invitation.templateId) {
        templateData = LUNA_TEMPLATES.find(function(t) {
            return t.id === invitation.templateId;
        });
    }
    var openStyle = (templateData && templateData.openingStyle) || "envelope";
    var classMap = {
        "envelope": "opening-elegant",
        "fullscreen-photo": "opening-editorial",
        "editorial-reveal": "opening-editorial",
        "floral-reveal": "opening-floral",
        "luxury-reveal": "opening-luxury",
        "minimal-reveal": "opening-minimal",
        "wax-seal": "opening-elegant",
        "curtain": "opening-elegant",
        "floral-paper": "opening-elegant",
        "luxury-romance": "opening-elegant",
        "celebration-pop": "opening-elegant",
        "starry-night": "opening-elegant",
        "typewriter": "opening-elegant",
        "candlelight": "opening-elegant",
        "winter-drift": "opening-elegant",
        "royal-scroll": "opening-elegant"
    };
    var cls = classMap[openStyle] || "opening-elegant";
    openingEl.classList.add(cls);
})();

var openButton =
    document.getElementById("openButton");

var envelope =
    document.getElementById("envelope");

var opening =
    document.getElementById("opening");

var invitationPage =
    document.getElementById("invitation");


var _openingStyle = (function() {
    /* First check data-opening attribute (set by scene engine) */
    var fromAttr = document.documentElement.getAttribute("data-opening") || "";
    if (fromAttr && fromAttr !== "envelope") return fromAttr;

    var tData = null;
    if (typeof LUNA_TEMPLATES !== "undefined" && invitation.templateId) {
        tData = LUNA_TEMPLATES.find(function(t) {
            return t.id === invitation.templateId;
        });
    }
    var raw = (tData && tData.openingStyle) || "envelope";
    var map = {
        "floral-reveal": "floral-paper", "editorial-reveal": "editorial-card",
        "luxury-reveal": "luxury-romance", "envelope-reveal": "envelope-seal",
        "stairs-reveal": "stairs", "wax-reveal": "wax-seal",
        "curtain-reveal": "curtain", "ribbon-reveal": "ribbon",
        "door-reveal": "door", "wood-door-reveal": "wood-door",
        "starry-reveal": "starry-night", "celebration-reveal": "celebration-pop",
        "candlelight-reveal": "candlelight", "winter-reveal": "winter-drift",
        "royal-reveal": "royal-scroll", "typewriter-reveal": "typewriter",
        "magic-reveal": "magic-wand", "glow-door": "glowing-door",
        "forest-walk": "ancient-forest", "book-reveal": "old-book"
    };
    return map[raw] || raw;
})();


/* =====================================================
   SIGNATURE SCENE ENGINE
   Activates the correct opening scene, fills its
   content and wires every scene's open button.
   Also fixes legacy door / stairs scenes.
===================================================== */

(function signatureSceneEngine() {

    var SCENES = {
        "wax-seal":       { id: "waxSealScene", delay: 1300 },
        "curtain":        { id: "curtainScene", delay: 6200 },
        "floral-paper":   { id: "floralScene",  delay: 1400 },
        "luxury-romance": { id: "silkScene",    delay: 1500 },
        "celebration-pop":{ id: "fiestaScene",  delay: 1400 },
        "starry-night":   { id: "starryScene",  delay: 1400 },
        "typewriter":     { id: "typewriterScene", delay: 1500 },
        "candlelight":    { id: "candlelightScene", delay: 1600 },
        "winter-drift":   { id: "winterScene",  delay: 1400 },
        "royal-scroll":   { id: "royalScrollScene", delay: 1500 },
        "door":           { id: "doorScene",    delay: 2600 },
        "stairs":         { id: "stairsScene",  delay: 4600 },
        "envelope-seal":  { id: "envSealScene", delay: 1500 },
        "ribbon":         { id: "ribbonScene",  delay: 3400 },
        "wood-door":      { id: "woodDoorScene", delay: 1500 },
        "magic-wand":     { id: "magicWandScene", delay: 1900 },
        "glowing-door":   { id: "glowingDoorScene", delay: 1800 },
        "ancient-forest": { id: "ancientForestScene", delay: 1800 },
        "old-book":       { id: "oldBookScene", delay: 5200 },
        "golden-ring":    { id: "goldRingScene", delay: 1800 },
        "origami-lotus":  { id: "lotusScene", delay: 1900 },
        "card-unfolds":   { id: "cardUnfoldScene",  delay: 1500 },
        "flowers-bloom":  { id: "bloomScene",       delay: 1600 },
        "butterfly":      { id: "butterflyScene",   delay: 2000 },
        "gold-sparkles":  { id: "goldSparkleScene", delay: 1800 },
        "polaroid":       { id: "polaroidScene",    delay: 1700 },
        "champagne":      { id: "champagneScene",   delay: 1700 },
        "confetti":       { id: "confettiScene",    delay: 1500 },
        "card-3d":        { id: "rotateScene",      delay: 1500 },
        "light-sweep":    { id: "lightSweepScene",  delay: 1700 }
    };

    var type = document.documentElement.getAttribute("data-opening") || "";
    var sceneCfg = SCENES[type];
    window.__lunaOpenDelay = 1600;

    /* Fill every scene card + legacy door/stairs fields */
    function fillAll() {
        document.querySelectorAll(".scene-fill").forEach(function(el) {
            var s = el.querySelector("small");
            var h = el.querySelector("h1");
            var p = el.querySelector("p");
            if (s) s.textContent = lunaT("invOpen");
            if (h) h.textContent = lunaDisplayNames(invitation);
            if (p) p.textContent = displayDate;
        });
        
        /* Typewriter scene - special handling for typewriter text */
        var typewriterText = document.getElementById("typewriterText");
        if (typewriterText) {
            var names = lunaDisplayNames(invitation);
            typewriterText.textContent = names + "\n\n" + displayDate;
        }
        
        /* Royal scroll seal initial */
        var royalSeal = document.getElementById("royalScrollSeal");
        if (royalSeal) {
            var _wi = "";
            try { _wi = JSON.parse(localStorage.getItem("luna_invitation_theme") || "{}").waxInitial || ""; } catch(e) {}
            royalSeal.textContent = (_wi || (invitation.bride || "").charAt(0)).toUpperCase() || "L";
        }

        /* Curtain monogram (closed-state tap hint) */
        var thMonoTap = document.querySelector("#curtainScene .ct-mono-tap");
        if (thMonoTap) thMonoTap.title = lunaT("invOpen");

        /* Curtain stage title — names presented under theatre light */
        var ttNames = document.querySelector("#curtainScene .ct-tt-names");
        if (ttNames) ttNames.textContent = lunaDisplayNames(invitation);
        var ttEyebrow = document.querySelector("#curtainScene .ct-tt-eyebrow");
        if (ttEyebrow) ttEyebrow.textContent = lunaT("invitation");
        var ttDate = document.querySelector("#curtainScene .ct-tt-date");
        if (ttDate) ttDate.textContent = displayDate;
        
        ["doorEyebrow","stairsEyebrow"].forEach(function(id) {
            var el = document.getElementById(id);
            if (el) el.textContent = lunaT("invOpen");
        });
        ["doorNames","stairsNames"].forEach(function(id) {
            var el = document.getElementById(id);
            if (el) el.textContent = lunaDisplayNames(invitation);
        });
        ["doorDate","stairsDate"].forEach(function(id) {
            var el = document.getElementById(id);
            if (el) el.textContent = displayDate;
        });
        ["doorOpenButton","stairsOpenButton"].forEach(function(id) {
            var el = document.getElementById(id);
            if (el) el.textContent = lunaT("invOpen");
        });

        /* Monograms */
        var mono = document.getElementById("luxMonogram");
        if (mono) {
            var b = (invitation.bride || "").charAt(0);
            var g = (invitation.groom || "").charAt(0);
            mono.textContent = (b + g).toUpperCase() || "L";
        }
        var wax = document.getElementById("waxSealBig");
        if (wax) {
            var _wi = "";
            try { _wi = JSON.parse(localStorage.getItem("luna_invitation_theme") || "{}").waxInitial || ""; } catch(e) {}
            wax.textContent = (_wi || (invitation.bride || "").charAt(0)).toUpperCase() || "L";
        }

        /* Old-book cover monogram — real couple initials */
        var obMono = document.querySelector(".ob-monogram");
        if (obMono) {
            var initA = (invitation.bride || invitation.celebrant || invitation.graduate || invitation.companyName || "").charAt(0).toUpperCase() || "L";
            var initB = (invitation.groom || invitation.celebrant || invitation.hostName || invitation.eventName || "").charAt(0).toUpperCase() || "";
            obMono.innerHTML = initA + '<span>&amp;</span>' + (initB || initA);
        }

        /* Scene buttons text */
        document.querySelectorAll(".scene-open-btn").forEach(function(btn) {
            btn.textContent = lunaT("invOpen");
        });
    }
    fillAll();

    if (!sceneCfg) return;

    /* Activate the right scene, keep others hidden */
    var sceneEl = document.getElementById(sceneCfg.id);
    if (!sceneEl) return;
    sceneEl.style.display = "";
    sceneEl.classList.add("active");

    /* Re-apply the client's selected post-opening cover after the opening
       scene is activated, so template scene styles cannot replace it. */
    if (postOpeningHeroImage) {
        lunaApplyClientHeroCover(postOpeningHeroImage);
    }

    /* Apply the client's chosen image as the opening/animation background.
       Priority: scrollHeroImage (client "after opening" image) → cover/photoInvitation
       (client hero image) → design default. Only for child invitations the
       legacy non-child cover is skipped. */
    var _openingImg = (invitation && (invitation.scrollHeroImage || invitation.cover || invitation.photoInvitation)) || "";
    if (_openingImg) {
        var _legacy = ["https://images.unsplash.com/photo-1555252333-9f8e92e65df9"];
        var _isLegacy = _legacy.some(function(u){ return _openingImg.indexOf(u) === 0; });
        if (!_isLegacy) {
            var _openingEl = document.getElementById("opening");
            if (_openingEl) {
                _openingEl.style.backgroundImage = "linear-gradient(rgba(255,248,241,.10), rgba(255,248,241,.10)), url('" + _openingImg + "')";
                _openingEl.style.backgroundSize = "cover";
                _openingEl.style.backgroundPosition = "center";
            }
        }
    }

    /* Hide the default envelope + all unused scenes */
    var envScene = document.querySelector(".envelope-scene");
    if (envScene) envScene.style.display = "none";
    Object.keys(SCENES).forEach(function(key) {
        if (key === type) return;
        var other = document.getElementById(SCENES[key].id);
        if (other) { other.style.display = "none"; }
    });

    window.__lunaOpenDelay = sceneCfg.delay;

    /* On mobile / small screens, cap the pre-reveal wait so the invitation
       opens promptly — but keep enough time for the stairs scene to breathe. */
    if (window.matchMedia && window.matchMedia("(max-width: 768px)").matches) {
        window.__lunaOpenDelay = Math.min(window.__lunaOpenDelay, 2600);
    }

    /* Ambient decorations per scene type */
    function spawn(className, count, styleFn) {
        for (var i = 0; i < count; i++) {
            var el = document.createElement("div");
            el.className = className;
            styleFn(el, i);
            opening.appendChild(el);
        }
    }

    function rnd(min, max) { return min + Math.random() * (max - min); }

    if (type === "floral-paper") {
        spawn("falling-petal", 14, function(el) {
            el.style.left = rnd(2, 98) + "vw";
            el.style.animationDuration = rnd(7, 13) + "s";
            el.style.animationDelay = "-" + rnd(0, 10) + "s";
            el.style.transform = "scale(" + rnd(.6, 1.3) + ")";
        });
    } else if (type === "celebration-pop") {
        var palette = ["#FF6B6B","#FF9F43","#2EC4B6","#8EA8E8","#E8C97A","#C46A82"];
        spawn("pop-bubble", 10, function(el, i) {
            var size = rnd(26, 90);
            el.style.width = size + "px";
            el.style.height = size + "px";
            el.style.left = rnd(4, 92) + "vw";
            el.style.top = rnd(6, 86) + "vh";
            el.style.background = palette[i % palette.length];
            el.style.filter = "blur(2px)";
            el.style.animationDelay = "-" + rnd(0, 6) + "s";
        });
        spawn("confetti-piece", 36, function(el, i) {
            el.style.background = palette[i % palette.length];
            el.style.setProperty("--cx", rnd(-320, 320) + "px");
            el.style.setProperty("--cy", rnd(-260, 340) + "px");
            el.style.setProperty("--cr", rnd(-540, 540) + "deg");
            el.style.animationDelay = (Math.random() * .12) + "s";
        });
    } else if (type === "starry-night") {
        spawn("twinkle-star", 42, function(el, i) {
            el.style.left = rnd(1, 99) + "vw";
            el.style.top = rnd(1, 92) + "vh";
            el.style.animationDelay = "-" + rnd(0, 3) + "s";
            if (i % 6 === 0) el.classList.add("big");
        });
    } else if (type === "candlelight") {
        spawn("floating-ember", 18, function(el) {
            el.style.left = rnd(5, 95) + "vw";
            el.style.animationDuration = rnd(5, 9) + "s";
            el.style.animationDelay = "-" + rnd(0, 5) + "s";
            var size = rnd(3, 7);
            el.style.width = size + "px";
            el.style.height = size + "px";
        });
    } else if (type === "winter-drift") {
        spawn("snowflake", 28, function(el) {
            el.style.left = rnd(2, 98) + "vw";
            el.style.animationDuration = rnd(8, 16) + "s";
            el.style.animationDelay = "-" + rnd(0, 10) + "s";
            el.style.fontSize = rnd(8, 18) + "px";
        });
    } else if (type === "curtain") {
        var dustWrap = document.getElementById("ctCurtainDust");
        if (dustWrap) {
            for (var d = 0; d < 30; d++) {
                var sp = document.createElement("span");
                sp.style.left = rnd(10, 90) + "vw";
                sp.style.top = rnd(25, 80) + "vh";
                sp.style.setProperty("--dx", rnd(-80, 80) + "px");
                sp.style.animationDelay = rnd(0, 1.5) + "s";
                sp.style.animationDuration = rnd(2.5, 4.5) + "s";
                var sz = rnd(2, 5);
                sp.style.width = sz + "px";
                sp.style.height = sz + "px";
                dustWrap.appendChild(sp);
            }
        }
        var ctDust = document.getElementById("ctDustContainer");
        if (ctDust) {
            for (var dm = 0; dm < 36; dm++) {
                var mote = document.createElement("span");
                mote.style.left = rnd(4, 96) + "vw";
                mote.style.top = rnd(4, 92) + "vh";
                mote.style.setProperty("--dx", rnd(-70, 70) + "px");
                mote.style.animationDelay = rnd(0, 9) + "s";
                mote.style.animationDuration = rnd(7, 13) + "s";
                var ms = rnd(2, 4);
                mote.style.width = ms + "px";
                mote.style.height = ms + "px";
                ctDust.appendChild(mote);
            }
        }
        var ctAmbient = document.getElementById("ctAmbientParticles");
        if (ctAmbient) {
            for (var ap = 0; ap < 14; ap++) {
                var particle = document.createElement("span");
                particle.style.left = rnd(25, 75) + "%";
                particle.style.top = rnd(30, 80) + "%";
                particle.style.animationDelay = rnd(0, 7) + "s";
                particle.style.animationDuration = rnd(6, 10) + "s";
                ctAmbient.appendChild(particle);
            }
        }
    } else if (type === "magic-wand") {
        var sparksWrap = document.getElementById("mwSparks");
        if (sparksWrap) {
            for (var ms = 0; ms < 18; ms++) {
                var spark = document.createElement("div");
                spark.className = "mw-spark";
                var spSize = rnd(3, 8);
                spark.style.setProperty("--sp", spSize + "px");
                spark.style.setProperty("--tx", rnd(-120, 120) + "px");
                spark.style.setProperty("--ty", rnd(-160, -20) + "px");
                spark.style.setProperty("--sd", rnd(0, 2.5) + "s");
                spark.style.left = rnd(35, 65) + "vw";
                spark.style.top = rnd(30, 55) + "vh";
                sparksWrap.appendChild(spark);
            }
        }
    } else if (type === "ancient-forest") {
        var leavesWrap = document.getElementById("afLeaves");
        if (leavesWrap) {
            var leafChars = ["🍃", "🍂", "🌿", "☘️"];
            for (var lf = 0; lf < 14; lf++) {
                var leaf = document.createElement("div");
                leaf.className = "af-leaf";
                leaf.textContent = leafChars[lf % leafChars.length];
                leaf.style.left = rnd(10, 90) + "vw";
                leaf.style.top = rnd(-10, 5) + "vh";
                leaf.style.setProperty("--ls", rnd(12, 24) + "px");
                leaf.style.setProperty("--ld", rnd(8, 16) + "s");
                leaf.style.setProperty("--lde", rnd(0, 10) + "s");
                leaf.style.setProperty("--lx", rnd(-60, 60) + "px");
                leaf.style.setProperty("--lr", rnd(180, 720) + "deg");
                leavesWrap.appendChild(leaf);
            }
        }
    }

    /* Wax seal is itself a trigger */
    var waxBig = document.getElementById("waxSealBig");
    if (waxBig && type === "wax-seal") {
        waxBig.addEventListener("click", _openInvitation);
    }
    
    /* Royal scroll seal is itself a trigger */
    var royalSeal = document.getElementById("royalScrollSeal");
    if (royalSeal && type === "royal-scroll") {
        royalSeal.addEventListener("click", _openInvitation);
    }

    /* Every scene button triggers the same flow */
    document.querySelectorAll(".scene-open-btn").forEach(function(btn) {
        btn.addEventListener("click", function(e) {
            e.stopPropagation();
            _openInvitation();
        });
    });

    /* Legacy scenes' buttons */
    ["doorOpenButton","stairsOpenButton"].forEach(function(id) {
        var btn = document.getElementById(id);
        if (btn) btn.addEventListener("click", function(e) {
            e.stopPropagation();
            _openInvitation();
        });
    });

})();

function _openInvitation() {
    if (_openInvitation._done) return;
    _openTriggers();

    openButton.textContent = lunaT("invOpening");
    openButton.disabled = true;

    var delay = window.__lunaOpenDelay || 1600;

    setTimeout(
        function() {
            opening.classList.add("hidden");
            invitationPage.classList.add("visible");
            invitationPage.classList.add("hero-revealed");
            window.scrollTo(0, 0);
            _openInvitation._done = true;
            window.__lunaRevealed = true;

            /* Run deferred reveal hooks (e.g. hero video init) */
            try {
                var _hooks = window.__lunaOnReveal || [];
                _hooks.forEach(function(fn) { try { fn(); } catch(eH) {} });
            } catch (eR) {}

            /* Start hero video right on reveal so it doesn't feel "late" */
            try {
                var _hv = window.__lunaHeroVideo;
                if (_hv && _hv.src && _hv.paused) _hv.play().catch(function() {});
            } catch (eV) {}

            /* Auto-play music if available */
            if (pkg === "luxury" && invitation.music) {
                musicPlayer.play().catch(function() {});
                musicButton.textContent = lunaT("invMusicMute");
            }
        },
        delay
    );
}

/* Trigger type-specific pre-reveal animations */
function _openTriggers() {
    document.documentElement.classList.add("scene-opened");
    try { envelope.classList.add("open"); } catch(e) {}
    if (window.__lunaRibbon3D && typeof window.__lunaRibbon3D.play === "function") {
        window.__lunaRibbon3D.play();
    }
}

openButton.addEventListener("click", _openInvitation);

/* For non-envelope styles, allow tap anywhere on the opening screen */
if (_openingStyle !== "envelope") {
    opening.addEventListener("click", function(e) {
        if (e.target === openButton || openButton.contains(e.target)) return;
        if (e.target.closest && e.target.closest(".scene-open-btn")) return;
        _openInvitation();
    });
}

})();

