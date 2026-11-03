import type { Metadata } from "next";
import Link from "next/link";
import { StudyPlanClient } from "./StudyPlanClient";

export const metadata: Metadata = {
  title: "AI 学習プラン",
  description: "学習期間を選ぶと、1日の目標問題数と学習の進め方を算出します。試験日程は次の資格で確認できます。",
  robots: { index: false, follow: false },
};

export default function StudyPlanPage() {
  return (
    <main className="mx-auto w-full max-w-2xl px-4 py-10">
      <div className="mb-6">
        <div className="mb-1 flex items-center gap-2 text-sm text-zinc-500 dark:text-zinc-400">
          <Link href="/account" className="hover:text-zinc-900 dark:hover:text-zinc-100">
            アカウント
          </Link>
          <span>/</span>
          <span>学習プラン</span>
        </div>
        <h1 className="text-2xl font-bold tracking-tight">AI 学習プラン</h1>
        <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
          学習期間を選ぶと、1日の目標問題数と学習の進め方を算出します。試験日程は「次の資格」で確認できます。
        </p>
      </div>
      <StudyPlanClient />
    </main>
  );
}
