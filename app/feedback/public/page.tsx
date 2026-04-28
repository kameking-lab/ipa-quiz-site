import type { Metadata } from "next";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { PublicFeedbackList } from "./PublicFeedbackList";

export const metadata: Metadata = {
  title: "公開フィードバック一覧",
  description:
    "過去問 AI に寄せられたフィードバックの公開一覧。教育貢献プロジェクトとして、利用者の声を透明性高く共有しています。",
  alternates: { canonical: "/feedback/public" },
};

export default function PublicFeedbackPage() {
  return (
    <main className="mx-auto w-full max-w-3xl flex-1 px-4 pb-16 pt-8 sm:px-6">
      <nav aria-label="パンくずリスト" className="mb-4 text-xs text-zinc-500 dark:text-zinc-400">
        <ol className="flex flex-wrap items-center gap-1.5">
          <li>
            <Link href="/" className="hover:underline">
              ホーム
            </Link>
          </li>
          <li aria-hidden="true">/</li>
          <li aria-current="page" className="text-zinc-700 dark:text-zinc-300">
            公開フィードバック一覧
          </li>
        </ol>
      </nav>

      <header className="mb-6">
        <Badge variant="success">教育貢献プロジェクト</Badge>
        <h1 className="mt-2 text-2xl font-bold sm:text-3xl">公開フィードバック一覧</h1>
        <p className="mt-2 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
          過去問 AI に寄せられた利用者の声を、個人情報マスキング後に公開しています。
          いただいた声はプロジェクトの改善に反映していきます。
        </p>
      </header>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="text-base">フィードバックを送る</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm leading-relaxed text-zinc-700 dark:text-zinc-300">
            学習中の AI コパイロット利用画面、または{" "}
            <Link href="/contact" className="underline hover:text-zinc-900 dark:hover:text-zinc-50">
              お問い合わせフォーム
            </Link>
            から、いつでもフィードバックを送信できます。
            投稿いただくと AI コパイロットを以降ほぼ無制限でお使いいただけます。
          </p>
        </CardContent>
      </Card>

      <PublicFeedbackList />

      <p className="mt-8 text-center text-xs text-zinc-500 dark:text-zinc-400">
        ※ 現在、フィードバックはお使いのブラウザに保存され、API 経由で運営に届きます。
        将来的には全ユーザー横断の公開一覧に統合する予定です。
      </p>
    </main>
  );
}
