# 日本語の道 · Nihongo Michi

Aplikasi web (PWA, bisa dipasang di ponsel) untuk belajar bahasa Jepang dan persiapan JLPT N5–N1. Seluruh antarmuka dan penjelasan berbahasa Indonesia. Tidak ada backend: semuanya berjalan di browser dan progres disimpan di `localStorage`.

## Fitur

- Aksara: hiragana dan katakana, lengkap dengan kuis
- Kanji (2.295 entri, seluruh Jōyō) dengan bacaan on/kun, arti, dan animasi urutan goresan
- Kosakata, tata bahasa, bacaan (dokkai), dan latihan menyimak (choukai)
- Latihan menulis dengan penilaian goresan tulisan tangan
- Latihan ujian JLPT dari soal tahun-tahun lalu (mojigoi, bunpou/dokkai, choukai), termasuk simulasi dengan hitung mundur dan audio asli
- Susun Kata (permainan menyusun kalimat), pelacak belajar, rutinitas harian, dan cadangan progres (ekspor/impor JSON)
- Mode gelap dan bisa dipakai offline (service worker)

## Cara menjalankan

Layani folder ini dari root situs dengan server statis apa pun, lalu buka `http://localhost:8000/`:

```bash
cd nihongo-michi
python -m http.server 8000
```

`index.html` memakai path absolut (`/manifest.webmanifest`, `/favicon.svg`), jadi folder `nihongo-michi/` harus menjadi root server, bukan dibuka lewat server di folder induk repo. Font diambil dari Google Fonts; sisanya lokal.

## Struktur folder

| Path | Isi |
|---|---|
| `index.html` | Titik masuk aplikasi |
| `app.js`, `icons.js` | Sumber JSX: logika dan UI, serta komponen ikon |
| `dist/` | Hasil kompilasi JSX yang sebenarnya dimuat browser |
| `nihongo-michi-data-*.js` | Data konten: kanji, kosakata, tata bahasa, bacaan, menyimak, goresan, bank soal ujian |
| `style.css` | Tema dan kelas bersama |
| `sw.js`, `manifest.webmanifest` | Service worker dan manifest PWA |
| `vendor/` | React dan ReactDOM (disertakan langsung) |
| `audio/`, `images/` | Audio dan ilustrasi soal ujian |
| `icons/`, `favicon*`, `apple-touch-icon.png` | Ikon aplikasi |
| `CLAUDE.md` | Catatan teknis lengkap untuk pengembangan |

Catatan penting: file `.js` di root adalah sumber, sedangkan browser memuat salinan terkompilasi di `dist/`. Setelah mengubah sumber, `dist/` harus ikut diperbarui. Detailnya ada di [`CLAUDE.md`](CLAUDE.md).

## Atribusi

- Bacaan on/kun untuk kanji tambahan diambil dari [KANJIDIC2](https://www.edrdg.org/wiki/index.php/KANJIDIC_Project) (EDRDG, lisensi CC BY-SA 4.0).
- Animasi urutan goresan memakai data [animCJK](https://github.com/parsimonhi/animCJK).
