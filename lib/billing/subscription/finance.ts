import "server-only";
import type { Account, Realm } from "./domain";
/** Separate version from one-time orders. Never exports customer identity, signup URLs, credentials or raw events. */
export function projectMonthlyFinanceSnapshot(accounts: Account[], sourceInstance: string, realm: Realm, generatedAt: string) {
  if (!Number.isFinite(Date.parse(generatedAt))) throw new Error("Invalid snapshot timestamp");
  const seenInvoices = new Set<string>(), seenPayments = new Set<string>(), seenRefunds = new Set<string>();
  const invoices = [], payments = [];
  for (const a of accounts) {
    if (a.mode !== realm || a.sourceInstance !== sourceInstance) throw new Error("Finance realm mismatch");
    const allocated = new Map<string, number>();
    for (const i of Object.values(a.invoices).filter(i => i.paid)) {
      if (seenInvoices.has(i.id)) throw new Error("Duplicate invoice"); seenInvoices.add(i.id);
      invoices.push({ invoiceId: i.id, subscriptionId: i.subscriptionId, periodStart: i.periodStart, periodEnd: i.periodEnd,
        confirmedGrossJPY: i.amount, paymentAllocations: i.payments.map(p => ({ invoicePaymentId: p.id, paymentId: p.paymentId, amountJPY: p.amount })), paidAt: null });
      for (const p of i.payments) allocated.set(p.paymentId, (allocated.get(p.paymentId) ?? 0) + p.amount);
    }
    for (const p of Object.values(a.payments)) {
      if (seenPayments.has(p.id)) throw new Error("Duplicate payment"); seenPayments.add(p.id);
      const refunds = Object.values(p.refunds).map(r => {
        if (seenRefunds.has(r.id)) throw new Error("Duplicate refund"); seenRefunds.add(r.id);
        return { refundId: r.id, amountJPY: r.amount, state: r.state, succeededAt: null };
      });
      payments.push({ paymentId: p.id, settledJPY: p.amount, recordedInvoiceAllocationsJPY: allocated.get(p.id) ?? 0, refunds,
        disputeHold: Object.values(p.disputes).some(d => d !== "won") });
    }
  }
  const completeAllocation = payments.every(p => p.settledJPY === p.recordedInvoiceAllocationsJPY);
  const gross = invoices.reduce((n, i) => n + i.confirmedGrossJPY, 0);
  const refund = payments.flatMap(p => p.refunds).reduce((n, r) => n + (r.state === "succeeded" ? r.amountJPY : 0), 0);
  return { schemaVersion: "kakomon-monthly-finance-v1" as const, sourceInstance, realm, generatedAt,
    completeness: { scope: "supplied_local_accounts" as const, providerHistory: "not_reconciled" as const, completeAllocation, successTimes: "unknown" as const },
    invoices: invoices.sort((a, b) => a.invoiceId.localeCompare(b.invoiceId)), payments: payments.sort((a, b) => a.paymentId.localeCompare(b.paymentId)),
    totals: { confirmedGrossJPY: gross, confirmedRefundJPY: refund, netSalesBeforeFeesJPY: completeAllocation ? gross - refund : null, feesJPY: null } };
}
