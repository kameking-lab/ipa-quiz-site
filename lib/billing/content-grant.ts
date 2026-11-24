import "server-only";
import { practiceQuestion } from "./practice-question";
import { BILLING_SAMPLE_ID } from "./sample";
import { NATIVE_HEADER } from "@/mobile/shared/contracts";
import { isPracticeReadyQuestion } from "@/lib/questions/filter";
import type { Question } from "@/lib/questions/types";
import { requiresPracticeContentGrant } from "./practice-access";
import { json } from "./runtime";

type GrantOptions = { paper?: string; app?: boolean };

/** Adapter for older GET/batch APIs: same identity, same transaction, same IDs. */
export async function contentGrant(request: Request, id: string, { paper, app = false }: GrantOptions = {}, retryIds?: Set<string>) {
  const headers = new Headers(request.headers);
  if (!headers.has("origin")) {
    const site = headers.get("Sec-Fetch-Site");
    if (site === "cross-site" || site === "same-site") return json({ error: "invalid_origin" }, 403);
    headers.set("origin", new URL(request.url).origin);
  }
  headers.set("Content-Type", "application/json");
  if (!app) headers.delete(NATIVE_HEADER);
  headers.delete("X-Kakomon-Question-Hash");
  headers.delete("X-Kakomon-Material");
  headers.delete("X-Kakomon-Paper");
  if (paper) headers.set("X-Kakomon-Paper", paper);
  return practiceQuestion(new Request(new URL("/api/billing/question", request.url), {
    method: "POST", headers, body: JSON.stringify({ id, shuffle: false }),
  }), retryIds);
}
export async function permittedBatch(request: Request, rows: Question[], options?: GrantOptions) {
  if (!requiresPracticeContentGrant(request, options?.app)) return { rows, response: null };
  const eligible = rows.filter(isPracticeReadyQuestion);
  const allowed: Question[] = [];
  // A limit can occur before a question the learner already opened today.
  // Candidate IDs stay on the server. Each still goes through the ordinary grant.
  const retryIds = new Set([BILLING_SAMPLE_ID]);
  let limit: Response | null = null;
  for (const row of eligible) {
    if (limit && !retryIds.has(row.id)) continue;
    const grant = await contentGrant(request, row.id, options, retryIds);
    if (!grant.ok) {
      if (grant.status === 429 && (await grant.clone().json()).error === "daily_limit") {
        limit ??= grant;
        continue;
      }
      return { rows: [], response: grant };
    }
    allowed.push(row);
    // The paid grant covers this request's entire server-selected, practice-ready batch.
    if ((await grant.json()).access?.kind === "pass") return { rows: eligible, response: null };
  }
  return { rows: allowed, response: allowed.length ? null : limit };
}
