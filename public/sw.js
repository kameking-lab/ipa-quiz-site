// 過去問AI Service Worker
// Strategies:
//   - cache-first for immutable static chunks (/_next/static, fonts, icons)
//   - stale-while-revalidate for content pages (/q/*, /essays/*, /blog/*)
//   - network-first with cache fallback for everything else
//   - /offline served as last-resort fallback for navigation requests
//   - /api/* always bypasses the cache (auth + dynamic)
// CACHE_VERSION is a fixed string — bump it manually when changing cache
// strategy or precache list to invalidate stale caches on the next deploy.
// Do NOT use Date.now() here: the service worker is re-evaluated on every
// idle restart, which would produce a fresh cache name each time, orphan
// previously-stored caches (activate fires only on install), and effectively
// nullify the cache strategy while bloating client storage.

const CACHE_VERSION = 'v2';
const STATIC_CACHE = `ipa-quiz-static-${CACHE_VERSION}`;
const PAGE_CACHE = `ipa-quiz-pages-${CACHE_VERSION}`;
const CONTENT_CACHE = `ipa-quiz-content-${CACHE_VERSION}`;

const OFFLINE_URL = '/offline';

// Pages that need to be available the first time the user goes offline.
const PRECACHE_PAGES = ['/', '/about', '/modes/year', '/modes/topic', OFFLINE_URL];

const CONTENT_PATH_PREFIXES = ['/q/', '/essays/', '/blog/'];

// Cap each cache to keep storage bounded on mobile.
const MAX_CONTENT_ENTRIES = 100;
const MAX_PAGE_ENTRIES = 50;

self.addEventListener('install', (event) => {
  event.waitUntil(
    Promise.all([
      caches.open(STATIC_CACHE),
      caches
        .open(PAGE_CACHE)
        .then((cache) =>
          // Cache each page individually so a single 404 doesn't fail the whole install.
          Promise.all(
            PRECACHE_PAGES.map((url) =>
              fetch(url, { credentials: 'same-origin' })
                .then((res) => (res.ok ? cache.put(url, res) : null))
                .catch(() => null),
            ),
          ),
        ),
    ]).then(() => self.skipWaiting()),
  );
});

self.addEventListener('activate', (event) => {
  const CURRENT = [STATIC_CACHE, PAGE_CACHE, CONTENT_CACHE];
  event.waitUntil(
    caches
      .keys()
      .then((names) =>
        Promise.all(names.filter((n) => !CURRENT.includes(n)).map((n) => caches.delete(n))),
      )
      .then(() => self.clients.claim()),
  );
});

function isContentPath(pathname) {
  return CONTENT_PATH_PREFIXES.some((prefix) => pathname.startsWith(prefix));
}

async function trimCache(cacheName, maxEntries) {
  try {
    const cache = await caches.open(cacheName);
    const keys = await cache.keys();
    if (keys.length <= maxEntries) return;
    const remove = keys.slice(0, keys.length - maxEntries);
    await Promise.all(remove.map((req) => cache.delete(req)));
  } catch {
    // best-effort
  }
}

async function staleWhileRevalidate(request, cacheName, maxEntries) {
  const cache = await caches.open(cacheName);
  const cached = await cache.match(request);
  const networkPromise = fetch(request)
    .then((res) => {
      if (res && res.ok) {
        cache.put(request, res.clone()).then(() => trimCache(cacheName, maxEntries));
      }
      return res;
    })
    .catch(() => null);
  return cached || (await networkPromise) || cache.match(OFFLINE_URL) || Response.error();
}

async function networkFirst(request, cacheName, maxEntries) {
  const cache = await caches.open(cacheName);
  try {
    const res = await fetch(request);
    if (res && res.ok) {
      cache.put(request, res.clone()).then(() => trimCache(cacheName, maxEntries));
    }
    return res;
  } catch {
    const cached = await cache.match(request);
    if (cached) return cached;
    if (request.mode === 'navigate') {
      const offline = await cache.match(OFFLINE_URL);
      if (offline) return offline;
    }
    return Response.error();
  }
}

self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  if (request.method !== 'GET' || url.origin !== self.location.origin) return;

  // /api/* — always network, never cache
  if (url.pathname.startsWith('/api/')) return;

  // Cache-first for Next.js immutable chunks
  if (url.pathname.startsWith('/_next/static/') || url.pathname.startsWith('/fonts/')) {
    event.respondWith(
      caches.match(request).then(
        (cached) =>
          cached ??
          fetch(request).then((res) => {
            if (res && res.ok) {
              caches.open(STATIC_CACHE).then((c) => c.put(request, res.clone()));
            }
            return res;
          }),
      ),
    );
    return;
  }

  // Content pages (questions, essays, blog) — stale-while-revalidate so repeat
  // visits feel instant AND work offline once visited.
  if (isContentPath(url.pathname)) {
    event.respondWith(staleWhileRevalidate(request, CONTENT_CACHE, MAX_CONTENT_ENTRIES));
    return;
  }

  // Everything else — network-first, fall back to cache, then /offline for navigations.
  event.respondWith(networkFirst(request, PAGE_CACHE, MAX_PAGE_ENTRIES));
});

// Allow the page to trigger an immediate activation after a deploy.
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
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
