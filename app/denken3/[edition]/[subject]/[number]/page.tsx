import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { NativeReader } from "@/components/denken2/NativeReader";
import { DENKEN3_NATIVE_QUESTIONS, denken3NativeQuestionPath, getDenken3NativePart, getDenken3NativeQuestion } from "@/lib/denken3/native";

export const dynamicParams = false;
export const generateStaticParams = () => DENKEN3_NATIVE_QUESTIONS.map(q => ({ edition: q.sitting, subject: q.subject, number: `q${q.number}` }));
type Props = { params: Promise<{ edition: string; subject: string; number: string }> };
const names = { theory: "理論", power: "電力", law: "法規" };
function resolve(edition: string, subject: string, number: string) {
  if (!/^q(?:[1-9]|1[0-8])$/.test(number)) return undefined;
  return getDenken3NativeQuestion(edition, subject, Number(number.slice(1)));
}
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { edition, subject, number } = await params;
  const q = resolve(edition, subject, number);
  return q ? {
    title: `電験三種 ${q.sitting === "2026-upper" ? "2026年度上期" : "2025年度下期"} ${names[q.subject]} 問${q.number}｜公式問題と解説`,
    description: `原問1題・${q.slots.length}回答欄。公式問題の図・表と5選択肢の理由を確認できます。`,
    alternates: { canonical: denken3NativeQuestionPath(q.sitting, q.subject, q.number) },
  } : { title: "問題が見つかりません", robots: { index: false } };
}
export default async function Page({ params }: Props) {
  const { edition, subject, number } = await params;
  const q = resolve(edition, subject, number);
  if (!q) notFound();
  const part = getDenken3NativePart(q.sitting, q.subject);
  if (!part) notFound();
  return <NativeReader question={q} readerConfig={{
    examName: "電験三種", examPath: "/denken3", editionSlug: q.sitting,
    editionLabel: q.sitting === "2026-upper" ? "2026年度上期 一次試験" : "2025年度下期 一次試験",
    sourceAnswerUrl: part.sourceAnswerUrl, sourceIndexUrl: part.sourceIndexUrl,
    lawReferenceDate: q.subject === "law" ? `${q.year}-04-01` : undefined,
  }} />;
}
