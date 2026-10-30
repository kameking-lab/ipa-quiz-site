import { beforeEach, describe, expect, it, vi } from "vitest";
const m = vi.hoisted(() => ({ user: null as string | null, authFail: false, guest: null as string | null, cookieFail: false,
  guestGrant: vi.fn(), claim: vi.fn(), status: vi.fn(), grant: vi.fn() }));
vi.mock("@/lib/questions/pool-server", () => ({ findQuestionById: async (id: string) => ({ id, answer: "a" }) }));
vi.mock("@/lib/questions/filter", () => ({ isPracticeReadyQuestion: () => true, shuffleChoices: (q: unknown) => q }));
vi.mock("@/lib/billing/config", () => ({ billingConfig: () => ({ mode: "mock", freeDaily: 10 }), gateReady: () => true }));
vi.mock("@/lib/billing/subscription/config", () => ({ monthlySelected: () => false }));
vi.mock("@/lib/billing/runtime", () => ({ optionalBillingIdentity: async () => { if (m.authFail) throw Error("auth"); return m.user; },
  billingRuntime: () => ({ service: { status: m.status, grant: m.grant } }), sameOrigin: () => {},
  json: (v: unknown, status = 200) => Response.json(v, { status, headers: { "Cache-Control": "private, no-store", Vary: "Cookie" } }) }));
vi.mock("@/lib/billing/guest-practice", () => ({ readGuestCookie: () => { if (m.cookieFail) throw Error("secret unavailable"); return m.guest; }, guestCookie: () => "signed", cookieHeader: () => "practice_guest=signed; HttpOnly", guestRealm: () => "realm",
  guestGrant: m.guestGrant, guestClaim: m.claim, resetAt: () => "2026-10-30T15:00:00.000Z" }));
import { POST } from "@/app/api/billing/question/route";
function request(id = "q1") { return new Request("https://example.test/api/billing/question", { method: "POST", headers: { origin: "https://example.test", "content-type": "application/json" }, body: JSON.stringify({ id }) }); }
beforeEach(() => { vi.clearAllMocks(); m.user = null; m.authFail = false; m.guest = null; m.cookieFail = false; m.status.mockResolvedValue({ entitled: false }); m.grant.mockResolvedValue({ kind: "trial", remaining: 9 }); m.claim.mockResolvedValue([]); });
describe("guest route", () => {
  it("bootstraps without consuming, then reports 10/11 and retry-after", async () => {
    let res = await POST(request()); expect(res.status).toBe(428); expect((await res.json()).error).toBe("guest_cookie_required"); expect(res.headers.get("set-cookie")).toContain("HttpOnly"); expect(m.guestGrant).not.toHaveBeenCalled();
    m.guest = "id"; m.guestGrant.mockResolvedValueOnce({ status: "ok", used: 10 }).mockResolvedValueOnce({ status: "limit", used: 10 }).mockResolvedValueOnce({ status: "rate", retry: 25 });
    res = await POST(request()); expect((await res.json()).access.remaining).toBe(0);
    res = await POST(request("q11")); expect(res.status).toBe(429); expect((await res.json()).error).toBe("daily_limit");
    res = await POST(request()); expect(res.status).toBe(429); expect(res.headers.get("retry-after")).toBe("25"); expect((await res.json()).error).toBe("guest_rate_limited");
  });
  it("does not downgrade auth exceptions or grant an already claimed guest", async () => {
    m.authFail = true; expect((await POST(request())).status).toBe(503); expect(m.guestGrant).not.toHaveBeenCalled();
    m.authFail = false; m.guest = "id"; m.guestGrant.mockResolvedValue({ status: "claimed" });
    const res = await POST(request()); expect(res.status).toBe(401); expect((await res.json()).error).toBe("sign_in_required");
  });
  it("cookie verification dependency failure allows only account reopen, never anonymous bootstrap", async () => {
    m.cookieFail = true;
    let res = await POST(request()); expect(res.status).toBe(503); expect(res.headers.get("set-cookie")).toBeNull();
    m.user = "alice"; m.grant.mockResolvedValueOnce({ kind: "trial", remaining: null });
    res = await POST(request()); expect(res.status).toBe(200); expect((await res.json()).access.remaining).toBeNull();
    expect(m.grant).toHaveBeenCalledWith("alice", "q1", [], false, expect.any(String));
    m.grant.mockRejectedValueOnce(Error("unavailable")); expect((await POST(request("new"))).status).toBe(503);
    m.status.mockResolvedValue({ entitled: true }); m.grant.mockResolvedValueOnce({ kind: "pass", remaining: null });
    expect((await POST(request())).status).toBe(200);
  });
  it("paid precedes cookie/KV and rechecks under the service lock", async () => {
    m.user = "alice"; m.guest = "id"; m.status.mockResolvedValue({ entitled: true }); m.grant.mockResolvedValue({ kind: "pass", remaining: null });
    expect((await POST(request())).status).toBe(200); expect(m.claim).not.toHaveBeenCalled(); expect(m.grant).toHaveBeenCalledWith("alice", "q1", [], false, expect.any(String));
  });
  it("passes the immutable claim to the account and fails new starts closed if KV fails", async () => {
    m.user = "alice"; m.guest = "id"; const snapshot = [{ day: "2026-10-30", ids: ["q1"] }]; m.claim.mockResolvedValueOnce(snapshot).mockRejectedValueOnce(Error("KV"));
    expect((await POST(request())).status).toBe(200); expect(m.grant).toHaveBeenLastCalledWith("alice", "q1", snapshot, true, expect.any(String));
    m.grant.mockResolvedValueOnce({ kind: "trial", remaining: null }); const res = await POST(request()); expect((await res.json()).access.remaining).toBeNull(); expect(m.grant).toHaveBeenLastCalledWith("alice", "q1", [], false, expect.any(String));
  });
});
