import {CaseQuestionView} from "@/components/chusho-secondary/CaseQuestionView";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CHUSHO_SECONDARY_CASES, getChushoCase, getChushoQuestion, chushoQuestionPath } from "@/lib/chusho-secondary/data";

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
  return <CaseQuestionView paper={p} question={q}/>;
}
