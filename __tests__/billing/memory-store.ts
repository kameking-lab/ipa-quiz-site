import type { BillingMode, BillingStore, Identity, Purchase, Transaction } from "@/lib/billing/domain";
import type { FinanceOrder } from "@/lib/billing/finance";
/** Test-only, transactional double with rollback. Never imported by application code. */
export class MemoryStore implements BillingStore {
  users = new Map<string, Identity>([["alice", { id: "alice", createdAt: "2026-10-01T00:00:00.000Z" }], ["bob", { id: "bob", createdAt: "2026-10-01T00:00:00.000Z" }]]);
  purchases = new Map<string, Purchase>();
  events = new Map<string, { digest: string; orderId: string }>();
  grants = new Map<string, Set<string>>();
  finances = new Map<string, FinanceOrder>();
  failFinance = false;
  failEvent = false;
  fail = false;
  private pending = Promise.resolve();
  async findOrder(id: string, mode: BillingMode) { const p = this.purchases.get(id); return p?.mode === mode ? structuredClone(p) : null; }
  async transaction<T>(id: string, mode: BillingMode, fn: (tx: Transaction) => Promise<T>): Promise<T> {
    const before = this.pending;
    let release!: () => void;
    this.pending = new Promise<void>(resolve => { release = resolve; });
    await before;
    const purchases = structuredClone(this.purchases), events = structuredClone(this.events), grants = structuredClone(this.grants), finances = structuredClone(this.finances);
    try {
      if (this.fail) throw new Error("unavailable");
      const result = await fn({
        user: async () => this.users.get(id) ?? null,
        purchases: async () => [...purchases.values()].filter(p => p.userId === id && p.mode === mode),
        save: async p => {
          if ([...purchases.values()].some(other => other.id !== p.id && other.mode === mode &&
            (p.paymentId && other.paymentId === p.paymentId || p.sessionId && other.sessionId === p.sessionId))) throw new Error("unique violation");
          purchases.set(p.id, structuredClone(p));
        },
        event: async e => events.get(`${mode}:${e}`) ?? null,
        recordEvent: async (e, digest, orderId) => { const key = `${mode}:${e}`; if (this.failEvent) throw new Error("event persistence failed"); if (events.has(key)) throw new Error("duplicate event"); events.set(key, { digest, orderId }); },
        finance: async orderId => finances.get(orderId) ?? null,
        saveFinance: async f => {
          if (this.failFinance) throw new Error("finance persistence failed");
          if ([...finances.values()].some(other => other.orderId !== f.orderId && other.realm === f.realm &&
            (other.paymentId === f.paymentId || other.refunds.some(a => f.refunds.some(b => a.refundId === b.refundId))))) throw new Error("unique finance identity");
          finances.set(f.orderId, structuredClone(f));
        },
        grants: async day => [...(grants.get(`${id}:${mode}:${day}`) ?? [])],
        grant: async (day, q) => { const key = `${id}:${mode}:${day}`; const set = grants.get(key) ?? new Set(); set.add(q); grants.set(key, set); },
      });
      this.purchases = purchases; this.events = events; this.grants = grants; this.finances = finances;
      return result;
    } finally { release(); }
  }
}
