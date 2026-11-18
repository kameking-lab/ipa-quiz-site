import "server-only";
import { createHash, randomUUID } from "node:crypto";
import { BillingError, jstDay } from "../domain";
import { refundState } from "../finance";
import { terminal, type Account, type AppStorePurchaseState, type AppStoreRecovery, type MonthlyConfig, type MonthlyProvider, type MonthlyStore, type Invoice, type Observation, type Signup } from "./domain";

export function monthlyTerms(c: MonthlyConfig) {
  return createHash("sha256").update(JSON.stringify({ version: c.termsVersion, price: c.priceYen, priceId: c.priceId,
    freeDaily: c.freeDaily, interval: "month", autoRenew: true, cancel: "period-end", unpaidGraceDays: 0,
    refund: "partial-preserves-access;full-invoice-only;cancel-separate-v2", seller: c.seller,
    ...(c.trialDays > 0 ? { trialDays: c.trialDays, trial: "first-contract;card-required;cancel-before-end-no-charge" } : {}) })).digest("hex");
}
function problem(code: string): never { throw new BillingError(code, 503); }
const staleSignupMs = 23 * 3600000;
const purchasePreparationMs = 2 * 60000;
// Covers Apple's 24-hour Ask to Buy window after StoreKit is presented.
const appStorePurchaseMs = 25 * 3600000;
const within = (start: number, end: number, now: number) => start <= now && now < end;
const memberIds = (members: Account[]) => members.map(a => a.userId);
function assertSameMembers(ids: string[], members: Account[]) {
  if (ids.length !== members.length || members.some((a, i) => a.userId !== ids[i])) throw new BillingError("checkout_conflict");
}
async function checkMembers(ids: string[], check?: (id: string) => Promise<void>) {
  if (check) await Promise.all(ids.map(id => check(id)));
}
function activeReservation(a: Account, now: number) {
  return a.appStorePurchase && Date.parse(a.appStorePurchase.expiresAt) > now ? a.appStorePurchase : null;
}
const hasPendingSignup = (a: Account) => Object.values(a.signups).some(s => s.state === "pending");
function closeSignup(a: Account, orderId: string, sessionId: string | null) {
  const signup = a.signups[orderId];
  if (signup?.state !== "pending") return;
  if (signup.sessionId && signup.sessionId !== sessionId) throw new BillingError("checkout_conflict");
  signup.state = "expired";
  signup.sessionId = sessionId;
  delete signup.preparingUntil;
}
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
/** A trial grants access only inside the provider's trial period, never longer than the signup offered. */
function trialAccess(a: Account, now: number) {
  return Object.values(a.contracts).filter(sub => {
    const offered = a.signups[sub.signupId]?.trialDays ?? 0;
    return sub.status === "trialing" && offered > 0 && !sub.trialRevoked && !sub.renewalBlocked && !disputeHold(a, sub.id)
      && sub.periodEnd - sub.periodStart <= offered * 86400 + 3600 && within(sub.periodStart, sub.periodEnd, now);
  }).map(sub => ({ subscriptionId: sub.id, periodEnd: sub.periodEnd }))[0] ?? null;
}
export function access(a: Account, now: number): { subscriptionId: string; periodEnd: number } | null {
  assertPolicyReady(a);
  return Object.values(a.invoices).filter(i => {
    const sub = a.contracts[i.subscriptionId];
    return sub && ["active", "past_due"].includes(sub.status) && i.paid && !held(a, i) && !fullyRefunded(a, i) && !disputeHold(a, sub.id)
      && within(i.periodStart, i.periodEnd, now);
  }).sort((a, b) => b.periodEnd - a.periodEnd)[0] ?? trialAccess(a, now);
}
/** No legacy-account grace. Existing Auth and history records are neither deleted nor rewritten. */
export class MonthlyService {
  constructor(private store: MonthlyStore, readonly config: MonthlyConfig, private clock = () => new Date(), private afterReceive?: (userId: string) => Promise<void>) {}
  private tx<T>(id: string, fn: (a: Account) => Promise<T>, readOnly = false) { return this.store.transaction(id, this.config.mode, this.config.sourceInstance, fn, readOnly); }
  private purchaseTx<T>(id: string, fn: (a: Account, members: Account[]) => T) {
    return this.store.purchaseTransaction(id, this.config.mode, this.config.sourceInstance, fn);
  }

