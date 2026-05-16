import type { Metadata } from "next";
import type { ExamCode } from "@/lib/questions/types";
import { getQuestionsForExam } from "@/lib/questions/get-questions";
import { filterQuestions } from "@/lib/questions/filter";
import { StreamQuizLoader } from "@/components/quiz/stream/StreamQuizLoader";
import { QuizModeTabs } from "@/components/quiz/QuizModeTabs";

export const metadata: Metadata = {
  title: "ストリーム学習 — TikTok風連続UI",
  description:
    "縦スワイプで次々と問題を解く、TikTok風の連続学習モード。10問ごとにWordle風サマリでシェア。",
  alternates: { canonical: "/quiz/stream" },
};

const VALID_EXAMS = new Set<string>(["ap","ip","sg","fe","sc","nw","db","st","sa","pm","es","sm","au"]);
const STREAM_POOL_SIZE = 60;

interface SearchParams {
  exam?: string;
  topic?: string;
  category?: string;
}

export default async function StreamQuizPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const sp = await searchParams;
  const exam = (VALID_EXAMS.has(sp.exam ?? "") ? sp.exam : "ap") as ExamCode;

  const all = await getQuestionsForExam(exam);
  const pool = filterQuestions(all, {
    mode: "random",
    exam,
    topicTag: sp.topic,
    category: sp.category,
  }).slice(0, STREAM_POOL_SIZE);

  return (
    <>
      <QuizModeTabs active="stream" exam={exam} />
      <StreamQuizLoader pool={pool} />
    </>
  );
}
