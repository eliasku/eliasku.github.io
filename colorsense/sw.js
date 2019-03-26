self.addEventListener('install', function(e) {
    e.waitUntil(
        caches.open('video-store').then(function(cache) {
            return cache.addAll([
                '/colorsense/',
                '/colorsense/index.html',
                '/colorsense/colorsense.js',
                '/colorsense/colorsense.wasm',
                '/colorsense/colorsense.data'
            ]);
        })
    );
});

self.addEventListener('fetch', function(e) {
    console.log(e.request.url);
    e.respondWith(
        caches.match(e.request).then(function(response) {
            return response || fetch(e.request);
        })
    );
});