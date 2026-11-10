/* Acordia — service worker (generado por tools/build_web.py; no editar en web/) */
const VERSION = 'df5984c4837c';
const CACHE = 'acordia-' + VERSION;
const FONTS = 'acordia-fuentes';
const SHELL = ["./", "index.html", "manifest.webmanifest", "apple-touch-icon.png", "icon-192.png", "icon-512.png", "favicon-32.png", "lib/jspdf.umd.min.js", "lib/tesseract.min.js", "piano/A2.mp3", "piano/A3.mp3", "piano/A4.mp3", "piano/A5.mp3", "piano/C2.mp3", "piano/C3.mp3", "piano/C4.mp3", "piano/C5.mp3", "piano/C6.mp3", "piano/Ds2.mp3", "piano/Ds3.mp3", "piano/Ds4.mp3", "piano/Ds5.mp3", "piano/Fs2.mp3", "piano/Fs3.mp3", "piano/Fs4.mp3", "piano/Fs5.mp3"];
const OCR = ["ocr/lang/spa-data.wasm", "ocr/tesseract-core-lstm.wasm.js", "ocr/tesseract-core-simd-lstm.wasm.js", "ocr/worker.min.js"];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(SHELL)).then(() => self.skipWaiting()));
});

self.addEventListener('activate', e => {
  e.waitUntil((async () => {
    for (const k of await caches.keys()) if (k !== CACHE && k !== FONTS) await caches.delete(k);
    await self.clients.claim();
    // El lector de fotos (~10 MB) se guarda en segundo plano para usarlo sin internet.
    try { const c = await caches.open(CACHE); await c.addAll(OCR); } catch (err) {}
  })());
});

self.addEventListener('fetch', e => {
  const req = e.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);
  if (req.mode === 'navigate') {
    // Página: primero la red (para recibir mejoras), si no hay señal, la copia guardada.
    e.respondWith(fetch(req).then(r => { const cp = r.clone(); caches.open(CACHE).then(c => c.put('index.html', cp)); return r; })
      .catch(() => caches.match('index.html')));
    return;
  }
  if (url.hostname === 'fonts.googleapis.com' || url.hostname === 'fonts.gstatic.com') {
    e.respondWith(caches.open(FONTS).then(async c => {
      const hit = await c.match(req);
      const net = fetch(req).then(r => { c.put(req, r.clone()); return r; }).catch(() => hit);
      return hit || net;
    }));
    return;
  }
  if (url.origin !== self.location.origin) return;
  const key = url.pathname.endsWith('/spa-data.wasm') ? url.origin + url.pathname : req;
  e.respondWith(caches.match(key, { ignoreSearch: true }).then(hit => hit || fetch(req).then(r => {
    if (r.ok) { const cp = r.clone(); caches.open(CACHE).then(c => c.put(key, cp)); }
    return r;
  })));
});
