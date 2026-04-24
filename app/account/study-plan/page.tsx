import type { Metadata } from "next";
import Link from "next/link";
import { StudyPlanClient } from "./StudyPlanClient";

export const metadata: Metadata = {
  title: "AI 学習プラン",
  description: "試験日を入力すると、残り日数から1日の目標問題数と弱点分野を自動算出します。",
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
          試験日を設定すると、残り日数・1日の目標問題数・弱点分野を自動算出します。
        </p>
      </div>
      <StudyPlanClient />
    </main>
  );
}
