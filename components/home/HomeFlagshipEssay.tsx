import Link from "next/link";
import { FileEdit, ArrowRight } from "lucide-react";

export function HomeFlagshipEssay() {
  return (
    <section className="mb-6" aria-label="午後論述の公式過去問">
      <Link
        href="/essay"
        className="group block rounded-2xl border border-sky-200 bg-gradient-to-br from-sky-50 to-white p-5 transition hover:border-sky-300 hover:shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background dark:border-sky-900/60 dark:from-sky-950/40 dark:to-zinc-950"
      >
        <div className="flex items-start gap-3">
          <span className="rounded-xl bg-sky-100 p-2 text-sky-700 dark:bg-sky-950/60 dark:text-sky-300">
            <FileEdit className="h-5 w-5" aria-hidden="true" />
          </span>
          <div className="min-w-0 flex-1">
            <p className="text-xs font-semibold uppercase tracking-wider text-sky-700 dark:text-sky-300">
              IPA 公式の過去問題
            </p>
            <h2 className="mt-0.5 text-lg font-bold text-zinc-900 dark:text-zinc-50">
              午後II 論述の実際の過去問を確認
            </h2>
            <p className="mt-1.5 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
              IPA が公開した ST・SA・PM・SM・AU の問題冊子・解答例・採点講評へ案内します。
              実際の設問を読んで、答案の構成を考えるところから始められます。
            </p>
            <span className="mt-2.5 inline-flex items-center gap-1 text-sm font-semibold text-sky-700 group-hover:gap-1.5 dark:text-sky-300">
              公式過去問を見る
              <ArrowRight
                className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
                aria-hidden="true"
              />
            </span>
          </div>
        </div>
      </Link>
    </section>
  );
}
