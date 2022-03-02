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