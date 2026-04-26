import type { Metadata } from "next";
import dynamic from "next/dynamic";
import {
  Activity,
  BarChart3,
  Building2,
  Calendar,
  CheckCircle2,
  Clock,
  Sparkles,
  Target,
  TrendingUp,
  Users,
} from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MOCK_TEAM } from "@/lib/team/mock-data";
import { TEAM_PLAN, formatPlanPrice } from "@/lib/plans";
import { TeamCsvExport } from "./TeamCsvExport";

const ExamProgressChart = dynamic(
  () => import("./ExamProgressChart").then((m) => m.ExamProgressChart),
  {
    loading: () => (
      <div className="h-72 w-full animate-pulse rounded-xl bg-zinc-100 dark:bg-zinc-900" />
    ),
  },
);

export const metadata: Metadata = {
  title: "法人ダッシュボード（プロトタイプ）",
  description:
    "法人向け Team プランのダッシュボードプロトタイプ。メンバー進捗・試験別解答数・正答率を一元可視化。",
  robots: { index: false, follow: false },
};

function formatHours(minutes: number): string {
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  if (h === 0) return `${m}分`;
  return `${h}時間${m > 0 ? `${m}分` : ""}`;
}

function lastLoginLabel(iso: string): string {
  const today = new Date("2026-04-19");
  const d = new Date(iso);
  const diff = Math.floor((today.getTime() - d.getTime()) / (1000 * 60 * 60 * 24));
  if (diff === 0) return "今日";
  if (diff === 1) return "昨日";
  return `${diff}日前`;
}

function getInitials(name: string): string {
  return name.slice(0, 2);
}

