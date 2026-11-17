// 들으며 읽는 책 — 페이지 보관(판 737df008). 먼저 기기 것을 보이고, 인터넷이 되면 새 판을 받아 다음에 씀.
const C = 'tns-book-737df008', FILES = ['./', './index.html', './manifest.webmanifest', './icon-180.png', './icon-512.png', './audio/ex_x1_1.mp3', './audio/ex_x1_3.mp3', './audio/ex_x1_4.mp3', './audio/ex_x1_5.mp3', './audio/ex_x2_1.mp3', './audio/ex_x2_2.mp3', './audio/ex_x2_3.mp3', './audio/ex_x9_1.mp3', './audio/ex_x9_2.mp3', './audio/ex_xp1_1.mp3', './audio/ex_xp1_1r.mp3', './audio/ex_xp9_1.mp3', './drawer/com02.svg', './drawer/com03.svg', './drawer/com09.svg', './drawer/com10.svg', './drawer/com13.svg', './drawer/jis01.svg', './drawer/jis04.svg', './drawer/jis05.svg', './drawer/jis10.svg', './drawer/jis12.svg', './drawer/jis14.svg', './drawer/saxs05.svg', './drawer/saxs06.svg'];
self.addEventListener('install', e => { self.skipWaiting(); e.waitUntil(caches.open(C).then(c => c.addAll(FILES))); });
self.addEventListener('activate', e => { e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k !== C).map(k => caches.delete(k)))).then(() => self.clients.claim())); });
self.addEventListener('fetch', e => {
  const u = new URL(e.request.url); if (e.request.method !== 'GET' || u.origin !== location.origin) return;
  e.respondWith(caches.open(C).then(c => c.match(e.request, { ignoreSearch: true }).then(hit => {
    const net = fetch(e.request).then(r => { if (r.ok) c.put(e.request, r.clone()); return r; }).catch(() => hit);
    return hit || net;
  })));
});
