import type { Metadata } from "next";
import Link from "next/link";
import { Users } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ReferralClient } from "./ReferralClient";

export const metadata: Metadata = {
  title: "友達に過去問AIを紹介する",
  description: "無料で利用できる過去問AIを友達に共有できます。紹介特典や有料プランの申請は不要です。",
  alternates: { canonical: "/referral" },
};

export default function ReferralPage() {
  return (
    <main className="mx-auto w-full max-w-3xl flex-1 px-4 pb-12 pt-8 sm:px-6">
      <section className="mb-8 text-center">
        <Badge variant="success" className="mb-3">友達に紹介</Badge>
        <h1 className="mb-3 text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-4xl">
          一緒に過去問を学ぶ
        </h1>
        <p className="text-sm leading-relaxed text-zinc-600 dark:text-zinc-400 sm:text-base">
          紹介リンクから過去問AIを友達に共有できます。問題演習とAI学習機能は、紹介の有無にかかわらず無料です。
        </p>
      </section>

      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base">
            <Users aria-hidden="true" className="h-4 w-4 text-sky-600 dark:text-sky-400" />
            あなたの紹介リンク
          </CardTitle>
        </CardHeader>
        <CardContent><ReferralClient /></CardContent>
      </Card>

      <div className="text-center">
        <Link href="/" className="text-sm text-sky-600 underline-offset-2 hover:underline dark:text-sky-400">
          ホームに戻る
        </Link>
      </div>
    </main>
  );
}
