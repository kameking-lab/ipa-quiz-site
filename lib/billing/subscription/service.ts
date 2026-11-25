import "server-only";
import { createHash, randomUUID } from "node:crypto";
import { BillingError, DailyLimitError, jstDay } from "../domain";
import { refundState } from "../finance";
import { examDateBeforeEnd, examEndCanBeBooked } from "../exam-end";
import { safeQuizReturn } from "../quiz-return";
import { sameEventDigest } from "../event-identity";
import { invoiceCashDue, stripeMinimumYenCharge, terminal, type Account, type AppStorePurchase, type AppStorePurchaseHold, type AppStorePurchaseState, type AppStoreRecovery, type Contract, type EndingChange, type MonthlyConfig, type MonthlyProvider, type MonthlyStore, type Invoice, type Observation, type Realm, type Signup, type SubscriptionManagement, type Target, type WebhookObservationHint } from "./domain";

type ReadAppStorePurchaseStatus = (userId: string, mode: Realm) => Promise<AppStorePurchaseState>;

export function monthlyTerms(c: MonthlyConfig) {
  return createHash("sha256").update(JSON.stringify({ version: c.termsVersion, price: c.priceYen, priceId: c.priceId,
    freeDaily: c.freeDaily, interval: "month", autoRenew: true, cancel: "period-end", unpaidGraceDays: 0,
    refund: "partial-preserves-access;full-invoice-only;cancel-separate-v2", seller: c.seller,
    ...(c.trialDays > 0 ? { trialDays: c.trialDays, trial: "first-contract;card-required;cancel-before-end-no-charge" } : {}) })).digest("hex");
}
function problem(code: string): never { throw new BillingError(code, 503); }
const staleSignupMs = 23 * 3600000;
const purchasePreparationMs = 2 * 60000;
const appStoreHoldMs = 30 * 60000;
const appStoreApprovalMs = 24 * 3600000;
const legacyAppStoreHoldMs = 25 * 3600000;
const renewalRecoveryCooldownMs = 60_000;
const within = (start: number, end: number, now: number) => start <= now && now < end;
const canRenew = (sub: Contract, now: number) => ["active", "trialing", "past_due"].includes(sub.status) && sub.periodEnd > now;
function endsByCurrentPeriod(sub: Contract) {
  const ending = sub.memberEnding;
  return sub.cancelAtPeriodEnd || (sub.examCancelAt ?? Infinity) <= sub.periodEnd
    || ending?.kind === "exam" && ending.renewalEnd <= sub.periodEnd
    || ending?.kind === "cancel" && ending.at <= sub.periodEnd;
}
const memberIds = (members: Account[]) => members.map(a => a.userId);
function assertSameMembers(ids: string[], members: Account[]) {
  if (ids.length !== members.length || members.some((a, i) => a.userId !== ids[i])) throw new BillingError("checkout_conflict");
}
async function checkMembers(ids: string[], check?: (id: string) => Promise<void>) {
  if (check) await Promise.all(ids.map(id => check(id)));
}
function activeReservation(a: Account, now: number) {
  const current = a.appStorePurchase;
  if (!current) return null;
  // Old persisted holds have only their original 25-hour deadline. Shorten
  // from that original start so polling or restarting cannot renew the hold.
  const limit = Date.parse(current.expiresAt) - (current.phase ? 0 : legacyAppStoreHoldMs - appStoreHoldMs);
  return limit > now ? current : null;
}
const beforeStoreKit = (r: AppStorePurchase) => r.phase === "preparing" || r.phase === "closing_checkout" || r.phase === "ready";
function groupPurchaseHold(members: Account[], now: number): AppStorePurchaseHold {
  const holds = members.map(member => activeReservation(member, now));
  const approval = holds.find(hold => hold?.phase === "approval");
  return approval ? { approval: { reservationId: approval.id } } : holds.some(Boolean) ? "processing" : null;
}
function abandonedAttempts(a: Account, now: number) {
  const live = Object.entries(a.abandonedAppStoreAttempts ?? {}).filter(([, expiresAt]) => expiresAt > now);
  if (!live.length) delete a.abandonedAppStoreAttempts;
  else a.abandonedAppStoreAttempts = Object.fromEntries(live);
  return a.abandonedAppStoreAttempts;
}
function matchesRecovery(r: AppStorePurchase, recovery: AppStoreRecovery) {
  if ("reservationId" in recovery) return recovery.reservationId === r.id;
  if ("attemptId" in recovery) return recovery.attemptId === r.attemptId;
  return "expiresAt" in recovery && !r.attemptId && recovery.expiresAt === r.expiresAt;
}
const hasPendingSignup = (a: Account) => Object.values(a.signups).some(s => s.state === "pending");
const firstContract = (a: Account) => !Object.keys(a.contracts).length && !Object.values(a.signups).some(s => s.state === "attached");
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
    && invoice.payments.reduce((sum, p) => sum + p.amount, 0) === invoiceCashDue(invoice)
    && invoice.payments.every(p => {
      const facts = a.payments[p.paymentId];
      return p.amount > 0 && facts && facts.amount > 0
        && Object.values(facts.refunds).reduce((sum, r) => sum + (r.state === "succeeded" ? r.amount : 0), 0) === facts.amount;
    });
}
function needsPolicyReview(a: Account) {
  // The old implementation persisted refund/dispute flags without their cause. Never
  // silently clear them or replay an old refund cancellation under the new policy.
  return Object.values(a.contracts).some(s => s.renewalBlocked && s.renewalBlockReason !== "dispute")
    || Object.entries(a.renewalStopJobs).some(([id, job]) => job.reason !== "dispute"
      || !a.contracts[id]?.renewalBlocked || a.contracts[id]?.renewalBlockReason !== "dispute");
}
function assertPolicyReady(a: Account) {
  if (needsPolicyReview(a)) problem("billing_policy_review_required");
}
function held(a: Account, invoice: Invoice) {
  return invoice.payments.some(p => {
    const facts = a.payments[p.paymentId];
    return !facts
      || Object.values(facts.disputes).some(d => d !== "won");
  });
}
function examAccessEnd(a: Account, sub: Contract) {
  const signup = a.signups[sub.signupId];
  if (sub.memberEnding) return sub.memberEnding.kind === "exam" && !sub.cancelAtPeriodEnd ? sub.memberEnding.at : Infinity;
  // Respect the selected cutoff while Stripe is still applying it. Once
  // applied, the provider can also confirm that the customer withdrew it.
  return sub.examCancelAt ?? (!signup?.examEndApplied ? signup?.examEndAt : undefined) ?? Infinity;
}
function paidAccessEnd(a: Account, sub: Contract, invoice: Invoice) {
  // Lifting a legacy cutoff can restore the original renewal date after that
  // month's shortened invoice was paid. Honor the restored term without a top-up.
  const paidThrough = sub.memberEnding && invoice.examFinalCycle && invoice.periodStart === sub.periodStart
    ? Math.max(invoice.periodEnd, sub.periodEnd) : invoice.periodEnd;
  return Math.min(paidThrough, examAccessEnd(a, sub), sub.memberEnding?.kind === "cancel" ? sub.memberEnding.at : Infinity);
}
/** A trial grants access only inside the provider's trial period, never longer than the signup offered. */
function trialAccess(a: Account, now: number) {
  return Object.values(a.contracts).filter(sub => {
    const offered = a.signups[sub.signupId]?.trialDays ?? 0;
    return sub.status === "trialing" && offered > 0 && !sub.trialRevoked && !sub.renewalBlocked && !disputeHold(a, sub.id)
      && sub.periodEnd - sub.periodStart <= offered * 86400 + 3600 && within(sub.periodStart, Math.min(sub.periodEnd, examAccessEnd(a, sub)), now);
  }).map(sub => ({ subscriptionId: sub.id, periodEnd: Math.min(sub.periodEnd, examAccessEnd(a, sub)) }))[0] ?? null;
}
export function access(a: Account, now: number): { subscriptionId: string; periodEnd: number } | null {
  assertPolicyReady(a);
  return Object.values(a.invoices).filter(i => {
    const sub = a.contracts[i.subscriptionId];
    return sub && ["active", "past_due"].includes(sub.status) && i.paid && !held(a, i) && !fullyRefunded(a, i) && !disputeHold(a, sub.id)
      && within(i.periodStart, paidAccessEnd(a, sub, i), now);
  }).sort((a, b) => b.periodEnd - a.periodEnd).map(i => ({
    subscriptionId: i.subscriptionId, periodEnd: paidAccessEnd(a, a.contracts[i.subscriptionId], i),
  }))[0] ?? trialAccess(a, now);
}
/** No legacy-account grace. Existing Auth and history records are neither deleted nor rewritten. */
export class MonthlyService {
  constructor(private store: MonthlyStore, readonly config: MonthlyConfig, private clock = () => new Date(),
    private afterReceive?: (userId: string, options?: { retryOnFailure: boolean }) => Promise<void>, private reviewExamCharge?: (orderId: string, invoiceId: string) => Promise<boolean>,
    private reviewPurchase?: (orderId: string, reason: "exam_writeoff" | "customer_balance") => Promise<boolean>) {}
  private tx<T>(id: string, fn: (a: Account) => Promise<T>, readOnly = false) { return this.store.transaction(id, this.config.mode, this.config.sourceInstance, fn, readOnly); }
  private purchaseTx<T>(id: string, fn: (a: Account, members: Account[], verifiedMembers?: ReadonlySet<string>) => T | Promise<T>) {
    return this.store.purchaseTransaction(id, this.config.mode, this.config.sourceInstance, fn);
  }

