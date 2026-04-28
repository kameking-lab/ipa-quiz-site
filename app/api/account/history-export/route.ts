// GET /api/account/history-export
//
// ログインユーザーの全学習履歴を JSON ファイルとしてダウンロードさせる。
// プラン問わず誰でもエクスポート可能（GDPR / 個人情報の可搬性遵守）。

import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/db/prisma";

export const runtime = "nodejs";

export async function GET() {
  if (!process.env.DATABASE_URL) {
    return NextResponse.json({ error: "db_not_configured" }, { status: 503 });
  }

  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }

  const records = await prisma.studyRecord.findMany({
    where: { userId: session.user.id },
    orderBy: { answeredAt: "asc" },
    select: { questionId: true, correct: true, answeredAt: true, timeSpentMs: true },
  });

  const payload = {
    exportedAt: new Date().toISOString(),
    user: {
      id: session.user.id,
      email: session.user.email,
      plan: session.user.plan,
    },
    entries: records.map((r: { questionId: string; correct: boolean; answeredAt: Date; timeSpentMs: number | null }) => ({
      id: r.questionId,
      correct: r.correct,
      at: r.answeredAt.getTime(),
      timeSpentMs: r.timeSpentMs,
    })),
  };

  return new NextResponse(JSON.stringify(payload, null, 2), {
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "Content-Disposition": `attachment; filename="ipa-quiz-history-${Date.now()}.json"`,
    },
  });
}
