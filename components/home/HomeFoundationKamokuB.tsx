import Link from "next/link";
import { Code2, ArrowRight } from "lucide-react";

// 土台導線（基本情報 科目B＝アルゴリズム・擬似言語の完全対策）をホームの
// 高オーソリティ面から一目で出すためのサーバーコンポーネント。FE は CBT で通年
// 受験できる「通年の入口」であり、科目B（擬似言語のトレース）が合否を分ける。
// SSR HTML に含まれるため、トップページから土台ピラー /blog/fe-kamoku-b-taisaku
// （indexable）へのクローラブルな内部リンクにもなる。旗艦側 HomeFlagshipEssay と
// 対称（sky=旗艦/午後論述・indigo=土台/科目B）。リンク先は KamokuBStudyHint と
// 同じ土台ピラーに統一し、誇大表現を避ける（科目B＝FE の擬似言語に限定）。
export function HomeFoundationKamokuB() {
  return (
    <section className="mb-6" aria-label="基本情報 科目B（アルゴリズム・擬似言語）対策">
      <Link
        href="/blog/fe-kamoku-b-taisaku"
        className="group block rounded-2xl border border-indigo-200 bg-gradient-to-br from-indigo-50 to-white p-5 transition hover:border-indigo-300 hover:shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background dark:border-indigo-900/60 dark:from-indigo-950/40 dark:to-zinc-950"
      >
        <div className="flex items-start gap-3">
          <span className="rounded-xl bg-indigo-100 p-2 text-indigo-700 dark:bg-indigo-950/60 dark:text-indigo-300">
            <Code2 className="h-5 w-5" aria-hidden="true" />
          </span>
          <div className="min-w-0 flex-1">
            <p className="text-xs font-semibold uppercase tracking-wider text-indigo-700 dark:text-indigo-300">
              基本情報は科目Bで差がつく
            </p>
            <h2 className="mt-0.5 text-lg font-bold text-zinc-900 dark:text-zinc-50">
              科目B（アルゴリズム・擬似言語）を AI と攻略
            </h2>
            <p className="mt-1.5 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
              擬似言語が読めない・トレースで詰まるなら、読み方の型から体系的に整理。
              AI コパイロットに「1 行ずつトレースして」と聞きながら解けます。
              基本情報は CBT で通年受験できるので、今日から始められます。
            </p>
            <span className="mt-2.5 inline-flex items-center gap-1 text-sm font-semibold text-indigo-700 group-hover:gap-1.5 dark:text-indigo-300">
              科目B 完全対策を読む
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
