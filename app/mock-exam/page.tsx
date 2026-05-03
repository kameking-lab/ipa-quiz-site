import type { Metadata } from "next";
import { getAllQuestions } from "@/lib/questions/load";
import { MockExamClient } from "./MockExamClient";
import type { ExamCode } from "@/lib/questions/types";
import { QuizModeTabs } from "@/components/quiz/QuizModeTabs";

export const metadata: Metadata = {
  title: "模擬試験モード",
  description: "実際の試験と同じ問題数・制限時間で受験できる模擬試験モード。スコアと合格ライン判定付き。",
  robots: { index: false, follow: false },
};

type SearchParams = { exam?: string };

export default async function MockExamPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const sp = await searchParams;
  const initialExam = (sp.exam ?? "ap") as ExamCode;
  const allQuestions = getAllQuestions();

  return (
    <>
      <QuizModeTabs active="mock" exam={initialExam} />
      <main className="mx-auto w-full max-w-2xl px-4 py-10">
        <div className="mb-6">
          <h1 className="text-2xl font-bold tracking-tight">模擬試験モード</h1>
          <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
            実際の試験と同じ問題数・制限時間で受験できます。タイマーが切れると自動採点されます。
          </p>
        </div>
        <MockExamClient initialExam={initialExam} allQuestions={allQuestions} />
      </main>
    </>
  );
}
