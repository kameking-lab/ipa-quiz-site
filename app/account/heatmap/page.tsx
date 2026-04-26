import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { LearningHeatmap } from "@/components/motivation/LearningHeatmap";

export const metadata: Metadata = {
  title: "学習カレンダー",
  description: "過去365日の学習量をヒートマップで表示します。",
  robots: { index: false, follow: false },
};

export default function HeatmapPage() {
  return (
    <main className="mx-auto w-full max-w-3xl px-4 py-8 sm:py-12">
      <Button asChild variant="ghost" size="sm" className="mb-4">
        <Link href="/">
          <ArrowLeft className="h-4 w-4" /> ホームに戻る
        </Link>
      </Button>

      <h1 className="mb-2 text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
        学習カレンダー
      </h1>
      <p className="mb-6 text-sm text-zinc-600 dark:text-zinc-400">
        過去365日のうち、学習した日が緑色で表示されます。毎日のコツコツが草に変わります。
      </p>

      <LearningHeatmap days={365} showStats />

      <div className="mt-6 rounded-2xl border border-zinc-200 bg-white p-5 text-sm dark:border-zinc-800 dark:bg-zinc-950">
        <h2 className="mb-2 font-semibold">配色の目安</h2>
        <ul className="space-y-1 text-xs text-zinc-600 dark:text-zinc-400">
          <li>1〜4 問: 薄い緑</li>
          <li>5〜14 問: 中緑</li>
          <li>15〜29 問: 濃い緑</li>
          <li>30 問以上: ダークグリーン（猛者の証）</li>
        </ul>
      </div>
    </main>
  );
}
