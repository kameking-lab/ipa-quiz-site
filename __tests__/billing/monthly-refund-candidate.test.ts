import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { createHash } from "node:crypto";
import { monthlyFixture } from "./monthly-fixture";
import { monthlyStripeFixture } from "./monthly-stripe-fixture";
import { monthlyTerms } from "@/lib/billing/subscription/service";
import type { RefundState } from "@/lib/billing/domain";

beforeEach(() => vi.stubGlobal("fetch", () => { throw new Error("External fetch forbidden"); }));
afterEach(() => vi.unstubAllGlobals());
type Fixture = Awaited<ReturnType<typeof monthlyFixture>>;
function refund(f: Fixture, amount = 980, state: RefundState = "succeeded", id = "re_one") {
  f.observation.payments[0].refunds[id] = { id, amount, state };
}
async function state(f: Fixture) { return f.service.status("alice", f.checkout.orderId); }
function noStop(f: Fixture) {
  expect(f.provider.stopRenewal).not.toHaveBeenCalled();
  expect(f.account().renewalStopJobs).toEqual({});
  expect(f.account().contracts.sub_monthly.renewalBlocked).toBe(false);
}
function nextInvoice(f: Fixture) {
  const old = structuredClone(f.observation.invoices[0]);
  const next = { ...old, id: "in_next", periodStart: old.periodEnd, periodEnd: old.periodEnd + 31 * 86400,
    payments: [{ id: "inpay_next", paymentId: "pi_next", amount: 980 }] };
  f.observation.invoices.push(next);
  f.observation.payments.push({ id: "pi_next", customerId: "cus_alice", amount: 980, refunds: {}, disputes: {} });
  Object.assign(f.observation.contracts[0], { periodStart: next.periodStart, periodEnd: next.periodEnd });
  return next;
}

