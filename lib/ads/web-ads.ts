export const WEB_ADSENSE_CLIENT = "ca-pub-8751260838396451";
export const WEB_ADS_SCRIPT_ID = "web-adsense";
export const WEB_ADS_SCRIPT_URL = `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${WEB_ADSENSE_CLIENT}`;
export const WEB_ADS_ERROR_PAGE_ID = "web-ads-excluded-page";
export const WEB_ADS_MEMBERSHIP_CHANNEL = "kakomon:ads-membership-changed";
export const WEB_ADS_RELOADING = "data-web-ads-reloading";

const excludedSegments = new Set([
  "quiz", "account", "auth", "login", "logout", "signin", "signout", "signup",
  "me", "settings", "billing", "checkout", "admin", "api", "api-docs",
  "error", "404", "500", "_not-found", "offline", "search", "modes",
]);

export function isWebAdPath(pathname: string): boolean {
  try {
    const segment = decodeURIComponent(pathname).split("/", 2)[1];
    return segment !== undefined && !excludedSegments.has(segment.toLowerCase());
  } catch {
    return false;
  }
}

export async function hasFreeWebAccess(signal: AbortSignal): Promise<boolean> {
  const response = await fetch("/api/billing/status", {
    cache: "no-store", credentials: "same-origin", signal,
  });
  if (!response.ok && response.status !== 401) return false;
  const value: { entitled?: unknown; error?: unknown } | null = await response.json();
  // Only the billing API's explicit guest and free-member responses allow ads.
  return response.status === 401 ? value?.error === "sign_in_required" : value?.entitled === false;
}

export const webAdsNavigation = { reload: () => window.location.reload() };

export function discardWebAds() {
  const root = document.documentElement;
  if (root.hasAttribute(WEB_ADS_RELOADING) || !document.getElementById(WEB_ADS_SCRIPT_ID)) return;
  // A running third-party script survives an App Router transition or removal
  // of its <script> tag. A fresh document also clears ads it inserted itself.
  root.setAttribute(WEB_ADS_RELOADING, "");
  webAdsNavigation.reload();
}

export function notifyWebAdPurchase() {
  if (typeof BroadcastChannel === "undefined") return;
  try {
    const channel = new BroadcastChannel(WEB_ADS_MEMBERSHIP_CHANNEL);
    try { channel.postMessage("paid"); }
    finally { channel.close(); }
  } catch { /* The next page load or focus will check membership. */ }
}
