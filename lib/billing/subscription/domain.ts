import type { BillingMode, RefundState } from "../domain";

export type Realm = Exclude<BillingMode, "mock">;
export type ContractStatus = "incomplete" | "incomplete_expired" | "trialing" | "active" | "past_due" | "unpaid" | "canceled" | "paused";
export interface MonthlyConfig {
  mode: Realm; sourceInstance: string; origin: string; enabled: boolean;
  priceId: string; priceYen: number; freeDaily: number; portalConfigurationId: string;
  /** Free days on the first contract of an account; 0 disables the trial. */
  trialDays: number;
  termsVersion: string; seller: { name: string; address: string; phone: string; support: string; refund: string };
}
export interface Signup {
  id: string; createdAt: string; terms: string; amount: number; priceId: string;
  state: "pending" | "expired" | "attached"; sessionId: string | null; url: string | null; subscriptionId: string | null;
  /** Trial offered with this signup (first contract only). Missing on older signups = no trial. */
  trialDays?: number;
}
export interface Contract {
  id: string; customerId: string; signupId: string; priceId: string; amount: number;
  /** Missing subscription defaults are unknown; only independently verified paid invoices grant access. */
  subscriptionTaxState?: "unknown";
  status: ContractStatus; periodStart: number; periodEnd: number; cancelAtPeriodEnd: boolean;
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
  /** Paid allocations, not an assumption that a PaymentIntent belongs to exactly one invoice. */
  payments: { id: string; paymentId: string; amount: number }[];
}
export interface Account {
  userId: string; mode: Realm; sourceInstance: string;
  customer: { attemptId: string; createdAt: string; id: string | null } | null;
  signups: Record<string, Signup>; contracts: Record<string, Contract>;
  invoices: Record<string, Invoice>; payments: Record<string, Payment>;
  renewalStopJobs: Record<string, { token: string; reason?: "dispute" }>;
  events: Record<string, string>; grants: Record<string, string[]>;
  /** StoreKit may still be completing a purchase that RevenueCat cannot see yet. */
  appStorePurchase?: { id: string; expiresAt: string };
  /** Hashed card fingerprints that started a free trial on this account -> subscription. Missing on older accounts. */
  trialCards?: Record<string, string>;
  /** Trials to end at Stripe because the card was already used for a trial (subscription -> event token). */
  trialEndJobs?: Record<string, string>;
}
export interface MonthlyStore {
  owner(customerId: string, mode: Realm): Promise<string | null>;
  transaction<T>(userId: string, mode: Realm, sourceInstance: string, fn: (account: Account) => Promise<T>, readOnly?: boolean): Promise<T>;
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
  checkoutSession(customerId: string, signup: Signup): Promise<{ id: string; status: "open" | "complete" | "expired" } | null>;
  /** Close an unpaid Checkout session; rejects with subscription_exists if it was completed. */
  expireCheckout(sessionId: string): Promise<void>;
  portal(customerId: string, configurationId: string): Promise<string>;
  resolve(event: unknown): Promise<Target | null>;
  observe(target: Target): Promise<Observation>;
  stopRenewal(subscriptionId: string, eventId: string): Promise<void>;
  /** End a trial now so Stripe charges the first month immediately. */
  endTrial(subscriptionId: string, eventId: string): Promise<void>;
}
export const terminal = (status: ContractStatus) => status === "canceled" || status === "incomplete_expired";
export const emptyAccount = (userId: string, mode: Realm, sourceInstance: string): Account => ({
  userId, mode, sourceInstance, customer: null, signups: {}, contracts: {}, invoices: {}, payments: {}, renewalStopJobs: {}, events: {}, grants: {},
});
