import type { Metadata } from "next";
import { StudyPlanLanding } from "./StudyPlanLanding";

export const metadata: Metadata = {
  title: "AI学習スケジュール作成 | 過去問AI",
  description:
    "試験日・現在の知識レベル・1日の学習可能時間を入力するだけで、IPA 13区分すべてに対応した個別最適の学習スケジュールをAIが生成します。",
  alternates: { canonical: "/study-plan" },
  robots: { index: true, follow: true },
};

export default function StudyPlanPage() {
  return <StudyPlanLanding />;
}
