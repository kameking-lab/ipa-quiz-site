import { createHmac } from "node:crypto";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { monthlyStripeFixture } from "./monthly-stripe-fixture";
const wiring = vi.hoisted(() => ({ runtime: null as unknown }));
vi.mock("@/lib/billing/subscription/runtime", () => ({ monthlyRuntime: () => wiring.runtime }));
vi.mock("@/lib/billing/runtime", () => ({
  json: (value: unknown) => Response.json(value),
  billingFailure: (error: { status?: number; code?: string }) => Response.json({ error: error.code ?? "unavailable" }, { status: error.status ?? 503 }),
}));
import { POST as webhook } from "@/app/api/billing/webhook/route";
const secret = "whsec_public_refund_candidate_fixture";
function request(event: unknown) {
  const body = JSON.stringify(event), t = Math.floor(Date.now() / 1000);
  const sig = createHmac("sha256", secret).update(`${t}.${body}`).digest("hex");
  return new Request("http://localhost:3338/api/billing/webhook", { method: "POST", body, headers: { "stripe-signature": `t=${t},v1=${sig}` } });
}
beforeEach(() => {
  vi.stubGlobal("fetch", () => { throw new Error("External fetch forbidden"); });
  for (const [key, value] of Object.entries({ BILLING_PRODUCT: "subscription", BILLING_WEBHOOK_MODE: "stripe-test", BILLING_SOURCE_INSTANCE: "monthly-fixture",
    BILLING_ORIGIN: "http://localhost:3338", BILLING_STRIPE_TEST_WEBHOOK_SECRET: secret })) vi.stubEnv(key, value);
});
afterEach(() => { vi.unstubAllEnvs(); vi.unstubAllGlobals(); });
describe("refund candidate signed handler through real adapter and memory store (offline fixtures)", () => {
  it("signed early refund is retained before allocations and late paid cannot restore it from an empty list", async () => {
    const f = await monthlyStripeFixture(); wiring.runtime = f; f.allocationsVisible(false);
    f.refundDetails.set("re_early", { id: "re_early", amount: 980, payment_intent: f.payment.id, currency: "jpy", status: "succeeded" });
    const early = f.event("refund.updated", "re_early", "evt_early_signed");
    expect((await webhook(request(early))).status).toBe(200);
    expect((await webhook(request(early))).status).toBe(200);
    expect(f.store.accounts.get("stripe-test:alice")!.invoices).toEqual({});
    f.allocationsVisible(true); f.refundDetails.clear(); f.refunds.length = 0;
    expect((await webhook(request(f.event("invoice.paid", f.invoice.id, "evt_late_signed")))).status).toBe(200);
    expect(await f.service.status("alice", f.result.orderId)).toMatchObject({ entitled: false, purchase: { status: "refunded" } });
    expect(f.sub.cancel_at_period_end).toBe(false);
  });
  it.each([100, 980])("signed refund %i plus duplicate and late paid preserves the correct entitlement", async amount => {
    const f = await monthlyStripeFixture(); wiring.runtime = f;
    expect((await webhook(request(f.event()))).status).toBe(200);
    f.refunds.push({ id: "re_fixture", amount, payment_intent: f.payment.id, currency: "jpy", status: "succeeded" });
    const e = f.event("charge.refunded", "ch_fixture", "evt_refund");
    expect((await webhook(request(e))).status).toBe(200); expect((await webhook(request(e))).status).toBe(200);
    f.refunds.length = 0;
    expect((await webhook(request(f.event("invoice.paid", f.invoice.id, "evt_late_paid")))).status).toBe(200);
    expect(await f.service.status("alice", f.result.orderId)).toMatchObject({ entitled: amount < 980, purchase: { status: amount < 980 ? "paid" : "refunded" } });
    const a = f.store.accounts.get("stripe-test:alice")!;
    expect(Object.keys(a.invoices)).toHaveLength(1); expect(Object.keys(a.payments.pi_monthly.refunds)).toHaveLength(1);
    expect(a.renewalStopJobs).toEqual({}); expect(f.sub.cancel_at_period_end).toBe(false);
  });
  it("signed failed correction overrides stale provider success, and a later stale success cannot re-revoke", async () => {
    const f = await monthlyStripeFixture(); wiring.runtime = f;
    f.refunds.push({ id: "re_full", amount: 980, payment_intent: f.payment.id, currency: "jpy", status: "succeeded" });
    expect((await webhook(request(f.event()))).status).toBe(200); expect((await f.service.status("alice")).entitled).toBe(false);
    const failed = f.event("refund.failed", "re_full", "evt_failed"); Object.assign(failed.data.object, { amount: 980, currency: "jpy", status: "failed" });
    expect((await webhook(request(failed))).status).toBe(200); expect((await f.service.status("alice")).entitled).toBe(true);
    const stale = f.event("refund.updated", "re_full", "evt_stale"); Object.assign(stale.data.object, { amount: 980, currency: "jpy", status: "succeeded" });
    expect((await webhook(request(stale))).status).toBe(200); expect((await f.service.status("alice")).entitled).toBe(true);
    expect(f.sub.cancel_at_period_end).toBe(false);
  });
});
