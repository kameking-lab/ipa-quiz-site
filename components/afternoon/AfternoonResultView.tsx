"use client";

import { useState } from "react";
import { Award, CheckCircle2, AlertCircle, MessageCircle } from "lucide-react";

import type { AfternoonQuestion, AfternoonScoringResult } from "@/lib/afternoon/types";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { AfternoonDisclaimer } from "./AfternoonDisclaimer";

interface Props {
  question: AfternoonQuestion;
  result: AfternoonScoringResult;
}

function scoreBadge(score: number): "success" | "warn" | "danger" {
  if (score >= 70) return "success";
  if (score >= 40) return "warn";
  return "danger";
}

export function AfternoonResultView({ question, result }: Props) {
  const [showAiNote, setShowAiNote] = useState(false);

  return (
    <Card className="border-sky-200 dark:border-sky-900/50">
      <CardContent className="space-y-5 pt-5">
        <header className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <Award className="h-5 w-5 text-sky-600 dark:text-sky-400" aria-hidden="true" />
            <h3 className="text-lg font-bold text-zinc-900 dark:text-zinc-50">
              採点結果
            </h3>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant={scoreBadge(result.totalScore)} className="text-sm">
              総合 {result.totalScore} / 100
            </Badge>
          </div>
        </header>

        <AfternoonDisclaimer />

        {result.overallComment && (
          <p className="rounded-lg border border-sky-200 bg-sky-50 p-3 text-sm leading-relaxed text-sky-900 dark:border-sky-900/40 dark:bg-sky-900/20 dark:text-sky-100">
            {result.overallComment}
          </p>
        )}

        <ol className="space-y-4">
          {result.subResults.map((sr) => {
            const sub = question.subQuestions.find((s) => s.label === sr.label);
            return (
              <li
                key={sr.label}
                className="space-y-2 rounded-xl border border-zinc-200 p-3 dark:border-zinc-800"
              >
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <p className="text-sm font-semibold text-zinc-900 dark:text-zinc-50">
                    {sr.label}
                  </p>
                  <Badge variant={scoreBadge(sr.score)}>{sr.score} / 100</Badge>
                </div>

                {sr.goodPoints.length > 0 && (
                  <div>
                    <p className="mb-1 flex items-center gap-1 text-xs font-semibold text-emerald-700 dark:text-emerald-300">
                      <CheckCircle2 className="h-3.5 w-3.5" aria-hidden="true" />
                      良い点
                    </p>
                    <ul className="ml-4 list-disc space-y-1 text-sm text-zinc-700 dark:text-zinc-200">
                      {sr.goodPoints.map((g, i) => (
                        <li key={i}>{g}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {sr.improvements.length > 0 && (
                  <div>
                    <p className="mb-1 flex items-center gap-1 text-xs font-semibold text-amber-700 dark:text-amber-300">
                      <AlertCircle className="h-3.5 w-3.5" aria-hidden="true" />
                      改善点
                    </p>
                    <ul className="ml-4 list-disc space-y-1 text-sm text-zinc-700 dark:text-zinc-200">
                      {sr.improvements.map((g, i) => (
                        <li key={i}>{g}</li>
                      ))}
                    </ul>
                  </div>
                )}

                <div>
                  <p className="mb-1 text-xs font-semibold text-zinc-600 dark:text-zinc-300">
                    IPA解答例
                  </p>
                  <p className="whitespace-pre-wrap rounded-md bg-zinc-50 p-2 text-sm text-zinc-800 dark:bg-zinc-900 dark:text-zinc-100">
                    {sr.modelAnswer || sub?.modelAnswer || "（解答例なし）"}
                  </p>
                </div>
              </li>
            );
          })}
        </ol>

        <div className="space-y-2 pt-1">
          <div className="flex flex-wrap gap-2">
            <Button
              type="button"
              variant="outline"
              size="md"
              onClick={() => setShowAiNote((v) => !v)}
              aria-expanded={showAiNote}
              aria-controls={`ai-note-${question.id}`}
            >
              <MessageCircle className="h-4 w-4" />
              AIに質問する
            </Button>
            <a
              href={question.pdfUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex"
            >
              <Button type="button" variant="ghost" size="md">
                出典 PDF を開く
              </Button>
            </a>
          </div>
          {showAiNote && (
            <p
              id={`ai-note-${question.id}`}
              className="rounded-md border border-zinc-200 bg-zinc-50 p-2 text-xs text-zinc-700 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-200"
            >
              午後問題のAIコパイロット対話は近日対応予定です。当面は採点結果のコメントと出典PDFを参照してください。
            </p>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
