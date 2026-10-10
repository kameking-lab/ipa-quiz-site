import { findExamEntry } from "@/lib/exam-library-catalog";
import { loadExamPaper } from "@/lib/exam-library-papers";
import { examLibraryHref } from "@/lib/exam-library-navigation";
import { NextRequest, NextResponse } from "next/server";
import { ALL_QUIZ_EXAM_CODES, EXAM_CONFIGS } from "@/lib/exam-config";
import { getQuestionsForExam } from "@/lib/questions/get-questions";
import { isPracticeReadyQuestion } from "@/lib/questions/filter";
import { questionPagePath } from "@/lib/seo/question-url";
import { practiceSessionLabel } from "@/lib/questions/practice-session";
import { formatYearSeason } from "@/lib/utils";
import type { ExamCode } from "@/lib/questions/types";

export async function GET(request: NextRequest) {
  const sp = request.nextUrl.searchParams;
  const paperId = sp.get("paper");
  if (paperId) {
    const entry = findExamEntry(paperId);
    const questions = entry ? loadExamPaper(paperId) : null;
    const q = questions?.find((q) => q.id === sp.get("question"));
    if (!entry || !questions || !q) return NextResponse.json(null, { status: 404 });
    const href = `/e-learning/exams/${encodeURIComponent(paperId)}`;
    return NextResponse.json({ exam: paperId, name: entry.subject, href: `${href}?question=${encodeURIComponent(q.id)}`, caption: `${entry.label} · 問${q.number}`, total: questions.length, validIds: [], reviewHref: `${href}?view=results`, yearHref: examLibraryHref(entry.group, entry.subject) }, { headers: { "Cache-Control": "private, no-store" } });
  }
  const exam = sp.get("exam") as ExamCode;
  if (!ALL_QUIZ_EXAM_CODES.includes(exam)) return NextResponse.json(null, { status: 404 });
  const questions = (await getQuestionsForExam(exam)).filter(isPracticeReadyQuestion);
  const q = questions.find((q) => q.year === Number(sp.get("year")) && q.season === sp.get("season") && q.session === sp.get("session") && q.qNumber === Number(sp.get("qNumber")) && (q.part ?? "") === (sp.get("part") ?? ""));
  if (!q) return NextResponse.json(null, { status: 404 });
  const paper = questions.filter((other) => other.year === q.year && other.season === q.season && other.session === q.session);
  const practice = new URLSearchParams({ mode: "year", exam, year: String(q.year) });
  if (q.season) practice.set("season", q.season);
  if (q.session) practice.set("session", q.session);
  practice.set("question", q.id);
  return NextResponse.json({
    exam, name: EXAM_CONFIGS[exam].nameFull, href: `/quiz?${practice}`, sourceHref: questionPagePath(q),
    caption: `${formatYearSeason(q.year, q.season)} ${practiceSessionLabel(q.session) ?? ""} · 問${q.qNumber}${q.part ? ` (${q.part})` : ""}`,
    total: paper.length, validIds: questions.map((other) => other.id),
    reviewHref: `/quiz?mode=review&scope=exam&reviewKind=wrong&exam=${exam}`, yearHref: `/${exam}`,
  }, { headers: { "Cache-Control": "private, no-store" } });
}