  private assertPurchaseAvailable(owner: Account, members: Account[], native: boolean, now: number) {
    for (const a of members) {
      assertPolicyReady(a);
      if (access(a, now / 1000)) throw new BillingError(a === owner ? "subscription_exists" : "duplicate_purchase");
      if (Object.values(a.contracts).some(c => !terminal(c.status))) {
        throw new BillingError(a !== owner ? "duplicate_purchase" : native ? "web_subscription_exists" : "subscription_exists");
      }
      if (activeReservation(a, now)) throw new BillingError("app_store_purchase_pending");
    }
    if (!native && disputeHold(owner)) throw new BillingError("billing_review_required");
  }

  async checkout(userId: string, terms: string, provider: MonthlyProvider, email?: string, onCreated?: (orderId: string) => Promise<void>,
    checkAppStore?: (memberId: string) => Promise<void>) {
    if (!this.config.enabled) throw new BillingError("billing_unavailable", 503);
    if (terms !== monthlyTerms(this.config)) throw new BillingError("terms_changed");

    const waitUntil = Date.now() + 2000;
    for (;;) {
      const plan = await this.purchaseTx(userId, (a, members) => {
        const now = this.clock().getTime();
        this.assertPurchaseAvailable(a, members, false, now);
        const ids = memberIds(members);
        const other = members.find(member => member !== a && hasPendingSignup(member));
        const signupOwner = other ?? a;
        const signup = Object.values(signupOwner.signups).find(s => s.state === "pending");
        if (signup) {
          if (Date.parse(signup.preparingUntil ?? "") > now) return { kind: "preparing" as const, own: signupOwner === a };
          return { kind: "existing" as const, signup, ownerId: signupOwner.userId, customerId: signupOwner.customer?.id ?? null, ids };
        }

        const firstContract = !Object.keys(a.contracts).length && !Object.values(a.signups).some(s => s.state === "attached");
        const createdAt = new Date(now).toISOString();
        const fresh: Signup = { id: randomUUID(), createdAt, terms, amount: this.config.priceYen, priceId: this.config.priceId,
          state: "pending", sessionId: null, url: null, subscriptionId: null,
          preparingUntil: new Date(now + purchasePreparationMs).toISOString(),
          ...(firstContract && this.config.trialDays > 0 ? { trialDays: this.config.trialDays } : {}) };
        a.signups[fresh.id] = fresh;
        if (!a.customer || !a.customer.id && now - Date.parse(a.customer.createdAt) >= staleSignupMs)
          a.customer = { attemptId: randomUUID(), createdAt, id: null };
        return { kind: "create" as const, signup: fresh, customer: a.customer, ids };
      });

      if (plan.kind === "preparing") {
        if (!plan.own || Date.now() >= waitUntil) throw new BillingError("web_checkout_preparing");
        await new Promise(resolve => setTimeout(resolve, 150));
        continue;
      }
      if (plan.kind === "existing") {
        const { signup, customerId, ownerId } = plan;
        if (ownerId !== userId && signup.sessionId) {
          const session = customerId && await provider.checkoutSession(customerId, signup);
          if (!session) problem("checkout_conflict");
          if (session.status !== "expired") throw new BillingError("web_checkout_pending");
          await this.closeSignup(ownerId, signup.id, session.id);
          continue;
        }
        const reusable = signup.url && signup.sessionId && signup.terms === terms
          && this.clock().getTime() - Date.parse(signup.createdAt) < staleSignupMs;
        if (reusable) {
          await checkMembers(plan.ids, checkAppStore);
          const session = customerId && await provider.checkoutSession(customerId, signup);
          if (!session) problem("checkout_conflict");
          if (session.status === "complete") throw new BillingError("subscription_exists");
          if (session.status === "open") return this.purchaseTx(userId, (a, members) => {
            const current = a.signups[signup.id];
            this.assertPurchaseAvailable(a, members, false, this.clock().getTime());
            if (members.some(member => member !== a && hasPendingSignup(member))) throw new BillingError("web_checkout_pending");
            if (current?.state !== "pending" || current.sessionId !== session.id || !current.url) throw new BillingError("checkout_conflict");
            assertSameMembers(plan.ids, members);
            return { orderId: current.id, url: current.url };
          });
          await this.closeSignup(ownerId, signup.id, session.id);
        } else {
          const sessionId = await this.expireSignup(signup, customerId, provider);
          await this.closeSignup(ownerId, signup.id, sessionId);
        }
        continue;
      }

      let checkout: { id: string; url: string };
      try {
        await checkMembers(plan.ids, checkAppStore);
        const customerId = plan.customer.id ?? await provider.customer(plan.customer.attemptId);
        await this.tx(userId, async a => {
          if (a.customer?.attemptId !== plan.customer.attemptId || a.customer.id && a.customer.id !== customerId) problem("customer_conflict");
          if (a.signups[plan.signup.id]?.state !== "pending") throw new BillingError("checkout_conflict");
          a.customer.id = customerId;
        });
        checkout = await provider.checkout(customerId, plan.signup, email);
      } catch (error) {
        // No URL was returned to a buyer. A failed customer/session request
        // must not leave an order blocking either purchase channel.
        await this.tx(userId, async a => {
          const signup = a.signups[plan.signup.id];
          if (signup?.state === "pending" && !signup.sessionId) {
            signup.state = "failed";
            delete signup.preparingUntil;
          }
        });
        throw error;
      }

      let result: { orderId: string; url: string };
      try {
        result = await this.purchaseTx(userId, (a, members) => {
          this.assertPurchaseAvailable(a, members, false, this.clock().getTime());
          if (members.some(member => member !== a && hasPendingSignup(member))) throw new BillingError("web_checkout_pending");
          assertSameMembers(plan.ids, members);
          const current = a.signups[plan.signup.id];
          if (current?.state !== "pending" || current.sessionId && current.sessionId !== checkout.id) throw new BillingError("checkout_conflict");
          current.sessionId = checkout.id;
          current.url = checkout.url;
          delete current.preparingUntil;
          return { orderId: current.id, url: current.url };
        });
      } catch (error) {
        // A fenced-out creator cannot publish the URL. Leave ambiguous DB
        // failures recoverable by the persisted signup and Stripe lookup.
        if (error instanceof BillingError && error.status === 409) {
          await provider.expireCheckout(checkout.id);
          await this.closeSignup(userId, plan.signup.id, checkout.id);
        }
        throw error;
      }
      if (onCreated) {
        try { await onCreated(result.orderId); } catch { /* measurement only */ }
      }
      return result;
    }
  }

