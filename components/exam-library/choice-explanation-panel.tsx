import { CheckCircle2, ExternalLink, XCircle } from "lucide-react";
import { Markdown } from "@/components/ui/markdown";
import type { ExamChoiceExplanation } from "@/lib/exam-library-model";

interface ChoiceExplanationPanelProps {
  explanation: ExamChoiceExplanation;
  selectedChoice?: number | null;
}

/** 公式正答と全誤答を同じ順序・同じ粒度で表示する。 */
export function ChoiceExplanationPanel({
  explanation,
  selectedChoice,
}: ChoiceExplanationPanelProps) {
  return (
    <section aria-label="選択肢ごとの解説" className="mt-3">
      {explanation.provisionalReview ? (
        <p className="mb-3 rounded-lg border border-amber-400/70 bg-amber-50 px-3 py-2 text-sm text-amber-950 dark:bg-amber-950/30 dark:text-amber-100">
          暫定解説 · 問題・公式正答・表示の最終確認日: {explanation.lastCheckedAt}
        </p>
      ) : null}
      <Markdown>{explanation.summary}</Markdown>
      <ol aria-label="5つの選択肢の判定と理由" className="mt-3 space-y-3">
        {explanation.choices.map((choice) => {
          const correct = choice.verdict === "correct";
          const selected = choice.number === selectedChoice;
          return (
            <li
              key={choice.number}
              className={`min-w-0 overflow-hidden rounded-xl border p-3 ${
                correct
                  ? "border-emerald-700 bg-emerald-50/80 text-emerald-950 dark:border-emerald-300 dark:bg-emerald-950/30 dark:text-emerald-50"
                  : "border-slate-400 bg-white/70 text-slate-950 dark:border-slate-600 dark:bg-slate-950/30 dark:text-slate-50"
              }`}
            >
              <h5 className="flex min-w-0 flex-wrap items-center gap-2 font-bold">
                {correct ? (
                  <CheckCircle2 className="h-5 w-5 shrink-0" aria-hidden="true" />
                ) : (
                  <XCircle className="h-5 w-5 shrink-0" aria-hidden="true" />
                )}
                選択肢（{choice.number}）: {correct ? "この問題の正答" : "この問題では誤答"}
                {selected ? (
                  <span className="rounded-full border border-current px-2 py-0.5 text-xs">
                    あなたの回答
                  </span>
                ) : null}
              </h5>
              <Markdown className="mt-1 [overflow-wrap:anywhere]">{choice.reason}</Markdown>
            </li>
          );
        })}
      </ol>
      {explanation.sources.length > 0 ? <div className="mt-4 border-t border-current/20 pt-3">
        <h5 className="font-bold">確認した政府一次資料</h5>
        <ul aria-label="政府一次資料" className="mt-1 list-disc space-y-1 pl-5 text-sm">
          {explanation.sources.map((source) => (
            <li key={source.url}>
              <a
                href={source.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-11 max-w-full items-center gap-1 font-semibold underline underline-offset-4 [overflow-wrap:anywhere] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-sky-300"
              >
                {source.title}
                <span className="sr-only">（政府サイト・新しいタブで開きます）</span>
                <ExternalLink className="h-4 w-4 shrink-0" aria-hidden="true" />
              </a>
            </li>
          ))}
        </ul>
      </div> : null}
    </section>
  );
}
