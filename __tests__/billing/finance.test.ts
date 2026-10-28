import { describe, it, expect } from "vitest";
import { BillingService } from "@/lib/billing/service";
import { billingConfig } from "@/lib/billing/config";
import { effectiveRefundJPY, unknownSuccessTime, type FinanceObservation, type RefundObservation } from "@/lib/billing/finance";
import type { PaymentSnapshot, Purchase } from "@/lib/billing/domain";
import { MemoryStore } from "./memory-store";

function fixture() {
  const store = new MemoryStore(); let now = new Date("2026-10-25T00:00:00Z");
  const config = { ...billingConfig({ BILLING_MODE: "stripe-test" }), sourceInstance: "fixture-source" };
  const service = new BillingService(store, config, () => now);
  const p: Purchase = { id: "order-fixture", mode: "stripe-test", userId: "alice", createdAt: now.toISOString(),
    amount: 980, days: 30, termsHash: "a".repeat(64), status: "pending", sessionId: "cs_test_fixture",
    checkoutUrl: null, paymentId: null, activatedAt: null, expiresAt: null };
  store.purchases.set(p.id, p);
  const event = (eventId: string, refunds: RefundObservation[] = [], extra: Partial<FinanceObservation> = {}): PaymentSnapshot => ({
    eventId, digest: eventId, orderId: p.id, userId: "alice", mode: p.mode, sessionId: p.sessionId, paymentId: "pi_fixture",
    amount: 980, currency: "jpy", termsHash: p.termsHash, state: "paid", finance: {
      eventType: "refund.updated", currency: "jpy", grossJPY: 980, paidTime: unknownSuccessTime(), refunds,
      refundsComplete: true, disputeObserved: false, ...extra } });
  return { store, service, config, p, event, facts: () => store.finances.get(p.id)!, order: () => store.purchases.get(p.id)!,
    setTime: (s: string) => { now = new Date(s); } };
}
const refund = (state: RefundObservation["state"], refundId = "re_one", amountJPY = 100): RefundObservation => ({
  refundId, amountJPY, state, successTime: state === "succeeded" ? unknownSuccessTime() : null });

