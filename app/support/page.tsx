import type { Metadata } from "next";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Heart, Share2, MessageSquare, BookOpen, Users } from "lucide-react";
import { ShareButtons } from "@/components/ShareButtons";

export const metadata: Metadata = {
  title: "過去問 AI を応援する",
  description:
    "過去問 AI は教育貢献プロジェクトとして全機能無料で公開しています。応援はシェア・フィードバック・口コミで。金銭的負担はお願いしません。",
  alternates: { canonical: "/support" },
};

export default function SupportPage() {
  return (
    <main className="mx-auto w-full max-w-3xl flex-1 px-4 pb-16 pt-8 sm:px-6">
      <header className="mb-8 text-center">
        <Badge variant="success">教育貢献プロジェクト</Badge>
        <h1 className="mt-3 flex items-center justify-center gap-2 text-3xl font-bold tracking-tight sm:text-4xl">
          <Heart className="h-7 w-7 text-rose-500" />
          過去問 AI を応援する
        </h1>
        <p className="mx-auto mt-3 max-w-xl text-sm leading-relaxed text-zinc-600 dark:text-zinc-400 sm:text-base">
          全機能を無料で公開しているため、金銭的なご支援はお願いしていません。
          かわりに、もっと届けたい人へつないでくださると、運営の励みになります。
        </p>
      </header>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base">
            <Share2 className="h-4 w-4 text-sky-600 dark:text-sky-400" />
            ① シェアする（一番うれしい応援）
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <p className="text-sm text-zinc-700 dark:text-zinc-300">
            このページや、お気に入りの問題ページの URL を、SNS や勉強仲間にシェアしてください。
            学習中のスクリーンショットを X や Instagram に投稿いただけると、教育貢献プロジェクトの存在が広がります。
          </p>
          <ShareButtons
            url="https://ipa-quiz-site.vercel.app/support"
            text="IPA 試験対策が全機能無料で使える教育貢献プロジェクト「過去問 AI」を応援しています。"
            hashtags={["過去問AI", "IPA試験", "応用情報"]}
          />
        </CardContent>
      </Card>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base">
            <MessageSquare className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
            ② フィードバックを送る
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <p className="text-sm text-zinc-700 dark:text-zinc-300">
            使い心地・解説の誤り・改善要望をお寄せください。すべての投稿に目を通し、
            プロジェクトに反映していきます。
          </p>
          <div className="flex flex-wrap gap-2">
            <Button asChild variant="primary">
              <Link href="/contact">お問い合わせフォーム</Link>
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base">
            <BookOpen className="h-4 w-4 text-amber-600 dark:text-amber-400" />
            ③ 学習仲間を巻き込む
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2 text-sm text-zinc-700 dark:text-zinc-300">
            <li>
              所属する勉強会・社内チャットで紹介する
            </li>
            <li>
              note・ブログ・YouTube などで取り上げる
            </li>
            <li>
              学校・専門学校・社内研修の補助教材として活用する（無料・許諾不要）
            </li>
          </ul>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base">
            <Users className="h-4 w-4 text-violet-600 dark:text-violet-400" />
            ④ 教育機関・企業での活用
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-zinc-700 dark:text-zinc-300">
            学校・専門学校・社内研修などでご活用いただく場合も、料金は一切かかりません。
            活用事例の共有や、運用上のご相談がありましたら{" "}
            <Link href="/contact" className="underline hover:text-zinc-900 dark:hover:text-zinc-50">
              お問い合わせフォーム
            </Link>
            よりご連絡ください。
          </p>
        </CardContent>
      </Card>

      <p className="mt-8 text-center text-xs text-zinc-500 dark:text-zinc-400">
        運営の透明性は <Link href="/transparency" className="underline hover:text-zinc-700 dark:hover:text-zinc-300">/transparency</Link>{" "}
        / 利用統計は <Link href="/stats" className="underline hover:text-zinc-700 dark:hover:text-zinc-300">/stats</Link> で公開しています。
      </p>
    </main>
  );
}
