import type { Metadata } from "next";
import { Lock, Shield, TrendingDown } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { fetchFunnelData, isFunnelConfigured } from "@/lib/admin/funnel/posthog";
import { FunnelDashboard } from "./FunnelCharts";

export const metadata: Metadata = {
  title: "ファネルダッシュボード（管理画面）",
  description: "主要動線の離脱ポイント可視化。Basic Auth 保護。",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

export default async function AdminFunnelPage() {
  const configured = isFunnelConfigured();
  const initial = await fetchFunnelData(7);

  return (
    <main className="mx-auto w-full max-w-6xl flex-1 px-4 pb-12 pt-8 sm:px-6">
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
            {configured ? (
              <Badge variant="success">PostHog 連携中</Badge>
            ) : (
              <Badge variant="warn">PostHog 未設定</Badge>
            )}
          </div>
          <div className="flex items-center gap-2">
            <TrendingDown className="h-6 w-6 text-sky-500" />
            <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              ファネルダッシュボード
            </h1>
          </div>
          <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted-foreground">
            クイズ演習・論文問題・ブログ読了の各動線における離脱ポイントを可視化します。
            PostHog HogQL API でリアルタイム集計（5分キャッシュ）。
          </p>
        </div>
      </header>

      <FunnelDashboard initial={initial} />
    </main>
  );
}
