import { NextResponse } from "next/server";

export const runtime = "nodejs";
export const revalidate = 300; // 5 分キャッシュ

// 累計回答数。DATABASE_URL が無いビルドではベースライン値を返す。
// ベースラインは「2026-04 までの推定累計回答」。本番接続後は DB の実値を返す。
const BASELINE_ANSWER_COUNT = 124_000;

async function fetchActualCount(): Promise<number | null> {
  if (!process.env.DATABASE_URL) return null;
  try {
    const { prisma } = await import("@/lib/db/prisma");
    const count = await prisma.studyRecord.count();
    return count;
  } catch {
    return null;
  }
}

export async function GET(): Promise<NextResponse<{ count: number; source: "db" | "baseline" }>> {
  const actual = await fetchActualCount();
  if (actual !== null) {
    return NextResponse.json({ count: BASELINE_ANSWER_COUNT + actual, source: "db" });
  }
  return NextResponse.json({ count: BASELINE_ANSWER_COUNT, source: "baseline" });
}
