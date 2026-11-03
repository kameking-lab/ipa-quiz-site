import "server-only";
export { projectMonthlyFinanceSnapshot } from "./subscription/finance";
import type { BillingMode } from "./domain";
import { type FinanceEvidence, type FinanceRefund, type SuccessTime } from "./finance";

/** Exact allowlisted view columns; no connection, endpoint, credential, or push transport is created. */
export interface FinanceProjectionRow {
  source: "kakomon-ai"; source_instance: string | null; realm: BillingMode; order_id: string;
  payment_id: string | null; currency: "jpy" | null; confirmed_gross_jpy: number | null;
  paid_time: SuccessTime; gross_evidence: FinanceEvidence | null;
  confirmed_refund_jpy: number | string | null; net_sales_before_fees_jpy: number | string | null;
  refunds: FinanceRefund[]; dispute_state: "observed_hold" | "none_observed" | "unknown";
  revision: string | null; financial_facts_known: boolean;
}
const safeJPY = (n: number | string | null) => {
  if (n === null) return null;
  const value = typeof n === "string" ? Number(n) : n;
  if (!Number.isSafeInteger(value) || value < 0) throw new Error("Invalid projection amount");
  return value;
};
const evidence = (e: FinanceEvidence) => ({ eventId: e.eventId, eventType: e.eventType, observedAt: e.observedAt });
const time = (t: SuccessTime): SuccessTime => t.at === null ? { at: null, provenance: { kind: "unknown" } } : {
  at: t.at, provenance: { kind: "stripe_success_event_created", eventId: t.provenance.eventId,
    eventType: t.provenance.eventType, providerCreatedSeconds: t.provenance.providerCreatedSeconds } };
/** Call only with a COMPLETE, single-statement view result for one realm. Apply with per-order revisions; never delete missing rows or blindly replace a newer snapshot. */
export function projectFinanceSnapshot(rows: FinanceProjectionRow[], sourceInstance: string, realm: BillingMode, generatedAt: string) {
  if (!/^[a-zA-Z0-9][a-zA-Z0-9._-]{0,99}$/.test(sourceInstance) || !Number.isFinite(Date.parse(generatedAt))) throw new Error("Invalid snapshot identity/time");
  const seen = new Set<string>();
  const orders = rows.map(r => {
    if (r.source !== "kakomon-ai" || r.realm !== realm || (r.source_instance !== null && r.source_instance !== sourceInstance)
      || seen.has(r.order_id)) throw new Error("Projection identity mismatch");
    seen.add(r.order_id);
    // Explicit allowlist. Extra DB columns are never spread into the contract.
    return { orderId: r.order_id, paymentId: r.payment_id, currency: r.currency,
      confirmedGrossJPY: safeJPY(r.confirmed_gross_jpy), paidTime: time(r.paid_time), grossEvidence: r.gross_evidence ? evidence(r.gross_evidence) : null,
      confirmedRefundJPY: safeJPY(r.confirmed_refund_jpy), netSalesBeforeFeesJPY: safeJPY(r.net_sales_before_fees_jpy),
      refunds: r.refunds.map(refund => ({ refundId: refund.refundId, amountJPY: refund.amountJPY, state: refund.state,
        stateEvidence: evidence(refund.stateEvidence), success: refund.success ? { time: time(refund.success.time), evidence: evidence(refund.success.evidence) } : null })),
      disputeState: r.dispute_state, revision: r.revision, financialFactsKnown: r.financial_facts_known,
      feeJPY: null, netAfterFeesJPY: null };
  }).sort((a, b) => a.orderId.localeCompare(b.orderId));
  const unknownOrderCount = orders.filter(o => !o.financialFactsKnown).length;
  const unknownPaidDateCount = orders.filter(o => o.financialFactsKnown && o.paidTime.at === null).length;
  const unknownRefundDateCount = orders.flatMap(o => o.refunds).filter(r => r.state === "succeeded" && !r.success?.time.at).length;
  return { schemaVersion: "kakomon-finance-v1" as const, source: "kakomon-ai" as const, sourceInstance, realm, generatedAt,
    completeness: { scope: "all_local_orders_in_realm" as const, snapshot: "full" as const,
      financialFacts: unknownOrderCount ? "partial" as const : "complete_for_local_orders" as const,
      providerHistory: "not_reconciled" as const, unknownOrderCount, unknownPaidDateCount, unknownRefundDateCount }, orders };
}
