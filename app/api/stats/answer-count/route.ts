import { NextResponse } from "next/server";

export const runtime = "nodejs";
export const revalidate = 300; // 5 分キャッシュ

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

export async function GET(): Promise<
  NextResponse<{ count: number | null; source: "db" | "unavailable" }>
> {
  const actual = await fetchActualCount();
  if (actual !== null) {
    return NextResponse.json({ count: actual, source: "db" });
  }
  return NextResponse.json({ count: null, source: "unavailable" });
}
