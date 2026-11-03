import type { FinanceObservation, FinanceOrder } from "./finance";

export type BillingMode = "mock" | "stripe-test" | "stripe-live";
export type RefundState = "pending" | "succeeded" | "failed" | "canceled";
export interface Purchase {
  id: string; userId: string; mode: BillingMode; createdAt: string;
  amount: number; days: number; termsHash: string;
  status: "pending" | "paid" | "failed" | "expired" | "refunded" | "suspended";
  sessionId: string | null; checkoutUrl: string | null; paymentId: string | null;
  activatedAt: string | null; expiresAt: string | null;
  refunds?: Record<string, RefundState>;
  disputeHold?: boolean;
  legacyRevocationUnresolved?: boolean;
}
export interface Identity { id: string; createdAt: string }
export interface PaymentSnapshot {
  eventId: string; digest: string; orderId: string; userId: string; mode: BillingMode;
  sessionId: string | null; paymentId: string | null;
  amount: number; currency: string; termsHash: string;
  state: "paid" | "pending" | "failed" | "expired" | "refunded" | "suspended";
  refund?: { id: string; state: RefundState };
  finance?: FinanceObservation;
}
export interface Transaction {
  user(): Promise<Identity | null>;
  purchases(): Promise<Purchase[]>;
  save(purchase: Purchase): Promise<void>;
  event(id: string): Promise<{ digest: string; orderId: string } | null>;
  recordEvent(id: string, digest: string, orderId: string): Promise<void>;
  finance(orderId: string): Promise<FinanceOrder | null>;
  saveFinance(facts: FinanceOrder): Promise<void>;
  grants(day: string): Promise<string[]>;
  grant(day: string, questionId: string): Promise<void>;
}
export interface BillingStore {
  transaction<T>(userId: string, mode: BillingMode, fn: (tx: Transaction) => Promise<T>): Promise<T>;
  findOrder(id: string, mode: BillingMode): Promise<Purchase | null>;
}
export interface CheckoutProvider {
  create(p: Purchase): Promise<{ id: string; url: string }>;
}
export class BillingError extends Error {
  constructor(public code: string, public status = 409) { super(code); }
}
export function active(p: Purchase, now: Date) {
  return p.status === "paid" && !!p.activatedAt && !!p.expiresAt
    && Date.parse(p.activatedAt) <= now.getTime() && now.getTime() < Date.parse(p.expiresAt);
}
export function jstDay(now: Date) { return new Date(now.getTime() + 9 * 3600000).toISOString().slice(0, 10); }
