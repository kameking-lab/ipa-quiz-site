import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TEAM_PLAN, formatPlanPrice, formatAnnualPrice } from "@/lib/plans";
import { PAID_MODE } from "@/lib/paid-mode";
import { EnterpriseContactForm } from "./EnterpriseContactForm";

export const metadata: Metadata = {
  title: "法人お問い合わせ",
  description:
    "過去問AI Team プランの導入相談・資料請求はこちら。席数無制限・月額 ¥50,000 で全社員のIT資格取得を支援します。",
  alternates: { canonical: "/contact/enterprise" },
};

const FEATURES = [
  { icon: "🏢", title: "席数無制限", desc: "社員数を問わず一律料金。大規模展開も追加費用なし。" },
  { icon: "📊", title: "法人ダッシュボード", desc: "部署・試験別の正答率・学習時間を一元管理。" },
  { icon: "🤖", title: "AI コパイロット", desc: "1日500回の AI 解説でどこでも個別指導レベルの学習体験。" },
  { icon: "📄", title: "請求書払い対応", desc: "クレジットカード不要。社内経費精算に対応した請求書を発行します。" },
  { icon: "🔒", title: "優先サポート", desc: "専任担当が導入から運用まで継続サポート。" },
  { icon: "📈", title: "進捗レポート", desc: "CSV エクスポートで人事システムとの連携が可能。" },
];

export default function EnterpriseContactPage() {
  if (!PAID_MODE) {
    notFound();
  }
  const annualPrice = formatAnnualPrice(TEAM_PLAN);

  return (
    <main className="mx-auto w-full max-w-5xl flex-1 px-4 pb-16 pt-8 sm:px-6">
      <section className="mb-10">
        <Badge variant="outline" className="mb-3">法人向け</Badge>
        <h1 className="mb-3 text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-4xl">
          Team プランのお問い合わせ
        </h1>
        <p className="max-w-2xl text-sm leading-relaxed text-zinc-600 dark:text-zinc-400 sm:text-base">
          IPA 情報処理技術者試験の全社一括対策に。席数無制限・請求書払い対応で、
          規模を問わず導入できます。
        </p>
      </section>

      <div className="grid gap-8 lg:grid-cols-[1fr,400px]">
        <div className="space-y-8">
          {/* プラン概要 */}
          <Card className="border-sky-200 dark:border-sky-900">
            <CardHeader>
              <CardTitle className="text-base">Team プラン料金</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-baseline gap-2">
                <span className="text-4xl font-bold tracking-tight text-sky-600 dark:text-sky-400">
                  {formatPlanPrice(TEAM_PLAN)}
                </span>
                <span className="text-sm text-zinc-500 dark:text-zinc-400">税別</span>
              </div>
              {annualPrice && (
                <div className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
                  年払: <span className="font-medium">{annualPrice}</span>
                </div>
              )}
              <p className="mt-2 text-sm text-zinc-500 dark:text-zinc-400">
                席数無制限 — 社員数が増えても追加費用なし
              </p>
            </CardContent>
          </Card>

          {/* 特徴 */}
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
            {FEATURES.map((f) => (
              <div
                key={f.title}
                className="rounded-xl border border-zinc-200 p-4 dark:border-zinc-800"
              >
                <div className="mb-2 text-2xl">{f.icon}</div>
                <div className="mb-1 font-medium text-sm">{f.title}</div>
                <div className="text-xs leading-relaxed text-zinc-500 dark:text-zinc-400">{f.desc}</div>
              </div>
            ))}
          </div>

          {/* 事例リンク */}
          <div className="rounded-xl border border-zinc-200 bg-zinc-50 p-4 text-sm dark:border-zinc-800 dark:bg-zinc-900/50">
            <p className="font-medium">導入事例</p>
            <p className="mt-1 text-zinc-600 dark:text-zinc-400">
              IT企業・金融機関・製造業など 3 業種の活用事例を公開しています。
            </p>
            <Link
              href="/case-studies"
              className="mt-2 inline-block text-sky-600 hover:underline dark:text-sky-400"
            >
              事例を見る →
            </Link>
          </div>
        </div>

        {/* フォーム */}
        <div>
          <Card>
            <CardHeader>
              <CardTitle className="text-base">お問い合わせ・資料請求</CardTitle>
              <p className="text-xs text-zinc-500 dark:text-zinc-400">
                2 営業日以内にご連絡いたします
              </p>
            </CardHeader>
            <CardContent>
              <EnterpriseContactForm />
            </CardContent>
          </Card>
        </div>
      </div>
    </main>
  );
}
