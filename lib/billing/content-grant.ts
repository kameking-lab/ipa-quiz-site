import "server-only";
import { POST } from "@/app/api/billing/question/route";
import { NATIVE_HEADER } from "@/mobile/shared/contracts";
import { requiresPracticeContentGrant } from "./practice-access";
import { json } from "./runtime";

type GrantOptions = { paper?: string; app?: boolean };

/** Adapter for older GET/batch APIs: same identity, same transaction, same IDs. */
export async function contentGrant(request: Request, id: string, { paper, app = false }: GrantOptions = {}) {
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
  return POST(new Request(new URL("/api/billing/question", request.url), {
    method: "POST", headers, body: JSON.stringify({ id, shuffle: false }),
  }));
}
export async function permittedBatch<T extends { id: string }>(request: Request, rows: T[], options?: GrantOptions) {
  if (!requiresPracticeContentGrant(request, options?.app)) return { rows, response: null };
  const allowed: T[] = [];
  for (const row of rows) {
    const grant = await contentGrant(request, row.id, options);
    if (!grant.ok) {
      if (grant.status === 429 && allowed.length) return { rows: allowed, response: null };
      return { rows: [], response: grant };
    }
    allowed.push(row);
  }
  return { rows: allowed, response: null };
}
