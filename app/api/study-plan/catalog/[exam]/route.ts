import { NextResponse } from "next/server";
import { ALL_QUIZ_EXAM_CODES } from "@/lib/exam-config";
import type { ExamCode } from "@/lib/questions/types";
import { getQuestionsForExam } from "@/lib/questions/get-questions";
import { isPlanScorableQuestion } from "@/lib/questions/filter";
import { EXAM_CATALOG } from "@/lib/exam-library-catalog";
import { findQualificationHub, qualificationHubMatchesEntry } from "@/lib/exam-qualification-hubs";
import { loadExamPaper } from "@/lib/exam-library-papers";
import { isScorableQuestion } from "@/lib/exam-library-model";
import { isExamReferenceOnly } from "@/lib/exam-library/survey-assistant-reference-policy";
import { orderedPlanQuestions } from "@/lib/study-plan/pace";
export const runtime = "nodejs";

export async function GET(_request: Request, { params }: { params: Promise<{ exam: string }> }) {
  const { exam } = await params;
  if (!ALL_QUIZ_EXAM_CODES.includes(exam as ExamCode)) {
    const hub = findQualificationHub(exam);
    const papers = EXAM_CATALOG.filter(entry => hub ? qualificationHubMatchesEntry(hub, entry) : `${entry.group}-${entry.subject}` === exam);
    if (!papers.length) return NextResponse.json({ error: "not_found" }, { status: 404 });
    const questions = papers.sort((a, b) => b.date.localeCompare(a.date)).flatMap(entry => (loadExamPaper(entry.id) ?? [])
      .filter(q => isScorableQuestion(q) && !isExamReferenceOnly(q)).map(q => ({ id: q.id, exam, year: Number(entry.date.slice(0, 4)),
        season: "published", session: entry.subject, qNumber: q.number, paperId: entry.id, paperTitle: `${entry.subject} ${entry.label}`,
        pdfUrl: entry.pdfUrl, indexUrl: entry.indexUrl, number: q.number, choiceCount: q.choiceCount, answerAuthority: q.answerAuthority, scorable: true })));
    return NextResponse.json({ questions: orderedPlanQuestions(questions, exam) }, { headers: { "Cache-Control": "public, max-age=300" } });
  }
  const questions = (await getQuestionsForExam(exam as ExamCode)).filter(isPlanScorableQuestion)
    .sort((a, b) => b.year - a.year || a.season.localeCompare(b.season) || a.session.localeCompare(b.session) || a.qNumber - b.qNumber || a.id.localeCompare(b.id));
  return NextResponse.json({ questions: orderedPlanQuestions(questions.map(q => ({ id: q.id, exam, year: q.year,
    season: q.season, session: q.session, qNumber: q.qNumber, part: q.part })), exam) }, { headers: { "Cache-Control": "public, max-age=300" } });
}
