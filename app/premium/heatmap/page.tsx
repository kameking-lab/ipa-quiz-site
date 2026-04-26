import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { WeaknessHeatmapClient } from "./WeaknessHeatmapClient";

export const metadata: Metadata = {
  title: "弱点ヒートマップ — Premium",
  description:
    "全試験区分・全分野の正答率を一目で可視化。苦手分野を特定して効率的に学習を進められます。",
  robots: { index: false, follow: false },
};

export default function WeaknessHeatmapPage() {
  return (
    <main className="mx-auto w-full max-w-4xl px-4 py-8 sm:py-12">
      <Button asChild variant="ghost" size="sm" className="mb-4">
        <Link href="/">
          <ArrowLeft className="h-4 w-4" /> ホームに戻る
        </Link>
      </Button>

      <div className="mb-6">
        <Badge variant="soft" className="mb-2">
          <Sparkles className="h-3 w-3" />
          Premium 機能
        </Badge>
        <h1 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
          弱点ヒートマップ
        </h1>
        <p className="mt-2 text-sm text-muted-foreground sm:text-base">
          回答履歴から、試験区分×分野の正答率を可視化します。
          赤いセルが苦手分野。クリックするとその分野だけを集中演習できます。
        </p>
      </div>

      <WeaknessHeatmapClient />
    </main>
  );
}
