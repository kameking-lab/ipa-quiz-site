import { track } from "@vercel/analytics";
import { jstDay } from "@/lib/billing/domain";

type DailyFunnelEvent = "first_answer" | "free_limit_reached" | "monthly_offer_viewed" | "checkout_started";
const prefix = "kakomon-ai:analytics-daily:";

/** Share the daily marker across same-origin tabs, without sending an identifier. */
export async function trackDailyFunnel(event: DailyFunnelEvent): Promise<void> {
  if (typeof window === "undefined") return;
  const day = jstDay(new Date());
  const key = prefix + event;
  const send = () => {
    if (localStorage.getItem(key) === day) return;
    localStorage.setItem(key, day);
    track(event);
  };
  try {
    if (navigator.locks?.request) await navigator.locks.request(key, send);
    else send();
  } catch { /* Optional measurement must not affect the flow. */ }
}
