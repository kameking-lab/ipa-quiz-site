import type { Metadata } from "next";
import { HomePace } from "@/components/home/pace/HomePace";
import { getHomeDirectory } from "@/lib/home/home-directory";
import { planCatalogKeys } from "@/lib/study-plan/catalog-keys";
export const metadata: Metadata = { title: "学習計画を作成", alternates: { canonical: "/study-plan" } };
export default function StudyPlanPage() {
  const domains = getHomeDirectory();
  return <main className="mx-auto w-full max-w-[640px] flex-1 px-4 py-6"><HomePace domains={domains} planExamKeys={planCatalogKeys()} createOnLoad /></main>;
}
