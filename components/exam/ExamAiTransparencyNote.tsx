import { FileText } from "lucide-react";

export function ExamAiTransparencyNote() {
  return (
    <section
      aria-label="問題の出典と解説"
      className="mb-8 rounded-2xl border border-border bg-card p-5 text-sm"
    >
      <div className="mb-2 flex items-center gap-2">
        <FileText aria-hidden="true" className="h-4 w-4" />
        <h2 className="text-base font-bold tracking-tight">
          問題の出典と解説
        </h2>
      </div>
      <p className="text-xs leading-relaxed text-muted-foreground">
        問題の出典は、各問題ページから確認できます。正答は公式資料、解説は学習用の説明です。訂正の連絡は問題ページから送れます。
      </p>
    </section>
  );
}
