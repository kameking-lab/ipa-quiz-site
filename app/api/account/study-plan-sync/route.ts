// POST /api/account/study-plan-sync
//
// ログインユーザーのみ。学習計画（payload + progress を JSON で）を
// last-write-wins マージし、DB の全計画を返す。
//
// Body: { entries: StudyPlanSyncEntry[] }
// Response: { entries: StudyPlanSyncEntry[], merged: number, total: number }
//
// 未ログイン → 401 / DB 未設定 → 503

import { NextResponse } from "next/server";
import { Prisma } from "@prisma/client";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/db/prisma";
import type { StudyPlanSyncEntry } from "@/lib/sync/types";

export const runtime = "nodejs";

function isEntry(x: unknown): x is StudyPlanSyncEntry {
  if (!x || typeof x !== "object") return false;
  const e = x as Record<string, unknown>;
  return (
    typeof e.id === "string" &&
    typeof e.updatedAt === "number" &&
    e.payload !== undefined
  );
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
  const incoming: StudyPlanSyncEntry[] = Array.isArray(body.entries)
    ? body.entries.filter(isEntry).slice(0, 50)
    : [];

  let merged = 0;
  if (incoming.length > 0) {
    const existing = await prisma.studyPlan.findMany({
      where: { userId },
      select: { id: true, updatedAt: true },
    });
    const existingMap = new Map(
      existing.map((r: { id: string; updatedAt: Date }) => [r.id, r.updatedAt.getTime()]),
    );

    for (const e of incoming) {
      const prevUpdated = existingMap.get(e.id);
      if (prevUpdated !== undefined && e.updatedAt <= prevUpdated) continue;
      const data = {
        payload: e.payload as Prisma.InputJsonValue,
        progress:
          e.progress === undefined || e.progress === null
            ? Prisma.JsonNull
            : (e.progress as Prisma.InputJsonValue),
        updatedAt: new Date(e.updatedAt),
      };
      if (prevUpdated !== undefined) {
        // Owned by this user (id was in existingMap) → safe to update.
        await prisma.studyPlan.update({
          where: { id: e.id },
          data: { ...data, version: { increment: 1 } },
        });
        merged += 1;
        continue;
      }
      // New to this user. The plan id is client-generated, so guard against an
      // id that already belongs to ANOTHER user before creating (IDOR): an
      // unscoped upsert on the PK would let one user overwrite another's plan.
      const clash = await prisma.studyPlan.findUnique({
        where: { id: e.id },
        select: { userId: true },
      });
      if (clash && clash.userId !== userId) continue; // not ours — skip
      await prisma.studyPlan.create({
        data: {
          id: e.id,
          userId,
          createdAt: new Date(e.createdAt ?? e.updatedAt),
          ...data,
          version: 1,
        },
      });
      merged += 1;
    }
  }

  const all = await prisma.studyPlan.findMany({
    where: { userId },
    orderBy: { updatedAt: "desc" },
  });
  const entries: StudyPlanSyncEntry[] = all.map(
    (r: { id: string; payload: unknown; progress: unknown; createdAt: Date; updatedAt: Date }) => ({
      id: r.id,
      payload: r.payload,
      progress: r.progress ?? undefined,
      createdAt: r.createdAt.getTime(),
      updatedAt: r.updatedAt.getTime(),
    }),
  );

  return NextResponse.json({ entries, merged, total: all.length });
}