describe("financial facts and entitlement reconciliation", () => {
  it("keeps gross on refund-first delivery, starts the original deadline once, and grants no access", async () => {
    const f = fixture(); await f.service.receive({ ...f.event("evt_refund", [refund("succeeded")]), sessionId: null });
    expect(f.facts().confirmedGrossJPY).toBe(980); expect(effectiveRefundJPY(f.facts())).toBe(100);
    expect(f.facts().paidTime.at).toBeNull(); expect(f.order().status).toBe("refunded");
    expect(f.order().expiresAt).toBe("2026-11-24T00:00:00.000Z");
    f.setTime("2026-10-28T00:00:00Z"); await f.service.receive(f.event("evt_paid"));
    expect(f.order().status).toBe("refunded"); expect(f.order().expiresAt).toBe("2026-11-24T00:00:00.000Z");
  });
  it.each(["failed", "canceled"] as const)("success then %s removes effective amount but keeps audit and original deadline", async state => {
    const f = fixture(); await f.service.receive(f.event("evt_success", [refund("succeeded")]));
    const deadline = f.order().expiresAt;
    f.setTime("2026-10-26T00:00:00Z"); await f.service.receive(f.event("evt_correction", [refund(state)]));
    expect(effectiveRefundJPY(f.facts())).toBe(0); expect(f.facts().refunds[0].success?.evidence.eventId).toBe("evt_success");
    expect(f.facts().refunds[0].stateEvidence.eventId).toBe("evt_correction");
    expect((await f.service.status("alice")).entitled).toBe(true); expect(f.order().expiresAt).toBe(deadline);
    await f.service.receive(f.event("evt_old_success", [refund("succeeded")]));
    expect(f.facts().refunds[0].state).toBe(state); expect(effectiveRefundJPY(f.facts())).toBe(0);
    expect(f.order().status).toBe("paid");
  });
  it("failed-first then dated old success enriches audit only, including same-second events", async () => {
    const f = fixture(); await f.service.receive(f.event("evt_failed", [refund("failed")]));
    const success = refund("succeeded"); success.successTime = { at: "2026-10-25T00:00:00.000Z", provenance: {
      kind: "stripe_success_event_created", eventId: "evt_old_success", eventType: "refund.updated", providerCreatedSeconds: 1792886400 } };
    await f.service.receive(f.event("evt_old_success", [success]));
    expect(effectiveRefundJPY(f.facts())).toBe(0); expect(f.facts().refunds[0].success?.time.at).toBe(success.successTime.at);
    expect(f.order().status).toBe("paid");
  });
  it("distinct partial refunds, repeated event and different events for same refund never multiply money", async () => {
    const f = fixture(); const a = f.event("evt_one", [refund("succeeded")]);
    await Promise.all(Array.from({ length: 6 }, () => f.service.receive(a)));
    const revision = f.facts().revision;
    await f.service.receive(f.event("evt_same_refund", [refund("succeeded")]));
    expect(f.facts().revision).toBe(revision); expect(effectiveRefundJPY(f.facts())).toBe(100);
    await f.service.receive(f.event("evt_two", [refund("succeeded", "pyr_two", 300)]));
    expect(effectiveRefundJPY(f.facts())).toBe(400);
    await f.service.receive(f.event("evt_failed", [refund("failed")]));
    expect(effectiveRefundJPY(f.facts())).toBe(300); expect(f.order().status).toBe("refunded");
    await f.service.receive(f.event("evt_pending", [refund("pending", "re_three")]));
    await f.service.receive(f.event("evt_failed_two", [refund("failed", "pyr_two", 300)]));
    expect(f.order().status).toBe("suspended");
  });
  it("dispute remains an independent hold with zero refund money", async () => {
    const f = fixture(); await f.service.receive(f.event("evt_dispute", [refund("succeeded")], { disputeObserved: true }));
    await f.service.receive(f.event("evt_failed", [refund("failed")]));
    expect(f.facts().disputeObserved).toBe(true); expect(effectiveRefundJPY(f.facts())).toBe(0);
    expect(f.order().disputeHold).toBe(true); expect((await f.service.status("alice")).entitled).toBe(false);
  });
  it("refund correction after expiry never creates another thirty days", async () => {
    const f = fixture(); await f.service.receive(f.event("evt_refund", [refund("succeeded")]));
    f.setTime("2026-11-24T00:00:00Z"); await f.service.receive(f.event("evt_failed", [refund("failed")]));
    expect((await f.service.status("alice", f.p.id)).purchase?.status).toBe("expired");
    expect((await f.service.grant("alice", "question")).kind).toBe("trial");
  });
  it("old revoked records get verified finance backfill but no fabricated activation or dispute clearance", async () => {
    const f = fixture(); f.p.status = "refunded";
    f.store.events.set("stripe-test:evt_legacy", { digest: "evt_legacy", orderId: f.p.id });
    expect(await f.service.receive(f.event("evt_legacy", [refund("failed")]))).toBe("duplicate");
    expect(f.facts().confirmedGrossJPY).toBe(980); expect(f.order().activatedAt).toBeNull();
    expect(f.order().legacyRevocationUnresolved).toBe(true); expect(f.order().status).toBe("refunded");
  });
  it("JSONB object-key reordering does not create a new financial revision", async () => {
    const f = fixture(); await f.service.receive(f.event("evt_one", [refund("succeeded")]));
    const reverse = (v: unknown): unknown => Array.isArray(v) ? v.map(reverse) : v && typeof v === "object"
      ? Object.fromEntries(Object.entries(v).reverse().map(([k, value]) => [k, reverse(value)])) : v;
    f.store.finances.set(f.p.id, reverse(f.facts()) as ReturnType<typeof f.facts>);
    await f.service.receive(f.event("evt_two", [refund("succeeded")]));
    expect(f.facts().revision).toBe("1");
  });
  it("verified duplicate reconciliation can correct facts without duplicating its event or deadline", async () => {
    const f = fixture(); await f.service.receive(f.event("evt_one", [refund("succeeded")]));
    expect(await f.service.receive(f.event("evt_one", [refund("failed")]))).toBe("duplicate");
    expect(f.store.events.size).toBe(1); expect(f.facts().revision).toBe("2"); expect(effectiveRefundJPY(f.facts())).toBe(0);
  });
  it.each(["failFinance", "failEvent"] as const)("%s rolls back purchase, facts and receipt, then retries", async failure => {
    const f = fixture(); f.store[failure] = true;
    await expect(f.service.receive(f.event("evt_one", [refund("succeeded")]))).rejects.toThrow();
    expect(f.order().status).toBe("pending"); expect(f.store.finances.size).toBe(0); expect(f.store.events.size).toBe(0);
    f.store[failure] = false; await f.service.receive(f.event("evt_one", [refund("succeeded")]));
    expect(f.store.finances.size).toBe(1); expect(f.store.events.size).toBe(1);
  });
  it("cannot claim another order's payment or refund identity", async () => {
    const f = fixture(); await f.service.receive(f.event("evt_one", [refund("succeeded")]));
    const bob: Purchase = { ...f.p, id: "bob-order", userId: "bob", sessionId: "cs_test_bob" };
    f.store.purchases.set(bob.id, bob);
    const event = { ...f.event("evt_bob", [refund("succeeded")]), orderId: bob.id, userId: "bob", sessionId: bob.sessionId };
    await expect(f.service.receive(event)).rejects.toThrow();
    await expect(f.service.receive({ ...event, paymentId: "pi_bob" })).rejects.toThrow();
    expect(f.store.finances.size).toBe(1); expect(f.store.purchases.get(bob.id)?.status).toBe("pending");
  });
  it("rejects noninteger/overflow refund money and success sums above confirmed gross", async () => {
    for (const amount of [0, -1, 0.1, 2147483648, 981]) {
      const f = fixture(); await expect(f.service.receive(f.event("evt_bad", [refund("succeeded", "re_bad", amount)]))).rejects.toThrow();
      expect(f.store.finances.size).toBe(0); expect(f.store.events.size).toBe(0);
    }
  });
  it("rejects owner/realm/amount/currency/source tampering, partial lists, and changed refund amounts atomically", async () => {
    const f = fixture(); const e = f.event("evt_one");
    for (const patch of [{ userId: "bob" }, { mode: "stripe-live" as const }, { currency: "usd" }, { amount: 1 },
      { finance: { ...e.finance!, grossJPY: 1 } }, { finance: { ...e.finance!, refundsComplete: false as true } }]) {
      await expect(f.service.receive({ ...e, ...patch })).rejects.toThrow();
      expect(f.store.finances.size).toBe(0);
    }
    await f.service.receive(f.event("evt_ok", [refund("succeeded")]));
    await expect(f.service.receive(f.event("evt_conflict", [refund("succeeded", "re_one", 101)]))).rejects.toThrow();
    f.config.sourceInstance = "renamed"; await expect(f.service.receive(f.event("evt_rename"))).rejects.toThrow();
    expect(f.store.events.size).toBe(1);
  });
});
