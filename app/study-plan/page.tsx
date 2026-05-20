import type { Metadata } from "next";
import { StudyPlanLanding } from "./StudyPlanLanding";

export const metadata: Metadata = {
  title: "自動学習スケジュール作成",
  description:
    "試験日・現在の知識レベル・1日の学習可能時間を入力するだけで、IPA 13区分すべてに対応した個別最適の学習スケジュールを自動で生成します。",
  alternates: { canonical: "/study-plan" },
  robots: { index: true, follow: true },
};

export default function StudyPlanPage() {
  return <StudyPlanLanding />;
}
