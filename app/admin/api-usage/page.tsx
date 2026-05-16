import type { Metadata } from "next";
import { Activity, AlertTriangle, CheckCircle2, DollarSign, Lock, Shield, Zap } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { getApiUsageStats } from "@/lib/rate-limit";
import { IP_LIMITS, COST_JPY_PER_REQUEST, TRACKED_ENDPOINTS } from "@/lib/rate-limit";

export const metadata: Metadata = {
  title: "API使用量ダッシュボード（管理画面）",
  description: "LLM API 呼出回数・推定コスト・IP別ランキング。Basic Auth 保護。",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

const ENDPOINT_LABELS: Record<string, string> = {
  copilot: "AI コパイロット",
  "essay-grade": "論述採点 (JSON)",
  "essay-grading": "論述採点 (ストリーム)",
  "generate-question": "類題生成",
  scoring: "午後採点",
};

export default async function AdminApiUsagePage() {
  const stats = await getApiUsageStats();

  return (
    <main className="mx-auto w-full max-w-6xl flex-1 px-4 pb-12 pt-8 sm:px-6">
      {/* Header */}
      <header className="mb-8 flex flex-wrap items-start justify-between gap-3">
        <div className="min-w-0">
          <div className="mb-3 flex flex-wrap items-center gap-1.5">
            <Badge variant="primary">
              <Shield className="mr-1 h-3 w-3" />
              管理画面
            </Badge>
            <Badge variant="success">
              <Lock className="mr-1 h-3 w-3" />
              Basic Auth
            </Badge>
            {stats.enabled ? (
              <Badge variant="success">
                <CheckCircle2 className="mr-1 h-3 w-3" />
                Upstash KV 有効
              </Badge>
            ) : (
              <Badge variant="warn">
                <AlertTriangle className="mr-1 h-3 w-3" />
                KV 未設定（in-memory のみ）
              </Badge>
            )}
          </div>
          <h1 className="text-balance text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            API 使用量ダッシュボード
          </h1>
          <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted-foreground">
            LLM 呼出回数・推定コスト・IP別ランキングを確認します。
            {stats.enabled
              ? " Upstash KV から集計しています。"
              : " KV_REST_API_URL / KV_REST_API_TOKEN を設定すると実データに切り替わります。"}
          </p>
          <p className="mt-1 text-xs text-muted-foreground">
            最終更新: {new Date(stats.generatedAt).toLocaleString("ja-JP", { timeZone: "Asia/Tokyo" })}
          </p>
        </div>
      </header>

      {/* Rate limit info */}
      <Card className="mb-6 border-blue-200 bg-blue-50/50 dark:border-blue-800 dark:bg-blue-950/20">
        <CardHeader className="pb-2">
          <CardTitle className="flex items-center gap-2 text-sm font-semibold text-blue-700 dark:text-blue-300">
            <Zap className="h-4 w-4" />
            IP レート制限設定（anti-abuse 層）
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-4 text-sm">
            <span className="text-foreground">
              <span className="font-mono font-semibold">{IP_LIMITS.minute}</span>{" "}
              <span className="text-muted-foreground">回 / 分</span>
            </span>
            <span className="text-foreground">
              <span className="font-mono font-semibold">{IP_LIMITS.hour}</span>{" "}
              <span className="text-muted-foreground">回 / 時間</span>
            </span>
            <span className="text-foreground">
              <span className="font-mono font-semibold">{IP_LIMITS.day}</span>{" "}
              <span className="text-muted-foreground">回 / 日</span>
            </span>
            <span className="text-muted-foreground">
              推定単価: <span className="font-mono font-semibold text-foreground">{COST_JPY_PER_REQUEST}円</span> / リクエスト
            </span>
          </div>
          <p className="mt-2 text-xs text-muted-foreground">
            ※ 既存の機能別制限（無料10回/日 + フィードバック後9999回）とは独立した追加レイヤーです。
          </p>
        </CardContent>
      </Card>

      {/* KPI cards */}
      <section className="mb-8 grid grid-cols-2 gap-3 sm:grid-cols-4">
        <KpiCard
          icon={<Activity className="h-4 w-4" />}
          label="直近1時間 呼出"
          value={stats.totalLast1h.toLocaleString()}
          sub="全エンドポイント合計"
          accent="primary"
        />
        <KpiCard
          icon={<Activity className="h-4 w-4" />}
          label="直近24時間 呼出"
          value={stats.totalLast24h.toLocaleString()}
          sub="全エンドポイント合計"
        />
        <KpiCard
          icon={<DollarSign className="h-4 w-4" />}
          label="推定コスト 1時間"
          value={`¥${stats.estimatedCostJpy.last1h.toFixed(2)}`}
          sub="Gemini 2.5 Flash-Lite 前提"
        />
        <KpiCard
          icon={<DollarSign className="h-4 w-4" />}
          label="推定コスト 24時間"
          value={`¥${stats.estimatedCostJpy.last24h.toFixed(2)}`}
          sub="Gemini 2.5 Flash-Lite 前提"
        />
      </section>

      {!stats.enabled && (
        <Card className="mb-6 border-amber-200 bg-amber-50/50 dark:border-amber-800 dark:bg-amber-950/20">
          <CardContent className="py-4">
            <p className="text-sm font-medium text-amber-700 dark:text-amber-300">
              Upstash KV が未設定のため、使用量データは表示できません。
            </p>
            <p className="mt-1 text-xs text-amber-600 dark:text-amber-400">
              Vercel プロジェクト設定で{" "}
              <code className="rounded bg-amber-100 px-1 dark:bg-amber-900/40">KV_REST_API_URL</code>{" "}
              と{" "}
              <code className="rounded bg-amber-100 px-1 dark:bg-amber-900/40">KV_REST_API_TOKEN</code>{" "}
              を追加してください。
            </p>
          </CardContent>
        </Card>
      )}

      {/* By-endpoint breakdown */}
      <Card className="mb-6 overflow-hidden">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base">
            <span className="inline-flex h-7 w-7 items-center justify-center rounded-lg bg-primary-soft text-primary-soft-foreground">
              <Activity className="h-3.5 w-3.5" />
            </span>
            エンドポイント別 呼出回数
          </CardTitle>
          <CardDescription>直近1時間 / 24時間の LLM 呼出カウント。</CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[560px] text-sm">
              <thead>
                <tr className="border-b border-border bg-muted/30 text-left text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                  <th className="px-5 py-3">エンドポイント</th>
                  <th className="px-5 py-3 text-right">直近1時間</th>
                  <th className="px-5 py-3 text-right">直近24時間</th>
                  <th className="px-5 py-3 text-right">推定コスト(24h)</th>
                </tr>
              </thead>
              <tbody>
                {TRACKED_ENDPOINTS.map((ep, i) => {
                  const s = stats.byEndpoint[ep];
                  const cost24h = Math.round(s.last24h * COST_JPY_PER_REQUEST * 100) / 100;
                  return (
                    <tr
                      key={ep}
                      className={`border-b border-border transition hover:bg-muted/30 ${
                        i % 2 === 0 ? "bg-card" : "bg-muted/10"
                      }`}
                    >
                      <td className="px-5 py-3">
                        <div className="flex items-center gap-2">
                          <code className="rounded-md bg-primary-soft px-2 py-0.5 font-mono text-[10px] font-semibold text-primary-soft-foreground">
                            /api/{ep}
                          </code>
                          <span className="text-muted-foreground">{ENDPOINT_LABELS[ep] ?? ep}</span>
                        </div>
                      </td>
                      <td className="px-5 py-3 text-right font-mono tabular-nums">
                        {s.last1h.toLocaleString()}
                      </td>
                      <td className="px-5 py-3 text-right font-mono tabular-nums">
                        {s.last24h.toLocaleString()}
                      </td>
                      <td className="px-5 py-3 text-right font-mono tabular-nums text-muted-foreground">
                        ¥{cost24h.toFixed(2)}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
              <tfoot>
                <tr className="border-t-2 border-border bg-muted/20">
                  <td className="px-5 py-3 font-semibold">合計</td>
                  <td className="px-5 py-3 text-right font-mono font-semibold tabular-nums">
                    {stats.totalLast1h.toLocaleString()}
                  </td>
                  <td className="px-5 py-3 text-right font-mono font-semibold tabular-nums">
                    {stats.totalLast24h.toLocaleString()}
                  </td>
                  <td className="px-5 py-3 text-right font-mono font-semibold tabular-nums">
                    ¥{stats.estimatedCostJpy.last24h.toFixed(2)}
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Top IPs */}
      <Card className="overflow-hidden">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base">
            <span className="inline-flex h-7 w-7 items-center justify-center rounded-lg bg-primary-soft text-primary-soft-foreground">
              <Shield className="h-3.5 w-3.5" />
            </span>
            IP 別 呼出ランキング（直近2時間）
          </CardTitle>
          <CardDescription>
            上位10 IP。IP レート制限({IP_LIMITS.day}回/日)に近い IP は要確認。
          </CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          {stats.topIps.length === 0 ? (
            <p className="px-5 py-6 text-sm text-muted-foreground">
              {stats.enabled ? "データなし（直近2時間のアクセスなし）" : "KV 未設定のためデータなし"}
            </p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full min-w-[400px] text-sm">
                <thead>
                  <tr className="border-b border-border bg-muted/30 text-left text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                    <th className="px-5 py-3">順位</th>
                    <th className="px-5 py-3">IP アドレス</th>
                    <th className="px-5 py-3 text-right">呼出回数（直近2h）</th>
                    <th className="px-5 py-3 text-right">残余制限</th>
                  </tr>
                </thead>
                <tbody>
                  {stats.topIps.map((item, i) => {
                    const remaining = IP_LIMITS.day - item.count24h;
                    const isHighUsage = item.count24h >= IP_LIMITS.day * 0.8;
                    return (
                      <tr
                        key={item.ip}
                        className={`border-b border-border transition hover:bg-muted/30 ${
                          i % 2 === 0 ? "bg-card" : "bg-muted/10"
                        } ${isHighUsage ? "bg-red-50/50 dark:bg-red-950/20" : ""}`}
                      >
                        <td className="px-5 py-3 font-mono text-muted-foreground">
                          #{i + 1}
                        </td>
                        <td className="px-5 py-3 font-mono text-[12px]">{item.ip}</td>
                        <td className="px-5 py-3 text-right font-mono tabular-nums">
                          <span className={isHighUsage ? "font-bold text-red-600 dark:text-red-400" : ""}>
                            {item.count24h.toLocaleString()}
                          </span>
                        </td>
                        <td className="px-5 py-3 text-right font-mono tabular-nums text-muted-foreground">
                          {Math.max(0, remaining).toLocaleString()}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>
    </main>
  );
}

function KpiCard({
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
