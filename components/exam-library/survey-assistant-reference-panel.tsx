import { Markdown } from "@/components/ui/markdown";

interface SurveyAssistantReferencePanelProps {
  notice: string;
  explanation: string;
  reasons: readonly { number: number; reason: string }[];
  officialKey?: number;
}

/** Reference material is immediately readable, with no answer or grading controls. */
export function SurveyAssistantReferencePanel({ notice, explanation, reasons, officialKey }: SurveyAssistantReferencePanelProps) {
  return (
    <section aria-label="参照専用の問題と解説" className="space-y-4 rounded-xl border border-amber-500 bg-amber-50 p-4 text-amber-950 dark:bg-amber-950/30 dark:text-amber-100">
      <h3 className="text-lg font-bold">参照専用・採点と学習履歴の対象外</h3>
      <p>{notice}</p>
      {officialKey !== undefined ? <p>公式解答の記録: 選択肢（{officialKey}）。原紙条件からの計算と区別して参照してください。</p> : null}
      <Markdown>{explanation}</Markdown>
      <ol aria-label="選択肢ごとの参照理由" className="space-y-3">
        {reasons.map(reason => <li key={reason.number}>
          <h4 className="font-bold">選択肢（{reason.number}）の参照理由</h4>
          <Markdown>{reason.reason}</Markdown>
        </li>)}
      </ol>
    </section>
  );
}
