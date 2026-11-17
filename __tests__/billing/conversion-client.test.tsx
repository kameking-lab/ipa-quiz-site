import { afterEach, beforeEach, expect, it, vi } from "vitest";
import { render, fireEvent, screen } from "@testing-library/react";
import { StrictMode } from "react";
const platform = vi.hoisted(() => ({ native: false }));
vi.mock("@/mobile/shared/contracts", () => ({ nativeClient: () => platform.native, NATIVE_HEADER: "X-Kakomon-Native" }));
vi.mock("@/lib/billing/funnel-client", () => ({ sendFunnelEvent: vi.fn() }));
import { sendConversion } from "@/lib/billing/conversion-client";
import { BillingPageBeacon } from "@/app/billing/BillingPageBeacon";
beforeEach(() => { platform.native = false; vi.stubGlobal("fetch", vi.fn(async () => new Response(null, { status: 204 }))); Object.defineProperty(navigator, "sendBeacon", { configurable: true, value: vi.fn(() => true) }); });
afterEach(() => vi.unstubAllGlobals());
it("counts repeated clicks as occurrences, sending only an event name", () => {
  sendConversion("plan_clicked"); sendConversion("plan_clicked");
  expect(navigator.sendBeacon).toHaveBeenCalledTimes(2);
  expect(vi.mocked(navigator.sendBeacon).mock.calls[0]).toEqual(["/api/funnel/conversion", expect.any(Blob)]);
});
it("uses a native-header fetch for iOS instead of an unmarked beacon", () => {
  platform.native = true; sendConversion("offer_viewed");
  expect(navigator.sendBeacon).not.toHaveBeenCalled();
  expect(fetch).toHaveBeenCalledWith("/api/funnel/conversion", expect.objectContaining({ body: '{"event":"offer_viewed"}', headers: expect.objectContaining({ "X-Kakomon-Native": "ios", "Content-Type": "application/json" }), keepalive: true }));
});
it("falls back when the beacon cannot queue, and never throws on a transport failure", async () => {
  Object.defineProperty(navigator, "sendBeacon", { configurable: true, value: () => { throw Error("blocked"); } });
  vi.mocked(fetch).mockRejectedValue(Error("offline"));
  expect(() => sendConversion("offer_viewed")).not.toThrow(); await Promise.resolve(); expect(fetch).toHaveBeenCalledTimes(1);
});
it("counts the billing view once in StrictMode and all plan taps without double listeners", () => {
  render(<StrictMode><BillingPageBeacon /><a data-monthly-plan href="#checkout">月額プラン</a></StrictMode>);
  expect(navigator.sendBeacon).toHaveBeenCalledTimes(1);
  fireEvent.click(screen.getByText("月額プラン")); fireEvent.click(screen.getByText("月額プラン"));
  expect(navigator.sendBeacon).toHaveBeenCalledTimes(3);
});
