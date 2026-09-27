import type { Metadata } from "next";
import { StudyPlanLanding } from "./StudyPlanLanding";

export const metadata: Metadata = {
  title: "自動学習スケジュール作成",
  description:
    "学習期間・現在の知識レベル・1日の学習可能時間を選ぶと、IPA 情報処理技術者試験 13 区分に対応した学習スケジュールを生成します。試験日と申込締切は次の資格で確認できます。",
  alternates: { canonical: "/study-plan" },
  robots: { index: true, follow: true },
};

export default function StudyPlanPage() {
  return <StudyPlanLanding />;
}
