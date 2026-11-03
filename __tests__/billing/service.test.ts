import { describe, it, expect } from "vitest";
import { billingConfig, checkoutReady, gateReady, termsHash, type BillingConfig } from "@/lib/billing/config";
import { BillingService } from "@/lib/billing/service";
import type { PaymentSnapshot, Purchase } from "@/lib/billing/domain";
import { MemoryStore } from "./memory-store";
export function config(): BillingConfig { return { mode: "mock", origin: "http://localhost:3328", priceYen: 980, days: 30, freeDaily: 10,
  termsVersion: "test", transitionStartsAt: "2026-01-01T00:00:00.000Z", transitionDays: 90, noticeAt: "2025-12-01T00:00:00.000Z", legalReviewed: true,
  seller: { name: "TEST ONLY", address: "TEST ONLY", phone: "TEST ONLY", support: "test@example.invalid", refund: "TEST ONLY refund policy" } }; }
export function fixture() {
  const store = new MemoryStore(); const c = config(); let time = new Date("2026-10-25T00:00:00Z");
  const service = new BillingService(store, c, () => time);
  const provider = { create: async (p: Purchase) => ({ id: `cs_${p.id}`, url: `http://localhost:3328/billing/mock?order=${p.id}` }) };
  const buy = (user = "alice") => service.checkout(user, termsHash(c), provider);
  const snapshot = (id: string, state: PaymentSnapshot["state"] = "paid", event = "evt_1"): PaymentSnapshot => {
    const p = store.purchases.get(id)!;
    return { eventId: event, digest: event, orderId: id, userId: p.userId, mode: "mock", sessionId: p.sessionId, paymentId: `pi_${id}`,
      amount: 980, currency: "jpy", termsHash: p.termsHash, state };
  };
  return { store, c, service, buy, snapshot, provider, setTime: (s: string) => { time = new Date(s); } };
}
describe("test-only configuration and launch locks", () => {
  it("defaults off and blocks live/production even with test flags", () => {
    expect(billingConfig({}).mode).toBe("off");
    expect(billingConfig({ BILLING_MODE: "live" }).mode).toBe("off");
    expect(billingConfig({ BILLING_MODE: "mock", NODE_ENV: "production" }).mode).toBe("off");
    expect(billingConfig({ BILLING_MODE: "stripe-test", VERCEL: "1" }).mode).toBe("off");
    expect(gateReady(billingConfig({ BILLING_MODE: "off", BILLING_ORIGIN: "invalid", BILLING_PRICE_YEN: "bad", BILLING_TRANSITION_STARTS_AT: "bad" }))).toBe(false);
  });
  it("requires notice, explicit effective date, legal review and full seller details", () => {
    const c = config(); expect(checkoutReady(c)).toBe(true);
    for (const key of Object.keys(c.seller) as (keyof typeof c.seller)[]) expect(checkoutReady({ ...c, seller: { ...c.seller, [key]: "" } })).toBe(false);
    expect(gateReady({ ...c, noticeAt: null })).toBe(false);
    expect(gateReady({ ...c, legalReviewed: false })).toBe(false);
    expect(gateReady({ ...c, transitionStartsAt: null })).toBe(false);
    expect(gateReady({ ...c, transitionStartsAt: "2099-01-01T00:00:00.000Z" })).toBe(false);
  });
});
describe("orders and server identity", () => {
  it("does not trust another user's order or a missing DB identity", async () => {
    const f = fixture(); const p = await f.buy();
    await expect(f.service.status("bob", p.orderId)).rejects.toMatchObject({ status: 404 });
    await expect(f.buy("missing")).rejects.toMatchObject({ status: 401 });
    expect((await f.service.status("alice")).entitled).toBe(false);
  });
  it("requires exact current terms; reuses pending order across concurrent tabs", async () => {
    const f = fixture();
    await expect(f.service.checkout("alice", "old", f.provider)).rejects.toMatchObject({ code: "terms_changed" });
    const results = await Promise.all(Array.from({ length: 8 }, () => f.buy()));
    expect(new Set(results.map(r => r.orderId)).size).toBe(1); expect(f.store.purchases.size).toBe(1);
  });
  it("provider timeout persists pending for safe retry and blocks stale uncertain orders", async () => {
    const f = fixture();
    await expect(f.service.checkout("alice", termsHash(f.c), { create: async () => { throw new Error("timeout"); } })).rejects.toThrow();
    const id = [...f.store.purchases.keys()][0]; expect((await f.buy()).orderId).toBe(id);
    f.setTime("2026-10-26T00:00:00Z"); await expect(f.buy()).rejects.toMatchObject({ code: "pending_purchase_contact_support" });
  });
  it("active and transition users cannot buy an unnecessary pass", async () => {
    const f = fixture(); const p = await f.buy(); await f.service.receive(f.snapshot(p.orderId));
    await expect(f.buy()).rejects.toMatchObject({ code: "pass_already_active" });
    f.c.transitionStartsAt = "2026-10-02T00:00:00.000Z";
    await expect(f.buy("bob")).rejects.toMatchObject({ code: "transition_no_purchase_needed" });
  });
});
describe("durable events, expiry and refunds", () => {
  it("early pending/canceled refund before session binding recovers on later confirmed payment", async () => {
    const f = fixture();
    const p = await f.service.checkout("alice", termsHash(f.c), { create: async order => {
      await f.service.receive({ ...f.snapshot(order.id, "suspended", "early_pending"), refund: { id: "re_early", state: "pending" } });
      await f.service.receive({ ...f.snapshot(order.id, "pending", "early_canceled"), refund: { id: "re_early", state: "canceled" } });
      return f.provider.create(order);
    } });
    await f.service.receive(f.snapshot(p.orderId, "paid", "later_paid"));
    expect((await f.service.status("alice")).entitled).toBe(true);
  });
  it("pending refund suspends; stale paid cannot reopen; canceled refund restores original deadline", async () => {
    const f = fixture(); const p = await f.buy(); await f.service.receive(f.snapshot(p.orderId));
    const until = (await f.service.status("alice")).expiresAt;
    await f.service.receive({ ...f.snapshot(p.orderId, "suspended", "evt_pending"), refund: { id: "re_1", state: "pending" } });
    await expect(f.buy()).rejects.toMatchObject({ code: "refund_pending_contact_support" });
    await f.service.receive(f.snapshot(p.orderId, "paid", "evt_stale_paid"));
    expect((await f.service.status("alice")).entitled).toBe(false);
    f.setTime("2026-10-26T00:00:00Z");
    await f.service.receive({ ...f.snapshot(p.orderId, "paid", "evt_canceled_refund"), refund: { id: "re_1", state: "canceled" } });
    expect((await f.service.status("alice")).expiresAt).toBe(until);
    expect((await f.service.status("alice")).entitled).toBe(true);
    await f.service.receive({ ...f.snapshot(p.orderId, "suspended", "evt_stale_pending"), refund: { id: "re_1", state: "pending" } });
    expect((await f.service.status("alice")).entitled).toBe(true);
  });
  it("clearing one refund cannot clear another pending refund", async () => {
    const f = fixture(); const p = await f.buy(); await f.service.receive(f.snapshot(p.orderId));
    for (const id of ["re_a", "re_b"]) await f.service.receive({ ...f.snapshot(p.orderId, "suspended", id), refund: { id, state: "pending" } });
    await f.service.receive({ ...f.snapshot(p.orderId, "paid", "re_a_failed"), refund: { id: "re_a", state: "failed" } });
    expect((await f.service.status("alice")).entitled).toBe(false);
    await f.service.receive({ ...f.snapshot(p.orderId, "paid", "re_b_canceled"), refund: { id: "re_b", state: "canceled" } });
    expect((await f.service.status("alice")).entitled).toBe(true);
  });
  it("duplicate event and distinct events for one payment never extend the pass", async () => {
    const f = fixture(); const p = await f.buy(); const event = f.snapshot(p.orderId);
    await Promise.all(Array.from({ length: 5 }, () => f.service.receive(event)));
    const until = (await f.service.status("alice")).expiresAt;
    f.setTime("2026-10-27T00:00:00Z"); await f.service.receive({ ...event, eventId: "evt_2", digest: "evt_2" });
    expect((await f.service.status("alice")).expiresAt).toBe(until); expect(f.store.events.size).toBe(2);
  });
  it.each([["refunded", "paid"], ["paid", "refunded"], ["refunded", "failed"], ["paid", "failed"]] as const)("same-second/out-of-order %s then %s", async (first, second) => {
    const f = fixture(); const p = await f.buy();
    await f.service.receive(f.snapshot(p.orderId, first)); await f.service.receive(f.snapshot(p.orderId, second, "evt_2"));
    expect((await f.service.status("alice")).entitled).toBe(![first, second].includes("refunded") && first === "paid");
  });
  it("refund before checkout response binding remains terminal", async () => {
    const f = fixture();
    const provider = { create: async (p: Purchase) => {
      await f.service.receive({ ...f.snapshot(p.id, "refunded"), sessionId: null });
      return f.provider.create(p);
    } };
    const p = await f.service.checkout("alice", termsHash(f.c), provider);
    await f.service.receive(f.snapshot(p.orderId, "paid", "evt_2"));
    expect((await f.service.status("alice", p.orderId)).purchase?.status).toBe("refunded");
  });
  it("expires at exact server deadline and delayed receipt gets the full duration", async () => {
    const f = fixture(); const p = await f.buy(); f.setTime("2026-10-28T10:00:00Z"); await f.service.receive(f.snapshot(p.orderId));
    expect((await f.service.status("alice")).expiresAt).toBe("2026-11-27T10:00:00.000Z");
    f.setTime("2026-11-27T09:59:59.999Z"); expect((await f.service.status("alice")).entitled).toBe(true);
    f.setTime("2026-11-27T10:00:00Z"); expect((await f.service.status("alice", p.orderId)).purchase?.status).toBe("expired");
    expect((await f.service.grant("alice", "q1")).kind).toBe("trial");
  });
  it("rejects amount, mode, owner and session mismatches atomically", async () => {
    const f = fixture(); const p = await f.buy(); const event = f.snapshot(p.orderId);
    for (const patch of [{ amount: 1 }, { currency: "usd" }, { userId: "bob" }, { mode: "stripe-test" as const }, { sessionId: "other" }, { termsHash: "other" }]) await expect(f.service.receive({ ...event, ...patch })).rejects.toThrow();
    expect(f.store.events.size).toBe(0); expect((await f.service.status("alice")).entitled).toBe(false);
  });
  it("DB failure does not acknowledge, consumes nothing and retry succeeds", async () => {
    const f = fixture(); const p = await f.buy(); const event = f.snapshot(p.orderId);
    f.store.fail = true; await expect(f.service.receive(event)).rejects.toThrow(); await expect(f.service.grant("alice", "q1")).rejects.toThrow();
    expect(f.store.events.size).toBe(0); expect(f.store.grants.size).toBe(0);
    f.store.fail = false; await f.service.receive(event); expect((await f.service.status("alice")).entitled).toBe(true);
  });
  it("enforces payment uniqueness across owners and detects event ID conflicts", async () => {
    const f = fixture(); const a = await f.buy(); const b = await f.buy("bob");
    const e = f.snapshot(a.orderId); await f.service.receive(e);
    await expect(f.service.receive({ ...f.snapshot(b.orderId, "paid", "evt_2"), paymentId: e.paymentId })).rejects.toThrow();
    await expect(f.service.receive({ ...e, digest: "altered" })).rejects.toMatchObject({ code: "event_conflict" });
    expect((await f.service.status("bob")).entitled).toBe(false);
  });
});
describe("quota", () => {
  it("multiple tabs get exactly ten unique starts; refresh/back/double-click are idempotent", async () => {
    const f = fixture(); const results = await Promise.allSettled(Array.from({ length: 30 }, (_, n) => f.service.grant("alice", `q${n}`)));
    expect(results.filter(r => r.status === "fulfilled")).toHaveLength(10);
    expect(await f.service.grant("alice", "q0")).toEqual({ kind: "trial", remaining: 0 });
    const duplicate = await Promise.all(Array.from({ length: 8 }, () => f.service.grant("bob", "q0")));
    expect(duplicate.every(r => r.remaining === 9)).toBe(true);
  });
  it("uses JST day at server time, independent of client", async () => {
    const f = fixture(); f.setTime("2026-10-25T14:59:59.999Z"); await f.service.grant("alice", "q");
    f.setTime("2026-10-25T15:00:00.000Z"); expect((await f.service.grant("alice", "q")).remaining).toBe(9);
    expect([...f.store.grants.keys()]).toEqual(["alice:mock:2026-10-25", "alice:mock:2026-10-26"]);
  });
  it("paid/grace usage consumes no trial; grace has a fixed advertised end", async () => {
    const f = fixture(); f.c.transitionStartsAt = "2026-10-02T00:00:00.000Z";
    expect((await f.service.grant("alice", "q")).kind).toBe("pass"); expect(f.store.grants.size).toBe(0);
    f.setTime("2026-12-31T00:00:00.000Z"); expect((await f.service.grant("alice", "q")).kind).toBe("trial");
  });
});
