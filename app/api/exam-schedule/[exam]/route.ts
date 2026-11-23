import { NextResponse } from "next/server";
import { getExamSchedule } from "@/lib/study-plan/schedule-server";

export const runtime = "nodejs";
export async function GET(_request: Request, { params }: { params: Promise<{ exam: string }> }) {
  const { exam } = await params;
  if (!/^[a-z0-9][a-z0-9-]{0,100}$/.test(exam)) return NextResponse.json({ error: "invalid_exam" }, { status: 400 });
  const schedule = await getExamSchedule(exam);
  return NextResponse.json(schedule, { headers: {
    "Cache-Control": schedule.source === "tsugino" ? "public, max-age=0, s-maxage=3600" : "public, max-age=0, s-maxage=60",
  } });
}
