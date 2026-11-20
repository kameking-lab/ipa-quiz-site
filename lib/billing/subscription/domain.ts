import type { BillingMode, RefundState } from "../domain";

export type Realm = Exclude<BillingMode, "mock">;
export const stripeMinimumYenCharge = 50;
export type ContractStatus = "incomplete" | "incomplete_expired" | "trialing" | "active" | "past_due" | "unpaid" | "canceled" | "paused";
export type EndingChange = { kind: "cancel" | "renew" } | { kind: "exam"; at: number };
export type MemberEnding = { kind: "cancel"; at: number } | { kind: "renew" } | { kind: "exam"; at: number; renewalEnd: number };
export interface SubscriptionManagement {
  orderId: string;
  periodEnd: string;
  examDate: string | null;
  cancelAtPeriodEnd: boolean;
}
export interface MonthlyConfig {
  mode: Realm; sourceInstance: string; origin: string; enabled: boolean;
  priceId: string; priceYen: number; freeDaily: number; portalConfigurationId: string;
  /** Free days on the first contract of an account; 0 disables the trial. */
  trialDays: number;
  termsVersion: string; seller: { name: string; address: string; phone: string; support: string; refund: string };
}
export interface Signup {
  id: string; createdAt: string; terms: string; amount: number; priceId: string;
  state: "pending" | "expired" | "failed" | "attached"; sessionId: string | null; url: string | null; subscriptionId: string | null;
  /** Time allowed for the request that is preparing this Checkout URL. */
  preparingUntil?: string;
  /** Trial offered with this signup (first contract only). Missing on older signups = no trial. */
  trialDays?: number;
  examEndAt?: number;
  exam?: string;
  returnTo?: string;
  examEndApplied?: true;
  examEndEnforced?: true;
  /** Next scheduled retry, including the lease held by an in-flight cron run. */
  examEndCheckAt?: number;
  /** Invoice IDs awaiting the existing manual refund review. */
  examChargeReviews?: Record<string, "pending" | "notified">;
  examWriteOffJobs?: string[];
  examFinalChecked?: true;
  /** Verified overlap retained for billing review after renewal is resolved. */
  appStoreOverlap?: { appStoreUserId: string; detectedAt: string; renewal: "pending" | "stopped" | "already_ending" | "discarded"; renewalAttempt?: number };
}
export interface Contract {
  id: string; customerId: string; signupId: string; priceId: string; amount: number;
  /** Missing subscription defaults are unknown; only independently verified paid invoices grant access. */
  subscriptionTaxState?: "unknown";
  status: ContractStatus; periodStart: number; periodEnd: number; cancelAtPeriodEnd: boolean;
  examCancelAt?: number;
  memberEnding?: MemberEnding;
  /** A dispute decision never silently resumes renewal when it later clears. */
  renewalBlocked: boolean;
  /** Missing on legacy flags: requires explicit reconciliation before provider writes. */
  renewalBlockReason?: "dispute";
  /** The card already had a free trial on another account: no trial access, the trial is ended at Stripe. */
  trialRevoked?: true;
}
export interface Refund { id: string; amount: number; state: RefundState }
export interface Payment {
  id: string; customerId: string; amount: number; refunds: Record<string, Refund>;
  disputes: Record<string, "open" | "won" | "lost">;
}
export interface Invoice {
  id: string; subscriptionId: string; customerId: string; priceId: string;
  periodStart: number; periodEnd: number; amount: number; paid: boolean;
  examFinalCycle?: true;
  /** Legacy observations saved before automatic write-off. */
  deferredBalance?: string;
  /** Verified invoice balance debit left for a later invoice. */
  deferredDebit?: { transactionId: string; amount: number };
  /** An earlier invoice balance debit applied to this invoice. */
  carryover?: { transactionId: string; amount: number };
  /** A sub-minimum final exam invoice with no card payment. */
  examWriteOff?: true;
  examWaived?: true;
  /** Customer credit verified on this invoice. Cash allocations exclude this amount. */
  customerCredit?: number;
  /** Paid allocations, not an assumption that a PaymentIntent belongs to exactly one invoice. */
  payments: { id: string; paymentId: string; amount: number }[];
}
export const invoiceCashDue = (invoice: Invoice) => invoice.amount + (invoice.carryover?.amount ?? 0)
  - (invoice.customerCredit ?? 0) - (invoice.deferredDebit?.amount ?? 0);
