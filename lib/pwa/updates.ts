// Never reload quiz/answer routes, even before the first input or after blur.
const PASSIVE_PATHS = new Set(["/", "/about", "/modes/year", "/modes/topic", "/blog"]);

export function canReloadForUpdate(pathname: string, edited: boolean, doc: Document) {
  if (edited || !PASSIVE_PATHS.has(pathname)) return false;
  return !doc.activeElement?.matches("input, textarea, select, [contenteditable=true]")
    && !doc.querySelector('[role="dialog"], dialog[open], [aria-busy="true"]');
}

export function startPwaUpdates(options: { buildId: string; native: boolean; reload?: () => void }) {
  const sw = navigator.serviceWorker;
  const reload = options.reload ?? (() => window.location.reload());
  let cancelled = false;
  let reloading = false;
  let pending = false;
  let pendingVersion = options.native ? "native-no-worker" : "";
  let edited = false;
  let registration: ServiceWorkerRegistration | undefined;
  let updateInFlight = false;
  let editPath = window.location.pathname;
  const channels = new Set<MessagePort>();

  const maybeReload = () => {
    if (editPath !== window.location.pathname) {
      edited = false;
      editPath = window.location.pathname;
    }
    if (cancelled || reloading || !pending || !navigator.onLine || document.visibilityState !== "visible") return;
    if (!canReloadForUpdate(window.location.pathname, edited, document)) return;
    // Also guard across document reloads if a CDN/offline document is still old.
    const reloadKey = "ipa-quiz-sw-reloaded";
    try {
      if (sessionStorage.getItem(reloadKey) === pendingVersion) return;
      sessionStorage.setItem(reloadKey, pendingVersion);
    } catch { /* Private browsing may disable sessionStorage. */ }
    pending = false;
    reloading = true;
    reload();
  };
  const checkVersion = () => {
    if (cancelled || options.native || !sw.controller) return;
    const channel = new MessageChannel();
    channels.add(channel.port1);
    const close = () => { channel.port1.close(); channels.delete(channel.port1); };
    channel.port1.onmessage = ({ data }) => {
      close();
      if (typeof data?.version === "string" && data.version !== options.buildId) {
        pendingVersion = data.version;
        pending = true;
        maybeReload();
      }
    };
    sw.controller.postMessage({ type: "GET_VERSION" }, [channel.port2]);
    // The legacy worker has no version reply. Its normal update still runs.
    window.setTimeout(close, 5000);
  };
  const update = async () => {
    maybeReload();
    checkVersion();
    if (!registration || updateInFlight || !navigator.onLine) return;
    updateInFlight = true;
    try { await registration.update(); } catch { /* retry next foreground/online */ }
    finally { updateInFlight = false; }
  };
  const onVisibility = () => { if (document.visibilityState === "visible") void update(); };
  const onEdit = () => { edited = true; editPath = window.location.pathname; };
  const onControllerChange = () => {
    if (cancelled) return;
    if (options.native) { pending = true; maybeReload(); }
    else checkVersion();
  };
  sw.addEventListener("controllerchange", onControllerChange);
  document.addEventListener("visibilitychange", onVisibility);
  document.addEventListener("input", onEdit, true);
  document.addEventListener("change", onEdit, true);
  window.addEventListener("online", update);
  window.addEventListener("pageshow", update);
  // A protected quiz may return home through a client-side navigation.
  const timer = window.setInterval(maybeReload, 1000);

  if (options.native) {
    // Unregister alone leaves this document controlled until navigation.
    // Native signed offline study uses a separate store and remains untouched.
    void (async () => {
      try {
        const controlled = !!sw.controller;
        const registrations = await sw.getRegistrations();
        await Promise.all(registrations.map(r => r.unregister()));
        if (typeof caches !== "undefined") {
          const names = await caches.keys();
          await Promise.all(names.filter(n => n.startsWith("ipa-quiz-")).map(n => caches.delete(n)));
        }
        if (controlled) { pending = true; maybeReload(); }
      } catch { /* WebKit may disable service worker/storage support. */ }
    })();
  } else {
    void (async () => {
      try {
        const reg = await sw.register("/sw.js", { scope: "/", updateViaCache: "none" });
        if (cancelled) return;
        registration = reg;
        if (reg.waiting) reg.waiting.postMessage({ type: "SKIP_WAITING" });
        // New workers skipWaiting themselves. Old registrations keep their URL.
        await update();
      } catch { /* Offline startup must remain usable. */ }
    })();
  }

  return () => {
    cancelled = true;
    sw.removeEventListener("controllerchange", onControllerChange);
    document.removeEventListener("visibilitychange", onVisibility);
    document.removeEventListener("input", onEdit, true);
    document.removeEventListener("change", onEdit, true);
    window.removeEventListener("online", update);
    window.removeEventListener("pageshow", update);
    window.clearInterval(timer);
    channels.forEach(port => port.close());
  };
}
