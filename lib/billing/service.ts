import "server-only";
import { randomUUID } from "node:crypto";
import { active, BillingError, jstDay, type BillingStore, type CheckoutProvider, type PaymentSnapshot } from "./domain";
import { checkoutReady, termsHash, transitionEnd, type BillingConfig } from "./config";
import { mergeFinance, refundState } from "./finance";

export class BillingService {
  constructor(private store: BillingStore, readonly config: BillingConfig, private clock = () => new Date()) {}
  private mode() { if (this.config.mode === "off") throw new BillingError("billing_disabled", 503); return this.config.mode; }
  private grace(createdAt: string) {
    const start = this.config.transitionStartsAt ? Date.parse(this.config.transitionStartsAt) : NaN;
    return Date.parse(createdAt) < start && this.clock().getTime() >= start
      && this.clock().getTime() < Date.parse(transitionEnd(this.config) ?? "");
  }

  async checkout(userId: string, acceptedTerms: string, provider: CheckoutProvider) {
    const mode = this.mode();
    if (!checkoutReady(this.config)) throw new BillingError("seller_details_missing", 503);
    if (acceptedTerms !== termsHash(this.config)) throw new BillingError("terms_changed", 409);
    const purchase = await this.store.transaction(userId, mode, async tx => {
      const user = await tx.user();
      if (!user) throw new BillingError("sign_in_required", 401);
      if (this.grace(user.createdAt)) throw new BillingError("transition_no_purchase_needed");
      const now = this.clock();
      const orders = await tx.purchases();
      if (orders.some(p => active(p, now))) throw new BillingError("pass_already_active");
      if (orders.some(p => p.status === "suspended")) throw new BillingError("refund_pending_contact_support");
      const pending = orders.find(p => p.status === "pending");
      if (pending) {
        // Never create a second payment after a provider timeout or an expired idempotency window.
        if (now.getTime() - Date.parse(pending.createdAt) > 23 * 3600000) throw new BillingError("pending_purchase_contact_support");
        if (pending.termsHash !== acceptedTerms) throw new BillingError("pending_purchase_terms_changed");
        return pending;
      }
      const p = { id: randomUUID(), userId, mode, createdAt: now.toISOString(), amount: this.config.priceYen,
        days: this.config.days, termsHash: acceptedTerms, status: "pending" as const,
        sessionId: null, checkoutUrl: null, paymentId: null, activatedAt: null, expiresAt: null };
      await tx.save(p);
      return p;
    });
    const checkout = purchase.sessionId && purchase.checkoutUrl ? { id: purchase.sessionId, url: purchase.checkoutUrl }
      : await provider.create(purchase); // provider idempotency key is the durable order ID
    return this.store.transaction(userId, mode, async tx => {
      const current = (await tx.purchases()).find(p => p.id === purchase.id);
      if (!current) throw new BillingError("purchase_missing");
      if (current.sessionId && current.sessionId !== checkout.id) throw new BillingError("session_mismatch");
      // A webhook may already have completed the order. Never overwrite its state with a stale snapshot.
      await tx.save({ ...current, sessionId: checkout.id, checkoutUrl: checkout.url });
      return { orderId: current.id, url: checkout.url };
    });
  }

