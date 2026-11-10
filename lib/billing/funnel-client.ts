import type { ClientFunnelEvent } from "./funnel-events";
import { firstTouch } from "@/lib/analytics/first-touch";

const sent = new Set<string>();

/**
 * Report one funnel step. The server de-duplicates per visitor and day; this
 * only avoids repeated requests from re-renders in the same page. sendBeacon
 * survives the navigation that usually follows a tap (checkout, sign-in);
 * every supported browser has it, so there is no fallback request.
 * The body carries the event name only: no ID, URL or other personal data.
 */
export function sendFunnelEvent(event: ClientFunnelEvent) {
  if (typeof navigator === "undefined" || typeof navigator.sendBeacon !== "function" || sent.has(event)) return;
  sent.add(event);
  try {
    firstTouch();
    navigator.sendBeacon("/api/funnel", new Blob([JSON.stringify({ event })], { type: "text/plain;charset=UTF-8" }));
  } catch { /* Counting never affects the page. */ }
}

/** Test helper: forget what this page already sent. */
export function resetFunnelEventsForTest() { sent.clear(); }
