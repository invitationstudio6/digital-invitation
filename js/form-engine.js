/* =====================================================
   LUNA FORM ENGINE
   Shared logic for category-specific invitation forms
   ===================================================== */

function lunaFormEngine(config) {
    var params = new URLSearchParams(window.location.search);
    var design = (params.get("design") || config.defaultDesign || "").toLowerCase();
    var packageName = (params.get("package") || "basic").toLowerCase();
    var category = config.category;
    var designId = design;

    lunaInitLanguage();

    document.getElementById("pillDesign").textContent = design ? design.charAt(0).toUpperCase() + design.slice(1) : "—";
    document.getElementById("pillPackage").textContent = packageName.charAt(0).toUpperCase() + packageName.slice(1);
    document.getElementById("pillCategory").textContent = lunaCategoryName(category);

    var LANGUAGE_OPTIONS = [
        { value: "az", text: "Azərbaycan" },
        { value: "en", text: "English" },
        { value: "ru", text: "\u0420\u0443\u0441\u0441\u043a\u0438\u0439" },
        { value: "tr", text: "T\u00fcrk\u00e7e" }
    ];

    function getCategoryFields() {
        var f = [];
        var fields = config.fields || [];
        fields.forEach(function(fd) {
            f.push(fd);
        });
        f.push({ name: "date", type: "date", labelI18n: "formDate", required: true, col: "half", forPackages: ["video", "basic", "premium", "luxury"] });
        f.push({ name: "time", type: "time", labelI18n: "formTime", required: true, col: "half", value: "19:00", forPackages: ["video", "basic", "premium", "luxury"] });
        f.push({ name: "venue", type: "text", labelI18n: "formVenue", required: true, col: "half", placeholder: config.venuePlaceholder || "Crystal Hall", forPackages: ["video", "basic", "premium", "luxury"] });
        f.push({ name: "location", type: "text", labelI18n: "formLocation", required: true, col: "half", placeholder: "Bak\u0131, Az\u0259rbaycan", forPackages: ["video", "basic", "premium", "luxury"] });
        if (config.extraFields) {
            config.extraFields.forEach(function(fd) {
                f.push(fd);
            });
        }
        f.push({ name: "map", type: "url", labelI18n: "formMap", col: "full", placeholder: "https://maps.google.com/...", forPackages: ["premium", "luxury"] });
        f.push({ name: "message", type: "textarea", labelKey: "formMessage", col: "full", placeholder: config.messagePlaceholder || "Sizi d\u00e9v\u00e9t edirik...", rows: 3, forPackages: ["video", "basic", "premium", "luxury"] });
        if (config.storyField) {
            f.push({ name: "story", type: "textarea", labelI18n: "formStory", col: "full", placeholderKey: "formStoryPlaceholder", rows: 5, forPackages: ["luxury"] });
        }
        f.push({ name: "invitationLanguage", type: "select", labelI18n: "formLanguage", col: "half", options: LANGUAGE_OPTIONS, forPackages: ["video", "basic", "premium", "luxury"] });
        return f;
    }

    function renderField(field, index) {
        var delay = (index * 0.035).toFixed(2);
        var colClass = field.col === "full" ? " full" : "";
        var pkgAttr = field.forPackages ? ' data-packages="' + field.forPackages.join(",") + '"' : '';
        var hiddenStyle = ' style="animation-delay:' + delay + 's"';
        var fieldId = field.id || field.name;

        var html = '<div class="form-field' + colClass + '"' + pkgAttr + hiddenStyle + ' data-field="' + field.name + '">';

        if (field.labelI18n) {
            html += '<label for="' + fieldId + '" data-i18n="' + field.labelI18n + '">' + lunaT(field.labelI18n) + '</label>';
        } else if (field.labelKey) {
            html += '<label for="' + fieldId + '">' + field.labelKey + '</label>';
        } else if (field.label) {
            html += '<label for="' + fieldId + '">' + field.label + '</label>';
        }

        if (field.type === "select") {
            html += '<select id="' + fieldId + '" name="' + field.name + '">';
            if (field.options) {
                field.options.forEach(function(opt) {
                    html += '<option value="' + opt.value + '">' + opt.text + '</option>';
                });
            }
            html += '</select>';
        } else if (field.type === "textarea") {
            var ph = field.placeholder || "";
            html += '<textarea id="' + fieldId + '" name="' + field.name + '"';
            if (ph) html += ' placeholder="' + ph + '"';
            if (field.rows) html += ' rows="' + field.rows + '"';
            if (field.required) html += ' required';
            html += '></textarea>';
        } else {
            html += '<input id="' + fieldId + '" name="' + field.name + '" type="' + field.type + '"';
            if (field.required) html += ' required';
            if (field.placeholder) html += ' placeholder="' + field.placeholder + '"';
            if (field.value) html += ' value="' + field.value + '"';
            html += '>';
        }

        html += '</div>';
        return html;
    }

    function renderForm() {
        var fields = getCategoryFields();
        var html = "";
        fields.forEach(function(field, i) {
            html += renderField(field, i);
        });
        document.getElementById("formGrid").innerHTML = html;
        applyVisibility();
    }

    function applyVisibility() {
        document.querySelectorAll(".form-field").forEach(function(el) {
            var allowedPkgs = el.getAttribute("data-packages");
            if (!allowedPkgs) {
                el.style.display = "";
                return;
            }
            var pkgs = allowedPkgs.split(",");
            el.style.display = (pkgs.indexOf(packageName) !== -1) ? "" : "none";
        });
    }

    /* ===== OPENING PREVIEW HTML ===== */
    function _opvHTML(type) {
        var s, k;
        switch (type) {
            case "curtain":
                return '<div class="opv opv-curtain"><i class="c-l"></i><i class="c-r"></i><i class="c-t"></i><i class="c-rail"></i><i class="c-val"></i></div>';
            case "stairs":
                s = '<div class="opv opv-stairs">';
                for (k = 0; k < 6; k++) s += '<i></i>';
                return s + '</div>';
            case "door":
                return '<div class="opv opv-door"><i class="d-l"></i><i class="d-r"></i></div>';
            case "wax-seal":
                return '<div class="opv opv-wax"><i>\u2665</i></div>';
            case "starry-night":
                s = '<div class="opv opv-stars">';
                for (k = 0; k < 6; k++) s += '<i></i>';
                return s + '</div>';
            case "celebration-pop": {
                var dirs = [[-70,-90],[70,-90],[-100,-20],[100,-25],[-60,60],[65,70],[-15,-110],[20,95]];
                var cols = ["#e74c3c","#f1c40f","#9b59b6","#2ecc71","#3498db","#e67e22","#fd79a8","#00cec9"];
                s = '<div class="opv opv-pop">';
                for (k = 0; k < 8; k++) s += '<i style="--tx:' + dirs[k][0] + 'px;--ty:' + dirs[k][1] + 'px;background:' + cols[k] + '"></i>';
                return s + '</div>';
            }
            case "floral-paper":
                s = '<div class="opv opv-petals">';
                for (k = 0; k < 6; k++) s += '<i></i>';
                return s + '</div>';
            case "luxury-romance":
                return '<div class="opv opv-lux"><i></i></div>';
            case "envelope-seal":
                return '<div class="opv opv-env"><i class="e-ltr"></i><i class="e-pkt"></i><i class="e-flp"></i><i class="e-wax"></i></div>';
            case "ribbon":
                return '<div class="opv opv-rbn"><i class="r-v"></i><i class="r-h"></i><i class="r-bow"></i></div>';
            case "wood-door":
                return '<div class="opv opv-wdoor"><div class="w-arch"><div class="w-door"><i class="w-panel w-panel-top"></i><i class="w-panel w-panel-bot"></i><i class="w-knob"></i></div></div><div class="w-crack"></div></div>';
            case "typewriter":
                return '<div class="opv opv-type"><i></i></div>';
            case "candlelight":
                return '<div class="opv opv-candle"><i></i></div>';
            case "winter-drift": {
                s = '<div class="opv opv-snow">';
                for (k = 0; k < 7; k++) s += '<i></i>';
                return s + '</div>';
            }
            case "royal-scroll":
                return '<div class="opv opv-scroll"><i></i></div>';
            case "magic-wand":
                return '<div class="opv opv-magic"><i class="m-wand"></i><i class="m-spark s1"></i><i class="m-spark s2"></i><i class="m-spark s3"></i></div>';
            case "glowing-door":
                return '<div class="opv opv-gdoor"><div class="gd-glow"></div><div class="gd-crack"></div><div class="gd-l"><div class="gd-panel"></div><div class="gd-hl"></div></div><div class="gd-r"><div class="gd-panel"></div><div class="gd-hr"></div></div><div class="gd-particles"><i class="gd-sp"></i><i class="gd-sp"></i><i class="gd-sp"></i></div></div>';
            case "ancient-forest":
                s = '<div class="opv opv-forest">';
                for (k = 0; k < 5; k++) s += '<i></i>';
                return s + '</div>';
            case "old-book":
                return '<div class="opv opv-book"><i class="ob-c"></i><i class="ob-p"></i></div>';
            default:
                return "";
        }
    }

    function _resolveOpeningType(tpl) {
        if (tpl && tpl.layoutConfig && tpl.layoutConfig.openingType) return tpl.layoutConfig.openingType;
        if (tpl && tpl.openingType) return tpl.openingType;
        try {
            var saved = JSON.parse(localStorage.getItem("luna_invitation_theme") || "{}");
            if (saved.openingType) return saved.openingType;
        } catch (e) {}
        return "envelope-seal";
    }

    function populateTemplateSelect() {
        var grid = document.getElementById("templateGrid");
        var hidden = document.getElementById("selectedTemplate");
        if (!grid || !hidden) return;
        var templates = (typeof LUNA_TEMPLATES !== "undefined") ? LUNA_TEMPLATES : [];
        var filtered = templates.filter(function(t) {
            return t.category === category && t.packages.indexOf(packageName) !== -1;
        });
        grid.innerHTML = "";
        var currentDesign = design || (filtered[0] && filtered[0].id) || "";
        hidden.value = currentDesign;

        filtered.forEach(function(t) {
            var card = document.createElement("div");
            card.className = "tpl-card" + (t.id === currentDesign ? " selected" : "");
            card.setAttribute("data-tpl", t.id);
            var minPkg = t.minPackage ? t.minPackage.charAt(0).toUpperCase() + t.minPackage.slice(1) : "";
            var opvType = _resolveOpeningType(t);
            var opvHtml = _opvHTML(opvType);
            card.innerHTML =
                '<img class="tpl-card-img" src="' + t.thumbnail + '" alt="' + t.name + '" loading="lazy">' +
                opvHtml +
                '<div class="tpl-card-info">' +
                    '<h4>' + t.name + '</h4>' +
                    '<p>' + t.style + '</p>' +
                    '<span class="pkg">' + minPkg + '</span>' +
                '</div>';
            card.addEventListener("click", function() {
                grid.querySelectorAll(".tpl-card").forEach(function(c) { c.classList.remove("selected"); });
                this.classList.add("selected");
                hidden.value = this.getAttribute("data-tpl");
                design = this.getAttribute("data-tpl");
                var pillEl = document.getElementById("pillDesign");
                if (pillEl) pillEl.textContent = t.name;
            });
            grid.appendChild(card);
        });
    }

    var currentStep = 1;
    var totalSteps = 5;

    function goToStep(step) {
        if (step < 1 || step > totalSteps) return;
        currentStep = step;

        document.querySelectorAll(".form-step").forEach(function(el) { el.classList.remove("active"); });
        var stepEl = document.getElementById("formStep" + step);
        if (stepEl) stepEl.classList.add("active");

        document.querySelectorAll(".step-dot").forEach(function(dot) {
            var s = parseInt(dot.getAttribute("data-step"));
            dot.classList.remove("active", "done");
            if (s === step) dot.classList.add("active");
            else if (s < step) dot.classList.add("done");
        });
        document.querySelectorAll(".step-line").forEach(function(line, i) {
            line.classList.toggle("done", i < step - 1);
        });

        document.getElementById("stepBack").style.display = step > 1 ? "" : "none";
        var isLast = step === totalSteps;
        document.getElementById("stepNext").style.display = isLast ? "none" : "";
        document.getElementById("stepSubmit").style.display = isLast ? "" : "none";

        if (step === 1) renderPkgPicker();
        if (step === 2) populateTemplateSelect();
        if (step === 4) renderMediaFields();
        if (step === 5) renderPreviewSummary();

        var formCard = document.querySelector(".form-card");
        if (formCard) formCard.scrollIntoView({ behavior: "smooth", block: "start" });
    }

    document.querySelectorAll(".step-dot").forEach(function(dot) {
        dot.addEventListener("click", function() {
            var s = parseInt(this.getAttribute("data-step"));
            if (s <= currentStep) goToStep(s);
        });
    });

    document.getElementById("stepNext").addEventListener("click", function() {
        if (currentStep === 1 && !packageName) {
            alert("Paket seçin");
            return;
        }
        goToStep(currentStep + 1);
    });

    document.getElementById("stepBack").addEventListener("click", function() {
        goToStep(currentStep - 1);
    });

    function renderPkgPicker() {
        var container = document.getElementById("pkgPicker");
        if (!container || typeof LUNA_PACKAGES === "undefined") return;
        container.innerHTML = "";
        var cfgFeatures = {};
        try { cfgFeatures = JSON.parse(localStorage.getItem('luna_package_config') || '{}').features || {}; } catch(e) {}
        LUNA_PACKAGES.forEach(function(pkg) {
            var card = document.createElement("div");
            card.className = "pkg-pick" + (pkg.id === packageName ? " selected" : "") + (pkg.featured ? " featured" : "");
            card.setAttribute("data-pkg", pkg.id);
            var tagline = (pkg.tagline && pkg.tagline[LUNA_LANG]) || (pkg.tagline && pkg.tagline.az) || "";
            var labels = (pkg.featureLabels && pkg.featureLabels[LUNA_LANG]) || (pkg.featureLabels && pkg.featureLabels.az) || {};
            var pkgFeats = cfgFeatures[pkg.id] || pkg.features || [];
            var featsHtml = "";
            if (Array.isArray(pkgFeats)) {
                pkgFeats.forEach(function(f) {
                    featsHtml += '<div class="pkg-pick-feat">' + lunaEscapeHtml(f) + '</div>';
                });
            } else {
                Object.keys(pkgFeats).forEach(function(key) {
                    if (pkgFeats[key]) {
                        featsHtml += '<div class="pkg-pick-feat">' + (labels[key] || key) + '</div>';
                    }
                });
            }
            var catPrice = (typeof lunaGetCategoryPrice === "function") ? lunaGetCategoryPrice(category, pkg.id) : pkg.price;
            card.innerHTML =
                '<div class="pkg-pick-name">' + pkg.name + '</div>' +
                '<div class="pkg-pick-price">' + catPrice + ' <small>' + pkg.currency + '</small></div>' +
                '<div class="pkg-pick-tagline">' + tagline + '</div>' +
                '<div class="pkg-pick-features">' + featsHtml + '</div>';
            card.addEventListener("click", function() {
                container.querySelectorAll(".pkg-pick").forEach(function(c) { c.classList.remove("selected"); });
                this.classList.add("selected");
                packageName = pkg.id;
                document.getElementById("pillPackage").textContent = pkg.name;
                applyVisibility();
            });
            container.appendChild(card);
        });
    }

    function renderMediaFields() {
        var grid = document.getElementById("mediaGrid");
        if (!grid) return;
        var html = '';
        var tierRank = {"default":0,"basic":1,"premium":2,"luxury":3};
        var currentRank = tierRank[packageName] || 0;

        if (currentRank >= 2) {
            html += '<div class="form-field full" style="animation-delay:.05s"><label>Şəkil linkləri</label><textarea name="images" placeholder="https://... (hər sətirdə bir link)" rows="3"></textarea></div>';
            html += '<div class="form-field full" style="animation-delay:.1s"><label>Şəkillər yüklə</label><input type="file" name="photos" accept="image/*" multiple></div>';
        }
        if (currentRank >= 3) {
            html += '<div class="form-field full" style="animation-delay:.15s"><label>Musiqi linki</label><input type="url" name="music" placeholder="https://.../song.mp3"></div>';
        }
        if (packageName === "video") {
            html += '<div class="form-field full" style="animation-delay:.05s"><label>Video yüklə</label><input type="file" name="videoFile" accept="video/*"></div>';
        }
        if (!html) {
            html = '<div style="text-align:center;padding:40px;color:var(--muted);font-size:11px">Bu paketdə əlavə media sahəsi yoxdur.</div>';
        }
        grid.innerHTML = html;
    }

    function renderPreviewSummary() {
        var container = document.getElementById("previewSummary");
        if (!container) return;
        var fields = document.getElementById("formGrid");
        var rows = '';

        var pkgObj = typeof LUNA_PACKAGES !== "undefined" ? LUNA_PACKAGES.find(function(p) { return p.id === packageName; }) : null;
        var summaryPrice = (typeof lunaGetCategoryPrice === "function") ? lunaGetCategoryPrice(category, packageName) : (pkgObj ? pkgObj.price : "");
        rows += '<div class="preview-row"><span class="preview-row-label">Paket</span><span class="preview-row-value">' + (pkgObj ? pkgObj.name : packageName) + ' — ' + summaryPrice + ' AZN</span></div>';

        var tplId = document.getElementById("selectedTemplate") ? document.getElementById("selectedTemplate").value : "";
        var tplObj = typeof LUNA_TEMPLATES !== "undefined" ? LUNA_TEMPLATES.find(function(t) { return t.id === tplId; }) : null;
        rows += '<div class="preview-row"><span class="preview-row-label">Dizayn</span><span class="preview-row-value">' + (tplObj ? tplObj.name + ' (' + tplObj.style + ')' : tplId || '—') + '</span></div>';

        if (fields) {
            var labels = fields.querySelectorAll("label");
            var inputs = fields.querySelectorAll("input, textarea, select");
            for (var i = 0; i < inputs.length; i++) {
                var inp = inputs[i];
                var lbl = labels[i];
                if (!inp.name || inp.type === "file" || inp.type === "hidden") continue;
                var val = inp.value.trim();
                if (!val) continue;
                var name = lbl ? lbl.textContent.trim() : inp.name;
                rows += '<div class="preview-row"><span class="preview-row-label">' + name + '</span><span class="preview-row-value">' + val + '</span></div>';
            }
        }

        container.innerHTML = '<h4>Dəvətnamə xülasəsi</h4>' + rows;
    }

    renderForm();
    applyVisibility();
    populateTemplateSelect();
    goToStep(1);

    var defaultImages = config.defaultImages || [
        "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1500&q=90",
        "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?auto=format&fit=crop&w=1500&q=90",
        "https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&w=1500&q=90",
        "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=1500&q=90"
    ];

    function filesToDataUrls(files) {
        var list = Array.from(files || []).slice(0, 8);
        return Promise.all(list.map(function(file) {
            return new Promise(function(resolve) {
                var reader = new FileReader();
                reader.onload = function() { resolve(reader.result); };
                reader.onerror = function() { resolve(null); };
                reader.readAsDataURL(file);
            });
        })).then(function(urls) {
            return urls.filter(Boolean);
        });
    }

    function collectValues() {
        var values = {};
        var form = document.getElementById("invitationForm");
        var els = form.elements;
        for (var i = 0; i < els.length; i++) {
            var el = els[i];
            if (!el.name) continue;
            if (el.type === "file") {
                values[el.name] = el.files;
            } else {
                values[el.name] = el.value.trim();
            }
        }
        return values;
    }

    document.getElementById("invitationForm").addEventListener("submit", function(e) {
        e.preventDefault();
        var v = collectValues();

        if (v.date && new Date(v.date + "T00:00:00") < new Date(new Date().toDateString())) {
            alert("Tarix ke\u00e7mi\u015fd\u00e9 ola bilm\u00e9z. Z\u00e9hm\u00e9t olmasa d\u00fczg\u00fcn tarix se\u00e7in.");
            return;
        }

        var primaryName = "";
        var invitationId = "";

        if (config.buildId) {
            var idResult = config.buildId(v);
            primaryName = idResult.primaryName;
            invitationId = idResult.invitationId;
        } else {
            primaryName = v.eventName || v.celebrant || v.graduate || v.companyName || "Luna";
            invitationId = lunaCreateSlug(primaryName);
        }

        var imageText = v.images || "";
        var fromText = imageText
            ? imageText.split(/\s+/).filter(function(url) { return /^https?:\/\//i.test(url); })
            : [];

        filesToDataUrls(v.photos).then(function(fromFiles) {
            var videoFile = v.videoFile && v.videoFile[0] ? v.videoFile[0] : null;

            function proceedWithVideo(videoDataUrl) {
                var images = fromText.concat(fromFiles);

                var data = {
                    id: invitationId,
                    package: packageName,
                    category: category,
                    design: design,
                    approved: false,
                    date: v.date,
                    dateShort: lunaDateShort(v.date),
                    time: v.time,
                    venue: v.venue,
                    location: v.location,
                    map: v.map || "https://www.google.com/maps",
                    message: v.message || "",
                    countdown: v.date + "T" + v.time + ":00",
                    images: images.length ? images : defaultImages,
                    invitationLanguage: v.invitationLanguage || "az",
                    template: v.template || ""
                };

                if (videoDataUrl) data.videoUrl = videoDataUrl;

                if (config.buildData) {
                    config.buildData(data, v);
                }

                try {
                    lunaSaveInvitation(data);
                } catch (err) {
                    data.images = fromText.length ? fromText : defaultImages;
                    lunaSaveInvitation(data);
                }

                /* Notify Luna admin via Formspree (non-blocking) */
                if (typeof lunaNotifyOrder === "function") {
                    var order = {
                        category: category,
                        package: packageName,
                        design: design,
                        id: data.id,
                        bride: data.bride || "",
                        groom: data.groom || "",
                        celebrant: data.celebrant || "",
                        graduate: data.graduate || "",
                        companyName: data.companyName || "",
                        eventName: data.eventName || "",
                        parentName: data.parentName || "",
                        date: data.date || "",
                        time: data.time || "",
                        venue: data.venue || "",
                        location: data.location || "",
                        message: data.message || "",
                        contact: data.contact || "",
                        website: data.website || ""
                    };
                    lunaNotifyOrder(order);
                }

                var tplData = (typeof LUNA_TEMPLATES !== "undefined") ? LUNA_TEMPLATES.find(function(t) { return t.id === designId; }) : null;
                var viewerFile = (tplData && tplData.experienceType === "interactive") ? "../data/interactive.html" : "../data/invitation.html";
                var url = new URL(viewerFile, window.location.href);
                url.searchParams.set("id", invitationId);

                /* Register in admin orders list */
                if (typeof lunaSaveOrder === "function") {
                    lunaSaveOrder({
                        id: "ord_" + Date.now(),
                        ts: new Date().toISOString(),
                        productType: "invitation",
                        productTypeName: "D\u00e9v\u00e9tnam\u00e9",
                        lang: typeof LUNA_LANG !== "undefined" ? LUNA_LANG : "az",
                        status: "new",
                        contact: v.contact || "",
                        data: {
                            category: data.category,
                            package: data.package,
                            design: data.design,
                            names: [data.bride, data.groom, data.celebrant, data.graduate, data.eventName].filter(Boolean).join(" & ") || "-",
                            date: data.date,
                            time: data.time,
                            venue: data.venue,
                            location: data.location,
                            contact: v.contact || ""
                        },
                        invitationId: invitationId
                    });
                }

                /* APPROVAL FLOW: link is prepared but NOT revealed. Admin activates it after payment confirmation. */
                var link = document.getElementById("generatedLink");
                link.href = url.href;
                link.textContent = url.href;
                document.getElementById("openLink").href = url.href;
                link.style.display = "none";
                var actionsEl = document.querySelector("#resultCard .result-actions");
                if (actionsEl) actionsEl.style.display = "none";
                var pendMsg = document.getElementById("pendingApprovalMsg");
                if (pendMsg) {
                    pendMsg.style.display = "block";
                } else {
                    var rc = document.getElementById("resultCard");
                    rc.insertAdjacentHTML("beforeend",
                        '<p id="pendingApprovalMsg" style="margin-top:16px;padding:14px 18px;background:rgba(196,168,130,.1);border:1px solid rgba(196,168,130,.3);border-radius:8px;font-size:12px;line-height:1.9;color:#7a5c49;">' +
                        '\u23F3 <b>Sifari\u015finiz al\u0131nd\u0131!</b> \u00d6d\u0259ni\u015f t\u0259sdiql\u0259ndikd\u0259n sonra d\u00e9v\u0259tnam\u00e9 linki aktivl\u015f\u0259c\u0259k v\u00e9 WhatsApp vasit\u0259sil\u0259 sizinl\u0259 payla\u015f\u0131lacaq.</p>'
                    );
                }
                document.getElementById("resultCard").style.display = "block";
                document.getElementById("resultCard").scrollIntoView({ behavior: "smooth", block: "center" });
            }

            if (videoFile) {
                var reader = new FileReader();
                reader.onload = function(ev) { proceedWithVideo(ev.target.result); };
                reader.readAsDataURL(videoFile);
            } else {
                proceedWithVideo(null);
            }
        });
    });

    window.copyLink = function() {
        var link = document.getElementById("generatedLink").href;
        navigator.clipboard.writeText(link).then(function() {
            alert(lunaT("formCopied"));
        }).catch(function() {
            alert("Link: " + link);
        });
    };

    window.addEventListener("scroll", function() {
        document.getElementById("navbar").classList.toggle("scrolled", window.scrollY > 40);
    });

    var toggle = document.getElementById("menuToggle");
    var mobileMenu = document.getElementById("mobileMenu");

    toggle.addEventListener("click", function() {
        toggle.classList.toggle("open");
        mobileMenu.classList.toggle("open");
        document.body.classList.toggle("menu-open");
    });

    mobileMenu.querySelectorAll("a").forEach(function(a) {
        a.addEventListener("click", function() {
            toggle.classList.remove("open");
            mobileMenu.classList.remove("open");
            document.body.classList.remove("menu-open");
        });
    });
}