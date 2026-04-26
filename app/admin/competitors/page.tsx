import type { Metadata } from "next";
import { Activity, BookOpen, Calendar, Check, Eye, Lock, Minus, Sparkles, Target } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import competitorsRaw from "@/data/competitors.json";

export const metadata: Metadata = {
  title: "競合監視（管理画面）",
  description: "競合プレイヤーの機能比較マトリクスと差別化ポジション。",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

interface Competitor {
  id: string;
  name: string;
  url: string;
  operatedBy: string;
  businessModel: string;
  monthlyPrice: number;
  knownStrengths: string[];
  knownWeaknesses: string[];
  primaryTraffic: string;
  exams: string[];
  features: Record<string, boolean>;
  differentiationVsUs: string;
}

interface CompetitorsData {
  lastReviewedAt: string;
  reviewer: string;
  competitors: Competitor[];
}

const FEATURE_ROWS: Array<{ key: string; label: string; positive: "ours" | "theirs" }> = [
  { key: "morningQuiz", label: "午前クイズ", positive: "theirs" },
  { key: "afternoonGrading", label: "午後 AI 採点", positive: "ours" },
  { key: "essayGrading", label: "論文添削", positive: "ours" },
  { key: "aiCopilot", label: "AI コパイロット", positive: "ours" },
  { key: "darkMode", label: "ダークモード", positive: "ours" },
  { key: "pwa", label: "PWA / モバイル最適化", positive: "ours" },
  { key: "ranking", label: "段級ランキング", positive: "theirs" },
  { key: "communityForum", label: "コミュニティ", positive: "ours" },
  { key: "publicApi", label: "Public API", positive: "ours" },
  { key: "freeTier", label: "無料プラン", positive: "theirs" },
  { key: "premiumTier", label: "有料プラン", positive: "theirs" },
  { key: "mobileFirst", label: "モバイル片手操作", positive: "ours" },
];

const OUR_FEATURES: Record<string, boolean> = {
  morningQuiz: true,
  afternoonGrading: true,
  essayGrading: true,
  aiCopilot: true,
  darkMode: true,
  pwa: true,
  ranking: true,
  communityForum: true,
  publicApi: true,
  freeTier: true,
  premiumTier: true,
  mobileFirst: true,
};

export default function AdminCompetitorsPage() {
  const data = competitorsRaw as CompetitorsData;
  const competitors = data.competitors;

  return (
    <main className="relative mx-auto w-full max-w-6xl flex-1 px-4 pb-12 pt-8 sm:px-6 sm:pt-10">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-72 bg-radial-spotlight opacity-50"
      />

      <header className="mb-8 flex flex-wrap items-start justify-between gap-3">
        <div className="min-w-0">
          <div className="mb-3 flex flex-wrap items-center gap-1.5">
            <Badge variant="primary">
              <Sparkles className="mr-1 h-3 w-3" />
              管理画面
            </Badge>
            <Badge variant="success">
              <Lock className="mr-1 h-3 w-3" />
              Basic Auth
            </Badge>
          </div>
          <h1 className="text-balance text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            競合監視
          </h1>
          <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted-foreground">
            主要 {competitors.length} 社の機能・プライシング・流入経路をまとめ、過去問AI のポジショニングを定期点検します。
          </p>
        </div>
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <Calendar className="h-3.5 w-3.5" />
          最終更新 {data.lastReviewedAt}（{data.reviewer}）
        </div>
      </header>

      <section className="mb-8 grid grid-cols-2 gap-3 sm:grid-cols-4">
        <KpiCard icon={<Target className="h-4 w-4" />} label="監視対象" value={`${competitors.length}社`} sub="主要プレイヤー" />
        <KpiCard
          icon={<BookOpen className="h-4 w-4" />}
          label="13 区分対応"
          value={`${competitors.filter((c) => c.exams.length >= 13).length}/${competitors.length}社`}
          sub="高度含む全区分"
        />
        <KpiCard
          icon={<Sparkles className="h-4 w-4" />}
          label="AI コパイロット"
          value={`${competitors.filter((c) => c.features.aiCopilot).length}/${competitors.length}社`}
          sub="競合実装率"
        />
        <KpiCard
          icon={<Activity className="h-4 w-4" />}
          label="Public API"
          value={`${competitors.filter((c) => c.features.publicApi).length}/${competitors.length}社`}
          sub="競合実装率"
        />
      </section>

      <Card className="mb-6 overflow-hidden">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base">
            <span className="inline-flex h-7 w-7 items-center justify-center rounded-lg bg-primary-soft text-primary-soft-foreground">
              <Eye className="h-3.5 w-3.5" />
            </span>
            機能比較マトリクス
          </CardTitle>
          <CardDescription>
            ◎ = 提供あり、− = なし。最右列が過去問AI（ours）。背景色付き行は当社の差別化ポイントです。
          </CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[720px] text-sm">
              <thead>
                <tr className="border-b border-border bg-muted/30 text-left text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                  <th className="px-5 py-3">機能</th>
                  {competitors.map((c) => (
                    <th key={c.id} className="px-3 py-3 text-center">
                      {c.name}
                    </th>
                  ))}
                  <th className="px-3 py-3 text-center text-primary">過去問AI</th>
                </tr>
              </thead>
              <tbody>
                {FEATURE_ROWS.map((row, i) => {
                  const ourBetter =
                    row.positive === "ours" &&
                    OUR_FEATURES[row.key] === true &&
                    competitors.every((c) => c.features[row.key] !== true);
                  return (
                    <tr
                      key={row.key}
                      className={`border-b border-border ${
                        ourBetter ? "bg-primary-soft/40" : i % 2 === 0 ? "bg-card" : "bg-muted/10"
                      }`}
                    >
                      <td className="px-5 py-3 font-medium">{row.label}</td>
                      {competitors.map((c) => (
                        <td key={c.id} className="px-3 py-3 text-center">
                          {c.features[row.key] ? (
                            <Check className="mx-auto h-4 w-4 text-emerald-600 dark:text-emerald-400" />
                          ) : (
                            <Minus className="mx-auto h-4 w-4 text-muted-foreground/40" />
                          )}
                        </td>
                      ))}
                      <td className="px-3 py-3 text-center">
                        {OUR_FEATURES[row.key] ? (
                          <Check className="mx-auto h-4 w-4 text-primary" />
                        ) : (
                          <Minus className="mx-auto h-4 w-4 text-muted-foreground/40" />
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      <section className="grid gap-3">
        {competitors.map((c) => (
          <Card key={c.id} className="overflow-hidden">
            <CardHeader className="flex flex-row flex-wrap items-start justify-between gap-3">
              <div className="min-w-0">
                <CardTitle className="text-base">{c.name}</CardTitle>
                <CardDescription className="text-xs">
                  {c.operatedBy} ／ {c.businessModel}
                  {c.monthlyPrice > 0 && ` ／ 約 ¥${c.monthlyPrice.toLocaleString()}/月相当`}
                </CardDescription>
              </div>
              <a
                href={c.url}
                target="_blank"
                rel="noreferrer"
                className="text-xs text-primary underline-offset-4 hover:underline"
              >
                {new URL(c.url).host}
              </a>
            </CardHeader>
            <CardContent className="grid gap-4 sm:grid-cols-2">
              <div>
                <h3 className="mb-1.5 text-xs font-semibold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
                  強み
                </h3>
                <ul className="space-y-1 text-sm text-foreground">
                  {c.knownStrengths.map((s) => (
                    <li key={s} className="flex gap-2">
                      <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-emerald-600 dark:text-emerald-400" />
                      <span>{s}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="mb-1.5 text-xs font-semibold uppercase tracking-wider text-rose-600 dark:text-rose-400">
                  弱点（差別化余地）
                </h3>
                <ul className="space-y-1 text-sm text-foreground">
                  {c.knownWeaknesses.map((s) => (
                    <li key={s} className="flex gap-2">
                      <Minus className="mt-0.5 h-3.5 w-3.5 shrink-0 text-rose-600 dark:text-rose-400" />
                      <span>{s}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="sm:col-span-2 rounded-xl bg-primary-soft/40 p-3 text-sm">
                <div className="mb-1 inline-flex items-center gap-1 text-[11px] font-semibold uppercase tracking-wider text-primary">
                  <Target className="h-3 w-3" />
                  当社のポジショニング
                </div>
                <p className="text-foreground">{c.differentiationVsUs}</p>
              </div>
              <div className="sm:col-span-2 flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
                <span>主要流入: {c.primaryTraffic}</span>
                <span className="ml-auto">対応試験: {c.exams.join(" / ").toUpperCase()}</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </section>
    </main>
  );
}

function KpiCard({
  icon,
  label,
  value,
  sub,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  sub?: string;
}) {
  return (
    <div className="rounded-2xl border border-border bg-card p-4 shadow-sm">
      <div className="mb-2 inline-flex h-7 w-7 items-center justify-center rounded-lg bg-primary-soft text-primary-soft-foreground">
        {icon}
      </div>
      <div className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
        {label}
      </div>
      <div className="mt-1 text-2xl font-bold tracking-tight text-foreground">{value}</div>
      {sub && <div className="mt-1 text-[11px] text-muted-foreground">{sub}</div>}
    </div>
  );
}
