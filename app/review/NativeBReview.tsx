"use client";

import { useState } from "react";
import { NativeBAnswerInput } from "@/components/quiz/NativeBAnswer";
import { ExplanationCard } from "@/components/quiz/ExplanationCard";
import { gradeNativeB, serializeNativeBSelections, type NativeBSelections } from "@/lib/questions/native-b";
import type { NativeBGrade, Question } from "@/lib/questions/types";
import { createHistoryStore } from "@/lib/storage/history";
import { readSettings } from "@/lib/storage/settings";
import { writeLastQuestion } from "@/lib/storage/last-question";
import { recordStudyOnDate } from "@/lib/motivation/heatmap";

/** Review shares the normal five-slot grader and explanation components. */
export function NativeBReview({ question, onNext }: { question: Question; onNext: (correct: boolean) => void }) {
  const [result, setResult] = useState<NativeBGrade>();
  const [selected, setSelected] = useState<string>();
  const [starred, setStarred] = useState(() => createHistoryStore().isStarred(question.id));
  const answer = (selections: NativeBSelections) => {
    if (result || !question.nativeB) return;
    const grade = gradeNativeB(question.nativeB, selections);
    const serialized = serializeNativeBSelections(question.nativeB, selections);
    setResult(grade);
    setSelected(serialized);
    try {
      if (readSettings().recordHistory) createHistoryStore().record({ id: question.id, selected: serialized, correct: grade.isCorrect, at: Date.now(), nativeBResult: grade });
      writeLastQuestion({ exam: question.exam, year: question.year, season: question.season, session: question.session, qNumber: question.qNumber, part: question.part, answeredAt: Date.now() });
      recordStudyOnDate();
    } catch { /* Storage failure must not hide the result. */ }
  };
  if (!question.nativeB) return null;
  return result
    ? <ExplanationCard question={question} nativeBResult={result} selected={selected} isCorrect={result.isCorrect}
        starred={starred} onToggleStar={() => setStarred(createHistoryStore().toggleStar(question.id))}
        onNext={() => onNext(result.isCorrect)} onAskAI={() => undefined} />
    : <NativeBAnswerInput data={question.nativeB} displayedImageUrls={question.imageUrls} disabled={false} onAnswer={answer} />;
}
