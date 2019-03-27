const version = "1.0.5";
const cacheName = `colorsense-${version}`;
self.addEventListener('install', function (e) {
    const timeStamp = Date.now();
    e.waitUntil(
        caches.open(cacheName).then(function (cache) {
            return cache.addAll([
                '/colorsense/',
                '/colorsense/index.html',
                '/colorsense/pwacompat.min.js',
                '/colorsense/colorsense.js',
                '/colorsense/colorsense.wasm',
                '/colorsense/colorsense.data'
            ]);
        }).then(() => self.skipWaiting())
    );
});

self.addEventListener('activate', event => {
    event.waitUntil(self.clients.claim());
});

self.addEventListener('fetch', event => {
    event.respondWith(
        caches.open(cacheName)
            .then(cache => cache.match(event.request, {ignoreSearch: true}))
            .then(response => {
                return response || fetch(event.request);
            })
    );
});