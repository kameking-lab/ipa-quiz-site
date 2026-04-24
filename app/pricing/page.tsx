import type { Metadata } from "next";
import Link from "next/link";
import { Check, Minus, Sparkles } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { PLAN_ORDER, PLANS, formatPlanPrice, formatAnnualPrice, type Plan } from "@/lib/plans";
import { EmailSignupForm } from "./EmailSignupForm";

export const metadata: Metadata = {
  title: "料金プラン",
  description:
    "IPA Quiz の Free / Premium / Team プラン比較。Premium は月額980円で AI コパイロット 1日500回、詳細応答・類題生成・誤答分析が使えます。近日公開予定。",
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
            Premium / Team プランの正式公開時にメールでご連絡します。登録解除は通知メールから可能です。
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
  const isPremium = plan.id === "premium";
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
        <div className="mt-3 space-y-1">
          <div className="flex items-baseline gap-1">
            <span className="text-3xl font-bold tracking-tight">{formatPlanPrice(plan)}</span>
          </div>
          {plan.unlimitedSeats && (
            <div className="text-xs text-zinc-500 dark:text-zinc-400">席数無制限</div>
          )}
          {formatAnnualPrice(plan) && (
            <div className="text-xs text-zinc-500 dark:text-zinc-400">
              年払: {formatAnnualPrice(plan)}
            </div>
          )}
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
          <Button asChild variant="outline" className="w-full">
            <Link href="/">ホームに戻る</Link>
          </Button>
        ) : plan.ctaHref ? (
          <Button asChild variant={isPremium ? "primary" : "outline"} className="w-full">
            <Link href={plan.ctaHref}>{plan.cta}</Link>
          </Button>
        ) : (
          <Button disabled variant={isPremium ? "primary" : "outline"} className="w-full">
            近日公開
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
      values: ["50 回", "500 回", "500 回"],
    },
    {
      label: "利用 AI モデル",
      values: ["Flash-Lite", "Flash", "Flash"],
    },
    {
      label: "応答モード",
      values: ["基本", "詳細", "詳細"],
    },
    {
      label: "マルチターン会話",
      values: ["—", "◎", "◎"],
    },
    {
      label: "類題自動生成",
      values: ["—", "◎", "◎"],
    },
    {
      label: "誤答パターン分析",
      values: ["—", "◎", "◎"],
    },
    {
      label: "AI 学習プラン",
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
      label: "メンバー・部署管理",
      values: ["—", "—", "◎"],
    },
    {
      label: "請求書払い",
      values: ["—", "—", "◎"],
    },
    {
      label: "席数",
      values: ["—", "1名", "無制限"],
    },
  ];

  return (
    <table className="w-full min-w-[560px] text-sm">
      <thead>
        <tr className="border-b border-zinc-200 text-left text-xs font-semibold dark:border-zinc-800">
          <th className="py-2 pr-3 text-zinc-500 dark:text-zinc-400">機能</th>
          <th className="py-2 pr-3">Free</th>
          <th className="py-2 pr-3 text-sky-700 dark:text-sky-400">Premium</th>
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
