/**
 * Service Worker for Progressive Web App
 * Enables offline support and performance caching
 */

const CACHE_VERSION = 'v1-gewey-2024';
const CACHE_ASSETS = [
    '/',
    '/index.html',
    '/css/bones.css',
    '/css/text.css',
    '/css/images.css',
    '/css/modern.css',
    '/js/dynamichead.js',
    '/js/modernEnhancements.js',
    '/js/sortByClickCount.js',
    '/js/verp.js',
    'https://fonts.googleapis.com/css?family=Inconsolata',
    'https://fonts.googleapis.com/icon?family=Material+Icons',
    'https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js'
];

// Install event - cache assets
self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_VERSION).then((cache) => {
            console.log('Caching app shell');
            return cache.addAll(CACHE_ASSETS).catch((err) => {
                console.warn('Some assets failed to cache:', err);
                // Don't fail install if some assets can't be cached
                return Promise.resolve();
            });
        })
    );
    self.skipWaiting();
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

// Fetch event - implement caching strategy
self.addEventListener('fetch', (event) => {
    // Only handle GET requests
    if (event.request.method !== 'GET') {
        return;
    }

    // Network-first strategy for API calls
    if (event.request.url.includes('/api/')) {
        event.respondWith(
            fetch(event.request)
                .then((response) => {
                    // Cache successful responses
                    if (response.status === 200) {
                        const cache = caches.open(CACHE_VERSION);
                        cache.then((c) => c.put(event.request, response.clone()));
                    }
                    return response;
                })
                .catch(() => {
                    // Fall back to cache on error
                    return caches.match(event.request);
                })
        );
        return;
    }

    // Cache-first strategy for static assets
    event.respondWith(
        caches.match(event.request).then((cachedResponse) => {
            if (cachedResponse) {
                return cachedResponse;
            }

            return fetch(event.request).then((response) => {
                // Cache successful responses
                if (!response || response.status !== 200 || response.type !== 'basic') {
                    return response;
                }

                const responseToCache = response.clone();
                caches.open(CACHE_VERSION).then((cache) => {
                    cache.put(event.request, responseToCache);
                });

                return response;
            }).catch(() => {
                // Return offline page or cached version
                return caches.match('/index.html');
            });
        })
    );
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
