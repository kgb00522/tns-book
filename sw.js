// 들으며 읽는 책 — 페이지 보관(판 a3e0c3ce). 먼저 기기 것을 보이고, 인터넷이 되면 새 판을 받아 다음에 씀.
const C = 'tns-book-a3e0c3ce', FILES = ['./', './index.html', './manifest.webmanifest', './icon-180.png', './icon-512.png', './audio/ex_x1_1.mp3', './audio/ex_x2_1.mp3', './audio/ex_x2_2.mp3', './audio/ex_x2_3.mp3', './audio/ex_x9_1.mp3', './audio/ex_x9_2.mp3', './audio/ex_xp1_1.mp3', './audio/ex_xp9_1.mp3'];
self.addEventListener('install', e => { self.skipWaiting(); e.waitUntil(caches.open(C).then(c => c.addAll(FILES))); });
self.addEventListener('activate', e => { e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k !== C).map(k => caches.delete(k)))).then(() => self.clients.claim())); });
self.addEventListener('fetch', e => {
  const u = new URL(e.request.url); if (e.request.method !== 'GET' || u.origin !== location.origin) return;
  e.respondWith(caches.open(C).then(c => c.match(e.request, { ignoreSearch: true }).then(hit => {
    const net = fetch(e.request).then(r => { if (r.ok) c.put(e.request, r.clone()); return r; }).catch(() => hit);
    return hit || net;
  })));
});
