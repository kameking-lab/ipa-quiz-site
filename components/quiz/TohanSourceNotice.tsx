import type { Question } from "@/lib/questions/types";

/** 関西広域連合の過去問を表示する画面で、原典・加工・解説主体を明示する。 */
export function TohanSourceNotice({ question }: { question: Question }) {
  if (question.license !== "KANSAI-UNION-reuse") return null;

  return (
    <aside
      aria-label="登録販売者試験問題の出典と加工表示"
      className="mt-3 rounded-xl border border-border bg-muted/40 px-3 py-2 text-xs leading-relaxed text-muted-foreground"
    >
      <p>{question.sourceAttribution}</p>
      <p>関西広域連合による解説の作成・監修ではありません。</p>
      <div className="mt-1 flex flex-wrap gap-x-4 gap-y-1">
        <a href={question.sourcePdfUrl} target="_blank" rel="noopener noreferrer" className="font-medium underline underline-offset-2">原典の問題PDF</a>
        {question.sourceAnswerUrl && (
          <a href={question.sourceAnswerUrl} target="_blank" rel="noopener noreferrer" className="font-medium underline underline-offset-2">原典の正答PDF</a>
        )}
      </div>
    </aside>
  );
}