describe("refund policy candidate: offline account/invoice boundary matrix", () => {
  it.each([1, 100, 979])("preserves access, paid status and renewal after partial refund %i/980", async amount => {
    const f = await monthlyFixture(); await f.send("evt_paid"); refund(f, amount); await f.send("evt_refund");
    expect(await state(f)).toMatchObject({ entitled: true, purchase: { status: "paid" }, subscription: { cancelAtPeriodEnd: false } }); noStop(f);
  });
  it.each(["pending", "failed", "canceled"] as const)("full %s refund does not penalize paid access", async status => {
    const f = await monthlyFixture(); refund(f, 980, status); await f.send();
    expect(await state(f)).toMatchObject({ entitled: true, purchase: { status: "paid" } }); noStop(f);
  });
  it("cumulative partial successes revoke only at the complete amount, and replay/late paid cannot restore", async () => {
    const f = await monthlyFixture(); refund(f, 100); refund(f, 880, "pending", "re_two"); await f.send("evt_partial");
    expect((await state(f)).entitled).toBe(true);
    f.observation.payments[0].refunds.re_two.state = "succeeded"; await f.send("evt_full");
    expect(await state(f)).toMatchObject({ entitled: false, purchase: { status: "refunded" } });
    expect(await f.send("evt_full")).toBe("duplicate"); f.observation.payments[0].refunds = {};
    await f.send("evt_late_paid"); expect((await state(f)).entitled).toBe(false); noStop(f);
  });
  it.each(["failed", "canceled"] as const)("verified full-refund correction to %s restores only the still-valid interval", async status => {
    const f = await monthlyFixture(); refund(f); await f.send("evt_full"); expect((await state(f)).entitled).toBe(false);
    refund(f, 980, status); await f.send("evt_correction"); expect((await state(f)).entitled).toBe(true);
    refund(f); await f.send("evt_stale_success"); expect((await state(f)).entitled).toBe(true);
    f.setNow("2026-02-28T00:00:00Z"); await f.send("evt_paid_after_end"); expect((await state(f)).entitled).toBe(false); noStop(f);
  });
  it("refund arriving before invoice.paid stays effective after payment confirmation", async () => {
    const f = await monthlyFixture(), invoice = structuredClone(f.observation.invoices[0]);
    refund(f); f.observation.invoices[0].paid = false; f.observation.invoices[0].payments = []; await f.send("evt_refund_first");
    f.observation.invoices[0] = invoice; f.observation.payments[0].refunds = {}; await f.send("evt_paid_later");
    expect((await state(f)).entitled).toBe(false); noStop(f);
  });
  it.each([100, 980])("old invoice refund %i leaves independently paid next invoice accessible", async amount => {
    const f = await monthlyFixture(); await f.send("evt_old"); const next = nextInvoice(f); f.setNow("2026-03-01T00:00:00Z");
    refund(f, amount); await f.send("evt_old_refund_and_next_paid");
    expect(await state(f)).toMatchObject({ entitled: true, purchase: { status: "paid" }, expiresAt: new Date(next.periodEnd * 1000).toISOString() }); noStop(f);
  });
  it("full current refund permits an independently paid future renewal without restoring old period", async () => {
    const f = await monthlyFixture(); refund(f); await f.send("evt_full"); nextInvoice(f); await f.send("evt_future_paid");
    expect((await state(f)).entitled).toBe(false);
    f.setNow("2026-03-01T00:00:00Z"); expect((await state(f)).entitled).toBe(true); noStop(f);
  });
  it.each(["pending", "succeeded"] as const)("old ended subscription with %s refund allows rejoin and cannot revoke the new contract", async status => {
    const f = await monthlyFixture(); refund(f, 980, status); f.observation.contracts[0].status = "canceled"; await f.send("evt_old_end");
    const old = structuredClone(f.observation);
    vi.mocked(f.provider.checkout).mockResolvedValue({ id: "cs_rejoin", url: "https://checkout.stripe.com/c/pay/fixture" });
    const order = await f.service.checkout("alice", monthlyTerms(f.config), f.provider);
    Object.assign(f.observation.contracts[0], { id: "sub_new", signupId: order.orderId, status: "active" });
    Object.assign(f.observation.invoices[0], { id: "in_new", subscriptionId: "sub_new", payments: [{ id: "inpay_new", paymentId: "pi_new", amount: 980 }] });
    f.observation.payments[0] = { id: "pi_new", customerId: "cus_alice", amount: 980, refunds: {}, disputes: {} };
    await f.send("evt_new_paid"); Object.assign(f.observation, old); await f.send("evt_old_replay_new_id");
    expect(await f.service.status("alice", order.orderId)).toMatchObject({ entitled: true, purchase: { status: "paid" }, subscription: { cancelAtPeriodEnd: false } }); noStop(f);
  });
  it("one invoice with two payments stays accessible until both are proven fully refunded", async () => {
    const f = await monthlyFixture(); f.observation.payments[0].amount = 400;
    f.observation.payments.push({ id: "pi_two", customerId: "cus_alice", amount: 580, refunds: {}, disputes: {} });
    f.observation.invoices[0].payments = [{ id: "inpay_jan", paymentId: "pi_jan", amount: 400 }, { id: "inpay_two", paymentId: "pi_two", amount: 580 }];
    refund(f, 400); await f.send("evt_one_full"); expect((await state(f)).entitled).toBe(true);
    f.observation.payments[1].refunds.re_two = { id: "re_two", amount: 580, state: "succeeded" }; await f.send("evt_both_full");
    expect((await state(f)).entitled).toBe(false); noStop(f);
  });
  it("shared payment partial refund cannot be allocated by guess; full payment revokes both proven invoices", async () => {
    const f = await monthlyFixture(); const next = nextInvoice(f); f.observation.payments.pop(); f.observation.payments[0].amount = 1960;
    next.payments[0].paymentId = "pi_jan"; refund(f, 980); await f.send("evt_shared_partial");
    expect((await state(f)).entitled).toBe(true); f.setNow("2026-03-01T00:00:00Z"); expect((await state(f)).entitled).toBe(true);
    refund(f, 980, "succeeded", "re_two"); await f.send("evt_shared_full"); expect((await state(f)).entitled).toBe(false); noStop(f);
  });
  it("a separate valid overlapping invoice wins over the refunded invoice in access and purchase status", async () => {
    const f = await monthlyFixture(); const next = nextInvoice(f), first = f.observation.invoices[0];
    next.periodStart = first.periodStart; next.periodEnd = first.periodEnd; refund(f); await f.send();
    expect(await state(f)).toMatchObject({ entitled: true, purchase: { status: "paid" } }); noStop(f);
  });
  it("full refund composes with explicit cancellation and never withdraws it", async () => {
    const f = await monthlyFixture(); f.observation.contracts[0].cancelAtPeriodEnd = true; refund(f); await f.send();
    expect(await state(f)).toMatchObject({ entitled: false, subscription: { cancelAtPeriodEnd: true, renewalBlocked: false } }); noStop(f);
  });
  it("a terminal contract is never resurrected by late paid observations after a refund", async () => {
    const f = await monthlyFixture(); refund(f); f.observation.contracts[0].status = "canceled"; await f.send();
    f.observation.contracts[0].status = "active";
    await expect(f.send("evt_old_active")).rejects.toMatchObject({ code: "terminal_subscription_conflict" });
    expect((await state(f)).entitled).toBe(false); noStop(f);
  });
  it.each([0, -1, 0.5, 981])("rejects invalid/over refund amount %i atomically", async amount => {
    const f = await monthlyFixture(); await f.send("evt_paid"); const before = structuredClone(f.account()); refund(f, amount);
    await expect(f.send("evt_bad")).rejects.toThrow(); expect(f.account()).toEqual(before); noStop(f);
  });
  it("rejects changed refund amount or reuse across PaymentIntents", async () => {
    const f = await monthlyFixture(); refund(f, 100); await f.send(); refund(f, 101);
    await expect(f.send("evt_changed")).rejects.toMatchObject({ code: "refund_amount_conflict" });
    refund(f, 100); nextInvoice(f); f.observation.payments[1].refunds.re_one = { id: "re_one", amount: 100, state: "succeeded" };
    await expect(f.send("evt_wrong_payment")).rejects.toMatchObject({ code: "refund_identity_conflict" }); noStop(f);
  });
  it.each(["flag", "job"] as const)("legacy unclassified %s requires reconciliation without provider writes or flag deletion", async kind => {
    const f = await monthlyFixture(); await f.send();
    if (kind === "flag") f.account().contracts.sub_monthly.renewalBlocked = true;
    else f.account().renewalStopJobs.sub_monthly = { token: "evt_legacy" };
    const before = structuredClone(f.account()); refund(f, 100);
    await expect(f.send("evt_refund")).rejects.toMatchObject({ code: "billing_policy_review_required" });
    await expect(f.service.flushRenewalStops("alice", f.provider)).rejects.toMatchObject({ code: "billing_policy_review_required" });
    await expect(state(f)).rejects.toMatchObject({ code: "billing_policy_review_required" });
    await expect(f.service.grant("alice", "q1")).rejects.toMatchObject({ code: "billing_policy_review_required" });
    expect(f.account()).toEqual(before); expect(f.provider.stopRenewal).not.toHaveBeenCalled();
  });
  it("refund notification may flush an existing dispute job using the original token, never a new refund intent", async () => {
    const f = await monthlyFixture(); f.observation.payments[0].disputes.du_one = "open";
    vi.mocked(f.provider.stopRenewal).mockRejectedValueOnce(new Error("fixture outage"));
    await expect(f.send("evt_dispute")).rejects.toThrow(); refund(f, 100); await f.send("evt_refund");
    expect(vi.mocked(f.provider.stopRenewal).mock.calls.map(c => c[1])).toEqual(["evt_dispute", "evt_dispute"]);
    expect((await state(f)).entitled).toBe(false); expect(f.account().contracts.sub_monthly.renewalBlockReason).toBe("dispute");
  });
  it("Portal creation failure and retry change no access, refund, or cancellation state", async () => {
    const f = await monthlyFixture(); await f.send(); const before = structuredClone(f.account());
    vi.mocked(f.provider.portal).mockRejectedValueOnce(new Error("fixture failure"));
    await expect(f.service.portal("alice", f.provider)).rejects.toThrow(); await f.service.portal("alice", f.provider);
    expect(f.account()).toEqual(before); noStop(f);
  });
  it("changes future terms fingerprint without rewriting historical signup terms", async () => {
    const f = await monthlyFixture(), c = f.config;
    const original = createHash("sha256").update(JSON.stringify({ version: c.termsVersion, price: c.priceYen, priceId: c.priceId,
      freeDaily: c.freeDaily, interval: "month", autoRenew: true, cancel: "period-end", unpaidGraceDays: 0,
      refund: "affected-paid-period-suspended;stop-renewal", seller: c.seller })).digest("hex");
    f.account().signups[f.checkout.orderId].terms = original; f.observation.contracts[0].terms = original;
    expect(monthlyTerms(f.config)).not.toBe(original); await f.send("evt_old_terms_paid"); refund(f, 100); await f.send("evt_refund");
    expect(f.account().signups[f.checkout.orderId].terms).toBe(original);
    expect((await state(f)).entitled).toBe(true);
  });
  it("a shared PI plus a separate PI across old/new contracts revokes only completely refunded invoices", async () => {
    const f = await monthlyFixture(); f.observation.payments[0].amount = 1400;
    f.observation.contracts[0].status = "canceled"; await f.send("evt_old_end");
    vi.mocked(f.provider.checkout).mockResolvedValue({ id: "cs_new", url: "https://checkout.stripe.com/c/pay/fixture" });
    const order = await f.service.checkout("alice", monthlyTerms(f.config), f.provider);
    f.observation.contracts.push({ ...f.observation.contracts[0], id: "sub_new", signupId: order.orderId, status: "active" });
    f.observation.invoices.push({ ...f.observation.invoices[0], id: "in_new", subscriptionId: "sub_new", payments: [
      { id: "inpay_shared", paymentId: "pi_jan", amount: 420 }, { id: "inpay_extra", paymentId: "pi_extra", amount: 560 },
    ] });
    f.observation.payments.push({ id: "pi_extra", customerId: "cus_alice", amount: 560, refunds: {}, disputes: {} });
    refund(f, 1400); await f.send("evt_shared_full");
    expect((await f.service.status("alice", order.orderId)).purchase?.status).toBe("paid");
    f.observation.payments[1].refunds.re_extra = { id: "re_extra", amount: 560, state: "succeeded" };
    await f.send("evt_both_full"); expect((await f.service.status("alice", order.orderId)).purchase?.status).toBe("refunded");
    noStop(f);
  });
  it("a full refund correction does not bypass an unresolved dispute or silently resume a won dispute's renewal", async () => {
    const f = await monthlyFixture(); refund(f); f.observation.payments[0].disputes.du_one = "open"; await f.send("evt_full_disputed");
    refund(f, 980, "failed"); await f.send("evt_refund_failed"); expect((await state(f)).entitled).toBe(false);
    f.observation.payments[0].disputes.du_one = "won"; f.observation.contracts[0].cancelAtPeriodEnd = true;
    await f.send("evt_won"); expect(await state(f)).toMatchObject({ entitled: true, subscription: { cancelAtPeriodEnd: true, renewalBlocked: true } });
  });
});

