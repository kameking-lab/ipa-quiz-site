import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SecondaryReader } from "@/components/denken2/SecondaryReader";
import { SECONDARY_QUESTIONS, SECONDARY_SUBJECT_NAMES, getSecondaryQuestion, secondaryQuestionPath } from "@/lib/denken2/secondary";

export const dynamicParams = false;
export const generateStaticParams = () => SECONDARY_QUESTIONS.map(q => ({ year: String(q.year), subject: q.subject, number: `q${q.number}` }));
type Props = { params: Promise<{ year: string; subject: string; number: string }> };
function resolve(params: Awaited<Props["params"]>) {
  if (!/^202[45]$/.test(params.year) || !/^q[1-6]$/.test(params.number)) return undefined;
  return getSecondaryQuestion(Number(params.year), params.subject, Number(params.number.slice(1)));
}
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const q = resolve(await params);
  if (!q) return { title: "問題が見つかりません", robots: { index: false } };
  return {
    title: `電験二種 ${q.year}年度 二次 ${SECONDARY_SUBJECT_NAMES[q.subject]} 問${q.number}｜${q.topic}`,
    description: `${q.topic}の公式問題・標準解答と全小問の解説。図と数式を原本で読み、記述式の解答を保存しながら練習できます。`,
    alternates: { canonical: secondaryQuestionPath(q) },
  };
}
export default async function Page({ params }: Props) {
  const q = resolve(await params);
  if (!q) notFound();
  const group = SECONDARY_QUESTIONS.filter(item => item.year === q.year && item.subject === q.subject);
  const index = group.findIndex(item => item.id === q.id);
  const previous = group[index - 1];
  const next = group[index + 1];
  return <SecondaryReader key={q.id} question={q} previous={previous && secondaryQuestionPath(previous)} next={next && secondaryQuestionPath(next)} />;
}
