import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, ArrowRight, FileEdit } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AfternoonGradingDemo } from "@/components/demo/AfternoonGradingDemo";

export const metadata: Metadata = {
  title: "午後採点の画面デモ — 過去問AI",
  description: "午後問題の採点画面とフィードバックの表示例を、モックデータで確認できます。",
  alternates: { canonical: "/demo/afternoon" },
  robots: { index: false, follow: true },
};

export default function AfternoonDemoPage() {
  return (
    <main className="mx-auto w-full max-w-4xl flex-1 px-4 pb-16 pt-6 sm:px-6">
      <Button asChild variant="ghost" size="sm" className="mb-3">
        <Link href="/"><ArrowLeft className="h-4 w-4" />戻る</Link>
      </Button>
      <header className="mb-8">
        <h1 className="mb-3 text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-4xl">午後採点の画面デモ</h1>
        <p className="text-sm leading-relaxed text-zinc-600 dark:text-zinc-400 sm:text-base">
          このページでは、午後答案へのフィードバックがどのように表示されるかをモックデータで確認できます。
          実際の答案を採点する機能は現在提供していません。
        </p>
      </header>
      <Card className="mb-8 border-sky-200 bg-sky-50/40 dark:border-sky-900/60 dark:bg-sky-950/20">
        <CardContent className="p-4 text-sm leading-relaxed text-zinc-700 dark:text-zinc-300">
          <strong className="text-zinc-900 dark:text-zinc-100">デモの流れ:</strong>{" "}
          区分と設問を選び、答案を入力またはサンプルを読み込み、「AI 採点を実行（デモ）」を押すと表示例を確認できます。
          結果はモックデータで、入力した答案の採点結果ではありません。
        </CardContent>
      </Card>
      <AfternoonGradingDemo />
      <section className="mt-10">
        <Card className="border-violet-200 bg-violet-50/40 dark:border-violet-900/60 dark:bg-violet-950/20">
          <CardContent className="flex flex-wrap items-center justify-between gap-3 p-5">
            <div>
              <h2 className="mb-1 text-base font-bold text-zinc-900 dark:text-zinc-50">公式過去問の資料</h2>
              <p className="text-sm text-zinc-700 dark:text-zinc-300">午後の公式問題冊子・解答例・採点講評は、年度別の案内から確認できます。</p>
            </div>
            <Button asChild variant="primary">
              <Link href="/essay">公式資料を見る<ArrowRight className="h-4 w-4" /></Link>
            </Button>
          </CardContent>
        </Card>
      </section>
      <p className="mt-8 text-center text-xs text-zinc-500 dark:text-zinc-400">
        <FileEdit className="mr-1 inline h-3.5 w-3.5" />このページの採点結果はデモ用のモックデータです。
      </p>
    </main>
  );
}
