# Nihongo Michi untuk Lynk

File:
- `nihongo-michi-lynk.html` : kode siap copy-paste ke **Text Code View** Lynk (~30 KB, sebelumnya 653 KB)
- `gambar/nm-home.webp`, `nm-aksara.webp`, `nm-learning.webp`, `nm-tracker.webp` : 4 screenshot yang tadinya Base64

## Langkah pasang
1. Upload 4 gambar di `gambar/` ke tempat yang menyediakan URL langsung (mis. upload gambar di Lynk, GitHub Pages, Imgur, Cloudinary), lalu salin URL-nya.
2. Buka `nihongo-michi-lynk.html`, lalu Find & Replace:
   - `GANTI_LINK_CHECKOUT` -> link checkout Lynk (dipakai di 4 tombol)
   - `GANTI_URL_GAMBAR_HOME`, `GANTI_URL_GAMBAR_AKSARA`, `GANTI_URL_GAMBAR_LEARNING`, `GANTI_URL_GAMBAR_TRACKER` -> URL gambar masing-masing
3. Di editor Text Lynk, klik tombol `</>` (Code View), hapus isi awalnya (`<br>`), lalu tempel seluruh isi file. Simpan langsung dari Code View; jangan pindah balik ke mode visual karena editor bisa merapikan/mengubah kode.
4. `<title>` dan meta description tidak ikut (tidak boleh di Text Code View). Isi judul dan deskripsi di pengaturan produk Lynk.

## Yang berubah dari versi asli
- `<!DOCTYPE>`, `<html>`, `<head>`, `<body>` dibuang. Isi jadi `<style>` + satu `<div class="nmichi">` pembungkus.
- Semua selector CSS di-scope ke `.nmichi` (`:root` dan `body` jadi `.nmichi`), supaya tidak mengubah tampilan template Lynk dan sebaliknya.
- Google Fonts dipindah dari `<link>` ke `@import` di dalam `<style>`.
- ID radio tab preview diganti `nm-pv-*` biar tidak bentrok dengan elemen Lynk.
- Aturan responsive HP memakai `@container` (lebar kolom Lynk), bukan lebar layar, jadi tetap 1 kolom walau dibuka di laptop. `@media` dipertahankan sebagai cadangan.
- Gambar preview diberi `loading="lazy"`.
- Tidak ada JavaScript (aslinya juga tidak ada): tab preview pakai radio + CSS, FAQ pakai `<details>`.
