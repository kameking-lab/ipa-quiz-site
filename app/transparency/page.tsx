import type { Metadata } from "next";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export const metadata: Metadata = {
  title: "運営の透明性レポート",
  description:
    "過去問 AI の運営方針・コスト・意思決定を月次で公開しています。教育貢献プロジェクトとしての透明性レポート。",
  alternates: { canonical: "/transparency" },
};

const REPORTS = [
  {
    month: "2026-04",
    highlights: [
      "全機能無料化を完了し、課金システムを完全非表示化",
      "フィードバック駆動型のレート制限に切り替え（初回 10 回 + フィードバック投稿後ほぼ無制限）",
      "公開フィードバック・応援・透明性ページを公開",
    ],
    cost: "AI 利用費 約 ¥3,800（Gemini Flash-Lite）",
    next: [
      "API メトリクス連携で /stats を実データ化",
      "@vercel/og を導入して問題別 OGP 自動生成",
      "AI モデレーション（スパム/個人情報チェック）の強化",
    ],
  },
  {
    month: "2026-03",
    highlights: [
      "全 13 試験区分の問題データ統合",
      "午後 AI 採点機能を全試験区分で公開",
      "解説リファクタ（3 層構造）を AP 2024 秋分まで完了",
    ],
    cost: "AI 利用費 約 ¥2,400",
    next: [
      "解説リファクタを残り 12,094 問に展開",
      "教育貢献プロジェクト体裁への全面ピボット",
    ],
  },
];

export default function TransparencyPage() {
  return (
    <main className="mx-auto w-full max-w-3xl flex-1 px-4 pb-16 pt-8 sm:px-6">
      <header className="mb-6">
        <Badge variant="success">教育貢献プロジェクト</Badge>
        <h1 className="mt-2 text-2xl font-bold sm:text-3xl">運営の透明性レポート</h1>
        <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
          月次で運営方針・コスト・意思決定を公開しています。
          利用者から運営が見える状態を保つことが、教育貢献プロジェクトとしての説明責任だと考えています。
        </p>
      </header>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="text-base">運営方針（不変項目）</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2 text-sm text-zinc-700 dark:text-zinc-300">
            <li>
              <strong>全機能を無料で公開し続ける。</strong>
              受験生の経済状況に関わらず、最善の対策ツールを使えるようにします。
            </li>
            <li>
              <strong>運営コストはシェア・フィードバックで支える。</strong>
              金銭的負担はお願いしません。AI 利用は初回 10 回 + フィードバック投稿後ほぼ無制限です。
            </li>
            <li>
              <strong>意思決定を公開する。</strong>
              問題データの取り扱い・AI モデルの選定・運営費の使い道を本ページで月次公開します。
            </li>
            <li>
              <strong>個人情報は必要最小限に。</strong>
              学習履歴は localStorage、AI 呼び出しは IP の非可逆ハッシュのみ保持します。
            </li>
          </ul>
        </CardContent>
      </Card>

      <h2 className="mb-3 text-lg font-semibold">月次レポート</h2>
      <div className="space-y-4">
        {REPORTS.map((r) => (
          <Card key={r.month}>
            <CardHeader>
              <CardTitle className="text-base">{r.month} 月次レポート</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm">
              <div>
                <p className="font-semibold text-zinc-900 dark:text-zinc-50">主なアップデート</p>
                <ul className="mt-1 list-disc pl-5 text-zinc-700 dark:text-zinc-300">
                  {r.highlights.map((h) => (
                    <li key={h}>{h}</li>
                  ))}
                </ul>
              </div>
              <div>
                <p className="font-semibold text-zinc-900 dark:text-zinc-50">運営費の概算</p>
                <p className="mt-1 text-zinc-700 dark:text-zinc-300">{r.cost}</p>
              </div>
              <div>
                <p className="font-semibold text-zinc-900 dark:text-zinc-50">来月以降の予定</p>
                <ul className="mt-1 list-disc pl-5 text-zinc-700 dark:text-zinc-300">
                  {r.next.map((n) => (
                    <li key={n}>{n}</li>
                  ))}
                </ul>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <p className="mt-8 text-center text-xs text-zinc-500 dark:text-zinc-400">
        運営者情報は <Link href="/operator" className="underline hover:text-zinc-700 dark:hover:text-zinc-300">/operator</Link>{" "}
        / 公開メトリクスは <Link href="/stats" className="underline hover:text-zinc-700 dark:hover:text-zinc-300">/stats</Link>。
      </p>
    </main>
  );
}
