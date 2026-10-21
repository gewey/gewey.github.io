/**
 * Service Worker for Progressive Web App
 * Enables offline support and performance caching
 */

const CACHE_VERSION = 'v3-gewey-2026';
const RUNTIME_CACHE = 'runtime-gewey-2026';
const CACHE_ASSETS = [
    '/',
    '/index.html',
    '/css/bones.css',
    '/css/text.css',
    '/css/images.css',
    '/css/modern.css',
    '/js/dynamichead.js',
    '/js/sortByClickCount.js',
    '/js/verp.js',
    '/img/btn/bm/manifest.json',
    'https://fonts.googleapis.com/css?family=Inconsolata',
    'https://fonts.googleapis.com/icon?family=Material+Icons',
    'https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js'
];

async function cacheButtonImages(cache) {
    try {
        const response = await fetch('/img/btn/bm/manifest.json', { cache: 'no-cache' });
        if (!response.ok) return;

        const list = await response.json();
        if (Array.isArray(list) && list.length) {
            await cache.addAll(list);
        }
    } catch (error) {
        console.warn('Button image precache failed:', error);
    }
}

// Install event - cache assets
self.addEventListener('install', (event) => {
    event.waitUntil((async () => {
        const cache = await caches.open(CACHE_VERSION);
        console.log('Caching app shell');

        try {
            await cache.addAll(CACHE_ASSETS);
        } catch (err) {
            console.warn('Some assets failed to cache:', err);
        }

        await cacheButtonImages(cache);
        self.skipWaiting();
    })());
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cacheName) => {
                    if (cacheName !== CACHE_VERSION) {
                        console.log('Deleting old cache:', cacheName);
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
    self.clients.claim();
});

// Helper strategy: Image and Font cache-first
function isStaticMediaRequest(request, requestUrl) {
    const isMedia = request.destination === 'image' || request.destination === 'font';
    const isGoogleFont = requestUrl.hostname === 'fonts.googleapis.com' || requestUrl.hostname === 'fonts.gstatic.com';
    return isMedia || isGoogleFont;
}

function handleMediaFetch(request) {
    return caches.match(request).then((cached) => {
        if (cached) return cached;

        return fetch(request).then((response) => {
            if (!response) return response;

            const responseToCache = response.clone();
            caches.open(RUNTIME_CACHE).then((cache) => {
                cache.put(request, responseToCache);
            });

            return response;
        });
    });
}

function handleApiFetch(request) {
    return fetch(request)
        .then((response) => {
            if (response.status === 200) {
                const cache = caches.open(CACHE_VERSION);
                cache.then((c) => c.put(request, response.clone()));
            }
            return response;
        })
        .catch(() => caches.match(request));
}

function handleStaticAssetFetch(request) {
    return caches.match(request).then((cachedResponse) => {
        if (cachedResponse) {
            return cachedResponse;
        }

        return fetch(request).then((response) => {
            if (!response || response.status === 206) {
                return response;
            }

            if (response.ok || response.type === 'opaque') {
                const responseToCache = response.clone();
                caches.open(CACHE_VERSION).then((cache) => {
                    cache.put(request, responseToCache);
                });
            }

            return response;
        }).catch(() => caches.match('/index.html'));
    });
}

// Fetch event - implement caching strategy
self.addEventListener('fetch', (event) => {
    if (event.request.method !== 'GET') {
        return;
    }

    const requestUrl = new URL(event.request.url);

    if (isStaticMediaRequest(event.request, requestUrl)) {
        event.respondWith(handleMediaFetch(event.request));
        return;
    }

    if (event.request.url.includes('/api/')) {
        event.respondWith(handleApiFetch(event.request));
        return;
    }

    event.respondWith(handleStaticAssetFetch(event.request));
});

// Background sync for future enhancements
self.addEventListener('sync', (event) => {
    if (event.tag === 'sync-bookmarks') {
        event.waitUntil(syncBookmarks());
    }
});

async function syncBookmarks() {
    try {
        const response = await fetch('/api/bookmarks/sync', {
            method: 'POST',
            body: JSON.stringify({
                timestamp: new Date().toISOString()
            })
        });
        return response.json();
    } catch (error) {
        console.error('Sync failed:', error);
    }
}

// Push notifications
self.addEventListener('push', (event) => {
    const options = {
        body: event.data?.text() || 'New update available',
        icon: '/favicon.ico',
        badge: '/img/logo/gewey/badge-72.png',
        tag: 'notification',
        requireInteraction: false
    };

    event.waitUntil(
        self.registration.showNotification('Gewey Homepage', options)
    );
});

// Handle notification clicks
self.addEventListener('notificationclick', (event) => {
    event.notification.close();
    event.waitUntil(
        clients.matchAll({ type: 'window', includeUncontrolled: true }).then((clientList) => {
            // Focus existing window or open new one
            for (let i = 0; i < clientList.length; i++) {
                const client = clientList[i];
                if (client.url === '/' && 'focus' in client) {
                    return client.focus();
                }
            }
            if (clients.openWindow) {
                return clients.openWindow('/');
            }
        })
    );
});

console.log('Service Worker registered');
