import { createHmac } from "node:crypto";
import type { SqlDatabase } from "@/lib/billing/postgres-store";

// Operator-only backfill. Never invoked by requests. Supply every historical
// AUTH_SECRET that issued receipts; unknown/deleted users and duplicates abort.
export async function migrateLegacyFeedbackIdentity(db: SqlDatabase, secrets: string[]) {
  if (!secrets.length || secrets.some(key => !key)) throw new Error("Legacy keys required");
  return db.transaction(async sql => {
    await sql.query("LOCK TABLE feedback_unlock IN EXCLUSIVE MODE", []);
    const users = await sql.query<{ id: string }>('SELECT id FROM "User"', []);
    const owners = new Map<string, string>();
    for (const user of users) for (const key of secrets) {
      owners.set(createHmac("sha256", key).update(`feedback-unlock:v1:account:${user.id}`).digest("hex"), user.id);
    }
    const rows = await sql.query<{ event_id: string; account_hash: string }>(
      "SELECT event_id,account_hash FROM feedback_unlock WHERE account_hash IS NOT NULL AND user_id IS NULL", []);
    for (const row of rows) {
      const user = owners.get(row.account_hash);
      if (!user) throw new Error("Unresolved legacy receipt; migration rolled back");
      await sql.query("UPDATE feedback_unlock SET user_id=$2 WHERE event_id=$1 RETURNING event_id", [row.event_id, user]);
    }
    // Unique user_id rejects receipts duplicated across keys/realms. The owner
    // must reconcile these explicitly, never silently discard or add balances.
    return rows.length;
  });
}
