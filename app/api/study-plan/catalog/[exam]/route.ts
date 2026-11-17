import { NextResponse } from "next/server";
import { ALL_QUIZ_EXAM_CODES } from "@/lib/exam-config";
import type { ExamCode } from "@/lib/questions/types";
import { getQuestionsForExam } from "@/lib/questions/get-questions";
import { isPracticeReadyQuestion } from "@/lib/questions/filter";
export const runtime = "nodejs";

export async function GET(_request: Request, { params }: { params: Promise<{ exam: string }> }) {
  const { exam } = await params;
  if (!ALL_QUIZ_EXAM_CODES.includes(exam as ExamCode)) return NextResponse.json({ error: "not_found" }, { status: 404 });
  const questions = (await getQuestionsForExam(exam as ExamCode)).filter(isPracticeReadyQuestion)
    .sort((a, b) => b.year - a.year || a.season.localeCompare(b.season) || a.session.localeCompare(b.session) || a.qNumber - b.qNumber);
  return NextResponse.json({ questions: questions.map(q => ({ id: q.id, exam: q.exam, year: q.year,
    season: q.season, session: q.session, qNumber: q.qNumber, part: q.part })) }, { headers: { "Cache-Control": "public, max-age=300" } });
}
