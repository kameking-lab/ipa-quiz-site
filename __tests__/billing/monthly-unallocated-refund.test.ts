import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { monthlyStripeFixture } from "./monthly-stripe-fixture";

beforeEach(() => vi.stubGlobal("fetch", () => { throw new Error("External fetch forbidden"); }));
afterEach(() => vi.unstubAllGlobals());
type Fixture = Awaited<ReturnType<typeof monthlyStripeFixture>>;
const account = (f: Fixture) => f.store.accounts.get("stripe-test:alice")!;
function detail(f: Fixture, state = "succeeded", amount = 980, id = "re_early") {
  const r = { id, payment_intent: f.payment.id, amount, currency: "jpy", status: state };
  f.refundDetails.set(id, r); return r;
}
const paid = (f: Fixture, id = "evt_later_paid") => f.service.receive(f.event("invoice.paid", f.invoice.id, id), id, f.provider);
const refund = (f: Fixture, id = "evt_early", refundId = "re_early") => f.service.receive(f.event("refund.updated", refundId, id), id, f.provider);
function noRenewalWrite(f: Fixture) {
  expect(vi.mocked(f.fetcher).mock.calls.filter(([url, options]) => String(url).includes("/subscriptions/") && options?.method === "POST")).toHaveLength(0);
}

