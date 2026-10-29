import { createHmac } from "node:crypto";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import type { BillingService } from "@/lib/billing/service";
import type { StripeCheckoutProvider } from "@/lib/billing/stripe";

// Only dependency wiring and remote I/O are substituted. Signature verification,
// Stripe reconciliation, the service and transactional MemoryStore are real code.
const wiring = vi.hoisted(() => ({ current: null as null | { service: BillingService; provider: StripeCheckoutProvider } }));
vi.mock("@/lib/billing/runtime", async () => {
  const { BillingError } = await import("@/lib/billing/domain");
  return {
    billingWebhookRuntime: () => wiring.current!,
    json: (value: unknown) => Response.json(value),
    billingFailure: (e: unknown) => Response.json({ error: e instanceof BillingError ? e.code : "billing_unavailable" },
      { status: e instanceof BillingError ? e.status : 503 }),
  };
});
import { POST } from "@/app/api/billing/webhook/route";
import { BillingService as Service } from "@/lib/billing/service";
import { effectiveRefundJPY } from "@/lib/billing/finance";
import { fixture } from "./stripe-fixture";

const secret = "whsec_public_offline_fixture_not_a_credential";
let f: ReturnType<typeof fixture>;
let service: Service;
let now: Date;
beforeEach(() => {
  vi.stubGlobal("fetch", vi.fn(() => { throw new Error("external_network_forbidden_in_fixture_test"); }));
  vi.stubEnv("BILLING_WEBHOOK_MODE", "stripe-test");
  vi.stubEnv("BILLING_SOURCE_INSTANCE", "offline-fixture-only");
  vi.stubEnv("BILLING_STRIPE_TEST_SECRET_KEY", "rk_test_public_fixture_not_a_credential");
  vi.stubEnv("BILLING_STRIPE_TEST_WEBHOOK_SECRET", secret);
  f = fixture(); f.config.sourceInstance = "offline-fixture-only";
  now = new Date("2026-10-26T14:00:00Z");
  service = new Service(f.store, f.config, () => now);
  wiring.current = { service, provider: f.provider };
});
afterEach(() => { wiring.current = null; vi.unstubAllEnvs(); vi.unstubAllGlobals(); });

function event(type: string, id: string, created = 1793016000) {
  const object = type.startsWith("refund.") ? { ...f.refund }
    : type.startsWith("payment_intent.") ? { ...f.intent }
    : { ...f.session, payment_intent: f.session.payment_intent ? f.intent.id : null };
  return { id, type, created, livemode: false, data: { object } };
}
async function deliver(value: ReturnType<typeof event>) {
  const raw = JSON.stringify(value), t = Math.floor(Date.now() / 1000);
  const sig = createHmac("sha256", secret).update(`${t}.${raw}`).digest("hex");
  return POST(new Request("http://localhost:3328/api/billing/webhook", {
    method: "POST", headers: { "stripe-signature": `t=${t},v1=${sig}` }, body: raw,
  }));
}
const status = () => service.status("alice", f.purchase.id);
function unpaid(state = "processing") {
  f.session.payment_status = "unpaid"; f.intent.status = state; f.intent.amount_received = 0;
}
function paid() {
  f.session.status = "complete"; f.session.payment_status = "paid";
  f.intent.status = "succeeded"; f.intent.amount_received = 980;
}

