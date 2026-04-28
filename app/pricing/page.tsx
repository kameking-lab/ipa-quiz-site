import type { Metadata } from "next";
import Link from "next/link";
import { Check, Minus, Sparkles } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { PLAN_ORDER, PLANS, formatPlanPrice, type Plan } from "@/lib/plans";
import { EmailSignupForm } from "./EmailSignupForm";

export const metadata: Metadata = {
  title: "料金プラン",
  description:
    "IPA Quiz の Free / Pro / Team プラン比較。Pro は月額1,480円で AI コパイロット 1日200回、弱点克服モード・類題生成・AI論述添削が無制限で使えます。Team は月額2,980円/席（最低5席）。",
  alternates: { canonical: "/pricing" },
};

export default function PricingPage() {
  const plans = PLAN_ORDER.map((id) => PLANS[id]);

  return (
    <main className="mx-auto w-full max-w-6xl flex-1 px-4 pb-16 pt-8 sm:px-6">
      <section className="mb-8 text-center">
        <div className="mb-3 flex justify-center">
          <Badge variant="success">近日公開</Badge>
        </div>
        <h1 className="mb-3 text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-4xl">
          料金プラン
        </h1>
        <p className="mx-auto max-w-2xl text-sm leading-relaxed text-zinc-600 dark:text-zinc-400 sm:text-base">
          β 公開中は全機能無料でお使いいただけます。正式公開時に以下のプランで提供予定です。
          <br />
          公開の際にお知らせを希望される方は、メールアドレスをご登録ください。
        </p>
      </section>

      <section className="mb-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {plans.map((plan) => (
          <PlanCard key={plan.id} plan={plan} />
        ))}
      </section>

      <Card className="mb-10">
        <CardHeader>
          <CardTitle className="text-base">機能比較</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <FeatureComparisonTable />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base">
            <Sparkles className="h-4 w-4 text-sky-600 dark:text-sky-400" />
            公開通知を受け取る
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="mb-3 text-sm text-zinc-600 dark:text-zinc-400">
            Pro / Team プランの正式公開時にメールでご連絡します。登録解除は通知メールから可能です。
          </p>
          <EmailSignupForm source="pricing" />
          <p className="mt-3 text-xs text-zinc-500 dark:text-zinc-400">
            メールアドレスは公開通知以外の用途には使用しません。詳細は{" "}
            <Link href="/privacy" className="underline hover:text-zinc-900 dark:hover:text-zinc-100">
              プライバシーポリシー
            </Link>
            {" "}をご覧ください。
          </p>
        </CardContent>
      </Card>

      <p className="mt-6 text-center text-xs text-zinc-500 dark:text-zinc-400">
        β 公開中は全機能無料です。料金は予告なく変更される場合があります。
      </p>
    </main>
  );
}

