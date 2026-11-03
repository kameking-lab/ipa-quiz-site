import type { Metadata } from "next";
import Link from "next/link";
import { CHUSHO_SECONDARY_CASES, CHUSHO_SECONDARY_ORIGINAL_COUNT, CHUSHO_SECONDARY_SOLUTION_COUNT, INDEPENDENT_EXAMPLE_NOTICE, chushoCasePath } from "@/lib/chusho-secondary/data";

export const metadata: Metadata = {
  title: "中小企業診断士 二次試験｜2025・2024年度の全事例と独自解答例",
  description: "中小企業診断士二次試験の2025・2024年度、全8事例・33原問を収録。公式問題・出題趣旨を読み、記述して独自解答例・考え方と比較できます。",
  alternates: { canonical: "/chusho-secondary" },
};
export default function ChushoSecondaryPage() {
  return <main className="mx-auto max-w-5xl px-4 pb-20 pt-8 sm:pt-12">
    <Link href="/qualifications" className="text-sm font-semibold text-primary hover:underline">← 資格一覧</Link>
    <h1 className="mt-5 text-3xl font-bold tracking-tight sm:text-4xl">中小企業診断士 二次試験</h1>
    <p className="mt-4 leading-8 text-muted-foreground">2025・2024年度の全8事例、{CHUSHO_SECONDARY_ORIGINAL_COUNT}原問・{CHUSHO_SECONDARY_SOLUTION_COUNT}独自解答例を収録。与件を読み、字数を確認しながら書き、解答例と根拠を比較できます。事例Ⅳは計算過程・単位・端数処理も確認します。</p>
    <p className="mt-4 rounded-xl border border-border bg-muted/30 p-4 text-sm leading-7">{INDEPENDENT_EXAMPLE_NOTICE}</p>
    {[2025, 2024].map(year => <section key={year} className="mt-9" aria-labelledby={`year-${year}`}>
      <h2 id={`year-${year}`} className="text-2xl font-bold">{year}年度（令和{year - 2018}年度）</h2>
      <div className="mt-4 grid gap-4 sm:grid-cols-2">{CHUSHO_SECONDARY_CASES.filter(p => p.year === year).map(p => <Link key={p.case} href={chushoCasePath(p.year, p.case)} className="min-h-32 rounded-2xl border border-border bg-card p-5 shadow-sm transition hover:border-primary focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-primary/40">
        <span className="block text-xl font-bold">{p.caseTitle}：{p.domain}</span>
        <span className="mt-2 block text-sm text-muted-foreground">{p.questions.length}原問・{p.questions.reduce((sum, q) => sum + q.solutions.length, 0)}解答例</span>
        <span className="mt-3 block font-semibold text-primary">事例を読み、解答する →</span>
      </Link>)}</div>
    </section>)}
    <p className="mt-8 text-sm leading-7 text-muted-foreground">原問と出題趣旨の出典は日本中小企業診断士協会連合会です。各事例から公式資料へ移動できます。</p>
  </main>;
}
