import type { Metadata } from "next";
import { RankingClient } from "./RankingClient";

export const metadata: Metadata = {
  title: "ランキング",
  description: "模試スコアを匿名で全国比較。あなたの実力がパーセンタイルで見えます。",
  alternates: { canonical: "/ranking" },
};

export default function RankingPage() {
  return (
    <main className="mx-auto w-full max-w-4xl px-4 py-10">
      <header className="mb-6">
        <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-sky-600 dark:text-sky-400">
          ランキング / ゲーミフィケーション
        </p>
        <h1 className="text-3xl font-bold tracking-tight">全国模試ランキング</h1>
        <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
          あなたの模試スコアを匿名でグローバル分布に重ね、現在のパーセンタイルを表示します。
        </p>
      </header>
      <RankingClient />
    </main>
  );
}
