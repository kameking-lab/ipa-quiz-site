import { createHash, timingSafeEqual } from "node:crypto";
import { json } from "@/lib/billing/runtime";
import { feedbackRealm, feedbackStore } from "@/lib/feedback/unlock-runtime";
export const runtime = "nodejs";

/** Dedicated read-only credential; never share billing/Auth secrets with note. */
export async function GET(request: Request) {
  const expected = process.env.KAKOMON_FEEDBACK_READ_TOKEN_SHA256;
  if (!expected || !/^[a-f0-9]{64}$/.test(expected)) return json({ error: "integration_unconfigured" }, 503);
  const bearer = request.headers.get("authorization")?.match(/^Bearer ([^\s]{32,256})$/)?.[1] ?? "";
  const actual = createHash("sha256").update(bearer).digest();
  if (!bearer || !timingSafeEqual(actual, Buffer.from(expected, "hex"))) return json({ error: "unauthorized" }, 401);
  const cursor = new URL(request.url).searchParams.get("after") ?? "0";
  if (!/^(0|[1-9]\d{0,17})$/.test(cursor)) return json({ error: "invalid_cursor" }, 400);
  try { return json(await feedbackStore().page(feedbackRealm(), cursor)); }
  catch { return json({ error: "feedback_unavailable" }, 503); }
}
