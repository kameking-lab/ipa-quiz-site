import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { DENKEN1_NATIVE_PARTS, denken1NativeQuestionPath, denken1NativeSubjectPath, getDenken1NativePart } from "@/lib/denken1/native";

export const dynamicParams = false;
export const generateStaticParams = () => DENKEN1_NATIVE_PARTS.map(part => ({ edition: `${part.year}-primary`, subject: part.subject }));
type Props = { params: Promise<{ edition: string; subject: string }> };
const names = { theory: "理論", power: "電力", machine: "機械", law: "法規" };
function resolve(edition: string, subject: string) {
  const year = Number(edition.slice(0, 4));
  return edition === `${year}-primary` ? getDenken1NativePart(year, subject) : undefined;
}
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { edition, subject } = await params;
  const part = resolve(edition, subject);
  return part ? {
    title: `電験一種 ${part.year}年度 一次試験 ${names[part.subject]} 過去問${part.questions.length}原問`,
    description: `公式問題の${names[part.subject]}${part.questions.length}原問・${part.questions.reduce((sum, q) => sum + q.slots.length, 0)}回答欄を原問単位で収録。図・数式・正答・解説を確認できます。`,
    alternates: { canonical: denken1NativeSubjectPath(part.year, part.subject) },
  } : { title: "問題が見つかりません", robots: { index: false } };
}
export default async function Page({ params }: Props) {
  const { edition, subject } = await params;
  const part = resolve(edition, subject);
  if (!part) notFound();
  const fields = part.questions.reduce((sum, q) => sum + q.slots.length, 0);
  return <main className="mx-auto max-w-4xl px-4 py-8 sm:py-12">
    <Link href="/denken1" className="text-primary underline">← 電験一種へ戻る</Link>
    <h1 className="mt-6 text-2xl font-bold sm:text-3xl">電験一種 {part.year}年度 一次試験 {names[part.subject]}</h1>
    <p className="mt-3 leading-8">確認済みの{part.questions.length}原問・{fields}回答欄を収録しています。各原問の図・数式・表は公式原本画像を併記します。未収録の原問は公開範囲に含めていません。</p>
    <ol className="mt-7 divide-y divide-border">{part.questions.map(q =>
      <li key={q.id}><Link href={denken1NativeQuestionPath(q.year, q.subject, q.number)}
        className="block min-h-14 py-4 text-primary underline">問{q.number} {q.topic}（{q.slots.length}欄）</Link></li>)}</ol>
  </main>;
}
