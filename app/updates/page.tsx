import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export const metadata: Metadata = {
  title: "更新履歴",
  description:
    "過去問 AI の更新履歴。新機能・改善・不具合修正などのリリースノートを公開しています。",
  alternates: { canonical: "/updates" },
};

const UPDATES: { date: string; label: string; items: string[] }[] = [
  {
    date: "2026年5月",
    label: "E-E-A-T 強化・信頼性向上",
    items: [
      "フッターに試験区分ショートカット・コミュニティ・法的情報列を追加",
      "コミュニティガイドライン・コンテンツ利用方針ページを新設",
      "運営者情報ページ（JSON-LD 対応）を追加",
      "透明性レポートページを公開",
      "a11y 強化: スクリーンリーダー・キーボードナビ全面対応",
      "モバイル UX 改善: タップターゲット 48px 統一、片手操作最適化",
    ],
  },
  {
    date: "2026年4月",
    label: "MVP リリース・コア機能整備",
    items: [
      "AP 応用情報技術者 午前問題でサービス開始",
      "AI コパイロット（Gemini ベース）初期リリース",
      "クイズプレイヤー: ゼロ遷移・インライン解説表示",
      "ダークモード・PWA 対応",
      "公開ダッシュボード（/stats）でアクセス・問題数を公開",
      "IPA 著作権・利用条件ページ公開",
      "プライバシーポリシー・利用規約整備",
    ],
  },
];

export default function UpdatesPage() {
  return (
    <main className="mx-auto w-full max-w-2xl flex-1 px-4 pb-12 pt-6 sm:px-6">
      <Button asChild variant="ghost" size="sm" className="mb-3">
        <Link href="/">
          <ArrowLeft className="h-4 w-4" />
          戻る
        </Link>
      </Button>

      <Badge variant="success" className="mb-3">教育貢献プロジェクト</Badge>
      <h1 className="mb-2 text-2xl font-bold">更新履歴</h1>
      <p className="mb-8 text-sm text-zinc-600 dark:text-zinc-400">
        過去問 AI の主な更新・改善履歴です。詳細な活動状況は{" "}
        <Link href="/transparency" className="underline hover:text-zinc-900 dark:hover:text-zinc-50">
          透明性レポート
        </Link>{" "}
        をご覧ください。
      </p>

      <div className="space-y-8">
        {UPDATES.map((update) => (
          <section key={update.date}>
            <div className="mb-3 flex items-baseline gap-3">
              <span className="text-xs font-medium text-zinc-500 dark:text-zinc-400">{update.date}</span>
              <h2 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">{update.label}</h2>
            </div>
            <ul className="space-y-1 text-sm text-zinc-700 dark:text-zinc-300">
              {update.items.map((item) => (
                <li key={item} className="flex gap-2">
                  <span className="mt-0.5 shrink-0 text-zinc-400">·</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>

      <div className="mt-10 rounded-lg border border-border bg-muted/40 px-4 py-3 text-sm text-zinc-600 dark:text-zinc-400">
        改善要望・不具合報告は{" "}
        <Link href="/contact" className="underline hover:text-zinc-900 dark:hover:text-zinc-50">
          お問い合わせ
        </Link>{" "}
        または{" "}
        <a
          href="https://x.com/kakomon_ai_jp"
          target="_blank"
          rel="noopener noreferrer"
          className="underline hover:text-zinc-900 dark:hover:text-zinc-50"
        >
          X @kakomon_ai_jp
        </a>{" "}
        までどうぞ。
      </div>
    </main>
  );
}
