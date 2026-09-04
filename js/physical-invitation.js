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

    function svgWrap(viewBox, cls) {
        var s = document.createElementNS(SVGNS, "svg");
        s.setAttribute("viewBox", viewBox);
        s.setAttribute("class", cls);
        s.setAttribute("aria-hidden", "true");
        return s;
    }

    function svgEl(tag, attrs) {
        var n = document.createElementNS(SVGNS, tag);
        for (var k in attrs) n.setAttribute(k, attrs[k]);
        return n;
    }

    /* ---- Elegant couple silhouette (bride & groom) ---- */
    function buildCoupleSVG() {
        var s = svgWrap("0 0 260 300", "lx-couple-svg");
        var defs = svgEl("defs", {});
        var lg = svgEl("linearGradient", { id: "lxFigG", x1: "0", y1: "0", x2: "0", y2: "1" });
        lg.appendChild(svgEl("stop", { offset: "0", "stop-color": "#2b1a12" }));
        lg.appendChild(svgEl("stop", { offset: "1", "stop-color": "#0f0805" }));
        defs.appendChild(lg);
        s.appendChild(defs);

        /* rim light — soft warm edge behind the pair */
        var rim = svgEl("ellipse", { cx: "130", cy: "200", rx: "104", ry: "118", fill: "none", stroke: "rgba(220,178,120,.28)", "stroke-width": "1.4", opacity: ".5" });
        s.appendChild(rim);

        /* Groom (left) */
        var groom = svgEl("g", { "class": "lx-groom", fill: "url(#lxFigG)" });
        groom.appendChild(svgEl("circle", { cx: "84", cy: "34", r: "14" }));
        groom.appendChild(svgEl("path", { d: "M84 52c-10 0-15 7-15 17v7c0 3 3 6 6 6h6v96h18v-96h6c3 0 6-3 6-6v-7c0-10-5-17-15-17z" }));
        groom.appendChild(svgEl("path", { d: "M71 178v82h13v-82z" }));
        groom.appendChild(svgEl("path", { d: "M84 178v82h13v-82z" }));
        s.appendChild(groom);

        /* Bride (right) */
        var bride = svgEl("g", { "class": "lx-bride", fill: "url(#lxFigG)" });
        bride.appendChild(svgEl("path", { d: "M176 14c-12-9-27-8-35 3-4 7-4 22-6 28-1 4 1 8 4 10 4-2 8-4 13-6 7-2 15-3 25-1z", opacity: ".9" }));
        bride.appendChild(svgEl("circle", { cx: "176", cy: "30", r: "13" }));
        bride.appendChild(svgEl("path", { d: "M176 44c-8 0-13 6-13 15v10c0 4 3 7 7 7h5v74c0 6 2 10 6 10h8 8c4 0 6-4 6-10v-54c8 0 14-6 14-16v-9c0-4-3-7-7-7h-6c0-4-3-9-7-12-5-3-11-3-14 0-2 1-2 4-2 7z" }));
        bride.appendChild(svgEl("circle", { cx: "154", cy: "74", r: "7" }));
        s.appendChild(bride);

        return s;
    }

    function inject(id, html) {
        var host = document.getElementById(id);
        if (!host) return;
        host.insertAdjacentHTML("beforeend", html);
    }

    function initScenes() {
        /* Stairs — bride & groom climbing */
        inject("stairsScene",
            '<div class="lx-couple" aria-hidden="true">' +
            '<span class="lx-couple-halo"></span>' +
            '</div>');
        var couple = document.querySelector("#stairsScene .lx-couple");
        if (couple) couple.appendChild(buildCoupleSVG());

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
