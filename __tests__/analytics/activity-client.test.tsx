import { act, cleanup, render } from "@testing-library/react";
import { Blob as NodeBlob } from "node:buffer";
import { afterEach, beforeEach, expect, it, vi } from "vitest";

let pathname = "/q/sc/2025/am2/1";
vi.mock("next/navigation", () => ({ usePathname: () => pathname }));
beforeEach(() => { vi.useFakeTimers(); vi.resetModules(); vi.stubGlobal("Blob", NodeBlob); pathname = "/q/sc/2025/am2/1"; window.history.replaceState({}, "", pathname + "?email=private&token=private"); vi.stubEnv("NEXT_PUBLIC_POSTHOG_KEY", ""); });
afterEach(() => { cleanup(); vi.clearAllTimers(); vi.useRealTimers(); vi.unstubAllEnvs(); vi.unstubAllGlobals(); vi.restoreAllMocks(); });

it("records page views once per navigation and answers even without the external SDK", async () => {
  const beacon = vi.fn<(url: string, body?: Blob) => boolean>(() => true); Object.defineProperty(navigator, "sendBeacon", { configurable: true, value: beacon });
  const { ActivityTracker } = await import("@/components/analytics/ActivityTracker");
  const { posthogCapture } = await import("@/lib/posthog");
  const { flushActivity } = await import("@/lib/analytics/activity-client");
  const { rerender } = render(<ActivityTracker />);
  rerender(<ActivityTracker />);
  posthogCapture("page_view", { path: location.href }); // external page view must not double count
  posthogCapture("question_answered", { exam: "sc", questionId: "private-question", userId: "private-user" });
  act(() => { vi.advanceTimersByTime(2000); });
  expect(beacon).toHaveBeenCalledTimes(1);
  expect(beacon.mock.calls[0][0]).toBe("/api/activity");
  const payload = JSON.parse(await (beacon.mock.calls[0] as unknown as [string, Blob])[1].text());
  expect(payload.events).toEqual([{ event: "page_view", qualification: "sc", page: "question" }, { event: "question_answered", qualification: "sc", page: "question" }]);
  pathname = "/ap"; window.history.replaceState({}, "", pathname); rerender(<ActivityTracker />);
  act(flushActivity); expect(beacon).toHaveBeenCalledTimes(2);
  pathname = "/admin"; window.history.replaceState({}, "", pathname); rerender(<ActivityTracker />); act(flushActivity); expect(beacon).toHaveBeenCalledTimes(2);
});

it("falls back to a keepalive request when beacon cannot queue and never resends accepted counts", async () => {
  const beacon = vi.fn<(url: string, body?: Blob) => boolean>(() => false); Object.defineProperty(navigator, "sendBeacon", { configurable: true, value: beacon });
  const fetcher = vi.fn<(url: string, init?: RequestInit) => Promise<Response>>(async () => new Response(null, { status: 204 })); vi.stubGlobal("fetch", fetcher);
  const { captureActivity, flushActivity } = await import("@/lib/analytics/activity-client");
  captureActivity("exam_library_answered", { hubSlug: "sagyo-kankyo-sokuteishi", examId: "private" }); flushActivity(); flushActivity();
  expect(fetcher).toHaveBeenCalledTimes(1);
  expect(fetcher).toHaveBeenCalledWith("/api/activity", expect.objectContaining({ keepalive: true, credentials: "omit" }));
  expect(JSON.parse(String(fetcher.mock.calls[0][1]?.body)).events[0].qualification).toBe("sagyo-kankyo-sokuteishi");
});

it("flushes before page hide and does not send arbitrary events or auth/admin visits", async () => {
  const beacon = vi.fn(() => true); Object.defineProperty(navigator, "sendBeacon", { configurable: true, value: beacon });
  const { ActivityTracker } = await import("@/components/analytics/ActivityTracker");
  const { captureActivity, flushActivity } = await import("@/lib/analytics/activity-client");
  render(<ActivityTracker />);
  act(() => window.dispatchEvent(new Event("pagehide")));
  expect(beacon).toHaveBeenCalledTimes(1);
  captureActivity("user_signed_in", { email: "private" });
  window.history.replaceState({}, "", "/auth/signin"); captureActivity("page_view"); flushActivity();
  expect(beacon).toHaveBeenCalledTimes(1);
});
