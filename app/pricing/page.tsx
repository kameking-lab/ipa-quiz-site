import type { Metadata } from "next";
import Link from "next/link";
import { Heart, Sparkles, MessageSquare, Share2, BookOpen } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "教育貢献プロジェクトとして全機能無料",
  description:
    "過去問 AI は教育貢献プロジェクトとして、全試験区分・全機能を無料で公開しています。フィードバックをいただくと、AI コパイロットも実質無制限でお使いいただけます。",
  alternates: { canonical: "/pricing" },
};

export default function PricingPage() {
  return (
    <main className="mx-auto w-full max-w-3xl flex-1 px-4 pb-16 pt-8 sm:px-6">
      <section className="mb-8 text-center">
        <div className="mb-3 flex justify-center">
          <Badge variant="success">教育貢献プロジェクト</Badge>
        </div>
        <h1 className="mb-3 text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-4xl">
          全機能を無料で公開しています
        </h1>
        <p className="mx-auto max-w-2xl text-sm leading-relaxed text-zinc-600 dark:text-zinc-400 sm:text-base">
          過去問 AI は、IPA 試験対策を誰もが平等に学べる場として運営しています。
          全 13 試験区分・全モード・AI コパイロット・午後 AI 採点 — すべて無料です。
        </p>
      </section>

      <Card className="mb-6 border-emerald-200 bg-emerald-50/40 dark:border-emerald-900/60 dark:bg-emerald-950/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base">
            <Heart className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
            プロジェクトの考え方
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2 text-sm leading-relaxed text-zinc-700 dark:text-zinc-300">
            <li className="flex gap-2">
              <BookOpen className="mt-0.5 h-4 w-4 flex-shrink-0 text-emerald-600 dark:text-emerald-400" />
              <span>
                <strong>すべての学習機能を無料で公開。</strong>
                試験区分・年度・分野・模試・AI コパイロット・午後 AI 採点に制限はありません。
              </span>
            </li>
            <li className="flex gap-2">
              <MessageSquare className="mt-0.5 h-4 w-4 flex-shrink-0 text-emerald-600 dark:text-emerald-400" />
              <span>
                <strong>フィードバック投稿で AI を実質無制限に。</strong>
                AI コパイロットは初回 10 回まで自由にお試しいただけます。1 度フィードバックをご投稿いただくと、以降は実質無制限になります。
              </span>
            </li>
            <li className="flex gap-2">
              <Share2 className="mt-0.5 h-4 w-4 flex-shrink-0 text-emerald-600 dark:text-emerald-400" />
              <span>
                <strong>応援はシェアで。</strong>
                友人・SNS・所属コミュニティでご紹介いただけると、運営の励みになります。
                応援方法は <Link href="/support" className="underline hover:text-zinc-900 dark:hover:text-zinc-100">/support</Link> をご覧ください。
              </span>
            </li>
          </ul>
        </CardContent>
      </Card>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="text-base">利用できる機能</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="grid gap-2 text-sm sm:grid-cols-2">
            {[
              "全 13 試験区分の過去問",
              "ランダム / 年度別 / 分野別 / 復習 / 模試モード",
              "ゼロ遷移クイズ UI（モバイル最適化）",
              "AI コパイロット（用語解説・誤答分析・類題生成）",
              "午後 AI 採点（記述式）",
              "学習履歴 / 段級ランキング / ストリーク",
              "ダークモード / PWA",
              "公開フィードバック一覧で他の方の声も読める",
            ].map((label) => (
              <li key={label} className="flex items-start gap-2">
                <Sparkles className="mt-0.5 h-4 w-4 flex-shrink-0 text-sky-600 dark:text-sky-400" />
                <span className="text-zinc-700 dark:text-zinc-300">{label}</span>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">よくあるご質問</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 text-sm leading-relaxed text-zinc-700 dark:text-zinc-300">
          <div>
            <p className="font-semibold text-zinc-900 dark:text-zinc-50">本当に全機能無料ですか？</p>
            <p>
              はい。教育貢献プロジェクトとして、全試験区分・全モード・AI コパイロット・午後 AI 採点を無料で公開しています。
            </p>
          </div>
          <div>
            <p className="font-semibold text-zinc-900 dark:text-zinc-50">運営はどなたですか？</p>
            <p>
              個人運営の教育貢献プロジェクトです。詳細は <Link href="/about" className="underline hover:text-zinc-900 dark:hover:text-zinc-100">/about</Link> および <Link href="/operator" className="underline hover:text-zinc-900 dark:hover:text-zinc-100">/operator</Link> をご覧ください。
            </p>
          </div>
          <div>
            <p className="font-semibold text-zinc-900 dark:text-zinc-50">改善要望や不具合報告はどこからできますか？</p>
            <p>
              <Link href="/contact" className="underline hover:text-zinc-900 dark:hover:text-zinc-100">/contact</Link> または各問題ページ下部のコメント欄からお寄せください。すべての投稿に目を通します。
            </p>
          </div>
        </CardContent>
      </Card>

      <div className="mt-6 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
        <Button asChild variant="primary">
          <Link href="/">学習を始める</Link>
        </Button>
        <Button asChild variant="outline">
          <Link href="/support">応援する</Link>
        </Button>
      </div>

      <p className="mt-6 text-center text-xs text-zinc-500 dark:text-zinc-400">
        運営状況・統計は <Link href="/stats" className="underline hover:text-zinc-700 dark:hover:text-zinc-300">/stats</Link> および <Link href="/transparency" className="underline hover:text-zinc-700 dark:hover:text-zinc-300">/transparency</Link> で公開しています。
      </p>
    </main>
  );
}
