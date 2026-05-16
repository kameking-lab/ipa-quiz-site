import { NextResponse } from "next/server";
import { getApiUsageStats } from "@/lib/rate-limit";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  const stats = await getApiUsageStats();
  return NextResponse.json(stats);
}
