/* Nihongo Michi — Reels promo (1080x1920).
 * Semua animasi dibangun sebagai satu timeline GSAP yang di-seek per frame (deterministik),
 * dan terkunci ke build/timeline.json (durasi scene + waktu cue dari narasi).
 */
(async () => {
const TL = await (await fetch('/build/timeline.json', { cache: 'no-store' })).json();
const FPS = TL.fps, TOTAL = TL.total;
const S = Object.fromEntries(TL.scenes.map(s => [s.id, { ...s, end: s.start + s.dur }]));
const $ = (q, r = document) => r.querySelector(q);
const mk = h => { const t = document.createElement('template'); t.innerHTML = h.trim(); return t.content.firstChild; };
const clamp = (v, a, b) => Math.min(b, Math.max(a, v));
const rng = seed => { let s = seed; return () => (s = (s * 16807) % 2147483647) / 2147483647; };

await Promise.all([
  document.fonts.load('800 100px "Fraunces Variable"'), document.fonts.load('900 100px "Fraunces Variable"'),
  document.fonts.load('600 40px "Plus Jakarta Sans"'), document.fonts.load('700 40px "Plus Jakarta Sans"'),
  document.fonts.load('800 40px "Plus Jakarta Sans"'),
  document.fonts.load('900 80px "Zen Old Mincho"', 'あいう漢日本語道学練一'),
]);

const M = gsap.timeline({ paused: true });
const at = (id, rel) => S[id].start + rel;
const cue = (id, name, off = 0) => Math.max(S[id].start + 0.15, S[id].start + S[id].cues[name] + off);
const FT = (tg, f, t, p) => M.fromTo(tg, f, { ...t, immediateRender: false }, p);
const TO = (tg, v, p) => M.to(tg, v, p);
const SET = (tg, v, p) => M.set(tg, { ...v, immediateRender: false }, p);

/* ---------- util: scene, headline, chip ---------- */
function scene(id) {
  const e = mk(`<section class="scene" id="sc-${id}"></section>`);
  $('#scenes').appendChild(e);
  SET(e, { autoAlpha: 1 }, S[id].start);
  SET(e, { autoAlpha: 0 }, S[id].end);
  return e;
}

// spec: "Baris satu|baris {aksen} dua" — {…} = kata aksen merah dengan stabilo
function headline(parent, spec, { fs = 104, top = 215, maxW = 930 } = {}) {
  const wrap = mk(`<div class="hl" style="top:${top}px;font-size:${fs}px"></div>`);
  const plain = [];
  const wordEl = txt => { const w = mk('<span class="w"><span class="wi"></span></span>'); w.firstChild.textContent = txt; return w; };
  spec.split('|').forEach(line => {
    const ln = mk('<div class="ln"></div>');
    line.split(/(\{[^}]+\})/).filter(Boolean).forEach(tok => {
      const isAcc = tok[0] === '{';
      const txt = isAcc ? tok.slice(1, -1) : tok;
      const host = isAcc ? mk('<span class="acc"><i class="bar"></i></span>') : ln;
      txt.split(/(\s+)/).filter(Boolean).forEach(part => {
        if (/^\s+$/.test(part)) { host.appendChild(document.createTextNode(' ')); return; }
        const w = wordEl(part); host.appendChild(w);
        if (!isAcc) plain.push(w.firstChild);
      });
      if (isAcc) ln.appendChild(host);
    });
    wrap.appendChild(ln);
  });
  // satu entri per token {…}
  const accs = [...wrap.querySelectorAll('.acc')].map(h => ({ bar: h.querySelector('.bar'), wis: [...h.querySelectorAll('.wi')] }));
  parent.appendChild(wrap);
  // auto-fit supaya tidak melewati safe-area horizontal
  const widest = Math.max(...[...wrap.querySelectorAll('.ln')].map(l => l.getBoundingClientRect().width));
  if (widest > maxW) wrap.style.fontSize = (fs * maxW / widest) + 'px';
  const all = [...wrap.querySelectorAll('.wi')];
  gsap.set(all, { yPercent: 118, rotation: 7, opacity: 0 });
  return { wrap, plain, accs, all };
}
function hlIn(h, t0, accTimes = []) {
  FT(h.plain, { yPercent: 118, rotation: 7, opacity: 0 }, { yPercent: 0, rotation: 0, opacity: 1, duration: .7, ease: 'back.out(1.7)', stagger: .09 }, t0);
  h.accs.forEach((a, i) => {
    const t = accTimes[i] ?? t0 + .35;
    FT(a.wis, { yPercent: 118, rotation: 7, opacity: 0 }, { yPercent: 0, rotation: 0, opacity: 1, duration: .7, ease: 'back.out(2)', stagger: .06 }, t);
    FT(a.bar, { scaleX: 0 }, { scaleX: 1, duration: .5, ease: 'power3.out' }, t + .22);
  });
}
function hlOut(h, t) {
  TO(h.all, { yPercent: -118, rotation: -5, opacity: 0, duration: .34, ease: 'power2.in', stagger: .025 }, t);
  TO(h.wrap.querySelectorAll('.bar'), { scaleX: 0, transformOrigin: '100% 50%', duration: .25, ease: 'power2.in' }, t);
}
function popIn(el, t, rot = 0, big = false) {
  FT(el, { scale: 0, rotation: rot - 14 }, { scale: 1, rotation: rot, duration: .6, ease: big ? 'back.out(3)' : 'back.out(2.4)' }, t);
}
function popOut(el, t, rot = 0) { TO(el, { scale: 0, rotation: rot + 10, duration: .26, ease: 'back.in(2)' }, t); }
function row(parent, top) { const r = mk(`<div class="row" style="top:${top}px"></div>`); parent.appendChild(r); return r; }
function chip(rowEl, html, { bg = '#fff', sh = '#392215', rot = 0 } = {}) {
  const c = mk(`<div class="chip" style="--bg:${bg};--sh:${sh}">${html}</div>`);
  rowEl.appendChild(c); gsap.set(c, { scale: 0, rotation: rot });
  return c;
}

/* ---------- latar & elemen persisten ---------- */
const PAL = {
  hook:    ['#ffd2dc', '#ffe7b0', '#e8dcff'],
  intro:   ['#ffd2dc', '#cfeaf7', '#ffe7b0'],
  kana:    ['#cfeaf7', '#ffd2dc', '#e8dcff'],
  kanji:   ['#cfeedd', '#cfeaf7', '#fff0c9'],
  latihan: ['#ffe2c4', '#ffe7b0', '#ffd2dc'],
  progres: ['#ffe7b0', '#ffd2dc', '#cfeedd'],
  target:  ['#cfeedd', '#ffe2c4', '#cfeaf7'],
  simple:  ['#ffd2dc', '#cfeaf7', '#ffe7b0'],
  price:   ['#ffc4d3', '#cfeaf7', '#ffe2c4'],
};
gsap.set('.b1', { '--c': PAL.hook[0] }); gsap.set('.b2', { '--c': PAL.hook[1] }); gsap.set('.b3', { '--c': PAL.hook[2] });
TL.scenes.forEach(({ id }) => {
  const t = Math.max(0, S[id].start - .1);
  ['.b1', '.b2', '.b3'].forEach((b, i) => TO(b, { '--c': PAL[id][i], duration: .9, ease: 'power1.inOut' }, t));
});
TO('#bg .lines', { backgroundPositionY: -20 * TOTAL, duration: TOTAL, ease: 'none' }, 0);
TO('.b1', { x: 140, y: 90, duration: TOTAL, ease: 'sine.inOut' }, 0);
TO('.b2', { x: -160, y: -120, duration: TOTAL, ease: 'sine.inOut' }, 0);
TO('.b3', { x: 120, y: 180, duration: TOTAL, ease: 'sine.inOut' }, 0);
TO('#wm', { rotation: 24, duration: TOTAL, ease: 'none' }, 0);

// tile kanji
const TILES = [['あ', '#fff1d6'], ['漢', '#dff2fa'], ['日', '#fde6d9'], ['本', '#fee4ed'], ['語', '#e0f3e8'], ['道', '#ffefd7']];
const tileEls = TILES.map(([g, bg], i) => {
  const t = mk(`<div class="tile"><div class="face" style="background:${bg}">${g}</div></div>`);
  $('#tiles').appendChild(t);
  gsap.set(t, { x: 540, y: -260, rotation: 0 });
  const bob = t.firstChild, d = 2.3 + i * .37;
  TO(bob, { y: -16, rotation: i % 2 ? 4 : -4, duration: d, ease: 'sine.inOut', yoyo: true, repeat: Math.ceil(TOTAL / d) }, i * .21);
  return t;
});
const TILE_POS = {
  hook:    [[100, 790, -14, .95], [985, 790, 12, .95], [70, 1190, 10, .95], [1000, 1160, -10, .95], [130, 1650, -16, 1], [950, 1630, 14, 1]],
  intro:   [[130, 1795, 0, .8], [294, 1795, 0, .8], [458, 1795, 0, .8], [622, 1795, 0, .8], [786, 1795, 0, .8], [950, 1795, 0, .8]],
  frame:   [[100, 780, -10, .84], [980, 720, 9, .84], [86, 1290, 8, .84], [992, 1210, -7, .84], [120, 1610, -14, .84], [960, 1650, 12, .84]],
  simple:  [[62, 640, 0, .9], [1018, 640, 0, .9], [62, 900, 0, .9], [1018, 900, 0, .9], [62, 1160, 0, .9], [1018, 1160, 0, .9]],
  price:   [[112, 330, -12, .95], [960, 1330, -8, .95], [110, 1320, 8, .95], [270, 1610, -6, .85], [820, 1620, 9, .85], [545, 1730, 0, .8]],
};
const phoneScenes = ['intro', 'kana', 'kanji', 'latihan', 'progres', 'target'];
phoneScenes.slice(1).forEach((id, k) => { // geser halus tiap scene
  const r = rng(11 + k * 7);
  TILE_POS[id] = TILE_POS.frame.map(([x, y, rot, sc]) => [x + (r() - .5) * 36, y + (r() - .5) * 60, rot + (r() - .5) * 16, sc]);
});
Object.entries(TILE_POS).filter(([id]) => S[id]).forEach(([id, pos]) => {
  const t0 = id === 'hook' ? .15 : Math.max(0, S[id].start - .05);
  tileEls.forEach((t, i) => {
    const [x, y, rot, sc] = pos[i];
    TO(t, { x, y, rotation: rot, scale: sc, duration: id === 'hook' ? 1 : .95, ease: id === 'hook' ? 'bounce.out' : 'power3.inOut' }, t0 + (id === 'hook' ? i * .09 : i * .04));
  });
});

/* ---------- HP + jadwal layar ---------- */
// overlay ditaruh DI DALAM layar HP (koordinat piksel crop 592x1224) supaya ikut bergoyang bersama HP
const onScreen = h => { const e = mk(h); $('#ov').appendChild(e); return e; };
const PM = '#phoneMove';
gsap.set(PM, { opacity: 0, y: 1300, scale: .8, rotationX: 30 });
TO('#phone', { y: -9, rotation: .7, duration: 2.6, ease: 'sine.inOut', yoyo: true, repeat: Math.ceil(TOTAL / 2.6) }, 0);
gsap.set('#wipe', { yPercent: -110 });

const PLAN = [];
const play = (id, rel, from, to, rate = 1) => PLAN.push({ t0: at(id, rel), src0: from, rate, max: to });
const fit = (id, r0, r1, from, to) => play(id, r0, from, to, clamp((to - from) / Math.max(.5, r1 - r0), .6, 2.4));
function wipe(t) {
  FT('#wipe', { yPercent: -110 }, { yPercent: 0, duration: .22, ease: 'power2.in' }, t - .22);
  TO('#wipe', { yPercent: 110, duration: .26, ease: 'power2.out' }, t);
}
function swing(id, rel = 0) {
  FT(PM, { rotationY: -16, scale: .85 }, { rotationY: 0, scale: .88, duration: 1, ease: 'elastic.out(1,.55)' }, at(id, rel));
}

/* =============== S1 · HOOK =============== */
{
  const id = 'hook', s = S[id], sec = scene(id);
  const h = headline(sec, 'Belajar JLPT|masih {berantakan?}', { fs: 116, top: 300 });
  hlIn(h, at(id, .1), [cue(id, 'messy', -.15)]);
  // jitter kata "berantakan?" = berantakan
  const w = h.accs[0].wis;
  TO(w, { rotation: 3, x: 5, duration: .07, repeat: 11, yoyo: true, ease: 'sine.inOut' }, cue(id, 'messy', .55));
  const sub = mk(`<div class="sub" style="top:640px">Materi tercecer, progres nggak kecatat <span class="emo">😵</span></div>`);
  sec.appendChild(sub); gsap.set(sub, { opacity: 0, y: 24 });
  FT(sub, { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: .5 }, cue(id, 'scatter', -.1));

  const NOTES = [
    ['materi_N5_final(2).pdf', '📄', '#ffffff', 300, 880, -7], ['catatan kanji.docx', '📝', '#fff3c4', 805, 830, 6],
    ['screenshot grammar', '📸', '#e0f3e8', 310, 1080, 5], ['flashcard lama', '🗂️', '#dff2fa', 800, 1040, -5],
    ['link youtube N4', '▶️', '#fee4ed', 330, 1270, -6], ['catatan di HP', '📱', '#ffefd7', 790, 1250, 7],
  ];
  const pile = mk('<div style="position:absolute;inset:0"></div>'); sec.insertBefore(pile, sec.firstChild);
  NOTES.forEach(([txt, e, bg, x, y, r], i) => {
    const n = mk(`<div class="note" style="left:${x}px;top:${y}px;background:${bg}"><span class="emo">${e}</span>${txt}</div>`);
    pile.appendChild(n);
    gsap.set(n, { xPercent: -50, yPercent: -50, y: -1900, rotation: r + 30 });
    const t0 = i < 2 ? at(id, .55 + i * .22) : cue(id, 'scatter', -.35 + (i - 2) * .17);
    FT(n, { y: -1900, rotation: r + 30 }, { y: 0, rotation: r, duration: 1, ease: 'bounce.out' }, t0);
  });
  // kartu progres kosong
  const pc = mk(`<div class="note" style="left:540px;top:1450px;flex-direction:column;align-items:stretch;gap:12px;width:620px;background:#fff">
      <div style="display:flex;gap:14px;align-items:center"><span class="emo">📊</span>progres belajar</div>
      <div style="height:26px;border:4px solid var(--brown);border-radius:16px;background:#f6ece0"></div></div>`);
  sec.appendChild(pc);
  gsap.set(pc, { xPercent: -50, yPercent: -50, scale: 0, rotation: -3 });
  FT(pc, { scale: 0, rotation: -12 }, { scale: 1, rotation: -3, duration: .6, ease: 'back.out(2)' }, cue(id, 'lost', -.2));
  [[150, 1390, -14], [940, 1470, 12], [560, 1350, 6]].forEach(([x, y, r], i) => {
    const q = mk(`<div class="qmark" style="left:${x}px;top:${y}px">?</div>`); sec.appendChild(q);
    gsap.set(q, { xPercent: -50, yPercent: -50, scale: 0, rotation: r });
    FT(q, { scale: 0 }, { scale: 1, duration: .5, ease: 'back.out(3)' }, cue(id, 'lost', .05 + i * .16));
    TO(q, { y: -18, duration: .8, yoyo: true, repeat: 8, ease: 'sine.inOut' }, cue(id, 'lost', .6 + i * .16));
  });
  TO(pile, { x: 7, duration: .06, repeat: 7, yoyo: true }, cue(id, 'lost', .1));
}

/* ---------- sweep transisi ---------- */
gsap.set('#sweep', { yPercent: 105 });
function sweep(tMid, color) {
  FT('#sweep', { yPercent: 105, backgroundColor: color }, { yPercent: 0, duration: .34, ease: 'power2.in' }, tMid - .34);
  TO('#sweep', { yPercent: -108, duration: .4, ease: 'power2.out' }, tMid);
}
sweep(S.intro.start, '#ffc7d6');

/* =============== S2 · INTRO =============== */
{
  const id = 'intro', s = S[id], sec = scene(id);
  const kr = row(sec, 226);
  const kenalin = mk('<div class="pill" style="--bg:#e0f3e8;--sh:#4bae7a;font-size:34px"><i class="dot"></i>Kenalin</div>');
  kr.appendChild(kenalin); gsap.set(kenalin, { scale: 0 });
  popIn(kenalin, at(id, .22));

  const lock = mk(`<div class="row" style="top:302px;gap:26px"><div class="logo">道</div>
      <div class="wordmark"><span class="w" style="display:inline-block;overflow:hidden;vertical-align:top;padding:.02em .06em .16em;margin:-.02em -.06em -.16em"><span class="wi">Nihongo</span></span> <span class="w" style="display:inline-block;overflow:hidden;vertical-align:top;padding:.02em .06em .16em;margin:-.02em -.06em -.16em"><em class="wi" style="display:inline-block">Michi</em></span></div></div>`);
  sec.appendChild(lock);
  const logo = lock.firstChild, wis = lock.querySelectorAll('.wi');
  gsap.set(logo, { scale: 0, rotation: -120 }); gsap.set(wis, { yPercent: 118, opacity: 0, rotation: 7 });
  FT(logo, { scale: 0, rotation: -120 }, { scale: 1, rotation: 0, duration: .8, ease: 'back.out(2)' }, Math.min(cue(id, 'name', -.3), at(id, .55)));
  FT(wis, { yPercent: 118, opacity: 0, rotation: 7 }, { yPercent: 0, opacity: 1, rotation: 0, duration: .7, ease: 'back.out(1.8)', stagger: .12 }, Math.min(cue(id, 'name', -.15), at(id, .7)));

  const pr = row(sec, 498);
  const pill = chip(pr, 'Semua materi N5–N1 di satu tempat', { sh: '#4bae7a' });
  pill.classList.replace('chip', 'pill'); pill.style.fontSize = '36px';
  popIn(pill, cue(id, 'levels', -.5));

  // stiker level di sisi HP
  const LV = [['N5', 'Fondasi', '#ffd0dd', 170, 840, -8], ['N4', 'Dasar', '#cfeaf7', 905, 960, 7], ['N3', 'Menengah', '#cfeedd', 170, 1090, 6],
              ['N2', 'Mahir', '#ffe2b8', 905, 1220, -6], ['N1', 'Mahir', '#ffcdb8', 170, 1340, 8]];
  LV.forEach(([n, cap, bg, x, y, r], i) => {
    const l = mk(`<div class="lvl" style="left:${x - 60}px;top:${y - 60}px;background:${bg}"><div style="text-align:center">${n}<small>${cap}</small></div></div>`);
    $('#chips').appendChild(l); gsap.set(l, { scale: 0, rotation: r });
    popIn(l, cue(id, 'levels', .05 + i * .26), r, true);
    TO(l, { y: -12, duration: 1.4 + i * .15, yoyo: true, repeat: 6, ease: 'sine.inOut' }, cue(id, 'levels', .8 + i * .26));
    popOut(l, s.end - .45, r);
  });

  hlOut({ all: [...lock.querySelectorAll('.wi')], wrap: lock }, s.end - .4);
  popOut(kenalin, s.end - .4); popOut(pill, s.end - .4);

  FT(PM, { opacity: 1, y: 1300, scale: .8, rotationX: 30 }, { y: 0, scale: .88, rotationX: 0, duration: 1.15, ease: 'back.out(1.25)' }, at(id, .45));
  fit(id, .9, s.dur - .3, 4.0, 7.6);
}

/* =============== S3 · KANA =============== */
{
  const id = 'kana', s = S[id], sec = scene(id);
  const h = headline(sec, 'Hafal huruf|{lebih cepat}', { fs: 108, top: 218 });
  hlIn(h, at(id, .05), [cue(id, 'fast', -.1)]);
  const r = row(sec, 482);
  const c1 = chip(r, '<span class="emo">✍️</span>Animasi goresan', { bg: '#dff2fa', sh: '#4a9ec9' });
  const c2 = chip(r, '<span class="emo">🔊</span>Suara', { bg: '#e0f3e8', sh: '#4bae7a' });
  popIn(c1, cue(id, 'stroke', -.15)); popIn(c2, cue(id, 'sound', -.1));
  swing(id, 0); wipe(at(id, .25));
  play(id, .25, 9.0, 9.0);
  const kr = clamp(s.cues.stroke - 2.3, 1.1, 2.6);
  wipe(at(id, kr)); play(id, kr, 9.7, 15.0);
  // lingkaran coretan di sekitar huruf besar (tepat saat "animasi goresan")
  const ring = onScreen('<svg style="left:0;top:0" width="592" height="1224" viewBox="0 0 592 1224"><path d="M 446 480 C 456 330, 130 310, 120 470 C 110 610, 400 640, 446 495 C 462 440, 410 380, 350 345" fill="none" stroke="#d82944" stroke-width="10" stroke-linecap="round"/></svg>');
  const rp = ring.firstChild; const L = 1700; rp.style.strokeDasharray = L; gsap.set(rp, { strokeDashoffset: L });
  FT(rp, { strokeDashoffset: L, opacity: 1 }, { strokeDashoffset: 0, duration: .8, ease: 'power2.inOut' }, cue(id, 'stroke', .1));
  TO(rp, { opacity: 0, duration: .3 }, cue(id, 'stroke', 1.6));
  // gelombang suara dari ikon speaker
  [0, .22, .44].forEach(d => {
    const w = onScreen('<div class="ring" style="left:339px;top:675px;width:44px;height:44px;margin:-22px 0 0 -22px;border-width:5px"></div>');
    gsap.set(w, { scale: 0, opacity: 0 });
    FT(w, { scale: .3, opacity: .9 }, { scale: 3.6, opacity: 0, duration: .9, ease: 'power2.out' }, cue(id, 'sound', .05 + d));
  });
  hlOut(h, s.end - .4); popOut(c1, s.end - .4); popOut(c2, s.end - .4);
}

/* =============== S4 · KANJI =============== */
{
  const id = 'kanji', s = S[id], sec = scene(id);
  const h = headline(sec, '{Kanji}, {kosakata},|{grammar} & {reading}', { fs: 100, top: 215 });
  hlIn(h, at(id, .05), [cue(id, 'kanji', -.1), cue(id, 'kosakata', -.1), cue(id, 'grammar', -.1), cue(id, 'reading', -.1)]);
  const r = row(sec, 482);
  const pill = chip(r, 'Tersusun per level N5–N1', { bg: '#fff', sh: '#4bae7a' });
  popIn(pill, cue(id, 'level', -.1));
  swing(id, 0); wipe(at(id, .25));
  const lv = Math.max(2.2, cue(id, 'level', -.2) - s.start);
  play(id, .25, 16.4, 16.4);
  // highlight berpindah ke baris yang sedang disebut
  const hi = onScreen('<div class="hi" style="left:44px;top:332px;width:504px;height:139px"></div>');
  gsap.set(hi, { opacity: 0, scale: .92 });
  FT(hi, { opacity: 0, scale: .92 }, { opacity: 1, scale: 1, duration: .3, ease: 'back.out(2)' }, cue(id, 'kanji', -.05));
  [['kosakata', 481], ['grammar', 630], ['reading', 779]].forEach(([c, y]) => TO(hi, { y: y - 332, duration: .38, ease: 'power3.out' }, cue(id, c, -.1)));
  TO(hi, { opacity: 0, scale: .96, duration: .25 }, at(id, lv - .25));
  wipe(at(id, lv)); play(id, lv, 15.62, 15.62);
  hlOut(h, s.end - .4); popOut(pill, s.end - .4);
}

/* =============== S5 · LATIHAN =============== */
{
  const id = 'latihan', s = S[id], sec = scene(id);
  const h = headline(sec, 'Latihan sampai|{nempel}', { fs: 108, top: 218 });
  hlIn(h, at(id, .05), [cue(id, 'stick', -.1)]);
  const r = row(sec, 482);
  const items = [['Kuis', '#ffd0dd', '#ee4b8b', 'kuis'], ['Menulis', '#cfeaf7', '#4a9ec9', 'menulis'], ['Flashcard', '#cfeedd', '#4bae7a', 'flashcard'], ['Susun Kata', '#ffe2b8', '#e8913a', 'susun']];
  const cs = items.map(([t, bg, sh]) => chip(r, t, { bg, sh }));
  cs.forEach((c, i) => popIn(c, cue(id, items[i][3], -.12)));
  swing(id, 0); wipe(at(id, .25));
  const su = Math.max(2.2, cue(id, 'susun', -.15) - s.start);
  fit(id, .25, su - .1, 22.0, 24.6);
  wipe(at(id, su)); play(id, su, 25.6, 25.6);
  hlOut(h, s.end - .4); cs.forEach(c => popOut(c, s.end - .4));
}

/* =============== S6 · PROGRES =============== */
{
  const id = 'progres', s = S[id], sec = scene(id);
  const h = headline(sec, 'Progres kelihatan|{tiap hari}', { fs: 104, top: 218 });
  hlIn(h, at(id, .05), [cue(id, 'daily', -.1)]);
  const r = row(sec, 482);
  const c1 = chip(r, '<span class="emo">🔥</span>Streak', { bg: '#ffe2b8', sh: '#e8913a' });
  const c2 = chip(r, '<span class="emo">📅</span>Kalender', { bg: '#cfeaf7', sh: '#4a9ec9' });
  const c3 = chip(r, '<span class="emo">📊</span>Progres', { bg: '#cfeedd', sh: '#4bae7a' });
  popIn(c1, cue(id, 'streak', -.1)); popIn(c2, cue(id, 'kalender', -.1)); popIn(c3, cue(id, 'progres', -.1));
  swing(id, 0); wipe(at(id, .25));
  const kal = Math.max(2.4, cue(id, 'kalender', -.3) - s.start);
  fit(id, .25, kal, 28.6, 31.9);
  fit(id, kal, s.dur - .2, 32.0, 34.6);
  hlOut(h, s.end - .4); [c1, c2, c3].forEach(c => popOut(c, s.end - .4));
}

/* =============== S7 · TARGET =============== */
{
  const id = 'target', s = S[id], sec = scene(id);
  const h = headline(sec, 'Target mingguan,|{kamu yang atur}', { fs: 100, top: 215 });
  hlIn(h, at(id, .05), [cue(id, 'you', -.15)]);
  const r = row(sec, 482);
  const c = chip(r, '<span class="emo">🎯</span>Tulis targetmu sendiri', { bg: '#fff', sh: '#ee4b8b' });
  popIn(c, cue(id, 'target', .35));
  swing(id, 0);
  fit(id, .15, s.dur - .3, 35.0, 38.6);
  hlOut(h, s.end - .4); popOut(c, s.end - .4);
  TO(PM, { x: -1200, y: 320, rotation: -22, duration: .55, ease: 'power3.in' }, s.end - .55);
}
sweep(S.simple.start, '#ffe3a3');

/* =============== S8 · SIMPEL =============== */
{
  const id = 'simple', s = S[id], sec = scene(id);
  const h = headline(sec, 'Belajarnya|{simpel}', { fs: 112, top: 215 });
  hlIn(h, at(id, .05), [cue(id, 'simple', -.2)]);
  const ST = [
    ['あ', 'Aksara', 'Kuasai hiragana & katakana', '#fff1d6', '#e8913a', 'aksara'],
    ['学', 'Learning', 'Materi per level, sedikit tiap hari', '#dff2fa', '#4a9ec9', 'learning'],
    ['練', 'Latihan', 'Ulang sampai hafal', '#fee4ed', '#ee4b8b', 'latihan'],
    ['chk', 'Tracker', 'Centang & jaga streak', '#e0f3e8', '#4bae7a', 'tracker'],
  ];
  const rail = mk('<div id="rail" style="left:232px;top:600px;height:618px"></div>'); sec.appendChild(rail);
  gsap.set(rail, { scaleY: 0, transformOrigin: '50% 0' });
  FT(rail, { scaleY: 0 }, { scaleY: 1, duration: S[id].cues.tracker - S[id].cues.aksara + .5, ease: 'none' }, cue(id, 'aksara', -.1));
  ST.forEach(([g, t, sub, bg, sh, c], i) => {
    const top = 520 + i * 206;
    const st = mk(`<div class="step" style="top:${top}px;--sh:${sh}"><div class="ic" style="--bg:${bg}">${g === 'chk' ? '<i class="chk"></i>' : g}</div>
      <div class="tx"><b>${t}</b><span>${sub}</span></div><div class="no">${i + 1}</div></div>`);
    sec.appendChild(st); gsap.set(st, { opacity: 0, y: 70, scale: .9, rotation: i % 2 ? 1.2 : -1.2 });
    FT(st, { opacity: 0, y: 70, scale: .9 }, { opacity: 1, y: 0, scale: 1, rotation: 0, duration: .6, ease: 'back.out(1.7)' }, cue(id, c, -.3));
    TO(st, { scale: 1.035, duration: .22, yoyo: true, repeat: 1, ease: 'sine.inOut' }, cue(id, c, .25));
  });
  const r = row(sec, 1395);
  const mins = chip(r, '<span class="emo">⏱️</span>±20 menit sehari', { bg: '#fff', sh: '#4bae7a' });
  mins.style.fontSize = '42px';
  popIn(mins, cue(id, 'mins', -.15), 0, true);
  hlOut(h, s.end - .4);
}
sweep(S.price.start, '#ffc7d6');

/* =============== S9 · HARGA + CTA =============== */
const priceVal = { el: null, t0: 0 };
{
  const id = 'price', s = S[id], sec = scene(id);
  const br = row(sec, 440);
  const badge = chip(br, '<i class="dot"></i>Promo sekarang', { bg: '#e0f3e8', sh: '#4bae7a' });
  popIn(badge, at(id, .2));
  const pr = mk('<div class="price" style="top:520px"><span class="rp">Rp</span><span id="pv">0</span></div>');
  sec.appendChild(pr); gsap.set(pr, { opacity: 0, scale: .7 });
  const tp = cue(id, 'price', -.1);
  FT(pr, { opacity: 0, scale: .7, y: 40 }, { opacity: 1, scale: 1, y: 0, duration: .55, ease: 'back.out(2)' }, tp);
  priceVal.el = $('#pv', pr); priceVal.t0 = tp + .1; priceVal.dur = 1.35;
  TO(pr, { scale: 1.06, duration: .16, yoyo: true, repeat: 1, ease: 'power2.out' }, tp + 1.5);

  const seal = mk('<div class="seal" style="left:805px;top:355px">道</div>'); sec.appendChild(seal);
  gsap.set(seal, { scale: 0, rotation: -12 });
  const ts = tp + 1.55;
  FT(seal, { scale: 2.8, opacity: 0, rotation: 18 }, { scale: 1, opacity: 1, rotation: -12, duration: .26, ease: 'power3.in' }, ts);
  TO('#scenes', { x: 10, y: -8, duration: .05, repeat: 5, yoyo: true }, ts + .24);
  // kelopak sakura
  const R = rng(5);
  for (let i = 0; i < 26; i++) {
    const p = mk('<i class="petal"></i>'); $('#fx').appendChild(p);
    const a = R() * Math.PI * 2, d = 240 + R() * 520;
    gsap.set(p, { x: 900, y: 450, scale: 0, opacity: 0 });
    FT(p, { x: 900, y: 450, scale: 0, opacity: 1, rotation: 0 }, { x: 900 + Math.cos(a) * d, y: 450 + Math.sin(a) * d * .7 - 100, scale: .7 + R() * .9, rotation: R() * 600 - 300, duration: 1.0, ease: 'power3.out' }, ts + .25);
    TO(p, { y: '+=520', opacity: 0, duration: 1.5, ease: 'power1.in' }, ts + 1.2);
  }

  const sb = mk('<div class="sub" style="top:775px;font-size:46px;color:var(--ink)">Sekali bayar, bukan <span class="strike">langganan</span></div>');
  sec.appendChild(sb); gsap.set(sb, { opacity: 0, y: 24 });
  FT(sb, { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: .5 }, cue(id, 'once', -.15));
  const strike = $('.strike', sb);
  FT(strike, { '--sx': 0 }, { '--sx': 1, duration: .45, ease: 'power3.out' }, cue(id, 'once', 1.2));
  gsap.set(strike, { '--sx': 0 });

  const r1 = row(sec, 890), r2 = row(sec, 1012);
  const ck = t => `<i class="chk"></i>${t}`;
  const a = chip(r1, ck('Tanpa install'), { bg: '#fff', sh: '#4a9ec9' });
  const b = chip(r1, ck('Tanpa daftar akun'), { bg: '#fff', sh: '#4bae7a' });
  const c = chip(r2, ck('HP & laptop'), { bg: '#fff', sh: '#e8913a' });
  popIn(a, cue(id, 'noinstall', -.1)); popIn(b, cue(id, 'noaccount', -.1)); popIn(c, cue(id, 'noaccount', .75));

  const cta = mk('<div class="cta">Link di bio <span style="font-size:.9em">♡</span></div>'); sec.appendChild(cta);
  gsap.set(cta, { xPercent: -50, top: 1175, scale: 0 });
  FT(cta, { scale: 0, rotation: -6 }, { scale: 1, rotation: 0, duration: .7, ease: 'back.out(2.2)' }, cue(id, 'cta', -.1));
  TO(cta, { scale: 1.07, duration: .42, yoyo: true, repeat: 12, ease: 'sine.inOut' }, cue(id, 'cta', .7));
}

M.set({}, {}, TOTAL); // pastikan durasi master = total

/* ---------- dinamis per-frame (di luar GSAP) ---------- */
PLAN.sort((a, b) => a.t0 - b.t0);
const NF = 984, scr = $('#scr');
const fmt = n => String(n).replace(/\B(?=(\d{3})+(?!\d))/g, '.');
function frameAt(t) {
  let seg = PLAN[0];
  for (const p of PLAN) if (p.t0 <= t + 1e-6) seg = p;
  const src = Math.min(seg.src0 + Math.max(0, t - seg.t0) * seg.rate, seg.max);
  return clamp(Math.round((src - 3.5) * 24) + 1, 1, NF);
}
let cur = -1;
window.seekTo = async (t) => {
  M.time(clamp(t, 0, TOTAL), false);
  if (priceVal.el) {
    const p = clamp((t - priceVal.t0) / priceVal.dur, 0, 1);
    priceVal.el.textContent = fmt(Math.round(79000 * (1 - Math.pow(1 - p, 3))));
  }
  const f = frameAt(t);
  if (f !== cur) {
    cur = f; scr.src = `/build/screens/s${String(f).padStart(4, '0')}.jpg`;
    try { await scr.decode(); } catch (e) { /* frame hilang → biarkan */ }
  }
};
window.__total = TOTAL; window.__fps = FPS; window.__ready = true;
await window.seekTo(0);
})();
