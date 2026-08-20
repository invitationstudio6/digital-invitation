/* =====================================================
   LUNA SCENE ENGINE
   Reusable interactive scene engine for digital invitations
   Supports scrollJourney, clickJourney, tapToOpen
   ===================================================== */

var LunaSceneEngine = (function () {
    "use strict";

    /* ----- INTERPOLATION KEYS ----- */
    var INTERPOLATION_KEYS = [
        "bride", "groom", "date", "dateLong", "time",
        "venue", "location", "message", "celebrant",
        "graduate", "companyName", "eventName", "age",
        "school", "degree", "story", "invitationLanguage"
    ];

    /* ----- TRANSITION TYPES (must match interactive.css class names) ----- */
    var TRANSITIONS = {
        fade: { enter: "scene-enter-fade", exit: "scene-exit-fade" },
        fadeIn: { enter: "scene-enter-fade", exit: "scene-exit-fade" },
        slideUp: { enter: "scene-enter-slide-up", exit: "scene-exit-slide-up" },
        "slide-up": { enter: "scene-enter-slide-up", exit: "scene-exit-slide-up" },
        zoomIn: { enter: "scene-enter-zoom", exit: "scene-exit-zoom" },
        zoom: { enter: "scene-enter-zoom", exit: "scene-exit-zoom" },
        slideLeft: { enter: "scene-enter-slide-left", exit: "scene-exit-fade" },
        "slide-left": { enter: "scene-enter-slide-left", exit: "scene-exit-fade" },
        reveal: { enter: "scene-enter-reveal", exit: "scene-exit-fade" },
        parallaxShift: { enter: "scene-enter-slide-left", exit: "scene-exit-fade" }
    };

    /* ----- PARTICLE PRESETS (must match interactive.css class names) ----- */
    var PARTICLE_PRESETS = {
        dust: {
            count: 30,
            className: "particle particle-dust",
            sizeRange: [2, 5],
            durationRange: [6, 14],
            delayRange: [0, 6]
        },
        petals: {
            count: 18,
            className: "particle particle-petals",
            sizeRange: [8, 16],
            durationRange: [8, 16],
            delayRange: [0, 8]
        },
        candles: {
            count: 20,
            className: "particle particle-candles",
            sizeRange: [3, 6],
            durationRange: [4, 10],
            delayRange: [0, 5]
        }
    };


    /* =====================================================
       CONSTRUCTOR
       ===================================================== */

    function Engine(config, container, customerData) {
        this.config = config || {};
        this.container = container;
        this.customerData = customerData || {};

        this.scenes = this.config.scenes || [];
        this.interactionType = this.config.interactionType || "scrollJourney";
        this.onComplete = typeof this.config.onComplete === "function" ? this.config.onComplete : null;

        this.currentIndex = 0;
        this.transitioning = false;
        this.destroyed = false;

        this.currentSceneEl = null;
        this.prevSceneEl = null;
        this.progressEl = null;

        this._scrollHandler = null;
        this._clickHandler = null;
        this._touchHandler = null;
        this._rafId = null;
        this._scrollThreshold = 0;
    }


    /* =====================================================
       PUBLIC API
       ===================================================== */

    Engine.prototype.init = function () {
        this.container.style.position = "relative";
        this.container.style.overflow = "hidden";
        this.container.classList.add("scene-engine");

        this._createProgressBar();
        this.renderScene(this.scenes[0], 0);
        this.setupInteraction();

        return this;
    };


    Engine.prototype.nextScene = function () {
        if (this.transitioning || this.destroyed) return;

        if (this.currentIndex >= this.scenes.length - 1) {
            this.revealMainInvitation();
            return;
        }

        this.currentIndex++;
        var direction = "next";
        this.transitionTo(this.scenes[this.currentIndex], this.currentIndex, direction);
    };


    Engine.prototype.prevScene = function () {
        if (this.transitioning || this.destroyed) return;
        if (this.currentIndex <= 0) return;

        this.currentIndex--;
        var direction = "prev";
        this.transitionTo(this.scenes[this.currentIndex], this.currentIndex, direction);
    };


    Engine.prototype.renderScene = function (sceneConfig, index) {
        if (!sceneConfig) return null;

        var self = this;
        var scene = document.createElement("div");
        scene.className = "scene";
        if (sceneConfig.className) {
            scene.className += " " + sceneConfig.className;
        }
        scene.setAttribute("data-scene-index", index);
        scene.setAttribute("data-scene-id", sceneConfig.id || "");

        /* --- Background --- */
        if (sceneConfig.background) {
            var bg = document.createElement("div");
            bg.className = "scene-bg";
            bg.style.backgroundImage = sceneConfig.background.startsWith("url") || sceneConfig.background.startsWith("linear") || sceneConfig.background.startsWith("radial")
                ? sceneConfig.background
                : "url('" + sceneConfig.background + "')";
            scene.appendChild(bg);
        }

        /* --- Overlay --- */
        if (sceneConfig.overlay) {
            var overlay = document.createElement("div");
            overlay.className = "scene-overlay";
            overlay.style.background = sceneConfig.overlay;
            scene.appendChild(overlay);
        }

        /* --- Particles --- */
        if (sceneConfig.particles && PARTICLE_PRESETS[sceneConfig.particles]) {
            var particlesContainer = document.createElement("div");
            particlesContainer.className = "particles";
            scene.appendChild(particlesContainer);
            this._createParticles(particlesContainer, PARTICLE_PRESETS[sceneConfig.particles]);
        }

        /* --- Decorative elements --- */
        if (sceneConfig.elements && sceneConfig.elements.length) {
            for (var e = 0; e < sceneConfig.elements.length; e++) {
                var el = sceneConfig.elements[e];
                var deco = document.createElement("div");
                deco.className = "deco deco-" + (el.type || "line-h");
                if (el.class) deco.className += " " + el.class;
                if (el.style) {
                    var styleParts = el.style.split(";");
                    for (var s = 0; s < styleParts.length; s++) {
                        var part = styleParts[s].trim();
                        if (!part) continue;
                        var colonIdx = part.indexOf(":");
                        if (colonIdx === -1) continue;
                        var prop = part.substring(0, colonIdx).trim();
                        var val = part.substring(colonIdx + 1).trim();
                        if (prop && val) {
                            deco.style.setProperty(prop, val);
                        }
                    }
                }
                scene.appendChild(deco);
            }
        }

        /* --- Specialized scene elements --- */
        this._renderSpecialElements(scene, sceneConfig);

        /* --- Content --- */
        var content = document.createElement("div");
        content.className = "scene-content";

        if (sceneConfig.content) {
            var c = sceneConfig.content;

            if (c.eyebrow) {
                var eyebrow = document.createElement("div");
                eyebrow.className = "scene-eyebrow";
                eyebrow.textContent = this.interpolate(c.eyebrow);
                content.appendChild(eyebrow);
            }

            if (c.title) {
                var title = document.createElement("h2");
                title.className = "scene-title";
                title.innerHTML = this.interpolate(c.title);
                content.appendChild(title);
            }

            if (c.subtitle) {
                var subtitle = document.createElement("p");
                subtitle.className = "scene-subtitle";
                subtitle.textContent = this.interpolate(c.subtitle);
                content.appendChild(subtitle);
            }

            if (c.text) {
                var text = document.createElement("p");
                text.className = "scene-text";
                text.textContent = this.interpolate(c.text);
                content.appendChild(text);
            }
        }

        scene.appendChild(content);

        /* --- Hint --- */
        if (sceneConfig.content && sceneConfig.content.hint) {
            var hint = document.createElement("div");
            hint.className = "scene-hint";
            hint.textContent = this.interpolate(sceneConfig.content.hint);
            scene.appendChild(hint);
        }

        /* --- Click overlay for clickJourney --- */
        if (this.interactionType === "clickJourney") {
            var clickOverlay = document.createElement("div");
            clickOverlay.className = "luna-click-overlay";
            clickOverlay.addEventListener("click", function () {
                self.nextScene();
            });
            scene.appendChild(clickOverlay);
        }

        /* --- Tap-to-open: single tap reveals next --- */
        if (this.interactionType === "tapToOpen") {
            var tapOverlay = document.createElement("div");
            tapOverlay.className = "luna-click-overlay";
            tapOverlay.addEventListener("click", function () {
                self.nextScene();
            });
            scene.appendChild(tapOverlay);
        }

        return scene;
    };


    /* ----- Render specialized scene elements (hall curtains, envelope, screen, balloons, cake) ----- */
    Engine.prototype._renderSpecialElements = function (scene, sceneConfig) {
        var className = sceneConfig.className || "";

        /* Hall curtains for wedding-hall scene */
        if (className.indexOf("scene-hall") !== -1) {
            var curtainLeft = document.createElement("div");
            curtainLeft.className = "hall-curtain-left";
            scene.appendChild(curtainLeft);

            var curtainRight = document.createElement("div");
            curtainRight.className = "hall-curtain-right";
            scene.appendChild(curtainRight);

            /* Auto-open curtains after a delay */
            var self = this;
            setTimeout(function () {
                scene.classList.add("opened");
            }, 800);
        }

        /* Envelope for envelope scene */
        if (sceneConfig.envelope) {
            var container = document.createElement("div");
            container.className = "envelope-container";

            var body = document.createElement("div");
            body.className = "envelope-body";
            container.appendChild(body);

            var flap = document.createElement("div");
            flap.className = "envelope-flap";
            container.appendChild(flap);

            var seal = document.createElement("div");
            seal.className = "envelope-seal";
            seal.textContent = "L";
            container.appendChild(seal);

            var card = document.createElement("div");
            card.className = "envelope-card";
            var cardContent = document.createElement("div");
            cardContent.className = "envelope-card-content";
            if (sceneConfig.envelope.names) {
                var names = document.createElement("div");
                names.className = "names";
                names.textContent = this.interpolate(sceneConfig.envelope.names);
                cardContent.appendChild(names);
            }
            if (sceneConfig.envelope.date) {
                var date = document.createElement("div");
                date.className = "date";
                date.textContent = this.interpolate(sceneConfig.envelope.date);
                cardContent.appendChild(date);
            }
            card.appendChild(cardContent);
            container.appendChild(card);

            scene.appendChild(container);

            /* Auto-open envelope after delay */
            setTimeout(function () {
                flap.classList.add("opened");
                setTimeout(function () {
                    card.classList.add("revealed");
                }, 600);
            }, 1000);
        }

        /* Conference screen */
        if (sceneConfig.screen) {
            var screen = document.createElement("div");
            screen.className = "scene-screen";
            var screenInner = document.createElement("div");
            screenInner.className = "screen-content";

            if (sceneConfig.screen.title) {
                var screenTitle = document.createElement("div");
                screenTitle.className = "screen-title";
                screenTitle.textContent = this.interpolate(sceneConfig.screen.title);
                screenInner.appendChild(screenTitle);
            }

            var screenLine = document.createElement("div");
            screenLine.className = "screen-line";
            screenInner.appendChild(screenLine);

            if (sceneConfig.screen.detail) {
                var screenDetail = document.createElement("div");
                screenDetail.className = "screen-detail";
                screenDetail.textContent = this.interpolate(sceneConfig.screen.detail);
                screenInner.appendChild(screenDetail);
            }

            screen.appendChild(screenInner);
            scene.appendChild(screen);
        }

        /* Birthday balloons */
        if (className.indexOf("scene-party") !== -1) {
            var colors = ["#e88ca5", "#a8d8ea", "#ffd3b6", "#d4a5ff", "#ff9aa2"];
            for (var b = 0; b < 8; b++) {
                var balloon = document.createElement("div");
                balloon.className = "balloon";
                balloon.style.left = (10 + Math.random() * 80) + "%";
                balloon.style.background = colors[b % colors.length];
                balloon.style.animationDelay = (b * 0.3) + "s";
                scene.appendChild(balloon);
            }
        }

        /* Birthday cake glow */
        if (className.indexOf("scene-cake") !== -1) {
            var glow = document.createElement("div");
            glow.className = "cake-glow";
            glow.style.position = "absolute";
            glow.style.left = "50%";
            glow.style.top = "50%";
            glow.style.transform = "translate(-50%, -50%)";
            scene.appendChild(glow);
        }
    };


    Engine.prototype.transitionTo = function (sceneConfig, index, direction) {
        if (this.transitioning || this.destroyed) return;
        this.transitioning = true;

        var self = this;
        var animType = (sceneConfig.animation && sceneConfig.animation.enter) || "fade";
        var duration = (sceneConfig.animation && sceneConfig.animation.duration) || 800;
        var transEnter = TRANSITIONS[animType] || TRANSITIONS.fade;

        /* Create new scene */
        var newScene = this.renderScene(sceneConfig, index);
        if (!newScene) {
            this.transitioning = false;
            return;
        }

        /* Setup exit on previous scene */
        var oldScene = this.currentSceneEl;

        /* Add new scene to container */
        this.container.appendChild(newScene);
        this.prevSceneEl = oldScene;

        /* Trigger enter animation on new scene */
        requestAnimationFrame(function () {
            newScene.classList.add(transEnter.enter);
            newScene.classList.add("active");

            if (oldScene) {
                oldScene.classList.add(transEnter.exit);
                oldScene.classList.add("exit");
            }

            self._updateProgress(index);

            /* Cleanup after animation */
            setTimeout(function () {
                if (oldScene && oldScene.parentNode) {
                    oldScene.parentNode.removeChild(oldScene);
                }
                if (oldScene) {
                    oldScene.classList.remove(transEnter.exit, "exit");
                }
                newScene.classList.remove(transEnter.enter);
                self.currentSceneEl = newScene;
                self.prevSceneEl = null;
                self.transitioning = false;
            }, Math.max(duration, 800));
        });
    };


    Engine.prototype.setupInteraction = function () {
        var self = this;

        if (this.interactionType === "scrollJourney") {
            this._setupScrollInteraction();
        }
        /* clickJourney and tapToOpen are handled via click overlays in renderScene */
    };


    Engine.prototype.revealMainInvitation = function () {
        if (this.transitioning || this.destroyed) return;
        this.transitioning = true;

        var self = this;
        var lastScene = this.currentSceneEl;

        /* Fade out last scene */
        if (lastScene) {
            lastScene.style.transition = "opacity 1s cubic-bezier(.4,0,.2,1)";
            lastScene.style.opacity = "0";
        }

        /* Hide progress bar */
        if (this.progressEl) {
            this.progressEl.style.transition = "opacity .4s ease";
            this.progressEl.style.opacity = "0";
        }

        setTimeout(function () {
            self._cleanupDOM();

            if (typeof self.onComplete === "function") {
                self.onComplete(self.customerData);
            }

            self.transitioning = false;
        }, 1000);
    };


    Engine.prototype.interpolate = function (str) {
        if (!str || typeof str !== "string") return str;

        var data = this.customerData;
        var result = str;

        for (var i = 0; i < INTERPOLATION_KEYS.length; i++) {
            var key = INTERPOLATION_KEYS[i];
            var regex = new RegExp("\\{\\{" + key + "\\}\\}", "gi");
            var value = data[key];

            if (value !== undefined && value !== null) {
                result = result.replace(regex, String(value));
            }
        }

        return result;
    };


    Engine.prototype.destroy = function () {
        this.destroyed = true;

        this._removeScrollInteraction();
        this._cleanupDOM();

        if (this.progressEl && this.progressEl.parentNode) {
            this.progressEl.parentNode.removeChild(this.progressEl);
        }
        this.progressEl = null;

        this.container.classList.remove("scene-engine");
    };


    /* =====================================================
       PRIVATE: SCROLL INTERACTION
       ===================================================== */

    Engine.prototype._setupScrollInteraction = function () {
        var self = this;
        var ticking = false;

        /* Create a scroll spacer so the page is scrollable */
        var spacer = document.createElement("div");
        spacer.className = "scene-scroll-spacer";
        spacer.style.height = (this.scenes.length * 100) + "vh";
        spacer.style.pointerEvents = "none";
        spacer.style.position = "absolute";
        spacer.style.top = "100vh";
        spacer.style.left = "0";
        spacer.style.width = "1px";
        this.container.appendChild(spacer);

        this._scrollHandler = function () {
            if (self.transitioning || self.destroyed) return;

            if (!ticking) {
                requestAnimationFrame(function () {
                    self._handleScroll();
                    ticking = false;
                });
                ticking = true;
            }
        };

        window.addEventListener("scroll", this._scrollHandler, { passive: true });
    };


    Engine.prototype._handleScroll = function () {
        if (this.transitioning || this.destroyed) return;

        var scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        var windowHeight = window.innerHeight;
        var scrollTrigger = windowHeight * 0.6;

        if (scrollTop > this._scrollThreshold + scrollTrigger) {
            this._scrollThreshold = scrollTop;
            this.nextScene();
        }
    };


    Engine.prototype._removeScrollInteraction = function () {
        if (this._scrollHandler) {
            window.removeEventListener("scroll", this._scrollHandler);
            this._scrollHandler = null;
        }
        if (this._rafId) {
            cancelAnimationFrame(this._rafId);
            this._rafId = null;
        }
        /* Remove scroll spacer */
        var spacer = this.container.querySelector(".scene-scroll-spacer");
        if (spacer && spacer.parentNode) {
            spacer.parentNode.removeChild(spacer);
        }
    };


    /* =====================================================
       PRIVATE: PROGRESS BAR
       ===================================================== */

    Engine.prototype._createProgressBar = function () {
        var self = this;
        var total = this.scenes.length;
        if (total <= 1) return;

        this.progressEl = document.createElement("div");
        this.progressEl.className = "scene-progress";

        for (var i = 0; i < total; i++) {
            var dot = document.createElement("button");
            dot.className = "scene-progress-dot";
            dot.setAttribute("aria-label", "Scene " + (i + 1));
            dot.setAttribute("data-index", i);
            if (i === 0) dot.classList.add("active");

            (function (index) {
                dot.addEventListener("click", function (e) {
                    e.stopPropagation();
                    if (self.transitioning || self.destroyed) return;
                    if (index === self.currentIndex) return;

                    var oldIndex = self.currentIndex;
                    self.currentIndex = index;
                    var direction = index > oldIndex ? "next" : "prev";
                    self.transitionTo(self.scenes[index], index, direction);
                });
            })(i);

            this.progressEl.appendChild(dot);
        }

        document.body.appendChild(this.progressEl);
    };


    Engine.prototype._updateProgress = function (index) {
        if (!this.progressEl) return;
        var dots = this.progressEl.querySelectorAll(".scene-progress-dot");
        for (var i = 0; i < dots.length; i++) {
            dots[i].classList.toggle("active", i === index);
            if (i < index) {
                dots[i].classList.add("completed");
            }
        }
    };


    /* =====================================================
       PRIVATE: PARTICLES
       ===================================================== */

    Engine.prototype._createParticles = function (container, preset) {
        if (!container || !preset) return;

        for (var i = 0; i < preset.count; i++) {
            var particle = document.createElement("div");
            particle.className = preset.className;

            /* Randomize size */
            var size = preset.sizeRange[0] + Math.random() * (preset.sizeRange[1] - preset.sizeRange[0]);
            particle.style.width = size + "px";
            particle.style.height = size + "px";

            /* Randomize animation */
            var duration = preset.durationRange[0] + Math.random() * (preset.durationRange[1] - preset.durationRange[0]);
            var delay = preset.delayRange[0] + Math.random() * (preset.delayRange[1] - preset.delayRange[0]);
            var left = Math.random() * 100;

            particle.style.animationDuration = duration + "s";
            particle.style.animationDelay = delay + "s";
            particle.style.left = left + "%";

            container.appendChild(particle);
        }
    };


    /* =====================================================
       PRIVATE: DOM CLEANUP
       ===================================================== */

    Engine.prototype._cleanupDOM = function () {
        var scenes = this.container.querySelectorAll(".scene");
        for (var i = 0; i < scenes.length; i++) {
            if (scenes[i].parentNode) {
                scenes[i].parentNode.removeChild(scenes[i]);
            }
        }
        this.currentSceneEl = null;
        this.prevSceneEl = null;
    };


    return Engine;

})();
