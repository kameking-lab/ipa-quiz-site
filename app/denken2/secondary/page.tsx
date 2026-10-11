import type { Metadata } from "next";
import Link from "next/link";
import { SECONDARY_QUESTIONS, SECONDARY_SUBJECT_NAMES, secondaryQuestionPath } from "@/lib/denken2/secondary";

export const metadata: Metadata = {
  title: "電験二種 二次試験の過去問｜2025・2024年度 全20原問と解説",
  description: "2025・2024年度の電力・管理各6問、機械・制御各4問を収録。公式の図と数式、全小問の標準解答と学習用解説を読み、記述式の解答を練習できます。",
  alternates: { canonical: "/denken2/secondary" },
};

export default function Page() {
  return <main className="mx-auto max-w-5xl px-4 py-8 sm:py-12">
    <Link href="/denken2" className="inline-flex min-h-11 items-center text-sm text-primary underline">← 電験二種の一次・二次一覧</Link>
    <h1 className="mt-3 text-3xl font-bold sm:text-4xl">電験二種 二次試験の過去問</h1>
    <p className="mt-4 max-w-3xl leading-8 text-muted-foreground">2025年度（2025/11/16）・2024年度（2024/11/10）の全{SECONDARY_QUESTIONS.length}原問を収録。公式問題の図・数式と標準解答、全小問の解説を確認できます。解答を記入してから正答を開き、記述や計算過程を比較できます。</p>
    <p className="mt-3 text-sm leading-7 text-muted-foreground">本試験は電力・管理が6問中4問（120分）、機械・制御が4問中2問（60分）を選択し、各原問30点です。練習では全原問を選べます。</p>
    {[2025, 2024].map(year => <section key={year} className="mt-9">
      <h2 className="text-2xl font-bold">{year}年度 二次試験</h2>
      <div className="mt-4 grid gap-6 lg:grid-cols-2">{(["power-management", "machine-control"] as const).map(subject => <section key={subject} id={`${year}-${subject}`} className="scroll-mt-6 rounded-2xl border border-border bg-card p-4 sm:p-5">
        <h3 className="text-xl font-bold">{SECONDARY_SUBJECT_NAMES[subject]}</h3>
        <p className="mt-2 text-sm text-muted-foreground">{subject === "power-management" ? "6原問・4問選択" : "4原問・2問選択"}</p>
        <ol className="mt-3 space-y-2">{SECONDARY_QUESTIONS.filter(q => q.year === year && q.subject === subject).map(q => <li key={q.id}>
          <Link href={secondaryQuestionPath(q)} className="flex min-h-16 items-center gap-3 rounded-xl border border-border p-3 transition hover:border-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary">
            <span className="shrink-0 font-bold text-primary">問{q.number}</span><span className="min-w-0"><span className="block font-medium">{q.topic}</span><span className="mt-1 block text-xs text-muted-foreground">記述・計算・図の練習と全小問の解説</span></span>
          </Link>
        </li>)}</ol>
      </section>)}</div>
    </section>)}
    <p className="mt-8 text-xs leading-7 text-muted-foreground">出典：一般財団法人 電気技術者試験センターの公式問題・標準解答。年度・一次と二次・科目・原問番号を分けて掲載しています。学習用解説は当サイトが作成しました。</p>
  </main>;
}
