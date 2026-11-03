import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { ALL_QUIZ_EXAM_CODES } from "@/lib/exam-config";
import type { ExamCode } from "@/lib/questions/types";
import { getHomeDirectory } from "@/lib/home/home-directory";
import { HomeQualificationFinder } from "@/components/home/landing/HomeQualificationFinder";
import "../home-study.css";

export const metadata: Metadata = {
  title: "資格を選んで過去問に挑戦",
  description: "受験する資格を選んで、その資格の過去問に取り組めます。",
  alternates: { canonical: "/challenge" },
};

export default async function DailyChallengePage({ searchParams }: { searchParams: Promise<{ exam?: string }> }) {
  const { exam } = await searchParams;
  if (exam && ALL_QUIZ_EXAM_CODES.includes(exam as ExamCode)) redirect(`/quiz?mode=random&exam=${encodeURIComponent(exam)}&limit=5`);
  const domains = getHomeDirectory();
  return <main className="study-home mx-auto w-full max-w-2xl px-5 py-8">
    <Link href="/" className="study-text-link">トップへ戻る</Link>
    <header className="study-heading mb-8"><h1>受ける資格の、過去問を。</h1><p className="study-caption">資格を選ぶと、その資格の問題だけを解けます。</p></header>
    <HomeQualificationFinder domains={domains} directoryHref="/#home-directory-title" />
  </main>;
}