# Reels promo — Nihongo Michi

Versi baru iklan Reels (1080×1920, 30 fps): animasi motion-graphic bergaya kertas washi, layar aplikasi
dari video asli, dan dubbing ElevenLabs. Semua dirender dari satu komposisi HTML (GSAP) yang
terkunci ke timeline narasi, jadi kalau teks/suara berubah, animasi ikut menyesuaikan.

## Hasil
- `out/nihongo-michi-reels-dubbing.mp4` — versi final dengan suara (setelah langkah dubbing dijalankan)
- `out/nihongo-michi-reels-preview-tanpa-dubbing.mp4` — preview animasi + musik latar saja

## Cara bikin ulang

```bash
cd promo
npm install                      # gsap, font, playwright-core
./prep.sh                        # ekstrak layar aplikasi + musik dari assets/original-reels.mp4

# 1) Dubbing (butuh akses ke api.elevenlabs.io)
export ELEVENLABS_API_KEY=...    # jangan di-commit
python3 dub.py                   # suara per scene + timestamp → build/audio, lalu hitung ulang timeline

# 2) Render animasi (±1,5 menit) lalu gabung audio
node render.mjs
python3 mux.py
```

Tanpa langkah 1, `python3 timeline.py` memakai estimasi durasi dan hasilnya jadi preview tanpa suara.

## Yang bisa diubah
| File | Isi |
|---|---|
| `script.json` | Teks narasi per scene, `voice_id`, `model_id`, `voice_settings`, dan **cue** (kata kunci yang memicu animasi) |
| `src/main.js` | Animasi tiap scene (headline, chip, highlight di layar HP, transisi) |
| `src/style.css` | Palet warna & gaya (variabel di `:root`) |
| `timeline.py` | Durasi scene = max(durasi minimum, durasi suara + jeda) |

Preview satu frame: `node render.mjs --times 12.5,40` → `build/preview/t_*.png`.

Catatan: ejaan narasi sengaja fonetik untuk TTS (mis. "Je El Pe Te", "N lima sampai N satu",
"tujuh puluh sembilan ribu"). Ubah di `script.json` bila pelafalannya kurang pas, lalu
`python3 dub.py --only <id> --force`.
