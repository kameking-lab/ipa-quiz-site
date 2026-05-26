import type { Metadata } from "next";
import Link from "next/link";
import {
  Activity,
  AlertTriangle,
  BarChart3,
  Gauge,
  LineChart,
  MessageSquare,
  Rocket,
  ShieldCheck,
  Sparkles,
  TrendingUp,
  Users,
} from "lucide-react";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

// Bare /admin previously had no page — authed requests 404'd while unauthed
// ones hit the Basic-auth 401/503 (empirical review #6). This index gives the
// Basic-auth-protected admin area a real landing page. Protection is enforced
// by middleware.ts (matcher /admin/:path*); noindex + robots.txt Disallow keep
// it out of search.
export const metadata: Metadata = {
  title: "管理ダッシュボード",
  description: "運営向け管理ハブ。Basic Auth 保護。",
  robots: { index: false, follow: false },
};

const TOOLS: { href: string; title: string; desc: string; icon: typeof Activity }[] = [
  { href: "/admin/launch-monitoring", title: "ローンチ監視", desc: "稼働状況・初日監視ハブ", icon: Rocket },
  { href: "/admin/metrics", title: "メトリクス", desc: "主要 KPI ダッシュボード", icon: BarChart3 },
  { href: "/admin/stats", title: "統計", desc: "学習・利用統計", icon: LineChart },
  { href: "/admin/funnel", title: "ファネル", desc: "獲得〜継続の導線分析", icon: TrendingUp },
  { href: "/admin/retention", title: "リテンション", desc: "継続率・復帰率", icon: Users },
  { href: "/admin/api-usage", title: "API 使用量", desc: "AI コスト・リクエスト数", icon: Gauge },
  { href: "/admin/feedback", title: "フィードバック", desc: "ユーザー報告一覧", icon: MessageSquare },
  { href: "/admin/moderation", title: "モデレーション", desc: "投稿コンテンツの確認", icon: ShieldCheck },
  { href: "/admin/errors", title: "エラー", desc: "実行時エラーの記録", icon: AlertTriangle },
  { href: "/admin/deployment-status", title: "デプロイ状況", desc: "Vercel デプロイ監視", icon: Activity },
  { href: "/admin/competitors", title: "競合", desc: "競合ベンチマーク", icon: Sparkles },
];

export default function AdminIndexPage() {
  return (
    <main className="mx-auto w-full max-w-4xl px-4 py-8">
      <header className="mb-6">
        <h1 className="text-2xl font-bold tracking-tight text-foreground">管理ダッシュボード</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          運営向けの管理ツール一覧です（Basic Auth 保護・検索非対象）。
        </p>
      </header>
      <div className="grid gap-3 sm:grid-cols-2">
        {TOOLS.map(({ href, title, desc, icon: Icon }) => (
          <Link key={href} href={href} className="block focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background rounded-2xl">
            <Card className="h-full transition hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-md">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-base">
                  <Icon className="h-4 w-4 text-primary" aria-hidden="true" />
                  {title}
                </CardTitle>
                <CardDescription>{desc}</CardDescription>
              </CardHeader>
              <CardContent className="text-xs text-muted-foreground">{href}</CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </main>
  );
}
