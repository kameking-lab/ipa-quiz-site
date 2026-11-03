import { vi } from "vitest";
import { emptyAccount, type Account, type MonthlyConfig, type MonthlyProvider, type MonthlyStore, type Observation, type Realm } from "@/lib/billing/subscription/domain";
import { MonthlyService, monthlyTerms } from "@/lib/billing/subscription/service";

export class MonthlyMemoryStore implements MonthlyStore {
  accounts = new Map<string, Account>(); fail = false; private queue = Promise.resolve();
  async owner(customerId: string, mode: Realm) { return [...this.accounts.values()].find(a => a.mode === mode && a.customer?.id === customerId)?.userId ?? null; }
  async transaction<T>(userId: string, mode: Realm, source: string, fn: (a: Account) => Promise<T>, readOnly = false) {
    const before = this.queue; let done!: () => void; this.queue = new Promise(resolve => done = resolve); await before;
    try {
      if (!["alice", "bob"].includes(userId)) throw new Error("Auth user missing");
      const key = `${mode}:${userId}`, a = structuredClone(this.accounts.get(key) ?? emptyAccount(userId, mode, source));
      if (a.sourceInstance !== source) throw new Error("source mismatch");
      const result = await fn(a); if (readOnly) return result; if (this.fail) throw new Error("commit failed");
      this.accounts.set(key, a); return result;
    } finally { done(); }
  }
}
export const monthlyFixtureConfig: MonthlyConfig = { mode: "stripe-test", sourceInstance: "monthly-fixture", origin: "http://localhost:3338", enabled: true,
  priceId: "price_monthly", priceYen: 980, freeDaily: 10, portalConfigurationId: "bpc_fixture", termsVersion: "monthly-draft-v1",
  seller: { name: "架空", address: "架空", phone: "000", support: "test@example.invalid", refund: "架空テスト条件" } };
export async function monthlyFixture() {
  const config = structuredClone(monthlyFixtureConfig), store = new MonthlyMemoryStore();
  let now = new Date("2026-01-31T00:00:00Z");
  const service = new MonthlyService(store, config, () => now);
  let observation: Observation = { contracts: [], invoices: [], payments: [] };
  const provider: MonthlyProvider = {
    customer: vi.fn(async () => "cus_alice"), checkout: vi.fn(async () => ({ id: "cs_test_monthly", url: "https://checkout.stripe.com/c/pay/monthly" })),
    portal: vi.fn(async () => "https://billing.stripe.com/p/session/fixture"), resolve: vi.fn(async () => ({ customerId: "cus_alice", subscriptionIds: ["sub_monthly"], invoiceIds: [] })),
    observe: vi.fn(async () => structuredClone(observation)), stopRenewal: vi.fn(async () => undefined),
  };
  const checkout = await service.checkout("alice", monthlyTerms(config), provider);
  const start = Date.parse("2026-01-31T00:00:00Z") / 1000, end = Date.parse("2026-02-28T00:00:00Z") / 1000;
  observation = { contracts: [{ id: "sub_monthly", signupId: checkout.orderId, sourceInstance: config.sourceInstance, terms: monthlyTerms(config), customerId: "cus_alice",
    priceId: config.priceId, amount: 980, status: "active", periodStart: start, periodEnd: end, cancelAtPeriodEnd: false }],
    invoices: [{ id: "in_jan", subscriptionId: "sub_monthly", customerId: "cus_alice", priceId: config.priceId, amount: 980, periodStart: start, periodEnd: end, paid: true,
      payments: [{ id: "inpay_jan", paymentId: "pi_jan", amount: 980 }] }],
    payments: [{ id: "pi_jan", customerId: "cus_alice", amount: 980, refunds: {}, disputes: {} }] };
  return { config, store, service, provider, checkout, observation, setNow: (date: string) => now = new Date(date),
    send: (id = "evt_monthly", digest = id) => service.receive({ id }, digest, provider),
    account: () => store.accounts.get("stripe-test:alice")! };
}