  private async expireSignup(signup: Signup, customerId: string | null, provider: MonthlyProvider) {
    if (signup.sessionId) {
      await provider.expireCheckout(signup.sessionId);
      return signup.sessionId;
    }
    const session = customerId ? await provider.checkoutSession(customerId, signup) : null;
    if (session?.status === "complete") throw new BillingError("subscription_exists");
    if (session?.status === "open") await provider.expireCheckout(session.id);
    return session?.id ?? null;
  }

  private async closeSignup(userId: string, orderId: string, sessionId: string | null) {
    await this.tx(userId, async a => closeSignup(a, orderId, sessionId));
  }

  async cancelCheckout(userId: string, orderId: string, provider: MonthlyProvider) {
    const snapshot = await this.tx(userId, async a => {
      const signup = a.signups[orderId];
      if (!signup) throw new BillingError("purchase_not_found", 404);
      if (Date.parse(signup.preparingUntil ?? "") > this.clock().getTime()) throw new BillingError("web_checkout_preparing");
      return signup.state === "pending" ? { signup, customerId: a.customer?.id ?? null } : null;
    }, true);
    if (snapshot) {
      const sessionId = await this.expireSignup(snapshot.signup, snapshot.customerId, provider);
      await this.closeSignup(userId, orderId, sessionId);
    }
  }

