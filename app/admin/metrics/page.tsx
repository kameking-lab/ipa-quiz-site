import type { Metadata } from "next";
import { MetricsDashboard } from "./MetricsDashboard";

export const metadata: Metadata = {
  title: "メトリクスダッシュボード（管理画面）",
  description: "IPA Quiz の運営判断用メトリクス。Basic Auth 保護。",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

export default function AdminMetricsPage() {
  return <MetricsDashboard />;
}
