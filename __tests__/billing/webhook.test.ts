import { createHmac } from "node:crypto";
import { beforeEach, afterEach, describe, it, expect, vi } from "vitest";
const mocks = vi.hoisted(() => ({ receive: vi.fn(), snapshot: vi.fn(), mode: "stripe-test" }));
vi.mock("@/lib/billing/config", () => ({ billingWebhookConfig: () => ({ mode: mocks.mode }) }));
vi.mock("@/lib/billing/stripe", () => ({ StripeCheckoutProvider: class { snapshot = mocks.snapshot } }));
vi.mock("@/lib/billing/runtime", async () => {
  const { StripeCheckoutProvider } = await import("@/lib/billing/stripe");
  const { BillingError } = await import("@/lib/billing/domain");
  return { billingWebhookRuntime: () => ({ service: { receive: mocks.receive }, provider: new StripeCheckoutProvider({} as never, "", {} as never) }),
    json: (v: unknown) => Response.json(v),
    billingFailure: (e: unknown) => Response.json({ error: e instanceof BillingError ? e.code : "billing_unavailable" }, { status: e instanceof BillingError ? e.status : 503 }) };
});
import { POST } from "@/app/api/billing/webhook/route";
const secret = "whsec_test_fixture_not_real";
function req(raw: string, signedRaw = raw, signingSecret = secret) {
  const t = Math.floor(Date.now() / 1000);
  const sig = createHmac("sha256", signingSecret).update(`${t}.${signedRaw}`).digest("hex");
  return new Request("http://localhost:3328/api/billing/webhook", { method: "POST", headers: { "stripe-signature": `t=${t},v1=${sig}` }, body: raw });
}
beforeEach(() => { vi.clearAllMocks(); mocks.mode = "stripe-test"; vi.stubEnv("BILLING_STRIPE_TEST_WEBHOOK_SECRET", secret); mocks.snapshot.mockResolvedValue({ eventId: "evt_test" }); });
afterEach(() => vi.unstubAllEnvs());
describe("webhook HTTP handler", () => {
  it("live handler uses only its separate signing secret; test signature cannot acknowledge", async () => {
    mocks.mode = "stripe-live"; vi.stubEnv("BILLING_STRIPE_LIVE_WEBHOOK_SECRET", "whsec_live_fixture");
    expect((await POST(req('{"id":"evt_live"}'))).status).toBe(400);
    expect(mocks.receive).not.toHaveBeenCalled();
    expect((await POST(req('{"id":"evt_live"}', '{"id":"evt_live"}', "whsec_live_fixture"))).status).toBe(200);
  });
  it("invalid raw signature fails before provider/DB", async () => {
    expect((await POST(req('{ "id":"evt_test"}', '{"id":"evt_test"}'))).status).toBe(400);
    expect(mocks.receive).not.toHaveBeenCalled(); expect(mocks.snapshot).not.toHaveBeenCalled();
  });
  it("does not acknowledge DB failure; verified retry succeeds", async () => {
    mocks.receive.mockRejectedValueOnce(new Error("private storage detail")).mockResolvedValueOnce("processed");
    const failed = await POST(req('{"id":"evt_test"}')); expect(failed.status).toBe(503); expect(await failed.text()).not.toContain("private storage detail");
    expect((await POST(req('{"id":"evt_test"}'))).status).toBe(200);
  });
  it("acknowledges verified unsupported event only, without altering entitlement", async () => {
    mocks.snapshot.mockResolvedValueOnce(null);
    expect((await POST(req('{"id":"evt_test"}'))).status).toBe(200); expect(mocks.receive).not.toHaveBeenCalled();
  });
});
