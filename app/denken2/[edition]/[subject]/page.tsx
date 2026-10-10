import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  NATIVE_EDITIONS, NATIVE_QUESTIONS, getNativeSubjectQuestions, nativeQuestionPath, nativeSubjectPath,
  type NativeSubject,
} from "@/lib/denken2/native";

export const dynamicParams = false;
export const generateStaticParams = () => [...new Set(NATIVE_QUESTIONS.map(q => `${q.year}:${q.subject}`))]
  .map(key => { const [year, subject] = key.split(":"); return { edition: `${year}-primary`, subject }; });
type Props = { params: Promise<{ edition: string; subject: string }> };
const subjectLabel = (subject: NativeSubject) => ({ theory: "理論", power: "電力", machine: "機械", law: "法規" })[subject];
function resolve(edition: string, subject: string): { year: number; subject: NativeSubject } | null {
  const year = Number(edition.slice(0, 4));
  if (edition !== `${year}-primary` || !NATIVE_EDITIONS.some(item => item.year === year)) return null;
  if (subject !== "theory" && subject !== "power" && subject !== "machine" && subject !== "law") return null;
  if (!getNativeSubjectQuestions(year, subject).length) return null;
  return { year, subject };
}
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const parsed = resolve((await params).edition, (await params).subject);
  return parsed ? {
    title: `電験二種 ${parsed.year}年度 一次試験 ${subjectLabel(parsed.subject)} 過去問8原問`,
    description: `公式問題の${subjectLabel(parsed.subject)}問1〜8を原問単位で掲載。公式正答、全欄解説、原本の図と解答群を確認できます。`,
    alternates: { canonical: nativeSubjectPath(parsed.year, parsed.subject) },
  } : { title: "問題が見つかりません", robots: { index: false } };
}
export default async function Page({ params }: Props) {
  const parsed = resolve((await params).edition, (await params).subject);
  if (!parsed) notFound();
  const questions = getNativeSubjectQuestions(parsed.year, parsed.subject);
  const fields = questions.reduce((sum, q) => sum + (q.year === 2026 && q.subject === "machine" && q.number === 7 ? 10 : 5), 0);
  return <main className="mx-auto max-w-4xl px-4 py-8 sm:py-12">
    <Link href="/denken2" className="text-primary underline">← 電験二種へ戻る</Link>
    <h1 className="mt-6 text-2xl font-bold sm:text-3xl">電験二種 {parsed.year}年度 一次試験 {subjectLabel(parsed.subject)}</h1>
    <p className="mt-3 leading-8">公式問題の問1〜8、全{questions.length}原問・{fields}回答欄を収録しています。問7と問8は選択問題で、実際の試験ではいずれか一方を解答します。各問の図・数式・表は公式原本画像を併記します。</p>
    <ol className="mt-7 divide-y divide-border">{questions.map(q =>
      <li key={q.id}><Link href={nativeQuestionPath(q.year, q.subject, q.number)}
        className="block min-h-14 py-4 text-primary underline">問{q.number} {q.topic}（{q.year === 2026 && q.subject === "machine" && q.number === 7 ? "定義5欄＋単位5欄" : "5欄"}）</Link></li>)}</ol>
  </main>;
}
