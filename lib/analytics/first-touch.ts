import { LS_KEYS } from "@/lib/storage/keys";
import { ATTRIBUTION_COOKIE, normalizeAttribution, type FunnelAttribution } from "@/lib/billing/attribution";

/** First tagged arrival wins for 90 days, including new tabs and the checkout round trip. */
export function firstTouch(): FunnelAttribution | null {
  if (typeof window === "undefined") return null;
  try {
    const now = Date.now();
    let saved: { capturedAt?: number; attribution?: unknown } | null = null;
    try { saved = JSON.parse(localStorage.getItem(LS_KEYS.funnelFirstTouch) ?? "null"); } catch { /* replace corrupt data */ }
    const valid = typeof saved?.capturedAt === "number" && saved.capturedAt <= now && now - saved.capturedAt < 90 * 86400_000;
    const params = new URL(window.location.href).searchParams;
    const previous = valid ? normalizeAttribution(saved?.attribution) : null;
    const arrival = normalizeAttribution({ utm_source: params.get("utm_source"), utm_content: params.get("utm_content") });
    // Repair an unrecognized legacy label when a known campaign arrives.
    const keepPrevious = previous && (previous.utm_content !== "unknown" || !arrival || arrival.utm_content === "unknown");
    const attribution = keepPrevious ? previous : arrival;
    if (!attribution) {
      localStorage.removeItem(LS_KEYS.funnelFirstTouch);
      document.cookie = `${ATTRIBUTION_COOKIE}=; Path=/; Max-Age=0; SameSite=Lax`;
      return null;
    }
    const capturedAt = keepPrevious ? saved!.capturedAt! : now;
    localStorage.setItem(LS_KEYS.funnelFirstTouch, JSON.stringify({ capturedAt, attribution }));
    const remaining = Math.max(0, Math.floor((capturedAt + 90 * 86400_000 - now) / 1000));
    document.cookie = `${ATTRIBUTION_COOKIE}=${encodeURIComponent(JSON.stringify(attribution))}; Path=/; Max-Age=${remaining}; SameSite=Lax${location.protocol === "https:" ? "; Secure" : ""}`;
    return attribution;
  } catch { return null; }
}
