import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, BarChart3 } from "lucide-react";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "学習カレンダー（準備中）",
  description: "学習データを収集中です。",
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
        過去365日の学習量をヒートマップで可視化する機能です。
      </p>

      <div className="rounded-2xl border-2 border-dashed border-zinc-300 bg-zinc-50/50 p-8 text-center dark:border-zinc-700 dark:bg-zinc-900/30">
        <BarChart3 className="mx-auto mb-3 h-12 w-12 text-zinc-400 dark:text-zinc-600" />
        <h2 className="mb-2 text-lg font-semibold text-zinc-700 dark:text-zinc-300">
          データ収集中
        </h2>
        <p className="mx-auto max-w-md text-sm text-zinc-600 dark:text-zinc-400">
          十分な学習履歴が貯まると、365日のヒートマップが表示されます。
          まずは問題演習を続けて、データを育てていきましょう。
        </p>
        <div className="mt-5">
          <Button asChild variant="primary" size="sm">
            <Link href="/quiz?mode=random&exam=ap">いますぐ解く</Link>
          </Button>
        </div>
      </div>
    </main>
  );
}
