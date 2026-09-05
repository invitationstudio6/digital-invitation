/* =====================================================
   LUNA PHYSICAL SCENES — additive "alive" layer
   Injects illustrated figures and atmosphere into the
   opening scenes, drives wind page-flips with the Web
   Animations API, and adds scroll parallax. Runs only
   when <html> carries .lx-physical (invitation viewers).
   Non-destructive: it never touches existing logic.
===================================================== */
(function () {
    "use strict";
    if (!document.documentElement.classList.contains("lx-physical")) return;

    var SVGNS = "http://www.w3.org/2000/svg";

    function el(tag, cls, parent) {
        var n = document.createElement(tag);
        if (cls) n.className = cls;
        if (parent) parent.appendChild(n);
        return n;
    }

    function inject(id, html) {
        var host = document.getElementById(id);
        if (!host) return;
        host.insertAdjacentHTML("beforeend", html);
    }

    /* ---- Stairs upgrade: a realistic marble staircase plus a bride & groom
           who climb it together (illustrated SVG, additive only). ---- */
    /* (The flat SVG staircase is removed — the client's real staircase
       photograph now provides the stairs, kept clearly visible.) */

    function stairsCoupleSVG() {
        return '<svg class="lx-couple-svg" viewBox="0 0 240 320" aria-hidden="true" focusable="false">' +
            '<defs>' +
            '<radialGradient id="lxSkin" cx="42%" cy="34%" r="65%"><stop offset="0" stop-color="#f7d5b4"/><stop offset=".7" stop-color="#e9be95"/><stop offset="1" stop-color="#d2a074"/></radialGradient>' +
            '<linearGradient id="lxHair" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#4a3426"/><stop offset="1" stop-color="#1c130d"/></linearGradient>' +
            '<linearGradient id="lxSuit" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#33333c"/><stop offset="1" stop-color="#15151b"/></linearGradient>' +
            '<linearGradient id="lxDress" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#ffffff"/><stop offset=".55" stop-color="#f7efe4"/><stop offset="1" stop-color="#e2d4bd"/></linearGradient>' +
            '<linearGradient id="lxVeilG" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="rgba(255,255,255,.9)"/><stop offset="1" stop-color="rgba(255,255,255,0)"/></linearGradient>' +
            '</defs>' +
            '<ellipse cx="120" cy="306" rx="80" ry="12" fill="rgba(30,18,10,.30)"/>' +
            stairsGroomSVG() +
            stairsBrideSVG() +
            '</svg>';
    }

    function stairsGroomSVG() {
        return '<g class="lx-groom">' +
            '<path d="M62 176 L62 288 L75 288 L75 176 Z" fill="#14141a"/>' +
            '<path d="M84 176 L84 288 L97 288 L97 176 Z" fill="#0f0f15"/>' +
            '<path d="M58 288 L80 288 L82 298 L56 298 Z" fill="#0b0b0f"/>' +
            '<path d="M82 288 L102 288 L104 298 L80 298 Z" fill="#0b0b0f"/>' +
            '<path d="M56 120 L106 120 L112 178 L50 178 Z" fill="url(#lxSuit)"/>' +
            '<path d="M69 120 L95 120 L82 150 Z" fill="#f6f2ea"/>' +
            '<path d="M79 120 L85 120 L82 152 Z" fill="#6d1f2e"/>' +
            '<path d="M69 120 L57 152 L69 152 Z" fill="#23232b"/>' +
            '<path d="M95 120 L107 152 L95 152 Z" fill="#23232b"/>' +
            '<path d="M103 130 Q126 132 140 156" fill="none" stroke="#33333c" stroke-width="16" stroke-linecap="round"/>' +
            '<path d="M103 130 Q126 132 140 156" fill="none" stroke="#4a4a55" stroke-width="5" stroke-linecap="round" opacity=".5"/>' +
            '<path d="M74 114 L88 114 L86 122 L76 122 Z" fill="#e0b488"/>' +
            '<ellipse cx="81" cy="82" rx="15.5" ry="18.5" fill="url(#lxSkin)"/>' +
            '<ellipse cx="65.5" cy="84" rx="3.4" ry="6" fill="url(#lxSkin)"/>' +
            '<ellipse cx="96.5" cy="84" rx="3.4" ry="6" fill="url(#lxSkin)"/>' +
            '<path d="M65 74 Q81 48 97 74 Q94 63 81 62 Q68 63 65 74 Z" fill="url(#lxHair)"/>' +
            '<path d="M64 80 Q63 92 66 96 L64 94 Q62 86 63 78 Z" fill="#2a1d15"/>' +
            '<path d="M72 79 Q75 76 79 78" stroke="#33261c" stroke-width="1.8" fill="none" stroke-linecap="round"/>' +
            '<path d="M83 78 Q87 76 90 79" stroke="#33261c" stroke-width="1.8" fill="none" stroke-linecap="round"/>' +
            '<ellipse cx="75.5" cy="85" rx="2.6" ry="1.7" fill="#fff"/>' +
            '<circle cx="75.5" cy="85" r="1.1" fill="#241710"/>' +
            '<ellipse cx="86.5" cy="85" rx="2.6" ry="1.7" fill="#fff"/>' +
            '<circle cx="86.5" cy="85" r="1.1" fill="#241710"/>' +
            '<path d="M81 86 Q79.5 92 82 93" stroke="#c89970" stroke-width="1.4" fill="none" stroke-linecap="round"/>' +
            '<path d="M77 98 Q81 101 85 98" stroke="#b76e5c" stroke-width="1.8" fill="none" stroke-linecap="round"/>' +
            '</g>';
    }

    function stairsBrideSVG() {
        return '<g class="lx-bride">' +
            '<path d="M146 94 L186 94 L220 296 L114 296 Z" fill="url(#lxDress)"/>' +
            '<path d="M166 108 L157 292 M166 108 L170 292 M166 108 L185 288 M166 108 L199 284" stroke="#dccbb2" stroke-width="3" fill="none" opacity=".6"/>' +
            '<path d="M146 94 L186 94 L186 118 L146 118 Z" fill="#ffffff" opacity=".65"/>' +
            '<path d="M146 94 L186 94 L180 130 L152 130 Z" fill="#fcf7ef"/>' +
            '<path d="M152 130 L180 130 L176 148 L156 148 Z" fill="#eee1cc"/>' +
            '<path d="M158 118 Q166 126 174 118" stroke="#d8b46a" stroke-width="1.6" fill="none"/>' +
            '<path d="M158 82 L172 82 L170 94 L160 94 Z" fill="#e6bc92"/>' +
            '<ellipse cx="165" cy="58" rx="14.5" ry="17.5" fill="url(#lxSkin)"/>' +
            '<ellipse cx="150.5" cy="60" rx="3.2" ry="5.6" fill="url(#lxSkin)"/>' +
            '<ellipse cx="179.5" cy="60" rx="3.2" ry="5.6" fill="url(#lxSkin)"/>' +
            '<path d="M150 52 Q165 26 180 52 Q176 44 165 43 Q154 44 150 52 Z" fill="url(#lxHair)"/>' +
            '<circle cx="165" cy="40" r="8" fill="url(#lxHair)"/>' +
            '<path d="M157 55 Q160 52 163 54" stroke="#33261c" stroke-width="1.7" fill="none" stroke-linecap="round"/>' +
            '<path d="M167 54 Q170 52 173 55" stroke="#33261c" stroke-width="1.7" fill="none" stroke-linecap="round"/>' +
            '<ellipse cx="159.5" cy="61" rx="2.5" ry="1.6" fill="#fff"/>' +
            '<circle cx="159.5" cy="61" r="1" fill="#241710"/>' +
            '<ellipse cx="170.5" cy="61" rx="2.5" ry="1.6" fill="#fff"/>' +
            '<circle cx="170.5" cy="61" r="1" fill="#241710"/>' +
            '<path d="M165 63 Q163.5 68 166 69" stroke="#c89970" stroke-width="1.3" fill="none" stroke-linecap="round"/>' +
            '<path d="M160.5 74 Q165 78 169.5 74" fill="#c9767a"/>' +
            '<path class="lx-veil" d="M165 42 Q150 14 167 8 Q184 12 177 42 Q171 28 165 42 Z" fill="url(#lxVeilG)"/>' +
            '<path class="lx-veil" d="M151 38 Q130 56 137 86 Q145 70 151 38 Z" fill="rgba(255,255,255,.5)"/>' +
            '<path d="M150 102 Q128 108 126 130" fill="none" stroke="#e9be95" stroke-width="9" stroke-linecap="round"/>' +
            '<g class="lx-bouquet">' +
            '<circle cx="122" cy="140" r="8" fill="#e89cb2"/>' +
            '<circle cx="132" cy="136" r="7" fill="#e26885"/>' +
            '<circle cx="138" cy="144" r="8" fill="#f4b7c7"/>' +
            '<circle cx="124" cy="132" r="6" fill="#f7dbe4"/>' +
            '<circle cx="132" cy="146" r="6" fill="#c94f6c"/>' +
            '<path d="M122 148 Q124 156 130 162" stroke="#5f7d4a" stroke-width="4" fill="none"/>' +
            '<path d="M134 150 Q132 158 128 164" stroke="#4f6b3c" stroke-width="3" fill="none"/>' +
            '</g>' +
            '</g>';
    }

    function stairsDustHTML() {
        var h = '<div class="lx-stairs-dust" aria-hidden="true">';
        for (var i = 0; i < 14; i++) {
            var left = (10 + Math.random() * 80).toFixed(1);
            var top = (15 + Math.random() * 70).toFixed(1);
            var size = (2 + Math.random() * 3).toFixed(1);
            var dur = (6 + Math.random() * 8).toFixed(1);
            var delay = (Math.random() * 6).toFixed(1);
            h += '<i style="left:' + left + '%;top:' + top + '%;width:' + size + 'px;height:' + size + 'px;animation-duration:' + dur + 's;animation-delay:-' + delay + 's"></i>';
        }
        return h + '</div>';
    }

    function stairsCoupleWrap() {
        return '<div class="lx-couple-wrap" aria-hidden="true"><div class="lx-couple">' + stairsCoupleSVG() + '</div></div>';
    }

    function initScenes() {
        /* Stairs — the client's real staircase photograph as the stage:
           blurred-to-focused push-in, warm grade and film grain. */
        var stairs = document.getElementById("stairsScene");
        if (stairs && !stairs.querySelector(".lx-stairs-photo")) {
            /* Prepend so the photo stays behind the light, the dust, the couple
               and the card. The client's real staircase photo is the stairs. */
            stairs.insertAdjacentHTML("afterbegin",
                '<div class="lx-stairs-photo" aria-hidden="true">' +
                '<span class="lx-sp-img"></span>' +
                '<span class="lx-sp-grade"></span>' +
                '<span class="lx-sp-grain"></span>' +
                '</div>' +
                '<div class="lx-stairs-light" aria-hidden="true"></div>' +
                stairsDustHTML() +
                stairsCoupleWrap());
        }

        /* Wood door + door — castle torchlight & drifting fog */
        ["woodDoorScene", "doorScene"].forEach(function (id) {
            var host = document.getElementById(id);
            if (!host || host.querySelector(".lx-torch")) return;
            var torch = el("div", "lx-torch", host);
            el("i", "lx-torch-l", torch); el("i", "lx-torch-r", torch);
            var fog = el("div", "lx-fog", host);
            for (var i = 0; i < 6; i++) el("i", "", fog);
        });

        /* Curtain — spotlight & theatre audience glow */
        var ctStage = document.querySelector("#curtainScene .ct-stage");
        if (ctStage && !ctStage.querySelector(".lx-spot")) {
            el("div", "lx-spot", ctStage);
            el("div", "lx-audience", ctStage);
        }
    }

    /* ---- Book: wind-driven page lift via Web Animations ---- */
    function enhanceBook() {
        var book = document.getElementById("oldBookScene");
        if (!book) return;
        var pages = book.querySelectorAll(".ob-pl");
        if (!pages.length || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
        /* Gust animation only runs after the scene opens; CSS handles the rest. */
    }

    /* ---- Scroll parallax on hero + section backdrops ---- */
    function setupParallax() {
        var hero = document.getElementById("hero");
        if (!hero) return;
        var bg = el("div", "lx-hero-bg", hero);
        hero.insertBefore(bg, hero.firstChild);

        /* Media-first hero: when the client supplied a photo cover and there
           is no hero video, the parallax layer carries the real photograph
           with cinematic grading instead of a flat gradient. */
        if (!hero.querySelector(".hero-video-bg")) {
            var cover = "";
            try {
                cover = (getComputedStyle(document.documentElement)
                    .getPropertyValue("--cover") || "").trim();
            } catch (e) {}
            if (cover && cover.indexOf("url(") === 0) {
                bg.classList.add("lx-hero-photo");
                bg.style.backgroundImage = cover;
            } else if (document.documentElement.getAttribute("data-opening") === "stairs") {
                /* The supplied staircase photograph is the safe visual
                   fallback for this opening when a client has no cover. */
                bg.classList.add("lx-hero-photo", "lx-hero-stairs-fallback");
                bg.style.backgroundImage = 'url("../media/stairs-couple.jpg")';
            }
        }

        var ticking = false;
        function frame() {
            ticking = false;
            var y = window.pageYOffset || document.documentElement.scrollTop || 0;
            document.documentElement.style.setProperty("--lx-sy", y.toFixed(0));
        }
        window.addEventListener("scroll", function () {
            if (!ticking) { window.requestAnimationFrame(frame); ticking = true; }
        }, { passive: true });
        frame();
    }

    function init() {
        try { initScenes(); } catch (e) {}
        try { enhanceBook(); } catch (e) {}
        try { setupParallax(); } catch (e) {}
    }

    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", init);
    } else {
        init();
    }
})();
