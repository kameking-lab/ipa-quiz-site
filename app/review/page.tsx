import type { Metadata } from "next";
import { ReviewClient } from "./ReviewClient";

export const metadata: Metadata = {
  title: "間隔反復学習",
  description: "エビングハウスの忘却曲線に基づいて復習タイミングを最適化。今日復習すべき問題を自動表示します。",
  robots: { index: false, follow: false },
};

export default function ReviewPage() {
  return (
    <main className="mx-auto w-full max-w-2xl px-4 py-10">
      <div className="mb-6">
        <h1 className="text-2xl font-bold tracking-tight">間隔反復学習</h1>
        <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
          エビングハウスの忘却曲線に基づいて、今日復習すべき問題を自動表示します。
        </p>
      </div>
      <ReviewClient />
    </main>
  );
}
