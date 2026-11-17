import type { Metadata } from "next";
import { HomePace } from "@/components/home/pace/HomePace";
import { getHomeDirectory } from "@/lib/home/home-directory";
export const metadata: Metadata = { title: "学習計画を作成", alternates: { canonical: "/study-plan" } };
export default function StudyPlanPage() {
  const domains = getHomeDirectory();
  return <main className="mx-auto w-full max-w-[640px] flex-1 px-4 py-6"><HomePace domains={domains} planExamKeys={domains.flatMap(d => [...d.featured, ...d.compact]).filter(i => i.questionCount > 0).map(i => i.key)} createOnLoad /></main>;
}
