/**
 * Luna main-page premium 3D effects
 * - mouse parallax for hero layers and floating cards
 * - 3D tilt on category, design and animated-showcase cards
 * - scroll reveal choreography via IntersectionObserver
 * - magnetic buttons/links
 * - custom cursor glow
 * - interactive particles
 * - text reveal animations
 * - ripple effects
 * - scroll-based color shifts
 * - all effects respect prefers-reduced-motion
 */
(function() {
    'use strict';

    var reduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    var isTouch = window.matchMedia && window.matchMedia('(pointer: coarse)').matches;
    var prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;

    /* ---------- 1. Hero mouse parallax ---------- */
    function initHeroParallax() {
        var hero = document.getElementById('home');
        if (!hero || reduced || isTouch) return;

        var layers = hero.querySelectorAll('.hero-3d-layer');
        var cards = hero.querySelectorAll('.hero-inv-card');
        var deco = hero.querySelectorAll('.hero-deco');
        var cx = window.innerWidth / 2;
        var cy = window.innerHeight / 2;
        var raf = null;
        var mx = cx, my = cy;
        var tx = 0, ty = 0;

        function frame() {
            raf = null;
            var px = (mx - cx) / cx;
            var py = (my - cy) / cy;
            tx = px * 15;
            ty = py * 15;

            layers.forEach(function(el) {
                var depth = parseFloat(el.getAttribute('data-depth')) || 0;
                var lx = px * depth * -1;
                var ly = py * depth * -1;
                el.style.transform = 'translate3d(' + lx.toFixed(2) + 'px,' + ly.toFixed(2) + 'px,0)';
            });

            cards.forEach(function(card) {
                var depth = parseFloat(card.getAttribute('data-depth')) || 60;
                var lx = px * depth * 0.6;
                var ly = py * depth * 0.6;
                var rot = parseFloat(card.style.transform.match(/rotate\(([-\d.]+)deg/)?.[1] || 0);
                card.style.transform = 'translate3d(' + lx.toFixed(2) + 'px,' + ly.toFixed(2) + 'px,' + (depth * 0.3).toFixed(0) + 'px) rotate(' + rot + 'deg)';
            });

            deco.forEach(function(el) {
                var depth = parseFloat(el.getAttribute('data-depth')) || 20;
                var lx = px * depth * 0.5;
                var ly = py * depth * 0.5;
                el.style.transform = 'translate3d(' + lx.toFixed(2) + 'px,' + ly.toFixed(2) + 'px,0)';
            });
        }

        function onMove(e) {
            mx = e.clientX;
            my = e.clientY;
            if (!raf) raf = requestAnimationFrame(frame);
        }

        function onLeave() {
            mx = cx; my = cy;
            if (!raf) raf = requestAnimationFrame(frame);
        }

        hero.addEventListener('mousemove', onMove, { passive: true });
        hero.addEventListener('mouseleave', onLeave, { passive: true });
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

    /* ---------- 3. Magnetic buttons/links ---------- */
    function initMagnetic(selector, strength) {
        if (reduced || isTouch) return;
        var els = document.querySelectorAll(selector);
        if (!els.length) return;

        var MAG_STRENGTH = strength || 0.3;
        var active = null;

        els.forEach(function(el) {
            el.style.transition = 'transform 0.15s cubic-bezier(0.2, 1, 0.3, 1)';

            function onMove(e) {
                var rect = el.getBoundingClientRect();
                var cx = rect.left + rect.width / 2;
                var cy = rect.top + rect.height / 2;
                var dx = (e.clientX - cx) * MAG_STRENGTH;
                var dy = (e.clientY - cy) * MAG_STRENGTH;
                el.style.transform = 'translate(' + dx.toFixed(2) + 'px,' + dy.toFixed(2) + 'px)';
            }
            function onEnter() { active = el; }
            function onLeave() {
                active = null;
                el.style.transform = 'translate(0,0)';
            }
            el.addEventListener('mousemove', onMove, { passive: true });
            el.addEventListener('mouseenter', onEnter, { passive: true });
            el.addEventListener('mouseleave', onLeave, { passive: true });
        });

        // Global mouse move for smooth magnetic feel
        document.addEventListener('mousemove', function(e) {
            if (active) {
                var rect = active.getBoundingClientRect();
                var cx = rect.left + rect.width / 2;
                var cy = rect.top + rect.height / 2;
                var dx = (e.clientX - cx) * MAG_STRENGTH;
                var dy = (e.clientY - cy) * MAG_STRENGTH;
                active.style.transform = 'translate(' + dx.toFixed(2) + 'px,' + dy.toFixed(2) + 'px)';
            }
        }, { passive: true });
    }

    /* ---------- 4. Custom cursor glow ---------- */
    function initCursorGlow() {
        if (reduced || isTouch) return;

        var glow = document.createElement('div');
        glow.className = 'cursor-glow';
        glow.style.cssText = `
            position: fixed;
            width: 300px;
            height: 300px;
            border-radius: 50%;
            pointer-events: none;
            z-index: 9999;
            background: radial-gradient(circle, rgba(212,165,116,0.08) 0%, transparent 70%);
            transform: translate(-50%, -50%);
            transition: opacity 0.3s ease, transform 0.1s ease;
            opacity: 0;
            mix-blend-mode: screen;
        `;
        document.body.appendChild(glow);

        var cx = 0, cy = 0;
        var tx = 0, ty = 0;
        var raf = null;
        var visible = false;

        function animate() {
            raf = null;
            cx += (tx - cx) * 0.15;
            cy += (ty - cy) * 0.15;
            glow.style.transform = 'translate(' + (cx - 150) + 'px,' + (cy - 150) + 'px)';
            if (visible || Math.abs(cx - tx) > 1 || Math.abs(cy - ty) > 1) {
                raf = requestAnimationFrame(animate);
            }
        }

        document.addEventListener('mousemove', function(e) {
            tx = e.clientX;
            ty = e.clientY;
            if (!visible) {
                visible = true;
                glow.style.opacity = '1';
            }
            if (!raf) raf = requestAnimationFrame(animate);
        }, { passive: true });

        document.addEventListener('mouseleave', function() {
            visible = false;
            glow.style.opacity = '0';
        }, { passive: true });

        // Enhance on interactive elements
        var interactive = document.querySelectorAll('a, button, .btn, .design-thumb, .category-card, .coll-card, .anim-card, .video-card, .card-item, .step-card');
        interactive.forEach(function(el) {
            el.addEventListener('mouseenter', function() {
                glow.style.width = '400px';
                glow.style.height = '400px';
                glow.style.background = 'radial-gradient(circle, rgba(212,165,116,0.15) 0%, rgba(183,110,121,0.08) 50%, transparent 70%)';
            }, { passive: true });
            el.addEventListener('mouseleave', function() {
                glow.style.width = '300px';
                glow.style.height = '300px';
                glow.style.background = 'radial-gradient(circle, rgba(212,165,116,0.08) 0%, transparent 70%)';
            }, { passive: true });
        });
    }

    /* ---------- 5. Interactive particles (hero) ---------- */
    function initInteractiveParticles() {
        if (reduced) return;
        var hero = document.getElementById('home');
        if (!hero) return;

        var canvas = document.createElement('canvas');
        canvas.className = 'hero-particles-canvas';
        canvas.style.cssText = 'position:absolute;top:0;left:0;width:100%;height:100%;pointer-events:none;z-index:1';
        hero.insertBefore(canvas, hero.firstChild);

        var ctx = canvas.getContext('2d');
        var particles = [];
        var mouse = { x: 0, y: 0, active: false };
        var raf = null;

        function resize() {
            canvas.width = hero.clientWidth;
            canvas.height = hero.clientHeight;
        }

        function createParticles() {
            var count = window.innerWidth < 600 ? 25 : window.innerWidth < 900 ? 40 : 55;
            particles = [];
            for (var i = 0; i < count; i++) {
                particles.push({
                    x: Math.random() * canvas.width,
                    y: Math.random() * canvas.height,
                    vx: (Math.random() - 0.5) * 0.3,
                    vy: (Math.random() - 0.5) * 0.3,
                    size: 1 + Math.random() * 2.5,
                    baseOpacity: 0.1 + Math.random() * 0.2,
                    color: ['rgba(212,165,116,', 'rgba(183,110,121,', 'rgba(91,140,111,'][Math.floor(Math.random() * 3)],
                    angle: Math.random() * Math.PI * 2
                });
            }
        }

        function animate() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            particles.forEach(function(p) {
                // Mouse attraction
                if (mouse.active) {
                    var dx = mouse.x - p.x;
                    var dy = mouse.y - p.y;
                    var dist = Math.sqrt(dx * dx + dy * dy);
                    if (dist < 180) {
                        var force = (1 - dist / 180) * 0.08;
                        p.vx += dx * force;
                        p.vy += dy * force;
                    }
                }

                // Velocity decay
                p.vx *= 0.99;
                p.vy *= 0.99;

                // Update position
                p.x += p.vx;
                p.y += p.vy;

                // Wrap around
                if (p.x < -10) p.x = canvas.width + 10;
                if (p.x > canvas.width + 10) p.x = -10;
                if (p.y < -10) p.y = canvas.height + 10;
                if (p.y > canvas.height + 10) p.y = -10;

                // Draw
                p.angle += 0.01;
                var opacity = p.baseOpacity + Math.sin(p.angle) * 0.05;
                ctx.beginPath();
                ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
                ctx.fillStyle = p.color + opacity.toFixed(3) + ')';
                ctx.fill();
            });

            // Connections
            for (var i = 0; i < particles.length; i++) {
                for (var j = i + 1; j < particles.length; j++) {
                    var dx = particles[i].x - particles[j].x;
                    var dy = particles[i].y - particles[j].y;
                    var dist = Math.sqrt(dx * dx + dy * dy);
                    if (dist < 100) {
                        ctx.beginPath();
                        ctx.moveTo(particles[i].x, particles[i].y);
                        ctx.lineTo(particles[j].x, particles[j].y);
                        ctx.strokeStyle = 'rgba(212,165,116,' + (0.03 * (1 - dist / 100)).toFixed(4) + ')';
                        ctx.lineWidth = 0.5;
                        ctx.stroke();
                    }
                }
            }

            raf = requestAnimationFrame(animate);
        }

        hero.addEventListener('mousemove', function(e) {
            var rect = hero.getBoundingClientRect();
            mouse.x = e.clientX - rect.left;
            mouse.y = e.clientY - rect.top;
            mouse.active = true;
        }, { passive: true });

        hero.addEventListener('mouseleave', function() {
            mouse.active = false;
        }, { passive: true });

        window.addEventListener('resize', function() {
            resize();
            createParticles();
        }, { passive: true });

        resize();
        createParticles();
        animate();
    }

    /* ---------- 6. Scroll reveal with stagger ---------- */
    function initReveal() {
        var items = document.querySelectorAll('.reveal, .section-heading, .step-card, .pkg-card, .feature-card, .testi-card, .video-sample-card, .design-thumb, .category-card, .coll-card, .anim-card');
        if (!items.length) return;

        items.forEach(function(el, i) {
            if (!reduced) {
                el.classList.add('reveal-3d-init');
                el.style.transitionDelay = (i % 6) * 80 + 'ms';
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
        }, { threshold: 0.1, rootMargin: '0px 0px -60px 0px' });

        items.forEach(function(el) { observer.observe(el); });
    }

    /* ---------- 7. Text reveal animation (staggered chars/words) ---------- */
    function initTextReveal() {
        if (reduced) return;

        var headings = document.querySelectorAll('.section-heading h2, .hero h1, .pkg-compare h3, .cta h2');
        headings.forEach(function(h) {
            if (h.dataset.revealed) return;
            h.dataset.revealed = '1';
            var text = h.innerHTML;
            if (text.includes('<br>')) {
                var parts = text.split('<br>');
                h.innerHTML = parts.map(function(p) {
                    return '<span class="reveal-word">' + p + '</span>';
                }).join('<br>');
            } else {
                var words = text.split(' ');
                h.innerHTML = words.map(function(w) {
                    return '<span class="reveal-word" style="display:inline-block;opacity:0;transform:translateY(1.2em);transition:opacity 0.8s cubic-bezier(0.16,1,0.3,1),transform 0.8s cubic-bezier(0.16,1,0.3,1)">' + w + '</span>';
                }).join(' ');
            }
        });

        // Re-reveal on scroll
        var observer = new IntersectionObserver(function(entries) {
            entries.forEach(function(entry) {
                if (entry.isIntersecting) {
                    var words = entry.target.querySelectorAll('.reveal-word');
                    words.forEach(function(w, i) {
                        setTimeout(function() {
                            w.style.opacity = '1';
                            w.style.transform = 'translateY(0)';
                        }, i * 60);
                    });
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.3 });

        headings.forEach(function(h) { observer.observe(h); });
    }

    /* ---------- 8. Ripple effect on buttons ---------- */
    function initRipple() {
        if (reduced) return;

        var buttons = document.querySelectorAll('.btn, .cat-tab, .show-more-btn, .fav-btn, .video-play-btn, .modal-close, .menu-toggle');
        buttons.forEach(function(btn) {
            btn.style.position = 'relative';
            btn.style.overflow = 'hidden';

            btn.addEventListener('click', function(e) {
                var rect = btn.getBoundingClientRect();
                var size = Math.max(rect.width, rect.height);
                var x = e.clientX - rect.left - size / 2;
                var y = e.clientY - rect.top - size / 2;

                var ripple = document.createElement('span');
                ripple.style.cssText = `
                    position: absolute;
                    width: ${size}px;
                    height: ${size}px;
                    left: ${x}px;
                    top: ${y}px;
                    border-radius: 50%;
                    background: rgba(255,255,255,0.4);
                    transform: scale(0);
                    animation: rippleAnim 0.5s ease-out forwards;
                    pointer-events: none;
                `;

                // Add keyframes if not exists
                if (!document.getElementById('ripple-style')) {
                    var style = document.createElement('style');
                    style.id = 'ripple-style';
                    style.textContent = '@keyframes rippleAnim { to { transform: scale(2.5); opacity: 0; } }';
                    document.head.appendChild(style);
                }

                btn.appendChild(ripple);
                setTimeout(function() { ripple.remove(); }, 500);
            }, { passive: true });
        });
    }

    /* ---------- 9. Scroll-based color theme shifts ---------- */
    function initScrollTheme() {
        if (reduced) return;

        var sections = document.querySelectorAll('.section[id]');
        var root = document.documentElement;
        var current = null;

        var observer = new IntersectionObserver(function(entries) {
            entries.forEach(function(entry) {
                if (entry.isIntersecting) {
                    current = entry.target.id;
                }
            });
        }, { threshold: 0.4, rootMargin: '-100px 0px -100px 0px' });

        sections.forEach(function(s) { observer.observe(s); });

        window.addEventListener('scroll', function() {
            var scrolled = window.scrollY > 100;
            document.body.classList.toggle('scrolled-down', scrolled);
        }, { passive: true });
    }

    /* ---------- 10. Floating hero cards enhanced interaction ---------- */
    function initHeroCardsInteraction() {
        if (reduced || isTouch) return;

        var cards = document.querySelectorAll('.hero-inv-card');
        cards.forEach(function(card) {
            var img = card.querySelector('.hi-img');
            var overlay = card.querySelector('.hi-overlay');

            card.addEventListener('mousemove', function(e) {
                var rect = card.getBoundingClientRect();
                var x = (e.clientX - rect.left) / rect.width - 0.5;
                var y = (e.clientY - rect.top) / rect.height - 0.5;

                if (img) {
                    img.style.transform = 'translate3d(' + (x * 15).toFixed(1) + 'px,' + (y * 15).toFixed(1) + 'px,20px) scale(1.1)';
                }
                if (overlay) {
                    overlay.style.opacity = '1';
                    overlay.style.transform = 'translateZ(40px) translate(' + (x * -10).toFixed(1) + 'px,' + (y * -10).toFixed(1) + 'px)';
                }
            }, { passive: true });

            card.addEventListener('mouseleave', function() {
                if (img) {
                    img.style.transform = 'translate3d(0,0,0) scale(1)';
                }
                if (overlay) {
                    overlay.style.opacity = '0';
                    overlay.style.transform = 'translateZ(30px)';
                }
            }, { passive: true });
        });
    }

    /* ---------- 11. Scroll progress indicator ---------- */
    function initScrollProgress() {
        var bar = document.createElement('div');
        bar.className = 'scroll-progress';
        bar.style.cssText = `
            position: fixed;
            top: 0; left: 0;
            height: 3px;
            background: linear-gradient(90deg, var(--gold), var(--rose), var(--emerald));
            z-index: 9999;
            transform-origin: left;
            transform: scaleX(0);
            box-shadow: 0 0 20px rgba(212,165,116,0.5);
        `;
        document.body.appendChild(bar);

        window.addEventListener('scroll', function() {
            var scrollTop = window.scrollY;
            var docHeight = document.documentElement.scrollHeight - window.innerHeight;
            var progress = Math.min(scrollTop / docHeight, 1);
            bar.style.transform = 'scaleX(' + progress + ')';
        }, { passive: true });
    }

    /* ---------- 12. Page load entrance animation ---------- */
    function initEntranceAnimation() {
        if (reduced) return;

        var heroElements = [
            { el: document.querySelector('.hero-label'), delay: 100 },
            { el: document.querySelector('.hero h1'), delay: 200 },
            { el: document.querySelector('.hero-text'), delay: 400 },
            { el: document.querySelector('.hero-buttons'), delay: 500 },
            { el: document.querySelector('.hero-stats'), delay: 600 }
        ];

        heroElements.forEach(function(item) {
            if (item.el) {
                item.el.style.opacity = '0';
                item.el.style.transform = 'translateY(30px)';
                item.el.style.transition = 'opacity 1s cubic-bezier(0.16,1,0.3,1), transform 1s cubic-bezier(0.16,1,0.3,1)';
                setTimeout(function() {
                    item.el.style.opacity = '1';
                    item.el.style.transform = 'translateY(0)';
                }, item.delay);
            }
        });

        // Floating cards entrance
        var floatCards = document.querySelectorAll('.hero-inv-card');
        floatCards.forEach(function(card, i) {
            card.style.opacity = '0';
            card.style.transform = 'translateY(50px) scale(0.8)';
            card.style.transition = 'opacity 0.8s cubic-bezier(0.16,1,0.3,1), transform 0.8s cubic-bezier(0.16,1,0.3,1)';
            setTimeout(function() {
                card.style.opacity = '1';
                card.style.transform = card.style.transform.replace('translateY(50px) scale(0.8)', '');
            }, 800 + i * 120);
        });
    }

    /* ---------- 13. Dynamic year in footer ---------- */
    function initDynamicYear() {
        var yearEl = document.querySelector('footer [data-i18n="footerTagline"], footer div:last-child');
        if (yearEl && yearEl.textContent.includes('2026')) {
            yearEl.textContent = yearEl.textContent.replace('2026', new Date().getFullYear());
        }
    }

    /* ---------- 14. Smooth scroll for all anchor links ---------- */
    function initSmoothScroll() {
        document.querySelectorAll('a[href^="#"]').forEach(function(a) {
            a.addEventListener('click', function(e) {
                var target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    e.preventDefault();
                    var navbar = document.getElementById('navbar');
                    var offset = (navbar ? navbar.offsetHeight : 0) + 20;
                    var top = target.getBoundingClientRect().top + window.pageYOffset - offset;
                    window.scrollTo({ top: top, behavior: 'smooth' });
                }
            });
        });
    }

    /* ---------- Boot all ---------- */
    function boot() {
        initHeroParallax();
        initTilt('.category-card', 10);
        initTilt('.design-thumb', 7);
        initTilt('.anim-card', 6);
        initTilt('.coll-card', 7);
        initTilt('.video-card', 5);
        initTilt('.step-card', 4);
        initMagnetic('.btn, .cat-tab, .nav-links a, .show-more-btn', 0.25);
        initCursorGlow();
        initInteractiveParticles();
        initReveal();
        initTextReveal();
        initRipple();
        initScrollTheme();
        initHeroCardsInteraction();
        initScrollProgress();
        initEntranceAnimation();
        initDynamicYear();
        initSmoothScroll();
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', boot);
    } else {
        boot();
    }
})();