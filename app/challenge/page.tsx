import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { ALL_QUIZ_EXAM_CODES } from "@/lib/exam-config";
import type { ExamCode } from "@/lib/questions/types";
import { getHomeDirectory } from "@/lib/home/home-directory";
import { BrowseQualifications } from "@/components/home/pace/BrowseQualifications";
import { QualificationGroupOptions } from "@/components/qualifications/QualificationGroupOptions";
import { getPublishedQualificationGroups } from "@/lib/qualifications/published-groups";

export const metadata: Metadata = {
  title: "資格を選んで過去問に挑戦",
  description: "受験する資格を選んで、その資格の過去問に取り組めます。",
  alternates: { canonical: "/challenge" },
};

export default async function DailyChallengePage({ searchParams }: { searchParams: Promise<{ exam?: string; group?: string }> }) {
  const { exam, group: slug } = await searchParams;
  if (exam && ALL_QUIZ_EXAM_CODES.includes(exam as ExamCode)) redirect(`/quiz?mode=random&exam=${encodeURIComponent(exam)}&limit=5`);
  const row = slug && getPublishedQualificationGroups().find(({ group }) => group.slug === slug);
  if (row) {
    const { group } = row;
    const children = row.children.map(({ item, label }) => ({ label, item: ALL_QUIZ_EXAM_CODES.includes(item.key as ExamCode)
      ? { ...item, href: `/challenge?${new URLSearchParams({ exam: item.key })}` } : item }));
    return <QualificationGroupOptions name={group.name} selectLabel={group.selectLabel} options={children} backHref="/challenge" backLabel="チャレンジする資格を選ぶ" />;
  }
  const domains = getHomeDirectory();
  return <main className="mx-auto w-full max-w-[640px] flex-1 px-4 py-6 sm:px-6">
    <h1 className="mb-6 text-2xl font-bold">チャレンジする資格を選ぶ</h1>
    <BrowseQualifications domains={domains} challengeExamCodes={ALL_QUIZ_EXAM_CODES} />
  </main>;
}
