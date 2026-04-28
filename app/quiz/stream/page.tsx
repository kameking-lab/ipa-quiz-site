import type { Metadata } from "next";
import { StreamQuizLoader } from "@/components/quiz/stream/StreamQuizLoader";

export const metadata: Metadata = {
  title: "ストリーム学習 — TikTok風連続UI",
  description:
    "縦スワイプで次々と問題を解く、TikTok風の連続学習モード。10問ごとにWordle風サマリでシェア。",
  alternates: { canonical: "/quiz/stream" },
};

interface SearchParams {
  exam?: string;
  topic?: string;
  category?: string;
}

export default async function StreamQuizPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const sp = await searchParams;
  return <StreamQuizLoader params={sp} />;
}
