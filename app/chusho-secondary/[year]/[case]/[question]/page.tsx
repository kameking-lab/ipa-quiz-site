import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CaseSource } from "@/components/chusho-secondary/CaseSource";
import { AnswerPractice } from "@/components/chusho-secondary/AnswerPractice";
import { CHUSHO_SECONDARY_CASES, getChushoCase, getChushoQuestion, chushoCasePath, chushoQuestionPath, INDEPENDENT_EXAMPLE_NOTICE } from "@/lib/chusho-secondary/data";

type Props = { params: Promise<{ year: string; case: string; question: string }> };
export const dynamicParams = false;
export const generateStaticParams = () => CHUSHO_SECONDARY_CASES.flatMap(p => p.questions.map(q => ({ year: String(p.year), case: p.case, question: `q${q.number}` })));
async function resolve(params: Props["params"]) {
  const value = await params;
  if (!/^q[1-5]$/.test(value.question)) notFound();
  const paper = getChushoCase(Number(value.year), value.case);
  const question = getChushoQuestion(Number(value.year), value.case, Number(value.question.slice(1)));
  if (!paper || !question) notFound();
  return { paper, question };
}
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { paper: p, question: q } = await resolve(params);
  return { title: `${p.year}年度 中小企業診断士二次 ${p.caseTitle} 第${q.number}問｜独自解答例`, description: `${q.topic}。公式原問・出題趣旨と独自解答例・考え方を確認し、記述練習できます。`, alternates: { canonical: chushoQuestionPath(p.year, p.case, q.number) } };
}
export default async function ChushoQuestionPage({ params }: Props) {
  const { paper: p, question: q } = await resolve(params);
  const previous = p.questions.find(row => row.number === q.number - 1);
  const next = p.questions.find(row => row.number === q.number + 1);
  return <main className="mx-auto max-w-4xl px-4 pb-20 pt-8">
    <Link href={chushoCasePath(p.year, p.case)} className="text-sm font-semibold text-primary hover:underline">← {p.year}年度 {p.caseTitle}の原問一覧</Link>
    <h1 className="mt-5 text-2xl font-bold sm:text-3xl">{p.year}年度 {p.caseTitle} 第{q.number}問：{q.topic}</h1>
    <p className="mt-3 rounded-xl border border-border bg-muted/30 p-4 text-sm leading-7">{INDEPENDENT_EXAMPLE_NOTICE}</p>
    <section className="mt-6 rounded-xl border border-border p-4" aria-labelledby="official-question-title">
      <h2 id="official-question-title" className="text-xl font-bold">公式原問（配点{q.points}点）</h2>
      <p className="mt-4 whitespace-pre-line text-sm leading-8">{q.questionText}</p>
    </section>
    <CaseSource paper={p} />
    <AnswerPractice questionId={q.id} solutions={q.solutions} />
    <section className="mt-6 rounded-xl border border-border p-4" aria-labelledby="intent-title">
      <h2 id="intent-title" className="font-bold">出題趣旨を踏まえた学習ポイント</h2>
      <p className="mt-2 text-sm leading-7">{q.intentSummary}</p><p className="mt-2 text-xs text-muted-foreground">公式の出題趣旨を当サイトが要約したものです。独自解答例は上のボタンから確認できます。</p>
    </section>
    <nav aria-label="同じ事例の原問" className="mt-8 flex flex-wrap justify-between gap-4">
      {previous ? <Link className="min-h-11 py-3 font-semibold text-primary hover:underline" href={chushoQuestionPath(p.year, p.case, previous.number)}>← 第{previous.number}問</Link> : <Link className="min-h-11 py-3 text-primary hover:underline" href={chushoCasePath(p.year, p.case)}>事例の一覧</Link>}
      {next && <Link className="min-h-11 py-3 font-semibold text-primary hover:underline" href={chushoQuestionPath(p.year, p.case, next.number)}>第{next.number}問 →</Link>}
    </nav>
  </main>;
}
