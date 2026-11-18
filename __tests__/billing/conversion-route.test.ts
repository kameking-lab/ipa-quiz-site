// @vitest-environment node
import { afterEach, beforeEach, expect, it, vi } from "vitest";
const mock = vi.hoisted(() => ({ record: vi.fn(async () => "ok"), user: null as string | null, guest: "guest", authError: false }));
vi.mock("@/lib/billing/conversion", async importOriginal => ({ ...await importOriginal<typeof import("@/lib/billing/conversion")>(), recordClientConversion: mock.record }));
vi.mock("@/lib/billing/runtime", () => ({ optionalBillingIdentity: async () => { if (mock.authError) throw Error("auth"); return mock.user; } }));
vi.mock("@/lib/billing/config", () => ({ billingConfig: () => ({ mode: "stripe-live", sourceInstance: "fixture" }) }));
vi.mock("@/lib/billing/subscription/config", () => ({ monthlySelected: () => false }));
vi.mock("@/lib/billing/guest-practice", async importOriginal => ({ ...await importOriginal<typeof import("@/lib/billing/guest-practice")>(), guestRealm: () => "fixture", readGuestCookie: () => mock.guest }));
import { POST } from "@/app/api/funnel/conversion/route";
import { GUEST_ANSWER_HANDLED } from "@/lib/billing/conversion-contract";
import { CONVERSION_VISITOR_MINUTE_LIMIT } from "@/lib/billing/conversion";
const request = (body: unknown, headers: Record<string, string> = {}) => new Request("https://example.test/api/funnel/conversion", { method: "POST", headers: { "user-agent": "Mozilla/5.0", origin: "https://example.test", ...headers }, body: JSON.stringify(body) });
beforeEach(() => { mock.record.mockReset().mockResolvedValue("ok"); mock.user = null; mock.guest = "guest"; mock.authError = false; });
afterEach(() => { vi.useRealTimers(); vi.unstubAllGlobals(); });
it("accepts only browser events and no supplied identity, URL or payment claim", async () => {
  for (const event of ["guest_limited", "checkout_created", "payment_completed", "feedback_used"]) expect((await POST(request({ event }))).status).toBe(400);
  expect((await POST(request({ event: "offer_viewed", user: "private" }))).status).toBe(400);
  expect(mock.record).not.toHaveBeenCalled();
});
it("requires a same-origin Origin or Referer and accepts iOS from the hosted site", async () => {
  expect((await POST(request({ event: "offer_viewed" }, { "user-agent": "Googlebot" }))).status).toBe(204);
  expect((await POST(request({ event: "offer_viewed" }, { origin: "https://attacker.invalid", referer: "https://example.test/quiz" }))).status).toBe(403);
  expect((await POST(request({ event: "offer_viewed" }, { "sec-fetch-site": "same-site" }))).status).toBe(403);
  expect((await POST(request({ event: "offer_viewed" }, { origin: "capacitor://localhost", "X-Kakomon-Native": "ios" }))).status).toBe(403);
  for (const referer of ["", "https://foreign.invalid/quiz", "malformed"]) {
    const legacy = request({ event: "offer_viewed" }, { referer });
    legacy.headers.delete("origin");
    expect((await POST(legacy)).status).toBe(403);
  }
  expect(mock.record).not.toHaveBeenCalled();
  const web = request({ event: "offer_viewed" }, { referer: "https://example.test/quiz" });
  web.headers.delete("origin");
  expect((await POST(web)).status).toBe(204);
  const ios = request({ event: "offer_viewed" }, { "X-Kakomon-Native": "ios", "x-forwarded-for": "192.0.2.4" });
  ios.headers.delete("user-agent");
  expect((await POST(ios)).status).toBe(204);
  expect(mock.record).toHaveBeenCalledWith("offer_viewed", "ios", undefined, expect.any(Number), "v4:192.0.2.4");
});
it("counts answers only for authenticated guest cookies while signed-out, excluding auth failures", async () => {
  const answer = () => POST(request({ event: "guest_answered" }));
  expect((await answer()).headers.get(GUEST_ANSWER_HANDLED)).toBe("1");
  expect(mock.record).toHaveBeenCalledWith("guest_answered", "web", "guest:guest", expect.any(Number), "v4:0.0.0.0");
  mock.record.mockClear(); mock.user = "signed-in"; mock.guest = "";
  expect((await answer()).headers.get(GUEST_ANSWER_HANDLED)).toBe("1");
  mock.user = null;
  expect((await answer()).headers.has(GUEST_ANSWER_HANDLED)).toBe(false);
  mock.guest = "guest"; mock.authError = true;
  expect((await answer()).headers.has(GUEST_ANSWER_HANDLED)).toBe(false);
  expect(mock.record).not.toHaveBeenCalled();
});
it("waits for the write and returns measurement failure without affecting purchase APIs", async () => {
  mock.record.mockResolvedValue("unavailable");
  expect((await POST(request({ event: "plan_clicked" }))).status).toBe(503);
  mock.record.mockResolvedValue("limited");
  expect((await POST(request({ event: "plan_clicked" }))).status).toBe(429);
});
it("drops requests from a saturated network before consulting shared storage", async () => {
  vi.useFakeTimers(); vi.setSystemTime(new Date("2026-11-18T00:00:00Z"));
  const post = (ip: string) => POST(request({ event: "plan_clicked" }, { "x-forwarded-for": ip }));
  await Promise.all(Array.from({ length: CONVERSION_VISITOR_MINUTE_LIMIT }, () => post("2001:db8::1")));
  expect((await post("2001:db8::2")).status).toBe(429);
  expect(mock.record).toHaveBeenCalledTimes(CONVERSION_VISITOR_MINUTE_LIMIT);
  vi.advanceTimersByTime(60_000);
  expect((await post("2001:db8::2")).status).toBe(204);
});