function PlanCard({ plan }: { plan: Plan }) {
  const isPro = plan.id === "premium";
  return (
    <Card
      className={
        plan.highlight
          ? "relative border-sky-400 ring-2 ring-sky-400/40 dark:border-sky-500 dark:ring-sky-500/30"
          : undefined
      }
    >
      {plan.highlight && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2">
          <Badge variant="success" className="shadow-sm">
            おすすめ
          </Badge>
        </div>
      )}
      <CardHeader>
        <div className="flex items-baseline gap-2">
          <CardTitle>{plan.name}</CardTitle>
          <span className="text-xs text-zinc-500 dark:text-zinc-400">{plan.tagline}</span>
        </div>
        <div className="mt-3 flex items-baseline gap-1">
          <span className="text-3xl font-bold tracking-tight">{formatPlanPrice(plan)}</span>
        </div>
      </CardHeader>
      <CardContent>
        <p className="mb-4 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
          {plan.description}
        </p>
        <ul className="mb-5 space-y-2 text-sm">
          {plan.features.map((f) => (
            <li key={f.label} className="flex items-start gap-2">
              {f.included ? (
                <Check className="mt-0.5 h-4 w-4 flex-shrink-0 text-emerald-600 dark:text-emerald-400" />
              ) : (
                <Minus className="mt-0.5 h-4 w-4 flex-shrink-0 text-zinc-300 dark:text-zinc-600" />
              )}
              <span
                className={
                  f.included
                    ? "text-zinc-800 dark:text-zinc-200"
                    : "text-zinc-400 line-through dark:text-zinc-600"
                }
              >
                {f.label}
                {f.detail && (
                  <span className="ml-1 text-xs text-zinc-500 dark:text-zinc-400">
                    ({f.detail})
                  </span>
                )}
              </span>
            </li>
          ))}
        </ul>
        {plan.id === "free" ? (
          <Button
            asChild
            variant="primary"
            className="w-full transition-transform active:scale-95"
            data-track="pricing-cta-free"
          >
            <Link href="/quiz?mode=random&exam=ap">今すぐ無料で始める</Link>
          </Button>
        ) : isPro ? (
          <Button disabled variant="primary" className="w-full" data-track="pricing-cta-pro">
            月1,480円で本気合格（近日公開）
          </Button>
        ) : (
          <Button disabled variant="outline" className="w-full" data-track="pricing-cta-team">
            お問い合わせ（近日公開）
          </Button>
        )}
      </CardContent>
    </Card>
  );
}

function FeatureComparisonTable() {
  const rows: Array<{ label: string; values: [string, string, string] }> = [
    {
      label: "AI コパイロット / 日",
      values: ["15 回", "200 回", "200 回"],
    },
    {
      label: "利用 AI モデル",
      values: ["Flash-Lite", "Flash-Lite + Flash boost", "Flash-Lite + Flash boost"],
    },
    {
      label: "応答モード",
      values: ["基本", "詳細", "詳細"],
    },
    {
      label: "AI キャラクター",
      values: ["ハル のみ", "モモ／ハル／ザン", "モモ／ハル／ザン"],
    },
    {
      label: "弱点克服・成長加速モード",
      values: ["—", "◎", "◎"],
    },
    {
      label: "類題自動生成・誤答分析",
      values: ["—", "◎", "◎"],
    },
    {
      label: "AI 学習プラン",
      values: ["—", "◎", "◎"],
    },
    {
      label: "AI 論述添削",
      values: ["—", "無制限", "無制限"],
    },
    {
      label: "学習ヒートマップ",
      values: ["直近7日", "365日", "365日"],
    },
    {
      label: "ダッシュボード＋レーダー",
      values: ["—", "◎", "◎"],
    },
    {
      label: "学習履歴同期",
      values: ["ブラウザのみ", "クラウド", "クラウド"],
    },
    {
      label: "広告表示",
      values: ["控えめに表示", "非表示", "非表示"],
    },
    {
      label: "法人ダッシュボード",
      values: ["—", "—", "◎"],
    },
    {
      label: "席数管理・進捗レポート",
      values: ["—", "—", "◎"],
    },
    {
      label: "請求書払い",
      values: ["—", "—", "◎"],
    },
  ];

  return (
    <table className="w-full min-w-[560px] text-sm">
      <thead>
        <tr className="border-b border-zinc-200 text-left text-xs font-semibold dark:border-zinc-800">
          <th className="py-2 pr-3 text-zinc-500 dark:text-zinc-400">機能</th>
          <th className="py-2 pr-3">Free</th>
          <th className="py-2 pr-3 text-sky-700 dark:text-sky-400">Pro</th>
          <th className="py-2 pr-3">Team</th>
        </tr>
      </thead>
      <tbody>
        {rows.map((row) => (
          <tr key={row.label} className="border-b border-zinc-100 dark:border-zinc-900">
            <td className="py-2 pr-3 text-zinc-600 dark:text-zinc-400">{row.label}</td>
            <td className="py-2 pr-3">{row.values[0]}</td>
            <td className="py-2 pr-3 font-medium text-sky-700 dark:text-sky-400">
              {row.values[1]}
            </td>
            <td className="py-2 pr-3">{row.values[2]}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
