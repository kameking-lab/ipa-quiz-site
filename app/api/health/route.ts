import { NextResponse } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/** Public liveness: never wakes the database or calls another service. */
export async function GET() {
  return NextResponse.json({
    ok: true,
    kind: "liveness",
    ts: new Date().toISOString(),
    checks: {
      routes: { ok: true, detail: "next-app booted" },
      database: { ok: true, checked: false, detail: "not part of liveness" },
      ai_providers: { ok: true, checked: false, detail: "not part of liveness" },
    },
  }, { headers: { "Cache-Control": "no-store" } });
}
