import "server-only";
import { BillingError } from "../domain";
import type { SqlDatabase } from "../postgres-store";
import { emptyAccount, type Account, type MonthlyStore, type Realm } from "./domain";

/** One account aggregate under the existing Auth User lock; provider IDs have cross-user unique bindings. */
export class PostgresMonthlyStore implements MonthlyStore {
  constructor(private db: SqlDatabase, private source: string) {}
  async owner(customerId: string, mode: Realm) {
    return (await this.db.query<{ user_id: string }>(`SELECT user_id FROM billing_subscription_identity
      WHERE source_instance=$1 AND mode=$2 AND kind='customer' AND provider_id=$3`, [this.source, mode, customerId]))[0]?.user_id ?? null;
  }
  transaction<T>(userId: string, mode: Realm, source: string, fn: (a: Account) => Promise<T>, readOnly = false) {
    if (source !== this.source) throw new BillingError("source_instance_mismatch", 503);
    return this.db.transaction(async sql => {
      const users = await sql.query('SELECT id FROM "User" WHERE id=$1 FOR UPDATE', [userId]);
      if (users.length !== 1) throw new BillingError("sign_in_required", 401);
      const row = (await sql.query<{ payload: Account }>(`SELECT payload FROM billing_subscription_account
        WHERE user_id=$1 AND mode=$2`, [userId, mode]))[0];
      const a = row?.payload ?? emptyAccount(userId, mode, source);
      if (a.userId !== userId || a.mode !== mode || a.sourceInstance !== source) throw new BillingError("subscription_account_mismatch", 503);
      const result = await fn(a);
      if (readOnly) return result;
      const ids: [string, string][] = [
        ...(a.customer?.id ? [["customer", a.customer.id] as [string, string]] : []),
        ...Object.values(a.signups).filter(s => s.sessionId).map(s => ["session", s.sessionId!] as [string, string]),
        ...Object.keys(a.contracts).map(id => ["subscription", id] as [string, string]),
        ...Object.keys(a.invoices).map(id => ["invoice", id] as [string, string]),
        ...Object.keys(a.payments).map(id => ["payment", id] as [string, string]),
        ...Object.values(a.payments).flatMap(p => Object.keys(p.refunds).map(id => ["refund", id] as [string, string])),
        ...Object.values(a.payments).flatMap(p => Object.keys(p.disputes).map(id => ["dispute", id] as [string, string])),
        ...Object.values(a.invoices).flatMap(i => i.payments.map(p => ["invoice_payment", p.id] as [string, string])),
        ...Object.keys(a.events).map(id => ["event", id] as [string, string]),
      ];
      for (const [kind, id] of ids) {
        const saved = await sql.query(`INSERT INTO billing_subscription_identity(source_instance,mode,kind,provider_id,user_id)
          VALUES($1,$2,$3,$4,$5) ON CONFLICT(source_instance,mode,kind,provider_id) DO UPDATE SET user_id=EXCLUDED.user_id
          WHERE billing_subscription_identity.user_id=EXCLUDED.user_id RETURNING provider_id`, [source, mode, kind, id, userId]);
        if (saved.length !== 1) throw new BillingError("subscription_identity_conflict", 503);
      }
      const savedAccount = await sql.query(`INSERT INTO billing_subscription_account(user_id,mode,source_instance,payload)
        VALUES($1,$2,$3,$4::jsonb) ON CONFLICT(user_id,mode) DO UPDATE SET payload=EXCLUDED.payload
        WHERE billing_subscription_account.source_instance=EXCLUDED.source_instance RETURNING user_id`, [userId, mode, source, JSON.stringify(a)]);
      if (savedAccount.length !== 1) throw new BillingError("subscription_account_conflict", 503);
      return result;
    });
  }
}
