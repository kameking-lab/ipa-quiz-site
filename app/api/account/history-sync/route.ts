// POST /api/account/history-sync
//
// ログインユーザーのみ。localStorage の履歴を DB にマージしてから
// DB に保存されている全履歴を返す。
//
// Body: { entries: { id, selected, correct, at }[] }
// Response: { entries: HistoryEntry[], merged: number, total: number }
//
// マージルール:
//   - (userId, questionId, answeredAt) の三つ組で重複判定
//   - 既存の行があればスキップ、なければ挿入
//   - StudyRecord には selected を保存しない（クライアント側でのみ必要）
//
// 未ログイン → 401 / DB 未設定 → 503

import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/db/prisma";

export const runtime = "nodejs";

interface ClientEntry {
  id: string;
  selected?: string;
  correct: boolean;
  at: number;
}

function isEntry(x: unknown): x is ClientEntry {
  if (!x || typeof x !== "object") return false;
  const e = x as Record<string, unknown>;
  return (
    typeof e.id === "string" &&
    typeof e.correct === "boolean" &&
    typeof e.at === "number"
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
  const incoming: ClientEntry[] = Array.isArray(body.entries)
    ? body.entries.filter(isEntry)
    : [];

  let merged = 0;
  if (incoming.length > 0) {
    // 既存レコードをまとめて取得し、クライアントから来たものとの差分だけ挿入
    const existing = await prisma.studyRecord.findMany({
      where: { userId },
      select: { questionId: true, answeredAt: true },
    });
    const existingSet = new Set(
      existing.map((r: { questionId: string; answeredAt: Date }) => `${r.questionId}\t${r.answeredAt.getTime()}`),
    );

    const toInsert = incoming
      .filter((e) => !existingSet.has(`${e.id}\t${e.at}`))
      .map((e) => ({
        userId,
        questionId: e.id,
        correct: e.correct,
        answeredAt: new Date(e.at),
      }));

    if (toInsert.length > 0) {
      const res = await prisma.studyRecord.createMany({
        data: toInsert,
        skipDuplicates: true,
      });
      merged = res.count;
    }
  }

  const all = await prisma.studyRecord.findMany({
    where: { userId },
    orderBy: { answeredAt: "asc" },
    select: { questionId: true, correct: true, answeredAt: true },
  });

  const entries = all.map((r: { questionId: string; correct: boolean; answeredAt: Date }) => ({
    id: r.questionId,
    correct: r.correct,
    at: r.answeredAt.getTime(),
  }));

  return NextResponse.json({ entries, merged, total: all.length });
}
