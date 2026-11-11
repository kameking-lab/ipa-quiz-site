import type { ClientFunnelEvent } from "./funnel-events";
import { firstTouch } from "@/lib/analytics/first-touch";
import { observeJourney } from "./journey-client";
import { jstDay } from "./domain";

const sent = new Set<string>();

/**
 * Report one funnel step. The server de-duplicates per visitor and day; this
 * only avoids repeated requests from re-renders in the same page. sendBeacon
 * survives the navigation that usually follows a tap (checkout, sign-in);
 * a keepalive request is used when beacon is unavailable or cannot queue.
 * The body carries the event name only: no ID, URL or other personal data.
 */
export function sendFunnelEvent(event: ClientFunnelEvent) {
  // Independent of the older per-day event de-duplication and analytics SDKs.
  const stages = { free_limit_reached: "offer", paywall_plan_click: "plan_click", purchase_signin_view: "signin", billing_page_view: "billing", checkout_canceled: "canceled" } as const;
  if (event in stages) observeJourney({ stage: stages[event as keyof typeof stages], offer: event === "free_limit_reached" || event === "billing_page_view" });
  if (typeof navigator === "undefined") return;
  const key = `${jstDay(new Date())}:${event}`;
  if (sent.has(key)) return;
  sent.add(key);
  try {
    firstTouch();
    const body = JSON.stringify({ event });
    try {
      if (typeof navigator.sendBeacon === "function" && navigator.sendBeacon("/api/funnel", new Blob([body], { type: "text/plain;charset=UTF-8" }))) return;
    } catch { /* Fall through to keepalive. */ }
    void fetch("/api/funnel", { method: "POST", body, keepalive: true, headers: { "Content-Type": "text/plain;charset=UTF-8" } })
      .then(response => { if (!response.ok) sent.delete(key); })
      .catch(() => { sent.delete(key); });
  } catch { sent.delete(key); /* Counting never affects the page. */ }
}

/** Test helper: forget what this page already sent. */
export function resetFunnelEventsForTest() { sent.clear(); }
