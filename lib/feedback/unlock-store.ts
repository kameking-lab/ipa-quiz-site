import "server-only";
import { randomUUID } from "node:crypto";
import { BillingError } from "@/lib/billing/domain";
import type { SqlDatabase, SqlSession } from "@/lib/billing/postgres-store";
import { FEEDBACK_BONUS, type FeedbackExport, type UnlockStatus } from "./unlock-contract";

export interface UnlockIdentity { realm: string; account: string | null; browser: string | null }
interface Row { event_id: string; account_hash: string | null; browser_hash: string | null; retired: boolean }
export class FeedbackUnlockStore {
  constructor(private db: SqlDatabase) {}
  async consumeRate(key: string, now = new Date()) {
    // Independent from the AI quota: submitting an opinion must not consume an AI request.
    await this.db.query('DELETE FROM feedback_unlock_rate WHERE key IN (SELECT key FROM feedback_unlock_rate WHERE expires_at<$1 LIMIT 1000) RETURNING key', [now]);
    const rows = await this.db.query<{ count: number }>(`INSERT INTO feedback_unlock_rate(key,count,expires_at) VALUES($1,1,$2)
      ON CONFLICT(key) DO UPDATE SET count=feedback_unlock_rate.count+1 RETURNING count`, [key, new Date(now.getTime() + 120000)]);
    return rows[0].count <= 5;
  }
  private async rows(sql: SqlSession, i: UnlockIdentity, lock = false) {
    return sql.query<Row>(`SELECT event_id,account_hash,browser_hash,retired FROM feedback_unlock
      WHERE realm=$1 AND (account_hash=$2 OR browser_hash=$3) ORDER BY event_id${lock ? " FOR UPDATE" : ""}`, [i.realm, i.account, i.browser]);
  }
  private owner(rows: Row[], i: UnlockIdentity) {
    return rows.find(r => i.account && r.account_hash === i.account)
      ?? rows.find(r => r.browser_hash === i.browser && (!r.account_hash || r.account_hash === i.account));
  }
  async status(i: UnlockIdentity): Promise<UnlockStatus> {
    const rows = await this.rows(this.db, i);
    const row = this.owner(rows, i);
    if (!row) return { submitted: false, eligible: rows.length === 0, remaining: 0 };
    const count = await this.db.query<{ count: number }>('SELECT count(*)::int AS count FROM feedback_unlock_grant WHERE event_id=$1', [row.event_id]);
    return { submitted: true, eligible: false, remaining: row.retired ? 0 : Math.max(0, FEEDBACK_BONUS - count[0].count) };
  }
  async submit(i: UnlockIdentity, network: string | null, data: Pick<FeedbackExport, "choices" | "requestedQualifications" | "commentMasked">) {
    return this.db.transaction(async sql => {
      if (i.account) await sql.query("SELECT pg_advisory_xact_lock(hashtextextended($1, 731103))::text AS locked", [`${i.realm}:${i.account}`]);
      // Serialise publication so sequence cursors cannot skip an earlier uncommitted insert.
      await sql.query("SELECT pg_advisory_xact_lock(731103, 1)::text AS locked", []);
      if ((await this.rows(sql, i)).length) throw new BillingError("already_submitted", 409);
      const eventId = randomUUID();
      const saved = await sql.query<{ event_id: string }>(`INSERT INTO feedback_unlock
        (event_id,realm,account_hash,browser_hash,network_day_hash,anonymous_id,choices,requested_qualifications,comment_masked)
        VALUES($1,$2,$3,$4,$5,$6,$7::text[],$8::text[],$9) ON CONFLICT DO NOTHING RETURNING event_id`,
      [eventId, i.realm, i.account, i.browser, network, randomUUID(), data.choices, data.requestedQualifications, data.commentMasked]);
      if (!saved.length) throw new BillingError("duplicate_submission", 429);
      return { eventId, remaining: FEEDBACK_BONUS };
    });
  }
  async claim(i: UnlockIdentity) { return this.grant(i, "", null); }
  async grant(i: UnlockIdentity, day: string, questionId: string | null) {
    return this.db.transaction(async sql => {
      // Account lock also serialises claims from different browsers.
      if (i.account) await sql.query("SELECT pg_advisory_xact_lock(hashtextextended($1, 731103))::text AS locked", [`${i.realm}:${i.account}`]);
      const rows = await this.rows(sql, i, true);
      const row = this.owner(rows, i);
      if (!row || row.retired) return null;
      if (i.account) {
        if (!row.account_hash) await sql.query('UPDATE feedback_unlock SET account_hash=$2 WHERE event_id=$1 RETURNING event_id', [row.event_id, i.account]);
        // Two pre-existing wallets must never stack after account sign-in.
        for (const other of rows) if (other.event_id !== row.event_id && !other.account_hash) {
          await sql.query('UPDATE feedback_unlock SET retired=true WHERE event_id=$1 RETURNING event_id', [other.event_id]);
        }
      }
      const grants = await sql.query<{ day: string; question_id: string }>('SELECT day,question_id FROM feedback_unlock_grant WHERE event_id=$1', [row.event_id]);
      if (questionId === null) return { remaining: Math.max(0, FEEDBACK_BONUS - grants.length), newlyUsed: false };
      if (grants.some(g => g.day === day && g.question_id === questionId)) return { remaining: Math.max(0, FEEDBACK_BONUS - grants.length), newlyUsed: false };
      if (grants.length >= FEEDBACK_BONUS) return null;
      await sql.query('INSERT INTO feedback_unlock_grant(event_id,day,question_id) VALUES($1,$2,$3) RETURNING event_id', [row.event_id, day, questionId]);
      return { remaining: FEEDBACK_BONUS - grants.length - 1, newlyUsed: true };
    });
  }
  async page(realm: string, after: string, limit = 100) {
    const rows = await this.db.query<{ sequence: string; event_id: string; anonymous_id: string; received_at: Date; choices: string[]; requested_qualifications: string[]; comment_masked: string }>(
      `SELECT sequence::text,event_id,anonymous_id,received_at,choices,requested_qualifications,comment_masked
       FROM feedback_unlock WHERE realm=$1 AND sequence>$2::bigint ORDER BY sequence LIMIT $3`, [realm, after, limit]);
    return { schemaVersion: 1 as const, events: rows.map(r => ({ schemaVersion: 1 as const, eventId: r.event_id, source: "kakomon-ai" as const,
      anonymousId: r.anonymous_id, receivedAt: r.received_at.toISOString(), choices: r.choices,
      requestedQualifications: r.requested_qualifications, commentMasked: r.comment_masked })),
      nextCursor: rows.at(-1)?.sequence ?? after, hasMore: rows.length === limit };
  }
}
