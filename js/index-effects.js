/**
 * Luna main-page premium 3D effects
 * - mouse parallax for hero layers and floating cards
 * - 3D tilt on category, design and animated-showcase cards
 * - scroll reveal choreography via IntersectionObserver
 * - all effects respect prefers-reduced-motion
 */
(function() {
    'use strict';

    var reduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    var isTouch = window.matchMedia && window.matchMedia('(pointer: coarse)').matches;

    /* ---------- 1. Hero mouse parallax ---------- */
    function initHeroParallax() {
        var hero = document.getElementById('home');
        if (!hero || reduced || isTouch) return;

        var layers = hero.querySelectorAll('.hero-3d-layer');
        var cx = window.innerWidth / 2;
        var cy = window.innerHeight / 2;
        var raf = null;
        var mx = cx, my = cy;

        function frame() {
            raf = null;
            var px = (mx - cx) / cx;
            var py = (my - cy) / cy;
            layers.forEach(function(el) {
                var depth = parseFloat(el.getAttribute('data-depth')) || 0;
                var tx = px * depth * -1;
                var ty = py * depth * -1;
                el.style.transform = 'translate3d(' + tx.toFixed(2) + 'px,' + ty.toFixed(2) + 'px,0)';
            });
        }

        function onMove(e) {
            mx = e.clientX;
            my = e.clientY;
            if (!raf) raf = requestAnimationFrame(frame);
        }

        hero.addEventListener('mousemove', onMove, { passive: true });
        window.addEventListener('resize', function() {
            cx = window.innerWidth / 2;
            cy = window.innerHeight / 2;
        }, { passive: true });
    }

    /* ---------- 2. 3D tilt on cards ---------- */
    function initTilt(selector, max) {
        if (reduced || isTouch) return;
        var cards = document.querySelectorAll(selector);
        if (!cards.length) return;

        cards.forEach(function(card) {
            card.style.transformStyle = 'preserve-3d';
            card.style.willChange = 'transform';

            var glare = card.querySelector('.tilt-glare');
            if (!glare) {
                glare = document.createElement('span');
                glare.className = 'tilt-glare';
                card.appendChild(glare);
            }

            function onMove(e) {
                var rect = card.getBoundingClientRect();
                var x = e.clientX - rect.left;
                var y = e.clientY - rect.top;
                var px = x / rect.width - 0.5;
                var py = y / rect.height - 0.5;
                var rx = py * -max;
                var ry = px * max;
                card.style.transform = 'perspective(900px) rotateX(' + rx.toFixed(2) + 'deg) rotateY(' + ry.toFixed(2) + 'deg) translateZ(8px)';
                if (glare) {
                    glare.style.background = 'linear-gradient(' + (135 + px * 60) + 'deg, rgba(255,255,255,0) 0%, rgba(255,255,255,' + (0.12 + Math.max(Math.abs(px), Math.abs(py)) * 0.1).toFixed(3) + ') 45%, rgba(255,255,255,0) 100%)';
                    glare.style.opacity = '1';
                }
            }
            function reset() {
                card.style.transform = 'perspective(900px) rotateX(0) rotateY(0) translateZ(0)';
                if (glare) glare.style.opacity = '0';
            }
            card.addEventListener('mousemove', onMove, { passive: true });
            card.addEventListener('mouseleave', reset, { passive: true });
        });
    }

    /* ---------- 3. Scroll reveal ---------- */
    function initReveal() {
        var items = document.querySelectorAll('.reveal-3d, .section-heading, .step-card, .pkg-card, .feature-card, .testi-card, .video-sample-card');
        if (!items.length) return;

        items.forEach(function(el) {
            if (!reduced) {
                el.classList.add('reveal-3d-init');
            }
        });

        if (reduced) return;

        var observer = new IntersectionObserver(function(entries) {
            entries.forEach(function(entry) {
                if (entry.isIntersecting) {
                    entry.target.classList.add('reveal-3d-visible');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

        items.forEach(function(el) { observer.observe(el); });
    }

    /* ---------- 4. Hero orbit cards gentle ambient motion ---------- */
    function initAmbientOrbit() {
        if (reduced) return;
        var cards = document.querySelectorAll('.hero-inv-card');
        cards.forEach(function(card, i) {
            card.style.animationDelay = (i * -1.4) + 's';
            card.classList.add('hi-ambient');
        });
    }

    /* ---------- Boot ---------- */
    function boot() {
        initHeroParallax();
        initTilt('.category-card', 8);
        initTilt('.design-thumb', 6);
        initTilt('.anim-card', 5);
        initTilt('.coll-card', 6);
        initReveal();
        initAmbientOrbit();
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', boot);
    } else {
        boot();
    }
})();
