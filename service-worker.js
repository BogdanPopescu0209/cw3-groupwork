let cacheName = 'onlinestore-v1';
let cacheFiles = [
    'index.html',
    'style.css',
    'index.webmanifest',
    'images/512x512.png',
    'images/192x192.png'
]

self.addEventListener('install', (event) => {

    console.log('[service worker] install');

    event.waitUntil(

        caches.open(cacheName).then((cache) => {

            console.log('[service worker] caching files');

            return cache.addAll(cacheFiles);
        })
    )
});

self.addEventListener('fetch', function (event) {

    event.respondWith(

        caches.match(event.request).then(function (r) {

            return r || fetch(event.request).then(function (response) {

                return caches.open(cacheName).then(function (cache) {

                    cache.put(event.request, response.clone());

                    return response;
                })
            })
        })
    )
})