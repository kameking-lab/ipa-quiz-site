// POST /api/account/bookmark-sync
//
// ログインユーザーのみ。localStorage のブックマーク（タグ inline 込み）を DB に
// last-write-wins マージし、DB の全ブックマークを返す。
//
// Body: { entries: BookmarkSyncEntry[] }
// Response: { entries: BookmarkSyncEntry[], merged: number, total: number }
//
// マージルール:
//   - (userId, questionId) で一意
//   - incoming.updatedAt > 既存.updatedAt のときだけ上書き（version++）
//   - 既存にしか無いものは保持（union。削除同期は v1 非対応）
//
// 未ログイン → 401 / DB 未設定 → 503

import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/db/prisma";
import type { BookmarkSyncEntry } from "@/lib/sync/types";

export const runtime = "nodejs";

function isEntry(x: unknown): x is BookmarkSyncEntry {
  if (!x || typeof x !== "object") return false;
  const e = x as Record<string, unknown>;
  return (
    typeof e.questionId === "string" &&
    Array.isArray(e.tags) &&
    typeof e.updatedAt === "number"
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
  const incoming: BookmarkSyncEntry[] = Array.isArray(body.entries)
    ? body.entries.filter(isEntry).slice(0, 2000)
    : [];

  let merged = 0;
  if (incoming.length > 0) {
    const existing = await prisma.bookmark.findMany({
      where: { userId },
      select: { questionId: true, updatedAt: true },
    });
    const existingMap = new Map(
      existing.map((r: { questionId: string; updatedAt: Date }) => [
        r.questionId,
        r.updatedAt.getTime(),
      ]),
    );

    for (const e of incoming) {
      const prevUpdated = existingMap.get(e.questionId);
      if (prevUpdated !== undefined && e.updatedAt <= prevUpdated) continue;
      const data = {
        tags: (e.tags ?? []).slice(0, 5).map((t) => String(t).slice(0, 40)),
        questionSnippet: String(e.questionSnippet ?? "").slice(0, 200),
        exam: String(e.exam ?? "").slice(0, 8),
        year: Number.isFinite(e.year) ? Number(e.year) : 0,
        season: String(e.season ?? "").slice(0, 16),
        qNumber: Number.isFinite(e.qNumber) ? Number(e.qNumber) : 0,
        category: String(e.category ?? "").slice(0, 64),
        bookmarkedAt: new Date(e.bookmarkedAt ?? e.updatedAt),
        updatedAt: new Date(e.updatedAt),
      };
      await prisma.bookmark.upsert({
        where: { userId_questionId: { userId, questionId: e.questionId } },
        create: { userId, questionId: e.questionId, ...data, version: 1 },
        update: { ...data, version: { increment: 1 } },
      });
      merged += 1;
    }
  }

  const all = await prisma.bookmark.findMany({
    where: { userId },
    orderBy: { bookmarkedAt: "desc" },
  });
  const entries: BookmarkSyncEntry[] = all.map(
    (r: {
      questionId: string;
      tags: string[];
      questionSnippet: string;
      exam: string;
      year: number;
      season: string;
      qNumber: number;
      category: string;
      bookmarkedAt: Date;
      updatedAt: Date;
    }) => ({
      questionId: r.questionId,
      tags: r.tags,
      questionSnippet: r.questionSnippet,
      exam: r.exam,
      year: r.year,
      season: r.season,
      qNumber: r.qNumber,
      category: r.category,
      bookmarkedAt: r.bookmarkedAt.getTime(),
      updatedAt: r.updatedAt.getTime(),
    }),
  );

  return NextResponse.json({ entries, merged, total: all.length });
}
