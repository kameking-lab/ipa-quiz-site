import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { monthlyStripeFixture } from "./monthly-stripe-fixture";
import { monthlyTerms } from "@/lib/billing/subscription/service";
beforeEach(() => vi.stubGlobal("fetch", () => { throw new Error("External fetch forbidden"); }));
afterEach(() => vi.unstubAllGlobals());
describe("monthly Stripe adapter (public API fixtures)", () => {
  it("creates only recurring Checkout with durable idempotency and no payment method allowlist", async () => {
    const f = await monthlyStripeFixture();
    const call = vi.mocked(f.fetcher).mock.calls.find(([url]) => String(url).endsWith("/checkout/sessions"))!;
    const body = call[1]?.body as URLSearchParams;
    expect(body.get("mode")).toBe("subscription"); expect(body.get("line_items[0][price]")).toBe("price_monthly");
    expect(body.get("customer")).toBe("cus_monthly"); expect(body.get("payment_method_types")).toBeNull();
    expect(body.get("integration_identifier")).toMatch(/^kakomon-monthly-[a-z]{8}$/);
    expect((call[1]?.headers as Record<string, string>)["Idempotency-Key"]).toContain(f.result.orderId);
  });
  it("resolves invoices through their contract and verifies paid allocations before access", async () => {
    const f = await monthlyStripeFixture(); await f.service.receive(f.event(), "digest", f.provider);
    const state = await f.service.status("alice"); expect(state.entitled).toBe(true); expect(state.expiresAt).toBe("2026-02-28T00:00:00.000Z");
    expect(f.store.accounts.get("stripe-test:alice")!.invoices.in_monthly.payments[0].id).toBe("inpay_monthly");
  });
  it("handles invoice arrival before checkout completion and then links the same signup", async () => {
    const f = await monthlyStripeFixture(); await f.service.receive(f.event(), "first", f.provider);
    await f.service.receive(f.event("checkout.session.completed", f.session.id, "evt_checkout"), "second", f.provider);
    expect(Object.keys(f.store.accounts.get("stripe-test:alice")!.contracts)).toEqual(["sub_monthly"]);
  });
  it.each(["invoice.payment_failed", "invoice.payment_action_required", "invoice.finalization_failed"])("does not grant for %s and an unpaid invoice", async type => {
    const f = await monthlyStripeFixture(); f.invoice.status = "open"; f.invoice.amount_paid = 0; f.invoice.amount_remaining = 980; f.sub.status = "incomplete";
    await f.service.receive(f.event(type), type, f.provider); expect((await f.service.status("alice")).entitled).toBe(false);
  });
  it("uses current API facts when an old failure arrives after a successful invoice", async () => {
    const f = await monthlyStripeFixture(); await f.service.receive(f.event("invoice.payment_failed"), "old event", f.provider);
    expect((await f.service.status("alice")).entitled).toBe(true);
  });
  it("rejects unverified manual-paid or credit-funded invoices", async () => {
    const f = await monthlyStripeFixture(); f.allocation.amount_paid = 0;
    await expect(f.service.receive(f.event(), "x", f.provider)).rejects.toMatchObject({ code: "invoice_payment_mismatch" });
    expect((await f.service.status("alice")).entitled).toBe(false);
  });
  it.each(["customer", "amount_received"])("rejects mismatched PaymentIntent %s", async field => {
    const f = await monthlyStripeFixture(); if (field === "customer") f.payment.customer = "cus_other"; else f.payment.amount_received = 100;
    await expect(f.service.receive(f.event(), "x", f.provider)).rejects.toMatchObject({ code: "payment_owner_mismatch" });
  });
  it("rejects a cross-realm signed object or recurring interval mismatch", async () => {
    const f = await monthlyStripeFixture(); await expect(f.provider.resolve({ ...f.event(), livemode: true })).rejects.toMatchObject({ code: "payment_mode_mismatch" });
    f.price.recurring.interval = "year"; await expect(f.service.receive(f.event(), "x", f.provider)).rejects.toThrow();
  });
  it("resolves a partial refund through invoice payments without changing access or renewal", async () => {
    const f = await monthlyStripeFixture(); await f.service.receive(f.event(), "paid", f.provider);
    f.refunds.push({ id: "re_partial", amount: 100, payment_intent: f.payment.id, currency: "jpy", status: "succeeded" });
    await f.service.receive(f.event("refund.updated", "re_partial", "evt_refund"), "refund", f.provider);
    expect((await f.service.status("alice")).entitled).toBe(true); expect(f.sub.cancel_at_period_end).toBe(false);
    expect(vi.mocked(f.fetcher).mock.calls.some(([url]) => String(url).includes("payment%5Bpayment_intent%5D=pi_monthly"))).toBe(true);
  });
  it("commits a paid account's dispute hold before a renewal-stop outage; retries through stored outbox", async () => {
    const f = await monthlyStripeFixture(); await f.service.receive(f.event(), "paid", f.provider);
    f.disputes.push({ id: "du_open", payment_intent: f.payment.id, livemode: false, status: "needs_response" });
    const original = f.provider.stopRenewal.bind(f.provider); vi.spyOn(f.provider, "stopRenewal").mockRejectedValueOnce(new Error("stop failed"));
    const event = f.event("charge.dispute.created", "du_open", "evt_dispute"); await expect(f.service.receive(event, "dispute", f.provider)).rejects.toThrow();
    expect((await f.service.status("alice")).entitled).toBe(false);
    vi.mocked(f.provider.stopRenewal).mockImplementation(original); expect(await f.service.receive(event, "dispute", f.provider)).toBe("duplicate");
    expect(f.sub.cancel_at_period_end).toBe(true);
  });
  it("does not create another subscription when provider knows one even if local callbacks are delayed", async () => {
    const f = await monthlyStripeFixture(); const a = f.store.accounts.get("stripe-test:alice")!, signup = a.signups[f.result.orderId];
    signup.sessionId = null; signup.url = null;
    await expect(f.service.checkout("alice", monthlyTerms(f.config), f.provider)).rejects.toMatchObject({ code: "subscription_exists" });
    expect(vi.mocked(f.fetcher).mock.calls.filter(([url]) => String(url).endsWith("/checkout/sessions"))).toHaveLength(1);
  });
  it("a fully expired checkout with no subscription closes the pending reservation", async () => {
    const f = await monthlyStripeFixture(); f.session.status = "expired"; (f.session as { subscription: string | null }).subscription = null;
    await f.service.receive(f.event("checkout.session.expired", f.session.id), "expired", f.provider);
    expect(f.store.accounts.get("stripe-test:alice")!.signups[f.result.orderId].state).toBe("expired");
  });
  it("provider failure does not persist a half-applied invoice or receipt", async () => {
    const f = await monthlyStripeFixture(); f.fail("payment_intents/pi_monthly");
    await expect(f.service.receive(f.event(), "x", f.provider)).rejects.toMatchObject({ code: "payment_provider_unavailable" });
    expect(f.store.accounts.get("stripe-test:alice")!.invoices).toEqual({});
  });
  it("rejects post-payment credits unsupported by the fixed-price first release", async () => {
    const f = await monthlyStripeFixture(); f.invoice.post_payment_credit_notes_amount = 100;
    await expect(f.service.receive(f.event(), "credit", f.provider)).rejects.toThrow();
    expect((await f.service.status("alice")).entitled).toBe(false);
  });
  it("refuses a Portal configuration that permits plan changes or immediate cancellation", async () => {
    const f = await monthlyStripeFixture(); f.portalConfiguration.features.subscription_update.enabled = true;
    await expect(f.service.portal("alice", f.provider)).rejects.toThrow(); f.portalConfiguration.features.subscription_update.enabled = false;
    f.portalConfiguration.features.subscription_cancel.mode = "immediately"; await expect(f.service.portal("alice", f.provider)).rejects.toThrow();
  });
  it("retains a signed refund failure correction despite a stale API list and replay", async () => {
    const f = await monthlyStripeFixture(); await f.service.receive(f.event(), "paid", f.provider);
    f.refunds.push({ id: "re_old", payment_intent: f.payment.id, amount: 100, currency: "jpy", status: "pending" });
    const e = f.event("refund.failed", "re_old", "evt_failed"); Object.assign(e.data.object, { amount: 100, currency: "jpy", status: "failed" });
    await f.service.receive(e, "signed-failed", f.provider); await f.service.receive(e, "signed-failed", f.provider);
    expect((await f.service.status("alice")).entitled).toBe(true);
    expect(f.store.accounts.get("stripe-test:alice")!.payments.pi_monthly.refunds.re_old.state).toBe("failed");
  });
});
