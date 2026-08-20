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

    /* ----- TRANSITION TYPES ----- */
    var TRANSITIONS = {
        fade: { enter: "luna-scene-fade-in", exit: "luna-scene-fade-out" },
        slideUp: { enter: "luna-scene-slide-up-enter", exit: "luna-scene-slide-up-exit" },
        zoomIn: { enter: "luna-scene-zoom-in-enter", exit: "luna-scene-zoom-out-exit" },
        parallaxShift: { enter: "luna-scene-parallax-enter", exit: "luna-scene-parallax-exit" }
    };

    /* ----- PARTICLE PRESETS ----- */
    var PARTICLE_PRESETS = {
        dust: {
            count: 30,
            className: "luna-particle-dust",
            styles: {
                position: "absolute",
                borderRadius: "50%",
                background: "rgba(255,252,247,0.3)",
                pointerEvents: "none"
            },
            sizeRange: [2, 5],
            durationRange: [6, 14],
            delayRange: [0, 6]
        },
        petals: {
            count: 18,
            className: "luna-particle-petal",
            styles: {
                position: "absolute",
                width: "12px",
                height: "8px",
                borderRadius: "50% 0 50% 0",
                background: "rgba(212,160,176,0.35)",
                pointerEvents: "none"
            },
            sizeRange: [8, 16],
            durationRange: [8, 16],
            delayRange: [0, 8]
        },
        candles: {
            count: 20,
            className: "luna-particle-candle",
            styles: {
                position: "absolute",
                borderRadius: "50%",
                background: "rgba(232,192,64,0.5)",
                pointerEvents: "none"
            },
            sizeRange: [3, 6],
            durationRange: [4, 10],
            delayRange: [0, 5]
        }
    };

    /* ----- INJECT STYLES (once) ----- */
    var stylesInjected = false;

    function injectStyles() {
        if (stylesInjected) return;
        stylesInjected = true;

        var css = ""
            + ".luna-scene-engine{position:relative;width:100%;height:100vh;height:100dvh;overflow:hidden}"
            + ".luna-scene{position:absolute;inset:0;display:flex;align-items:center;justify-content:center;flex-direction:column;text-align:center;opacity:0;transition:opacity .6s ease,transform .6s cubic-bezier(.19,1,.22,1);z-index:1}"
            + ".luna-scene.active{opacity:1;z-index:2}"
            + ".luna-scene.exiting{z-index:1}"

            + ".luna-scene-bg{position:absolute;inset:0;background-size:cover;background-position:center}"
            + ".luna-scene-overlay{position:absolute;inset:0}"

            + ".luna-scene-content{position:relative;z-index:3;padding:24px;max-width:600px;width:100%}"
            + ".luna-scene-eyebrow{font-family:'DM Sans',sans-serif;font-size:9px;font-weight:500;letter-spacing:5px;text-transform:uppercase;color:rgba(255,252,247,.6);margin-bottom:16px}"
            + ".luna-scene-title{font-family:'Cormorant Garamond',Georgia,serif;font-size:clamp(36px,8vw,72px);font-weight:300;font-style:italic;line-height:1.1;color:#fff;margin-bottom:16px}"
            + ".luna-scene-subtitle{font-family:'Cormorant Garamond',Georgia,serif;font-size:clamp(16px,3vw,22px);font-weight:300;line-height:1.6;color:rgba(255,252,247,.75);margin-bottom:24px}"
            + ".luna-scene-text{font-family:'DM Sans',sans-serif;font-size:13px;font-weight:400;line-height:1.8;color:rgba(255,252,247,.55)}"
            + ".luna-scene-hint{position:absolute;bottom:80px;left:50%;transform:translateX(-50%);font-family:'DM Sans',sans-serif;font-size:9px;font-weight:500;letter-spacing:3px;text-transform:uppercase;color:rgba(255,252,247,.4);z-index:5}"

            + ".luna-deco-line-h{position:absolute;height:1px;background:rgba(255,252,247,.12);pointer-events:none}"
            + ".luna-deco-circle{position:absolute;border-radius:50%;border:1px solid rgba(255,252,247,.08);pointer-events:none}"

            + ".luna-progress{position:fixed;bottom:28px;left:50%;transform:translateX(-50%);display:flex;gap:10px;z-index:100;align-items:center}"
            + ".luna-progress-dot{width:6px;height:6px;border-radius:50%;background:rgba(255,252,247,.2);transition:all .4s ease;cursor:pointer;border:none;padding:0}"
            + ".luna-progress-dot.active{background:rgba(255,252,247,.85);width:20px;border-radius:3px}"

            + ".luna-particles{position:absolute;inset:0;overflow:hidden;pointer-events:none;z-index:1}"

            + "@keyframes luna-float-up{0%{transform:translateY(100vh) rotate(0deg);opacity:0}10%{opacity:1}90%{opacity:1}100%{transform:translateY(-10vh) rotate(360deg);opacity:0}}"
            + "@keyframes luna-drift{0%{transform:translateY(100vh) translateX(0) rotate(0deg);opacity:0}10%{opacity:1}90%{opacity:1}100%{transform:translateY(-10vh) translateX(40px) rotate(180deg);opacity:0}}"
            + "@keyframes luna-glow-pulse{0%{transform:translateY(100vh) scale(1);opacity:0}10%{opacity:.8}50%{transform:translateY(50vh) scale(1.3);opacity:.6}90%{opacity:.8}100%{transform:translateY(-10vh) scale(.8);opacity:0}}"

            + ".luna-particle-dust{animation:luna-float-up linear infinite;opacity:0}"
            + ".luna-particle-petal{animation:luna-drift linear infinite;opacity:0}"
            + ".luna-particle-candle{animation:luna-glow-pulse ease-in-out infinite;opacity:0}"

            + ".luna-scene-fade-in{animation:luna-fade-in .8s cubic-bezier(.19,1,.22,1) forwards}"
            + ".luna-scene-fade-out{animation:luna-fade-out .5s cubic-bezier(.4,0,1,1) forwards}"
            + ".luna-scene-slide-up-enter{animation:luna-slide-up-enter .8s cubic-bezier(.19,1,.22,1) forwards}"
            + ".luna-scene-slide-up-exit{animation:luna-slide-up-exit .5s cubic-bezier(.4,0,1,1) forwards}"
            + ".luna-scene-zoom-in-enter{animation:luna-zoom-in-enter .8s cubic-bezier(.19,1,.22,1) forwards}"
            + ".luna-scene-zoom-out-exit{animation:luna-zoom-out-exit .5s cubic-bezier(.4,0,1,1) forwards}"
            + ".luna-scene-parallax-enter{animation:luna-parallax-enter .8s cubic-bezier(.19,1,.22,1) forwards}"
            + ".luna-scene-parallax-exit{animation:luna-parallax-exit .5s cubic-bezier(.4,0,1,1) forwards}"

            + "@keyframes luna-fade-in{from{opacity:0}to{opacity:1}}"
            + "@keyframes luna-fade-out{from{opacity:1}to{opacity:0}}"
            + "@keyframes luna-slide-up-enter{from{opacity:0;transform:translateY(60px)}to{opacity:1;transform:translateY(0)}}"
            + "@keyframes luna-slide-up-exit{from{opacity:1;transform:translateY(0)}to{opacity:0;transform:translateY(-60px)}}"
            + "@keyframes luna-zoom-in-enter{from{opacity:0;transform:scale(.85)}to{opacity:1;transform:scale(1)}}"
            + "@keyframes luna-zoom-out-exit{from{opacity:1;transform:scale(1)}to{opacity:0;transform:scale(1.15)}}"
            + "@keyframes luna-parallax-enter{from{opacity:0;transform:translateX(40px)}to{opacity:1;transform:translateX(0)}}"
            + "@keyframes luna-parallax-exit{from{opacity:1;transform:translateX(0)}to{opacity:0;transform:translateX(-40px)}}"

            + ".luna-click-overlay{position:absolute;inset:0;z-index:10;cursor:pointer}"

            + "@media(max-width:768px){.luna-scene-content{padding:20px 16px}.luna-progress{bottom:20px;gap:8px}}";

        var style = document.createElement("style");
        style.setAttribute("data-luna-scene-engine", "true");
        style.textContent = css;
        document.head.appendChild(style);
    }


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
        this.particlesEl = null;

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
        injectStyles();
        this.container.style.position = "relative";
        this.container.style.overflow = "hidden";
        this.container.classList.add("luna-scene-engine");

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
        scene.className = "luna-scene";
        if (sceneConfig.className) {
            scene.className += " " + sceneConfig.className;
        }
        scene.setAttribute("data-scene-index", index);
        scene.setAttribute("data-scene-id", sceneConfig.id || "");

        /* --- Background --- */
        if (sceneConfig.background) {
            var bg = document.createElement("div");
            bg.className = "luna-scene-bg";
            bg.style.backgroundImage = sceneConfig.background.startsWith("url") || sceneConfig.background.startsWith("linear") || sceneConfig.background.startsWith("radial")
                ? sceneConfig.background
                : "url('" + sceneConfig.background + "')";
            scene.appendChild(bg);
        }

        /* --- Overlay --- */
        if (sceneConfig.overlay) {
            var overlay = document.createElement("div");
            overlay.className = "luna-scene-overlay";
            overlay.style.background = sceneConfig.overlay;
            scene.appendChild(overlay);
        }

        /* --- Particles --- */
        if (sceneConfig.particles && PARTICLE_PRESETS[sceneConfig.particles]) {
            var particlesContainer = document.createElement("div");
            particlesContainer.className = "luna-particles";
            scene.appendChild(particlesContainer);
            this._createParticles(particlesContainer, PARTICLE_PRESETS[sceneConfig.particles]);
        }

        /* --- Decorative elements --- */
        if (sceneConfig.elements && sceneConfig.elements.length) {
            for (var e = 0; e < sceneConfig.elements.length; e++) {
                var el = sceneConfig.elements[e];
                var deco = document.createElement("div");
                deco.className = "luna-deco-" + (el.type || "line-h");
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

        /* --- Content --- */
        var content = document.createElement("div");
        content.className = "luna-scene-content";

        if (sceneConfig.content) {
            var c = sceneConfig.content;

            if (c.eyebrow) {
                var eyebrow = document.createElement("div");
                eyebrow.className = "luna-scene-eyebrow";
                eyebrow.textContent = this.interpolate(c.eyebrow);
                content.appendChild(eyebrow);
            }

            if (c.title) {
                var title = document.createElement("h2");
                title.className = "luna-scene-title";
                title.innerHTML = this.interpolate(c.title);
                content.appendChild(title);
            }

            if (c.subtitle) {
                var subtitle = document.createElement("p");
                subtitle.className = "luna-scene-subtitle";
                subtitle.textContent = this.interpolate(c.subtitle);
                content.appendChild(subtitle);
            }

            if (c.text) {
                var text = document.createElement("p");
                text.className = "luna-scene-text";
                text.textContent = this.interpolate(c.text);
                content.appendChild(text);
            }
        }

        scene.appendChild(content);

        /* --- Hint --- */
        if (sceneConfig.content && sceneConfig.content.hint) {
            var hint = document.createElement("div");
            hint.className = "luna-scene-hint";
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
                oldScene.classList.add("exiting");
            }

            self._updateProgress(index);

            /* Cleanup after animation */
            setTimeout(function () {
                if (oldScene && oldScene.parentNode) {
                    oldScene.parentNode.removeChild(oldScene);
                }
                if (oldScene) {
                    oldScene.classList.remove(transEnter.exit, "exiting");
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

        this.container.classList.remove("luna-scene-engine");
    };


    /* =====================================================
       PRIVATE: SCROLL INTERACTION
       ===================================================== */

    Engine.prototype._setupScrollInteraction = function () {
        var self = this;
        var ticking = false;

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
        var scrollTrigger = windowHeight * 0.35;

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
    };


    /* =====================================================
       PRIVATE: PROGRESS BAR
       ===================================================== */

    Engine.prototype._createProgressBar = function () {
        var self = this;
        var total = this.scenes.length;
        if (total <= 1) return;

        this.progressEl = document.createElement("div");
        this.progressEl.className = "luna-progress";

        for (var i = 0; i < total; i++) {
            var dot = document.createElement("button");
            dot.className = "luna-progress-dot";
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
        var dots = this.progressEl.querySelectorAll(".luna-progress-dot");
        for (var i = 0; i < dots.length; i++) {
            dots[i].classList.toggle("active", i === index);
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

            /* Apply base styles */
            var keys = Object.keys(preset.styles);
            for (var k = 0; k < keys.length; k++) {
                particle.style[keys[k]] = preset.styles[keys[k]];
            }

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
        var scenes = this.container.querySelectorAll(".luna-scene");
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
