# CLAUDE.md

Guidance for Claude Code when working in this repository.

## What this is

**日本語の道 · Nihongo Michi** — a static, client-only web app (installable PWA) for learning Japanese and preparing for JLPT N5–N1. The UI text, code comments, and explanations are in **Indonesian**; keep new user-facing text and comments in Indonesian to match.

There is no backend, no package.json, no bundler, no tests, and no git repository. Everything is plain `<script>` tags sharing globals.

## Running

Serve the folder root with any static server and open `/`:

```
python -m http.server 8000
```

`index.html` references the manifest and favicons with absolute paths (`/manifest.webmanifest`, `/favicon.svg`), so the app must be served from the site root. Fonts load from Google Fonts; everything else is local.

## Source vs. `dist/` (important)

The root `.js` files are the **JSX sources**. The browser loads the **precompiled copies in `dist/`** (Babel: JSX → `React.createElement`, ES5-ish output; `dist/nihongo-michi-data-ujian.js` is also minified).

- Edit the root files; `dist/` is generated output. Because no compiler is available here, `app.js` changes so far have been mirrored into `dist/app.js` by hand in the same ES5 style (`React.createElement`, `_slicedToArray`, `_objectSpread`) — keep the two files functionally identical, and prefer a real recompile once Node/Babel is available.
- After editing any root file that has a `dist/` counterpart, `dist/` must be recompiled or the change will not show up in the browser.
- `index.html` mentions a `kompilasi.js` build script, but **it is not in this folder** and there is no Babel install here. If a change needs compiling, tell the user rather than assuming a build command exists.
- Exception: `nihongo-michi-data-writing.js` is plain JS (no JSX), has no `dist/` copy, and is loaded directly from the root.
- `sw.js` (service worker) is plain JS and is loaded directly. It is network-first with cache fallback, so edits are visible immediately when online; if you add a new file that must work offline, add it to the `SHELL` list in `sw.js` (every listed file must exist, or the install fails). Audio is deliberately not cached.

Script order in `index.html` matters (globals, no modules):

1. `vendor/react.production.min.js`, `vendor/react-dom.production.min.js` (React is vendored; `React`/`ReactDOM` are globals)
2. `nihongo-michi-data-writing.js`
3. `dist/icons.js` — must precede `data-misc.js`, because `TABS` references icon components directly
4. `dist/nihongo-michi-data-*.js` (misc, kanji, vocab, grammar, reading, choukai, strokes, ujian)
5. `dist/app.js`

## Files

| File | Global(s) | Contents |
|---|---|---|
| `app.js` (~4.7k lines) | — | All app logic and UI |
| `icons.js` | `Check`, `Home`, `Play`, … | Inline SVG icon components built with `makeIcon` |
| `style.css` | — | Theme tokens and shared classes |
| `nihongo-michi-data-misc.js` | `LEVELS`, `QUIZ`, `KANA_ROWS`, `HIRAGANA`, `KATAKANA`, `KANA_GROUPS`, `DAILY_TASKS`, `WEEK_DAYS`, `TABS` | Level definitions, kana tables, tab bar config |
| `nihongo-michi-data-kanji.js` | `KANJI_CONTENT` | kanji → `{ on, kun, arti, kombinasi }` |
| `nihongo-michi-data-vocab.js` | `VOCAB_CONTENT` | topic name → `[{ jp, reading, id }]` |
| `nihongo-michi-data-grammar.js` | `GRAMMAR_CONTENT`, `PARTICLES` | pattern → `{ arti, penjelasan, contoh: [{ jp, romaji, id }] }` |
| `nihongo-michi-data-reading.js` | `READING_CONTENT` | title → `{ level, text: [...] , … }` |
| `nihongo-michi-data-choukai.js` | `CHOUKAI_CONTENT` | level → listening items `{ type, dialog, q, choices, correct }` |
| `nihongo-michi-data-strokes.js` | `STROKE_DATA` | char → animated stroke-order SVG string (animCJK) |
| `nihongo-michi-data-writing.js` | `WRITING_STROKES` | char → stroke medians (`"x,y x,y\|…"` on a 1024×1024 canvas) for handwriting judging |
| `nihongo-michi-data-ujian.js` (1.5 MB) | `JLPT_EXAM_CONTENT` | Past-exam question bank (see below) |
| `audio/` | — | `jlpt-<level>-<year>[-<month>].mp3`, one file per exam listening section |
| `images/` | — | Exam illustrations, named `<section>-m<mondai>-<n>ban-<slug>.jpg` |

