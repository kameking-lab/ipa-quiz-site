import type { Metadata } from "next";
import { RankingClient } from "./RankingClient";

export const metadata: Metadata = {
  title: "模試の記録と分布デモ",
  description: "この端末の模試記録を確認できます。分布デモは架空のデータで、全国順位を示しません。",
  alternates: { canonical: "/ranking" },
};

export default function RankingPage() {
  return (
    <main className="mx-auto w-full max-w-4xl px-4 py-10">
      <header className="mb-6">
        <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-sky-600 dark:text-sky-400">
          模試の記録
        </p>
        <h1 className="text-3xl font-bold tracking-tight">模試の記録と分布デモ</h1>
        <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
          保存された模試結果と、架空の分布を使う表示デモを分けて確認できます。全国比較のデータはありません。
        </p>
      </header>
      <RankingClient />
    </main>
  );
}
