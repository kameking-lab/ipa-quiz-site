import type { Metadata } from "next";
import { TotalAnswerCounter } from "@/components/home/TotalAnswerCounter";
import { getHomeDirectory } from "@/lib/home/home-directory";

export const metadata: Metadata = { title: "自習室", robots: { index: false, follow: true } };

export default function StudyRoomPage() {
  const suggestions = getHomeDirectory().flatMap(domain => [...domain.featured, ...domain.compact])
    .filter(item => item.questionCount > 0).map(item => ({ name: item.name, exam: item.key, href: item.href }));
  return <main className="mx-auto w-full max-w-3xl flex-1 px-4 pb-12 pt-6 sm:px-6">
    <TotalAnswerCounter suggestions={suggestions} standalone />
  </main>;
}
