import { describe, expect, it, vi } from "vitest";
import { PostgresMonthlyStore } from "@/lib/billing/subscription/store";
import { emptyAccount } from "@/lib/billing/subscription/domain";
import type { SqlDatabase } from "@/lib/billing/postgres-store";
function dbFixture(conflict = false) {
  const query = vi.fn(async (sql: string, values: unknown[]) => {
    if (sql.startsWith('SELECT id FROM "User"')) return [{ id: values[0] }];
    if (sql.startsWith("SELECT payload")) return [];
    if (conflict && sql.includes("INSERT INTO billing_subscription_identity")) return [];
    return [{ user_id: "alice", provider_id: "cus_fixture" }];
  });
  const transaction = vi.fn(async (fn: (sql: { query: typeof query }) => Promise<unknown>) => fn({ query }));
  return { query, transaction, db: { query, transaction } as unknown as SqlDatabase };
}
describe("Postgres monthly adapter SQL boundary (no database)", () => {
  it("read-only status transaction does not save account or provider bindings", async () => {
    const f = dbFixture(), store = new PostgresMonthlyStore(f.db, "fixture");
    await store.transaction("alice", "stripe-test", "fixture", async a => a.userId, true);
    expect(f.query.mock.calls.every(([sql]) => sql.startsWith("SELECT"))).toBe(true);
  });
  it("locks the Auth identity and parameterizes all values before storing new state", async () => {
    const f = dbFixture(), store = new PostgresMonthlyStore(f.db, "fixture"), user = "user'--fixture";
    await store.transaction(user, "stripe-test", "fixture", async a => { a.customer = { id: "cus_fixture", createdAt: "2026-01-01", attemptId: "fixture" }; });
    expect(f.query.mock.calls[0][0]).toContain("FOR UPDATE");
    expect(f.query.mock.calls.every(([sql]) => !sql.includes(user))).toBe(true);
    expect(f.query.mock.calls.some(([sql]) => sql.includes("INSERT INTO billing_subscription_account"))).toBe(true);
  });
  it("rejects provider IDs already bound to another user before saving the aggregate", async () => {
    const f = dbFixture(true), store = new PostgresMonthlyStore(f.db, "fixture");
    await expect(store.transaction("alice", "stripe-test", "fixture", async a => { a.customer = { id: "cus_other", createdAt: "2026-01-01", attemptId: "fixture" }; })).rejects.toMatchObject({ code: "subscription_identity_conflict" });
    expect(f.query.mock.calls.some(([sql]) => sql.includes("INSERT INTO billing_subscription_account"))).toBe(false);
  });
  it("rejects persisted source-instance mismatch without writing or changing Auth", async () => {
    const f = dbFixture(); f.query.mockImplementation(async sql => sql.startsWith("SELECT payload") ? [{ payload: emptyAccount("alice", "stripe-test", "other") }] as never : [{ id: "alice" }] as never);
    await expect(new PostgresMonthlyStore(f.db, "fixture").transaction("alice", "stripe-test", "fixture", async () => undefined)).rejects.toMatchObject({ code: "subscription_account_mismatch" });
  });
});
