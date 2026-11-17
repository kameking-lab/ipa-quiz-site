// @vitest-environment node
import { afterEach, beforeEach, expect, it, vi } from "vitest";
const mock = vi.hoisted(() => ({ record: vi.fn(async () => true), user: null as string | null, guest: "guest", authError: false }));
vi.mock("@/lib/billing/conversion", () => ({ recordConversion: mock.record, conversionChannel: (r: Request) => r.headers.get("X-Kakomon-Native") === "ios" ? "ios" : "web" }));
vi.mock("@/lib/billing/runtime", () => ({ optionalBillingIdentity: async () => { if (mock.authError) throw Error("auth"); return mock.user; } }));
vi.mock("@/lib/billing/config", () => ({ billingConfig: () => ({ mode: "stripe-live", sourceInstance: "fixture" }) }));
vi.mock("@/lib/billing/subscription/config", () => ({ monthlySelected: () => false }));
vi.mock("@/lib/billing/guest-practice", () => ({ guestRealm: () => "fixture", readGuestCookie: () => mock.guest }));
import { POST } from "@/app/api/funnel/conversion/route";
const request = (body: unknown, headers: Record<string, string> = {}) => new Request("https://example.test/api/funnel/conversion", { method: "POST", headers: { "user-agent": "Mozilla/5.0", origin: "https://example.test", ...headers }, body: JSON.stringify(body) });
beforeEach(() => { mock.record.mockReset().mockResolvedValue(true); mock.user = null; mock.guest = "guest"; mock.authError = false; });
afterEach(() => vi.unstubAllGlobals());
it("accepts only browser events and no supplied identity, URL or payment claim", async () => {
  for (const event of ["guest_limited", "checkout_created", "payment_completed", "feedback_used"]) expect((await POST(request({ event }))).status).toBe(400);
  expect((await POST(request({ event: "offer_viewed", user: "private" }))).status).toBe(400);
  expect(mock.record).not.toHaveBeenCalled();
});
it("filters bots and cross-site requests, but accepts native local-shell requests with platform header", async () => {
  expect((await POST(request({ event: "offer_viewed" }, { "user-agent": "Googlebot" }))).status).toBe(204);
  expect((await POST(request({ event: "offer_viewed" }, { origin: "https://attacker.invalid" }))).status).toBe(403);
  expect(mock.record).not.toHaveBeenCalled();
  expect((await POST(request({ event: "offer_viewed" }, { origin: "capacitor://localhost", "X-Kakomon-Native": "ios" }))).status).toBe(204);
  expect(mock.record).toHaveBeenCalledWith("offer_viewed", "ios", undefined, expect.any(Number));
  const local = request({ event: "offer_viewed" }, { origin: "capacitor://localhost", "X-Kakomon-Native": "ios" });
  local.headers.delete("user-agent");
  expect((await POST(local)).status).toBe(204);
  expect(mock.record).toHaveBeenCalledTimes(2);
});
it("counts answers only for authenticated guest cookies while signed-out, excluding auth failures", async () => {
  expect((await POST(request({ event: "guest_answered" }))).status).toBe(204);
  expect(mock.record).toHaveBeenCalledWith("guest_answered", "web", "guest:guest", expect.any(Number));
  mock.record.mockClear(); mock.user = "signed-in"; await POST(request({ event: "guest_answered" }));
  mock.user = null; mock.guest = ""; await POST(request({ event: "guest_answered" }));
  mock.guest = "guest"; mock.authError = true; await POST(request({ event: "guest_answered" }));
  expect(mock.record).not.toHaveBeenCalled();
});
it("waits for the write and returns measurement failure without affecting purchase APIs", async () => {
  mock.record.mockResolvedValue(false);
  expect((await POST(request({ event: "plan_clicked" }))).status).toBe(503);
});
