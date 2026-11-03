import { beforeEach, expect, it, vi } from "vitest";
import { BillingError } from "@/lib/billing/domain";
const m = vi.hoisted(() => ({ user: null as string | null, paid: false, monthly: false, guest: "browser", grant: vi.fn(), bonus: vi.fn(), guestGrant: vi.fn(), claim: vi.fn() }));
vi.mock("@/lib/questions/pool-server", () => ({ findQuestionById: async (id: string) => ({ id }) }));
vi.mock("@/lib/questions/filter", () => ({ isPracticeReadyQuestion: () => true, shuffleChoices: (q: unknown) => q }));
vi.mock("@/lib/billing/config", () => ({ billingConfig: () => ({ mode: "mock", freeDaily: 10 }), gateReady: () => true }));
vi.mock("@/lib/billing/subscription/config", () => ({ monthlySelected: () => m.monthly, monthlyConfig: () => ({ mode: "mock", sourceInstance: "test", freeDaily: 10, enabled: true }) }));
vi.mock("@/lib/billing/runtime", () => ({ optionalBillingIdentity: async () => m.user, billingRuntime: () => ({ service: { status: async () => ({ entitled: m.paid }), grant: m.grant } }), sameOrigin: () => {}, json: (v: unknown, status = 200) => Response.json(v, { status }) }));
vi.mock("@/lib/billing/guest-practice", () => ({ readGuestCookie: () => m.guest, guestCookie: () => "signed", cookieHeader: () => "cookie", guestRealm: () => "test", guestGrant: m.guestGrant, guestClaim: m.claim, resetAt: () => "2026-11-03T15:00:00.000Z" }));
vi.mock("@/lib/feedback/unlock-runtime", () => ({ feedbackStore: () => ({ grant: m.bonus, claim: async () => null }), feedbackBrowserHeader: () => "feedback_browser=renewed; HttpOnly", readFeedbackBrowser: () => "browser", unlockIdentity: (_r: Request, user: string | null) => ({ realm: "test", account: user, browser: "browser" }) }));
vi.mock("@/lib/billing/subscription/runtime", () => ({ monthlyRuntime: () => ({ service: { status: async () => ({ entitled: m.paid }), grant: m.grant } }) }));
import { POST } from "@/app/api/billing/question/route";
const req = () => new Request("https://example.test/api/billing/question", { method: "POST", body: JSON.stringify({ id: "q11" }) });
beforeEach(() => { vi.clearAllMocks(); vi.stubEnv("FEEDBACK_UNLOCK_ENABLED", "true"); m.monthly = false; m.user = null; m.paid = false; m.guest = "browser"; m.bonus.mockResolvedValue({ remaining: 9, newlyUsed: true }); m.guestGrant.mockResolvedValue({ status: "limit", used: 10 }); m.claim.mockResolvedValue([]); m.grant.mockRejectedValue(new BillingError("daily_limit", 429)); });
it("uses the ordinary anonymous quota and requires sign-in for the bonus", async () => {
  m.guestGrant.mockResolvedValueOnce({ status: "ok", used: 10 });
  expect((await POST(req())).status).toBe(200); expect(m.bonus).not.toHaveBeenCalled();
  expect((await POST(req())).status).toBe(429);
  expect(m.bonus).not.toHaveBeenCalled();
});
it("allows account fallback only after the normal grant fails with daily_limit", async () => {
  m.user = "alice";
  expect((await POST(req())).status).toBe(200);
  expect(m.bonus).toHaveBeenCalledWith({ realm: "test", account: "alice", browser: "browser" }, expect.any(String), "q11");
  m.bonus.mockClear(); m.claim.mockRejectedValue(Error("KV"));
  expect((await POST(req())).status).toBe(429); expect(m.bonus).not.toHaveBeenCalled();
});
it("does not bypass claimed cookies, rate limits, paid service checks or rollout disabled", async () => {
  m.guestGrant.mockResolvedValueOnce({ status: "claimed" }); expect((await POST(req())).status).toBe(401);
  m.guestGrant.mockResolvedValueOnce({ status: "rate", retry: 10 }); expect((await POST(req())).status).toBe(429);
  vi.stubEnv("FEEDBACK_UNLOCK_ENABLED", "false"); expect((await POST(req())).status).toBe(429);
  m.user = "alice"; m.paid = true; m.grant.mockResolvedValue({ kind: "pass", remaining: null });
  expect((await POST(req())).status).toBe(200); expect(m.bonus).not.toHaveBeenCalled();
});

it("uses the bonus after the monthly free quota and keeps paid monthly access independent", async () => {
  m.monthly = true; m.user = "alice";
  expect((await POST(req())).status).toBe(200);
  expect(m.bonus).toHaveBeenCalledTimes(1);
  m.bonus.mockClear(); m.paid = true; m.grant.mockResolvedValue({ kind: "pass", remaining: null });
  expect((await POST(req())).status).toBe(200);
  expect(m.bonus).not.toHaveBeenCalled();
});
