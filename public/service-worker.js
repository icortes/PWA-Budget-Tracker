const FILES_TO_CACHE = [
  '/',
  '/index.html',
  '/styles.css',

  '/dist/index.bundle.js',
  '/dist/db.bundle.js',
  '/dist/manifest.json',

  '/dist/icons/icon_96x96.png',
  '/dist/icons/icon_128x128.png',
  '/dist/icons/icon_192x192.png',
  '/dist/icons/icon_256x256.png',
  '/dist/icons/icon_384x384.png',
  '/dist/icons/icon_512x512.png',

  'https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css',
  'https://cdn.jsdelivr.net/npm/chart.js@2.8.0'
];

const PRECACHE = 'pre-cache-v2';
const RUNTIME = 'runtime-v2';

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches
      .open(PRECACHE)
      .then((cache) => cache.addAll(FILES_TO_CACHE))
      .then(self.skipWaiting())
  );
});

// The activate handler takes care of cleaning up old caches.
self.addEventListener('activate', (event) => {
  const currentCaches = [PRECACHE, RUNTIME];
  event.waitUntil(
    caches
      .keys()
      .then((cacheNames) => {
        return cacheNames.filter((cacheName) => !currentCaches.includes(cacheName));
      })
      .then((cachesToDelete) => {
        return Promise.all(
          cachesToDelete.map((cacheToDelete) => {
            return caches.delete(cacheToDelete);
          })
        );
      })
      .then(() => self.clients.claim())
  );
});

