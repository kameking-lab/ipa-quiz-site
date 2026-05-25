// POST /api/account/custom-tag-sync
//
// ログインユーザーのみ。ユーザーのタグカタログ（name/color/sortOrder）を
// last-write-wins マージし、DB の全カタログを返す。
//
// Body: { entries: CustomTagSyncEntry[] }
// Response: { entries: CustomTagSyncEntry[], merged: number, total: number }
//
// 未ログイン → 401 / DB 未設定 → 503

import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/db/prisma";
import type { CustomTagSyncEntry } from "@/lib/sync/types";

export const runtime = "nodejs";

function isEntry(x: unknown): x is CustomTagSyncEntry {
  if (!x || typeof x !== "object") return false;
  const e = x as Record<string, unknown>;
  return typeof e.name === "string" && typeof e.updatedAt === "number";
}

export async function POST(req: Request) {
  if (!process.env.DATABASE_URL) {
    return NextResponse.json({ error: "db_not_configured" }, { status: 503 });
  }
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }
  const userId = session.user.id;

  const body = (await req.json().catch(() => ({}))) as { entries?: unknown };
  const incoming: CustomTagSyncEntry[] = Array.isArray(body.entries)
    ? body.entries.filter(isEntry).slice(0, 200)
    : [];

  let merged = 0;
  if (incoming.length > 0) {
    const existing = await prisma.customTag.findMany({
      where: { userId },
      select: { name: true, updatedAt: true },
    });
    const existingMap = new Map(
      existing.map((r: { name: string; updatedAt: Date }) => [r.name, r.updatedAt.getTime()]),
    );

    for (const e of incoming) {
      const name = e.name.slice(0, 40);
      if (!name) continue;
      const prevUpdated = existingMap.get(name);
      if (prevUpdated !== undefined && e.updatedAt <= prevUpdated) continue;
      const data = {
        color: String(e.color ?? "zinc").slice(0, 16),
        sortOrder: Number.isFinite(e.sortOrder) ? Number(e.sortOrder) : 0,
        updatedAt: new Date(e.updatedAt),
      };
      await prisma.customTag.upsert({
        where: { userId_name: { userId, name } },
        create: { userId, name, ...data, version: 1 },
        update: { ...data, version: { increment: 1 } },
      });
      merged += 1;
    }
  }

  const all = await prisma.customTag.findMany({
    where: { userId },
    orderBy: { sortOrder: "asc" },
  });
  const entries: CustomTagSyncEntry[] = all.map(
    (r: { name: string; color: string; sortOrder: number; updatedAt: Date }) => ({
      name: r.name,
      color: r.color,
      sortOrder: r.sortOrder,
      updatedAt: r.updatedAt.getTime(),
    }),
  );

  return NextResponse.json({ entries, merged, total: all.length });
}
