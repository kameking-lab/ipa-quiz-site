import { afterEach, beforeEach, expect, it, vi } from "vitest";
import { sendFunnelEvent, resetFunnelEventsForTest } from "@/lib/billing/funnel-client";
vi.mock("@/lib/billing/journey-client", () => ({ observeJourney: vi.fn() }));
vi.mock("@/lib/analytics/first-touch", () => ({ firstTouch: vi.fn() }));
beforeEach(() => { vi.useFakeTimers(); resetFunnelEventsForTest(); });
afterEach(() => { vi.useRealTimers(); vi.unstubAllGlobals(); vi.restoreAllMocks(); });
it("uses keepalive when beacon rejects the queue and permits a later attempt after failure", async () => {
  Object.defineProperty(navigator, "sendBeacon", { configurable: true, value: vi.fn(() => false) });
  const fetcher = vi.fn().mockResolvedValueOnce({ ok: false }).mockResolvedValue({ ok: true });
  vi.stubGlobal("fetch", fetcher);
  sendFunnelEvent("billing_page_view"); sendFunnelEvent("billing_page_view");
  expect(fetcher).toHaveBeenCalledTimes(1);
  expect(fetcher).toHaveBeenCalledWith("/api/funnel", expect.objectContaining({ keepalive: true, body: JSON.stringify({ event: "billing_page_view" }) }));
  await vi.advanceTimersByTimeAsync(1);
  sendFunnelEvent("billing_page_view"); await vi.advanceTimersByTimeAsync(1);
  sendFunnelEvent("billing_page_view"); expect(fetcher).toHaveBeenCalledTimes(2);
});
it("deduplicates within one JST day but counts the next day without a reload", () => {
  const beacon = vi.fn(() => true); Object.defineProperty(navigator, "sendBeacon", { configurable: true, value: beacon });
  vi.setSystemTime(new Date("2026-11-10T14:59:59Z"));
  sendFunnelEvent("free_limit_reached"); sendFunnelEvent("free_limit_reached"); expect(beacon).toHaveBeenCalledTimes(1);
  vi.setSystemTime(new Date("2026-11-10T15:00:00Z"));
  sendFunnelEvent("free_limit_reached"); expect(beacon).toHaveBeenCalledTimes(2);
});
it("falls back when sendBeacon throws or is unavailable", async () => {
  const fetcher = vi.fn().mockResolvedValue({ ok: true }); vi.stubGlobal("fetch", fetcher);
  Object.defineProperty(navigator, "sendBeacon", { configurable: true, value: () => { throw new Error("fixture blocked"); } });
  sendFunnelEvent("billing_page_view"); await vi.advanceTimersByTimeAsync(1);
  Object.defineProperty(navigator, "sendBeacon", { configurable: true, value: undefined });
  sendFunnelEvent("paywall_plan_click"); expect(fetcher).toHaveBeenCalledTimes(2);
});
