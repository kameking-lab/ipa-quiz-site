import type { Metadata } from "next";
import { TutorClient } from "./TutorClient";

export const metadata: Metadata = {
  title: "AIチューター月次レポート",
  description: "あなたの学習データを AI が分析し、月次レポートと重点強化分野を提示します。",
  robots: { index: false, follow: false },
};

export default function TutorPage() {
  return (
    <main className="mx-auto w-full max-w-4xl px-4 py-10">
      <header className="mb-6">
        <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-sky-600 dark:text-sky-400">
          Premium / 学習科学
        </p>
        <h1 className="text-3xl font-bold tracking-tight">AI チューター</h1>
        <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
          あなたの学習履歴と SRS データを総合分析し、月次レポートと重点強化分野を提案します。
        </p>
      </header>
      <TutorClient />
    </main>
  );
}
