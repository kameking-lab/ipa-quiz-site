import "server-only";
import { isDeepStrictEqual } from "node:util";
import { BillingError, type BillingMode, type PaymentSnapshot, type Purchase, type RefundState } from "./domain";

export type SuccessTime = { at: null; provenance: { kind: "unknown" } } | {
  at: string;
  provenance: { kind: "stripe_success_event_created"; eventId: string; eventType: string; providerCreatedSeconds: number };
};
export const unknownSuccessTime = (): SuccessTime => ({ at: null, provenance: { kind: "unknown" } });
export interface FinanceEvidence { eventId: string; eventType: string; observedAt: string }
export interface RefundObservation {
  refundId: string; amountJPY: number; state: RefundState;
  /** null = no success evidence; unknown time = provider success without a dated success event. */
  successTime: SuccessTime | null;
}
export interface FinanceObservation {
  eventType: string; currency: "jpy"; grossJPY: number; paidTime: SuccessTime;
  /** Full provider pagination. Omission never deletes a previously observed refund. */
  refunds: RefundObservation[]; refundsComplete: true; disputeObserved: boolean;
}
export interface FinanceRefund {
  refundId: string; amountJPY: number; state: RefundState; stateEvidence: FinanceEvidence;
  /** Historical success survives a subsequent failed/canceled correction. */
  success: { time: SuccessTime; evidence: FinanceEvidence } | null;
}
export interface FinanceOrder {
  sourceInstance: string; realm: BillingMode; orderId: string; paymentId: string;
  currency: "jpy"; confirmedGrossJPY: number; paidTime: SuccessTime; grossEvidence: FinanceEvidence;
  refunds: FinanceRefund[]; disputeObserved: boolean;
  /** Decimal bigint string; local order revision, never a global incremental cursor. */
  revision: string;
}

function amount(value: number) {
  if (!Number.isSafeInteger(value) || value <= 0 || value > 2147483647) throw new BillingError("invalid_finance_amount", 400);
}
function validateTime(time: SuccessTime, s: PaymentSnapshot, eventType: string) {
  if (time.provenance.kind === "unknown") {
    if (time.at !== null) throw new BillingError("invalid_finance_time", 400);
    return;
  }
  const p = time.provenance;
  if (p.eventId !== s.eventId || p.eventType !== eventType || !Number.isSafeInteger(p.providerCreatedSeconds)
    || p.providerCreatedSeconds <= 0 || !Number.isFinite(Date.parse(time.at!))
    || Date.parse(time.at!) !== p.providerCreatedSeconds * 1000) throw new BillingError("invalid_finance_time", 400);
}
/** Earliest evidenced success notification; event timestamps never order monetary state transitions. */
function chooseTime(a: SuccessTime, b: SuccessTime): SuccessTime {
  if (a.at === null) return b.at === null ? a : b;
  if (b.at === null) return a;
  return b.at < a.at || (b.at === a.at && b.provenance.eventId < a.provenance.eventId) ? b : a;
}

/** Stripe can fail a previously succeeded refund. Failure/cancellation is a tombstone for that ID. */
export function refundState(previous: RefundState | undefined, incoming: RefundState): RefundState {
  if (previous === "failed" || previous === "canceled") return previous;
  if (incoming === "failed" || incoming === "canceled") return incoming;
  return previous === "succeeded" ? previous : incoming;
}
export function effectiveRefundJPY(f: FinanceOrder) {
  return f.refunds.filter(r => r.state === "succeeded").reduce((sum, r) => sum + r.amountJPY, 0);
}

export function mergeFinance(previous: FinanceOrder | null, p: Purchase, s: PaymentSnapshot, sourceInstance: string, now: Date): FinanceOrder {
  const f = s.finance;
  if (!f || !s.paymentId || !/^[a-zA-Z0-9][a-zA-Z0-9._-]{0,99}$/.test(sourceInstance)) throw new BillingError("finance_configuration_missing", 503);
  amount(f.grossJPY);
  if (!f.refundsComplete || f.currency !== "jpy" || s.currency !== "jpy" || f.grossJPY !== p.amount || f.grossJPY !== s.amount) throw new BillingError("finance_payment_mismatch", 400);
  validateTime(f.paidTime, s, f.eventType);
  if (previous && (previous.sourceInstance !== sourceInstance || previous.realm !== p.mode || previous.orderId !== p.id
    || previous.paymentId !== s.paymentId || previous.confirmedGrossJPY !== f.grossJPY || previous.currency !== f.currency)) throw new BillingError("finance_identity_conflict", 409);
  const evidence = { eventId: s.eventId, eventType: f.eventType, observedAt: now.toISOString() };
  const next: FinanceOrder = previous ? structuredClone(previous) : {
    sourceInstance, realm: p.mode, orderId: p.id, paymentId: s.paymentId, currency: "jpy",
    confirmedGrossJPY: f.grossJPY, paidTime: unknownSuccessTime(), grossEvidence: evidence,
    refunds: [], disputeObserved: false, revision: "0",
  };
  next.paidTime = chooseTime(next.paidTime, f.paidTime);
  next.disputeObserved ||= f.disputeObserved;
  const refunds = new Map(next.refunds.map(r => [r.refundId, r]));
  const seen = new Set<string>();
  for (const incoming of f.refunds) {
    amount(incoming.amountJPY);
    if (incoming.successTime) validateTime(incoming.successTime, s, f.eventType);
    if (!/^[A-Za-z][A-Za-z0-9_]{0,254}$/.test(incoming.refundId) || seen.has(incoming.refundId)
      || (incoming.state === "succeeded" && !incoming.successTime)) throw new BillingError("invalid_refund_fact", 400);
    seen.add(incoming.refundId);
    const old = refunds.get(incoming.refundId);
    if (old && old.amountJPY !== incoming.amountJPY) throw new BillingError("refund_amount_conflict", 409);
    const state = refundState(old?.state ?? p.refunds?.[incoming.refundId], incoming.state);
    let success = old?.success ?? null;
    if (incoming.successTime) {
      const time = success ? chooseTime(success.time, incoming.successTime) : incoming.successTime;
      success = { time, evidence: !success || time !== success.time ? evidence : success.evidence };
    }
    refunds.set(incoming.refundId, { refundId: incoming.refundId, amountJPY: incoming.amountJPY, state,
      stateEvidence: old?.state === state ? old.stateEvidence : evidence, success });
  }
  next.refunds = [...refunds.values()].sort((a, b) => a.refundId.localeCompare(b.refundId));
  if (effectiveRefundJPY(next) > next.confirmedGrossJPY) throw new BillingError("refund_exceeds_gross", 409);
  if (!previous || !isDeepStrictEqual(next, previous)) next.revision = (BigInt(next.revision) + BigInt(1)).toString();
  return next;
}
