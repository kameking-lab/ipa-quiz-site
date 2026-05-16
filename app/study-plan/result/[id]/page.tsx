import type { Metadata } from "next";
import { ScheduleResultClient } from "./ScheduleResultClient";

export const metadata: Metadata = {
  title: "学習スケジュール | 過去問AI",
  description: "生成された学習スケジュールを週単位で確認し、進捗を記録できます。",
  alternates: { canonical: "/study-plan" },
  robots: { index: false, follow: false },
};

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function StudyPlanResultPage({ params }: PageProps) {
  const { id } = await params;
  return <ScheduleResultClient planId={id} />;
}
