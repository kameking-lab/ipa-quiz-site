import { NextResponse } from "next/server";
import { getContentCounts } from "@/lib/stats/content-count";

export const runtime = "nodejs";
export const revalidate = 3600; // 1h — content data changes only via deploy

export async function GET() {
  const counts = getContentCounts();
  return NextResponse.json(counts);
}
