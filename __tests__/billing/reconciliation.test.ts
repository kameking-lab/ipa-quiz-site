import { describe, expect, it } from "vitest";
import { billingConfig, billingWebhookConfig, checkoutReady, termsHash } from "@/lib/billing/config";
import { unknownSuccessTime } from "@/lib/billing/finance";
import { BillingService } from "@/lib/billing/service";
import type { PaymentSnapshot, Purchase } from "@/lib/billing/domain";
import { MemoryStore } from "./memory-store";
import { liveEnv } from "./live-fixture";
describe("existing live orders reconcile independently of selling activation", () => {
  it.each([{ BILLING_MODE: "off" }, { BILLING_LIVE_ACTIVATION: "" }, { BILLING_STRIPE_LIVE_PRICE_ID: "" }, { BILLING_NOTICE_AT: "bad" }, { BILLING_TRANSITION_STARTS_AT: "2099-01-01T00:00:00.000Z" }])("receives paid then refund while sales paused: %j", async patch => {
    const env = { ...liveEnv(), BILLING_WEBHOOK_MODE: "stripe-live", ...patch };
    expect(checkoutReady(billingConfig(env))).toBe(false);
    const c = billingWebhookConfig(env); expect(c.mode).toBe("stripe-live"); expect(checkoutReady(c)).toBe(false);
    const store = new MemoryStore();
    const purchase: Purchase = { id: "stored-order", userId: "alice", mode: "stripe-live", createdAt: "2026-10-25T00:00:00Z", amount: 980, days: 30, termsHash: termsHash(billingConfig(liveEnv())), status: "pending", sessionId: "cs_live_fixture", checkoutUrl: null, paymentId: null, activatedAt: null, expiresAt: null };
    store.purchases.set(purchase.id, purchase);
    const service = new BillingService(store, c);
    const snapshot: PaymentSnapshot = { eventId: "evt_paid", digest: "paid", orderId: purchase.id, userId: "alice", mode: "stripe-live", sessionId: purchase.sessionId, paymentId: "pi_live", amount: 980, currency: "jpy", termsHash: purchase.termsHash, state: "paid", finance: { eventType: "checkout.session.completed", currency: "jpy", grossJPY: 980, paidTime: unknownSuccessTime(), refunds: [], refundsComplete: true, disputeObserved: false } };
    await service.receive(snapshot); expect((await service.status("alice")).entitled).toBe(true);
    await service.receive({ ...snapshot, eventId: "evt_refund", digest: "refund", state: "refunded", finance: { ...snapshot.finance!, eventType: "refund.updated", refunds: [{ refundId: "re_one", amountJPY: 980, state: "succeeded", successTime: unknownSuccessTime() }] } });
    expect((await service.status("alice")).entitled).toBe(false); expect(store.events.size).toBe(2);
    await expect(service.receive({ ...snapshot, eventId: "unknown", orderId: "not-stored" })).rejects.toThrow();
    await expect(service.checkout("alice", termsHash(c), { create: async () => { throw new Error("must not call"); } })).rejects.toMatchObject({ code: "seller_details_missing" });
  });
});
