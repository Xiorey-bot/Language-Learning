const { useState, useMemo, useEffect } = React;

function renderWithUnderline(text) {
  if (!text || typeof text !== "string" || text.indexOf("<<") === -1) return text;
  const parts = text.split(/(<<[^>]+>>)/g);
  return parts.map((part, i) => {
    const m = part.match(/^<<([^>]+)>>$/);
    if (m) return React.createElement("u", { key: i }, m[1]);
    return part;
  });
}

// Ikon (Check, ChevronRight, Circle, Flame, BookOpen, BarChart3, Sparkles, PenLine, Volume2, Home, Book, Sun, Moon, Lock)
// didefinisikan di icons.js, dimuat sebelum file ini.

// Data (KANJI_CONTENT, VOCAB_CONTENT, GRAMMAR_CONTENT, PARTICLES, READING_CONTENT, CHOUKAI_CONTENT,
// LEVELS, QUIZ, KANA_ROWS, HIRAGANA, KATAKANA, KANA_GROUPS, DAILY_TASKS, WEEK_DAYS, TABS, JLPT_EXAM_CONTENT)
// dimuat sebagai variabel global lewat <script> terpisah di index.html sebelum file ini.












function shuffleArr(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}
function pickN(arr, n) { return shuffleArr(arr).slice(0, n); }
function chunkForLevel(pool, practiceLevel, totalChunks = 10) {
  if (!pool.length) return pool;
  const chunkSize = Math.max(1, Math.ceil(pool.length / totalChunks));
  const start = (practiceLevel - 1) * chunkSize;
  const chunk = pool.slice(start, start + chunkSize);
  return chunk.length > 0 ? chunk : pool.slice(-chunkSize);
}
function makeChoices(correct, pool, n = 4) {
  // Beberapa pool (terutama bacaan kanji) punya banyak nilai yang sama persis dari item yang berbeda
  // (banyak kanji berbeda dibaca sama). Tanpa dibersihkan dulu, dua pengecoh yang terpilih bisa
  // kebetulan bernilai identik, membuat satu soal punya dua pilihan jawaban yang teksnya sama persis.
  const uniquePool = [...new Set(pool)].filter(x => x !== correct);
  const distractors = pickN(uniquePool, n - 1);
  return shuffleArr([correct, ...distractors]);
}

function buildVocabPool(level) {
  const pool = [];
  (level.vocab || []).forEach(theme => {
    (VOCAB_CONTENT[theme] || []).forEach(w => pool.push(w));
  });
  return pool;
}
function buildKanjiPool(level) {
  return (level.kanji || []).map(k => ({ char: k, ...(KANJI_CONTENT[k] || {}) })).filter(k => k.arti);
}

function cleanReading(str) {
  if (!str) return "";
  const first = str.split("、")[0].split("・")[0];
  const cleaned = first.replace(/\./g, "").trim();
  return cleaned === "-" ? "" : cleaned;
}

const DIFFICULTY = {
  mudah: { count: 5, choices: 3, label: "Mudah" },
  sedang: { count: 10, choices: 4, label: "Sedang" },
  susah: { count: 15, choices: 5, label: "Susah" },
};

function findSentenceWithChar(level, char) {
  const titles = (level.reading || []).filter(t => READING_CONTENT[t]);
  const candidates = [];
  titles.forEach(t => {
    (READING_CONTENT[t].text || []).forEach(s => {
      if (s.includes(char)) candidates.push(s);
    });
  });
  if (candidates.length === 0) return null;
  return pickN(candidates, 1)[0];
}

function genKanji(level, difficulty = "sedang", practiceLevel = 1) {
  const cfg = DIFFICULTY[difficulty];
  const kanjiPool = buildKanjiPool(level).map(k => ({ char: k.char, reading: cleanReading(k.kun) || cleanReading(k.on), arti: k.arti })).filter(k => k.reading && k.reading !== "-");
  const readingPool = kanjiPool.map(k => k.reading);
  const charPool = kanjiPool.map(k => k.char);
  const chunk = chunkForLevel(kanjiPool, practiceLevel);
  const picked = pickN(chunk, Math.min(cfg.count, chunk.length));
  const items = picked.map((k, idx) => {
    const sentence = findSentenceWithChar(level, k.char);
    const isOrthography = idx % 2 === 1;
    if (isOrthography) {
      return {
        q: `「${k.reading}」は漢字でどれですか。`,
        correct: k.char, choices: makeChoices(k.char, charPool, cfg.choices),
        explain: `「${k.reading}」は漢字で「${k.char}」と書きます。意味：${k.arti}。`,
      };
    }
    return {
      q: `文中の「${k.char}」の読み方はどれですか。`,
      passage: sentence || undefined,
      correct: k.reading, choices: makeChoices(k.reading, readingPool, cfg.choices),
      explain: sentence
        ? `この文の「${k.char}」は"${k.reading}"と読みます。意味：${k.arti}。`
        : `「${k.char}」dibaca "${k.reading}", artinya: ${k.arti}.`,
    };
  });
  return shuffleArr(items);
}

// Menyiapkan pasangan untuk kuis pencocokan (kanji<->arti atau kosakata<->arti), dengan kata/kanji
// dan arti yang unik supaya tidak ada dua pasangan dengan jawaban yang sama (tidak ambigu saat ditarik).
function buildMatchingPairs(level, type, count = 6) {
  const seenLeft = new Set(); const seenRight = new Set(); const uniq = [];
  const source = type === "kanji"
    ? buildKanjiPool(level).map(k => ({ left: k.char, right: k.arti }))
    : buildVocabPool(level).map(v => ({ left: v.jp, right: v.id }));
  shuffleArr(source).forEach(p => {
    if (!p.left || !p.right) return;
    if (seenLeft.has(p.left) || seenRight.has(p.right)) return;
    seenLeft.add(p.left); seenRight.add(p.right); uniq.push(p);
  });
  return pickN(uniq, Math.min(count, uniq.length)).map((p, i) => ({ id: i, left: p.left, right: p.right }));
}

function genKosakata(level, difficulty = "sedang", practiceLevel = 1) {
  const cfg = DIFFICULTY[difficulty];
  const vocabPool = buildVocabPool(level).map(v => ({ char: v.jp, reading: v.reading, arti: v.id })).filter(v => v.reading && v.reading !== v.char && v.char.length >= 2);
  const artiPool = vocabPool.map(v => v.arti);
  const chunk = chunkForLevel(vocabPool, practiceLevel);
  const picked = pickN(chunk, Math.min(cfg.count, chunk.length));
  const items = picked.map(v => {
    const sentence = findSentenceWithChar(level, v.char);
    return {
      q: `「${v.char}」(${v.reading}) artinya apa?`,
      passage: sentence || undefined,
      correct: v.arti, choices: makeChoices(v.arti, artiPool, cfg.choices),
      explain: `「${v.char}」(${v.reading}) artinya "${v.arti}".`,
    };
  });
  return shuffleArr(items);
}

function genBunpou(level, difficulty = "sedang", practiceLevel = 1) {
  const cfg = DIFFICULTY[difficulty];
  const patterns = (level.grammar || []).filter(p => GRAMMAR_CONTENT[p] && GRAMMAR_CONTENT[p].contoh && GRAMMAR_CONTENT[p].contoh[0]);
  const namePool = patterns;
  const chunk = chunkForLevel(patterns, practiceLevel);
  const picked = pickN(chunk, Math.min(cfg.count, chunk.length));
  return picked.map(p => {
    const g = GRAMMAR_CONTENT[p];
    const c = g.contoh[0];
    return { q: "つぎの文で使われている文法はどれですか。", passage: c.jp, correct: p, choices: makeChoices(p, namePool, cfg.choices),
      explain: `Pola "${p}" — ${g.arti} Contoh: "${c.jp}" (${c.romaji}) artinya "${c.id}".` };
  });
}

function genDokkai(level, difficulty = "sedang") {
  const cfg = DIFFICULTY[difficulty];
  const dokkaiCount = Math.max(2, Math.round(cfg.count / 2));
  const titles = (level.reading || []).filter(t => READING_CONTENT[t] && READING_CONTENT[t].kosakata && READING_CONTENT[t].kosakata.length > 0);
  if (titles.length === 0) return [];
  const globalReadingPool = titles.flatMap(t => READING_CONTENT[t].kosakata.map(w => w.reading));
  const picked = pickN(titles, Math.min(dokkaiCount, titles.length));
  return picked.map(t => {
    const r = READING_CONTENT[t];
    const w = pickN(r.kosakata, 1)[0];
    return { q: `この文章に出てきた「${w.jp}」の読み方はどれですか。`, passage: r.text.join(""), correct: w.reading, choices: makeChoices(w.reading, globalReadingPool, cfg.choices),
      explain: `「${w.jp}」dibaca "${w.reading}", artinya: ${w.arti}. Kata ini muncul dalam bacaan "${t}".` };
  });
}

function genChoukai(level, difficulty = "sedang") {
  const cfg = DIFFICULTY[difficulty];
  const pool = CHOUKAI_CONTENT[level.id] || [];
  if (pool.length === 0) return [];
  return pickN(pool, Math.min(cfg.count, pool.length)).map(item => ({
    q: item.q || "もっとも適切な返事を選んでください。",
    sub: item.type,
    audio: item.dialog,
    dialogText: item.dialog,
    correct: item.correct,
    choices: cfg.choices < 4 ? shuffleArr([item.correct, ...pickN(item.choices.filter(c => c !== item.correct), cfg.choices - 1)]) : shuffleArr(item.choices),
    explain: `Berdasarkan percakapan di atas (${item.type}), jawaban yang paling sesuai adalah "${item.correct}".`,
  }));
}

function genKanaQuiz(script, difficulty = "sedang", practiceLevel = 1) {
  const cfg = DIFFICULTY[difficulty];
  const pool = [];
  const table = script === "hiragana" ? HIRAGANA : KATAKANA;
  Object.keys(table).forEach(r => { if (table[r]) pool.push({ char: table[r], romaji: r }); });
  KANA_GROUPS.forEach(group => {
    group.entries.forEach(e => {
      const char = script === "hiragana" ? e.h : e.k;
      if (char) pool.push({ char, romaji: e.r });
    });
  });
  const romajiPool = pool.map(p => p.romaji);
  const charPool = pool.map(p => p.char);
  const chunk = chunkForLevel(pool, practiceLevel);
  const picked = pickN(chunk, Math.min(cfg.count, chunk.length));
  const items = picked.map((p, idx) => {
    const isReverse = idx % 2 === 1;
    if (isReverse) {
      return {
        q: `Huruf yang dibaca "${p.romaji}" yang mana?`,
        correct: p.char, choices: makeChoices(p.char, charPool, cfg.choices),
        explain: `"${p.romaji}" ditulis 「${p.char}」.`,
      };
    }
    return {
      q: `「${p.char}」dibaca apa?`,
      correct: p.romaji, choices: makeChoices(p.romaji, romajiPool, cfg.choices),
      explain: `「${p.char}」dibaca "${p.romaji}".`,
    };
  });
  return shuffleArr(items);
}


