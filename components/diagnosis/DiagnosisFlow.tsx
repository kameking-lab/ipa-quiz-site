"use client";

import * as React from "react";
import { ArrowLeft } from "lucide-react";
import {
  DIAGNOSIS_QUESTIONS,
  type DiagnosisChoice,
  type DiagnosisQuestion,
} from "@/lib/diagnosis/questions";
import { diagnose, type DiagnosisAnswers, type DiagnosisResult } from "@/lib/diagnosis/engine";
import { DiagnosisResultView } from "./DiagnosisResultView";

const TOTAL = DIAGNOSIS_QUESTIONS.length;

export function DiagnosisFlow() {
  const [step, setStep] = React.useState(0);
  const [answers, setAnswers] = React.useState<Partial<DiagnosisAnswers>>({});
  const [result, setResult] = React.useState<DiagnosisResult | null>(null);

  const onPick = React.useCallback(
    (id: string, value: string) => {
      const next: Partial<DiagnosisAnswers> = {
        ...answers,
        [id]: value,
      } as Partial<DiagnosisAnswers>;
      setAnswers(next);
      if (step + 1 >= TOTAL) {
        setResult(diagnose(next as DiagnosisAnswers));
      } else {
        setStep(step + 1);
      }
    },
    [answers, step],
  );

  const onBack = () => {
    if (result) {
      setResult(null);
      setStep(TOTAL - 1);
      return;
    }
    if (step > 0) setStep(step - 1);
  };

  const onRetake = () => {
    setAnswers({});
    setStep(0);
    setResult(null);
  };

  if (result) {
    return <DiagnosisResultView result={result} answers={answers as DiagnosisAnswers} onRetake={onRetake} />;
  }

  const q = DIAGNOSIS_QUESTIONS[step] as DiagnosisQuestion<string>;
  const progress = ((step) / TOTAL) * 100;

  return (
    <main className="mx-auto flex min-h-[calc(100dvh-120px)] w-full max-w-xl flex-col px-4 py-8">
      <div className="mb-3 flex items-center gap-3 text-xs text-zinc-500 dark:text-zinc-400">
        <button
          onClick={onBack}
          disabled={step === 0}
          className="rounded-full p-1.5 hover:bg-zinc-100 disabled:opacity-30 dark:hover:bg-zinc-800"
          aria-label="戻る"
        >
          <ArrowLeft className="h-4 w-4" />
        </button>
        <span>
          質問 {step + 1} / {TOTAL}
        </span>
        <div className="ml-auto h-1 w-32 overflow-hidden rounded-full bg-zinc-200 dark:bg-zinc-800">
          <div
            className="h-full bg-sky-500 transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      <h1 className="mb-1 text-2xl font-bold tracking-tight">{q.prompt}</h1>
      {q.hint && (
        <p className="mb-5 text-xs text-zinc-500 dark:text-zinc-400">{q.hint}</p>
      )}
      {!q.hint && <div className="mb-5" />}

      <div className="space-y-3">
        {q.choices.map((c: DiagnosisChoice<string>) => (
          <button
            key={c.value}
            onClick={() => onPick(q.id, c.value)}
            className="flex w-full items-center gap-4 rounded-2xl border-2 border-zinc-200 bg-white px-4 py-4 text-left text-base transition-all hover:-translate-y-0.5 hover:border-sky-400 hover:shadow-md active:scale-[0.99] dark:border-zinc-800 dark:bg-zinc-950 dark:hover:border-sky-500"
          >
            <span className="text-2xl">{c.emoji}</span>
            <span className="flex-1 font-medium">{c.label}</span>
          </button>
        ))}
      </div>

      <p className="mt-auto pt-8 text-center text-xs text-zinc-400 dark:text-zinc-500">
        選択するだけで自動的に次の質問へ進みます
      </p>
    </main>
  );
}
