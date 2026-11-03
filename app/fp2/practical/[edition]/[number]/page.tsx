import { Fp2PracticalView } from "@/components/quiz/Fp2PracticalView";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { FP2_PRACTICAL_EDITIONS, getPracticalEdition, practicalSourceUrls } from "@/lib/fp2/practical";

export const dynamicParams = false;
export function generateStaticParams() {
  return FP2_PRACTICAL_EDITIONS.flatMap((edition) => Array.from({ length: 40 }, (_, index) => ({ edition, number: String(index + 1) })));
}

export async function generateMetadata({ params }: { params: Promise<{ edition: string; number: string }> }): Promise<Metadata> {
  const { edition, number } = await params;
  const data = getPracticalEdition(edition);
  const q = data?.questions.find((item) => item.number === Number(number));
  if (!q) return { title: "問題が見つかりません", robots: { index: false } };
  return { title: `FP2級 実技 ${data!.label} 問${q.number} 模範解答`, description: q.body.replace(/\s+/g, " ").slice(0, 140), alternates: { canonical: `/fp2/practical/${edition}/${q.number}` } };
}

export default async function Fp2PracticalQuestion({ params }: { params: Promise<{ edition: string; number: string }> }) {
  const { edition, number } = await params;
  const data = getPracticalEdition(edition);
  const q = data?.questions.find((item) => item.number === Number(number));
  if (!data || !q) notFound();
  const source = practicalSourceUrls(edition);
  return <Fp2PracticalView edition={edition} data={data} q={q} source={source}/>;
}
