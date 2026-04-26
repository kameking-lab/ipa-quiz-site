import type { Metadata } from "next";
import { ALL_QUESTIONS } from "@/data/questions";
import { WeaknessHeatmapClient } from "./WeaknessHeatmapClient";

export const metadata: Metadata = {
  title: "弱点ヒートマップ",
  description: "分野別の正答率を可視化し、合格までに必要な学習量を明らかにします。",
  robots: { index: false, follow: false },
};

export default function WeaknessPage() {
  const categoryById: Record<string, string> = {};
  for (const q of ALL_QUESTIONS) categoryById[q.id] = q.category;

  return (
    <main className="mx-auto w-full max-w-5xl px-4 py-10">
      <header className="mb-6">
        <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-sky-600 dark:text-sky-400">
          Premium / 学習科学
        </p>
        <h1 className="text-3xl font-bold tracking-tight">弱点ヒートマップ</h1>
        <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
          全分野の正答率を可視化し、合格ライン（70%）までに必要な学習量を算出します。
        </p>
      </header>
      <WeaknessHeatmapClient categoryById={categoryById} />
    </main>
  );
}
