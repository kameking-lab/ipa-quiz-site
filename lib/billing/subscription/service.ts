import "server-only";
import { createHash, randomUUID } from "node:crypto";
import { BillingError, jstDay } from "../domain";
import { refundState } from "../finance";
import { terminal, type Account, type MonthlyConfig, type MonthlyProvider, type MonthlyStore, type Invoice } from "./domain";

export function monthlyTerms(c: MonthlyConfig) {
  return createHash("sha256").update(JSON.stringify({ version: c.termsVersion, price: c.priceYen, priceId: c.priceId,
    freeDaily: c.freeDaily, interval: "month", autoRenew: true, cancel: "period-end", unpaidGraceDays: 0,
    refund: "partial-preserves-access;full-invoice-only;cancel-separate-v2", seller: c.seller })).digest("hex");
}
function problem(code: string): never { throw new BillingError(code, 503); }
const within = (start: number, end: number, now: number) => start <= now && now < end;
function disputeHold(a: Account, subscriptionId?: string) {
  return Object.values(a.invoices).filter(i => !subscriptionId || i.subscriptionId === subscriptionId).some(i =>
    i.payments.some(p => Object.values(a.payments[p.paymentId]?.disputes ?? {}).some(d => d !== "won")));
}
export function fullyRefunded(a: Account, invoice: Invoice) {
  return invoice.paid && invoice.amount > 0 && invoice.payments.length > 0
    && invoice.payments.reduce((sum, p) => sum + p.amount, 0) === invoice.amount
    && invoice.payments.every(p => {
      const facts = a.payments[p.paymentId];
      return p.amount > 0 && facts && facts.amount > 0
        && Object.values(facts.refunds).reduce((sum, r) => sum + (r.state === "succeeded" ? r.amount : 0), 0) === facts.amount;
    });
}
function assertPolicyReady(a: Account) {
  // The old implementation persisted refund/dispute flags without their cause. Never
  // silently clear them or replay an old refund cancellation under the new policy.
  if (Object.values(a.contracts).some(s => s.renewalBlocked && s.renewalBlockReason !== "dispute")
    || Object.entries(a.renewalStopJobs).some(([id, job]) => job.reason !== "dispute"
      || !a.contracts[id]?.renewalBlocked || a.contracts[id]?.renewalBlockReason !== "dispute")) problem("billing_policy_review_required");
}
function held(a: Account, invoice: Invoice) {
  return invoice.payments.some(p => {
    const facts = a.payments[p.paymentId];
    return !facts
      || Object.values(facts.disputes).some(d => d !== "won");
  });
}
export function access(a: Account, now: number) {
  assertPolicyReady(a);
  return Object.values(a.invoices).filter(i => {
    const sub = a.contracts[i.subscriptionId];
    return sub && ["active", "past_due"].includes(sub.status) && i.paid && !held(a, i) && !fullyRefunded(a, i) && !disputeHold(a, sub.id)
      && within(i.periodStart, i.periodEnd, now);
  }).sort((a, b) => b.periodEnd - a.periodEnd)[0] ?? null;
}
/** No legacy-account grace. Existing Auth and history records are neither deleted nor rewritten. */
export class MonthlyService {
  constructor(private store: MonthlyStore, readonly config: MonthlyConfig, private clock = () => new Date()) {}
  private tx<T>(id: string, fn: (a: Account) => Promise<T>, readOnly = false) { return this.store.transaction(id, this.config.mode, this.config.sourceInstance, fn, readOnly); }
  async checkout(userId: string, terms: string, provider: MonthlyProvider) {
    if (!this.config.enabled) throw new BillingError("billing_unavailable", 503);
    if (terms !== monthlyTerms(this.config)) throw new BillingError("terms_changed");
    const reservation = await this.tx(userId, async a => {
      assertPolicyReady(a);
      if (disputeHold(a)) throw new BillingError("billing_review_required");
      if (Object.values(a.contracts).some(c => !terminal(c.status))) throw new BillingError("subscription_exists");
      const now = this.clock();
      let s = Object.values(a.signups).find(s => s.state === "pending");
      if (s && (now.getTime() - Date.parse(s.createdAt) >= 23 * 3600000 || s.terms !== terms)) throw new BillingError("pending_subscription_contact_support");
      if (!s) { s = { id: randomUUID(), createdAt: now.toISOString(), terms, amount: this.config.priceYen, priceId: this.config.priceId,
        state: "pending", sessionId: null, url: null, subscriptionId: null }; a.signups[s.id] = s; }
      if (!a.customer) a.customer = { attemptId: randomUUID(), createdAt: now.toISOString(), id: null };
      if (!a.customer.id && now.getTime() - Date.parse(a.customer.createdAt) >= 23 * 3600000) throw new BillingError("customer_creation_contact_support");
      return structuredClone({ signup: s, customer: a.customer });
    });
    const customerId = reservation.customer.id ?? await provider.customer(reservation.customer.attemptId);
    await this.tx(userId, async a => {
      if (a.customer?.attemptId !== reservation.customer.attemptId || a.customer.id && a.customer.id !== customerId) problem("customer_conflict");
      a.customer.id = customerId;
    });
    const result = reservation.signup.sessionId && reservation.signup.url
      ? { id: reservation.signup.sessionId, url: reservation.signup.url } : await provider.checkout(customerId, reservation.signup);
    return this.tx(userId, async a => {
      const current = a.signups[reservation.signup.id];
      if (!current || current.sessionId && current.sessionId !== result.id) problem("checkout_conflict");
      // Webhook may have attached the contract already. Never overwrite its state.
      current.sessionId = result.id; current.url = result.url;
      return { orderId: current.id, url: result.url };
    });
  }
  async portal(userId: string, provider: MonthlyProvider) {
    const customerId = await this.tx(userId, async a => a.customer?.id ?? null, true);
    if (!customerId) throw new BillingError("subscription_missing", 404);
    return { url: await provider.portal(customerId, this.config.portalConfigurationId) };
  }
  async receive(event: { id: string }, digest: string, provider: MonthlyProvider) {
    const target = await provider.resolve(event);
    if (!target) return "ignored";
    const userId = await this.store.owner(target.customerId, this.config.mode);
    // An affirmative absence of this customer in our identity store is unrelated.
    // Lookup failures still propagate; we never create an account from a refund.
    if (!userId && target.unallocatedRefund) return "ignored";
    if (!userId) problem("subscription_customer_missing");
    const result = await this.tx(userId, async a => {
      if (a.customer?.id !== target.customerId) problem("customer_conflict");
      assertPolicyReady(a);
      if (a.events[event.id]) {
        if (a.events[event.id] !== digest) throw new BillingError("event_conflict", 400);
        return "duplicate";
      }
      // Fetch AFTER the per-user DB lock. Concurrent handlers cannot commit pre-lock stale API snapshots.
      const observation = await provider.observe(target);
      for (const current of observation.contracts) {
        const signup = a.signups[current.signupId];
        if (!signup || current.sourceInstance !== a.sourceInstance || current.customerId !== a.customer.id
          || current.terms !== signup.terms || current.amount !== signup.amount || current.priceId !== signup.priceId
          || signup.subscriptionId && signup.subscriptionId !== current.id) problem("subscription_owner_mismatch");
        const old = a.contracts[current.id];
        if (old && (old.customerId !== current.customerId || old.signupId !== current.signupId)) problem("subscription_identity_conflict");
        // Cancellation is terminal. A late observation never resurrects an old contract.
        if (old && terminal(old.status) && !terminal(current.status)) problem("terminal_subscription_conflict");
        a.contracts[current.id] = { ...current, renewalBlocked: old?.renewalBlocked ?? false,
          ...(old?.renewalBlockReason ? { renewalBlockReason: old.renewalBlockReason } : {}) };
        signup.subscriptionId = current.id; signup.state = "attached";
      }
      const session = observation.session;
      if (session) {
        const s = a.signups[session.signupId];
        if (!s || session.customerId !== a.customer.id || s.terms !== session.terms || s.sessionId && s.sessionId !== session.id
          || session.subscriptionId && s.subscriptionId !== session.subscriptionId) problem("checkout_owner_mismatch");
        s.sessionId = session.id;
        if (session.state === "expired" && !session.subscriptionId && s.state === "pending") s.state = "expired";
      }
      for (const p of observation.payments) {
        if (p.customerId !== a.customer.id || !Number.isSafeInteger(p.amount) || p.amount < 1) problem("payment_owner_mismatch");
        const old = a.payments[p.id];
        if (old && (old.amount !== p.amount || old.customerId !== p.customerId)) problem("payment_identity_conflict");
        const refunds = { ...old?.refunds };
        for (const [refundId, r] of Object.entries(p.refunds)) {
          if (refundId !== r.id || !Number.isSafeInteger(r.amount) || r.amount < 1
            || !["pending", "succeeded", "failed", "canceled"].includes(r.state)) problem("invalid_refund_fact");
          if (Object.values(a.payments).some(other => other.id !== p.id && other.refunds[r.id])) problem("refund_identity_conflict");
          if (refunds[r.id] && refunds[r.id].amount !== r.amount) problem("refund_amount_conflict");
          refunds[r.id] = { ...r, state: refundState(refunds[r.id]?.state, r.state) };
        }
        if (Object.values(refunds).reduce((sum, r) => sum + (r.state === "succeeded" ? r.amount : 0), 0) > p.amount) problem("refund_overflow");
        const disputes = { ...old?.disputes };
        for (const [id, state] of Object.entries(p.disputes)) {
          // A stale open result must not undo a previously observed terminal dispute decision.
          if (!disputes[id] || disputes[id] === "open") disputes[id] = state;
          else if (state !== "open" && disputes[id] !== state) problem("dispute_conflict");
        }
        a.payments[p.id] = { ...p, refunds, disputes };
      }
      for (const invoice of observation.invoices) {
        const sub = a.contracts[invoice.subscriptionId];
        if (!sub || invoice.customerId !== a.customer.id || invoice.priceId !== sub.priceId || invoice.amount !== sub.amount
          || invoice.periodStart >= invoice.periodEnd) problem("invoice_owner_mismatch");
        const old = a.invoices[invoice.id];
        if (old && (old.subscriptionId !== invoice.subscriptionId || old.amount !== invoice.amount
          || old.periodStart !== invoice.periodStart || old.periodEnd !== invoice.periodEnd)) problem("invoice_identity_conflict");
        const canonical = (value: Invoice) => JSON.stringify([...value.payments].sort((a, b) => a.id.localeCompare(b.id)).map(p => [p.id, p.paymentId, p.amount]));
        if (old?.paid && invoice.paid && canonical(old) !== canonical(invoice)) problem("invoice_allocation_changed");
        if (invoice.paid && (invoice.payments.reduce((sum, p) => sum + p.amount, 0) !== invoice.amount
          || invoice.payments.some(p => !a.payments[p.paymentId]))) problem("invoice_payment_missing");
        // A later failure event cannot erase a previously verified paid invoice.
        a.invoices[invoice.id] = old?.paid && !invoice.paid ? old : invoice;
      }
      const allocations = new Set<string>(), totals = new Map<string, number>();
      for (const i of Object.values(a.invoices).filter(i => i.paid)) for (const allocation of i.payments) {
        if (allocations.has(allocation.id) || allocation.amount < 1) problem("invoice_allocation_conflict");
        allocations.add(allocation.id);
        totals.set(allocation.paymentId, (totals.get(allocation.paymentId) ?? 0) + allocation.amount);
      }
      for (const [paymentId, sum] of totals) if (!a.payments[paymentId] || sum > a.payments[paymentId].amount) problem("payment_allocation_overflow");
      for (const sub of Object.values(a.contracts)) {
        const invoices = Object.values(a.invoices).filter(i => i.subscriptionId === sub.id);
        const disputed = invoices.some(i => i.payments.some(p => Object.values(a.payments[p.paymentId]?.disputes ?? {}).some(d => d !== "won")));
        if (disputed) { sub.renewalBlocked = true; sub.renewalBlockReason = "dispute"; }
        if (sub.renewalBlocked && !terminal(sub.status) && !sub.cancelAtPeriodEnd) {
          a.renewalStopJobs[sub.id] ??= { token: event.id, reason: "dispute" };
        } else if (terminal(sub.status) || sub.cancelAtPeriodEnd) delete a.renewalStopJobs[sub.id];
      }
      a.events[event.id] = digest;
      return "processed";
    });
    // Dispute revocation is durable BEFORE the provider write. Refunds create no stop intent.
    await this.flushRenewalStops(userId, provider);
    return result;
  }
  async flushRenewalStops(userId: string, provider: MonthlyProvider) {
    const jobs = await this.tx(userId, async a => { assertPolicyReady(a); return structuredClone(a.renewalStopJobs); }, true);
    for (const [subId, job] of Object.entries(jobs)) {
      await provider.stopRenewal(subId, job.token);
      await this.tx(userId, async a => {
        if (a.renewalStopJobs[subId]?.token !== job.token) return;
        a.contracts[subId].cancelAtPeriodEnd = true;
        delete a.renewalStopJobs[subId];
      });
    }
    const pending = await this.tx(userId, async a => Object.keys(a.renewalStopJobs).length, true);
    if (pending) problem("renewal_stop_pending");
  }
  async status(userId: string, orderId?: string) {
    return this.tx(userId, async a => {
      if (orderId && !a.signups[orderId]) throw new BillingError("purchase_not_found", 404);
      const paid = access(a, this.clock().getTime() / 1000);
      const signup = orderId ? a.signups[orderId] : null;
      const sub = signup?.subscriptionId ? a.contracts[signup.subscriptionId] : Object.values(a.contracts).find(c => !terminal(c.status));
      const current = sub ? Object.values(a.invoices).filter(i => i.subscriptionId === sub.id && within(i.periodStart, i.periodEnd, this.clock().getTime() / 1000)) : [];
      const refunded = current.some(i => fullyRefunded(a, i));
      const suspended = !!sub && (disputeHold(a, sub.id) || current.some(i => held(a, i)));
      const purchaseStatus = signup?.state === "expired" ? "expired" : sub && paid?.subscriptionId === sub.id ? "paid"
        : refunded ? "refunded" : suspended ? "suspended" : sub && terminal(sub.status) ? "expired" : "pending";
      return { billingModel: "subscription" as const, entitled: !!paid, transition: false, expiresAt: paid ? new Date(paid.periodEnd * 1000).toISOString() : null,
        subscription: sub ? { status: sub.status, cancelAtPeriodEnd: sub.cancelAtPeriodEnd, renewalBlocked: sub.renewalBlocked,
          periodEnd: new Date(sub.periodEnd * 1000).toISOString() } : null, canManage: !!a.customer?.id,
        purchase: signup ? { id: signup.id, status: purchaseStatus,
          expiresAt: paid && sub && paid.subscriptionId === sub.id ? new Date(paid.periodEnd * 1000).toISOString() : null, amount: signup.amount } : null };
    }, true);
  }
  async grant(userId: string, questionId: string, snapshots: ReadonlyArray<{ day: string; ids: string[] }> = [], allowNew = true, requestDay?: string) {
    const result = await this.tx(userId, async a => {
      const now = this.clock();
      if (access(a, now.getTime() / 1000)) return { kind: "pass" as const, remaining: null };
      for (const snapshot of snapshots) a.grants[snapshot.day] = [...new Set([...(a.grants[snapshot.day] ?? []), ...snapshot.ids])];
      const day = requestDay ?? jstDay(now), grants = a.grants[day] ?? [];
      if (grants.includes(questionId)) return { kind: "trial" as const, remaining: allowNew ? Math.max(0, this.config.freeDaily - grants.length) : null };
      if (!allowNew) return { kind: "unavailable" as const, remaining: null };
      if (grants.length >= this.config.freeDaily) return { kind: "limit" as const, remaining: 0 };
      a.grants[day] = [...grants, questionId];
      return { kind: "trial" as const, remaining: Math.max(0, this.config.freeDaily - a.grants[day].length) };
    });
    if (result.kind === "limit") throw new BillingError("daily_limit", 429);
    if (result.kind === "unavailable") throw new BillingError("billing_unavailable", 503);
    return result;
  }
}
