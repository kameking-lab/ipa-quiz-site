import { describe, expect, it } from "vitest";
import { monthlyFixture } from "./monthly-fixture";
import { projectMonthlyFinanceSnapshot } from "@/lib/billing/subscription/finance";
describe("monthly finance projection", () => {
  it("counts each invoice and refund once, excludes owner data and marks unknown dates/fees", async () => {
    const f = await monthlyFixture(); f.observation.payments[0].refunds.re_one = { id: "re_one", state: "succeeded", amount: 100 }; await f.send(); await f.send();
    const s = projectMonthlyFinanceSnapshot([f.account()], f.config.sourceInstance, "stripe-test", "2026-02-01T00:00:00Z");
    expect(s.totals).toEqual({ confirmedGrossJPY: 980, confirmedRefundJPY: 100, netSalesBeforeFeesJPY: 880, feesJPY: null });
    expect(s.invoices[0].paidAt).toBeNull(); expect(JSON.stringify(s)).not.toContain("alice"); expect(JSON.stringify(s)).not.toContain("checkout.stripe.com");
  });
  it("does not attribute an entire shared-payment refund to an incomplete local allocation", async () => {
    const f = await monthlyFixture(); f.observation.payments[0].amount = 1960; await f.send();
    const s = projectMonthlyFinanceSnapshot([f.account()], f.config.sourceInstance, "stripe-test", "2026-02-01T00:00:00Z");
    expect(s.completeness.completeAllocation).toBe(false); expect(s.totals.netSalesBeforeFeesJPY).toBeNull();
  });
});
