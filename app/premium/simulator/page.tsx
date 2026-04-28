import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { PassSimulatorClient } from "./PassSimulatorClient";

export const metadata: Metadata = {
  title: "合格判定シミュレータ — Premium",
  description:
    "試験日と志望区分を入力すると、現在の実力から合格確率と必要学習量を予測します。",
  robots: { index: false, follow: false },
};

export default function PassSimulatorPage() {
  return (
    <main className="mx-auto w-full max-w-3xl px-4 py-8 sm:py-12">
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
          合格判定シミュレータ
        </h1>
        <p className="mt-2 text-sm text-muted-foreground sm:text-base">
          試験日と志望区分を入力すると、回答履歴から合格確率と1日あたりの目標問題数を算出します。
        </p>
      </div>

      <PassSimulatorClient />
    </main>
  );
}
