import "server-only";
import { AsyncLocalStorage } from "node:async_hooks";
import { BillingError } from "../domain";
import type { SqlDatabase, SqlSession } from "../postgres-store";
import { normalizedPurchaseEmail, privateRelayEmail, PURCHASE_EMAIL_WHITESPACE } from "@/lib/auth/purchase-email";
import { emptyAccount, type Account, type MonthlyStore, type Realm } from "./domain";

/** One account aggregate under the existing Auth User lock; provider IDs have cross-user unique bindings. */
export class PostgresMonthlyStore implements MonthlyStore {
  /** The open transaction's connection, so lookups inside it never wait for a second pooled connection. */
  private session = new AsyncLocalStorage<SqlSession>();
  constructor(private db: SqlDatabase, private source: string) {}
  async owner(customerId: string, mode: Realm) {
    return (await this.db.query<{ user_id: string }>(`SELECT user_id FROM billing_subscription_identity
      WHERE source_instance=$1 AND mode=$2 AND kind='customer' AND provider_id=$3`, [this.source, mode, customerId]))[0]?.user_id ?? null;
  }
  async trialCardOwner(cardHash: string, mode: Realm, exceptUserId: string) {
    return (await (this.session.getStore() ?? this.db).query<{ user_id: string }>(`SELECT user_id FROM billing_subscription_account
      WHERE source_instance=$1 AND mode=$2 AND user_id<>$3 AND jsonb_exists(COALESCE(payload->'trialCards','{}'::jsonb), $4) LIMIT 1`,
      [this.source, mode, exceptUserId, cardHash]))[0]?.user_id ?? null;
  }
  transaction<T>(userId: string, mode: Realm, source: string, fn: (a: Account) => Promise<T>, readOnly = false) {
    if (source !== this.source) throw new BillingError("source_instance_mismatch", 503);
    return this.db.transaction(async sql => {
      const users = await sql.query('SELECT id FROM "User" WHERE id=$1 FOR UPDATE', [userId]);
      if (users.length !== 1) throw new BillingError("sign_in_required", 401);
      const a = await this.load(sql, userId, mode, source);
      const result = await this.session.run(sql, () => fn(a));
      if (!readOnly) await this.save(sql, a);
      return result;
    });
  }

  purchaseTransaction<T>(userId: string, mode: Realm, source: string, fn: (account: Account, members: Account[]) => T) {
    if (source !== this.source) throw new BillingError("source_instance_mismatch", 503);
    return this.db.transaction(async sql => {
      type User = { id: string; email: string | null };
      const [current] = await sql.query<User>('SELECT id,email FROM "User" WHERE id=$1', [userId]);
      if (!current) throw new BillingError("sign_in_required", 401);
      const email = current.email && !privateRelayEmail(current.email) ? normalizedPurchaseEmail(current.email) || null : null;
      // Every buyer locks the same users in the same order. Single-user writers
      // (e.g. webhooks) use these locks too.
      const users = await sql.query<User>(`SELECT id,email FROM "User"
        WHERE id=$1 OR lower(btrim(email,$3))=$2 ORDER BY id FOR UPDATE`, [userId, email, PURCHASE_EMAIL_WHITESPACE]);
      const owner = users.find(u => u.id === userId);
      if (!owner) throw new BillingError("sign_in_required", 401);
      if (owner.email !== current.email) throw new BillingError("purchase_check_unavailable", 503);
      const members: Account[] = [];
      for (const u of users) members.push(await this.load(sql, u.id, mode, source));
      const before = members.map(a => JSON.stringify(a));
      const result = fn(members[users.indexOf(owner)], members);
      for (let i = 0; i < members.length; i++) {
        if (JSON.stringify(members[i]) !== before[i]) await this.save(sql, members[i]);
      }
      return result;
    });
  }

  private async load(sql: SqlSession, userId: string, mode: Realm, source: string) {
    const row = (await sql.query<{ payload: Account }>(`SELECT payload FROM billing_subscription_account
      WHERE user_id=$1 AND mode=$2`, [userId, mode]))[0];
    const a = row?.payload ?? emptyAccount(userId, mode, source);
    if (a.userId !== userId || a.mode !== mode || a.sourceInstance !== source) throw new BillingError("subscription_account_mismatch", 503);
    return a;
  }

  private async save(sql: SqlSession, a: Account) {
    const { userId, mode, sourceInstance: source } = a;
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
  }
}