  async receive(s: PaymentSnapshot) {
    const mode = this.mode();
    if (s.mode !== mode) throw new BillingError("mode_mismatch", 400);
    return this.store.transaction(s.userId, mode, async tx => {
      const previous = await tx.event(s.eventId);
      if (previous) {
        if (previous.digest !== s.digest || previous.orderId !== s.orderId) throw new BillingError("event_conflict", 400);
      }
      const p = (await tx.purchases()).find(p => p.id === s.orderId);
      if (!p || p.userId !== s.userId || p.mode !== mode) throw new BillingError("purchase_missing", 503);
      if (p.amount !== s.amount || s.currency !== "jpy" || p.termsHash !== s.termsHash
        || (p.sessionId && s.sessionId && p.sessionId !== s.sessionId)
        || (p.paymentId && s.paymentId && p.paymentId !== s.paymentId)) throw new BillingError("payment_mismatch", 400);
      if (s.state === "paid" && (!s.paymentId || (!s.sessionId && !s.finance))) throw new BillingError("incomplete_payment", 400);
      if (mode !== "mock" && ["paid", "refunded", "suspended"].includes(s.state) && !s.finance) throw new BillingError("finance_observation_missing", 503);
      if (s.finance) {
        const oldFacts = await tx.finance(p.id);
        const facts = mergeFinance(oldFacts, p, s, this.config.sourceInstance ?? "", this.clock());
        const refunds = { ...p.refunds };
        for (const r of facts.refunds) refunds[r.refundId] = refundState(refunds[r.refundId], r.state);
        // A final49 revocation has no trustworthy reason. A backfill must not silently clear a possible dispute.
        const legacyRevocationUnresolved = p.legacyRevocationUnresolved || (!oldFacts && p.status === "refunded");
        const updated = { ...p, sessionId: p.sessionId ?? s.sessionId, paymentId: p.paymentId ?? s.paymentId, refunds,
          disputeHold: p.disputeHold || facts.disputeObserved, legacyRevocationUnresolved };
        // Start the deadline at first persisted payment confirmation, including refund-first delivery.
        // Never invent a fresh period for an old revoked order with unknown original activation.
        if (!p.activatedAt && !legacyRevocationUnresolved && p.status !== "suspended") {
          const now = this.clock();
          updated.activatedAt = now.toISOString();
          updated.expiresAt = p.expiresAt ?? new Date(now.getTime() + p.days * 86400000).toISOString();
        }
        if (updated.disputeHold || legacyRevocationUnresolved || Object.values(refunds).includes("succeeded")) updated.status = "refunded";
        else if (Object.values(refunds).includes("pending") || !updated.activatedAt || !updated.expiresAt) updated.status = "suspended";
        else updated.status = "paid"; // active() still enforces the original deadline, including expiry while suspended.
        await tx.save(updated);
        await tx.saveFinance(facts);
        if (!previous) await tx.recordEvent(s.eventId, s.digest, s.orderId);
        return previous ? "duplicate" : "processed";
      }
      if (previous) return "duplicate";
      // Synthetic mock events have no provider facts. Keep their conservative original behavior.
      const updated = { ...p, sessionId: p.sessionId ?? s.sessionId, paymentId: p.paymentId ?? s.paymentId };
      const refunds = { ...p.refunds };
      if (s.state === "suspended" && !s.refund) throw new BillingError("missing_refund_identity", 400);
      if (s.refund) {
        const previousRefund = refunds[s.refund.id];
        // Terminal per-refund facts dominate an older pending snapshot, even across concurrent provider reads.
        if (!previousRefund || previousRefund === "pending" || s.refund.state === "succeeded") refunds[s.refund.id] = s.refund.state;
        updated.refunds = refunds;
      }
      const pendingRefund = Object.values(refunds).includes("pending");
      const cleared = !pendingRefund && Object.values(refunds).some(state => state === "failed" || state === "canceled");
      // Refund is terminal (including partial refund); arrival order / second-precision timestamps are irrelevant.
      if (s.state === "refunded") updated.status = "refunded";
      else if (p.status !== "refunded") {
        if (pendingRefund) updated.status = "suspended";
        else if (s.state === "paid" && p.status !== "paid" && (p.status !== "suspended" || cleared)) {
          const now = this.clock();
          updated.status = "paid";
          updated.activatedAt = p.activatedAt ?? now.toISOString();
          updated.expiresAt = p.expiresAt ?? new Date(now.getTime() + p.days * 86400000).toISOString();
        } else if (p.status === "pending" && (s.state === "failed" || s.state === "expired")) updated.status = s.state;
      }
      await tx.save(updated); // unique payment/session IDs prevent a second purchase from claiming the same money
      await tx.recordEvent(s.eventId, s.digest, s.orderId);
      return "processed";
    });
  }

  async status(userId: string, orderId?: string) {
    return this.store.transaction(userId, this.mode(), async tx => {
      const user = await tx.user();
      if (!user) throw new BillingError("sign_in_required", 401);
      const purchases = await tx.purchases();
      const purchase = orderId ? purchases.find(p => p.id === orderId) : undefined;
      if (orderId && !purchase) throw new BillingError("purchase_not_found", 404);
      const pass = purchases.find(p => active(p, this.clock()));
      return { entitled: this.grace(user.createdAt) || !!pass, transition: this.grace(user.createdAt),
        expiresAt: pass?.expiresAt ?? null,
        purchase: purchase ? { id: purchase.id, status: purchase.status === "paid" && !active(purchase, this.clock()) ? "expired" : purchase.status,
          expiresAt: purchase.expiresAt, amount: purchase.amount } : null };
    });
  }

  /** Merge immutable guest snapshots and commit them before returning a limit result. */
  async grant(userId: string, questionId: string, snapshots: ReadonlyArray<{ day: string; ids: string[] }> = [], allowNew = true, requestDay?: string) {
    const result = await this.store.transaction(userId, this.mode(), async tx => {
      const user = await tx.user();
      if (!user) throw new BillingError("sign_in_required", 401);
      const now = this.clock();
      if (this.grace(user.createdAt) || (await tx.purchases()).some(p => active(p, now))) return { kind: "pass" as const, remaining: null };
      for (const snapshot of snapshots) {
        const existing = new Set(await tx.grants(snapshot.day));
        for (const id of snapshot.ids) if (!existing.has(id)) { await tx.grant(snapshot.day, id); existing.add(id); }
      }
      const day = requestDay ?? jstDay(now);
      const grants = await tx.grants(day);
      if (grants.includes(questionId)) return { kind: "trial" as const, remaining: allowNew ? Math.max(0, this.config.freeDaily - grants.length) : null };
      if (!allowNew) return { kind: "unavailable" as const, remaining: null };
      if (grants.length >= this.config.freeDaily) return { kind: "limit" as const, remaining: 0 };
      await tx.grant(day, questionId);
      return { kind: "trial" as const, remaining: this.config.freeDaily - grants.length - 1 };
    });
    if (result.kind === "limit") throw new BillingError("daily_limit", 429);
    if (result.kind === "unavailable") throw new BillingError("billing_unavailable", 503);
    return result;
  }
}
