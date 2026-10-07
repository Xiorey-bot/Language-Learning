// Service worker Nihongo Michi: aplikasi tetap bisa dibuka tanpa internet.
// Strategi: jaringan dulu (kalau online selalu dapat versi terbaru, jadi perubahan file langsung terlihat),
// lalu cadangan dari cache saat offline. Audio (.mp3) tidak di-cache karena besar dan memakai Range request.
const CACHE = "nihongo-michi-v1";
const SHELL = [
  "./", "index.html", "style.css", "manifest.webmanifest",
  "favicon.svg", "favicon-32.png", "apple-touch-icon.png",
  "icons/icon-192.png", "icons/icon-512.png", "icons/icon-maskable-512.png",
  "vendor/react.production.min.js", "vendor/react-dom.production.min.js",
  "nihongo-michi-data-writing.js",
  "dist/icons.js",
  "dist/nihongo-michi-data-misc.js", "dist/nihongo-michi-data-kanji.js", "dist/nihongo-michi-data-vocab.js",
  "dist/nihongo-michi-data-grammar.js", "dist/nihongo-michi-data-reading.js", "dist/nihongo-michi-data-choukai.js",
  "dist/nihongo-michi-data-strokes.js", "dist/nihongo-michi-data-ujian.js",
  "dist/app.js",
];
const FONT_HOSTS = ["fonts.googleapis.com", "fonts.gstatic.com"];

self.addEventListener("install", (event) => {
  event.waitUntil(caches.open(CACHE).then((c) => c.addAll(SHELL)).then(() => self.skipWaiting()));
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", (event) => {
  const req = event.request;
  if (req.method !== "GET" || req.headers.has("range")) return;
  const url = new URL(req.url);
  const sameOrigin = url.origin === self.location.origin;
  if (!sameOrigin && !FONT_HOSTS.includes(url.hostname)) return;
  if (sameOrigin && url.pathname.endsWith(".mp3")) return;

  event.respondWith(
    fetch(req)
      .then((res) => {
        if (res && (res.ok || res.type === "opaque")) {
          const copy = res.clone();
          caches.open(CACHE).then((c) => c.put(req, copy)).catch(() => {});
        }
        return res;
      })
      .catch(() =>
        caches.match(req).then((hit) => hit || (req.mode === "navigate" ? caches.match("index.html") : Response.error()))
      )
  );
});