export default function AdminTeamPage() {
  const team = MOCK_TEAM;
  const seatUtilization = (team.memberCount / team.seatsTotal) * 100;

  return (
    <main className="relative mx-auto w-full max-w-6xl flex-1 px-4 pb-12 pt-8 sm:px-6 sm:pt-10">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-72 bg-radial-spotlight opacity-50"
      />

      {/* Header */}
      <header className="mb-8 flex flex-wrap items-start justify-between gap-3">
        <div className="min-w-0">
          <div className="mb-3 flex flex-wrap items-center gap-1.5">
            <Badge variant="primary">
              <Sparkles className="mr-1 h-3 w-3" />
              プロトタイプ
            </Badge>
            <Badge variant="success">
              <Building2 className="mr-1 h-3 w-3" />
              Team プラン
            </Badge>
          </div>
          <h1 className="text-balance text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            {team.teamName}
          </h1>
          <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted-foreground">
            {TEAM_PLAN.name} プラン / {formatPlanPrice(TEAM_PLAN)}
            <span className="mx-2 text-border">•</span>
            <strong className="text-foreground">
              {team.memberCount} / {team.seatsTotal}
            </strong>{" "}
            席利用中（{seatUtilization.toFixed(0)}%）
          </p>
        </div>
        <div className="flex flex-col items-end gap-2">
          <div className="rounded-full border border-dashed border-border bg-muted/30 px-3 py-1.5 text-[11px] text-muted-foreground">
            ※ 営業デモ用のモックデータ
          </div>
          <TeamCsvExport team={team} />
        </div>
      </header>

      {/* KPI strip */}
      <section className="mb-8 grid grid-cols-2 gap-3 sm:grid-cols-4">
        <StatCard
          icon={<Users className="h-4 w-4" />}
          label="登録メンバー"
          value={`${team.memberCount}名`}
          sub={`今週 ${team.activeThisWeek}名 が学習`}
          accent="primary"
        />
        <StatCard
          icon={<Target className="h-4 w-4" />}
          label="総解答数"
          value={team.totalAnswered.toLocaleString()}
          sub="全メンバー累計"
        />
        <StatCard
          icon={<Clock className="h-4 w-4" />}
          label="総学習時間"
          value={formatHours(team.totalStudyMinutes)}
          sub="今月累計"
        />
        <StatCard
          icon={<TrendingUp className="h-4 w-4" />}
          label="平均正答率"
          value={`${team.avgAccuracy.toFixed(1)}%`}
          sub="全試験平均"
        />
      </section>

      {/* Exam progress chart */}
      <Card className="mb-6 overflow-hidden">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base">
            <span className="inline-flex h-7 w-7 items-center justify-center rounded-lg bg-primary-soft text-primary-soft-foreground">
              <BarChart3 className="h-3.5 w-3.5" />
            </span>
            試験別進捗
          </CardTitle>
          <CardDescription>
            <span className="inline-flex items-center gap-1">
              <span className="inline-block h-2 w-2 rounded-sm bg-primary" />
              解答数
            </span>
            <span className="mx-2 text-border">/</span>
            <span className="inline-flex items-center gap-1">
              <span className="inline-block h-2 w-2 rounded-sm bg-emerald-500" />
              正答率
            </span>
            の 2 軸表示。
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ExamProgressChart data={team.examProgress} />
          <div className="mt-6 overflow-x-auto">
            <table className="w-full min-w-[520px] text-sm">
              <thead>
                <tr className="border-b border-border bg-muted/30 text-left text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                  <th className="px-4 py-3">試験</th>
                  <th className="px-4 py-3 text-right">受験予定</th>
                  <th className="px-4 py-3 text-right">解答数</th>
                  <th className="px-4 py-3 text-right">正答率</th>
                </tr>
              </thead>
              <tbody>
                {team.examProgress.map((p, i) => (
                  <tr
                    key={p.exam}
                    className={`border-b border-border transition hover:bg-muted/30 ${
                      i % 2 === 0 ? "bg-card" : "bg-muted/10"
                    }`}
                  >
                    <td className="px-4 py-3 font-medium">{p.label}</td>
                    <td className="px-4 py-3 text-right tabular-nums">{p.targetUsers}名</td>
                    <td className="px-4 py-3 text-right font-mono tabular-nums">
                      {p.answered.toLocaleString()}
                    </td>
                    <td className="px-4 py-3 text-right">
                      <AccuracyPill accuracy={p.accuracy} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Exam pass status */}
      <Card className="mb-6 overflow-hidden">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base">
            <span className="inline-flex h-7 w-7 items-center justify-center rounded-lg bg-primary-soft text-primary-soft-foreground">
              <CheckCircle2 className="h-3.5 w-3.5" />
            </span>
            試験区分別 合格状況
          </CardTitle>
          <CardDescription>メンバーが自己申告した直近回の合否結果。</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[520px] text-sm">
              <thead>
                <tr className="border-b border-border bg-muted/30 text-left text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                  <th className="px-4 py-3">試験</th>
                  <th className="px-4 py-3 text-right">受験者</th>
                  <th className="px-4 py-3 text-right">合格</th>
                  <th className="px-4 py-3 text-right">合否待ち</th>
                  <th className="px-4 py-3 text-right">合格率</th>
                </tr>
              </thead>
              <tbody>
                {team.examPassStatus.map((p, i) => (
                  <tr
                    key={p.exam}
                    className={`border-b border-border transition hover:bg-muted/30 ${
                      i % 2 === 0 ? "bg-card" : "bg-muted/10"
                    }`}
                  >
                    <td className="px-4 py-3 font-medium">{p.label}</td>
                    <td className="px-4 py-3 text-right tabular-nums">{p.examinees}名</td>
                    <td className="px-4 py-3 text-right tabular-nums text-emerald-700 dark:text-emerald-400">
                      {p.passed}名
                    </td>
                    <td className="px-4 py-3 text-right tabular-nums text-muted-foreground">
                      {p.pending}名
                    </td>
                    <td className="px-4 py-3 text-right">
                      <AccuracyPill accuracy={p.passRate} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Monthly summary */}
      <Card className="mb-6 overflow-hidden">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base">
            <span className="inline-flex h-7 w-7 items-center justify-center rounded-lg bg-primary-soft text-primary-soft-foreground">
              <Calendar className="h-3.5 w-3.5" />
            </span>
            月次サマリ
          </CardTitle>
          <CardDescription>過去 4 ヶ月の利用推移。CSV エクスポートで月次レポートに転用できます。</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[600px] text-sm">
              <thead>
                <tr className="border-b border-border bg-muted/30 text-left text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                  <th className="px-4 py-3">月</th>
                  <th className="px-4 py-3 text-right">新規</th>
                  <th className="px-4 py-3 text-right">解答数</th>
                  <th className="px-4 py-3 text-right">学習時間</th>
                  <th className="px-4 py-3 text-right">平均正答率</th>
                  <th className="px-4 py-3 text-right">合格者</th>
                </tr>
              </thead>
              <tbody>
                {team.monthlySummary.map((m, i) => (
                  <tr
                    key={m.yyyymm}
                    className={`border-b border-border transition hover:bg-muted/30 ${
                      i % 2 === 0 ? "bg-card" : "bg-muted/10"
                    }`}
                  >
                    <td className="px-4 py-3 font-medium font-mono">{m.yyyymm}</td>
                    <td className="px-4 py-3 text-right tabular-nums">+{m.newMembers}名</td>
                    <td className="px-4 py-3 text-right font-mono tabular-nums">
                      {m.totalAnswered.toLocaleString()}
                    </td>
                    <td className="px-4 py-3 text-right tabular-nums text-muted-foreground">
                      {formatHours(m.totalStudyMinutes)}
                    </td>
                    <td className="px-4 py-3 text-right tabular-nums">
                      {m.avgAccuracy.toFixed(1)}%
                    </td>
                    <td className="px-4 py-3 text-right tabular-nums text-emerald-700 dark:text-emerald-400">
                      {m.passedThisMonth}名
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Department summary */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base">
            <span className="inline-flex h-7 w-7 items-center justify-center rounded-lg bg-primary-soft text-primary-soft-foreground">
              <Building2 className="h-3.5 w-3.5" />
            </span>
            部署別サマリー
          </CardTitle>
          <CardDescription>各部署の規模と平均正答率。</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            {team.departments.map((d) => (
              <div
                key={d.name}
                className="rounded-2xl border border-border bg-gradient-to-br from-muted/40 via-card to-card p-4 transition hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-md"
              >
                <div className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
                  {d.name}
                </div>
                <div className="mt-1 text-xl font-bold tracking-tight text-foreground">
                  {d.memberCount}名
                </div>
                <div className="mt-1.5">
                  <AccuracyPill accuracy={d.avgAccuracy} />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Member list */}
      <Card className="overflow-hidden">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base">
            <span className="inline-flex h-7 w-7 items-center justify-center rounded-lg bg-primary-soft text-primary-soft-foreground">
              <Users className="h-3.5 w-3.5" />
            </span>
            メンバー一覧
          </CardTitle>
          <CardDescription>{team.members.length} 名のアクティブメンバー。</CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[820px] text-sm">
              <thead>
                <tr className="border-b border-border bg-muted/30 text-left text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                  <th className="px-4 py-3">氏名</th>
                  <th className="px-4 py-3">部署</th>
                  <th className="px-4 py-3">目標試験</th>
                  <th className="px-4 py-3 text-right">解答数</th>
                  <th className="px-4 py-3 text-right">正答率</th>
                  <th className="px-4 py-3 text-right">学習時間</th>
                  <th className="px-4 py-3">最終ログイン</th>
                </tr>
              </thead>
              <tbody>
                {team.members.map((m, i) => (
                  <tr
                    key={m.id}
                    className={`border-b border-border transition hover:bg-muted/30 ${
                      i % 2 === 0 ? "bg-card" : "bg-muted/10"
                    }`}
                  >
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2.5">
                        <span
                          aria-hidden="true"
                          className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-primary to-violet-500 text-[11px] font-bold text-primary-foreground"
                        >
                          {getInitials(m.name)}
                        </span>
                        <span className="font-medium text-foreground">{m.name}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-muted-foreground">{m.department}</td>
                    <td className="px-4 py-3">
                      <span className="inline-block rounded-md bg-primary-soft px-2 py-0.5 font-mono text-[10px] font-semibold uppercase text-primary-soft-foreground">
                        {m.targetExam}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-right font-mono tabular-nums">
                      {m.totalAnswered.toLocaleString()}
                    </td>
                    <td className="px-4 py-3 text-right">
                      <AccuracyPill accuracy={m.accuracy} />
                    </td>
                    <td className="px-4 py-3 text-right tabular-nums text-muted-foreground">
                      {formatHours(m.studyMinutes)}
                    </td>
                    <td className="px-4 py-3">
                      <span className="inline-flex items-center gap-1.5 text-xs text-muted-foreground">
                        <Activity className="h-3 w-3" />
                        {lastLoginLabel(m.lastLoginAt)}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </main>
  );
}

function StatCard({
  icon,
  label,
  value,
  sub,
  accent,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  sub?: string;
  accent?: "primary";
}) {
  const isPrimary = accent === "primary";
  return (
    <div
      className={`relative overflow-hidden rounded-2xl border p-4 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md ${
        isPrimary
          ? "border-primary/30 bg-gradient-to-br from-primary-soft via-card to-card"
          : "border-border bg-card"
      }`}
    >
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

function AccuracyPill({ accuracy }: { accuracy: number }) {
  const tone =
    accuracy >= 75
      ? "border-emerald-300/50 bg-emerald-50 text-emerald-700 dark:border-emerald-700/40 dark:bg-emerald-950/40 dark:text-emerald-300"
      : accuracy >= 60
        ? "border-amber-300/50 bg-amber-50 text-amber-800 dark:border-amber-700/40 dark:bg-amber-950/40 dark:text-amber-300"
        : "border-rose-300/50 bg-rose-50 text-rose-700 dark:border-rose-700/40 dark:bg-rose-950/40 dark:text-rose-300";
  return (
    <span
      className={`inline-flex items-center rounded-full border px-2 py-0.5 text-xs font-semibold tabular-nums ${tone}`}
    >
      {accuracy.toFixed(1)}%
    </span>
  );
}
