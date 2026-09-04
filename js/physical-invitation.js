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

    function initScenes() {
        /* Stairs — restrained editorial couple, scaled like a real photograph */
        inject("stairsScene",
            '<div class="lx-couple" aria-hidden="true">' +
            '<span class="lx-couple-halo"></span>' +
            '<span class="lx-person lx-person-groom"><i class="lx-head"></i><i class="lx-body"></i><i class="lx-leg lx-leg-a"></i><i class="lx-leg lx-leg-b"></i></span>' +
            '<span class="lx-person lx-person-bride"><i class="lx-head"></i><i class="lx-body"></i><i class="lx-leg lx-leg-a"></i><i class="lx-leg lx-leg-b"></i><i class="lx-veil"></i></span>' +
            '<span class="lx-hand"></span>' +
            '</div>');

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
