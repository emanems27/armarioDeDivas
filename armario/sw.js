// sw.js
const cacheName = 'armario-v1';
const assets = ['./outfit.html', './style.css', './app.js', './assets/fondos/files.json'];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(cacheName).then(cache => cache.addAll(assets)));
});

self.addEventListener('fetch', e => {
  e.respondWith(caches.match(e.request).then(res => res || fetch(e.request)));
});
