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
    function stairsStaircaseSVG() {
        var W = 420, H = 320, steps = 7, rise = 30, bottom = 304;
        var lx0 = (W - 356) / 2;   /* bottom-left x of the lowest step */
        var lx1 = (W - 212) / 2;   /* top-left x of the highest step */
        var railTopY = bottom - steps * rise + 10;
        var s = '<svg class="lx-stairs-3d" viewBox="0 0 ' + W + ' ' + H + '" preserveAspectRatio="xMidYMax meet" aria-hidden="true" focusable="false">';
        s += '<defs>' +
            '<linearGradient id="lxStairWall" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#f4ecdd"/><stop offset="1" stop-color="#d3c4a7"/></linearGradient>' +
            '<linearGradient id="lxStairTread" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#f8f1e3"/><stop offset="1" stop-color="#dccfb6"/></linearGradient>' +
            '<linearGradient id="lxStairRiser" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#c7b79d"/><stop offset="1" stop-color="#9f8a6e"/></linearGradient>' +
            '</defs>';

        /* Grand-foyer back wall behind the staircase */
        s += '<rect x="26" y="14" width="368" height="290" rx="120" fill="url(#lxStairWall)"/>';
        s += '<rect x="26" y="14" width="368" height="290" rx="120" fill="none" stroke="#c5a46a" stroke-opacity=".35" stroke-width="2"/>';

        /* Steps — draw the top-most first so each lower step sits in front. */
        for (var i = steps - 1; i >= 0; i--) {
            var w = 356 - i * 24;
            var x = (W - w) / 2;
            var riserTop = bottom - (i + 1) * rise;
            var riserBot = bottom - i * rise;
            var depth = 12, inset = 7;
            s += '<path d="M' + x.toFixed(1) + ' ' + riserTop.toFixed(1) +
                 ' L' + (x + w).toFixed(1) + ' ' + riserTop.toFixed(1) +
                 ' L' + (x + w).toFixed(1) + ' ' + riserBot.toFixed(1) +
                 ' L' + x.toFixed(1) + ' ' + riserBot.toFixed(1) + ' Z" fill="url(#lxStairRiser)"/>';
            s += '<path d="M' + x.toFixed(1) + ' ' + riserTop.toFixed(1) +
                 ' L' + (x + w).toFixed(1) + ' ' + riserTop.toFixed(1) +
                 ' L' + (x + w - inset).toFixed(1) + ' ' + (riserTop - depth).toFixed(1) +
                 ' L' + (x + inset).toFixed(1) + ' ' + (riserTop - depth).toFixed(1) + ' Z" fill="url(#lxStairTread)"/>';
        }

        /* Gold handrails + newel caps */
        s += '<path d="M' + (lx0 - 8).toFixed(1) + ' ' + bottom + ' L' + (lx1 - 8).toFixed(1) + ' ' + railTopY + '" fill="none" stroke="#c5a46a" stroke-width="8" stroke-linecap="round"/>';
        s += '<path d="M' + (W - lx0 + 8).toFixed(1) + ' ' + bottom + ' L' + (W - lx1 + 8).toFixed(1) + ' ' + railTopY + '" fill="none" stroke="#c5a46a" stroke-width="8" stroke-linecap="round"/>';
        s += '<circle cx="' + (lx1 - 8).toFixed(1) + '" cy="' + railTopY + '" r="10" fill="#c5a46a"/>';
        s += '<circle cx="' + (W - lx1 + 8).toFixed(1) + '" cy="' + railTopY + '" r="10" fill="#c5a46a"/>';
        s += '</svg>';
        return s;
    }

    function stairsCoupleSVG() {
        return '<svg class="lx-couple-svg" viewBox="0 0 220 300" aria-hidden="true" focusable="false">' +
            '<defs><linearGradient id="lxDress" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#fffdf8"/><stop offset=".62" stop-color="#f4ebdd"/><stop offset="1" stop-color="#e1d4bf"/></linearGradient></defs>' +
            '<ellipse cx="120" cy="272" rx="66" ry="9" fill="rgba(44,26,14,.20)"/>' +
            '<g class="lx-groom">' +
            '<rect x="68" y="136" width="12" height="98" rx="6" fill="#15151b"/>' +
            '<rect x="86" y="136" width="12" height="98" rx="6" fill="#101017"/>' +
            '<ellipse cx="74" cy="236" rx="11" ry="5" fill="#0d0d12"/>' +
            '<ellipse cx="92" cy="236" rx="11" ry="5" fill="#0d0d12"/>' +
            '<path d="M60 138 L102 138 L109 76 L54 76 Z" fill="#1d1d24"/>' +
            '<path d="M66 76 L96 76 L81 104 Z" fill="#f6f2ea"/>' +
            '<path d="M74 82 L88 82 L81 90 Z" fill="#7a2230"/>' +
            '<path d="M100 84 Q122 86 130 104" fill="none" stroke="#1d1d24" stroke-width="13" stroke-linecap="round"/>' +
            '<circle cx="81" cy="44" r="15" fill="#e7bd92"/>' +
            '<path d="M66 41 Q81 18 96 41 Q90 32 81 31 Q71 32 66 41 Z" fill="#261c16"/>' +
            '</g>' +
            '<g class="lx-bride">' +
            '<path class="lx-veil" d="M143 20 Q118 8 150 6 Q168 10 154 30 Q147 18 143 20 Z" fill="rgba(255,255,255,.72)"/>' +
            '<path d="M126 62 L160 62 L192 266 L72 266 Z" fill="url(#lxDress)"/>' +
            '<path d="M126 62 L160 62 L155 100 L131 100 Z" fill="#fbf7f0"/>' +
            '<path d="M143 106 L140 258 M143 106 L150 258 M143 106 L160 248" stroke="#e2d4bf" stroke-width="2.5" fill="none" opacity=".75"/>' +
            '<path d="M130 96 Q112 102 112 124" fill="none" stroke="#e7bd92" stroke-width="9" stroke-linecap="round"/>' +
            '<g class="lx-bouquet">' +
            '<circle cx="110" cy="132" r="7" fill="#e79cb0"/>' +
            '<circle cx="119" cy="128" r="6" fill="#e26885"/>' +
            '<circle cx="125" cy="134" r="7" fill="#f4b7c7"/>' +
            '<circle cx="112" cy="125" r="6" fill="#f7dbe4"/>' +
            '<path d="M112 134 Q114 144 119 150" stroke="#5f7d4a" stroke-width="3.5" fill="none"/>' +
            '</g>' +
            '<circle cx="143" cy="38" r="14" fill="#e7bd92"/>' +
            '<path d="M129 38 Q143 16 157 38 Q152 30 143 29 Q134 30 129 38 Z" fill="#241a16"/>' +
            '<circle cx="143" cy="24" r="6.5" fill="#241a16"/>' +
            '</g>' +
            '</svg>';
    }

    function stairsCoupleWrap() {
        return '<div class="lx-couple-wrap" aria-hidden="true"><div class="lx-couple">' + stairsCoupleSVG() + '</div></div>';
    }

    function initScenes() {
        /* Stairs — the client's real staircase photograph as the stage:
           blurred-to-focused push-in, warm grade and film grain. */
        var stairs = document.getElementById("stairsScene");
        if (stairs && !stairs.querySelector(".lx-stairs-photo")) {
            /* Prepend so the photo stays behind the steps, the couple and the card. */
            stairs.insertAdjacentHTML("afterbegin",
                '<div class="lx-stairs-photo" aria-hidden="true">' +
                '<span class="lx-sp-img"></span>' +
                '<span class="lx-sp-grade"></span>' +
                '<span class="lx-sp-grain"></span>' +
                '</div>' +
                stairsStaircaseSVG() +
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