`LEVELS` is the hub that ties content together: each level (`n5`, `n4`, `n3`, `n2n1`) lists the kanji characters, vocab topic names, grammar pattern names, and reading titles that belong to it, and those strings are the **keys** into `KANJI_CONTENT` / `VOCAB_CONTENT` / `GRAMMAR_CONTENT` / `READING_CONTENT`. Adding content means adding both the entry and its key in `LEVELS`. Note the study levels merge N2 and N1 into `n2n1`, while the exam bank keeps `n2` and `n1` separate.

## `app.js` layout

One file, top to bottom:

- **Helpers and question generators** (top): `shuffleArr`, `makeChoices`, `genKanji` / `genKosakata` / `genBunpou` / `genDokkai` / `genChoukai` / `genKanaQuiz` build quiz questions from the data globals, parameterised by `DIFFICULTY` and a practice level.
- **Standalone components**: `Ring`, `Hanko`, `Tape`, `VocabFlashcards`, `DailyRoutine` (editable daily-routine card; its tasks default to `DAILY_TASKS`), `BackupCard` (export/import of the progress snapshot as a JSON file), `MatchingQuiz` (drag-to-match), `WritingPractice` plus the `wr*` stroke-judging functions, `RealAudioClipPlayer` (plays a `start`–`end` clip of an exam mp3), `AudioPlayerBar` (reads dialog with `speechSynthesis`), and `SusunKataGame` with its `puzzle*` / `sk*` / `SK_*` helpers (sentence-ordering game, self-contained including its own CSS string `SK_CSS`).
- **`NihongoMichi`** (line ~1660 to the end): the single root component. It holds essentially all app state in `useState` hooks and renders every screen inline, switching on `tab` (`home`, `aksara`, `tracker`, `rutinitas`, `latihan` — ids from `TABS`; note the labels differ from the ids, e.g. `tracker` is labelled "Learning" and `rutinitas` is labelled "Tracker"). The `latihan` tab further switches on `latihanMode` (`writing`, `matching`, `ujian`, `susun`, …).

Conventions: function components with hooks only; `useState`/`useMemo`/`useEffect` are destructured from the global `React`, others are called as `React.useRef` etc. Styling is mostly inline `style={{…}}` using the CSS variables from `style.css`, with a few shared classes.

### State and persistence

App progress is persisted to `localStorage` under `nihongo-michi-progress-v1`. `buildSnapshot` / `applySnapshot` inside `NihongoMichi` define what is saved (dark mode, checked items, activity log, weekly goals and history, completed practice levels, kana known, writing done, daily log, user-defined daily routine tasks `dailyTasks`); a new piece of state that should survive reloads must be added to both, and to the dependency list of the saving effect. Quiz session state is not saved. The one exception is the JLPT exam practice (`latihanMode === "ujian"`): its in-progress session (position, answers, simulation time left, finished simulation sections) is auto-saved under its own key `nihongo-michi-ujian-sesi-v1` (outside the progress snapshot), so leaving or closing the app pauses it and a "Ujian dijeda" card (`renderUjianResume`) offers "Lanjutkan ujian" / "Buang". Questions are rebuilt via `normalizeUjianSection` on resume; the key is cleared when the exam is finished. Both the full simulation and the single-category practice (Mojigoi/Dokkai/Choukai) run a countdown (20/40/20 minutes from `UJIAN_SECTIONS[].simMinutes`, auto-submit at 0); the remaining time is saved with the session and the timer only ticks while the exam screen is visible. The Susun Kata game keeps its own keys (`nihongo-michi-susun-kata-best`, `nihongo-michi-susun-kata-mute`) via `skLoad` / `skSave`.

### Styling without a rebuild

