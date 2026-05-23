import type { Metadata } from "next";
import Link from "next/link";
import {
  AlertTriangle,
  CheckCircle2,
  Clock,
  GitBranch,
  Lock,
  RefreshCw,
  Shield,
  XCircle,
  Zap,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  fetchDeploymentStatus,
  type PRStatus,
  type ProductionDeployment,
} from "@/lib/admin/deployment-status";

export const metadata: Metadata = {
  title: "デプロイ状況ダッシュボード（管理画面）",
  description: "Vercel 本番デプロイ状況・PR 反映状態・クォータ監視。Basic Auth 保護。",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

function formatDelay(sec: number | null): string {
  if (sec === null) return "—";
  if (sec < 120) return `${sec}秒`;
  if (sec < 3600) return `${Math.round(sec / 60)}分`;
  return `${(sec / 3600).toFixed(1)}時間`;
}

function formatTime(iso: string): string {
  return new Date(iso).toLocaleString("ja-JP", {
    timeZone: "Asia/Tokyo",
    hour12: false,
  });
}

function QuotaBar({ used, limit }: { used: number; limit: number }) {
  const pct = Math.min(100, Math.round((used / limit) * 100));
  const color = pct >= 90 ? "bg-red-500" : pct >= 70 ? "bg-yellow-500" : "bg-green-500";
  return (
    <div className="mt-2 w-full">
      <div className="mb-1 flex justify-between text-xs text-muted-foreground">
        <span>
          {used} / {limit} ビルド
        </span>
        <span>{pct}%</span>
      </div>
      <div className="h-2 w-full overflow-hidden rounded-full bg-muted">
        <div className={`h-full transition-all ${color}`} style={{ width: `${pct}%` }} />
      </div>
    </div>
  );
}

function StateIcon({ state }: { state: string }) {
  if (state === "success") return <CheckCircle2 className="h-4 w-4 text-green-500" />;
  if (state === "failure" || state === "error")
    return <XCircle className="h-4 w-4 text-red-500" />;
  if (state === "inactive") return <XCircle className="h-4 w-4 text-muted-foreground" />;
  return <Clock className="h-4 w-4 text-yellow-500" />;
}

function ProdDeployRow({ dep }: { dep: ProductionDeployment }) {
  return (
    <div className="flex flex-wrap items-center gap-2 rounded-lg border border-border p-3">
      <StateIcon state={dep.state} />
      <code className="font-mono text-xs text-muted-foreground">{dep.shortSha}</code>
      <span className="flex-1 truncate text-xs text-muted-foreground">
        {formatTime(dep.createdAt)}
      </span>
      <Badge
        variant={dep.state === "success" ? "success" : dep.state === "inactive" ? "soft" : "danger"}
        className="text-xs"
      >
        {dep.state}
      </Badge>
    </div>
  );
}

function PRRow({ pr }: { pr: PRStatus }) {
  const delay = pr.deploymentDelaySec;
  const isLong = delay !== null && delay > 3600;
  return (
    <div
      className={`flex flex-wrap items-start gap-2 rounded-lg border p-3 ${
        pr.isInProduction
          ? isLong
            ? "border-yellow-500/40 bg-yellow-500/5"
            : "border-green-500/30 bg-green-500/5"
          : "border-muted"
      }`}
    >
      <span className="mt-0.5">
        {pr.isInProduction ? (
          <CheckCircle2 className={`h-4 w-4 ${isLong ? "text-yellow-500" : "text-green-500"}`} />
        ) : (
          <Clock className="h-4 w-4 text-yellow-500" />
        )}
      </span>
      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-medium">
          <a
            href={`https://github.com/kameking-lab/ipa-quiz-site/pull/${pr.number}`}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:underline"
          >
            #{pr.number} {pr.title}
          </a>
        </p>
        <p className="mt-0.5 text-xs text-muted-foreground">
          merge: {formatTime(pr.mergedAt)}
          {pr.isInProduction && delay !== null && (
            <span className={`ml-2 ${isLong ? "font-semibold text-yellow-600" : ""}`}>
              → 反映まで {formatDelay(delay)}
              {isLong && " ⚠️"}
            </span>
          )}
        </p>
      </div>
      <Badge variant={pr.isInProduction ? "success" : "warn"} className="shrink-0 text-xs">
        {pr.isInProduction ? "本番反映済" : "未反映"}
      </Badge>
    </div>
  );
}

export default async function DeploymentStatusPage() {
  let data;
  try {
    data = await fetchDeploymentStatus();
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    return (
      <main className="mx-auto w-full max-w-4xl flex-1 px-4 pb-12 pt-8 sm:px-6">
        <div className="rounded-lg border border-destructive bg-destructive/10 p-6 text-center">
          <XCircle className="mx-auto mb-2 h-8 w-8 text-destructive" />
          <p className="font-semibold text-destructive">データ取得失敗</p>
          <p className="mt-1 text-sm text-muted-foreground">{msg}</p>
        </div>
      </main>
    );
  }

  const quota = data.vercelQuota;
  const quotaPct = quota ? Math.round((quota.used / quota.limit) * 100) : 0;
  const undeployedCount = data.recentPRs.filter((p) => !p.isInProduction).length;
  const delayedCount = data.recentPRs.filter(
    (p) => p.isInProduction && p.deploymentDelaySec !== null && p.deploymentDelaySec > 3600,
  ).length;

  return (
    <main className="mx-auto w-full max-w-5xl flex-1 px-4 pb-12 pt-8 sm:px-6">
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
          </div>
          <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">Vercel デプロイ状況</h1>
          <p className="mt-1 text-sm text-muted-foreground">最終取得: {formatTime(data.fetchedAt)}</p>
        </div>
        <Link
          href="/admin/deployment-status"
          className="flex items-center gap-1.5 rounded-lg border border-border px-3 py-1.5 text-sm hover:bg-accent"
        >
          <RefreshCw className="h-3.5 w-3.5" />
          更新
        </Link>
      </header>

      {/* Status Banner */}
      <div
        className={`mb-6 flex flex-wrap items-center gap-3 rounded-xl border p-4 ${
          data.isUpToDate
            ? "border-green-500/30 bg-green-500/5"
            : "border-red-500/30 bg-red-500/5"
        }`}
      >
        {data.isUpToDate ? (
          <CheckCircle2 className="h-6 w-6 shrink-0 text-green-500" />
        ) : (
          <AlertTriangle className="h-6 w-6 shrink-0 text-red-500" />
        )}
        <div className="min-w-0 flex-1">
          <p
            className={`font-semibold ${
              data.isUpToDate
                ? "text-green-700 dark:text-green-400"
                : "text-red-700 dark:text-red-400"
            }`}
          >
            {data.isUpToDate ? "本番は最新状態です" : "本番が main より遅れています"}
          </p>
          <p className="mt-0.5 text-xs text-muted-foreground">
            本番: <code className="font-mono">{data.currentProdSha.slice(0, 8)}</code>
            {" ／ main: "}
            <code className="font-mono">{data.mainSha.slice(0, 8)}</code>
            {data.lastProdDeployAt && (
              <span className="ml-2">最終デプロイ: {formatTime(data.lastProdDeployAt)}</span>
            )}
          </p>
        </div>
        {undeployedCount > 0 && (
          <Badge variant="danger">{undeployedCount} 件未反映</Badge>
        )}
        {delayedCount > 0 && <Badge variant="warn">{delayedCount} 件が 1h+ 遅延</Badge>}
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Left: Quota + Recent Prod Deployments */}
        <div className="space-y-6 lg:col-span-1">
          {quota && (
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2 text-sm">
                  <Zap className="h-4 w-4" />
                  Vercel ビルドクォータ
                  {quota.source === "estimated" && (
                    <Badge variant="soft" className="text-xs">
                      推定値
                    </Badge>
                  )}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <QuotaBar used={quota.used} limit={quota.limit} />
                {quotaPct >= 80 && (
                  <p className="mt-2 text-xs text-yellow-600">
                    ⚠️ クォータ逼迫。新規デプロイが遅延する可能性があります。
                  </p>
                )}
                <p className="mt-2 text-xs text-muted-foreground">
                  リセット: {formatTime(quota.resetsAt)}
                </p>
                <p className="mt-0.5 text-xs text-muted-foreground">
                  Vercel UTC 00:00 = JST 09:00 に自動リセット
                </p>
              </CardContent>
            </Card>
          )}

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center gap-2 text-sm">
                <GitBranch className="h-4 w-4" />
                本番デプロイ履歴
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {data.prodDeployments.length === 0 ? (
                <p className="text-sm text-muted-foreground">データなし</p>
              ) : (
                data.prodDeployments.map((dep) => <ProdDeployRow key={dep.id} dep={dep} />)
              )}
            </CardContent>
          </Card>
        </div>

        {/* Right: PR Status */}
        <div className="lg:col-span-2">
          <Card className="h-full">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center gap-2 text-sm">
                <CheckCircle2 className="h-4 w-4" />
                直近 PR 反映状況（過去 48 時間）
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {data.recentPRs.length === 0 ? (
                <p className="text-sm text-muted-foreground">対象 PR なし</p>
              ) : (
                data.recentPRs.map((pr) => <PRRow key={pr.number} pr={pr} />)
              )}
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Recovery Links */}
      <div className="mt-8 rounded-lg border border-border bg-muted/30 p-4">
        <p className="text-sm font-medium">復旧手順</p>
        <ul className="mt-2 space-y-1 text-xs text-muted-foreground">
          <li>
            クォータ超過時: JST 09:00 のリセット後、GitHub Actions が自動再デプロイを試行します。
          </li>
          <li>
            手動トリガー:{" "}
            <a
              href="https://github.com/kameking-lab/ipa-quiz-site/actions/workflows/vercel-recovery.yml"
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:text-foreground"
            >
              Actions → Vercel Deployment Recovery → Run workflow
            </a>
          </li>
          <li>
            詳細手順:{" "}
            <code className="rounded bg-muted px-1 py-0.5 font-mono text-xs">
              logs/recovery-procedure.md
            </code>
          </li>
        </ul>
      </div>
    </main>
  );
}
