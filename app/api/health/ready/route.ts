import { NextResponse } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const maxDuration = 10;
const json = (value: object, status: number) => NextResponse.json(value, {
  status, headers: { "Cache-Control": "private, no-store", Vary: "Authorization" },
});

/** Explicit operator readiness only. Reuse an existing cron credential; never provision one here. */
export async function GET(request: Request) {
  if (!process.env.CRON_SECRET) return json({ ok: false, error: "readiness_unconfigured" }, 503);
  if (request.headers.get("authorization") !== `Bearer ${process.env.CRON_SECRET}`) {
    return json({ ok: false, error: "unauthorized" }, 401);
  }
  if (!process.env.DATABASE_URL) return json({ ok: false, error: "database_unconfigured" }, 503);
  try {
    const { prisma } = await import("@/lib/db/prisma");
    await prisma.$queryRaw`SELECT 1`;
    return json({ ok: true, kind: "readiness", checks: { database: { ok: true, checked: true } } }, 200);
  } catch {
    // Never expose a connection string, host, or raw provider exception.
    return json({ ok: false, kind: "readiness", error: "database_unavailable" }, 503);
  }
}
