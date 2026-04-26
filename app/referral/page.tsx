import type { Metadata } from "next";
import Link from "next/link";
import { Gift, Star, Users } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ReferralClient } from "./ReferralClient";

export const metadata: Metadata = {
  title: "友達紹介プログラム",
  description:
    "IPA Quiz の友達紹介プログラム。紹介コードをシェアして友達を招待。紹介者・被紹介者ともに7日間 Premium 無料特典。",
  alternates: { canonical: "/referral" },
};

export default function ReferralPage() {
  return (
    <main className="mx-auto w-full max-w-3xl flex-1 px-4 pb-12 pt-8 sm:px-6">
      {/* Hero */}
      <section className="mb-8 text-center">
        <div className="mb-3 flex justify-center">
          <Badge variant="success">友達紹介</Badge>
        </div>
        <h1 className="mb-3 text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-4xl">
          友達紹介プログラム
        </h1>
        <p className="text-sm leading-relaxed text-zinc-600 dark:text-zinc-400 sm:text-base">
          紹介コードをシェアして友達を招待しましょう。
          <br />
          紹介者・被紹介者ともに <strong className="text-zinc-900 dark:text-zinc-50">Premium 7日間無料</strong> の特典があります。
        </p>
      </section>

      {/* Benefits */}
      <div className="mb-8 grid grid-cols-1 gap-3 sm:grid-cols-2">
        <div className="rounded-2xl border border-sky-200 bg-sky-50/40 p-4 dark:border-sky-900/40 dark:bg-sky-950/20">
          <div className="mb-2 flex items-center gap-2">
            <Gift className="h-5 w-5 text-sky-600 dark:text-sky-400" />
            <span className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">紹介した人（あなた）</span>
          </div>
          <ul className="space-y-1 text-xs text-zinc-600 dark:text-zinc-400">
            <li className="before:mr-1.5 before:content-['✓']">Premium 7日間無料（1紹介につき）</li>
            <li className="before:mr-1.5 before:content-['✓']">AI コパイロット無制限</li>
            <li className="before:mr-1.5 before:content-['✓']">Gemini Flash 高精度モード</li>
          </ul>
        </div>
        <div className="rounded-2xl border border-emerald-200 bg-emerald-50/40 p-4 dark:border-emerald-900/40 dark:bg-emerald-950/20">
          <div className="mb-2 flex items-center gap-2">
            <Star className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
            <span className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">招待された人（友達）</span>
          </div>
          <ul className="space-y-1 text-xs text-zinc-600 dark:text-zinc-400">
            <li className="before:mr-1.5 before:content-['✓']">Premium 7日間無料（登録時）</li>
            <li className="before:mr-1.5 before:content-['✓']">AI コパイロット無制限</li>
            <li className="before:mr-1.5 before:content-['✓']">学習履歴クラウド同期（β）</li>
          </ul>
        </div>
      </div>

      {/* Referral widget */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base">
            <Users className="h-4 w-4 text-sky-600 dark:text-sky-400" />
            あなたの紹介リンク
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ReferralClient />
        </CardContent>
      </Card>

      {/* How it works */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="text-base">紹介の仕組み</CardTitle>
        </CardHeader>
        <CardContent>
          <ol className="space-y-3">
            {[
              "上の紹介リンクをコピーして友達に送る",
              "友達がリンクから IPA Quiz に登録する",
              "あなたと友達、両方に Premium 7日間が付与される（近日実装）",
              "紹介を続けるほど Premium 期間が延長される",
            ].map((step, i) => (
              <li key={i} className="flex items-start gap-3 text-sm text-zinc-700 dark:text-zinc-300">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-sky-100 text-xs font-bold text-sky-700 dark:bg-sky-900/40 dark:text-sky-300">
                  {i + 1}
                </span>
                {step}
              </li>
            ))}
          </ol>
          <p className="mt-4 text-xs text-zinc-500 dark:text-zinc-400">
            ※ 特典付与は正式リリース後（2026年5月予定）に実装されます。現在は紹介リンクの発行のみ可能です。
          </p>
        </CardContent>
      </Card>

      <div className="text-center">
        <Link
          href="/"
          className="text-sm text-sky-600 underline-offset-2 hover:underline dark:text-sky-400"
        >
          ← ホームに戻る
        </Link>
      </div>
    </main>
  );
}
