"use client";

import type { Question } from "@/lib/questions/types";
import { Button } from "@/components/ui/button";
import { Markdown } from "@/components/ui/markdown";
import { questionReferenceLabel } from "@/lib/questions/reference-label";

interface Props {
  question: Question;
  defaultOpen?: boolean;
  onReveal?: (open: boolean) => void;
  onNext?: () => void;
  nextLabel?: string;
}

/** 記述・作図を独自解答例と比較する。正答率への自動加算はしない。 */
export function DescriptiveAnswerCard({
  question,
  defaultOpen = false,
  onReveal,
  onNext,
  nextLabel = "次の問題へ",
}: Props) {
  const modelAnswer = (question.modelAnswer ?? String(question.answer)).replace(
    /^公式問題に基づく独自解答例（法務省の公式解答ではありません）\s*/,
    "",
  );
  return (
    <section aria-label="記述の独自解答例" className="space-y-4 rounded-2xl border border-border bg-card p-5">
      <p className="text-sm font-semibold">
        公式問題に基づく独自解答例（法務省の公式解答ではありません）
      </p>
      <p className="text-sm text-muted-foreground">
        記述・作図は答案用紙に解き、解答例の計算過程・申請内容・図面と照らして確認してください。
        この画面では記述答案の自動採点を行いません。
      </p>
      <details open={defaultOpen} onToggle={(event) => onReveal?.(event.currentTarget.open)}>
        <summary className="min-h-11 cursor-pointer py-3 font-semibold">独自解答例と作図例を確認する</summary>
        <Markdown>{modelAnswer}</Markdown>
        {question.scoringCriteria && (
          <div className="mt-5 border-t border-border pt-4">
            <h3 className="font-semibold">自己確認の観点（独自作成）</h3>
            <Markdown>{question.scoringCriteria}</Markdown>
          </div>
        )}
      </details>
      <div className="flex flex-wrap gap-x-5 gap-y-2 text-sm">
        <a href={question.sourcePdfUrl} target="_blank" rel="noopener noreferrer" className="min-h-11 py-3 underline">
          法務省の公式問題PDF
        </a>
        {(question.officialReferenceUrls ?? []).map((url) => (
          <a key={url} href={url} target="_blank" rel="noopener noreferrer" className="min-h-11 py-3 underline">
            {questionReferenceLabel(question, url)}
          </a>
        ))}
      </div>
      {question.sourceAttribution && <p className="text-xs text-muted-foreground">{question.sourceAttribution}</p>}
      {onNext && <Button onClick={onNext} className="min-h-11">{nextLabel}</Button>}
    </section>
  );
}