`style.css` is loaded directly, so CSS-only changes need no compile step. Because most markup is styled inline, some rules in `style.css` target elements by structure or by inline-style substring (e.g. `div[style*="aspect-ratio: 1"]`, `.nm-d-g5 > div:nth-child(36)`); changing the matching JSX in `app.js` can silently break them — check the "Penyempurnaan UI/UX" block at the end of `style.css` when touching the Aksara grid, the Tracker calendar, or the bottom nav.

### Exam bank (`JLPT_EXAM_CONTENT`)

Shape: `level → year → section → mondaiN`, with sections `mojigoi`, `bunpou_dokkai`, `choukai`. Mondai shapes vary by section and level (`items`, `passages[].blanks`, `passages[].questions`, `info_text` / `info_table` / `info_image`, …); `normalizeUjianSection` inside `NihongoMichi` is the single place that flattens them into uniform question objects, so new data shapes need handling there.

- `answer` is normally an index into `choices`; for `bunpou_dokkai.mondai2` (sentence ordering) it is the answer value itself, with `full` holding the completed sentence.
- `<<…>>` in question text marks an underlined span, rendered by `renderWithUnderline`.
- Listening items carry `audioSrc` plus `audioStart` / `audioEnd` (seconds into the shared mp3) and `dialog` (the script).
- Years are shown to users as "Latihan 1, 2, …" (years sorted ascending); the year itself is never displayed.
- `SusunKataGame` builds its puzzle pool from every level's `bunpou_dokkai.mondai2` items, so edits there affect the game too.

## Theming

`style.css` defines colour tokens on `:root` (`--ink`, `--paper`, `--card-bg`, `--line`, and five accents `--sakura`, `--sora`, `--matcha`, `--yuzu`, `--momiji`, each with a `-tint`). Dark mode is the same tokens overridden under `html.dark`, toggled from `NihongoMichi`. Use the tokens rather than hard-coded colours so both themes keep working; `TABS[].color` names an accent token.

Dark-mode pitfalls found so far (check these when adding UI): never hard-code `#fff`/white as a *background* for an element whose text inherits `var(--ink)` (the exam info table did, and became unreadable); form fields need an explicit background (handled globally at the end of `style.css`); and the stroke-order SVGs from `STROKE_DATA` ship their own black stroke colour, overridden under `html.dark svg.acjk` in `style.css`.

## Data kanji (diperbarui 2026-10-07)

- `KANJI_CONTENT` kini berisi 2.295 kanji: seluruh kanji Jōyō (2.136; dua di antaranya, 頰 dan 𠮟, diwakili bentuk umum 頬 dan 叱) ditambah sekitar 160 kanji non-Jōyō (kebanyakan kanji nama orang) yang sudah ada sebelumnya. 444 kanji Jōyō ditambahkan pada tanggal itu; bacaan on/kun diambil dari KANJIDIC2 (EDRDG, lisensi CC BY-SA 4.0 — sertakan atribusi bila aplikasi dipublikasikan), arti ditulis ulang dalam bahasa Indonesia, `kombinasi` dikosongkan.
- Penempatan level: kanji kelas 1–2 SD masuk daftar N4 dan N3 (daftar keduanya kumulatif); kanji lainnya masuk daftar N2-N1, yang hanya berisi kanji barunya. Jumlah kumulatif unik per level: N5 103, N4 306, N3 691, N2-N1 2.295 (dihitung `kanjiCumulativeCount` di `app.js`, ditampilkan di kartu level dan kepala daftar kanji).
- Di `dist/nihongo-michi-data-kanji.js` entri tambahan ditambahkan sebagai `Object.assign(KANJI_CONTENT, {...})` di akhir file, bukan di dalam rantai `_defineProperty` hasil kompilasi.
- Kanji tambahan belum punya data goresan di `WRITING_STROKES`, jadi tidak muncul di Latihan Menulis (`canWriteKanji` menyaringnya). Animasi goresan di flashcard diambil online dari animCJK per kode karakter.
- Kanji varian 頰 (sudah ada sebagai 頬) dilewati, dan 𠮟 diganti bentuk umum 叱. Kanji 公 (ke N4 dan N3) dan 無 (ke N3) dulu ada di data tetapi tidak ada di daftar level mana pun; sudah dimasukkan pada pemeriksaan ulang.
