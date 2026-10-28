import { beforeEach, describe, it, expect, vi } from "vitest";
const mocks = vi.hoisted(() => ({ id: "alice" as string | null, enabled: false, grant: vi.fn(), find: vi.fn(), status: vi.fn(), checkout: vi.fn() }));
vi.mock("@/lib/questions/pool-server", () => ({ findQuestionById: mocks.find }));
vi.mock("@/lib/questions/filter", () => ({ isPracticeReadyQuestion: (q: { needsReview?: boolean }) => !q.needsReview, shuffleChoices: (q: unknown) => q }));
vi.mock("@/lib/billing/config", () => ({ billingConfig: () => ({}), gateReady: () => mocks.enabled }));
vi.mock("@/lib/billing/runtime", async () => {
  const { BillingError } = await import("@/lib/billing/domain");
  return { billingRuntime: () => ({ service: { grant: mocks.grant, status: mocks.status, checkout: mocks.checkout }, provider: {} }),
    billingIdentity: async () => { if (!mocks.id) throw new BillingError("sign_in_required", 401); return mocks.id; },
    sameOrigin: (r: Request) => { if (r.headers.get("origin") !== "http://localhost:3328") throw new BillingError("invalid_origin", 403); },
    json: (value: unknown, status = 200) => Response.json(value, { status, headers: { "Cache-Control": "private, no-store", Vary: "Cookie" } }),
    billingFailure: (e: unknown) => Response.json({ error: e instanceof BillingError ? e.code : "billing_unavailable" }, { status: e instanceof BillingError ? e.status : 503, headers: { "Cache-Control": "private, no-store" } }),
  };
});
import { POST } from "@/app/api/billing/question/route";
import { POST as checkout } from "@/app/api/billing/checkout/route";
import { GET as status } from "@/app/api/billing/status/route";
import { BILLING_SAMPLE_ID } from "@/lib/billing/sample";
function request(body: unknown, origin = "http://localhost:3328") { return new Request("http://localhost:3328/api/billing/question", { method: "POST", headers: { origin, "content-type": "application/json" }, body: JSON.stringify(body) }); }
beforeEach(() => {
  vi.clearAllMocks(); mocks.id = "alice"; mocks.enabled = false;
  mocks.find.mockImplementation(async (id: string) => id === "unknown" ? null : { id, answer: "ア", explanation: "Existing explanation" });
  mocks.grant.mockResolvedValue({ kind: "trial", remaining: 9 }); mocks.status.mockResolvedValue({ entitled: false });
});
describe("route integration", () => {
  it("off preserves anonymous free learning and never consults auth/DB/quota", async () => {
    mocks.id = null; const res = await POST(request({ id: "existing", shuffle: false }, "https://production.example"));
    expect(res.status).toBe(200); expect(mocks.grant).not.toHaveBeenCalled();
    expect((await res.json()).question.id).toBe("existing");
  });
  it("allows exactly the fixed anonymous sample; other questions need auth", async () => {
    mocks.enabled = true; mocks.id = null;
    expect((await POST(request({ id: BILLING_SAMPLE_ID }))).status).toBe(200);
    expect((await POST(request({ id: "another" }))).status).toBe(401);
    expect(mocks.grant).not.toHaveBeenCalled();
  });
  it("uses authenticated ID only, rejects client paid/clock/owner, never shares cache", async () => {
    mocks.enabled = true;
    for (const extra of [{ paid: true }, { userId: "bob" }, { now: "2099" }]) expect((await POST(request({ id: "existing", ...extra }))).status).not.toBe(200);
    const res = await POST(request({ id: "exact-deep-link" })); expect(mocks.grant).toHaveBeenCalledWith("alice", "exact-deep-link");
    expect(res.headers.get("cache-control")).toBe("private, no-store"); expect(res.headers.get("vary")).toBe("Cookie");
  });
  it("missing/under-review questions consume nothing; cross-origin cannot consume quota", async () => {
    mocks.enabled = true;
    expect((await POST(request({ id: "unknown" }))).status).toBe(404);
    mocks.find.mockResolvedValue({ id: "held", needsReview: true }); expect((await POST(request({ id: "held" }))).status).toBe(409);
    mocks.find.mockResolvedValue({ id: "valid" }); expect((await POST(request({ id: "valid" }, "https://evil.example"))).status).toBe(403);
    expect(mocks.grant).not.toHaveBeenCalled();
  });
  it("DB failure closes paid access without altering any history", async () => {
    mocks.enabled = true; mocks.grant.mockRejectedValue(new Error("private database detail"));
    const res = await POST(request({ id: "existing" })); expect(res.status).toBe(503);
    expect(await res.text()).not.toContain("private database detail");
  });
  it("checkout rejects buyer-supplied owner and status resolves the authenticated owner", async () => {
    expect((await checkout(request({ terms: "a".repeat(64), userId: "bob" }))).status).not.toBe(200);
    expect(mocks.checkout).not.toHaveBeenCalled();
    await status(new Request("http://localhost:3328/api/billing/status?order=other"));
    expect(mocks.status).toHaveBeenCalledWith("alice", "other");
  });
});
