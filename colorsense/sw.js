var cacheName = "colorsense_1.0.5_7";

self.addEventListener('install', function (e) {
    var timeStamp = Date.now();
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
        }).then(function () {
            self.skipWaiting();
        })
    );
});

self.addEventListener('activate', function (event) {
    event.waitUntil(self.clients.claim());
});

self.addEventListener('fetch', function (event) {
    event.respondWith(
        caches.open(cacheName)
            .then(function (cache) {
                cache.match(event.request, {ignoreSearch: true});
            })
            .then(function (response) {
                return response || fetch(event.request);
            })
    );
});