function Ring({ pct, size = 56, color = "var(--sakura)", showLabel = true }) {
  const r = (size - 6) / 2, c = 2 * Math.PI * r;
  return (
    <svg width={size} height={size} style={{ transform: "rotate(-90deg)" }}>
      <circle cx={size/2} cy={size/2} r={r} fill="none" stroke="var(--line)" strokeWidth="5" />
      <circle cx={size/2} cy={size/2} r={r} fill="none" stroke={color} strokeWidth="5" className="nm-ring-progress"
        strokeDasharray={c} strokeDashoffset={c - (pct/100)*c} strokeLinecap="round" />
      {showLabel && (
        <text x={size/2} y={size/2} fill="var(--ink)" fontSize="13" fontWeight="700"
          textAnchor="middle" dominantBaseline="middle" transform={`rotate(90 ${size/2} ${size/2})`}>
          {Math.round(pct)}%
        </text>
      )}
    </svg>
  );
}
function Hanko({ show }) {
  if (!show) return null;
  return (
    <div style={{ display: "inline-flex", alignItems: "center", justifyContent: "center",
      width: 46, height: 46, borderRadius: 10, border: "3px solid var(--sakura)", color: "var(--sakura)",
      background: "var(--card-bg)", fontFamily: "'Shippori Mincho', serif", fontSize: 21, fontWeight: 700,
      transform: "rotate(-6deg)", flexShrink: 0, boxShadow: "0 3px 0 rgba(255,111,145,0.25)" }}>済</div>
  );
}
function Tape({ color, side = "left" }) {
  return (
    <div style={{
      position: "absolute", top: -10, [side]: 18, width: 54, height: 22,
      background: color, opacity: 0.85, transform: "rotate(-5deg)",
      borderRadius: 3, boxShadow: "0 2px 4px rgba(0,0,0,0.08)",
    }} />
  );
}
function VocabFlashcards({ words }) {
  const [idx, setIdx] = useState(0);
  const [flipped, setFlipped] = useState(false);

  useEffect(() => { setIdx(0); setFlipped(false); }, [words]);

  const speakWord = (text) => {
    try {
      if (!window.speechSynthesis) return;
      window.speechSynthesis.cancel();
      const utter = new SpeechSynthesisUtterance(text);
      utter.lang = "ja-JP";
      utter.rate = 0.8;
      window.speechSynthesis.speak(utter);
    } catch (e) { /* speech not supported, silently ignore */ }
  };

  if (!words || words.length === 0) return null;
  const w = words[idx];
  const goNext = () => { setFlipped(false); setIdx(i => (i + 1) % words.length); };
  const goPrev = () => { setFlipped(false); setIdx(i => (i - 1 + words.length) % words.length); };

  return (
    <div>
      <div onClick={() => setFlipped(f => !f)} style={{
        background: "var(--card-bg)", border: "2px solid var(--matcha)", borderRadius: 16,
        padding: "22px 16px", minHeight: 108, display: "flex", flexDirection: "column",
        alignItems: "center", justifyContent: "center", textAlign: "center", cursor: "pointer", gap: 6,
      }}>
        {!flipped ? (
          <>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <span className="nm-title" style={{ fontSize: 21 }}>{w.jp}</span>
              <button onClick={(e) => { e.stopPropagation(); speakWord(w.jp); }}
                title="Dengar pelafalan" aria-label="Dengar pelafalan"
                style={{ display: "inline-flex", alignItems: "center", justifyContent: "center",
                  width: 28, height: 28, borderRadius: "50%", border: "1.5px solid var(--line)",
                  background: "var(--card-bg)", cursor: "pointer", flexShrink: 0, padding: 0 }}>
                <Volume2 size={14} color="var(--sora)" aria-hidden="true" />
              </button>
            </div>
            <span style={{ color: "var(--text-secondary)", fontSize: 14 }}>({w.reading})</span>
            <span style={{ fontSize: 10.5, color: "var(--text-muted)", marginTop: 4 }}>Ketuk kartu untuk lihat arti</span>
          </>
        ) : (
          <>
            <span style={{ fontSize: 16, fontWeight: 700, color: "var(--matcha)" }}>{w.id}</span>
            <span style={{ fontSize: 11.5, color: "var(--text-secondary)", marginTop: 4 }}>{w.jp}（{w.reading}）</span>
          </>
        )}
      </div>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: 8 }}>
        <button onClick={goPrev} aria-label="Kata sebelumnya"
          style={{ background: "var(--card-bg)", border: "1.5px solid var(--line)", borderRadius: "50%", cursor: "pointer",
            width: 32, height: 32, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <ChevronRight size={16} color="var(--matcha)" style={{ transform: "rotate(180deg)" }} aria-hidden="true" />
        </button>
        <span style={{ fontSize: 11.5, color: "var(--text-secondary)", fontWeight: 700 }}>{idx + 1} / {words.length}</span>
        <button onClick={goNext} aria-label="Kata berikutnya"
          style={{ background: "var(--card-bg)", border: "1.5px solid var(--line)", borderRadius: "50%", cursor: "pointer",
            width: 32, height: 32, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <ChevronRight size={16} color="var(--matcha)" aria-hidden="true" />
        </button>
      </div>
    </div>
  );
}

// Kuis pencocokan gaya "tarik garis": tarik dari kartu kiri (kanji/kosakata) ke kartu kanan
// (artinya) yang berjajar acak. Ditarik lewat Pointer Events supaya jalan sama baiknya di mouse
// (desktop) maupun sentuhan (HP/tablet); garis SVG mengikuti jari/kursor secara langsung, dan
// pasangan yang sudah benar tetap digambar sebagai garis hijau permanen.
function MatchingQuiz({ pairs }) {
  const [leftOrder, setLeftOrder] = useState([]);
  const [rightOrder, setRightOrder] = useState([]);
  const [matched, setMatched] = useState({});
  const [justMatched, setJustMatched] = useState(null);
  const [dragId, setDragId] = useState(null);
  const [dragPos, setDragPos] = useState(null);
  const [hoverId, setHoverId] = useState(null);
  const [wrongId, setWrongId] = useState(null);
  const [failLine, setFailLine] = useState(null);
  const [coords, setCoords] = useState({});
  const [startedAt, setStartedAt] = useState(() => Date.now());
  const [finishedSecs, setFinishedSecs] = useState(null);

  const containerRef = React.useRef(null);
  const leftRefs = React.useRef({});
  const rightRefs = React.useRef({});

  useEffect(() => {
    setLeftOrder(shuffleArr(pairs));
    setRightOrder(shuffleArr(pairs));
    setMatched({});
    setDragId(null); setDragPos(null); setWrongId(null); setHoverId(null); setFailLine(null); setJustMatched(null);
    setStartedAt(Date.now()); setFinishedSecs(null);
  }, [pairs]);

  const recomputeCoords = () => {
    const cont = containerRef.current;
    if (!cont) return;
    const cr = cont.getBoundingClientRect();
    const next = {};
    pairs.forEach(p => {
      const lEl = leftRefs.current[p.id];
      const rEl = rightRefs.current[p.id];
      const entry = {};
      if (lEl) { const r = lEl.getBoundingClientRect(); entry.lx = r.right - cr.left; entry.ly = r.top + r.height / 2 - cr.top; }
      if (rEl) { const r = rEl.getBoundingClientRect(); entry.rx = r.left - cr.left; entry.ry = r.top + r.height / 2 - cr.top; }
      next[p.id] = entry;
    });
    setCoords(next);
  };
  useEffect(() => {
    recomputeCoords();
    const onResize = () => recomputeCoords();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
    // eslint-disable-next-line
  }, [leftOrder, rightOrder]);

  const allMatched = pairs.length > 0 && pairs.every(p => matched[p.id]);
  useEffect(() => {
    if (allMatched && finishedSecs === null) setFinishedSecs(Math.max(1, Math.round((Date.now() - startedAt) / 1000)));
    // eslint-disable-next-line
  }, [allMatched]);

  // Garis melengkung ala "kabel"/string, bukan garis lurus kaku — jauh lebih terasa alami dan mengalir.
  const flowPath = (x1, y1, x2, y2) => {
    const midX = (x1 + x2) / 2;
    return `M ${x1} ${y1} C ${midX} ${y1}, ${midX} ${y2}, ${x2} ${y2}`;
  };
  const hitTestRight = (clientX, clientY) => {
    let hitId = null;
    Object.keys(rightRefs.current).forEach(key => {
      const el = rightRefs.current[key];
      if (!el) return;
      const r = el.getBoundingClientRect();
      if (clientX >= r.left && clientX <= r.right && clientY >= r.top && clientY <= r.bottom) hitId = Number(key);
    });
    return hitId;
  };

  const startDrag = (id) => (e) => {
    if (matched[id] || !containerRef.current) return;
    if (e.currentTarget.setPointerCapture) { try { e.currentTarget.setPointerCapture(e.pointerId); } catch (err) {} }
    const cr = containerRef.current.getBoundingClientRect();
    setDragId(id);
    setDragPos({ x: e.clientX - cr.left, y: e.clientY - cr.top });
  };
  const onMove = (e) => {
    if (dragId === null || !containerRef.current) return;
    const cr = containerRef.current.getBoundingClientRect();
    setDragPos({ x: e.clientX - cr.left, y: e.clientY - cr.top });
    setHoverId(hitTestRight(e.clientX, e.clientY));
  };
  const finishDrag = (clientX, clientY) => {
    if (dragId === null) return;
    const hitId = hitTestRight(clientX, clientY);
    if (hitId !== null) {
      if (hitId === dragId) {
        setMatched(m => ({ ...m, [dragId]: true }));
        setJustMatched(dragId);
        setTimeout(() => setJustMatched(j => (j === dragId ? null : j)), 500);
      } else {
        setFailLine({ from: dragId, to: hitId });
        setWrongId(hitId);
        setTimeout(() => { setWrongId(null); setFailLine(null); }, 380);
      }
    }
    setDragId(null); setDragPos(null); setHoverId(null);
  };
  const onUp = (e) => finishDrag(e.clientX, e.clientY);

  if (!pairs || pairs.length < 2) {
    return (
      <p style={{ fontSize: 13, color: "var(--text-secondary)", textAlign: "center", padding: "1rem 0" }}>
        Materinya belum cukup untuk kuis pencocokan di level ini.
      </p>
    );
  }

  return (
    <div>
      <div ref={containerRef} onPointerMove={onMove} onPointerUp={onUp}
        onPointerCancel={() => { setDragId(null); setDragPos(null); setHoverId(null); }}
        style={{ position: "relative", userSelect: "none", cursor: dragId !== null ? "grabbing" : "default" }}>
        <svg width="100%" height="100%" style={{ position: "absolute", inset: 0, pointerEvents: "none", overflow: "visible" }} aria-hidden="true">
          {pairs.filter(p => matched[p.id] && coords[p.id] && coords[p.id].lx !== undefined && coords[p.id].rx !== undefined).map(p => (
            <g key={p.id} className={justMatched === p.id ? "nm-match-line-pop" : undefined}>
              <path d={flowPath(coords[p.id].lx, coords[p.id].ly, coords[p.id].rx, coords[p.id].ry)}
                fill="none" stroke="var(--matcha)" strokeWidth={5} strokeLinecap="round" opacity={0.22} />
              <path d={flowPath(coords[p.id].lx, coords[p.id].ly, coords[p.id].rx, coords[p.id].ry)}
                fill="none" stroke="var(--matcha)" strokeWidth={2.5} strokeLinecap="round" />
            </g>
          ))}
          {failLine && coords[failLine.from] && coords[failLine.from].lx !== undefined && coords[failLine.to] && (
            <path d={flowPath(coords[failLine.from].lx, coords[failLine.from].ly, coords[failLine.to].rx, coords[failLine.to].ry)}
              fill="none" stroke="var(--sakura)" strokeWidth={2.5} strokeLinecap="round" className="nm-match-line-fail" />
          )}
          {dragId !== null && dragPos && coords[dragId] && coords[dragId].lx !== undefined && (
            <>
              <path d={flowPath(coords[dragId].lx, coords[dragId].ly, dragPos.x, dragPos.y)}
                fill="none" stroke="var(--momiji)" strokeWidth={5} strokeLinecap="round" opacity={0.18} />
              <path d={flowPath(coords[dragId].lx, coords[dragId].ly, dragPos.x, dragPos.y)}
                fill="none" stroke="var(--momiji)" strokeWidth={2.5} strokeLinecap="round" />
              <circle cx={dragPos.x} cy={dragPos.y} r={9} fill="var(--momiji)" opacity={0.25} />
              <circle cx={dragPos.x} cy={dragPos.y} r={5} fill="var(--momiji)" />
            </>
          )}
        </svg>
        <div style={{ display: "flex", gap: 14, position: "relative" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 10, flex: 1, minWidth: 0 }}>
            {leftOrder.map(p => (
              <div key={p.id} ref={el => { leftRefs.current[p.id] = el; }} data-match-id={p.id}
                onPointerDown={startDrag(p.id)}
                className={"nm-match-node nm-match-left"
                  + (matched[p.id] ? " nm-match-done" : "")
                  + (dragId === p.id ? " nm-match-active" : "")
                  + (justMatched === p.id ? " nm-match-pop" : "")}>
                <span className="nm-title" style={{ fontSize: 16 }}>{p.left}</span>
                {matched[p.id] && <Check size={14} color="var(--matcha)" aria-hidden="true" style={{ marginLeft: "auto", flexShrink: 0 }} />}
              </div>
            ))}
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 10, flex: 1, minWidth: 0 }}>
            {rightOrder.map(p => (
              <div key={p.id} ref={el => { rightRefs.current[p.id] = el; }} data-match-id={p.id}
                className={"nm-match-node nm-match-right"
                  + (matched[p.id] ? " nm-match-done" : "")
                  + (wrongId === p.id ? " nm-match-wrong" : "")
                  + (hoverId === p.id && dragId !== null && !matched[p.id] ? " nm-match-hover" : "")
                  + (justMatched === p.id ? " nm-match-pop" : "")}>
                <span style={{ fontSize: 12.5 }}>{p.right}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
      {allMatched && (
        <div style={{ textAlign: "center", marginTop: 16, animation: "nm-fadeIn 0.3s ease" }}>
          <p style={{ fontSize: 15, fontWeight: 700, color: "var(--matcha)", margin: "0 0 4px" }}>🎉 Semua cocok!</p>
          <p style={{ fontSize: 12, color: "var(--text-secondary)" }}>Selesai dalam {finishedSecs} detik.</p>
        </div>
      )}
    </div>
  );
}

// ============================================================================================
// Latihan Menulis (hiragana, katakana, kanji): pengguna menggambar tiap goresan di kanvas; goresan
// dinilai terhadap garis tengah (median) goresan asli dari WRITING_STROKES (urutan, arah, dan bentuk).
// Koordinat kanvas 1024x1024 (sumbu y ke bawah), sama dengan data sumber.
// ============================================================================================
function wrParse(ch) {
  const raw = (typeof WRITING_STROKES !== "undefined") ? WRITING_STROKES[ch] : null;
  if (!raw) return null;
  return raw.split("|").map(s => s.split(" ").map(p => { const [x, y] = p.split(","); return [Number(x), Number(y)]; }));
}
function wrDist(a, b) { return Math.hypot(a[0] - b[0], a[1] - b[1]); }
function wrLen(pts) { let s = 0; for (let i = 1; i < pts.length; i++) s += wrDist(pts[i - 1], pts[i]); return s; }
// Sampel ulang polyline menjadi n titik berjarak sama sepanjang garis (supaya kecepatan menggambar tidak berpengaruh).
function wrResample(pts, n) {
  const total = wrLen(pts);
  if (pts.length < 2 || total === 0) return Array.from({ length: n }, () => pts[0]);
  const step = total / (n - 1);
  const out = [pts[0]];
  let need = step, a = pts[0];
  for (let i = 1; i < pts.length; i++) {
    const b = pts[i];
    let seg = wrDist(a, b);
    while (seg >= need && out.length < n) {
      const t = need / seg;
      a = [a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t];
      out.push(a);
      seg = wrDist(a, b);
      need = step;
    }
    need -= seg; a = b;
  }
  while (out.length < n) out.push(pts[pts.length - 1]);
  return out;
}
function wrMean(a, b) { let s = 0; for (let i = 0; i < a.length; i++) s += wrDist(a[i], b[i]); return s / a.length; }
// Garis dihaluskan lewat titik tengah antar-titik (kurva kuadrat) supaya tidak patah-patah.
function wrSmooth(pts) {
  if (pts.length < 3) return "M " + pts.map(p => p[0] + " " + p[1]).join(" L ");
  let d = `M ${pts[0][0]} ${pts[0][1]}`;
  for (let i = 1; i < pts.length - 1; i++) {
    const mx = (pts[i][0] + pts[i + 1][0]) / 2, my = (pts[i][1] + pts[i + 1][1]) / 2;
    d += ` Q ${pts[i][0]} ${pts[i][1]} ${mx} ${my}`;
  }
  const l = pts[pts.length - 1];
  return d + ` L ${l[0]} ${l[1]}`;
}
// Menilai satu goresan pengguna terhadap goresan yang seharusnya (expectedIdx).
// Mengembalikan { ok } atau { ok:false, reason: "reverse" | "order" | "short" | "shape", idx? }.
function wrJudge(userPts, strokes, expectedIdx) {
  const N = 24, TOL = 125, END_TOL = 240;
  const uLen = wrLen(userPts);
  const u = wrResample(userPts, N);
  const score = (ref) => {
    const refLen = wrLen(ref);
    const r = wrResample(ref, N);
    const fwd = wrMean(u, r);
    const rev = wrMean(u, r.slice().reverse());
    if (refLen < 150) { // titik / goresan sangat pendek: cukup letaknya berdekatan
      const rm = [(r[0][0] + r[N - 1][0]) / 2, (r[0][1] + r[N - 1][1]) / 2];
      const um = [(u[0][0] + u[N - 1][0]) / 2, (u[0][1] + u[N - 1][1]) / 2];
      return { ok: wrDist(um, rm) <= 170 && uLen <= refLen * 2.5 + 90, fwd, rev, short: true };
    }
    const ok = fwd <= TOL && wrDist(u[0], r[0]) <= END_TOL && wrDist(u[N - 1], r[N - 1]) <= END_TOL
      && uLen >= refLen * 0.45 && uLen <= refLen * 2.3;
    return { ok, fwd, rev, short: false };
  };
  const exp = score(strokes[expectedIdx]);
  // Arah terbalik: bentuknya cocok, tetapi terbalik jauh lebih pas daripada searah (untuk goresan yang cukup panjang).
  if (!exp.short && exp.rev <= TOL && exp.rev < exp.fwd * 0.85) return { ok: false, reason: "reverse" };
  if (exp.ok) return { ok: true };
  for (let j = expectedIdx + 1; j < strokes.length; j++) {
    if (score(strokes[j]).ok) return { ok: false, reason: "order", idx: j };
  }
  if (uLen < wrLen(strokes[expectedIdx]) * 0.45) return { ok: false, reason: "short" };
  return { ok: false, reason: "shape" };
}

function WritingPractice({ char, info, onDone, onNext }) {
  const strokes = React.useMemo(() => wrParse(char), [char]);
  const paths = React.useMemo(() => (strokes ? strokes.map(wrSmooth) : []), [strokes]);
  const svgRef = React.useRef(null);
  const liveRef = React.useRef(null);
  const [done, setDone] = useState(0);
  const [live, setLive] = useState(null);
  const [failed, setFailed] = useState(null);
  const [tries, setTries] = useState(0);
  const [mistakes, setMistakes] = useState(0);
  const [guide, setGuide] = useState(true);
  const [hint, setHint] = useState(false);
  const [msg, setMsg] = useState(null);
  const [lastDone, setLastDone] = useState(-1);

  const total = strokes ? strokes.length : 0;
  const finished = total > 0 && done >= total;
  useEffect(() => { if (finished && onDone) onDone(mistakes); /* eslint-disable-next-line */ }, [finished]);

  const reset = () => {
    liveRef.current = null;
    setDone(0); setLive(null); setFailed(null); setTries(0); setMistakes(0); setHint(false); setMsg(null); setLastDone(-1);
  };
  const toPoint = (e) => {
    const r = svgRef.current.getBoundingClientRect();
    return [(e.clientX - r.left) * 1024 / r.width, (e.clientY - r.top) * 1024 / r.height];
  };
  const onDown = (e) => {
    if (finished || !strokes) return;
    if (e.cancelable) e.preventDefault();
    try { svgRef.current.setPointerCapture(e.pointerId); } catch (err) {}
    liveRef.current = [toPoint(e)];
    setLive(liveRef.current.slice());
    setFailed(null);
  };
  const onMove = (e) => {
    if (!liveRef.current) return;
    const p = toPoint(e);
    if (wrDist(p, liveRef.current[liveRef.current.length - 1]) < 4) return;
    liveRef.current.push(p);
    setLive(liveRef.current.slice());
  };
  const onUp = () => {
    const pts = liveRef.current; liveRef.current = null;
    if (!pts) return;
    setLive(null);
    const j = wrJudge(pts, strokes, done);
    if (j.ok) {
      const next = done + 1;
      setDone(next); setLastDone(done); setTries(0); setHint(false);
      setMsg(next >= total ? { t: "ok", s: "Selesai! Semua goresan benar 🎉" } : { t: "ok", s: `Bagus! Lanjut ke goresan ke-${next + 1}.` });
      return;
    }
    const n = done + 1;
    const text = {
      reverse: guide ? `Arah goresannya terbalik. Mulai dari titik bernomor ${n}.` : "Arah goresannya terbalik. Coba mulai dari ujung yang satunya.",
      order: `Itu goresan ke-${(j.idx || 0) + 1}. Urutan sekarang: goresan ke-${n}.`,
      short: "Goresannya terlalu pendek, tarik lebih panjang.",
      shape: `Belum pas. Ikuti bentuk goresan ke-${n} (tekan Petunjuk kalau perlu).`,
    }[j.reason];
    setFailed(pts); setTimeout(() => setFailed(null), 450);
    setMistakes(m => m + 1);
    const t2 = tries + 1; setTries(t2);
    if (t2 >= 3) { setHint(true); setMsg({ t: "err", s: text + " Petunjuk ditampilkan." }); }
    else setMsg({ t: "err", s: text });
  };

  if (!strokes) {
    return <p style={{ fontSize: 13, color: "var(--text-secondary)", textAlign: "center", padding: "1rem 0" }}>Data goresan untuk “{char}” belum tersedia.</p>;
  }
  const stars = mistakes === 0 ? "⭐⭐⭐" : mistakes <= 2 ? "⭐⭐" : "⭐";

  return (
    <div>
      <div style={{ textAlign: "center", marginBottom: 10 }}>
        <p style={{ fontSize: 12, color: "var(--text-secondary)", margin: "0 0 2px" }}>Tulis:</p>
        <p className="nm-title" style={{ fontSize: 20, margin: 0 }}>{info && info.title}</p>
        {info && info.sub && <p style={{ fontSize: 12, color: "var(--text-secondary)", margin: "2px 0 0" }}>{info.sub}</p>}
      </div>

      <div role="group" aria-label="Mode panduan" style={{ display: "flex", gap: 6, justifyContent: "center", marginBottom: 10 }}>
        <button onClick={() => setGuide(true)} aria-pressed={guide} className={"nm-btn nm-btn-sm " + (guide ? "nm-btn-primary" : "nm-btn-secondary")}>Ikuti jejak</button>
        <button onClick={() => setGuide(false)} aria-pressed={!guide} className={"nm-btn nm-btn-sm " + (!guide ? "nm-btn-primary" : "nm-btn-secondary")}>Tanpa panduan</button>
      </div>

      <svg ref={svgRef} viewBox="0 0 1024 1024" role="img" aria-label={`Kanvas menulis ${info && info.title ? info.title : char}. Gambar tiap goresan dengan jari atau mouse.`}
        onPointerDown={onDown} onPointerMove={onMove} onPointerUp={onUp} onPointerCancel={onUp}
        style={{ display: "block", width: "100%", maxWidth: 360, aspectRatio: "1 / 1", margin: "0 auto", touchAction: "none", userSelect: "none",
          background: "var(--card-bg)", border: "2px solid var(--line)", borderRadius: 18, cursor: finished ? "default" : "crosshair" }}>
        <g stroke="var(--line)" strokeWidth={5} strokeDasharray="16 14" fill="none">
          <line x1={512} y1={0} x2={512} y2={1024} /><line x1={0} y1={512} x2={1024} y2={512} />
          <line x1={0} y1={0} x2={1024} y2={1024} opacity={0.5} /><line x1={1024} y1={0} x2={0} y2={1024} opacity={0.5} />
        </g>
        {guide && paths.map((d, i) => i >= done && (
          <path key={"g" + i} d={d} fill="none" stroke="var(--text-muted)" strokeWidth={62} strokeLinecap="round" strokeLinejoin="round" opacity={0.55} />
        ))}
        {paths.map((d, i) => i < done && (
          <path key={"d" + i} d={d} fill="none" stroke="var(--ink)" strokeWidth={46} strokeLinecap="round" strokeLinejoin="round"
            className={i === lastDone ? "nm-wr-stroke-in" : undefined} />
        ))}
        {hint && !finished && (
          <g>
            <path d={paths[done]} fill="none" stroke="var(--momiji)" strokeWidth={62} strokeLinecap="round" strokeLinejoin="round" opacity={0.75} className="nm-wr-hint" />
            <circle r={26} fill="var(--momiji)"><animateMotion dur="1.4s" repeatCount="indefinite" path={paths[done]} /></circle>
          </g>
        )}
        {guide && !finished && strokes.map((s, i) => i >= done && (
          <g key={"n" + i}>
            <circle cx={s[0][0]} cy={s[0][1]} r={34} fill="var(--card-bg)" stroke={i === done ? "var(--momiji)" : "var(--text-secondary)"} strokeWidth={6} />
            <text x={s[0][0]} y={s[0][1] + 13} textAnchor="middle" fontSize={40} fontWeight={700}
              fill={i === done ? "var(--momiji)" : "var(--text-secondary)"} style={{ fontFamily: "'Zen Maru Gothic', sans-serif" }}>{i + 1}</text>
          </g>
        ))}
        {failed && <path d={wrSmooth(failed)} fill="none" stroke="var(--sakura)" strokeWidth={40} strokeLinecap="round" strokeLinejoin="round" className="nm-wr-fail" />}
        {live && live.length > 0 && (
          live.length === 1
            ? <circle cx={live[0][0]} cy={live[0][1]} r={20} fill="var(--sora)" />
            : <path d={wrSmooth(live)} fill="none" stroke="var(--sora)" strokeWidth={40} strokeLinecap="round" strokeLinejoin="round" opacity={0.9} />
        )}
      </svg>

      <div style={{ display: "flex", justifyContent: "center", gap: 5, margin: "10px 0 4px" }} aria-hidden="true">
        {strokes.map((_, i) => (
          <span key={i} style={{ width: 9, height: 9, borderRadius: "50%", background: i < done ? "var(--matcha)" : "var(--line)", transition: "background 0.2s ease" }} />
        ))}
      </div>
      <p style={{ fontSize: 11.5, color: "var(--text-secondary)", textAlign: "center", margin: "0 0 6px", fontWeight: 700 }}>
        Goresan {Math.min(done + 1, total)} / {total}
      </p>
      <p role="status" aria-live="polite" style={{ fontSize: 12.5, minHeight: 20, textAlign: "center", margin: "0 0 10px", fontWeight: 700,
        color: msg ? (msg.t === "ok" ? "var(--matcha)" : "var(--sakura)") : "var(--text-secondary)" }}>
        {msg ? msg.s : (guide ? "Gambar goresan pertama, mulai dari titik bernomor 1." : "Gambar goresan pertama dari karakter ini.")}
      </p>

      {finished ? (
        <div style={{ textAlign: "center", animation: "nm-fadeIn 0.3s ease" }}>
          <p style={{ fontSize: 22, margin: "0 0 2px" }}>{stars}</p>
          <p style={{ fontSize: 12, color: "var(--text-secondary)", margin: "0 0 10px" }}>
            {mistakes === 0 ? "Sempurna, tanpa salah!" : `${mistakes} kali salah sebelum benar.`}
          </p>
          <div style={{ display: "flex", gap: 8, justifyContent: "center", flexWrap: "wrap" }}>
            <button onClick={reset} className="nm-btn nm-btn-outline">↺ Tulis lagi</button>
            {onNext && <button onClick={onNext} className="nm-btn nm-btn-primary">Berikutnya <ChevronRight size={14} aria-hidden="true" /></button>}
          </div>
        </div>
      ) : (
        <div style={{ display: "flex", gap: 8, justifyContent: "center", flexWrap: "wrap" }}>
          <button onClick={() => setHint(h => !h)} aria-pressed={hint} className="nm-btn nm-btn-secondary">💡 Petunjuk</button>
          <button onClick={reset} className="nm-btn nm-btn-secondary">↺ Ulangi</button>
        </div>
      )}
    </div>
  );
}

// Daftar kanji per level di data saling menumpuk (mis. N4 memuat semua kanji N5). Untuk Latihan Menulis, tiap kanji
// hanya dihitung di level TERENDAH tempat ia pertama muncul, jadi tidak ada kanji yang berulang di level berikutnya.
function kanjiExclusiveByLevel() {
  const seen = new Set(); const out = {};
  LEVELS.forEach(l => {
    out[l.id] = [...new Set(l.kanji)].filter(k => !seen.has(k));
    out[l.id].forEach(k => seen.add(k));
  });
  return out;
}

// Susunan kana untuk pemilih huruf: dasar (46, berbaris sesuai tabel), dakuten+handakuten (25), dan huruf kecil/tambahan.
function kanaWritingSets(script) {
  const isH = script === "hiragana";
  const table = isH ? HIRAGANA : KATAKANA;
  const dak = KANA_GROUPS.filter(g => g.id === "dakuten" || g.id === "handakuten").flatMap(g => g.entries)
    .map(e => ({ ch: isH ? e.h : e.k, label: e.r }));
  const small = isH
    ? [{ ch: "ゃ", label: "ya kecil" }, { ch: "ゅ", label: "yu kecil" }, { ch: "ょ", label: "yo kecil" }, { ch: "っ", label: "tsu kecil" }]
    : [{ ch: "ャ", label: "ya kecil" }, { ch: "ュ", label: "yu kecil" }, { ch: "ョ", label: "yo kecil" }, { ch: "ッ", label: "tsu kecil" }, { ch: "ー", label: "panjang" }];
  const rows = KANA_ROWS.map(row => row.map(r => (r ? { ch: table[r], label: r } : null)));
  return { rows, dasar: rows.flat().filter(Boolean), dakuten: dak, kecil: small };
}
function writingInfo(ch, script, labelMap) {
  if (script === "kanji") {
    const k = (typeof KANJI_CONTENT !== "undefined" && KANJI_CONTENT[ch]) || null;
    const rd = k ? [k.kun && k.kun !== "-" ? "kun: " + k.kun : "", k.on && k.on !== "-" ? "on: " + k.on : ""].filter(Boolean).join(" · ") : "";
    return { title: k && k.arti ? k.arti : "Kanji ini", sub: rd };
  }
  return { title: (labelMap && labelMap[ch]) || ch, sub: script === "hiragana" ? "Hiragana" : "Katakana" };
}

// Untuk soal yang skrip dialognya TIDAK diketahui (audio-only, tidak ada 聴解原文), TTS tidak bisa
// membacakan apa pun. Sebagai gantinya, komponen ini memutar POTONGAN FILE AUDIO ASLI langsung
// (dari audioSrc, mulai audioStart sampai audioEnd), memakai elemen <audio> HTML biasa - bukan TTS.
function RealAudioClipPlayer({ src, start, end }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isDone, setIsDone] = useState(false);
  const [loadError, setLoadError] = useState(false);
  const [elapsed, setElapsed] = useState(0);
  const audioRef = React.useRef(null);

  const fmt = (s) => `${Math.floor(s / 60)}:${String(Math.floor(s % 60)).padStart(2, "0")}`;
  const clipDuration = Math.max(0, end - start);

  // Loncat ke detik tertentu (currentTime) sebelum metadata file audio selesai dimuat sering diam-diam
  // gagal di banyak browser (nilainya diabaikan/direset). Jadi kalau metadata belum siap (readyState<1),
  // kita tunggu event loadedmetadata dulu baru loncat+putar, alih-alih langsung memanggil play().
  const seekAndPlayFrom = (targetTime) => {
    const el = audioRef.current;
    if (!el) return;
    setLoadError(false);
    const clamped = Math.max(start, Math.min(end, targetTime));
    const doSeekAndPlay = () => {
      try { el.currentTime = clamped; } catch (e) {}
      setElapsed(clamped - start);
      const playPromise = el.play();
      if (playPromise && typeof playPromise.catch === "function") playPromise.catch(() => setLoadError(true));
    };
    if (el.readyState >= 1) {
      doSeekAndPlay();
    } else {
      el.addEventListener("loadedmetadata", doSeekAndPlay, { once: true });
      el.load();
    }
    setIsPlaying(true);
    setIsDone(false);
  };
  const handlePlay = () => seekAndPlayFrom(start);
  const handlePause = () => {
    const el = audioRef.current;
    if (el) el.pause();
    setIsPlaying(false);
  };
  // Posisi elapsed diambil LANGSUNG dari currentTime file audio asli (bukan jam buatan/estimasi) - jadi
  // selalu akurat, sinkron persis dengan suara yang sungguhan terdengar.
  const handleTimeUpdate = () => {
    const el = audioRef.current;
    if (!el) return;
    if (el.currentTime >= end) {
      el.pause();
      setIsPlaying(false);
      setIsDone(true);
      setElapsed(clipDuration);
      return;
    }
    setElapsed(Math.max(0, el.currentTime - start));
  };
  const seekToRatio = (ratio) => {
    const clamped = Math.max(0, Math.min(1, ratio));
    seekAndPlayFrom(start + clamped * clipDuration);
  };

  const pct = clipDuration ? (elapsed / clipDuration) * 100 : 0;

  return (
    <div className="nm-audioplayer">
      <audio ref={audioRef} src={src} preload="metadata" onTimeUpdate={handleTimeUpdate}
        onEnded={() => { setIsPlaying(false); setIsDone(true); }}
        onError={() => setLoadError(true)} />
      <button
        onClick={() => { if (isPlaying) handlePause(); else handlePlay(); }}
        aria-label={isPlaying ? "Jeda" : "Putar"}
        className="nm-audioplayer-playbtn" style={{ background: "var(--sora)" }}>
        {isPlaying ? <Pause size={16} color="#fff" aria-hidden="true" /> : <Play size={16} color="#fff" style={{ marginLeft: 2 }} aria-hidden="true" />}
      </button>
      {loadError ? (
        <span style={{ fontSize: 11.5, color: "var(--sakura)", flexShrink: 0, display: "flex", alignItems: "center", gap: 5 }}>
          <AlertTriangle size={14} aria-hidden="true" /> Gagal memuat file audio (cek folder audio/)
        </span>
      ) : (
        <>
          <span className="nm-audioplayer-time">{fmt(elapsed)} / {fmt(clipDuration)}</span>
          <div
            onClick={(e) => {
              const rect = e.currentTarget.getBoundingClientRect();
              const ratio = rect.width > 0 ? (e.clientX - rect.left) / rect.width : 0;
              seekToRatio(ratio);
            }}
            role="slider" aria-label="Lompat ke bagian tertentu" aria-valuemin={0} aria-valuemax={100} aria-valuenow={Math.round(pct)}
            className="nm-audioplayer-track">
            <div className="nm-audioplayer-track-bg">
              <div className="nm-audioplayer-track-fill" style={{ width: `${pct}%`, background: "var(--sora)" }} />
            </div>
          </div>
          {isDone
            ? <span style={{ flexShrink: 0, display: "flex", color: "var(--matcha)" }}><Check size={15} aria-hidden="true" /></span>
            : <Volume2 size={15} color="var(--text-secondary)" aria-hidden="true" style={{ flexShrink: 0 }} />}
        </>
      )}
    </div>
  );
}

function AudioPlayerBar({ dialog }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [turnsDone, setTurnsDone] = useState(0);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [isDone, setIsDone] = useState(false);
  const [elapsed, setElapsed] = useState(0);
  const genRef = React.useRef(0);
  const timerRef = React.useRef(null);

  const parseTurns = (dialogText) => {
    const lines = dialogText.split("\n").map(l => l.trim()).filter(Boolean);
    return lines.map(line => {
      const m = line.match(/^([^：:]{1,3})[：:](.*)$/);
      return m ? { speaker: m[1], text: m[2].trim() } : { speaker: null, text: line };
    });
  };
  const turns = parseTurns(dialog);
  const totalTurns = turns.length;
  // Perkiraan lama-bicara tiap kalimat (dari jumlah huruf) - HANYA dipakai untuk menggeser posisi jam
  // saat maju/mundur (supaya arahnya masuk akal: maju = angka naik, mundur = angka turun). TIDAK dipakai
  // untuk menentukan "sudah selesai atau belum" (itu murni dari turnsDone/onend asli), jadi tidak akan
  // menimbulkan bug seperti sebelumnya.
  const turnEstSecs = turns.map(t => Math.max(1, Math.round(t.text.length / 6)));
  const cumulativeBefore = (idx) => turnEstSecs.slice(0, idx).reduce((a, b) => a + b, 0);

  const fmt = (s) => `${Math.floor(s / 60)}:${String(Math.floor(s % 60)).padStart(2, "0")}`;
  const stopTimer = () => { if (timerRef.current) { clearInterval(timerRef.current); timerRef.current = null; } };

  // Progres (bar) MURNI dihitung dari berapa kalimat yang benar-benar sudah dibacakan tuntas (lewat
  // event onend asli) - bukan tebakan waktu, jadi tidak mungkin "macet" atau salah. Jam di sebelahnya
  // cuma tampilan posisi (naik saat maju, turun saat mundur), tidak dipakai untuk logika penyelesaian.
  const playFromIndex = (startIdx, resetClock) => {
    if (!window.speechSynthesis) return;
    window.speechSynthesis.cancel();
    stopTimer();
    genRef.current += 1;
    const myGen = genRef.current;
    const speakerPitch = {};
    let nextPitch = 1.15;
    let idx = Math.max(0, Math.min(startIdx, turns.length));

    setTurnsDone(idx);
    setCurrentIdx(idx);
    setIsDone(false);
    setIsPaused(false);
    // Jam cuma direset kalau ini benar-benar mulai dari awal (Putar dari nol) - maju/mundur/lompat
    // sengaja MELANJUTKAN jam yang sama (tidak direset) supaya tidak terasa "mengulang dari nol" tiap
    // kali pindah kalimat, walaupun posisi barunya bukan hasil pengukuran waktu asli.
    // Kalau ini mulai dari nol (Putar segar), jam ikut nol. Kalau ini hasil maju/mundur/lompat, jam
    // langsung lompat ke perkiraan posisi kalimat itu (naik kalau maju, turun kalau mundur), lalu jalan
    // terus dari situ selama kalimatnya dibacakan.
    setElapsed(resetClock ? 0 : cumulativeBefore(idx));

    // "myGen" menjaga supaya callback onend/onerror yang telat nyangkut dari sesi SEBELUMNYA
    // (misalnya setelah cancel() dipanggil karena maju/mundur/putar ulang) tidak ikut mengubah state
    // sesi yang baru.
    const speakNext = () => {
      if (myGen !== genRef.current) return;
      if (idx >= turns.length) {
        setIsPlaying(false); setIsDone(true); stopTimer();
        return;
      }
      setCurrentIdx(idx);
      const t = turns[idx];
      idx += 1;
      const utter = new SpeechSynthesisUtterance(t.text);
      utter.lang = "ja-JP";
      utter.rate = 0.82;
      if (t.speaker) {
        if (!(t.speaker in speakerPitch)) { speakerPitch[t.speaker] = nextPitch; nextPitch = nextPitch > 1 ? 0.85 : 1.15; }
        utter.pitch = speakerPitch[t.speaker];
      }
      utter.onend = () => { if (myGen === genRef.current) { setTurnsDone(idx); speakNext(); } };
      utter.onerror = () => { if (myGen === genRef.current) { setTurnsDone(idx); speakNext(); } };
      window.speechSynthesis.speak(utter);
    };
    speakNext();

    setIsPlaying(true);
    timerRef.current = setInterval(() => setElapsed(e => e + 0.2), 200);
  };
  const handlePlay = () => playFromIndex(0, true);
  const handlePause = () => {
    window.speechSynthesis.pause();
    setIsPlaying(false);
    setIsPaused(true);
    stopTimer();
  };
  const handleResume = () => {
    window.speechSynthesis.resume();
    setIsPlaying(true);
    timerRef.current = setInterval(() => setElapsed(e => e + 0.2), 200);
  };
  const skipBack = () => { if (totalTurns > 1) playFromIndex(Math.max(0, currentIdx - 1), false); };
  const skipForward = () => { if (totalTurns > 1) playFromIndex(Math.min(totalTurns - 1, currentIdx + 1), false); };
  const seekToRatio = (ratio) => {
    if (totalTurns <= 1) return;
    const clamped = Math.max(0, Math.min(1, ratio));
    const targetIdx = Math.min(totalTurns - 1, Math.floor(clamped * totalTurns));
    playFromIndex(targetIdx, false);
  };
  useEffect(() => () => { genRef.current += 1; stopTimer(); if (window.speechSynthesis) window.speechSynthesis.cancel(); }, []);

  const pct = totalTurns ? (turnsDone / totalTurns) * 100 : 0;
  return (
    <div className="nm-audioplayer">
      <button onClick={skipBack} disabled={totalTurns <= 1} aria-label="Mundur satu kalimat" className="nm-audioplayer-skipbtn">
        <SkipBack size={13} aria-hidden="true" />
      </button>
      <button
        onClick={() => { if (isPlaying) handlePause(); else if (isPaused && !isDone) handleResume(); else handlePlay(); }}
        aria-label={isPlaying ? "Jeda" : "Putar"}
        className="nm-audioplayer-playbtn" style={{ background: "var(--momiji)" }}>
        {isPlaying ? <Pause size={16} color="#fff" aria-hidden="true" /> : <Play size={16} color="#fff" style={{ marginLeft: 2 }} aria-hidden="true" />}
      </button>
      <button onClick={skipForward} disabled={totalTurns <= 1} aria-label="Maju satu kalimat" className="nm-audioplayer-skipbtn">
        <SkipForward size={13} aria-hidden="true" />
      </button>
      <span className="nm-audioplayer-time" style={{ minWidth: 34 }}>{fmt(elapsed)}</span>
      <div
        onClick={(e) => {
          const rect = e.currentTarget.getBoundingClientRect();
          const ratio = rect.width > 0 ? (e.clientX - rect.left) / rect.width : 0;
          seekToRatio(ratio);
        }}
        role="slider" aria-label="Lompat ke bagian tertentu" aria-valuemin={0} aria-valuemax={100} aria-valuenow={Math.round(pct)}
        className="nm-audioplayer-track" style={{ cursor: totalTurns > 1 ? "pointer" : "default" }}>
        <div className="nm-audioplayer-track-bg">
          <div className="nm-audioplayer-track-fill" style={{ width: `${pct}%`, background: "var(--momiji)", transition: "width 0.3s ease" }} />
        </div>
      </div>
      {isDone
        ? <span style={{ flexShrink: 0, display: "flex", color: "var(--matcha)" }}><Check size={15} aria-hidden="true" /></span>
        : <Volume2 size={15} color="var(--text-secondary)" aria-hidden="true" style={{ flexShrink: 0 }} />}
    </div>
  );
}

// ===== Susun Kata (game menyusun potongan kata jadi kalimat) =====
// Soal dibentuk saat aplikasi berjalan dari soal 並べ替え (urutan kata ★) yang SUDAH ada di JLPT_EXAM_CONTENT
// (bunpou_dokkai > mondai2). Tidak ada soal baru dan data tidak diubah: teks soal = kerangka kalimat, 4 pilihan = potongan kata,
// kalimat lengkap (`full`) dipakai untuk mencari urutan yang benar. Soal yang urutannya tidak bisa dipastikan secara otomatis
// (tidak ada yang cocok / ambigu) dilewati di game ini, tetapi tetap ada di Latihan Dokkai.
const PUZZLE_SLOT_SPLIT = /(＿★＿|＿＿＿|★)/;
function puzzleIsSlot(x) { return x === "＿＿＿" || x === "＿★＿" || x === "★"; }
function puzzleNorm(str) { return String(str).normalize("NFKC").replace(/[\s\u3000、。，,「」『』・？！?!\u2026]+/g, ""); }
function puzzlePerms(arr) {
  if (arr.length <= 1) return [arr];
  const out = [];
  arr.forEach((x, i) => puzzlePerms(arr.slice(0, i).concat(arr.slice(i + 1))).forEach(rest => out.push([x, ...rest])));
  return out;
}
function puzzleCommonSuffix(a, b) { let n = 0; while (n < a.length && n < b.length && a[a.length - 1 - n] === b[b.length - 1 - n]) n++; return n; }
function puzzleCommonPrefix(a, b) { let n = 0; while (n < a.length && n < b.length && a[n] === b[n]) n++; return n; }
// Kalimat (ternormalisasi) yang terbentuk bila potongan diisikan ke kotak sesuai urutan `order`.
function puzzleLineFor(pz, order) {
  const mid = pz.parts.slice(pz.slotParts[0], pz.slotParts[pz.slotParts.length - 1] + 1);
  let n = 0;
  return puzzleNorm(mid.map(x => puzzleIsSlot(x) ? pz.pieces[order[n++]] : x).join(""));
}
function puzzleBuild(item) {
  if (!item || typeof item.text !== "string" || !item.full || !Array.isArray(item.choices)) return null;
  const parts = item.text.split(PUZZLE_SLOT_SPLIT);
  const slotParts = [];
  parts.forEach((x, k) => { if (puzzleIsSlot(x)) slotParts.push(k); });
  if (slotParts.length < 2 || slotParts.length !== item.choices.length) return null;
  const pz = { parts, slotParts, pieces: item.choices.slice(), full: item.full, explanation: item.explanation || "",
    starSlot: slotParts.findIndex(k => parts[k] !== "＿＿＿") };
  const pre = puzzleNorm(parts.slice(0, slotParts[0]).join(""));
  const post = puzzleNorm(parts.slice(slotParts[slotParts.length - 1] + 1).join(""));
  const target = puzzleNorm(item.full);
  const cands = [];
  puzzlePerms(pz.pieces.map((_, i) => i)).forEach(order => {
    const line = puzzleLineFor(pz, order);
    if (!line) return;
    let best = -1, pos = -1;
    while ((pos = target.indexOf(line, pos + 1)) >= 0) {
      const sc = puzzleCommonSuffix(pre, target.slice(0, pos)) + puzzleCommonPrefix(post, target.slice(pos + line.length));
      if (sc > best) best = sc;
    }
    if (best >= 0) cands.push({ order, line, sc: best });
  });
  if (!cands.length) return null;
  const top = Math.max(...cands.map(c => c.sc));
  const winners = cands.filter(c => c.sc === top);
  if (new Set(winners.map(c => c.line)).size !== 1) return null; // ambigu: lebih dari satu susunan berbeda
  pz.order = winners[0].order;
  pz.line = winners[0].line;
  return pz;
}
const SK_ROUND_SIZE = 8;          // jumlah soal per ronde
const SK_LIVES = 3;               // nyawa per ronde
const SK_HINTS = 3;               // petunjuk per ronde
const SK_TIME_BONUS_SECS = 20;    // makin cepat menjawab, makin besar bonus waktu (tidak ada hukuman bila lambat)
const SK_BEST_KEY = "nihongo-michi-susun-kata-best";
const SK_MUTE_KEY = "nihongo-michi-susun-kata-mute";
const SK_LEVELS = [
  { id: "n5", label: "N5", color: "sakura" }, { id: "n4", label: "N4", color: "sora" }, { id: "n3", label: "N3", color: "matcha" },
  { id: "n2", label: "N2", color: "yuzu" }, { id: "n1", label: "N1", color: "momiji" }, { id: "all", label: "Campur", color: "momiji" },
];
const SK_POOL_CACHE = {};
// Kumpulan puzzle unik untuk satu level (paket soal beda tahun bisa memuat soal yang sama persis, jadi dibuang duplikatnya).
function skPool(levelId) {
  if (SK_POOL_CACHE[levelId]) return SK_POOL_CACHE[levelId];
  const ids = levelId === "all" ? ["n5", "n4", "n3", "n2", "n1"] : [levelId];
  const seen = {}, out = [];
  ids.forEach(lv => {
    const byLevel = JLPT_EXAM_CONTENT[lv] || {};
    Object.keys(byLevel).sort((a, b) => Number(a) - Number(b)).forEach(yearKey => {
      const m2 = ((byLevel[yearKey] || {}).bunpou_dokkai || {}).mondai2;
      ((m2 && m2.items) || []).forEach(it => {
        const pz = puzzleBuild(it);
        if (!pz) return;
        const key = pz.parts.map(x => puzzleIsSlot(x) ? "＿" : x).join("") + "|" + pz.pieces.slice().sort().join(",");
        if (seen[key]) return;
        seen[key] = true;
        out.push(pz);
      });
    });
  });
  SK_POOL_CACHE[levelId] = out;
  return out;
}
function skPickRound(levelId) { return shuffleArr(skPool(levelId)).slice(0, SK_ROUND_SIZE); }
function skShuffledBank(pz) {
  const idxs = pz.pieces.map((_, i) => i);
  const solved = pz.order.map(i => pz.pieces[i]).join("|");
  let order = shuffleArr(idxs);
  for (let t = 0; t < 12 && order.map(i => pz.pieces[i]).join("|") === solved; t++) order = shuffleArr(idxs);
  return order;
}
function skFmt(n) { return String(n).replace(/\B(?=(\d{3})+(?!\d))/g, "."); }
function skLoad(key, fallback) { try { const raw = localStorage.getItem(key); return raw ? JSON.parse(raw) : fallback; } catch (e) { return fallback; } }
function skSave(key, val) { try { localStorage.setItem(key, JSON.stringify(val)); } catch (e) { /* diabaikan */ } }
// Efek suara sederhana (WebAudio, tanpa file audio). Semua dibungkus try/catch supaya tidak pernah mengganggu permainan.
let SK_AUDIO = null;
function skAudio() {
  try {
    if (!SK_AUDIO) { const AC = window.AudioContext || window.webkitAudioContext; if (!AC) return null; SK_AUDIO = new AC(); }
    if (SK_AUDIO.state === "suspended" && SK_AUDIO.resume) SK_AUDIO.resume();
    return SK_AUDIO;
  } catch (e) { return null; }
}
function skTone(freq, delay, dur, type, vol) {
  try {
    const ac = skAudio(); if (!ac) return;
    const t0 = ac.currentTime + delay;
    const osc = ac.createOscillator(), gain = ac.createGain();
    osc.type = type || "sine"; osc.frequency.value = freq;
    gain.gain.setValueAtTime(0.0001, t0);
    gain.gain.exponentialRampToValueAtTime(vol || 0.08, t0 + 0.01);
    gain.gain.exponentialRampToValueAtTime(0.0001, t0 + dur);
    osc.connect(gain); gain.connect(ac.destination);
    osc.start(t0); osc.stop(t0 + dur + 0.02);
  } catch (e) { /* diabaikan */ }
}
function skSfx(kind) {
  if (kind === "place") skTone(560, 0, 0.06, "triangle", 0.06);
  else if (kind === "remove") skTone(400, 0, 0.06, "triangle", 0.05);
  else if (kind === "hint") { skTone(660, 0, 0.1, "sine", 0.07); skTone(880, 0.09, 0.14, "sine", 0.07); }
  else if (kind === "correct") { skTone(523, 0, 0.12, "triangle", 0.09); skTone(659, 0.1, 0.12, "triangle", 0.09); skTone(784, 0.2, 0.22, "triangle", 0.09); }
  else if (kind === "wrong") { skTone(220, 0, 0.18, "sawtooth", 0.06); skTone(165, 0.16, 0.26, "sawtooth", 0.06); }
  else if (kind === "win") { [523, 659, 784, 1047].forEach((f, i) => skTone(f, i * 0.12, 0.2, "triangle", 0.09)); }
  else if (kind === "lose") { [392, 330, 262].forEach((f, i) => skTone(f, i * 0.16, 0.24, "sine", 0.08)); }
}
function skVibrate(pattern) { try { if (navigator.vibrate) navigator.vibrate(pattern); } catch (e) { /* diabaikan */ } }

const SK_CSS = `
.sk-root { -webkit-user-select: none; user-select: none; -webkit-touch-callout: none; }
.sk-slot { display: inline-block; min-width: 60px; min-height: 38px; margin: 0 4px; padding: 2px 10px; vertical-align: middle; border-radius: 10px; font: inherit; font-weight: 700;
  line-height: 1.6; color: var(--ink); border: 2px dashed var(--line); background: transparent; transition: border-color .15s, background .15s, transform .15s; }
.sk-slot-filled { border-style: solid; border-color: var(--momiji); background: var(--card-bg); touch-action: none; cursor: grab; box-shadow: var(--shadow-xs); }
.sk-slot-hint { border-color: var(--yuzu); background: var(--yuzu-tint); cursor: default; }
.sk-slot-over { border-color: var(--momiji) !important; background: var(--momiji-tint) !important; transform: scale(1.07); }
.sk-slot-ok { border-color: var(--matcha) !important; background: var(--matcha-tint) !important; cursor: default; }
.sk-slot-bad { border-color: var(--sakura) !important; background: var(--sakura-tint) !important; cursor: default; }
.sk-chip { padding: 9px 15px; border-radius: 12px; font: inherit; font-size: 16px; font-weight: 700; color: var(--ink); background: var(--card-bg);
  border: 2px solid var(--line); border-bottom-width: 4px; box-shadow: var(--shadow-sm); touch-action: none; cursor: grab; transition: transform .12s, opacity .2s, box-shadow .12s; }
.sk-chip:not(:disabled):active { transform: scale(.94); }
.sk-chip:disabled { opacity: .25; box-shadow: none; cursor: default; touch-action: auto; }
.sk-ghost { position: fixed; z-index: 9999; pointer-events: none; padding: 9px 15px; border-radius: 12px; font-weight: 700; font-size: 16px; color: var(--ink);
  background: var(--card-bg); border: 2px solid var(--momiji); box-shadow: var(--shadow-lg); transform: translate(-50%, -50%) scale(1.1) rotate(-4deg); }
.sk-level { cursor: pointer; text-align: center; padding: 12px 6px; border-radius: 14px; border: 2px solid var(--line); background: var(--card-bg); color: var(--ink); font: inherit; box-shadow: var(--shadow-xs); transition: transform .12s, border-color .15s, background .15s; }
.sk-level:active { transform: scale(.96); }
.sk-level-on { border-color: var(--momiji); background: var(--momiji-tint); box-shadow: var(--shadow-sm); }
.sk-dot { width: 100%; height: 8px; border-radius: 6px; background: var(--line); transition: background .25s; }
.sk-float { position: absolute; left: 50%; top: 38%; z-index: 20; pointer-events: none; font-weight: 800; font-size: 22px; transform: translateX(-50%); text-shadow: 0 2px 6px rgba(0,0,0,.18); }
.sk-confetti { position: absolute; left: 50%; top: 40%; z-index: 19; pointer-events: none; font-size: 18px; }
@media (prefers-reduced-motion: no-preference) {
  .sk-pop { animation: sk-pop .28s cubic-bezier(.34, 1.56, .64, 1); }
  .sk-shake { animation: sk-shake .45s; }
  .sk-ready { animation: sk-glow 1.2s ease-in-out infinite; }
  .sk-float { animation: sk-float 1.1s ease-out forwards; }
  .sk-confetti { animation: sk-burst .95s ease-out forwards; }
  .sk-star { animation: sk-star .55s cubic-bezier(.34, 1.56, .64, 1) both; }
  .sk-fade { animation: sk-fade .28s ease-out; }
  .sk-heart-lost { animation: sk-heart .5s ease-out; }
  .sk-bounce { animation: sk-bounce 1.6s ease-in-out infinite; }
}
@keyframes sk-pop { 0% { transform: scale(.7); } 100% { transform: scale(1); } }
@keyframes sk-shake { 0%, 100% { transform: translateX(0); } 20% { transform: translateX(-9px); } 40% { transform: translateX(8px); } 60% { transform: translateX(-6px); } 80% { transform: translateX(4px); } }
@keyframes sk-glow { 0%, 100% { box-shadow: 0 0 0 0 rgba(255, 122, 69, .55); } 50% { box-shadow: 0 0 0 9px rgba(255, 122, 69, 0); } }
@keyframes sk-float { 0% { opacity: 0; transform: translate(-50%, 10px) scale(.7); } 15% { opacity: 1; transform: translate(-50%, 0) scale(1.15); } 100% { opacity: 0; transform: translate(-50%, -70px) scale(1); } }
@keyframes sk-burst { 0% { opacity: 1; transform: translate(0, 0) scale(.6) rotate(0); } 100% { opacity: 0; transform: translate(var(--dx), var(--dy)) scale(1.1) rotate(var(--rot)); } }
@keyframes sk-star { 0% { opacity: 0; transform: scale(0) rotate(-40deg); } 100% { opacity: 1; transform: scale(1) rotate(0); } }
@keyframes sk-fade { 0% { opacity: 0; transform: translateY(8px); } 100% { opacity: 1; transform: translateY(0); } }
@keyframes sk-heart { 0% { transform: scale(1.5); } 100% { transform: scale(1); } }
@keyframes sk-bounce { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-6px); } }
`;

function SusunKataGame({ onExit }) {
  const [phase, setPhase] = useState("lobby");        // lobby | play | result
  const [levelId, setLevelId] = useState("n5");
  const [round, setRound] = useState([]);
  const [idx, setIdx] = useState(0);
  const [bank, setBank] = useState([]);               // urutan tampil potongan kata
  const [slots, setSlots] = useState([]);             // isi tiap kotak: indeks potongan atau null
  const [locked, setLocked] = useState([]);           // kotak yang diisi lewat petunjuk (tidak bisa dilepas)
  const [status, setStatus] = useState("playing");    // playing | correct | wrong
  const [lives, setLives] = useState(SK_LIVES);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [bestStreak, setBestStreak] = useState(0);
  const [hintsLeft, setHintsLeft] = useState(SK_HINTS);
  const [hintsThisPuzzle, setHintsThisPuzzle] = useState(0);
  const [results, setResults] = useState([]);
  const [gain, setGain] = useState(0);
  const [gainParts, setGainParts] = useState(null);
  const [elapsed, setElapsed] = useState(0);
  const [muted, setMuted] = useState(() => !!skLoad(SK_MUTE_KEY, false));
  const [best, setBest] = useState(() => skLoad(SK_BEST_KEY, {}));
  const [newRecord, setNewRecord] = useState(false);
  const [lifeBonus, setLifeBonus] = useState(0);
  const [floats, setFloats] = useState([]);
  const [burst, setBurst] = useState(0);
  const [shake, setShake] = useState(0);
  const [dragOver, setDragOver] = useState(null);
  const [justPlaced, setJustPlaced] = useState(null);
  const startRef = React.useRef(0);
  const dragRef = React.useRef(null);
  const suppressClickRef = React.useRef(false);
  const slotsRef = React.useRef([]);
  const lockedRef = React.useRef([]);
  const statusRef = React.useRef("playing");
  slotsRef.current = slots; lockedRef.current = locked; statusRef.current = status;

  const pz = round[idx];
  const sfx = (kind) => { if (!muted) skSfx(kind); };
  const toggleMute = () => { const next = !muted; setMuted(next); skSave(SK_MUTE_KEY, next); if (!next) skSfx("place"); };

  const loadPuzzle = (p) => {
    setBank(skShuffledBank(p));
    setSlots(p.pieces.map(() => null));
    setLocked(p.pieces.map(() => false));
    setStatus("playing");
    setHintsThisPuzzle(0);
    setGain(0); setGainParts(null);
    setElapsed(0);
    setJustPlaced(null);
    startRef.current = Date.now();
  };
  const startRound = (lv) => {
    const list = skPickRound(lv);
    if (!list.length) return;
    setLevelId(lv); setRound(list); setIdx(0);
    setScore(0); setStreak(0); setBestStreak(0); setLives(SK_LIVES); setHintsLeft(SK_HINTS);
    setResults([]); setNewRecord(false); setLifeBonus(0); setFloats([]);
    setPhase("play");
    loadPuzzle(list[0]);
  };

  // Bar bonus waktu: hanya berjalan saat soal sedang dikerjakan.
  useEffect(() => {
    if (phase !== "play" || status !== "playing") return undefined;
    const t = setInterval(() => setElapsed(Math.min(SK_TIME_BONUS_SECS, (Date.now() - startRef.current) / 1000)), 250);
    return () => clearInterval(t);
  }, [phase, status, idx]);
  // Bersihkan sisa seret-lepas bila komponen ditutup di tengah jalan.
  useEffect(() => () => { if (dragRef.current && dragRef.current.cleanup) dragRef.current.cleanup(); }, []);

  const addFloat = (text, color) => {
    const id = Date.now() + Math.random();
    setFloats(prev => [...prev, { id, text, color }]);
    setTimeout(() => setFloats(prev => prev.filter(f => f.id !== id)), 1200);
  };

  // ----- mengisi / melepas kotak -----
  const placeFirstEmpty = (pieceIdx) => {
    if (statusRef.current !== "playing" || suppressClickRef.current) return;
    const cur = slotsRef.current;
    if (cur.includes(pieceIdx)) return;
    const at = cur.indexOf(null);
    if (at < 0) return;
    const next = cur.slice(); next[at] = pieceIdx;
    setSlots(next); setJustPlaced(at); sfx("place");
  };
  const removeSlot = (n) => {
    if (statusRef.current !== "playing" || suppressClickRef.current) return;
    if (lockedRef.current[n] || slotsRef.current[n] === null || slotsRef.current[n] === undefined) return;
    const next = slotsRef.current.slice(); next[n] = null;
    setSlots(next); sfx("remove");
  };
  const dropOnSlot = (pieceIdx, fromSlot, n) => {
    const cur = slotsRef.current.slice(); const lk = lockedRef.current;
    if (lk[n]) return;
    if (fromSlot !== null && fromSlot !== undefined) {
      if (lk[fromSlot] || fromSlot === n) return;
      const prevInTarget = cur[n];
      cur[n] = pieceIdx; cur[fromSlot] = prevInTarget; // tukar isi dua kotak
    } else {
      cur[n] = pieceIdx; // isi lama di kotak itu (bila ada) otomatis kembali ke daftar potongan
    }
    setSlots(cur); setJustPlaced(n); sfx("place");
  };
  const dropOnBank = (fromSlot) => {
    if (fromSlot === null || fromSlot === undefined || lockedRef.current[fromSlot]) return;
    const next = slotsRef.current.slice(); next[fromSlot] = null;
    setSlots(next); sfx("remove");
  };
  const resetSlots = () => {
    if (statusRef.current !== "playing") return;
    setSlots(prev => prev.map((v, k) => (lockedRef.current[k] ? v : null)));
  };

  // ----- seret & lepas (pointer events; ketuk biasa tetap berfungsi lewat onClick) -----
  const onDragStart = (e, pieceIdx, fromSlot) => {
    if (statusRef.current !== "playing") return;
    if (typeof e.button === "number" && e.button !== 0) return;
    if (fromSlot !== null && lockedRef.current[fromSlot]) return;
    if (dragRef.current && dragRef.current.cleanup) dragRef.current.cleanup();
    const text = pz.pieces[pieceIdx];
    const st = { x0: e.clientX, y0: e.clientY, moved: false, ghost: null };
    const hitSlot = (x, y) => {
      const el = document.elementFromPoint ? document.elementFromPoint(x, y) : null;
      return el && el.closest ? el : null;
    };
    const move = (ev) => {
      if (!st.moved && Math.hypot(ev.clientX - st.x0, ev.clientY - st.y0) > 8) {
        st.moved = true;
        const g = document.createElement("div");
        g.className = "sk-ghost"; g.textContent = text;
        document.body.appendChild(g); st.ghost = g;
      }
      if (!st.moved) return;
      if (st.ghost) { st.ghost.style.left = ev.clientX + "px"; st.ghost.style.top = ev.clientY + "px"; }
      const el = hitSlot(ev.clientX, ev.clientY);
      const slotEl = el ? el.closest("[data-slot]") : null;
      setDragOver(slotEl ? Number(slotEl.getAttribute("data-slot")) : null);
    };
    const finish = (ev, cancelled) => {
      st.cleanup();
      if (!st.moved) return;
      suppressClickRef.current = true;
      setTimeout(() => { suppressClickRef.current = false; }, 80);
      if (cancelled) return;
      const el = hitSlot(ev.clientX, ev.clientY);
      const slotEl = el ? el.closest("[data-slot]") : null;
      if (slotEl) dropOnSlot(pieceIdx, fromSlot, Number(slotEl.getAttribute("data-slot")));
      else if (el && el.closest("[data-bank]")) dropOnBank(fromSlot);
    };
    const up = (ev) => finish(ev, false);
    const cancel = (ev) => finish(ev, true);
    st.cleanup = () => {
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerup", up);
      window.removeEventListener("pointercancel", cancel);
      if (st.ghost && st.ghost.parentNode) st.ghost.parentNode.removeChild(st.ghost);
      st.ghost = null; setDragOver(null);
      if (dragRef.current === st) dragRef.current = null;
    };
    window.addEventListener("pointermove", move);
    window.addEventListener("pointerup", up);
    window.addEventListener("pointercancel", cancel);
    dragRef.current = st;
  };

  // ----- petunjuk: isi kotak pertama yang masih kosong / salah dengan potongan yang benar -----
  const useHint = () => {
    if (statusRef.current !== "playing" || hintsLeft <= 0 || !pz) return;
    const cur = slotsRef.current.slice(); const lk = lockedRef.current.slice();
    const n = pz.order.findIndex((pi, k) => !(cur[k] !== null && cur[k] !== undefined && pz.pieces[cur[k]] === pz.pieces[pi]));
    if (n < 0) return;
    const want = pz.pieces[pz.order[n]];
    let pick = pz.pieces.findIndex((t, i) => t === want && !cur.includes(i));
    let fromSlot = -1;
    if (pick < 0) {
      fromSlot = cur.findIndex((v, k) => v !== null && v !== undefined && pz.pieces[v] === want && !lk[k] && k !== n);
      pick = fromSlot >= 0 ? cur[fromSlot] : -1;
    }
    if (pick < 0) return;
    const occupant = cur[n];
    cur[n] = pick; if (fromSlot >= 0) cur[fromSlot] = occupant;
    lk[n] = true;
    setSlots(cur); setLocked(lk); setJustPlaced(n);
    setHintsLeft(h => h - 1); setHintsThisPuzzle(h => h + 1);
    sfx("hint");
  };

  // ----- periksa jawaban -----
  const checkAnswer = () => {
    if (statusRef.current !== "playing" || !pz || slots.some(v => v === null || v === undefined)) return;
    const correct = puzzleLineFor(pz, slots) === pz.line;
    const placed = slots.map(i => pz.pieces[i]);
    let g = 0;
    if (correct) {
      const newStreak = streak + 1;
      const base = Math.max(20, 100 - 30 * hintsThisPuzzle);
      const secs = (Date.now() - startRef.current) / 1000;
      const timeBonus = hintsThisPuzzle > 0 ? 0 : Math.round(50 * Math.max(0, 1 - secs / SK_TIME_BONUS_SECS));
      const streakBonus = Math.min(newStreak - 1, 5) * 10;
      g = base + timeBonus + streakBonus;
      setScore(s => s + g); setGain(g); setGainParts({ base, timeBonus, streakBonus });
      setStreak(newStreak); setBestStreak(b => Math.max(b, newStreak));
      setStatus("correct"); setBurst(b => b + 1);
      addFloat("+" + g, "var(--matcha)");
      sfx("correct"); skVibrate(30);
    } else {
      setLives(l => l - 1); setStreak(0); setStatus("wrong"); setShake(s => s + 1);
      addFloat("💔", "var(--sakura)");
      sfx("wrong"); skVibrate([60, 40, 60]);
    }
    setResults(prev => { const next = prev.slice(); next[idx] = { correct, placed, gain: g, hinted: hintsThisPuzzle > 0 }; return next; });
  };

  const finishRound = () => {
    const completed = lives > 0;
    const correctCount = results.filter(r => r && r.correct).length;
    const bonus = completed ? lives * 50 : 0;
    const finalScore = score + bonus;
    setLifeBonus(bonus); setScore(finalScore);
    const prevBest = best[levelId];
    const isNew = finalScore > ((prevBest && prevBest.score) || 0);
    if (isNew) {
      const nb = Object.assign({}, best); nb[levelId] = { score: finalScore, correct: correctCount, total: round.length };
      setBest(nb); skSave(SK_BEST_KEY, nb);
    }
    setNewRecord(isNew && finalScore > 0);
    setPhase("result");
    sfx(completed ? "win" : "lose");
    if (completed) setBurst(b => b + 1);
  };
  const nextStep = () => {
    if (lives <= 0 || idx + 1 >= round.length) { finishRound(); return; }
    setIdx(idx + 1);
    loadPuzzle(round[idx + 1]);
  };

  const confetti = React.useMemo(() => Array.from({ length: 18 }, (_, i) => {
    const ang = (Math.PI * 2 * i) / 18 + Math.random() * 0.4;
    const dist = 70 + Math.random() * 90;
    return { dx: Math.round(Math.cos(ang) * dist) + "px", dy: Math.round(Math.sin(ang) * dist - 30) + "px", rot: Math.round(Math.random() * 360 - 180) + "deg", e: ["🌸", "✨", "⭐", "🎉", "🍃"][i % 5] };
  }), [burst]);
  const renderBurst = () => burst > 0 ? (
    <div key={"burst" + burst} aria-hidden="true" style={{ position: "absolute", inset: 0, overflow: "hidden", pointerEvents: "none" }}>
      {confetti.map((c, i) => <span key={i} className="sk-confetti" style={{ "--dx": c.dx, "--dy": c.dy, "--rot": c.rot }}>{c.e}</span>)}
    </div>
  ) : null;
  const renderFloats = () => floats.map(f => <div key={f.id} className="sk-float" style={{ color: f.color }} aria-hidden="true">{f.text}</div>);
  const soundBtn = (
    <button type="button" onClick={toggleMute} className="nm-btn nm-btn-ghost sk-sound" aria-label={muted ? "Nyalakan suara" : "Matikan suara"} aria-pressed={muted} style={{ padding: "4px 8px", fontSize: 16 }}>
      {muted ? "🔇" : "🔊"}
    </button>
  );

  // ================= LOBI =================
  if (phase === "lobby") {
    const poolSize = skPool(levelId).length;
    const bestHere = best[levelId];
    return (
      <div className="sk-root" style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        <style>{SK_CSS}</style>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <button onClick={onExit} className="nm-btn nm-btn-ghost">
            <ChevronRight size={14} style={{ transform: "rotate(180deg)" }} aria-hidden="true" /> Ganti jenis latihan
          </button>
          {soundBtn}
        </div>
        <div className="nm-card" style={{ textAlign: "center" }}>
          <Tape color="var(--momiji)" />
          <div className="sk-bounce" style={{ fontSize: 40, lineHeight: 1.2 }} aria-hidden="true">🌸</div>
          <p className="nm-title" style={{ fontSize: 22, margin: "2px 0 2px" }}>Susun Kata</p>
          <p style={{ fontSize: 12, color: "var(--text-secondary)", margin: "0 0 12px" }}>並べ替え · Susun potongan kata jadi kalimat yang benar</p>
          <p style={{ fontSize: 12, fontWeight: 700, color: "var(--text-secondary)", margin: "0 0 6px", textAlign: "left" }}>Pilih level:</p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, minmax(0, 1fr))", gap: 8, marginBottom: 12 }}>
            {SK_LEVELS.map(lv => {
              const n = skPool(lv.id).length; const b = best[lv.id];
              return (
                <button key={lv.id} type="button" data-level={lv.id} onClick={() => setLevelId(lv.id)}
                  className={"sk-level" + (levelId === lv.id ? " sk-level-on" : "")} aria-pressed={levelId === lv.id}>
                  <div className="nm-title" style={{ fontSize: 17 }}>{lv.label}</div>
                  <div style={{ fontSize: 10.5, color: "var(--text-secondary)" }}>{n} soal</div>
                  <div style={{ fontSize: 10.5, color: b ? "var(--momiji)" : "var(--text-muted)", fontWeight: 700, minHeight: 15 }}>{b ? "🏆 " + skFmt(b.score) : "—"}</div>
                </button>
              );
            })}
          </div>
          <div style={{ textAlign: "left", background: "var(--paper)", border: "2px solid var(--line)", borderRadius: 14, padding: "10px 12px", marginBottom: 14, fontSize: 12.5, lineHeight: 1.75, color: "var(--text-body)" }}>
            <div>👆 Ketuk atau <b>seret</b> potongan kata ke kotak yang kosong.</div>
            <div>❤️ Kamu punya <b>{SK_LIVES} nyawa</b>. Jawaban salah mengurangi 1 nyawa.</div>
            <div>⚡ Makin <b>cepat</b> dan <b>beruntun</b> benar, makin besar poinnya.</div>
            <div>💡 Ada <b>{SK_HINTS} petunjuk</b> per ronde (poin soal itu berkurang).</div>
          </div>
          <button type="button" onClick={() => startRound(levelId)} disabled={poolSize === 0} className="nm-btn nm-btn-primary sk-ready" style={{ fontSize: 15, padding: "12px 30px" }}>
            ▶ Mulai Main
          </button>
          <p style={{ fontSize: 11, color: "var(--text-secondary)", margin: "10px 0 0" }}>
            {Math.min(SK_ROUND_SIZE, poolSize)} soal acak per ronde{bestHere ? ` · skor terbaikmu ${skFmt(bestHere.score)}` : ""}
          </p>
        </div>
      </div>
    );
  }

  // ================= HASIL =================
  if (phase === "result") {
    const correctCount = results.filter(r => r && r.correct).length;
    const ratio = round.length ? correctCount / round.length : 0;
    const stars = ratio >= 0.9 ? 3 : ratio >= 0.6 ? 2 : ratio >= 0.3 ? 1 : 0;
    const completed = lives > 0;
    const lvLabel = (SK_LEVELS.find(l => l.id === levelId) || {}).label;
    return (
      <div className="sk-root" style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        <style>{SK_CSS}</style>
        <div className="nm-card sk-fade" style={{ position: "relative", textAlign: "center", overflow: "hidden" }}>
          <Tape color="var(--momiji)" />
          {renderBurst()}
          <p style={{ fontSize: 12, fontWeight: 700, color: "var(--text-secondary)", margin: "0 0 4px" }}>Susun Kata · {lvLabel}</p>
          <p className="nm-title" style={{ fontSize: 22, margin: "0 0 8px" }}>{completed ? "🎉 Ronde selesai!" : "💔 Nyawa habis"}</p>
          <div className="sk-stars" style={{ fontSize: 36, letterSpacing: 4, margin: "0 0 6px" }} aria-label={`${stars} dari 3 bintang`}>
            {[0, 1, 2].map(i => <span key={i} className={i < stars ? "sk-star" : ""} style={{ display: "inline-block", animationDelay: (i * 0.18) + "s", opacity: i < stars ? 1 : 0.25, filter: i < stars ? "none" : "grayscale(1)" }}>⭐</span>)}
          </div>
          <p className="nm-title sk-final-score" style={{ fontSize: 34, margin: "4px 0 2px", color: "var(--momiji)" }}>{skFmt(score)}</p>
          <p style={{ fontSize: 11.5, color: "var(--text-secondary)", margin: "0 0 8px" }}>poin</p>
          {newRecord && <p className="sk-pop" style={{ display: "inline-block", fontSize: 12.5, fontWeight: 800, color: "var(--momiji)", background: "var(--momiji-tint)", borderRadius: 10, padding: "4px 12px", margin: "0 0 10px" }}>🏆 Rekor baru!</p>}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, minmax(0, 1fr))", gap: 8, margin: "6px 0 14px" }}>
            {[["Benar", `${correctCount}/${round.length}`], ["Combo terbaik", `🔥 ${bestStreak}`], ["Bonus nyawa", completed ? `+${lifeBonus}` : "0"]].map(([k, v]) => (
              <div key={k} style={{ background: "var(--paper)", border: "2px solid var(--line)", borderRadius: 12, padding: "8px 4px" }}>
                <p style={{ fontSize: 10.5, color: "var(--text-secondary)", margin: "0 0 2px", fontWeight: 700 }}>{k}</p>
                <p style={{ fontSize: 15, fontWeight: 800, margin: 0 }}>{v}</p>
              </div>
            ))}
          </div>
          <div style={{ display: "flex", gap: 8, justifyContent: "center", flexWrap: "wrap" }}>
            <button type="button" onClick={() => startRound(levelId)} className="nm-btn nm-btn-primary">🔁 Main lagi</button>
            <button type="button" onClick={() => setPhase("lobby")} className="nm-btn nm-btn-secondary">Ganti level</button>
            <button type="button" onClick={onExit} className="nm-btn nm-btn-ghost">Keluar</button>
          </div>
        </div>
        <div className="nm-card">
          <p style={{ fontSize: 13, fontWeight: 700, margin: "0 0 10px" }}>Ulasan soal</p>
          {round.map((item, qi) => {
            const r = results[qi];
            if (!r) return null;
            return (
              <div key={qi} className="sk-review" style={{ borderRadius: 14, border: `2px solid ${r.correct ? "var(--matcha)" : "var(--sakura)"}`, background: r.correct ? "var(--matcha-tint)" : "var(--sakura-tint)", padding: "10px 12px", marginBottom: 10 }}>
                <p style={{ fontSize: 12, fontWeight: 700, margin: "0 0 6px", color: "var(--text-secondary)" }}>{r.correct ? "✓" : "✕"} Soal {qi + 1}{r.correct ? ` · +${r.gain}` : ""}{r.hinted ? " · 💡" : ""}</p>
                {!r.correct && <p style={{ fontSize: 12.5, margin: "0 0 3px" }}>Susunanmu: <b style={{ color: "var(--sakura)" }}>{r.placed.join(" → ")}</b></p>}
                <p style={{ fontSize: 12.5, margin: "0 0 3px" }}>Susunan benar: <b style={{ color: "var(--matcha)" }}>{item.order.map(i => item.pieces[i]).join(" → ")}</b></p>
                <p style={{ fontSize: 13, margin: "4px 0 0", lineHeight: 1.8 }}>{item.full}</p>
                {item.explanation && <p style={{ fontSize: 12, color: "var(--text-body)", margin: "6px 0 0", lineHeight: 1.6 }}>💡 {item.explanation}</p>}
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  // ================= PERMAINAN =================
  if (!pz) return null;
  const allFilled = slots.length > 0 && slots.every(v => v !== null && v !== undefined);
  const isCorrect = status === "correct";
  const slotNoByPart = {};
  pz.slotParts.forEach((partIdx, n) => { slotNoByPart[partIdx] = n; });
  const timeLeftPct = Math.max(0, (1 - elapsed / SK_TIME_BONUS_SECS) * 100);
  const timeColor = timeLeftPct > 50 ? "var(--matcha)" : timeLeftPct > 25 ? "var(--yuzu)" : "var(--sakura)";
  const lastOne = lives <= 0 || idx + 1 >= round.length;
  return (
    <div className="sk-root" style={{ display: "flex", flexDirection: "column", gap: 10 }}>
      <style>{SK_CSS}</style>
      <div className="nm-card" style={{ position: "relative", overflow: "hidden" }}>
        <Tape color="var(--momiji)" />
        {renderBurst()}
        {renderFloats()}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 8, marginBottom: 8 }}>
          <button type="button" onClick={() => setPhase("lobby")} className="nm-btn nm-btn-ghost sk-exit" style={{ padding: "4px 8px", fontSize: 12 }}>✕ Keluar</button>
          <div className="sk-hearts" aria-label={`${lives} nyawa`} style={{ fontSize: 20, letterSpacing: 2 }}>
            {Array.from({ length: SK_LIVES }, (_, i) => <span key={i} className={i === lives && status === "wrong" ? "sk-heart-lost" : ""} style={{ opacity: i < lives ? 1 : 0.3, filter: i < lives ? "none" : "grayscale(1)", display: "inline-block" }}>{i < lives ? "❤️" : "🖤"}</span>)}
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
            <span className="sk-score nm-title" style={{ fontSize: 16, color: "var(--momiji)" }} aria-label={`Skor ${score}`}>⭐ {skFmt(score)}</span>
            {soundBtn}
          </div>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: `repeat(${round.length}, minmax(0, 1fr))`, gap: 4, marginBottom: 6 }} aria-label={`Soal ${idx + 1} dari ${round.length}`}>
          {round.map((_, i) => {
            const r = results[i];
            const bg = r ? (r.correct ? "var(--matcha)" : "var(--sakura)") : i === idx ? "var(--momiji)" : "var(--line)";
            return <div key={i} className="sk-dot" style={{ background: bg, opacity: !r && i !== idx ? 0.7 : 1 }} />;
          })}
        </div>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", margin: "0 0 8px" }}>
          <span className="nm-q-counter">Soal {idx + 1} dari {round.length}</span>
          {streak >= 2 && <span className="sk-combo sk-pop" key={"combo" + streak} style={{ fontSize: 12, fontWeight: 800, color: "var(--momiji)", background: "var(--momiji-tint)", borderRadius: 8, padding: "2px 8px" }}>🔥 Combo x{streak}</span>}
        </div>
        <div style={{ marginBottom: 12 }}>
          <div style={{ height: 6, borderRadius: 6, background: "var(--line)", overflow: "hidden" }}>
            <div className="sk-timebar" style={{ height: "100%", width: `${hintsThisPuzzle > 0 ? 0 : timeLeftPct}%`, background: timeColor, transition: "width .25s linear, background .3s" }} />
          </div>
          <p style={{ fontSize: 10.5, color: "var(--text-secondary)", margin: "3px 0 0" }}>{hintsThisPuzzle > 0 ? "⚡ Bonus waktu tidak berlaku (petunjuk dipakai)" : "⚡ Bonus waktu — jawab secepatnya!"}</p>
        </div>
        <div key={"frame" + shake + "-" + idx} className={"sk-frame" + (status === "wrong" ? " sk-shake" : "") + (isCorrect ? " sk-pop" : "")}
          style={{ background: "var(--matcha-tint)", borderRadius: 12, padding: "10px 12px", marginBottom: 12, fontSize: 16, lineHeight: 2.7, whiteSpace: "pre-line" }}>
          {pz.parts.map((seg, k) => {
            if (!puzzleIsSlot(seg)) return <span key={k}>{seg}</span>;
            const n = slotNoByPart[k];
            const filledIdx = slots[n];
            const filled = filledIdx !== null && filledIdx !== undefined;
            const checked = status !== "playing";
            const ok = checked && filled && (isCorrect || pz.pieces[filledIdx] === pz.pieces[pz.order[n]]);
            const bad = checked && filled && !ok;
            const cls = "sk-slot" + (filled ? " sk-slot-filled" : "") + (locked[n] && !checked ? " sk-slot-hint" : "") + (dragOver === n ? " sk-slot-over" : "")
              + (ok ? " sk-slot-ok" : "") + (bad ? " sk-slot-bad" : "") + (justPlaced === n && filled && !checked ? " sk-pop" : "");
            return (
              <button key={k} type="button" className={cls} data-slot={n}
                onPointerDown={filled && !checked && !locked[n] ? (e) => onDragStart(e, filledIdx, n) : undefined}
                onClick={() => removeSlot(n)}
                aria-label={`Kotak ${n + 1}${n === pz.starSlot ? " (★)" : ""}${filled ? `, berisi ${pz.pieces[filledIdx]}${locked[n] ? " (petunjuk)" : ", ketuk untuk melepas"}` : ", kosong"}`}>
                {filled ? pz.pieces[filledIdx] : <span style={{ color: n === pz.starSlot ? "var(--momiji)" : "var(--text-muted)", fontWeight: 700 }}>{n === pz.starSlot ? "★" : n + 1}</span>}
              </button>
            );
          })}
        </div>
        <p style={{ fontSize: 11.5, fontWeight: 700, color: "var(--text-secondary)", margin: "0 0 6px" }}>Potongan kata:</p>
        <div className="sk-bank" data-bank="1" style={{ display: "flex", flexWrap: "wrap", gap: 10, marginBottom: 14, minHeight: 50 }}>
          {bank.map(pieceIdx => {
            const used = slots.includes(pieceIdx);
            return (
              <button key={pieceIdx} type="button" className="sk-chip" disabled={used || status !== "playing"}
                onPointerDown={!used && status === "playing" ? (e) => onDragStart(e, pieceIdx, null) : undefined}
                onClick={() => placeFirstEmpty(pieceIdx)} aria-label={`Pilih potongan ${pz.pieces[pieceIdx]}`}>
                {pz.pieces[pieceIdx]}
              </button>
            );
          })}
        </div>
        {status === "playing" ? (
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap", alignItems: "center" }}>
            <button type="button" onClick={useHint} disabled={hintsLeft <= 0} className="nm-btn nm-btn-outline sk-hint" style={{ opacity: hintsLeft > 0 ? 1 : 0.5 }}>💡 Petunjuk ({hintsLeft})</button>
            <button type="button" onClick={resetSlots} className="nm-btn nm-btn-secondary">↺ Reset</button>
            <button type="button" onClick={checkAnswer} disabled={!allFilled} className={"nm-btn nm-btn-primary sk-check" + (allFilled ? " sk-ready" : "")}
              style={{ marginLeft: "auto", opacity: allFilled ? 1 : 0.5, cursor: allFilled ? "pointer" : "not-allowed" }}>
              <Check size={15} aria-hidden="true" /> Periksa
            </button>
          </div>
        ) : (
          <div className="sk-feedback sk-fade" role="status" aria-live="polite">
            <div style={{ borderRadius: 14, border: `2px solid ${isCorrect ? "var(--matcha)" : "var(--sakura)"}`, background: isCorrect ? "var(--matcha-tint)" : "var(--sakura-tint)", padding: "10px 12px", marginBottom: 12 }}>
              <p style={{ fontSize: 15, fontWeight: 800, margin: "0 0 4px", color: isCorrect ? "var(--matcha)" : "var(--sakura)" }}>
                {isCorrect ? `🎉 Benar! +${gain}` : "💔 Belum tepat"}
              </p>
              {isCorrect && gainParts && (
                <p style={{ fontSize: 11.5, color: "var(--text-secondary)", margin: "0 0 4px" }}>
                  Dasar {gainParts.base}{gainParts.timeBonus ? ` · ⚡ waktu +${gainParts.timeBonus}` : ""}{gainParts.streakBonus ? ` · 🔥 combo +${gainParts.streakBonus}` : ""}
                </p>
              )}
              {!isCorrect && <p style={{ fontSize: 12.5, margin: "0 0 3px" }}>Susunan benar: <b style={{ color: "var(--matcha)" }}>{pz.order.map(i => pz.pieces[i]).join(" → ")}</b></p>}
              <p style={{ fontSize: 13, margin: "4px 0 0", lineHeight: 1.8 }}>{pz.full}</p>
              {pz.explanation && <p style={{ fontSize: 12, color: "var(--text-body)", margin: "6px 0 0", lineHeight: 1.6 }}>💡 {pz.explanation}</p>}
            </div>
            <button type="button" onClick={nextStep} className="nm-btn nm-btn-primary sk-next">
              {lastOne ? <>Lihat hasil <ChevronRight size={14} aria-hidden="true" /></> : <>Lanjut <ChevronRight size={14} aria-hidden="true" /></>}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

function NihongoMichi() {
  const [darkMode, setDarkMode] = useState(false);
  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode);
  }, [darkMode]);
  const [tab, setTab] = useState("home");
  useEffect(() => {
    const scrollUp = () => {
      window.scrollTo(0, 0);
      if (document.scrollingElement) document.scrollingElement.scrollTop = 0;
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
    };
    scrollUp();
    const t = setTimeout(scrollUp, 50);
    return () => clearTimeout(t);
  }, [tab]);
  const [levelId, setLevelId] = useState("n5");
  const [checked, setChecked] = useState({});
  const [activityLog, setActivityLog] = useState({});
  const [calendarMonth, setCalendarMonth] = useState(() => { const d = new Date(); return { y: d.getFullYear(), m: d.getMonth() }; });
  const [selectedDate, setSelectedDate] = useState(null);
  const [weeklyGoals, setWeeklyGoals] = useState([]);
  const [weeklyHistory, setWeeklyHistory] = useState([]);
  const [historyWeekIdx, setHistoryWeekIdx] = useState(null);
  const [newGoalText, setNewGoalText] = useState("");
  const [latihanMode, setLatihanMode] = useState(null);
  const [ujianCategory, setUjianCategory] = useState(null);
  const [ujianLevel, setUjianLevel] = useState(null);
  const [ujianYear, setUjianYear] = useState(null);
  const [ujianSection, setUjianSection] = useState(null);
  const [ujianQuestions, setUjianQuestions] = useState([]);
  const [ujianIdx, setUjianIdx] = useState(0);
  const [ujianSel, setUjianSel] = useState(null);
  const [ujianScore, setUjianScore] = useState(0);
  const [ujianDone, setUjianDone] = useState(false);
  const [ujianAnswersMap, setUjianAnswersMap] = useState({});
  const [showUjianPembahasan, setShowUjianPembahasan] = useState(false);
  const [showUjianScript, setShowUjianScript] = useState(false);
  const [ujianSimMode, setUjianSimMode] = useState(false);
  const [ujianSimTimeLeft, setUjianSimTimeLeft] = useState(0);
  const [ujianSimResults, setUjianSimResults] = useState([]);
  const [ujianSimAllDone, setUjianSimAllDone] = useState(false);
  const UJIAN_SECTIONS = [
    { id: "mojigoi", label: "文字・語彙", desc: "もんだい1-4", count: 33, simMinutes: 20 },
    { id: "bunpou_dokkai", label: "文法・読解", desc: "もんだい1-6", count: 32, simMinutes: 40 },
    { id: "choukai", label: "聴解", desc: "もんだい1,3,4", count: 15, simMinutes: 20 },
  ];

  const normalizeUjianSection = (levelId, year, section) => {
    const data = (JLPT_EXAM_CONTENT[levelId] || {})[year];
    if (!data) return [];
    const sec = data[section];
    if (!sec) return [];
    const qs = [];
    if (section === "mojigoi") {
      ["mondai1", "mondai2", "mondai3", "mondai4", "mondai5", "mondai6"].forEach(mKey => {
        const m = sec[mKey];
        if (!m) return;
        // もんだい1/2/4: yang dijawab = kata bergaris bawah di kalimat (seperti di PDF), jadi teks perintah umum
        // ("＿＿＿の ことばは…") tidak ditampilkan. Sebagian level (N2) punya urutan もんだい yang berbeda,
        // jadi data bisa menyetel hideInstruction sendiri secara eksplisit; kalau tidak disetel, pakai aturan lama.
        const hideInstruction = m.hideInstruction !== undefined ? m.hideInstruction : (mKey === "mondai1" || mKey === "mondai2" || mKey === "mondai4");
        m.items.forEach(it => {
          qs.push({ mondai: m.title, desc: hideInstruction ? "" : m.desc, hideInstruction, passage: it.text, question: hideInstruction ? "" : m.desc, choices: it.choices, correct: it.choices[it.answer], image: it.image, explanation: it.explanation });
        });
      });
    } else if (section === "bunpou_dokkai") {
      const m1 = sec.mondai1;
      m1.items.forEach(it => qs.push({ mondai: m1.title, desc: m1.desc, passage: it.text, question: m1.desc, choices: it.choices, correct: it.choices[it.answer], explanation: it.explanation }));
      const m2 = sec.mondai2;
      m2.items.forEach(it => qs.push({ mondai: m2.title, desc: m2.desc, passage: it.text, question: m2.desc, choices: it.choices, correct: it.answer, explainExtra: it.full, explanation: it.explanation }));
      const m3 = sec.mondai3;
      m3.passages.forEach(p => {
        p.blanks.forEach(b => {
          qs.push({ mondai: m3.title, desc: `${p.title} — ブランク【${b.num}】`, passage: p.text, question: `【${b.num}】に 何を 入れますか。`, choices: b.choices, correct: b.choices[b.answer], explanation: b.explanation });
        });
      });
      const m4 = sec.mondai4;
      if (m4) {
        m4.items.forEach(it => qs.push({ mondai: m4.title, desc: m4.desc, passage: it.text, question: it.question, choices: it.choices, correct: it.choices[it.answer], image: it.image, explanation: it.explanation }));
      }
      const m5 = sec.mondai5;
      if (Array.isArray(m5.passages)) {
        m5.passages.forEach(p5 => p5.questions.forEach(q => qs.push({ mondai: m5.title, desc: m5.desc, passage: p5.text, question: q.q, choices: q.choices, correct: q.choices[q.answer], explanation: q.explanation })));
      } else {
        m5.questions.forEach(q => qs.push({ mondai: m5.title, desc: m5.desc, passage: m5.text, question: q.q, choices: q.choices, correct: q.choices[q.answer], explanation: q.explanation }));
      }
      ["mondai6", "mondai7", "mondai8", "mondai9"].forEach(m6Key => {
      const m6 = sec[m6Key];
      if (m6) {
        const m6passage = m6.info_text !== undefined || m6.info_table ? m6.info_text : m6.info;
        if (Array.isArray(m6.items)) {
          m6.items.forEach(it => qs.push({ mondai: m6.title, desc: m6.desc, passage: m6passage, table: m6.info_table, tableFooter: m6.info_footer, image: it.image || m6.info_image, question: it.question, choices: it.choices, correct: it.choices[it.answer], explanation: it.explanation }));
        } else {
          qs.push({ mondai: m6.title, desc: m6.desc, passage: m6passage, table: m6.info_table, tableFooter: m6.info_footer, image: m6.info_image, question: m6.question, choices: m6.choices, correct: m6.choices[m6.answer], explanation: m6.explanation });
        }
      }
      });
    } else if (section === "choukai") {
      ["mondai1", "mondai2", "mondai3", "mondai4", "mondai5"].forEach(mKey => {
        const m = sec[mKey];
        if (!m) return;
        m.items.forEach(it => {
          const base = { mondai: m.title, desc: m.desc, audio: it.dialog, dialogText: it.dialog, image: it.image, audioSrc: it.audioSrc, audioStart: it.audioStart, audioEnd: it.audioEnd };
          if (Array.isArray(it.questions)) {
            // satu audio dengan beberapa pertanyaan (mis. N2 もんだい5 質問1/質問2)
            it.questions.forEach(q => qs.push({ ...base, question: q.question || q.q || "", choices: q.choices, correct: q.choices[q.answer], explanation: q.explanation }));
          } else {
            qs.push({ ...base, question: it.question || (mKey === "mondai3" ? "何と 言いますか。" : ""), choices: it.choices, correct: it.choices[it.answer], explanation: it.explanation });
          }
        });
      });
    }
    return qs;
  };

  // Menu latihan JLPT: Kategori -> Level -> Latihan N.
  // "Latihan N" hanyalah LABEL urutan baru, disusun dari tahun-tahun yang sudah ada di JLPT_EXAM_CONTENT
  // (diurutkan naik: tahun paling awal = Latihan 1). Tahunnya tetap ada di data internal tetapi tidak
  // ditampilkan ke pengguna, dan nomor soal asli di dalam tiap latihan tidak berubah.
  const UJIAN_CATEGORIES = [
    { id: "mojigoi", section: "mojigoi", title: "Latihan Mojigoi", sub: "文字・語彙 · Kanji & kosakata" },
    { id: "dokkai", section: "bunpou_dokkai", title: "Latihan Dokkai", sub: "文法・読解 · Tata bahasa & bacaan" },
    { id: "choukai", section: "choukai", title: "Latihan Choukai", sub: "聴解 · Latihan mendengar (dengan audio)" },
  ];
  const getLatihanYears = (levelId, sectionId) => {
    const byLevel = JLPT_EXAM_CONTENT[levelId] || {};
    return Object.keys(byLevel)
      .sort((a, b) => Number(a) - Number(b))
      .filter(y => normalizeUjianSection(levelId, y, sectionId).length > 0);
  };

  const startUjian = (section, simModeArg, levelOverride, yearOverride) => {
    const qs = normalizeUjianSection(levelOverride || ujianLevel, String(yearOverride || ujianYear), section);
    const useSim = simModeArg !== undefined ? simModeArg : ujianSimMode;
    setUjianSection(section);
    setUjianQuestions(qs);
    setUjianIdx(0); setUjianSel(null); setUjianScore(0); setUjianDone(false); setUjianAnswersMap({}); setShowUjianPembahasan(false); setShowUjianScript(false);
    setUjianSimMode(useSim);
    if (useSim) {
      const secDef = UJIAN_SECTIONS.find(s => s.id === section);
      setUjianSimTimeLeft((secDef ? secDef.simMinutes : 0) * 60);
    } else {
      setUjianSimResults([]);
      setUjianSimAllDone(false);
    }
  };
  const startUjianSimulation = () => {
    setUjianSimResults([]);
    setUjianSimAllDone(false);
    startUjian("mojigoi", true);
  };
  // Jawaban disimpan sebagai INDEKS pilihan yang diklik (bukan teksnya). Sebagian kecil soal pada
  // beberapa paper punya dua pilihan dengan teks persis sama (artefak OCR dari PDF sumber, sudah
  // ditandai di data aslinya) - kalau disimpan sebagai teks, saat soal itu dibuka lagi highlight-nya
  // bisa "lompat" ke pilihan lain yang teksnya kebetulan sama (bukan yang benar-benar diklik user).
  // Menyimpan indeks membuat highlight selalu tepat ke pilihan yang benar-benar diklik, apa pun isi
  // teksnya. Skor tetap dihitung dari TEKS pilihan (choices[index] dibandingkan ke q.correct) supaya
  // hasilnya sama persis seperti sebelumnya.
  const submitUjianAnswer = (i) => {
    setUjianSel(i);
    setUjianAnswersMap(prev => ({ ...prev, [ujianIdx]: i }));
  };
  const goToUjianQuestion = (idx) => {
    setUjianIdx(idx);
    setShowUjianScript(false);
    const savedIdx = ujianAnswersMap[idx];
    setUjianSel(savedIdx !== undefined ? savedIdx : null);
  };
  const nextUjianQuestion = () => {
    if (ujianIdx + 1 < ujianQuestions.length) { goToUjianQuestion(ujianIdx + 1); }
    else { submitUjianSection(); }
  };
  const prevUjianQuestion = () => {
    if (ujianIdx > 0) { goToUjianQuestion(ujianIdx - 1); }
  };
  // submitLockRef: klik beruntun pada tombol Submit (mis. dobel-tap tanpa sengaja di HP) sebelumnya
  // bisa membuat fungsi ini terpanggil beberapa kali sebelum layar sempat berpindah ke bagian
  // berikutnya - karena tombol Submit ada di posisi yang sama di tiap bagian, klik ke-2/ke-3 bisa
  // mendarat di tombol Submit bagian BERIKUTNYA yang isinya masih kosong, sehingga 1-2 bagian
  // ujian terlewati tanpa sempat dijawab dan langsung nyasar ke halaman hasil akhir. Kuncian
  // singkat ini menahan panggilan ganda tersebut; terkunci hanya sekitar 900ms, jadi klik Submit
  // yang disengaja pada bagian berikutnya (submit sungguhan) tetap berfungsi normal.
  const submitLockRef = React.useRef(false);
  const submitUjianSection = () => {
    if (submitLockRef.current) return;
    submitLockRef.current = true;
    setTimeout(() => { submitLockRef.current = false; }, 900);
    let correct = 0;
    ujianQuestions.forEach((q, idx) => { if (ujianAnswersMap[idx] !== undefined && q.choices[ujianAnswersMap[idx]] === q.correct) correct++; });
    setUjianScore(correct);
    setUjianDone(true);
    if (ujianSimMode) {
      const secDef = UJIAN_SECTIONS.find(s => s.id === ujianSection);
      const result = { id: ujianSection, label: secDef ? secDef.label : ujianSection, questions: ujianQuestions, answersMap: ujianAnswersMap, score: correct };
      setUjianSimResults(prev => [...prev, result]);
      const currentIdx = UJIAN_SECTIONS.findIndex(s => s.id === ujianSection);
      const next = UJIAN_SECTIONS[currentIdx + 1];
      if (next) {
        startUjian(next.id, true);
      } else {
        setUjianSimAllDone(true);
      }
    } else {
      // Latihan satu kategori: tampilkan hasil + pembahasan dengan layar hasil yang sama.
      const secDef = UJIAN_SECTIONS.find(s => s.id === ujianSection);
      setUjianSimResults([{ id: ujianSection, label: secDef ? secDef.label : ujianSection, questions: ujianQuestions, answersMap: ujianAnswersMap, score: correct }]);
      setUjianSimAllDone(true);
    }
  };
  const exitUjianSection = () => {
    setUjianYear(null);
    setUjianSection(null); setUjianQuestions([]); setUjianDone(false); setShowUjianPembahasan(false);
    setUjianSimMode(false); setUjianSimResults([]); setUjianSimAllDone(false); setUjianSimTimeLeft(0);
  };
  useEffect(() => {
    if (!ujianSimMode || !ujianSection || ujianDone) return;
    const t = setInterval(() => {
      setUjianSimTimeLeft(prev => Math.max(0, prev - 1));
    }, 1000);
    return () => clearInterval(t);
  }, [ujianSimMode, ujianSection, ujianDone]);
  useEffect(() => {
    if (ujianSimMode && ujianSection && !ujianDone && ujianSimTimeLeft === 0) {
      submitUjianSection();
    }
  }, [ujianSimTimeLeft]);
  const [examLevel, setExamLevel] = useState(null);
  const [examDifficulty, setExamDifficulty] = useState(null);
  const [examSection, setExamSection] = useState(null);
  const [examPracticeLevel, setExamPracticeLevel] = useState(null);
  const [completedPracticeLevels, setCompletedPracticeLevels] = useState({});
  const [confirmRepeatLevel, setConfirmRepeatLevel] = useState(null);
  const [examQuestions, setExamQuestions] = useState([]);
  const [quizIdx, setQuizIdx] = useState(0);
  const [quizSel, setQuizSel] = useState(null);
  const [quizScore, setQuizScore] = useState(0);
  const [userAnswers, setUserAnswers] = useState([]);
  const [quizDone, setQuizDone] = useState(false);
  const [kanaScript, setKanaScript] = useState("hiragana");
  const [kanaQuizActive, setKanaQuizActive] = useState(false);
  const [kanaQuizDifficulty, setKanaQuizDifficulty] = useState(null);
  const [kanaQuizPracticeLevel, setKanaQuizPracticeLevel] = useState(null);
  const [kanaCompletedLevels, setKanaCompletedLevels] = useState({});
  const [confirmRepeatKanaLevel, setConfirmRepeatKanaLevel] = useState(null);
  const [kanaQuizQuestions, setKanaQuizQuestions] = useState([]);
  const [kanaQuizIdx, setKanaQuizIdx] = useState(0);
  const [kanaQuizSel, setKanaQuizSel] = useState(null);
  const [kanaQuizScore, setKanaQuizScore] = useState(0);
  const [kanaQuizDone, setKanaQuizDone] = useState(false);
  const [kanaQuizAnswers, setKanaQuizAnswers] = useState([]);
  const [showKanaPembahasan, setShowKanaPembahasan] = useState(false);
  const [matchingLevel, setMatchingLevel] = useState(null);
  const [matchingType, setMatchingType] = useState(null);
  const [matchingPairs, setMatchingPairs] = useState([]);
  const startMatching = (level, type) => {
    setMatchingType(type);
    setMatchingPairs(buildMatchingPairs(level, type));
  };
  const exitMatching = () => { setMatchingLevel(null); setMatchingType(null); setMatchingPairs([]); };
  const [writingScript, setWritingScript] = useState(null);
  const [writingGroup, setWritingGroup] = useState("dasar");
  const [writingLevel, setWritingLevel] = useState(null);
  const [writingChar, setWritingChar] = useState(null);
  const [writingVisible, setWritingVisible] = useState(60);
  const [writingDone, setWritingDone] = useState({});
  const exitWriting = () => { setWritingScript(null); setWritingGroup("dasar"); setWritingLevel(null); setWritingChar(null); setWritingVisible(60); };
  const kanaLevelKey = (script, diff, pl) => `${script}:${diff}:${pl}`;
  const startKanaQuiz = (difficulty, practiceLevel) => {
    setKanaQuizDifficulty(difficulty);
    setKanaQuizPracticeLevel(practiceLevel);
    setKanaQuizQuestions(genKanaQuiz(kanaScript, difficulty, practiceLevel));
    setKanaQuizIdx(0); setKanaQuizSel(null); setKanaQuizScore(0); setKanaQuizDone(false); setKanaQuizAnswers([]); setShowKanaPembahasan(false);
  };
  const submitKanaAnswer = (i) => { setKanaQuizSel(i); };
  const nextKanaQuestion = () => {
    const q = kanaQuizQuestions[kanaQuizIdx];
    const newAnswer = { question: q, selected: q.choices[kanaQuizSel] };
    const updated = [...kanaQuizAnswers, newAnswer];
    setKanaQuizAnswers(updated);
    if (kanaQuizIdx + 1 < kanaQuizQuestions.length) { setKanaQuizIdx(i => i + 1); setKanaQuizSel(null); }
    else {
      const finalScore = updated.filter(a => a.selected === a.question.correct).length;
      setKanaQuizScore(finalScore);
      setKanaQuizDone(true);
      const passed = kanaQuizQuestions.length > 0 && finalScore / kanaQuizQuestions.length >= 0.7;
      const key = kanaLevelKey(kanaScript, kanaQuizDifficulty, kanaQuizPracticeLevel);
      setKanaCompletedLevels(prev => ({ ...prev, [key]: { score: finalScore, total: kanaQuizQuestions.length, passed } }));
    }
  };
  const exitKanaQuiz = () => { setKanaQuizActive(false); setKanaQuizDifficulty(null); setKanaQuizPracticeLevel(null); setKanaQuizQuestions([]); setKanaQuizDone(false); setShowKanaPembahasan(false); };
  const [kanaKnown, setKanaKnown] = useState({});
  const [dailyDone, setDailyDone] = useState({});
  const [habitDays, setHabitDays] = useState({});
  const [expanded, setExpanded] = useState({});

  // ── Penyimpanan progres di browser (localStorage) + cadangan/impor data ──
  const STORAGE_KEY = "nihongo-michi-progress-v1";
  // Rutinitas harian: { "2026-10-02": { d1: true, d3: true }, ... } -> tiap tanggal punya daftar sendiri,
  // jadi checklist otomatis mulai dari nol lagi di hari berikutnya.
  const [dailyLog, setDailyLog] = useState({});
  // Flashcard kanji & kana: { kind: "kanji" | "kana", cat, list, index }
  const [flash, setFlash] = useState(null);
  const [flashFlipped, setFlashFlipped] = useState(false);
  const flashTouch = React.useRef({ x: null, y: null, swiped: false });
  const openFlash = (data) => { setFlashFlipped(false); setFlash(data); };
  const flashClose = () => { setFlash(null); setFlashFlipped(false); };
  const flashGo = (d) => {
    setFlashFlipped(false);
    setFlash(f => f ? { ...f, index: (f.index + d + f.list.length) % f.list.length } : f);
  };
  useEffect(() => {
    if (!flash) return;
    const onKey = (e) => {
      if (e.key === "Escape") flashClose();
      else if (e.key === "ArrowRight") flashGo(1);
      else if (e.key === "ArrowLeft") flashGo(-1);
      else if (e.key === " " && !(e.target && e.target.closest && e.target.closest("button"))) { e.preventDefault(); setFlashFlipped(v => !v); }
    };
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => { window.removeEventListener("keydown", onKey); document.body.style.overflow = prevOverflow; };
  }, [!!flash]);
  const [, setDayTick] = useState(0);
  useEffect(() => {
    const refresh = () => setDayTick(n => n + 1);   // ganti hari saat aplikasi dibuka kembali
    document.addEventListener("visibilitychange", refresh);
    window.addEventListener("focus", refresh);
    return () => { document.removeEventListener("visibilitychange", refresh); window.removeEventListener("focus", refresh); };
  }, []);
  const [hydrated, setHydrated] = useState(false);
  const buildSnapshot = () => ({
    v: 1, darkMode, checked, activityLog, weeklyGoals, weeklyHistory,
    completedPracticeLevels, kanaCompletedLevels, writingDone, kanaKnown, dailyLog,
  });
  const applySnapshot = (d) => {
    if (!d || typeof d !== "object" || Array.isArray(d)) return false;
    const isObj = (x) => x && typeof x === "object" && !Array.isArray(x);
    if (typeof d.darkMode === "boolean") setDarkMode(d.darkMode);
    if (isObj(d.checked)) setChecked(d.checked);
    if (isObj(d.activityLog)) setActivityLog(d.activityLog);
    if (Array.isArray(d.weeklyGoals)) setWeeklyGoals(d.weeklyGoals);
    if (Array.isArray(d.weeklyHistory)) setWeeklyHistory(d.weeklyHistory);
    if (isObj(d.completedPracticeLevels)) setCompletedPracticeLevels(d.completedPracticeLevels);
    if (isObj(d.kanaCompletedLevels)) setKanaCompletedLevels(d.kanaCompletedLevels);
    if (isObj(d.writingDone)) setWritingDone(d.writingDone);
    if (isObj(d.kanaKnown)) setKanaKnown(d.kanaKnown);
    if (isObj(d.dailyLog)) setDailyLog(d.dailyLog);
    return true;
  };
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) applySnapshot(JSON.parse(raw));
    } catch (e) { /* penyimpanan browser tidak tersedia atau data rusak: mulai dari kosong */ }
    setHydrated(true);
  }, []);
  useEffect(() => {
    if (!hydrated) return;
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(buildSnapshot())); } catch (e) { /* diabaikan */ }
  }, [hydrated, darkMode, checked, activityLog, weeklyGoals, weeklyHistory, completedPracticeLevels, kanaCompletedLevels, writingDone, kanaKnown, dailyLog]);
  const speak = (text) => {
    try {
      if (!window.speechSynthesis) return;
      window.speechSynthesis.cancel();
      const utter = new SpeechSynthesisUtterance(text);
      utter.lang = "ja-JP";
      utter.rate = 0.8;
      window.speechSynthesis.speak(utter);
    } catch (e) { /* speech not supported, silently ignore */ }
  };
  const speakDialog = (dialogText) => {
    try {
      if (!window.speechSynthesis) return;
      window.speechSynthesis.cancel();
      const lines = dialogText.split("\n").map(l => l.trim()).filter(Boolean);
      const turns = lines.map(line => {
        const m = line.match(/^([^：:]{1,3})[：:](.*)$/);
        if (m) return { speaker: m[1], text: m[2].trim() };
        return { speaker: null, text: line };
      });
      const speakerPitch = {};
      let nextPitch = 1.15;
      turns.forEach((t, i) => {
        const utter = new SpeechSynthesisUtterance(t.text);
        utter.lang = "ja-JP";
        utter.rate = 0.82;
        if (t.speaker) {
          if (!(t.speaker in speakerPitch)) {
            speakerPitch[t.speaker] = nextPitch;
            nextPitch = nextPitch > 1 ? 0.85 : 1.15;
          }
          utter.pitch = speakerPitch[t.speaker];
        }
        window.speechSynthesis.speak(utter);
      });
    } catch (e) { /* speech not supported, silently ignore */ }
  };
  const SpeakBtn = ({ text, size = 15 }) => (
    <button onClick={(e) => { e.stopPropagation(); speak(text); }}
      title="Dengar pelafalan" aria-label="Dengar pelafalan"
      style={{ display: "inline-flex", alignItems: "center", justifyContent: "center",
        width: size + 12, height: size + 12, borderRadius: "50%", border: "1.5px solid var(--line)",
        background: "var(--card-bg)", cursor: "pointer", flexShrink: 0, padding: 0 }}>
      <Volume2 size={size} color="var(--sora)" aria-hidden="true" />
    </button>
  );
    const StrokeSvg = ({ char, folder = "svgsJa", size = 120 }) => {
    const [svgText, setSvgText] = useState(null);
    const [status, setStatus] = useState("loading");
    const [replayKey, setReplayKey] = useState(0);
    const containerRef = React.useRef(null);

    useEffect(() => {
      let cancelled = false;
      setStatus("loading"); setSvgText(null);

      if (STROKE_DATA[char]) {
        setSvgText(STROKE_DATA[char]);
        setStatus("ok");
        return;
      }

      const code = char.codePointAt(0);
      const tryFetch = (f) => fetch(`https://raw.githubusercontent.com/parsimonhi/animCJK/master/${f}/${code}.svg`)
        .then(r => r.ok ? r.text() : Promise.reject());
      tryFetch(folder)
        .catch(() => tryFetch(folder === "svgsJa" ? "svgsJaKana" : "svgsJa"))
        .then(txt => {
          if (cancelled) return;
          const cleaned = txt.replace(/<!\[CDATA\[/g, "").replace(/\]\]>/g, "");
          setSvgText(cleaned); setStatus("ok");
        })
        .catch(() => { if (!cancelled) setStatus("error"); });
      return () => { cancelled = true; };
    }, [char, folder, replayKey]);

    useEffect(() => {
      if (status !== "ok" || !containerRef.current) return;
      const svgEl = containerRef.current.querySelector("svg.acjk");
      if (!svgEl) return;
      const strokes = svgEl.querySelectorAll("path[clip-path]");
      strokes.forEach(p => {
        const delay = p.style.getPropertyValue("--d") || "0s";
        p.style.strokeDasharray = "3337";
        p.style.strokeDashoffset = "3339";
        p.style.strokeWidth = "128";
        p.style.strokeLinecap = "round";
        p.style.fill = "none";
        p.style.stroke = "#000";
        p.style.animation = "none";
        void p.getBoundingClientRect(); // force reflow (offsetWidth tidak berlaku di elemen SVG)
        p.style.animation = `nm-stroke-zk 0.8s linear forwards ${delay}`;
      });
    }, [status, svgText, replayKey]);

    return (
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
        <div ref={containerRef} style={{ width: size, height: size, display: "flex", alignItems: "center", justifyContent: "center" }}>
          {status === "loading" && <span style={{ fontSize: 11, color: "var(--text-secondary)" }}>memuat animasi...</span>}
          {status === "error" && <span style={{ fontSize: 10.5, color: "var(--sakura)", textAlign: "center", padding: "0 4px" }}>Animasi belum tersedia untuk karakter ini (baru kana & kanji N5 yang tersimpan langsung di aplikasi)</span>}
          {status === "ok" && <div style={{ width: size, height: size }} dangerouslySetInnerHTML={{ __html: svgText }} />}
        </div>
        {status === "ok" && (
          <button onClick={(e) => { e.stopPropagation(); setReplayKey(k => k + 1); }} style={{
            fontSize: 10.5, fontWeight: 700, color: "var(--sora)", background: "var(--sora-tint)",
            border: "none", borderRadius: 999, padding: "3px 10px", cursor: "pointer" }}>↻ Ulangi animasi</button>
        )}
        {status === "error" && (
          <button onClick={(e) => { e.stopPropagation(); setReplayKey(k => k + 1); }} style={{
            fontSize: 10.5, fontWeight: 700, color: "var(--text-secondary)", background: "var(--line)",
            border: "none", borderRadius: 999, padding: "3px 10px", cursor: "pointer" }}>↻ Coba lagi</button>
        )}
      </div>
    );
  };

  const KanaTile = ({ tileKey, char, romaji, onOpen }) => {
    const known = !!kanaKnown[tileKey];
    const isOpen = false;   // detail kana kini tampil sebagai flashcard
    return (
      <div onClick={() => onOpen && onOpen()}
        style={{ position: "relative", background: isOpen ? "var(--sora-tint)" : (known ? "var(--sora-tint)" : "var(--card-bg)"),
          border: `2px solid ${isOpen ? "var(--sora)" : (known ? "var(--sora)" : "var(--line)")}`, borderRadius: 16,
          padding: "10px 8px", cursor: "pointer", minHeight: isOpen ? 190 : 92,
          display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
          textAlign: "center", gap: 4, transition: "all 0.15s ease" }}>
        <span onClick={(e) => { e.stopPropagation(); setKanaKnown(prev => ({ ...prev, [tileKey]: !prev[tileKey] })); }}
          style={{ position: "absolute", top: 6, right: 6, cursor: "pointer" }}>
          {known ? <Check size={15} color="var(--sora)" aria-hidden="true" /> : <Circle size={15} color="var(--text-muted)" aria-hidden="true" />}
        </span>
        {!isOpen ? (
          <>
            <span className="nm-title" style={{ fontSize: 28 }}>{char}</span>
            <span style={{ fontSize: 10, color: "var(--text-secondary)" }}>ketuk untuk lihat</span>
          </>
        ) : (
          <div style={{ width: "100%" }}>
            <StrokeSvg char={char} folder="svgsJaKana" size={80} />
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 6, margin: "4px 0 2px" }}>
              <p style={{ fontSize: 12, margin: 0, color: "var(--text-body)" }}>Dibaca: <b style={{ color: "var(--ink)" }}>{romaji}</b></p>
              <SpeakBtn text={char} size={13} />
            </div>
            <p style={{ fontSize: 9.5, color: "var(--text-secondary)", margin: "4px 0 0" }}>ketuk lagi untuk tutup</p>
          </div>
        )}
      </div>
    );
  };
  const [activeCat, setActiveCat] = useState("kanji");
  const [trackerStep, setTrackerStep] = useState("level");
  useEffect(() => {
    const scrollUp = () => {
      window.scrollTo(0, 0);
      if (document.scrollingElement) document.scrollingElement.scrollTop = 0;
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
    };
    scrollUp();
    const t = setTimeout(scrollUp, 50);
    return () => clearTimeout(t);
  }, [trackerStep]);
  const [showParticles, setShowParticles] = useState(false);
  const [search, setSearch] = useState("");
  const [kanjiPage, setKanjiPage] = useState(0);
  const KANJI_PAGE_SIZE = 20;
  const [orderSnapshot, setOrderSnapshot] = useState({});
  const toggleExpand = (cat, item) => {
    const key = `${cat}:${item}`;
    setExpanded(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const level = LEVELS.find(l => l.id === levelId);
  const todayStr = () => {
    const d = new Date();
    return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,"0")}-${String(d.getDate()).padStart(2,"0")}`;
  };
  const toggleDaily = (taskId) => {
    const k = todayStr();
    setDailyLog(prev => {
      const day = { ...(prev[k] || {}) };
      if (day[taskId]) delete day[taskId]; else day[taskId] = true;
      const next = { ...prev };
      if (Object.keys(day).length) next[k] = day; else delete next[k];
      return next;
    });
  };
  const addWeeklyGoal = () => {
    const text = newGoalText.trim();
    if (!text) return;
    setWeeklyGoals(prev => [...prev, { id: Date.now(), text, createdAt: todayStr() }]);
    setNewGoalText("");
  };
  const completeWeeklyGoal = (id) => {
    setWeeklyGoals(prev => {
      const goal = prev.find(g => g.id === id);
      if (goal) setWeeklyHistory(h => [{ ...goal, completedAt: todayStr() }, ...h]);
      return prev.filter(g => g.id !== id);
    });
  };
  const removeWeeklyGoal = (id) => {
    setWeeklyGoals(prev => prev.filter(g => g.id !== id));
  };
  const toggle = (cat, item) => {
    const key = `${cat}:${item}`;
    setChecked(prev => {
      const willBeDone = !prev[key];
      if (willBeDone) {
        const date = todayStr();
        setActivityLog(logPrev => {
          const dayList = logPrev[date] ? [...logPrev[date]] : [];
          const label = cat === "grammar" ? item : cat === "vocab" ? `Kosakata: ${item}` : `Kanji: ${item}`;
          if (!dayList.includes(label)) dayList.push(label);
          return { ...logPrev, [date]: dayList };
        });
      }
      return { ...prev, [key]: willBeDone };
    });
  };
  const catCount = (cat) => {
    const items = level[cat];
    const done = items.filter(i => checked[`${cat}:${i}`]).length;
    return { done, total: items.length };
  };
  const catPct = (cat) => {
    const { done, total } = catCount(cat);
    return (done / total) * 100;
  };
  const overallPct = useMemo(() => (catPct("kanji") + catPct("vocab") + catPct("grammar")) / 3, [checked, levelId]);
  const allLevelsPct = useMemo(() => {
    let allDone = 0, allTotal = 0;
    LEVELS.forEach(lvl => {
      ["kanji","vocab","grammar"].forEach(cat => {
        const items = lvl[cat] || [];
        allTotal += items.length;
        allDone += items.filter(it => checked[`${cat}:${it}`]).length;
      });
    });
    return allTotal ? Math.round((allDone / allTotal) * 100) : 0;
  }, [checked]);
  const overallCount = useMemo(() => {
    const cats = ["kanji", "vocab", "grammar"].map(catCount);
    return { done: cats.reduce((s, c) => s + c.done, 0), total: cats.reduce((s, c) => s + c.total, 0) };
  }, [checked, levelId]);
  const levelProgressPct = (lvl) => {
    let done = 0, total = 0;
    ["kanji", "vocab", "grammar"].forEach(cat => {
      const items = lvl[cat];
      total += items.length;
      done += items.filter(i => checked[`${cat}:${i}`]).length;
    });
    return total ? (done / total) * 100 : 0;
  };

  const matchesSearch = (cat, item) => {
    if (!search.trim()) return true;
    const q = search.trim().toLowerCase();
    if (item.toLowerCase().includes(q)) return true;
    if (cat === "kanji" && KANJI_CONTENT[item]) {
      const k = KANJI_CONTENT[item];
      return k.on.toLowerCase().includes(q) || k.kun.toLowerCase().includes(q) || k.arti.toLowerCase().includes(q);
    }
    if (cat === "vocab" && VOCAB_CONTENT[item]) {
      return VOCAB_CONTENT[item].some(w => w.jp.includes(q) || w.reading.includes(q) || w.id.toLowerCase().includes(q));
    }
    if (cat === "grammar" && GRAMMAR_CONTENT[item]) {
      return GRAMMAR_CONTENT[item].arti.toLowerCase().includes(q);
    }
    if (cat === "reading" && READING_CONTENT[item]) {
      return item.toLowerCase().includes(q) || READING_CONTENT[item].text.join(" ").toLowerCase().includes(q);
    }
    return false;
  };
  const selectLevel = (id) => { setLevelId(id); setKanjiPage(0); setSearch(""); setTrackerStep("category"); setOrderSnapshot({}); };
  const selectCat = (cat) => {
    setActiveCat(cat);
    setSearch("");
    setTrackerStep("content");
    setOrderSnapshot(checked);
    if (cat === "kanji") {
      const items = level.kanji;
      const firstUncheckedIdx = items.findIndex(it => !checked[`kanji:${it}`]);
      const targetPage = firstUncheckedIdx === -1 ? Math.floor((items.length - 1) / KANJI_PAGE_SIZE) : Math.floor(firstUncheckedIdx / KANJI_PAGE_SIZE);
      setKanjiPage(Math.max(0, targetPage));
    } else {
      setKanjiPage(0);
    }
  };

  const contentView = useMemo(() => {
    const cat = activeCat;
    const filteredItems = level[cat].filter(item => matchesSearch(cat, item));
    if (cat === "vocab") {
      filteredItems.sort((a, b) => {
        const aDone = orderSnapshot[`${cat}:${a}`] ? 1 : 0;
        const bDone = orderSnapshot[`${cat}:${b}`] ? 1 : 0;
        return aDone - bDone;
      });
    }
    const isPaged = cat === "kanji" && !search.trim();
    const totalPages = isPaged ? Math.max(1, Math.ceil(filteredItems.length / KANJI_PAGE_SIZE)) : 1;
    return { filteredItems, isPaged, totalPages };
  }, [activeCat, levelId, search, orderSnapshot, checked]);

  useEffect(() => {
    if (contentView.isPaged && kanjiPage > contentView.totalPages - 1) {
      setKanjiPage(Math.max(0, contentView.totalPages - 1));
    }
  }, [contentView.isPaged, contentView.totalPages, kanjiPage]);

  const startExam = (level, section, difficulty, practiceLevel) => {
    setExamLevel(level);
    setExamSection(section);
    setExamDifficulty(difficulty);
    setExamPracticeLevel(practiceLevel);
    const gen = section === "kosakata" ? genKosakata : section === "kanji" ? genKanji : section === "grammar" ? genBunpou : section === "dokkai" ? genDokkai : genChoukai;
    setExamQuestions(section === "dokkai" || section === "choukai" ? gen(level, difficulty) : gen(level, difficulty, practiceLevel));
    setQuizIdx(0); setQuizSel(null); setQuizScore(0); setQuizDone(false); setUserAnswers([]); setShowPembahasan(false);
  };
  const submitAnswer = (i) => {
    setQuizSel(i);
  };
  const practiceLevelKey = (lvl, sec, diff, pl) => `${lvl}:${sec}:${diff}:${pl}`;
  const nextQuestion = () => {
    const q = examQuestions[quizIdx];
    const newAnswer = { question: q, selectedIdx: quizSel, selected: q.choices[quizSel] };
    const updatedAnswers = [...userAnswers, newAnswer];
    setUserAnswers(updatedAnswers);
    if (quizIdx + 1 < examQuestions.length) { setQuizIdx(q => q + 1); setQuizSel(null); }
    else {
      const finalScore = updatedAnswers.filter(a => a.selected === a.question.correct).length;
      setQuizScore(finalScore);
      setQuizDone(true);
      const passed = examQuestions.length > 0 && finalScore / examQuestions.length >= 0.7;
      const key = practiceLevelKey(examLevel.id, examSection, examDifficulty, examPracticeLevel);
      setCompletedPracticeLevels(prev => ({ ...prev, [key]: { score: finalScore, total: examQuestions.length, passed } }));
    }
  };
  const restartQuiz = () => {
    setShowPembahasan(false);
    if (examLevel && examSection && examDifficulty && examPracticeLevel) startExam(examLevel, examSection, examDifficulty, examPracticeLevel);
  };
  const exitExam = () => { setExamLevel(null); setExamSection(null); setExamDifficulty(null); setExamPracticeLevel(null); setExamQuestions([]); setQuizDone(false); setUserAnswers([]); setShowPembahasan(false); };
  const [showPembahasan, setShowPembahasan] = useState(false);

  const kanaTable = kanaScript === "hiragana" ? HIRAGANA : KATAKANA;
  const kanaFlat = KANA_ROWS.flat().filter(Boolean);
  const kanaGroupKeyCount = KANA_GROUPS.reduce((s, g) => s + g.entries.length, 0);
  const kanaTotalCount = kanaFlat.length + kanaGroupKeyCount;
  const kanaKnownCount =
    kanaFlat.filter(r => kanaKnown[`${kanaScript}:${r}`]).length +
    KANA_GROUPS.reduce((s, g) => s + g.entries.filter((_, i) => kanaKnown[`${kanaScript}:${g.id}:${i}`]).length, 0);
  const kanaPct = (kanaKnownCount / kanaTotalCount) * 100;

  const dailyDoneCount = DAILY_TASKS.filter(t => dailyDone[t.id]).length;
  const dailyPct = (dailyDoneCount / DAILY_TASKS.length) * 100;
  const streak = (() => {
    let count = 0;
    let d = new Date();
    while (true) {
      const key = `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,"0")}-${String(d.getDate()).padStart(2,"0")}`;
      if (activityLog[key] && activityLog[key].length > 0) {
        count++;
        d.setDate(d.getDate() - 1);
      } else break;
    }
    return count;
  })();

  const activeTintVar = `var(--${TABS.find(t => t.id === tab)?.color || "sakura"}-tint)`;

  const starsSvg = encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" width="200" height="200" viewBox="0 0 200 200">
    <g fill="#fff">
      <circle cx="20" cy="30" r="1.4"/><circle cx="70" cy="15" r="1"/><circle cx="120" cy="50" r="1.6"/>
      <circle cx="160" cy="20" r="1"/><circle cx="45" cy="80" r="1"/><circle cx="100" cy="100" r="1.3"/>
      <circle cx="150" cy="90" r="1"/><circle cx="185" cy="130" r="1.4"/><circle cx="30" cy="150" r="1"/>
      <circle cx="80" cy="170" r="1.5"/><circle cx="130" cy="160" r="1"/><circle cx="10" cy="110" r="1"/>
    </g>
  </svg>`);

  return (
    <div className="nm-app-shell" style={{
      fontFamily: "'Zen Maru Gothic', sans-serif", color: "var(--ink)",
      backgroundColor: "var(--paper)",
      backgroundImage: darkMode
        ? `url("data:image/svg+xml,${starsSvg}"), radial-gradient(ellipse at 50% -10%, #1C2150 0%, transparent 55%), linear-gradient(180deg, #10132B 0%, #0B0E1C 60%)`
        : `linear-gradient(180deg, #FFD9A0 0%, #FFC08A 22%, #FFB0A0 42%, #FFE6D0 68%, #FFF3E6 100%)`,
      backgroundRepeat: darkMode ? "repeat, no-repeat, no-repeat" : "no-repeat",
      backgroundSize: darkMode ? "200px 200px, 100% 100%, 100% 100%" : "100% 100%",
      backgroundAttachment: darkMode ? "fixed, fixed, fixed" : "fixed",
      borderRadius: 20, padding: "1.25rem", transition: "background 0.3s ease",
      minHeight: "100vh", display: "flex", flexDirection: "column", boxSizing: "border-box",
    }}>
      
      <div className="nm-root" style={{
        marginBottom: "1.1rem", padding: "1.1rem 1.1rem", borderRadius: 18, position: "relative", overflow: "hidden",
        background: darkMode ? "linear-gradient(120deg, #1E2352 0%, #2F2D66 100%)" : "linear-gradient(120deg, #FF7A5C 0%, #FF5D8F 100%)", display: "flex", alignItems: "center", gap: 12,
      }}>
        <svg width="140" height="140" viewBox="0 0 140 140" style={{ position: "absolute", right: -30, top: -30, opacity: 0.16, pointerEvents: "none" }} aria-hidden="true">
          <circle cx="70" cy="70" r="50" fill="none" stroke="#fff" strokeWidth="6" />
          <circle cx="70" cy="70" r="34" fill="#fff" />
        </svg>
        <svg width="100%" height="46" viewBox="0 0 400 46" preserveAspectRatio="none" style={{ position: "absolute", left: 0, bottom: 0, opacity: 0.35, pointerEvents: "none" }} aria-hidden="true">
          <path d="M0 46 L130 8 Q140 -2 150 8 L163 22 L177 8 Q187 -2 197 8 L400 46 Z" fill="#fff" />
        </svg>
        <svg width="60" height="60" viewBox="0 0 60 60" style={{ position: "absolute", left: "48%", top: 4, opacity: 0.5, pointerEvents: "none" }} aria-hidden="true">
          <g fill="#fff">
            <g transform="translate(18,18)"><circle r="5" cx="0" cy="-7"/><circle r="5" cx="6.5" cy="-2"/><circle r="5" cx="4" cy="6"/><circle r="5" cx="-4" cy="6"/><circle r="5" cx="-6.5" cy="-2"/></g>
            <g transform="translate(42,32) scale(0.6)"><circle r="5" cx="0" cy="-7"/><circle r="5" cx="6.5" cy="-2"/><circle r="5" cx="4" cy="6"/><circle r="5" cx="-4" cy="6"/><circle r="5" cx="-6.5" cy="-2"/></g>
          </g>
        </svg>
        <div style={{ position: "relative", width: 44, height: 44, borderRadius: "50%",
          background: darkMode ? "#F0F2F9" : "var(--sun)", display: "flex",
          alignItems: "center", justifyContent: "center", flexShrink: 0, boxShadow: "0 3px 0 rgba(0,0,0,0.15)" }}>
          <span className="nm-title" style={{ fontSize: 20, color: darkMode ? "#2B2C66" : "#7A2E00" }}>道</span>
        </div>
        <div style={{ flex: 1, position: "relative" }}>
          <h1 className="nm-title" style={{ fontSize: 23, margin: 0, color: "#fff", letterSpacing: "0.01em" }}>日本語の道</h1>
          <p style={{ fontSize: 12, color: "rgba(255,255,255,0.85)", margin: "2px 0 0", fontWeight: 500 }}>Nihongo Michi — belajar santai, progres nyata</p>
        </div>
        <button onClick={() => setDarkMode(d => !d)} aria-label="Ganti mode gelap/terang" title="Ganti mode gelap/terang"
          style={{
            width: 56, height: 30, borderRadius: 999, border: "none", padding: 3, flexShrink: 0, position: "relative",
            background: darkMode ? "#2A3050" : "rgba(255,255,255,0.3)", cursor: "pointer",
            display: "flex", alignItems: "center", transition: "background 0.2s ease",
          }}>
          <div style={{
            width: 24, height: 24, borderRadius: "50%", background: "#fff",
            display: "flex", alignItems: "center", justifyContent: "center",
            transform: darkMode ? "translateX(26px)" : "translateX(0px)",
            transition: "transform 0.2s ease", boxShadow: "0 1px 3px rgba(0,0,0,0.25)",
          }}>
            {darkMode ? <Moon size={14} color="#C9CDE8" aria-hidden="true" /> : <Sun size={14} color="var(--yuzu)" aria-hidden="true" />}
          </div>
        </button>
      </div>

      <div key={tab} className="nm-tab-content nm-tab-wrap" style={{ background: activeTintVar, borderRadius: 20, padding: "1rem", transition: "background 0.2s ease", flex: 1 }}>

        {tab === "home" && !kanaQuizActive && (
          <div>
            <div className="nm-card nm-home-hero" style={{ marginBottom: 12, display: "flex", alignItems: "center", gap: 14 }}>
              <Tape color="var(--sakura)" />
              <Ring pct={allLevelsPct} size={56} color="var(--sakura)" />
              <div style={{ flex: 1 }}>
                <p className="nm-title" style={{ fontSize: 18, margin: "0 0 2px" }}>おかえりなさい 👋</p>
                <p style={{ fontSize: 12.5, color: "var(--text-secondary)", margin: "0 0 8px" }}>
                  Progres total N5-N1: <b style={{ color: "var(--sakura)" }}>{allLevelsPct}%</b>
                </p>
                <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                    <Flame size={16} color="var(--yuzu)" aria-hidden="true" style={streak > 0 ? { animation: "nm-flamePulse 1.4s ease-in-out infinite" } : undefined} />
                    <span style={{ fontSize: 13, fontWeight: 700 }}>{streak} hari streak</span>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                    <Check size={16} color="var(--matcha)" aria-hidden="true" />
                    <span style={{ fontSize: 13, fontWeight: 700 }}>{weeklyHistory.length}/{weeklyGoals.length + weeklyHistory.length} target minggu ini</span>
                  </div>
                </div>
              </div>
            </div>

            <p className="nm-title" style={{ fontSize: 15, margin: "0 0 10px" }}>Roadmap</p>
            <div className="nm-d-g4" style={{ display: "grid", gridTemplateColumns: "repeat(2, minmax(0,1fr))", gap: 12, marginBottom: 16 }}>
              {LEVELS.map((l, i) => {
                const colors = ["sakura","sora","matcha","momiji"];
                const col = colors[i];
                return (
                  <div key={l.id} className="nm-card" style={{ textAlign: "left", border: "2px solid var(--line)" }}>
                    <Tape color={`var(--${col})`} />
                    <p style={{ fontSize: 11.5, color: `var(--${col})`, fontWeight: 700, margin: "4px 0 6px", letterSpacing: "0.04em" }}>TAHAP {i + 1}</p>
                    <p className="nm-title" style={{ fontSize: 18, margin: "0 0 8px" }}>{l.label}: {l.name}</p>
                    <p style={{ fontSize: 13, color: "var(--text-body)", lineHeight: 1.6, margin: 0, fontStyle: "italic" }}>
                      "{l.tagline}"
                    </p>
                    <p style={{ fontSize: 12.5, color: "var(--text-secondary)", lineHeight: 1.6, margin: "6px 0 0" }}>
                      {l.comprehension}
                    </p>
                    <p style={{ fontSize: 11, color: `var(--${col})`, fontWeight: 700, margin: "8px 0 0" }}>⏱ {l.weeks}</p>
                  </div>
                );
              })}
            </div>

            <div className="nm-d-g4" style={{ display: "grid", gridTemplateColumns: "repeat(2, minmax(0,1fr))", gap: 12 }}>
              {[
                { id: "aksara", title: "Aksara", desc: `${kanaKnownCount}/${kanaTotalCount} dikuasai (${Math.round(kanaPct) || 0}%)`, icon: BookOpen, color: "sora" },
                { id: "tracker", title: "Learning", desc: `${overallCount.done}/${overallCount.total} item · ${Math.round(overallPct) || 0}%`, icon: Book, color: "matcha" },
                { id: "rutinitas", title: "Tracker", desc: `streak ${streak} hari · ${allLevelsPct}% total progres`, icon: BarChart3, color: "yuzu" },
                { id: "latihan", title: "Latihan", desc: examSection ? (quizDone ? `${quizScore}/${examQuestions.length} benar` : `Soal ${quizIdx + 1}/${examQuestions.length}`) : "Kosakata, Kanji & Grammar", icon: PenLine, color: "momiji" },
              ].map(card => {
                const Icon = card.icon;
                // Kartu "Learning" hanya menampilkan ringkasan progres (informasi) — tidak membuka tab Learning saat diklik.
                const infoOnly = card.id === "tracker";
                const Wrapper = infoOnly ? "div" : "button";
                const wrapperProps = infoOnly
                  ? { style: { display: "block", textAlign: "left", border: "2px solid var(--line)", width: "100%" } }
                  : { onClick: () => setTab(card.id), style: { display: "block", textAlign: "left", cursor: "pointer", border: "2px solid var(--line)", fontFamily: "inherit", width: "100%" } };
                return (
                  <Wrapper key={card.id} className="nm-card" {...wrapperProps}>
                    <Tape color={`var(--${card.color})`} />
                    <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
                      <div style={{ width: 30, height: 30, borderRadius: 9, background: `var(--${card.color}-tint)`,
                        display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                        <Icon size={16} color={`var(--${card.color})`} aria-hidden="true" />
                      </div>
                      <p className="nm-title" style={{ fontSize: 14, margin: 0 }}>{card.title}</p>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                      <span style={{ fontSize: 12, color: "var(--text-secondary)" }}>{card.desc}</span>
                      {!infoOnly && <ChevronRight size={14} color="var(--text-secondary)" aria-hidden="true" />}
                    </div>
                  </Wrapper>
                );
              })}
            </div>
          </div>
        )}

        {kanaQuizActive && (
          <div>
              <div className="nm-card">
                <Tape color="var(--sora)" />
                <button onClick={exitKanaQuiz} style={{ display: "flex", alignItems: "center", gap: 4,
                  background: "none", border: "none", color: "var(--text-secondary)", fontFamily: "'Zen Maru Gothic', sans-serif",
                  fontSize: 12, fontWeight: 700, cursor: "pointer", padding: 0, marginBottom: 10 }}>
                  <ChevronRight size={13} style={{ transform: "rotate(180deg)" }} aria-hidden="true" /> {kanaScript === "hiragana" ? "Hiragana" : "Katakana"}{kanaQuizDifficulty && ` · ${DIFFICULTY[kanaQuizDifficulty].label}`}{kanaQuizPracticeLevel && ` · Lv.${kanaQuizPracticeLevel}`}
                </button>

                {!kanaQuizDifficulty ? (
                  <>
                    <p style={{ fontSize: 13, color: "var(--text-secondary)", margin: "0 0 12px" }}>
                      Kuis <b className="nm-title" style={{ color: "var(--ink)" }}>{kanaScript === "hiragana" ? "Hiragana" : "Katakana"}</b> — pilih tingkat kesulitan:
                    </p>
                    <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                      {["mudah", "sedang", "susah"].map(d => {
                        const diffDesc = { mudah: "5 soal · 3 pilihan jawaban", sedang: "10 soal · 4 pilihan jawaban", susah: "15 soal · 5 pilihan jawaban" };
                        const diffColor = { mudah: "matcha", sedang: "yuzu", susah: "sakura" };
                        return (
                          <div key={d} className="nm-card nm-card-tap" style={{ cursor: "pointer", display: "flex", alignItems: "center", gap: 12 }}
                            onClick={() => setKanaQuizDifficulty(d)}>
                            <div style={{ width: 40, height: 40, borderRadius: 12, background: `var(--${diffColor[d]}-tint)`, display: "flex",
                              alignItems: "center", justifyContent: "center", flexShrink: 0, color: `var(--${diffColor[d]})`, fontWeight: 700, fontSize: 13 }}>
                              {DIFFICULTY[d].label[0]}
                            </div>
                            <div style={{ flex: 1 }}>
                              <p style={{ fontSize: 14, fontWeight: 700, margin: 0 }}>{DIFFICULTY[d].label}</p>
                              <p style={{ fontSize: 11.5, color: "var(--text-secondary)", margin: "2px 0 0" }}>{diffDesc[d]}</p>
                            </div>
                            <ChevronRight size={16} color="var(--text-secondary)" aria-hidden="true" />
                          </div>
                        );
                      })}
                    </div>
                  </>
                ) : !kanaQuizPracticeLevel ? (
                  <>
                    <button onClick={() => { setKanaQuizDifficulty(null); setConfirmRepeatKanaLevel(null); }} style={{ display: "flex", alignItems: "center", gap: 4,
                      background: "none", border: "none", color: "var(--text-secondary)", fontFamily: "'Zen Maru Gothic', sans-serif",
                      fontSize: 12.5, fontWeight: 700, cursor: "pointer", padding: 0, marginBottom: 12 }}>
                      <ChevronRight size={14} style={{ transform: "rotate(180deg)" }} aria-hidden="true" /> Ganti kesulitan
                    </button>
                    <p style={{ fontSize: 13, color: "var(--text-secondary)", margin: "0 0 12px" }}>
                      <b className="nm-title" style={{ color: "var(--ink)" }}>{kanaScript === "hiragana" ? "Hiragana" : "Katakana"} · {DIFFICULTY[kanaQuizDifficulty].label}</b> — pilih level latihan:
                    </p>
                    <div style={{ display: "grid", gridTemplateColumns: "repeat(5, minmax(0,1fr))", gap: 8 }}>
                      {Array.from({ length: 10 }, (_, i) => i + 1).map(n => {
                        const key = kanaLevelKey(kanaScript, kanaQuizDifficulty, n);
                        const record = kanaCompletedLevels[key];
                        const passed = record && record.passed;
                        const prevKey = kanaLevelKey(kanaScript, kanaQuizDifficulty, n - 1);
                        const unlocked = n === 1 || (kanaCompletedLevels[prevKey] && kanaCompletedLevels[prevKey].passed);
                        return (
                          <button key={n}
                            onClick={() => {
                              if (!unlocked) return;
                              record ? setConfirmRepeatKanaLevel(n) : startKanaQuiz(kanaQuizDifficulty, n);
                            }}
                            className="nm-lvl-btn" style={{
                              padding: "14px 0", fontSize: 16, position: "relative",
                              background: passed ? "var(--matcha)" : "var(--card-bg)",
                              borderColor: passed ? "var(--matcha)" : "var(--line)",
                              color: passed ? "#fff" : unlocked ? "var(--ink)" : "var(--text-muted)",
                              opacity: unlocked ? 1 : 0.6,
                              cursor: unlocked ? "pointer" : "not-allowed",
                            }}>
                            {unlocked ? n : <Lock size={14} aria-hidden="true" />}
                            {passed && <Check size={12} style={{ position: "absolute", top: 3, right: 3 }} aria-hidden="true" />}
                          </button>
                        );
                      })}
                    </div>
                    <p style={{ fontSize: 11, color: "var(--text-secondary)", margin: "8px 0 0" }}>🔒 Level berikutnya terbuka setelah lulus level sebelumnya (minimal 70%).</p>
                    {confirmRepeatKanaLevel !== null && (
                      <div className="nm-card" style={{ marginTop: 12, textAlign: "center" }}>
                        <p style={{ fontSize: 13.5, fontWeight: 700, margin: "0 0 12px" }}>Ingin mengulangi latihan ini?</p>
                        <div style={{ display: "flex", gap: 8, justifyContent: "center" }}>
                          <button onClick={() => { const n = confirmRepeatKanaLevel; setConfirmRepeatKanaLevel(null); startKanaQuiz(kanaQuizDifficulty, n); }}
                            style={{ background: "var(--momiji)", color: "#fff", border: "none", borderRadius: 12, padding: "8px 20px",
                              fontFamily: "'Zen Maru Gothic', sans-serif", fontWeight: 700, fontSize: 13, cursor: "pointer" }}>Ya</button>
                          <button onClick={() => setConfirmRepeatKanaLevel(null)}
                            style={{ background: "var(--card-bg)", color: "var(--ink)", border: "2px solid var(--line)", borderRadius: 12, padding: "8px 20px",
                              fontFamily: "'Zen Maru Gothic', sans-serif", fontWeight: 700, fontSize: 13, cursor: "pointer" }}>Tidak</button>
                        </div>
                      </div>
                    )}
                  </>
                ) : !kanaQuizDone ? (
                  (() => {
                    const q = kanaQuizQuestions[kanaQuizIdx];
                    return (
                      <>
                        <p style={{ fontSize: 12, color: "var(--text-secondary)", margin: "4px 0 8px" }}>Soal {kanaQuizIdx + 1} dari {kanaQuizQuestions.length}</p>
                        <p style={{ fontSize: 15, fontWeight: 700, margin: "0 0 10px" }}>{q.q}</p>
                        <div>
                          {q.choices.map((opt, i) => {
                            const isSel = i === kanaQuizSel;
                            const style = isSel
                              ? { background: "var(--sora-tint)", borderColor: "var(--sora)" }
                              : { background: "var(--card-bg)", borderColor: "var(--line)" };
                            return (
                              <button key={i} onClick={() => submitKanaAnswer(i)} className={isSel ? "nm-quiz-option-selected" : ""} style={{
                                display: "block", width: "100%", textAlign: "left", padding: "10px 12px",
                                marginBottom: 8, borderRadius: 14, border: `2px solid ${style.borderColor}`,
                                background: style.background, color: "var(--ink)",
                                fontFamily: "inherit", fontSize: 15, cursor: "pointer" }}>
                                {opt}
                              </button>
                            );
                          })}
                        </div>
                        {kanaQuizSel !== null && (
                          <button onClick={nextKanaQuestion} style={{ marginTop: 6, display: "inline-flex", alignItems: "center", gap: 4,
                            background: "var(--sora)", color: "#fff", border: "none", borderRadius: 12, padding: "9px 16px",
                            fontFamily: "'Zen Maru Gothic', sans-serif", fontWeight: 700, fontSize: 13, cursor: "pointer" }}>
                            {kanaQuizIdx + 1 < kanaQuizQuestions.length ? "Soal berikutnya" : "Lihat hasil"} <ChevronRight size={14} aria-hidden="true" />
                          </button>
                        )}
                      </>
                    );
                  })()
                ) : (() => {
                  const passed = kanaQuizQuestions.length > 0 && kanaQuizScore / kanaQuizQuestions.length >= 0.7;
                  const hasNextKanaLevel = kanaQuizPracticeLevel < 10;
                  return (
                    <div style={{ textAlign: "center", padding: "1rem 0" }}>
                      <p className="nm-title" style={{ fontSize: 24, margin: "4px 0 6px" }}>{kanaQuizScore} / {kanaQuizQuestions.length} benar</p>
                      <p style={{ fontSize: 13, color: passed ? "var(--matcha)" : "var(--sakura)", fontWeight: 700, margin: "0 0 14px" }}>
                        {passed ? "✅ Bagus! Sudah cukup hafal." : "Masih ada yang perlu diulang, yuk coba lagi."}
                      </p>
                      <div style={{ display: "flex", gap: 8, justifyContent: "center", flexWrap: "wrap", marginBottom: showKanaPembahasan ? 16 : 0 }}>
                        {passed && hasNextKanaLevel && (
                          <button onClick={() => startKanaQuiz(kanaQuizDifficulty, kanaQuizPracticeLevel + 1)}
                            style={{ background: "var(--matcha)", color: "#fff", border: "none",
                            borderRadius: 12, padding: "9px 16px", fontFamily: "'Zen Maru Gothic', sans-serif", fontWeight: 700,
                            fontSize: 13, cursor: "pointer" }}>Lanjut ke Level {kanaQuizPracticeLevel + 1} →</button>
                        )}
                        <button onClick={() => startKanaQuiz(kanaQuizDifficulty, kanaQuizPracticeLevel)} style={{ background: passed ? "var(--card-bg)" : "var(--sora)", color: passed ? "var(--ink)" : "#fff", border: passed ? "2px solid var(--line)" : "none",
                          borderRadius: 12, padding: "9px 16px", fontFamily: "'Zen Maru Gothic', sans-serif", fontWeight: 700,
                          fontSize: 13, cursor: "pointer" }}>Ulangi kuis</button>
                        <button onClick={() => setShowKanaPembahasan(s => !s)} style={{ background: "var(--card-bg)", color: "var(--matcha)", border: "2px solid var(--matcha)",
                          borderRadius: 12, padding: "9px 16px", fontFamily: "'Zen Maru Gothic', sans-serif", fontWeight: 700,
                          fontSize: 13, cursor: "pointer" }}>{showKanaPembahasan ? "Tutup pembahasan" : "📖 Lihat pembahasan"}</button>
                      </div>
                      {showKanaPembahasan && (
                        <div style={{ textAlign: "left" }}>
                          {kanaQuizAnswers.map((a, idx) => {
                            const isCorrect = a.selected === a.question.correct;
                            return (
                              <div key={idx} style={{
                                borderRadius: 14, border: `2px solid ${isCorrect ? "var(--matcha)" : "var(--sakura)"}`,
                                background: isCorrect ? "var(--matcha-tint)" : "var(--sakura-tint)",
                                padding: "10px 12px", marginBottom: 10,
                              }}>
                                <div style={{ display: "flex", alignItems: "flex-start", gap: 6, marginBottom: 6 }}>
                                  {isCorrect ? <Check size={16} color="var(--matcha)" aria-hidden="true" style={{ flexShrink: 0, marginTop: 2 }} />
                                    : <span style={{ color: "var(--sakura)", fontWeight: 700, flexShrink: 0 }}>✕</span>}
                                  <p style={{ fontSize: 12, fontWeight: 700, margin: 0, color: "var(--text-secondary)" }}>Soal {idx + 1}</p>
                                </div>
                                <p style={{ fontSize: 13.5, fontWeight: 700, margin: "0 0 6px" }}>{a.question.q}</p>
                                <p style={{ fontSize: 12.5, margin: "0 0 3px" }}>
                                  Jawabanmu: <b style={{ color: isCorrect ? "var(--matcha)" : "var(--sakura)" }}>{a.selected}</b>
                                  {!isCorrect && <> · Jawaban benar: <b style={{ color: "var(--matcha)" }}>{a.question.correct}</b></>}
                                </p>
                                <p style={{ fontSize: 12, color: "var(--text-body)", margin: "6px 0 0", lineHeight: 1.6 }}>💡 {a.question.explain}</p>
                              </div>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  );
                })()}
              </div>
          </div>
        )}
        {tab === "aksara" && !kanaQuizActive && (
          <div>
            <>
            <div className="nm-card" style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 12 }}>
              <Tape color="var(--sora)" />
              <Ring pct={kanaPct} color="var(--sora)" />
              <div style={{ flex: 1 }}>
                <p style={{ fontSize: 14, fontWeight: 700, margin: "0 0 2px" }}>Progres {kanaScript === "hiragana" ? "Hiragana" : "Katakana"}</p>
                <p style={{ fontSize: 12, color: "var(--text-secondary)", margin: 0 }}>Klik tiap huruf yang sudah hafal.</p>
              </div>
              <div style={{ display: "flex", gap: 4 }}>
                <button className="nm-lvl-btn" style={{ fontSize: 12, padding: "6px 10px", ...(kanaScript === "hiragana" ? { background: "var(--sora)", color: "#fff", borderColor: "var(--sora)" } : {}) }} onClick={() => setKanaScript("hiragana")}>Hiragana</button>
                <button className="nm-lvl-btn" style={{ fontSize: 12, padding: "6px 10px", ...(kanaScript === "katakana" ? { background: "var(--sora)", color: "#fff", borderColor: "var(--sora)" } : {}) }} onClick={() => setKanaScript("katakana")}>Katakana</button>
              </div>
            </div>
            <div className="nm-card" style={{ marginBottom: 12, fontSize: 12, color: "var(--text-body)", lineHeight: 1.5 }}>
              <Tape color="var(--sora)" />
              ✍️ Ketuk hurufnya untuk memperbesar tampilannya & dengar cara bacanya.
            </div>

            <div className="nm-card" style={{ marginBottom: 12 }}>
              <p style={{ fontSize: 13, fontWeight: 700, margin: "0 0 4px" }}>Gojūon (dasar)</p>
              <p style={{ fontSize: 11.5, color: "var(--text-secondary)", margin: "0 0 10px" }}>46 huruf inti — a, i, u, e, o, ka, sa, ta, ...</p>
              <div className="nm-d-g5" style={{ display: "grid", gridTemplateColumns: "repeat(3, minmax(0,1fr))", gap: 10 }}>
                {kanaFlat.map((r, ci) => (
                  <KanaTile key={ci} tileKey={`${kanaScript}:${r}`} char={kanaTable[r]} romaji={r}
                    onOpen={() => openFlash({ kind: "kana", list: kanaFlat.map(x => ({ key: `${kanaScript}:${x}`, char: kanaTable[x], romaji: x })), index: ci })} />
                ))}
              </div>
            </div>

            {KANA_GROUPS.map(group => (
              <div key={group.id} className="nm-card" style={{ marginBottom: 12 }}>
                <p style={{ fontSize: 13, fontWeight: 700, margin: "0 0 4px" }}>{group.title}</p>
                <p style={{ fontSize: 11.5, color: "var(--text-secondary)", margin: "0 0 10px" }}>{group.desc}</p>
                <div className={`nm-d-kana-${group.id}`} style={{ display: "grid", gridTemplateColumns: "repeat(3, minmax(0,1fr))", gap: 10 }}>
                  {group.entries.map((e, i) => (
                    <KanaTile key={i} tileKey={`${kanaScript}:${group.id}:${i}`} char={kanaScript === "hiragana" ? e.h : e.k} romaji={e.r}
                      onOpen={() => openFlash({ kind: "kana", list: group.entries.map((x, j) => ({ key: `${kanaScript}:${group.id}:${j}`, char: kanaScript === "hiragana" ? x.h : x.k, romaji: x.r })), index: i })} />
                  ))}
                </div>
              </div>
            ))}
            </>
          </div>
        )}

        {tab === "tracker" && !kanaQuizActive && (
          <div>
            {trackerStep === "level" && (
              <div className="nm-d-c2" style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                {LEVELS.map((l, i) => {
                  const colors = ["sakura","sora","matcha","momiji"];
                  const col = colors[i];
                  const pct = levelProgressPct(l);
                  const watermarks = ["学","話","語","究"];
                  return (
                    <div key={l.id} className="nm-lvlcard"
                      onClick={() => selectLevel(l.id)}
                      style={{
                        "--lc": `var(--${col})`,
                        position: "relative", cursor: "pointer", overflow: "hidden",
                        borderRadius: 20, padding: "1.5rem 1.35rem",
                        background: `var(--${col})`,
                        boxShadow: `0 6px 0 rgba(0,0,0,0.14)`, color: "#fff",
                      }}>
                      <svg width="200" height="200" viewBox="0 0 200 200" aria-hidden="true" style={{ position: "absolute", right: -50, bottom: -50, pointerEvents: "none" }}>
                        {Array.from({ length: 16 }).map((_, ri) => (
                          <rect key={ri} x="98" y="0" width="4" height="100" fill="#fff" opacity="0.1"
                            transform={`rotate(${ri * 22.5} 100 100)`} />
                        ))}
                        <circle cx="100" cy="100" r="46" fill="#fff" opacity="0.14" />
                      </svg>
                      <span aria-hidden="true" className="nm-lvlmark" style={{
                        position: "absolute", right: 6, bottom: -14, fontSize: 100, fontWeight: 700,
                        fontFamily: "'Shippori Mincho', serif", color: "rgba(255,255,255,0.22)",
                        lineHeight: 1, userSelect: "none", pointerEvents: "none",
                      }}>{watermarks[i]}</span>

                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                        <div>
                          <div style={{ display: "inline-flex", alignItems: "center", justifyContent: "center",
                            width: 26, height: 26, borderRadius: "50%", border: "2px solid rgba(255,255,255,0.6)",
                            fontSize: 12, fontWeight: 700, marginBottom: 8 }}>{i + 1}</div>
                          <p className="nm-title" style={{ fontSize: 32, margin: "0 0 2px", color: "#fff", letterSpacing: "0.01em" }}>{l.label}</p>
                          <p style={{ fontSize: 13, fontWeight: 700, margin: "0 0 10px", opacity: 0.92, textTransform: "uppercase", letterSpacing: "0.04em" }}>{l.name}</p>
                        </div>
                        {pct > 0 && (
                          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", flexShrink: 0 }}>
                            <Ring pct={pct} size={44} color="#fff" />
                          </div>
                        )}
                      </div>

                      <div style={{ width: 32, height: 3, background: "rgba(255,255,255,0.5)", borderRadius: 2, margin: "2px 0 12px" }} />

                      <p style={{ fontSize: 12.5, fontStyle: "italic", margin: "0 0 16px", opacity: 0.92, maxWidth: "80%", lineHeight: 1.5 }}>
                        "{l.tagline}"
                      </p>

                      <span className="nm-lvlpill" style={{
                        display: "inline-flex", alignItems: "center", gap: 6, fontSize: 12.5, fontWeight: 700,
                        color: `var(--${col})`, background: "#fff", padding: "8px 16px", borderRadius: 999,
                      }}>
                        Mulai belajar <ChevronRight size={14} aria-hidden="true" />
                      </span>
                    </div>
                  );
                })}
              </div>
            )}

            {trackerStep === "category" && (
              <div>
                <button onClick={() => setTrackerStep("level")} style={{ display: "flex", alignItems: "center", gap: 4,
                  background: "none", border: "none", color: "var(--text-secondary)", fontFamily: "'Zen Maru Gothic', sans-serif",
                  fontSize: 12.5, fontWeight: 700, cursor: "pointer", padding: 0, marginBottom: 12 }}>
                  <ChevronRight size={14} style={{ transform: "rotate(180deg)" }} aria-hidden="true" /> Ganti level
                </button>
                <p style={{ fontSize: 13, color: "var(--text-secondary)", margin: "0 0 12px" }}>
                  Level <b className="nm-title" style={{ color: "var(--ink)" }}>{level.label}: {level.name}</b> — pilih materi yang mau dipelajari:
                </p>
                <div className="nm-d-c2" style={{ display: "grid", gridTemplateColumns: "1fr", gap: 12 }}>
                  {["kanji","vocab","grammar",...(level.reading && level.reading.length > 0 ? ["reading"] : [])].map(cat => {
                    const label = cat === "vocab" ? "Kosakata" : cat === "grammar" ? "Grammar" : cat === "reading" ? "Reading" : "Kanji";
                    const desc = cat === "vocab" ? "kosakata bertema, arti & cara baca" : cat === "grammar" ? "pola kalimat & contoh penggunaan" : cat === "reading" ? "cerita pendek & latihan pemahaman" : "cara baca on'yomi, kun'yomi & arti";
                    const { done, total } = catCount(cat);
                    const pct = catPct(cat);
                    return (
                      <div key={cat} className="nm-card nm-card-tap" style={{ cursor: "pointer", display: "flex", alignItems: "center", gap: 14 }}
                        onClick={() => selectCat(cat)}>
                        <Ring pct={pct} color="var(--matcha)" size={48} />
                        <div style={{ flex: 1 }}>
                          <p style={{ fontSize: 14, fontWeight: 700, margin: "0 0 2px" }}>{label}</p>
                          <p style={{ fontSize: 12, color: "var(--text-secondary)", margin: 0 }}>{desc} · {done}/{total} {cat === "reading" ? "dibaca" : "dikuasai"}</p>
                        </div>
                        <ChevronRight size={16} color="var(--text-secondary)" aria-hidden="true" />
                      </div>
                    );
                  })}
                </div>
                {overallPct === 100 && (
                  <div className="nm-card" style={{ marginTop: 12, background: "var(--matcha-tint)", borderColor: "var(--matcha)", fontSize: 12.5, color: "var(--ink)" }}>
                    🎉 Level {level.label} sudah 100% ditandai tuntas!
                  </div>
                )}
              </div>
            )}

            {trackerStep === "content" && (() => {
              const cat = activeCat;
              const { done, total } = catCount(cat);
              const pct = catPct(cat);
              const label = cat === "vocab" ? "Kosakata" : cat === "grammar" ? "Grammar" : cat === "reading" ? "Reading" : "Kanji";
              const { filteredItems, isPaged, totalPages } = contentView;
              const safePage = Math.min(kanjiPage, totalPages - 1);
              const pageItems = isPaged ? filteredItems.slice(safePage * KANJI_PAGE_SIZE, (safePage + 1) * KANJI_PAGE_SIZE) : filteredItems;
              return (
                <div>
                  <button onClick={() => setTrackerStep("category")} style={{ display: "flex", alignItems: "center", gap: 4,
                    background: "none", border: "none", color: "var(--text-secondary)", fontFamily: "'Zen Maru Gothic', sans-serif",
                    fontSize: 12.5, fontWeight: 700, cursor: "pointer", padding: 0, marginBottom: 12 }}>
                    <ChevronRight size={14} style={{ transform: "rotate(180deg)" }} aria-hidden="true" /> {level.label} · {label}
                  </button>
                  {cat === "reading" ? (
                    <div className="nm-card">
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 4 }}>
                        <p style={{ fontSize: 13, fontWeight: 700, margin: 0 }}>{label}</p>
                        <p style={{ fontSize: 12, color: "var(--matcha)", margin: 0, fontWeight: 700 }}>{done}/{total} · {Math.round(pct)}%</p>
                      </div>
                      <div style={{ height: 6, borderRadius: 4, background: "var(--line)", overflow: "hidden", marginBottom: 10 }}>
                        <div style={{ height: "100%", width: `${pct}%`, background: "var(--matcha)", borderRadius: 4, transition: "width 0.2s ease" }} />
                      </div>
                      <p style={{ fontSize: 12, color: "var(--text-secondary)", margin: "0 0 10px" }}>
                        📖 Ketuk judul cerita untuk membaca teks lengkapnya. Setelah selesai, ketuk lagi untuk lihat penjelasan (ringkasan, kosakata penting & catatan tata bahasa).
                      </p>
                      {filteredItems.map((item, idx) => {
                        const key = `${cat}:${item}`;
                        const on = !!checked[key];
                        const isOpen = !!expanded[key];
                        const r = READING_CONTENT[item];
                        return (
                          <div key={item} style={{ borderBottom: idx < filteredItems.length - 1 ? "1.5px dashed var(--line)" : "none", padding: "10px 0" }}>
                            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                              <span onClick={() => toggleExpand(cat, item)} style={{ display: "flex", alignItems: "center", gap: 6, flex: 1, cursor: "pointer" }}>
                                <ChevronRight size={14} color="var(--text-secondary)" aria-hidden="true"
                                  style={{ transform: isOpen ? "rotate(90deg)" : "none", transition: "transform 0.15s ease", flexShrink: 0 }} />
                                <span className="nm-title" style={{ fontSize: 14, color: on ? "var(--ink)" : "var(--text-body)" }}>{idx + 1}. {item}</span>
                              </span>
                              <span onClick={() => toggle(cat, item)} style={{ display: "flex", alignItems: "center", gap: 5, cursor: "pointer" }}>
                                {on ? <Check size={16} color="var(--matcha)" aria-hidden="true" /> : <Circle size={16} color="var(--text-muted)" aria-hidden="true" />}
                                <span style={{ fontSize: 10.5, fontWeight: 700, padding: "2px 7px", borderRadius: 999,
                                  background: on ? "var(--matcha-tint)" : "var(--line)", color: on ? "var(--matcha)" : "var(--text-secondary)" }}>
                                  {on ? "Sudah dibaca" : "Belum"}
                                </span>
                              </span>
                            </div>
                            {isOpen && r && (
                              <div style={{ marginTop: 10 }}>
                                <div style={{ background: "var(--matcha-tint)", borderRadius: 12, padding: "12px 14px", marginBottom: 10 }}>
                                  {r.text.map((line, i) => (
                                    <p key={i} style={{ margin: "0 0 6px", fontSize: 14, lineHeight: 1.9 }}>{line}</p>
                                  ))}
                                  <div style={{ marginTop: 6 }}>
                                    <SpeakBtn text={r.text.join("")} size={13} />
                                  </div>
                                </div>
                                <div style={{ background: "var(--card-bg)", border: "2px solid var(--line)", borderRadius: 12, padding: "12px 14px" }}>
                                  <p style={{ margin: "0 0 8px", fontWeight: 700, fontSize: 13 }}>📝 Penjelasan</p>
                                  <p style={{ margin: "0 0 10px", fontSize: 12.5, color: "var(--text-body)" }}>{r.ringkasan}</p>
                                  <p style={{ margin: "0 0 6px", fontWeight: 700, fontSize: 12.5 }}>Kosakata penting:</p>
                                  {r.kosakata.map((w, i) => (
                                    <div key={i} style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 12, padding: "3px 0" }}>
                                      <SpeakBtn text={w.jp} size={12} />
                                      <span><span className="nm-title" style={{ fontSize: 13 }}>{w.jp}</span> <span style={{ color: "var(--text-secondary)" }}>({w.reading})</span> — {w.arti}</span>
                                    </div>
                                  ))}
                                  <p style={{ margin: "10px 0 6px", fontWeight: 700, fontSize: 12.5 }}>Catatan tata bahasa:</p>
                                  {r.tata_bahasa.map((g, i) => (
                                    <div key={i} style={{ marginBottom: 6 }}>
                                      <p style={{ margin: "0 0 2px", fontSize: 12.5, fontWeight: 700, color: "var(--matcha)" }}>{g.pola}</p>
                                      <p style={{ margin: 0, fontSize: 12, color: "var(--text-body)" }}>{g.penjelasan}</p>
                                    </div>
                                  ))}
                                  <p style={{ fontSize: 9.5, color: "var(--text-secondary)", margin: "8px 0 0" }}>ketuk judul lagi untuk tutup</p>
                                </div>
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  ) : (
                  <>
                  {cat === "vocab" && (
                    <div className="nm-card" style={{ marginBottom: 12 }}>
                      <Tape color="var(--matcha)" />
                      <input
                        type="text" value={search} onChange={e => { setSearch(e.target.value); setKanjiPage(0); }}
                        placeholder={`🔍 Cari di ${label.toLowerCase()}...`}
                        style={{ width: "100%", border: "2px solid var(--line)", borderRadius: 12, padding: "9px 12px",
                          fontFamily: "'Zen Maru Gothic', sans-serif", fontSize: 13.5, color: "var(--ink)", outline: "none", boxSizing: "border-box" }}
                      />
                    </div>
                  )}
                  <div className="nm-card" style={{ marginBottom: 12, fontSize: 12, color: "var(--text-body)", lineHeight: 1.5 }}>
                    💡 Klik teks item untuk buka pembahasan lengkapnya. Klik ikon centang di kanan untuk tandai sudah dikuasai.
                  </div>
                  {cat === "kanji" && levelId !== "n5" && levelId !== "n2n1" && (
                    <div className="nm-card" style={{ marginBottom: 12, fontSize: 12, color: "var(--text-body)", lineHeight: 1.6 }}>
                      <Tape color="var(--matcha)" />
                      🔁 Kanji di sini sudah <b>digabung dengan kanji dari level sebelumnya</b> — jadi kamu otomatis mengulang yang lama sambil belajar yang baru, biar makin cepat hafal.
                    </div>
                  )}
                  {cat === "vocab" && levelId !== "n5" && levelId !== "n2n1" && (
                    <div className="nm-card" style={{ marginBottom: 12, fontSize: 12, color: "var(--text-body)", lineHeight: 1.6 }}>
                      <Tape color="var(--matcha)" />
                      🔁 Kosakata di sini sudah <b>digabung dengan kosakata dari level sebelumnya</b> — jadi kamu otomatis mengulang yang lama sambil belajar yang baru, biar makin cepat hafal.
                    </div>
                  )}
                  {cat === "grammar" && (
                    <div className="nm-card" style={{ marginBottom: 12 }}>
                      <Tape color="var(--momiji)" />
                      <p onClick={() => setShowParticles(s => !s)} style={{ display: "flex", alignItems: "center", gap: 6,
                        fontSize: 13.5, fontWeight: 700, margin: 0, cursor: "pointer" }}>
                        <ChevronRight size={14} color="var(--text-secondary)" aria-hidden="true"
                          style={{ transform: showParticles ? "rotate(90deg)" : "none", transition: "transform 0.15s ease" }} />
                        📌 Referensi tanda partikel ({PARTICLES.filter(pt => pt.level === levelId).slice(0, 5).map(pt => pt.p).join("・")} dll)
                      </p>
                      {showParticles && (() => {
                        const visibleParticles = PARTICLES.filter(pt => pt.level === levelId);
                        return (
                        <div style={{ marginTop: 10 }}>
                          <p style={{ fontSize: 12, color: "var(--text-secondary)", margin: "0 0 10px" }}>
                            Partikel adalah huruf kecil setelah kata yang menentukan perannya dalam kalimat (subjek, objek, arah, dll). Ini partikel level <b>{level.label}</b>:
                          </p>
                          {visibleParticles.map((pt, i) => (
                            <div key={i} style={{ borderBottom: i < visibleParticles.length - 1 ? "1.5px dashed var(--line)" : "none", padding: "8px 0" }}>
                              <p style={{ margin: "0 0 3px" }}>
                                <span className="nm-title" style={{ fontSize: 16, color: "var(--momiji)" }}>{pt.p}</span>{" "}
                                <span style={{ fontWeight: 700, fontSize: 12.5 }}>— {pt.nama}</span>
                              </p>
                              <p style={{ margin: "0 0 3px", fontSize: 12.5, color: "var(--text-body)" }}>{pt.penjelasan}</p>
                              <p style={{ margin: 0, fontSize: 12, color: "var(--text-secondary)", fontStyle: "italic" }}>{pt.contoh}</p>
                            </div>
                          ))}
                        </div>
                        );
                      })()}
                    </div>
                  )}
                  <div className="nm-card">
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 4 }}>
                      <p style={{ fontSize: 13, fontWeight: 700, margin: 0 }}>{label}</p>
                      <p style={{ fontSize: 12, color: "var(--matcha)", margin: 0, fontWeight: 700 }}>{done}/{total} · {Math.round(pct)}%</p>
                    </div>
                    <div style={{ height: 6, borderRadius: 4, background: "var(--line)", overflow: "hidden", marginBottom: 8 }}>
                      <div style={{ height: "100%", width: `${pct}%`, background: "var(--matcha)", borderRadius: 4, transition: "width 0.2s ease" }} />
                    </div>
                    {pageItems.length === 0 && (
                      <p style={{ fontSize: 12.5, color: "var(--text-secondary)", padding: "8px 0" }}>Tidak ada hasil untuk "{search}".</p>
                    )}
                    {cat === "kanji" ? (
                      <div className="nm-d-g6" style={{ display: "grid", gridTemplateColumns: "repeat(3, minmax(0,1fr))", gap: 10 }}>
                        {pageItems.map(item => {
                          const key = `${cat}:${item}`;
                          const on = !!checked[key];
                          const isOpen = !!expanded[key];
                          const k = KANJI_CONTENT[item];
                          return (
                            <div key={item} onClick={() => openFlash({ kind: "kanji", cat, list: filteredItems, index: Math.max(0, filteredItems.indexOf(item)) })}
                              style={{ position: "relative", background: on ? "var(--matcha-tint)" : "var(--card-bg)",
                                border: `2px solid ${on ? "var(--matcha)" : "var(--line)"}`, borderRadius: 16,
                                padding: "10px 8px", cursor: "pointer", minHeight: isOpen ? "auto" : 92,
                                display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
                                textAlign: "center", gap: 4 }}>
                              <span onClick={(e) => { e.stopPropagation(); toggle(cat, item); }}
                                style={{ position: "absolute", top: 6, right: 6, cursor: "pointer" }}>
                                {on ? <Check size={15} color="var(--matcha)" aria-hidden="true" /> : <Circle size={15} color="var(--text-muted)" aria-hidden="true" />}
                              </span>
                              {!isOpen ? (
                                <>
                                  <span className="nm-title" style={{ fontSize: 34 }}>{item}</span>
                                  <span style={{ fontSize: 10, color: "var(--text-secondary)" }}>ketuk untuk lihat</span>
                                </>
                              ) : (
                                <div style={{ width: "100%", textAlign: "left" }}>
                                  <div style={{ display: "flex", justifyContent: "center", marginBottom: 4 }}>
                                    <StrokeSvg char={item} folder="svgsJa" size={100} />
                                  </div>
                                  <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8, marginBottom: 6 }}>
                                    <span className="nm-title" style={{ fontSize: 30 }}>{item}</span>
                                    <SpeakBtn text={item} size={14} />
                                  </div>
                                  <p style={{ fontSize: 11, margin: "0 0 3px" }}><b>On:</b> {k.on}</p>
                                  <p style={{ fontSize: 11, margin: "0 0 3px" }}><b>Kun:</b> {k.kun}</p>
                                  <p style={{ fontSize: 11, margin: "0 0 6px", color: "var(--text-body)" }}>Arti: <b style={{ color: "var(--ink)" }}>{k.arti}</b></p>
                                  {k.kombinasi && k.kombinasi.length > 0 && k.kombinasi.map((c, i) => (
                                    <div key={i} style={{ display: "flex", alignItems: "center", gap: 5, marginBottom: 3 }}>
                                      <SpeakBtn text={c.word} size={11} />
                                      <span style={{ fontSize: 10.5 }}>
                                        <span className="nm-title" style={{ fontSize: 12 }}>{c.word}</span> ({c.reading}) = {c.arti}
                                      </span>
                                    </div>
                                  ))}
                                  <p style={{ fontSize: 9.5, color: "var(--text-secondary)", margin: "6px 0 0", textAlign: "center" }}>ketuk lagi untuk tutup</p>
                                </div>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    ) : (
                    <>
                    {pageItems.map(item => {
                      const key = `${cat}:${item}`;
                      const on = !!checked[key];
                      const hasContent = cat === "grammar" ? !!GRAMMAR_CONTENT[item] : cat === "vocab" ? !!VOCAB_CONTENT[item] : cat === "kanji" ? !!KANJI_CONTENT[item] : false;
                      const isOpen = !!expanded[key];
                      const g = cat === "grammar" ? GRAMMAR_CONTENT[item] : null;
                      const v = cat === "vocab" ? VOCAB_CONTENT[item] : null;
                      const k = cat === "kanji" ? KANJI_CONTENT[item] : null;
                      return (
                        <div key={item} style={{ borderBottom: "1.5px dashed var(--line)" }}>
                          <div className="nm-item" style={{ borderBottom: "none" }}>
                            {hasContent ? (
                              <span onClick={() => toggleExpand(cat, item)} style={{ display: "flex", alignItems: "center", gap: 6, flex: 1, cursor: "pointer" }}>
                                <ChevronRight size={14} color="var(--text-secondary)" aria-hidden="true"
                                  style={{ transform: isOpen ? "rotate(90deg)" : "none", transition: "transform 0.15s ease", flexShrink: 0 }} />
                                <span style={{ color: on ? "var(--ink)" : "var(--text-secondary)" }}>{item}</span>
                              </span>
                            ) : (
                              <span style={{ flex: 1, color: on ? "var(--ink)" : "var(--text-secondary)" }}>{item}</span>
                            )}
                            {cat === "kanji" && <SpeakBtn text={item} size={13} />}
                            <span onClick={() => toggle(cat, item)} style={{ display: "flex", alignItems: "center", gap: 5, cursor: "pointer" }}>
                              {on ? <Check size={16} color="var(--matcha)" aria-hidden="true" /> : <Circle size={16} color="var(--text-muted)" aria-hidden="true" />}
                              <span style={{ fontSize: 10.5, fontWeight: 700, padding: "2px 7px", borderRadius: 999,
                                background: on ? "var(--matcha-tint)" : "var(--line)", color: on ? "var(--matcha)" : "var(--text-secondary)" }}>
                                {on ? "Sudah" : "Belum"}
                              </span>
                            </span>
                          </div>
                          {isOpen && g && (
                            <div style={{ background: "var(--matcha-tint)", borderRadius: 12, padding: "10px 12px", margin: "0 0 10px", fontSize: 12.5 }}>
                              <p style={{ margin: "0 0 6px", fontWeight: 700 }}>{g.arti}</p>
                              <p style={{ margin: "0 0 8px", color: "var(--text-body)" }}>{g.penjelasan}</p>
                              {g.contoh.map((c, i) => (
                                <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: 8, marginBottom: 6 }}>
                                  <SpeakBtn text={c.jp} />
                                  <p style={{ margin: 0 }}>
                                    <span className="nm-title" style={{ fontSize: 13.5 }}>{c.jp}</span><br />
                                    <span style={{ fontStyle: "italic", color: "var(--text-body)" }}>{c.romaji}</span> — {c.id}
                                  </p>
                                </div>
                              ))}
                            </div>
                          )}
                          {isOpen && v && (
                            <div style={{ background: "var(--matcha-tint)", borderRadius: 12, padding: "10px 12px", margin: "0 0 10px" }}>
                              <VocabFlashcards words={v} />
                            </div>
                          )}
                          {isOpen && k && (
                            <div style={{ background: "var(--matcha-tint)", borderRadius: 12, padding: "10px 12px", margin: "0 0 10px", fontSize: 12.5 }}>
                              <div style={{ display: "flex", justifyContent: "center", marginBottom: 8 }}>
                                <StrokeSvg char={item} folder="svgsJa" size={100} />
                              </div>
                              <div style={{ display: "flex", gap: 16, marginBottom: 8, alignItems: "center" }}>
                                <span><b>On:</b> {k.on}</span>
                                <span><b>Kun:</b> {k.kun}</span>
                              </div>
                              <p style={{ margin: "0 0 8px", color: "var(--text-body)" }}>Arti dasar huruf ini: <b style={{ color: "var(--ink)" }}>{k.arti}</b></p>
                              {k.kombinasi && k.kombinasi.length > 0 && (
                                <>
                                  <p style={{ margin: "0 0 6px", fontWeight: 700 }}>Contoh kata gabungan:</p>
                                  {k.kombinasi.map((c, i) => (
                                    <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: 8, marginBottom: 6 }}>
                                      <SpeakBtn text={c.word} size={13} />
                                      <p style={{ margin: 0, lineHeight: 1.5 }}>
                                        <span className="nm-title" style={{ fontSize: 14 }}>{c.word}</span>{" "}
                                        <span style={{ color: "var(--text-secondary)" }}>({c.reading})</span> = <b>{c.arti}</b>
                                        <br />
                                        <span style={{ fontSize: 11.5, color: "var(--text-secondary)" }}>
                                          ↳ tersusun dari {c.word.split("").map((ch, j) => (
                                            <span key={j}>{ch}{j < c.word.length - 1 ? " + " : ""}</span>
                                          ))} — huruf <b>{item}</b> di sini ikut membentuk arti "{c.arti}".
                                        </span>
                                      </p>
                                    </div>
                                  ))}
                                </>
                              )}
                            </div>
                          )}
                        </div>
                      );
                    })}
                    </>
                    )}
                    {isPaged && totalPages > 1 && (
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 10, paddingTop: 10, borderTop: "1.5px dashed var(--line)" }}>
                        <button onClick={() => setKanjiPage(p => Math.max(0, p - 1))} disabled={safePage === 0}
                          style={{ background: safePage === 0 ? "var(--line)" : "var(--matcha)", color: "#fff", border: "none",
                            borderRadius: 10, padding: "6px 12px", fontFamily: "'Zen Maru Gothic', sans-serif", fontWeight: 700,
                            fontSize: 12, cursor: safePage === 0 ? "default" : "pointer" }}>← Sebelumnya</button>
                        <span style={{ fontSize: 12, color: "var(--text-secondary)" }}>Halaman {safePage + 1} dari {totalPages}</span>
                        <button onClick={() => setKanjiPage(p => Math.min(totalPages - 1, p + 1))} disabled={safePage >= totalPages - 1}
                          style={{ background: safePage >= totalPages - 1 ? "var(--line)" : "var(--matcha)", color: "#fff", border: "none",
                            borderRadius: 10, padding: "6px 12px", fontFamily: "'Zen Maru Gothic', sans-serif", fontWeight: 700,
                            fontSize: 12, cursor: safePage >= totalPages - 1 ? "default" : "pointer" }}>Berikutnya →</button>
                      </div>
                    )}
                  </div>
                  </>
                  )}
                </div>
              );
            })()}
          </div>
        )}

        {tab === "rutinitas" && !kanaQuizActive && (() => {
          const allChecked = Object.entries(checked).filter(([k, v]) => v);
          const kanjiDone = allChecked.filter(([k]) => k.startsWith("kanji:")).length;
          const vocabDone = allChecked.filter(([k]) => k.startsWith("vocab:")).length;
          const grammarDone = allChecked.filter(([k]) => k.startsWith("grammar:")).length;
          const totalDone = allChecked.length;

          const { y, m } = calendarMonth;
          const firstDay = new Date(y, m, 1);
          const startWeekday = firstDay.getDay();
          const daysInMonth = new Date(y, m + 1, 0).getDate();
          const monthNames = ["Januari","Februari","Maret","April","Mei","Juni","Juli","Agustus","September","Oktober","November","Desember"];
          const cells = [];
          for (let i = 0; i < startWeekday; i++) cells.push(null);
          for (let d = 1; d <= daysInMonth; d++) cells.push(d);
          const dateKey = (d) => `${y}-${String(m+1).padStart(2,"0")}-${String(d).padStart(2,"0")}`;
          const todayK = todayStr();

          const todayDaily = dailyLog[todayK] || {};

          return (
          <div className="nm-d-masonry">
            <div className="nm-card nm-t-rut" style={{ marginBottom: 12 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 10, marginBottom: 14 }}>
                <p style={{ fontSize: 18, fontWeight: 700, margin: 0, color: "var(--ink)" }}>Rutinitas hari ini</p>
                <span aria-label={`Streak ${streak} hari`} style={{
                  display: "inline-flex", alignItems: "center", gap: 5, flex: "none",
                  background: "var(--momiji-tint)", border: "1.5px solid var(--momiji)", borderRadius: 999,
                  padding: "4px 12px", fontSize: 13, fontWeight: 700, color: "var(--ink)",
                }}>🔥 Streak</span>
              </div>
              {DAILY_TASKS.map(t => {
                const on = !!todayDaily[t.id];
                return (
                  <button key={t.id} role="checkbox" aria-checked={on} onClick={() => toggleDaily(t.id)}
                    style={{
                      display: "flex", alignItems: "center", gap: 12, width: "100%", textAlign: "left",
                      padding: "12px 14px", marginBottom: 10, borderRadius: 12, cursor: "pointer",
                      border: "1.5px solid var(--line)", background: "var(--paper)",
                      fontFamily: "inherit", color: "inherit",
                    }}>
                    <span style={{
                      width: 26, height: 26, borderRadius: 7, flex: "none", display: "flex", alignItems: "center", justifyContent: "center",
                      background: on ? "var(--matcha)" : "var(--card-bg)",
                      border: on ? "1.5px solid var(--matcha)" : "1.5px solid var(--line)",
                    }}>
                      {on && <Check size={15} color="#FFFFFF" aria-hidden="true" />}
                    </span>
                    <span style={{
                      flex: 1, fontSize: 16, fontWeight: 600,
                      color: on ? "var(--text-secondary)" : "var(--ink)",
                      textDecoration: on ? "line-through" : "none",
                    }}>{t.label}</span>
                    <span style={{ fontSize: 13, color: "var(--text-secondary)" }}>{t.minutes} menit</span>
                  </button>
                );
              })}
            </div>

            <div className="nm-card nm-t-stat" style={{ marginBottom: 12 }}>
              <Tape color="var(--yuzu)" />
              <p style={{ fontSize: 14, fontWeight: 700, margin: "0 0 12px" }}>📊 Statistik keseluruhan</p>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(2, minmax(0,1fr))", gap: 10 }}>
                <div style={{ background: "var(--yuzu-tint)", borderRadius: 12, padding: "10px 12px", textAlign: "center" }}>
                  <p style={{ fontSize: 22, fontWeight: 700, margin: 0, color: "var(--yuzu)" }}>{totalDone}</p>
                  <p style={{ fontSize: 11, color: "var(--text-secondary)", margin: "2px 0 0" }}>Total dikuasai</p>
                </div>
                <div style={{ background: "var(--matcha-tint)", borderRadius: 12, padding: "10px 12px", textAlign: "center" }}>
                  <p style={{ fontSize: 22, fontWeight: 700, margin: 0, color: "var(--matcha)" }}>{kanjiDone}</p>
                  <p style={{ fontSize: 11, color: "var(--text-secondary)", margin: "2px 0 0" }}>Kanji</p>
                </div>
                <div style={{ background: "var(--sora-tint)", borderRadius: 12, padding: "10px 12px", textAlign: "center" }}>
                  <p style={{ fontSize: 22, fontWeight: 700, margin: 0, color: "var(--sora)" }}>{vocabDone}</p>
                  <p style={{ fontSize: 11, color: "var(--text-secondary)", margin: "2px 0 0" }}>Kosakata</p>
                </div>
                <div style={{ background: "var(--momiji-tint)", borderRadius: 12, padding: "10px 12px", textAlign: "center" }}>
                  <p style={{ fontSize: 22, fontWeight: 700, margin: 0, color: "var(--momiji)" }}>{grammarDone}</p>
                  <p style={{ fontSize: 11, color: "var(--text-secondary)", margin: "2px 0 0" }}>Grammar</p>
                </div>
              </div>
              <p style={{ fontSize: 11, color: "var(--text-secondary)", margin: "10px 0 0", display: "flex", alignItems: "center", gap: 4 }}>
                <Flame size={13} color="var(--yuzu)" aria-hidden="true" /> Streak belajar: {streak} hari berturut-turut
              </p>
            </div>

            <div className="nm-card nm-t-cal" style={{ marginBottom: 12 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
                <button onClick={() => setCalendarMonth(p => p.m === 0 ? { y: p.y - 1, m: 11 } : { y: p.y, m: p.m - 1 })}
                  style={{ background: "none", border: "none", cursor: "pointer", padding: 4 }}>
                  <ChevronRight size={16} style={{ transform: "rotate(180deg)" }} aria-hidden="true" />
                </button>
                <p style={{ fontSize: 14, fontWeight: 700, margin: 0 }}>{monthNames[m]} {y}</p>
                <button onClick={() => setCalendarMonth(p => p.m === 11 ? { y: p.y + 1, m: 0 } : { y: p.y, m: p.m + 1 })}
                  style={{ background: "none", border: "none", cursor: "pointer", padding: 4 }}>
                  <ChevronRight size={16} aria-hidden="true" />
                </button>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(7, minmax(0,1fr))", gap: 4, marginBottom: 6 }}>
                {["M","S","S","R","K","J","S"].map((d,i) => (
                  <p key={i} style={{ fontSize: 10, color: "var(--text-secondary)", textAlign: "center", margin: 0 }}>{d}</p>
                ))}
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(7, minmax(0,1fr))", gap: 4 }}>
                {cells.map((d, i) => {
                  if (!d) return <div key={i} />;
                  const dk = dateKey(d);
                  const hasActivity = !!(activityLog[dk] && activityLog[dk].length > 0);
                  const isToday = dk === todayK;
                  return (
                    <div key={i} onClick={() => setSelectedDate(dk)}
                      style={{
                        aspectRatio: "1", display: "flex", alignItems: "center", justifyContent: "center",
                        borderRadius: 10, fontSize: 12, cursor: "pointer",
                        background: hasActivity ? "var(--yuzu)" : "var(--line)",
                        color: hasActivity ? "var(--card-bg)" : "var(--text-secondary)", fontWeight: hasActivity || isToday ? 700 : 400,
                        border: isToday ? "2px solid var(--momiji)" : "none",
                      }}>
                      {d}
                    </div>
                  );
                })}
              </div>
              <p style={{ fontSize: 11, color: "var(--text-secondary)", margin: "10px 0 0" }}>💡 Tanggal berwarna kuning = ada aktivitas belajar. Klik untuk lihat detailnya.</p>
              {selectedDate && (
                <div style={{ marginTop: 10, background: "var(--yuzu-tint)", borderRadius: 12, padding: "10px 12px" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6 }}>
                    <p style={{ fontSize: 12.5, fontWeight: 700, margin: 0 }}>{selectedDate}</p>
                    <button onClick={() => setSelectedDate(null)} style={{ background: "none", border: "none", cursor: "pointer", fontSize: 12, color: "var(--text-secondary)" }}>✕ tutup</button>
                  </div>
                  {(activityLog[selectedDate] || []).length > 0 ? (
                    (activityLog[selectedDate] || []).map((label, i) => (
                      <p key={i} style={{ fontSize: 12, margin: "0 0 4px", display: "flex", alignItems: "center", gap: 6 }}>
                        <Check size={13} color="var(--yuzu)" aria-hidden="true" /> {label}
                      </p>
                    ))
                  ) : (
                    <p style={{ fontSize: 12, color: "var(--text-secondary)", margin: 0 }}>Belum ada aktivitas belajar tercatat di tanggal ini.</p>
                  )}
                </div>
              )}
            </div>

            <div className="nm-card nm-t-lvl" style={{ marginBottom: 12 }}>
              <p style={{ fontSize: 14, fontWeight: 700, margin: "0 0 4px" }}>Progres tiap level</p>
              <p style={{ fontSize: 11, color: "var(--text-secondary)", margin: "0 0 10px" }}>Rata-rata kanji + kosakata + grammar yang sudah dikuasai.</p>
              {LEVELS.map((lvl, i) => {
                const colors = ["sakura","sora","matcha","momiji"];
                const col = colors[i] || "yuzu";
                let done = 0, total = 0;
                ["kanji","vocab","grammar"].forEach(cat => {
                  const items = lvl[cat] || [];
                  total += items.length;
                  done += items.filter(it => checked[`${cat}:${it}`]).length;
                });
                const pct = total ? Math.round((done / total) * 100) : 0;
                return (
                  <div key={lvl.id} style={{ marginBottom: 10 }}>
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 3 }}>
                      <span style={{ fontSize: 12, fontWeight: 700 }}>{lvl.label}</span>
                      <span style={{ fontSize: 11, color: `var(--${col})`, fontWeight: 700 }}>{pct}%</span>
                    </div>
                    <div style={{ height: 6, borderRadius: 4, background: "var(--line)", overflow: "hidden" }}>
                      <div style={{ height: "100%", width: `${pct}%`, background: `var(--${col})`, borderRadius: 4, transition: "width 0.2s ease" }} />
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="nm-card nm-t-streak" style={{ marginBottom: 12, display: "flex", gap: 10 }}>
              <div style={{ flex: 1, textAlign: "center", background: "var(--yuzu-tint)", borderRadius: 12, padding: "10px 6px" }}>
                <p style={{ fontSize: 20, fontWeight: 700, margin: 0, color: "var(--yuzu)" }}>{streak}</p>
                <p style={{ fontSize: 10.5, color: "var(--text-secondary)", margin: "2px 0 0" }}>Streak saat ini</p>
              </div>
              <div style={{ flex: 1, textAlign: "center", background: "var(--matcha-tint)", borderRadius: 12, padding: "10px 6px" }}>
                <p style={{ fontSize: 20, fontWeight: 700, margin: 0, color: "var(--matcha)" }}>{Object.keys(activityLog).length}</p>
                <p style={{ fontSize: 10.5, color: "var(--text-secondary)", margin: "2px 0 0" }}>Total hari belajar</p>
              </div>
            </div>

            <div className="nm-card nm-t-goal">
              <p style={{ fontSize: 14, fontWeight: 700, margin: "0 0 10px" }}>Target minggu ini</p>
              <div style={{ display: "flex", gap: 6, marginBottom: 10 }}>
                <input type="text" value={newGoalText} onChange={e => setNewGoalText(e.target.value)}
                  onKeyDown={e => { if (e.key === "Enter") addWeeklyGoal(); }}
                  placeholder="Tulis target belajarmu..."
                  style={{ flex: 1, padding: "9px 12px", borderRadius: 10, border: "2px solid var(--line)", fontSize: 13, fontFamily: "inherit", background: "var(--card-bg)", color: "var(--ink)" }} />
                <button onClick={addWeeklyGoal}
                  style={{ padding: "9px 16px", borderRadius: 10, border: "none", background: "var(--yuzu)", color: "#fff", fontWeight: 700, fontSize: 13, cursor: "pointer", whiteSpace: "nowrap" }}>
                  + Tambah
                </button>
              </div>
              {weeklyGoals.length === 0 ? (
                <p style={{ fontSize: 12, color: "var(--text-secondary)", margin: 0 }}>Belum ada target minggu ini. Tulis targetmu sendiri di atas, misalnya "hafal 30 kosakata baru".</p>
              ) : (
                weeklyGoals.map(g => (
                  <div key={g.id} className="nm-item" style={{ justifyContent: "space-between" }}>
                    <span onClick={() => completeWeeklyGoal(g.id)} style={{ display: "flex", alignItems: "center", gap: 8, flex: 1, cursor: "pointer" }}>
                      <Circle size={16} color="var(--text-muted)" aria-hidden="true" />
                      <span style={{ color: "var(--text-secondary)" }}>{g.text}</span>
                    </span>
                    <button onClick={() => removeWeeklyGoal(g.id)} aria-label="Hapus target"
                      style={{ background: "none", border: "none", color: "var(--text-muted)", cursor: "pointer", fontSize: 15, padding: "2px 4px" }}>✕</button>
                  </div>
                ))
              )}
              {weeklyHistory.length > 0 && (() => {
                const weekKeyOf = (dateStr) => {
                  const d = new Date(dateStr);
                  const day = d.getDay();
                  const monday = new Date(d); monday.setDate(d.getDate() - ((day + 6) % 7));
                  return monday.toISOString().slice(0, 10);
                };
                const fmt = (dateStr) => {
                  const x = new Date(dateStr);
                  return `${x.getDate()} ${["Jan","Feb","Mar","Apr","Mei","Jun","Jul","Agu","Sep","Okt","Nov","Des"][x.getMonth()]}`;
                };
                const groups = {};
                weeklyHistory.forEach(h => {
                  const wk = weekKeyOf(h.completedAt);
                  if (!groups[wk]) groups[wk] = [];
                  groups[wk].push(h);
                });
                const weekKeys = Object.keys(groups).sort();
                const activeIdx = historyWeekIdx === null ? weekKeys.length - 1 : historyWeekIdx;
                const activeKey = weekKeys[activeIdx];
                const sundayOf = (mondayStr) => { const d = new Date(mondayStr); d.setDate(d.getDate() + 6); return d.toISOString().slice(0,10); };
                return (
                  <div style={{ marginTop: 14, paddingTop: 12, borderTop: "2px solid var(--line)" }}>
                    <p style={{ fontSize: 12.5, fontWeight: 700, margin: "0 0 8px", color: "var(--text-secondary)" }}>📜 Riwayat target selesai</p>
                    <div style={{ display: "flex", gap: 6, marginBottom: 10, overflowX: "auto", paddingBottom: 2 }}>
                      {weekKeys.map((wk, i) => (
                        <button key={wk} onClick={() => setHistoryWeekIdx(i)}
                          style={{
                            flexShrink: 0, fontSize: 11.5, fontWeight: 700, padding: "6px 12px", borderRadius: 999,
                            border: "2px solid var(--line)", cursor: "pointer", whiteSpace: "nowrap",
                            background: i === activeIdx ? "var(--yuzu)" : "var(--card-bg)",
                            color: i === activeIdx ? "var(--card-bg)" : "var(--ink)",
                            borderColor: i === activeIdx ? "var(--yuzu)" : "var(--line)",
                          }}>
                          Minggu {i + 1}
                        </button>
                      ))}
                    </div>
                    {activeKey && (
                      <>
                        <p style={{ fontSize: 11, color: "var(--text-secondary)", margin: "0 0 8px" }}>{fmt(activeKey)} - {fmt(sundayOf(activeKey))}</p>
                        {groups[activeKey].map(h => (
                          <div key={h.id} className="nm-item" style={{ cursor: "default" }}>
                            <Check size={16} color="var(--yuzu)" aria-hidden="true" />
                            <span style={{ flex: 1, color: "var(--ink)", textDecoration: "line-through" }}>{h.text}</span>
                            <span style={{ fontSize: 10.5, color: "var(--text-secondary)" }}>{h.completedAt}</span>
                          </div>
                        ))}
                      </>
                    )}
                  </div>
                );
              })()}
            </div>
          </div>
          );
        })()}

        {tab === "latihan" && !kanaQuizActive && (() => {
          const sections = [
            { id: "kosakata", label: "語彙", sub: "Kosakata", desc: "Cara baca kosakata", icon: Book },
            { id: "kanji", label: "漢字", sub: "Kanji", desc: "Kanji dalam kalimat", icon: BookOpen },
            { id: "grammar", label: "文法", sub: "Grammar", desc: "Pola tata bahasa", icon: PenLine },
            // { id: "choukai", label: "聴解", sub: "Choukai", desc: "Dengar dialog, lalu jawab", icon: Volume2 }, // nonaktif sementara
          ];

          if (!latihanMode) {
            return (
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                <p style={{ fontSize: 12.5, color: "var(--text-secondary)", margin: "0 0 4px" }}>Mau latihan yang mana?</p>
                <div className="nm-card nm-card-tap" style={{ cursor: "pointer", display: "flex", alignItems: "center", gap: 12 }}
                  onClick={() => { setKanaScript("hiragana"); setKanaQuizActive(true); }}>
                  <div style={{ width: 40, height: 40, borderRadius: 12, background: "var(--sora-tint)", display: "flex",
                    alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    <PenLine size={18} color="var(--sora)" aria-hidden="true" />
                  </div>
                  <div style={{ flex: 1 }}>
                    <p style={{ fontSize: 14, fontWeight: 700, margin: 0 }}>✍️ Kuis Hiragana</p>
                    <p style={{ fontSize: 11.5, color: "var(--text-secondary)", margin: "2px 0 0" }}>Uji cara baca & tulisnya</p>
                  </div>
                  <ChevronRight size={16} color="var(--text-secondary)" aria-hidden="true" />
                </div>
                <div className="nm-card nm-card-tap" style={{ cursor: "pointer", display: "flex", alignItems: "center", gap: 12 }}
                  onClick={() => { setKanaScript("katakana"); setKanaQuizActive(true); }}>
                  <div style={{ width: 40, height: 40, borderRadius: 12, background: "var(--sora-tint)", display: "flex",
                    alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    <PenLine size={18} color="var(--sora)" aria-hidden="true" />
                  </div>
                  <div style={{ flex: 1 }}>
                    <p style={{ fontSize: 14, fontWeight: 700, margin: 0 }}>✍️ Kuis Katakana</p>
                    <p style={{ fontSize: 11.5, color: "var(--text-secondary)", margin: "2px 0 0" }}>Uji cara baca & tulisnya</p>
                  </div>
                  <ChevronRight size={16} color="var(--text-secondary)" aria-hidden="true" />
                </div>
                <div className="nm-card nm-card-tap" style={{ cursor: "pointer", display: "flex", alignItems: "center", gap: 12 }}
                  onClick={() => setLatihanMode("matching")}>
                  <div style={{ width: 40, height: 40, borderRadius: 12, background: "var(--yuzu-tint)", display: "flex",
                    alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    <Link2 size={18} color="var(--yuzu)" aria-hidden="true" />
                  </div>
                  <div style={{ flex: 1 }}>
                    <p style={{ fontSize: 14, fontWeight: 700, margin: 0 }}>🧩 Kuis Pencocokan Kanji & Kosakata</p>
                    <p style={{ fontSize: 11.5, color: "var(--text-secondary)", margin: "2px 0 0" }}>Tarik garis, cocokkan kanji/kata dengan artinya</p>
                  </div>
                  <ChevronRight size={16} color="var(--text-secondary)" aria-hidden="true" />
                </div>
                <div className="nm-card nm-card-tap" style={{ cursor: "pointer", display: "flex", alignItems: "center", gap: 12 }}
                  onClick={() => setLatihanMode("writing")}>
                  <div style={{ width: 40, height: 40, borderRadius: 12, background: "var(--sakura-tint)", display: "flex",
                    alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    <PenLine size={18} color="var(--sakura)" aria-hidden="true" />
                  </div>
                  <div style={{ flex: 1 }}>
                    <p style={{ fontSize: 14, fontWeight: 700, margin: 0 }}>🖌️ Latihan Menulis</p>
                    <p style={{ fontSize: 11.5, color: "var(--text-secondary)", margin: "2px 0 0" }}>Tulis hiragana, katakana & kanji sesuai urutan goresan</p>
                  </div>
                  <ChevronRight size={16} color="var(--text-secondary)" aria-hidden="true" />
                </div>
                <div className="nm-card nm-card-tap" style={{ cursor: "pointer", display: "flex", alignItems: "center", gap: 12 }}
                  onClick={() => setLatihanMode("pengulangan")}>
                  <div style={{ width: 40, height: 40, borderRadius: 12, background: "var(--matcha-tint)", display: "flex",
                    alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    <PenLine size={18} color="var(--matcha)" aria-hidden="true" />
                  </div>
                  <div style={{ flex: 1 }}>
                    <p style={{ fontSize: 14, fontWeight: 700, margin: 0 }}>🔁 Latihan Pengulangan Materi</p>
                    <p style={{ fontSize: 11.5, color: "var(--text-secondary)", margin: "2px 0 0" }}>Ulang kosakata, kanji & grammar yang sudah dipelajari</p>
                  </div>
                  <ChevronRight size={16} color="var(--text-secondary)" aria-hidden="true" />
                </div>
                <div className="nm-card nm-card-tap" style={{ cursor: "pointer", display: "flex", alignItems: "center", gap: 12 }}
                  onClick={() => setLatihanMode("susun")}>
                  <div style={{ width: 40, height: 40, borderRadius: 12, background: "var(--momiji-tint)", display: "flex",
                    alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    <ListChecks size={18} color="var(--momiji)" aria-hidden="true" />
                  </div>
                  <div style={{ flex: 1 }}>
                    <p style={{ fontSize: 14, fontWeight: 700, margin: 0 }}>🎮 Susun Kata</p>
                    <p style={{ fontSize: 11.5, color: "var(--text-secondary)", margin: "2px 0 0" }}>Game: susun potongan kata jadi kalimat yang benar</p>
                  </div>
                  <ChevronRight size={16} color="var(--text-secondary)" aria-hidden="true" />
                </div>
                {UJIAN_CATEGORIES.map(cat => {
                  const catUi = {
                    mojigoi: { emoji: "🔤", tint: "sakura", Icon: PenLine },
                    dokkai: { emoji: "📖", tint: "sora", Icon: BookOpen },
                    choukai: { emoji: "🎧", tint: "matcha", Icon: Volume2 },
                  }[cat.id];
                  return (
                    <div key={cat.id} className="nm-card nm-card-tap" style={{ cursor: "pointer", display: "flex", alignItems: "center", gap: 12 }}
                      onClick={() => { setUjianCategory(cat.id); setUjianLevel(null); setUjianYear(null); setLatihanMode("ujian"); }}>
                      <div style={{ width: 40, height: 40, borderRadius: 12, background: `var(--${catUi.tint}-tint)`, display: "flex",
                        alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                        <catUi.Icon size={18} color={`var(--${catUi.tint})`} aria-hidden="true" />
                      </div>
                      <div style={{ flex: 1 }}>
                        <p style={{ fontSize: 14, fontWeight: 700, margin: 0 }}>{catUi.emoji} {cat.title}</p>
                        <p style={{ fontSize: 11.5, color: "var(--text-secondary)", margin: "2px 0 0" }}>{cat.sub}</p>
                      </div>
                      <ChevronRight size={16} color="var(--text-secondary)" aria-hidden="true" />
                    </div>
                  );
                })}
              </div>
            );
          }

          if (latihanMode === "writing") {
            const backToMenu = () => { setLatihanMode(null); exitWriting(); };
            if (typeof WRITING_STROKES === "undefined") {
              return (
                <div className="nm-card" style={{ textAlign: "center" }}>
                  <p style={{ fontSize: 13, color: "var(--text-secondary)", margin: "0 0 10px" }}>Data goresan belum termuat. Pastikan berkas nihongo-michi-data-writing.js ada di folder aplikasi.</p>
                  <button onClick={backToMenu} className="nm-btn nm-btn-secondary">Kembali</button>
                </div>
              );
            }
            const isKana = writingScript === "hiragana" || writingScript === "katakana";
            const kset = isKana ? kanaWritingSets(writingScript) : null;
            const labelMap = kset ? Object.fromEntries([...kset.dasar, ...kset.dakuten, ...kset.kecil].map(e => [e.ch, e.label])) : null;
            const kanjiEx = kanjiExclusiveByLevel();
            let chars = [];
            if (isKana) chars = kset[writingGroup].map(e => e.ch);
            else if (writingLevel) chars = (kanjiEx[writingLevel.id] || []).filter(k => WRITING_STROKES[k]);
            const scriptTitle = writingScript === "hiragana" ? "Hiragana" : writingScript === "katakana" ? "Katakana" : "Kanji";

            // 3) sedang menulis satu karakter
            if (writingChar) {
              const idx = Math.max(0, chars.indexOf(writingChar));
              const go = (d) => { const n = chars.length; if (n) setWritingChar(chars[(idx + d + n) % n]); };
              const randomChar = () => { if (chars.length > 1) { let c; do { c = chars[Math.floor(Math.random() * chars.length)]; } while (c === writingChar); setWritingChar(c); } };
              return (
                <div className="nm-card">
                  <Tape color="var(--sakura)" />
                  <button onClick={() => setWritingChar(null)} className="nm-btn nm-btn-ghost" style={{ marginBottom: 10 }}>
                    <ChevronRight size={13} style={{ transform: "rotate(180deg)" }} aria-hidden="true" /> {scriptTitle}{writingLevel ? " · " + writingLevel.label : ""}
                  </button>
                  <WritingPractice key={writingChar} char={writingChar}
                    info={writingInfo(writingChar, writingScript, labelMap)}
                    onDone={(m) => setWritingDone(d => ({ ...d, [writingChar]: Math.min(m, d[writingChar] === undefined ? 99 : d[writingChar]) }))}
                    onNext={() => go(1)} />
                  <div style={{ display: "flex", gap: 8, marginTop: 14, justifyContent: "space-between", alignItems: "center" }}>
                    <button onClick={() => go(-1)} className="nm-btn nm-btn-secondary nm-btn-sm" aria-label="Karakter sebelumnya" style={{ minWidth: 44 }}>
                      <ChevronRight size={16} style={{ transform: "rotate(180deg)" }} aria-hidden="true" />
                    </button>
                    <span style={{ fontSize: 11.5, color: "var(--text-secondary)", fontWeight: 700, whiteSpace: "nowrap", flexShrink: 0 }}>{idx + 1} / {chars.length}</span>
                    <button onClick={randomChar} className="nm-btn nm-btn-outline nm-btn-sm" aria-label="Karakter acak">🎲 Acak</button>
                    <button onClick={() => go(1)} className="nm-btn nm-btn-secondary nm-btn-sm" aria-label="Karakter berikutnya" style={{ minWidth: 44 }}>
                      <ChevronRight size={16} aria-hidden="true" />
                    </button>
                  </div>
                </div>
              );
            }

            // 1) pilih jenis huruf
            if (!writingScript) {
              const kanjiCount = new Set(LEVELS.flatMap(l => l.kanji)).size;
              const hs = kanaWritingSets("hiragana"), ks = kanaWritingSets("katakana");
              const SCRIPTS = [
                { id: "hiragana", title: "ひらがな Hiragana", desc: `Huruf dasar bahasa Jepang · ${hs.dasar.length + hs.dakuten.length + hs.kecil.length} huruf`, color: "sakura" },
                { id: "katakana", title: "カタカナ Katakana", desc: `Huruf untuk kata serapan · ${ks.dasar.length + ks.dakuten.length + ks.kecil.length} huruf`, color: "sora" },
                { id: "kanji", title: "漢字 Kanji", desc: `Kanji N5–N1 · ${kanjiCount} kanji`, color: "momiji" },
              ];
              return (
                <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                  <button onClick={backToMenu} className="nm-btn nm-btn-ghost" style={{ alignSelf: "flex-start", marginBottom: 2 }}>
                    <ChevronRight size={14} style={{ transform: "rotate(180deg)" }} aria-hidden="true" /> Ganti jenis latihan
                  </button>
                  <p style={{ fontSize: 12.5, color: "var(--text-secondary)", margin: "0 0 4px" }}>Mau berlatih menulis apa?</p>
                  {SCRIPTS.map(sc => (
                    <div key={sc.id} className="nm-card nm-card-tap" style={{ cursor: "pointer", display: "flex", alignItems: "center", gap: 12 }}
                      onClick={() => setWritingScript(sc.id)}>
                      <div style={{ width: 40, height: 40, borderRadius: 12, background: `var(--${sc.color}-tint)`, display: "flex",
                        alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                        <PenLine size={18} color={`var(--${sc.color})`} aria-hidden="true" />
                      </div>
                      <div style={{ flex: 1 }}>
                        <p style={{ fontSize: 14, fontWeight: 700, margin: 0 }}>{sc.title}</p>
                        <p style={{ fontSize: 11.5, color: "var(--text-secondary)", margin: "2px 0 0" }}>{sc.desc}</p>
                      </div>
                      <ChevronRight size={16} color="var(--text-secondary)" aria-hidden="true" />
                    </div>
                  ))}
                </div>
              );
            }

            // 2a) kanji: pilih level dulu
            if (writingScript === "kanji" && !writingLevel) {
              const colors = ["sakura", "sora", "matcha", "momiji"];
              return (
                <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                  <button onClick={() => setWritingScript(null)} className="nm-btn nm-btn-ghost" style={{ alignSelf: "flex-start", marginBottom: 2 }}>
                    <ChevronRight size={14} style={{ transform: "rotate(180deg)" }} aria-hidden="true" /> Ganti jenis huruf
                  </button>
                  <p style={{ fontSize: 12.5, color: "var(--text-secondary)", margin: "0 0 4px" }}>Pilih level kanji:</p>
                  {LEVELS.map((l, i) => (
                    <div key={l.id} className="nm-card nm-card-tap" style={{ cursor: "pointer", display: "flex", alignItems: "center", gap: 12 }}
                      onClick={() => { setWritingLevel(l); setWritingVisible(60); }}>
                      <div style={{ width: 44, height: 40, borderRadius: 12, background: `var(--${colors[i]})`, display: "flex",
                        alignItems: "center", justifyContent: "center", flexShrink: 0, color: "#fff", fontWeight: 700,
                        fontFamily: "'Shippori Mincho', serif", fontSize: l.label.length > 2 ? 12 : 16, whiteSpace: "nowrap", padding: "0 2px" }}>
                        {l.label}
                      </div>
                      <div style={{ flex: 1 }}>
                        <p style={{ fontSize: 14, fontWeight: 700, margin: 0 }}>{l.name}</p>
                        <p style={{ fontSize: 11.5, color: "var(--text-secondary)", margin: "2px 0 0" }}>{(kanjiEx[l.id] || []).length} kanji khusus level ini</p>
                      </div>
                      <ChevronRight size={16} color="var(--text-secondary)" aria-hidden="true" />
                    </div>
                  ))}
                </div>
              );
            }

            // 2b) pemilih karakter (grid)
            const cell = (e, key) => e ? (
              <button key={key} onClick={() => setWritingChar(e.ch)} title={e.title || e.label || e.ch}
                aria-label={`Tulis ${e.label || e.ch}`}
                className={"nm-wr-cell" + (writingDone[e.ch] !== undefined ? " done" : "")}>
                <span className="nm-title" style={{ fontSize: isKana ? 22 : 24 }}>{e.ch}</span>
                {e.label && <span style={{ fontSize: 10, color: "var(--text-secondary)" }}>{e.label}</span>}
                {writingDone[e.ch] !== undefined && <span className="nm-wr-cell-check"><Check size={11} aria-hidden="true" /></span>}
              </button>
            ) : <div key={key} />;
            const doneInList = chars.filter(c => writingDone[c] !== undefined).length;
            const GROUPS = [
              { id: "dasar", label: "Dasar" }, { id: "dakuten", label: "Dakuten" }, { id: "kecil", label: "Kecil" },
            ];
            return (
              <div className="nm-card">
                <Tape color="var(--sakura)" />
                <button onClick={() => { if (isKana) setWritingScript(null); else setWritingLevel(null); }} className="nm-btn nm-btn-ghost" style={{ marginBottom: 8 }}>
                  <ChevronRight size={13} style={{ transform: "rotate(180deg)" }} aria-hidden="true" /> {scriptTitle}{writingLevel ? " · " + writingLevel.label : ""}
                </button>
                {isKana && (
                  <div role="tablist" aria-label="Kelompok huruf" style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 10 }}>
                    {GROUPS.map(g => (
                      <button key={g.id} role="tab" aria-selected={writingGroup === g.id} onClick={() => setWritingGroup(g.id)}
                        className={"nm-btn nm-btn-sm " + (writingGroup === g.id ? "nm-btn-primary" : "nm-btn-secondary")}>
                        {g.label} ({kset[g.id].length})
                      </button>
                    ))}
                  </div>
                )}
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 8, marginBottom: 10, flexWrap: "wrap" }}>
                  <p style={{ fontSize: 12, color: "var(--text-secondary)", margin: 0 }}>
                    Pilih karakter untuk ditulis · <b style={{ color: "var(--matcha)" }}>{doneInList}</b>/{chars.length} selesai
                  </p>
                  <button onClick={() => chars.length && setWritingChar(chars[Math.floor(Math.random() * chars.length)])} className="nm-btn nm-btn-outline nm-btn-sm">🎲 Acak</button>
                </div>
                {isKana && writingGroup === "dasar" ? (
                  <div style={{ display: "grid", gridTemplateColumns: "repeat(5, minmax(0, 1fr))", gap: 8 }}>
                    {kset.rows.flatMap((row, ri) => row.map((e, ci) => cell(e, `${ri}-${ci}`)))}
                  </div>
                ) : isKana ? (
                  <div style={{ display: "grid", gridTemplateColumns: "repeat(5, minmax(0, 1fr))", gap: 8 }}>
                    {kset[writingGroup].map((e, i) => cell(e, i))}
                  </div>
                ) : (
                  <>
                    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(54px, 1fr))", gap: 8 }}>
                      {chars.slice(0, writingVisible).map(c => cell({ ch: c, title: (typeof KANJI_CONTENT !== "undefined" && KANJI_CONTENT[c] && KANJI_CONTENT[c].arti) || c }, c))}
                    </div>
                    {writingVisible < chars.length && (
                      <div style={{ textAlign: "center", marginTop: 12 }}>
                        <button onClick={() => setWritingVisible(v => v + 60)} className="nm-btn nm-btn-secondary">
                          Tampilkan lebih banyak ({chars.length - writingVisible} lagi)
                        </button>
                      </div>
                    )}
                  </>
                )}
              </div>
            );
          }

          if (latihanMode === "matching") {
            if (!matchingLevel) {
              return (
                <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                  <button onClick={() => { setLatihanMode(null); exitMatching(); }} className="nm-btn nm-btn-ghost" style={{ alignSelf: "flex-start", marginBottom: 2 }}>
                    <ChevronRight size={14} style={{ transform: "rotate(180deg)" }} aria-hidden="true" /> Ganti jenis latihan
                  </button>
                  <p style={{ fontSize: 12.5, color: "var(--text-secondary)", margin: "0 0 4px" }}>Pilih level untuk kuis pencocokan:</p>
                  {LEVELS.map((l, i) => {
                    const colors = ["sakura", "sora", "matcha", "momiji"];
                    const col = colors[i];
                    return (
                      <div key={l.id} className="nm-card nm-card-tap" style={{ cursor: "pointer", display: "flex", alignItems: "center", gap: 12 }}
                        onClick={() => setMatchingLevel(l)}>
                        <div style={{ width: 44, height: 40, borderRadius: 12, background: `var(--${col})`, display: "flex",
                          alignItems: "center", justifyContent: "center", flexShrink: 0, color: "#fff", fontWeight: 700,
                          fontFamily: "'Shippori Mincho', serif", fontSize: l.label.length > 2 ? 12 : 16, whiteSpace: "nowrap", padding: "0 2px" }}>
                          {l.label}
                        </div>
                        <div style={{ flex: 1 }}>
                          <p style={{ fontSize: 14, fontWeight: 700, margin: 0 }}>{l.name}</p>
                          <p style={{ fontSize: 11.5, color: "var(--text-secondary)", margin: "2px 0 0" }}>Kanji & kosakata level ini</p>
                        </div>
                        <ChevronRight size={16} color="var(--text-secondary)" aria-hidden="true" />
                      </div>
                    );
                  })}
                </div>
              );
            }

            if (!matchingType) {
              return (
                <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                  <button onClick={() => setMatchingLevel(null)} className="nm-btn nm-btn-ghost" style={{ alignSelf: "flex-start", marginBottom: 2 }}>
                    <ChevronRight size={14} style={{ transform: "rotate(180deg)" }} aria-hidden="true" /> Ganti level
                  </button>
                  <p style={{ fontSize: 12.5, color: "var(--text-secondary)", margin: "0 0 4px" }}>
                    <b className="nm-title" style={{ color: "var(--ink)" }}>{matchingLevel.label}</b> — mau cocokkan apa?
                  </p>
                  <div className="nm-card nm-card-tap" style={{ cursor: "pointer", display: "flex", alignItems: "center", gap: 12 }}
                    onClick={() => startMatching(matchingLevel, "kanji")}>
                    <div style={{ width: 40, height: 40, borderRadius: 12, background: "var(--sora-tint)", display: "flex",
                      alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                      <Book size={18} color="var(--sora)" aria-hidden="true" />
                    </div>
                    <div style={{ flex: 1 }}>
                      <p style={{ fontSize: 14, fontWeight: 700, margin: 0 }}>漢字 (Kanji)</p>
                      <p style={{ fontSize: 11.5, color: "var(--text-secondary)", margin: "2px 0 0" }}>Cocokkan kanji dengan artinya</p>
                    </div>
                    <ChevronRight size={16} color="var(--text-secondary)" aria-hidden="true" />
                  </div>
                  <div className="nm-card nm-card-tap" style={{ cursor: "pointer", display: "flex", alignItems: "center", gap: 12 }}
                    onClick={() => startMatching(matchingLevel, "kosakata")}>
                    <div style={{ width: 40, height: 40, borderRadius: 12, background: "var(--matcha-tint)", display: "flex",
                      alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                      <BookOpen size={18} color="var(--matcha)" aria-hidden="true" />
                    </div>
                    <div style={{ flex: 1 }}>
                      <p style={{ fontSize: 14, fontWeight: 700, margin: 0 }}>語彙 (Kosakata)</p>
                      <p style={{ fontSize: 11.5, color: "var(--text-secondary)", margin: "2px 0 0" }}>Cocokkan kata dengan artinya</p>
                    </div>
                    <ChevronRight size={16} color="var(--text-secondary)" aria-hidden="true" />
                  </div>
                </div>
              );
            }

            return (
              <div className="nm-card">
                <Tape color="var(--yuzu)" />
                <button onClick={exitMatching} className="nm-btn nm-btn-ghost" style={{ marginBottom: 10 }}>
                  <ChevronRight size={13} style={{ transform: "rotate(180deg)" }} aria-hidden="true" /> {matchingLevel.label} · {matchingType === "kanji" ? "Kanji" : "Kosakata"}
                </button>
                <p style={{ fontSize: 12.5, color: "var(--text-secondary)", margin: "0 0 12px" }}>
                  Tarik dari kartu kiri ke pasangannya di kanan.
                </p>
                <MatchingQuiz pairs={matchingPairs} />
                <div style={{ display: "flex", gap: 8, marginTop: 14, justifyContent: "center", flexWrap: "wrap" }}>
                  <button onClick={() => startMatching(matchingLevel, matchingType)} className="nm-btn nm-btn-outline">
                    <Link2 size={14} aria-hidden="true" /> Acak ulang
                  </button>
                  <button onClick={() => setMatchingType(null)} className="nm-btn nm-btn-secondary">Ganti jenis</button>
                </div>
              </div>
            );
          }

          if (latihanMode === "ujian") {
            // N2 and N1 are shown as separate mock-test levels here, even though the learning
            // materials (kanji/vocab/grammar) still use a single combined "n2n1" LEVELS entry.
            const EXAM_LEVEL_META = { n2: { label: "N2", name: "Mahir (N2)" }, n1: { label: "N1", name: "Mahir (N1)" } };
            const examLevelInfo = (id) => LEVELS.find(l => l.id === id) || EXAM_LEVEL_META[id];
            const ujianCatInfo = UJIAN_CATEGORIES.find(c => c.id === ujianCategory);

            if (!ujianCatInfo) {
              const catStyle = { mojigoi: { color: "sakura", Icon: PenLine }, dokkai: { color: "sora", Icon: BookOpen }, choukai: { color: "matcha", Icon: Volume2 } };
              return (
                <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                  <button onClick={() => { setLatihanMode(null); setUjianCategory(null); setUjianLevel(null); setUjianYear(null); }} className="nm-btn nm-btn-ghost" style={{ alignSelf: "flex-start", marginBottom: 2 }}>
                    <ChevronRight size={14} style={{ transform: "rotate(180deg)" }} aria-hidden="true" /> Ganti jenis latihan
                  </button>
                  <p style={{ fontSize: 12.5, color: "var(--text-secondary)", margin: "0 0 4px" }}>Pilih jenis latihan JLPT:</p>
                  {UJIAN_CATEGORIES.map(cat => {
                    const { color, Icon } = catStyle[cat.id];
                    return (
                      <div key={cat.id} className="nm-card nm-card-tap" style={{ cursor: "pointer", display: "flex", alignItems: "center", gap: 12 }}
                        onClick={() => setUjianCategory(cat.id)}>
                        <div style={{ width: 40, height: 40, borderRadius: 12, background: `var(--${color}-tint)`, display: "flex",
                          alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                          <Icon size={18} color={`var(--${color})`} aria-hidden="true" />
                        </div>
                        <div style={{ flex: 1 }}>
                          <p style={{ fontSize: 14, fontWeight: 700, margin: 0 }}>{cat.title}</p>
                          <p style={{ fontSize: 11.5, color: "var(--text-secondary)", margin: "2px 0 0" }}>{cat.sub}</p>
                        </div>
                        <ChevronRight size={16} color="var(--text-secondary)" aria-hidden="true" />
                      </div>
                    );
                  })}
                </div>
              );
            }

            if (!ujianLevel) {
              return (
                <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                  <button onClick={() => { setLatihanMode(null); setUjianCategory(null); setUjianLevel(null); setUjianYear(null); }} className="nm-btn nm-btn-ghost" style={{ alignSelf: "flex-start", marginBottom: 2 }}>
                    <ChevronRight size={14} style={{ transform: "rotate(180deg)" }} aria-hidden="true" /> Ganti jenis latihan
                  </button>
                  <p style={{ fontSize: 12.5, color: "var(--text-secondary)", margin: "0 0 4px" }}><b className="nm-title" style={{ color: "var(--ink)" }}>{ujianCatInfo.title}</b> — pilih level ujian JLPT:</p>
                  {["n5", "n4", "n3", "n2", "n1"].map(lvlId => {
                    const lvl = examLevelInfo(lvlId);
                    const latihanCount = getLatihanYears(lvlId, ujianCatInfo.section).length;
                    const hasLatihan = latihanCount > 0;
                    const colors = { n5: "sakura", n4: "sora", n3: "matcha", n2: "yuzu", n1: "momiji" };
                    return (
                      <div key={lvlId} className={hasLatihan ? "nm-card nm-card-tap" : "nm-card"} style={{
                        cursor: hasLatihan ? "pointer" : "default", display: "flex", alignItems: "center", gap: 12,
                        opacity: hasLatihan ? 1 : 0.5,
                      }} onClick={() => hasLatihan && setUjianLevel(lvlId)}>
                        <div style={{ width: 40, height: 40, borderRadius: 12, background: `var(--${colors[lvlId]})`, display: "flex",
                          alignItems: "center", justifyContent: "center", flexShrink: 0, color: "#fff", fontWeight: 700, fontFamily: "'Shippori Mincho', serif" }}>
                          {lvl.label}
                        </div>
                        <div style={{ flex: 1 }}>
                          <p style={{ fontSize: 14, fontWeight: 700, margin: 0 }}>{lvl.name}</p>
                          <p style={{ fontSize: 11.5, color: "var(--text-secondary)", margin: "2px 0 0" }}>{hasLatihan ? `${latihanCount} latihan tersedia` : "Segera hadir"}</p>
                        </div>
                        {hasLatihan && <ChevronRight size={16} color="var(--text-secondary)" aria-hidden="true" />}
                      </div>
                    );
                  })}
                </div>
              );
            }

            if (!ujianYear) {
              const lvl = examLevelInfo(ujianLevel);
              const latihanYears = getLatihanYears(ujianLevel, ujianCatInfo.section);
              const openLatihan = (yearKey) => {
                setUjianYear(yearKey);
                startUjian(ujianCatInfo.section, false, ujianLevel, yearKey);
              };
              return (
                <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                  <button onClick={() => setUjianLevel(null)} className="nm-btn nm-btn-ghost" style={{ alignSelf: "flex-start", marginBottom: 2 }}>
                    <ChevronRight size={14} style={{ transform: "rotate(180deg)" }} aria-hidden="true" /> Ganti level
                  </button>
                  <p style={{ fontSize: 12.5, color: "var(--text-secondary)", margin: "0 0 4px" }}>
                    <b className="nm-title" style={{ color: "var(--ink)" }}>{ujianCatInfo.title} · {lvl.label}</b> — pilih latihan:
                  </p>
                  <div className="nm-yeargrid" style={{ display: "grid", gridTemplateColumns: "repeat(3, minmax(0,1fr))", gap: 10 }}>
                    {latihanYears.map((yearKey, i) => (
                      <div key={yearKey} className="nm-card nm-card-tap" style={{ cursor: "pointer", textAlign: "center", padding: "1rem 0.5rem" }}
                        onClick={() => openLatihan(yearKey)}>
                        <p className="nm-title" style={{ fontSize: 18, margin: 0 }}>Latihan {i + 1}</p>
                        <p style={{ fontSize: 11.5, color: "var(--text-secondary)", margin: "4px 0 0" }}>{normalizeUjianSection(ujianLevel, yearKey, ujianCatInfo.section).length} soal</p>
                      </div>
                    ))}
                  </div>
                </div>
              );
            }

            const hasExamData = !!((JLPT_EXAM_CONTENT[ujianLevel] || {})[String(ujianYear)]);

            if (!hasExamData) {
              return (
                <div>
                  <button onClick={() => setUjianYear(null)} className="nm-btn nm-btn-ghost" style={{ marginBottom: 12 }}>
                    <ChevronRight size={14} style={{ transform: "rotate(180deg)" }} aria-hidden="true" /> {examLevelInfo(ujianLevel).label} · {ujianYear}
                  </button>
                  <div className="nm-card" style={{ textAlign: "center", padding: "2rem 1rem" }}>
                    <Book size={32} color="var(--text-muted)" aria-hidden="true" style={{ marginBottom: 10 }} />
                    <p style={{ fontSize: 14, fontWeight: 700, margin: "0 0 6px" }}>Belum ada soal untuk {examLevelInfo(ujianLevel).label} · {ujianYear}</p>
                    <p style={{ fontSize: 12.5, color: "var(--text-secondary)", margin: 0, lineHeight: 1.6 }}>
                      Soal untuk tahun ini akan segera ditambahkan.
                    </p>
                  </div>
                </div>
              );
            }

            if (!ujianSection) {
              const countMojigoi = normalizeUjianSection(ujianLevel, String(ujianYear), "mojigoi").length;
              const countBunpou = normalizeUjianSection(ujianLevel, String(ujianYear), "bunpou_dokkai").length;
              const countChoukai = normalizeUjianSection(ujianLevel, String(ujianYear), "choukai").length;
              return (
                <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                  <button onClick={() => setUjianYear(null)} className="nm-btn nm-btn-ghost" style={{ alignSelf: "flex-start", marginBottom: 2 }}>
                    <ChevronRight size={14} style={{ transform: "rotate(180deg)" }} aria-hidden="true" /> Ganti tahun
                  </button>
                  <div className="nm-card" style={{ textAlign: "center" }}>
                    <Tape color="var(--momiji)" />
                    <p className="nm-title" style={{ fontSize: 18, margin: "4px 0 10px" }}>{examLevelInfo(ujianLevel).label} · {ujianYear} <span style={{ fontSize: 9.5, fontWeight: 700, color: "var(--momiji)", background: "var(--momiji-tint)", borderRadius: 6, padding: "2px 6px", marginLeft: 4, verticalAlign: "middle" }}>MOCK TEST</span></p>
                    <div className="nm-section-summary-grid">
                      <div className="nm-section-summary-item">
                        <div className="nm-section-summary-icon"><PenLine size={16} color="var(--sakura)" aria-hidden="true" /></div>
                        <p className="nm-section-summary-count">{countMojigoi}</p>
                        <p className="nm-section-summary-label">文字・語彙<br />20 menit</p>
                      </div>
                      <div className="nm-section-summary-item">
                        <div className="nm-section-summary-icon"><BookOpen size={16} color="var(--sora)" aria-hidden="true" /></div>
                        <p className="nm-section-summary-count">{countBunpou}</p>
                        <p className="nm-section-summary-label">文法・読解<br />40 menit</p>
                      </div>
                      <div className="nm-section-summary-item">
                        <div className="nm-section-summary-icon"><Volume2 size={16} color="var(--matcha)" aria-hidden="true" /></div>
                        <p className="nm-section-summary-count">{countChoukai}</p>
                        <p className="nm-section-summary-label">聴解<br />20 menit</p>
                      </div>
                    </div>
                    <p style={{ fontSize: 12, color: "var(--text-secondary)", margin: "0 0 16px", lineHeight: 1.7 }}>
                      Ketiga bagian dikerjakan berurutan tanpa jeda, seperti ujian sungguhan — pembahasan baru muncul setelah semuanya selesai.
                    </p>
                    <button onClick={startUjianSimulation} className="nm-btn nm-btn-primary" style={{ fontSize: 14.5, padding: "12px 26px" }}>
                      <ClockIcon size={16} aria-hidden="true" /> Mulai Simulasi Ujian
                    </button>
                  </div>
                </div>
              );
            }

            const uq = ujianQuestions[ujianIdx];
            return (
              <div className="nm-card">
                <Tape color="var(--momiji)" />
                <button onClick={exitUjianSection} className="nm-btn nm-btn-ghost" style={{ marginBottom: 10 }}>
                  <ChevronRight size={13} style={{ transform: "rotate(180deg)" }} aria-hidden="true" /> {(UJIAN_CATEGORIES.find(c => c.section === ujianSection) || {}).title} · {examLevelInfo(ujianLevel).label} · Latihan {getLatihanYears(ujianLevel, ujianSection).indexOf(String(ujianYear)) + 1}
                </button>

                {ujianSimMode && !ujianDone && (() => {
                  const secDef = UJIAN_SECTIONS.find(s => s.id === ujianSection);
                  const totalSecs = (secDef ? secDef.simMinutes : 0) * 60;
                  const pctLeft = totalSecs > 0 ? (ujianSimTimeLeft / totalSecs) * 100 : 0;
                  const low = ujianSimTimeLeft <= 60;
                  return (
                    <div className="nm-timer-chip" style={{ display: "inline-flex", alignItems: "center", gap: 8, background: low ? "var(--sakura-tint)" : "var(--momiji-tint)",
                      border: `2px solid ${low ? "var(--sakura)" : "var(--momiji)"}`, borderRadius: 14, padding: "6px 12px 6px 6px", marginBottom: 12,
                      boxShadow: "var(--shadow-xs)", transition: "background 0.3s ease, border-color 0.3s ease" }}>
                      <Ring pct={pctLeft} size={34} color={low ? "var(--sakura)" : "var(--momiji)"} showLabel={false} />
                      <span style={{ fontSize: 14, fontWeight: 700, color: low ? "var(--sakura)" : "var(--momiji)", fontVariantNumeric: "tabular-nums",
                        display: "inline-flex", alignItems: "center", gap: 4,
                        animation: low ? "nm-flamePulse 1s ease-in-out infinite" : "none" }}>
                        <ClockIcon size={13} aria-hidden="true" />
                        {String(Math.floor(ujianSimTimeLeft / 60)).padStart(2, "0")}:{String(ujianSimTimeLeft % 60).padStart(2, "0")}
                      </span>
                      <span style={{ fontSize: 11, color: "var(--text-secondary)" }}>tersisa — {secDef ? secDef.label : ""}</span>
                    </div>
                  );
                })()}

                {ujianQuestions.length === 0 ? (
                  <p style={{ fontSize: 13, color: "var(--text-secondary)" }}>Belum ada soal di bagian ini.</p>
                ) : !ujianDone ? (
                  <>
                    {(() => {
                      const groups = [];
                      ujianQuestions.forEach((q, idx) => {
                        const last = groups[groups.length - 1];
                        if (last && last.mondai === q.mondai) last.indices.push(idx);
                        else groups.push({ mondai: q.mondai, indices: [idx] });
                      });
                      const answeredCount = Object.keys(ujianAnswersMap).length;
                      const totalCount = ujianQuestions.length;
                      const answeredPct = totalCount > 0 ? (answeredCount / totalCount) * 100 : 0;
                      return (
                        <div style={{ background: "var(--paper)", border: "2px solid var(--line)", borderRadius: 14, padding: "10px 12px", marginBottom: 14 }}>
                          <div className="nm-progress-summary">
                            <span className="nm-progress-summary-label">Progres soal</span>
                            <span className="nm-progress-summary-label" style={{ color: "var(--momiji)" }}>{answeredCount} / {totalCount} terjawab</span>
                          </div>
                          <div className="nm-progress-track"><div className="nm-progress-fill" style={{ width: `${answeredPct}%` }} /></div>
                          <div className="nm-navgrid-legend">
                            <span className="nm-navgrid-legend-item"><span className="nm-navgrid-swatch" style={{ background: "var(--momiji)" }} /> Sudah dijawab</span>
                            <span className="nm-navgrid-legend-item"><span className="nm-navgrid-swatch" style={{ background: "var(--card-bg)", border: "2px solid var(--line)" }} /> Belum dijawab</span>
                            <span className="nm-navgrid-legend-item"><span className="nm-navgrid-swatch" style={{ background: "var(--card-bg)", border: "2px solid var(--momiji)" }} /> Soal saat ini</span>
                          </div>
                          {groups.map((g, gi) => (
                            <div key={gi} style={{ marginBottom: gi < groups.length - 1 ? 8 : 0 }}>
                              <p style={{ fontSize: 10.5, fontWeight: 700, color: "var(--text-secondary)", margin: "0 0 4px" }}>{g.mondai}</p>
                              <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                                {g.indices.map(idx => {
                                  const answered = ujianAnswersMap[idx] !== undefined;
                                  const isCurrent = idx === ujianIdx;
                                  return (
                                    <button key={idx} onClick={() => goToUjianQuestion(idx)}
                                      aria-label={`Soal ${idx + 1}${answered ? " (sudah dijawab)" : " (belum dijawab)"}${isCurrent ? " — sedang dibuka" : ""}`}
                                      aria-current={isCurrent ? "true" : undefined}
                                      className={"nm-ujian-navdot" + (isCurrent ? " nm-ujian-navdot-current" : "")} style={{
                                      width: 32, height: 32, borderRadius: 8, fontSize: 12, fontWeight: 700, cursor: "pointer",
                                      border: isCurrent ? "2px solid var(--momiji)" : "2px solid var(--line)",
                                      background: answered ? "var(--momiji)" : "var(--card-bg)",
                                      color: answered ? "#fff" : "var(--ink)",
                                    }}>
                                      {idx + 1}
                                    </button>
                                  );
                                })}
                              </div>
                            </div>
                          ))}
                        </div>
                      );
                    })()}
                    <div key={ujianIdx} className="nm-tab-content">
                    <div className="nm-q-eyebrow">
                      <span className="nm-q-mondai-tag">{uq.mondai}</span>
                      <span className="nm-q-counter">{uq.desc ? `${uq.desc} — ` : ""}Soal {ujianIdx + 1} dari {ujianQuestions.length}</span>
                    </div>
                    {uq.passage && !uq.audio && (
                      <div style={{ background: "var(--matcha-tint)", borderRadius: 12, padding: "10px 12px", marginBottom: 12, fontSize: 13, lineHeight: 1.8, whiteSpace: "pre-line" }}>
                        {renderWithUnderline(uq.passage)}
                      </div>
                    )}
                    {uq.table && (
                      <div style={{ marginBottom: 12, overflowX: "auto" }}>
                        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 12.5, background: "#fff", border: "1.5px solid var(--line)", borderRadius: 10, overflow: "hidden" }}>
                          <thead>
                            <tr>
                              {uq.table.headers.map((h, hi) => (
                                <th key={hi} style={{ textAlign: "left", padding: "6px 8px", background: "var(--matcha-tint)", borderBottom: "1.5px solid var(--line)", whiteSpace: "nowrap" }}>{h}</th>
                              ))}
                            </tr>
                          </thead>
                          <tbody>
                            {uq.table.rows.map((row, ri) => (
                              <tr key={ri}>
                                {row.map((cell, ci) => (
                                  <td key={ci} style={{ padding: "6px 8px", borderBottom: "1px solid var(--line)", verticalAlign: "top" }}>{cell}</td>
                                ))}
                              </tr>
                            ))}
                          </tbody>
                        </table>
                        {uq.tableFooter && (
                          <div style={{ fontSize: 12, color: "var(--text-secondary)", marginTop: 8, whiteSpace: "pre-line", lineHeight: 1.7 }}>{uq.tableFooter}</div>
                        )}
                      </div>
                    )}
                    {uq.image && (
                      <div style={{ marginBottom: 12, textAlign: "center" }}>
                        <img src={uq.image} alt="Ilustrasi soal" style={{ maxWidth: "100%", maxHeight: 260, borderRadius: 12, border: "1.5px solid var(--line)", background: "#fff" }} />
                      </div>
                    )}
                    {uq.audioSrc && (
                      <div style={{ marginBottom: 12 }}>
                        <RealAudioClipPlayer src={uq.audioSrc} start={uq.audioStart} end={uq.audioEnd} />
                        {uq.dialogText && (
                          <button onClick={() => setShowUjianScript(s => !s)} className="nm-audioplayer-script-toggle">
                            <FileText size={13} aria-hidden="true" /> {showUjianScript || ujianSel !== null ? "Sembunyikan teks" : "Susah dengar? Lihat teksnya"}
                          </button>
                        )}
                        {(showUjianScript || ujianSel !== null) && uq.dialogText && (
                          <div style={{ background: "var(--momiji-tint)", borderRadius: 12, padding: "10px 12px", marginTop: 6,
                            fontSize: 12.5, lineHeight: 1.8, whiteSpace: "pre-line" }}>
                            <p style={{ fontSize: 11, fontWeight: 700, margin: "0 0 4px", color: "var(--momiji)" }}>スクリプト：</p>
                            {uq.dialogText}
                          </div>
                        )}
                        {!uq.dialogText && (
                          <p style={{ fontSize: 10.5, color: "var(--text-secondary)", margin: "6px 0 0", lineHeight: 1.5, display: "flex", alignItems: "flex-start", gap: 4 }}>
                            <AlertTriangle size={12} aria-hidden="true" style={{ flexShrink: 0, marginTop: 1 }} /> Skrip dialognya tidak diketahui — dengarkan langsung audio aslinya untuk menjawab.
                          </p>
                        )}
                      </div>
                    )}
                    {!uq.audioSrc && uq.audio && (
                      <div style={{ marginBottom: 12 }}>
                        <AudioPlayerBar dialog={uq.audio} />
                        {uq.dialogText && (
                          <button onClick={() => setShowUjianScript(s => !s)} className="nm-audioplayer-script-toggle">
                            <FileText size={13} aria-hidden="true" /> {showUjianScript || ujianSel !== null ? "Sembunyikan teks" : "Susah dengar? Lihat teksnya"}
                          </button>
                        )}
                        {(showUjianScript || ujianSel !== null) && uq.dialogText && (
                          <div style={{ background: "var(--momiji-tint)", borderRadius: 12, padding: "10px 12px", marginTop: 6,
                            fontSize: 12.5, lineHeight: 1.8, whiteSpace: "pre-line" }}>
                            <p style={{ fontSize: 11, fontWeight: 700, margin: "0 0 4px", color: "var(--momiji)" }}>スクリプト：</p>
                            {uq.dialogText}
                          </div>
                        )}
                      </div>
                    )}
                    {uq.question && <p style={{ fontSize: 15, fontWeight: 700, margin: "0 0 10px" }}>{uq.question}</p>}
                    <div className="nm-choice-list" role="radiogroup" aria-label="Pilihan jawaban">
                      {uq.choices.map((opt, i) => {
                        const isSel = i === ujianSel;
                        return (
                          <button key={i} onClick={() => submitUjianAnswer(i)} role="radio" aria-checked={isSel}
                            className={isSel ? "nm-choice nm-choice-selected" : "nm-choice"}>
                            <span className="nm-choice-badge">{String.fromCharCode(65 + i)}</span>
                            <span className="nm-choice-text">{opt}</span>
                            {isSel && <span className="nm-choice-check"><Check size={16} aria-hidden="true" /></span>}
                          </button>
                        );
                      })}
                    </div>
                    </div>
                    <div style={{ display: "flex", gap: 8, marginTop: 10, flexWrap: "wrap" }}>
                      {ujianIdx > 0 && (
                        <button onClick={prevUjianQuestion} className="nm-btn nm-btn-secondary">
                          <ChevronRight size={14} style={{ transform: "rotate(180deg)" }} aria-hidden="true" /> Sebelumnya
                        </button>
                      )}
                      {ujianIdx + 1 < ujianQuestions.length && (
                        <button onClick={nextUjianQuestion} className="nm-btn nm-btn-primary">
                          Berikutnya <ChevronRight size={14} aria-hidden="true" />
                        </button>
                      )}
                      <button onClick={submitUjianSection} className="nm-btn nm-btn-outline" style={{ marginLeft: "auto" }}>
                        <ListChecks size={15} aria-hidden="true" /> Submit ({Object.keys(ujianAnswersMap).length}/{ujianQuestions.length})
                      </button>
                    </div>
                  </>
                ) : (() => {
                  if (!ujianSimAllDone) {
                    return (
                      <div style={{ textAlign: "center", padding: "1rem 0" }}>
                        <p style={{ fontSize: 13, color: "var(--text-secondary)" }}>Melanjutkan ke bagian berikutnya…</p>
                      </div>
                    );
                  }
                  const totalScore = ujianSimResults.reduce((sum, r) => sum + r.score, 0);
                  const totalQuestions = ujianSimResults.reduce((sum, r) => sum + r.questions.length, 0);
                  const passedSim = totalQuestions > 0 && totalScore / totalQuestions >= 0.6;
                  return (
                    <div style={{ textAlign: "center", padding: "1rem 0" }}>
                      <div style={{ display: "flex", justifyContent: "center", marginBottom: 8 }}>
                        <Ring pct={totalQuestions > 0 ? (totalScore/totalQuestions)*100 : 0} size={88} color={passedSim ? "var(--matcha)" : "var(--sakura)"} />
                      </div>
                      <p className="nm-title" style={{ fontSize: 24, margin: "4px 0 6px" }}>{totalScore} / {totalQuestions} benar</p>
                      <p style={{ fontSize: 13, color: passedSim ? "var(--matcha)" : "var(--sakura)", fontWeight: 700, margin: "0 0 10px" }}>
                        {ujianSimMode ? (passedSim ? "✅ Selamat, simulasi ujian selesai!" : "Simulasi selesai — yuk pelajari lagi bagian yang masih salah.") : (passedSim ? "✅ Selamat, latihan selesai!" : "Latihan selesai — yuk pelajari lagi bagian yang masih salah.")}
                      </p>
                      <div style={{ display: "flex", gap: 10, justifyContent: "center", flexWrap: "wrap", margin: "0 0 14px" }}>
                        {ujianSimResults.map((r, i) => {
                          const secPct = r.questions.length > 0 ? (r.score / r.questions.length) * 100 : 0;
                          const secOk = secPct >= 60;
                          return (
                            <div key={i} style={{ background: "var(--paper)", border: "2px solid var(--line)", borderRadius: 12, padding: "8px 14px", minWidth: 90 }}>
                              <p style={{ fontSize: 11, color: "var(--text-secondary)", margin: "0 0 2px", fontWeight: 700 }}>{r.label}</p>
                              <p style={{ fontSize: 15, fontWeight: 700, margin: "0 0 5px" }}>{r.score} / {r.questions.length}</p>
                              <div style={{ height: 5, borderRadius: 4, background: "var(--line)", overflow: "hidden" }}>
                                <div style={{ height: "100%", width: `${secPct}%`, borderRadius: 4, background: secOk ? "var(--matcha)" : "var(--sakura)",
                                  transition: "width 0.6s cubic-bezier(0.34, 1.2, 0.64, 1)" }} />
                              </div>
                            </div>
                          );
                        })}
                      </div>
                      <div style={{ display: "flex", gap: 8, justifyContent: "center", flexWrap: "wrap", marginBottom: showUjianPembahasan ? 16 : 0 }}>
                        <button onClick={() => setShowUjianPembahasan(s => !s)} className="nm-btn" style={{ background: "var(--card-bg)", color: "var(--sora)", border: "2px solid var(--sora)" }}>
                          <BookOpen size={14} aria-hidden="true" /> {showUjianPembahasan ? "Tutup pembahasan" : "Lihat pembahasan lengkap"}
                        </button>
                        <button onClick={exitUjianSection} className="nm-btn nm-btn-secondary">Selesai</button>
                      </div>
                      {showUjianPembahasan && (
                        <div style={{ textAlign: "left" }}>
                          {ujianSimResults.map((r, ri) => (
                            <div key={ri} style={{ marginBottom: 14 }}>
                              <p style={{ fontSize: 13, fontWeight: 700, color: "var(--momiji)", margin: "0 0 8px" }}>{r.label}</p>
                              {r.questions.map((q, idx) => {
                                const selectedIdx = r.answersMap[idx];
                                const wasAnswered = selectedIdx !== undefined;
                                const selected = wasAnswered ? q.choices[selectedIdx] : undefined;
                                const isCorrect = wasAnswered && selected === q.correct;
                                return (
                                  <div key={idx} style={{
                                    borderRadius: 14, border: `2px solid ${!wasAnswered ? "var(--line)" : isCorrect ? "var(--matcha)" : "var(--sakura)"}`,
                                    background: !wasAnswered ? "var(--card-bg)" : isCorrect ? "var(--matcha-tint)" : "var(--sakura-tint)",
                                    padding: "10px 12px", marginBottom: 10,
                                  }}>
                                    <div style={{ display: "flex", alignItems: "flex-start", gap: 6, marginBottom: 6 }}>
                                      {!wasAnswered ? <Circle size={16} color="var(--text-muted)" aria-hidden="true" style={{ flexShrink: 0, marginTop: 2 }} />
                                        : isCorrect ? <Check size={16} color="var(--matcha)" aria-hidden="true" style={{ flexShrink: 0, marginTop: 2 }} />
                                        : <span style={{ color: "var(--sakura)", fontWeight: 700, flexShrink: 0 }}>✕</span>}
                                      <p style={{ fontSize: 12, fontWeight: 700, margin: 0, color: "var(--text-secondary)" }}>Soal {idx + 1} · {q.mondai}</p>
                                    </div>
                                    {q.hideInstruction
                                      ? <p style={{ fontSize: 13.5, fontWeight: 700, margin: "0 0 6px", lineHeight: 1.8 }}>{renderWithUnderline(q.passage)}</p>
                                      : <p style={{ fontSize: 13.5, fontWeight: 700, margin: "0 0 6px" }}>{q.question}</p>}
                                    <p style={{ fontSize: 12.5, margin: "0 0 3px" }}>
                                      {wasAnswered ? (
                                        <>Jawabanmu: <b style={{ color: isCorrect ? "var(--matcha)" : "var(--sakura)" }}>{selected}</b>
                                        {!isCorrect && <> · Jawaban benar: <b style={{ color: "var(--matcha)" }}>{q.correct}</b></>}</>
                                      ) : (
                                        <>Belum dijawab · Jawaban benar: <b style={{ color: "var(--matcha)" }}>{q.correct}</b></>
                                      )}
                                    </p>
                                    {q.explanation && (
                                      <p style={{ fontSize: 12, color: "var(--text-body)", margin: "6px 0 0", lineHeight: 1.6 }}>💡 {q.explanation}</p>
                                    )}
                                    {q.explainExtra && (
                                      <p style={{ fontSize: 12, color: "var(--text-body)", margin: "6px 0 0", lineHeight: 1.6 }}>📝 Kalimat lengkap: {q.explainExtra}</p>
                                    )}
                                    {!q.explanation && !q.explainExtra && (
                                      <p style={{ fontSize: 11.5, color: "var(--text-muted)", margin: "6px 0 0", fontStyle: "italic" }}>Penjelasan rinci tidak tersedia untuk soal ini (halaman pembahasan resmi tidak ada di sumber PDF).</p>
                                    )}
                                  </div>
                                );
                              })}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                })()}
              </div>
            );
          }

          if (latihanMode === "susun") {
            return <SusunKataGame onExit={() => setLatihanMode(null)} />;
          }

          if (!examLevel) {
            return (
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                <button onClick={() => { setLatihanMode(null); setUjianLevel(null); setUjianYear(null); }} style={{ display: "flex", alignItems: "center", gap: 4,
                  background: "none", border: "none", color: "var(--text-secondary)", fontFamily: "'Zen Maru Gothic', sans-serif",
                  fontSize: 12.5, fontWeight: 700, cursor: "pointer", padding: 0, marginBottom: 2 }}>
                  <ChevronRight size={14} style={{ transform: "rotate(180deg)" }} aria-hidden="true" /> Ganti jenis latihan
                </button>
                <p style={{ fontSize: 12.5, color: "var(--text-secondary)", margin: "0 0 4px" }}>Pilih level untuk mulai latihan mengulang materi:</p>
                {LEVELS.map((l, i) => {
                  const colors = ["sakura","sora","matcha","momiji"];
                  const col = colors[i];
                  return (
                    <div key={l.id} className="nm-card nm-card-tap" style={{ cursor: "pointer", display: "flex", alignItems: "center", gap: 12 }}
                      onClick={() => setExamLevel(l)}>
                      <div style={{ width: 44, height: 40, borderRadius: 12, background: `var(--${col})`, display: "flex",
                        alignItems: "center", justifyContent: "center", flexShrink: 0, color: "#fff", fontWeight: 700,
                        fontFamily: "'Shippori Mincho', serif", fontSize: l.label.length > 2 ? 12 : 16, whiteSpace: "nowrap", padding: "0 2px" }}>
                        {l.label}
                      </div>
                      <div style={{ flex: 1 }}>
                        <p style={{ fontSize: 14, fontWeight: 700, margin: 0 }}>{l.name}</p>
                        <p style={{ fontSize: 11.5, color: "var(--text-secondary)", margin: "2px 0 0" }}>3 bagian: Kosakata, Kanji, Grammar</p>
                      </div>
                      <ChevronRight size={16} color="var(--text-secondary)" aria-hidden="true" />
                    </div>
                  );
                })}
              </div>
            );
          }

          if (!examSection) {
            return (
              <div>
                <button onClick={() => setExamLevel(null)} style={{ display: "flex", alignItems: "center", gap: 4,
                  background: "none", border: "none", color: "var(--text-secondary)", fontFamily: "'Zen Maru Gothic', sans-serif",
                  fontSize: 12.5, fontWeight: 700, cursor: "pointer", padding: 0, marginBottom: 12 }}>
                  <ChevronRight size={14} style={{ transform: "rotate(180deg)" }} aria-hidden="true" /> Ganti level
                </button>
                <p style={{ fontSize: 13, color: "var(--text-secondary)", margin: "0 0 12px" }}>
                  <b className="nm-title" style={{ color: "var(--ink)" }}>{examLevel.label}</b> — pilih bagian yang mau dilatih:
                </p>
                <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                  {sections.map(s => {
                    const Icon = s.icon;
                    const available = s.id === "kosakata" ? buildVocabPool(examLevel).length > 0
                      : s.id === "kanji" ? buildKanjiPool(examLevel).length > 0
                      : s.id === "grammar" ? (examLevel.grammar || []).length > 0
                      : s.id === "dokkai" ? (examLevel.reading || []).length > 0
                      : true;
                    return (
                      <div key={s.id} className="nm-card nm-card-tap" style={{
                        cursor: available ? "pointer" : "default", display: "flex", alignItems: "center", gap: 12,
                        opacity: available ? 1 : 0.5,
                      }} onClick={() => available && setExamSection(s.id)}>
                        <div style={{ width: 40, height: 40, borderRadius: 12, background: "var(--momiji-tint)", display: "flex",
                          alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                          <Icon size={18} color="var(--momiji)" aria-hidden="true" />
                        </div>
                        <div style={{ flex: 1 }}>
                          <p style={{ fontSize: 14, fontWeight: 700, margin: 0 }}>{s.label} <span style={{ fontWeight: 400, color: "var(--text-secondary)", fontSize: 12 }}>({s.sub})</span></p>
                          <p style={{ fontSize: 11.5, color: "var(--text-secondary)", margin: "2px 0 0" }}>{available ? s.desc : "Materi belum tersedia di level ini"}</p>
                        </div>
                        {available && <ChevronRight size={16} color="var(--text-secondary)" aria-hidden="true" />}
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          }

          if (examSection && !examDifficulty) {
            const currentSectionInfo = sections.find(s => s.id === examSection);
            const diffDesc = {
              mudah: "5 soal · 3 pilihan jawaban",
              sedang: "10 soal · 4 pilihan jawaban",
              susah: "15 soal · 5 pilihan jawaban, tanpa bantuan tambahan",
            };
            const diffColor = { mudah: "matcha", sedang: "yuzu", susah: "sakura" };
            return (
              <div>
                <button onClick={() => setExamSection(null)} style={{ display: "flex", alignItems: "center", gap: 4,
                  background: "none", border: "none", color: "var(--text-secondary)", fontFamily: "'Zen Maru Gothic', sans-serif",
                  fontSize: 12.5, fontWeight: 700, cursor: "pointer", padding: 0, marginBottom: 12 }}>
                  <ChevronRight size={14} style={{ transform: "rotate(180deg)" }} aria-hidden="true" /> Pilih bagian lain
                </button>
                <p style={{ fontSize: 13, color: "var(--text-secondary)", margin: "0 0 12px" }}>
                  <b className="nm-title" style={{ color: "var(--ink)" }}>{examLevel.label} · {currentSectionInfo.label}</b> — pilih tingkat kesulitan:
                </p>
                <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                  {["mudah", "sedang", "susah"].map(d => (
                    <div key={d} className="nm-card nm-card-tap" style={{ cursor: "pointer", display: "flex", alignItems: "center", gap: 12 }}
                      onClick={() => setExamDifficulty(d)}>
                      <div style={{ width: 40, height: 40, borderRadius: 12, background: `var(--${diffColor[d]}-tint)`, display: "flex",
                        alignItems: "center", justifyContent: "center", flexShrink: 0, color: `var(--${diffColor[d]})`, fontWeight: 700, fontSize: 13 }}>
                        {DIFFICULTY[d].label[0]}
                      </div>
                      <div style={{ flex: 1 }}>
                        <p style={{ fontSize: 14, fontWeight: 700, margin: 0 }}>{DIFFICULTY[d].label}</p>
                        <p style={{ fontSize: 11.5, color: "var(--text-secondary)", margin: "2px 0 0" }}>{diffDesc[d]}</p>
                      </div>
                      <ChevronRight size={16} color="var(--text-secondary)" aria-hidden="true" />
                    </div>
                  ))}
                </div>
              </div>
            );
          }

          if (examSection && examDifficulty && !examPracticeLevel) {
            const currentSectionInfo = sections.find(s => s.id === examSection);
            return (
              <div>
                <button onClick={() => { setExamDifficulty(null); setConfirmRepeatLevel(null); }} style={{ display: "flex", alignItems: "center", gap: 4,
                  background: "none", border: "none", color: "var(--text-secondary)", fontFamily: "'Zen Maru Gothic', sans-serif",
                  fontSize: 12.5, fontWeight: 700, cursor: "pointer", padding: 0, marginBottom: 12 }}>
                  <ChevronRight size={14} style={{ transform: "rotate(180deg)" }} aria-hidden="true" /> Ganti kesulitan
                </button>
                <p style={{ fontSize: 13, color: "var(--text-secondary)", margin: "0 0 12px" }}>
                  <b className="nm-title" style={{ color: "var(--ink)" }}>{examLevel.label} · {currentSectionInfo.label} · {DIFFICULTY[examDifficulty].label}</b> — pilih level latihan (tiap level materinya beda):
                </p>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(5, minmax(0,1fr))", gap: 8 }}>
                  {Array.from({ length: 10 }, (_, i) => i + 1).map(n => {
                    const key = practiceLevelKey(examLevel.id, examSection, examDifficulty, n);
                    const record = completedPracticeLevels[key];
                    const passed = record && record.passed;
                    const prevKey = practiceLevelKey(examLevel.id, examSection, examDifficulty, n - 1);
                    const unlocked = n === 1 || (completedPracticeLevels[prevKey] && completedPracticeLevels[prevKey].passed);
                    return (
                      <button key={n}
                        onClick={() => {
                          if (!unlocked) return;
                          record ? setConfirmRepeatLevel(n) : startExam(examLevel, examSection, examDifficulty, n);
                        }}
                        className="nm-lvl-btn" style={{
                          padding: "14px 0", fontSize: 16, position: "relative",
                          background: passed ? "var(--matcha)" : "var(--card-bg)",
                          borderColor: passed ? "var(--matcha)" : "var(--line)",
                          color: passed ? "#fff" : unlocked ? "var(--ink)" : "var(--text-muted)",
                          opacity: unlocked ? 1 : 0.6,
                          cursor: unlocked ? "pointer" : "not-allowed",
                        }}>
                        {unlocked ? n : <Lock size={14} aria-hidden="true" />}
                        {passed && <Check size={12} style={{ position: "absolute", top: 3, right: 3 }} aria-hidden="true" />}
                      </button>
                    );
                  })}
                </div>
                <p style={{ fontSize: 11, color: "var(--text-secondary)", margin: "8px 0 0" }}>🔒 Level berikutnya terbuka setelah lulus level sebelumnya (minimal 70%).</p>
                {confirmRepeatLevel !== null && (
                  <div className="nm-card" style={{ marginTop: 12, textAlign: "center" }}>
                    <p style={{ fontSize: 13.5, fontWeight: 700, margin: "0 0 12px" }}>Ingin mengulangi latihan ini?</p>
                    <div style={{ display: "flex", gap: 8, justifyContent: "center" }}>
                      <button onClick={() => { const n = confirmRepeatLevel; setConfirmRepeatLevel(null); startExam(examLevel, examSection, examDifficulty, n); }}
                        style={{ background: "var(--momiji)", color: "#fff", border: "none", borderRadius: 12, padding: "8px 20px",
                          fontFamily: "'Zen Maru Gothic', sans-serif", fontWeight: 700, fontSize: 13, cursor: "pointer" }}>Ya</button>
                      <button onClick={() => setConfirmRepeatLevel(null)}
                        style={{ background: "var(--card-bg)", color: "var(--ink)", border: "2px solid var(--line)", borderRadius: 12, padding: "8px 20px",
                          fontFamily: "'Zen Maru Gothic', sans-serif", fontWeight: 700, fontSize: 13, cursor: "pointer" }}>Tidak</button>
                    </div>
                  </div>
                )}
              </div>
            );
          }

          const currentSection = sections.find(s => s.id === examSection);
          const q = examQuestions[quizIdx];

          return (
            <div className="nm-card">
              <Tape color="var(--momiji)" />
              <button onClick={exitExam} style={{ display: "flex", alignItems: "center", gap: 4,
                background: "none", border: "none", color: "var(--text-secondary)", fontFamily: "'Zen Maru Gothic', sans-serif",
                fontSize: 12, fontWeight: 700, cursor: "pointer", padding: 0, marginBottom: 10 }}>
                <ChevronRight size={13} style={{ transform: "rotate(180deg)" }} aria-hidden="true" /> {examLevel.label} · {currentSection.label} · {DIFFICULTY[examDifficulty]?.label} · Lv.{examPracticeLevel}
              </button>
              {examQuestions.length === 0 ? (
                <p style={{ fontSize: 13, color: "var(--text-secondary)" }}>Materi untuk bagian ini belum cukup tersedia di level ini.</p>
              ) : !quizDone ? (
                <>
                  <p style={{ fontSize: 12, color: "var(--text-secondary)", margin: "4px 0 8px" }}>Soal {quizIdx + 1} dari {examQuestions.length}</p>
                  {q.passage && (
                    <div style={{ background: "var(--matcha-tint)", borderRadius: 12, padding: "10px 12px", marginBottom: 12, fontSize: 13, lineHeight: 1.7 }}>
                      {q.passage}
                    </div>
                  )}
                  {q.audio && (
                    <div style={{ marginBottom: 12 }}>
                      {q.sub && (
                        <p style={{ fontSize: 11, fontWeight: 700, color: "var(--momiji)", margin: "0 0 8px", textAlign: "center" }}>
                          {q.sub}
                        </p>
                      )}
                      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }}>
                        <SpeakBtn text={q.audio} size={26} />
                        <span style={{ fontSize: 11, color: "var(--text-secondary)" }}>Ketuk untuk dengarkan</span>
                      </div>
                      {quizSel !== null && q.dialogText && examDifficulty !== "susah" && (
                        <div style={{ background: "var(--momiji-tint)", borderRadius: 12, padding: "10px 12px", marginTop: 10,
                          fontSize: 12.5, lineHeight: 1.8, whiteSpace: "pre-line" }}>
                          <p style={{ fontSize: 11, fontWeight: 700, margin: "0 0 4px", color: "var(--momiji)" }}>Transkrip:</p>
                          {q.dialogText}
                        </div>
                      )}
                    </div>
                  )}
                  <p style={{ fontSize: 15, fontWeight: 700, margin: "0 0 4px" }}>{q.q}</p>
                  {q.sub && !q.audio && <p style={{ fontSize: 12, color: "var(--text-secondary)", margin: "0 0 10px" }}>{q.sub}</p>}
                  <div style={{ marginTop: (q.sub && !q.audio) ? 0 : 10 }}>
                    {q.choices.map((opt, i) => {
                      const isSel = i === quizSel;
                      let style = isSel
                        ? { background: "var(--momiji-tint)", borderColor: "var(--momiji)", color: "var(--ink)" }
                        : { background: "var(--card-bg)", borderColor: "var(--line)", color: "var(--ink)" };
                      return (
                        <button key={i} onClick={() => submitAnswer(i)} className={isSel ? "nm-quiz-option-selected" : ""} style={{
                          display: "block", width: "100%", textAlign: "left", padding: "10px 12px",
                          marginBottom: 8, borderRadius: 14, border: `2px solid ${style.borderColor}`,
                          background: style.background, color: style.color,
                          fontFamily: "inherit", fontSize: 13.5, cursor: "pointer" }}>
                          {opt}
                        </button>
                      );
                    })}
                  </div>
                  {quizSel !== null && (
                    <button onClick={nextQuestion} style={{ marginTop: 6, display: "inline-flex", alignItems: "center", gap: 4,
                      background: "var(--momiji)", color: "#fff", border: "none", borderRadius: 12, padding: "9px 16px",
                      fontFamily: "'Zen Maru Gothic', sans-serif", fontWeight: 700, fontSize: 13, cursor: "pointer" }}>
                      {quizIdx + 1 < examQuestions.length ? "Soal berikutnya" : "Lihat hasil"} <ChevronRight size={14} aria-hidden="true" />
                    </button>
                  )}
                </>
              ) : (() => {
                const passed = examQuestions.length > 0 && quizScore / examQuestions.length >= 0.7;
                const hasNextLevel = examPracticeLevel < 10;
                return (
                <div style={{ textAlign: "center", padding: "1rem 0" }}>
                  <p className="nm-title" style={{ fontSize: 24, margin: "4px 0 6px" }}>{quizScore} / {examQuestions.length} benar</p>
                  <p style={{ fontSize: 13, color: passed ? "var(--matcha)" : "var(--sakura)", fontWeight: 700, margin: "0 0 14px" }}>
                    {passed ? "✅ Bagus! Siap lanjut ke level berikutnya." : "Belum lancar. Yuk ulangi lagi biar makin ingat."}
                  </p>
                  <div style={{ display: "flex", gap: 8, justifyContent: "center", flexWrap: "wrap", marginBottom: showPembahasan ? 16 : 0 }}>
                    {passed && hasNextLevel && (
                      <button onClick={() => startExam(examLevel, examSection, examDifficulty, examPracticeLevel + 1)}
                        style={{ background: "var(--matcha)", color: "#fff", border: "none",
                        borderRadius: 12, padding: "9px 16px", fontFamily: "'Zen Maru Gothic', sans-serif", fontWeight: 700,
                        fontSize: 13, cursor: "pointer" }}>Lanjut ke Level {examPracticeLevel + 1} →</button>
                    )}
                    <button onClick={restartQuiz} style={{ background: passed ? "var(--card-bg)" : "var(--momiji)", color: passed ? "var(--ink)" : "#fff", border: passed ? "2px solid var(--line)" : "none",
                      borderRadius: 12, padding: "9px 16px", fontFamily: "'Zen Maru Gothic', sans-serif", fontWeight: 700,
                      fontSize: 13, cursor: "pointer" }}>Ulangi bagian ini</button>
                    <button onClick={() => setShowPembahasan(s => !s)} style={{ background: "var(--card-bg)", color: "var(--sora)", border: "2px solid var(--sora)",
                      borderRadius: 12, padding: "9px 16px", fontFamily: "'Zen Maru Gothic', sans-serif", fontWeight: 700,
                      fontSize: 13, cursor: "pointer" }}>{showPembahasan ? "Tutup pembahasan" : "📖 Lihat pembahasan"}</button>
                  </div>
                  {showPembahasan && (
                    <div style={{ textAlign: "left" }}>
                      {userAnswers.map((a, idx) => {
                        const isCorrect = a.selected === a.question.correct;
                        return (
                          <div key={idx} style={{
                            borderRadius: 14, border: `2px solid ${isCorrect ? "var(--matcha)" : "var(--sakura)"}`,
                            background: isCorrect ? "var(--matcha-tint)" : "var(--sakura-tint)",
                            padding: "10px 12px", marginBottom: 10,
                          }}>
                            <div style={{ display: "flex", alignItems: "flex-start", gap: 6, marginBottom: 6 }}>
                              {isCorrect ? <Check size={16} color="var(--matcha)" aria-hidden="true" style={{ flexShrink: 0, marginTop: 2 }} />
                                : <span style={{ color: "var(--sakura)", fontWeight: 700, flexShrink: 0 }}>✕</span>}
                              <p style={{ fontSize: 12, fontWeight: 700, margin: 0, color: "var(--text-secondary)" }}>Soal {idx + 1}</p>
                            </div>
                            {a.question.passage && (
                              <p style={{ fontSize: 12.5, margin: "0 0 6px", fontStyle: "italic", color: "var(--text-body)" }}>{a.question.passage}</p>
                            )}
                            <p style={{ fontSize: 13.5, fontWeight: 700, margin: "0 0 6px" }}>{a.question.q}</p>
                            <p style={{ fontSize: 12.5, margin: "0 0 3px" }}>
                              Jawabanmu: <b style={{ color: isCorrect ? "var(--matcha)" : "var(--sakura)" }}>{a.selected}</b>
                              {!isCorrect && <> · Jawaban benar: <b style={{ color: "var(--matcha)" }}>{a.question.correct}</b></>}
                            </p>
                            {a.question.explain && (
                              <p style={{ fontSize: 12, color: "var(--text-body)", margin: "6px 0 0", lineHeight: 1.6 }}>
                                💡 {a.question.explain}
                              </p>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
                );
              })()}
            </div>
          );
        })()}
      </div>

      {flash && (() => {
        const n = flash.list.length;
        const i = Math.min(flash.index, n - 1);
        const isKanji = flash.kind === "kanji";
        const item = flash.list[i];
        const char = isKanji ? item : item.char;
        const k = isKanji ? (KANJI_CONTENT[item] || {}) : null;
        const markKey = isKanji ? `${flash.cat}:${item}` : item.key;
        const marked = isKanji ? !!checked[markKey] : !!kanaKnown[markKey];
        const toggleMark = () => {
          if (isKanji) toggle(flash.cat, item);
          else setKanaKnown(prev => ({ ...prev, [markKey]: !prev[markKey] }));
        };
        const onTouchStart = (e) => { const t = e.touches[0]; flashTouch.current = { x: t.clientX, y: t.clientY, swiped: false }; };
        const onTouchEnd = (e) => {
          const st = flashTouch.current; if (st.x == null) return;
          const t = e.changedTouches[0]; const dx = t.clientX - st.x; const dy = t.clientY - st.y;
          if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy)) { st.swiped = true; flashGo(dx < 0 ? 1 : -1); }
          st.x = null;
        };
        const onCardClick = () => {
          if (flashTouch.current.swiped) { flashTouch.current.swiped = false; return; }
          setFlashFlipped(v => !v);
        };
        return (
          <div className="nm-flash-overlay" role="dialog" aria-modal="true" aria-label={`Flashcard ${char}`} onClick={flashClose}>
            <div className="nm-flash-box" onClick={(e) => e.stopPropagation()}>
              <div className="nm-flash-head">
                <span>{isKanji ? "Kanji" : "Kana"} · {i + 1} / {n}</span>
                <button className="nm-flash-close" onClick={flashClose} aria-label="Tutup flashcard">✕</button>
              </div>
              <div className={`nm-flash-card${flashFlipped ? " is-flipped" : ""}`} onClick={onCardClick}
                onTouchStart={onTouchStart} onTouchEnd={onTouchEnd}>
                <div className="nm-flash-face nm-flash-front" aria-hidden={flashFlipped}>
                  <StrokeSvg key={`${char}-${i}`} char={char} folder={isKanji ? "svgsJa" : "svgsJaKana"} size={isKanji ? 150 : 130} />
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 10, marginTop: 6 }}>
                    <span className="nm-title" style={{ fontSize: 44, lineHeight: 1.1 }}>{char}</span>
                    <SpeakBtn text={char} size={16} />
                  </div>
                  <p className="nm-flash-hint">Ketuk kartu untuk {isKanji ? "lihat arti & cara baca" : "lihat cara baca"}</p>
                </div>
                <div className="nm-flash-face nm-flash-back" aria-hidden={!flashFlipped}>
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 10, marginBottom: 10 }}>
                    <span className="nm-title" style={{ fontSize: 40, lineHeight: 1.1 }}>{char}</span>
                    <SpeakBtn text={char} size={16} />
                  </div>
                  {isKanji ? (
                    <div style={{ width: "100%", maxWidth: 340, textAlign: "left" }}>
                      <p style={{ fontSize: 15, margin: "0 0 6px" }}><b>On:</b> {k.on}</p>
                      <p style={{ fontSize: 15, margin: "0 0 6px" }}><b>Kun:</b> {k.kun}</p>
                      <p style={{ fontSize: 15, margin: "0 0 12px", color: "var(--text-body)" }}>Arti: <b style={{ color: "var(--ink)" }}>{k.arti}</b></p>
                      {k.kombinasi && k.kombinasi.length > 0 && (
                        <div style={{ borderTop: "1.5px dashed var(--line)", paddingTop: 10 }}>
                          {k.kombinasi.map((c, j) => (
                            <div key={j} style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 7 }}>
                              <span onClick={(e) => e.stopPropagation()}><SpeakBtn text={c.word} size={13} /></span>
                              <span style={{ fontSize: 14 }}>
                                <span className="nm-title" style={{ fontSize: 16 }}>{c.word}</span> ({c.reading}) = {c.arti}
                              </span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  ) : (
                    <p style={{ fontSize: 18, margin: 0, color: "var(--text-body)" }}>Dibaca: <b style={{ color: "var(--ink)", fontSize: 26 }}>{item.romaji}</b></p>
                  )}
                  <p className="nm-flash-hint">Ketuk lagi untuk balik</p>
                </div>
              </div>
              <div className="nm-flash-actions">
                <button className="nm-flash-btn" onClick={() => flashGo(-1)} aria-label="Sebelumnya">‹ Sebelumnya</button>
                <button className={`nm-flash-btn nm-flash-mark${marked ? " is-on" : ""}`} onClick={toggleMark} aria-pressed={marked}>
                  {marked ? "✓ Dikuasai" : "Tandai dikuasai"}
                </button>
                <button className="nm-flash-btn" onClick={() => flashGo(1)} aria-label="Berikutnya">Berikutnya ›</button>
              </div>
            </div>
          </div>
        );
      })()}

      <div className="nm-bottomnav">
        {TABS.map(t => {
          const Icon = t.icon;
          const active = tab === t.id;
          return (
            <button key={t.id} className={`nm-bottomnav-item ${active ? "active" : ""}`}
              style={{ "--tab-color": `var(--${t.color})` }}
              onClick={() => setTab(t.id)}>
              <span className="nm-bottomnav-icon">
                <Icon size={active ? 22 : 20} strokeWidth={active ? 2.4 : 2} aria-hidden="true" />
              </span>
              {t.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}

const rootEl = document.getElementById("root");
ReactDOM.createRoot(rootEl).render(<NihongoMichi />);
