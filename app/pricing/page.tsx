import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import {
  Check,
  Minus,
  Sparkles,
  ArrowRight,
  ChevronDown,
  Crown,
  Users,
  Zap,
  ShieldCheck,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  PLAN_ORDER,
  PLANS,
  formatPlanPrice,
  formatAnnualPrice,
  type Plan,
} from "@/lib/plans";
import { EmailSignupForm } from "./EmailSignupForm";
import { PremiumCheckoutButton } from "./PremiumCheckoutButton";
import { PricingViewTracker } from "./PricingViewTracker";

export const metadata: Metadata = {
  title: "料金プラン",
  description:
    "IPA Quiz の Free / Premium / Team プラン比較。Premium は月額980円で AI コパイロット 1日500回、AI 論述添削 無制限、詳細応答・類題生成・誤答分析が使えます。β公開中・全機能無料。",
  alternates: { canonical: "/pricing" },
};

export default function PricingPage() {
  const plans = PLAN_ORDER.map((id) => PLANS[id]);

  return (
    <main className="flex-1">
      <Suspense fallback={null}>
        <PricingViewTracker />
      </Suspense>
      {/* ============== HERO ============== */}
      <section className="relative overflow-hidden">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-radial-spotlight"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-0 h-[360px] bg-grid opacity-30 [mask-image:radial-gradient(60%_50%_at_50%_0%,#000_30%,transparent_70%)]"
        />
        <div className="relative mx-auto w-full max-w-6xl px-4 pb-8 pt-10 sm:px-6 sm:pt-16">
          <div className="mx-auto flex max-w-2xl flex-col items-center text-center">
            <Badge variant="success" className="mb-4">
              β 公開中・全機能無料
            </Badge>
            <h1 className="text-balance text-4xl font-bold leading-[1.1] tracking-tight text-foreground sm:text-5xl">
              シンプルな
              <span className="bg-gradient-to-r from-primary via-violet-500 to-fuchsia-500 bg-clip-text text-transparent">
                料金プラン
              </span>
            </h1>
            <p className="mt-5 max-w-xl text-pretty text-base leading-relaxed text-muted-foreground sm:text-lg">
              β 公開中は全機能無料。本気で合格を狙うなら Premium、チーム研修なら Team。
              いつでも解約できます。
            </p>
            <div className="mt-5 flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-xs text-muted-foreground">
              <span className="inline-flex items-center gap-1.5">
                <ShieldCheck className="h-3.5 w-3.5 text-emerald-500" />
                登録不要で開始
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Sparkles className="h-3.5 w-3.5 text-primary" />
                Gemini 搭載
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Zap className="h-3.5 w-3.5 text-amber-500" />
                ゼロ遷移 UI
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ============== PRICING CARDS ============== */}
      <section className="mx-auto w-full max-w-6xl px-4 pb-12 sm:px-6">
        <div className="grid gap-5 lg:grid-cols-3">
          {plans.map((plan) => (
            <PlanCard key={plan.id} plan={plan} />
          ))}
        </div>
      </section>

      {/* ============== COMPARISON TABLE ============== */}
      <section className="mx-auto w-full max-w-6xl px-4 pb-12 sm:px-6">
        <div className="mx-auto mb-6 max-w-2xl text-center">
          <Badge variant="soft" className="mb-3">
            機能比較
          </Badge>
          <h2 className="text-balance text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
            プランごとの違いを一覧で
          </h2>
        </div>
        <Card className="overflow-hidden">
          <div className="overflow-x-auto">
            <FeatureComparisonTable />
          </div>
        </Card>
      </section>

      {/* ============== FAQ ============== */}
      <section className="border-t border-border bg-muted/20">
        <div className="mx-auto w-full max-w-3xl px-4 py-14 sm:px-6 sm:py-20">
          <div className="mb-8 text-center">
            <Badge variant="outline" className="mb-3">
              FAQ
            </Badge>
            <h2 className="text-balance text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              料金についてよくある質問
            </h2>
          </div>
          <div className="flex flex-col gap-2">
            <FaqItem
              q="本当に無料で使えますか？"
              a="はい。β 公開期間中は全機能を完全無料で開放しています。AI コパイロットも 1 日 50 回まで無料です。クレジットカード登録も不要です。"
            />
            <FaqItem
              q="Premium はいつから有料になりますか？"
              a="2026年5月の正式公開時に有料化を予定しています。それまでは β 版として無料でお使いいただけます。公開時期はメール通知でお知らせします。"
            />
            <FaqItem
              q="支払い方法は？"
              a="Premium はクレジットカード（Stripe 決済）に対応予定です。Team プランはクレジットカードに加えて請求書払い・銀行振込にも対応します。"
            />
            <FaqItem
              q="いつでも解約できますか？"
              a="はい、いつでも解約可能です。解約しても次回更新日まで Premium 機能を継続してお使いいただけます。日割り返金はありません。"
            />
            <FaqItem
              q="無料プランにも広告は表示されますか？"
              a="無料プランでは控えめな参考書アフィリエイト枠を本文と分離して表示します。Premium / Team では広告が完全に非表示になります。"
            />
            <FaqItem
              q="Team プランの請求書払いに対応していますか？"
              a="はい、Team プランは請求書払い・銀行振込・優先サポートに対応します。詳細はお問い合わせください。"
            />
          </div>
        </div>
      </section>

      {/* ============== EMAIL SIGNUP ============== */}
      <section className="mx-auto w-full max-w-3xl px-4 py-14 sm:px-6">
        <Card id="notify" className="overflow-hidden">
          <CardHeader>
            <div className="flex items-center gap-2">
              <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-primary-soft text-primary-soft-foreground">
                <Sparkles className="h-4 w-4" />
              </span>
              <CardTitle className="text-base">公開通知を受け取る</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <p className="mb-4 text-sm leading-relaxed text-muted-foreground">
              Premium / Team プランの正式公開時にメールでご連絡します。
              登録解除は通知メールから可能です。
            </p>
            <EmailSignupForm source="pricing" />
            <p className="mt-3 text-xs text-muted-foreground">
              メールアドレスは公開通知以外の用途には使用しません。詳細は{" "}
              <Link
                href="/privacy"
                className="underline decoration-border underline-offset-2 hover:text-foreground"
              >
                プライバシーポリシー
              </Link>
              {" "}をご覧ください。
            </p>
          </CardContent>
        </Card>
        <p className="mt-6 text-center text-xs text-muted-foreground">
          β 公開中は全機能無料です。料金は予告なく変更される場合があります。
        </p>
      </section>
    </main>
  );
}