  private assertPurchaseAvailable(owner: Account, members: Account[], native: boolean, now: number, reservationId?: string) {
    for (const a of members) {
      assertPolicyReady(a);
      if (access(a, now / 1000)) throw new BillingError(a === owner ? "subscription_exists" : "duplicate_purchase");
      if (Object.values(a.contracts).some(c => !terminal(c.status))) {
        throw new BillingError(a !== owner ? "duplicate_purchase" : native ? "web_subscription_exists" : "subscription_exists");
      }
      const reservation = activeReservation(a, now);
      if (reservation && !(a === owner && reservation.id === reservationId)) throw new BillingError("app_store_purchase_pending");
    }
    if (!native && disputeHold(owner)) throw new BillingError("billing_review_required");
  }

  async checkout(userId: string, terms: string, provider: MonthlyProvider, email?: string, onCreated?: (orderId: string) => Promise<void>,
    checkAppStore?: (memberId: string) => Promise<void>, examEndAt?: number, exam?: string, returnTo?: string | null) {
    if (!this.config.enabled) throw new BillingError("billing_unavailable", 503);
    if (terms !== monthlyTerms(this.config)) throw new BillingError("terms_changed");
    if (examEndAt !== undefined && !examEndCanBeBooked(examEndAt, this.clock()))
      throw new BillingError("invalid_exam_date", 400);
    await this.recoverElapsedExamEnds(userId, provider, true);

    const waitUntil = Date.now() + 2000;
    for (;;) {
      const plan = await this.purchaseTx(userId, (a, members, verifiedMembers) => {
        const now = this.clock().getTime();
        this.assertPurchaseAvailable(a, members, false, now);
        const ids = memberIds(members);
        const other = members.find(member => member !== a && hasPendingSignup(member));
        const signupOwner = other ?? a;
        const signup = Object.values(signupOwner.signups).find(s => s.state === "pending");
        if (signup) {
          if (Date.parse(signup.preparingUntil ?? "") > now) return { kind: "preparing" as const, own: signupOwner === a };
          const mayReplace = verifiedMembers?.has(userId) && verifiedMembers.has(signupOwner.userId);
          return { kind: "existing" as const, signup, ownerId: signupOwner.userId, customerId: signupOwner.customer?.id ?? null, ids, mayReplace };
        }
        if (Object.values(a.signups).some(order => order.examWriteOffJobs?.length)) throw new BillingError("exam_writeoff_pending", 503);

        const createdAt = new Date(now).toISOString();
        const back = safeQuizReturn(returnTo);
        const fresh: Signup = { id: randomUUID(), createdAt, terms, amount: this.config.priceYen, priceId: this.config.priceId,
          state: "pending", sessionId: null, url: null, subscriptionId: null,
          preparingUntil: new Date(now + purchasePreparationMs).toISOString(),
          ...(examEndAt !== undefined ? { examEndAt, ...(exam ? { exam } : {}) } : {}),
          ...(back ? { returnTo: back } : {}),
          ...(firstContract(a) && this.config.trialDays > 0 ? { trialDays: this.config.trialDays } : {}) };
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
        if (ownerId !== userId) {
          if (!plan.mayReplace) {
            const session = customerId && await provider.checkoutSession(customerId, signup);
            if (session && session.status !== "expired") throw new BillingError("web_checkout_pending");
            await this.closeSignup(ownerId, signup.id, session ? session.id : null);
            continue;
          }
          await checkMembers(plan.ids, checkAppStore);
          try {
            const sessionId = await this.expireSignup(signup, customerId, provider);
            await this.closeSignup(ownerId, signup.id, sessionId);
          } catch (error) {
            if (error instanceof BillingError && error.code === "subscription_exists") {
              if (signup.examEndAt) await this.reconcileExamEnd(ownerId, signup.id, provider);
              throw new BillingError("web_checkout_other_account");
            }
            throw error;
          }
          continue;
        }
        const reusable = signup.url && signup.sessionId && signup.terms === terms && signup.examEndAt === examEndAt && signup.exam === exam
          && this.clock().getTime() - Date.parse(signup.createdAt) < staleSignupMs;
        if (reusable) {
          await checkMembers(plan.ids, checkAppStore);
          const session = customerId && await provider.checkoutSession(customerId, signup);
          if (!session) problem("checkout_conflict");
          if (session.status === "complete") return this.resumeCheckout(userId, signup.id, provider, session);
          if (session.status === "open") return this.purchaseTx(userId, (a, members) => {
            const current = a.signups[signup.id];
            this.assertPurchaseAvailable(a, members, false, this.clock().getTime());
            if (members.some(member => member !== a && hasPendingSignup(member))) throw new BillingError("web_checkout_pending");
            if (current?.state !== "pending" || current.sessionId !== session.id || !current.url) throw new BillingError("checkout_conflict");
            assertSameMembers(plan.ids, members);
            const back = safeQuizReturn(returnTo);
            if (back) current.returnTo = back;
            return { orderId: current.id, url: current.url };
          });
          await this.closeSignup(ownerId, signup.id, session.id);
        } else {
          try {
            const sessionId = await this.expireSignup(signup, customerId, provider);
            await this.closeSignup(ownerId, signup.id, sessionId);
          } catch (error) {
            if (error instanceof BillingError && error.code === "subscription_exists") return this.resumeCheckout(userId, signup.id, provider);
            throw error;
          }
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
        const previousOrder = await this.tx(userId, async a => {
          const signup = a.signups[plan.signup.id];
          if (signup?.state === "pending" && !signup.sessionId) {
            signup.state = "failed";
            delete signup.preparingUntil;
          }
          return Object.values(a.signups).filter(s => s.state === "attached")
            .sort((left, right) => right.createdAt.localeCompare(left.createdAt))[0]?.id;
        });
        if (error instanceof BillingError && ["exam_writeoff_pending", "customer_balance_due"].includes(error.code)) {
          await this.reviewPurchase?.(previousOrder ?? plan.signup.id, error.code === "exam_writeoff_pending" ? "exam_writeoff" : "customer_balance").catch(() => {});
        }
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

  async reserveAppStorePurchase(userId: string, provider: MonthlyProvider, checkAppStore: (memberId: string) => Promise<void>,
    checkDuplicate: () => Promise<void>, { attemptId, confirmStoreKit }: { attemptId?: string; confirmStoreKit?: true }, requestedAt: number) {
    await this.recoverElapsedExamEnds(userId, provider, true);
    const plan = await this.purchaseTx(userId, (a, members) => {
      const now = this.clock().getTime();
      const abandoned = abandonedAttempts(a, now);
      if (Date.now() - requestedAt >= purchasePreparationMs || attemptId && abandoned?.[attemptId])
        throw new BillingError("app_store_purchase_pending");
      try {
        this.assertPurchaseAvailable(a, members, true, now);
      } catch (error) {
        // Keep the duplicate guard's account-specific sign-in guidance for known contracts.
        if (error instanceof BillingError && ["subscription_exists", "web_subscription_exists", "duplicate_purchase"].includes(error.code))
          return { conflict: error };
        throw error;
      }
      const signups = members.flatMap(member => Object.values(member.signups).filter(s => s.state === "pending")
        .map(signup => ({ userId: member.userId, customerId: member.customer?.id ?? null, signup })));
      if (signups.some(({ signup }) => Date.parse(signup.preparingUntil ?? "") > now))
        throw new BillingError("web_checkout_preparing");
      const reservation: AppStorePurchase = { id: randomUUID(), attemptId, phase: "preparing",
        expiresAt: new Date(now + purchasePreparationMs).toISOString() };
      a.appStorePurchase = reservation;
      return { reservation, ids: memberIds(members), signups };
    });

    if (plan.conflict) {
      await checkDuplicate();
      throw plan.conflict;
    }
    try {
      await checkDuplicate();
      await checkMembers(plan.ids, checkAppStore);
      // Recovery may have revoked this attempt while the provider was responding.
      if (plan.signups.length) await this.purchaseTx(userId, a => {
        const current = activeReservation(a, this.clock().getTime());
        if (current?.id !== plan.reservation.id) throw new BillingError("app_store_purchase_pending");
        // A concurrent Web retry must not reuse the URL while Stripe is closing it.
        current.phase = "closing_checkout";
      });
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
        if (activeReservation(a, now)?.id !== plan.reservation.id || attemptId && a.abandonedAppStoreAttempts?.[attemptId])
          throw new BillingError("app_store_purchase_pending");
        this.assertPurchaseAvailable(a, members, true, now, plan.reservation.id);
        assertSameMembers(plan.ids, members);
        const byId = new Map(members.map(member => [member.userId, member]));
        for (const { userId, signup, sessionId } of expired) closeSignup(byId.get(userId)!, signup.id, sessionId);
        if (members.some(hasPendingSignup))
          throw new BillingError("web_checkout_pending");
        a.appStorePurchase = confirmStoreKit
          ? { ...plan.reservation, phase: "ready", checkedMemberIds: plan.ids }
          : this.startAppStoreHold(plan.reservation, now);
        return { id: a.appStorePurchase.id, expiresAt: a.appStorePurchase.expiresAt, ...(confirmStoreKit ? { requiresStart: true as const } : {}) };
      });
    } catch (error) {
      await this.releaseAppStorePurchase(userId, plan.reservation.id);
      throw error;
    }
  }

  private startAppStoreHold({ id, attemptId }: AppStorePurchase, now: number): AppStorePurchase {
    return { id, attemptId, phase: "uncertain", startedAt: new Date(now).toISOString(), expiresAt: new Date(now + appStoreHoldMs).toISOString() };
  }

  async startAppStorePurchase(userId: string, reservationId: string) {
    await this.purchaseTx(userId, (a, members) => {
      const now = this.clock().getTime();
      const current = activeReservation(a, now);
      if (current?.id !== reservationId || current.phase !== "ready") throw new BillingError("app_store_purchase_pending");
      assertSameMembers(current.checkedMemberIds ?? [], members);
      this.assertPurchaseAvailable(a, members, true, now, current.id);
      if (members.some(hasPendingSignup)) throw new BillingError("web_checkout_pending");
      a.appStorePurchase = this.startAppStoreHold(current, now);
    });
  }

  async releaseAppStorePurchase(userId: string, reservationId: string) {
    await this.tx(userId, async a => {
      if (a.appStorePurchase?.id === reservationId && a.appStorePurchase.phase !== "approval") delete a.appStorePurchase;
    });
  }

  appStorePurchaseHold(userId: string) {
    return this.purchaseTx(userId, (_, members) => groupPurchaseHold(members, this.clock().getTime()));
  }

  async retryAppStoreApproval(userId: string, reservationId: string, checkAppStore: (id: string) => Promise<AppStorePurchaseState>) {
    const plan = await this.purchaseTx(userId, (_, members) => {
      const now = this.clock().getTime();
      const requestedApproval = members.some(member => {
        const hold = activeReservation(member, now);
        return hold?.id === reservationId && hold.phase === "approval";
      });
      return requestedApproval ? { ids: memberIds(members) } : { pending: groupPurchaseHold(members, now) };
    });
    if (!plan.ids) return { state: plan.pending ? "processing" as const : null };

    // A missing receipt cannot distinguish a pending request from a denial.
    // Check all logins, but let the original deadline release the hold.
    const states = await Promise.all(plan.ids.map(checkAppStore));
    return this.purchaseTx(userId, (_, members) => {
      assertSameMembers(plan.ids, members);
      if (states.includes("active")) return { state: "active" as const };
      const now = this.clock().getTime();
      const pending = states.includes("processing") || groupPurchaseHold(members, now);
      return { state: pending ? "processing" as const : null };
    });
  }

  async recoverAppStorePurchase(userId: string, recovery: AppStoreRecovery, checkAppStore: (id: string) => Promise<AppStorePurchaseState>) {
    const target = await this.purchaseTx(userId, (account, members) => {
      const now = this.clock().getTime();
      // A StoreKit result can arrive after the login changed within the group.
      const a = "reservationId" in recovery && recovery.action === "approval"
        ? members.find(member => activeReservation(member, now)?.id === recovery.reservationId) ?? account : account;
      const current = activeReservation(a, now);
      const result = (reservation: AppStorePurchase | null) => ({ ownerId: a.userId, reservation });
      if ("reservationId" in recovery && recovery.action === "approval" && current?.id === recovery.reservationId
        && !beforeStoreKit(current) && current.phase !== "approval") {
        const startedAt = current.startedAt ? Date.parse(current.startedAt) : Date.parse(current.expiresAt) - legacyAppStoreHoldMs;
        a.appStorePurchase = { ...current, phase: "approval", expiresAt: new Date(startedAt + appStoreApprovalMs).toISOString() };
        return result(a.appStorePurchase);
      }
      if (!("attemptId" in recovery)) return result(current);
      if (current?.attemptId === recovery.attemptId && !beforeStoreKit(current)) return result(current);
      // An attempt-only marker was saved before the device received a reservation.
      // Revoke unfinished preparation, and fence out a POST that has yet to acquire the lock.
      const abandoned = abandonedAttempts(a, now);
      a.abandonedAppStoreAttempts = { ...abandoned, [recovery.attemptId]: now + purchasePreparationMs };
      if (current?.attemptId === recovery.attemptId && current.phase !== "closing_checkout") {
        delete a.appStorePurchase;
        return result(null);
      }
      return result(current);
    });
    const state = await checkAppStore(target.ownerId);
    return this.purchaseTx(userId, (_, members) => {
      const a = members.find(member => member.userId === target.ownerId);
      if (!a) throw new BillingError("checkout_conflict");
      const current = activeReservation(a, this.clock().getTime());
      if (state === "active" && current && current.id === target.reservation?.id && current.phase === target.reservation.phase
        && matchesRecovery(current, recovery) && !beforeStoreKit(current)) {
        delete a.appStorePurchase;
      }
      if (state) return { state };
      if (!current) return { state: null };
      return { state: "processing" as const, ...(beforeStoreKit(current) ? { phase: current.phase } : {}) };
    });
  }
  async portal(userId: string, provider: MonthlyProvider) {
    const customerId = await this.tx(userId, async a => a.customer?.id ?? null, true);
    if (!customerId) throw new BillingError("subscription_missing", 404);
    return { url: await provider.portal(customerId, this.config.portalConfigurationId) };
  }
  async changeEnding(userId: string, orderId: string, change: EndingChange, provider: MonthlyProvider,
    verifyAppStore?: (appStoreUserId: string) => Promise<void>) {
    const writeEnding = provider.changeEnding?.bind(provider);
    if (!writeEnding) problem("billing_unavailable");
    await this.purchaseTx(userId, async (a, members, verified) => {
      assertPolicyReady(a);
      const signup = a.signups[orderId];
      const sub = signup?.subscriptionId ? a.contracts[signup.subscriptionId] : undefined;
      const customerId = a.customer?.id;
      if (!sub || !customerId || sub.customerId !== customerId) throw new BillingError("subscription_missing", 404);
      if (sub.renewalBlocked && change.kind !== "cancel") throw new BillingError("subscription_ending_conflict");
      const beforeExtension = async () => {
        if (!verifyAppStore && signup.appStoreOverlap) problem("mobile_verification_unavailable");
        const buyers = members.filter(member => member === a || verified?.has(a.userId) && verified.has(member.userId));
        const ids = new Set(memberIds(buyers));
        if (signup.appStoreOverlap) ids.add(signup.appStoreOverlap.appStoreUserId);
        await checkMembers([...ids], verifyAppStore);
      };
      const overlap = signup.appStoreOverlap;
      const supersedesPendingStop = change.kind === "renew" && overlap?.renewal === "pending";
      // Check access even if Stripe already has the requested renewal setting.
      if (supersedesPendingStop) await beforeExtension();
      await writeEnding(sub.id, customerId, signup, change, this.clock().getTime() / 1000,
        supersedesPendingStop ? undefined : beforeExtension);
      // Make a webhook/cron observation started before this provider write re-fetch.
      delete signup.examEndCheckAt;
      const observation = await provider.observe({ customerId, subscriptionIds: [sub.id], invoiceIds: [] });
      await this.applyObservation(a, observation, customerId);
      // Persist the buyer's confirmed choice under the lock used by the stop job.
      if (supersedesPendingStop) overlap.renewal = "discarded";
    });
    return { management: (await this.status(userId, orderId)).management };
  }
  async receive(event: { id: string }, digest: string, provider: MonthlyProvider) {
    const receipt = { id: event.id, digest };
    const hint = provider.webhookObservationHint?.(event);
    let userId = hint && await this.store.owner(hint.customerId, this.config.mode);
    let result = userId && hint ? await this.observeCustomer(userId, provider, hint, receipt) : undefined;
    if (!userId || !result) {
      const target = await provider.resolve(event);
      if (!target) return "ignored";
      userId = await this.store.owner(target.customerId, this.config.mode);
      // An affirmative absence of this customer in our identity store is unrelated.
      // Lookup failures still propagate; we never create an account from a refund.
      if (!userId && target.unallocatedRefund) return "ignored";
      if (!userId) problem("subscription_customer_missing");
      result = await this.observeCustomer(userId, provider, target, receipt);
    }
    await this.finishObservation(userId, provider, true);
    return result;
  }

  private async finishObservation(userId: string, provider: MonthlyProvider, retryOnFailure = false) {
    // Stop overdue contracts before a queued duplicate-card job can bill them.
    await this.flushExamEnds(userId, provider, true);
    await this.flushRenewalStops(userId, provider);
    await this.flushTrialEnds(userId, provider);
    await this.flushExamEnds(userId, provider, false);
    await this.flushExamWriteOffs(userId, provider);
    await this.flushExamChargeReviews(userId);
    // Even a duplicate delivery must retry an audit that failed after commit.
    await this.afterReceive?.(userId, { retryOnFailure });
  }

  async recordAppStoreOverlaps(userId: string, appStoreUsers: string[]) {
    return this.purchaseTx(userId, (_, members, verified) => {
      const now = this.clock();
      const nowSeconds = now.getTime() / 1000;
      const orders: { userId: string; orderId: string; newlyRecorded: boolean }[] = [];
      for (const member of members) {
        const appStoreUserId = members.find(other => appStoreUsers.includes(other.userId)
          && (other === member || verified?.has(member.userId) && verified.has(other.userId)))?.userId;
        if (!appStoreUserId) continue;
        assertPolicyReady(member);
        for (const sub of Object.values(member.contracts)) {
          if (!canRenew(sub, nowSeconds)) continue;
          const signup = member.signups[sub.signupId];
          const overlap = signup.appStoreOverlap;
          if (!overlap) {
            signup.appStoreOverlap = { appStoreUserId, detectedAt: now.toISOString(), renewal: "pending" };
          } else if (overlap.renewal !== "pending" && !endsByCurrentPeriod(sub)) {
            // An older overlap record survives a later withdrawal of the Web ending.
            overlap.appStoreUserId = appStoreUserId;
            overlap.renewal = "pending";
            overlap.renewalAttempt = (overlap.renewalAttempt ?? 0) + 1;
          }
          if (signup.appStoreOverlap?.renewal === "pending") orders.push({ userId: member.userId, orderId: signup.id, newlyRecorded: !overlap });
        }
      }
      return orders;
    });
  }

  async reconcileAppStoreOverlap(userId: string, orderId: string, provider: MonthlyProvider, readAppStoreStatus: ReadAppStorePurchaseStatus) {
    await this.tx(userId, a => this.stopAppStoreOverlap(a, a.signups[orderId], provider, readAppStoreStatus));
  }

  private async stopAppStoreOverlap(a: Account, signup: Signup | undefined, provider: MonthlyProvider, readAppStoreStatus: ReadAppStorePurchaseStatus) {
    if (!signup) return;
    const overlap = signup.appStoreOverlap;
    if (overlap?.renewal !== "pending") return;
    const sub = signup.subscriptionId ? a.contracts[signup.subscriptionId] : undefined;
    if (!sub || !provider.stopAppStoreOverlapRenewal) problem("duplicate_purchase_reconcile_unavailable");
    if (await readAppStoreStatus(overlap.appStoreUserId, a.mode) !== "active") {
      overlap.renewal = "discarded";
      return;
    }
    // Keep the current period and serialize the provider write with other
    // changes to this contract. A failed write leaves the saved job pending.
    const cutoff = await provider.stopAppStoreOverlapRenewal(sub.id, sub.customerId, signup);
    if (cutoff !== null) {
      sub.cancelAtPeriodEnd = true;
      sub.memberEnding = { kind: "cancel", at: cutoff };
      delete sub.examCancelAt;
      if (signup.examEndAt) signup.examEndApplied = true;
    }
    overlap.renewal = cutoff === null ? "already_ending" : "stopped";
  }

  // An authenticated buyer can resume the same order even after closing the
  // Stripe tab. Looking up an open session here never expires or replaces it.
  async recoverPendingCheckout(userId: string, provider: MonthlyProvider, { attachedOnly = false } = {}) {
    const findOrder = async (a: Account) => {
      const now = this.clock().getTime();
      if ((attachedOnly && (a.renewalRecoveryAt ?? 0) > now) || access(a, now / 1000)) return null;
      const eligible = Object.values(a.signups).filter(s => {
        const sub = s.subscriptionId ? a.contracts[s.subscriptionId] : undefined;
        return (sub ? examAccessEnd(a, sub) : s.examEndAt ?? Infinity) > now / 1000;
      });
      const signup = (attachedOnly ? undefined : eligible.find(s => s.state === "pending" && !(Date.parse(s.preparingUntil ?? "") > now)))
        ?? eligible.find(s => {
          const contract = s.subscriptionId ? a.contracts[s.subscriptionId] : undefined;
          return s.state === "attached" && contract && !terminal(contract.status);
        });
      return signup && a.customer?.id ? { signup, customerId: a.customer.id } : null;
    };
    let order = await this.tx(userId, findOrder, true);
    if (order && attachedOnly) {
      // Recheck under the account lock before contacting Stripe. A page reload
      // or a concurrent request can only use the same member's cooldown.
      order = await this.tx(userId, async a => {
        const current = await findOrder(a);
        if (current) a.renewalRecoveryAt = this.clock().getTime() + renewalRecoveryCooldownMs;
        return current;
      });
    }
    if (!order) return null;
    if (order.signup.state === "attached") {
      try {
        const status = await this.confirmCheckout(userId, order.signup.id, provider);
        if (status.purchase?.status === "paid") return this.checkoutReturn(order.signup.id);
      } catch (error) {
        if (!(error instanceof BillingError) || error.code !== "purchase_check_unavailable") throw error;
      }
      return null;
    }
    const session = await provider.checkoutSession(order.customerId, order.signup);
    return session?.status === "complete" ? this.resumeCheckout(userId, order.signup.id, provider, session) : null;
  }

  private async resumeCheckout(userId: string, orderId: string, provider: MonthlyProvider,
    verifiedSession?: NonNullable<Awaited<ReturnType<MonthlyProvider["checkoutSession"]>>>) {
    try {
      await this.confirmCheckout(userId, orderId, provider, verifiedSession);
    } catch (error) {
      // Keep the existing order available for confirmation during a provider delay.
      if (!(error instanceof BillingError) || error.code !== "purchase_check_unavailable") throw error;
    }
    return this.checkoutReturn(orderId);
  }

  private checkoutReturn(orderId: string) {
    return { orderId, url: `/billing/success?order=${encodeURIComponent(orderId)}`, recovered: true as const };
  }

  async confirmCheckout(userId: string, orderId: string, provider: MonthlyProvider,
    verifiedSession?: NonNullable<Awaited<ReturnType<MonthlyProvider["checkoutSession"]>>>) {
    const saved = await this.status(userId, orderId);
    if (saved.purchase?.status !== "pending" && !(saved.purchase?.status === "paid" && saved.purchase.examEndPending)) return saved;
    const order = await this.tx(userId, async a => {
      const signup = a.signups[orderId];
      const sub = signup?.subscriptionId ? a.contracts[signup.subscriptionId] : undefined;
      return signup && a.customer?.id ? { signup, customerId: a.customer.id, cutoff: sub ? examAccessEnd(a, sub) : signup.examEndAt ?? Infinity } : null;
    }, true);
    if (!order) return saved;
    const { signup, customerId, cutoff } = order;
    try {
      const session = verifiedSession ?? await provider.checkoutSession(customerId, signup);
      if (!session || session.status === "open") return this.status(userId, orderId);
      if (session.status === "complete" && !session.subscriptionId) return this.status(userId, orderId);
      // Close an overdue order before an existing trial-end job could charge it.
      if (cutoff <= this.clock().getTime() / 1000) {
        await this.reconcileExamEnd(userId, orderId, provider);
      } else {
        await this.observeCustomer(userId, provider, { customerId, sessionId: session.id, subscriptionIds: [], invoiceIds: [] });
        await this.finishObservation(userId, provider);
      }
    } catch {
      // A provider failure must not hide access just saved by a concurrent notification.
      const status = await this.status(userId, orderId);
      if (status.purchase?.status === "pending") throw new BillingError("purchase_check_unavailable", 503);
      return status;
    }
    return this.status(userId, orderId);
  }

  private observeCustomer(userId: string, provider: MonthlyProvider, target: Target, event?: { id: string; digest: string }): Promise<"duplicate" | "processed">;
  private observeCustomer(userId: string, provider: MonthlyProvider, target: WebhookObservationHint, event: { id: string; digest: string }): Promise<"duplicate" | "processed" | undefined>;
  private async observeCustomer(userId: string, provider: MonthlyProvider, target: Target | WebhookObservationHint, event?: { id: string; digest: string }) {
    const hinted = "prepare" in target;
    const { customerId } = target;
    const revision = (a: Account) => JSON.stringify([a.events, a.signups, a.contracts, a.invoices, a.payments, a.renewalStopJobs, a.trialEndJobs]);
    const alreadyProcessed = (a: Account) => {
      if (a.customer?.id !== customerId) problem("customer_conflict");
      assertPolicyReady(a);
      if (!event || !a.events[event.id]) return false;
      if (!sameEventDigest(a.events[event.id], event.digest)) throw new BillingError("event_conflict", 400);
      return true;
    };
    let result: "duplicate" | "processed" | undefined;
    for (let attempt = 0; attempt < 4 && !result; attempt++) {
      const before = await this.tx(userId, async a => {
        if (hinted) {
          // A guessed account cannot decide an ownership, policy or digest error.
          if (a.customer?.id !== customerId || needsPolicyReview(a) || event && a.events[event.id]) return undefined;
        } else if (alreadyProcessed(a)) return null;
        return revision(a);
      }, true).catch(error => {
        // The candidate can disappear or fail the store's account identity check.
        // Database failures remain retryable.
        if (hinted && error instanceof BillingError
          && (error.code === "sign_in_required" || error.code === "subscription_account_mismatch")) return undefined;
        throw error;
      });
      if (before === undefined) return undefined;
      if (before === null) { result = "duplicate"; break; }
      let observation: Observation;
      if (hinted) {
        const prepared = await target.prepare();
        if (prepared.target.customerId !== customerId) return undefined;
        observation = await prepared.observe();
      } else observation = await provider.observe(target);
      result = await this.tx(userId, async a => {
        if (alreadyProcessed(a)) return "duplicate";
        // Re-fetch after a concurrent commit so an old Stripe response cannot
        // overwrite a newer contract snapshot.
        if (revision(a) !== before) return undefined;
        return this.applyObservation(a, observation, customerId, event);
      });
    }
    if (!result) problem("subscription_observation_conflict");
    return result;
  }
  private async applyObservation(a: Account, observation: Observation, customerId: string, event?: { id: string; digest: string }) {
    for (const current of observation.contracts) {
      const signup = a.signups[current.signupId];
      if (!signup || current.sourceInstance !== a.sourceInstance || current.customerId !== customerId
        || current.terms !== signup.terms || current.amount !== signup.amount || current.priceId !== signup.priceId
        || signup.subscriptionId && signup.subscriptionId !== current.id
        || current.examCancelAt !== undefined && current.examCancelAt !== signup.examEndAt) problem("subscription_owner_mismatch");
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
          a.contracts[current.id].trialRevoked = true; (a.trialEndJobs ??= {})[current.id] ??= event?.id ?? `reconcile-${current.id}`;
        } else (a.trialCards ??= {})[trialCard] ??= current.id;
      }
      signup.subscriptionId = current.id; signup.state = "attached";
      if (!current.memberEnding && signup.examEndAt && terminal(current.status) && (current.examCancelAt || !signup.examEndApplied)) signup.examEndEnforced = true;
      if (current.memberEnding || current.examCancelAt !== undefined || signup.examEndAt && terminal(current.status)) signup.examEndApplied = true;
      if (terminal(current.status) && a.trialEndJobs) delete a.trialEndJobs[current.id];
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
      const partialExamCycle = sub && invoice.examFinalCycle && invoice.periodEnd === a.signups[sub.signupId]?.examEndAt
        && invoice.amount > 0 && invoice.amount < sub.amount;
      if (!sub || invoice.customerId !== customerId || invoice.priceId !== sub.priceId || invoice.amount !== sub.amount && !partialExamCycle
        || invoice.periodStart >= invoice.periodEnd) problem("invoice_owner_mismatch");
      const old = a.invoices[invoice.id];
      const signup = a.signups[sub.signupId];
      if (old && (old.subscriptionId !== invoice.subscriptionId || old.amount !== invoice.amount
        || old.periodStart !== invoice.periodStart || old.periodEnd !== invoice.periodEnd)) problem("invoice_identity_conflict");
      const canonical = (value: Invoice) => JSON.stringify([...value.payments].sort((a, b) => a.id.localeCompare(b.id)).map(p => [p.id, p.paymentId, p.amount]));
      const sameDebit = (left: Invoice["carryover"], right: Invoice["carryover"]) =>
        left?.amount === right?.amount && left?.transactionId === right?.transactionId;
      if (old?.paid && invoice.paid && (canonical(old) !== canonical(invoice) || old.customerCredit !== invoice.customerCredit
        || !sameDebit(old.deferredDebit, invoice.deferredDebit) || !sameDebit(old.carryover, invoice.carryover)
        || !!(old.examWriteOff || old.deferredBalance) !== !!invoice.examWriteOff))
        problem("invoice_allocation_changed");
      if (invoice.examWriteOff) {
        if (!partialExamCycle || !invoice.paid || invoice.payments.length || invoice.amount >= stripeMinimumYenCharge)
          problem("unsupported_invoice_balance");
      }
      if (partialExamCycle && invoice.amount < stripeMinimumYenCharge &&
        (invoice.examWriteOff && !old?.examWriteOff || !invoice.paid && !invoice.examWaived && !old?.paid && terminal(sub.status))) {
        const jobs = signup.examWriteOffJobs ??= [];
        if (!jobs.includes(invoice.id)) jobs.push(invoice.id);
      }
      if (invoice.deferredDebit && (!invoice.paid || !invoice.customerCredit || invoice.carryover || invoice.examWriteOff
        || invoice.deferredDebit.amount < 1 || invoice.deferredDebit.amount >= stripeMinimumYenCharge || invoiceCashDue(invoice) !== 0))
        problem("unsupported_invoice_balance");
      if (invoice.paid && !invoice.examWriteOff && (invoice.payments.reduce((sum, p) => sum + p.amount, 0) !== invoiceCashDue(invoice)
        || invoice.payments.some(p => !a.payments[p.paymentId]))) problem("invoice_payment_missing");
      // A later failure event cannot erase a previously verified paid invoice.
      a.invoices[invoice.id] = old?.paid && !invoice.paid ? old : invoice;
    }
    const debits = new Map(Object.values(a.invoices).filter(i => i.deferredDebit).map(i => [i.deferredDebit!.transactionId, i]));
    const collectedDebits = new Set<string>();
    for (const invoice of Object.values(a.invoices)) {
      if (!invoice.carryover || !invoice.paid) continue;
      const { transactionId, amount } = invoice.carryover;
      const origin = debits.get(transactionId);
      const legacy = !origin && Object.values(a.invoices).some(i => i.deferredBalance === transactionId);
      if (collectedDebits.has(transactionId) || !legacy && (!origin || origin.subscriptionId !== invoice.subscriptionId
        || origin.periodEnd > invoice.periodStart || origin.deferredDebit?.amount !== amount)) problem("unsupported_invoice_balance");
      collectedDebits.add(transactionId);
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
      const signup = a.signups[sub.signupId];
      const cutoff = sub.memberEnding ? examAccessEnd(a, sub) : signup?.examEndEnforced ? signup.examEndAt ?? Infinity : examAccessEnd(a, sub);
      if (signup && cutoff !== Infinity) {
        for (const invoice of invoices) {
          if (invoice.paid && invoice.payments.length && invoice.periodStart >= cutoff && !fullyRefunded(a, invoice))
            (signup.examChargeReviews ??= {})[invoice.id] ??= "pending";
        }
      }
      const disputed = invoices.some(i => i.payments.some(p => Object.values(a.payments[p.paymentId]?.disputes ?? {}).some(d => d !== "won")));
      if (disputed) { sub.renewalBlocked = true; sub.renewalBlockReason = "dispute"; }
      if (sub.renewalBlocked && !terminal(sub.status) && !sub.cancelAtPeriodEnd) {
        a.renewalStopJobs[sub.id] ??= { token: event?.id ?? `reconcile-${sub.id}`, reason: "dispute" };
      } else if (terminal(sub.status) || sub.cancelAtPeriodEnd) delete a.renewalStopJobs[sub.id];
    }
    if (event) a.events[event.id] = event.digest;
    return "processed" as const;
  }

  async flushTrialEnds(userId: string, provider: MonthlyProvider) {
    const jobs = await this.tx(userId, async a => structuredClone(a.trialEndJobs ?? {}), true);
    for (const [subId, token] of Object.entries(jobs)) {
      await provider.endTrial(subId, token);
      await this.tx(userId, async a => { if (a.trialEndJobs?.[subId] === token) delete a.trialEndJobs[subId]; });
    }
  }
  private async flushExamEnds(userId: string, provider: MonthlyProvider, overdue: boolean) {
    const pending = await this.tx(userId, async a => Object.values(a.contracts).flatMap(sub => {
      const signup = a.signups[sub.signupId];
      if (!signup || terminal(sub.status)) return [];
      if (sub.memberEnding) return overdue && sub.memberEnding.kind === "exam" && examAccessEnd(a, sub) <= this.clock().getTime() / 1000 ? [signup.id] : [];
      return signup.examEndAt && !signup.examEndApplied
        && overdue === (signup.examEndAt <= this.clock().getTime() / 1000)
        && (overdue || !sub.renewalBlocked && !sub.cancelAtPeriodEnd) ? [signup.id] : [];
    }), true);
    for (const signupId of pending) await this.reconcileExamEnd(userId, signupId, provider);
  }

  private async flushExamChargeReviews(userId: string, onlyOrder?: string) {
    if (!this.reviewExamCharge) return;
    const notify = this.reviewExamCharge;
    const orders = await this.tx(userId, async a => Object.values(a.signups).filter(s => !onlyOrder || onlyOrder === s.id)
      .flatMap(s => Object.entries(s.examChargeReviews ?? {}).filter(([, state]) => state === "pending")
        .map(([id]) => ({ order: s.id, id, refunded: !!a.invoices[id] && fullyRefunded(a, a.invoices[id]) }))), true);
    for (const { order, id, refunded } of orders) {
      if (refunded || await notify(order, id)) {
        await this.tx(userId, async a => { a.signups[order].examChargeReviews![id] = "notified"; });
      }
    }
  }

  private async flushExamWriteOffs(userId: string, provider: MonthlyProvider, onlyOrder?: string) {
    if (!provider.clearSmallExamBalance) return;
    const jobs = await this.tx(userId, async a => Object.values(a.signups).filter(s => !onlyOrder || onlyOrder === s.id)
      .flatMap(s => (s.examWriteOffJobs ?? []).map(id => ({ order: s.id, invoice: a.invoices[id] }))), true);
    for (const { order, invoice } of jobs) {
      try {
        await provider.clearSmallExamBalance(invoice.customerId, invoice);
        await this.tx(userId, async a => {
          const signup = a.signups[order];
          signup.examWriteOffJobs = signup.examWriteOffJobs?.filter(id => id !== invoice.id);
        });
      } catch {
        console.warn("billing_exam_writeoff_pending", { orderId: order, invoiceId: invoice?.id });
        await this.reviewPurchase?.(order, "exam_writeoff").catch(() => {});
      }
    }
  }

  async runExamEndCheck(userId: string, orderId: string, provider: MonthlyProvider, readAppStoreStatus: ReadAppStorePurchaseStatus) {
    const now = Math.floor(this.clock().getTime() / 1000);
    const claimed = await this.tx(userId, async a => {
      const s = a.signups[orderId];
      await this.stopAppStoreOverlap(a, s, provider, readAppStoreStatus);
      if (!s || (s.examEndCheckAt ?? 0) > now) return false;
      s.examEndCheckAt = now + 600;
      return true;
    });
    if (!claimed) return;
    const result = await this.reconcileExamEnd(userId, orderId, provider);
    await this.flushExamChargeReviews(userId, orderId);
    await this.tx(userId, async a => {
      const s = a.signups[orderId];
      if (s?.examEndCheckAt === now + 600) {
        const sub = s.subscriptionId ? a.contracts[s.subscriptionId] : undefined;
        const examEnd = sub?.memberEnding?.kind === "exam" ? sub.memberEnding.at : s.examEndAt;
        s.examEndCheckAt = Math.min(now + 2700, examEnd && examEnd > now ? examEnd : Infinity);
      }
    });
    if (result === "conflict") problem("exam_end_conflict");
  }

  async reconcileExamEnd(userId: string, signupId: string, provider: MonthlyProvider) {
    const { signup, customerId, contract } = await this.tx(userId, async a => {
      assertPolicyReady(a);
      const signup = a.signups[signupId];
      return { signup, customerId: a.customer?.id, contract: signup?.subscriptionId ? a.contracts[signup.subscriptionId] : undefined };
    }, true);
    if (!signup || !customerId) return;
    const now = this.clock().getTime() / 1000;
    if (contract?.memberEnding) {
      if (contract.memberEnding.kind === "exam" && contract.memberEnding.at <= now && !terminal(contract.status)) {
        const end = provider.endMemberExam?.bind(provider);
        if (!end) problem("exam_end_unavailable");
        await this.tx(userId, async () => end(contract.id, customerId, signup, this.clock().getTime() / 1000), true);
        await this.observeCustomer(userId, provider, { customerId, subscriptionIds: [contract.id], invoiceIds: [] });
      }
      await this.flushExamWriteOffs(userId, provider, signupId);
      await this.flushExamChargeReviews(userId, signupId);
      return;
    }
    if (!signup.examEndAt) return;
    if (contract && terminal(contract.status)) {
      if (signup.examEndAt <= now && (signup.examEndEnforced || contract.examCancelAt)) {
        try {
          await this.observeCustomer(userId, provider, { customerId, subscriptionIds: [contract.id], invoiceIds: [] });
          await this.tx(userId, async a => { a.signups[signupId].examFinalChecked = true; });
        } catch (error) {
          await this.reviewPurchase?.(signupId, "exam_writeoff").catch(() => {});
          throw error;
        }
      }
      await this.flushExamWriteOffs(userId, provider, signupId);
      return;
    }
    if (signup.examEndApplied && (signup.examEndAt > now || !contract?.examCancelAt)) return;
    const session = signup.subscriptionId ? null : await provider.checkoutSession(customerId, signup);
    const subscriptionId = signup.subscriptionId ?? (session?.status === "complete" ? session.subscriptionId : undefined);
    if (!subscriptionId) {
      const expired = Math.min(signup.examEndAt, Date.parse(signup.createdAt) / 1000 + staleSignupMs / 1000) <= now;
      if (session?.status === "open" && expired) {
        await provider.expireCheckout(session.id);
        await this.closeSignup(userId, signupId, session.id);
        return;
      }
      if (session?.status === "expired" || !session && expired && !signup.sessionId) await this.closeSignup(userId, signupId, session?.id ?? null);
      if (!session && expired && signup.sessionId) problem("checkout_conflict");
      return;
    }
    if (!provider.scheduleExamEnd) problem("exam_end_unavailable");
    const target = { customerId, subscriptionIds: [subscriptionId], invoiceIds: [], ...(session ? { sessionId: session.id } : {}) };
    // Before a future cancellation, enforce trial/dispute rules using verified payment facts.
    if (!contract && signup.examEndAt > now) {
      await this.observeCustomer(userId, provider, target);
      await this.flushRenewalStops(userId, provider);
      await this.flushTrialEnds(userId, provider);
    }
    const stillScheduled = signup.examEndApplied && await this.observeCustomer(userId, provider, target).then(() =>
      this.tx(userId, async a => {
        const current = a.contracts[subscriptionId];
        return current && !terminal(current.status) && current.examCancelAt === signup.examEndAt;
      }, true));
    if (!signup.examEndApplied || stillScheduled) {
      const schedule = provider.scheduleExamEnd.bind(provider);
      const result = await this.tx(userId, async () => schedule(subscriptionId, customerId, signup, now), true);
      if (result === "conflict") {
        console.warn("billing_exam_end_conflict", { orderId: signupId });
        return "conflict" as const;
      }
      if (result === "ended" && signup.examEndAt <= now) await this.tx(userId, async a => {
        a.signups[signupId].examEndEnforced = true;
      });
    }
    if (!signup.examEndApplied || stillScheduled) await this.observeCustomer(userId, provider, target);
    await this.flushExamWriteOffs(userId, provider, signupId);
    await this.flushExamChargeReviews(userId, signupId);
  }

  async recoverElapsedExamEnds(userId: string, provider: MonthlyProvider, includeVerifiedMembers = false) {
    const now = this.clock().getTime() / 1000;
    const elapsedOrders = (a: Account) => {
      const endAt = (s: Signup) => {
        const sub = s.subscriptionId ? a.contracts[s.subscriptionId] : undefined;
        if (!sub?.memberEnding) return s.examEndAt ?? Infinity;
        return sub.memberEnding.kind === "exam" ? sub.memberEnding.at : Infinity;
      };
      const orders = Object.values(a.signups).filter(s => endAt(s) <= now)
        .sort((left, right) => endAt(right) - endAt(left));
      let checkedLatest = false;
      return orders.filter(signup => {
        if (signup.state === "pending") return !!signup.sessionId;
        const sub = signup.subscriptionId ? a.contracts[signup.subscriptionId] : undefined;
        if (!sub) return false;
        if (sub.memberEnding) return sub.memberEnding.kind === "exam" && !sub.cancelAtPeriodEnd && !terminal(sub.status);
        if (!terminal(sub.status)) return !signup.examEndApplied || !!sub.examCancelAt;
        if (!signup.examEndEnforced && !sub.examCancelAt) return false;
        const check = includeVerifiedMembers && !checkedLatest || !signup.examFinalChecked || !!signup.examWriteOffJobs?.length;
        checkedLatest = true;
        return check;
      }).map(signup => ({ userId: a.userId, orderId: signup.id }));
    };
    const orders = includeVerifiedMembers
      ? await this.purchaseTx(userId, (owner, members, verified) => members
        .filter(member => member === owner || verified?.has(userId) && verified.has(member.userId))
        .flatMap(elapsedOrders))
      : await this.tx(userId, async a => elapsedOrders(a), true);
    for (const order of orders) await this.reconcileExamEnd(order.userId, order.orderId, provider);
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
      const sub = signup?.subscriptionId ? a.contracts[signup.subscriptionId] : orderId ? undefined
        : (paid ? a.contracts[paid.subscriptionId] : undefined) ?? Object.values(a.contracts).find(c => !terminal(c.status));
      const activeSignup = sub && a.signups[sub.signupId];
      const cutoff = sub ? examAccessEnd(a, sub) : Infinity;
      const examDate = cutoff === Infinity ? null : examDateBeforeEnd(cutoff);
      const periodEnd = sub ? new Date(sub.periodEnd * 1000).toISOString() : null;
      const management: SubscriptionManagement | null = sub && activeSignup && periodEnd
        && ["active", "trialing", "past_due"].includes(sub.status) && Math.min(sub.periodEnd, cutoff) > this.clock().getTime() / 1000
        ? { orderId: activeSignup.id, periodEnd, examDate, cancelAtPeriodEnd: sub.cancelAtPeriodEnd && !examDate } : null;
      const current = sub ? Object.values(a.invoices).filter(i => i.subscriptionId === sub.id && within(i.periodStart, i.periodEnd, this.clock().getTime() / 1000)) : [];
      const refunded = current.some(i => fullyRefunded(a, i));
      const suspended = !!sub && (disputeHold(a, sub.id) || current.some(i => held(a, i)));
      const purchaseStatus = signup?.state === "expired" || signup?.state === "failed" ? "expired" : sub && paid?.subscriptionId === sub.id ? "paid"
        : refunded ? "refunded" : suspended ? "suspended" : sub && terminal(sub.status) ? "expired" : "pending";
      return { billingModel: "subscription" as const, entitled: !!paid, transition: false, expiresAt: paid ? new Date(paid.periodEnd * 1000).toISOString() : null,
        trialDays: firstContract(a) ? this.config.trialDays : 0,
        examPlan: paid?.subscriptionId === sub?.id && activeSignup?.exam && examDate
          ? { exam: activeSignup.exam, examDate, selectedAt: activeSignup.createdAt } : null,
        management,
        subscription: sub ? { status: sub.status, cancelAtPeriodEnd: sub.cancelAtPeriodEnd, renewalBlocked: sub.renewalBlocked,
          periodEnd: new Date(sub.periodEnd * 1000).toISOString(),
          ...(sub.memberEnding?.kind === "exam" && examDate || sub.examCancelAt ? { examCancelAt: new Date(cutoff * 1000).toISOString() } : {}) } : null,
        canManage: !!a.customer?.id,
        purchase: signup ? { id: signup.id, status: purchaseStatus,
          ...(signup.returnTo && Date.parse(signup.createdAt) + 48 * 3600000 > this.clock().getTime() ? { returnTo: safeQuizReturn(signup.returnTo) } : {}),
          ...(signup.examEndAt && !signup.examEndApplied ? { examEndPending: true as const } : {}),
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
      if (grants.length >= this.config.freeDaily) return { kind: "limit" as const, grants };
      a.grants[day] = [...grants, questionId];
      return { kind: "trial" as const, remaining: Math.max(0, this.config.freeDaily - a.grants[day].length) };
    });
    if (result.kind === "limit") throw new DailyLimitError(result.grants);
    if (result.kind === "unavailable") throw new BillingError("billing_unavailable", 503);
    return result;
  }
}
