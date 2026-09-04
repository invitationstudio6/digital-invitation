/* =====================================================
   LUNA — REALISTIC 3D RIBBON OPENING
   A gift box with a satin bow that unties like a real
   present. Loaded as an ES module; exposes
   window.__lunaRibbon3D.play() so the invitation flow
   can trigger the untie on "open". Falls back silently
   to the CSS ribbon if WebGL is unavailable.
   ===================================================== */
import * as THREE from 'three';
import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js';

(function () {
    var container = document.getElementById('ribbon3d');
    if (!container) return;

    var clamp01 = function (x) { return Math.max(0, Math.min(1, x)); };
    var ramp = function (t, a, b) { return clamp01((t - a) / (b - a)); };
    var easeInOutCubic = function (x) { return x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2; };

    // box & ribbon dims
    var HX = 1.0, HY = 0.55, HZ = 0.75;
    var WALL = 0.07, RIB_E = 0.03, RIB_W = 0.16, BOW_W = 0.13;

    var renderer;
    try {
        renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    } catch (e) { return; }

    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setClearColor(0x000000, 0);
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    container.appendChild(renderer.domElement);

    var sceneHost = document.getElementById('ribbonScene');
    if (sceneHost) sceneHost.classList.add('ribbon-3d-active');

    var scene = new THREE.Scene();
    var camera = new THREE.PerspectiveCamera(40, container.clientWidth / container.clientHeight, 0.1, 100);
    camera.position.set(3.1, 2.3, 4.5);
    camera.lookAt(0, 0.1, 0);

    var pmrem = new THREE.PMREMGenerator(renderer);
    scene.environment = pmrem.fromScene(new RoomEnvironment(renderer), 0.04).texture;

    scene.add(new THREE.HemisphereLight(0xffffff, 0x8a7a95, 0.6));
    var key = new THREE.DirectionalLight(0xffffff, 2.2);
    key.position.set(4, 7, 3);
    scene.add(key);
    var rim = new THREE.DirectionalLight(0xfff1de, 1.1);
    rim.position.set(-3, 2, -4);
    scene.add(rim);

    // materials (maroon box + gold satin ribbon)
    var boxMat = new THREE.MeshStandardMaterial({ color: 0x5c1630, roughness: 0.5, metalness: 0.15, side: THREE.DoubleSide, transparent: true });
    var boxInnerMat = new THREE.MeshStandardMaterial({ color: 0x3a0c1e, roughness: 0.7, metalness: 0, side: THREE.DoubleSide, transparent: true });
    var wrapMat = new THREE.MeshStandardMaterial({ color: 0xd4af37, roughness: 0.3, metalness: 0.5, side: THREE.DoubleSide, transparent: true, envMapIntensity: 1.2 });
    var bowMat = new THREE.MeshStandardMaterial({ color: 0xd4af37, roughness: 0.32, metalness: 0.45, side: THREE.DoubleSide, transparent: true, envMapIntensity: 1.2 });
    var knotMat = new THREE.MeshStandardMaterial({ color: 0xc89a3e, roughness: 0.36, metalness: 0.4, side: THREE.DoubleSide, transparent: true, envMapIntensity: 1.0 });

    // ---------- ribbon mesh helpers ----------
    function tangentAt(points, i, closed) {
        var n = points.length, a, b;
        if (closed) { a = points[(i - 1 + n) % n]; b = points[(i + 1) % n]; }
        else { a = points[Math.max(0, i - 1)]; b = points[Math.min(n - 1, i + 1)]; }
        var t = new THREE.Vector3().subVectors(b, a);
        if (t.lengthSq() < 1e-8) t.set(1, 0, 0);
        return t.normalize();
    }
    function makeRibbonGeometry(n) {
        var g = new THREE.BufferGeometry();
        g.setAttribute('position', new THREE.BufferAttribute(new Float32Array(n * 2 * 3), 3));
        g.setAttribute('normal', new THREE.BufferAttribute(new Float32Array(n * 2 * 3), 3));
        g.setAttribute('uv', new THREE.BufferAttribute(new Float32Array(n * 2 * 2), 2));
        var idx = [];
        for (var i = 0; i < n - 1; i++) {
            var a = i * 2, b = i * 2 + 1, c = i * 2 + 2, d = i * 2 + 3;
            idx.push(a, b, c, b, d, c);
        }
        g.setIndex(idx);
        return g;
    }
    var _side = new THREE.Vector3();
    function updateRibbon(geo, points, normals, width, closed) {
        var n = points.length;
        var pos = geo.attributes.position.array;
        var nrm = geo.attributes.normal.array;
        var uv = geo.attributes.uv.array;
        for (var i = 0; i < n; i++) {
            var t = tangentAt(points, i, closed);
            _side.crossVectors(normals[i], t);
            if (_side.lengthSq() < 1e-6) _side.set(1, 0, 0);
            _side.normalize();
            var p = points[i];
            pos[i * 6 + 0] = p.x + _side.x * width * 0.5;
            pos[i * 6 + 1] = p.y + _side.y * width * 0.5;
            pos[i * 6 + 2] = p.z + _side.z * width * 0.5;
            pos[i * 6 + 3] = p.x - _side.x * width * 0.5;
            pos[i * 6 + 4] = p.y - _side.y * width * 0.5;
            pos[i * 6 + 5] = p.z - _side.z * width * 0.5;
            nrm[i * 6 + 0] = normals[i].x; nrm[i * 6 + 1] = normals[i].y; nrm[i * 6 + 2] = normals[i].z;
            nrm[i * 6 + 3] = normals[i].x; nrm[i * 6 + 4] = normals[i].y; nrm[i * 6 + 5] = normals[i].z;
            uv[i * 4 + 0] = 0; uv[i * 4 + 1] = i / (n - 1);
            uv[i * 4 + 2] = 1; uv[i * 4 + 3] = i / (n - 1);
        }
        geo.attributes.position.needsUpdate = true;
        geo.attributes.normal.needsUpdate = true;
        geo.attributes.uv.needsUpdate = true;
        geo.computeBoundingSphere();
    }

    // ---------- box (open top) ----------
    var boxGroup = new THREE.Group();
    scene.add(boxGroup);
    function addBoxPart(sx, sy, sz, x, y, z, mat) {
        var m = new THREE.Mesh(new THREE.BoxGeometry(sx, sy, sz), mat);
        m.position.set(x, y, z);
        boxGroup.add(m);
        return m;
    }
    var wallH = HY * 2;
    addBoxPart(HX * 2, wallH, WALL, 0, 0, HZ - WALL / 2, boxMat);            // front
    addBoxPart(HX * 2, wallH, WALL, 0, 0, -(HZ - WALL / 2), boxMat);          // back
    addBoxPart(WALL, wallH, HZ * 2, HX - WALL / 2, 0, 0, boxMat);             // right
    addBoxPart(WALL, wallH, HZ * 2, -(HX - WALL / 2), 0, 0, boxMat);          // left
    addBoxPart(HX * 2 - WALL * 2, WALL, HZ * 2 - WALL * 2, 0, -(HY - WALL / 2), 0, boxInnerMat); // bottom

    // lid (hinged at back edge)
    var lidPivot = new THREE.Group();
    lidPivot.position.set(0, HY + 0.02, -HZ);
    scene.add(lidPivot);
    var LX = HX + 0.04, LZ = HZ + 0.04;
    var lid = new THREE.Mesh(new THREE.BoxGeometry(LX * 2, 0.16, LZ * 2), boxMat);
    lid.position.set(0, 0.08, HZ);
    lidPivot.add(lid);

    // ---------- wrapping ribbons ----------
    function wrapRibbonPath(which) {
        var ra = which === 'x' ? HX : HZ;
        var A = ra + RIB_E, B = HY + RIB_E, seg = 12;
        var points = [], normals = [];
        var edges = [
            { f: [-A, B], t: [A, B], n: [0, 1] },
            { f: [A, B], t: [A, -B], n: [1, 0] },
            { f: [A, -B], t: [-A, -B], n: [0, -1] },
            { f: [-A, -B], t: [-A, B], n: [-1, 0] }
        ];
        for (var ei = 0; ei < 4; ei++) {
            var e = edges[ei];
            for (var s = 0; s <= seg; s++) {
                var u = s / seg;
                var a = e.f[0] + (e.t[0] - e.f[0]) * u;
                var b = e.f[1] + (e.t[1] - e.f[1]) * u;
                if (which === 'x') {
                    points.push(new THREE.Vector3(a, b, 0));
                    normals.push(new THREE.Vector3(e.n[0], e.n[1], 0));
                } else {
                    points.push(new THREE.Vector3(0, b, a));
                    normals.push(new THREE.Vector3(0, e.n[1], e.n[0]));
                }
            }
        }
        return { points: points, normals: normals };
    }

    var pa = wrapRibbonPath('x');
    var ribbonA = new THREE.Mesh(makeRibbonGeometry(pa.points.length), wrapMat);
    updateRibbon(ribbonA.geometry, pa.points, pa.normals, RIB_W, false);
    scene.add(ribbonA);

    var pb = wrapRibbonPath('z');
    var ribbonB = new THREE.Mesh(makeRibbonGeometry(pb.points.length), wrapMat);
    updateRibbon(ribbonB.geometry, pb.points, pb.normals, RIB_W, false);
    scene.add(ribbonB);

    // ---------- bow ----------
    var BOW_BASE_Y = HY + RIB_E + 0.02;
    var bowGroup = new THREE.Group();
    bowGroup.position.set(0, BOW_BASE_Y, 0);
    scene.add(bowGroup);

    var LOOP = { radius: 0.42, squash: 0.62, segments: 40 };
    function bowLoopPoints(side, pull) {
        var c = LOOP.radius;
        var L = 2 * Math.PI * c;
        var N = LOOP.segments;
        var points = [], normals = [];
        for (var k = 0; k <= N; k++) {
            var u = k / N;
            var phi = Math.PI - 2 * Math.PI * u;
            var lx = c + c * Math.cos(phi);
            var lz = c * Math.sin(phi) * LOOP.squash;
            var sx = L * u, sz = 0;
            points.push(new THREE.Vector3(side * (lx + (sx - lx) * pull), 0, lz + (sz - lz) * pull));
            normals.push(new THREE.Vector3(0, 1, 0));
        }
        return { points: points, normals: normals };
    }
    function tailPoints(dir) {
        var N = 14, len = HZ + 0.35;
        var points = [], normals = [];
        for (var k = 0; k <= N; k++) {
            var u = k / N;
            points.push(new THREE.Vector3(dir * 0.16 * u * u, 0, dir * u * len));
            normals.push(new THREE.Vector3(0, 1, 0));
        }
        return { points: points, normals: normals };
    }

    var lpR0 = bowLoopPoints(1, 0);
    var loopR = new THREE.Mesh(makeRibbonGeometry(lpR0.points.length), bowMat);
    updateRibbon(loopR.geometry, lpR0.points, lpR0.normals, BOW_W, false);
    bowGroup.add(loopR);

    var lpL0 = bowLoopPoints(-1, 0);
    var loopL = new THREE.Mesh(makeRibbonGeometry(lpL0.points.length), bowMat);
    updateRibbon(loopL.geometry, lpL0.points, lpL0.normals, BOW_W, false);
    bowGroup.add(loopL);

    var ta = tailPoints(1);
    var tailA = new THREE.Mesh(makeRibbonGeometry(ta.points.length), bowMat);
    updateRibbon(tailA.geometry, ta.points, ta.normals, BOW_W, false);
    bowGroup.add(tailA);

    var tb = tailPoints(-1);
    var tailB = new THREE.Mesh(makeRibbonGeometry(tb.points.length), bowMat);
    updateRibbon(tailB.geometry, tb.points, tb.normals, BOW_W, false);
    bowGroup.add(tailB);

    var knot = new THREE.Mesh(new THREE.BoxGeometry(0.24, 0.12, 0.24), knotMat);
    knot.position.y = 0.04;
    knot.rotation.y = Math.PI / 4;
    bowGroup.add(knot);

    // ---------- animation ----------
    var TL = { untieEnd: 2.2, lidStart: 1.8, lidEnd: 3.0, ribbonEnd: 3.4 };
    var state = 'idle';
    var startTime = 0;

    function applyState(t, idleBob) {
        var pull = easeInOutCubic(ramp(t, 0, TL.untieEnd));
        var lidP = easeInOutCubic(ramp(t, TL.lidStart, TL.lidEnd));
        var off = easeInOutCubic(ramp(t, 2.0, TL.ribbonEnd));

        var lr = bowLoopPoints(1, pull);
        updateRibbon(loopR.geometry, lr.points, lr.normals, BOW_W, false);
        var ll = bowLoopPoints(-1, pull);
        updateRibbon(loopL.geometry, ll.points, ll.normals, BOW_W, false);

        var ks = 1 - 0.72 * pull;
        knot.scale.set(ks, ks * 0.65, ks);

        var slide = clamp01(off * 1.5);
        var fall = clamp01((off - 0.4) * 2.2);
        ribbonA.position.z = slide * (HZ + 1.4);
        ribbonA.position.y = -fall * (HY + 0.55);
        ribbonB.position.x = slide * (HX + 1.4);
        ribbonB.position.y = -fall * (HY + 0.55);
        bowGroup.position.z = slide * (HZ + 0.7);
        bowGroup.position.y = BOW_BASE_Y - fall * (HY + 0.6) + (idleBob || 0);
        bowGroup.rotation.x = -fall * 0.8;

        var boxLift = clamp01(ramp(t, 2.5, 3.3));
        boxGroup.position.y = boxLift * 0.9;

        var fade = (1 - fall) * (1 - boxLift);
        wrapMat.opacity = fade;
        bowMat.opacity = fade;
        knotMat.opacity = fade;
        boxMat.opacity = 1 - boxLift;
        boxInnerMat.opacity = 1 - boxLift;

        lidPivot.rotation.x = -lidP * 2.3;
        lidPivot.position.y = (HY + 0.02 + lidP * 0.15) + boxLift * 0.9;
    }

    function play() {
        if (state === 'playing') return;
        state = 'playing';
        startTime = performance.now() / 1000;
    }

    window.__lunaRibbon3D = { play: play, ok: true };

    // ---------- loop ----------
    function animate() {
        requestAnimationFrame(animate);
        var now = performance.now() / 1000;
        if (state === 'idle') {
            var bob = Math.sin(now * 1.3) * 0.025;
            applyState(0, bob);
        } else {
            var t = now - startTime;
            if (t > TL.ribbonEnd + 0.6) t = TL.ribbonEnd + 0.6;
            applyState(t, 0);
        }
        renderer.render(scene, camera);
    }

    function onResize() {
        if (!container.clientWidth) return;
        camera.aspect = container.clientWidth / container.clientHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(container.clientWidth, container.clientHeight);
    }
    window.addEventListener('resize', onResize);

    applyState(0, 0);
    animate();
})();