function PlanCard({ plan }: { plan: Plan }) {
  const isFree = plan.id === "free";
  const isPremium = plan.id === "premium";
  const isTeam = plan.id === "team";

  const icon = isFree ? (
    <Zap className="h-5 w-5" />
  ) : isPremium ? (
    <Crown className="h-5 w-5" />
  ) : (
    <Users className="h-5 w-5" />
  );

  return (
    <div
      className={
        plan.highlight
          ? "relative flex flex-col overflow-hidden rounded-2xl border border-primary/40 bg-gradient-to-b from-primary-soft to-card p-6 shadow-lg ring-1 ring-primary/20 lg:-mt-3 lg:mb-3"
          : "relative flex flex-col overflow-hidden rounded-2xl border border-border bg-card p-6 shadow-sm transition hover:shadow-md"
      }
    >
      {plan.highlight && (
        <div className="absolute -top-px left-0 right-0 h-1 bg-gradient-to-r from-primary via-violet-500 to-fuchsia-500" />
      )}

      <div className="mb-5 flex items-start justify-between gap-3">
        <div
          className={
            plan.highlight
              ? "inline-flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-violet-500 text-primary-foreground shadow-sm"
              : "inline-flex h-10 w-10 items-center justify-center rounded-xl bg-primary-soft text-primary-soft-foreground"
          }
        >
          {icon}
        </div>
        {plan.highlight && (
          <Badge variant="primary" className="shadow-sm">
            <Sparkles className="h-3 w-3" />
            人気
          </Badge>
        )}
        {isTeam && (
          <Badge variant="warn" className="shadow-sm">
            近日公開
          </Badge>
        )}
      </div>

      <div className="mb-1 flex items-baseline gap-2">
        <h3 className="text-xl font-bold tracking-tight text-foreground">{plan.name}</h3>
      </div>
      <p className="mb-5 text-xs text-muted-foreground">{plan.tagline}</p>

      <div className="mb-5">
        <div className="flex items-baseline gap-1">
          <span className="text-4xl font-bold tracking-tight text-foreground">
            {formatPlanPrice(plan)}
          </span>
        </div>
        {plan.unlimitedSeats && (
          <p className="mt-1 text-xs text-muted-foreground">席数無制限</p>
        )}
        {formatAnnualPrice(plan) && (
          <p className="mt-1 text-xs text-muted-foreground">
            年払: {formatAnnualPrice(plan)}
          </p>
        )}
        {isPremium && (
          <p className="mt-1 text-xs font-medium text-primary">
            β 期間中は無料でお試し可能
          </p>
        )}
        {isTeam && (
          <p className="mt-1 text-xs font-medium text-amber-600 dark:text-amber-400">
            2026年6月公開予定
          </p>
        )}
      </div>

      <p className="mb-5 text-sm leading-relaxed text-muted-foreground">
        {plan.description}
      </p>

      <ul className="mb-6 flex-1 space-y-2.5 text-sm">
        {plan.features.map((f) => (
          <li key={f.label} className="flex items-start gap-2.5">
            {f.included ? (
              <span className="mt-0.5 inline-flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300">
                <Check className="h-3 w-3" strokeWidth={3} />
              </span>
            ) : (
              <span className="mt-0.5 inline-flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-muted text-muted-foreground">
                <Minus className="h-3 w-3" />
              </span>
            )}
            <span
              className={
                f.included
                  ? "text-foreground"
                  : "text-muted-foreground line-through"
              }
            >
              {f.label}
              {f.detail && (
                <span className="ml-1 text-xs text-muted-foreground">
                  ({f.detail})
                </span>
              )}
            </span>
          </li>
        ))}
      </ul>

      {isFree ? (
        <Button asChild variant="outline" size="lg" className="w-full">
          <Link href="/auth/signin">
            ログインして始める
            <ArrowRight className="h-4 w-4" />
          </Link>
        </Button>
      ) : isPremium ? (
        <PremiumCheckoutButton label={plan.cta} />
      ) : plan.ctaHref ? (
        <Button asChild variant="outline" size="lg" className="w-full">
          <Link href={plan.ctaHref}>
            {plan.cta}
            <ArrowRight className="h-4 w-4" />
          </Link>
        </Button>
      ) : (
        <>
          <Button disabled variant="outline" size="lg" className="w-full">
            近日公開
          </Button>
          <p className="mt-2 text-center text-xs text-muted-foreground">
            {isTeam ? "2026年6月公開予定" : "近日公開予定"}
          </p>
        </>
      )}
    </div>
  );
}

