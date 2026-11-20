"use client";
import { useCallback, useMemo, useState } from "react";
import Link from "next/link";
import { ExamQuestionPlayer } from "@/components/exam-library/exam-question-player";
import { fetchPracticeQuestion } from "@/lib/billing/guest-client";
import type { ExamQuestion } from "@/lib/exam-library-model";
import type { CatalogQuestion } from "@/lib/study-plan/client";

export function TodayLibrary({ questions, exam }: { questions: CatalogQuestion[]; exam: string }) {
  const [part, setPart] = useState(0);
  // Keep the selected priority order, including when due reviews span papers.
  const groups = useMemo(() => {
    const result: CatalogQuestion[][] = [];
    for (const q of questions) {
      const group = result.at(-1);
      if (group && group[0].paperId === q.paperId) group.push(q); else result.push([q]);
    }
    return result;
  }, [questions]);
  const next = useCallback(() => setPart(n => n + 1), []);
  const group = groups[part];
  if (!group) return <div className="p-8 text-center"><h1 className="text-xl font-bold">今日も、おつかれさまでした</h1><Link className="mt-6 block py-3 underline" href="/">ホームへ</Link></div>;
  return <LibraryPart key={part} questions={group} exam={exam} onComplete={next} />;
}
function LibraryPart({ questions, exam, onComplete }: { questions: CatalogQuestion[]; exam: string; onComplete: () => void }) {
  const first = questions[0];
  const resolveQuestion = useCallback(async (id: string, signal: AbortSignal) => {
    if (!questions.some(q => q.id === id)) throw new Error("問題が見つかりませんでした。");
    const result = await fetchPracticeQuestion(id, false, signal, first.paperId);
    return result.question as unknown as ExamQuestion;
  }, [questions, first.paperId]);
  const paceSession = useMemo(() => ({ exam, onComplete }), [exam, onComplete]);
  const index = useMemo(() => questions.map(q => ({ id: q.id, number: q.number!, choiceCount: q.choiceCount!, answerAuthority: q.answerAuthority!, scorable: true })), [questions]);
  return <div className="mx-auto w-full max-w-[640px] px-4 py-6"><h2 className="mb-4 text-sm font-semibold">{first.paperTitle}</h2><ExamQuestionPlayer examId={first.paperId!} examTitle={first.paperTitle!}
    questions={[]} questionIndex={index} resolveQuestion={resolveQuestion} pdfUrl={first.pdfUrl!} indexUrl={first.indexUrl!} paceSession={paceSession} /></div>;
}
