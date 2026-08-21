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
            card.innerHTML =
                '<img class="tpl-card-img" src="' + t.thumbnail + '" alt="' + t.name + '" loading="lazy">' +
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
        LUNA_PACKAGES.forEach(function(pkg) {
            var card = document.createElement("div");
            card.className = "pkg-pick" + (pkg.id === packageName ? " selected" : "") + (pkg.featured ? " featured" : "");
            card.setAttribute("data-pkg", pkg.id);
            var tagline = (pkg.tagline && pkg.tagline[LUNA_LANG]) || (pkg.tagline && pkg.tagline.az) || "";
            var labels = (pkg.featureLabels && pkg.featureLabels[LUNA_LANG]) || (pkg.featureLabels && pkg.featureLabels.az) || {};
            var featsHtml = "";
            Object.keys(pkg.features).forEach(function(key) {
                if (pkg.features[key]) {
                    featsHtml += '<div class="pkg-pick-feat">' + (labels[key] || key) + '</div>';
                }
            });
            card.innerHTML =
                '<div class="pkg-pick-name">' + pkg.name + '</div>' +
                '<div class="pkg-pick-price">' + pkg.price + ' <small>' + pkg.currency + '</small></div>' +
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
        rows += '<div class="preview-row"><span class="preview-row-label">Paket</span><span class="preview-row-value">' + (pkgObj ? pkgObj.name : packageName) + ' — ' + (pkgObj ? pkgObj.price + ' AZN' : '') + '</span></div>';

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

                var tplData = (typeof LUNA_TEMPLATES !== "undefined") ? LUNA_TEMPLATES.find(function(t) { return t.id === designId; }) : null;
                var viewerFile = (tplData && tplData.experienceType === "interactive") ? "../data/interactive.html" : "../data/invitation.html";
                var url = new URL(viewerFile, window.location.href);
                url.searchParams.set("id", invitationId);
                var link = document.getElementById("generatedLink");
                link.href = url.href;
                link.textContent = url.href;
                document.getElementById("openLink").href = url.href;
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