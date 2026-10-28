import { describe, expect, it } from "vitest";
import { PostgresBillingStore, type SqlSession } from "@/lib/billing/postgres-store";
import { unknownSuccessTime, type FinanceOrder } from "@/lib/billing/finance";

const facts: FinanceOrder = { sourceInstance: "fixture", realm: "stripe-test", orderId: "order", paymentId: "pi_one", currency: "jpy",
  confirmedGrossJPY: 980, paidTime: unknownSuccessTime(), grossEvidence: { eventId: "evt_one", eventType: "refund.updated", observedAt: "2026-10-25T00:00:00Z" },
  refunds: [{ refundId: "pyr_one", amountJPY: 100, state: "failed", stateEvidence: { eventId: "evt_one", eventType: "refund.updated", observedAt: "2026-10-25T00:00:00Z" },
    success: { time: unknownSuccessTime(), evidence: { eventId: "evt_old", eventType: "refund.updated", observedAt: "2026-10-24T00:00:00Z" } } }],
  disputeObserved: false, revision: "2" };

describe("Postgres finance adapter boundary (SQL execution not simulated)", () => {
  it("uses one transaction/session and binds owner, realm, money and nested audit as parameters", async () => {
    const calls: { sql: string; values: unknown[] }[] = [];
    const session: SqlSession = { query: async <T>(sql: string, values: unknown[]) => {
      calls.push({ sql, values });
      return (sql.startsWith('SELECT id,') ? [{ id: "alice", createdAt: "2026-01-01T00:00:00Z" }] : [{ id: "saved" }]) as T[];
    } };
    let transactions = 0;
    const store = new PostgresBillingStore({ query: async () => { throw new Error("outside transaction"); },
      transaction: async fn => { transactions++; return fn(session); } });
    await store.transaction("alice", "stripe-test", async tx => { await tx.saveFinance(facts); await tx.recordEvent("evt_one", "digest", "order"); });
    expect(transactions).toBe(1); expect(calls[0].sql).toContain("FOR UPDATE");
    const order = calls.find(c => c.sql.includes("INSERT INTO billing_finance_order"))!;
    expect(order.values).toEqual(["order", "fixture", "stripe-test", "pi_one", 980, "jpy", JSON.stringify(facts.paidTime), JSON.stringify(facts.grossEvidence), false, "2", "alice"]);
    expect(order.sql).toContain("user_id=$11 AND mode=$3");
    const refund = calls.find(c => c.sql.includes("INSERT INTO billing_finance_refund"))!;
    expect(refund.values).toContain("failed"); expect(refund.values).toContain(JSON.stringify(facts.refunds[0].success));
    expect(calls.at(-1)?.sql).toContain("INSERT INTO billing_event");
    for (const c of calls) expect(c.sql).not.toContain("alice");
  });
  it("treats zero-row ownership/immutable-ID conflict as transaction failure", async () => {
    let rolledBack = false;
    const store = new PostgresBillingStore({ query: async () => [], transaction: async fn => {
      try { return await fn({ query: async () => [] }); } catch (e) { rolledBack = true; throw e; }
    } });
    await expect(store.transaction("bob", "stripe-test", tx => tx.saveFinance(facts))).rejects.toThrow("ownership");
    expect(rolledBack).toBe(true);
  });
});
