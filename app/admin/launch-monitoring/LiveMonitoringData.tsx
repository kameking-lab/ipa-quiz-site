"use client";

import { useEffect, useState, useCallback } from "react";
import {
  Activity,
  AlertTriangle,
  BarChart2,
  CheckCircle2,
  Info,
  RefreshCw,
  Search,
  TrendingUp,
  Zap,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { LaunchMonitoringData } from "@/lib/admin/launch-monitoring/data";

const POLL_INTERVAL_MS = 2 * 60 * 1000;

function fmtNum(n: number): string {
  if (n >= 10000) return `${(n / 10000).toFixed(1)}万`;
  if (n >= 1000) return `${(n / 1000).toFixed(1)}k`;
  return String(n);
}

function fmtJpy(n: number): string {
  return `¥${n.toFixed(0)}`;
}

// ─── Mini sparkline (Tailwind-only, no charting lib) ──────────────────────────

function HourlySparkline({ series }: { series: number[] }) {
  const max = Math.max(...series, 1);
  // series[0] is most recent; reverse for left-to-right display
  const bars = [...series].reverse();

  return (
    <div className="flex h-10 items-end gap-px" title="直近24h API呼出 (左=23h前、右=直近)">
      {bars.map((v, i) => {
        const pct = Math.round((v / max) * 100);
        const isRecent = i >= bars.length - 3;
        return (
          <div
            key={i}
            className={`flex-1 rounded-sm transition-all ${isRecent ? "bg-emerald-500" : "bg-emerald-300/60"}`}
            style={{ height: `${Math.max(pct, 4)}%` }}
            title={`${23 - i}h前: ${v}回`}
          />
        );
      })}
    </div>
  );
}

// ─── KPI card ─────────────────────────────────────────────────────────────────

function KpiCard({
  label,
  value,
  sub,
  icon,
  highlight,
}: {
  label: string;
  value: string;
  sub?: string;
  icon: React.ReactNode;
  highlight?: "green" | "yellow" | "red";
}) {
  const ring =
    highlight === "red"
      ? "border-red-400"
      : highlight === "yellow"
        ? "border-amber-400"
        : "border-border";

  return (
    <div className={`rounded-2xl border ${ring} bg-card p-4 shadow-sm`}>
      <div className="mb-2 flex items-center gap-1.5 text-xs font-medium text-muted-foreground">
        {icon}
        {label}
      </div>
      <div className="text-2xl font-bold tabular-nums text-foreground">{value}</div>
      {sub && <div className="mt-0.5 text-xs text-muted-foreground">{sub}</div>}
    </div>
  );
}

// ─── Alert banner ─────────────────────────────────────────────────────────────

function AlertBanner({
  level,
  title,
  detail,
}: {
  level: "critical" | "warning" | "info";
  title: string;
  detail: string;
}) {
  const styles = {
    critical: "border-red-400 bg-red-50 dark:bg-red-950/30 text-red-700 dark:text-red-300",
    warning:
      "border-amber-400 bg-amber-50 dark:bg-amber-950/30 text-amber-700 dark:text-amber-300",
    info: "border-sky-400 bg-sky-50 dark:bg-sky-950/30 text-sky-700 dark:text-sky-300",
  };
  const Icon = level === "info" ? Info : AlertTriangle;

  return (
    <div className={`flex gap-2 rounded-xl border p-3 ${styles[level]}`}>
      <Icon className="mt-0.5 h-4 w-4 shrink-0" />
      <div className="min-w-0 text-sm">
        <span className="font-semibold">{title}</span>
        <span className="ml-1">{detail}</span>
      </div>
    </div>
  );
}

// ─── Main component ────────────────────────────────────────────────────────────

export function LiveMonitoringData() {
  const [data, setData] = useState<LaunchMonitoringData | null>(null);
  const [loading, setLoading] = useState(true);
  const [lastRefreshed, setLastRefreshed] = useState<Date | null>(null);

  const load = useCallback(async () => {
    try {
      const res = await fetch("/api/admin/launch-monitoring");
      if (res.ok) {
        const json = (await res.json()) as LaunchMonitoringData;
        setData(json);
        setLastRefreshed(new Date());
      }
    } catch {
      // silent — stale data stays visible
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void load();
    const id = setInterval(() => void load(), POLL_INTERVAL_MS);
    return () => clearInterval(id);
  }, [load]);

  if (loading) {
    return (
      <div className="mb-8 flex items-center gap-2 text-sm text-muted-foreground">
        <RefreshCw className="h-4 w-4 animate-spin" />
        リアルタイムデータ読み込み中…
      </div>
    );
  }

  if (!data) return null;

  const { traffic, apiUsage, gsc, vercel, alerts } = data;

  const quizConvLabel =
    traffic.quizConversionPct !== null ? `${traffic.quizConversionPct}%` : "—";
  const quizConvHighlight: "green" | "yellow" | undefined =
    traffic.quizConversionPct !== null
      ? traffic.quizConversionPct >= 50
        ? "green"
        : "yellow"
      : undefined;

  const costHighlight: "yellow" | "red" | undefined =
    apiUsage.costJpy24h >= 500 ? "red" : apiUsage.costJpy24h >= 200 ? "yellow" : undefined;

  // Effective page view: prefer Vercel if available, fall back to PostHog
  const pvSource = vercel.configured && vercel.pageviews24h > 0 ? "Vercel" : "PostHog";
  const pvCount =
    vercel.configured && vercel.pageviews24h > 0 ? vercel.pageviews24h : traffic.pageviews;

  const refreshLabel = lastRefreshed
    ? lastRefreshed.toLocaleTimeString("ja-JP", { hour: "2-digit", minute: "2-digit" })
    : "";

  return (
    <section className="mb-8 space-y-4">
      {/* Header row */}
      <div className="flex flex-wrap items-center justify-between gap-2">
        <h2 className="flex items-center gap-2 text-lg font-semibold text-foreground">
          <Activity className="h-5 w-5 text-emerald-500" />
          リアルタイム監視データ
        </h2>
        <div className="flex items-center gap-2">
          {!traffic.posthogConfigured && (
            <Badge variant="default" className="text-xs">
              PostHog 未設定 (モック)
            </Badge>
          )}
          {refreshLabel && (
            <span className="text-xs text-muted-foreground">{refreshLabel} 更新</span>
          )}
          <button
            onClick={() => void load()}
            className="rounded-md p-1 text-muted-foreground hover:text-foreground"
            title="今すぐ更新"
          >
            <RefreshCw className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>

      {/* Alerts */}
      {alerts.length > 0 && (
        <div className="space-y-2">
          {alerts.map((a, i) => (
            <AlertBanner key={i} level={a.level} title={a.title} detail={a.detail} />
          ))}
        </div>
      )}

      {/* KPI grid */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
        <KpiCard
          label={`PV 24h (${pvSource})`}
          value={fmtNum(pvCount)}
          icon={<TrendingUp className="h-3.5 w-3.5" />}
        />
        <KpiCard
          label="クイズ開始 24h"
          value={fmtNum(traffic.quizStarts)}
          sub={traffic.posthogConfigured ? undefined : "PostHog 未設定"}
          icon={<BarChart2 className="h-3.5 w-3.5" />}
        />
        <KpiCard
          label="クイズ完了率"
          value={quizConvLabel}
          sub={
            traffic.quizStarts > 0
              ? `${traffic.quizCompleted}/${traffic.quizStarts} 件`
              : undefined
          }
          icon={<CheckCircle2 className="h-3.5 w-3.5" />}
          highlight={quizConvHighlight}
        />
        <KpiCard
          label="AI クエリ 24h"
          value={fmtNum(traffic.aiQueries)}
          icon={<Zap className="h-3.5 w-3.5" />}
        />
        <KpiCard
          label="API 呼出 24h"
          value={fmtNum(apiUsage.totalLast24h)}
          sub={apiUsage.enabled ? `直近1h: ${apiUsage.totalLast1h}回` : "KV 未設定"}
          icon={<Activity className="h-3.5 w-3.5" />}
        />
        <KpiCard
          label="推定コスト 24h"
          value={fmtJpy(apiUsage.costJpy24h)}
          sub="Gemini 2.5 Flash-Lite"
          icon={<Activity className="h-3.5 w-3.5" />}
          highlight={costHighlight}
        />
        <KpiCard
          label="GSC クリック 30d"
          value={gsc.configured ? fmtNum(gsc.clicks30d) : "未設定"}
          sub={gsc.configured ? `表示 ${fmtNum(gsc.impressions30d)} 回` : undefined}
          icon={<Search className="h-3.5 w-3.5" />}
        />
        <KpiCard
          label="ブログ閲覧 24h"
          value={fmtNum(traffic.blogViews)}
          icon={<BarChart2 className="h-3.5 w-3.5" />}
        />
      </div>

      {/* API usage sparkline */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="flex items-center gap-2 text-sm font-medium">
            <Activity className="h-4 w-4 text-emerald-500" />
            API 呼出 24h 推移（直近 24 時間、時間単位）
            {!apiUsage.enabled && (
              <Badge variant="default" className="text-xs">
                KV 未設定
              </Badge>
            )}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <HourlySparkline series={apiUsage.hourlySeries} />
          <div className="mt-1.5 flex justify-between text-xs text-muted-foreground">
            <span>23h 前</span>
            <span>直近</span>
          </div>
        </CardContent>
      </Card>

      {/* Funnel conversion summary */}
      {traffic.posthogConfigured && (
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">主要動線 コンバージョン率 (24h)</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <ConvBar
                label="PV → クイズ開始"
                from={pvCount}
                to={traffic.quizStarts}
              />
              <ConvBar
                label="クイズ開始 → 完了"
                from={traffic.quizStarts}
                to={traffic.quizCompleted}
              />
              <ConvBar
                label="クイズ開始 → AI 利用"
                from={traffic.quizStarts}
                to={traffic.aiQueries}
              />
            </div>
          </CardContent>
        </Card>
      )}
    </section>
  );
}

function ConvBar({ label, from, to }: { label: string; from: number; to: number }) {
  const pct = from > 0 ? Math.min(100, Math.round((to / from) * 100)) : 0;
  const color =
    pct >= 50 ? "bg-emerald-500" : pct >= 20 ? "bg-amber-400" : "bg-red-400";

  return (
    <div>
      <div className="mb-1 flex justify-between text-xs text-muted-foreground">
        <span>{label}</span>
        <span>
          {pct}% ({fmtNum(to)}/{fmtNum(from)})
        </span>
      </div>
      <div className="h-2 w-full overflow-hidden rounded-full bg-muted">
        <div
          className={`h-full rounded-full transition-all ${color}`}
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}
