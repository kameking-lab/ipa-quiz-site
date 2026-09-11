import type { Metadata } from "next";
import Link from "next/link";
import { SafetyLearningProgress } from "@/components/exam-library/SafetyLearningProgress";
export const metadata: Metadata = { title: "安全衛生の学習進捗・復習", robots: { index: false, follow: false } };
export default function SafetyProgressPage() {
  return <main className="mx-auto w-full max-w-3xl px-4 py-6"><Link href="/e-learning/exams" className="inline-flex min-h-11 items-center text-sm text-muted-foreground">← 安全の試験一覧</Link><h1 className="mb-6 mt-3 text-2xl font-bold">安全衛生の学習進捗・復習</h1><SafetyLearningProgress /></main>;
}
