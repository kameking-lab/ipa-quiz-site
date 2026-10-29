import { describe, expect, it } from "vitest";
import { projectFinanceSnapshot, type FinanceProjectionRow } from "@/lib/billing/finance-snapshot";
import { unknownSuccessTime } from "@/lib/billing/finance";

const evidence = { eventId: "evt_one", eventType: "refund.updated", observedAt: "2026-10-25T00:00:00Z" };
const row = (): FinanceProjectionRow => ({ source: "kakomon-ai", source_instance: "fixture", realm: "stripe-test",
  order_id: "order", payment_id: "pi_one", currency: "jpy", confirmed_gross_jpy: 980, paid_time: unknownSuccessTime(),
  gross_evidence: evidence, confirmed_refund_jpy: "100", net_sales_before_fees_jpy: "880",
  refunds: [{ refundId: "re_one", amountJPY: 100, state: "succeeded", stateEvidence: evidence,
    success: { time: unknownSuccessTime(), evidence } }], dispute_state: "none_observed", revision: "3", financial_facts_known: true });
describe("private full snapshot projection", () => {
  it("keeps undated confirmed amounts, explicit completeness and unknown fees", () => {
    const s = projectFinanceSnapshot([row()], "fixture", "stripe-test", evidence.observedAt);
    expect(s.completeness).toMatchObject({ unknownOrderCount: 0, unknownPaidDateCount: 1, unknownRefundDateCount: 1, providerHistory: "not_reconciled" });
    expect(s.orders[0]).toMatchObject({ confirmedGrossJPY: 980, confirmedRefundJPY: 100, netSalesBeforeFeesJPY: 880, feeJPY: null, netAfterFeesJPY: null, revision: "3" });
  });
  it("keeps legacy unknown orders as unknown, not zero, and marks partial facts", () => {
    const r = row(); Object.assign(r, { source_instance: null, payment_id: null, currency: null, confirmed_gross_jpy: null,
      gross_evidence: null, confirmed_refund_jpy: null, net_sales_before_fees_jpy: null, refunds: [], revision: null, financial_facts_known: false });
    const s = projectFinanceSnapshot([r], "fixture", "stripe-test", evidence.observedAt);
    expect(s.completeness.unknownOrderCount).toBe(1); expect(s.completeness.financialFacts).toBe("partial");
    expect(s.orders[0].confirmedGrossJPY).toBeNull(); expect(s.orders[0].confirmedRefundJPY).toBeNull();
  });
  it("includes failed tombstone and success audit while removing it from effective amount/date count", () => {
    const r = row(); r.refunds[0].state = "failed"; r.confirmed_refund_jpy = 0; r.net_sales_before_fees_jpy = 980; r.revision = "4";
    const s = projectFinanceSnapshot([r], "fixture", "stripe-test", evidence.observedAt);
    expect(s.completeness.unknownRefundDateCount).toBe(0); expect(s.orders[0].confirmedRefundJPY).toBe(0);
    expect(s.orders[0].refunds[0].success?.evidence.eventId).toBe("evt_one");
  });
  it("allowlists nested fields and rejects mixed sources, realms or duplicate orders", () => {
    const r = row(); Object.assign(r, { user_id: "PRIVATE", checkout_url: "PRIVATE" });
    Object.assign(r.gross_evidence!, { email: "PRIVATE" }); Object.assign(r.paid_time, { raw: "PRIVATE" });
    Object.assign(r.refunds[0], { name: "PRIVATE" });
    expect(JSON.stringify(projectFinanceSnapshot([r], "fixture", "stripe-test", evidence.observedAt))).not.toContain("PRIVATE");
    for (const patch of [{ source_instance: "different" }, { realm: "stripe-live" as const }]) {
      expect(() => projectFinanceSnapshot([{ ...row(), ...patch }], "fixture", "stripe-test", evidence.observedAt)).toThrow();
    }
    expect(() => projectFinanceSnapshot([row(), row()], "fixture", "stripe-test", evidence.observedAt)).toThrow();
  });
});
