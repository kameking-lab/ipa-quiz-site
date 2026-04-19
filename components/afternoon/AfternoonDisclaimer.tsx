import { AlertTriangle } from "lucide-react";

export function AfternoonDisclaimer() {
  return (
    <div
      role="note"
      aria-label="AI採点に関する免責事項"
      className="flex items-start gap-2 rounded-xl border border-amber-200 bg-amber-50 p-3 text-xs leading-relaxed text-amber-900 dark:border-amber-900/40 dark:bg-amber-900/20 dark:text-amber-100"
    >
      <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
      <p>
        <strong>AI採点は目安です。</strong>本試験の採点とは異なる可能性があります。
        採点結果は学習の参考程度にご利用ください。
      </p>
    </div>
  );
}
