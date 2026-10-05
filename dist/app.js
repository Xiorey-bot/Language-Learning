"use strict";

function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _toConsumableArray(r) { return _arrayWithoutHoles(r) || _iterableToArray(r) || _unsupportedIterableToArray(r) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _iterableToArray(r) { if ("undefined" != typeof Symbol && null != r[Symbol.iterator] || null != r["@@iterator"]) return Array.from(r); }
function _arrayWithoutHoles(r) { if (Array.isArray(r)) return _arrayLikeToArray(r); }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
var _React = React,
  useState = _React.useState,
  useMemo = _React.useMemo,
  useEffect = _React.useEffect;
function renderWithUnderline(text) {
  if (!text || typeof text !== "string" || text.indexOf("<<") === -1) return text;
  var parts = text.split(/(<<[^>]+>>)/g);
  return parts.map(function (part, i) {
    var m = part.match(/^<<([^>]+)>>$/);
    if (m) return React.createElement("u", {
      key: i
    }, m[1]);
    return part;
  });
}

// Ikon (Check, ChevronRight, Circle, Flame, BookOpen, BarChart3, Sparkles, PenLine, Volume2, Home, Book, Sun, Moon, Lock)
// didefinisikan di icons.js, dimuat sebelum file ini.

// Data (KANJI_CONTENT, VOCAB_CONTENT, GRAMMAR_CONTENT, PARTICLES, READING_CONTENT, CHOUKAI_CONTENT,
// LEVELS, QUIZ, KANA_ROWS, HIRAGANA, KATAKANA, KANA_GROUPS, DAILY_TASKS, WEEK_DAYS, TABS, JLPT_EXAM_CONTENT)
// dimuat sebagai variabel global lewat <script> terpisah di index.html sebelum file ini.

function shuffleArr(arr) {
  var a = _toConsumableArray(arr);
  for (var i = a.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    var _ref = [a[j], a[i]];
    a[i] = _ref[0];
    a[j] = _ref[1];
  }
  return a;
}
function pickN(arr, n) {
  return shuffleArr(arr).slice(0, n);
}
function chunkForLevel(pool, practiceLevel) {
  var totalChunks = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 10;
  if (!pool.length) return pool;
  var chunkSize = Math.max(1, Math.ceil(pool.length / totalChunks));
  var start = (practiceLevel - 1) * chunkSize;
  var chunk = pool.slice(start, start + chunkSize);
  return chunk.length > 0 ? chunk : pool.slice(-chunkSize);
}
function makeChoices(correct, pool) {
  var n = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 4;
  // Beberapa pool (terutama bacaan kanji) punya banyak nilai yang sama persis dari item yang berbeda
  // (banyak kanji berbeda dibaca sama). Tanpa dibersihkan dulu, dua pengecoh yang terpilih bisa
  // kebetulan bernilai identik, membuat satu soal punya dua pilihan jawaban yang teksnya sama persis.
  var uniquePool = _toConsumableArray(new Set(pool)).filter(function (x) {
    return x !== correct;
  });
  var distractors = pickN(uniquePool, n - 1);
  return shuffleArr([correct].concat(_toConsumableArray(distractors)));
}
function buildVocabPool(level) {
  var pool = [];
  (level.vocab || []).forEach(function (theme) {
    (VOCAB_CONTENT[theme] || []).forEach(function (w) {
      return pool.push(w);
    });
  });
  return pool;
}
function buildKanjiPool(level) {
  return (level.kanji || []).map(function (k) {
    return _objectSpread({
      "char": k
    }, KANJI_CONTENT[k] || {});
  }).filter(function (k) {
    return k.arti;
  });
}
function cleanReading(str) {
  if (!str) return "";
  var first = str.split("、")[0].split("・")[0];
  var cleaned = first.replace(/\./g, "").trim();
  return cleaned === "-" ? "" : cleaned;
}
var DIFFICULTY = {
  mudah: {
    count: 5,
    choices: 3,
    label: "Mudah"
  },
  sedang: {
    count: 10,
    choices: 4,
    label: "Sedang"
  },
  susah: {
    count: 15,
    choices: 5,
    label: "Susah"
  }
};
function findSentenceWithChar(level, _char) {
  var titles = (level.reading || []).filter(function (t) {
    return READING_CONTENT[t];
  });
  var candidates = [];
  titles.forEach(function (t) {
    (READING_CONTENT[t].text || []).forEach(function (s) {
      if (s.includes(_char)) candidates.push(s);
    });
  });
  if (candidates.length === 0) return null;
  return pickN(candidates, 1)[0];
}
function genKanji(level) {
  var difficulty = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "sedang";
  var practiceLevel = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 1;
  var cfg = DIFFICULTY[difficulty];
  var kanjiPool = buildKanjiPool(level).map(function (k) {
    return {
      "char": k["char"],
      reading: cleanReading(k.kun) || cleanReading(k.on),
      arti: k.arti
    };
  }).filter(function (k) {
    return k.reading && k.reading !== "-";
  });
  var readingPool = kanjiPool.map(function (k) {
    return k.reading;
  });
  var charPool = kanjiPool.map(function (k) {
    return k["char"];
  });
  var chunk = chunkForLevel(kanjiPool, practiceLevel);
  var picked = pickN(chunk, Math.min(cfg.count, chunk.length));
  var items = picked.map(function (k, idx) {
    var sentence = findSentenceWithChar(level, k["char"]);
    var isOrthography = idx % 2 === 1;
    if (isOrthography) {
      return {
        q: "\u300C".concat(k.reading, "\u300D\u306F\u6F22\u5B57\u3067\u3069\u308C\u3067\u3059\u304B\u3002"),
        correct: k["char"],
        choices: makeChoices(k["char"], charPool, cfg.choices),
        explain: "\u300C".concat(k.reading, "\u300D\u306F\u6F22\u5B57\u3067\u300C").concat(k["char"], "\u300D\u3068\u66F8\u304D\u307E\u3059\u3002\u610F\u5473\uFF1A").concat(k.arti, "\u3002")
      };
    }
    return {
      q: "\u6587\u4E2D\u306E\u300C".concat(k["char"], "\u300D\u306E\u8AAD\u307F\u65B9\u306F\u3069\u308C\u3067\u3059\u304B\u3002"),
      passage: sentence || undefined,
      correct: k.reading,
      choices: makeChoices(k.reading, readingPool, cfg.choices),
      explain: sentence ? "\u3053\u306E\u6587\u306E\u300C".concat(k["char"], "\u300D\u306F\"").concat(k.reading, "\"\u3068\u8AAD\u307F\u307E\u3059\u3002\u610F\u5473\uFF1A").concat(k.arti, "\u3002") : "\u300C".concat(k["char"], "\u300Ddibaca \"").concat(k.reading, "\", artinya: ").concat(k.arti, ".")
    };
  });
  return shuffleArr(items);
}

// Menyiapkan pasangan untuk kuis pencocokan (kanji<->arti atau kosakata<->arti), dengan kata/kanji
// dan arti yang unik supaya tidak ada dua pasangan dengan jawaban yang sama (tidak ambigu saat ditarik).
function buildMatchingPairs(level, type) {
  var count = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 6;
  var seenLeft = new Set();
  var seenRight = new Set();
  var uniq = [];
  var source = type === "kanji" ? buildKanjiPool(level).map(function (k) {
    return {
      left: k["char"],
      right: k.arti
    };
  }) : buildVocabPool(level).map(function (v) {
    return {
      left: v.jp,
      right: v.id
    };
  });
  shuffleArr(source).forEach(function (p) {
    if (!p.left || !p.right) return;
    if (seenLeft.has(p.left) || seenRight.has(p.right)) return;
    seenLeft.add(p.left);
    seenRight.add(p.right);
    uniq.push(p);
  });
  return pickN(uniq, Math.min(count, uniq.length)).map(function (p, i) {
    return {
      id: i,
      left: p.left,
      right: p.right
    };
  });
}
function genKosakata(level) {
  var difficulty = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "sedang";
  var practiceLevel = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 1;
  var cfg = DIFFICULTY[difficulty];
  var vocabPool = buildVocabPool(level).map(function (v) {
    return {
      "char": v.jp,
      reading: v.reading,
      arti: v.id
    };
  }).filter(function (v) {
    return v.reading && v.reading !== v["char"] && v["char"].length >= 2;
  });
  var artiPool = vocabPool.map(function (v) {
    return v.arti;
  });
  var chunk = chunkForLevel(vocabPool, practiceLevel);
  var picked = pickN(chunk, Math.min(cfg.count, chunk.length));
  var items = picked.map(function (v) {
    var sentence = findSentenceWithChar(level, v["char"]);
    return {
      q: "\u300C".concat(v["char"], "\u300D(").concat(v.reading, ") artinya apa?"),
      passage: sentence || undefined,
      correct: v.arti,
      choices: makeChoices(v.arti, artiPool, cfg.choices),
      explain: "\u300C".concat(v["char"], "\u300D(").concat(v.reading, ") artinya \"").concat(v.arti, "\".")
    };
  });
  return shuffleArr(items);
}
function genBunpou(level) {
  var difficulty = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "sedang";
  var practiceLevel = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 1;
  var cfg = DIFFICULTY[difficulty];
  var patterns = (level.grammar || []).filter(function (p) {
    return GRAMMAR_CONTENT[p] && GRAMMAR_CONTENT[p].contoh && GRAMMAR_CONTENT[p].contoh[0];
  });
  var namePool = patterns;
  var chunk = chunkForLevel(patterns, practiceLevel);
  var picked = pickN(chunk, Math.min(cfg.count, chunk.length));
  return picked.map(function (p) {
    var g = GRAMMAR_CONTENT[p];
    var c = g.contoh[0];
    return {
      q: "つぎの文で使われている文法はどれですか。",
      passage: c.jp,
      correct: p,
      choices: makeChoices(p, namePool, cfg.choices),
      explain: "Pola \"".concat(p, "\" \u2014 ").concat(g.arti, " Contoh: \"").concat(c.jp, "\" (").concat(c.romaji, ") artinya \"").concat(c.id, "\".")
    };
  });
}
function genDokkai(level) {
  var difficulty = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "sedang";
  var cfg = DIFFICULTY[difficulty];
  var dokkaiCount = Math.max(2, Math.round(cfg.count / 2));
  var titles = (level.reading || []).filter(function (t) {
    return READING_CONTENT[t] && READING_CONTENT[t].kosakata && READING_CONTENT[t].kosakata.length > 0;
  });
  if (titles.length === 0) return [];
  var globalReadingPool = titles.flatMap(function (t) {
    return READING_CONTENT[t].kosakata.map(function (w) {
      return w.reading;
    });
  });
  var picked = pickN(titles, Math.min(dokkaiCount, titles.length));
  return picked.map(function (t) {
    var r = READING_CONTENT[t];
    var w = pickN(r.kosakata, 1)[0];
    return {
      q: "\u3053\u306E\u6587\u7AE0\u306B\u51FA\u3066\u304D\u305F\u300C".concat(w.jp, "\u300D\u306E\u8AAD\u307F\u65B9\u306F\u3069\u308C\u3067\u3059\u304B\u3002"),
      passage: r.text.join(""),
      correct: w.reading,
      choices: makeChoices(w.reading, globalReadingPool, cfg.choices),
      explain: "\u300C".concat(w.jp, "\u300Ddibaca \"").concat(w.reading, "\", artinya: ").concat(w.arti, ". Kata ini muncul dalam bacaan \"").concat(t, "\".")
    };
  });
}
function genChoukai(level) {
  var difficulty = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "sedang";
  var cfg = DIFFICULTY[difficulty];
  var pool = CHOUKAI_CONTENT[level.id] || [];
  if (pool.length === 0) return [];
  return pickN(pool, Math.min(cfg.count, pool.length)).map(function (item) {
    return {
      q: item.q || "もっとも適切な返事を選んでください。",
      sub: item.type,
      audio: item.dialog,
      dialogText: item.dialog,
      correct: item.correct,
      choices: cfg.choices < 4 ? shuffleArr([item.correct].concat(_toConsumableArray(pickN(item.choices.filter(function (c) {
        return c !== item.correct;
      }), cfg.choices - 1)))) : shuffleArr(item.choices),
      explain: "Berdasarkan percakapan di atas (".concat(item.type, "), jawaban yang paling sesuai adalah \"").concat(item.correct, "\".")
    };
  });
}
function genKanaQuiz(script) {
  var difficulty = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "sedang";
  var practiceLevel = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 1;
  var cfg = DIFFICULTY[difficulty];
  var pool = [];
  var table = script === "hiragana" ? HIRAGANA : KATAKANA;
  Object.keys(table).forEach(function (r) {
    if (table[r]) pool.push({
      "char": table[r],
      romaji: r
    });
  });
  KANA_GROUPS.forEach(function (group) {
    group.entries.forEach(function (e) {
      var _char2 = script === "hiragana" ? e.h : e.k;
      if (_char2) pool.push({
        "char": _char2,
        romaji: e.r
      });
    });
  });
  var romajiPool = pool.map(function (p) {
    return p.romaji;
  });
  var charPool = pool.map(function (p) {
    return p["char"];
  });
  var chunk = chunkForLevel(pool, practiceLevel);
  var picked = pickN(chunk, Math.min(cfg.count, chunk.length));
  var items = picked.map(function (p, idx) {
    var isReverse = idx % 2 === 1;
    if (isReverse) {
      return {
        q: "Huruf yang dibaca \"".concat(p.romaji, "\" yang mana?"),
        correct: p["char"],
        choices: makeChoices(p["char"], charPool, cfg.choices),
        explain: "\"".concat(p.romaji, "\" ditulis \u300C").concat(p["char"], "\u300D.")
      };
    }
    return {
      q: "\u300C".concat(p["char"], "\u300Ddibaca apa?"),
      correct: p.romaji,
      choices: makeChoices(p.romaji, romajiPool, cfg.choices),
      explain: "\u300C".concat(p["char"], "\u300Ddibaca \"").concat(p.romaji, "\".")
    };
  });
  return shuffleArr(items);
}
function Ring(_ref2) {
  var pct = _ref2.pct,
    _ref2$size = _ref2.size,
    size = _ref2$size === void 0 ? 56 : _ref2$size,
    _ref2$color = _ref2.color,
    color = _ref2$color === void 0 ? "var(--sakura)" : _ref2$color,
    _ref2$showLabel = _ref2.showLabel,
    showLabel = _ref2$showLabel === void 0 ? true : _ref2$showLabel;
  var r = (size - 6) / 2,
    c = 2 * Math.PI * r;
  return /*#__PURE__*/React.createElement("svg", {
    width: size,
    height: size,
    style: {
      transform: "rotate(-90deg)"
    }
  }, /*#__PURE__*/React.createElement("circle", {
    cx: size / 2,
    cy: size / 2,
    r: r,
    fill: "none",
    stroke: "var(--line)",
    strokeWidth: "5"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: size / 2,
    cy: size / 2,
    r: r,
    fill: "none",
    stroke: color,
    strokeWidth: "5",
    className: "nm-ring-progress",
    strokeDasharray: c,
    strokeDashoffset: c - pct / 100 * c,
    strokeLinecap: "round"
  }), showLabel && /*#__PURE__*/React.createElement("text", {
    x: size / 2,
    y: size / 2,
    fill: "var(--ink)",
    fontSize: "13",
    fontWeight: "700",
    textAnchor: "middle",
    dominantBaseline: "middle",
    transform: "rotate(90 ".concat(size / 2, " ").concat(size / 2, ")")
  }, Math.round(pct), "%"));
}
function Hanko(_ref3) {
  var show = _ref3.show;
  if (!show) return null;
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      width: 46,
      height: 46,
      borderRadius: 10,
      border: "3px solid var(--sakura)",
      color: "var(--sakura)",
      background: "var(--card-bg)",
      fontFamily: "'Shippori Mincho', serif",
      fontSize: 21,
      fontWeight: 700,
      transform: "rotate(-6deg)",
      flexShrink: 0,
      boxShadow: "0 3px 0 rgba(255,111,145,0.25)"
    }
  }, "\u6E08");
}
function Tape(_ref4) {
  var color = _ref4.color,
    _ref4$side = _ref4.side,
    side = _ref4$side === void 0 ? "left" : _ref4$side;
  return /*#__PURE__*/React.createElement("div", {
    style: _defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty({
      position: "absolute",
      top: -10
    }, side, 18), "width", 54), "height", 22), "background", color), "opacity", 0.85), "transform", "rotate(-5deg)"), "borderRadius", 3), "boxShadow", "0 2px 4px rgba(0,0,0,0.08)")
  });
}
function VocabFlashcards(_ref6) {
  var words = _ref6.words;
  var _useState = useState(0),
    _useState2 = _slicedToArray(_useState, 2),
    idx = _useState2[0],
    setIdx = _useState2[1];
  var _useState3 = useState(false),
    _useState4 = _slicedToArray(_useState3, 2),
    flipped = _useState4[0],
    setFlipped = _useState4[1];
  useEffect(function () {
    setIdx(0);
    setFlipped(false);
  }, [words]);
  var speakWord = function speakWord(text) {
    try {
      if (!window.speechSynthesis) return;
      window.speechSynthesis.cancel();
      var utter = new SpeechSynthesisUtterance(text);
      utter.lang = "ja-JP";
      utter.rate = 0.8;
      window.speechSynthesis.speak(utter);
    } catch (e) {/* speech not supported, silently ignore */}
  };
  if (!words || words.length === 0) return null;
  var w = words[idx];
  var goNext = function goNext() {
    setFlipped(false);
    setIdx(function (i) {
      return (i + 1) % words.length;
    });
  };
  var goPrev = function goPrev() {
    setFlipped(false);
    setIdx(function (i) {
      return (i - 1 + words.length) % words.length;
    });
  };
  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    onClick: function onClick() {
      return setFlipped(function (f) {
        return !f;
      });
    },
    style: {
      background: "var(--card-bg)",
      border: "2px solid var(--matcha)",
      borderRadius: 16,
      padding: "22px 16px",
      minHeight: 108,
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      textAlign: "center",
      cursor: "pointer",
      gap: 6
    }
  }, !flipped ? /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 8
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "nm-title",
    style: {
      fontSize: 21
    }
  }, w.jp), /*#__PURE__*/React.createElement("button", {
    onClick: function onClick(e) {
      e.stopPropagation();
      speakWord(w.jp);
    },
    title: "Dengar pelafalan",
    "aria-label": "Dengar pelafalan",
    style: {
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      width: 28,
      height: 28,
      borderRadius: "50%",
      border: "1.5px solid var(--line)",
      background: "var(--card-bg)",
      cursor: "pointer",
      flexShrink: 0,
      padding: 0
    }
  }, /*#__PURE__*/React.createElement(Volume2, {
    size: 14,
    color: "var(--sora)",
    "aria-hidden": "true"
  }))), /*#__PURE__*/React.createElement("span", {
    style: {
      color: "var(--text-secondary)",
      fontSize: 14
    }
  }, "(", w.reading, ")"), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 10.5,
      color: "var(--text-muted)",
      marginTop: 4
    }
  }, "Ketuk kartu untuk lihat arti")) : /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 16,
      fontWeight: 700,
      color: "var(--matcha)"
    }
  }, w.id), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 11.5,
      color: "var(--text-secondary)",
      marginTop: 4
    }
  }, w.jp, "\uFF08", w.reading, "\uFF09"))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      marginTop: 8
    }
  }, /*#__PURE__*/React.createElement("button", {
    onClick: goPrev,
    "aria-label": "Kata sebelumnya",
    style: {
      background: "var(--card-bg)",
      border: "1.5px solid var(--line)",
      borderRadius: "50%",
      cursor: "pointer",
      width: 32,
      height: 32,
      display: "flex",
      alignItems: "center",
      justifyContent: "center"
    }
  }, /*#__PURE__*/React.createElement(ChevronRight, {
    size: 16,
    color: "var(--matcha)",
    style: {
      transform: "rotate(180deg)"
    },
    "aria-hidden": "true"
  })), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 11.5,
      color: "var(--text-secondary)",
      fontWeight: 700
    }
  }, idx + 1, " / ", words.length), /*#__PURE__*/React.createElement("button", {
    onClick: goNext,
    "aria-label": "Kata berikutnya",
    style: {
      background: "var(--card-bg)",
      border: "1.5px solid var(--line)",
      borderRadius: "50%",
      cursor: "pointer",
      width: 32,
      height: 32,
      display: "flex",
      alignItems: "center",
      justifyContent: "center"
    }
  }, /*#__PURE__*/React.createElement(ChevronRight, {
    size: 16,
    color: "var(--matcha)",
    "aria-hidden": "true"
  }))));
}

// Kuis pencocokan gaya "tarik garis": tarik dari kartu kiri (kanji/kosakata) ke kartu kanan
// (artinya) yang berjajar acak. Ditarik lewat Pointer Events supaya jalan sama baiknya di mouse
// (desktop) maupun sentuhan (HP/tablet); garis SVG mengikuti jari/kursor secara langsung, dan
// pasangan yang sudah benar tetap digambar sebagai garis hijau permanen.
function MatchingQuiz(_ref7) {
  var pairs = _ref7.pairs;
  var _useState5 = useState([]),
    _useState6 = _slicedToArray(_useState5, 2),
    leftOrder = _useState6[0],
    setLeftOrder = _useState6[1];
  var _useState7 = useState([]),
    _useState8 = _slicedToArray(_useState7, 2),
    rightOrder = _useState8[0],
    setRightOrder = _useState8[1];
  var _useState9 = useState({}),
    _useState0 = _slicedToArray(_useState9, 2),
    matched = _useState0[0],
    setMatched = _useState0[1];
  var _useState1 = useState(null),
    _useState10 = _slicedToArray(_useState1, 2),
    justMatched = _useState10[0],
    setJustMatched = _useState10[1];
  var _useState11 = useState(null),
    _useState12 = _slicedToArray(_useState11, 2),
    dragId = _useState12[0],
    setDragId = _useState12[1];
  var _useState13 = useState(null),
    _useState14 = _slicedToArray(_useState13, 2),
    dragPos = _useState14[0],
    setDragPos = _useState14[1];
  var _useState15 = useState(null),
    _useState16 = _slicedToArray(_useState15, 2),
    hoverId = _useState16[0],
    setHoverId = _useState16[1];
  var _useState17 = useState(null),
    _useState18 = _slicedToArray(_useState17, 2),
    wrongId = _useState18[0],
    setWrongId = _useState18[1];
  var _useState19 = useState(null),
    _useState20 = _slicedToArray(_useState19, 2),
    failLine = _useState20[0],
    setFailLine = _useState20[1];
  var _useState21 = useState({}),
    _useState22 = _slicedToArray(_useState21, 2),
    coords = _useState22[0],
    setCoords = _useState22[1];
  var _useState23 = useState(function () {
      return Date.now();
    }),
    _useState24 = _slicedToArray(_useState23, 2),
    startedAt = _useState24[0],
    setStartedAt = _useState24[1];
  var _useState25 = useState(null),
    _useState26 = _slicedToArray(_useState25, 2),
    finishedSecs = _useState26[0],
    setFinishedSecs = _useState26[1];
  var containerRef = React.useRef(null);
  var leftRefs = React.useRef({});
  var rightRefs = React.useRef({});
  useEffect(function () {
    setLeftOrder(shuffleArr(pairs));
    setRightOrder(shuffleArr(pairs));
    setMatched({});
    setDragId(null);
    setDragPos(null);
    setWrongId(null);
    setHoverId(null);
    setFailLine(null);
    setJustMatched(null);
    setStartedAt(Date.now());
    setFinishedSecs(null);
  }, [pairs]);
  var recomputeCoords = function recomputeCoords() {
    var cont = containerRef.current;
    if (!cont) return;
    var cr = cont.getBoundingClientRect();
    var next = {};
    pairs.forEach(function (p) {
      var lEl = leftRefs.current[p.id];
      var rEl = rightRefs.current[p.id];
      var entry = {};
      if (lEl) {
        var r = lEl.getBoundingClientRect();
        entry.lx = r.right - cr.left;
        entry.ly = r.top + r.height / 2 - cr.top;
      }
      if (rEl) {
        var _r = rEl.getBoundingClientRect();
        entry.rx = _r.left - cr.left;
        entry.ry = _r.top + _r.height / 2 - cr.top;
      }
      next[p.id] = entry;
    });
    setCoords(next);
  };
  useEffect(function () {
    recomputeCoords();
    var onResize = function onResize() {
      return recomputeCoords();
    };
    window.addEventListener("resize", onResize);
    return function () {
      return window.removeEventListener("resize", onResize);
    };
    // eslint-disable-next-line
  }, [leftOrder, rightOrder]);
  var allMatched = pairs.length > 0 && pairs.every(function (p) {
    return matched[p.id];
  });
  useEffect(function () {
    if (allMatched && finishedSecs === null) setFinishedSecs(Math.max(1, Math.round((Date.now() - startedAt) / 1000)));
    // eslint-disable-next-line
  }, [allMatched]);

  // Garis melengkung ala "kabel"/string, bukan garis lurus kaku — jauh lebih terasa alami dan mengalir.
  var flowPath = function flowPath(x1, y1, x2, y2) {
    var midX = (x1 + x2) / 2;
    return "M ".concat(x1, " ").concat(y1, " C ").concat(midX, " ").concat(y1, ", ").concat(midX, " ").concat(y2, ", ").concat(x2, " ").concat(y2);
  };
  var hitTestRight = function hitTestRight(clientX, clientY) {
    var hitId = null;
    Object.keys(rightRefs.current).forEach(function (key) {
      var el = rightRefs.current[key];
      if (!el) return;
      var r = el.getBoundingClientRect();
      if (clientX >= r.left && clientX <= r.right && clientY >= r.top && clientY <= r.bottom) hitId = Number(key);
    });
    return hitId;
  };
  var startDrag = function startDrag(id) {
    return function (e) {
      if (matched[id] || !containerRef.current) return;
      if (e.currentTarget.setPointerCapture) {
        try {
          e.currentTarget.setPointerCapture(e.pointerId);
        } catch (err) {}
      }
      var cr = containerRef.current.getBoundingClientRect();
      setDragId(id);
      setDragPos({
        x: e.clientX - cr.left,
        y: e.clientY - cr.top
      });
    };
  };
  var onMove = function onMove(e) {
    if (dragId === null || !containerRef.current) return;
    var cr = containerRef.current.getBoundingClientRect();
    setDragPos({
      x: e.clientX - cr.left,
      y: e.clientY - cr.top
    });
    setHoverId(hitTestRight(e.clientX, e.clientY));
  };
  var finishDrag = function finishDrag(clientX, clientY) {
    if (dragId === null) return;
    var hitId = hitTestRight(clientX, clientY);
    if (hitId !== null) {
      if (hitId === dragId) {
        setMatched(function (m) {
          return _objectSpread(_objectSpread({}, m), {}, _defineProperty({}, dragId, true));
        });
        setJustMatched(dragId);
        setTimeout(function () {
          return setJustMatched(function (j) {
            return j === dragId ? null : j;
          });
        }, 500);
      } else {
        setFailLine({
          from: dragId,
          to: hitId
        });
        setWrongId(hitId);
        setTimeout(function () {
          setWrongId(null);
          setFailLine(null);
        }, 380);
      }
    }
    setDragId(null);
    setDragPos(null);
    setHoverId(null);
  };
  var onUp = function onUp(e) {
    return finishDrag(e.clientX, e.clientY);
  };
  if (!pairs || pairs.length < 2) {
    return /*#__PURE__*/React.createElement("p", {
      style: {
        fontSize: 13,
        color: "var(--text-secondary)",
        textAlign: "center",
        padding: "1rem 0"
      }
    }, "Materinya belum cukup untuk kuis pencocokan di level ini.");
  }
  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    ref: containerRef,
    onPointerMove: onMove,
    onPointerUp: onUp,
    onPointerCancel: function onPointerCancel() {
      setDragId(null);
      setDragPos(null);
      setHoverId(null);
    },
    style: {
      position: "relative",
      userSelect: "none",
      cursor: dragId !== null ? "grabbing" : "default"
    }
  }, /*#__PURE__*/React.createElement("svg", {
    width: "100%",
    height: "100%",
    style: {
      position: "absolute",
      inset: 0,
      pointerEvents: "none",
      overflow: "visible"
    },
    "aria-hidden": "true"
  }, pairs.filter(function (p) {
    return matched[p.id] && coords[p.id] && coords[p.id].lx !== undefined && coords[p.id].rx !== undefined;
  }).map(function (p) {
    return /*#__PURE__*/React.createElement("g", {
      key: p.id,
      className: justMatched === p.id ? "nm-match-line-pop" : undefined
    }, /*#__PURE__*/React.createElement("path", {
      d: flowPath(coords[p.id].lx, coords[p.id].ly, coords[p.id].rx, coords[p.id].ry),
      fill: "none",
      stroke: "var(--matcha)",
      strokeWidth: 5,
      strokeLinecap: "round",
      opacity: 0.22
    }), /*#__PURE__*/React.createElement("path", {
      d: flowPath(coords[p.id].lx, coords[p.id].ly, coords[p.id].rx, coords[p.id].ry),
      fill: "none",
      stroke: "var(--matcha)",
      strokeWidth: 2.5,
      strokeLinecap: "round"
    }));
  }), failLine && coords[failLine.from] && coords[failLine.from].lx !== undefined && coords[failLine.to] && /*#__PURE__*/React.createElement("path", {
    d: flowPath(coords[failLine.from].lx, coords[failLine.from].ly, coords[failLine.to].rx, coords[failLine.to].ry),
    fill: "none",
    stroke: "var(--sakura)",
    strokeWidth: 2.5,
    strokeLinecap: "round",
    className: "nm-match-line-fail"
  }), dragId !== null && dragPos && coords[dragId] && coords[dragId].lx !== undefined && /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("path", {
    d: flowPath(coords[dragId].lx, coords[dragId].ly, dragPos.x, dragPos.y),
    fill: "none",
    stroke: "var(--momiji)",
    strokeWidth: 5,
    strokeLinecap: "round",
    opacity: 0.18
  }), /*#__PURE__*/React.createElement("path", {
    d: flowPath(coords[dragId].lx, coords[dragId].ly, dragPos.x, dragPos.y),
    fill: "none",
    stroke: "var(--momiji)",
    strokeWidth: 2.5,
    strokeLinecap: "round"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: dragPos.x,
    cy: dragPos.y,
    r: 9,
    fill: "var(--momiji)",
    opacity: 0.25
  }), /*#__PURE__*/React.createElement("circle", {
    cx: dragPos.x,
    cy: dragPos.y,
    r: 5,
    fill: "var(--momiji)"
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 14,
      position: "relative"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 10,
      flex: 1,
      minWidth: 0
    }
  }, leftOrder.map(function (p) {
    return /*#__PURE__*/React.createElement("div", {
      key: p.id,
      ref: function ref(el) {
        leftRefs.current[p.id] = el;
      },
      "data-match-id": p.id,
      onPointerDown: startDrag(p.id),
      className: "nm-match-node nm-match-left" + (matched[p.id] ? " nm-match-done" : "") + (dragId === p.id ? " nm-match-active" : "") + (justMatched === p.id ? " nm-match-pop" : "")
    }, /*#__PURE__*/React.createElement("span", {
      className: "nm-title",
      style: {
        fontSize: 16
      }
    }, p.left), matched[p.id] && /*#__PURE__*/React.createElement(Check, {
      size: 14,
      color: "var(--matcha)",
      "aria-hidden": "true",
      style: {
        marginLeft: "auto",
        flexShrink: 0
      }
    }));
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 10,
      flex: 1,
      minWidth: 0
    }
  }, rightOrder.map(function (p) {
    return /*#__PURE__*/React.createElement("div", {
      key: p.id,
      ref: function ref(el) {
        rightRefs.current[p.id] = el;
      },
      "data-match-id": p.id,
      className: "nm-match-node nm-match-right" + (matched[p.id] ? " nm-match-done" : "") + (wrongId === p.id ? " nm-match-wrong" : "") + (hoverId === p.id && dragId !== null && !matched[p.id] ? " nm-match-hover" : "") + (justMatched === p.id ? " nm-match-pop" : "")
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 12.5
      }
    }, p.right));
  })))), allMatched && /*#__PURE__*/React.createElement("div", {
    style: {
      textAlign: "center",
      marginTop: 16,
      animation: "nm-fadeIn 0.3s ease"
    }
  }, /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 15,
      fontWeight: 700,
      color: "var(--matcha)",
      margin: "0 0 4px"
    }
  }, "\uD83C\uDF89 Semua cocok!"), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 12,
      color: "var(--text-secondary)"
    }
  }, "Selesai dalam ", finishedSecs, " detik.")));
}

// ============================================================================================
// Latihan Menulis (hiragana, katakana, kanji): pengguna menggambar tiap goresan di kanvas; goresan
// dinilai terhadap garis tengah (median) goresan asli dari WRITING_STROKES (urutan, arah, dan bentuk).
// Koordinat kanvas 1024x1024 (sumbu y ke bawah), sama dengan data sumber.
// ============================================================================================
function wrParse(ch) {
  var raw = typeof WRITING_STROKES !== "undefined" ? WRITING_STROKES[ch] : null;
  if (!raw) return null;
  return raw.split("|").map(function (s) {
    return s.split(" ").map(function (p) {
      var _p$split = p.split(","),
        _p$split2 = _slicedToArray(_p$split, 2),
        x = _p$split2[0],
        y = _p$split2[1];
      return [Number(x), Number(y)];
    });
  });
}
function wrDist(a, b) {
  return Math.hypot(a[0] - b[0], a[1] - b[1]);
}
function wrLen(pts) {
  var s = 0;
  for (var i = 1; i < pts.length; i++) s += wrDist(pts[i - 1], pts[i]);
  return s;
}
// Sampel ulang polyline menjadi n titik berjarak sama sepanjang garis (supaya kecepatan menggambar tidak berpengaruh).
function wrResample(pts, n) {
  var total = wrLen(pts);
  if (pts.length < 2 || total === 0) return Array.from({
    length: n
  }, function () {
    return pts[0];
  });
  var step = total / (n - 1);
  var out = [pts[0]];
  var need = step,
    a = pts[0];
  for (var i = 1; i < pts.length; i++) {
    var b = pts[i];
    var seg = wrDist(a, b);
    while (seg >= need && out.length < n) {
      var t = need / seg;
      a = [a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t];
      out.push(a);
      seg = wrDist(a, b);
      need = step;
    }
    need -= seg;
    a = b;
  }
  while (out.length < n) out.push(pts[pts.length - 1]);
  return out;
}
function wrMean(a, b) {
  var s = 0;
  for (var i = 0; i < a.length; i++) s += wrDist(a[i], b[i]);
  return s / a.length;
}
// Garis dihaluskan lewat titik tengah antar-titik (kurva kuadrat) supaya tidak patah-patah.
function wrSmooth(pts) {
  if (pts.length < 3) return "M " + pts.map(function (p) {
    return p[0] + " " + p[1];
  }).join(" L ");
  var d = "M ".concat(pts[0][0], " ").concat(pts[0][1]);
  for (var i = 1; i < pts.length - 1; i++) {
    var mx = (pts[i][0] + pts[i + 1][0]) / 2,
      my = (pts[i][1] + pts[i + 1][1]) / 2;
    d += " Q ".concat(pts[i][0], " ").concat(pts[i][1], " ").concat(mx, " ").concat(my);
  }
  var l = pts[pts.length - 1];
  return d + " L ".concat(l[0], " ").concat(l[1]);
}
// Menilai satu goresan pengguna terhadap goresan yang seharusnya (expectedIdx).
// Mengembalikan { ok } atau { ok:false, reason: "reverse" | "order" | "short" | "shape", idx? }.
function wrJudge(userPts, strokes, expectedIdx) {
  var N = 24,
    TOL = 125,
    END_TOL = 240;
  var uLen = wrLen(userPts);
  var u = wrResample(userPts, N);
  var score = function score(ref) {
    var refLen = wrLen(ref);
    var r = wrResample(ref, N);
    var fwd = wrMean(u, r);
    var rev = wrMean(u, r.slice().reverse());
    if (refLen < 150) {
      // titik / goresan sangat pendek: cukup letaknya berdekatan
      var rm = [(r[0][0] + r[N - 1][0]) / 2, (r[0][1] + r[N - 1][1]) / 2];
      var um = [(u[0][0] + u[N - 1][0]) / 2, (u[0][1] + u[N - 1][1]) / 2];
      return {
        ok: wrDist(um, rm) <= 170 && uLen <= refLen * 2.5 + 90,
        fwd: fwd,
        rev: rev,
        "short": true
      };
    }
    var ok = fwd <= TOL && wrDist(u[0], r[0]) <= END_TOL && wrDist(u[N - 1], r[N - 1]) <= END_TOL && uLen >= refLen * 0.45 && uLen <= refLen * 2.3;
    return {
      ok: ok,
      fwd: fwd,
      rev: rev,
      "short": false
    };
  };
  var exp = score(strokes[expectedIdx]);
  // Arah terbalik: bentuknya cocok, tetapi terbalik jauh lebih pas daripada searah (untuk goresan yang cukup panjang).
  if (!exp["short"] && exp.rev <= TOL && exp.rev < exp.fwd * 0.85) return {
    ok: false,
    reason: "reverse"
  };
  if (exp.ok) return {
    ok: true
  };
  for (var j = expectedIdx + 1; j < strokes.length; j++) {
    if (score(strokes[j]).ok) return {
      ok: false,
      reason: "order",
      idx: j
    };
  }
  if (uLen < wrLen(strokes[expectedIdx]) * 0.45) return {
    ok: false,
    reason: "short"
  };
  return {
    ok: false,
    reason: "shape"
  };
}
function WritingPractice(_ref8) {
  var _char3 = _ref8["char"],
    info = _ref8.info,
    onDone = _ref8.onDone,
    onNext = _ref8.onNext;
  var strokes = React.useMemo(function () {
    return wrParse(_char3);
  }, [_char3]);
  var paths = React.useMemo(function () {
    return strokes ? strokes.map(wrSmooth) : [];
  }, [strokes]);
  var svgRef = React.useRef(null);
  var liveRef = React.useRef(null);
  var _useState27 = useState(0),
    _useState28 = _slicedToArray(_useState27, 2),
    done = _useState28[0],
    setDone = _useState28[1];
  var _useState29 = useState(null),
    _useState30 = _slicedToArray(_useState29, 2),
    live = _useState30[0],
    setLive = _useState30[1];
  var _useState31 = useState(null),
    _useState32 = _slicedToArray(_useState31, 2),
    failed = _useState32[0],
    setFailed = _useState32[1];
  var _useState33 = useState(0),
    _useState34 = _slicedToArray(_useState33, 2),
    tries = _useState34[0],
    setTries = _useState34[1];
  var _useState35 = useState(0),
    _useState36 = _slicedToArray(_useState35, 2),
    mistakes = _useState36[0],
    setMistakes = _useState36[1];
  var _useState37 = useState(true),
    _useState38 = _slicedToArray(_useState37, 2),
    guide = _useState38[0],
    setGuide = _useState38[1];
  var _useState39 = useState(false),
    _useState40 = _slicedToArray(_useState39, 2),
    hint = _useState40[0],
    setHint = _useState40[1];
  var _useState41 = useState(null),
    _useState42 = _slicedToArray(_useState41, 2),
    msg = _useState42[0],
    setMsg = _useState42[1];
  var _useState43 = useState(-1),
    _useState44 = _slicedToArray(_useState43, 2),
    lastDone = _useState44[0],
    setLastDone = _useState44[1];
  var total = strokes ? strokes.length : 0;
  var finished = total > 0 && done >= total;
  useEffect(function () {
    if (finished && onDone) onDone(mistakes); /* eslint-disable-next-line */
  }, [finished]);
  var reset = function reset() {
    liveRef.current = null;
    setDone(0);
    setLive(null);
    setFailed(null);
    setTries(0);
    setMistakes(0);
    setHint(false);
    setMsg(null);
    setLastDone(-1);
  };
  var toPoint = function toPoint(e) {
    var r = svgRef.current.getBoundingClientRect();
    return [(e.clientX - r.left) * 1024 / r.width, (e.clientY - r.top) * 1024 / r.height];
  };
  var onDown = function onDown(e) {
    if (finished || !strokes) return;
    if (e.cancelable) e.preventDefault();
    try {
      svgRef.current.setPointerCapture(e.pointerId);
    } catch (err) {}
    liveRef.current = [toPoint(e)];
    setLive(liveRef.current.slice());
    setFailed(null);
  };
  var onMove = function onMove(e) {
    if (!liveRef.current) return;
    var p = toPoint(e);
    if (wrDist(p, liveRef.current[liveRef.current.length - 1]) < 4) return;
    liveRef.current.push(p);
    setLive(liveRef.current.slice());
  };
  var onUp = function onUp() {
    var pts = liveRef.current;
    liveRef.current = null;
    if (!pts) return;
    setLive(null);
    var j = wrJudge(pts, strokes, done);
    if (j.ok) {
      var next = done + 1;
      setDone(next);
      setLastDone(done);
      setTries(0);
      setHint(false);
      setMsg(next >= total ? {
        t: "ok",
        s: "Selesai! Semua goresan benar 🎉"
      } : {
        t: "ok",
        s: "Bagus! Lanjut ke goresan ke-".concat(next + 1, ".")
      });
      return;
    }
    var n = done + 1;
    var text = {
      reverse: guide ? "Arah goresannya terbalik. Mulai dari titik bernomor ".concat(n, ".") : "Arah goresannya terbalik. Coba mulai dari ujung yang satunya.",
      order: "Itu goresan ke-".concat((j.idx || 0) + 1, ". Urutan sekarang: goresan ke-").concat(n, "."),
      "short": "Goresannya terlalu pendek, tarik lebih panjang.",
      shape: "Belum pas. Ikuti bentuk goresan ke-".concat(n, " (tekan Petunjuk kalau perlu).")
    }[j.reason];
    setFailed(pts);
    setTimeout(function () {
      return setFailed(null);
    }, 450);
    setMistakes(function (m) {
      return m + 1;
    });
    var t2 = tries + 1;
    setTries(t2);
    if (t2 >= 3) {
      setHint(true);
      setMsg({
        t: "err",
        s: text + " Petunjuk ditampilkan."
      });
    } else setMsg({
      t: "err",
      s: text
    });
  };
  if (!strokes) {
    return /*#__PURE__*/React.createElement("p", {
      style: {
        fontSize: 13,
        color: "var(--text-secondary)",
        textAlign: "center",
        padding: "1rem 0"
      }
    }, "Data goresan untuk \u201C", _char3, "\u201D belum tersedia.");
  }
  var stars = mistakes === 0 ? "⭐⭐⭐" : mistakes <= 2 ? "⭐⭐" : "⭐";
  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      textAlign: "center",
      marginBottom: 10
    }
  }, /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 12,
      color: "var(--text-secondary)",
      margin: "0 0 2px"
    }
  }, "Tulis:"), /*#__PURE__*/React.createElement("p", {
    className: "nm-title",
    style: {
      fontSize: 20,
      margin: 0
    }
  }, info && info.title), info && info.sub && /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 12,
      color: "var(--text-secondary)",
      margin: "2px 0 0"
    }
  }, info.sub)), /*#__PURE__*/React.createElement("div", {
    role: "group",
    "aria-label": "Mode panduan",
    style: {
      display: "flex",
      gap: 6,
      justifyContent: "center",
      marginBottom: 10
    }
  }, /*#__PURE__*/React.createElement("button", {
    onClick: function onClick() {
      return setGuide(true);
    },
    "aria-pressed": guide,
    className: "nm-btn nm-btn-sm " + (guide ? "nm-btn-primary" : "nm-btn-secondary")
  }, "Ikuti jejak"), /*#__PURE__*/React.createElement("button", {
    onClick: function onClick() {
      return setGuide(false);
    },
    "aria-pressed": !guide,
    className: "nm-btn nm-btn-sm " + (!guide ? "nm-btn-primary" : "nm-btn-secondary")
  }, "Tanpa panduan")), /*#__PURE__*/React.createElement("svg", {
    ref: svgRef,
    viewBox: "0 0 1024 1024",
    role: "img",
    "aria-label": "Kanvas menulis ".concat(info && info.title ? info.title : _char3, ". Gambar tiap goresan dengan jari atau mouse."),
    onPointerDown: onDown,
    onPointerMove: onMove,
    onPointerUp: onUp,
    onPointerCancel: onUp,
    style: {
      display: "block",
      width: "100%",
      maxWidth: 360,
      aspectRatio: "1 / 1",
      margin: "0 auto",
      touchAction: "none",
      userSelect: "none",
      background: "var(--card-bg)",
      border: "2px solid var(--line)",
      borderRadius: 18,
      cursor: finished ? "default" : "crosshair"
    }
  }, /*#__PURE__*/React.createElement("g", {
    stroke: "var(--line)",
    strokeWidth: 5,
    strokeDasharray: "16 14",
    fill: "none"
  }, /*#__PURE__*/React.createElement("line", {
    x1: 512,
    y1: 0,
    x2: 512,
    y2: 1024
  }), /*#__PURE__*/React.createElement("line", {
    x1: 0,
    y1: 512,
    x2: 1024,
    y2: 512
  }), /*#__PURE__*/React.createElement("line", {
    x1: 0,
    y1: 0,
    x2: 1024,
    y2: 1024,
    opacity: 0.5
  }), /*#__PURE__*/React.createElement("line", {
    x1: 1024,
    y1: 0,
    x2: 0,
    y2: 1024,
    opacity: 0.5
  })), guide && paths.map(function (d, i) {
    return i >= done && /*#__PURE__*/React.createElement("path", {
      key: "g" + i,
      d: d,
      fill: "none",
      stroke: "var(--text-muted)",
      strokeWidth: 62,
      strokeLinecap: "round",
      strokeLinejoin: "round",
      opacity: 0.55
    });
  }), paths.map(function (d, i) {
    return i < done && /*#__PURE__*/React.createElement("path", {
      key: "d" + i,
      d: d,
      fill: "none",
      stroke: "var(--ink)",
      strokeWidth: 46,
      strokeLinecap: "round",
      strokeLinejoin: "round",
      className: i === lastDone ? "nm-wr-stroke-in" : undefined
    });
  }), hint && !finished && /*#__PURE__*/React.createElement("g", null, /*#__PURE__*/React.createElement("path", {
    d: paths[done],
    fill: "none",
    stroke: "var(--momiji)",
    strokeWidth: 62,
    strokeLinecap: "round",
    strokeLinejoin: "round",
    opacity: 0.75,
    className: "nm-wr-hint"
  }), /*#__PURE__*/React.createElement("circle", {
    r: 26,
    fill: "var(--momiji)"
  }, /*#__PURE__*/React.createElement("animateMotion", {
    dur: "1.4s",
    repeatCount: "indefinite",
    path: paths[done]
  }))), guide && !finished && strokes.map(function (s, i) {
    return i >= done && /*#__PURE__*/React.createElement("g", {
      key: "n" + i
    }, /*#__PURE__*/React.createElement("circle", {
      cx: s[0][0],
      cy: s[0][1],
      r: 34,
      fill: "var(--card-bg)",
      stroke: i === done ? "var(--momiji)" : "var(--text-secondary)",
      strokeWidth: 6
    }), /*#__PURE__*/React.createElement("text", {
      x: s[0][0],
      y: s[0][1] + 13,
      textAnchor: "middle",
      fontSize: 40,
      fontWeight: 700,
      fill: i === done ? "var(--momiji)" : "var(--text-secondary)",
      style: {
        fontFamily: "'Zen Maru Gothic', sans-serif"
      }
    }, i + 1));
  }), failed && /*#__PURE__*/React.createElement("path", {
    d: wrSmooth(failed),
    fill: "none",
    stroke: "var(--sakura)",
    strokeWidth: 40,
    strokeLinecap: "round",
    strokeLinejoin: "round",
    className: "nm-wr-fail"
  }), live && live.length > 0 && (live.length === 1 ? /*#__PURE__*/React.createElement("circle", {
    cx: live[0][0],
    cy: live[0][1],
    r: 20,
    fill: "var(--sora)"
  }) : /*#__PURE__*/React.createElement("path", {
    d: wrSmooth(live),
    fill: "none",
    stroke: "var(--sora)",
    strokeWidth: 40,
    strokeLinecap: "round",
    strokeLinejoin: "round",
    opacity: 0.9
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      justifyContent: "center",
      gap: 5,
      margin: "10px 0 4px"
    },
    "aria-hidden": "true"
  }, strokes.map(function (_, i) {
    return /*#__PURE__*/React.createElement("span", {
      key: i,
      style: {
        width: 9,
        height: 9,
        borderRadius: "50%",
        background: i < done ? "var(--matcha)" : "var(--line)",
        transition: "background 0.2s ease"
      }
    });
  })), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 11.5,
      color: "var(--text-secondary)",
      textAlign: "center",
      margin: "0 0 6px",
      fontWeight: 700
    }
  }, "Goresan ", Math.min(done + 1, total), " / ", total), /*#__PURE__*/React.createElement("p", {
    role: "status",
    "aria-live": "polite",
    style: {
      fontSize: 12.5,
      minHeight: 20,
      textAlign: "center",
      margin: "0 0 10px",
      fontWeight: 700,
      color: msg ? msg.t === "ok" ? "var(--matcha)" : "var(--sakura)" : "var(--text-secondary)"
    }
  }, msg ? msg.s : guide ? "Gambar goresan pertama, mulai dari titik bernomor 1." : "Gambar goresan pertama dari karakter ini."), finished ? /*#__PURE__*/React.createElement("div", {
    style: {
      textAlign: "center",
      animation: "nm-fadeIn 0.3s ease"
    }
  }, /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 22,
      margin: "0 0 2px"
    }
  }, stars), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 12,
      color: "var(--text-secondary)",
      margin: "0 0 10px"
    }
  }, mistakes === 0 ? "Sempurna, tanpa salah!" : "".concat(mistakes, " kali salah sebelum benar.")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 8,
      justifyContent: "center",
      flexWrap: "wrap"
    }
  }, /*#__PURE__*/React.createElement("button", {
    onClick: reset,
    className: "nm-btn nm-btn-outline"
  }, "\u21BA Tulis lagi"), onNext && /*#__PURE__*/React.createElement("button", {
    onClick: onNext,
    className: "nm-btn nm-btn-primary"
  }, "Berikutnya ", /*#__PURE__*/React.createElement(ChevronRight, {
    size: 14,
    "aria-hidden": "true"
  })))) : /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 8,
      justifyContent: "center",
      flexWrap: "wrap"
    }
  }, /*#__PURE__*/React.createElement("button", {
    onClick: function onClick() {
      return setHint(function (h) {
        return !h;
      });
    },
    "aria-pressed": hint,
    className: "nm-btn nm-btn-secondary"
  }, "\uD83D\uDCA1 Petunjuk"), /*#__PURE__*/React.createElement("button", {
    onClick: reset,
    className: "nm-btn nm-btn-secondary"
  }, "\u21BA Ulangi")));
}

// Daftar kanji per level di data saling menumpuk (mis. N4 memuat semua kanji N5). Untuk Latihan Menulis, tiap kanji
// hanya dihitung di level TERENDAH tempat ia pertama muncul, jadi tidak ada kanji yang berulang di level berikutnya.
function kanjiExclusiveByLevel() {
  var seen = new Set();
  var out = {};
  LEVELS.forEach(function (l) {
    out[l.id] = _toConsumableArray(new Set(l.kanji)).filter(function (k) {
      return !seen.has(k);
    });
    out[l.id].forEach(function (k) {
      return seen.add(k);
    });
  });
  return out;
}

// Susunan kana untuk pemilih huruf: dasar (46, berbaris sesuai tabel), dakuten+handakuten (25), dan huruf kecil/tambahan.
function kanaWritingSets(script) {
  var isH = script === "hiragana";
  var table = isH ? HIRAGANA : KATAKANA;
  var dak = KANA_GROUPS.filter(function (g) {
    return g.id === "dakuten" || g.id === "handakuten";
  }).flatMap(function (g) {
    return g.entries;
  }).map(function (e) {
    return {
      ch: isH ? e.h : e.k,
      label: e.r
    };
  });
  var small = isH ? [{
    ch: "ゃ",
    label: "ya kecil"
  }, {
    ch: "ゅ",
    label: "yu kecil"
  }, {
    ch: "ょ",
    label: "yo kecil"
  }, {
    ch: "っ",
    label: "tsu kecil"
  }] : [{
    ch: "ャ",
    label: "ya kecil"
  }, {
    ch: "ュ",
    label: "yu kecil"
  }, {
    ch: "ョ",
    label: "yo kecil"
  }, {
    ch: "ッ",
    label: "tsu kecil"
  }, {
    ch: "ー",
    label: "panjang"
  }];
  var rows = KANA_ROWS.map(function (row) {
    return row.map(function (r) {
      return r ? {
        ch: table[r],
        label: r
      } : null;
    });
  });
  return {
    rows: rows,
    dasar: rows.flat().filter(Boolean),
    dakuten: dak,
    kecil: small
  };
}
function writingInfo(ch, script, labelMap) {
  if (script === "kanji") {
    var k = typeof KANJI_CONTENT !== "undefined" && KANJI_CONTENT[ch] || null;
    var rd = k ? [k.kun && k.kun !== "-" ? "kun: " + k.kun : "", k.on && k.on !== "-" ? "on: " + k.on : ""].filter(Boolean).join(" · ") : "";
    return {
      title: k && k.arti ? k.arti : "Kanji ini",
      sub: rd
    };
  }
  return {
    title: labelMap && labelMap[ch] || ch,
    sub: script === "hiragana" ? "Hiragana" : "Katakana"
  };
}

// Untuk soal yang skrip dialognya TIDAK diketahui (audio-only, tidak ada 聴解原文), TTS tidak bisa
// membacakan apa pun. Sebagai gantinya, komponen ini memutar POTONGAN FILE AUDIO ASLI langsung
// (dari audioSrc, mulai audioStart sampai audioEnd), memakai elemen <audio> HTML biasa - bukan TTS.
function RealAudioClipPlayer(_ref9) {
  var src = _ref9.src,
    start = _ref9.start,
    end = _ref9.end;
  var _useState45 = useState(false),
    _useState46 = _slicedToArray(_useState45, 2),
    isPlaying = _useState46[0],
    setIsPlaying = _useState46[1];
  var _useState47 = useState(false),
    _useState48 = _slicedToArray(_useState47, 2),
    isDone = _useState48[0],
    setIsDone = _useState48[1];
  var _useState49 = useState(false),
    _useState50 = _slicedToArray(_useState49, 2),
    loadError = _useState50[0],
    setLoadError = _useState50[1];
  var _useState51 = useState(0),
    _useState52 = _slicedToArray(_useState51, 2),
    elapsed = _useState52[0],
    setElapsed = _useState52[1];
  var audioRef = React.useRef(null);
  var fmt = function fmt(s) {
    return "".concat(Math.floor(s / 60), ":").concat(String(Math.floor(s % 60)).padStart(2, "0"));
  };
  var clipDuration = Math.max(0, end - start);

  // Loncat ke detik tertentu (currentTime) sebelum metadata file audio selesai dimuat sering diam-diam
  // gagal di banyak browser (nilainya diabaikan/direset). Jadi kalau metadata belum siap (readyState<1),
  // kita tunggu event loadedmetadata dulu baru loncat+putar, alih-alih langsung memanggil play().
  var seekAndPlayFrom = function seekAndPlayFrom(targetTime) {
    var el = audioRef.current;
    if (!el) return;
    setLoadError(false);
    var clamped = Math.max(start, Math.min(end, targetTime));
    var doSeekAndPlay = function doSeekAndPlay() {
      try {
        el.currentTime = clamped;
      } catch (e) {}
      setElapsed(clamped - start);
      var playPromise = el.play();
      if (playPromise && typeof playPromise["catch"] === "function") playPromise["catch"](function () {
        return setLoadError(true);
      });
    };
    if (el.readyState >= 1) {
      doSeekAndPlay();
    } else {
      el.addEventListener("loadedmetadata", doSeekAndPlay, {
        once: true
      });
      el.load();
    }
    setIsPlaying(true);
    setIsDone(false);
  };
  var handlePlay = function handlePlay() {
    return seekAndPlayFrom(start);
  };
  var handlePause = function handlePause() {
    var el = audioRef.current;
    if (el) el.pause();
    setIsPlaying(false);
  };
  // Posisi elapsed diambil LANGSUNG dari currentTime file audio asli (bukan jam buatan/estimasi) - jadi
  // selalu akurat, sinkron persis dengan suara yang sungguhan terdengar.
  var handleTimeUpdate = function handleTimeUpdate() {
    var el = audioRef.current;
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
  var seekToRatio = function seekToRatio(ratio) {
    var clamped = Math.max(0, Math.min(1, ratio));
    seekAndPlayFrom(start + clamped * clipDuration);
  };
  var pct = clipDuration ? elapsed / clipDuration * 100 : 0;
  return /*#__PURE__*/React.createElement("div", {
    className: "nm-audioplayer"
  }, /*#__PURE__*/React.createElement("audio", {
    ref: audioRef,
    src: src,
    preload: "metadata",
    onTimeUpdate: handleTimeUpdate,
    onEnded: function onEnded() {
      setIsPlaying(false);
      setIsDone(true);
    },
    onError: function onError() {
      return setLoadError(true);
    }
  }), /*#__PURE__*/React.createElement("button", {
    onClick: function onClick() {
      if (isPlaying) handlePause();else handlePlay();
    },
    "aria-label": isPlaying ? "Jeda" : "Putar",
    className: "nm-audioplayer-playbtn",
    style: {
      background: "var(--sora)"
    }
  }, isPlaying ? /*#__PURE__*/React.createElement(Pause, {
    size: 16,
    color: "#fff",
    "aria-hidden": "true"
  }) : /*#__PURE__*/React.createElement(Play, {
    size: 16,
    color: "#fff",
    style: {
      marginLeft: 2
    },
    "aria-hidden": "true"
  })), loadError ? /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 11.5,
      color: "var(--sakura)",
      flexShrink: 0,
      display: "flex",
      alignItems: "center",
      gap: 5
    }
  }, /*#__PURE__*/React.createElement(AlertTriangle, {
    size: 14,
    "aria-hidden": "true"
  }), " Gagal memuat file audio (cek folder audio/)") : /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("span", {
    className: "nm-audioplayer-time"
  }, fmt(elapsed), " / ", fmt(clipDuration)), /*#__PURE__*/React.createElement("div", {
    onClick: function onClick(e) {
      var rect = e.currentTarget.getBoundingClientRect();
      var ratio = rect.width > 0 ? (e.clientX - rect.left) / rect.width : 0;
      seekToRatio(ratio);
    },
    role: "slider",
    "aria-label": "Lompat ke bagian tertentu",
    "aria-valuemin": 0,
    "aria-valuemax": 100,
    "aria-valuenow": Math.round(pct),
    className: "nm-audioplayer-track"
  }, /*#__PURE__*/React.createElement("div", {
    className: "nm-audioplayer-track-bg"
  }, /*#__PURE__*/React.createElement("div", {
    className: "nm-audioplayer-track-fill",
    style: {
      width: "".concat(pct, "%"),
      background: "var(--sora)"
    }
  }))), isDone ? /*#__PURE__*/React.createElement("span", {
    style: {
      flexShrink: 0,
      display: "flex",
      color: "var(--matcha)"
    }
  }, /*#__PURE__*/React.createElement(Check, {
    size: 15,
    "aria-hidden": "true"
  })) : /*#__PURE__*/React.createElement(Volume2, {
    size: 15,
    color: "var(--text-secondary)",
    "aria-hidden": "true",
    style: {
      flexShrink: 0
    }
  })));
}
function AudioPlayerBar(_ref0) {
  var dialog = _ref0.dialog;
  var _useState53 = useState(false),
    _useState54 = _slicedToArray(_useState53, 2),
    isPlaying = _useState54[0],
    setIsPlaying = _useState54[1];
  var _useState55 = useState(false),
    _useState56 = _slicedToArray(_useState55, 2),
    isPaused = _useState56[0],
    setIsPaused = _useState56[1];
  var _useState57 = useState(0),
    _useState58 = _slicedToArray(_useState57, 2),
    turnsDone = _useState58[0],
    setTurnsDone = _useState58[1];
  var _useState59 = useState(0),
    _useState60 = _slicedToArray(_useState59, 2),
    currentIdx = _useState60[0],
    setCurrentIdx = _useState60[1];
  var _useState61 = useState(false),
    _useState62 = _slicedToArray(_useState61, 2),
    isDone = _useState62[0],
    setIsDone = _useState62[1];
  var _useState63 = useState(0),
    _useState64 = _slicedToArray(_useState63, 2),
    elapsed = _useState64[0],
    setElapsed = _useState64[1];
  var genRef = React.useRef(0);
  var timerRef = React.useRef(null);
  var parseTurns = function parseTurns(dialogText) {
    var lines = dialogText.split("\n").map(function (l) {
      return l.trim();
    }).filter(Boolean);
    return lines.map(function (line) {
      var m = line.match(/^([^：:]{1,3})[：:](.*)$/);
      return m ? {
        speaker: m[1],
        text: m[2].trim()
      } : {
        speaker: null,
        text: line
      };
    });
  };
  var turns = parseTurns(dialog);
  var totalTurns = turns.length;
  // Perkiraan lama-bicara tiap kalimat (dari jumlah huruf) - HANYA dipakai untuk menggeser posisi jam
  // saat maju/mundur (supaya arahnya masuk akal: maju = angka naik, mundur = angka turun). TIDAK dipakai
  // untuk menentukan "sudah selesai atau belum" (itu murni dari turnsDone/onend asli), jadi tidak akan
  // menimbulkan bug seperti sebelumnya.
  var turnEstSecs = turns.map(function (t) {
    return Math.max(1, Math.round(t.text.length / 6));
  });
  var cumulativeBefore = function cumulativeBefore(idx) {
    return turnEstSecs.slice(0, idx).reduce(function (a, b) {
      return a + b;
    }, 0);
  };
  var fmt = function fmt(s) {
    return "".concat(Math.floor(s / 60), ":").concat(String(Math.floor(s % 60)).padStart(2, "0"));
  };
  var stopTimer = function stopTimer() {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  };

  // Progres (bar) MURNI dihitung dari berapa kalimat yang benar-benar sudah dibacakan tuntas (lewat
  // event onend asli) - bukan tebakan waktu, jadi tidak mungkin "macet" atau salah. Jam di sebelahnya
  // cuma tampilan posisi (naik saat maju, turun saat mundur), tidak dipakai untuk logika penyelesaian.
  var playFromIndex = function playFromIndex(startIdx, resetClock) {
    if (!window.speechSynthesis) return;
    window.speechSynthesis.cancel();
    stopTimer();
    genRef.current += 1;
    var myGen = genRef.current;
    var speakerPitch = {};
    var nextPitch = 1.15;
    var idx = Math.max(0, Math.min(startIdx, turns.length));
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
    var _speakNext = function speakNext() {
      if (myGen !== genRef.current) return;
      if (idx >= turns.length) {
        setIsPlaying(false);
        setIsDone(true);
        stopTimer();
        return;
      }
      setCurrentIdx(idx);
      var t = turns[idx];
      idx += 1;
      var utter = new SpeechSynthesisUtterance(t.text);
      utter.lang = "ja-JP";
      utter.rate = 0.82;
      if (t.speaker) {
        if (!(t.speaker in speakerPitch)) {
          speakerPitch[t.speaker] = nextPitch;
          nextPitch = nextPitch > 1 ? 0.85 : 1.15;
        }
        utter.pitch = speakerPitch[t.speaker];
      }
      utter.onend = function () {
        if (myGen === genRef.current) {
          setTurnsDone(idx);
          _speakNext();
        }
      };
      utter.onerror = function () {
        if (myGen === genRef.current) {
          setTurnsDone(idx);
          _speakNext();
        }
      };
      window.speechSynthesis.speak(utter);
    };
    _speakNext();
    setIsPlaying(true);
    timerRef.current = setInterval(function () {
      return setElapsed(function (e) {
        return e + 0.2;
      });
    }, 200);
  };
  var handlePlay = function handlePlay() {
    return playFromIndex(0, true);
  };
  var handlePause = function handlePause() {
    window.speechSynthesis.pause();
    setIsPlaying(false);
    setIsPaused(true);
    stopTimer();
  };
  var handleResume = function handleResume() {
    window.speechSynthesis.resume();
    setIsPlaying(true);
    timerRef.current = setInterval(function () {
      return setElapsed(function (e) {
        return e + 0.2;
      });
    }, 200);
  };
  var skipBack = function skipBack() {
    if (totalTurns > 1) playFromIndex(Math.max(0, currentIdx - 1), false);
  };
  var skipForward = function skipForward() {
    if (totalTurns > 1) playFromIndex(Math.min(totalTurns - 1, currentIdx + 1), false);
  };
  var seekToRatio = function seekToRatio(ratio) {
    if (totalTurns <= 1) return;
    var clamped = Math.max(0, Math.min(1, ratio));
    var targetIdx = Math.min(totalTurns - 1, Math.floor(clamped * totalTurns));
    playFromIndex(targetIdx, false);
  };
  useEffect(function () {
    return function () {
      genRef.current += 1;
      stopTimer();
      if (window.speechSynthesis) window.speechSynthesis.cancel();
    };
  }, []);
  var pct = totalTurns ? turnsDone / totalTurns * 100 : 0;
  return /*#__PURE__*/React.createElement("div", {
    className: "nm-audioplayer"
  }, /*#__PURE__*/React.createElement("button", {
    onClick: skipBack,
    disabled: totalTurns <= 1,
    "aria-label": "Mundur satu kalimat",
    className: "nm-audioplayer-skipbtn"
  }, /*#__PURE__*/React.createElement(SkipBack, {
    size: 13,
    "aria-hidden": "true"
  })), /*#__PURE__*/React.createElement("button", {
    onClick: function onClick() {
      if (isPlaying) handlePause();else if (isPaused && !isDone) handleResume();else handlePlay();
    },
    "aria-label": isPlaying ? "Jeda" : "Putar",
    className: "nm-audioplayer-playbtn",
    style: {
      background: "var(--momiji)"
    }
  }, isPlaying ? /*#__PURE__*/React.createElement(Pause, {
    size: 16,
    color: "#fff",
    "aria-hidden": "true"
  }) : /*#__PURE__*/React.createElement(Play, {
    size: 16,
    color: "#fff",
    style: {
      marginLeft: 2
    },
    "aria-hidden": "true"
  })), /*#__PURE__*/React.createElement("button", {
    onClick: skipForward,
    disabled: totalTurns <= 1,
    "aria-label": "Maju satu kalimat",
    className: "nm-audioplayer-skipbtn"
  }, /*#__PURE__*/React.createElement(SkipForward, {
    size: 13,
    "aria-hidden": "true"
  })), /*#__PURE__*/React.createElement("span", {
    className: "nm-audioplayer-time",
    style: {
      minWidth: 34
    }
  }, fmt(elapsed)), /*#__PURE__*/React.createElement("div", {
    onClick: function onClick(e) {
      var rect = e.currentTarget.getBoundingClientRect();
      var ratio = rect.width > 0 ? (e.clientX - rect.left) / rect.width : 0;
      seekToRatio(ratio);
    },
    role: "slider",
    "aria-label": "Lompat ke bagian tertentu",
    "aria-valuemin": 0,
    "aria-valuemax": 100,
    "aria-valuenow": Math.round(pct),
    className: "nm-audioplayer-track",
    style: {
      cursor: totalTurns > 1 ? "pointer" : "default"
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "nm-audioplayer-track-bg"
  }, /*#__PURE__*/React.createElement("div", {
    className: "nm-audioplayer-track-fill",
    style: {
      width: "".concat(pct, "%"),
      background: "var(--momiji)",
      transition: "width 0.3s ease"
    }
  }))), isDone ? /*#__PURE__*/React.createElement("span", {
    style: {
      flexShrink: 0,
      display: "flex",
      color: "var(--matcha)"
    }
  }, /*#__PURE__*/React.createElement(Check, {
    size: 15,
    "aria-hidden": "true"
  })) : /*#__PURE__*/React.createElement(Volume2, {
    size: 15,
    color: "var(--text-secondary)",
    "aria-hidden": "true",
    style: {
      flexShrink: 0
    }
  }));
}

// ===== Susun Kata (game menyusun potongan kata jadi kalimat) =====
// Soal dibentuk saat aplikasi berjalan dari soal 並べ替え (urutan kata ★) yang SUDAH ada di JLPT_EXAM_CONTENT
// (bunpou_dokkai > mondai2). Tidak ada soal baru dan data tidak diubah: teks soal = kerangka kalimat, 4 pilihan = potongan kata,
// kalimat lengkap (`full`) dipakai untuk mencari urutan yang benar. Soal yang urutannya tidak bisa dipastikan secara otomatis
// (tidak ada yang cocok / ambigu) dilewati di game ini, tetapi tetap ada di Latihan Dokkai.
var PUZZLE_SLOT_SPLIT = /(＿★＿|＿＿＿|★)/;
function puzzleIsSlot(x) {
  return x === "＿＿＿" || x === "＿★＿" || x === "★";
}
function puzzleNorm(str) {
  return String(str).normalize("NFKC").replace(/[\s\u3000、。，,「」『』・？！?!\u2026]+/g, "");
}
function puzzlePerms(arr) {
  if (arr.length <= 1) return [arr];
  var out = [];
  arr.forEach(function (x, i) {
    return puzzlePerms(arr.slice(0, i).concat(arr.slice(i + 1))).forEach(function (rest) {
      return out.push([x].concat(_toConsumableArray(rest)));
    });
  });
  return out;
}
function puzzleCommonSuffix(a, b) {
  var n = 0;
  while (n < a.length && n < b.length && a[a.length - 1 - n] === b[b.length - 1 - n]) n++;
  return n;
}
function puzzleCommonPrefix(a, b) {
  var n = 0;
  while (n < a.length && n < b.length && a[n] === b[n]) n++;
  return n;
}
// Kalimat (ternormalisasi) yang terbentuk bila potongan diisikan ke kotak sesuai urutan `order`.
function puzzleLineFor(pz, order) {
  var mid = pz.parts.slice(pz.slotParts[0], pz.slotParts[pz.slotParts.length - 1] + 1);
  var n = 0;
  return puzzleNorm(mid.map(function (x) {
    return puzzleIsSlot(x) ? pz.pieces[order[n++]] : x;
  }).join(""));
}
function puzzleBuild(item) {
  if (!item || typeof item.text !== "string" || !item.full || !Array.isArray(item.choices)) return null;
  var parts = item.text.split(PUZZLE_SLOT_SPLIT);
  var slotParts = [];
  parts.forEach(function (x, k) {
    if (puzzleIsSlot(x)) slotParts.push(k);
  });
  if (slotParts.length < 2 || slotParts.length !== item.choices.length) return null;
  var pz = {
    parts: parts,
    slotParts: slotParts,
    pieces: item.choices.slice(),
    full: item.full,
    explanation: item.explanation || "",
    starSlot: slotParts.findIndex(function (k) {
      return parts[k] !== "＿＿＿";
    })
  };
  var pre = puzzleNorm(parts.slice(0, slotParts[0]).join(""));
  var post = puzzleNorm(parts.slice(slotParts[slotParts.length - 1] + 1).join(""));
  var target = puzzleNorm(item.full);
  var cands = [];
  puzzlePerms(pz.pieces.map(function (_, i) {
    return i;
  })).forEach(function (order) {
    var line = puzzleLineFor(pz, order);
    if (!line) return;
    var best = -1,
      pos = -1;
    while ((pos = target.indexOf(line, pos + 1)) >= 0) {
      var sc = puzzleCommonSuffix(pre, target.slice(0, pos)) + puzzleCommonPrefix(post, target.slice(pos + line.length));
      if (sc > best) best = sc;
    }
    if (best >= 0) cands.push({
      order: order,
      line: line,
      sc: best
    });
  });
  if (!cands.length) return null;
  var top = Math.max.apply(Math, _toConsumableArray(cands.map(function (c) {
    return c.sc;
  })));
  var winners = cands.filter(function (c) {
    return c.sc === top;
  });
  if (new Set(winners.map(function (c) {
    return c.line;
  })).size !== 1) return null; // ambigu: lebih dari satu susunan berbeda
  pz.order = winners[0].order;
  pz.line = winners[0].line;
  return pz;
}
var SK_ROUND_SIZE = 8; // jumlah soal per ronde
var SK_LIVES = 3; // nyawa per ronde
var SK_HINTS = 3; // petunjuk per ronde
var SK_TIME_BONUS_SECS = 20; // makin cepat menjawab, makin besar bonus waktu (tidak ada hukuman bila lambat)
var SK_BEST_KEY = "nihongo-michi-susun-kata-best";
var SK_MUTE_KEY = "nihongo-michi-susun-kata-mute";
var SK_LEVELS = [{
  id: "n5",
  label: "N5",
  color: "sakura"
}, {
  id: "n4",
  label: "N4",
  color: "sora"
}, {
  id: "n3",
  label: "N3",
  color: "matcha"
}, {
  id: "n2",
  label: "N2",
  color: "yuzu"
}, {
  id: "n1",
  label: "N1",
  color: "momiji"
}, {
  id: "all",
  label: "Campur",
  color: "momiji"
}];
var SK_POOL_CACHE = {};
// Kumpulan puzzle unik untuk satu level (paket soal beda tahun bisa memuat soal yang sama persis, jadi dibuang duplikatnya).
function skPool(levelId) {
  if (SK_POOL_CACHE[levelId]) return SK_POOL_CACHE[levelId];
  var ids = levelId === "all" ? ["n5", "n4", "n3", "n2", "n1"] : [levelId];
  var seen = {},
    out = [];
  ids.forEach(function (lv) {
    var byLevel = JLPT_EXAM_CONTENT[lv] || {};
    Object.keys(byLevel).sort(function (a, b) {
      return Number(a) - Number(b);
    }).forEach(function (yearKey) {
      var m2 = ((byLevel[yearKey] || {}).bunpou_dokkai || {}).mondai2;
      (m2 && m2.items || []).forEach(function (it) {
        var pz = puzzleBuild(it);
        if (!pz) return;
        var key = pz.parts.map(function (x) {
          return puzzleIsSlot(x) ? "＿" : x;
        }).join("") + "|" + pz.pieces.slice().sort().join(",");
        if (seen[key]) return;
        seen[key] = true;
        out.push(pz);
      });
    });
  });
  SK_POOL_CACHE[levelId] = out;
  return out;
}
function skPickRound(levelId) {
  return shuffleArr(skPool(levelId)).slice(0, SK_ROUND_SIZE);
}
function skShuffledBank(pz) {
  var idxs = pz.pieces.map(function (_, i) {
    return i;
  });
  var solved = pz.order.map(function (i) {
    return pz.pieces[i];
  }).join("|");
  var order = shuffleArr(idxs);
  for (var t = 0; t < 12 && order.map(function (i) {
    return pz.pieces[i];
  }).join("|") === solved; t++) order = shuffleArr(idxs);
  return order;
}
function skFmt(n) {
  return String(n).replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}
function skLoad(key, fallback) {
  try {
    var raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch (e) {
    return fallback;
  }
}
function skSave(key, val) {
  try {
    localStorage.setItem(key, JSON.stringify(val));
  } catch (e) {/* diabaikan */}
}
// Efek suara sederhana (WebAudio, tanpa file audio). Semua dibungkus try/catch supaya tidak pernah mengganggu permainan.
var SK_AUDIO = null;
function skAudio() {
  try {
    if (!SK_AUDIO) {
      var AC = window.AudioContext || window.webkitAudioContext;
      if (!AC) return null;
      SK_AUDIO = new AC();
    }
    if (SK_AUDIO.state === "suspended" && SK_AUDIO.resume) SK_AUDIO.resume();
    return SK_AUDIO;
  } catch (e) {
    return null;
  }
}
function skTone(freq, delay, dur, type, vol) {
  try {
    var ac = skAudio();
    if (!ac) return;
    var t0 = ac.currentTime + delay;
    var osc = ac.createOscillator(),
      gain = ac.createGain();
    osc.type = type || "sine";
    osc.frequency.value = freq;
    gain.gain.setValueAtTime(0.0001, t0);
    gain.gain.exponentialRampToValueAtTime(vol || 0.08, t0 + 0.01);
    gain.gain.exponentialRampToValueAtTime(0.0001, t0 + dur);
    osc.connect(gain);
    gain.connect(ac.destination);
    osc.start(t0);
    osc.stop(t0 + dur + 0.02);
  } catch (e) {/* diabaikan */}
}
function skSfx(kind) {
  if (kind === "place") skTone(560, 0, 0.06, "triangle", 0.06);else if (kind === "remove") skTone(400, 0, 0.06, "triangle", 0.05);else if (kind === "hint") {
    skTone(660, 0, 0.1, "sine", 0.07);
    skTone(880, 0.09, 0.14, "sine", 0.07);
  } else if (kind === "correct") {
    skTone(523, 0, 0.12, "triangle", 0.09);
    skTone(659, 0.1, 0.12, "triangle", 0.09);
    skTone(784, 0.2, 0.22, "triangle", 0.09);
  } else if (kind === "wrong") {
    skTone(220, 0, 0.18, "sawtooth", 0.06);
    skTone(165, 0.16, 0.26, "sawtooth", 0.06);
  } else if (kind === "win") {
    [523, 659, 784, 1047].forEach(function (f, i) {
      return skTone(f, i * 0.12, 0.2, "triangle", 0.09);
    });
  } else if (kind === "lose") {
    [392, 330, 262].forEach(function (f, i) {
      return skTone(f, i * 0.16, 0.24, "sine", 0.08);
    });
  }
}
function skVibrate(pattern) {
  try {
    if (navigator.vibrate) navigator.vibrate(pattern);
  } catch (e) {/* diabaikan */}
}
var SK_CSS = "\n.sk-root { -webkit-user-select: none; user-select: none; -webkit-touch-callout: none; }\n.sk-slot { display: inline-block; min-width: 60px; min-height: 38px; margin: 0 4px; padding: 2px 10px; vertical-align: middle; border-radius: 10px; font: inherit; font-weight: 700;\n  line-height: 1.6; color: var(--ink); border: 2px dashed var(--line); background: transparent; transition: border-color .15s, background .15s, transform .15s; }\n.sk-slot-filled { border-style: solid; border-color: var(--momiji); background: var(--card-bg); touch-action: none; cursor: grab; box-shadow: var(--shadow-xs); }\n.sk-slot-hint { border-color: var(--yuzu); background: var(--yuzu-tint); cursor: default; }\n.sk-slot-over { border-color: var(--momiji) !important; background: var(--momiji-tint) !important; transform: scale(1.07); }\n.sk-slot-ok { border-color: var(--matcha) !important; background: var(--matcha-tint) !important; cursor: default; }\n.sk-slot-bad { border-color: var(--sakura) !important; background: var(--sakura-tint) !important; cursor: default; }\n.sk-chip { padding: 9px 15px; border-radius: 12px; font: inherit; font-size: 16px; font-weight: 700; color: var(--ink); background: var(--card-bg);\n  border: 2px solid var(--line); border-bottom-width: 4px; box-shadow: var(--shadow-sm); touch-action: none; cursor: grab; transition: transform .12s, opacity .2s, box-shadow .12s; }\n.sk-chip:not(:disabled):active { transform: scale(.94); }\n.sk-chip:disabled { opacity: .25; box-shadow: none; cursor: default; touch-action: auto; }\n.sk-ghost { position: fixed; z-index: 9999; pointer-events: none; padding: 9px 15px; border-radius: 12px; font-weight: 700; font-size: 16px; color: var(--ink);\n  background: var(--card-bg); border: 2px solid var(--momiji); box-shadow: var(--shadow-lg); transform: translate(-50%, -50%) scale(1.1) rotate(-4deg); }\n.sk-level { cursor: pointer; text-align: center; padding: 12px 6px; border-radius: 14px; border: 2px solid var(--line); background: var(--card-bg); color: var(--ink); font: inherit; box-shadow: var(--shadow-xs); transition: transform .12s, border-color .15s, background .15s; }\n.sk-level:active { transform: scale(.96); }\n.sk-level-on { border-color: var(--momiji); background: var(--momiji-tint); box-shadow: var(--shadow-sm); }\n.sk-dot { width: 100%; height: 8px; border-radius: 6px; background: var(--line); transition: background .25s; }\n.sk-float { position: absolute; left: 50%; top: 38%; z-index: 20; pointer-events: none; font-weight: 800; font-size: 22px; transform: translateX(-50%); text-shadow: 0 2px 6px rgba(0,0,0,.18); }\n.sk-confetti { position: absolute; left: 50%; top: 40%; z-index: 19; pointer-events: none; font-size: 18px; }\n@media (prefers-reduced-motion: no-preference) {\n  .sk-pop { animation: sk-pop .28s cubic-bezier(.34, 1.56, .64, 1); }\n  .sk-shake { animation: sk-shake .45s; }\n  .sk-ready { animation: sk-glow 1.2s ease-in-out infinite; }\n  .sk-float { animation: sk-float 1.1s ease-out forwards; }\n  .sk-confetti { animation: sk-burst .95s ease-out forwards; }\n  .sk-star { animation: sk-star .55s cubic-bezier(.34, 1.56, .64, 1) both; }\n  .sk-fade { animation: sk-fade .28s ease-out; }\n  .sk-heart-lost { animation: sk-heart .5s ease-out; }\n  .sk-bounce { animation: sk-bounce 1.6s ease-in-out infinite; }\n}\n@keyframes sk-pop { 0% { transform: scale(.7); } 100% { transform: scale(1); } }\n@keyframes sk-shake { 0%, 100% { transform: translateX(0); } 20% { transform: translateX(-9px); } 40% { transform: translateX(8px); } 60% { transform: translateX(-6px); } 80% { transform: translateX(4px); } }\n@keyframes sk-glow { 0%, 100% { box-shadow: 0 0 0 0 rgba(255, 122, 69, .55); } 50% { box-shadow: 0 0 0 9px rgba(255, 122, 69, 0); } }\n@keyframes sk-float { 0% { opacity: 0; transform: translate(-50%, 10px) scale(.7); } 15% { opacity: 1; transform: translate(-50%, 0) scale(1.15); } 100% { opacity: 0; transform: translate(-50%, -70px) scale(1); } }\n@keyframes sk-burst { 0% { opacity: 1; transform: translate(0, 0) scale(.6) rotate(0); } 100% { opacity: 0; transform: translate(var(--dx), var(--dy)) scale(1.1) rotate(var(--rot)); } }\n@keyframes sk-star { 0% { opacity: 0; transform: scale(0) rotate(-40deg); } 100% { opacity: 1; transform: scale(1) rotate(0); } }\n@keyframes sk-fade { 0% { opacity: 0; transform: translateY(8px); } 100% { opacity: 1; transform: translateY(0); } }\n@keyframes sk-heart { 0% { transform: scale(1.5); } 100% { transform: scale(1); } }\n@keyframes sk-bounce { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-6px); } }\n";
function SusunKataGame(_ref1) {
  var onExit = _ref1.onExit;
  var _useState65 = useState("lobby"),
    _useState66 = _slicedToArray(_useState65, 2),
    phase = _useState66[0],
    setPhase = _useState66[1]; // lobby | play | result
  var _useState67 = useState("n5"),
    _useState68 = _slicedToArray(_useState67, 2),
    levelId = _useState68[0],
    setLevelId = _useState68[1];
  var _useState69 = useState([]),
    _useState70 = _slicedToArray(_useState69, 2),
    round = _useState70[0],
    setRound = _useState70[1];
  var _useState71 = useState(0),
    _useState72 = _slicedToArray(_useState71, 2),
    idx = _useState72[0],
    setIdx = _useState72[1];
  var _useState73 = useState([]),
    _useState74 = _slicedToArray(_useState73, 2),
    bank = _useState74[0],
    setBank = _useState74[1]; // urutan tampil potongan kata
  var _useState75 = useState([]),
    _useState76 = _slicedToArray(_useState75, 2),
    slots = _useState76[0],
    setSlots = _useState76[1]; // isi tiap kotak: indeks potongan atau null
  var _useState77 = useState([]),
    _useState78 = _slicedToArray(_useState77, 2),
    locked = _useState78[0],
    setLocked = _useState78[1]; // kotak yang diisi lewat petunjuk (tidak bisa dilepas)
  var _useState79 = useState("playing"),
    _useState80 = _slicedToArray(_useState79, 2),
    status = _useState80[0],
    setStatus = _useState80[1]; // playing | correct | wrong
  var _useState81 = useState(SK_LIVES),
    _useState82 = _slicedToArray(_useState81, 2),
    lives = _useState82[0],
    setLives = _useState82[1];
  var _useState83 = useState(0),
    _useState84 = _slicedToArray(_useState83, 2),
    score = _useState84[0],
    setScore = _useState84[1];
  var _useState85 = useState(0),
    _useState86 = _slicedToArray(_useState85, 2),
    streak = _useState86[0],
    setStreak = _useState86[1];
  var _useState87 = useState(0),
    _useState88 = _slicedToArray(_useState87, 2),
    bestStreak = _useState88[0],
    setBestStreak = _useState88[1];
  var _useState89 = useState(SK_HINTS),
    _useState90 = _slicedToArray(_useState89, 2),
    hintsLeft = _useState90[0],
    setHintsLeft = _useState90[1];
  var _useState91 = useState(0),
    _useState92 = _slicedToArray(_useState91, 2),
    hintsThisPuzzle = _useState92[0],
    setHintsThisPuzzle = _useState92[1];
  var _useState93 = useState([]),
    _useState94 = _slicedToArray(_useState93, 2),
    results = _useState94[0],
    setResults = _useState94[1];
  var _useState95 = useState(0),
    _useState96 = _slicedToArray(_useState95, 2),
    gain = _useState96[0],
    setGain = _useState96[1];
  var _useState97 = useState(null),
    _useState98 = _slicedToArray(_useState97, 2),
    gainParts = _useState98[0],
    setGainParts = _useState98[1];
  var _useState99 = useState(0),
    _useState100 = _slicedToArray(_useState99, 2),
    elapsed = _useState100[0],
    setElapsed = _useState100[1];
  var _useState101 = useState(function () {
      return !!skLoad(SK_MUTE_KEY, false);
    }),
    _useState102 = _slicedToArray(_useState101, 2),
    muted = _useState102[0],
    setMuted = _useState102[1];
  var _useState103 = useState(function () {
      return skLoad(SK_BEST_KEY, {});
    }),
    _useState104 = _slicedToArray(_useState103, 2),
    best = _useState104[0],
    setBest = _useState104[1];
  var _useState105 = useState(false),
    _useState106 = _slicedToArray(_useState105, 2),
    newRecord = _useState106[0],
    setNewRecord = _useState106[1];
  var _useState107 = useState(0),
    _useState108 = _slicedToArray(_useState107, 2),
    lifeBonus = _useState108[0],
    setLifeBonus = _useState108[1];
  var _useState109 = useState([]),
    _useState110 = _slicedToArray(_useState109, 2),
    floats = _useState110[0],
    setFloats = _useState110[1];
  var _useState111 = useState(0),
    _useState112 = _slicedToArray(_useState111, 2),
    burst = _useState112[0],
    setBurst = _useState112[1];
  var _useState113 = useState(0),
    _useState114 = _slicedToArray(_useState113, 2),
    shake = _useState114[0],
    setShake = _useState114[1];
  var _useState115 = useState(null),
    _useState116 = _slicedToArray(_useState115, 2),
    dragOver = _useState116[0],
    setDragOver = _useState116[1];
  var _useState117 = useState(null),
    _useState118 = _slicedToArray(_useState117, 2),
    justPlaced = _useState118[0],
    setJustPlaced = _useState118[1];
  var startRef = React.useRef(0);
  var dragRef = React.useRef(null);
  var suppressClickRef = React.useRef(false);
  var slotsRef = React.useRef([]);
  var lockedRef = React.useRef([]);
  var statusRef = React.useRef("playing");
  slotsRef.current = slots;
  lockedRef.current = locked;
  statusRef.current = status;
  var pz = round[idx];
  var sfx = function sfx(kind) {
    if (!muted) skSfx(kind);
  };
  var toggleMute = function toggleMute() {
    var next = !muted;
    setMuted(next);
    skSave(SK_MUTE_KEY, next);
    if (!next) skSfx("place");
  };
  var loadPuzzle = function loadPuzzle(p) {
    setBank(skShuffledBank(p));
    setSlots(p.pieces.map(function () {
      return null;
    }));
    setLocked(p.pieces.map(function () {
      return false;
    }));
    setStatus("playing");
    setHintsThisPuzzle(0);
    setGain(0);
    setGainParts(null);
    setElapsed(0);
    setJustPlaced(null);
    startRef.current = Date.now();
  };
  var startRound = function startRound(lv) {
    var list = skPickRound(lv);
    if (!list.length) return;
    setLevelId(lv);
    setRound(list);
    setIdx(0);
    setScore(0);
    setStreak(0);
    setBestStreak(0);
    setLives(SK_LIVES);
    setHintsLeft(SK_HINTS);
    setResults([]);
    setNewRecord(false);
    setLifeBonus(0);
    setFloats([]);
    setPhase("play");
    loadPuzzle(list[0]);
  };

  // Bar bonus waktu: hanya berjalan saat soal sedang dikerjakan.
  useEffect(function () {
    if (phase !== "play" || status !== "playing") return undefined;
    var t = setInterval(function () {
      return setElapsed(Math.min(SK_TIME_BONUS_SECS, (Date.now() - startRef.current) / 1000));
    }, 250);
    return function () {
      return clearInterval(t);
    };
  }, [phase, status, idx]);
  // Bersihkan sisa seret-lepas bila komponen ditutup di tengah jalan.
  useEffect(function () {
    return function () {
      if (dragRef.current && dragRef.current.cleanup) dragRef.current.cleanup();
    };
  }, []);
  var addFloat = function addFloat(text, color) {
    var id = Date.now() + Math.random();
    setFloats(function (prev) {
      return [].concat(_toConsumableArray(prev), [{
        id: id,
        text: text,
        color: color
      }]);
    });
    setTimeout(function () {
      return setFloats(function (prev) {
        return prev.filter(function (f) {
          return f.id !== id;
        });
      });
    }, 1200);
  };

  // ----- mengisi / melepas kotak -----
  var placeFirstEmpty = function placeFirstEmpty(pieceIdx) {
    if (statusRef.current !== "playing" || suppressClickRef.current) return;
    var cur = slotsRef.current;
    if (cur.includes(pieceIdx)) return;
    var at = cur.indexOf(null);
    if (at < 0) return;
    var next = cur.slice();
    next[at] = pieceIdx;
    setSlots(next);
    setJustPlaced(at);
    sfx("place");
  };
  var removeSlot = function removeSlot(n) {
    if (statusRef.current !== "playing" || suppressClickRef.current) return;
    if (lockedRef.current[n] || slotsRef.current[n] === null || slotsRef.current[n] === undefined) return;
    var next = slotsRef.current.slice();
    next[n] = null;
    setSlots(next);
    sfx("remove");
  };
  var dropOnSlot = function dropOnSlot(pieceIdx, fromSlot, n) {
    var cur = slotsRef.current.slice();
    var lk = lockedRef.current;
    if (lk[n]) return;
    if (fromSlot !== null && fromSlot !== undefined) {
      if (lk[fromSlot] || fromSlot === n) return;
      var prevInTarget = cur[n];
      cur[n] = pieceIdx;
      cur[fromSlot] = prevInTarget; // tukar isi dua kotak
    } else {
      cur[n] = pieceIdx; // isi lama di kotak itu (bila ada) otomatis kembali ke daftar potongan
    }
    setSlots(cur);
    setJustPlaced(n);
    sfx("place");
  };
  var dropOnBank = function dropOnBank(fromSlot) {
    if (fromSlot === null || fromSlot === undefined || lockedRef.current[fromSlot]) return;
    var next = slotsRef.current.slice();
    next[fromSlot] = null;
    setSlots(next);
    sfx("remove");
  };
  var resetSlots = function resetSlots() {
    if (statusRef.current !== "playing") return;
    setSlots(function (prev) {
      return prev.map(function (v, k) {
        return lockedRef.current[k] ? v : null;
      });
    });
  };

  // ----- seret & lepas (pointer events; ketuk biasa tetap berfungsi lewat onClick) -----
  var onDragStart = function onDragStart(e, pieceIdx, fromSlot) {
    if (statusRef.current !== "playing") return;
    if (typeof e.button === "number" && e.button !== 0) return;
    if (fromSlot !== null && lockedRef.current[fromSlot]) return;
    if (dragRef.current && dragRef.current.cleanup) dragRef.current.cleanup();
    var text = pz.pieces[pieceIdx];
    var st = {
      x0: e.clientX,
      y0: e.clientY,
      moved: false,
      ghost: null
    };
    var hitSlot = function hitSlot(x, y) {
      var el = document.elementFromPoint ? document.elementFromPoint(x, y) : null;
      return el && el.closest ? el : null;
    };
    var move = function move(ev) {
      if (!st.moved && Math.hypot(ev.clientX - st.x0, ev.clientY - st.y0) > 8) {
        st.moved = true;
        var g = document.createElement("div");
        g.className = "sk-ghost";
        g.textContent = text;
        document.body.appendChild(g);
        st.ghost = g;
      }
      if (!st.moved) return;
      if (st.ghost) {
        st.ghost.style.left = ev.clientX + "px";
        st.ghost.style.top = ev.clientY + "px";
      }
      var el = hitSlot(ev.clientX, ev.clientY);
      var slotEl = el ? el.closest("[data-slot]") : null;
      setDragOver(slotEl ? Number(slotEl.getAttribute("data-slot")) : null);
    };
    var finish = function finish(ev, cancelled) {
      st.cleanup();
      if (!st.moved) return;
      suppressClickRef.current = true;
      setTimeout(function () {
        suppressClickRef.current = false;
      }, 80);
      if (cancelled) return;
      var el = hitSlot(ev.clientX, ev.clientY);
      var slotEl = el ? el.closest("[data-slot]") : null;
      if (slotEl) dropOnSlot(pieceIdx, fromSlot, Number(slotEl.getAttribute("data-slot")));else if (el && el.closest("[data-bank]")) dropOnBank(fromSlot);
    };
    var up = function up(ev) {
      return finish(ev, false);
    };
    var cancel = function cancel(ev) {
      return finish(ev, true);
    };
    st.cleanup = function () {
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerup", up);
      window.removeEventListener("pointercancel", cancel);
      if (st.ghost && st.ghost.parentNode) st.ghost.parentNode.removeChild(st.ghost);
      st.ghost = null;
      setDragOver(null);
      if (dragRef.current === st) dragRef.current = null;
    };
    window.addEventListener("pointermove", move);
    window.addEventListener("pointerup", up);
    window.addEventListener("pointercancel", cancel);
    dragRef.current = st;
  };

  // ----- petunjuk: isi kotak pertama yang masih kosong / salah dengan potongan yang benar -----
  var useHint = function useHint() {
    if (statusRef.current !== "playing" || hintsLeft <= 0 || !pz) return;
    var cur = slotsRef.current.slice();
    var lk = lockedRef.current.slice();
    var n = pz.order.findIndex(function (pi, k) {
      return !(cur[k] !== null && cur[k] !== undefined && pz.pieces[cur[k]] === pz.pieces[pi]);
    });
    if (n < 0) return;
    var want = pz.pieces[pz.order[n]];
    var pick = pz.pieces.findIndex(function (t, i) {
      return t === want && !cur.includes(i);
    });
    var fromSlot = -1;
    if (pick < 0) {
      fromSlot = cur.findIndex(function (v, k) {
        return v !== null && v !== undefined && pz.pieces[v] === want && !lk[k] && k !== n;
      });
      pick = fromSlot >= 0 ? cur[fromSlot] : -1;
    }
    if (pick < 0) return;
    var occupant = cur[n];
    cur[n] = pick;
    if (fromSlot >= 0) cur[fromSlot] = occupant;
    lk[n] = true;
    setSlots(cur);
    setLocked(lk);
    setJustPlaced(n);
    setHintsLeft(function (h) {
      return h - 1;
    });
    setHintsThisPuzzle(function (h) {
      return h + 1;
    });
    sfx("hint");
  };

  // ----- periksa jawaban -----
  var checkAnswer = function checkAnswer() {
    if (statusRef.current !== "playing" || !pz || slots.some(function (v) {
      return v === null || v === undefined;
    })) return;
    var correct = puzzleLineFor(pz, slots) === pz.line;
    var placed = slots.map(function (i) {
      return pz.pieces[i];
    });
    var g = 0;
    if (correct) {
      var newStreak = streak + 1;
      var base = Math.max(20, 100 - 30 * hintsThisPuzzle);
      var secs = (Date.now() - startRef.current) / 1000;
      var timeBonus = hintsThisPuzzle > 0 ? 0 : Math.round(50 * Math.max(0, 1 - secs / SK_TIME_BONUS_SECS));
      var streakBonus = Math.min(newStreak - 1, 5) * 10;
      g = base + timeBonus + streakBonus;
      setScore(function (s) {
        return s + g;
      });
      setGain(g);
      setGainParts({
        base: base,
        timeBonus: timeBonus,
        streakBonus: streakBonus
      });
      setStreak(newStreak);
      setBestStreak(function (b) {
        return Math.max(b, newStreak);
      });
      setStatus("correct");
      setBurst(function (b) {
        return b + 1;
      });
      addFloat("+" + g, "var(--matcha)");
      sfx("correct");
      skVibrate(30);
    } else {
      setLives(function (l) {
        return l - 1;
      });
      setStreak(0);
      setStatus("wrong");
      setShake(function (s) {
        return s + 1;
      });
      addFloat("💔", "var(--sakura)");
      sfx("wrong");
      skVibrate([60, 40, 60]);
    }
    setResults(function (prev) {
      var next = prev.slice();
      next[idx] = {
        correct: correct,
        placed: placed,
        gain: g,
        hinted: hintsThisPuzzle > 0
      };
      return next;
    });
  };
  var finishRound = function finishRound() {
    var completed = lives > 0;
    var correctCount = results.filter(function (r) {
      return r && r.correct;
    }).length;
    var bonus = completed ? lives * 50 : 0;
    var finalScore = score + bonus;
    setLifeBonus(bonus);
    setScore(finalScore);
    var prevBest = best[levelId];
    var isNew = finalScore > (prevBest && prevBest.score || 0);
    if (isNew) {
      var nb = Object.assign({}, best);
      nb[levelId] = {
        score: finalScore,
        correct: correctCount,
        total: round.length
      };
      setBest(nb);
      skSave(SK_BEST_KEY, nb);
    }
    setNewRecord(isNew && finalScore > 0);
    setPhase("result");
    sfx(completed ? "win" : "lose");
    if (completed) setBurst(function (b) {
      return b + 1;
    });
  };
  var nextStep = function nextStep() {
    if (lives <= 0 || idx + 1 >= round.length) {
      finishRound();
      return;
    }
    setIdx(idx + 1);
    loadPuzzle(round[idx + 1]);
  };
  var confetti = React.useMemo(function () {
    return Array.from({
      length: 18
    }, function (_, i) {
      var ang = Math.PI * 2 * i / 18 + Math.random() * 0.4;
      var dist = 70 + Math.random() * 90;
      return {
        dx: Math.round(Math.cos(ang) * dist) + "px",
        dy: Math.round(Math.sin(ang) * dist - 30) + "px",
        rot: Math.round(Math.random() * 360 - 180) + "deg",
        e: ["🌸", "✨", "⭐", "🎉", "🍃"][i % 5]
      };
    });
  }, [burst]);
  var renderBurst = function renderBurst() {
    return burst > 0 ? /*#__PURE__*/React.createElement("div", {
      key: "burst" + burst,
      "aria-hidden": "true",
      style: {
        position: "absolute",
        inset: 0,
        overflow: "hidden",
        pointerEvents: "none"
      }
    }, confetti.map(function (c, i) {
      return /*#__PURE__*/React.createElement("span", {
        key: i,
        className: "sk-confetti",
        style: {
          "--dx": c.dx,
          "--dy": c.dy,
          "--rot": c.rot
        }
      }, c.e);
    })) : null;
  };
  var renderFloats = function renderFloats() {
    return floats.map(function (f) {
      return /*#__PURE__*/React.createElement("div", {
        key: f.id,
        className: "sk-float",
        style: {
          color: f.color
        },
        "aria-hidden": "true"
      }, f.text);
    });
  };
  var soundBtn = /*#__PURE__*/React.createElement("button", {
    type: "button",
    onClick: toggleMute,
    className: "nm-btn nm-btn-ghost sk-sound",
    "aria-label": muted ? "Nyalakan suara" : "Matikan suara",
    "aria-pressed": muted,
    style: {
      padding: "4px 8px",
      fontSize: 16
    }
  }, muted ? "🔇" : "🔊");

  // ================= LOBI =================
  if (phase === "lobby") {
    var poolSize = skPool(levelId).length;
    var bestHere = best[levelId];
    return /*#__PURE__*/React.createElement("div", {
      className: "sk-root",
      style: {
        display: "flex",
        flexDirection: "column",
        gap: 12
      }
    }, /*#__PURE__*/React.createElement("style", null, SK_CSS), /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between"
      }
    }, /*#__PURE__*/React.createElement("button", {
      onClick: onExit,
      className: "nm-btn nm-btn-ghost"
    }, /*#__PURE__*/React.createElement(ChevronRight, {
      size: 14,
      style: {
        transform: "rotate(180deg)"
      },
      "aria-hidden": "true"
    }), " Ganti jenis latihan"), soundBtn), /*#__PURE__*/React.createElement("div", {
      className: "nm-card",
      style: {
        textAlign: "center"
      }
    }, /*#__PURE__*/React.createElement(Tape, {
      color: "var(--momiji)"
    }), /*#__PURE__*/React.createElement("div", {
      className: "sk-bounce",
      style: {
        fontSize: 40,
        lineHeight: 1.2
      },
      "aria-hidden": "true"
    }, "\uD83C\uDF38"), /*#__PURE__*/React.createElement("p", {
      className: "nm-title",
      style: {
        fontSize: 22,
        margin: "2px 0 2px"
      }
    }, "Susun Kata"), /*#__PURE__*/React.createElement("p", {
      style: {
        fontSize: 12,
        color: "var(--text-secondary)",
        margin: "0 0 12px"
      }
    }, "\u4E26\u3079\u66FF\u3048 \xB7 Susun potongan kata jadi kalimat yang benar"), /*#__PURE__*/React.createElement("p", {
      style: {
        fontSize: 12,
        fontWeight: 700,
        color: "var(--text-secondary)",
        margin: "0 0 6px",
        textAlign: "left"
      }
    }, "Pilih level:"), /*#__PURE__*/React.createElement("div", {
      style: {
        display: "grid",
        gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
        gap: 8,
        marginBottom: 12
      }
    }, SK_LEVELS.map(function (lv) {
      var n = skPool(lv.id).length;
      var b = best[lv.id];
      return /*#__PURE__*/React.createElement("button", {
        key: lv.id,
        type: "button",
        "data-level": lv.id,
        onClick: function onClick() {
          return setLevelId(lv.id);
        },
        className: "sk-level" + (levelId === lv.id ? " sk-level-on" : ""),
        "aria-pressed": levelId === lv.id
      }, /*#__PURE__*/React.createElement("div", {
        className: "nm-title",
        style: {
          fontSize: 17
        }
      }, lv.label), /*#__PURE__*/React.createElement("div", {
        style: {
          fontSize: 10.5,
          color: "var(--text-secondary)"
        }
      }, n, " soal"), /*#__PURE__*/React.createElement("div", {
        style: {
          fontSize: 10.5,
          color: b ? "var(--momiji)" : "var(--text-muted)",
          fontWeight: 700,
          minHeight: 15
        }
      }, b ? "🏆 " + skFmt(b.score) : "—"));
    })), /*#__PURE__*/React.createElement("div", {
      style: {
        textAlign: "left",
        background: "var(--paper)",
        border: "2px solid var(--line)",
        borderRadius: 14,
        padding: "10px 12px",
        marginBottom: 14,
        fontSize: 12.5,
        lineHeight: 1.75,
        color: "var(--text-body)"
      }
    }, /*#__PURE__*/React.createElement("div", null, "\uD83D\uDC46 Ketuk atau ", /*#__PURE__*/React.createElement("b", null, "seret"), " potongan kata ke kotak yang kosong."), /*#__PURE__*/React.createElement("div", null, "\u2764\uFE0F Kamu punya ", /*#__PURE__*/React.createElement("b", null, SK_LIVES, " nyawa"), ". Jawaban salah mengurangi 1 nyawa."), /*#__PURE__*/React.createElement("div", null, "\u26A1 Makin ", /*#__PURE__*/React.createElement("b", null, "cepat"), " dan ", /*#__PURE__*/React.createElement("b", null, "beruntun"), " benar, makin besar poinnya."), /*#__PURE__*/React.createElement("div", null, "\uD83D\uDCA1 Ada ", /*#__PURE__*/React.createElement("b", null, SK_HINTS, " petunjuk"), " per ronde (poin soal itu berkurang).")), /*#__PURE__*/React.createElement("button", {
      type: "button",
      onClick: function onClick() {
        return startRound(levelId);
      },
      disabled: poolSize === 0,
      className: "nm-btn nm-btn-primary sk-ready",
      style: {
        fontSize: 15,
        padding: "12px 30px"
      }
    }, "\u25B6 Mulai Main"), /*#__PURE__*/React.createElement("p", {
      style: {
        fontSize: 11,
        color: "var(--text-secondary)",
        margin: "10px 0 0"
      }
    }, Math.min(SK_ROUND_SIZE, poolSize), " soal acak per ronde", bestHere ? " \xB7 skor terbaikmu ".concat(skFmt(bestHere.score)) : "")));
  }

  // ================= HASIL =================
  if (phase === "result") {
    var correctCount = results.filter(function (r) {
      return r && r.correct;
    }).length;
    var ratio = round.length ? correctCount / round.length : 0;
    var stars = ratio >= 0.9 ? 3 : ratio >= 0.6 ? 2 : ratio >= 0.3 ? 1 : 0;
    var completed = lives > 0;
    var lvLabel = (SK_LEVELS.find(function (l) {
      return l.id === levelId;
    }) || {}).label;
    return /*#__PURE__*/React.createElement("div", {
      className: "sk-root",
      style: {
        display: "flex",
        flexDirection: "column",
        gap: 12
      }
    }, /*#__PURE__*/React.createElement("style", null, SK_CSS), /*#__PURE__*/React.createElement("div", {
      className: "nm-card sk-fade",
      style: {
        position: "relative",
        textAlign: "center",
        overflow: "hidden"
      }
    }, /*#__PURE__*/React.createElement(Tape, {
      color: "var(--momiji)"
    }), renderBurst(), /*#__PURE__*/React.createElement("p", {
      style: {
        fontSize: 12,
        fontWeight: 700,
        color: "var(--text-secondary)",
        margin: "0 0 4px"
      }
    }, "Susun Kata \xB7 ", lvLabel), /*#__PURE__*/React.createElement("p", {
      className: "nm-title",
      style: {
        fontSize: 22,
        margin: "0 0 8px"
      }
    }, completed ? "🎉 Ronde selesai!" : "💔 Nyawa habis"), /*#__PURE__*/React.createElement("div", {
      className: "sk-stars",
      style: {
        fontSize: 36,
        letterSpacing: 4,
        margin: "0 0 6px"
      },
      "aria-label": "".concat(stars, " dari 3 bintang")
    }, [0, 1, 2].map(function (i) {
      return /*#__PURE__*/React.createElement("span", {
        key: i,
        className: i < stars ? "sk-star" : "",
        style: {
          display: "inline-block",
          animationDelay: i * 0.18 + "s",
          opacity: i < stars ? 1 : 0.25,
          filter: i < stars ? "none" : "grayscale(1)"
        }
      }, "\u2B50");
    })), /*#__PURE__*/React.createElement("p", {
      className: "nm-title sk-final-score",
      style: {
        fontSize: 34,
        margin: "4px 0 2px",
        color: "var(--momiji)"
      }
    }, skFmt(score)), /*#__PURE__*/React.createElement("p", {
      style: {
        fontSize: 11.5,
        color: "var(--text-secondary)",
        margin: "0 0 8px"
      }
    }, "poin"), newRecord && /*#__PURE__*/React.createElement("p", {
      className: "sk-pop",
      style: {
        display: "inline-block",
        fontSize: 12.5,
        fontWeight: 800,
        color: "var(--momiji)",
        background: "var(--momiji-tint)",
        borderRadius: 10,
        padding: "4px 12px",
        margin: "0 0 10px"
      }
    }, "\uD83C\uDFC6 Rekor baru!"), /*#__PURE__*/React.createElement("div", {
      style: {
        display: "grid",
        gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
        gap: 8,
        margin: "6px 0 14px"
      }
    }, [["Benar", "".concat(correctCount, "/").concat(round.length)], ["Combo terbaik", "\uD83D\uDD25 ".concat(bestStreak)], ["Bonus nyawa", completed ? "+".concat(lifeBonus) : "0"]].map(function (_ref10) {
      var _ref11 = _slicedToArray(_ref10, 2),
        k = _ref11[0],
        v = _ref11[1];
      return /*#__PURE__*/React.createElement("div", {
        key: k,
        style: {
          background: "var(--paper)",
          border: "2px solid var(--line)",
          borderRadius: 12,
          padding: "8px 4px"
        }
      }, /*#__PURE__*/React.createElement("p", {
        style: {
          fontSize: 10.5,
          color: "var(--text-secondary)",
          margin: "0 0 2px",
          fontWeight: 700
        }
      }, k), /*#__PURE__*/React.createElement("p", {
        style: {
          fontSize: 15,
          fontWeight: 800,
          margin: 0
        }
      }, v));
    })), /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        gap: 8,
        justifyContent: "center",
        flexWrap: "wrap"
      }
    }, /*#__PURE__*/React.createElement("button", {
      type: "button",
      onClick: function onClick() {
        return startRound(levelId);
      },
      className: "nm-btn nm-btn-primary"
    }, "\uD83D\uDD01 Main lagi"), /*#__PURE__*/React.createElement("button", {
      type: "button",
      onClick: function onClick() {
        return setPhase("lobby");
      },
      className: "nm-btn nm-btn-secondary"
    }, "Ganti level"), /*#__PURE__*/React.createElement("button", {
      type: "button",
      onClick: onExit,
      className: "nm-btn nm-btn-ghost"
    }, "Keluar"))), /*#__PURE__*/React.createElement("div", {
      className: "nm-card"
    }, /*#__PURE__*/React.createElement("p", {
      style: {
        fontSize: 13,
        fontWeight: 700,
        margin: "0 0 10px"
      }
    }, "Ulasan soal"), round.map(function (item, qi) {
      var r = results[qi];
      if (!r) return null;
      return /*#__PURE__*/React.createElement("div", {
        key: qi,
        className: "sk-review",
        style: {
          borderRadius: 14,
          border: "2px solid ".concat(r.correct ? "var(--matcha)" : "var(--sakura)"),
          background: r.correct ? "var(--matcha-tint)" : "var(--sakura-tint)",
          padding: "10px 12px",
          marginBottom: 10
        }
      }, /*#__PURE__*/React.createElement("p", {
        style: {
          fontSize: 12,
          fontWeight: 700,
          margin: "0 0 6px",
          color: "var(--text-secondary)"
        }
      }, r.correct ? "✓" : "✕", " Soal ", qi + 1, r.correct ? " \xB7 +".concat(r.gain) : "", r.hinted ? " · 💡" : ""), !r.correct && /*#__PURE__*/React.createElement("p", {
        style: {
          fontSize: 12.5,
          margin: "0 0 3px"
        }
      }, "Susunanmu: ", /*#__PURE__*/React.createElement("b", {
        style: {
          color: "var(--sakura)"
        }
      }, r.placed.join(" → "))), /*#__PURE__*/React.createElement("p", {
        style: {
          fontSize: 12.5,
          margin: "0 0 3px"
        }
      }, "Susunan benar: ", /*#__PURE__*/React.createElement("b", {
        style: {
          color: "var(--matcha)"
        }
      }, item.order.map(function (i) {
        return item.pieces[i];
      }).join(" → "))), /*#__PURE__*/React.createElement("p", {
        style: {
          fontSize: 13,
          margin: "4px 0 0",
          lineHeight: 1.8
        }
      }, item.full), item.explanation && /*#__PURE__*/React.createElement("p", {
        style: {
          fontSize: 12,
          color: "var(--text-body)",
          margin: "6px 0 0",
          lineHeight: 1.6
        }
      }, "\uD83D\uDCA1 ", item.explanation));
    })));
  }

  // ================= PERMAINAN =================
  if (!pz) return null;
  var allFilled = slots.length > 0 && slots.every(function (v) {
    return v !== null && v !== undefined;
  });
  var isCorrect = status === "correct";
  var slotNoByPart = {};
  pz.slotParts.forEach(function (partIdx, n) {
    slotNoByPart[partIdx] = n;
  });
  var timeLeftPct = Math.max(0, (1 - elapsed / SK_TIME_BONUS_SECS) * 100);
  var timeColor = timeLeftPct > 50 ? "var(--matcha)" : timeLeftPct > 25 ? "var(--yuzu)" : "var(--sakura)";
  var lastOne = lives <= 0 || idx + 1 >= round.length;
  return /*#__PURE__*/React.createElement("div", {
    className: "sk-root",
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 10
    }
  }, /*#__PURE__*/React.createElement("style", null, SK_CSS), /*#__PURE__*/React.createElement("div", {
    className: "nm-card",
    style: {
      position: "relative",
      overflow: "hidden"
    }
  }, /*#__PURE__*/React.createElement(Tape, {
    color: "var(--momiji)"
  }), renderBurst(), renderFloats(), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      gap: 8,
      marginBottom: 8
    }
  }, /*#__PURE__*/React.createElement("button", {
    type: "button",
    onClick: function onClick() {
      return setPhase("lobby");
    },
    className: "nm-btn nm-btn-ghost sk-exit",
    style: {
      padding: "4px 8px",
      fontSize: 12
    }
  }, "\u2715 Keluar"), /*#__PURE__*/React.createElement("div", {
    className: "sk-hearts",
    "aria-label": "".concat(lives, " nyawa"),
    style: {
      fontSize: 20,
      letterSpacing: 2
    }
  }, Array.from({
    length: SK_LIVES
  }, function (_, i) {
    return /*#__PURE__*/React.createElement("span", {
      key: i,
      className: i === lives && status === "wrong" ? "sk-heart-lost" : "",
      style: {
        opacity: i < lives ? 1 : 0.3,
        filter: i < lives ? "none" : "grayscale(1)",
        display: "inline-block"
      }
    }, i < lives ? "❤️" : "🖤");
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 4
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "sk-score nm-title",
    style: {
      fontSize: 16,
      color: "var(--momiji)"
    },
    "aria-label": "Skor ".concat(score)
  }, "\u2B50 ", skFmt(score)), soundBtn)), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "repeat(".concat(round.length, ", minmax(0, 1fr))"),
      gap: 4,
      marginBottom: 6
    },
    "aria-label": "Soal ".concat(idx + 1, " dari ").concat(round.length)
  }, round.map(function (_, i) {
    var r = results[i];
    var bg = r ? r.correct ? "var(--matcha)" : "var(--sakura)" : i === idx ? "var(--momiji)" : "var(--line)";
    return /*#__PURE__*/React.createElement("div", {
      key: i,
      className: "sk-dot",
      style: {
        background: bg,
        opacity: !r && i !== idx ? 0.7 : 1
      }
    });
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      margin: "0 0 8px"
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "nm-q-counter"
  }, "Soal ", idx + 1, " dari ", round.length), streak >= 2 && /*#__PURE__*/React.createElement("span", {
    className: "sk-combo sk-pop",
    key: "combo" + streak,
    style: {
      fontSize: 12,
      fontWeight: 800,
      color: "var(--momiji)",
      background: "var(--momiji-tint)",
      borderRadius: 8,
      padding: "2px 8px"
    }
  }, "\uD83D\uDD25 Combo x", streak)), /*#__PURE__*/React.createElement("div", {
    style: {
      marginBottom: 12
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      height: 6,
      borderRadius: 6,
      background: "var(--line)",
      overflow: "hidden"
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "sk-timebar",
    style: {
      height: "100%",
      width: "".concat(hintsThisPuzzle > 0 ? 0 : timeLeftPct, "%"),
      background: timeColor,
      transition: "width .25s linear, background .3s"
    }
  })), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 10.5,
      color: "var(--text-secondary)",
      margin: "3px 0 0"
    }
  }, hintsThisPuzzle > 0 ? "⚡ Bonus waktu tidak berlaku (petunjuk dipakai)" : "⚡ Bonus waktu — jawab secepatnya!")), /*#__PURE__*/React.createElement("div", {
    key: "frame" + shake + "-" + idx,
    className: "sk-frame" + (status === "wrong" ? " sk-shake" : "") + (isCorrect ? " sk-pop" : ""),
    style: {
      background: "var(--matcha-tint)",
      borderRadius: 12,
      padding: "10px 12px",
      marginBottom: 12,
      fontSize: 16,
      lineHeight: 2.7,
      whiteSpace: "pre-line"
    }
  }, pz.parts.map(function (seg, k) {
    if (!puzzleIsSlot(seg)) return /*#__PURE__*/React.createElement("span", {
      key: k
    }, seg);
    var n = slotNoByPart[k];
    var filledIdx = slots[n];
    var filled = filledIdx !== null && filledIdx !== undefined;
    var checked = status !== "playing";
    var ok = checked && filled && (isCorrect || pz.pieces[filledIdx] === pz.pieces[pz.order[n]]);
    var bad = checked && filled && !ok;
    var cls = "sk-slot" + (filled ? " sk-slot-filled" : "") + (locked[n] && !checked ? " sk-slot-hint" : "") + (dragOver === n ? " sk-slot-over" : "") + (ok ? " sk-slot-ok" : "") + (bad ? " sk-slot-bad" : "") + (justPlaced === n && filled && !checked ? " sk-pop" : "");
    return /*#__PURE__*/React.createElement("button", {
      key: k,
      type: "button",
      className: cls,
      "data-slot": n,
      onPointerDown: filled && !checked && !locked[n] ? function (e) {
        return onDragStart(e, filledIdx, n);
      } : undefined,
      onClick: function onClick() {
        return removeSlot(n);
      },
      "aria-label": "Kotak ".concat(n + 1).concat(n === pz.starSlot ? " (★)" : "").concat(filled ? ", berisi ".concat(pz.pieces[filledIdx]).concat(locked[n] ? " (petunjuk)" : ", ketuk untuk melepas") : ", kosong")
    }, filled ? pz.pieces[filledIdx] : /*#__PURE__*/React.createElement("span", {
      style: {
        color: n === pz.starSlot ? "var(--momiji)" : "var(--text-muted)",
        fontWeight: 700
      }
    }, n === pz.starSlot ? "★" : n + 1));
  })), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 11.5,
      fontWeight: 700,
      color: "var(--text-secondary)",
      margin: "0 0 6px"
    }
  }, "Potongan kata:"), /*#__PURE__*/React.createElement("div", {
    className: "sk-bank",
    "data-bank": "1",
    style: {
      display: "flex",
      flexWrap: "wrap",
      gap: 10,
      marginBottom: 14,
      minHeight: 50
    }
  }, bank.map(function (pieceIdx) {
    var used = slots.includes(pieceIdx);
    return /*#__PURE__*/React.createElement("button", {
      key: pieceIdx,
      type: "button",
      className: "sk-chip",
      disabled: used || status !== "playing",
      onPointerDown: !used && status === "playing" ? function (e) {
        return onDragStart(e, pieceIdx, null);
      } : undefined,
      onClick: function onClick() {
        return placeFirstEmpty(pieceIdx);
      },
      "aria-label": "Pilih potongan ".concat(pz.pieces[pieceIdx])
    }, pz.pieces[pieceIdx]);
  })), status === "playing" ? /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 8,
      flexWrap: "wrap",
      alignItems: "center"
    }
  }, /*#__PURE__*/React.createElement("button", {
    type: "button",
    onClick: useHint,
    disabled: hintsLeft <= 0,
    className: "nm-btn nm-btn-outline sk-hint",
    style: {
      opacity: hintsLeft > 0 ? 1 : 0.5
    }
  }, "\uD83D\uDCA1 Petunjuk (", hintsLeft, ")"), /*#__PURE__*/React.createElement("button", {
    type: "button",
    onClick: resetSlots,
    className: "nm-btn nm-btn-secondary"
  }, "\u21BA Reset"), /*#__PURE__*/React.createElement("button", {
    type: "button",
    onClick: checkAnswer,
    disabled: !allFilled,
    className: "nm-btn nm-btn-primary sk-check" + (allFilled ? " sk-ready" : ""),
    style: {
      marginLeft: "auto",
      opacity: allFilled ? 1 : 0.5,
      cursor: allFilled ? "pointer" : "not-allowed"
    }
  }, /*#__PURE__*/React.createElement(Check, {
    size: 15,
    "aria-hidden": "true"
  }), " Periksa")) : /*#__PURE__*/React.createElement("div", {
    className: "sk-feedback sk-fade",
    role: "status",
    "aria-live": "polite"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      borderRadius: 14,
      border: "2px solid ".concat(isCorrect ? "var(--matcha)" : "var(--sakura)"),
      background: isCorrect ? "var(--matcha-tint)" : "var(--sakura-tint)",
      padding: "10px 12px",
      marginBottom: 12
    }
  }, /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 15,
      fontWeight: 800,
      margin: "0 0 4px",
      color: isCorrect ? "var(--matcha)" : "var(--sakura)"
    }
  }, isCorrect ? "\uD83C\uDF89 Benar! +".concat(gain) : "💔 Belum tepat"), isCorrect && gainParts && /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 11.5,
      color: "var(--text-secondary)",
      margin: "0 0 4px"
    }
  }, "Dasar ", gainParts.base, gainParts.timeBonus ? " \xB7 \u26A1 waktu +".concat(gainParts.timeBonus) : "", gainParts.streakBonus ? " \xB7 \uD83D\uDD25 combo +".concat(gainParts.streakBonus) : ""), !isCorrect && /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 12.5,
      margin: "0 0 3px"
    }
  }, "Susunan benar: ", /*#__PURE__*/React.createElement("b", {
    style: {
      color: "var(--matcha)"
    }
  }, pz.order.map(function (i) {
    return pz.pieces[i];
  }).join(" → "))), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 13,
      margin: "4px 0 0",
      lineHeight: 1.8
    }
  }, pz.full), pz.explanation && /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 12,
      color: "var(--text-body)",
      margin: "6px 0 0",
      lineHeight: 1.6
    }
  }, "\uD83D\uDCA1 ", pz.explanation)), /*#__PURE__*/React.createElement("button", {
    type: "button",
    onClick: nextStep,
    className: "nm-btn nm-btn-primary sk-next"
  }, lastOne ? /*#__PURE__*/React.createElement(React.Fragment, null, "Lihat hasil ", /*#__PURE__*/React.createElement(ChevronRight, {
    size: 14,
    "aria-hidden": "true"
  })) : /*#__PURE__*/React.createElement(React.Fragment, null, "Lanjut ", /*#__PURE__*/React.createElement(ChevronRight, {
    size: 14,
    "aria-hidden": "true"
  }))))));
}
function NihongoMichi() {
  var _TABS$find;
  var _useState119 = useState(false),
    _useState120 = _slicedToArray(_useState119, 2),
    darkMode = _useState120[0],
    setDarkMode = _useState120[1];
  useEffect(function () {
    document.documentElement.classList.toggle("dark", darkMode);
  }, [darkMode]);
  var _useState121 = useState("home"),
    _useState122 = _slicedToArray(_useState121, 2),
    tab = _useState122[0],
    setTab = _useState122[1];
  useEffect(function () {
    var scrollUp = function scrollUp() {
      window.scrollTo(0, 0);
      if (document.scrollingElement) document.scrollingElement.scrollTop = 0;
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
    };
    scrollUp();
    var t = setTimeout(scrollUp, 50);
    return function () {
      return clearTimeout(t);
    };
  }, [tab]);
  var _useState123 = useState("n5"),
    _useState124 = _slicedToArray(_useState123, 2),
    levelId = _useState124[0],
    setLevelId = _useState124[1];
  var _useState125 = useState({}),
    _useState126 = _slicedToArray(_useState125, 2),
    checked = _useState126[0],
    setChecked = _useState126[1];
  var _useState127 = useState({}),
    _useState128 = _slicedToArray(_useState127, 2),
    activityLog = _useState128[0],
    setActivityLog = _useState128[1];
  var _useState129 = useState(function () {
      var d = new Date();
      return {
        y: d.getFullYear(),
        m: d.getMonth()
      };
    }),
    _useState130 = _slicedToArray(_useState129, 2),
    calendarMonth = _useState130[0],
    setCalendarMonth = _useState130[1];
  var _useState131 = useState(null),
    _useState132 = _slicedToArray(_useState131, 2),
    selectedDate = _useState132[0],
    setSelectedDate = _useState132[1];
  var _useState133 = useState([]),
    _useState134 = _slicedToArray(_useState133, 2),
    weeklyGoals = _useState134[0],
    setWeeklyGoals = _useState134[1];
  var _useState135 = useState([]),
    _useState136 = _slicedToArray(_useState135, 2),
    weeklyHistory = _useState136[0],
    setWeeklyHistory = _useState136[1];
  var _useState137 = useState(null),
    _useState138 = _slicedToArray(_useState137, 2),
    historyWeekIdx = _useState138[0],
    setHistoryWeekIdx = _useState138[1];
  var _useState139 = useState(""),
    _useState140 = _slicedToArray(_useState139, 2),
    newGoalText = _useState140[0],
    setNewGoalText = _useState140[1];
  var _useState141 = useState(null),
    _useState142 = _slicedToArray(_useState141, 2),
    latihanMode = _useState142[0],
    setLatihanMode = _useState142[1];
  var _useState143 = useState(null),
    _useState144 = _slicedToArray(_useState143, 2),
    ujianCategory = _useState144[0],
    setUjianCategory = _useState144[1];
  var _useState145 = useState(null),
    _useState146 = _slicedToArray(_useState145, 2),
    ujianLevel = _useState146[0],
    setUjianLevel = _useState146[1];
  var _useState147 = useState(null),
    _useState148 = _slicedToArray(_useState147, 2),
    ujianYear = _useState148[0],
    setUjianYear = _useState148[1];
  var _useState149 = useState(null),
    _useState150 = _slicedToArray(_useState149, 2),
    ujianSection = _useState150[0],
    setUjianSection = _useState150[1];
  var _useState151 = useState([]),
    _useState152 = _slicedToArray(_useState151, 2),
    ujianQuestions = _useState152[0],
    setUjianQuestions = _useState152[1];
  var _useState153 = useState(0),
    _useState154 = _slicedToArray(_useState153, 2),
    ujianIdx = _useState154[0],
    setUjianIdx = _useState154[1];
  var _useState155 = useState(null),
    _useState156 = _slicedToArray(_useState155, 2),
    ujianSel = _useState156[0],
    setUjianSel = _useState156[1];
  var _useState157 = useState(0),
    _useState158 = _slicedToArray(_useState157, 2),
    ujianScore = _useState158[0],
    setUjianScore = _useState158[1];
  var _useState159 = useState(false),
    _useState160 = _slicedToArray(_useState159, 2),
    ujianDone = _useState160[0],
    setUjianDone = _useState160[1];
  var _useState161 = useState({}),
    _useState162 = _slicedToArray(_useState161, 2),
    ujianAnswersMap = _useState162[0],
    setUjianAnswersMap = _useState162[1];
  var _useState163 = useState(false),
    _useState164 = _slicedToArray(_useState163, 2),
    showUjianPembahasan = _useState164[0],
    setShowUjianPembahasan = _useState164[1];
  var _useState165 = useState(false),
    _useState166 = _slicedToArray(_useState165, 2),
    showUjianScript = _useState166[0],
    setShowUjianScript = _useState166[1];
  var _useState167 = useState(false),
    _useState168 = _slicedToArray(_useState167, 2),
    ujianSimMode = _useState168[0],
    setUjianSimMode = _useState168[1];
  var _useState169 = useState(0),
    _useState170 = _slicedToArray(_useState169, 2),
    ujianSimTimeLeft = _useState170[0],
    setUjianSimTimeLeft = _useState170[1];
  var _useState171 = useState([]),
    _useState172 = _slicedToArray(_useState171, 2),
    ujianSimResults = _useState172[0],
    setUjianSimResults = _useState172[1];
  var _useState173 = useState(false),
    _useState174 = _slicedToArray(_useState173, 2),
    ujianSimAllDone = _useState174[0],
    setUjianSimAllDone = _useState174[1];
  var UJIAN_SECTIONS = [{
    id: "mojigoi",
    label: "文字・語彙",
    desc: "もんだい1-4",
    count: 33,
    simMinutes: 20
  }, {
    id: "bunpou_dokkai",
    label: "文法・読解",
    desc: "もんだい1-6",
    count: 32,
    simMinutes: 40
  }, {
    id: "choukai",
    label: "聴解",
    desc: "もんだい1,3,4",
    count: 15,
    simMinutes: 20
  }];
  var normalizeUjianSection = function normalizeUjianSection(levelId, year, section) {
    var data = (JLPT_EXAM_CONTENT[levelId] || {})[year];
    if (!data) return [];
    var sec = data[section];
    if (!sec) return [];
    var qs = [];
    if (section === "mojigoi") {
      ["mondai1", "mondai2", "mondai3", "mondai4", "mondai5", "mondai6"].forEach(function (mKey) {
        var m = sec[mKey];
        if (!m) return;
        // もんだい1/2/4: yang dijawab = kata bergaris bawah di kalimat (seperti di PDF), jadi teks perintah umum
        // ("＿＿＿の ことばは…") tidak ditampilkan. Sebagian level (N2) punya urutan もんだい yang berbeda,
        // jadi data bisa menyetel hideInstruction sendiri secara eksplisit; kalau tidak disetel, pakai aturan lama.
        var hideInstruction = m.hideInstruction !== undefined ? m.hideInstruction : mKey === "mondai1" || mKey === "mondai2" || mKey === "mondai4";
        m.items.forEach(function (it) {
          qs.push({
            mondai: m.title,
            desc: hideInstruction ? "" : m.desc,
            hideInstruction: hideInstruction,
            passage: it.text,
            question: hideInstruction ? "" : m.desc,
            choices: it.choices,
            correct: it.choices[it.answer],
            image: it.image,
            explanation: it.explanation
          });
        });
      });
    } else if (section === "bunpou_dokkai") {
      var m1 = sec.mondai1;
      m1.items.forEach(function (it) {
        return qs.push({
          mondai: m1.title,
          desc: m1.desc,
          passage: it.text,
          question: m1.desc,
          choices: it.choices,
          correct: it.choices[it.answer],
          explanation: it.explanation
        });
      });
      var m2 = sec.mondai2;
      m2.items.forEach(function (it) {
        return qs.push({
          mondai: m2.title,
          desc: m2.desc,
          passage: it.text,
          question: m2.desc,
          choices: it.choices,
          correct: it.answer,
          explainExtra: it.full,
          explanation: it.explanation
        });
      });
      var m3 = sec.mondai3;
      m3.passages.forEach(function (p) {
        p.blanks.forEach(function (b) {
          qs.push({
            mondai: m3.title,
            desc: "".concat(p.title, " \u2014 \u30D6\u30E9\u30F3\u30AF\u3010").concat(b.num, "\u3011"),
            passage: p.text,
            question: "\u3010".concat(b.num, "\u3011\u306B \u4F55\u3092 \u5165\u308C\u307E\u3059\u304B\u3002"),
            choices: b.choices,
            correct: b.choices[b.answer],
            explanation: b.explanation
          });
        });
      });
      var m4 = sec.mondai4;
      if (m4) {
        m4.items.forEach(function (it) {
          return qs.push({
            mondai: m4.title,
            desc: m4.desc,
            passage: it.text,
            question: it.question,
            choices: it.choices,
            correct: it.choices[it.answer],
            image: it.image,
            explanation: it.explanation
          });
        });
      }
      var m5 = sec.mondai5;
      if (Array.isArray(m5.passages)) {
        m5.passages.forEach(function (p5) {
          return p5.questions.forEach(function (q) {
            return qs.push({
              mondai: m5.title,
              desc: m5.desc,
              passage: p5.text,
              question: q.q,
              choices: q.choices,
              correct: q.choices[q.answer],
              explanation: q.explanation
            });
          });
        });
      } else {
        m5.questions.forEach(function (q) {
          return qs.push({
            mondai: m5.title,
            desc: m5.desc,
            passage: m5.text,
            question: q.q,
            choices: q.choices,
            correct: q.choices[q.answer],
            explanation: q.explanation
          });
        });
      }
      ["mondai6", "mondai7", "mondai8", "mondai9"].forEach(function (m6Key) {
        var m6 = sec[m6Key];
        if (m6) {
          var m6passage = m6.info_text !== undefined || m6.info_table ? m6.info_text : m6.info;
          if (Array.isArray(m6.items)) {
            m6.items.forEach(function (it) {
              return qs.push({
                mondai: m6.title,
                desc: m6.desc,
                passage: m6passage,
                table: m6.info_table,
                tableFooter: m6.info_footer,
                image: it.image || m6.info_image,
                question: it.question,
                choices: it.choices,
                correct: it.choices[it.answer],
                explanation: it.explanation
              });
            });
          } else {
            qs.push({
              mondai: m6.title,
              desc: m6.desc,
              passage: m6passage,
              table: m6.info_table,
              tableFooter: m6.info_footer,
              image: m6.info_image,
              question: m6.question,
              choices: m6.choices,
              correct: m6.choices[m6.answer],
              explanation: m6.explanation
            });
          }
        }
      });
    } else if (section === "choukai") {
      ["mondai1", "mondai2", "mondai3", "mondai4", "mondai5"].forEach(function (mKey) {
        var m = sec[mKey];
        if (!m) return;
        m.items.forEach(function (it) {
          var base = {
            mondai: m.title,
            desc: m.desc,
            audio: it.dialog,
            dialogText: it.dialog,
            image: it.image,
            audioSrc: it.audioSrc,
            audioStart: it.audioStart,
            audioEnd: it.audioEnd
          };
          if (Array.isArray(it.questions)) {
            // satu audio dengan beberapa pertanyaan (mis. N2 もんだい5 質問1/質問2)
            it.questions.forEach(function (q) {
              return qs.push(_objectSpread(_objectSpread({}, base), {}, {
                question: q.question || q.q || "",
                choices: q.choices,
                correct: q.choices[q.answer],
                explanation: q.explanation
              }));
            });
          } else {
            qs.push(_objectSpread(_objectSpread({}, base), {}, {
              question: it.question || (mKey === "mondai3" ? "何と 言いますか。" : ""),
              choices: it.choices,
              correct: it.choices[it.answer],
              explanation: it.explanation
            }));
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
  var UJIAN_CATEGORIES = [{
    id: "mojigoi",
    section: "mojigoi",
    title: "Latihan Mojigoi",
    sub: "文字・語彙 · Kanji & kosakata"
  }, {
    id: "dokkai",
    section: "bunpou_dokkai",
    title: "Latihan Dokkai",
    sub: "文法・読解 · Tata bahasa & bacaan"
  }, {
    id: "choukai",
    section: "choukai",
    title: "Latihan Choukai",
    sub: "聴解 · Latihan mendengar (dengan audio)"
  }];
  var getLatihanYears = function getLatihanYears(levelId, sectionId) {
    var byLevel = JLPT_EXAM_CONTENT[levelId] || {};
    return Object.keys(byLevel).sort(function (a, b) {
      return Number(a) - Number(b);
    }).filter(function (y) {
      return normalizeUjianSection(levelId, y, sectionId).length > 0;
    });
  };
  var startUjian = function startUjian(section, simModeArg, levelOverride, yearOverride) {
    var qs = normalizeUjianSection(levelOverride || ujianLevel, String(yearOverride || ujianYear), section);
    var useSim = simModeArg !== undefined ? simModeArg : ujianSimMode;
    setUjianSection(section);
    setUjianQuestions(qs);
    setUjianIdx(0);
    setUjianSel(null);
    setUjianScore(0);
    setUjianDone(false);
    setUjianAnswersMap({});
    setShowUjianPembahasan(false);
    setShowUjianScript(false);
    setUjianSimMode(useSim);
    if (useSim) {
      var secDef = UJIAN_SECTIONS.find(function (s) {
        return s.id === section;
      });
      setUjianSimTimeLeft((secDef ? secDef.simMinutes : 0) * 60);
    } else {
      setUjianSimResults([]);
      setUjianSimAllDone(false);
    }
  };
  var startUjianSimulation = function startUjianSimulation() {
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
  var submitUjianAnswer = function submitUjianAnswer(i) {
    setUjianSel(i);
    setUjianAnswersMap(function (prev) {
      return _objectSpread(_objectSpread({}, prev), {}, _defineProperty({}, ujianIdx, i));
    });
  };
  var goToUjianQuestion = function goToUjianQuestion(idx) {
    setUjianIdx(idx);
    setShowUjianScript(false);
    var savedIdx = ujianAnswersMap[idx];
    setUjianSel(savedIdx !== undefined ? savedIdx : null);
  };
  var nextUjianQuestion = function nextUjianQuestion() {
    if (ujianIdx + 1 < ujianQuestions.length) {
      goToUjianQuestion(ujianIdx + 1);
    } else {
      submitUjianSection();
    }
  };
  var prevUjianQuestion = function prevUjianQuestion() {
    if (ujianIdx > 0) {
      goToUjianQuestion(ujianIdx - 1);
    }
  };
  // submitLockRef: klik beruntun pada tombol Submit (mis. dobel-tap tanpa sengaja di HP) sebelumnya
  // bisa membuat fungsi ini terpanggil beberapa kali sebelum layar sempat berpindah ke bagian
  // berikutnya - karena tombol Submit ada di posisi yang sama di tiap bagian, klik ke-2/ke-3 bisa
  // mendarat di tombol Submit bagian BERIKUTNYA yang isinya masih kosong, sehingga 1-2 bagian
  // ujian terlewati tanpa sempat dijawab dan langsung nyasar ke halaman hasil akhir. Kuncian
  // singkat ini menahan panggilan ganda tersebut; terkunci hanya sekitar 900ms, jadi klik Submit
  // yang disengaja pada bagian berikutnya (submit sungguhan) tetap berfungsi normal.
  var submitLockRef = React.useRef(false);
  var submitUjianSection = function submitUjianSection() {
    if (submitLockRef.current) return;
    submitLockRef.current = true;
    setTimeout(function () {
      submitLockRef.current = false;
    }, 900);
    var correct = 0;
    ujianQuestions.forEach(function (q, idx) {
      if (ujianAnswersMap[idx] !== undefined && q.choices[ujianAnswersMap[idx]] === q.correct) correct++;
    });
    setUjianScore(correct);
    setUjianDone(true);
    if (ujianSimMode) {
      var secDef = UJIAN_SECTIONS.find(function (s) {
        return s.id === ujianSection;
      });
      var result = {
        id: ujianSection,
        label: secDef ? secDef.label : ujianSection,
        questions: ujianQuestions,
        answersMap: ujianAnswersMap,
        score: correct
      };
      setUjianSimResults(function (prev) {
        return [].concat(_toConsumableArray(prev), [result]);
      });
      var currentIdx = UJIAN_SECTIONS.findIndex(function (s) {
        return s.id === ujianSection;
      });
      var next = UJIAN_SECTIONS[currentIdx + 1];
      if (next) {
        startUjian(next.id, true);
      } else {
        setUjianSimAllDone(true);
      }
    } else {
      // Latihan satu kategori: tampilkan hasil + pembahasan dengan layar hasil yang sama.
      var _secDef = UJIAN_SECTIONS.find(function (s) {
        return s.id === ujianSection;
      });
      setUjianSimResults([{
        id: ujianSection,
        label: _secDef ? _secDef.label : ujianSection,
        questions: ujianQuestions,
        answersMap: ujianAnswersMap,
        score: correct
      }]);
      setUjianSimAllDone(true);
    }
  };
  var exitUjianSection = function exitUjianSection() {
    setUjianYear(null);
    setUjianSection(null);
    setUjianQuestions([]);
    setUjianDone(false);
    setShowUjianPembahasan(false);
    setUjianSimMode(false);
    setUjianSimResults([]);
    setUjianSimAllDone(false);
    setUjianSimTimeLeft(0);
  };
  useEffect(function () {
    if (!ujianSimMode || !ujianSection || ujianDone) return;
    var t = setInterval(function () {
      setUjianSimTimeLeft(function (prev) {
        return Math.max(0, prev - 1);
      });
    }, 1000);
    return function () {
      return clearInterval(t);
    };
  }, [ujianSimMode, ujianSection, ujianDone]);
  useEffect(function () {
    if (ujianSimMode && ujianSection && !ujianDone && ujianSimTimeLeft === 0) {
      submitUjianSection();
    }
  }, [ujianSimTimeLeft]);
  var _useState175 = useState(null),
    _useState176 = _slicedToArray(_useState175, 2),
    examLevel = _useState176[0],
    setExamLevel = _useState176[1];
  var _useState177 = useState(null),
    _useState178 = _slicedToArray(_useState177, 2),
    examDifficulty = _useState178[0],
    setExamDifficulty = _useState178[1];
  var _useState179 = useState(null),
    _useState180 = _slicedToArray(_useState179, 2),
    examSection = _useState180[0],
    setExamSection = _useState180[1];
  var _useState181 = useState(null),
    _useState182 = _slicedToArray(_useState181, 2),
    examPracticeLevel = _useState182[0],
    setExamPracticeLevel = _useState182[1];
  var _useState183 = useState({}),
    _useState184 = _slicedToArray(_useState183, 2),
    completedPracticeLevels = _useState184[0],
    setCompletedPracticeLevels = _useState184[1];
  var _useState185 = useState(null),
    _useState186 = _slicedToArray(_useState185, 2),
    confirmRepeatLevel = _useState186[0],
    setConfirmRepeatLevel = _useState186[1];
  var _useState187 = useState([]),
    _useState188 = _slicedToArray(_useState187, 2),
    examQuestions = _useState188[0],
    setExamQuestions = _useState188[1];
  var _useState189 = useState(0),
    _useState190 = _slicedToArray(_useState189, 2),
    quizIdx = _useState190[0],
    setQuizIdx = _useState190[1];
  var _useState191 = useState(null),
    _useState192 = _slicedToArray(_useState191, 2),
    quizSel = _useState192[0],
    setQuizSel = _useState192[1];
  var _useState193 = useState(0),
    _useState194 = _slicedToArray(_useState193, 2),
    quizScore = _useState194[0],
    setQuizScore = _useState194[1];
  var _useState195 = useState([]),
    _useState196 = _slicedToArray(_useState195, 2),
    userAnswers = _useState196[0],
    setUserAnswers = _useState196[1];
  var _useState197 = useState(false),
    _useState198 = _slicedToArray(_useState197, 2),
    quizDone = _useState198[0],
    setQuizDone = _useState198[1];
  var _useState199 = useState("hiragana"),
    _useState200 = _slicedToArray(_useState199, 2),
    kanaScript = _useState200[0],
    setKanaScript = _useState200[1];
  var _useState201 = useState(false),
    _useState202 = _slicedToArray(_useState201, 2),
    kanaQuizActive = _useState202[0],
    setKanaQuizActive = _useState202[1];
  var _useState203 = useState(null),
    _useState204 = _slicedToArray(_useState203, 2),
    kanaQuizDifficulty = _useState204[0],
    setKanaQuizDifficulty = _useState204[1];
  var _useState205 = useState(null),
    _useState206 = _slicedToArray(_useState205, 2),
    kanaQuizPracticeLevel = _useState206[0],
    setKanaQuizPracticeLevel = _useState206[1];
  var _useState207 = useState({}),
    _useState208 = _slicedToArray(_useState207, 2),
    kanaCompletedLevels = _useState208[0],
    setKanaCompletedLevels = _useState208[1];
  var _useState209 = useState(null),
    _useState210 = _slicedToArray(_useState209, 2),
    confirmRepeatKanaLevel = _useState210[0],
    setConfirmRepeatKanaLevel = _useState210[1];
  var _useState211 = useState([]),
    _useState212 = _slicedToArray(_useState211, 2),
    kanaQuizQuestions = _useState212[0],
    setKanaQuizQuestions = _useState212[1];
  var _useState213 = useState(0),
    _useState214 = _slicedToArray(_useState213, 2),
    kanaQuizIdx = _useState214[0],
    setKanaQuizIdx = _useState214[1];
  var _useState215 = useState(null),
    _useState216 = _slicedToArray(_useState215, 2),
    kanaQuizSel = _useState216[0],
    setKanaQuizSel = _useState216[1];
  var _useState217 = useState(0),
    _useState218 = _slicedToArray(_useState217, 2),
    kanaQuizScore = _useState218[0],
    setKanaQuizScore = _useState218[1];
  var _useState219 = useState(false),
    _useState220 = _slicedToArray(_useState219, 2),
    kanaQuizDone = _useState220[0],
    setKanaQuizDone = _useState220[1];
  var _useState221 = useState([]),
    _useState222 = _slicedToArray(_useState221, 2),
    kanaQuizAnswers = _useState222[0],
    setKanaQuizAnswers = _useState222[1];
  var _useState223 = useState(false),
    _useState224 = _slicedToArray(_useState223, 2),
    showKanaPembahasan = _useState224[0],
    setShowKanaPembahasan = _useState224[1];
  var _useState225 = useState(null),
    _useState226 = _slicedToArray(_useState225, 2),
    matchingLevel = _useState226[0],
    setMatchingLevel = _useState226[1];
  var _useState227 = useState(null),
    _useState228 = _slicedToArray(_useState227, 2),
    matchingType = _useState228[0],
    setMatchingType = _useState228[1];
  var _useState229 = useState([]),
    _useState230 = _slicedToArray(_useState229, 2),
    matchingPairs = _useState230[0],
    setMatchingPairs = _useState230[1];
  var startMatching = function startMatching(level, type) {
    setMatchingType(type);
    setMatchingPairs(buildMatchingPairs(level, type));
  };
  var exitMatching = function exitMatching() {
    setMatchingLevel(null);
    setMatchingType(null);
    setMatchingPairs([]);
  };
  var _useState231 = useState(null),
    _useState232 = _slicedToArray(_useState231, 2),
    writingScript = _useState232[0],
    setWritingScript = _useState232[1];
  var _useState233 = useState("dasar"),
    _useState234 = _slicedToArray(_useState233, 2),
    writingGroup = _useState234[0],
    setWritingGroup = _useState234[1];
  var _useState235 = useState(null),
    _useState236 = _slicedToArray(_useState235, 2),
    writingLevel = _useState236[0],
    setWritingLevel = _useState236[1];
  var _useState237 = useState(null),
    _useState238 = _slicedToArray(_useState237, 2),
    writingChar = _useState238[0],
    setWritingChar = _useState238[1];
  var _useState239 = useState(60),
    _useState240 = _slicedToArray(_useState239, 2),
    writingVisible = _useState240[0],
    setWritingVisible = _useState240[1];
  var _useState241 = useState({}),
    _useState242 = _slicedToArray(_useState241, 2),
    writingDone = _useState242[0],
    setWritingDone = _useState242[1];
  var exitWriting = function exitWriting() {
    setWritingScript(null);
    setWritingGroup("dasar");
    setWritingLevel(null);
    setWritingChar(null);
    setWritingVisible(60);
  };
  var kanaLevelKey = function kanaLevelKey(script, diff, pl) {
    return "".concat(script, ":").concat(diff, ":").concat(pl);
  };
  var startKanaQuiz = function startKanaQuiz(difficulty, practiceLevel) {
    setKanaQuizDifficulty(difficulty);
    setKanaQuizPracticeLevel(practiceLevel);
    setKanaQuizQuestions(genKanaQuiz(kanaScript, difficulty, practiceLevel));
    setKanaQuizIdx(0);
    setKanaQuizSel(null);
    setKanaQuizScore(0);
    setKanaQuizDone(false);
    setKanaQuizAnswers([]);
    setShowKanaPembahasan(false);
  };
  var submitKanaAnswer = function submitKanaAnswer(i) {
    setKanaQuizSel(i);
  };
  var nextKanaQuestion = function nextKanaQuestion() {
    var q = kanaQuizQuestions[kanaQuizIdx];
    var newAnswer = {
      question: q,
      selected: q.choices[kanaQuizSel]
    };
    var updated = [].concat(_toConsumableArray(kanaQuizAnswers), [newAnswer]);
    setKanaQuizAnswers(updated);
    if (kanaQuizIdx + 1 < kanaQuizQuestions.length) {
      setKanaQuizIdx(function (i) {
        return i + 1;
      });
      setKanaQuizSel(null);
    } else {
      var finalScore = updated.filter(function (a) {
        return a.selected === a.question.correct;
      }).length;
      setKanaQuizScore(finalScore);
      setKanaQuizDone(true);
      var passed = kanaQuizQuestions.length > 0 && finalScore / kanaQuizQuestions.length >= 0.7;
      var key = kanaLevelKey(kanaScript, kanaQuizDifficulty, kanaQuizPracticeLevel);
      setKanaCompletedLevels(function (prev) {
        return _objectSpread(_objectSpread({}, prev), {}, _defineProperty({}, key, {
          score: finalScore,
          total: kanaQuizQuestions.length,
          passed: passed
        }));
      });
    }
  };
  var exitKanaQuiz = function exitKanaQuiz() {
    setKanaQuizActive(false);
    setKanaQuizDifficulty(null);
    setKanaQuizPracticeLevel(null);
    setKanaQuizQuestions([]);
    setKanaQuizDone(false);
    setShowKanaPembahasan(false);
  };
  var _useState243 = useState({}),
    _useState244 = _slicedToArray(_useState243, 2),
    kanaKnown = _useState244[0],
    setKanaKnown = _useState244[1];
  var _useState245 = useState({}),
    _useState246 = _slicedToArray(_useState245, 2),
    dailyDone = _useState246[0],
    setDailyDone = _useState246[1];
  var _useState247 = useState({}),
    _useState248 = _slicedToArray(_useState247, 2),
    habitDays = _useState248[0],
    setHabitDays = _useState248[1];
  var _useState249 = useState({}),
    _useState250 = _slicedToArray(_useState249, 2),
    expanded = _useState250[0],
    setExpanded = _useState250[1];

  // ── Penyimpanan progres di browser (localStorage) + cadangan/impor data ──
  var STORAGE_KEY = "nihongo-michi-progress-v1";
  // Rutinitas harian: { "2026-10-02": { d1: true, d3: true }, ... } -> tiap tanggal punya daftar sendiri,
  // jadi checklist otomatis mulai dari nol lagi di hari berikutnya.
  var _useState251 = useState({}),
    _useState252 = _slicedToArray(_useState251, 2),
    dailyLog = _useState252[0],
    setDailyLog = _useState252[1];
  // Flashcard kanji & kana: { kind: "kanji" | "kana", cat, list, index }
  var _useState253 = useState(null),
    _useState254 = _slicedToArray(_useState253, 2),
    flash = _useState254[0],
    setFlash = _useState254[1];
  var _useState255 = useState(false),
    _useState256 = _slicedToArray(_useState255, 2),
    flashFlipped = _useState256[0],
    setFlashFlipped = _useState256[1];
  var flashTouch = React.useRef({
    x: null,
    y: null,
    swiped: false
  });
  var openFlash = function openFlash(data) {
    setFlashFlipped(false);
    setFlash(data);
  };
  var flashClose = function flashClose() {
    setFlash(null);
    setFlashFlipped(false);
  };
  var flashGo = function flashGo(d) {
    setFlashFlipped(false);
    setFlash(function (f) {
      return f ? _objectSpread(_objectSpread({}, f), {}, {
        index: (f.index + d + f.list.length) % f.list.length
      }) : f;
    });
  };
  useEffect(function () {
    if (!flash) return;
    var onKey = function onKey(e) {
      if (e.key === "Escape") flashClose();else if (e.key === "ArrowRight") flashGo(1);else if (e.key === "ArrowLeft") flashGo(-1);else if (e.key === " " && !(e.target && e.target.closest && e.target.closest("button"))) {
        e.preventDefault();
        setFlashFlipped(function (v) {
          return !v;
        });
      }
    };
    var prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return function () {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [!!flash]);
  var _useState257 = useState(0),
    _useState258 = _slicedToArray(_useState257, 2),
    setDayTick = _useState258[1];
  useEffect(function () {
    var refresh = function refresh() {
      return setDayTick(function (n) {
        return n + 1;
      });
    }; // ganti hari saat aplikasi dibuka kembali
    document.addEventListener("visibilitychange", refresh);
    window.addEventListener("focus", refresh);
    return function () {
      document.removeEventListener("visibilitychange", refresh);
      window.removeEventListener("focus", refresh);
    };
  }, []);
  var _useState259 = useState(false),
    _useState260 = _slicedToArray(_useState259, 2),
    hydrated = _useState260[0],
    setHydrated = _useState260[1];
  var buildSnapshot = function buildSnapshot() {
    return {
      v: 1,
      darkMode: darkMode,
      checked: checked,
      activityLog: activityLog,
      weeklyGoals: weeklyGoals,
      weeklyHistory: weeklyHistory,
      completedPracticeLevels: completedPracticeLevels,
      kanaCompletedLevels: kanaCompletedLevels,
      writingDone: writingDone,
      kanaKnown: kanaKnown,
      dailyLog: dailyLog
    };
  };
  var applySnapshot = function applySnapshot(d) {
    if (!d || _typeof(d) !== "object" || Array.isArray(d)) return false;
    var isObj = function isObj(x) {
      return x && _typeof(x) === "object" && !Array.isArray(x);
    };
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
  useEffect(function () {
    try {
      var raw = localStorage.getItem(STORAGE_KEY);
      if (raw) applySnapshot(JSON.parse(raw));
    } catch (e) {/* penyimpanan browser tidak tersedia atau data rusak: mulai dari kosong */}
    setHydrated(true);
  }, []);
  useEffect(function () {
    if (!hydrated) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(buildSnapshot()));
    } catch (e) {/* diabaikan */}
  }, [hydrated, darkMode, checked, activityLog, weeklyGoals, weeklyHistory, completedPracticeLevels, kanaCompletedLevels, writingDone, kanaKnown, dailyLog]);
  var speak = function speak(text) {
    try {
      if (!window.speechSynthesis) return;
      window.speechSynthesis.cancel();
      var utter = new SpeechSynthesisUtterance(text);
      utter.lang = "ja-JP";
      utter.rate = 0.8;
      window.speechSynthesis.speak(utter);
    } catch (e) {/* speech not supported, silently ignore */}
  };
  var speakDialog = function speakDialog(dialogText) {
    try {
      if (!window.speechSynthesis) return;
      window.speechSynthesis.cancel();
      var lines = dialogText.split("\n").map(function (l) {
        return l.trim();
      }).filter(Boolean);
      var turns = lines.map(function (line) {
        var m = line.match(/^([^：:]{1,3})[：:](.*)$/);
        if (m) return {
          speaker: m[1],
          text: m[2].trim()
        };
        return {
          speaker: null,
          text: line
        };
      });
      var speakerPitch = {};
      var nextPitch = 1.15;
      turns.forEach(function (t, i) {
        var utter = new SpeechSynthesisUtterance(t.text);
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
    } catch (e) {/* speech not supported, silently ignore */}
  };
  var SpeakBtn = function SpeakBtn(_ref12) {
    var text = _ref12.text,
      _ref12$size = _ref12.size,
      size = _ref12$size === void 0 ? 15 : _ref12$size;
    return /*#__PURE__*/React.createElement("button", {
      onClick: function onClick(e) {
        e.stopPropagation();
        speak(text);
      },
      title: "Dengar pelafalan",
      "aria-label": "Dengar pelafalan",
      style: {
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        width: size + 12,
        height: size + 12,
        borderRadius: "50%",
        border: "1.5px solid var(--line)",
        background: "var(--card-bg)",
        cursor: "pointer",
        flexShrink: 0,
        padding: 0
      }
    }, /*#__PURE__*/React.createElement(Volume2, {
      size: size,
      color: "var(--sora)",
      "aria-hidden": "true"
    }));
  };
  var StrokeSvg = function StrokeSvg(_ref13) {
    var _char4 = _ref13["char"],
      _ref13$folder = _ref13.folder,
      folder = _ref13$folder === void 0 ? "svgsJa" : _ref13$folder,
      _ref13$size = _ref13.size,
      size = _ref13$size === void 0 ? 120 : _ref13$size;
    var _useState261 = useState(null),
      _useState262 = _slicedToArray(_useState261, 2),
      svgText = _useState262[0],
      setSvgText = _useState262[1];
    var _useState263 = useState("loading"),
      _useState264 = _slicedToArray(_useState263, 2),
      status = _useState264[0],
      setStatus = _useState264[1];
    var _useState265 = useState(0),
      _useState266 = _slicedToArray(_useState265, 2),
      replayKey = _useState266[0],
      setReplayKey = _useState266[1];
    var containerRef = React.useRef(null);
    useEffect(function () {
      var cancelled = false;
      setStatus("loading");
      setSvgText(null);
      if (STROKE_DATA[_char4]) {
        setSvgText(STROKE_DATA[_char4]);
        setStatus("ok");
        return;
      }
      var code = _char4.codePointAt(0);
      var tryFetch = function tryFetch(f) {
        return fetch("https://raw.githubusercontent.com/parsimonhi/animCJK/master/".concat(f, "/").concat(code, ".svg")).then(function (r) {
          return r.ok ? r.text() : Promise.reject();
        });
      };
      tryFetch(folder)["catch"](function () {
        return tryFetch(folder === "svgsJa" ? "svgsJaKana" : "svgsJa");
      }).then(function (txt) {
        if (cancelled) return;
        var cleaned = txt.replace(/<!\[CDATA\[/g, "").replace(/\]\]>/g, "");
        setSvgText(cleaned);
        setStatus("ok");
      })["catch"](function () {
        if (!cancelled) setStatus("error");
      });
      return function () {
        cancelled = true;
      };
    }, [_char4, folder, replayKey]);
    useEffect(function () {
      if (status !== "ok" || !containerRef.current) return;
      var svgEl = containerRef.current.querySelector("svg.acjk");
      if (!svgEl) return;
      var strokes = svgEl.querySelectorAll("path[clip-path]");
      strokes.forEach(function (p) {
        var delay = p.style.getPropertyValue("--d") || "0s";
        p.style.strokeDasharray = "3337";
        p.style.strokeDashoffset = "3339";
        p.style.strokeWidth = "128";
        p.style.strokeLinecap = "round";
        p.style.fill = "none";
        p.style.stroke = "#000";
        p.style.animation = "none";
        void p.getBoundingClientRect(); // force reflow (offsetWidth tidak berlaku di elemen SVG)
        p.style.animation = "nm-stroke-zk 0.8s linear forwards ".concat(delay);
      });
    }, [status, svgText, replayKey]);
    return /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 4
      }
    }, /*#__PURE__*/React.createElement("div", {
      ref: containerRef,
      style: {
        width: size,
        height: size,
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
      }
    }, status === "loading" && /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 11,
        color: "var(--text-secondary)"
      }
    }, "memuat animasi..."), status === "error" && /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 10.5,
        color: "var(--sakura)",
        textAlign: "center",
        padding: "0 4px"
      }
    }, "Animasi belum tersedia untuk karakter ini (baru kana & kanji N5 yang tersimpan langsung di aplikasi)"), status === "ok" && /*#__PURE__*/React.createElement("div", {
      style: {
        width: size,
        height: size
      },
      dangerouslySetInnerHTML: {
        __html: svgText
      }
    })), status === "ok" && /*#__PURE__*/React.createElement("button", {
      onClick: function onClick(e) {
        e.stopPropagation();
        setReplayKey(function (k) {
          return k + 1;
        });
      },
      style: {
        fontSize: 10.5,
        fontWeight: 700,
        color: "var(--sora)",
        background: "var(--sora-tint)",
        border: "none",
        borderRadius: 999,
        padding: "3px 10px",
        cursor: "pointer"
      }
    }, "\u21BB Ulangi animasi"), status === "error" && /*#__PURE__*/React.createElement("button", {
      onClick: function onClick(e) {
        e.stopPropagation();
        setReplayKey(function (k) {
          return k + 1;
        });
      },
      style: {
        fontSize: 10.5,
        fontWeight: 700,
        color: "var(--text-secondary)",
        background: "var(--line)",
        border: "none",
        borderRadius: 999,
        padding: "3px 10px",
        cursor: "pointer"
      }
    }, "\u21BB Coba lagi"));
  };
  var KanaTile = function KanaTile(_ref14) {
    var tileKey = _ref14.tileKey,
      _char5 = _ref14["char"],
      romaji = _ref14.romaji,
      onOpen = _ref14.onOpen;
    var known = !!kanaKnown[tileKey];
    var isOpen = false; // detail kana kini tampil sebagai flashcard
    return /*#__PURE__*/React.createElement("div", {
      onClick: function onClick() {
        return onOpen && onOpen();
      },
      style: {
        position: "relative",
        background: isOpen ? "var(--sora-tint)" : known ? "var(--sora-tint)" : "var(--card-bg)",
        border: "2px solid ".concat(isOpen ? "var(--sora)" : known ? "var(--sora)" : "var(--line)"),
        borderRadius: 16,
        padding: "10px 8px",
        cursor: "pointer",
        minHeight: isOpen ? 190 : 92,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        gap: 4,
        transition: "all 0.15s ease"
      }
    }, /*#__PURE__*/React.createElement("span", {
      onClick: function onClick(e) {
        e.stopPropagation();
        setKanaKnown(function (prev) {
          return _objectSpread(_objectSpread({}, prev), {}, _defineProperty({}, tileKey, !prev[tileKey]));
        });
      },
      style: {
        position: "absolute",
        top: 6,
        right: 6,
        cursor: "pointer"
      }
    }, known ? /*#__PURE__*/React.createElement(Check, {
      size: 15,
      color: "var(--sora)",
      "aria-hidden": "true"
    }) : /*#__PURE__*/React.createElement(Circle, {
      size: 15,
      color: "var(--text-muted)",
      "aria-hidden": "true"
    })), !isOpen ? /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("span", {
      className: "nm-title",
      style: {
        fontSize: 28
      }
    }, _char5), /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 10,
        color: "var(--text-secondary)"
      }
    }, "ketuk untuk lihat")) : /*#__PURE__*/React.createElement("div", {
      style: {
        width: "100%"
      }
    }, /*#__PURE__*/React.createElement(StrokeSvg, {
      "char": _char5,
      folder: "svgsJaKana",
      size: 80
    }), /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: 6,
        margin: "4px 0 2px"
      }
    }, /*#__PURE__*/React.createElement("p", {
      style: {
        fontSize: 12,
        margin: 0,
        color: "var(--text-body)"
      }
    }, "Dibaca: ", /*#__PURE__*/React.createElement("b", {
      style: {
        color: "var(--ink)"
      }
    }, romaji)), /*#__PURE__*/React.createElement(SpeakBtn, {
      text: _char5,
      size: 13
    })), /*#__PURE__*/React.createElement("p", {
      style: {
        fontSize: 9.5,
        color: "var(--text-secondary)",
        margin: "4px 0 0"
      }
    }, "ketuk lagi untuk tutup")));
  };
  var _useState267 = useState("kanji"),
    _useState268 = _slicedToArray(_useState267, 2),
    activeCat = _useState268[0],
    setActiveCat = _useState268[1];
  var _useState269 = useState("level"),
    _useState270 = _slicedToArray(_useState269, 2),
    trackerStep = _useState270[0],
    setTrackerStep = _useState270[1];
  useEffect(function () {
    var scrollUp = function scrollUp() {
      window.scrollTo(0, 0);
      if (document.scrollingElement) document.scrollingElement.scrollTop = 0;
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
    };
    scrollUp();
    var t = setTimeout(scrollUp, 50);
    return function () {
      return clearTimeout(t);
    };
  }, [trackerStep]);
  var _useState271 = useState(false),
    _useState272 = _slicedToArray(_useState271, 2),
    showParticles = _useState272[0],
    setShowParticles = _useState272[1];
  var _useState273 = useState(""),
    _useState274 = _slicedToArray(_useState273, 2),
    search = _useState274[0],
    setSearch = _useState274[1];
  var _useState275 = useState(0),
    _useState276 = _slicedToArray(_useState275, 2),
    kanjiPage = _useState276[0],
    setKanjiPage = _useState276[1];
  var KANJI_PAGE_SIZE = 20;
  var _useState277 = useState({}),
    _useState278 = _slicedToArray(_useState277, 2),
    orderSnapshot = _useState278[0],
    setOrderSnapshot = _useState278[1];
  var toggleExpand = function toggleExpand(cat, item) {
    var key = "".concat(cat, ":").concat(item);
    setExpanded(function (prev) {
      return _objectSpread(_objectSpread({}, prev), {}, _defineProperty({}, key, !prev[key]));
    });
  };
  var level = LEVELS.find(function (l) {
    return l.id === levelId;
  });
  var todayStr = function todayStr() {
    var d = new Date();
    return "".concat(d.getFullYear(), "-").concat(String(d.getMonth() + 1).padStart(2, "0"), "-").concat(String(d.getDate()).padStart(2, "0"));
  };
  var toggleDaily = function toggleDaily(taskId) {
    var k = todayStr();
    setDailyLog(function (prev) {
      var day = _objectSpread({}, prev[k] || {});
      if (day[taskId]) delete day[taskId];else day[taskId] = true;
      var next = _objectSpread({}, prev);
      if (Object.keys(day).length) next[k] = day;else delete next[k];
      return next;
    });
  };
  var addWeeklyGoal = function addWeeklyGoal() {
    var text = newGoalText.trim();
    if (!text) return;
    setWeeklyGoals(function (prev) {
      return [].concat(_toConsumableArray(prev), [{
        id: Date.now(),
        text: text,
        createdAt: todayStr()
      }]);
    });
    setNewGoalText("");
  };
  var completeWeeklyGoal = function completeWeeklyGoal(id) {
    setWeeklyGoals(function (prev) {
      var goal = prev.find(function (g) {
        return g.id === id;
      });
      if (goal) setWeeklyHistory(function (h) {
        return [_objectSpread(_objectSpread({}, goal), {}, {
          completedAt: todayStr()
        })].concat(_toConsumableArray(h));
      });
      return prev.filter(function (g) {
        return g.id !== id;
      });
    });
  };
  var removeWeeklyGoal = function removeWeeklyGoal(id) {
    setWeeklyGoals(function (prev) {
      return prev.filter(function (g) {
        return g.id !== id;
      });
    });
  };
  var toggle = function toggle(cat, item) {
    var key = "".concat(cat, ":").concat(item);
    setChecked(function (prev) {
      var willBeDone = !prev[key];
      if (willBeDone) {
        var date = todayStr();
        setActivityLog(function (logPrev) {
          var dayList = logPrev[date] ? _toConsumableArray(logPrev[date]) : [];
          var label = cat === "grammar" ? item : cat === "vocab" ? "Kosakata: ".concat(item) : "Kanji: ".concat(item);
          if (!dayList.includes(label)) dayList.push(label);
          return _objectSpread(_objectSpread({}, logPrev), {}, _defineProperty({}, date, dayList));
        });
      }
      return _objectSpread(_objectSpread({}, prev), {}, _defineProperty({}, key, willBeDone));
    });
  };
  var catCount = function catCount(cat) {
    var items = level[cat];
    var done = items.filter(function (i) {
      return checked["".concat(cat, ":").concat(i)];
    }).length;
    return {
      done: done,
      total: items.length
    };
  };
  var catPct = function catPct(cat) {
    var _catCount = catCount(cat),
      done = _catCount.done,
      total = _catCount.total;
    return done / total * 100;
  };
  var overallPct = useMemo(function () {
    return (catPct("kanji") + catPct("vocab") + catPct("grammar")) / 3;
  }, [checked, levelId]);
  var allLevelsPct = useMemo(function () {
    var allDone = 0,
      allTotal = 0;
    LEVELS.forEach(function (lvl) {
      ["kanji", "vocab", "grammar"].forEach(function (cat) {
        var items = lvl[cat] || [];
        allTotal += items.length;
        allDone += items.filter(function (it) {
          return checked["".concat(cat, ":").concat(it)];
        }).length;
      });
    });
    return allTotal ? Math.round(allDone / allTotal * 100) : 0;
  }, [checked]);
  var overallCount = useMemo(function () {
    var cats = ["kanji", "vocab", "grammar"].map(catCount);
    return {
      done: cats.reduce(function (s, c) {
        return s + c.done;
      }, 0),
      total: cats.reduce(function (s, c) {
        return s + c.total;
      }, 0)
    };
  }, [checked, levelId]);
  var levelProgressPct = function levelProgressPct(lvl) {
    var done = 0,
      total = 0;
    ["kanji", "vocab", "grammar"].forEach(function (cat) {
      var items = lvl[cat];
      total += items.length;
      done += items.filter(function (i) {
        return checked["".concat(cat, ":").concat(i)];
      }).length;
    });
    return total ? done / total * 100 : 0;
  };
  var matchesSearch = function matchesSearch(cat, item) {
    if (!search.trim()) return true;
    var q = search.trim().toLowerCase();
    if (item.toLowerCase().includes(q)) return true;
    if (cat === "kanji" && KANJI_CONTENT[item]) {
      var k = KANJI_CONTENT[item];
      return k.on.toLowerCase().includes(q) || k.kun.toLowerCase().includes(q) || k.arti.toLowerCase().includes(q);
    }
    if (cat === "vocab" && VOCAB_CONTENT[item]) {
      return VOCAB_CONTENT[item].some(function (w) {
        return w.jp.includes(q) || w.reading.includes(q) || w.id.toLowerCase().includes(q);
      });
    }
    if (cat === "grammar" && GRAMMAR_CONTENT[item]) {
      return GRAMMAR_CONTENT[item].arti.toLowerCase().includes(q);
    }
    if (cat === "reading" && READING_CONTENT[item]) {
      return item.toLowerCase().includes(q) || READING_CONTENT[item].text.join(" ").toLowerCase().includes(q);
    }
    return false;
  };
  var selectLevel = function selectLevel(id) {
    setLevelId(id);
    setKanjiPage(0);
    setSearch("");
    setTrackerStep("category");
    setOrderSnapshot({});
  };
  var selectCat = function selectCat(cat) {
    setActiveCat(cat);
    setSearch("");
    setTrackerStep("content");
    setOrderSnapshot(checked);
    if (cat === "kanji") {
      var items = level.kanji;
      var firstUncheckedIdx = items.findIndex(function (it) {
        return !checked["kanji:".concat(it)];
      });
      var targetPage = firstUncheckedIdx === -1 ? Math.floor((items.length - 1) / KANJI_PAGE_SIZE) : Math.floor(firstUncheckedIdx / KANJI_PAGE_SIZE);
      setKanjiPage(Math.max(0, targetPage));
    } else {
      setKanjiPage(0);
    }
  };
  var contentView = useMemo(function () {
    var cat = activeCat;
    var filteredItems = level[cat].filter(function (item) {
      return matchesSearch(cat, item);
    });
    if (cat === "vocab") {
      filteredItems.sort(function (a, b) {
        var aDone = orderSnapshot["".concat(cat, ":").concat(a)] ? 1 : 0;
        var bDone = orderSnapshot["".concat(cat, ":").concat(b)] ? 1 : 0;
        return aDone - bDone;
      });
    }
    var isPaged = cat === "kanji" && !search.trim();
    var totalPages = isPaged ? Math.max(1, Math.ceil(filteredItems.length / KANJI_PAGE_SIZE)) : 1;
    return {
      filteredItems: filteredItems,
      isPaged: isPaged,
      totalPages: totalPages
    };
  }, [activeCat, levelId, search, orderSnapshot, checked]);
  useEffect(function () {
    if (contentView.isPaged && kanjiPage > contentView.totalPages - 1) {
      setKanjiPage(Math.max(0, contentView.totalPages - 1));
    }
  }, [contentView.isPaged, contentView.totalPages, kanjiPage]);
  var startExam = function startExam(level, section, difficulty, practiceLevel) {
    setExamLevel(level);
    setExamSection(section);
    setExamDifficulty(difficulty);
    setExamPracticeLevel(practiceLevel);
    var gen = section === "kosakata" ? genKosakata : section === "kanji" ? genKanji : section === "grammar" ? genBunpou : section === "dokkai" ? genDokkai : genChoukai;
    setExamQuestions(section === "dokkai" || section === "choukai" ? gen(level, difficulty) : gen(level, difficulty, practiceLevel));
    setQuizIdx(0);
    setQuizSel(null);
    setQuizScore(0);
    setQuizDone(false);
    setUserAnswers([]);
    setShowPembahasan(false);
  };
  var submitAnswer = function submitAnswer(i) {
    setQuizSel(i);
  };
  var practiceLevelKey = function practiceLevelKey(lvl, sec, diff, pl) {
    return "".concat(lvl, ":").concat(sec, ":").concat(diff, ":").concat(pl);
  };
  var nextQuestion = function nextQuestion() {
    var q = examQuestions[quizIdx];
    var newAnswer = {
      question: q,
      selectedIdx: quizSel,
      selected: q.choices[quizSel]
    };
    var updatedAnswers = [].concat(_toConsumableArray(userAnswers), [newAnswer]);
    setUserAnswers(updatedAnswers);
    if (quizIdx + 1 < examQuestions.length) {
      setQuizIdx(function (q) {
        return q + 1;
      });
      setQuizSel(null);
    } else {
      var finalScore = updatedAnswers.filter(function (a) {
        return a.selected === a.question.correct;
      }).length;
      setQuizScore(finalScore);
      setQuizDone(true);
      var passed = examQuestions.length > 0 && finalScore / examQuestions.length >= 0.7;
      var key = practiceLevelKey(examLevel.id, examSection, examDifficulty, examPracticeLevel);
      setCompletedPracticeLevels(function (prev) {
        return _objectSpread(_objectSpread({}, prev), {}, _defineProperty({}, key, {
          score: finalScore,
          total: examQuestions.length,
          passed: passed
        }));
      });
    }
  };
  var restartQuiz = function restartQuiz() {
    setShowPembahasan(false);
    if (examLevel && examSection && examDifficulty && examPracticeLevel) startExam(examLevel, examSection, examDifficulty, examPracticeLevel);
  };
  var exitExam = function exitExam() {
    setExamLevel(null);
    setExamSection(null);
    setExamDifficulty(null);
    setExamPracticeLevel(null);
    setExamQuestions([]);
    setQuizDone(false);
    setUserAnswers([]);
    setShowPembahasan(false);
  };
  var _useState279 = useState(false),
    _useState280 = _slicedToArray(_useState279, 2),
    showPembahasan = _useState280[0],
    setShowPembahasan = _useState280[1];
  var kanaTable = kanaScript === "hiragana" ? HIRAGANA : KATAKANA;
  var kanaFlat = KANA_ROWS.flat().filter(Boolean);
  var kanaGroupKeyCount = KANA_GROUPS.reduce(function (s, g) {
    return s + g.entries.length;
  }, 0);
  var kanaTotalCount = kanaFlat.length + kanaGroupKeyCount;
  var kanaKnownCount = kanaFlat.filter(function (r) {
    return kanaKnown["".concat(kanaScript, ":").concat(r)];
  }).length + KANA_GROUPS.reduce(function (s, g) {
    return s + g.entries.filter(function (_, i) {
      return kanaKnown["".concat(kanaScript, ":").concat(g.id, ":").concat(i)];
    }).length;
  }, 0);
  var kanaPct = kanaKnownCount / kanaTotalCount * 100;
  var dailyDoneCount = DAILY_TASKS.filter(function (t) {
    return dailyDone[t.id];
  }).length;
  var dailyPct = dailyDoneCount / DAILY_TASKS.length * 100;
  var streak = function () {
    var count = 0;
    var d = new Date();
    while (true) {
      var key = "".concat(d.getFullYear(), "-").concat(String(d.getMonth() + 1).padStart(2, "0"), "-").concat(String(d.getDate()).padStart(2, "0"));
      if (activityLog[key] && activityLog[key].length > 0) {
        count++;
        d.setDate(d.getDate() - 1);
      } else break;
    }
    return count;
  }();
  var activeTintVar = "var(--".concat(((_TABS$find = TABS.find(function (t) {
    return t.id === tab;
  })) === null || _TABS$find === void 0 ? void 0 : _TABS$find.color) || "sakura", "-tint)");
  var starsSvg = encodeURIComponent("<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"200\" height=\"200\" viewBox=\"0 0 200 200\">\n    <g fill=\"#fff\">\n      <circle cx=\"20\" cy=\"30\" r=\"1.4\"/><circle cx=\"70\" cy=\"15\" r=\"1\"/><circle cx=\"120\" cy=\"50\" r=\"1.6\"/>\n      <circle cx=\"160\" cy=\"20\" r=\"1\"/><circle cx=\"45\" cy=\"80\" r=\"1\"/><circle cx=\"100\" cy=\"100\" r=\"1.3\"/>\n      <circle cx=\"150\" cy=\"90\" r=\"1\"/><circle cx=\"185\" cy=\"130\" r=\"1.4\"/><circle cx=\"30\" cy=\"150\" r=\"1\"/>\n      <circle cx=\"80\" cy=\"170\" r=\"1.5\"/><circle cx=\"130\" cy=\"160\" r=\"1\"/><circle cx=\"10\" cy=\"110\" r=\"1\"/>\n    </g>\n  </svg>");
  return /*#__PURE__*/React.createElement("div", {
    className: "nm-app-shell",
    style: {
      fontFamily: "'Zen Maru Gothic', sans-serif",
      color: "var(--ink)",
      backgroundColor: "var(--paper)",
      backgroundImage: darkMode ? "url(\"data:image/svg+xml,".concat(starsSvg, "\"), radial-gradient(ellipse at 50% -10%, #1C2150 0%, transparent 55%), linear-gradient(180deg, #10132B 0%, #0B0E1C 60%)") : "linear-gradient(180deg, #FFD9A0 0%, #FFC08A 22%, #FFB0A0 42%, #FFE6D0 68%, #FFF3E6 100%)",
      backgroundRepeat: darkMode ? "repeat, no-repeat, no-repeat" : "no-repeat",
      backgroundSize: darkMode ? "200px 200px, 100% 100%, 100% 100%" : "100% 100%",
      backgroundAttachment: darkMode ? "fixed, fixed, fixed" : "fixed",
      borderRadius: 20,
      padding: "1.25rem",
      transition: "background 0.3s ease",
      minHeight: "100vh",
      display: "flex",
      flexDirection: "column",
      boxSizing: "border-box"
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "nm-root",
    style: {
      marginBottom: "1.1rem",
      padding: "1.1rem 1.1rem",
      borderRadius: 18,
      position: "relative",
      overflow: "hidden",
      background: darkMode ? "linear-gradient(120deg, #1E2352 0%, #2F2D66 100%)" : "linear-gradient(120deg, #FF7A5C 0%, #FF5D8F 100%)",
      display: "flex",
      alignItems: "center",
      gap: 12
    }
  }, /*#__PURE__*/React.createElement("svg", {
    width: "140",
    height: "140",
    viewBox: "0 0 140 140",
    style: {
      position: "absolute",
      right: -30,
      top: -30,
      opacity: 0.16,
      pointerEvents: "none"
    },
    "aria-hidden": "true"
  }, /*#__PURE__*/React.createElement("circle", {
    cx: "70",
    cy: "70",
    r: "50",
    fill: "none",
    stroke: "#fff",
    strokeWidth: "6"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "70",
    cy: "70",
    r: "34",
    fill: "#fff"
  })), /*#__PURE__*/React.createElement("svg", {
    width: "100%",
    height: "46",
    viewBox: "0 0 400 46",
    preserveAspectRatio: "none",
    style: {
      position: "absolute",
      left: 0,
      bottom: 0,
      opacity: 0.35,
      pointerEvents: "none"
    },
    "aria-hidden": "true"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M0 46 L130 8 Q140 -2 150 8 L163 22 L177 8 Q187 -2 197 8 L400 46 Z",
    fill: "#fff"
  })), /*#__PURE__*/React.createElement("svg", {
    width: "60",
    height: "60",
    viewBox: "0 0 60 60",
    style: {
      position: "absolute",
      left: "48%",
      top: 4,
      opacity: 0.5,
      pointerEvents: "none"
    },
    "aria-hidden": "true"
  }, /*#__PURE__*/React.createElement("g", {
    fill: "#fff"
  }, /*#__PURE__*/React.createElement("g", {
    transform: "translate(18,18)"
  }, /*#__PURE__*/React.createElement("circle", {
    r: "5",
    cx: "0",
    cy: "-7"
  }), /*#__PURE__*/React.createElement("circle", {
    r: "5",
    cx: "6.5",
    cy: "-2"
  }), /*#__PURE__*/React.createElement("circle", {
    r: "5",
    cx: "4",
    cy: "6"
  }), /*#__PURE__*/React.createElement("circle", {
    r: "5",
    cx: "-4",
    cy: "6"
  }), /*#__PURE__*/React.createElement("circle", {
    r: "5",
    cx: "-6.5",
    cy: "-2"
  })), /*#__PURE__*/React.createElement("g", {
    transform: "translate(42,32) scale(0.6)"
  }, /*#__PURE__*/React.createElement("circle", {
    r: "5",
    cx: "0",
    cy: "-7"
  }), /*#__PURE__*/React.createElement("circle", {
    r: "5",
    cx: "6.5",
    cy: "-2"
  }), /*#__PURE__*/React.createElement("circle", {
    r: "5",
    cx: "4",
    cy: "6"
  }), /*#__PURE__*/React.createElement("circle", {
    r: "5",
    cx: "-4",
    cy: "6"
  }), /*#__PURE__*/React.createElement("circle", {
    r: "5",
    cx: "-6.5",
    cy: "-2"
  })))), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      width: 44,
      height: 44,
      borderRadius: "50%",
      background: darkMode ? "#F0F2F9" : "var(--sun)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      flexShrink: 0,
      boxShadow: "0 3px 0 rgba(0,0,0,0.15)"
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "nm-title",
    style: {
      fontSize: 20,
      color: darkMode ? "#2B2C66" : "#7A2E00"
    }
  }, "\u9053")), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      position: "relative"
    }
  }, /*#__PURE__*/React.createElement("h1", {
    className: "nm-title",
    style: {
      fontSize: 23,
      margin: 0,
      color: "#fff",
      letterSpacing: "0.01em"
    }
  }, "\u65E5\u672C\u8A9E\u306E\u9053"), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 12,
      color: "rgba(255,255,255,0.85)",
      margin: "2px 0 0",
      fontWeight: 500
    }
  }, "Nihongo Michi \u2014 belajar santai, progres nyata")), /*#__PURE__*/React.createElement("button", {
    onClick: function onClick() {
      return setDarkMode(function (d) {
        return !d;
      });
    },
    "aria-label": "Ganti mode gelap/terang",
    title: "Ganti mode gelap/terang",
    style: {
      width: 56,
      height: 30,
      borderRadius: 999,
      border: "none",
      padding: 3,
      flexShrink: 0,
      position: "relative",
      background: darkMode ? "#2A3050" : "rgba(255,255,255,0.3)",
      cursor: "pointer",
      display: "flex",
      alignItems: "center",
      transition: "background 0.2s ease"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 24,
      height: 24,
      borderRadius: "50%",
      background: "#fff",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      transform: darkMode ? "translateX(26px)" : "translateX(0px)",
      transition: "transform 0.2s ease",
      boxShadow: "0 1px 3px rgba(0,0,0,0.25)"
    }
  }, darkMode ? /*#__PURE__*/React.createElement(Moon, {
    size: 14,
    color: "#C9CDE8",
    "aria-hidden": "true"
  }) : /*#__PURE__*/React.createElement(Sun, {
    size: 14,
    color: "var(--yuzu)",
    "aria-hidden": "true"
  })))), /*#__PURE__*/React.createElement("div", {
    key: tab,
    className: "nm-tab-content nm-tab-wrap",
    style: {
      background: activeTintVar,
      borderRadius: 20,
      padding: "1rem",
      transition: "background 0.2s ease",
      flex: 1
    }
  }, tab === "home" && !kanaQuizActive && /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "nm-card nm-home-hero",
    style: {
      marginBottom: 12,
      display: "flex",
      alignItems: "center",
      gap: 14
    }
  }, /*#__PURE__*/React.createElement(Tape, {
    color: "var(--sakura)"
  }), /*#__PURE__*/React.createElement(Ring, {
    pct: allLevelsPct,
    size: 56,
    color: "var(--sakura)"
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1
    }
  }, /*#__PURE__*/React.createElement("p", {
    className: "nm-title",
    style: {
      fontSize: 18,
      margin: "0 0 2px"
    }
  }, "\u304A\u304B\u3048\u308A\u306A\u3055\u3044 \uD83D\uDC4B"), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 12.5,
      color: "var(--text-secondary)",
      margin: "0 0 8px"
    }
  }, "Progres total N5-N1: ", /*#__PURE__*/React.createElement("b", {
    style: {
      color: "var(--sakura)"
    }
  }, allLevelsPct, "%")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 16,
      flexWrap: "wrap"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 6
    }
  }, /*#__PURE__*/React.createElement(Flame, {
    size: 16,
    color: "var(--yuzu)",
    "aria-hidden": "true",
    style: streak > 0 ? {
      animation: "nm-flamePulse 1.4s ease-in-out infinite"
    } : undefined
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 13,
      fontWeight: 700
    }
  }, streak, " hari streak")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 6
    }
  }, /*#__PURE__*/React.createElement(Check, {
    size: 16,
    color: "var(--matcha)",
    "aria-hidden": "true"
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 13,
      fontWeight: 700
    }
  }, weeklyHistory.length, "/", weeklyGoals.length + weeklyHistory.length, " target minggu ini"))))), /*#__PURE__*/React.createElement("p", {
    className: "nm-title",
    style: {
      fontSize: 15,
      margin: "0 0 10px"
    }
  }, "Roadmap"), /*#__PURE__*/React.createElement("div", {
    className: "nm-d-g4",
    style: {
      display: "grid",
      gridTemplateColumns: "repeat(2, minmax(0,1fr))",
      gap: 12,
      marginBottom: 16
    }
  }, LEVELS.map(function (l, i) {
    var colors = ["sakura", "sora", "matcha", "momiji"];
    var col = colors[i];
    return /*#__PURE__*/React.createElement("div", {
      key: l.id,
      className: "nm-card",
      style: {
        textAlign: "left",
        border: "2px solid var(--line)"
      }
    }, /*#__PURE__*/React.createElement(Tape, {
      color: "var(--".concat(col, ")")
    }), /*#__PURE__*/React.createElement("p", {
      style: {
        fontSize: 11.5,
        color: "var(--".concat(col, ")"),
        fontWeight: 700,
        margin: "4px 0 6px",
        letterSpacing: "0.04em"
      }
    }, "TAHAP ", i + 1), /*#__PURE__*/React.createElement("p", {
      className: "nm-title",
      style: {
        fontSize: 18,
        margin: "0 0 8px"
      }
    }, l.label, ": ", l.name), /*#__PURE__*/React.createElement("p", {
      style: {
        fontSize: 13,
        color: "var(--text-body)",
        lineHeight: 1.6,
        margin: 0,
        fontStyle: "italic"
      }
    }, "\"", l.tagline, "\""), /*#__PURE__*/React.createElement("p", {
      style: {
        fontSize: 12.5,
        color: "var(--text-secondary)",
        lineHeight: 1.6,
        margin: "6px 0 0"
      }
    }, l.comprehension), /*#__PURE__*/React.createElement("p", {
      style: {
        fontSize: 11,
        color: "var(--".concat(col, ")"),
        fontWeight: 700,
        margin: "8px 0 0"
      }
    }, "\u23F1 ", l.weeks));
  })), /*#__PURE__*/React.createElement("div", {
    className: "nm-d-g4",
    style: {
      display: "grid",
      gridTemplateColumns: "repeat(2, minmax(0,1fr))",
      gap: 12
    }
  }, [{
    id: "aksara",
    title: "Aksara",
    desc: "".concat(kanaKnownCount, "/").concat(kanaTotalCount, " dikuasai (").concat(Math.round(kanaPct) || 0, "%)"),
    icon: BookOpen,
    color: "sora"
  }, {
    id: "tracker",
    title: "Learning",
    desc: "".concat(overallCount.done, "/").concat(overallCount.total, " item \xB7 ").concat(Math.round(overallPct) || 0, "%"),
    icon: Book,
    color: "matcha"
  }, {
    id: "rutinitas",
    title: "Tracker",
    desc: "streak ".concat(streak, " hari \xB7 ").concat(allLevelsPct, "% total progres"),
    icon: BarChart3,
    color: "yuzu"
  }, {
    id: "latihan",
    title: "Latihan",
    desc: examSection ? quizDone ? "".concat(quizScore, "/").concat(examQuestions.length, " benar") : "Soal ".concat(quizIdx + 1, "/").concat(examQuestions.length) : "Kosakata, Kanji & Grammar",
    icon: PenLine,
    color: "momiji"
  }].map(function (card) {
    var Icon = card.icon;
    // Kartu "Learning" hanya menampilkan ringkasan progres (informasi) — tidak membuka tab Learning saat diklik.
    var infoOnly = card.id === "tracker";
    var Wrapper = infoOnly ? "div" : "button";
    var wrapperProps = infoOnly ? {
      style: {
        display: "block",
        textAlign: "left",
        border: "2px solid var(--line)",
        width: "100%"
      }
    } : {
      onClick: function onClick() {
        return setTab(card.id);
      },
      style: {
        display: "block",
        textAlign: "left",
        cursor: "pointer",
        border: "2px solid var(--line)",
        fontFamily: "inherit",
        width: "100%"
      }
    };
    return /*#__PURE__*/React.createElement(Wrapper, _extends({
      key: card.id,
      className: "nm-card"
    }, wrapperProps), /*#__PURE__*/React.createElement(Tape, {
      color: "var(--".concat(card.color, ")")
    }), /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        alignItems: "center",
        gap: 8,
        marginBottom: 6
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        width: 30,
        height: 30,
        borderRadius: 9,
        background: "var(--".concat(card.color, "-tint)"),
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexShrink: 0
      }
    }, /*#__PURE__*/React.createElement(Icon, {
      size: 16,
      color: "var(--".concat(card.color, ")"),
      "aria-hidden": "true"
    })), /*#__PURE__*/React.createElement("p", {
      className: "nm-title",
      style: {
        fontSize: 14,
        margin: 0
      }
    }, card.title)), /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between"
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 12,
        color: "var(--text-secondary)"
      }
    }, card.desc), !infoOnly && /*#__PURE__*/React.createElement(ChevronRight, {
      size: 14,
      color: "var(--text-secondary)",
      "aria-hidden": "true"
    })));
  }))), kanaQuizActive && /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "nm-card"
  }, /*#__PURE__*/React.createElement(Tape, {
    color: "var(--sora)"
  }), /*#__PURE__*/React.createElement("button", {
    onClick: exitKanaQuiz,
    style: {
      display: "flex",
      alignItems: "center",
      gap: 4,
      background: "none",
      border: "none",
      color: "var(--text-secondary)",
      fontFamily: "'Zen Maru Gothic', sans-serif",
      fontSize: 12,
      fontWeight: 700,
      cursor: "pointer",
      padding: 0,
      marginBottom: 10
    }
  }, /*#__PURE__*/React.createElement(ChevronRight, {
    size: 13,
    style: {
      transform: "rotate(180deg)"
    },
    "aria-hidden": "true"
  }), " ", kanaScript === "hiragana" ? "Hiragana" : "Katakana", kanaQuizDifficulty && " \xB7 ".concat(DIFFICULTY[kanaQuizDifficulty].label), kanaQuizPracticeLevel && " \xB7 Lv.".concat(kanaQuizPracticeLevel)), !kanaQuizDifficulty ? /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 13,
      color: "var(--text-secondary)",
      margin: "0 0 12px"
    }
  }, "Kuis ", /*#__PURE__*/React.createElement("b", {
    className: "nm-title",
    style: {
      color: "var(--ink)"
    }
  }, kanaScript === "hiragana" ? "Hiragana" : "Katakana"), " \u2014 pilih tingkat kesulitan:"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 10
    }
  }, ["mudah", "sedang", "susah"].map(function (d) {
    var diffDesc = {
      mudah: "5 soal · 3 pilihan jawaban",
      sedang: "10 soal · 4 pilihan jawaban",
      susah: "15 soal · 5 pilihan jawaban"
    };
    var diffColor = {
      mudah: "matcha",
      sedang: "yuzu",
      susah: "sakura"
    };
    return /*#__PURE__*/React.createElement("div", {
      key: d,
      className: "nm-card nm-card-tap",
      style: {
        cursor: "pointer",
        display: "flex",
        alignItems: "center",
        gap: 12
      },
      onClick: function onClick() {
        return setKanaQuizDifficulty(d);
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        width: 40,
        height: 40,
        borderRadius: 12,
        background: "var(--".concat(diffColor[d], "-tint)"),
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexShrink: 0,
        color: "var(--".concat(diffColor[d], ")"),
        fontWeight: 700,
        fontSize: 13
      }
    }, DIFFICULTY[d].label[0]), /*#__PURE__*/React.createElement("div", {
      style: {
        flex: 1
      }
    }, /*#__PURE__*/React.createElement("p", {
      style: {
        fontSize: 14,
        fontWeight: 700,
        margin: 0
      }
    }, DIFFICULTY[d].label), /*#__PURE__*/React.createElement("p", {
      style: {
        fontSize: 11.5,
        color: "var(--text-secondary)",
        margin: "2px 0 0"
      }
    }, diffDesc[d])), /*#__PURE__*/React.createElement(ChevronRight, {
      size: 16,
      color: "var(--text-secondary)",
      "aria-hidden": "true"
    }));
  }))) : !kanaQuizPracticeLevel ? /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("button", {
    onClick: function onClick() {
      setKanaQuizDifficulty(null);
      setConfirmRepeatKanaLevel(null);
    },
    style: {
      display: "flex",
      alignItems: "center",
      gap: 4,
      background: "none",
      border: "none",
      color: "var(--text-secondary)",
      fontFamily: "'Zen Maru Gothic', sans-serif",
      fontSize: 12.5,
      fontWeight: 700,
      cursor: "pointer",
      padding: 0,
      marginBottom: 12
    }
  }, /*#__PURE__*/React.createElement(ChevronRight, {
    size: 14,
    style: {
      transform: "rotate(180deg)"
    },
    "aria-hidden": "true"
  }), " Ganti kesulitan"), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 13,
      color: "var(--text-secondary)",
      margin: "0 0 12px"
    }
  }, /*#__PURE__*/React.createElement("b", {
    className: "nm-title",
    style: {
      color: "var(--ink)"
    }
  }, kanaScript === "hiragana" ? "Hiragana" : "Katakana", " \xB7 ", DIFFICULTY[kanaQuizDifficulty].label), " \u2014 pilih level latihan:"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "repeat(5, minmax(0,1fr))",
      gap: 8
    }
  }, Array.from({
    length: 10
  }, function (_, i) {
    return i + 1;
  }).map(function (n) {
    var key = kanaLevelKey(kanaScript, kanaQuizDifficulty, n);
    var record = kanaCompletedLevels[key];
    var passed = record && record.passed;
    var prevKey = kanaLevelKey(kanaScript, kanaQuizDifficulty, n - 1);
    var unlocked = n === 1 || kanaCompletedLevels[prevKey] && kanaCompletedLevels[prevKey].passed;
    return /*#__PURE__*/React.createElement("button", {
      key: n,
      onClick: function onClick() {
        if (!unlocked) return;
        record ? setConfirmRepeatKanaLevel(n) : startKanaQuiz(kanaQuizDifficulty, n);
      },
      className: "nm-lvl-btn",
      style: {
        padding: "14px 0",
        fontSize: 16,
        position: "relative",
        background: passed ? "var(--matcha)" : "var(--card-bg)",
        borderColor: passed ? "var(--matcha)" : "var(--line)",
        color: passed ? "#fff" : unlocked ? "var(--ink)" : "var(--text-muted)",
        opacity: unlocked ? 1 : 0.6,
        cursor: unlocked ? "pointer" : "not-allowed"
      }
    }, unlocked ? n : /*#__PURE__*/React.createElement(Lock, {
      size: 14,
      "aria-hidden": "true"
    }), passed && /*#__PURE__*/React.createElement(Check, {
      size: 12,
      style: {
        position: "absolute",
        top: 3,
        right: 3
      },
      "aria-hidden": "true"
    }));
  })), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 11,
      color: "var(--text-secondary)",
      margin: "8px 0 0"
    }
  }, "\uD83D\uDD12 Level berikutnya terbuka setelah lulus level sebelumnya (minimal 70%)."), confirmRepeatKanaLevel !== null && /*#__PURE__*/React.createElement("div", {
    className: "nm-card",
    style: {
      marginTop: 12,
      textAlign: "center"
    }
  }, /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 13.5,
      fontWeight: 700,
      margin: "0 0 12px"
    }
  }, "Ingin mengulangi latihan ini?"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 8,
      justifyContent: "center"
    }
  }, /*#__PURE__*/React.createElement("button", {
    onClick: function onClick() {
      var n = confirmRepeatKanaLevel;
      setConfirmRepeatKanaLevel(null);
      startKanaQuiz(kanaQuizDifficulty, n);
    },
    style: {
      background: "var(--momiji)",
      color: "#fff",
      border: "none",
      borderRadius: 12,
      padding: "8px 20px",
      fontFamily: "'Zen Maru Gothic', sans-serif",
      fontWeight: 700,
      fontSize: 13,
      cursor: "pointer"
    }
  }, "Ya"), /*#__PURE__*/React.createElement("button", {
    onClick: function onClick() {
      return setConfirmRepeatKanaLevel(null);
    },
    style: {
      background: "var(--card-bg)",
      color: "var(--ink)",
      border: "2px solid var(--line)",
      borderRadius: 12,
      padding: "8px 20px",
      fontFamily: "'Zen Maru Gothic', sans-serif",
      fontWeight: 700,
      fontSize: 13,
      cursor: "pointer"
    }
  }, "Tidak")))) : !kanaQuizDone ? function () {
    var q = kanaQuizQuestions[kanaQuizIdx];
    return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("p", {
      style: {
        fontSize: 12,
        color: "var(--text-secondary)",
        margin: "4px 0 8px"
      }
    }, "Soal ", kanaQuizIdx + 1, " dari ", kanaQuizQuestions.length), /*#__PURE__*/React.createElement("p", {
      style: {
        fontSize: 15,
        fontWeight: 700,
        margin: "0 0 10px"
      }
    }, q.q), /*#__PURE__*/React.createElement("div", null, q.choices.map(function (opt, i) {
      var isSel = i === kanaQuizSel;
      var style = isSel ? {
        background: "var(--sora-tint)",
        borderColor: "var(--sora)"
      } : {
        background: "var(--card-bg)",
        borderColor: "var(--line)"
      };
      return /*#__PURE__*/React.createElement("button", {
        key: i,
        onClick: function onClick() {
          return submitKanaAnswer(i);
        },
        className: isSel ? "nm-quiz-option-selected" : "",
        style: {
          display: "block",
          width: "100%",
          textAlign: "left",
          padding: "10px 12px",
          marginBottom: 8,
          borderRadius: 14,
          border: "2px solid ".concat(style.borderColor),
          background: style.background,
          color: "var(--ink)",
          fontFamily: "inherit",
          fontSize: 15,
          cursor: "pointer"
        }
      }, opt);
    })), kanaQuizSel !== null && /*#__PURE__*/React.createElement("button", {
      onClick: nextKanaQuestion,
      style: {
        marginTop: 6,
        display: "inline-flex",
        alignItems: "center",
        gap: 4,
        background: "var(--sora)",
        color: "#fff",
        border: "none",
        borderRadius: 12,
        padding: "9px 16px",
        fontFamily: "'Zen Maru Gothic', sans-serif",
        fontWeight: 700,
        fontSize: 13,
        cursor: "pointer"
      }
    }, kanaQuizIdx + 1 < kanaQuizQuestions.length ? "Soal berikutnya" : "Lihat hasil", " ", /*#__PURE__*/React.createElement(ChevronRight, {
      size: 14,
      "aria-hidden": "true"
    })));
  }() : function () {
    var passed = kanaQuizQuestions.length > 0 && kanaQuizScore / kanaQuizQuestions.length >= 0.7;
    var hasNextKanaLevel = kanaQuizPracticeLevel < 10;
    return /*#__PURE__*/React.createElement("div", {
      style: {
        textAlign: "center",
        padding: "1rem 0"
      }
    }, /*#__PURE__*/React.createElement("p", {
      className: "nm-title",
      style: {
        fontSize: 24,
        margin: "4px 0 6px"
      }
    }, kanaQuizScore, " / ", kanaQuizQuestions.length, " benar"), /*#__PURE__*/React.createElement("p", {
      style: {
        fontSize: 13,
        color: passed ? "var(--matcha)" : "var(--sakura)",
        fontWeight: 700,
        margin: "0 0 14px"
      }
    }, passed ? "✅ Bagus! Sudah cukup hafal." : "Masih ada yang perlu diulang, yuk coba lagi."), /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        gap: 8,
        justifyContent: "center",
        flexWrap: "wrap",
        marginBottom: showKanaPembahasan ? 16 : 0
      }
    }, passed && hasNextKanaLevel && /*#__PURE__*/React.createElement("button", {
      onClick: function onClick() {
        return startKanaQuiz(kanaQuizDifficulty, kanaQuizPracticeLevel + 1);
      },
      style: {
        background: "var(--matcha)",
        color: "#fff",
        border: "none",
        borderRadius: 12,
        padding: "9px 16px",
        fontFamily: "'Zen Maru Gothic', sans-serif",
        fontWeight: 700,
        fontSize: 13,
        cursor: "pointer"
      }
    }, "Lanjut ke Level ", kanaQuizPracticeLevel + 1, " \u2192"), /*#__PURE__*/React.createElement("button", {
      onClick: function onClick() {
        return startKanaQuiz(kanaQuizDifficulty, kanaQuizPracticeLevel);
      },
      style: {
        background: passed ? "var(--card-bg)" : "var(--sora)",
        color: passed ? "var(--ink)" : "#fff",
        border: passed ? "2px solid var(--line)" : "none",
        borderRadius: 12,
        padding: "9px 16px",
        fontFamily: "'Zen Maru Gothic', sans-serif",
        fontWeight: 700,
        fontSize: 13,
        cursor: "pointer"
      }
    }, "Ulangi kuis"), /*#__PURE__*/React.createElement("button", {
      onClick: function onClick() {
        return setShowKanaPembahasan(function (s) {
          return !s;
        });
      },
      style: {
        background: "var(--card-bg)",
        color: "var(--matcha)",
        border: "2px solid var(--matcha)",
        borderRadius: 12,
        padding: "9px 16px",
        fontFamily: "'Zen Maru Gothic', sans-serif",
        fontWeight: 700,
        fontSize: 13,
        cursor: "pointer"
      }
    }, showKanaPembahasan ? "Tutup pembahasan" : "📖 Lihat pembahasan")), showKanaPembahasan && /*#__PURE__*/React.createElement("div", {
      style: {
        textAlign: "left"
      }
    }, kanaQuizAnswers.map(function (a, idx) {
      var isCorrect = a.selected === a.question.correct;
      return /*#__PURE__*/React.createElement("div", {
        key: idx,
        style: {
          borderRadius: 14,
          border: "2px solid ".concat(isCorrect ? "var(--matcha)" : "var(--sakura)"),
          background: isCorrect ? "var(--matcha-tint)" : "var(--sakura-tint)",
          padding: "10px 12px",
          marginBottom: 10
        }
      }, /*#__PURE__*/React.createElement("div", {
        style: {
          display: "flex",
          alignItems: "flex-start",
          gap: 6,
          marginBottom: 6
        }
      }, isCorrect ? /*#__PURE__*/React.createElement(Check, {
        size: 16,
        color: "var(--matcha)",
        "aria-hidden": "true",
        style: {
          flexShrink: 0,
          marginTop: 2
        }
      }) : /*#__PURE__*/React.createElement("span", {
        style: {
          color: "var(--sakura)",
          fontWeight: 700,
          flexShrink: 0
        }
      }, "\u2715"), /*#__PURE__*/React.createElement("p", {
        style: {
          fontSize: 12,
          fontWeight: 700,
          margin: 0,
          color: "var(--text-secondary)"
        }
      }, "Soal ", idx + 1)), /*#__PURE__*/React.createElement("p", {
        style: {
          fontSize: 13.5,
          fontWeight: 700,
          margin: "0 0 6px"
        }
      }, a.question.q), /*#__PURE__*/React.createElement("p", {
        style: {
          fontSize: 12.5,
          margin: "0 0 3px"
        }
      }, "Jawabanmu: ", /*#__PURE__*/React.createElement("b", {
        style: {
          color: isCorrect ? "var(--matcha)" : "var(--sakura)"
        }
      }, a.selected), !isCorrect && /*#__PURE__*/React.createElement(React.Fragment, null, " \xB7 Jawaban benar: ", /*#__PURE__*/React.createElement("b", {
        style: {
          color: "var(--matcha)"
        }
      }, a.question.correct))), /*#__PURE__*/React.createElement("p", {
        style: {
          fontSize: 12,
          color: "var(--text-body)",
          margin: "6px 0 0",
          lineHeight: 1.6
        }
      }, "\uD83D\uDCA1 ", a.question.explain));
    })));
  }())), tab === "aksara" && !kanaQuizActive && /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    className: "nm-card",
    style: {
      display: "flex",
      alignItems: "center",
      gap: 16,
      marginBottom: 12
    }
  }, /*#__PURE__*/React.createElement(Tape, {
    color: "var(--sora)"
  }), /*#__PURE__*/React.createElement(Ring, {
    pct: kanaPct,
    color: "var(--sora)"
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1
    }
  }, /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 14,
      fontWeight: 700,
      margin: "0 0 2px"
    }
  }, "Progres ", kanaScript === "hiragana" ? "Hiragana" : "Katakana"), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 12,
      color: "var(--text-secondary)",
      margin: 0
    }
  }, "Klik tiap huruf yang sudah hafal.")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 4
    }
  }, /*#__PURE__*/React.createElement("button", {
    className: "nm-lvl-btn",
    style: _objectSpread({
      fontSize: 12,
      padding: "6px 10px"
    }, kanaScript === "hiragana" ? {
      background: "var(--sora)",
      color: "#fff",
      borderColor: "var(--sora)"
    } : {}),
    onClick: function onClick() {
      return setKanaScript("hiragana");
    }
  }, "Hiragana"), /*#__PURE__*/React.createElement("button", {
    className: "nm-lvl-btn",
    style: _objectSpread({
      fontSize: 12,
      padding: "6px 10px"
    }, kanaScript === "katakana" ? {
      background: "var(--sora)",
      color: "#fff",
      borderColor: "var(--sora)"
    } : {}),
    onClick: function onClick() {
      return setKanaScript("katakana");
    }
  }, "Katakana"))), /*#__PURE__*/React.createElement("div", {
    className: "nm-card",
    style: {
      marginBottom: 12,
      fontSize: 12,
      color: "var(--text-body)",
      lineHeight: 1.5
    }
  }, /*#__PURE__*/React.createElement(Tape, {
    color: "var(--sora)"
  }), "\u270D\uFE0F Ketuk hurufnya untuk memperbesar tampilannya & dengar cara bacanya."), /*#__PURE__*/React.createElement("div", {
    className: "nm-card",
    style: {
      marginBottom: 12
    }
  }, /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 13,
      fontWeight: 700,
      margin: "0 0 4px"
    }
  }, "Goj\u016Bon (dasar)"), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 11.5,
      color: "var(--text-secondary)",
      margin: "0 0 10px"
    }
  }, "46 huruf inti \u2014 a, i, u, e, o, ka, sa, ta, ..."), /*#__PURE__*/React.createElement("div", {
    className: "nm-d-g5",
    style: {
      display: "grid",
      gridTemplateColumns: "repeat(3, minmax(0,1fr))",
      gap: 10
    }
  }, kanaFlat.map(function (r, ci) {
    return /*#__PURE__*/React.createElement(KanaTile, {
      key: ci,
      tileKey: "".concat(kanaScript, ":").concat(r),
      "char": kanaTable[r],
      romaji: r,
      onOpen: function onOpen() {
        return openFlash({
          kind: "kana",
          list: kanaFlat.map(function (x) {
            return {
              key: "".concat(kanaScript, ":").concat(x),
              "char": kanaTable[x],
              romaji: x
            };
          }),
          index: ci
        });
      }
    });
  }))), KANA_GROUPS.map(function (group) {
    return /*#__PURE__*/React.createElement("div", {
      key: group.id,
      className: "nm-card",
      style: {
        marginBottom: 12
      }
    }, /*#__PURE__*/React.createElement("p", {
      style: {
        fontSize: 13,
        fontWeight: 700,
        margin: "0 0 4px"
      }
    }, group.title), /*#__PURE__*/React.createElement("p", {
      style: {
        fontSize: 11.5,
        color: "var(--text-secondary)",
        margin: "0 0 10px"
      }
    }, group.desc), /*#__PURE__*/React.createElement("div", {
      className: "nm-d-kana-".concat(group.id),
      style: {
        display: "grid",
        gridTemplateColumns: "repeat(3, minmax(0,1fr))",
        gap: 10
      }
    }, group.entries.map(function (e, i) {
      return /*#__PURE__*/React.createElement(KanaTile, {
        key: i,
        tileKey: "".concat(kanaScript, ":").concat(group.id, ":").concat(i),
        "char": kanaScript === "hiragana" ? e.h : e.k,
        romaji: e.r,
        onOpen: function onOpen() {
          return openFlash({
            kind: "kana",
            list: group.entries.map(function (x, j) {
              return {
                key: "".concat(kanaScript, ":").concat(group.id, ":").concat(j),
                "char": kanaScript === "hiragana" ? x.h : x.k,
                romaji: x.r
              };
            }),
            index: i
          });
        }
      });
    })));
  }))), tab === "tracker" && !kanaQuizActive && /*#__PURE__*/React.createElement("div", null, trackerStep === "level" && /*#__PURE__*/React.createElement("div", {
    className: "nm-d-c2",
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 14
    }
  }, LEVELS.map(function (l, i) {
    var colors = ["sakura", "sora", "matcha", "momiji"];
    var col = colors[i];
    var pct = levelProgressPct(l);
    var watermarks = ["学", "話", "語", "究"];
    return /*#__PURE__*/React.createElement("div", {
      key: l.id,
      className: "nm-lvlcard",
      onClick: function onClick() {
        return selectLevel(l.id);
      },
      style: {
        "--lc": "var(--".concat(col, ")"),
        position: "relative",
        cursor: "pointer",
        overflow: "hidden",
        borderRadius: 20,
        padding: "1.5rem 1.35rem",
        background: "var(--".concat(col, ")"),
        boxShadow: "0 6px 0 rgba(0,0,0,0.14)",
        color: "#fff"
      }
    }, /*#__PURE__*/React.createElement("svg", {
      width: "200",
      height: "200",
      viewBox: "0 0 200 200",
      "aria-hidden": "true",
      style: {
        position: "absolute",
        right: -50,
        bottom: -50,
        pointerEvents: "none"
      }
    }, Array.from({
      length: 16
    }).map(function (_, ri) {
      return /*#__PURE__*/React.createElement("rect", {
        key: ri,
        x: "98",
        y: "0",
        width: "4",
        height: "100",
        fill: "#fff",
        opacity: "0.1",
        transform: "rotate(".concat(ri * 22.5, " 100 100)")
      });
    }), /*#__PURE__*/React.createElement("circle", {
      cx: "100",
      cy: "100",
      r: "46",
      fill: "#fff",
      opacity: "0.14"
    })), /*#__PURE__*/React.createElement("span", {
      "aria-hidden": "true",
      className: "nm-lvlmark",
      style: {
        position: "absolute",
        right: 6,
        bottom: -14,
        fontSize: 100,
        fontWeight: 700,
        fontFamily: "'Shippori Mincho', serif",
        color: "rgba(255,255,255,0.22)",
        lineHeight: 1,
        userSelect: "none",
        pointerEvents: "none"
      }
    }, watermarks[i]), /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "flex-start"
      }
    }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
      style: {
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        width: 26,
        height: 26,
        borderRadius: "50%",
        border: "2px solid rgba(255,255,255,0.6)",
        fontSize: 12,
        fontWeight: 700,
        marginBottom: 8
      }
    }, i + 1), /*#__PURE__*/React.createElement("p", {
      className: "nm-title",
      style: {
        fontSize: 32,
        margin: "0 0 2px",
        color: "#fff",
        letterSpacing: "0.01em"
      }
    }, l.label), /*#__PURE__*/React.createElement("p", {
      style: {
        fontSize: 13,
        fontWeight: 700,
        margin: "0 0 10px",
        opacity: 0.92,
        textTransform: "uppercase",
        letterSpacing: "0.04em"
      }
    }, l.name)), pct > 0 && /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        flexShrink: 0
      }
    }, /*#__PURE__*/React.createElement(Ring, {
      pct: pct,
      size: 44,
      color: "#fff"
    }))), /*#__PURE__*/React.createElement("div", {
      style: {
        width: 32,
        height: 3,
        background: "rgba(255,255,255,0.5)",
        borderRadius: 2,
        margin: "2px 0 12px"
      }
    }), /*#__PURE__*/React.createElement("p", {
      style: {
        fontSize: 12.5,
        fontStyle: "italic",
        margin: "0 0 16px",
        opacity: 0.92,
        maxWidth: "80%",
        lineHeight: 1.5
      }
    }, "\"", l.tagline, "\""), /*#__PURE__*/React.createElement("span", {
      className: "nm-lvlpill",
      style: {
        display: "inline-flex",
        alignItems: "center",
        gap: 6,
        fontSize: 12.5,
        fontWeight: 700,
        color: "var(--".concat(col, ")"),
        background: "#fff",
        padding: "8px 16px",
        borderRadius: 999
      }
    }, "Mulai belajar ", /*#__PURE__*/React.createElement(ChevronRight, {
      size: 14,
      "aria-hidden": "true"
    })));
  })), trackerStep === "category" && /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("button", {
    onClick: function onClick() {
      return setTrackerStep("level");
    },
    style: {
      display: "flex",
      alignItems: "center",
      gap: 4,
      background: "none",
      border: "none",
      color: "var(--text-secondary)",
      fontFamily: "'Zen Maru Gothic', sans-serif",
      fontSize: 12.5,
      fontWeight: 700,
      cursor: "pointer",
      padding: 0,
      marginBottom: 12
    }
  }, /*#__PURE__*/React.createElement(ChevronRight, {
    size: 14,
    style: {
      transform: "rotate(180deg)"
    },
    "aria-hidden": "true"
  }), " Ganti level"), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 13,
      color: "var(--text-secondary)",
      margin: "0 0 12px"
    }
  }, "Level ", /*#__PURE__*/React.createElement("b", {
    className: "nm-title",
    style: {
      color: "var(--ink)"
    }
  }, level.label, ": ", level.name), " \u2014 pilih materi yang mau dipelajari:"), /*#__PURE__*/React.createElement("div", {
    className: "nm-d-c2",
    style: {
      display: "grid",
      gridTemplateColumns: "1fr",
      gap: 12
    }
  }, ["kanji", "vocab", "grammar"].concat(_toConsumableArray(level.reading && level.reading.length > 0 ? ["reading"] : [])).map(function (cat) {
    var label = cat === "vocab" ? "Kosakata" : cat === "grammar" ? "Grammar" : cat === "reading" ? "Reading" : "Kanji";
    var desc = cat === "vocab" ? "kosakata bertema, arti & cara baca" : cat === "grammar" ? "pola kalimat & contoh penggunaan" : cat === "reading" ? "cerita pendek & latihan pemahaman" : "cara baca on'yomi, kun'yomi & arti";
    var _catCount2 = catCount(cat),
      done = _catCount2.done,
      total = _catCount2.total;
    var pct = catPct(cat);
    return /*#__PURE__*/React.createElement("div", {
      key: cat,
      className: "nm-card nm-card-tap",
      style: {
        cursor: "pointer",
        display: "flex",
        alignItems: "center",
        gap: 14
      },
      onClick: function onClick() {
        return selectCat(cat);
      }
    }, /*#__PURE__*/React.createElement(Ring, {
      pct: pct,
      color: "var(--matcha)",
      size: 48
    }), /*#__PURE__*/React.createElement("div", {
      style: {
        flex: 1
      }
    }, /*#__PURE__*/React.createElement("p", {
      style: {
        fontSize: 14,
        fontWeight: 700,
        margin: "0 0 2px"
      }
    }, label), /*#__PURE__*/React.createElement("p", {
      style: {
        fontSize: 12,
        color: "var(--text-secondary)",
        margin: 0
      }
    }, desc, " \xB7 ", done, "/", total, " ", cat === "reading" ? "dibaca" : "dikuasai")), /*#__PURE__*/React.createElement(ChevronRight, {
      size: 16,
      color: "var(--text-secondary)",
      "aria-hidden": "true"
    }));
  })), overallPct === 100 && /*#__PURE__*/React.createElement("div", {
    className: "nm-card",
    style: {
      marginTop: 12,
      background: "var(--matcha-tint)",
      borderColor: "var(--matcha)",
      fontSize: 12.5,
      color: "var(--ink)"
    }
  }, "\uD83C\uDF89 Level ", level.label, " sudah 100% ditandai tuntas!")), trackerStep === "content" && function () {
    var cat = activeCat;
    var _catCount3 = catCount(cat),
      done = _catCount3.done,
      total = _catCount3.total;
    var pct = catPct(cat);
    var label = cat === "vocab" ? "Kosakata" : cat === "grammar" ? "Grammar" : cat === "reading" ? "Reading" : "Kanji";
    var filteredItems = contentView.filteredItems,
      isPaged = contentView.isPaged,
      totalPages = contentView.totalPages;
    var safePage = Math.min(kanjiPage, totalPages - 1);
    var pageItems = isPaged ? filteredItems.slice(safePage * KANJI_PAGE_SIZE, (safePage + 1) * KANJI_PAGE_SIZE) : filteredItems;
    return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("button", {
      onClick: function onClick() {
        return setTrackerStep("category");
      },
      style: {
        display: "flex",
        alignItems: "center",
        gap: 4,
        background: "none",
        border: "none",
        color: "var(--text-secondary)",
        fontFamily: "'Zen Maru Gothic', sans-serif",
        fontSize: 12.5,
        fontWeight: 700,
        cursor: "pointer",
        padding: 0,
        marginBottom: 12
      }
    }, /*#__PURE__*/React.createElement(ChevronRight, {
      size: 14,
      style: {
        transform: "rotate(180deg)"
      },
      "aria-hidden": "true"
    }), " ", level.label, " \xB7 ", label), cat === "reading" ? /*#__PURE__*/React.createElement("div", {
      className: "nm-card"
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "baseline",
        marginBottom: 4
      }
    }, /*#__PURE__*/React.createElement("p", {
      style: {
        fontSize: 13,
        fontWeight: 700,
        margin: 0
      }
    }, label), /*#__PURE__*/React.createElement("p", {
      style: {
        fontSize: 12,
        color: "var(--matcha)",
        margin: 0,
        fontWeight: 700
      }
    }, done, "/", total, " \xB7 ", Math.round(pct), "%")), /*#__PURE__*/React.createElement("div", {
      style: {
        height: 6,
        borderRadius: 4,
        background: "var(--line)",
        overflow: "hidden",
        marginBottom: 10
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        height: "100%",
        width: "".concat(pct, "%"),
        background: "var(--matcha)",
        borderRadius: 4,
        transition: "width 0.2s ease"
      }
    })), /*#__PURE__*/React.createElement("p", {
      style: {
        fontSize: 12,
        color: "var(--text-secondary)",
        margin: "0 0 10px"
      }
    }, "\uD83D\uDCD6 Ketuk judul cerita untuk membaca teks lengkapnya. Setelah selesai, ketuk lagi untuk lihat penjelasan (ringkasan, kosakata penting & catatan tata bahasa)."), filteredItems.map(function (item, idx) {
      var key = "".concat(cat, ":").concat(item);
      var on = !!checked[key];
      var isOpen = !!expanded[key];
      var r = READING_CONTENT[item];
      return /*#__PURE__*/React.createElement("div", {
        key: item,
        style: {
          borderBottom: idx < filteredItems.length - 1 ? "1.5px dashed var(--line)" : "none",
          padding: "10px 0"
        }
      }, /*#__PURE__*/React.createElement("div", {
        style: {
          display: "flex",
          alignItems: "center",
          gap: 8
        }
      }, /*#__PURE__*/React.createElement("span", {
        onClick: function onClick() {
          return toggleExpand(cat, item);
        },
        style: {
          display: "flex",
          alignItems: "center",
          gap: 6,
          flex: 1,
          cursor: "pointer"
        }
      }, /*#__PURE__*/React.createElement(ChevronRight, {
        size: 14,
        color: "var(--text-secondary)",
        "aria-hidden": "true",
        style: {
          transform: isOpen ? "rotate(90deg)" : "none",
          transition: "transform 0.15s ease",
          flexShrink: 0
        }
      }), /*#__PURE__*/React.createElement("span", {
        className: "nm-title",
        style: {
          fontSize: 14,
          color: on ? "var(--ink)" : "var(--text-body)"
        }
      }, idx + 1, ". ", item)), /*#__PURE__*/React.createElement("span", {
        onClick: function onClick() {
          return toggle(cat, item);
        },
        style: {
          display: "flex",
          alignItems: "center",
          gap: 5,
          cursor: "pointer"
        }
      }, on ? /*#__PURE__*/React.createElement(Check, {
        size: 16,
        color: "var(--matcha)",
        "aria-hidden": "true"
      }) : /*#__PURE__*/React.createElement(Circle, {
        size: 16,
        color: "var(--text-muted)",
        "aria-hidden": "true"
      }), /*#__PURE__*/React.createElement("span", {
        style: {
          fontSize: 10.5,
          fontWeight: 700,
          padding: "2px 7px",
          borderRadius: 999,
          background: on ? "var(--matcha-tint)" : "var(--line)",
          color: on ? "var(--matcha)" : "var(--text-secondary)"
        }
      }, on ? "Sudah dibaca" : "Belum"))), isOpen && r && /*#__PURE__*/React.createElement("div", {
        style: {
          marginTop: 10
        }
      }, /*#__PURE__*/React.createElement("div", {
        style: {
          background: "var(--matcha-tint)",
          borderRadius: 12,
          padding: "12px 14px",
          marginBottom: 10
        }
      }, r.text.map(function (line, i) {
        return /*#__PURE__*/React.createElement("p", {
          key: i,
          style: {
            margin: "0 0 6px",
            fontSize: 14,
            lineHeight: 1.9
          }
        }, line);
      }), /*#__PURE__*/React.createElement("div", {
        style: {
          marginTop: 6
        }
      }, /*#__PURE__*/React.createElement(SpeakBtn, {
        text: r.text.join(""),
        size: 13
      }))), /*#__PURE__*/React.createElement("div", {
        style: {
          background: "var(--card-bg)",
          border: "2px solid var(--line)",
          borderRadius: 12,
          padding: "12px 14px"
        }
      }, /*#__PURE__*/React.createElement("p", {
        style: {
          margin: "0 0 8px",
          fontWeight: 700,
          fontSize: 13
        }
      }, "\uD83D\uDCDD Penjelasan"), /*#__PURE__*/React.createElement("p", {
        style: {
          margin: "0 0 10px",
          fontSize: 12.5,
          color: "var(--text-body)"
        }
      }, r.ringkasan), /*#__PURE__*/React.createElement("p", {
        style: {
          margin: "0 0 6px",
          fontWeight: 700,
          fontSize: 12.5
        }
      }, "Kosakata penting:"), r.kosakata.map(function (w, i) {
        return /*#__PURE__*/React.createElement("div", {
          key: i,
          style: {
            display: "flex",
            alignItems: "center",
            gap: 8,
            fontSize: 12,
            padding: "3px 0"
          }
        }, /*#__PURE__*/React.createElement(SpeakBtn, {
          text: w.jp,
          size: 12
        }), /*#__PURE__*/React.createElement("span", null, /*#__PURE__*/React.createElement("span", {
          className: "nm-title",
          style: {
            fontSize: 13
          }
        }, w.jp), " ", /*#__PURE__*/React.createElement("span", {
          style: {
            color: "var(--text-secondary)"
          }
        }, "(", w.reading, ")"), " \u2014 ", w.arti));
      }), /*#__PURE__*/React.createElement("p", {
        style: {
          margin: "10px 0 6px",
          fontWeight: 700,
          fontSize: 12.5
        }
      }, "Catatan tata bahasa:"), r.tata_bahasa.map(function (g, i) {
        return /*#__PURE__*/React.createElement("div", {
          key: i,
          style: {
            marginBottom: 6
          }
        }, /*#__PURE__*/React.createElement("p", {
          style: {
            margin: "0 0 2px",
            fontSize: 12.5,
            fontWeight: 700,
            color: "var(--matcha)"
          }
        }, g.pola), /*#__PURE__*/React.createElement("p", {
          style: {
            margin: 0,
            fontSize: 12,
            color: "var(--text-body)"
          }
        }, g.penjelasan));
      }), /*#__PURE__*/React.createElement("p", {
        style: {
          fontSize: 9.5,
          color: "var(--text-secondary)",
          margin: "8px 0 0"
        }
      }, "ketuk judul lagi untuk tutup"))));
    })) : /*#__PURE__*/React.createElement(React.Fragment, null, cat === "vocab" && /*#__PURE__*/React.createElement("div", {
      className: "nm-card",
      style: {
        marginBottom: 12
      }
    }, /*#__PURE__*/React.createElement(Tape, {
      color: "var(--matcha)"
    }), /*#__PURE__*/React.createElement("input", {
      type: "text",
      value: search,
      onChange: function onChange(e) {
        setSearch(e.target.value);
        setKanjiPage(0);
      },
      placeholder: "\uD83D\uDD0D Cari di ".concat(label.toLowerCase(), "..."),
      style: {
        width: "100%",
        border: "2px solid var(--line)",
        borderRadius: 12,
        padding: "9px 12px",
        fontFamily: "'Zen Maru Gothic', sans-serif",
        fontSize: 13.5,
        color: "var(--ink)",
        outline: "none",
        boxSizing: "border-box"
      }
    })), /*#__PURE__*/React.createElement("div", {
      className: "nm-card",
      style: {
        marginBottom: 12,
        fontSize: 12,
        color: "var(--text-body)",
        lineHeight: 1.5
      }
    }, "\uD83D\uDCA1 Klik teks item untuk buka pembahasan lengkapnya. Klik ikon centang di kanan untuk tandai sudah dikuasai."), cat === "kanji" && levelId !== "n5" && levelId !== "n2n1" && /*#__PURE__*/React.createElement("div", {
      className: "nm-card",
      style: {
        marginBottom: 12,
        fontSize: 12,
        color: "var(--text-body)",
        lineHeight: 1.6
      }
    }, /*#__PURE__*/React.createElement(Tape, {
      color: "var(--matcha)"
    }), "\uD83D\uDD01 Kanji di sini sudah ", /*#__PURE__*/React.createElement("b", null, "digabung dengan kanji dari level sebelumnya"), " \u2014 jadi kamu otomatis mengulang yang lama sambil belajar yang baru, biar makin cepat hafal."), cat === "vocab" && levelId !== "n5" && levelId !== "n2n1" && /*#__PURE__*/React.createElement("div", {
      className: "nm-card",
      style: {
        marginBottom: 12,
        fontSize: 12,
        color: "var(--text-body)",
        lineHeight: 1.6
      }
    }, /*#__PURE__*/React.createElement(Tape, {
      color: "var(--matcha)"
    }), "\uD83D\uDD01 Kosakata di sini sudah ", /*#__PURE__*/React.createElement("b", null, "digabung dengan kosakata dari level sebelumnya"), " \u2014 jadi kamu otomatis mengulang yang lama sambil belajar yang baru, biar makin cepat hafal."), cat === "grammar" && /*#__PURE__*/React.createElement("div", {
      className: "nm-card",
      style: {
        marginBottom: 12
      }
    }, /*#__PURE__*/React.createElement(Tape, {
      color: "var(--momiji)"
    }), /*#__PURE__*/React.createElement("p", {
      onClick: function onClick() {
        return setShowParticles(function (s) {
          return !s;
        });
      },
      style: {
        display: "flex",
        alignItems: "center",
        gap: 6,
        fontSize: 13.5,
        fontWeight: 700,
        margin: 0,
        cursor: "pointer"
      }
    }, /*#__PURE__*/React.createElement(ChevronRight, {
      size: 14,
      color: "var(--text-secondary)",
      "aria-hidden": "true",
      style: {
        transform: showParticles ? "rotate(90deg)" : "none",
        transition: "transform 0.15s ease"
      }
    }), "\uD83D\uDCCC Referensi tanda partikel (", PARTICLES.filter(function (pt) {
      return pt.level === levelId;
    }).slice(0, 5).map(function (pt) {
      return pt.p;
    }).join("・"), " dll)"), showParticles && function () {
      var visibleParticles = PARTICLES.filter(function (pt) {
        return pt.level === levelId;
      });
      return /*#__PURE__*/React.createElement("div", {
        style: {
          marginTop: 10
        }
      }, /*#__PURE__*/React.createElement("p", {
        style: {
          fontSize: 12,
          color: "var(--text-secondary)",
          margin: "0 0 10px"
        }
      }, "Partikel adalah huruf kecil setelah kata yang menentukan perannya dalam kalimat (subjek, objek, arah, dll). Ini partikel level ", /*#__PURE__*/React.createElement("b", null, level.label), ":"), visibleParticles.map(function (pt, i) {
        return /*#__PURE__*/React.createElement("div", {
          key: i,
          style: {
            borderBottom: i < visibleParticles.length - 1 ? "1.5px dashed var(--line)" : "none",
            padding: "8px 0"
          }
        }, /*#__PURE__*/React.createElement("p", {
          style: {
            margin: "0 0 3px"
          }
        }, /*#__PURE__*/React.createElement("span", {
          className: "nm-title",
          style: {
            fontSize: 16,
            color: "var(--momiji)"
          }
        }, pt.p), " ", /*#__PURE__*/React.createElement("span", {
          style: {
            fontWeight: 700,
            fontSize: 12.5
          }
        }, "\u2014 ", pt.nama)), /*#__PURE__*/React.createElement("p", {
          style: {
            margin: "0 0 3px",
            fontSize: 12.5,
            color: "var(--text-body)"
          }
        }, pt.penjelasan), /*#__PURE__*/React.createElement("p", {
          style: {
            margin: 0,
            fontSize: 12,
            color: "var(--text-secondary)",
            fontStyle: "italic"
          }
        }, pt.contoh));
      }));
    }()), /*#__PURE__*/React.createElement("div", {
      className: "nm-card"
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "baseline",
        marginBottom: 4
      }
    }, /*#__PURE__*/React.createElement("p", {
      style: {
        fontSize: 13,
        fontWeight: 700,
        margin: 0
      }
    }, label), /*#__PURE__*/React.createElement("p", {
      style: {
        fontSize: 12,
        color: "var(--matcha)",
        margin: 0,
        fontWeight: 700
      }
    }, done, "/", total, " \xB7 ", Math.round(pct), "%")), /*#__PURE__*/React.createElement("div", {
      style: {
        height: 6,
        borderRadius: 4,
        background: "var(--line)",
        overflow: "hidden",
        marginBottom: 8
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        height: "100%",
        width: "".concat(pct, "%"),
        background: "var(--matcha)",
        borderRadius: 4,
        transition: "width 0.2s ease"
      }
    })), pageItems.length === 0 && /*#__PURE__*/React.createElement("p", {
      style: {
        fontSize: 12.5,
        color: "var(--text-secondary)",
        padding: "8px 0"
      }
    }, "Tidak ada hasil untuk \"", search, "\"."), cat === "kanji" ? /*#__PURE__*/React.createElement("div", {
      className: "nm-d-g6",
      style: {
        display: "grid",
        gridTemplateColumns: "repeat(3, minmax(0,1fr))",
        gap: 10
      }
    }, pageItems.map(function (item) {
      var key = "".concat(cat, ":").concat(item);
      var on = !!checked[key];
      var isOpen = !!expanded[key];
      var k = KANJI_CONTENT[item];
      return /*#__PURE__*/React.createElement("div", {
        key: item,
        onClick: function onClick() {
          return openFlash({
            kind: "kanji",
            cat: cat,
            list: filteredItems,
            index: Math.max(0, filteredItems.indexOf(item))
          });
        },
        style: {
          position: "relative",
          background: on ? "var(--matcha-tint)" : "var(--card-bg)",
          border: "2px solid ".concat(on ? "var(--matcha)" : "var(--line)"),
          borderRadius: 16,
          padding: "10px 8px",
          cursor: "pointer",
          minHeight: isOpen ? "auto" : 92,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          gap: 4
        }
      }, /*#__PURE__*/React.createElement("span", {
        onClick: function onClick(e) {
          e.stopPropagation();
          toggle(cat, item);
        },
        style: {
          position: "absolute",
          top: 6,
          right: 6,
          cursor: "pointer"
        }
      }, on ? /*#__PURE__*/React.createElement(Check, {
        size: 15,
        color: "var(--matcha)",
        "aria-hidden": "true"
      }) : /*#__PURE__*/React.createElement(Circle, {
        size: 15,
        color: "var(--text-muted)",
        "aria-hidden": "true"
      })), !isOpen ? /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("span", {
        className: "nm-title",
        style: {
          fontSize: 34
        }
      }, item), /*#__PURE__*/React.createElement("span", {
        style: {
          fontSize: 10,
          color: "var(--text-secondary)"
        }
      }, "ketuk untuk lihat")) : /*#__PURE__*/React.createElement("div", {
        style: {
          width: "100%",
          textAlign: "left"
        }
      }, /*#__PURE__*/React.createElement("div", {
        style: {
          display: "flex",
          justifyContent: "center",
          marginBottom: 4
        }
      }, /*#__PURE__*/React.createElement(StrokeSvg, {
        "char": item,
        folder: "svgsJa",
        size: 100
      })), /*#__PURE__*/React.createElement("div", {
        style: {
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 8,
          marginBottom: 6
        }
      }, /*#__PURE__*/React.createElement("span", {
        className: "nm-title",
        style: {
          fontSize: 30
        }
      }, item), /*#__PURE__*/React.createElement(SpeakBtn, {
        text: item,
        size: 14
      })), /*#__PURE__*/React.createElement("p", {
        style: {
          fontSize: 11,
          margin: "0 0 3px"
        }
      }, /*#__PURE__*/React.createElement("b", null, "On:"), " ", k.on), /*#__PURE__*/React.createElement("p", {
        style: {
          fontSize: 11,
          margin: "0 0 3px"
        }
      }, /*#__PURE__*/React.createElement("b", null, "Kun:"), " ", k.kun), /*#__PURE__*/React.createElement("p", {
        style: {
          fontSize: 11,
          margin: "0 0 6px",
          color: "var(--text-body)"
        }
      }, "Arti: ", /*#__PURE__*/React.createElement("b", {
        style: {
          color: "var(--ink)"
        }
      }, k.arti)), k.kombinasi && k.kombinasi.length > 0 && k.kombinasi.map(function (c, i) {
        return /*#__PURE__*/React.createElement("div", {
          key: i,
          style: {
            display: "flex",
            alignItems: "center",
            gap: 5,
            marginBottom: 3
          }
        }, /*#__PURE__*/React.createElement(SpeakBtn, {
          text: c.word,
          size: 11
        }), /*#__PURE__*/React.createElement("span", {
          style: {
            fontSize: 10.5
          }
        }, /*#__PURE__*/React.createElement("span", {
          className: "nm-title",
          style: {
            fontSize: 12
          }
        }, c.word), " (", c.reading, ") = ", c.arti));
      }), /*#__PURE__*/React.createElement("p", {
        style: {
          fontSize: 9.5,
          color: "var(--text-secondary)",
          margin: "6px 0 0",
          textAlign: "center"
        }
      }, "ketuk lagi untuk tutup")));
    })) : /*#__PURE__*/React.createElement(React.Fragment, null, pageItems.map(function (item) {
      var key = "".concat(cat, ":").concat(item);
      var on = !!checked[key];
      var hasContent = cat === "grammar" ? !!GRAMMAR_CONTENT[item] : cat === "vocab" ? !!VOCAB_CONTENT[item] : cat === "kanji" ? !!KANJI_CONTENT[item] : false;
      var isOpen = !!expanded[key];
      var g = cat === "grammar" ? GRAMMAR_CONTENT[item] : null;
      var v = cat === "vocab" ? VOCAB_CONTENT[item] : null;
      var k = cat === "kanji" ? KANJI_CONTENT[item] : null;
      return /*#__PURE__*/React.createElement("div", {
        key: item,
        style: {
          borderBottom: "1.5px dashed var(--line)"
        }
      }, /*#__PURE__*/React.createElement("div", {
        className: "nm-item",
        style: {
          borderBottom: "none"
        }
      }, hasContent ? /*#__PURE__*/React.createElement("span", {
        onClick: function onClick() {
          return toggleExpand(cat, item);
        },
        style: {
          display: "flex",
          alignItems: "center",
          gap: 6,
          flex: 1,
          cursor: "pointer"
        }
      }, /*#__PURE__*/React.createElement(ChevronRight, {
        size: 14,
        color: "var(--text-secondary)",
        "aria-hidden": "true",
        style: {
          transform: isOpen ? "rotate(90deg)" : "none",
          transition: "transform 0.15s ease",
          flexShrink: 0
        }
      }), /*#__PURE__*/React.createElement("span", {
        style: {
          color: on ? "var(--ink)" : "var(--text-secondary)"
        }
      }, item)) : /*#__PURE__*/React.createElement("span", {
        style: {
          flex: 1,
          color: on ? "var(--ink)" : "var(--text-secondary)"
        }
      }, item), cat === "kanji" && /*#__PURE__*/React.createElement(SpeakBtn, {
        text: item,
        size: 13
      }), /*#__PURE__*/React.createElement("span", {
        onClick: function onClick() {
          return toggle(cat, item);
        },
        style: {
          display: "flex",
          alignItems: "center",
          gap: 5,
          cursor: "pointer"
        }
      }, on ? /*#__PURE__*/React.createElement(Check, {
        size: 16,
        color: "var(--matcha)",
        "aria-hidden": "true"
      }) : /*#__PURE__*/React.createElement(Circle, {
        size: 16,
        color: "var(--text-muted)",
        "aria-hidden": "true"
      }), /*#__PURE__*/React.createElement("span", {
        style: {
          fontSize: 10.5,
          fontWeight: 700,
          padding: "2px 7px",
          borderRadius: 999,
          background: on ? "var(--matcha-tint)" : "var(--line)",
          color: on ? "var(--matcha)" : "var(--text-secondary)"
        }
      }, on ? "Sudah" : "Belum"))), isOpen && g && /*#__PURE__*/React.createElement("div", {
        style: {
          background: "var(--matcha-tint)",
          borderRadius: 12,
          padding: "10px 12px",
          margin: "0 0 10px",
          fontSize: 12.5
        }
      }, /*#__PURE__*/React.createElement("p", {
        style: {
          margin: "0 0 6px",
          fontWeight: 700
        }
      }, g.arti), /*#__PURE__*/React.createElement("p", {
        style: {
          margin: "0 0 8px",
          color: "var(--text-body)"
        }
      }, g.penjelasan), g.contoh.map(function (c, i) {
        return /*#__PURE__*/React.createElement("div", {
          key: i,
          style: {
            display: "flex",
            alignItems: "flex-start",
            gap: 8,
            marginBottom: 6
          }
        }, /*#__PURE__*/React.createElement(SpeakBtn, {
          text: c.jp
        }), /*#__PURE__*/React.createElement("p", {
          style: {
            margin: 0
          }
        }, /*#__PURE__*/React.createElement("span", {
          className: "nm-title",
          style: {
            fontSize: 13.5
          }
        }, c.jp), /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("span", {
          style: {
            fontStyle: "italic",
            color: "var(--text-body)"
          }
        }, c.romaji), " \u2014 ", c.id));
      })), isOpen && v && /*#__PURE__*/React.createElement("div", {
        style: {
          background: "var(--matcha-tint)",
          borderRadius: 12,
          padding: "10px 12px",
          margin: "0 0 10px"
        }
      }, /*#__PURE__*/React.createElement(VocabFlashcards, {
        words: v
      })), isOpen && k && /*#__PURE__*/React.createElement("div", {
        style: {
          background: "var(--matcha-tint)",
          borderRadius: 12,
          padding: "10px 12px",
          margin: "0 0 10px",
          fontSize: 12.5
        }
      }, /*#__PURE__*/React.createElement("div", {
        style: {
          display: "flex",
          justifyContent: "center",
          marginBottom: 8
        }
      }, /*#__PURE__*/React.createElement(StrokeSvg, {
        "char": item,
        folder: "svgsJa",
        size: 100
      })), /*#__PURE__*/React.createElement("div", {
        style: {
          display: "flex",
          gap: 16,
          marginBottom: 8,
          alignItems: "center"
        }
      }, /*#__PURE__*/React.createElement("span", null, /*#__PURE__*/React.createElement("b", null, "On:"), " ", k.on), /*#__PURE__*/React.createElement("span", null, /*#__PURE__*/React.createElement("b", null, "Kun:"), " ", k.kun)), /*#__PURE__*/React.createElement("p", {
        style: {
          margin: "0 0 8px",
          color: "var(--text-body)"
        }
      }, "Arti dasar huruf ini: ", /*#__PURE__*/React.createElement("b", {
        style: {
          color: "var(--ink)"
        }
      }, k.arti)), k.kombinasi && k.kombinasi.length > 0 && /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("p", {
        style: {
          margin: "0 0 6px",
          fontWeight: 700
        }
      }, "Contoh kata gabungan:"), k.kombinasi.map(function (c, i) {
        return /*#__PURE__*/React.createElement("div", {
          key: i,
          style: {
            display: "flex",
            alignItems: "flex-start",
            gap: 8,
            marginBottom: 6
          }
        }, /*#__PURE__*/React.createElement(SpeakBtn, {
          text: c.word,
          size: 13
        }), /*#__PURE__*/React.createElement("p", {
          style: {
            margin: 0,
            lineHeight: 1.5
          }
        }, /*#__PURE__*/React.createElement("span", {
          className: "nm-title",
          style: {
            fontSize: 14
          }
        }, c.word), " ", /*#__PURE__*/React.createElement("span", {
          style: {
            color: "var(--text-secondary)"
          }
        }, "(", c.reading, ")"), " = ", /*#__PURE__*/React.createElement("b", null, c.arti), /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("span", {
          style: {
            fontSize: 11.5,
            color: "var(--text-secondary)"
          }
        }, "\u21B3 tersusun dari ", c.word.split("").map(function (ch, j) {
          return /*#__PURE__*/React.createElement("span", {
            key: j
          }, ch, j < c.word.length - 1 ? " + " : "");
        }), " \u2014 huruf ", /*#__PURE__*/React.createElement("b", null, item), " di sini ikut membentuk arti \"", c.arti, "\".")));
      }))));
    })), isPaged && totalPages > 1 && /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginTop: 10,
        paddingTop: 10,
        borderTop: "1.5px dashed var(--line)"
      }
    }, /*#__PURE__*/React.createElement("button", {
      onClick: function onClick() {
        return setKanjiPage(function (p) {
          return Math.max(0, p - 1);
        });
      },
      disabled: safePage === 0,
      style: {
        background: safePage === 0 ? "var(--line)" : "var(--matcha)",
        color: "#fff",
        border: "none",
        borderRadius: 10,
        padding: "6px 12px",
        fontFamily: "'Zen Maru Gothic', sans-serif",
        fontWeight: 700,
        fontSize: 12,
        cursor: safePage === 0 ? "default" : "pointer"
      }
    }, "\u2190 Sebelumnya"), /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 12,
        color: "var(--text-secondary)"
      }
    }, "Halaman ", safePage + 1, " dari ", totalPages), /*#__PURE__*/React.createElement("button", {
      onClick: function onClick() {
        return setKanjiPage(function (p) {
          return Math.min(totalPages - 1, p + 1);
        });
      },
      disabled: safePage >= totalPages - 1,
      style: {
        background: safePage >= totalPages - 1 ? "var(--line)" : "var(--matcha)",
        color: "#fff",
        border: "none",
        borderRadius: 10,
        padding: "6px 12px",
        fontFamily: "'Zen Maru Gothic', sans-serif",
        fontWeight: 700,
        fontSize: 12,
        cursor: safePage >= totalPages - 1 ? "default" : "pointer"
      }
    }, "Berikutnya \u2192")))));
  }()), tab === "rutinitas" && !kanaQuizActive && function () {
    var allChecked = Object.entries(checked).filter(function (_ref15) {
      var _ref16 = _slicedToArray(_ref15, 2),
        k = _ref16[0],
        v = _ref16[1];
      return v;
    });
    var kanjiDone = allChecked.filter(function (_ref17) {
      var _ref18 = _slicedToArray(_ref17, 1),
        k = _ref18[0];
      return k.startsWith("kanji:");
    }).length;
    var vocabDone = allChecked.filter(function (_ref19) {
      var _ref20 = _slicedToArray(_ref19, 1),
        k = _ref20[0];
      return k.startsWith("vocab:");
    }).length;
    var grammarDone = allChecked.filter(function (_ref21) {
      var _ref22 = _slicedToArray(_ref21, 1),
        k = _ref22[0];
      return k.startsWith("grammar:");
    }).length;
    var totalDone = allChecked.length;
    var y = calendarMonth.y,
      m = calendarMonth.m;
    var firstDay = new Date(y, m, 1);
    var startWeekday = firstDay.getDay();
    var daysInMonth = new Date(y, m + 1, 0).getDate();
    var monthNames = ["Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "November", "Desember"];
    var cells = [];
    for (var i = 0; i < startWeekday; i++) cells.push(null);
    for (var d = 1; d <= daysInMonth; d++) cells.push(d);
    var dateKey = function dateKey(d) {
      return "".concat(y, "-").concat(String(m + 1).padStart(2, "0"), "-").concat(String(d).padStart(2, "0"));
    };
    var todayK = todayStr();
    var todayDaily = dailyLog[todayK] || {};
    return /*#__PURE__*/React.createElement("div", {
      className: "nm-d-masonry"
    }, /*#__PURE__*/React.createElement("div", {
      className: "nm-card nm-t-rut",
      style: {
        marginBottom: 12
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        gap: 10,
        marginBottom: 14
      }
    }, /*#__PURE__*/React.createElement("p", {
      style: {
        fontSize: 18,
        fontWeight: 700,
        margin: 0,
        color: "var(--ink)"
      }
    }, "Rutinitas hari ini"), /*#__PURE__*/React.createElement("span", {
      "aria-label": "Streak ".concat(streak, " hari"),
      style: {
        display: "inline-flex",
        alignItems: "center",
        gap: 5,
        flex: "none",
        background: "var(--momiji-tint)",
        border: "1.5px solid var(--momiji)",
        borderRadius: 999,
        padding: "4px 12px",
        fontSize: 13,
        fontWeight: 700,
        color: "var(--ink)"
      }
    }, "\uD83D\uDD25 Streak")), DAILY_TASKS.map(function (t) {
      var on = !!todayDaily[t.id];
      return /*#__PURE__*/React.createElement("button", {
        key: t.id,
        role: "checkbox",
        "aria-checked": on,
        onClick: function onClick() {
          return toggleDaily(t.id);
        },
        style: {
          display: "flex",
          alignItems: "center",
          gap: 12,
          width: "100%",
          textAlign: "left",
          padding: "12px 14px",
          marginBottom: 10,
          borderRadius: 12,
          cursor: "pointer",
          border: "1.5px solid var(--line)",
          background: "var(--paper)",
          fontFamily: "inherit",
          color: "inherit"
        }
      }, /*#__PURE__*/React.createElement("span", {
        style: {
          width: 26,
          height: 26,
          borderRadius: 7,
          flex: "none",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: on ? "var(--matcha)" : "var(--card-bg)",
          border: on ? "1.5px solid var(--matcha)" : "1.5px solid var(--line)"
        }
      }, on && /*#__PURE__*/React.createElement(Check, {
        size: 15,
        color: "#FFFFFF",
        "aria-hidden": "true"
      })), /*#__PURE__*/React.createElement("span", {
        style: {
          flex: 1,
          fontSize: 16,
          fontWeight: 600,
          color: on ? "var(--text-secondary)" : "var(--ink)",
          textDecoration: on ? "line-through" : "none"
        }
      }, t.label), /*#__PURE__*/React.createElement("span", {
        style: {
          fontSize: 13,
          color: "var(--text-secondary)"
        }
      }, t.minutes, " menit"));
    })), /*#__PURE__*/React.createElement("div", {
      className: "nm-card nm-t-stat",
      style: {
        marginBottom: 12
      }
    }, /*#__PURE__*/React.createElement(Tape, {
      color: "var(--yuzu)"
    }), /*#__PURE__*/React.createElement("p", {
      style: {
        fontSize: 14,
        fontWeight: 700,
        margin: "0 0 12px"
      }
    }, "\uD83D\uDCCA Statistik keseluruhan"), /*#__PURE__*/React.createElement("div", {
      style: {
        display: "grid",
        gridTemplateColumns: "repeat(2, minmax(0,1fr))",
        gap: 10
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        background: "var(--yuzu-tint)",
        borderRadius: 12,
        padding: "10px 12px",
        textAlign: "center"
      }
    }, /*#__PURE__*/React.createElement("p", {
      style: {
        fontSize: 22,
        fontWeight: 700,
        margin: 0,
        color: "var(--yuzu)"
      }
    }, totalDone), /*#__PURE__*/React.createElement("p", {
      style: {
        fontSize: 11,
        color: "var(--text-secondary)",
        margin: "2px 0 0"
      }
    }, "Total dikuasai")), /*#__PURE__*/React.createElement("div", {
      style: {
        background: "var(--matcha-tint)",
        borderRadius: 12,
        padding: "10px 12px",
        textAlign: "center"
      }
    }, /*#__PURE__*/React.createElement("p", {
      style: {
        fontSize: 22,
        fontWeight: 700,
        margin: 0,
        color: "var(--matcha)"
      }
    }, kanjiDone), /*#__PURE__*/React.createElement("p", {
      style: {
        fontSize: 11,
        color: "var(--text-secondary)",
        margin: "2px 0 0"
      }
    }, "Kanji")), /*#__PURE__*/React.createElement("div", {
      style: {
        background: "var(--sora-tint)",
        borderRadius: 12,
        padding: "10px 12px",
        textAlign: "center"
      }
    }, /*#__PURE__*/React.createElement("p", {
      style: {
        fontSize: 22,
        fontWeight: 700,
        margin: 0,
        color: "var(--sora)"
      }
    }, vocabDone), /*#__PURE__*/React.createElement("p", {
      style: {
        fontSize: 11,
        color: "var(--text-secondary)",
        margin: "2px 0 0"
      }
    }, "Kosakata")), /*#__PURE__*/React.createElement("div", {
      style: {
        background: "var(--momiji-tint)",
        borderRadius: 12,
        padding: "10px 12px",
        textAlign: "center"
      }
    }, /*#__PURE__*/React.createElement("p", {
      style: {
        fontSize: 22,
        fontWeight: 700,
        margin: 0,
        color: "var(--momiji)"
      }
    }, grammarDone), /*#__PURE__*/React.createElement("p", {
      style: {
        fontSize: 11,
        color: "var(--text-secondary)",
        margin: "2px 0 0"
      }
    }, "Grammar"))), /*#__PURE__*/React.createElement("p", {
      style: {
        fontSize: 11,
        color: "var(--text-secondary)",
        margin: "10px 0 0",
        display: "flex",
        alignItems: "center",
        gap: 4
      }
    }, /*#__PURE__*/React.createElement(Flame, {
      size: 13,
      color: "var(--yuzu)",
      "aria-hidden": "true"
    }), " Streak belajar: ", streak, " hari berturut-turut")), /*#__PURE__*/React.createElement("div", {
      className: "nm-card nm-t-cal",
      style: {
        marginBottom: 12
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 10
      }
    }, /*#__PURE__*/React.createElement("button", {
      onClick: function onClick() {
        return setCalendarMonth(function (p) {
          return p.m === 0 ? {
            y: p.y - 1,
            m: 11
          } : {
            y: p.y,
            m: p.m - 1
          };
        });
      },
      style: {
        background: "none",
        border: "none",
        cursor: "pointer",
        padding: 4
      }
    }, /*#__PURE__*/React.createElement(ChevronRight, {
      size: 16,
      style: {
        transform: "rotate(180deg)"
      },
      "aria-hidden": "true"
    })), /*#__PURE__*/React.createElement("p", {
      style: {
        fontSize: 14,
        fontWeight: 700,
        margin: 0
      }
    }, monthNames[m], " ", y), /*#__PURE__*/React.createElement("button", {
      onClick: function onClick() {
        return setCalendarMonth(function (p) {
          return p.m === 11 ? {
            y: p.y + 1,
            m: 0
          } : {
            y: p.y,
            m: p.m + 1
          };
        });
      },
      style: {
        background: "none",
        border: "none",
        cursor: "pointer",
        padding: 4
      }
    }, /*#__PURE__*/React.createElement(ChevronRight, {
      size: 16,
      "aria-hidden": "true"
    }))), /*#__PURE__*/React.createElement("div", {
      style: {
        display: "grid",
        gridTemplateColumns: "repeat(7, minmax(0,1fr))",
        gap: 4,
        marginBottom: 6
      }
    }, ["M", "S", "S", "R", "K", "J", "S"].map(function (d, i) {
      return /*#__PURE__*/React.createElement("p", {
        key: i,
        style: {
          fontSize: 10,
          color: "var(--text-secondary)",
          textAlign: "center",
          margin: 0
        }
      }, d);
    })), /*#__PURE__*/React.createElement("div", {
      style: {
        display: "grid",
        gridTemplateColumns: "repeat(7, minmax(0,1fr))",
        gap: 4
      }
    }, cells.map(function (d, i) {
      if (!d) return /*#__PURE__*/React.createElement("div", {
        key: i
      });
      var dk = dateKey(d);
      var hasActivity = !!(activityLog[dk] && activityLog[dk].length > 0);
      var isToday = dk === todayK;
      return /*#__PURE__*/React.createElement("div", {
        key: i,
        onClick: function onClick() {
          return setSelectedDate(dk);
        },
        style: {
          aspectRatio: "1",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: 10,
          fontSize: 12,
          cursor: "pointer",
          background: hasActivity ? "var(--yuzu)" : "var(--line)",
          color: hasActivity ? "var(--card-bg)" : "var(--text-secondary)",
          fontWeight: hasActivity || isToday ? 700 : 400,
          border: isToday ? "2px solid var(--momiji)" : "none"
        }
      }, d);
    })), /*#__PURE__*/React.createElement("p", {
      style: {
        fontSize: 11,
        color: "var(--text-secondary)",
        margin: "10px 0 0"
      }
    }, "\uD83D\uDCA1 Tanggal berwarna kuning = ada aktivitas belajar. Klik untuk lihat detailnya."), selectedDate && /*#__PURE__*/React.createElement("div", {
      style: {
        marginTop: 10,
        background: "var(--yuzu-tint)",
        borderRadius: 12,
        padding: "10px 12px"
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 6
      }
    }, /*#__PURE__*/React.createElement("p", {
      style: {
        fontSize: 12.5,
        fontWeight: 700,
        margin: 0
      }
    }, selectedDate), /*#__PURE__*/React.createElement("button", {
      onClick: function onClick() {
        return setSelectedDate(null);
      },
      style: {
        background: "none",
        border: "none",
        cursor: "pointer",
        fontSize: 12,
        color: "var(--text-secondary)"
      }
    }, "\u2715 tutup")), (activityLog[selectedDate] || []).length > 0 ? (activityLog[selectedDate] || []).map(function (label, i) {
      return /*#__PURE__*/React.createElement("p", {
        key: i,
        style: {
          fontSize: 12,
          margin: "0 0 4px",
          display: "flex",
          alignItems: "center",
          gap: 6
        }
      }, /*#__PURE__*/React.createElement(Check, {
        size: 13,
        color: "var(--yuzu)",
        "aria-hidden": "true"
      }), " ", label);
    }) : /*#__PURE__*/React.createElement("p", {
      style: {
        fontSize: 12,
        color: "var(--text-secondary)",
        margin: 0
      }
    }, "Belum ada aktivitas belajar tercatat di tanggal ini."))), /*#__PURE__*/React.createElement("div", {
      className: "nm-card nm-t-lvl",
      style: {
        marginBottom: 12
      }
    }, /*#__PURE__*/React.createElement("p", {
      style: {
        fontSize: 14,
        fontWeight: 700,
        margin: "0 0 4px"
      }
    }, "Progres tiap level"), /*#__PURE__*/React.createElement("p", {
      style: {
        fontSize: 11,
        color: "var(--text-secondary)",
        margin: "0 0 10px"
      }
    }, "Rata-rata kanji + kosakata + grammar yang sudah dikuasai."), LEVELS.map(function (lvl, i) {
      var colors = ["sakura", "sora", "matcha", "momiji"];
      var col = colors[i] || "yuzu";
      var done = 0,
        total = 0;
      ["kanji", "vocab", "grammar"].forEach(function (cat) {
        var items = lvl[cat] || [];
        total += items.length;
        done += items.filter(function (it) {
          return checked["".concat(cat, ":").concat(it)];
        }).length;
      });
      var pct = total ? Math.round(done / total * 100) : 0;
      return /*#__PURE__*/React.createElement("div", {
        key: lvl.id,
        style: {
          marginBottom: 10
        }
      }, /*#__PURE__*/React.createElement("div", {
        style: {
          display: "flex",
          justifyContent: "space-between",
          marginBottom: 3
        }
      }, /*#__PURE__*/React.createElement("span", {
        style: {
          fontSize: 12,
          fontWeight: 700
        }
      }, lvl.label), /*#__PURE__*/React.createElement("span", {
        style: {
          fontSize: 11,
          color: "var(--".concat(col, ")"),
          fontWeight: 700
        }
      }, pct, "%")), /*#__PURE__*/React.createElement("div", {
        style: {
          height: 6,
          borderRadius: 4,
          background: "var(--line)",
          overflow: "hidden"
        }
      }, /*#__PURE__*/React.createElement("div", {
        style: {
          height: "100%",
          width: "".concat(pct, "%"),
          background: "var(--".concat(col, ")"),
          borderRadius: 4,
          transition: "width 0.2s ease"
        }
      })));
    })), /*#__PURE__*/React.createElement("div", {
      className: "nm-card nm-t-streak",
      style: {
        marginBottom: 12,
        display: "flex",
        gap: 10
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        flex: 1,
        textAlign: "center",
        background: "var(--yuzu-tint)",
        borderRadius: 12,
        padding: "10px 6px"
      }
    }, /*#__PURE__*/React.createElement("p", {
      style: {
        fontSize: 20,
        fontWeight: 700,
        margin: 0,
        color: "var(--yuzu)"
      }
    }, streak), /*#__PURE__*/React.createElement("p", {
      style: {
        fontSize: 10.5,
        color: "var(--text-secondary)",
        margin: "2px 0 0"
      }
    }, "Streak saat ini")), /*#__PURE__*/React.createElement("div", {
      style: {
        flex: 1,
        textAlign: "center",
        background: "var(--matcha-tint)",
        borderRadius: 12,
        padding: "10px 6px"
      }
    }, /*#__PURE__*/React.createElement("p", {
      style: {
        fontSize: 20,
        fontWeight: 700,
        margin: 0,
        color: "var(--matcha)"
      }
    }, Object.keys(activityLog).length), /*#__PURE__*/React.createElement("p", {
      style: {
        fontSize: 10.5,
        color: "var(--text-secondary)",
        margin: "2px 0 0"
      }
    }, "Total hari belajar"))), /*#__PURE__*/React.createElement("div", {
      className: "nm-card nm-t-goal"
    }, /*#__PURE__*/React.createElement("p", {
      style: {
        fontSize: 14,
        fontWeight: 700,
        margin: "0 0 10px"
      }
    }, "Target minggu ini"), /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        gap: 6,
        marginBottom: 10
      }
    }, /*#__PURE__*/React.createElement("input", {
      type: "text",
      value: newGoalText,
      onChange: function onChange(e) {
        return setNewGoalText(e.target.value);
      },
      onKeyDown: function onKeyDown(e) {
        if (e.key === "Enter") addWeeklyGoal();
      },
      placeholder: "Tulis target belajarmu...",
      style: {
        flex: 1,
        padding: "9px 12px",
        borderRadius: 10,
        border: "2px solid var(--line)",
        fontSize: 13,
        fontFamily: "inherit",
        background: "var(--card-bg)",
        color: "var(--ink)"
      }
    }), /*#__PURE__*/React.createElement("button", {
      onClick: addWeeklyGoal,
      style: {
        padding: "9px 16px",
        borderRadius: 10,
        border: "none",
        background: "var(--yuzu)",
        color: "#fff",
        fontWeight: 700,
        fontSize: 13,
        cursor: "pointer",
        whiteSpace: "nowrap"
      }
    }, "+ Tambah")), weeklyGoals.length === 0 ? /*#__PURE__*/React.createElement("p", {
      style: {
        fontSize: 12,
        color: "var(--text-secondary)",
        margin: 0
      }
    }, "Belum ada target minggu ini. Tulis targetmu sendiri di atas, misalnya \"hafal 30 kosakata baru\".") : weeklyGoals.map(function (g) {
      return /*#__PURE__*/React.createElement("div", {
        key: g.id,
        className: "nm-item",
        style: {
          justifyContent: "space-between"
        }
      }, /*#__PURE__*/React.createElement("span", {
        onClick: function onClick() {
          return completeWeeklyGoal(g.id);
        },
        style: {
          display: "flex",
          alignItems: "center",
          gap: 8,
          flex: 1,
          cursor: "pointer"
        }
      }, /*#__PURE__*/React.createElement(Circle, {
        size: 16,
        color: "var(--text-muted)",
        "aria-hidden": "true"
      }), /*#__PURE__*/React.createElement("span", {
        style: {
          color: "var(--text-secondary)"
        }
      }, g.text)), /*#__PURE__*/React.createElement("button", {
        onClick: function onClick() {
          return removeWeeklyGoal(g.id);
        },
        "aria-label": "Hapus target",
        style: {
          background: "none",
          border: "none",
          color: "var(--text-muted)",
          cursor: "pointer",
          fontSize: 15,
          padding: "2px 4px"
        }
      }, "\u2715"));
    }), weeklyHistory.length > 0 && function () {
      var weekKeyOf = function weekKeyOf(dateStr) {
        var d = new Date(dateStr);
        var day = d.getDay();
        var monday = new Date(d);
        monday.setDate(d.getDate() - (day + 6) % 7);
        return monday.toISOString().slice(0, 10);
      };
      var fmt = function fmt(dateStr) {
        var x = new Date(dateStr);
        return "".concat(x.getDate(), " ").concat(["Jan", "Feb", "Mar", "Apr", "Mei", "Jun", "Jul", "Agu", "Sep", "Okt", "Nov", "Des"][x.getMonth()]);
      };
      var groups = {};
      weeklyHistory.forEach(function (h) {
        var wk = weekKeyOf(h.completedAt);
        if (!groups[wk]) groups[wk] = [];
        groups[wk].push(h);
      });
      var weekKeys = Object.keys(groups).sort();
      var activeIdx = historyWeekIdx === null ? weekKeys.length - 1 : historyWeekIdx;
      var activeKey = weekKeys[activeIdx];
      var sundayOf = function sundayOf(mondayStr) {
        var d = new Date(mondayStr);
        d.setDate(d.getDate() + 6);
        return d.toISOString().slice(0, 10);
      };
      return /*#__PURE__*/React.createElement("div", {
        style: {
          marginTop: 14,
          paddingTop: 12,
          borderTop: "2px solid var(--line)"
        }
      }, /*#__PURE__*/React.createElement("p", {
        style: {
          fontSize: 12.5,
          fontWeight: 700,
          margin: "0 0 8px",
          color: "var(--text-secondary)"
        }
      }, "\uD83D\uDCDC Riwayat target selesai"), /*#__PURE__*/React.createElement("div", {
        style: {
          display: "flex",
          gap: 6,
          marginBottom: 10,
          overflowX: "auto",
          paddingBottom: 2
        }
      }, weekKeys.map(function (wk, i) {
        return /*#__PURE__*/React.createElement("button", {
          key: wk,
          onClick: function onClick() {
            return setHistoryWeekIdx(i);
          },
          style: {
            flexShrink: 0,
            fontSize: 11.5,
            fontWeight: 700,
            padding: "6px 12px",
            borderRadius: 999,
            border: "2px solid var(--line)",
            cursor: "pointer",
            whiteSpace: "nowrap",
            background: i === activeIdx ? "var(--yuzu)" : "var(--card-bg)",
            color: i === activeIdx ? "var(--card-bg)" : "var(--ink)",
            borderColor: i === activeIdx ? "var(--yuzu)" : "var(--line)"
          }
        }, "Minggu ", i + 1);
      })), activeKey && /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("p", {
        style: {
          fontSize: 11,
          color: "var(--text-secondary)",
          margin: "0 0 8px"
        }
      }, fmt(activeKey), " - ", fmt(sundayOf(activeKey))), groups[activeKey].map(function (h) {
        return /*#__PURE__*/React.createElement("div", {
          key: h.id,
          className: "nm-item",
          style: {
            cursor: "default"
          }
        }, /*#__PURE__*/React.createElement(Check, {
          size: 16,
          color: "var(--yuzu)",
          "aria-hidden": "true"
        }), /*#__PURE__*/React.createElement("span", {
          style: {
            flex: 1,
            color: "var(--ink)",
            textDecoration: "line-through"
          }
        }, h.text), /*#__PURE__*/React.createElement("span", {
          style: {
            fontSize: 10.5,
            color: "var(--text-secondary)"
          }
        }, h.completedAt));
      })));
    }()));
  }(), tab === "latihan" && !kanaQuizActive && function (_DIFFICULTY$examDiffi) {
    var sections = [{
      id: "kosakata",
      label: "語彙",
      sub: "Kosakata",
      desc: "Cara baca kosakata",
      icon: Book
    }, {
      id: "kanji",
      label: "漢字",
      sub: "Kanji",
      desc: "Kanji dalam kalimat",
      icon: BookOpen
    }, {
      id: "grammar",
      label: "文法",
      sub: "Grammar",
      desc: "Pola tata bahasa",
      icon: PenLine
    }
    // { id: "choukai", label: "聴解", sub: "Choukai", desc: "Dengar dialog, lalu jawab", icon: Volume2 }, // nonaktif sementara
    ];
    if (!latihanMode) {
      return /*#__PURE__*/React.createElement("div", {
        style: {
          display: "flex",
          flexDirection: "column",
          gap: 10
        }
      }, /*#__PURE__*/React.createElement("p", {
        style: {
          fontSize: 12.5,
          color: "var(--text-secondary)",
          margin: "0 0 4px"
        }
      }, "Mau latihan yang mana?"), /*#__PURE__*/React.createElement("div", {
        className: "nm-card nm-card-tap",
        style: {
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          gap: 12
        },
        onClick: function onClick() {
          setKanaScript("hiragana");
          setKanaQuizActive(true);
        }
      }, /*#__PURE__*/React.createElement("div", {
        style: {
          width: 40,
          height: 40,
          borderRadius: 12,
          background: "var(--sora-tint)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexShrink: 0
        }
      }, /*#__PURE__*/React.createElement(PenLine, {
        size: 18,
        color: "var(--sora)",
        "aria-hidden": "true"
      })), /*#__PURE__*/React.createElement("div", {
        style: {
          flex: 1
        }
      }, /*#__PURE__*/React.createElement("p", {
        style: {
          fontSize: 14,
          fontWeight: 700,
          margin: 0
        }
      }, "\u270D\uFE0F Kuis Hiragana"), /*#__PURE__*/React.createElement("p", {
        style: {
          fontSize: 11.5,
          color: "var(--text-secondary)",
          margin: "2px 0 0"
        }
      }, "Uji cara baca & tulisnya")), /*#__PURE__*/React.createElement(ChevronRight, {
        size: 16,
        color: "var(--text-secondary)",
        "aria-hidden": "true"
      })), /*#__PURE__*/React.createElement("div", {
        className: "nm-card nm-card-tap",
        style: {
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          gap: 12
        },
        onClick: function onClick() {
          setKanaScript("katakana");
          setKanaQuizActive(true);
        }
      }, /*#__PURE__*/React.createElement("div", {
        style: {
          width: 40,
          height: 40,
          borderRadius: 12,
          background: "var(--sora-tint)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexShrink: 0
        }
      }, /*#__PURE__*/React.createElement(PenLine, {
        size: 18,
        color: "var(--sora)",
        "aria-hidden": "true"
      })), /*#__PURE__*/React.createElement("div", {
        style: {
          flex: 1
        }
      }, /*#__PURE__*/React.createElement("p", {
        style: {
          fontSize: 14,
          fontWeight: 700,
          margin: 0
        }
      }, "\u270D\uFE0F Kuis Katakana"), /*#__PURE__*/React.createElement("p", {
        style: {
          fontSize: 11.5,
          color: "var(--text-secondary)",
          margin: "2px 0 0"
        }
      }, "Uji cara baca & tulisnya")), /*#__PURE__*/React.createElement(ChevronRight, {
        size: 16,
        color: "var(--text-secondary)",
        "aria-hidden": "true"
      })), /*#__PURE__*/React.createElement("div", {
        className: "nm-card nm-card-tap",
        style: {
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          gap: 12
        },
        onClick: function onClick() {
          return setLatihanMode("matching");
        }
      }, /*#__PURE__*/React.createElement("div", {
        style: {
          width: 40,
          height: 40,
          borderRadius: 12,
          background: "var(--yuzu-tint)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexShrink: 0
        }
      }, /*#__PURE__*/React.createElement(Link2, {
        size: 18,
        color: "var(--yuzu)",
        "aria-hidden": "true"
      })), /*#__PURE__*/React.createElement("div", {
        style: {
          flex: 1
        }
      }, /*#__PURE__*/React.createElement("p", {
        style: {
          fontSize: 14,
          fontWeight: 700,
          margin: 0
        }
      }, "\uD83E\uDDE9 Kuis Pencocokan Kanji & Kosakata"), /*#__PURE__*/React.createElement("p", {
        style: {
          fontSize: 11.5,
          color: "var(--text-secondary)",
          margin: "2px 0 0"
        }
      }, "Tarik garis, cocokkan kanji/kata dengan artinya")), /*#__PURE__*/React.createElement(ChevronRight, {
        size: 16,
        color: "var(--text-secondary)",
        "aria-hidden": "true"
      })), /*#__PURE__*/React.createElement("div", {
        className: "nm-card nm-card-tap",
        style: {
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          gap: 12
        },
        onClick: function onClick() {
          return setLatihanMode("writing");
        }
      }, /*#__PURE__*/React.createElement("div", {
        style: {
          width: 40,
          height: 40,
          borderRadius: 12,
          background: "var(--sakura-tint)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexShrink: 0
        }
      }, /*#__PURE__*/React.createElement(PenLine, {
        size: 18,
        color: "var(--sakura)",
        "aria-hidden": "true"
      })), /*#__PURE__*/React.createElement("div", {
        style: {
          flex: 1
        }
      }, /*#__PURE__*/React.createElement("p", {
        style: {
          fontSize: 14,
          fontWeight: 700,
          margin: 0
        }
      }, "\uD83D\uDD8C\uFE0F Latihan Menulis"), /*#__PURE__*/React.createElement("p", {
        style: {
          fontSize: 11.5,
          color: "var(--text-secondary)",
          margin: "2px 0 0"
        }
      }, "Tulis hiragana, katakana & kanji sesuai urutan goresan")), /*#__PURE__*/React.createElement(ChevronRight, {
        size: 16,
        color: "var(--text-secondary)",
        "aria-hidden": "true"
      })), /*#__PURE__*/React.createElement("div", {
        className: "nm-card nm-card-tap",
        style: {
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          gap: 12
        },
        onClick: function onClick() {
          return setLatihanMode("pengulangan");
        }
      }, /*#__PURE__*/React.createElement("div", {
        style: {
          width: 40,
          height: 40,
          borderRadius: 12,
          background: "var(--matcha-tint)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexShrink: 0
        }
      }, /*#__PURE__*/React.createElement(PenLine, {
        size: 18,
        color: "var(--matcha)",
        "aria-hidden": "true"
      })), /*#__PURE__*/React.createElement("div", {
        style: {
          flex: 1
        }
      }, /*#__PURE__*/React.createElement("p", {
        style: {
          fontSize: 14,
          fontWeight: 700,
          margin: 0
        }
      }, "\uD83D\uDD01 Latihan Pengulangan Materi"), /*#__PURE__*/React.createElement("p", {
        style: {
          fontSize: 11.5,
          color: "var(--text-secondary)",
          margin: "2px 0 0"
        }
      }, "Ulang kosakata, kanji & grammar yang sudah dipelajari")), /*#__PURE__*/React.createElement(ChevronRight, {
        size: 16,
        color: "var(--text-secondary)",
        "aria-hidden": "true"
      })), /*#__PURE__*/React.createElement("div", {
        className: "nm-card nm-card-tap",
        style: {
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          gap: 12
        },
        onClick: function onClick() {
          return setLatihanMode("susun");
        }
      }, /*#__PURE__*/React.createElement("div", {
        style: {
          width: 40,
          height: 40,
          borderRadius: 12,
          background: "var(--momiji-tint)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexShrink: 0
        }
      }, /*#__PURE__*/React.createElement(ListChecks, {
        size: 18,
        color: "var(--momiji)",
        "aria-hidden": "true"
      })), /*#__PURE__*/React.createElement("div", {
        style: {
          flex: 1
        }
      }, /*#__PURE__*/React.createElement("p", {
        style: {
          fontSize: 14,
          fontWeight: 700,
          margin: 0
        }
      }, "\uD83C\uDFAE Susun Kata"), /*#__PURE__*/React.createElement("p", {
        style: {
          fontSize: 11.5,
          color: "var(--text-secondary)",
          margin: "2px 0 0"
        }
      }, "Game: susun potongan kata jadi kalimat yang benar")), /*#__PURE__*/React.createElement(ChevronRight, {
        size: 16,
        color: "var(--text-secondary)",
        "aria-hidden": "true"
      })), UJIAN_CATEGORIES.map(function (cat) {
        var catUi = {
          mojigoi: {
            emoji: "🔤",
            tint: "sakura",
            Icon: PenLine
          },
          dokkai: {
            emoji: "📖",
            tint: "sora",
            Icon: BookOpen
          },
          choukai: {
            emoji: "🎧",
            tint: "matcha",
            Icon: Volume2
          }
        }[cat.id];
        return /*#__PURE__*/React.createElement("div", {
          key: cat.id,
          className: "nm-card nm-card-tap",
          style: {
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            gap: 12
          },
          onClick: function onClick() {
            setUjianCategory(cat.id);
            setUjianLevel(null);
            setUjianYear(null);
            setLatihanMode("ujian");
          }
        }, /*#__PURE__*/React.createElement("div", {
          style: {
            width: 40,
            height: 40,
            borderRadius: 12,
            background: "var(--".concat(catUi.tint, "-tint)"),
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0
          }
        }, /*#__PURE__*/React.createElement(catUi.Icon, {
          size: 18,
          color: "var(--".concat(catUi.tint, ")"),
          "aria-hidden": "true"
        })), /*#__PURE__*/React.createElement("div", {
          style: {
            flex: 1
          }
        }, /*#__PURE__*/React.createElement("p", {
          style: {
            fontSize: 14,
            fontWeight: 700,
            margin: 0
          }
        }, catUi.emoji, " ", cat.title), /*#__PURE__*/React.createElement("p", {
          style: {
            fontSize: 11.5,
            color: "var(--text-secondary)",
            margin: "2px 0 0"
          }
        }, cat.sub)), /*#__PURE__*/React.createElement(ChevronRight, {
          size: 16,
          color: "var(--text-secondary)",
          "aria-hidden": "true"
        }));
      }));
    }
    if (latihanMode === "writing") {
      var backToMenu = function backToMenu() {
        setLatihanMode(null);
        exitWriting();
      };
      if (typeof WRITING_STROKES === "undefined") {
        return /*#__PURE__*/React.createElement("div", {
          className: "nm-card",
          style: {
            textAlign: "center"
          }
        }, /*#__PURE__*/React.createElement("p", {
          style: {
            fontSize: 13,
            color: "var(--text-secondary)",
            margin: "0 0 10px"
          }
        }, "Data goresan belum termuat. Pastikan berkas nihongo-michi-data-writing.js ada di folder aplikasi."), /*#__PURE__*/React.createElement("button", {
          onClick: backToMenu,
          className: "nm-btn nm-btn-secondary"
        }, "Kembali"));
      }
      var isKana = writingScript === "hiragana" || writingScript === "katakana";
      var kset = isKana ? kanaWritingSets(writingScript) : null;
      var labelMap = kset ? Object.fromEntries([].concat(_toConsumableArray(kset.dasar), _toConsumableArray(kset.dakuten), _toConsumableArray(kset.kecil)).map(function (e) {
        return [e.ch, e.label];
      })) : null;
      var kanjiEx = kanjiExclusiveByLevel();
      var chars = [];
      if (isKana) chars = kset[writingGroup].map(function (e) {
        return e.ch;
      });else if (writingLevel) chars = (kanjiEx[writingLevel.id] || []).filter(function (k) {
        return WRITING_STROKES[k];
      });
      var scriptTitle = writingScript === "hiragana" ? "Hiragana" : writingScript === "katakana" ? "Katakana" : "Kanji";

      // 3) sedang menulis satu karakter
      if (writingChar) {
        var idx = Math.max(0, chars.indexOf(writingChar));
        var go = function go(d) {
          var n = chars.length;
          if (n) setWritingChar(chars[(idx + d + n) % n]);
        };
        var randomChar = function randomChar() {
          if (chars.length > 1) {
            var c;
            do {
              c = chars[Math.floor(Math.random() * chars.length)];
            } while (c === writingChar);
            setWritingChar(c);
          }
        };
        return /*#__PURE__*/React.createElement("div", {
          className: "nm-card"
        }, /*#__PURE__*/React.createElement(Tape, {
          color: "var(--sakura)"
        }), /*#__PURE__*/React.createElement("button", {
          onClick: function onClick() {
            return setWritingChar(null);
          },
          className: "nm-btn nm-btn-ghost",
          style: {
            marginBottom: 10
          }
        }, /*#__PURE__*/React.createElement(ChevronRight, {
          size: 13,
          style: {
            transform: "rotate(180deg)"
          },
          "aria-hidden": "true"
        }), " ", scriptTitle, writingLevel ? " · " + writingLevel.label : ""), /*#__PURE__*/React.createElement(WritingPractice, {
          key: writingChar,
          "char": writingChar,
          info: writingInfo(writingChar, writingScript, labelMap),
          onDone: function onDone(m) {
            return setWritingDone(function (d) {
              return _objectSpread(_objectSpread({}, d), {}, _defineProperty({}, writingChar, Math.min(m, d[writingChar] === undefined ? 99 : d[writingChar])));
            });
          },
          onNext: function onNext() {
            return go(1);
          }
        }), /*#__PURE__*/React.createElement("div", {
          style: {
            display: "flex",
            gap: 8,
            marginTop: 14,
            justifyContent: "space-between",
            alignItems: "center"
          }
        }, /*#__PURE__*/React.createElement("button", {
          onClick: function onClick() {
            return go(-1);
          },
          className: "nm-btn nm-btn-secondary nm-btn-sm",
          "aria-label": "Karakter sebelumnya",
          style: {
            minWidth: 44
          }
        }, /*#__PURE__*/React.createElement(ChevronRight, {
          size: 16,
          style: {
            transform: "rotate(180deg)"
          },
          "aria-hidden": "true"
        })), /*#__PURE__*/React.createElement("span", {
          style: {
            fontSize: 11.5,
            color: "var(--text-secondary)",
            fontWeight: 700,
            whiteSpace: "nowrap",
            flexShrink: 0
          }
        }, idx + 1, " / ", chars.length), /*#__PURE__*/React.createElement("button", {
          onClick: randomChar,
          className: "nm-btn nm-btn-outline nm-btn-sm",
          "aria-label": "Karakter acak"
        }, "\uD83C\uDFB2 Acak"), /*#__PURE__*/React.createElement("button", {
          onClick: function onClick() {
            return go(1);
          },
          className: "nm-btn nm-btn-secondary nm-btn-sm",
          "aria-label": "Karakter berikutnya",
          style: {
            minWidth: 44
          }
        }, /*#__PURE__*/React.createElement(ChevronRight, {
          size: 16,
          "aria-hidden": "true"
        }))));
      }

      // 1) pilih jenis huruf
      if (!writingScript) {
        var kanjiCount = new Set(LEVELS.flatMap(function (l) {
          return l.kanji;
        })).size;
        var hs = kanaWritingSets("hiragana"),
          ks = kanaWritingSets("katakana");
        var SCRIPTS = [{
          id: "hiragana",
          title: "ひらがな Hiragana",
          desc: "Huruf dasar bahasa Jepang \xB7 ".concat(hs.dasar.length + hs.dakuten.length + hs.kecil.length, " huruf"),
          color: "sakura"
        }, {
          id: "katakana",
          title: "カタカナ Katakana",
          desc: "Huruf untuk kata serapan \xB7 ".concat(ks.dasar.length + ks.dakuten.length + ks.kecil.length, " huruf"),
          color: "sora"
        }, {
          id: "kanji",
          title: "漢字 Kanji",
          desc: "Kanji N5\u2013N1 \xB7 ".concat(kanjiCount, " kanji"),
          color: "momiji"
        }];
        return /*#__PURE__*/React.createElement("div", {
          style: {
            display: "flex",
            flexDirection: "column",
            gap: 10
          }
        }, /*#__PURE__*/React.createElement("button", {
          onClick: backToMenu,
          className: "nm-btn nm-btn-ghost",
          style: {
            alignSelf: "flex-start",
            marginBottom: 2
          }
        }, /*#__PURE__*/React.createElement(ChevronRight, {
          size: 14,
          style: {
            transform: "rotate(180deg)"
          },
          "aria-hidden": "true"
        }), " Ganti jenis latihan"), /*#__PURE__*/React.createElement("p", {
          style: {
            fontSize: 12.5,
            color: "var(--text-secondary)",
            margin: "0 0 4px"
          }
        }, "Mau berlatih menulis apa?"), SCRIPTS.map(function (sc) {
          return /*#__PURE__*/React.createElement("div", {
            key: sc.id,
            className: "nm-card nm-card-tap",
            style: {
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: 12
            },
            onClick: function onClick() {
              return setWritingScript(sc.id);
            }
          }, /*#__PURE__*/React.createElement("div", {
            style: {
              width: 40,
              height: 40,
              borderRadius: 12,
              background: "var(--".concat(sc.color, "-tint)"),
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0
            }
          }, /*#__PURE__*/React.createElement(PenLine, {
            size: 18,
            color: "var(--".concat(sc.color, ")"),
            "aria-hidden": "true"
          })), /*#__PURE__*/React.createElement("div", {
            style: {
              flex: 1
            }
          }, /*#__PURE__*/React.createElement("p", {
            style: {
              fontSize: 14,
              fontWeight: 700,
              margin: 0
            }
          }, sc.title), /*#__PURE__*/React.createElement("p", {
            style: {
              fontSize: 11.5,
              color: "var(--text-secondary)",
              margin: "2px 0 0"
            }
          }, sc.desc)), /*#__PURE__*/React.createElement(ChevronRight, {
            size: 16,
            color: "var(--text-secondary)",
            "aria-hidden": "true"
          }));
        }));
      }

      // 2a) kanji: pilih level dulu
      if (writingScript === "kanji" && !writingLevel) {
        var colors = ["sakura", "sora", "matcha", "momiji"];
        return /*#__PURE__*/React.createElement("div", {
          style: {
            display: "flex",
            flexDirection: "column",
            gap: 10
          }
        }, /*#__PURE__*/React.createElement("button", {
          onClick: function onClick() {
            return setWritingScript(null);
          },
          className: "nm-btn nm-btn-ghost",
          style: {
            alignSelf: "flex-start",
            marginBottom: 2
          }
        }, /*#__PURE__*/React.createElement(ChevronRight, {
          size: 14,
          style: {
            transform: "rotate(180deg)"
          },
          "aria-hidden": "true"
        }), " Ganti jenis huruf"), /*#__PURE__*/React.createElement("p", {
          style: {
            fontSize: 12.5,
            color: "var(--text-secondary)",
            margin: "0 0 4px"
          }
        }, "Pilih level kanji:"), LEVELS.map(function (l, i) {
          return /*#__PURE__*/React.createElement("div", {
            key: l.id,
            className: "nm-card nm-card-tap",
            style: {
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: 12
            },
            onClick: function onClick() {
              setWritingLevel(l);
              setWritingVisible(60);
            }
          }, /*#__PURE__*/React.createElement("div", {
            style: {
              width: 44,
              height: 40,
              borderRadius: 12,
              background: "var(--".concat(colors[i], ")"),
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
              color: "#fff",
              fontWeight: 700,
              fontFamily: "'Shippori Mincho', serif",
              fontSize: l.label.length > 2 ? 12 : 16,
              whiteSpace: "nowrap",
              padding: "0 2px"
            }
          }, l.label), /*#__PURE__*/React.createElement("div", {
            style: {
              flex: 1
            }
          }, /*#__PURE__*/React.createElement("p", {
            style: {
              fontSize: 14,
              fontWeight: 700,
              margin: 0
            }
          }, l.name), /*#__PURE__*/React.createElement("p", {
            style: {
              fontSize: 11.5,
              color: "var(--text-secondary)",
              margin: "2px 0 0"
            }
          }, (kanjiEx[l.id] || []).length, " kanji khusus level ini")), /*#__PURE__*/React.createElement(ChevronRight, {
            size: 16,
            color: "var(--text-secondary)",
            "aria-hidden": "true"
          }));
        }));
      }

      // 2b) pemilih karakter (grid)
      var cell = function cell(e, key) {
        return e ? /*#__PURE__*/React.createElement("button", {
          key: key,
          onClick: function onClick() {
            return setWritingChar(e.ch);
          },
          title: e.title || e.label || e.ch,
          "aria-label": "Tulis ".concat(e.label || e.ch),
          className: "nm-wr-cell" + (writingDone[e.ch] !== undefined ? " done" : "")
        }, /*#__PURE__*/React.createElement("span", {
          className: "nm-title",
          style: {
            fontSize: isKana ? 22 : 24
          }
        }, e.ch), e.label && /*#__PURE__*/React.createElement("span", {
          style: {
            fontSize: 10,
            color: "var(--text-secondary)"
          }
        }, e.label), writingDone[e.ch] !== undefined && /*#__PURE__*/React.createElement("span", {
          className: "nm-wr-cell-check"
        }, /*#__PURE__*/React.createElement(Check, {
          size: 11,
          "aria-hidden": "true"
        }))) : /*#__PURE__*/React.createElement("div", {
          key: key
        });
      };
      var doneInList = chars.filter(function (c) {
        return writingDone[c] !== undefined;
      }).length;
      var GROUPS = [{
        id: "dasar",
        label: "Dasar"
      }, {
        id: "dakuten",
        label: "Dakuten"
      }, {
        id: "kecil",
        label: "Kecil"
      }];
      return /*#__PURE__*/React.createElement("div", {
        className: "nm-card"
      }, /*#__PURE__*/React.createElement(Tape, {
        color: "var(--sakura)"
      }), /*#__PURE__*/React.createElement("button", {
        onClick: function onClick() {
          if (isKana) setWritingScript(null);else setWritingLevel(null);
        },
        className: "nm-btn nm-btn-ghost",
        style: {
          marginBottom: 8
        }
      }, /*#__PURE__*/React.createElement(ChevronRight, {
        size: 13,
        style: {
          transform: "rotate(180deg)"
        },
        "aria-hidden": "true"
      }), " ", scriptTitle, writingLevel ? " · " + writingLevel.label : ""), isKana && /*#__PURE__*/React.createElement("div", {
        role: "tablist",
        "aria-label": "Kelompok huruf",
        style: {
          display: "flex",
          gap: 6,
          flexWrap: "wrap",
          marginBottom: 10
        }
      }, GROUPS.map(function (g) {
        return /*#__PURE__*/React.createElement("button", {
          key: g.id,
          role: "tab",
          "aria-selected": writingGroup === g.id,
          onClick: function onClick() {
            return setWritingGroup(g.id);
          },
          className: "nm-btn nm-btn-sm " + (writingGroup === g.id ? "nm-btn-primary" : "nm-btn-secondary")
        }, g.label, " (", kset[g.id].length, ")");
      })), /*#__PURE__*/React.createElement("div", {
        style: {
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 8,
          marginBottom: 10,
          flexWrap: "wrap"
        }
      }, /*#__PURE__*/React.createElement("p", {
        style: {
          fontSize: 12,
          color: "var(--text-secondary)",
          margin: 0
        }
      }, "Pilih karakter untuk ditulis \xB7 ", /*#__PURE__*/React.createElement("b", {
        style: {
          color: "var(--matcha)"
        }
      }, doneInList), "/", chars.length, " selesai"), /*#__PURE__*/React.createElement("button", {
        onClick: function onClick() {
          return chars.length && setWritingChar(chars[Math.floor(Math.random() * chars.length)]);
        },
        className: "nm-btn nm-btn-outline nm-btn-sm"
      }, "\uD83C\uDFB2 Acak")), isKana && writingGroup === "dasar" ? /*#__PURE__*/React.createElement("div", {
        style: {
          display: "grid",
          gridTemplateColumns: "repeat(5, minmax(0, 1fr))",
          gap: 8
        }
      }, kset.rows.flatMap(function (row, ri) {
        return row.map(function (e, ci) {
          return cell(e, "".concat(ri, "-").concat(ci));
        });
      })) : isKana ? /*#__PURE__*/React.createElement("div", {
        style: {
          display: "grid",
          gridTemplateColumns: "repeat(5, minmax(0, 1fr))",
          gap: 8
        }
      }, kset[writingGroup].map(function (e, i) {
        return cell(e, i);
      })) : /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
        style: {
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(54px, 1fr))",
          gap: 8
        }
      }, chars.slice(0, writingVisible).map(function (c) {
        return cell({
          ch: c,
          title: typeof KANJI_CONTENT !== "undefined" && KANJI_CONTENT[c] && KANJI_CONTENT[c].arti || c
        }, c);
      })), writingVisible < chars.length && /*#__PURE__*/React.createElement("div", {
        style: {
          textAlign: "center",
          marginTop: 12
        }
      }, /*#__PURE__*/React.createElement("button", {
        onClick: function onClick() {
          return setWritingVisible(function (v) {
            return v + 60;
          });
        },
        className: "nm-btn nm-btn-secondary"
      }, "Tampilkan lebih banyak (", chars.length - writingVisible, " lagi)"))));
    }
    if (latihanMode === "matching") {
      if (!matchingLevel) {
        return /*#__PURE__*/React.createElement("div", {
          style: {
            display: "flex",
            flexDirection: "column",
            gap: 10
          }
        }, /*#__PURE__*/React.createElement("button", {
          onClick: function onClick() {
            setLatihanMode(null);
            exitMatching();
          },
          className: "nm-btn nm-btn-ghost",
          style: {
            alignSelf: "flex-start",
            marginBottom: 2
          }
        }, /*#__PURE__*/React.createElement(ChevronRight, {
          size: 14,
          style: {
            transform: "rotate(180deg)"
          },
          "aria-hidden": "true"
        }), " Ganti jenis latihan"), /*#__PURE__*/React.createElement("p", {
          style: {
            fontSize: 12.5,
            color: "var(--text-secondary)",
            margin: "0 0 4px"
          }
        }, "Pilih level untuk kuis pencocokan:"), LEVELS.map(function (l, i) {
          var colors = ["sakura", "sora", "matcha", "momiji"];
          var col = colors[i];
          return /*#__PURE__*/React.createElement("div", {
            key: l.id,
            className: "nm-card nm-card-tap",
            style: {
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: 12
            },
            onClick: function onClick() {
              return setMatchingLevel(l);
            }
          }, /*#__PURE__*/React.createElement("div", {
            style: {
              width: 44,
              height: 40,
              borderRadius: 12,
              background: "var(--".concat(col, ")"),
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
              color: "#fff",
              fontWeight: 700,
              fontFamily: "'Shippori Mincho', serif",
              fontSize: l.label.length > 2 ? 12 : 16,
              whiteSpace: "nowrap",
              padding: "0 2px"
            }
          }, l.label), /*#__PURE__*/React.createElement("div", {
            style: {
              flex: 1
            }
          }, /*#__PURE__*/React.createElement("p", {
            style: {
              fontSize: 14,
              fontWeight: 700,
              margin: 0
            }
          }, l.name), /*#__PURE__*/React.createElement("p", {
            style: {
              fontSize: 11.5,
              color: "var(--text-secondary)",
              margin: "2px 0 0"
            }
          }, "Kanji & kosakata level ini")), /*#__PURE__*/React.createElement(ChevronRight, {
            size: 16,
            color: "var(--text-secondary)",
            "aria-hidden": "true"
          }));
        }));
      }
      if (!matchingType) {
        return /*#__PURE__*/React.createElement("div", {
          style: {
            display: "flex",
            flexDirection: "column",
            gap: 10
          }
        }, /*#__PURE__*/React.createElement("button", {
          onClick: function onClick() {
            return setMatchingLevel(null);
          },
          className: "nm-btn nm-btn-ghost",
          style: {
            alignSelf: "flex-start",
            marginBottom: 2
          }
        }, /*#__PURE__*/React.createElement(ChevronRight, {
          size: 14,
          style: {
            transform: "rotate(180deg)"
          },
          "aria-hidden": "true"
        }), " Ganti level"), /*#__PURE__*/React.createElement("p", {
          style: {
            fontSize: 12.5,
            color: "var(--text-secondary)",
            margin: "0 0 4px"
          }
        }, /*#__PURE__*/React.createElement("b", {
          className: "nm-title",
          style: {
            color: "var(--ink)"
          }
        }, matchingLevel.label), " \u2014 mau cocokkan apa?"), /*#__PURE__*/React.createElement("div", {
          className: "nm-card nm-card-tap",
          style: {
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            gap: 12
          },
          onClick: function onClick() {
            return startMatching(matchingLevel, "kanji");
          }
        }, /*#__PURE__*/React.createElement("div", {
          style: {
            width: 40,
            height: 40,
            borderRadius: 12,
            background: "var(--sora-tint)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0
          }
        }, /*#__PURE__*/React.createElement(Book, {
          size: 18,
          color: "var(--sora)",
          "aria-hidden": "true"
        })), /*#__PURE__*/React.createElement("div", {
          style: {
            flex: 1
          }
        }, /*#__PURE__*/React.createElement("p", {
          style: {
            fontSize: 14,
            fontWeight: 700,
            margin: 0
          }
        }, "\u6F22\u5B57 (Kanji)"), /*#__PURE__*/React.createElement("p", {
          style: {
            fontSize: 11.5,
            color: "var(--text-secondary)",
            margin: "2px 0 0"
          }
        }, "Cocokkan kanji dengan artinya")), /*#__PURE__*/React.createElement(ChevronRight, {
          size: 16,
          color: "var(--text-secondary)",
          "aria-hidden": "true"
        })), /*#__PURE__*/React.createElement("div", {
          className: "nm-card nm-card-tap",
          style: {
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            gap: 12
          },
          onClick: function onClick() {
            return startMatching(matchingLevel, "kosakata");
          }
        }, /*#__PURE__*/React.createElement("div", {
          style: {
            width: 40,
            height: 40,
            borderRadius: 12,
            background: "var(--matcha-tint)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0
          }
        }, /*#__PURE__*/React.createElement(BookOpen, {
          size: 18,
          color: "var(--matcha)",
          "aria-hidden": "true"
        })), /*#__PURE__*/React.createElement("div", {
          style: {
            flex: 1
          }
        }, /*#__PURE__*/React.createElement("p", {
          style: {
            fontSize: 14,
            fontWeight: 700,
            margin: 0
          }
        }, "\u8A9E\u5F59 (Kosakata)"), /*#__PURE__*/React.createElement("p", {
          style: {
            fontSize: 11.5,
            color: "var(--text-secondary)",
            margin: "2px 0 0"
          }
        }, "Cocokkan kata dengan artinya")), /*#__PURE__*/React.createElement(ChevronRight, {
          size: 16,
          color: "var(--text-secondary)",
          "aria-hidden": "true"
        })));
      }
      return /*#__PURE__*/React.createElement("div", {
        className: "nm-card"
      }, /*#__PURE__*/React.createElement(Tape, {
        color: "var(--yuzu)"
      }), /*#__PURE__*/React.createElement("button", {
        onClick: exitMatching,
        className: "nm-btn nm-btn-ghost",
        style: {
          marginBottom: 10
        }
      }, /*#__PURE__*/React.createElement(ChevronRight, {
        size: 13,
        style: {
          transform: "rotate(180deg)"
        },
        "aria-hidden": "true"
      }), " ", matchingLevel.label, " \xB7 ", matchingType === "kanji" ? "Kanji" : "Kosakata"), /*#__PURE__*/React.createElement("p", {
        style: {
          fontSize: 12.5,
          color: "var(--text-secondary)",
          margin: "0 0 12px"
        }
      }, "Tarik dari kartu kiri ke pasangannya di kanan."), /*#__PURE__*/React.createElement(MatchingQuiz, {
        pairs: matchingPairs
      }), /*#__PURE__*/React.createElement("div", {
        style: {
          display: "flex",
          gap: 8,
          marginTop: 14,
          justifyContent: "center",
          flexWrap: "wrap"
        }
      }, /*#__PURE__*/React.createElement("button", {
        onClick: function onClick() {
          return startMatching(matchingLevel, matchingType);
        },
        className: "nm-btn nm-btn-outline"
      }, /*#__PURE__*/React.createElement(Link2, {
        size: 14,
        "aria-hidden": "true"
      }), " Acak ulang"), /*#__PURE__*/React.createElement("button", {
        onClick: function onClick() {
          return setMatchingType(null);
        },
        className: "nm-btn nm-btn-secondary"
      }, "Ganti jenis")));
    }
    if (latihanMode === "ujian") {
      // N2 and N1 are shown as separate mock-test levels here, even though the learning
      // materials (kanji/vocab/grammar) still use a single combined "n2n1" LEVELS entry.
      var EXAM_LEVEL_META = {
        n2: {
          label: "N2",
          name: "Mahir (N2)"
        },
        n1: {
          label: "N1",
          name: "Mahir (N1)"
        }
      };
      var examLevelInfo = function examLevelInfo(id) {
        return LEVELS.find(function (l) {
          return l.id === id;
        }) || EXAM_LEVEL_META[id];
      };
      var ujianCatInfo = UJIAN_CATEGORIES.find(function (c) {
        return c.id === ujianCategory;
      });
      if (!ujianCatInfo) {
        var catStyle = {
          mojigoi: {
            color: "sakura",
            Icon: PenLine
          },
          dokkai: {
            color: "sora",
            Icon: BookOpen
          },
          choukai: {
            color: "matcha",
            Icon: Volume2
          }
        };
        return /*#__PURE__*/React.createElement("div", {
          style: {
            display: "flex",
            flexDirection: "column",
            gap: 10
          }
        }, /*#__PURE__*/React.createElement("button", {
          onClick: function onClick() {
            setLatihanMode(null);
            setUjianCategory(null);
            setUjianLevel(null);
            setUjianYear(null);
          },
          className: "nm-btn nm-btn-ghost",
          style: {
            alignSelf: "flex-start",
            marginBottom: 2
          }
        }, /*#__PURE__*/React.createElement(ChevronRight, {
          size: 14,
          style: {
            transform: "rotate(180deg)"
          },
          "aria-hidden": "true"
        }), " Ganti jenis latihan"), /*#__PURE__*/React.createElement("p", {
          style: {
            fontSize: 12.5,
            color: "var(--text-secondary)",
            margin: "0 0 4px"
          }
        }, "Pilih jenis latihan JLPT:"), UJIAN_CATEGORIES.map(function (cat) {
          var _catStyle$cat$id = catStyle[cat.id],
            color = _catStyle$cat$id.color,
            Icon = _catStyle$cat$id.Icon;
          return /*#__PURE__*/React.createElement("div", {
            key: cat.id,
            className: "nm-card nm-card-tap",
            style: {
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: 12
            },
            onClick: function onClick() {
              return setUjianCategory(cat.id);
            }
          }, /*#__PURE__*/React.createElement("div", {
            style: {
              width: 40,
              height: 40,
              borderRadius: 12,
              background: "var(--".concat(color, "-tint)"),
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0
            }
          }, /*#__PURE__*/React.createElement(Icon, {
            size: 18,
            color: "var(--".concat(color, ")"),
            "aria-hidden": "true"
          })), /*#__PURE__*/React.createElement("div", {
            style: {
              flex: 1
            }
          }, /*#__PURE__*/React.createElement("p", {
            style: {
              fontSize: 14,
              fontWeight: 700,
              margin: 0
            }
          }, cat.title), /*#__PURE__*/React.createElement("p", {
            style: {
              fontSize: 11.5,
              color: "var(--text-secondary)",
              margin: "2px 0 0"
            }
          }, cat.sub)), /*#__PURE__*/React.createElement(ChevronRight, {
            size: 16,
            color: "var(--text-secondary)",
            "aria-hidden": "true"
          }));
        }));
      }
      if (!ujianLevel) {
        return /*#__PURE__*/React.createElement("div", {
          style: {
            display: "flex",
            flexDirection: "column",
            gap: 10
          }
        }, /*#__PURE__*/React.createElement("button", {
          onClick: function onClick() {
            setLatihanMode(null);
            setUjianCategory(null);
            setUjianLevel(null);
            setUjianYear(null);
          },
          className: "nm-btn nm-btn-ghost",
          style: {
            alignSelf: "flex-start",
            marginBottom: 2
          }
        }, /*#__PURE__*/React.createElement(ChevronRight, {
          size: 14,
          style: {
            transform: "rotate(180deg)"
          },
          "aria-hidden": "true"
        }), " Ganti jenis latihan"), /*#__PURE__*/React.createElement("p", {
          style: {
            fontSize: 12.5,
            color: "var(--text-secondary)",
            margin: "0 0 4px"
          }
        }, /*#__PURE__*/React.createElement("b", {
          className: "nm-title",
          style: {
            color: "var(--ink)"
          }
        }, ujianCatInfo.title), " \u2014 pilih level ujian JLPT:"), ["n5", "n4", "n3", "n2", "n1"].map(function (lvlId) {
          var lvl = examLevelInfo(lvlId);
          var latihanCount = getLatihanYears(lvlId, ujianCatInfo.section).length;
          var hasLatihan = latihanCount > 0;
          var colors = {
            n5: "sakura",
            n4: "sora",
            n3: "matcha",
            n2: "yuzu",
            n1: "momiji"
          };
          return /*#__PURE__*/React.createElement("div", {
            key: lvlId,
            className: hasLatihan ? "nm-card nm-card-tap" : "nm-card",
            style: {
              cursor: hasLatihan ? "pointer" : "default",
              display: "flex",
              alignItems: "center",
              gap: 12,
              opacity: hasLatihan ? 1 : 0.5
            },
            onClick: function onClick() {
              return hasLatihan && setUjianLevel(lvlId);
            }
          }, /*#__PURE__*/React.createElement("div", {
            style: {
              width: 40,
              height: 40,
              borderRadius: 12,
              background: "var(--".concat(colors[lvlId], ")"),
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
              color: "#fff",
              fontWeight: 700,
              fontFamily: "'Shippori Mincho', serif"
            }
          }, lvl.label), /*#__PURE__*/React.createElement("div", {
            style: {
              flex: 1
            }
          }, /*#__PURE__*/React.createElement("p", {
            style: {
              fontSize: 14,
              fontWeight: 700,
              margin: 0
            }
          }, lvl.name), /*#__PURE__*/React.createElement("p", {
            style: {
              fontSize: 11.5,
              color: "var(--text-secondary)",
              margin: "2px 0 0"
            }
          }, hasLatihan ? "".concat(latihanCount, " latihan tersedia") : "Segera hadir")), hasLatihan && /*#__PURE__*/React.createElement(ChevronRight, {
            size: 16,
            color: "var(--text-secondary)",
            "aria-hidden": "true"
          }));
        }));
      }
      if (!ujianYear) {
        var lvl = examLevelInfo(ujianLevel);
        var latihanYears = getLatihanYears(ujianLevel, ujianCatInfo.section);
        var openLatihan = function openLatihan(yearKey) {
          setUjianYear(yearKey);
          startUjian(ujianCatInfo.section, false, ujianLevel, yearKey);
        };
        return /*#__PURE__*/React.createElement("div", {
          style: {
            display: "flex",
            flexDirection: "column",
            gap: 10
          }
        }, /*#__PURE__*/React.createElement("button", {
          onClick: function onClick() {
            return setUjianLevel(null);
          },
          className: "nm-btn nm-btn-ghost",
          style: {
            alignSelf: "flex-start",
            marginBottom: 2
          }
        }, /*#__PURE__*/React.createElement(ChevronRight, {
          size: 14,
          style: {
            transform: "rotate(180deg)"
          },
          "aria-hidden": "true"
        }), " Ganti level"), /*#__PURE__*/React.createElement("p", {
          style: {
            fontSize: 12.5,
            color: "var(--text-secondary)",
            margin: "0 0 4px"
          }
        }, /*#__PURE__*/React.createElement("b", {
          className: "nm-title",
          style: {
            color: "var(--ink)"
          }
        }, ujianCatInfo.title, " \xB7 ", lvl.label), " \u2014 pilih latihan:"), /*#__PURE__*/React.createElement("div", {
          className: "nm-yeargrid",
          style: {
            display: "grid",
            gridTemplateColumns: "repeat(3, minmax(0,1fr))",
            gap: 10
          }
        }, latihanYears.map(function (yearKey, i) {
          return /*#__PURE__*/React.createElement("div", {
            key: yearKey,
            className: "nm-card nm-card-tap",
            style: {
              cursor: "pointer",
              textAlign: "center",
              padding: "1rem 0.5rem"
            },
            onClick: function onClick() {
              return openLatihan(yearKey);
            }
          }, /*#__PURE__*/React.createElement("p", {
            className: "nm-title",
            style: {
              fontSize: 18,
              margin: 0
            }
          }, "Latihan ", i + 1), /*#__PURE__*/React.createElement("p", {
            style: {
              fontSize: 11.5,
              color: "var(--text-secondary)",
              margin: "4px 0 0"
            }
          }, normalizeUjianSection(ujianLevel, yearKey, ujianCatInfo.section).length, " soal"));
        })));
      }
      var hasExamData = !!(JLPT_EXAM_CONTENT[ujianLevel] || {})[String(ujianYear)];
      if (!hasExamData) {
        return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("button", {
          onClick: function onClick() {
            return setUjianYear(null);
          },
          className: "nm-btn nm-btn-ghost",
          style: {
            marginBottom: 12
          }
        }, /*#__PURE__*/React.createElement(ChevronRight, {
          size: 14,
          style: {
            transform: "rotate(180deg)"
          },
          "aria-hidden": "true"
        }), " ", examLevelInfo(ujianLevel).label, " \xB7 ", ujianYear), /*#__PURE__*/React.createElement("div", {
          className: "nm-card",
          style: {
            textAlign: "center",
            padding: "2rem 1rem"
          }
        }, /*#__PURE__*/React.createElement(Book, {
          size: 32,
          color: "var(--text-muted)",
          "aria-hidden": "true",
          style: {
            marginBottom: 10
          }
        }), /*#__PURE__*/React.createElement("p", {
          style: {
            fontSize: 14,
            fontWeight: 700,
            margin: "0 0 6px"
          }
        }, "Belum ada soal untuk ", examLevelInfo(ujianLevel).label, " \xB7 ", ujianYear), /*#__PURE__*/React.createElement("p", {
          style: {
            fontSize: 12.5,
            color: "var(--text-secondary)",
            margin: 0,
            lineHeight: 1.6
          }
        }, "Soal untuk tahun ini akan segera ditambahkan.")));
      }
      if (!ujianSection) {
        var countMojigoi = normalizeUjianSection(ujianLevel, String(ujianYear), "mojigoi").length;
        var countBunpou = normalizeUjianSection(ujianLevel, String(ujianYear), "bunpou_dokkai").length;
        var countChoukai = normalizeUjianSection(ujianLevel, String(ujianYear), "choukai").length;
        return /*#__PURE__*/React.createElement("div", {
          style: {
            display: "flex",
            flexDirection: "column",
            gap: 10
          }
        }, /*#__PURE__*/React.createElement("button", {
          onClick: function onClick() {
            return setUjianYear(null);
          },
          className: "nm-btn nm-btn-ghost",
          style: {
            alignSelf: "flex-start",
            marginBottom: 2
          }
        }, /*#__PURE__*/React.createElement(ChevronRight, {
          size: 14,
          style: {
            transform: "rotate(180deg)"
          },
          "aria-hidden": "true"
        }), " Ganti tahun"), /*#__PURE__*/React.createElement("div", {
          className: "nm-card",
          style: {
            textAlign: "center"
          }
        }, /*#__PURE__*/React.createElement(Tape, {
          color: "var(--momiji)"
        }), /*#__PURE__*/React.createElement("p", {
          className: "nm-title",
          style: {
            fontSize: 18,
            margin: "4px 0 10px"
          }
        }, examLevelInfo(ujianLevel).label, " \xB7 ", ujianYear, " ", /*#__PURE__*/React.createElement("span", {
          style: {
            fontSize: 9.5,
            fontWeight: 700,
            color: "var(--momiji)",
            background: "var(--momiji-tint)",
            borderRadius: 6,
            padding: "2px 6px",
            marginLeft: 4,
            verticalAlign: "middle"
          }
        }, "MOCK TEST")), /*#__PURE__*/React.createElement("div", {
          className: "nm-section-summary-grid"
        }, /*#__PURE__*/React.createElement("div", {
          className: "nm-section-summary-item"
        }, /*#__PURE__*/React.createElement("div", {
          className: "nm-section-summary-icon"
        }, /*#__PURE__*/React.createElement(PenLine, {
          size: 16,
          color: "var(--sakura)",
          "aria-hidden": "true"
        })), /*#__PURE__*/React.createElement("p", {
          className: "nm-section-summary-count"
        }, countMojigoi), /*#__PURE__*/React.createElement("p", {
          className: "nm-section-summary-label"
        }, "\u6587\u5B57\u30FB\u8A9E\u5F59", /*#__PURE__*/React.createElement("br", null), "20 menit")), /*#__PURE__*/React.createElement("div", {
          className: "nm-section-summary-item"
        }, /*#__PURE__*/React.createElement("div", {
          className: "nm-section-summary-icon"
        }, /*#__PURE__*/React.createElement(BookOpen, {
          size: 16,
          color: "var(--sora)",
          "aria-hidden": "true"
        })), /*#__PURE__*/React.createElement("p", {
          className: "nm-section-summary-count"
        }, countBunpou), /*#__PURE__*/React.createElement("p", {
          className: "nm-section-summary-label"
        }, "\u6587\u6CD5\u30FB\u8AAD\u89E3", /*#__PURE__*/React.createElement("br", null), "40 menit")), /*#__PURE__*/React.createElement("div", {
          className: "nm-section-summary-item"
        }, /*#__PURE__*/React.createElement("div", {
          className: "nm-section-summary-icon"
        }, /*#__PURE__*/React.createElement(Volume2, {
          size: 16,
          color: "var(--matcha)",
          "aria-hidden": "true"
        })), /*#__PURE__*/React.createElement("p", {
          className: "nm-section-summary-count"
        }, countChoukai), /*#__PURE__*/React.createElement("p", {
          className: "nm-section-summary-label"
        }, "\u8074\u89E3", /*#__PURE__*/React.createElement("br", null), "20 menit"))), /*#__PURE__*/React.createElement("p", {
          style: {
            fontSize: 12,
            color: "var(--text-secondary)",
            margin: "0 0 16px",
            lineHeight: 1.7
          }
        }, "Ketiga bagian dikerjakan berurutan tanpa jeda, seperti ujian sungguhan \u2014 pembahasan baru muncul setelah semuanya selesai."), /*#__PURE__*/React.createElement("button", {
          onClick: startUjianSimulation,
          className: "nm-btn nm-btn-primary",
          style: {
            fontSize: 14.5,
            padding: "12px 26px"
          }
        }, /*#__PURE__*/React.createElement(ClockIcon, {
          size: 16,
          "aria-hidden": "true"
        }), " Mulai Simulasi Ujian")));
      }
      var uq = ujianQuestions[ujianIdx];
      return /*#__PURE__*/React.createElement("div", {
        className: "nm-card"
      }, /*#__PURE__*/React.createElement(Tape, {
        color: "var(--momiji)"
      }), /*#__PURE__*/React.createElement("button", {
        onClick: exitUjianSection,
        className: "nm-btn nm-btn-ghost",
        style: {
          marginBottom: 10
        }
      }, /*#__PURE__*/React.createElement(ChevronRight, {
        size: 13,
        style: {
          transform: "rotate(180deg)"
        },
        "aria-hidden": "true"
      }), " ", (UJIAN_CATEGORIES.find(function (c) {
        return c.section === ujianSection;
      }) || {}).title, " \xB7 ", examLevelInfo(ujianLevel).label, " \xB7 Latihan ", getLatihanYears(ujianLevel, ujianSection).indexOf(String(ujianYear)) + 1), ujianSimMode && !ujianDone && function () {
        var secDef = UJIAN_SECTIONS.find(function (s) {
          return s.id === ujianSection;
        });
        var totalSecs = (secDef ? secDef.simMinutes : 0) * 60;
        var pctLeft = totalSecs > 0 ? ujianSimTimeLeft / totalSecs * 100 : 0;
        var low = ujianSimTimeLeft <= 60;
        return /*#__PURE__*/React.createElement("div", {
          className: "nm-timer-chip",
          style: {
            display: "inline-flex",
            alignItems: "center",
            gap: 8,
            background: low ? "var(--sakura-tint)" : "var(--momiji-tint)",
            border: "2px solid ".concat(low ? "var(--sakura)" : "var(--momiji)"),
            borderRadius: 14,
            padding: "6px 12px 6px 6px",
            marginBottom: 12,
            boxShadow: "var(--shadow-xs)",
            transition: "background 0.3s ease, border-color 0.3s ease"
          }
        }, /*#__PURE__*/React.createElement(Ring, {
          pct: pctLeft,
          size: 34,
          color: low ? "var(--sakura)" : "var(--momiji)",
          showLabel: false
        }), /*#__PURE__*/React.createElement("span", {
          style: {
            fontSize: 14,
            fontWeight: 700,
            color: low ? "var(--sakura)" : "var(--momiji)",
            fontVariantNumeric: "tabular-nums",
            display: "inline-flex",
            alignItems: "center",
            gap: 4,
            animation: low ? "nm-flamePulse 1s ease-in-out infinite" : "none"
          }
        }, /*#__PURE__*/React.createElement(ClockIcon, {
          size: 13,
          "aria-hidden": "true"
        }), String(Math.floor(ujianSimTimeLeft / 60)).padStart(2, "0"), ":", String(ujianSimTimeLeft % 60).padStart(2, "0")), /*#__PURE__*/React.createElement("span", {
          style: {
            fontSize: 11,
            color: "var(--text-secondary)"
          }
        }, "tersisa \u2014 ", secDef ? secDef.label : ""));
      }(), ujianQuestions.length === 0 ? /*#__PURE__*/React.createElement("p", {
        style: {
          fontSize: 13,
          color: "var(--text-secondary)"
        }
      }, "Belum ada soal di bagian ini.") : !ujianDone ? /*#__PURE__*/React.createElement(React.Fragment, null, function () {
        var groups = [];
        ujianQuestions.forEach(function (q, idx) {
          var last = groups[groups.length - 1];
          if (last && last.mondai === q.mondai) last.indices.push(idx);else groups.push({
            mondai: q.mondai,
            indices: [idx]
          });
        });
        var answeredCount = Object.keys(ujianAnswersMap).length;
        var totalCount = ujianQuestions.length;
        var answeredPct = totalCount > 0 ? answeredCount / totalCount * 100 : 0;
        return /*#__PURE__*/React.createElement("div", {
          style: {
            background: "var(--paper)",
            border: "2px solid var(--line)",
            borderRadius: 14,
            padding: "10px 12px",
            marginBottom: 14
          }
        }, /*#__PURE__*/React.createElement("div", {
          className: "nm-progress-summary"
        }, /*#__PURE__*/React.createElement("span", {
          className: "nm-progress-summary-label"
        }, "Progres soal"), /*#__PURE__*/React.createElement("span", {
          className: "nm-progress-summary-label",
          style: {
            color: "var(--momiji)"
          }
        }, answeredCount, " / ", totalCount, " terjawab")), /*#__PURE__*/React.createElement("div", {
          className: "nm-progress-track"
        }, /*#__PURE__*/React.createElement("div", {
          className: "nm-progress-fill",
          style: {
            width: "".concat(answeredPct, "%")
          }
        })), /*#__PURE__*/React.createElement("div", {
          className: "nm-navgrid-legend"
        }, /*#__PURE__*/React.createElement("span", {
          className: "nm-navgrid-legend-item"
        }, /*#__PURE__*/React.createElement("span", {
          className: "nm-navgrid-swatch",
          style: {
            background: "var(--momiji)"
          }
        }), " Sudah dijawab"), /*#__PURE__*/React.createElement("span", {
          className: "nm-navgrid-legend-item"
        }, /*#__PURE__*/React.createElement("span", {
          className: "nm-navgrid-swatch",
          style: {
            background: "var(--card-bg)",
            border: "2px solid var(--line)"
          }
        }), " Belum dijawab"), /*#__PURE__*/React.createElement("span", {
          className: "nm-navgrid-legend-item"
        }, /*#__PURE__*/React.createElement("span", {
          className: "nm-navgrid-swatch",
          style: {
            background: "var(--card-bg)",
            border: "2px solid var(--momiji)"
          }
        }), " Soal saat ini")), groups.map(function (g, gi) {
          return /*#__PURE__*/React.createElement("div", {
            key: gi,
            style: {
              marginBottom: gi < groups.length - 1 ? 8 : 0
            }
          }, /*#__PURE__*/React.createElement("p", {
            style: {
              fontSize: 10.5,
              fontWeight: 700,
              color: "var(--text-secondary)",
              margin: "0 0 4px"
            }
          }, g.mondai), /*#__PURE__*/React.createElement("div", {
            style: {
              display: "flex",
              flexWrap: "wrap",
              gap: 6
            }
          }, g.indices.map(function (idx) {
            var answered = ujianAnswersMap[idx] !== undefined;
            var isCurrent = idx === ujianIdx;
            return /*#__PURE__*/React.createElement("button", {
              key: idx,
              onClick: function onClick() {
                return goToUjianQuestion(idx);
              },
              "aria-label": "Soal ".concat(idx + 1).concat(answered ? " (sudah dijawab)" : " (belum dijawab)").concat(isCurrent ? " — sedang dibuka" : ""),
              "aria-current": isCurrent ? "true" : undefined,
              className: "nm-ujian-navdot" + (isCurrent ? " nm-ujian-navdot-current" : ""),
              style: {
                width: 32,
                height: 32,
                borderRadius: 8,
                fontSize: 12,
                fontWeight: 700,
                cursor: "pointer",
                border: isCurrent ? "2px solid var(--momiji)" : "2px solid var(--line)",
                background: answered ? "var(--momiji)" : "var(--card-bg)",
                color: answered ? "#fff" : "var(--ink)"
              }
            }, idx + 1);
          })));
        }));
      }(), /*#__PURE__*/React.createElement("div", {
        key: ujianIdx,
        className: "nm-tab-content"
      }, /*#__PURE__*/React.createElement("div", {
        className: "nm-q-eyebrow"
      }, /*#__PURE__*/React.createElement("span", {
        className: "nm-q-mondai-tag"
      }, uq.mondai), /*#__PURE__*/React.createElement("span", {
        className: "nm-q-counter"
      }, uq.desc ? "".concat(uq.desc, " \u2014 ") : "", "Soal ", ujianIdx + 1, " dari ", ujianQuestions.length)), uq.passage && !uq.audio && /*#__PURE__*/React.createElement("div", {
        style: {
          background: "var(--matcha-tint)",
          borderRadius: 12,
          padding: "10px 12px",
          marginBottom: 12,
          fontSize: 13,
          lineHeight: 1.8,
          whiteSpace: "pre-line"
        }
      }, renderWithUnderline(uq.passage)), uq.table && /*#__PURE__*/React.createElement("div", {
        style: {
          marginBottom: 12,
          overflowX: "auto"
        }
      }, /*#__PURE__*/React.createElement("table", {
        style: {
          width: "100%",
          borderCollapse: "collapse",
          fontSize: 12.5,
          background: "#fff",
          border: "1.5px solid var(--line)",
          borderRadius: 10,
          overflow: "hidden"
        }
      }, /*#__PURE__*/React.createElement("thead", null, /*#__PURE__*/React.createElement("tr", null, uq.table.headers.map(function (h, hi) {
        return /*#__PURE__*/React.createElement("th", {
          key: hi,
          style: {
            textAlign: "left",
            padding: "6px 8px",
            background: "var(--matcha-tint)",
            borderBottom: "1.5px solid var(--line)",
            whiteSpace: "nowrap"
          }
        }, h);
      }))), /*#__PURE__*/React.createElement("tbody", null, uq.table.rows.map(function (row, ri) {
        return /*#__PURE__*/React.createElement("tr", {
          key: ri
        }, row.map(function (cell, ci) {
          return /*#__PURE__*/React.createElement("td", {
            key: ci,
            style: {
              padding: "6px 8px",
              borderBottom: "1px solid var(--line)",
              verticalAlign: "top"
            }
          }, cell);
        }));
      }))), uq.tableFooter && /*#__PURE__*/React.createElement("div", {
        style: {
          fontSize: 12,
          color: "var(--text-secondary)",
          marginTop: 8,
          whiteSpace: "pre-line",
          lineHeight: 1.7
        }
      }, uq.tableFooter)), uq.image && /*#__PURE__*/React.createElement("div", {
        style: {
          marginBottom: 12,
          textAlign: "center"
        }
      }, /*#__PURE__*/React.createElement("img", {
        src: uq.image,
        alt: "Ilustrasi soal",
        style: {
          maxWidth: "100%",
          maxHeight: 260,
          borderRadius: 12,
          border: "1.5px solid var(--line)",
          background: "#fff"
        }
      })), uq.audioSrc && /*#__PURE__*/React.createElement("div", {
        style: {
          marginBottom: 12
        }
      }, /*#__PURE__*/React.createElement(RealAudioClipPlayer, {
        src: uq.audioSrc,
        start: uq.audioStart,
        end: uq.audioEnd
      }), uq.dialogText && /*#__PURE__*/React.createElement("button", {
        onClick: function onClick() {
          return setShowUjianScript(function (s) {
            return !s;
          });
        },
        className: "nm-audioplayer-script-toggle"
      }, /*#__PURE__*/React.createElement(FileText, {
        size: 13,
        "aria-hidden": "true"
      }), " ", showUjianScript || ujianSel !== null ? "Sembunyikan teks" : "Susah dengar? Lihat teksnya"), (showUjianScript || ujianSel !== null) && uq.dialogText && /*#__PURE__*/React.createElement("div", {
        style: {
          background: "var(--momiji-tint)",
          borderRadius: 12,
          padding: "10px 12px",
          marginTop: 6,
          fontSize: 12.5,
          lineHeight: 1.8,
          whiteSpace: "pre-line"
        }
      }, /*#__PURE__*/React.createElement("p", {
        style: {
          fontSize: 11,
          fontWeight: 700,
          margin: "0 0 4px",
          color: "var(--momiji)"
        }
      }, "\u30B9\u30AF\u30EA\u30D7\u30C8\uFF1A"), uq.dialogText), !uq.dialogText && /*#__PURE__*/React.createElement("p", {
        style: {
          fontSize: 10.5,
          color: "var(--text-secondary)",
          margin: "6px 0 0",
          lineHeight: 1.5,
          display: "flex",
          alignItems: "flex-start",
          gap: 4
        }
      }, /*#__PURE__*/React.createElement(AlertTriangle, {
        size: 12,
        "aria-hidden": "true",
        style: {
          flexShrink: 0,
          marginTop: 1
        }
      }), " Skrip dialognya tidak diketahui \u2014 dengarkan langsung audio aslinya untuk menjawab.")), !uq.audioSrc && uq.audio && /*#__PURE__*/React.createElement("div", {
        style: {
          marginBottom: 12
        }
      }, /*#__PURE__*/React.createElement(AudioPlayerBar, {
        dialog: uq.audio
      }), uq.dialogText && /*#__PURE__*/React.createElement("button", {
        onClick: function onClick() {
          return setShowUjianScript(function (s) {
            return !s;
          });
        },
        className: "nm-audioplayer-script-toggle"
      }, /*#__PURE__*/React.createElement(FileText, {
        size: 13,
        "aria-hidden": "true"
      }), " ", showUjianScript || ujianSel !== null ? "Sembunyikan teks" : "Susah dengar? Lihat teksnya"), (showUjianScript || ujianSel !== null) && uq.dialogText && /*#__PURE__*/React.createElement("div", {
        style: {
          background: "var(--momiji-tint)",
          borderRadius: 12,
          padding: "10px 12px",
          marginTop: 6,
          fontSize: 12.5,
          lineHeight: 1.8,
          whiteSpace: "pre-line"
        }
      }, /*#__PURE__*/React.createElement("p", {
        style: {
          fontSize: 11,
          fontWeight: 700,
          margin: "0 0 4px",
          color: "var(--momiji)"
        }
      }, "\u30B9\u30AF\u30EA\u30D7\u30C8\uFF1A"), uq.dialogText)), uq.question && /*#__PURE__*/React.createElement("p", {
        style: {
          fontSize: 15,
          fontWeight: 700,
          margin: "0 0 10px"
        }
      }, uq.question), /*#__PURE__*/React.createElement("div", {
        className: "nm-choice-list",
        role: "radiogroup",
        "aria-label": "Pilihan jawaban"
      }, uq.choices.map(function (opt, i) {
        var isSel = i === ujianSel;
        return /*#__PURE__*/React.createElement("button", {
          key: i,
          onClick: function onClick() {
            return submitUjianAnswer(i);
          },
          role: "radio",
          "aria-checked": isSel,
          className: isSel ? "nm-choice nm-choice-selected" : "nm-choice"
        }, /*#__PURE__*/React.createElement("span", {
          className: "nm-choice-badge"
        }, String.fromCharCode(65 + i)), /*#__PURE__*/React.createElement("span", {
          className: "nm-choice-text"
        }, opt), isSel && /*#__PURE__*/React.createElement("span", {
          className: "nm-choice-check"
        }, /*#__PURE__*/React.createElement(Check, {
          size: 16,
          "aria-hidden": "true"
        })));
      }))), /*#__PURE__*/React.createElement("div", {
        style: {
          display: "flex",
          gap: 8,
          marginTop: 10,
          flexWrap: "wrap"
        }
      }, ujianIdx > 0 && /*#__PURE__*/React.createElement("button", {
        onClick: prevUjianQuestion,
        className: "nm-btn nm-btn-secondary"
      }, /*#__PURE__*/React.createElement(ChevronRight, {
        size: 14,
        style: {
          transform: "rotate(180deg)"
        },
        "aria-hidden": "true"
      }), " Sebelumnya"), ujianIdx + 1 < ujianQuestions.length && /*#__PURE__*/React.createElement("button", {
        onClick: nextUjianQuestion,
        className: "nm-btn nm-btn-primary"
      }, "Berikutnya ", /*#__PURE__*/React.createElement(ChevronRight, {
        size: 14,
        "aria-hidden": "true"
      })), /*#__PURE__*/React.createElement("button", {
        onClick: submitUjianSection,
        className: "nm-btn nm-btn-outline",
        style: {
          marginLeft: "auto"
        }
      }, /*#__PURE__*/React.createElement(ListChecks, {
        size: 15,
        "aria-hidden": "true"
      }), " Submit (", Object.keys(ujianAnswersMap).length, "/", ujianQuestions.length, ")"))) : function () {
        if (!ujianSimAllDone) {
          return /*#__PURE__*/React.createElement("div", {
            style: {
              textAlign: "center",
              padding: "1rem 0"
            }
          }, /*#__PURE__*/React.createElement("p", {
            style: {
              fontSize: 13,
              color: "var(--text-secondary)"
            }
          }, "Melanjutkan ke bagian berikutnya\u2026"));
        }
        var totalScore = ujianSimResults.reduce(function (sum, r) {
          return sum + r.score;
        }, 0);
        var totalQuestions = ujianSimResults.reduce(function (sum, r) {
          return sum + r.questions.length;
        }, 0);
        var passedSim = totalQuestions > 0 && totalScore / totalQuestions >= 0.6;
        return /*#__PURE__*/React.createElement("div", {
          style: {
            textAlign: "center",
            padding: "1rem 0"
          }
        }, /*#__PURE__*/React.createElement("div", {
          style: {
            display: "flex",
            justifyContent: "center",
            marginBottom: 8
          }
        }, /*#__PURE__*/React.createElement(Ring, {
          pct: totalQuestions > 0 ? totalScore / totalQuestions * 100 : 0,
          size: 88,
          color: passedSim ? "var(--matcha)" : "var(--sakura)"
        })), /*#__PURE__*/React.createElement("p", {
          className: "nm-title",
          style: {
            fontSize: 24,
            margin: "4px 0 6px"
          }
        }, totalScore, " / ", totalQuestions, " benar"), /*#__PURE__*/React.createElement("p", {
          style: {
            fontSize: 13,
            color: passedSim ? "var(--matcha)" : "var(--sakura)",
            fontWeight: 700,
            margin: "0 0 10px"
          }
        }, ujianSimMode ? passedSim ? "✅ Selamat, simulasi ujian selesai!" : "Simulasi selesai — yuk pelajari lagi bagian yang masih salah." : passedSim ? "✅ Selamat, latihan selesai!" : "Latihan selesai — yuk pelajari lagi bagian yang masih salah."), /*#__PURE__*/React.createElement("div", {
          style: {
            display: "flex",
            gap: 10,
            justifyContent: "center",
            flexWrap: "wrap",
            margin: "0 0 14px"
          }
        }, ujianSimResults.map(function (r, i) {
          var secPct = r.questions.length > 0 ? r.score / r.questions.length * 100 : 0;
          var secOk = secPct >= 60;
          return /*#__PURE__*/React.createElement("div", {
            key: i,
            style: {
              background: "var(--paper)",
              border: "2px solid var(--line)",
              borderRadius: 12,
              padding: "8px 14px",
              minWidth: 90
            }
          }, /*#__PURE__*/React.createElement("p", {
            style: {
              fontSize: 11,
              color: "var(--text-secondary)",
              margin: "0 0 2px",
              fontWeight: 700
            }
          }, r.label), /*#__PURE__*/React.createElement("p", {
            style: {
              fontSize: 15,
              fontWeight: 700,
              margin: "0 0 5px"
            }
          }, r.score, " / ", r.questions.length), /*#__PURE__*/React.createElement("div", {
            style: {
              height: 5,
              borderRadius: 4,
              background: "var(--line)",
              overflow: "hidden"
            }
          }, /*#__PURE__*/React.createElement("div", {
            style: {
              height: "100%",
              width: "".concat(secPct, "%"),
              borderRadius: 4,
              background: secOk ? "var(--matcha)" : "var(--sakura)",
              transition: "width 0.6s cubic-bezier(0.34, 1.2, 0.64, 1)"
            }
          })));
        })), /*#__PURE__*/React.createElement("div", {
          style: {
            display: "flex",
            gap: 8,
            justifyContent: "center",
            flexWrap: "wrap",
            marginBottom: showUjianPembahasan ? 16 : 0
          }
        }, /*#__PURE__*/React.createElement("button", {
          onClick: function onClick() {
            return setShowUjianPembahasan(function (s) {
              return !s;
            });
          },
          className: "nm-btn",
          style: {
            background: "var(--card-bg)",
            color: "var(--sora)",
            border: "2px solid var(--sora)"
          }
        }, /*#__PURE__*/React.createElement(BookOpen, {
          size: 14,
          "aria-hidden": "true"
        }), " ", showUjianPembahasan ? "Tutup pembahasan" : "Lihat pembahasan lengkap"), /*#__PURE__*/React.createElement("button", {
          onClick: exitUjianSection,
          className: "nm-btn nm-btn-secondary"
        }, "Selesai")), showUjianPembahasan && /*#__PURE__*/React.createElement("div", {
          style: {
            textAlign: "left"
          }
        }, ujianSimResults.map(function (r, ri) {
          return /*#__PURE__*/React.createElement("div", {
            key: ri,
            style: {
              marginBottom: 14
            }
          }, /*#__PURE__*/React.createElement("p", {
            style: {
              fontSize: 13,
              fontWeight: 700,
              color: "var(--momiji)",
              margin: "0 0 8px"
            }
          }, r.label), r.questions.map(function (q, idx) {
            var selectedIdx = r.answersMap[idx];
            var wasAnswered = selectedIdx !== undefined;
            var selected = wasAnswered ? q.choices[selectedIdx] : undefined;
            var isCorrect = wasAnswered && selected === q.correct;
            return /*#__PURE__*/React.createElement("div", {
              key: idx,
              style: {
                borderRadius: 14,
                border: "2px solid ".concat(!wasAnswered ? "var(--line)" : isCorrect ? "var(--matcha)" : "var(--sakura)"),
                background: !wasAnswered ? "var(--card-bg)" : isCorrect ? "var(--matcha-tint)" : "var(--sakura-tint)",
                padding: "10px 12px",
                marginBottom: 10
              }
            }, /*#__PURE__*/React.createElement("div", {
              style: {
                display: "flex",
                alignItems: "flex-start",
                gap: 6,
                marginBottom: 6
              }
            }, !wasAnswered ? /*#__PURE__*/React.createElement(Circle, {
              size: 16,
              color: "var(--text-muted)",
              "aria-hidden": "true",
              style: {
                flexShrink: 0,
                marginTop: 2
              }
            }) : isCorrect ? /*#__PURE__*/React.createElement(Check, {
              size: 16,
              color: "var(--matcha)",
              "aria-hidden": "true",
              style: {
                flexShrink: 0,
                marginTop: 2
              }
            }) : /*#__PURE__*/React.createElement("span", {
              style: {
                color: "var(--sakura)",
                fontWeight: 700,
                flexShrink: 0
              }
            }, "\u2715"), /*#__PURE__*/React.createElement("p", {
              style: {
                fontSize: 12,
                fontWeight: 700,
                margin: 0,
                color: "var(--text-secondary)"
              }
            }, "Soal ", idx + 1, " \xB7 ", q.mondai)), q.hideInstruction ? /*#__PURE__*/React.createElement("p", {
              style: {
                fontSize: 13.5,
                fontWeight: 700,
                margin: "0 0 6px",
                lineHeight: 1.8
              }
            }, renderWithUnderline(q.passage)) : /*#__PURE__*/React.createElement("p", {
              style: {
                fontSize: 13.5,
                fontWeight: 700,
                margin: "0 0 6px"
              }
            }, q.question), /*#__PURE__*/React.createElement("p", {
              style: {
                fontSize: 12.5,
                margin: "0 0 3px"
              }
            }, wasAnswered ? /*#__PURE__*/React.createElement(React.Fragment, null, "Jawabanmu: ", /*#__PURE__*/React.createElement("b", {
              style: {
                color: isCorrect ? "var(--matcha)" : "var(--sakura)"
              }
            }, selected), !isCorrect && /*#__PURE__*/React.createElement(React.Fragment, null, " \xB7 Jawaban benar: ", /*#__PURE__*/React.createElement("b", {
              style: {
                color: "var(--matcha)"
              }
            }, q.correct))) : /*#__PURE__*/React.createElement(React.Fragment, null, "Belum dijawab \xB7 Jawaban benar: ", /*#__PURE__*/React.createElement("b", {
              style: {
                color: "var(--matcha)"
              }
            }, q.correct))), q.explanation && /*#__PURE__*/React.createElement("p", {
              style: {
                fontSize: 12,
                color: "var(--text-body)",
                margin: "6px 0 0",
                lineHeight: 1.6
              }
            }, "\uD83D\uDCA1 ", q.explanation), q.explainExtra && /*#__PURE__*/React.createElement("p", {
              style: {
                fontSize: 12,
                color: "var(--text-body)",
                margin: "6px 0 0",
                lineHeight: 1.6
              }
            }, "\uD83D\uDCDD Kalimat lengkap: ", q.explainExtra), !q.explanation && !q.explainExtra && /*#__PURE__*/React.createElement("p", {
              style: {
                fontSize: 11.5,
                color: "var(--text-muted)",
                margin: "6px 0 0",
                fontStyle: "italic"
              }
            }, "Penjelasan rinci tidak tersedia untuk soal ini (halaman pembahasan resmi tidak ada di sumber PDF)."));
          }));
        })));
      }());
    }
    if (latihanMode === "susun") {
      return /*#__PURE__*/React.createElement(SusunKataGame, {
        onExit: function onExit() {
          return setLatihanMode(null);
        }
      });
    }
    if (!examLevel) {
      return /*#__PURE__*/React.createElement("div", {
        style: {
          display: "flex",
          flexDirection: "column",
          gap: 10
        }
      }, /*#__PURE__*/React.createElement("button", {
        onClick: function onClick() {
          setLatihanMode(null);
          setUjianLevel(null);
          setUjianYear(null);
        },
        style: {
          display: "flex",
          alignItems: "center",
          gap: 4,
          background: "none",
          border: "none",
          color: "var(--text-secondary)",
          fontFamily: "'Zen Maru Gothic', sans-serif",
          fontSize: 12.5,
          fontWeight: 700,
          cursor: "pointer",
          padding: 0,
          marginBottom: 2
        }
      }, /*#__PURE__*/React.createElement(ChevronRight, {
        size: 14,
        style: {
          transform: "rotate(180deg)"
        },
        "aria-hidden": "true"
      }), " Ganti jenis latihan"), /*#__PURE__*/React.createElement("p", {
        style: {
          fontSize: 12.5,
          color: "var(--text-secondary)",
          margin: "0 0 4px"
        }
      }, "Pilih level untuk mulai latihan mengulang materi:"), LEVELS.map(function (l, i) {
        var colors = ["sakura", "sora", "matcha", "momiji"];
        var col = colors[i];
        return /*#__PURE__*/React.createElement("div", {
          key: l.id,
          className: "nm-card nm-card-tap",
          style: {
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            gap: 12
          },
          onClick: function onClick() {
            return setExamLevel(l);
          }
        }, /*#__PURE__*/React.createElement("div", {
          style: {
            width: 44,
            height: 40,
            borderRadius: 12,
            background: "var(--".concat(col, ")"),
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
            color: "#fff",
            fontWeight: 700,
            fontFamily: "'Shippori Mincho', serif",
            fontSize: l.label.length > 2 ? 12 : 16,
            whiteSpace: "nowrap",
            padding: "0 2px"
          }
        }, l.label), /*#__PURE__*/React.createElement("div", {
          style: {
            flex: 1
          }
        }, /*#__PURE__*/React.createElement("p", {
          style: {
            fontSize: 14,
            fontWeight: 700,
            margin: 0
          }
        }, l.name), /*#__PURE__*/React.createElement("p", {
          style: {
            fontSize: 11.5,
            color: "var(--text-secondary)",
            margin: "2px 0 0"
          }
        }, "3 bagian: Kosakata, Kanji, Grammar")), /*#__PURE__*/React.createElement(ChevronRight, {
          size: 16,
          color: "var(--text-secondary)",
          "aria-hidden": "true"
        }));
      }));
    }
    if (!examSection) {
      return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("button", {
        onClick: function onClick() {
          return setExamLevel(null);
        },
        style: {
          display: "flex",
          alignItems: "center",
          gap: 4,
          background: "none",
          border: "none",
          color: "var(--text-secondary)",
          fontFamily: "'Zen Maru Gothic', sans-serif",
          fontSize: 12.5,
          fontWeight: 700,
          cursor: "pointer",
          padding: 0,
          marginBottom: 12
        }
      }, /*#__PURE__*/React.createElement(ChevronRight, {
        size: 14,
        style: {
          transform: "rotate(180deg)"
        },
        "aria-hidden": "true"
      }), " Ganti level"), /*#__PURE__*/React.createElement("p", {
        style: {
          fontSize: 13,
          color: "var(--text-secondary)",
          margin: "0 0 12px"
        }
      }, /*#__PURE__*/React.createElement("b", {
        className: "nm-title",
        style: {
          color: "var(--ink)"
        }
      }, examLevel.label), " \u2014 pilih bagian yang mau dilatih:"), /*#__PURE__*/React.createElement("div", {
        style: {
          display: "flex",
          flexDirection: "column",
          gap: 10
        }
      }, sections.map(function (s) {
        var Icon = s.icon;
        var available = s.id === "kosakata" ? buildVocabPool(examLevel).length > 0 : s.id === "kanji" ? buildKanjiPool(examLevel).length > 0 : s.id === "grammar" ? (examLevel.grammar || []).length > 0 : s.id === "dokkai" ? (examLevel.reading || []).length > 0 : true;
        return /*#__PURE__*/React.createElement("div", {
          key: s.id,
          className: "nm-card nm-card-tap",
          style: {
            cursor: available ? "pointer" : "default",
            display: "flex",
            alignItems: "center",
            gap: 12,
            opacity: available ? 1 : 0.5
          },
          onClick: function onClick() {
            return available && setExamSection(s.id);
          }
        }, /*#__PURE__*/React.createElement("div", {
          style: {
            width: 40,
            height: 40,
            borderRadius: 12,
            background: "var(--momiji-tint)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0
          }
        }, /*#__PURE__*/React.createElement(Icon, {
          size: 18,
          color: "var(--momiji)",
          "aria-hidden": "true"
        })), /*#__PURE__*/React.createElement("div", {
          style: {
            flex: 1
          }
        }, /*#__PURE__*/React.createElement("p", {
          style: {
            fontSize: 14,
            fontWeight: 700,
            margin: 0
          }
        }, s.label, " ", /*#__PURE__*/React.createElement("span", {
          style: {
            fontWeight: 400,
            color: "var(--text-secondary)",
            fontSize: 12
          }
        }, "(", s.sub, ")")), /*#__PURE__*/React.createElement("p", {
          style: {
            fontSize: 11.5,
            color: "var(--text-secondary)",
            margin: "2px 0 0"
          }
        }, available ? s.desc : "Materi belum tersedia di level ini")), available && /*#__PURE__*/React.createElement(ChevronRight, {
          size: 16,
          color: "var(--text-secondary)",
          "aria-hidden": "true"
        }));
      })));
    }
    if (examSection && !examDifficulty) {
      var currentSectionInfo = sections.find(function (s) {
        return s.id === examSection;
      });
      var diffDesc = {
        mudah: "5 soal · 3 pilihan jawaban",
        sedang: "10 soal · 4 pilihan jawaban",
        susah: "15 soal · 5 pilihan jawaban, tanpa bantuan tambahan"
      };
      var diffColor = {
        mudah: "matcha",
        sedang: "yuzu",
        susah: "sakura"
      };
      return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("button", {
        onClick: function onClick() {
          return setExamSection(null);
        },
        style: {
          display: "flex",
          alignItems: "center",
          gap: 4,
          background: "none",
          border: "none",
          color: "var(--text-secondary)",
          fontFamily: "'Zen Maru Gothic', sans-serif",
          fontSize: 12.5,
          fontWeight: 700,
          cursor: "pointer",
          padding: 0,
          marginBottom: 12
        }
      }, /*#__PURE__*/React.createElement(ChevronRight, {
        size: 14,
        style: {
          transform: "rotate(180deg)"
        },
        "aria-hidden": "true"
      }), " Pilih bagian lain"), /*#__PURE__*/React.createElement("p", {
        style: {
          fontSize: 13,
          color: "var(--text-secondary)",
          margin: "0 0 12px"
        }
      }, /*#__PURE__*/React.createElement("b", {
        className: "nm-title",
        style: {
          color: "var(--ink)"
        }
      }, examLevel.label, " \xB7 ", currentSectionInfo.label), " \u2014 pilih tingkat kesulitan:"), /*#__PURE__*/React.createElement("div", {
        style: {
          display: "flex",
          flexDirection: "column",
          gap: 10
        }
      }, ["mudah", "sedang", "susah"].map(function (d) {
        return /*#__PURE__*/React.createElement("div", {
          key: d,
          className: "nm-card nm-card-tap",
          style: {
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            gap: 12
          },
          onClick: function onClick() {
            return setExamDifficulty(d);
          }
        }, /*#__PURE__*/React.createElement("div", {
          style: {
            width: 40,
            height: 40,
            borderRadius: 12,
            background: "var(--".concat(diffColor[d], "-tint)"),
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
            color: "var(--".concat(diffColor[d], ")"),
            fontWeight: 700,
            fontSize: 13
          }
        }, DIFFICULTY[d].label[0]), /*#__PURE__*/React.createElement("div", {
          style: {
            flex: 1
          }
        }, /*#__PURE__*/React.createElement("p", {
          style: {
            fontSize: 14,
            fontWeight: 700,
            margin: 0
          }
        }, DIFFICULTY[d].label), /*#__PURE__*/React.createElement("p", {
          style: {
            fontSize: 11.5,
            color: "var(--text-secondary)",
            margin: "2px 0 0"
          }
        }, diffDesc[d])), /*#__PURE__*/React.createElement(ChevronRight, {
          size: 16,
          color: "var(--text-secondary)",
          "aria-hidden": "true"
        }));
      })));
    }
    if (examSection && examDifficulty && !examPracticeLevel) {
      var _currentSectionInfo = sections.find(function (s) {
        return s.id === examSection;
      });
      return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("button", {
        onClick: function onClick() {
          setExamDifficulty(null);
          setConfirmRepeatLevel(null);
        },
        style: {
          display: "flex",
          alignItems: "center",
          gap: 4,
          background: "none",
          border: "none",
          color: "var(--text-secondary)",
          fontFamily: "'Zen Maru Gothic', sans-serif",
          fontSize: 12.5,
          fontWeight: 700,
          cursor: "pointer",
          padding: 0,
          marginBottom: 12
        }
      }, /*#__PURE__*/React.createElement(ChevronRight, {
        size: 14,
        style: {
          transform: "rotate(180deg)"
        },
        "aria-hidden": "true"
      }), " Ganti kesulitan"), /*#__PURE__*/React.createElement("p", {
        style: {
          fontSize: 13,
          color: "var(--text-secondary)",
          margin: "0 0 12px"
        }
      }, /*#__PURE__*/React.createElement("b", {
        className: "nm-title",
        style: {
          color: "var(--ink)"
        }
      }, examLevel.label, " \xB7 ", _currentSectionInfo.label, " \xB7 ", DIFFICULTY[examDifficulty].label), " \u2014 pilih level latihan (tiap level materinya beda):"), /*#__PURE__*/React.createElement("div", {
        style: {
          display: "grid",
          gridTemplateColumns: "repeat(5, minmax(0,1fr))",
          gap: 8
        }
      }, Array.from({
        length: 10
      }, function (_, i) {
        return i + 1;
      }).map(function (n) {
        var key = practiceLevelKey(examLevel.id, examSection, examDifficulty, n);
        var record = completedPracticeLevels[key];
        var passed = record && record.passed;
        var prevKey = practiceLevelKey(examLevel.id, examSection, examDifficulty, n - 1);
        var unlocked = n === 1 || completedPracticeLevels[prevKey] && completedPracticeLevels[prevKey].passed;
        return /*#__PURE__*/React.createElement("button", {
          key: n,
          onClick: function onClick() {
            if (!unlocked) return;
            record ? setConfirmRepeatLevel(n) : startExam(examLevel, examSection, examDifficulty, n);
          },
          className: "nm-lvl-btn",
          style: {
            padding: "14px 0",
            fontSize: 16,
            position: "relative",
            background: passed ? "var(--matcha)" : "var(--card-bg)",
            borderColor: passed ? "var(--matcha)" : "var(--line)",
            color: passed ? "#fff" : unlocked ? "var(--ink)" : "var(--text-muted)",
            opacity: unlocked ? 1 : 0.6,
            cursor: unlocked ? "pointer" : "not-allowed"
          }
        }, unlocked ? n : /*#__PURE__*/React.createElement(Lock, {
          size: 14,
          "aria-hidden": "true"
        }), passed && /*#__PURE__*/React.createElement(Check, {
          size: 12,
          style: {
            position: "absolute",
            top: 3,
            right: 3
          },
          "aria-hidden": "true"
        }));
      })), /*#__PURE__*/React.createElement("p", {
        style: {
          fontSize: 11,
          color: "var(--text-secondary)",
          margin: "8px 0 0"
        }
      }, "\uD83D\uDD12 Level berikutnya terbuka setelah lulus level sebelumnya (minimal 70%)."), confirmRepeatLevel !== null && /*#__PURE__*/React.createElement("div", {
        className: "nm-card",
        style: {
          marginTop: 12,
          textAlign: "center"
        }
      }, /*#__PURE__*/React.createElement("p", {
        style: {
          fontSize: 13.5,
          fontWeight: 700,
          margin: "0 0 12px"
        }
      }, "Ingin mengulangi latihan ini?"), /*#__PURE__*/React.createElement("div", {
        style: {
          display: "flex",
          gap: 8,
          justifyContent: "center"
        }
      }, /*#__PURE__*/React.createElement("button", {
        onClick: function onClick() {
          var n = confirmRepeatLevel;
          setConfirmRepeatLevel(null);
          startExam(examLevel, examSection, examDifficulty, n);
        },
        style: {
          background: "var(--momiji)",
          color: "#fff",
          border: "none",
          borderRadius: 12,
          padding: "8px 20px",
          fontFamily: "'Zen Maru Gothic', sans-serif",
          fontWeight: 700,
          fontSize: 13,
          cursor: "pointer"
        }
      }, "Ya"), /*#__PURE__*/React.createElement("button", {
        onClick: function onClick() {
          return setConfirmRepeatLevel(null);
        },
        style: {
          background: "var(--card-bg)",
          color: "var(--ink)",
          border: "2px solid var(--line)",
          borderRadius: 12,
          padding: "8px 20px",
          fontFamily: "'Zen Maru Gothic', sans-serif",
          fontWeight: 700,
          fontSize: 13,
          cursor: "pointer"
        }
      }, "Tidak"))));
    }
    var currentSection = sections.find(function (s) {
      return s.id === examSection;
    });
    var q = examQuestions[quizIdx];
    return /*#__PURE__*/React.createElement("div", {
      className: "nm-card"
    }, /*#__PURE__*/React.createElement(Tape, {
      color: "var(--momiji)"
    }), /*#__PURE__*/React.createElement("button", {
      onClick: exitExam,
      style: {
        display: "flex",
        alignItems: "center",
        gap: 4,
        background: "none",
        border: "none",
        color: "var(--text-secondary)",
        fontFamily: "'Zen Maru Gothic', sans-serif",
        fontSize: 12,
        fontWeight: 700,
        cursor: "pointer",
        padding: 0,
        marginBottom: 10
      }
    }, /*#__PURE__*/React.createElement(ChevronRight, {
      size: 13,
      style: {
        transform: "rotate(180deg)"
      },
      "aria-hidden": "true"
    }), " ", examLevel.label, " \xB7 ", currentSection.label, " \xB7 ", (_DIFFICULTY$examDiffi = DIFFICULTY[examDifficulty]) === null || _DIFFICULTY$examDiffi === void 0 ? void 0 : _DIFFICULTY$examDiffi.label, " \xB7 Lv.", examPracticeLevel), examQuestions.length === 0 ? /*#__PURE__*/React.createElement("p", {
      style: {
        fontSize: 13,
        color: "var(--text-secondary)"
      }
    }, "Materi untuk bagian ini belum cukup tersedia di level ini.") : !quizDone ? /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("p", {
      style: {
        fontSize: 12,
        color: "var(--text-secondary)",
        margin: "4px 0 8px"
      }
    }, "Soal ", quizIdx + 1, " dari ", examQuestions.length), q.passage && /*#__PURE__*/React.createElement("div", {
      style: {
        background: "var(--matcha-tint)",
        borderRadius: 12,
        padding: "10px 12px",
        marginBottom: 12,
        fontSize: 13,
        lineHeight: 1.7
      }
    }, q.passage), q.audio && /*#__PURE__*/React.createElement("div", {
      style: {
        marginBottom: 12
      }
    }, q.sub && /*#__PURE__*/React.createElement("p", {
      style: {
        fontSize: 11,
        fontWeight: 700,
        color: "var(--momiji)",
        margin: "0 0 8px",
        textAlign: "center"
      }
    }, q.sub), /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 6
      }
    }, /*#__PURE__*/React.createElement(SpeakBtn, {
      text: q.audio,
      size: 26
    }), /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 11,
        color: "var(--text-secondary)"
      }
    }, "Ketuk untuk dengarkan")), quizSel !== null && q.dialogText && examDifficulty !== "susah" && /*#__PURE__*/React.createElement("div", {
      style: {
        background: "var(--momiji-tint)",
        borderRadius: 12,
        padding: "10px 12px",
        marginTop: 10,
        fontSize: 12.5,
        lineHeight: 1.8,
        whiteSpace: "pre-line"
      }
    }, /*#__PURE__*/React.createElement("p", {
      style: {
        fontSize: 11,
        fontWeight: 700,
        margin: "0 0 4px",
        color: "var(--momiji)"
      }
    }, "Transkrip:"), q.dialogText)), /*#__PURE__*/React.createElement("p", {
      style: {
        fontSize: 15,
        fontWeight: 700,
        margin: "0 0 4px"
      }
    }, q.q), q.sub && !q.audio && /*#__PURE__*/React.createElement("p", {
      style: {
        fontSize: 12,
        color: "var(--text-secondary)",
        margin: "0 0 10px"
      }
    }, q.sub), /*#__PURE__*/React.createElement("div", {
      style: {
        marginTop: q.sub && !q.audio ? 0 : 10
      }
    }, q.choices.map(function (opt, i) {
      var isSel = i === quizSel;
      var style = isSel ? {
        background: "var(--momiji-tint)",
        borderColor: "var(--momiji)",
        color: "var(--ink)"
      } : {
        background: "var(--card-bg)",
        borderColor: "var(--line)",
        color: "var(--ink)"
      };
      return /*#__PURE__*/React.createElement("button", {
        key: i,
        onClick: function onClick() {
          return submitAnswer(i);
        },
        className: isSel ? "nm-quiz-option-selected" : "",
        style: {
          display: "block",
          width: "100%",
          textAlign: "left",
          padding: "10px 12px",
          marginBottom: 8,
          borderRadius: 14,
          border: "2px solid ".concat(style.borderColor),
          background: style.background,
          color: style.color,
          fontFamily: "inherit",
          fontSize: 13.5,
          cursor: "pointer"
        }
      }, opt);
    })), quizSel !== null && /*#__PURE__*/React.createElement("button", {
      onClick: nextQuestion,
      style: {
        marginTop: 6,
        display: "inline-flex",
        alignItems: "center",
        gap: 4,
        background: "var(--momiji)",
        color: "#fff",
        border: "none",
        borderRadius: 12,
        padding: "9px 16px",
        fontFamily: "'Zen Maru Gothic', sans-serif",
        fontWeight: 700,
        fontSize: 13,
        cursor: "pointer"
      }
    }, quizIdx + 1 < examQuestions.length ? "Soal berikutnya" : "Lihat hasil", " ", /*#__PURE__*/React.createElement(ChevronRight, {
      size: 14,
      "aria-hidden": "true"
    }))) : function () {
      var passed = examQuestions.length > 0 && quizScore / examQuestions.length >= 0.7;
      var hasNextLevel = examPracticeLevel < 10;
      return /*#__PURE__*/React.createElement("div", {
        style: {
          textAlign: "center",
          padding: "1rem 0"
        }
      }, /*#__PURE__*/React.createElement("p", {
        className: "nm-title",
        style: {
          fontSize: 24,
          margin: "4px 0 6px"
        }
      }, quizScore, " / ", examQuestions.length, " benar"), /*#__PURE__*/React.createElement("p", {
        style: {
          fontSize: 13,
          color: passed ? "var(--matcha)" : "var(--sakura)",
          fontWeight: 700,
          margin: "0 0 14px"
        }
      }, passed ? "✅ Bagus! Siap lanjut ke level berikutnya." : "Belum lancar. Yuk ulangi lagi biar makin ingat."), /*#__PURE__*/React.createElement("div", {
        style: {
          display: "flex",
          gap: 8,
          justifyContent: "center",
          flexWrap: "wrap",
          marginBottom: showPembahasan ? 16 : 0
        }
      }, passed && hasNextLevel && /*#__PURE__*/React.createElement("button", {
        onClick: function onClick() {
          return startExam(examLevel, examSection, examDifficulty, examPracticeLevel + 1);
        },
        style: {
          background: "var(--matcha)",
          color: "#fff",
          border: "none",
          borderRadius: 12,
          padding: "9px 16px",
          fontFamily: "'Zen Maru Gothic', sans-serif",
          fontWeight: 700,
          fontSize: 13,
          cursor: "pointer"
        }
      }, "Lanjut ke Level ", examPracticeLevel + 1, " \u2192"), /*#__PURE__*/React.createElement("button", {
        onClick: restartQuiz,
        style: {
          background: passed ? "var(--card-bg)" : "var(--momiji)",
          color: passed ? "var(--ink)" : "#fff",
          border: passed ? "2px solid var(--line)" : "none",
          borderRadius: 12,
          padding: "9px 16px",
          fontFamily: "'Zen Maru Gothic', sans-serif",
          fontWeight: 700,
          fontSize: 13,
          cursor: "pointer"
        }
      }, "Ulangi bagian ini"), /*#__PURE__*/React.createElement("button", {
        onClick: function onClick() {
          return setShowPembahasan(function (s) {
            return !s;
          });
        },
        style: {
          background: "var(--card-bg)",
          color: "var(--sora)",
          border: "2px solid var(--sora)",
          borderRadius: 12,
          padding: "9px 16px",
          fontFamily: "'Zen Maru Gothic', sans-serif",
          fontWeight: 700,
          fontSize: 13,
          cursor: "pointer"
        }
      }, showPembahasan ? "Tutup pembahasan" : "📖 Lihat pembahasan")), showPembahasan && /*#__PURE__*/React.createElement("div", {
        style: {
          textAlign: "left"
        }
      }, userAnswers.map(function (a, idx) {
        var isCorrect = a.selected === a.question.correct;
        return /*#__PURE__*/React.createElement("div", {
          key: idx,
          style: {
            borderRadius: 14,
            border: "2px solid ".concat(isCorrect ? "var(--matcha)" : "var(--sakura)"),
            background: isCorrect ? "var(--matcha-tint)" : "var(--sakura-tint)",
            padding: "10px 12px",
            marginBottom: 10
          }
        }, /*#__PURE__*/React.createElement("div", {
          style: {
            display: "flex",
            alignItems: "flex-start",
            gap: 6,
            marginBottom: 6
          }
        }, isCorrect ? /*#__PURE__*/React.createElement(Check, {
          size: 16,
          color: "var(--matcha)",
          "aria-hidden": "true",
          style: {
            flexShrink: 0,
            marginTop: 2
          }
        }) : /*#__PURE__*/React.createElement("span", {
          style: {
            color: "var(--sakura)",
            fontWeight: 700,
            flexShrink: 0
          }
        }, "\u2715"), /*#__PURE__*/React.createElement("p", {
          style: {
            fontSize: 12,
            fontWeight: 700,
            margin: 0,
            color: "var(--text-secondary)"
          }
        }, "Soal ", idx + 1)), a.question.passage && /*#__PURE__*/React.createElement("p", {
          style: {
            fontSize: 12.5,
            margin: "0 0 6px",
            fontStyle: "italic",
            color: "var(--text-body)"
          }
        }, a.question.passage), /*#__PURE__*/React.createElement("p", {
          style: {
            fontSize: 13.5,
            fontWeight: 700,
            margin: "0 0 6px"
          }
        }, a.question.q), /*#__PURE__*/React.createElement("p", {
          style: {
            fontSize: 12.5,
            margin: "0 0 3px"
          }
        }, "Jawabanmu: ", /*#__PURE__*/React.createElement("b", {
          style: {
            color: isCorrect ? "var(--matcha)" : "var(--sakura)"
          }
        }, a.selected), !isCorrect && /*#__PURE__*/React.createElement(React.Fragment, null, " \xB7 Jawaban benar: ", /*#__PURE__*/React.createElement("b", {
          style: {
            color: "var(--matcha)"
          }
        }, a.question.correct))), a.question.explain && /*#__PURE__*/React.createElement("p", {
          style: {
            fontSize: 12,
            color: "var(--text-body)",
            margin: "6px 0 0",
            lineHeight: 1.6
          }
        }, "\uD83D\uDCA1 ", a.question.explain));
      })));
    }());
  }()), flash && function () {
    var n = flash.list.length;
    var i = Math.min(flash.index, n - 1);
    var isKanji = flash.kind === "kanji";
    var item = flash.list[i];
    var _char6 = isKanji ? item : item["char"];
    var k = isKanji ? KANJI_CONTENT[item] || {} : null;
    var markKey = isKanji ? "".concat(flash.cat, ":").concat(item) : item.key;
    var marked = isKanji ? !!checked[markKey] : !!kanaKnown[markKey];
    var toggleMark = function toggleMark() {
      if (isKanji) toggle(flash.cat, item);else setKanaKnown(function (prev) {
        return _objectSpread(_objectSpread({}, prev), {}, _defineProperty({}, markKey, !prev[markKey]));
      });
    };
    var onTouchStart = function onTouchStart(e) {
      var t = e.touches[0];
      flashTouch.current = {
        x: t.clientX,
        y: t.clientY,
        swiped: false
      };
    };
    var onTouchEnd = function onTouchEnd(e) {
      var st = flashTouch.current;
      if (st.x == null) return;
      var t = e.changedTouches[0];
      var dx = t.clientX - st.x;
      var dy = t.clientY - st.y;
      if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy)) {
        st.swiped = true;
        flashGo(dx < 0 ? 1 : -1);
      }
      st.x = null;
    };
    var onCardClick = function onCardClick() {
      if (flashTouch.current.swiped) {
        flashTouch.current.swiped = false;
        return;
      }
      setFlashFlipped(function (v) {
        return !v;
      });
    };
    return /*#__PURE__*/React.createElement("div", {
      className: "nm-flash-overlay",
      role: "dialog",
      "aria-modal": "true",
      "aria-label": "Flashcard ".concat(_char6),
      onClick: flashClose
    }, /*#__PURE__*/React.createElement("div", {
      className: "nm-flash-box",
      onClick: function onClick(e) {
        return e.stopPropagation();
      }
    }, /*#__PURE__*/React.createElement("div", {
      className: "nm-flash-head"
    }, /*#__PURE__*/React.createElement("span", null, isKanji ? "Kanji" : "Kana", " \xB7 ", i + 1, " / ", n), /*#__PURE__*/React.createElement("button", {
      className: "nm-flash-close",
      onClick: flashClose,
      "aria-label": "Tutup flashcard"
    }, "\u2715")), /*#__PURE__*/React.createElement("div", {
      className: "nm-flash-card".concat(flashFlipped ? " is-flipped" : ""),
      onClick: onCardClick,
      onTouchStart: onTouchStart,
      onTouchEnd: onTouchEnd
    }, /*#__PURE__*/React.createElement("div", {
      className: "nm-flash-face nm-flash-front",
      "aria-hidden": flashFlipped
    }, /*#__PURE__*/React.createElement(StrokeSvg, {
      key: "".concat(_char6, "-").concat(i),
      "char": _char6,
      folder: isKanji ? "svgsJa" : "svgsJaKana",
      size: isKanji ? 150 : 130
    }), /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: 10,
        marginTop: 6
      }
    }, /*#__PURE__*/React.createElement("span", {
      className: "nm-title",
      style: {
        fontSize: 44,
        lineHeight: 1.1
      }
    }, _char6), /*#__PURE__*/React.createElement(SpeakBtn, {
      text: _char6,
      size: 16
    })), /*#__PURE__*/React.createElement("p", {
      className: "nm-flash-hint"
    }, "Ketuk kartu untuk ", isKanji ? "lihat arti & cara baca" : "lihat cara baca")), /*#__PURE__*/React.createElement("div", {
      className: "nm-flash-face nm-flash-back",
      "aria-hidden": !flashFlipped
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: 10,
        marginBottom: 10
      }
    }, /*#__PURE__*/React.createElement("span", {
      className: "nm-title",
      style: {
        fontSize: 40,
        lineHeight: 1.1
      }
    }, _char6), /*#__PURE__*/React.createElement(SpeakBtn, {
      text: _char6,
      size: 16
    })), isKanji ? /*#__PURE__*/React.createElement("div", {
      style: {
        width: "100%",
        maxWidth: 340,
        textAlign: "left"
      }
    }, /*#__PURE__*/React.createElement("p", {
      style: {
        fontSize: 15,
        margin: "0 0 6px"
      }
    }, /*#__PURE__*/React.createElement("b", null, "On:"), " ", k.on), /*#__PURE__*/React.createElement("p", {
      style: {
        fontSize: 15,
        margin: "0 0 6px"
      }
    }, /*#__PURE__*/React.createElement("b", null, "Kun:"), " ", k.kun), /*#__PURE__*/React.createElement("p", {
      style: {
        fontSize: 15,
        margin: "0 0 12px",
        color: "var(--text-body)"
      }
    }, "Arti: ", /*#__PURE__*/React.createElement("b", {
      style: {
        color: "var(--ink)"
      }
    }, k.arti)), k.kombinasi && k.kombinasi.length > 0 && /*#__PURE__*/React.createElement("div", {
      style: {
        borderTop: "1.5px dashed var(--line)",
        paddingTop: 10
      }
    }, k.kombinasi.map(function (c, j) {
      return /*#__PURE__*/React.createElement("div", {
        key: j,
        style: {
          display: "flex",
          alignItems: "center",
          gap: 8,
          marginBottom: 7
        }
      }, /*#__PURE__*/React.createElement("span", {
        onClick: function onClick(e) {
          return e.stopPropagation();
        }
      }, /*#__PURE__*/React.createElement(SpeakBtn, {
        text: c.word,
        size: 13
      })), /*#__PURE__*/React.createElement("span", {
        style: {
          fontSize: 14
        }
      }, /*#__PURE__*/React.createElement("span", {
        className: "nm-title",
        style: {
          fontSize: 16
        }
      }, c.word), " (", c.reading, ") = ", c.arti));
    }))) : /*#__PURE__*/React.createElement("p", {
      style: {
        fontSize: 18,
        margin: 0,
        color: "var(--text-body)"
      }
    }, "Dibaca: ", /*#__PURE__*/React.createElement("b", {
      style: {
        color: "var(--ink)",
        fontSize: 26
      }
    }, item.romaji)), /*#__PURE__*/React.createElement("p", {
      className: "nm-flash-hint"
    }, "Ketuk lagi untuk balik"))), /*#__PURE__*/React.createElement("div", {
      className: "nm-flash-actions"
    }, /*#__PURE__*/React.createElement("button", {
      className: "nm-flash-btn",
      onClick: function onClick() {
        return flashGo(-1);
      },
      "aria-label": "Sebelumnya"
    }, "\u2039 Sebelumnya"), /*#__PURE__*/React.createElement("button", {
      className: "nm-flash-btn nm-flash-mark".concat(marked ? " is-on" : ""),
      onClick: toggleMark,
      "aria-pressed": marked
    }, marked ? "✓ Dikuasai" : "Tandai dikuasai"), /*#__PURE__*/React.createElement("button", {
      className: "nm-flash-btn",
      onClick: function onClick() {
        return flashGo(1);
      },
      "aria-label": "Berikutnya"
    }, "Berikutnya \u203A"))));
  }(), /*#__PURE__*/React.createElement("div", {
    className: "nm-bottomnav"
  }, TABS.map(function (t) {
    var Icon = t.icon;
    var active = tab === t.id;
    return /*#__PURE__*/React.createElement("button", {
      key: t.id,
      className: "nm-bottomnav-item ".concat(active ? "active" : ""),
      style: {
        "--tab-color": "var(--".concat(t.color, ")")
      },
      onClick: function onClick() {
        return setTab(t.id);
      }
    }, /*#__PURE__*/React.createElement("span", {
      className: "nm-bottomnav-icon"
    }, /*#__PURE__*/React.createElement(Icon, {
      size: active ? 22 : 20,
      strokeWidth: active ? 2.4 : 2,
      "aria-hidden": "true"
    })), t.label);
  })));
}
var rootEl = document.getElementById("root");
ReactDOM.createRoot(rootEl).render(/*#__PURE__*/React.createElement(NihongoMichi, null));