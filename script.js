(function () {
  'use strict';
  var NS = 'http://www.w3.org/2000/svg';
  var reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  var $ = function (s, c) { return (c || document).querySelector(s); };
  var $$ = function (s, c) { return Array.prototype.slice.call((c || document).querySelectorAll(s)); };
  function rnd(s) { var x = Math.sin(s) * 10000; return x - Math.floor(x); }

  /* ---------- 1. Hutan pinus di hero (digambar dengan kode) ---------- */
  function pine(cx, base, h, w) {
    var d = '', tiers = 4, t = h / tiers, i;
    for (i = 0; i < tiers; i++) {
      var top = base - h + i * t * 0.78, bot = top + t * 1.25, hw = w * (0.35 + 0.22 * i);
      d += 'M' + cx + ' ' + top + 'L' + (cx + hw) + ' ' + bot + 'L' + (cx - hw) + ' ' + bot + 'Z';
    }
    return d;
  }
  function layer(id, count, minH, maxH, base, seed) {
    var d = '', i;
    for (i = 0; i < count; i++) {
      var h = minH + rnd(seed * 3 + i) * (maxH - minH);
      d += pine((i + rnd(seed + i) * 0.8) * 1200 / count, base, h, h * 0.28);
    }
    var p = document.createElementNS(NS, 'path');
    p.setAttribute('d', d);
    document.getElementById(id).appendChild(p);
  }
  layer('f0', 30, 80, 170, 290, 5);
  layer('f1', 20, 130, 230, 300, 2);
  layer('f2', 14, 180, 300, 340, 9);

  /* ---------- 2. Progres gulir dan efek parallax ---------- */
  var prog = $('.prog'), sky = $('#skyline'), heroIn = $('#heroIn');
  function onScroll() {
    var y = window.scrollY, max = document.documentElement.scrollHeight - innerHeight;
    prog.style.transform = 'scaleX(' + (max > 0 ? y / max : 0) + ')';
    if (!reduce && y < innerHeight * 1.2) {
      sky.style.transform = 'translateY(' + y * 0.12 + 'px)';
      heroIn.style.transform = 'translateY(' + y * 0.18 + 'px)';
      heroIn.style.opacity = Math.max(0, 1 - y / (innerHeight * 0.85));
    }
  }
  addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ---------- 3. Tema siang / malam ---------- */
  var root = document.documentElement, modeBtn = $('#mode');
  function isDark() {
    return root.dataset.theme ? root.dataset.theme === 'dark' : matchMedia('(prefers-color-scheme: dark)').matches;
  }
  function label() { modeBtn.textContent = isDark() ? T('Terang') : T('Gelap'); }
  modeBtn.addEventListener('click', function () {
    root.dataset.theme = isDark() ? 'light' : 'dark';
    label();
  });
  label();
  document.addEventListener('langchange', label);

  /* ---------- 4. Penjelajah anatomi pohon ---------- */
  var parts = [
    { x: 200, y: 110, name: 'Daun dan tajuk', text: 'Tempat fotosintesis berlangsung.',
      list: ['Menyerap karbon dioksida dan melepas oksigen', 'Menguapkan air sehingga udara sekitar lebih sejuk', 'Menyaring debu dari udara'] },
    { x: 255, y: 212, name: 'Cabang dan satwa', text: 'Tajuk adalah rumah bagi burung, serangga, dan mamalia.',
      list: ['Lebah dan kupu-kupu menyerbuki bunga', 'Burung dan kelelawar menyebarkan biji', 'Buah dan nektar menjadi pangan satwa dan manusia'] },
    { x: 201, y: 284, name: 'Batang', text: 'Penyangga pohon sekaligus gudang karbon.',
      list: ['Menyimpan karbon selama puluhan hingga ratusan tahun', 'Menjadi sumber kayu, getah, dan resin', 'Kulit dan getah sebagian dipakai sebagai obat tradisional'] },
    { x: 126, y: 421, name: 'Akar', text: 'Jangkar yang menahan pohon sekaligus tanah di sekitarnya.',
      list: ['Menahan tanah dari erosi dan longsor', 'Membuka pori tanah agar air hujan meresap', 'Rambut akar halus dan jamur mikoriza memperluas area serap air dan hara'] },
    { x: 300, y: 378, name: 'Serasah dan tanah', text: 'Daun dan ranting gugur menjadi makanan bagi pengurai.',
      list: ['Jamur dan bakteri mengubah serasah menjadi hara', 'Lapisan serasah menahan air seperti spons', 'Tanah hutan menyimpan banyak karbon'] }
  ];
  var hots = $('#hots'), pills = $('#pills'), panel = $('#panel'), dots = [], btns = [];

  var curPart = 0;
  function select(i) {
    var P = parts[i]; curPart = i;
    dots.forEach(function (g, j) { g.classList.toggle('on', j === i); });
    btns.forEach(function (b, j) { b.setAttribute('aria-selected', j === i); });
    panel.innerHTML = '<h3>' + T(P.name) + '</h3><p>' + T(P.text) + '</p><ul>' +
      P.list.map(function (t) { return '<li>' + T(t) + '</li>'; }).join('') + '</ul>';
  }

  parts.forEach(function (P, i) {
    var g = document.createElementNS(NS, 'g');
    g.setAttribute('class', 'hot');
    g.setAttribute('tabindex', '0');
    g.setAttribute('role', 'button');
    g.setAttribute('aria-label', T(P.name));
    ['ring', ''].forEach(function (cls) {
      var c = document.createElementNS(NS, 'circle');
      if (cls) c.setAttribute('class', cls);
      c.setAttribute('cx', P.x); c.setAttribute('cy', P.y); c.setAttribute('r', 11);
      g.appendChild(c);
    });
    g.addEventListener('click', function () { select(i); });
    g.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); select(i); }
    });
    hots.appendChild(g); dots.push(g);

    var b = document.createElement('button');
    b.type = 'button'; b.setAttribute('role', 'tab'); b.textContent = T(P.name);
    b.addEventListener('click', function () { select(i); });
    pills.appendChild(b); btns.push(b);
  });
  select(0);
  document.addEventListener('langchange', function () {
    btns.forEach(function (b, j) { b.textContent = T(parts[j].name); });
    dots.forEach(function (g, j) { g.setAttribute('aria-label', T(parts[j].name)); });
    select(curPart);
  });

  /* ---------- 4b. Pohon bergaya kartun (dibuat dengan kode) ---------- */
  (function () {
    var seed = 70;
    function R() { seed += 1; return rnd(seed); }
    function el(tag, attrs, parent) {
      var e = document.createElementNS(NS, tag);
      for (var k in attrs) e.setAttribute(k, attrs[k]);
      if (parent) parent.appendChild(e);
      return e;
    }
    /* Awan daun bertepi bergelombang */
    function cloud(g, cx, cy, rx, ry, n, fill, stroke) {
      var P = [], i, a;
      for (i = 0; i < n; i++) {
        a = i / n * 6.2832 + R() * 0.12;
        P.push([cx + Math.cos(a) * rx * (0.94 + R() * 0.1), cy + Math.sin(a) * ry * (0.94 + R() * 0.1)]);
      }
      var d = 'M' + P[0][0].toFixed(1) + ' ' + P[0][1].toFixed(1);
      for (i = 0; i < n; i++) {
        var A = P[i], B = P[(i + 1) % n], mx = (A[0] + B[0]) / 2, my = (A[1] + B[1]) / 2;
        var vx = mx - cx, vy = my - cy, vl = Math.hypot(vx, vy) || 1, k = Math.hypot(B[0] - A[0], B[1] - A[1]) * 0.55;
        d += 'Q' + (mx + vx / vl * k).toFixed(1) + ' ' + (my + vy / vl * k).toFixed(1) + ' ' + B[0].toFixed(1) + ' ' + B[1].toFixed(1);
      }
      el('path', { d: d + 'Z', 'class': 'leafc ' + fill }, g);
    }
    /* Garis tebal berkontur untuk dahan dan akar */
    function thick(g, d, w, fill) {
      var o = { d: d, fill: 'none', 'stroke-linecap': 'round', 'stroke-linejoin': 'round' }, under = fill === '#d7a56a';
      if (!under) el('path', Object.assign({ stroke: '#6f4630', 'stroke-width': w + 2.5 }, o), g);
      el('path', Object.assign({ stroke: under ? '#e0b98a' : '#a8714a', 'stroke-width': w, opacity: under ? 0.9 : 1 }, o), g);
    }
    var dark = $('#cDark'), front = $('#cFront'), limbs = $('#limbs'), sroots = $('#sroots'), uroots = $('#uroots');

    [[200, 120, 170, 100, 22], [95, 130, 70, 55, 14], [305, 130, 70, 55, 14], [200, 72, 120, 50, 16]]
      .forEach(function (c) { cloud(dark, c[0], c[1], c[2], c[3], c[4], 'lf-d'); });

    [['M192 264C172 238 142 216 112 196', 14], ['M197 260C190 232 174 206 158 182', 12], ['M205 258C208 226 205 200 200 172', 12],
     ['M211 260C224 234 250 210 270 190', 12], ['M216 266C250 248 285 226 312 206', 14],
     ['M140 206C128 206 120 212 108 214', 5], ['M262 198C280 190 292 196 304 190', 5], ['M180 214C176 200 168 195 160 192', 5]]
      .forEach(function (b) { thick(limbs, b[0], b[1], '#b8742f'); });

    [['M175 334C150 340 126 338 104 348', 12], ['M185 338C170 348 150 352 132 358', 9],
     ['M227 334C252 340 277 338 298 348', 12], ['M217 338C232 348 254 352 274 358', 9]]
      .forEach(function (r) { thick(sroots, r[0], r[1], '#b8742f'); });

    [['M195 356C170 400 130 420 90 440', 10], ['M140 418C125 440 110 470 100 495', 5], ['M122 428C100 428 80 420 60 430', 4],
     ['M200 360C198 410 200 450 205 500', 9], ['M205 356C240 400 280 420 320 440', 10], ['M270 416C285 440 300 470 304 495', 5],
     ['M190 362C170 390 160 440 150 480', 5]]
      .forEach(function (r) { thick(uroots, r[0], r[1], '#d7a56a'); });

    [[95, 108, 56, 40, 12], [305, 105, 58, 42, 12], [150, 62, 62, 38, 12], [252, 58, 64, 38, 12], [205, 40, 54, 30, 11], [62, 165, 44, 34, 10], [340, 162, 46, 34, 10]]
      .forEach(function (c) { cloud(front, c[0], c[1], c[2], c[3], c[4], 'lf-m'); });
    [[120, 168, 60, 40, 12], [290, 166, 62, 40, 12], [205, 150, 64, 42, 12], [205, 100, 82, 54, 14]]
      .forEach(function (c) { cloud(front, c[0], c[1], c[2], c[3], c[4], 'lf-l'); });
    [[185, 88, 26, 13, 9], [118, 150, 18, 10, 8], [288, 148, 20, 10, 8], [205, 38, 16, 8, 8], [330, 150, 12, 7, 7]]
      .forEach(function (c) { cloud(front, c[0], c[1], c[2], c[3], c[4], 'lf-h hi'); });

    var pb = $('#pebbles'), i;
    for (i = 0; i < 12; i++) {
      el('ellipse', { cx: (20 + R() * 360).toFixed(0), cy: (380 + R() * 120).toFixed(0), rx: (4 + R() * 6).toFixed(1), ry: (3 + R() * 4).toFixed(1),
        fill: R() > 0.5 ? '#cdbb9c' : '#9b8467', opacity: 0.35 }, pb);
    }
  })();

  /* ---------- 4c. Penampang batang dengan lingkar tahun ---------- */
  (function () {
    var disc = $('#disc'), C = 150;
    function el(tag, attrs, parent) {
      var e = document.createElementNS(NS, tag);
      for (var k in attrs) e.setAttribute(k, attrs[k]);
      if (parent) parent.appendChild(e);
      return e;
    }
    function wob(r, s, amp, jag) {
      var d = '', n = 140, i;
      for (i = 0; i < n; i++) {
        var a = i / n * 6.2832, v = Math.sin(a * 3 + s) * 0.5 + Math.sin(a * 5 + s * 2.3) * 0.3 + Math.sin(a * 9 + s * 3.1) * 0.2 + (jag || 0) * Math.sin(a * 41 + s * 5);
        var rr = r * (1 + amp * v);
        d += (i ? 'L' : 'M') + (C + Math.cos(a) * rr).toFixed(1) + ' ' + (C + Math.sin(a) * rr).toFixed(1);
      }
      return d + 'Z';
    }
    var L = [
      { n: 'Kulit luar', r: 138, f: '#6b4a35', s: 1, a: 0.025, j: 0.02, t: 'Lapisan pelindung yang sebagian besar tersusun dari sel mati.', l: ['Melindungi dari api, serangga, dan benturan', 'Mengurangi penguapan air dari batang', 'Pola retaknya khas untuk tiap jenis pohon'] },
      { n: 'Kulit dalam (floem)', r: 124, f: '#c9a173', s: 1.5, a: 0.02, t: 'Jalur makanan pohon.', l: ['Mengangkut gula hasil fotosintesis dari daun ke akar dan buah', 'Terus diperbarui oleh kambium dari sisi dalam', 'Kulit yang terkelupas melingkar sampai ke floem dapat mematikan pohon'] },
      { n: 'Kambium', r: 118, f: '#6fd08a', s: 2, a: 0.02, t: 'Lapisan sel tipis yang terus membelah.', l: ['Ke arah dalam membentuk kayu (xilem), ke arah luar membentuk floem', 'Inilah yang menambah diameter batang tiap tahun', 'Tebalnya hanya beberapa lapis sel'] },
      { n: 'Kayu gubal', r: 115, f: '#f0d6a4', s: 2, a: 0.02, t: 'Kayu muda yang masih hidup dan aktif.', l: ['Mengangkut air dan mineral dari akar ke daun', 'Menyimpan cadangan pati', 'Biasanya berwarna lebih terang'] },
      { n: 'Kayu teras', r: 72, f: '#c58a55', s: 3, a: 0.03, t: 'Kayu tua di bagian dalam yang tidak lagi mengangkut air.', l: ['Menopang batang agar tetap kokoh', 'Pada banyak jenis mengandung senyawa yang membuatnya gelap dan tahan lapuk', 'Pohon dapat tetap hidup walau terasnya berongga'] },
      { n: 'Empulur', r: 6, f: '#6b4429', s: 4, a: 0.1, t: 'Jaringan lunak di pusat batang.', l: ['Sisa dari tahap awal pertumbuhan tunas', 'Pada batang tua sering sulit dibedakan'] },
      { n: 'Lingkar tahun', g: 'rings', t: 'Pola lapisan kayu yang terbentuk berulang.', l: ['Kayu awal berwarna terang, kayu akhir lebih gelap dan rapat', 'Pada daerah dengan musim tegas, satu pasang sering mewakili satu tahun', 'Di hutan tropis basah lingkarnya sering samar dan sulit dihitung'] },
      { n: 'Jari-jari empulur', g: 'rays', t: 'Jaringan yang menjalar searah jari-jari, dari tengah ke kulit.', l: ['Menyalurkan air dan cadangan makanan secara mendatar', 'Menyimpan pati dan zat cadangan lain', 'Pada beberapa jenis kayu tampak sebagai garis berkilau di papan'] }
    ];
    var rings = el('g', { 'class': 'rings' }), rays = el('g', { 'class': 'rays' });
    L.forEach(function (z, i) {
      if (z.r) {
        z.el = el('path', { d: wob(z.r, z.s, z.a, z.j), fill: z.f, 'class': 'zone', tabindex: 0, role: 'button', 'aria-label': T(z.n) }, disc);
        if (z.n === 'Kambium') { /* kambium tipis: terlihat sebagai pita hijau */ }
      }
    });
    var r = 10, k = 0, seed = 7;
    function R() { seed++; return rnd(seed); }
    while (r < 112) {
      r += 4 + R() * 6; k++;
      var core = r < 72;
      el('path', { d: wob(r, core ? 3 : 2, core ? 0.03 : 0.02), fill: 'none', stroke: core ? '#8a5428' : '#b28c4f', 'stroke-width': k % 2 ? 0.8 : 1.5, opacity: 0.55 }, rings);
    }
    for (var n = 0; n < 48; n++) {
      var an = R() * 6.2832, c = Math.cos(an), s = Math.sin(an);
      el('line', { x1: C + c * 8, y1: C + s * 8, x2: C + c * (60 + R() * 52), y2: C + s * (60 + R() * 52), stroke: '#fff', 'stroke-width': 0.5, opacity: 0.14 }, rays);
    }
    for (n = 0; n < 3; n++) {
      var ac = R() * 6.2832;
      el('line', { x1: C + Math.cos(ac) * 8, y1: C + Math.sin(ac) * 8, x2: C + Math.cos(ac) * (50 + R() * 14), y2: C + Math.sin(ac) * (50 + R() * 14), stroke: '#5a3a1e', 'stroke-width': 0.9, opacity: 0.5 }, rays);
    }
    disc.appendChild(rings); disc.appendChild(rays);
    /* Zona dipindah ke atas agar tetap bisa diklik */
    L.forEach(function (z) { if (z.g) z.el = z.g === 'rings' ? rings : rays; });

    var lp = $('#lpills'), lpanel = $('#lpanel'), pills = [], curL = 4;
    function pick(i) {
      curL = i;
      L.forEach(function (z, j) { z.el.classList.toggle('on', j === i); pills[j].setAttribute('aria-selected', j === i); });
      lpanel.innerHTML = '<h3>' + T(L[i].n) + '</h3><p>' + T(L[i].t) + '</p><ul>' + L[i].l.map(function (x) { return '<li>' + T(x) + '</li>'; }).join('') + '</ul>';
    }
    L.forEach(function (z, i) {
      var b = document.createElement('button');
      b.type = 'button'; b.setAttribute('role', 'tab'); b.textContent = T(z.n).replace(/ \((floem|phloem)\)/, '');
      b.addEventListener('click', function () { pick(i); });
      lp.appendChild(b); pills.push(b);
      if (z.r) {
        z.el.addEventListener('click', function () { pick(i); });
        z.el.addEventListener('keydown', function (e) { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); pick(i); } });
      }
    });
    pick(4);
    document.addEventListener('langchange', function () {
      L.forEach(function (z, j) {
        pills[j].textContent = T(z.n).replace(/ \((floem|phloem)\)/, '');
        if (z.r) z.el.setAttribute('aria-label', T(z.n));
      });
      pick(curL);
    });
  })();

  /* ---------- 5. Daun berjatuhan di gambar pohon ---------- */
  if (!reduce) {
    var style = document.createElement('style');
    style.textContent = '.leaf{fill:var(--leaf-h);opacity:0;transform-box:fill-box;transform-origin:center;animation:fall 8s linear infinite}' +
      '@keyframes fall{0%{opacity:0;transform:translate(0,0) rotate(0)}12%{opacity:1}100%{opacity:0;transform:translate(34px,165px) rotate(320deg)}}';
    document.head.appendChild(style);
    for (var q = 0; q < 7; q++) {
      var lf = document.createElementNS(NS, 'ellipse');
      lf.setAttribute('class', 'leaf');
      lf.setAttribute('cx', 110 + rnd(q + 60) * 180); lf.setAttribute('cy', 150 + rnd(q + 70) * 40);
      lf.setAttribute('rx', 5); lf.setAttribute('ry', 2.6);
      lf.style.animationDelay = (-rnd(q) * 8) + 's';
      lf.style.animationDuration = (6 + rnd(q + 8) * 5) + 's';
      $('#tree').insertBefore(lf, hots);
    }
  }

  /* ---------- 6. Efek cahaya mengikuti kursor pada kartu ---------- */
  $$('.card').forEach(function (card) {
    card.addEventListener('pointermove', function (e) {
      var r = card.getBoundingClientRect();
      card.style.setProperty('--mx', (e.clientX - r.left) + 'px');
      card.style.setProperty('--my', (e.clientY - r.top) + 'px');
    });
  });

  /* ---------- 7. Animasi muncul saat digulir dan hitung naik ---------- */
  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (!e.isIntersecting) return;
      e.target.classList.add('in');
      var c = $('.cnt', e.target);
      if (c && !reduce) {
        var to = +c.dataset.to, t0 = performance.now();
        (function step(t) {
          var p = Math.min(1, (t - t0) / 1400);
          c.textContent = Math.round(to * (1 - Math.pow(1 - p, 3)));
          if (p < 1) requestAnimationFrame(step);
        })(t0);
      }
      io.unobserve(e.target);
    });
  }, { threshold: 0.2 });

  $$('.chips .glass').forEach(function (el) { io.observe(el); });

  $$('.card, .explore').forEach(function (el, i) {
    if (!reduce) { el.classList.add('rv'); el.style.transitionDelay = (i % 4) * 70 + 'ms'; }
    io.observe(el);
  });
  /* ---------- 8. Dukungan dan komentar (disimpan di localStorage) ---------- */
  (function () {
    var KEY = 'rimba.komunitas.v1', VOWS = [['tanam', 'Menanam pohon'], ['kertas', 'Kurangi kertas'], ['kayu', 'Pilih kayu bersertifikat'], ['hijau', 'Jaga ruang hijau']];
    var data = { supported: false, vows: {}, comments: [] };
    try { var raw = JSON.parse(localStorage.getItem(KEY)); if (raw && typeof raw === 'object') data = Object.assign(data, raw); } catch (e) {}
    function save() { try { localStorage.setItem(KEY, JSON.stringify(data)); } catch (e) {} }

    var sBtn = $('#support'), sTxt = $('#supportTxt'), vowBox = $('#vows'), mini = $('#mini'), miniTxt = $('#miniTxt');
    var form = $('#cform'), cname = $('#cname'), ctext = $('#ctext'), ccount = $('#ccount'), clist = $('#clist');

    function drawSupport() {
      sBtn.setAttribute('aria-pressed', data.supported);
      sTxt.textContent = data.supported ? T('Terima kasih, kamu mendukung hutan') : T('Saya dukung hutan');
      var v = VOWS.filter(function (x) { return data.vows[x[0]]; }).length, n = (data.supported ? 1 : 0) + v;
      mini.textContent = (data.supported ? '🌳' : '') + new Array(v + 1).join('🌱');
      miniTxt.textContent = n ? T('Hutan kecilmu: {n} pohon dari dukungan dan janjimu.').replace('{n}', n) : T('Hutan kecilmu masih kosong. Mulai dari satu dukungan.');
    }
    sBtn.addEventListener('click', function () {
      data.supported = !data.supported; save(); drawSupport();
      if (data.supported && !reduce) { sBtn.classList.remove('pop'); void sBtn.offsetWidth; sBtn.classList.add('pop'); }
    });
    VOWS.forEach(function (x) {
      var b = document.createElement('button');
      b.type = 'button'; b.textContent = T(x[1]);
      b.setAttribute('aria-pressed', !!data.vows[x[0]]);
      b.addEventListener('click', function () {
        data.vows[x[0]] = !data.vows[x[0]];
        b.setAttribute('aria-pressed', data.vows[x[0]]); save(); drawSupport();
      });
      vowBox.appendChild(b);
    });
    drawSupport();

    function drawComments() {
      clist.textContent = '';
      if (!data.comments.length) {
        var e = document.createElement('li'); e.className = 'empty';
        e.textContent = T('Belum ada komentar. Jadilah yang pertama menulis untuk hutan.');
        clist.appendChild(e); return;
      }
      data.comments.forEach(function (c) {
        var li = document.createElement('li'), who = document.createElement('div'), nm = document.createElement('b'),
            tm = document.createElement('time'), msg = document.createElement('p'), act = document.createElement('div'),
            lk = document.createElement('button'), del = document.createElement('button');
        who.className = 'who'; nm.textContent = c.name;
        tm.textContent = new Date(c.t).toLocaleDateString(LANG() === 'en' ? 'en-US' : 'id-ID', { day: 'numeric', month: 'short', year: 'numeric' });
        who.appendChild(nm); who.appendChild(tm);
        msg.className = 'msg'; msg.textContent = c.text;
        act.className = 'acts2';
        lk.type = 'button'; lk.setAttribute('aria-pressed', !!c.liked);
        lk.textContent = T('🌱 Setuju') + (c.likes ? ' · ' + c.likes : '');
        lk.addEventListener('click', function () {
          c.liked = !c.liked; c.likes = Math.max(0, (c.likes || 0) + (c.liked ? 1 : -1)); save(); drawComments();
        });
        del.type = 'button'; del.textContent = T('Hapus');
        del.addEventListener('click', function () {
          data.comments = data.comments.filter(function (x) { return x.id !== c.id; }); save(); drawComments();
        });
        act.appendChild(lk); act.appendChild(del);
        li.appendChild(who); li.appendChild(msg); li.appendChild(act); clist.appendChild(li);
      });
    }
    ctext.addEventListener('input', function () { ccount.textContent = ctext.value.length + ' / 280'; });
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var text = ctext.value.trim();
      if (!text) return;
      data.comments.unshift({ id: Date.now() + '' + Math.floor(Math.random() * 1000), name: cname.value.trim() || 'Sahabat hutan', text: text, t: Date.now(), likes: 0, liked: false });
      data.comments = data.comments.slice(0, 50);
      save(); ctext.value = ''; ccount.textContent = '0 / 280'; drawComments();
    });
    drawComments();
    document.addEventListener('langchange', function () {
      $$('#vows button').forEach(function (b, j) { b.textContent = T(VOWS[j][1]); });
      drawSupport(); drawComments();
    });
  })();
})();