// Served at /sw.js with a build-specific version by app/sw.js/route.ts.
const CACHE_VERSION = '__PWA_BUILD_ID__';
const STATIC_CACHE = `ipa-quiz-static-${CACHE_VERSION}`;
const PAGE_CACHE = `ipa-quiz-pages-${CACHE_VERSION}`;
const CONTENT_CACHE = `ipa-quiz-content-${CACHE_VERSION}`;
const OFFLINE_URL = '/offline';
const PRECACHE_PAGES = ['/', '/about', '/modes/year', '/modes/topic', OFFLINE_URL];
const MAX_CONTENT_ENTRIES = 100;
const MAX_PAGE_ENTRIES = 50;
const MAX_STATIC_ENTRIES = 200;
const CONTENT_PATH_PREFIXES = ['/q/', '/essays/', '/blog/'];
const CACHE_GROUPS = [
  [STATIC_CACHE, 'ipa-quiz-static-', MAX_STATIC_ENTRIES],
  [PAGE_CACHE, 'ipa-quiz-pages-', MAX_PAGE_ENTRIES],
  [CONTENT_CACHE, 'ipa-quiz-content-', MAX_CONTENT_ENTRIES],
];

self.addEventListener('install', (event) => {
  event.waitUntil((async () => {
    const cache = await caches.open(PAGE_CACHE);
    await Promise.all(PRECACHE_PAGES.map(async (url) => {
      try {
        const res = await fetch(url, { credentials: 'same-origin', cache: 'no-cache' });
        if (res.ok) await cache.put(url, res);
      } catch { /* Existing visited pages are migrated even when offline. */ }
    }));
    await self.skipWaiting();
  })());
});

self.addEventListener('activate', (event) => {
  event.waitUntil((async () => {
    const names = await caches.keys();
    // Preserve visited questions and their chunks BEFORE removing old caches.
    // They are only fallbacks offline; never serve migrated HTML ahead of network.
    const migrated = [];
    try {
      for (const [current, prefix] of CACHE_GROUPS) {
        const target = await caches.open(current);
        for (const name of names.filter(n => n.startsWith(prefix) && n !== current).reverse()) {
          const old = await caches.open(name);
          // Do not evict a visited page or one of its chunks during migration.
          // Normal browsing still applies the per-cache bounds when storing.
          for (const request of await old.keys()) {
            if (!(await target.match(request))) {
              const response = await old.match(request);
              if (response) await target.put(request, response);
            }
          }
          migrated.push(name);
        }
      }
      // Delete only the three cache families actually copied above. Unknown
      // ipa-quiz-* stores may belong to another feature and must survive.
      await Promise.all(migrated.map(name => caches.delete(name)));
    } catch { /* Keep every old cache on quota/copy failure; read it below. */ }
    await self.clients.claim();
  })());
});

async function savedResponse(cacheName, request) {
  const prefix = CACHE_GROUPS.find(([name]) => name === cacheName)[1];
  const names = await caches.keys();
  for (const name of [cacheName, ...names.filter(n => n.startsWith(prefix) && n !== cacheName).reverse()]) {
    // Avoid creating an empty cache if a failed migration left only old stores.
    if (!names.includes(name)) continue;
    const response = await (await caches.open(name)).match(request);
    if (response) return response;
  }
}

async function trimCache(cacheName, maxEntries) {
  const cache = await caches.open(cacheName);
  const keys = await cache.keys();
  // Retain the offline shell and freshly precached start pages during migration.
  const removable = keys.filter(key => {
    const url = new URL(key.url);
    return !PRECACHE_PAGES.includes(url.pathname + url.search);
  });
  await Promise.all(removable.slice(0, Math.max(0, keys.length - maxEntries)).map(key => cache.delete(key)));
}

async function store(cacheName, request, response, limit) {
  // A storage quota failure must never turn a successful online response into offline HTML.
  try {
    const cache = await caches.open(cacheName);
    await cache.put(request, response);
    await trimCache(cacheName, limit);
  } catch { /* best effort */ }
}

async function networkFirst(event, cacheName, limit) {
  const { request } = event;
  try {
    // Revalidate HTTP caches too (including HTML, RSC and versionless images).
    const response = await fetch(request, { cache: 'no-cache' });
    if (response.ok) event.waitUntil(store(cacheName, request, response.clone(), limit));
    return response;
  } catch {
    const cached = await savedResponse(cacheName, request);
    if (cached) return cached;
    if (request.mode === 'navigate') {
      const offline = await savedResponse(PAGE_CACHE, OFFLINE_URL);
      if (offline) return offline;
    }
    // Never send an HTML offline shell as an RSC/script response.
    return Response.error();
  }
}

async function cacheFirst(event) {
  const cached = await savedResponse(STATIC_CACHE, event.request);
  if (cached) return cached;
  const response = await fetch(event.request);
  if (response.ok) event.waitUntil(store(STATIC_CACHE, event.request, response.clone(), MAX_STATIC_ENTRIES));
  return response;
}

self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);
  if (request.method !== 'GET' || url.origin !== self.location.origin) return;
  // Keep auth, updates and the manifest out of Cache Storage.
  if (url.pathname.startsWith('/api/') || url.pathname === '/sw.js' || url.pathname === '/manifest.webmanifest') return;
  if (url.pathname.startsWith('/_next/static/') || url.pathname.startsWith('/fonts/')) {
    event.respondWith(cacheFirst(event));
    return;
  }
  const content = CONTENT_PATH_PREFIXES.some(prefix => url.pathname.startsWith(prefix));
  event.respondWith(networkFirst(event, content ? CONTENT_CACHE : PAGE_CACHE,
    content ? MAX_CONTENT_ENTRIES : MAX_PAGE_ENTRIES));
});

self.addEventListener('message', (event) => {
  if (event.data?.type === 'SKIP_WAITING') self.skipWaiting();
  // A client compares its HTML build against the controlling worker, including
  // pages restored from an offline cache or a suspended standalone window.
  if (event.data?.type === 'GET_VERSION') event.ports[0]?.postMessage({ version: CACHE_VERSION });
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