function FeatureComparisonTable() {
  const rows: Array<{ label: string; values: [string, string, string] }> = [
    {
      label: "弱点ヒートマップ",
      values: ["—", "◎", "◎"],
    },
    {
      label: "合格判定シミュレータ",
      values: ["—", "◎", "◎"],
    },
    {
      label: "AI チューター月次レポート",
      values: ["—", "◎", "◎"],
    },
    {
      label: "間隔反復学習 (SM-2)",
      values: ["基本のみ", "最適化", "最適化"],
    },
    {
      label: "全国模試ランキング",
      values: ["閲覧のみ", "全機能", "全機能"],
    },
    {
      label: "AI コパイロット / 日",
      values: ["50 回", "500 回", "500 回"],
    },
    {
      label: "AI 論述添削（午後II）",
      values: ["月3回", "無制限", "無制限"],
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
      values: ["—", "1 名", "無制限"],
    },
  ];

  return (
    <table className="w-full min-w-[480px] text-xs sm:text-sm">
      <thead>
        <tr className="border-b border-border bg-muted/30 text-left text-xs font-semibold">
          <th className="px-3 py-3 text-muted-foreground sm:px-5">機能</th>
          <th className="px-3 py-3 text-foreground sm:px-5">Free</th>
          <th className="px-3 py-3 text-primary sm:px-5">
            <span className="inline-flex items-center gap-1.5">
              Premium
              <Sparkles className="h-3 w-3" />
            </span>
          </th>
          <th className="px-3 py-3 text-foreground sm:px-5">Team</th>
        </tr>
      </thead>
      <tbody>
        {rows.map((row, i) => (
          <tr
            key={row.label}
            className={
              i % 2 === 0
                ? "border-b border-border/60"
                : "border-b border-border/60 bg-muted/20"
            }
          >
            <td className="px-3 py-3 text-muted-foreground sm:px-5">{row.label}</td>
            <td className="px-3 py-3 text-foreground sm:px-5">{row.values[0]}</td>
            <td className="px-3 py-3 font-semibold text-primary sm:px-5">{row.values[1]}</td>
            <td className="px-3 py-3 text-foreground sm:px-5">{row.values[2]}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

function FaqItem({ q, a }: { q: string; a: string }) {
  return (
    <details className="group rounded-xl border border-border bg-card transition hover:border-primary/30">
      <summary className="flex cursor-pointer items-center justify-between gap-4 px-4 py-3 text-sm font-medium text-foreground [&::-webkit-details-marker]:hidden">
        {q}
        <ChevronDown className="h-4 w-4 shrink-0 text-muted-foreground transition group-open:rotate-180" />
      </summary>
      <div className="px-4 pb-4 text-sm leading-relaxed text-muted-foreground">
        {a}
      </div>
    </details>
  );
}
