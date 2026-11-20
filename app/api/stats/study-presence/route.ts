import { NextResponse } from "next/server";
import { z } from "zod";
import { readStudyPresence, recordStudyPresence } from "@/lib/study-presence-store";
import { canonicalPresenceExam, isPresenceBot, PRESENCE_IDLE_MS, PRESENCE_POLL_MS, PRESENCE_VISITOR_ID, PRESENCE_WINDOW_MS } from "@/lib/study-presence";
import { unavailablePresence, type PresenceResponse } from "@/lib/study-presence-contract";
import { createPresenceService } from "@/lib/study-presence-service";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
const headers = { "Cache-Control": "no-store" };
const service = createPresenceService({ read: readStudyPresence, record: recordStudyPresence });
const unavailable = (status: number) => NextResponse.json(unavailablePresence("disabled", PRESENCE_POLL_MS), { status, headers });
const visitor = {
  visitorId: z.string().regex(PRESENCE_VISITOR_ID).toLowerCase(),
  previousVisitorId: z.string().regex(PRESENCE_VISITOR_ID).toLowerCase().optional(),
};
const answer = z.object({ ...visitor, exam: z.string(), answeredAgoMs: z.int().min(0).lt(PRESENCE_WINDOW_MS) }).strict();
const heartbeat = z.object({ ...visitor, exam: z.string().optional(), idleMs: z.int().min(0).lt(PRESENCE_IDLE_MS) }).strict();

function respond(result: PresenceResponse) {
  if (result.status === "unavailable") return NextResponse.json(result,
    { status: 503, headers: { ...headers, "Retry-After": String(result.retryAfterSeconds) } });
  return NextResponse.json(result, { headers });
}

function measurementEnabled(request: Request) {
  const hostname = new URL(request.url).hostname;
  return process.env.NODE_ENV === "production" &&
    (!process.env.VERCEL_ENV || process.env.VERCEL_ENV === "production") &&
    !["localhost", "127.0.0.1", "[::1]"].includes(hostname) && Boolean(process.env.DATABASE_URL);
}

export async function GET(request: Request) {
  if (!measurementEnabled(request)) return unavailable(503);
  return respond(await service.read());
}

export async function POST(request: Request) {
  const receivedAt = Date.now();
  if (request.headers.get("origin") !== new URL(request.url).origin ||
      request.headers.get("sec-fetch-site") === "cross-site" ||
      isPresenceBot(request.headers.get("user-agent") ?? "")) return unavailable(403);
  if (!request.headers.get("content-type")?.startsWith("application/json")) return unavailable(415);
  const body = await request.text();
  if (body.length > 256) return unavailable(400);
  let payload: unknown;
  try { payload = JSON.parse(body); } catch { return unavailable(400); }
  const submitted = answer.safeParse(payload);
  const parsed = submitted.success ? submitted : heartbeat.safeParse(payload);
  if (!parsed.success) return unavailable(400);
  const { visitorId, previousVisitorId, exam } = parsed.data;
  const canonical = exam === undefined ? null : canonicalPresenceExam(exam);
  if ((exam !== undefined && !canonical) || previousVisitorId === visitorId) return unavailable(400);
  if (!measurementEnabled(request)) return unavailable(503);
  if (submitted.success && canonical) {
    const failure = await service.record(visitorId, receivedAt - submitted.data.answeredAgoMs, canonical, previousVisitorId);
    return failure ? respond(failure) : new Response(null, { status: 204, headers });
  }
  // Old tabs can still read the count, but their page-open heartbeat never updates it.
  const result = await service.read();
  if (exam === undefined && result.status === "measured") return NextResponse.json({ count: result.count }, { headers });
  return respond(result);
}
