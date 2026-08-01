import Link from "next/link";
import { FileText, ArrowRight } from "lucide-react";

import { ESSAY_EXAM_CODES } from "@/lib/essay/load";
import type { ExamCode } from "@/lib/questions/types";
import { examLabel } from "@/lib/utils";

/**
 * 旗艦＝午後II論述AI採点への導線。論述データを持つ高度区分 (ST/SA/PM/SM/AU) の
 * 問題ページにのみ表示し、ap/fe 等の非論述・モック区分には出さない（誇大回避）。
 * ゲートの単一情報源は lib/essay/load.ts の ESSAY_EXAM_CODES（drift しない）。
 * /q/* は最大のクロール面なので、SSR の <Link href="/essay"> で旗艦への
 * クローラブル内部リンクを張る。リンク先 /essay は indexable な採点ハブ。
 */
export function AfternoonEssayHint({ exam }: { exam: ExamCode }) {
  if (!(ESSAY_EXAM_CODES as readonly string[]).includes(exam)) return null;

  return (
    <aside
      aria-label={`${examLabel(exam)} の午後II論述 AI 採点`}
      className="mt-4 flex items-start gap-3 rounded-2xl border border-sky-300/70 bg-sky-50/60 p-4 dark:border-sky-800/60 dark:bg-sky-950/30 sm:p-5"
    >
      <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-sky-100 text-sky-700 dark:bg-sky-900/60 dark:text-sky-300">
        <FileText className="h-4 w-4" />
      </span>
      <div className="min-w-0 flex-1">
        <p className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
          この区分は午後IIで論述が出ます
        </p>
        <p className="mt-1 text-sm font-medium text-foreground">
          {examLabel(exam)} の合否を分ける午後II論述を AI が採点
        </p>
        <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
          書いた論述を AI が「適合度・論理性・具体性・業種事例」の 4
          軸でフィードバック。※AI 採点は参考評価です。
        </p>
        <Link
          href="/essay"
          className="mt-2 inline-flex items-center gap-1 text-sm font-medium text-sky-700 hover:underline dark:text-sky-400"
        >
          午後論述 AI 添削を試す
          <ArrowRight className="h-3.5 w-3.5" />
        </Link>
      </div>
    </aside>
  );
}
