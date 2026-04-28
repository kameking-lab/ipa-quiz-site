import type { Metadata } from "next";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export const metadata: Metadata = {
  title: "モデレーション管理（プロトタイプ）",
  description: "公開フィードバック・問題コメントのモデレーション管理画面（admin only）",
  robots: { index: false, follow: false },
};

export default function ModerationPage() {
  return (
    <main className="mx-auto w-full max-w-5xl flex-1 px-4 pb-12 pt-8 sm:px-6">
      <div className="mb-6">
        <Badge variant="outline">プロトタイプ</Badge>
        <h1 className="mt-2 text-2xl font-bold sm:text-3xl">モデレーション管理</h1>
        <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
          公開フィードバック・問題コメントを確認し、公開／非公開を切り替えます。
          現在はプロトタイプ実装で、データソースとして API ログを参照する形を想定しています。
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="text-base">公開フィードバック</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-zinc-600 dark:text-zinc-400">
              FeedbackGateModal から投稿された声を確認します。
            </p>
            <ul className="mt-3 list-disc pl-5 text-xs text-zinc-500 dark:text-zinc-400">
              <li>個人情報マスキング（メール・電話番号）</li>
              <li>不適切表現フィルタ（後続フェーズで AI 分類を追加予定）</li>
              <li>公開／非公開／削除のトグル</li>
            </ul>
            <p className="mt-3 text-xs">
              <Link href="/feedback/public" className="underline hover:text-zinc-900 dark:hover:text-zinc-50">
                公開ページを見る
              </Link>
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">問題コメント</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-zinc-600 dark:text-zinc-400">
              各問題ページのコメント欄に投稿された誤り指摘・補足解説を確認します。
            </p>
            <ul className="mt-3 list-disc pl-5 text-xs text-zinc-500 dark:text-zinc-400">
              <li>問題 ID 別の集約ビュー</li>
              <li>「採用」して解説に反映 / 「却下」</li>
              <li>投稿者ハッシュ別の信頼度トラッキング</li>
            </ul>
          </CardContent>
        </Card>
      </div>

      <p className="mt-6 text-xs text-zinc-500 dark:text-zinc-400">
        ※ 実データへのアクセスは、API ログ・将来導入予定の DB テーブルを参照します。
        本ページは UI スケッチとして配置しており、実装はフェーズ 8 以降で順次拡張します。
      </p>
    </main>
  );
}
