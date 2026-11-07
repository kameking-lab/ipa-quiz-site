import type { Metadata } from "next";
import { StudyPlanLanding } from "./StudyPlanLanding";
import { getQuestionsForExam } from "@/lib/questions/get-questions";
import { isPracticeReadyQuestion } from "@/lib/questions/filter";
import { defaultPracticeSession } from "@/lib/questions/practice-session";
import type { IpaExamCode } from "@/lib/questions/types";

export const metadata: Metadata = {
  title: "自動学習スケジュール作成",
  description:
    "学習期間・現在の知識レベル・1日の学習可能時間を選ぶと、IPA 情報処理技術者試験 13 区分に対応した学習スケジュールを生成します。試験日と申込締切は次の資格で確認できます。",
  alternates: { canonical: "/study-plan" },
  robots: { index: true, follow: true },
};

export default async function StudyPlanPage() {
  const exams: IpaExamCode[] = ["ip", "sg", "fe", "ap", "st", "sa", "pm", "nw", "db", "es", "sc", "sm", "au"];
  const categoriesByExam = Object.fromEntries(await Promise.all(exams.map(async (exam) => {
    const questions = await getQuestionsForExam(exam);
    return [exam, [...new Set(questions.filter((q) => q.session === defaultPracticeSession(exam) && isPracticeReadyQuestion(q)).map((q) => q.category))]];
  })));
  return <StudyPlanLanding categoriesByExam={categoriesByExam} />;
}