describe("early signed refund facts before paid allocation visibility", () => {
  it("preserves full refund across restart of the service and later paid with an empty refund list", async () => {
    const f = await monthlyStripeFixture(); f.allocationsVisible(false); detail(f);
    expect(await refund(f)).toBe("processed"); expect(await refund(f)).toBe("duplicate");
    expect(account(f).invoices).toEqual({}); expect(account(f).contracts).toEqual({});
    expect(account(f).payments.pi_monthly.refunds.re_early).toMatchObject({ amount: 980, state: "succeeded" });
    expect((await f.service.status("alice")).entitled).toBe(false);
    // A new service object over the same committed memory store, not a PG restart.
    const { MonthlyService } = await import("@/lib/billing/subscription/service");
    const resumed = new MonthlyService(f.store, f.config, () => new Date("2026-02-01T00:00:00Z"));
    f.allocationsVisible(true); f.refundDetails.clear(); f.refunds.length = 0;
    await resumed.receive(f.event("invoice.paid", f.invoice.id, "evt_paid"), "paid", f.provider);
    expect(await resumed.status("alice", f.result.orderId)).toMatchObject({ entitled: false, purchase: { status: "refunded" } });
    noRenewalWrite(f);
  });
  it.each(["failed", "canceled"])("signed %s correction survives stale successful canonical detail and later list", async state => {
    const f = await monthlyStripeFixture(); f.allocationsVisible(false); const r = detail(f); await refund(f);
    const event = f.event("refund.updated", r.id, "evt_correction"); Object.assign(event.data.object, { status: state });
    await f.service.receive(event, "correction", f.provider);
    expect(account(f).payments.pi_monthly.refunds.re_early.state).toBe(state);
    f.allocationsVisible(true); f.refunds.push(r); await paid(f);
    expect((await f.service.status("alice")).entitled).toBe(true);
    expect(account(f).payments.pi_monthly.refunds.re_early.state).toBe(state); noRenewalWrite(f);
  });
  it("visible paid allocation plus stale open invoice still preserves the refund before later paid", async () => {
    const f = await monthlyStripeFixture(); f.allocationsVisible(true);
    f.invoice.status = "open"; f.invoice.amount_paid = 0; f.invoice.amount_remaining = 980; detail(f);
    expect(await refund(f)).toBe("processed");
    expect(account(f).invoices.in_monthly.paid).toBe(false);
    expect(account(f).payments.pi_monthly.refunds.re_early.state).toBe("succeeded");
    f.invoice.status = "paid"; f.invoice.amount_paid = 980; f.invoice.amount_remaining = 0;
    f.refundDetails.clear(); f.refunds.length = 0; await paid(f);
    expect(await f.service.status("alice", f.result.orderId)).toMatchObject({ entitled: false, purchase: { status: "refunded" } });
    noRenewalWrite(f);
  });
  it.each(["pending", "requires_action", "failed", "canceled"])("unallocated %s remains a financial fact without denying later paid access", async state => {
    const f = await monthlyStripeFixture(); f.allocationsVisible(false); detail(f, state); await refund(f);
    expect(account(f).payments.pi_monthly.refunds.re_early.state).toBe(state === "requires_action" ? "pending" : state);
    f.allocationsVisible(true); f.refundDetails.clear(); await paid(f);
    expect((await f.service.status("alice")).entitled).toBe(true); noRenewalWrite(f);
  });
  it("early partial refund preserves the paid period and never invents cancellation", async () => {
    const f = await monthlyStripeFixture(); f.allocationsVisible(false); detail(f, "succeeded", 100); await refund(f);
    f.allocationsVisible(true); f.refundDetails.clear(); await paid(f);
    expect((await f.service.status("alice")).entitled).toBe(true); noRenewalWrite(f);
  });
  it("same-customer standalone PI cannot alter an independently paid subscription", async () => {
    const f = await monthlyStripeFixture(); await paid(f); f.allocationsVisible(false);
    f.payment.id = "pi_standalone"; detail(f); await refund(f);
    expect(Object.keys(account(f).payments).sort()).toEqual(["pi_monthly", "pi_standalone"]);
    expect(account(f).invoices.in_monthly.payments[0].paymentId).toBe("pi_monthly");
    expect((await f.service.status("alice")).entitled).toBe(true); noRenewalWrite(f);
  });
  it("affirmatively unknown customer is ignored without creating or changing accounts", async () => {
    const f = await monthlyStripeFixture(); const before = structuredClone(account(f));
    f.allocationsVisible(false); f.payment.customer = "cus_unrelated"; detail(f);
    expect(await refund(f)).toBe("ignored"); expect(account(f)).toEqual(before); expect(f.store.accounts.size).toBe(1);
  });
  it("owner lookup failure is not mistaken for an unrelated customer", async () => {
    const f = await monthlyStripeFixture(); const before = structuredClone(account(f));
    f.allocationsVisible(false); detail(f); vi.spyOn(f.store, "owner").mockRejectedValueOnce(new Error("fixture store unavailable"));
    await expect(refund(f)).rejects.toThrow(); expect(account(f)).toEqual(before);
  });
  it("unrelated unsupported-currency refund is ignored before applying monthly financial rules", async () => {
    const f = await monthlyStripeFixture(); const before = structuredClone(account(f));
    f.allocationsVisible(false); f.payment.customer = "cus_unrelated"; f.payment.currency = "usd";
    const r = detail(f); r.currency = "usd";
    expect(await refund(f)).toBe("ignored"); expect(account(f)).toEqual(before);
  });
  it("known-customer unsupported currency fails closed and does not lose the event as ignored", async () => {
    const f = await monthlyStripeFixture(); const before = structuredClone(account(f));
    f.allocationsVisible(false); f.payment.currency = "usd"; const r = detail(f); r.currency = "usd";
    await expect(refund(f)).rejects.toMatchObject({ code: "unverified_refund_target" }); expect(account(f)).toEqual(before);
  });
  it("refund ID reuse on another unallocated PI is rejected atomically", async () => {
    const f = await monthlyStripeFixture(); f.allocationsVisible(false); detail(f); await refund(f);
    const before = structuredClone(account(f)); f.payment.id = "pi_other"; detail(f);
    await expect(refund(f, "evt_other")).rejects.toMatchObject({ code: "refund_identity_conflict" }); expect(account(f)).toEqual(before);
  });
  it.each(["mode", "customer", "amount", "refundAmount", "missingSigned"])("rejects %s inconsistency without saving a grant or event", async kind => {
    const f = await monthlyStripeFixture(); f.allocationsVisible(false); const r = detail(f);
    const before = structuredClone(account(f)); const event = f.event("refund.updated", r.id, "evt_bad");
    if (kind === "mode") f.payment.livemode = true;
    if (kind === "amount") f.payment.amount_received = 979;
    if (kind === "refundAmount") Object.assign(event.data.object, { amount: 979 });
    if (kind === "missingSigned") delete (event.data.object as Record<string, unknown>).status;
    if (kind === "customer") {
      const original = vi.mocked(f.fetcher).getMockImplementation()!; let reads = 0;
      vi.mocked(f.fetcher).mockImplementation(async (url, options) => {
        if (String(url).endsWith("payment_intents/pi_monthly") && ++reads === 2) return Response.json({ ...f.payment, customer: "cus_other" });
        return original(url, options);
      });
    }
    await expect(f.service.receive(event, "bad", f.provider)).rejects.toThrow(); expect(account(f)).toEqual(before);
  });
});
