import { NextResponse } from "next/server";
import { readStudyPresence, recordStudyPresence, recordLegacyStudyPresence } from "@/lib/study-presence-store";
import { canonicalPresenceExam, isPresenceBot, PRESENCE_WINDOW_MS } from "@/lib/study-presence";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
const headers = { "Cache-Control": "no-store" };
const unavailable = (status: number) => NextResponse.json({ count: null, exams: null }, { status, headers });

function measurementEnabled(request: Request) {
  const hostname = new URL(request.url).hostname;
  return process.env.NODE_ENV === "production" &&
    (!process.env.VERCEL_ENV || process.env.VERCEL_ENV === "production") &&
    !["localhost", "127.0.0.1", "[::1]"].includes(hostname) && Boolean(process.env.DATABASE_URL);
}

export async function GET(request: Request) {
  if (!measurementEnabled(request)) return unavailable(503);
  try { return NextResponse.json(await readStudyPresence(), { headers }); }
  catch { return unavailable(503); }
}

export async function POST(request: Request) {
  if (request.headers.get("origin") !== new URL(request.url).origin ||
      request.headers.get("sec-fetch-site") === "cross-site" ||
      isPresenceBot(request.headers.get("user-agent") ?? "")) return unavailable(403);
  if (!request.headers.get("content-type")?.startsWith("application/json")) return unavailable(415);
  const body = await request.text();
  if (body.length > 256) return unavailable(400);
  let visitorId: unknown;
  let idleMs: unknown;
  let exam: unknown;
  let previousVisitorId: unknown;
  try { ({ visitorId, idleMs, exam, previousVisitorId } = JSON.parse(body)); } catch { return unavailable(400); }
  if (typeof idleMs !== "number" || !Number.isInteger(idleMs) || idleMs < 0 || idleMs >= PRESENCE_WINDOW_MS ||
      typeof visitorId !== "string" || !/^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(visitorId)) return unavailable(400);
  // Only an absent field is the legacy format; explicit null/unknown values remain invalid.
  if (exam !== undefined && (typeof exam !== "string" || !canonicalPresenceExam(exam))) return unavailable(400);
  if (previousVisitorId !== undefined && (typeof previousVisitorId !== "string" ||
      !/^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(previousVisitorId) || previousVisitorId === visitorId)) return unavailable(400);
  if (!measurementEnabled(request)) return unavailable(503);
  try {
    if (exam === undefined) {
      const count = await recordLegacyStudyPresence(visitorId, idleMs, previousVisitorId as string | undefined);
      // Old clients consume only count: include active unqualified browsers without guessing their exam.
      return NextResponse.json({ count }, { headers });
    }
    return NextResponse.json(await recordStudyPresence(visitorId, idleMs, canonicalPresenceExam(exam as string)!, previousVisitorId as string | undefined), { headers });
  }
  catch { return unavailable(503); }
}
