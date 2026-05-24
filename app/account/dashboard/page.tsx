import type { Metadata } from "next";
import { ALL_QUESTIONS } from "@/data/questions";
import { DashboardTabs } from "@/components/account/DashboardTabs";

export const metadata: Metadata = {
  title: "学習ダッシュボード",
  description:
    "概要・進捗・弱点・バッジ／ストリークの 4 タブで学習データを一望する統合ダッシュボード。",
  alternates: { canonical: "/account/dashboard" },
  robots: { index: false, follow: false },
};

export default function DashboardPage() {
  const categoryById: Record<string, string> = {};
  for (const q of ALL_QUESTIONS) categoryById[q.id] = q.category;
  return <DashboardTabs categoryById={categoryById} />;
}
