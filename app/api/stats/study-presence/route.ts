import { NextResponse } from "next/server";
import { recordStudyPresence } from "@/lib/study-presence-store";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
const headers = { "Cache-Control": "no-store" };

export async function POST(request: Request) {
  // Browser heartbeats only; another website must not inflate our count.
  if (request.headers.get("origin") !== new URL(request.url).origin ||
      request.headers.get("sec-fetch-site") === "cross-site") {
    return NextResponse.json({ count: null }, { status: 403, headers });
  }
  if (!request.headers.get("content-type")?.startsWith("application/json")) {
    return NextResponse.json({ count: null }, { status: 415, headers });
  }
  const body = await request.text();
  if (body.length > 160) return NextResponse.json({ count: null }, { status: 400, headers });
  let visitorId: unknown;
  let idleMs: unknown;
  try { ({ visitorId, idleMs } = JSON.parse(body)); } catch {
    return NextResponse.json({ count: null }, { status: 400, headers });
  }
  if (typeof idleMs !== "number" || !Number.isInteger(idleMs) || idleMs < 0 || idleMs >= 120_000) {
    return NextResponse.json({ count: null }, { status: 400, headers });
  }
  if (typeof visitorId !== "string" || !/^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(visitorId)) {
    return NextResponse.json({ count: null }, { status: 400, headers });
  }
  if (!process.env.DATABASE_URL) return NextResponse.json({ count: null }, { status: 503, headers });
  try {
    return NextResponse.json({ count: await recordStudyPresence(visitorId, idleMs) }, { headers });
  } catch {
    return NextResponse.json({ count: null }, { status: 503, headers });
  }
}
