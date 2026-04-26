import type { Metadata } from "next";
import { EssayHistoryView } from "./EssayHistoryView";

export const metadata: Metadata = {
  title: "AI 論述添削 履歴",
  description: "過去に AI が採点した論述の履歴とランク推移。",
  robots: { index: false, follow: false },
};

export default function EssayHistoryPage() {
  return (
    <main className="mx-auto w-full max-w-4xl flex-1 px-4 pb-16 pt-8 sm:px-6">
      <header className="mb-6">
        <h1 className="mb-1 text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-3xl">
          AI 論述添削 履歴
        </h1>
        <p className="text-sm text-zinc-600 dark:text-zinc-400">
          過去の採点結果（ローカル保存・最新50件）。
        </p>
      </header>
      <EssayHistoryView />
    </main>
  );
}
