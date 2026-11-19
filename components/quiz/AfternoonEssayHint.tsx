import Link from "next/link";
import { FileText, ArrowRight } from "lucide-react";

import { ESSAY_EXAM_CODES } from "@/lib/essay/exams";
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
      aria-label={`${examLabel(exam)} の論文対策`}
      className="mt-4 flex items-start gap-3 rounded-2xl border border-sky-300/70 bg-sky-50/60 p-4 dark:border-sky-800/60 dark:bg-sky-950/30 sm:p-5"
    >
      <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-sky-100 text-sky-700 dark:bg-sky-900/60 dark:text-sky-300">
        <FileText className="h-4 w-4" />
      </span>
      <div className="min-w-0 flex-1">
        <p className="mt-1 text-sm font-medium text-foreground">
          {examLabel(exam)} の午後II論述を練習する
        </p>
        <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
          練習問題と設問別の解答骨子を確認できます。
        </p>
        <Link
          href="/essay"
          className="mt-2 inline-flex items-center gap-1 text-sm font-medium text-sky-700 hover:underline dark:text-sky-400"
        >
          論述の練習問題を見る
          <ArrowRight className="h-3.5 w-3.5" />
        </Link>
      </div>
    </aside>
  );
}
