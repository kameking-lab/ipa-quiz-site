import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CaseSource } from "@/components/chusho-secondary/CaseSource";
import { CHUSHO_SECONDARY_CASES, getChushoCase, chushoCasePath, chushoQuestionPath, INDEPENDENT_EXAMPLE_NOTICE } from "@/lib/chusho-secondary/data";

type Props = { params: Promise<{ year: string; case: string }> };
export const dynamicParams = false;
export const generateStaticParams = () => CHUSHO_SECONDARY_CASES.map(p => ({ year: String(p.year), case: p.case }));
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const paramsValue = await params;
  const p = getChushoCase(Number(paramsValue.year), paramsValue.case);
  if (!p) return {};
  return { title: `${p.year}年度 中小企業診断士二次 ${p.caseTitle}｜原問と独自解答例`, alternates: { canonical: chushoCasePath(p.year, p.case) } };
}
export default async function ChushoCasePage({ params }: Props) {
  const value = await params;
  const p = getChushoCase(Number(value.year), value.case);
  if (!p) notFound();
  return <main className="mx-auto max-w-4xl px-4 pb-20 pt-8">
    <Link href="/chusho-secondary" className="text-sm font-semibold text-primary hover:underline">← 二次試験の年度・事例一覧</Link>
    <h1 className="mt-5 text-3xl font-bold">{p.year}年度 {p.caseTitle}：{p.domain}</h1>
    <p className="mt-3 text-sm leading-7 text-muted-foreground">{INDEPENDENT_EXAMPLE_NOTICE}</p>
    <section className="mt-6" aria-label="原問一覧"><h2 className="text-xl font-bold">原問を選んで解答する</h2>
      <div className="mt-3 grid gap-3 sm:grid-cols-2">{p.questions.map(q => <Link key={q.id} href={chushoQuestionPath(p.year, p.case, q.number)} className="min-h-28 rounded-xl border border-border bg-card p-4 hover:border-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary">
        <span className="block font-bold">第{q.number}問：{q.topic}</span><span className="mt-2 block text-sm text-muted-foreground">原問の配点{q.points}点・{q.solutions.length}解答例</span>
      </Link>)}</div>
    </section>
    <CaseSource paper={p} />
  </main>;
}
