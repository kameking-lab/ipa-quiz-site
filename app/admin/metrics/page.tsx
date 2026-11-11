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

  return (
    <main className="mx-auto w-full max-w-7xl flex-1 px-4 pb-10 pt-8 sm:px-6">
      <div className="mb-6 flex flex-wrap items-start justify-between gap-3">
        <div>
          <div className="mb-1 flex flex-wrap items-center gap-2">
            <Badge variant="outline">管理画面</Badge>
            <Badge variant="success">Basic Auth 保護</Badge>
            <Badge variant={initial.source === "kv" ? "success" : "warn"}>{initial.source === "kv" ? "KV匿名集計" : "未取得"}</Badge>
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-3xl">
            メトリクスダッシュボード
          </h1>
          <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
            ページ閲覧・解答・AI質問・無料上限の案内表示を日別・資格別に確認。
          </p>
        </div>
      </div>

      <MetricsDashboard initial={initial} />
    </main>
  );
}
