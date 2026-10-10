import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { DENKEN3_NATIVE_SUBJECTS, denken3NativeQuestionPath, denken3NativeSubjectPath, getDenken3NativePart } from "@/lib/denken3/native";

export const dynamicParams = false;
export const generateStaticParams = () => DENKEN3_NATIVE_SUBJECTS.map(part => ({ edition: part.sitting, subject: part.subject }));
type Props = { params: Promise<{ edition: string; subject: string }> };
const names = { theory: "理論", power: "電力", machine: "機械", law: "法規" };
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { edition, subject } = await params;
  const part = getDenken3NativePart(edition, subject);
  return part ? {
    title: `電験三種 ${part.sitting === "2026-upper" ? "2026年度上期" : "2025年度下期"} ${names[part.subject]} 原問${part.questions.length}題`,
    description: `確認済み${part.questions.length}原問・${part.questions.reduce((sum, q) => sum + q.slots.length, 0)}回答欄を原本画像とともに掲載。`,
    alternates: { canonical: denken3NativeSubjectPath(part.sitting, part.subject) },
  } : { title: "問題が見つかりません", robots: { index: false } };
}
export default async function Page({ params }: Props) {
  const { edition, subject } = await params;
  const part = getDenken3NativePart(edition, subject);
  if (!part) notFound();
  const label = edition === "2026-upper" ? "2026年度上期" : "2025年度下期";
  return <main className="mx-auto max-w-4xl px-4 py-8 sm:py-12">
    <Link href="/denken3" className="text-primary underline">← 電験三種へ戻る</Link>
    <h1 className="mt-6 text-2xl font-bold sm:text-3xl">電験三種 {label} {names[part.subject]}</h1>
    <p className="mt-3 leading-8">確認済み{part.questions.length}原問・{part.questions.reduce((sum, q) => sum + q.slots.length, 0)}回答欄を収録。設問と原本画像を確認してから採点できます。未掲載の問題はこの一覧に含めていません。</p>
    <ol className="mt-7 divide-y divide-border">{part.questions.map(q =>
      <li key={q.id}><Link href={denken3NativeQuestionPath(q.sitting, q.subject, q.number)}
        className="block min-h-14 py-4 text-primary underline">問{q.number} {q.topic}（{q.slots.length}回答欄）</Link></li>)}</ol>
  </main>;
}
