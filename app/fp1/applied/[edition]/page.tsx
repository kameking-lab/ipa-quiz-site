import { getFp1ExtensionQuestions } from "@/lib/fp1/published-extension";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { FP1_APPLIED_EDITIONS, fp1AppliedQuestionPath, getFp1AppliedEdition } from "@/lib/fp1/applied";

export const dynamicParams = false;
export function generateStaticParams() { return FP1_APPLIED_EDITIONS.map((edition) => ({ edition })); }

export async function generateMetadata({ params }: { params: Promise<{ edition: string }> }): Promise<Metadata> {
  const { edition } = await params;
  const data = getFp1AppliedEdition(edition);
  if (!data) return { title: "問題が見つかりません", robots: { index: false } };
  return { title: `FP1級 ${data.label} 学科応用編の問題・模範解答`, description: `${data.label}の学科応用編問51〜問60（10原問・48空欄）を掲載。共通設例、原問の表・図の注記、公式模範解答・独自解説・計算過程を確認できます。法令基準日は${data.lawReferenceDate}です。`, alternates: { canonical: `/fp1/applied/${edition}` } };
}

export default async function Fp1AppliedEditionPage({ params }: { params: Promise<{ edition: string }> }) {
  const { edition } = await params;
  const data = getFp1AppliedEdition(edition);
  if (!data) notFound();
  return <main className="mx-auto w-full max-w-3xl px-4 py-8 sm:py-12">
    <nav className="mb-5 text-sm text-muted-foreground"><Link href="/fp1" className="hover:underline">FP1級</Link> / <Link href="/fp1/applied" className="hover:underline">学科応用編</Link> / {data.label}</nav>
    <h1 className="text-2xl font-bold sm:text-3xl">{data.label} 学科応用編</h1>
    <p className="mt-2 text-sm text-muted-foreground">法令基準日 {data.lawReferenceDate}（この日の制度で解答）</p>
    <p className="mt-3 text-sm leading-7">現在の掲載範囲は問51〜問60（10原問・48空欄）です。原問の空欄と計算条件を保持しています。問51の元の3肢を除き、記入式の問題に選択肢は追加していません。</p>
    <ul className="mt-6 space-y-3">{[...data.questions, ...getFp1ExtensionQuestions(edition)].map((question) => <li key={question.id}><Link href={fp1AppliedQuestionPath(edition, question.number)} className="block rounded-xl border border-border bg-card p-4 font-semibold text-primary hover:underline">問{question.number} {question.title}</Link></li>)}</ul>
    <p className="mt-6 text-xs leading-6 text-muted-foreground">{data.sourceAttribution}</p>
  </main>;
}
