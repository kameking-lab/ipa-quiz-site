"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { ExamQuestionPlayer } from "@/components/exam-library/exam-question-player";
import { fetchPracticeQuestion } from "@/lib/billing/guest-client";
import type { ExamQuestion } from "@/lib/exam-library-model";
import { clearBatchQuestion, type CatalogQuestion } from "@/lib/study-plan/client";
import { sessionScore } from "@/lib/motivation/session";

export function TodayLibrary({ questions, exam, backHref, backLabel }: {
  questions: CatalogQuestion[]; exam: string; backHref: string; backLabel: string;
}) {
  const groups = useMemo(() => {
    const result: CatalogQuestion[][] = [];
    for (const question of questions) {
      const group = result.at(-1);
      if (group && group[0].paperId === question.paperId) group.push(question);
      else result.push([question]);
    }
    return result;
  }, [questions]);
  const [resumeId] = useState(() => typeof window === "undefined" ? null : new URL(location.href).searchParams.get("question"));
  const [part, setPart] = useState(() => Math.max(0, groups.findIndex(group => group.some(q => q.id === resumeId))));
  const [score, setScore] = useState(sessionScore);
  const group = groups[part];
  if (!group) return <section className="p-8 text-center">
    <h2 className="text-xl font-bold">{score.answered}問中{score.correct}問正解</h2>
    <Link className="study-link mt-4" href={backHref}>{backLabel}</Link>
  </section>;
  return <LibraryPart key={part} questions={group} exam={exam} initialId={resumeId ?? undefined}
    onComplete={(answered, correct) => {
      setScore(score => ({ answered: score.answered + answered, correct: score.correct + correct }));
      if (part + 1 === groups.length) clearBatchQuestion();
      setPart(part + 1);
    }} />;
}

function LibraryPart({ questions, exam, initialId, onComplete }: {
  questions: CatalogQuestion[]; exam: string; initialId?: string; onComplete: (answered: number, correct: number) => void;
}) {
  const first = questions[0];
  const resolveQuestion = useMemo(() => async (id: string, signal: AbortSignal) => {
    if (!questions.some(q => q.id === id)) throw new Error("問題が見つかりませんでした。");
    const result = await fetchPracticeQuestion(id, false, signal, first.paperId);
    return result.question as unknown as ExamQuestion;
  }, [questions, first.paperId]);
  const index = useMemo(() => questions.map(q => ({
    id: q.id, number: q.number!, choiceCount: q.choiceCount!, answerAuthority: q.answerAuthority!, scorable: true,
  })), [questions]);
  return <div className="mx-auto w-full max-w-[640px] px-4 py-6">
    <h2 className="mb-4 text-sm font-semibold">{first.paperTitle}</h2>
    <ExamQuestionPlayer examId={first.paperId!} examTitle={first.paperTitle!} initialQuestionId={initialId}
      questions={[]} questionIndex={index} resolveQuestion={resolveQuestion} pdfUrl={first.pdfUrl!}
      indexUrl={first.indexUrl!} paceSession={{ exam, onComplete }} />
  </div>;
}
