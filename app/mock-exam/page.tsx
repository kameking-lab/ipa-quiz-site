import type { Metadata } from "next";
import { MockExamLanding } from "./MockExamLanding";

export const metadata: Metadata = {
  title: "模試モード — 本番形式・制限時間付き",
  description:
    "本番と同じ問題数・時間配分で模試。合格判定・分野別分析・履歴グラフを提供。",
  alternates: { canonical: "/mock-exam" },
};

interface SearchParams {
  exam?: string;
}

export default async function MockExamPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const sp = await searchParams;
  return <MockExamLanding examFromQuery={sp.exam} />;
}
