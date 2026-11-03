import "server-only";
import type { BillingMode, BillingStore, Identity, Purchase, Transaction } from "./domain";
import type { FinanceOrder, FinanceRefund } from "./finance";

/** Parameterized SQL boundary; Prisma and a local PostgreSQL test can use the same adapter. */
export interface SqlSession { query<T>(sql: string, values: unknown[]): Promise<T[]> }
export interface SqlDatabase extends SqlSession { transaction<T>(fn: (sql: SqlSession) => Promise<T>): Promise<T> }

export class PostgresBillingStore implements BillingStore {
  constructor(private db: SqlDatabase) {}
  async findOrder(id: string, mode: BillingMode) {
    const rows = await this.db.query<{ payload: Purchase }>('SELECT payload FROM billing_purchase WHERE id=$1 AND mode=$2', [id, mode]);
    return rows[0]?.payload ?? null;
  }
  transaction<T>(userId: string, mode: BillingMode, fn: (tx: Transaction) => Promise<T>) {
    return this.db.transaction(async sql => {
      // Every checkout, event and quota decision for this identity is serialized across processes/tabs.
      const users = await sql.query<{ id: string; createdAt: Date | string }>('SELECT id, "createdAt" FROM "User" WHERE id=$1 FOR UPDATE', [userId]);
      const user: Identity | null = users[0] ? { id: users[0].id, createdAt: new Date(users[0].createdAt).toISOString() } : null;
      return fn({
        user: async () => user,
        purchases: async () => (await sql.query<{ payload: Purchase }>('SELECT payload FROM billing_purchase WHERE user_id=$1 AND mode=$2', [userId, mode])).map(r => r.payload),
        save: async p => {
          if (p.userId !== userId || p.mode !== mode) throw new Error("Billing ownership mismatch");
          await sql.query(`INSERT INTO billing_purchase(id,user_id,mode,session_id,payment_id,payload)
            VALUES($1,$2,$3,$4,$5,$6::jsonb) ON CONFLICT(id) DO UPDATE SET
            session_id=EXCLUDED.session_id,payment_id=EXCLUDED.payment_id,payload=EXCLUDED.payload
            WHERE billing_purchase.user_id=EXCLUDED.user_id AND billing_purchase.mode=EXCLUDED.mode RETURNING id`,
          [p.id, userId, mode, p.sessionId, p.paymentId, JSON.stringify(p)]);
        },
        event: async id => (await sql.query<{ digest: string; orderId: string }>('SELECT digest,order_id AS "orderId" FROM billing_event WHERE mode=$1 AND event_id=$2', [mode, id]))[0] ?? null,
        recordEvent: async (id, digest, orderId) => { await sql.query('INSERT INTO billing_event(mode,event_id,digest,order_id) VALUES($1,$2,$3,$4) RETURNING event_id', [mode, id, digest, orderId]); },
        finance: async orderId => {
          const rows = await sql.query<Omit<FinanceOrder, "refunds">>(`SELECT f.source_instance AS "sourceInstance", f.mode AS realm, f.order_id AS "orderId",
            f.payment_id AS "paymentId", f.currency, f.gross_jpy AS "confirmedGrossJPY", f.paid_time AS "paidTime",
            f.gross_evidence AS "grossEvidence", f.dispute_observed AS "disputeObserved", f.revision::text AS revision
            FROM billing_finance_order f JOIN billing_purchase p ON p.id=f.order_id
            WHERE f.order_id=$1 AND f.mode=$2 AND p.user_id=$3 AND p.mode=$2`, [orderId, mode, userId]);
          if (!rows[0]) return null;
          const refunds = await sql.query<FinanceRefund>(`SELECT refund_id AS "refundId", amount_jpy AS "amountJPY", state, state_evidence AS "stateEvidence", success
            FROM billing_finance_refund WHERE order_id=$1 AND mode=$2 AND source_instance=$3 ORDER BY refund_id`, [orderId, mode, rows[0].sourceInstance]);
          return { ...rows[0], refunds };
        },
        saveFinance: async f => {
          if (f.realm !== mode) throw new Error("Finance realm mismatch");
          const saved = await sql.query(`INSERT INTO billing_finance_order(order_id,source_instance,mode,payment_id,gross_jpy,currency,paid_time,gross_evidence,dispute_observed,revision)
            SELECT id,$2,$3,$4,$5,$6,$7::jsonb,$8::jsonb,$9,$10::bigint FROM billing_purchase WHERE id=$1 AND user_id=$11 AND mode=$3
            ON CONFLICT(order_id) DO UPDATE SET paid_time=EXCLUDED.paid_time,dispute_observed=EXCLUDED.dispute_observed,revision=EXCLUDED.revision
            WHERE billing_finance_order.source_instance=EXCLUDED.source_instance AND billing_finance_order.mode=EXCLUDED.mode
              AND billing_finance_order.payment_id=EXCLUDED.payment_id AND billing_finance_order.gross_jpy=EXCLUDED.gross_jpy
              AND billing_finance_order.revision<=EXCLUDED.revision RETURNING order_id`,
          [f.orderId, f.sourceInstance, mode, f.paymentId, f.confirmedGrossJPY, f.currency, JSON.stringify(f.paidTime), JSON.stringify(f.grossEvidence), f.disputeObserved, f.revision, userId]);
          if (saved.length !== 1) throw new Error("Finance ownership or immutable amount conflict");
          for (const r of f.refunds) {
            const refunds = await sql.query(`INSERT INTO billing_finance_refund(source_instance,mode,refund_id,order_id,amount_jpy,currency,state,state_evidence,success)
              VALUES($1,$2,$3,$4,$5,'jpy',$6,$7::jsonb,$8::jsonb) ON CONFLICT(source_instance,mode,refund_id) DO UPDATE SET state=EXCLUDED.state,state_evidence=EXCLUDED.state_evidence,success=EXCLUDED.success
              WHERE billing_finance_refund.order_id=EXCLUDED.order_id AND billing_finance_refund.amount_jpy=EXCLUDED.amount_jpy RETURNING refund_id`,
            [f.sourceInstance, mode, r.refundId, f.orderId, r.amountJPY, r.state, JSON.stringify(r.stateEvidence), r.success ? JSON.stringify(r.success) : null]);
            if (refunds.length !== 1) throw new Error("Finance refund identity or immutable amount conflict");
          }
        },
        grants: async day => (await sql.query<{ question_id: string }>('SELECT question_id FROM billing_daily_grant WHERE mode=$1 AND user_id=$2 AND day=$3::date', [mode, userId, day])).map(r => r.question_id),
        grant: async (day, id) => { await sql.query('INSERT INTO billing_daily_grant(mode,user_id,day,question_id) VALUES($1,$2,$3::date,$4) ON CONFLICT DO NOTHING RETURNING question_id', [mode, userId, day, id]); },
      });
    });
  }
}