  async reserveAppStorePurchase(userId: string, provider: MonthlyProvider, checkAppStore: (memberId: string) => Promise<void>, attemptId?: string) {
    const plan = await this.purchaseTx(userId, (a, members) => {
      const now = this.clock().getTime();
      this.assertPurchaseAvailable(a, members, true, now);
      const signups = members.flatMap(member => Object.values(member.signups).filter(s => s.state === "pending")
        .map(signup => ({ userId: member.userId, customerId: member.customer?.id ?? null, signup })));
      if (signups.some(({ signup }) => Date.parse(signup.preparingUntil ?? "") > now))
        throw new BillingError("web_checkout_preparing");
      const id = randomUUID();
      a.appStorePurchase = { id, attemptId, expiresAt: new Date(now + purchasePreparationMs).toISOString() };
      return { id, ids: memberIds(members), signups };
    });

    try {
      await checkMembers(plan.ids, checkAppStore);
      const expired: { userId: string; signup: Signup; sessionId: string | null }[] = [];
      for (const entry of plan.signups) {
        const session = entry.customerId ? await provider.checkoutSession(entry.customerId, entry.signup) : null;
        if (entry.signup.sessionId && !session) problem("checkout_conflict");
        if (session?.status === "complete") throw new BillingError("web_checkout_pending");
        if (session?.status === "open") await provider.expireCheckout(session.id);
        expired.push({ ...entry, sessionId: session?.id ?? null });
      }
      return await this.purchaseTx(userId, (a, members) => {
        const now = this.clock().getTime();
        if (activeReservation(a, now)?.id !== plan.id) throw new BillingError("app_store_purchase_pending");
        delete a.appStorePurchase;
        this.assertPurchaseAvailable(a, members, true, now);
        assertSameMembers(plan.ids, members);
        const byId = new Map(members.map(member => [member.userId, member]));
        for (const { userId, signup, sessionId } of expired) closeSignup(byId.get(userId)!, signup.id, sessionId);
        if (members.some(hasPendingSignup))
          throw new BillingError("web_checkout_pending");
        const reservation = { id: plan.id, expiresAt: new Date(now + appStorePurchaseMs).toISOString() };
        a.appStorePurchase = { ...reservation, attemptId };
        return reservation;
      });
    } catch (error) {
      await this.releaseAppStorePurchase(userId, plan.id);
      throw error;
    }
  }

  async releaseAppStorePurchase(userId: string, reservationId: string) {
    await this.tx(userId, async a => {
      if (a.appStorePurchase?.id === reservationId) delete a.appStorePurchase;
    });
  }

