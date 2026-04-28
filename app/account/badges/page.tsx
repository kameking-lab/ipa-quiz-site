import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { BadgeWall } from "./BadgeWall";
import { StreakCouponCard } from "@/components/motivation/StreakCouponCard";

export const metadata: Metadata = {
  title: "獲得バッジ",
  description: "連続学習で獲得できるバッジ一覧。",
  robots: { index: false, follow: false },
};

export default function BadgesPage() {
  return (
    <main className="mx-auto w-full max-w-3xl px-4 py-8 sm:py-12">
      <Button asChild variant="ghost" size="sm" className="mb-4">
        <Link href="/">
          <ArrowLeft className="h-4 w-4" /> ホームに戻る
        </Link>
      </Button>

      <h1 className="mb-2 text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
        連続学習バッジ
      </h1>
      <p className="mb-6 text-sm text-zinc-600 dark:text-zinc-400">
        毎日コツコツの継続で獲得できるバッジ。Z世代の合格者は週末も忘れず連続維持。
      </p>

      <div className="mb-6">
        <StreakCouponCard variant="full" />
      </div>

      <BadgeWall />

      <div className="mt-8 rounded-2xl border border-zinc-200 bg-white p-5 text-sm dark:border-zinc-800 dark:bg-zinc-950">
        <h2 className="mb-2 font-semibold">バッジ獲得ルール</h2>
        <ul className="space-y-1 text-xs text-zinc-600 dark:text-zinc-400">
          <li>JST 0:00 リセットで「今日学習した」と判定されます</li>
          <li>連続が途切れると現在の連続日数は 0 にリセット</li>
          <li>過去の最高連続日数（longest streak）でバッジ獲得は維持</li>
          <li>30日達成でプレミアム1週間無料クーポンが発行されます</li>
        </ul>
      </div>
    </main>
  );
}
