import type { Metadata } from "next";
import { Dashboard } from "@/components/account/Dashboard";

export const metadata: Metadata = {
  title: "学習ダッシュボード",
  description:
    "総問題数・学習時間・連続日数・予測合格率・分野別習熟度レーダー・試験別合格確率を一目で確認できる Apple Health スタイルダッシュボード。",
  alternates: { canonical: "/account/dashboard" },
  robots: { index: false, follow: false },
};

export default function DashboardPage() {
  return <Dashboard />;
}
