import type { Metadata } from "next";
import { Badge } from "@/components/ui/badge";
import { resolveRange } from "@/lib/admin/metrics/range";
import { fetchMetrics } from "@/lib/admin/metrics/posthog";
import { MetricsDashboard } from "./MetricsDashboard";

export const metadata: Metadata = {
  title: "メトリクス（管理画面）",
  description: "IPA Quiz の総合メトリクスダッシュボード。Basic Auth 保護。",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

export default async function AdminMetricsPage() {
  const meta = resolveRange("7d");
  const initial = await fetchMetrics(meta);
  const hasPosthog = Boolean(process.env.POSTHOG_API_KEY && process.env.POSTHOG_PROJECT_ID);

  return (
    <main className="mx-auto w-full max-w-7xl flex-1 px-4 pb-10 pt-8 sm:px-6">
      <div className="mb-6 flex flex-wrap items-start justify-between gap-3">
        <div>
          <div className="mb-1 flex flex-wrap items-center gap-2">
            <Badge variant="outline">管理画面</Badge>
            <Badge variant="success">Basic Auth 保護</Badge>
            {hasPosthog ? (
              <Badge variant="success">PostHog 連携中</Badge>
            ) : (
              <Badge variant="warn">モックデータ</Badge>
            )}
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-3xl">
            メトリクスダッシュボード
          </h1>
          <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
            DAU・解答数・流入元・コンバージョン・エラー・改善インサイトを 1 画面で確認。
          </p>
          {!hasPosthog && (
            <p className="mt-1 text-xs text-amber-700 dark:text-amber-300">
              <code className="rounded bg-amber-100 px-1 py-0.5 dark:bg-amber-900/40">
                POSTHOG_API_KEY
              </code>{" "}
              と{" "}
              <code className="rounded bg-amber-100 px-1 py-0.5 dark:bg-amber-900/40">
                POSTHOG_PROJECT_ID
              </code>{" "}
              を設定すると実データに切り替わります。現在はサンプルデータを表示しています。
            </p>
          )}
        </div>
      </div>

      <MetricsDashboard initial={initial} />
    </main>
  );
}
