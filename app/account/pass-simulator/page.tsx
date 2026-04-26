import type { Metadata } from "next";
import { PassSimulatorClient } from "./PassSimulatorClient";

export const metadata: Metadata = {
  title: "合格判定シミュレータ",
  description: "試験日から逆算し、現在の実力で合格できる確率と必要な学習量を予測します。",
  robots: { index: false, follow: false },
};

export default function PassSimulatorPage() {
  return (
    <main className="mx-auto w-full max-w-5xl px-4 py-10">
      <header className="mb-6">
        <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-sky-600 dark:text-sky-400">
          Premium / 学習科学
        </p>
        <h1 className="text-3xl font-bold tracking-tight">合格判定シミュレータ</h1>
        <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
          試験日と現在のあなたの正答率から、合格確率と推奨学習量をリアルタイム計算します。
        </p>
      </header>
      <PassSimulatorClient />
    </main>
  );
}
