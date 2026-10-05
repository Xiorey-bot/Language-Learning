// Render komposisi HTML → frame JPEG (paralel) → video senyap (build/video.mp4).
//   node render.mjs                  render semua frame + encode
//   node render.mjs --times 1,5.5    preview PNG full-res di build/preview/ (tanpa encode)
//   node render.mjs --from 100 --to 200 --no-encode
import { chromium } from 'playwright-core';
import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const ROOT = path.dirname(fileURLToPath(import.meta.url));
const arg = (k, d) => { const i = process.argv.indexOf('--' + k); return i < 0 ? d : (process.argv[i + 1]?.startsWith('--') || process.argv[i + 1] === undefined ? true : process.argv[i + 1]); };
const MIME = { '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css', '.json': 'application/json', '.jpg': 'image/jpeg', '.png': 'image/png', '.woff2': 'font/woff2', '.woff': 'font/woff' };

const server = http.createServer((req, res) => {
  const f = path.join(ROOT, decodeURIComponent(req.url.split('?')[0]));
  if (!f.startsWith(ROOT) || !fs.existsSync(f) || fs.statSync(f).isDirectory()) { res.writeHead(404); return res.end(); }
  res.writeHead(200, { 'Content-Type': MIME[path.extname(f)] || 'application/octet-stream', 'Cache-Control': 'no-store' });
  fs.createReadStream(f).pipe(res);
});
await new Promise(r => server.listen(0, '127.0.0.1', r));
const url = `http://127.0.0.1:${server.address().port}/src/index.html`;

const browser = await chromium.launch({ args: ['--font-render-hinting=none', '--disable-lcd-text'] });
async function openPage() {
  const ctx = await browser.newContext({ viewport: { width: 1080, height: 1920 }, deviceScaleFactor: 1 });
  const page = await ctx.newPage();
  page.on('pageerror', e => console.error('PAGE ERROR', e.message));
  page.on('console', m => { if (m.type() === 'error') console.error('console.error', m.text()); });
  await page.goto(url);
  await page.waitForFunction('window.__ready === true', null, { timeout: 60000 });
  return page;
}

const times = arg('times');
if (times) {
  fs.mkdirSync(path.join(ROOT, 'build/preview'), { recursive: true });
  const page = await openPage();
  for (const t of String(times).split(',').map(Number)) {
    await page.evaluate(t => window.seekTo(t), t);
    await page.screenshot({ path: path.join(ROOT, `build/preview/t_${t.toFixed(2)}.png`) });
    console.log('preview', t);
  }
  await browser.close(); server.close(); process.exit(0);
}

const probe = await openPage();
const total = await probe.evaluate('window.__total'), fps = await probe.evaluate('window.__fps');
await probe.context().close();
const N = Math.ceil(total * fps);
const from = Number(arg('from', 0)), to = Math.min(N, Number(arg('to', N)));
const W = Number(arg('workers', 4));
const outDir = path.join(ROOT, 'build/frames'); fs.mkdirSync(outDir, { recursive: true });
console.log(`render ${to - from} frame (${total.toFixed(1)}s @ ${fps}fps) dengan ${W} worker`);
const t0 = Date.now(); let done = 0;
const chunk = Math.ceil((to - from) / W);
await Promise.all(Array.from({ length: W }, async (_, k) => {
  const page = await openPage();
  for (let i = from + k * chunk; i < Math.min(to, from + (k + 1) * chunk); i++) {
    await page.evaluate(t => window.seekTo(t), i / fps);
    await page.screenshot({ path: path.join(outDir, `f${String(i).padStart(5, '0')}.jpg`), type: 'jpeg', quality: 93 });
    if (++done % 60 === 0) console.log(`  ${done}/${to - from}  (${((Date.now() - t0) / 1000).toFixed(0)}s)`);
  }
}));
await browser.close(); server.close();
if (!process.argv.includes('--no-encode')) {
  const r = spawnSync('ffmpeg', ['-v', 'error', '-y', '-framerate', String(fps), '-i', path.join(outDir, 'f%05d.jpg'),
    '-c:v', 'libx264', '-preset', 'slow', '-crf', '17', '-pix_fmt', 'yuv420p', '-movflags', '+faststart', path.join(ROOT, 'build/video.mp4')], { stdio: 'inherit' });
  if (r.status) process.exit(r.status);
  console.log('video senyap → build/video.mp4');
}
