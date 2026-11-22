import { trackDailyFunnel } from "@/lib/analytics/daily-funnel-client";
import { nativeClient, NATIVE_HEADER } from "@/mobile/shared/contracts";
import { GUEST_ANSWER_HANDLED, type ClientConversion } from "./conversion-contract";
import { jstDay } from "./domain";

const endpoint = "/api/funnel/conversion";
let guestDay: { key: string; confirmed: boolean; pending: boolean; queued: boolean } | undefined;

function sendGuestAnswer(body: string, options: RequestInit, native: boolean): void {
  // The dashboard counts a signed guest cookie once per JST day and channel.
  // Keep this in the current document so a login/logout reload starts fresh.
  const key = `${jstDay(new Date())}:${native ? "ios" : "web"}`;
  if (guestDay?.key !== key) guestDay = { key, confirmed: false, pending: false, queued: false };
  const current = guestDay;
  if (current.confirmed) return;
  if (current.pending) { current.queued = true; return; }
  current.pending = true;
  void (async () => {
    try {
      const response = await fetch(endpoint, { ...options, body });
      current.confirmed = response.ok && response.headers.get(GUEST_ANSWER_HANDLED) === "1";
    } catch { /* A later answer can still be counted. */ }
    finally {
      current.pending = false;
      if (current === guestDay && !current.confirmed && current.queued) {
        current.queued = false;
        sendGuestAnswer(body, options, native);
      }
    }
  })();
}

/** Plan events are occurrences. Guest answers wait for one daily confirmation. */
export function sendConversion(event: ClientConversion): void {
  if (typeof window === "undefined") return;
  if (event === "guest_answered") void trackDailyFunnel("first_answer");
  if (event === "offer_viewed") void trackDailyFunnel("monthly_offer_viewed");
  try {
    const body = JSON.stringify({ event });
    const native = nativeClient();
    const options: RequestInit = { method: "POST", keepalive: true, credentials: "same-origin", headers: {
      "Content-Type": "application/json", ...(native ? { [NATIVE_HEADER]: "ios" } : {}),
    } };
    if (event === "guest_answered") { sendGuestAnswer(body, options, native); return; }
    // Native requests need the platform header; a beacon cannot attach it.
    if (!native && typeof navigator.sendBeacon === "function") {
      try { if (navigator.sendBeacon(endpoint, new Blob([body], { type: "text/plain;charset=UTF-8" }))) return; } catch { /* fetch fallback */ }
    }
    void fetch(endpoint, { ...options, body }).catch(() => {});
  } catch { /* Measurement never affects navigation or answers. */ }
}
