import { listExamLearningSummaries } from "@/lib/exam-library-session";
import { readLastQuestion } from "@/lib/storage/last-question";
import type { AnswerAttempt } from "@/lib/study-plan/pace";
import { formatYearSeason } from "@/lib/utils";

export function readHomeStudy(attempts: readonly AnswerAttempt[], examFor: (id: string) => string | undefined) {
  const latest = new Map<string, number>();
  function record(exam: string | undefined, at: number) {
    if (exam && Number.isFinite(at) && at > (latest.get(exam) ?? -Infinity)) latest.set(exam, at);
  }
  for (const { id, at } of attempts) record(examFor(id), at);

  const last = readLastQuestion();
  if (last) record(last.exam, last.answeredAt);
  const papers = listExamLearningSummaries().filter(paper => paper.answered > 0);
  for (const paper of papers) record(examFor(`${paper.examId}-`), Date.parse(paper.updatedAt));

  const paper = papers.find(paper => paper.lastQuestionId);
  const recent = [...latest].sort(([a, x], [b, y]) => y - x || a.localeCompare(b, "en"));
  if (paper?.lastQuestionId && (!last || Date.parse(paper.updatedAt) > last.answeredAt)) {
    const query = new URLSearchParams({ paper: paper.examId, question: paper.lastQuestionId });
    return { recent, query: query.toString(), exam: examFor(`${paper.examId}-`) ?? paper.examId,
      fallbackHref: `/e-learning/exams/${encodeURIComponent(paper.examId)}?question=${encodeURIComponent(paper.lastQuestionId)}` };
  }
  if (last) {
    const query = new URLSearchParams({ exam: last.exam, year: String(last.year), season: last.season,
      session: last.session, qNumber: String(last.qNumber), part: last.part ?? "" });
    return { recent, query: query.toString(), exam: last.exam,
      caption: `${formatYearSeason(last.year, last.season)} · 問${last.qNumber}` };
  }
  return { recent, exam: recent[0]?.[0] };
}

export function relativeStudyDate(at: number, today: string) {
  const days = -Math.floor((at - Date.parse(`${today}T00:00:00+09:00`)) / 86_400_000);
  return days <= 0 ? "今日" : days === 1 ? "昨日" : `${days}日前`;
}
