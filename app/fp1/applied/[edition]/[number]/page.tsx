import {Fp1AppliedView} from "@/components/quiz/Fp1AppliedView";
import { getFp1ExtensionQuestions, getFp1PublishedExtension } from "@/lib/fp1/published-extension";
import { AppliedExtensionPage } from "@/app/fp1/applied/_components/extension-page";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { FP1_APPLIED_EDITIONS, fp1AppliedQuestionPath, getFp1AppliedEdition } from "@/lib/fp1/applied";

interface RouteParams { edition: string; number: string }
export const dynamicParams = false;
export function generateStaticParams() {
  return FP1_APPLIED_EDITIONS.flatMap((edition) => [...(getFp1AppliedEdition(edition)?.questions ?? []), ...getFp1ExtensionQuestions(edition)].map((question) => ({ edition, number: String(question.number) })));
}

export async function generateMetadata({ params }: { params: Promise<RouteParams> }): Promise<Metadata> {
  const { edition, number } = await params;
  const extensionQuestion = getFp1ExtensionQuestions(edition).find((q) => String(q.number) === number);
  if (extensionQuestion) return { title: `FP1級 ${edition === "202609" ? "2026年9月" : "2026年5月"} 学科応用編 問${number}｜問題・模範解答`, description: extensionQuestion.title, alternates: { canonical: fp1AppliedQuestionPath(edition, extensionQuestion.number) } };
  const data = getFp1AppliedEdition(edition);
  const question = data?.questions.find((item) => String(item.number) === number);
  if (!data || !question) return { title: "問題が見つかりません", robots: { index: false } };
  return { title: `FP1級 ${data.label} 学科応用編 問${question.number}｜問題・模範解答`, description: `問${question.number} ${question.title}。${question.type === "originalcalculation" ? "共通設例、2つの計算問題、公式模範解答と計算過程を確認できます。" : question.type === "originalnumericcloze" ? "共通設例、数値記入式の空欄①～⑦、公式模範解答と7つの独自解説を確認できます。" : "共通設例、空欄①〜④と空欄④の3肢、公式模範解答と独自解説を確認できます。"}法令基準日は${data.lawReferenceDate}です。`, alternates: { canonical: fp1AppliedQuestionPath(edition, question.number) } };
}

export default async function Fp1AppliedQuestionPage({ params }: { params: Promise<RouteParams> }) {
  const { edition, number } = await params;
  const extension = getFp1PublishedExtension(edition);
  const extensionQuestion = getFp1ExtensionQuestions(edition).find((q) => String(q.number) === number);
  if (extension && extensionQuestion) return <AppliedExtensionPage data={extension} question={extensionQuestion} />;
  const data = getFp1AppliedEdition(edition);
  const question = data?.questions.find((item) => String(item.number) === number);
  if (!data || !question) notFound();
  return <Fp1AppliedView edition={edition} data={data} question={question}/>;
}
