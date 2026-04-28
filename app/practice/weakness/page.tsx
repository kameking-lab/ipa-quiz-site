import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { WeaknessClient } from "./WeaknessClient";

export const metadata: Metadata = {
  title: "苦手分野集中練習",
  description: "あなたが間違えた問題から弱い分野を抽出し、その分野に絞って演習できます。",
  robots: { index: false, follow: false },
};

export default function WeaknessPage() {
  return (
    <main className="mx-auto w-full max-w-3xl px-4 py-8 sm:py-12">
      <Button asChild variant="ghost" size="sm" className="mb-4">
        <Link href="/">
          <ArrowLeft className="h-4 w-4" /> ホームに戻る
        </Link>
      </Button>

      <h1 className="mb-2 text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
        苦手分野集中練習
      </h1>
      <p className="mb-6 text-sm text-zinc-600 dark:text-zinc-400">
        これまでの誤答から、あなたが弱い分野ベスト5を自動で抽出します。1分野ずつ集中演習して取りこぼしを潰しましょう。
      </p>

      <WeaknessClient />
    </main>
  );
}
