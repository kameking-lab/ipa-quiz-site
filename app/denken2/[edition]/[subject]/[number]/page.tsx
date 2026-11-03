import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { NativeReader } from "@/components/denken2/NativeReader";
import { NATIVE_QUESTIONS, getNativeQuestion, nativeQuestionPath } from "@/lib/denken2/native";

export const dynamicParams = false;
export const generateStaticParams = () => NATIVE_QUESTIONS.map(q => ({
  edition: `${q.year}-primary`, subject: q.subject, number: `q${q.number}`,
}));
type Props = { params: Promise<{ edition: string; subject: string; number: string }> };
function resolve({ edition, subject, number }: Awaited<Props["params"]>) {
  const year = Number(edition.slice(0, 4));
  if (edition !== `${year}-primary` || !/^q[1-8]$/.test(number)) return null;
  return getNativeQuestion(year, subject, Number(number.slice(1))) ?? null;
}
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const q = resolve(await params);
  if (!q) return { title: "問題が見つかりません", robots: { index: false } };
  const subject = ({ theory: "理論", power: "電力", machine: "機械", law: "法規" })[q.subject];
  return {
    title: `電験二種 ${q.year}年度 一次試験 ${subject} 問${q.number}｜公式正答と解説`,
    description: `公式問題の${subject}問${q.number}を原問のまま掲載。全${q.subject === "machine" && q.year === 2026 && q.number === 7 ? "10" : "5"}回答欄の正答と解説、原本の図・数式・解答群を確認できます。`,
    alternates: { canonical: nativeQuestionPath(q.year, q.subject, q.number) },
  };
}
export default async function Page({ params }: Props) {
  const q = resolve(await params);
  if (!q) notFound();
  return <NativeReader question={q} />;
}
