const cacheName = 'armario-v1';
const assets = [
    './',
    'index.html',
    'outfit.html',
    'style.css', // Asegúrate de que el nombre sea correcto
    'assets/fondo2.jpg',
    'manifest.json'
];

// Instalar el Service Worker y guardar archivos en caché
self.addEventListener('install', e => {
    e.waitUntil(
        caches.open(cacheName).then(cache => {
            return cache.addAll(assets);
        })
    );
});

// Responder desde la caché cuando no hay internet
self.addEventListener('fetch', e => {
    e.respondWith(
        caches.match(e.request).then(res => {
            return res || fetch(e.request);
        })
    );
});
