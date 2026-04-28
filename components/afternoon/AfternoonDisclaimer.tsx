import { AlertTriangle } from "lucide-react";

export function AfternoonDisclaimer() {
  return (
    <div
      role="note"
      aria-label="練習用オリジナル問題・AI採点に関する免責事項"
      className="flex items-start gap-2 rounded-xl border border-amber-300 bg-amber-50 p-3 text-xs leading-relaxed text-amber-900 dark:border-amber-800 dark:bg-amber-900/20 dark:text-amber-100"
    >
      <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
      <div className="space-y-1">
        <p>
          <strong>⚠️ 練習用オリジナル問題です。</strong>
          本ページに掲載している午後問題は、IPA過去問の形式を模して作成した
          <strong>練習用オリジナル問題</strong>
          であり、実際の試験で出題された問題ではありません。
        </p>
        <p>
          <strong>AI採点は目安です。</strong>本試験の採点とは異なる可能性があります。
          採点結果は学習の参考程度にご利用ください。
        </p>
      </div>
    </div>
  );
}