export interface AppStorePurchase {
  id: string; expiresAt: string; attemptId?: string;
  /** Older reservations have no phase. Treat them as potentially presented to StoreKit. */
  phase?: "preparing" | "closing_checkout" | "ready" | "uncertain" | "approval";
  checkedMemberIds?: string[];
  startedAt?: string;
}
export type AppStorePurchaseState = "active" | "processing" | null;
export type AppStorePurchaseHold = "processing" | { approval: { reservationId: string } } | null;
export type AppStoreRecovery = { reservationId: string; action?: "approval" } | { attemptId: string } | { expiresAt: string } | { legacy: true };
export interface Account {
  userId: string; mode: Realm; sourceInstance: string;
  customer: { attemptId: string; createdAt: string; id: string | null } | null;
  signups: Record<string, Signup>; contracts: Record<string, Contract>;
  invoices: Record<string, Invoice>; payments: Record<string, Payment>;
  renewalStopJobs: Record<string, { token: string; reason?: "dispute" }>;
  events: Record<string, string>; grants: Record<string, string[]>;
  /** Next time the contract page may check an unconfirmed Web renewal. */
  renewalRecoveryAt?: number;
  /** StoreKit may still be completing a purchase that RevenueCat cannot see yet. */
  appStorePurchase?: AppStorePurchase;
  /** A recovery request may reach the lock before the POST for the same attempt. */
  abandonedAppStoreAttempts?: Record<string, number>;
  /** Hashed card fingerprints that started a free trial on this account -> subscription. Missing on older accounts. */
  trialCards?: Record<string, string>;
  /** Trials to end at Stripe because the card was already used for a trial (subscription -> event token). */
  trialEndJobs?: Record<string, string>;
}
export interface MonthlyStore {
  owner(customerId: string, mode: Realm): Promise<string | null>;
  transaction<T>(userId: string, mode: Realm, sourceInstance: string, fn: (account: Account) => Promise<T>, readOnly?: boolean): Promise<T>;
  purchaseTransaction<T>(userId: string, mode: Realm, sourceInstance: string, fn: (account: Account, members: Account[], verifiedMembers?: ReadonlySet<string>) => T | Promise<T>): Promise<T>;
  /** Another account (if any) that already started a free trial with this hashed card. */
  trialCardOwner(cardHash: string, mode: Realm, exceptUserId: string): Promise<string | null>;
}
export interface Target { customerId: string; subscriptionIds: string[]; invoiceIds: string[]; sessionId?: string;
  /** A verified refund/PI may be stored before its paid invoice allocation is visible. */
  unallocatedRefund?: true;
  risk?: { kind: "refund" | "dispute"; id: string; paymentId: string; signed?: { amount?: number; state: string } };
}
export interface Observation {
  contracts: (Omit<Contract, "renewalBlocked" | "renewalBlockReason" | "trialRevoked"> & { sourceInstance: string; terms: string;
    /** Hashed fingerprint of the trial's card; null when Stripe shows no card. Only on trialing contracts. */
    trialCard?: string | null })[];
  invoices: Invoice[]; payments: Payment[];
  session?: { id: string; signupId: string; customerId: string; terms: string; state: "open" | "complete" | "expired"; subscriptionId: string | null };
}
export interface MonthlyProvider {
  customer(attemptId: string): Promise<string>;
  checkout(customerId: string, signup: Signup, email?: string): Promise<{ id: string; url: string }>;
  checkoutSession(customerId: string, signup: Signup): Promise<{ id: string; status: "open" | "complete" | "expired"; subscriptionId?: string } | null>;
  /** Close an unpaid Checkout session; rejects with subscription_exists if it was completed. */
  expireCheckout(sessionId: string): Promise<void>;
  portal(customerId: string, configurationId: string): Promise<string>;
  resolve(event: unknown): Promise<Target | null>;
  observe(target: Target): Promise<Observation>;
  clearSmallExamBalance?(customerId: string, invoice: Invoice): Promise<void>;
  stopRenewal(subscriptionId: string, eventId: string): Promise<void>;
  /** Stop an overlapping Web contract at period end, returning the scheduled cutoff, if changed. */
  stopAppStoreOverlapRenewal?(subscriptionId: string, customerId: string, signup: Signup): Promise<number | null>;
  scheduleExamEnd?(subscriptionId: string, customerId: string, signup: Signup, now: number): Promise<"scheduled" | "ended" | "conflict" | "superseded">;
  changeEnding?(subscriptionId: string, customerId: string, signup: Signup, change: EndingChange, now: number, beforeExtension?: () => Promise<void>): Promise<void>;
  endMemberExam?(subscriptionId: string, customerId: string, signup: Signup, now: number): Promise<void>;
  /** End a trial now so Stripe charges the first month immediately. */
  endTrial(subscriptionId: string, eventId: string): Promise<void>;
}
export const terminal = (status: ContractStatus) => status === "canceled" || status === "incomplete_expired";
export const emptyAccount = (userId: string, mode: Realm, sourceInstance: string): Account => ({
  userId, mode, sourceInstance, customer: null, signups: {}, contracts: {}, invoices: {}, payments: {}, renewalStopJobs: {}, events: {}, grants: {},
});
