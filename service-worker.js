const cacheName = 'deni-topup-cache-v1';
const filesToCache = [
    '/',
    '/index.html',
    '/html/game.html',
    '/html/home.html',
    '/html/signup.html',
    '/style.css',
    '/manifest.json',
    '/icons/icon-192x192.jpg',
    '/icons/icon-512x512.jpg',
];

self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(cacheName).then(cache => {
            return cache.addAll(filesToCache);
        })
    );
});

// Activate Service Worker
self.addEventListener('activate', event => {
    const cacheWhitelist = [cacheName];
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cacheName => {
                    if (!cacheWhitelist.includes(cacheName)) {
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});

// Fetch from cache
self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request).then(cachedResponse => {
            return cachedResponse || fetch(event.request);
        })
    );
});