describe("refund policy candidate: real adapter with public API fixtures only", () => {
  it("an early verified refund is retained without allocation and recovered when the invoice is paid", async () => {
    const f = await monthlyStripeFixture(); f.invoice.status = "open"; f.invoice.amount_paid = 0; f.invoice.amount_remaining = 980;
    f.refunds.push({ id: "re_early", amount: 980, payment_intent: f.payment.id, currency: "jpy", status: "succeeded" });
    expect(await f.service.receive(f.event("refund.updated", "re_early", "evt_early"), "early", f.provider)).toBe("processed");
    expect((await f.service.status("alice")).entitled).toBe(false);
    f.invoice.status = "paid"; f.invoice.amount_paid = 980; f.invoice.amount_remaining = 0;
    await f.service.receive(f.event("invoice.paid", f.invoice.id, "evt_confirm"), "paid", f.provider);
    expect(await f.service.status("alice", f.result.orderId)).toMatchObject({ entitled: false, purchase: { status: "refunded" } });
    expect(f.sub.cancel_at_period_end).toBe(false);
  });
  it.each(["pending", "requires_action", "failed", "canceled"])("provider full refund %s preserves access", async status => {
    const f = await monthlyStripeFixture(); f.refunds.push({ id: "re_full", amount: 980, payment_intent: f.payment.id, currency: "jpy", status });
    await f.service.receive(f.event("refund.updated", "re_full"), "fixture", f.provider);
    expect((await f.service.status("alice")).entitled).toBe(true); expect(f.sub.cancel_at_period_end).toBe(false);
  });
  it("charge.refunded partial then full and later invoice.paid never calls subscription cancellation", async () => {
    const f = await monthlyStripeFixture(); f.refunds.push({ id: "re_partial", amount: 100, payment_intent: f.payment.id, currency: "jpy", status: "succeeded" });
    await f.service.receive(f.event("charge.refunded", "ch_fixture", "evt_partial"), "partial", f.provider);
    expect((await f.service.status("alice")).entitled).toBe(true);
    f.refunds.push({ id: "re_rest", amount: 880, payment_intent: f.payment.id, currency: "jpy", status: "succeeded" });
    await f.service.receive(f.event("refund.updated", "re_rest", "evt_full"), "full", f.provider);
    expect((await f.service.status("alice")).entitled).toBe(false);
    f.refunds.length = 0; await f.service.receive(f.event("invoice.paid", f.invoice.id, "evt_late"), "late", f.provider);
    expect((await f.service.status("alice")).entitled).toBe(false); expect(f.sub.cancel_at_period_end).toBe(false);
    expect(vi.mocked(f.fetcher).mock.calls.filter(([url, options]) => String(url).endsWith("/subscriptions/sub_monthly") && options?.method === "POST")).toHaveLength(0);
  });
  it("delayed Portal cancellation is reconciled from canonical subscription even through a late invoice notification", async () => {
    const f = await monthlyStripeFixture(); await f.service.receive(f.event(), "paid", f.provider);
    // Model the independent Portal action succeeding while its own notification is lost.
    f.sub.cancel_at_period_end = true;
    await f.service.receive(f.event("invoice.paid", f.invoice.id, "evt_other"), "late", f.provider);
    expect(await f.service.status("alice")).toMatchObject({ entitled: true, subscription: { cancelAtPeriodEnd: true } });
    f.sub.cancel_at_period_end = false;
    await f.service.receive(f.event("customer.subscription.updated", f.sub.id, "evt_undo"), "undo", f.provider);
    expect(await f.service.status("alice")).toMatchObject({ entitled: true, subscription: { cancelAtPeriodEnd: false } });
    expect(vi.mocked(f.fetcher).mock.calls.filter(([url, options]) => String(url).endsWith("/subscriptions/sub_monthly") && options?.method === "POST")).toHaveLength(0);
  });
});
