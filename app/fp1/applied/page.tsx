import { getFp1ExtensionQuestions } from "@/lib/fp1/published-extension";
import type { Metadata } from "next";
import Link from "next/link";
import { FP1_APPLIED_EDITIONS, getFp1AppliedEdition } from "@/lib/fp1/applied";

export const metadata: Metadata = {
  title: "FP1級 学科応用編の問題・模範解答",
  description: "FP1級学科応用編の原問と公式模範解答を、共通設例・空欄ごとの独自解説と一緒に確認できます。2026年5月試験の問51〜問65（15原問・62回答欄）を掲載。",
  alternates: { canonical: "/fp1/applied" },
};

export default function Fp1AppliedIndex() {
  return <main className="mx-auto w-full max-w-3xl px-4 py-8 sm:py-12">
    <nav className="mb-5 text-sm text-muted-foreground"><Link href="/fp1" className="hover:underline">FP1級</Link> / 学科応用編</nav>
    <h1 className="text-2xl font-bold sm:text-3xl">FP1級 学科応用編</h1>
    <p className="mt-3 text-sm leading-7 text-muted-foreground">原問の空欄・選択肢と計算条件を保ち、公式模範解答と独自解説で確認できます。現在は2026年5月試験の問51〜問65（15原問・62回答欄）を掲載しています。</p>
    <ul className="mt-6 space-y-3">{FP1_APPLIED_EDITIONS.map((edition) => {
      const data = getFp1AppliedEdition(edition)!;
      return <li key={edition}><Link href={`/fp1/applied/${edition}`} className="block rounded-xl border border-border bg-card p-4 font-semibold text-primary hover:underline">{data.label} 学科応用編（{data.questions.length + getFp1ExtensionQuestions(edition).length}問）</Link></li>;
    })}</ul>
  </main>;
}
