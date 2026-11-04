import "server-only";
import { createHmac, timingSafeEqual } from "node:crypto";
import { prisma } from "@/lib/db/prisma";
import { billingConfig } from "@/lib/billing/config";
import { monthlyConfig, monthlySelected } from "@/lib/billing/subscription/config";

// This proof permits result restoration only. It never grants a question body,
// download, or current paid access, and is bound to the authenticated owner.
export function paperReviewProof(userId: string, paper: string, id: string): string | undefined {
  const secret = process.env.AUTH_SECRET;
  const c = monthlySelected() ? monthlyConfig() : billingConfig();
  return secret ? createHmac("sha256", secret).update(JSON.stringify(["paper-review-v1", c.mode, c.sourceInstance, userId, paper, id])).digest("hex") : undefined;
}
export function validPaperReviewProof(proof: string | undefined, userId: string, paper: string, id: string) {
  const expected = paperReviewProof(userId, paper, id);
  return Boolean(expected && proof && /^[a-f0-9]{64}$/.test(proof) && timingSafeEqual(Buffer.from(expected), Buffer.from(proof)));
}

/** Read historic free grants without inserting into today's quota ledger. */
export async function historicPaperGrants(userId: string, ids: string[]): Promise<Set<string>> {
  if (!ids.length) return new Set();
  if (monthlySelected()) {
    const c = monthlyConfig();
    const rows = await prisma.$queryRawUnsafe<{ id: string }[]>(`SELECT DISTINCT g.id FROM billing_subscription_account a,
      LATERAL jsonb_each(a.payload->'grants') d,
      LATERAL jsonb_array_elements_text(d.value) g(id)
      WHERE a.user_id=$1 AND a.mode=$2 AND a.source_instance=$3 AND g.id=ANY($4::text[])`, userId, c.mode, c.sourceInstance, ids);
    return new Set(rows.map(r => r.id));
  }
  const rows = await prisma.$queryRawUnsafe<{ id: string }[]>(`SELECT DISTINCT question_id AS id FROM billing_daily_grant
    WHERE user_id=$1 AND mode=$2 AND question_id=ANY($3::text[])`, userId, billingConfig().mode, ids);
  return new Set(rows.map(r => r.id));
}