describe("offline signed HTTP handler + Stripe adapter + service integration (no Stripe/DB connection)", () => {
  it("refund-first then older paid notification and duplicate never reopen or multiply money", async () => {
    const oldPaid = event("checkout.session.completed", "evt_old_paid", 1793015900);
    f.refund.status = "succeeded"; f.refunds.push({ ...f.refund });
    const refund = event("refund.updated", "evt_refund_first");
    expect((await deliver(refund)).status).toBe(200);
    const deadline = f.store.purchases.get(f.purchase.id)!.expiresAt;
    expect(await status()).toMatchObject({ entitled: false, purchase: { status: "refunded" } });
    now = new Date("2026-10-27T14:00:00Z");
    expect((await deliver(oldPaid)).status).toBe(200);
    expect((await deliver(refund)).status).toBe(200);
    expect(await status()).toMatchObject({ entitled: false, purchase: { status: "refunded", expiresAt: deadline } });
    expect((await service.grant("alice", "offline-question")).kind).toBe("trial");
    expect(f.store.events.size).toBe(2);
    const finance = f.store.finances.get(f.purchase.id)!;
    expect(finance.confirmedGrossJPY).toBe(980); expect(effectiveRefundJPY(finance)).toBe(100);
    expect(finance.refunds).toHaveLength(1);
    expect(vi.mocked(fetch)).not.toHaveBeenCalled();
  });

  it.each(["checkout.session.async_payment_failed", "checkout.session.expired"])(
    "delayed %s cannot revoke a confirmed pass or extend its deadline", async type => {
      expect((await deliver(event("checkout.session.completed", "evt_paid"))).status).toBe(200);
      const deadline = (await status()).expiresAt;
      unpaid("requires_payment_method"); f.session.status = type.endsWith("expired") ? "expired" : "complete";
      now = new Date("2026-10-27T14:00:00Z");
      expect((await deliver(event(type, "evt_delayed_failure", 1793015900))).status).toBe(200);
      expect(await status()).toMatchObject({ entitled: true, expiresAt: deadline, purchase: { status: "paid" } });
      expect(f.store.events.size).toBe(2);
    });

  it("unpaid completion then asynchronous failure grants nothing; a verified later success recovers once", async () => {
    unpaid();
    expect((await deliver(event("checkout.session.completed", "evt_unpaid"))).status).toBe(200);
    expect(await status()).toMatchObject({ entitled: false, purchase: { status: "pending" } });
    unpaid("requires_payment_method");
    expect((await deliver(event("checkout.session.async_payment_failed", "evt_async_failed"))).status).toBe(200);
    expect(await status()).toMatchObject({ entitled: false, purchase: { status: "failed" } });
    expect(f.store.finances.size).toBe(0);
    paid(); now = new Date("2026-10-27T14:00:00Z");
    const success = event("checkout.session.async_payment_succeeded", "evt_retry_success");
    expect((await deliver(success)).status).toBe(200);
    const deadline = (await status()).expiresAt;
    now = new Date("2026-10-28T14:00:00Z");
    expect((await deliver(success)).status).toBe(200);
    expect(await status()).toMatchObject({ entitled: true, expiresAt: deadline });
    expect(f.store.events.size).toBe(3); expect(f.store.finances.size).toBe(1);
  });

  it("unpaid expired Checkout without PaymentIntent remains inaccessible and idempotent", async () => {
    unpaid(); f.session.status = "expired";
    const originalFetch = f.fetcher;
    vi.mocked(originalFetch).mockImplementation(async input => {
      if (!String(input).includes("/checkout/sessions/")) throw Error("unexpected_fixture_request");
      return Response.json({ ...f.session, payment_intent: null });
    });
    const expired = event("checkout.session.expired", "evt_expired");
    expect((await deliver(expired)).status).toBe(200); expect((await deliver(expired)).status).toBe(200);
    expect(await status()).toMatchObject({ entitled: false, purchase: { status: "expired", expiresAt: null } });
    expect(f.store.events.size).toBe(1); expect(f.store.finances.size).toBe(0);
  });

  it.each(["canceled", "failed"])("refund %s restores only the original term; stale pending cannot suspend it again", async correction => {
    expect((await deliver(event("checkout.session.completed", "evt_paid"))).status).toBe(200);
    const deadline = (await status()).expiresAt;
    f.refund.status = "pending"; f.refunds.push({ ...f.refund });
    const oldPending = event("refund.updated", "evt_pending_old", 1793015900);
    expect((await deliver(oldPending)).status).toBe(200); expect((await status()).entitled).toBe(false);
    f.refund.status = correction; f.refunds[0].status = correction;
    now = new Date("2026-10-27T14:00:00Z");
    expect((await deliver(event(correction === "failed" ? "refund.failed" : "refund.updated", "evt_correction"))).status).toBe(200);
    // Simulate a concurrent provider read with stale pending facts, not merely a stale event label.
    f.refund.status = "pending"; f.refunds[0].status = "pending";
    expect((await deliver({ ...oldPending, id: "evt_stale_pending" })).status).toBe(200);
    expect(await status()).toMatchObject({ entitled: true, expiresAt: deadline });
    const finance = f.store.finances.get(f.purchase.id)!;
    expect(finance.refunds[0].state).toBe(correction); expect(effectiveRefundJPY(finance)).toBe(0);
  });

  it("provider failure and transactional failure return retryable 503 without a partial entitlement", async () => {
    const payment = event("checkout.session.completed", "evt_retry");
    vi.mocked(f.fetcher).mockResolvedValueOnce(new Response("private_fixture_error", { status: 500 }));
    const upstreamFailure = await deliver(payment);
    expect(upstreamFailure.status).toBe(503); expect(await upstreamFailure.text()).not.toContain("private_fixture_error");
    expect(f.store.events.size).toBe(0); expect((await status()).entitled).toBe(false);
    f.store.failEvent = true;
    expect((await deliver(payment)).status).toBe(503);
    expect(f.store.finances.size).toBe(0); expect(f.store.events.size).toBe(0); expect((await status()).entitled).toBe(false);
    f.store.failEvent = false;
    expect((await deliver(payment)).status).toBe(200);
    expect((await status()).entitled).toBe(true); expect(f.store.events.size).toBe(1);
  });
});
