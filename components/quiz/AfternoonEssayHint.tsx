import Link from "next/link";
import { FileText, ArrowRight } from "lucide-react";

import { ESSAY_EXAM_CODES } from "@/lib/essay/load";
import type { ExamCode } from "@/lib/questions/types";
import { examLabel } from "@/lib/utils";

/** Official essay paper links for the qualifications with an essay paper. */
export function AfternoonEssayHint({ exam }: { exam: ExamCode }) {
  if (!(ESSAY_EXAM_CODES as readonly string[]).includes(exam)) return null;

  return (
    <aside
      aria-label={`${examLabel(exam)} の公式過去問`}
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
          {examLabel(exam)} の公式問題・解答を確認する
        </p>
        <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
          IPAが公開する問題と解答例を、試験回ごとに探せます。
        </p>
        <Link
          href="/essay"
          className="mt-2 inline-flex items-center gap-1 text-sm font-medium text-sky-700 hover:underline dark:text-sky-400"
        >
          公式過去問を見る
          <ArrowRight className="h-3.5 w-3.5" />
        </Link>
      </div>
    </aside>
  );
}