  async recoverAppStorePurchase(userId: string, recovery: AppStoreRecovery, checkAppStore: () => Promise<AppStorePurchaseState>) {
    const read = () => this.tx(userId, async a => activeReservation(a, this.clock().getTime()), true);
    const reservation = await read();
    const state = await checkAppStore();
    const matched = reservation && (
      "reservationId" in recovery ? recovery.reservationId === reservation.id
      : "attemptId" in recovery ? recovery.attemptId === reservation.attemptId
      : "expiresAt" in recovery && !reservation.attemptId && recovery.expiresAt === reservation.expiresAt
    );
    // A generic legacy marker can signal a purchase, but cannot release
    // a reservation made by a different device.
    if (!matched) return state ?? (await read() ? "processing" : null);
    if (state !== "processing") await this.releaseAppStorePurchase(userId, reservation.id);
    return state;
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
    const revision = (a: Account) => JSON.stringify([a.events, a.contracts, a.renewalStopJobs, a.trialEndJobs]);
    const alreadyProcessed = (a: Account) => {
      if (a.customer?.id !== target.customerId) problem("customer_conflict");
      assertPolicyReady(a);
      if (!a.events[event.id]) return false;
      if (a.events[event.id] !== digest) throw new BillingError("event_conflict", 400);
      return true;
    };
    let result: "duplicate" | "processed" | undefined;
    for (let attempt = 0; attempt < 4 && !result; attempt++) {
      const before = await this.tx(userId, async a => alreadyProcessed(a) ? null : revision(a), true);
      if (before === null) { result = "duplicate"; break; }
      const observation = await provider.observe(target);
      result = await this.tx(userId, async a => {
        if (alreadyProcessed(a)) return "duplicate";
        // Re-fetch after a concurrent commit so an old Stripe response cannot
        // overwrite a newer contract snapshot.
        if (revision(a) !== before) return undefined;
        return this.applyObservation(a, observation, target.customerId, event.id, digest);
      });
    }
    if (!result) problem("subscription_observation_conflict");
    // Dispute revocation is durable BEFORE the provider write. Refunds create no stop intent.
    await this.flushRenewalStops(userId, provider);
    await this.flushTrialEnds(userId, provider);
    await this.afterReceive?.(userId);
    return result;
  }
  private async applyObservation(a: Account, observation: Observation, customerId: string, eventId: string, digest: string) {
    for (const current of observation.contracts) {
      const signup = a.signups[current.signupId];
      if (!signup || current.sourceInstance !== a.sourceInstance || current.customerId !== customerId
        || current.terms !== signup.terms || current.amount !== signup.amount || current.priceId !== signup.priceId
        || signup.subscriptionId && signup.subscriptionId !== current.id) problem("subscription_owner_mismatch");
      const old = a.contracts[current.id];
      if (old && (old.customerId !== current.customerId || old.signupId !== current.signupId)) problem("subscription_identity_conflict");
      // Cancellation is terminal. A late observation never resurrects an old contract.
      if (old && terminal(old.status) && !terminal(current.status)) problem("terminal_subscription_conflict");
      const { trialCard, ...facts } = current;
      a.contracts[current.id] = { ...facts, renewalBlocked: old?.renewalBlocked ?? false,
        ...(old?.renewalBlockReason ? { renewalBlockReason: old.renewalBlockReason } : {}), ...(old?.trialRevoked ? { trialRevoked: true as const } : {}) };
      // One free trial per card: a card that already started a trial on another account is charged now.
      if (current.status === "trialing" && trialCard && !old?.trialRevoked) {
        if (await this.store.trialCardOwner(trialCard, this.config.mode, a.userId)) {
          a.contracts[current.id].trialRevoked = true; (a.trialEndJobs ??= {})[current.id] ??= eventId;
        } else (a.trialCards ??= {})[trialCard] ??= current.id;
      }
      signup.subscriptionId = current.id; signup.state = "attached";
    }
    const session = observation.session;
    if (session) {
      const s = a.signups[session.signupId];
      if (!s || session.customerId !== customerId || s.terms !== session.terms || s.sessionId && s.sessionId !== session.id
        || session.subscriptionId && s.subscriptionId !== session.subscriptionId) problem("checkout_owner_mismatch");
      s.sessionId = session.id;
      if (session.state === "expired" && !session.subscriptionId && s.state === "pending") s.state = "expired";
    }
    for (const p of observation.payments) {
      if (p.customerId !== customerId || !Number.isSafeInteger(p.amount) || p.amount < 1) problem("payment_owner_mismatch");
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
      if (!sub || invoice.customerId !== customerId || invoice.priceId !== sub.priceId || invoice.amount !== sub.amount
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
        a.renewalStopJobs[sub.id] ??= { token: eventId, reason: "dispute" };
      } else if (terminal(sub.status) || sub.cancelAtPeriodEnd) delete a.renewalStopJobs[sub.id];
    }
    a.events[eventId] = digest;
    return "processed" as const;
  }

  async flushTrialEnds(userId: string, provider: MonthlyProvider) {
    const jobs = await this.tx(userId, async a => structuredClone(a.trialEndJobs ?? {}), true);
    for (const [subId, token] of Object.entries(jobs)) {
      await provider.endTrial(subId, token);
      await this.tx(userId, async a => { if (a.trialEndJobs?.[subId] === token) delete a.trialEndJobs[subId]; });
    }
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
      const purchaseStatus = signup?.state === "expired" || signup?.state === "failed" ? "expired" : sub && paid?.subscriptionId === sub.id ? "paid"
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
