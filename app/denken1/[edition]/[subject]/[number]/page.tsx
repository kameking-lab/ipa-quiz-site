import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { NativeReader } from "@/components/denken2/NativeReader";
import { DENKEN1_NATIVE_QUESTIONS, denken1NativeQuestionPath, getDenken1NativePart, getDenken1NativeQuestion } from "@/lib/denken1/native";

export const dynamicParams = false;
export const generateStaticParams = () => DENKEN1_NATIVE_QUESTIONS.map(q => ({
  edition: `${q.year}-primary`, subject: q.subject, number: `q${q.number}`,
}));
type Props = { params: Promise<{ edition: string; subject: string; number: string }> };
function resolve(edition: string, subject: string, number: string) {
  const year = Number(edition.slice(0, 4));
  if (edition !== `${year}-primary` || !/^q[1-7]$/.test(number)) return undefined;
  return getDenken1NativeQuestion(year, subject, Number(number.slice(1)));
}
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { edition, subject, number } = await params;
  const q = resolve(edition, subject, number);
  return q ? {
    title: `電験一種 ${q.year}年度 一次試験 ${q.subject} 問${q.number}｜公式原問`,
    description: `原問1件・${q.slots.length}回答欄。公式問題の図・数式・解答群、各欄の正答と解説を掲載。`,
    alternates: { canonical: denken1NativeQuestionPath(q.year, q.subject, q.number) },
  } : { title: "問題が見つかりません", robots: { index: false } };
}
export default async function Page({ params }: Props) {
  const { edition, subject, number } = await params;
  const q = resolve(edition, subject, number);
  if (!q) notFound();
  const part = getDenken1NativePart(q.year, q.subject);
  if (!part) notFound();
  return <NativeReader question={q} readerConfig={{
    examName: "電験一種", examPath: "/denken1",
    sourceAnswerUrl: part.sourceAnswerUrl, sourceIndexUrl: part.sourceIndexUrl,
    lawReferenceDate: q.subject === "law" ? `${q.year}-04-01` : undefined,
  }} />;
}
