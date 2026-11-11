"use client";

import { useRef, useState, type ReactNode } from "react";
import Link from "next/link";
import type { ChoiceKey, Question } from "@/lib/questions/types";
import { QuestionCard } from "@/components/quiz/QuestionCard";
import { ChoiceButton } from "@/components/quiz/ChoiceButton";
import { Button } from "@/components/ui/button";
import { questionPagePath } from "@/lib/seo/question-url";
import { getSafePdfUrl, ipaSourceLabel } from "@/lib/exam-config";
import { isAcceptedAnswer } from "@/lib/questions/answers";
import { createHistoryStore } from "@/lib/storage/history";
import { readSettings } from "@/lib/storage/settings";
import { usePetLearning } from "@/components/pet/usePetLearning";
import { LearningPetCorner } from "@/components/pet/LearningPetCorner";
import { posthogCapture } from "@/lib/posthog";
import { writeLastQuestion } from "@/lib/storage/last-question";
import { practiceSessionLabel } from "@/lib/questions/practice-session";

export function BlogPractice({ question, reason, continueHref, slug, explanation }: { question: Question; reason: string; continueHref: string; slug: string; explanation: ReactNode }) {
  const pet = usePetLearning();
  const [selected, setSelected] = useState<ChoiceKey | null>(null);
  const resultRef = useRef<HTMLDivElement>(null);
  const submitted = useRef(false);
  const correct = selected !== null && isAcceptedAnswer(question.answer, selected);
  function answer(key: ChoiceKey) {
    if (submitted.current) return;
    submitted.current = true;
    setSelected(key);
    const isCorrect = isAcceptedAnswer(question.answer, key);
    if (readSettings().recordHistory) {
      createHistoryStore().record({ id: question.id, selected: key, correct: isCorrect, at: Date.now() });
      pet.record(question, { kind: "multiple-choice", selected: [key] }, isCorrect);
      writeLastQuestion({ exam: question.exam, year: question.year, season: question.season, session: question.session, qNumber: question.qNumber, part: question.part, answeredAt: Date.now() });
    } else pet.submit({ source: "question", questionId: question.id, answer: { kind: "multiple-choice", selected: [key] } }, { source: "question", question });
    posthogCapture("blog_practice_answered", { slug, questionId: question.id, exam: question.exam, correct: isCorrect });
    requestAnimationFrame(() => {
      resultRef.current?.focus({ preventScroll: true });
      resultRef.current?.scrollIntoView({ block: "start", behavior: "instant" });
    });
  }
  return (
    <section id="article-practice" aria-label="記事から1問チャレンジ" data-nosnippet className="mb-8 scroll-mt-24 rounded-2xl border border-sky-200 bg-sky-50/40 p-3 sm:p-5 dark:border-sky-900 dark:bg-sky-950/20">
      <h2 className="text-lg font-bold">記事から1問チャレンジ</h2>
      <p className="mt-2 mb-4 text-sm text-muted-foreground">{reason} 無料・登録不要です。</p>
      <p className="mb-2 text-xs font-semibold">{practiceSessionLabel(question.session, question.exam)}の{Object.keys(question.choices ?? {}).length}択問題</p>
      <QuestionCard question={question} />
      <div role="radiogroup" aria-label="チャレンジの選択肢" className="mt-3 space-y-2">
        {Object.entries(question.choices ?? {}).map(([key, text]) => (
          <ChoiceButton key={key} choiceKey={key as ChoiceKey} text={text} imageUrl={question.choiceImageUrls?.[key as ChoiceKey]} shortcutIndex={null} revealed={selected !== null} selected={selected === key} correct={isAcceptedAnswer(question.answer, key)} disabled={selected !== null} onClick={() => answer(key as ChoiceKey)} />
        ))}
      </div>
      {selected !== null && (
        <div ref={resultRef} tabIndex={-1} aria-label="チャレンジの解答結果" className="mt-4 scroll-mt-24 rounded-xl border border-border bg-background p-4 outline-none focus-visible:ring-2 focus-visible:ring-sky-500">
          <p role="status" className="font-bold">{correct ? "正解です" : `不正解です。正解は${question.answer}です`}</p>
          {explanation}
          <a href={getSafePdfUrl(question.sourcePdfUrl)} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center text-sm underline">{ipaSourceLabel(question.sourcePdfUrl, "question")}（原典PDF）</a>
          <div className="mt-3 flex flex-col gap-2 sm:flex-row">
            <Button asChild variant="primary" className="min-h-12"><Link href={continueHref} onClick={() => posthogCapture("blog_practice_continued", { slug, exam: question.exam })}>同じ分野の演習を続ける</Link></Button>
            <Button asChild variant="outline" className="min-h-12"><Link href={questionPagePath(question)}>問題の詳細・誤り報告</Link></Button>
          </div>
        </div>
      )}
      <a href="#article-body" className="mt-3 inline-flex min-h-11 items-center text-sm underline">記事の本文を読む</a>
      <LearningPetCorner qualificationId={question.exam} questionId={question.id} compact />
    </section>
  );
}
