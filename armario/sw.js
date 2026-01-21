// sw.js
const cacheName = 'armario-v1';
const assets = [
  './',
  './index.html',
  './outfit.html',
  './assets/fondo2.jpg', // Añade aquí tus archivos principales
  './manifest.json'
];

self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(cacheName).then(cache => cache.addAll(assets))
  );
});

self.addEventListener('fetch', e => {
  e.respondWith(
    caches.match(e.request).then(res => res || fetch(e.request))
  );
});
