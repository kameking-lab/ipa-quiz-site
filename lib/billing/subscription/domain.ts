import type { BillingMode, RefundState } from "../domain";

export type Realm = Exclude<BillingMode, "mock">;
export type ContractStatus = "incomplete" | "incomplete_expired" | "trialing" | "active" | "past_due" | "unpaid" | "canceled" | "paused";
export interface MonthlyConfig {
  mode: Realm; sourceInstance: string; origin: string; enabled: boolean;
  priceId: string; priceYen: number; freeDaily: number; portalConfigurationId: string;
  termsVersion: string; seller: { name: string; address: string; phone: string; support: string; refund: string };
}
export interface Signup {
  id: string; createdAt: string; terms: string; amount: number; priceId: string;
  state: "pending" | "expired" | "attached"; sessionId: string | null; url: string | null; subscriptionId: string | null;
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
}
export interface MonthlyStore {
  owner(customerId: string, mode: Realm): Promise<string | null>;
  transaction<T>(userId: string, mode: Realm, sourceInstance: string, fn: (account: Account) => Promise<T>, readOnly?: boolean): Promise<T>;
}
export interface Target { customerId: string; subscriptionIds: string[]; invoiceIds: string[]; sessionId?: string;
  /** A verified refund/PI may be stored before its paid invoice allocation is visible. */
  unallocatedRefund?: true;
  risk?: { kind: "refund" | "dispute"; id: string; paymentId: string; signed?: { amount?: number; state: string } };
}
export interface Observation {
  contracts: (Omit<Contract, "renewalBlocked" | "renewalBlockReason"> & { sourceInstance: string; terms: string })[];
  invoices: Invoice[]; payments: Payment[];
  session?: { id: string; signupId: string; customerId: string; terms: string; state: "open" | "complete" | "expired"; subscriptionId: string | null };
}
export interface MonthlyProvider {
  customer(attemptId: string): Promise<string>;
  checkout(customerId: string, signup: Signup): Promise<{ id: string; url: string }>;
  portal(customerId: string, configurationId: string): Promise<string>;
  resolve(event: unknown): Promise<Target | null>;
  observe(target: Target): Promise<Observation>;
  stopRenewal(subscriptionId: string, eventId: string): Promise<void>;
}
export const terminal = (status: ContractStatus) => status === "canceled" || status === "incomplete_expired";
export const emptyAccount = (userId: string, mode: Realm, sourceInstance: string): Account => ({
  userId, mode, sourceInstance, customer: null, signups: {}, contracts: {}, invoices: {}, payments: {}, renewalStopJobs: {}, events: {}, grants: {},
});
