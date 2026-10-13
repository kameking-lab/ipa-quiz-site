import type { Metadata } from "next";
import Link from "next/link";
import { GraduationCap } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export const metadata: Metadata = {
  title: "学生の方へ | 過去問AI",
  description: "過去問AIの問題演習とAI学習機能は、学生の方も無料で利用できます。学生証の提出や学割の申請は不要です。",
  alternates: { canonical: "/student" },
};

export default function StudentPage() {
  return (
    <main className="mx-auto w-full max-w-3xl flex-1 px-4 pb-12 pt-8 sm:px-6">
      <section className="mb-8 text-center">
        <Badge variant="success" className="mb-3">学生の方へ</Badge>
        <h1 className="mb-3 text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-4xl">
          学生も、すべて無料で学べます
        </h1>
        <p className="text-sm leading-relaxed text-zinc-600 dark:text-zinc-400 sm:text-base">
          問題演習とAIを使った学習に料金や月ごとの利用回数制限はありません。学生証の提出や学割の申請も不要です。
          連続利用や大量送信には、サービスを守るための適正利用制限があります。
        </p>
      </section>

      <Card className="mb-8">
        <CardContent className="flex flex-col items-start gap-4 p-6 sm:flex-row sm:items-center">
          <GraduationCap aria-hidden="true" className="h-8 w-8 shrink-0 text-sky-600 dark:text-sky-400" />
          <div className="flex-1">
            <h2 className="font-semibold text-zinc-900 dark:text-zinc-50">受ける資格から始める</h2>
            <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">公開中の資格を選び、年度や分野を絞って過去問を解けます。</p>
          </div>
          <Button asChild variant="primary"><Link href="/">資格を探す</Link></Button>
        </CardContent>
      </Card>
    </main>
  );
}
