// 過去問AI Service Worker
// Strategy: cache-first for static assets, network-first for pages, skip API routes.
// CACHE_VERSION changes each time this file is installed, busting stale caches on deploy.

const CACHE_VERSION = 'v' + Date.now();
const STATIC_CACHE = `ipa-quiz-static-${CACHE_VERSION}`;
const PAGE_CACHE = `ipa-quiz-pages-${CACHE_VERSION}`;

const PRECACHE_PAGES = ['/', '/about', '/modes/year', '/modes/topic'];

self.addEventListener('install', (event) => {
  event.waitUntil(
    Promise.all([
      caches.open(STATIC_CACHE),
      caches
        .open(PAGE_CACHE)
        .then((cache) => cache.addAll(PRECACHE_PAGES).catch(() => {})),
    ]).then(() => self.skipWaiting()),
  );
});

self.addEventListener('activate', (event) => {
  const CURRENT = [STATIC_CACHE, PAGE_CACHE];
  event.waitUntil(
    caches
      .keys()
      .then((names) =>
        Promise.all(names.filter((n) => !CURRENT.includes(n)).map((n) => caches.delete(n))),
      )
      .then(() => self.clients.claim()),
  );
});

self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Only handle same-origin GET requests
  if (request.method !== 'GET' || url.origin !== self.location.origin) return;

  // /api/* — always network, never cache
  if (url.pathname.startsWith('/api/')) return;

  // Cache-first for Next.js static chunks (immutable content-hashed filenames)
  if (url.pathname.startsWith('/_next/static/')) {
    event.respondWith(
      caches.match(request).then(
        (cached) =>
          cached ??
          fetch(request).then((res) => {
            if (res.ok) {
              caches.open(STATIC_CACHE).then((c) => c.put(request, res.clone()));
            }
            return res;
          }),
      ),
    );
    return;
  }

  // Network-first with cache fallback for pages
  event.respondWith(
    fetch(request)
      .then((res) => {
        if (res.ok) {
          caches.open(PAGE_CACHE).then((c) => c.put(request, res.clone()));
        }
        return res;
      })
      .catch(() => caches.match(request)),
  );
});

// Push notifications: server pushes JSON {title, body, url, tag} payload.
// Falls back to sensible defaults when payload is missing.
self.addEventListener('push', (event) => {
  let payload = {};
  try {
    payload = event.data ? event.data.json() : {};
  } catch {
    payload = { title: '過去問AI', body: event.data ? event.data.text() : '' };
  }
  const title = payload.title || '過去問AI';
  const body = payload.body || 'デイリーチャレンジが届きました';
  const url = payload.url || '/challenge';
  const tag = payload.tag || 'ipa-quiz-default';
  const options = {
    body,
    icon: '/icon-192.svg',
    badge: '/icon-192.svg',
    tag,
    data: { url },
    renotify: false,
  };
  event.waitUntil(self.registration.showNotification(title, options));
});

self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  const url = (event.notification.data && event.notification.data.url) || '/';
  event.waitUntil(
    self.clients.matchAll({ type: 'window', includeUncontrolled: true }).then((clientList) => {
      for (const client of clientList) {
        if ('focus' in client) {
          client.navigate(url);
          return client.focus();
        }
      }
      if (self.clients.openWindow) return self.clients.openWindow(url);
      return undefined;
    }),
  );
});
