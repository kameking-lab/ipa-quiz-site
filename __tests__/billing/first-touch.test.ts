import { afterEach, beforeEach, expect, it, vi } from "vitest";
import { firstTouch } from "@/lib/analytics/first-touch";
import { LS_KEYS } from "@/lib/storage/keys";
import { normalizeAttribution, requestAttribution } from "@/lib/billing/attribution";

beforeEach(() => { localStorage.clear(); window.history.replaceState({}, "", "/"); });
afterEach(() => vi.restoreAllMocks());
it("keeps the first tagged source/qualification across navigation, new campaigns and checkout", () => {
  window.history.replaceState({}, "", "/sc?utm_source=tsugino_shikaku&utm_content=sc&email=secret%40example.com");
  expect(firstTouch()).toEqual({ utm_source: "tsugino_shikaku", utm_content: "sc" });
  window.history.replaceState({}, "", "/billing?utm_source=google&utm_content=ap");
  expect(firstTouch()).toEqual({ utm_source: "tsugino_shikaku", utm_content: "sc" });
  expect(localStorage.getItem(LS_KEYS.funnelFirstTouch)).not.toContain("secret");
  expect(requestAttribution(new Request("https://example.com", { headers: { cookie: document.cookie } }))).toEqual(firstTouch());
});
it("expires after 90 days without extending the first arrival date", () => {
  const clock = vi.spyOn(Date, "now").mockReturnValue(1000);
  window.history.replaceState({}, "", "/?utm_source=tsugino&utm_content=ap");
  firstTouch();
  clock.mockReturnValue(1000 + 90 * 86400_000);
  window.history.replaceState({}, "", "/billing");
  expect(firstTouch()).toBeNull();
});
it("discards malformed labels, URL/email content and corrupt cookies", () => {
  expect(normalizeAttribution({ utm_source: "a@example.com", utm_content: "sc" })).toBeNull();
  expect(normalizeAttribution({ utm_source: "tsugino", utm_content: "https://secret.example" })?.utm_content).toBe("unknown");
  expect(requestAttribution(new Request("https://example.com", { headers: { cookie: "funnel_first_touch=%broken" } }))).toBeNull();
});
it("does not break the page when storage is blocked", () => {
  vi.spyOn(Storage.prototype, "getItem").mockImplementation(() => { throw new Error("blocked"); });
  expect(firstTouch()).toBeNull();
});
