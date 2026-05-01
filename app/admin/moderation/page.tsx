import type { Metadata } from "next";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { maskPII } from "@/lib/feedback/pii-masker";

export const metadata: Metadata = {
  title: "モデレーション管理（プロトタイプ）",
  description: "公開フィードバック・問題コメントのモデレーション管理画面（admin only）",
  robots: { index: false, follow: false },
};

// モデレーション画面のマスキング動作確認用サンプル。
// 実データ統合は DB 投入後に差し替え予定。
const MASK_SAMPLES: Array<{ id: string; original: string }> = [
  {
    id: "sample-email",
    original: "解説の誤字を見つけました。返信は yamada.taro@example.co.jp までお願いします。",
  },
  {
    id: "sample-phone",
    original: "緊急の場合は 090-1234-5678 か 03-1234-5678 にご連絡ください。フリーダイヤル 0120-123-456 もあります。",
  },
  {
    id: "sample-name",
    original: "山田 太郎さんが推薦してくれました。佐藤先生の解説とは違う気がします。",
  },
  {
    id: "sample-mynumber",
    original: "本人確認番号 123456789012 を間違えて送ってしまいました。1234-5678-9012 も同様です。",
  },
  {
    id: "sample-mixed",
    original:
      "鈴木さんの携帯 08012345678 と taro@example.com に共有しました。マイナンバー 123412345678 も含めて削除をお願いします。",
  },
];

export default function ModerationPage() {
  const previews = MASK_SAMPLES.map((s) => ({ ...s, ...maskPII(s.original) }));

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
              <li>個人情報マスキング（メール・電話番号・氏名・マイナンバー）</li>
              <li>不適切表現フィルタ（後続フェーズで AI 分類を追加予定）</li>
              <li>公開／非公開／削除のトグル</li>
            </ul>
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

      <section className="mt-8">
        <div className="mb-3 flex items-center justify-between">
          <h2 className="text-lg font-semibold">PII マスキング動作確認</h2>
          <Badge variant="outline">{previews.length} 件</Badge>
        </div>
        <p className="mb-3 text-xs text-zinc-500 dark:text-zinc-400">
          投稿時に <code>lib/feedback/pii-masker.ts</code>{" "}
          の正規表現ルールが自動適用されます。下記は代表的な置換例です。
        </p>
        <div className="space-y-3">
          {previews.map((p) => {
            const totalHits = Object.values(p.hits).reduce((a, b) => a + b, 0);
            return (
              <Card key={p.id}>
                <CardContent className="grid gap-3 pt-4 sm:grid-cols-2">
                  <div>
                    <div className="mb-1 text-[11px] font-semibold uppercase tracking-wide text-zinc-500">
                      原文
                    </div>
                    <p className="rounded-lg border border-zinc-200 bg-zinc-50 p-2 text-xs text-zinc-700 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-200">
                      {p.original}
                    </p>
                  </div>
                  <div>
                    <div className="mb-1 flex items-center gap-2 text-[11px] font-semibold uppercase tracking-wide text-emerald-700 dark:text-emerald-400">
                      置換後
                      {totalHits > 0 && (
                        <span className="rounded bg-emerald-100 px-1.5 py-0.5 text-[10px] font-normal text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300">
                          {Object.entries(p.hits)
                            .map(([k, v]) => `${k}×${v}`)
                            .join(" / ")}
                        </span>
                      )}
                    </div>
                    <p className="rounded-lg border border-emerald-200 bg-emerald-50 p-2 text-xs text-emerald-900 dark:border-emerald-900/60 dark:bg-emerald-950/30 dark:text-emerald-100">
                      {p.masked}
                    </p>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </section>

      <p className="mt-6 text-xs text-zinc-500 dark:text-zinc-400">
        ※ 実データへのアクセスは、API ログ・将来導入予定の DB テーブルを参照します。
        本ページは UI スケッチとして配置しており、実装はフェーズ 8 以降で順次拡張します。
      </p>
    </main>
  );
}
