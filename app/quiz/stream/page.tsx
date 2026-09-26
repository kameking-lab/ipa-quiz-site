import { defaultPracticeSession, parsePracticeSession, quizBackHref, PRACTICE_SESSIONS } from "@/lib/questions/practice-session";
import { PracticeSessionTabs } from "@/components/quiz/PracticeSessionTabs";
import type { Metadata } from "next";
import type { ExamCode } from "@/lib/questions/types";
import { getQuestionsForExam } from "@/lib/questions/get-questions";
import { filterQuestions } from "@/lib/questions/filter";
import { StreamQuizLoader } from "@/components/quiz/stream/StreamQuizLoader";
import { QuizModeTabs } from "@/components/quiz/QuizModeTabs";
import { EXAM_CONFIGS } from "@/lib/exam-config";

export const metadata: Metadata = {
  title: "ストリーム学習 — 自分のペースで連続演習",
  description:
    "問題を解き、解説を確認してから次へ進む連続学習モード。10問ごとに学習結果を振り返り、共有できます。",
  alternates: { canonical: "/quiz/stream" },
  robots: { index: false, follow: true },
};

const VALID_EXAMS = new Set<string>(["ap","ip","sg","fe","sc","nw","db","st","sa","pm","es","sm","au"]);
const STREAM_POOL_SIZE = 60;

interface SearchParams {
  exam?: string;
  topic?: string;
  category?: string;
  session?: string;
  returnTo?: string;
}

export default async function StreamQuizPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const sp = await searchParams;
  const exam = (VALID_EXAMS.has(sp.exam ?? "") ? sp.exam : "ap") as ExamCode;

  const all = await getQuestionsForExam(exam);
  const session = parsePracticeSession(sp.session) ?? defaultPracticeSession(exam);
  const sessions = PRACTICE_SESSIONS.filter((s) => all.some((q) => q.session === s));
  const pool = filterQuestions(all, {
    mode: "random",
    exam,
    session,
    topicTag: sp.topic,
    category: sp.category,
  })
    // ストリーム演習は1肢選択のUIのみ。「二つとも答えなさい」形式は /quiz と /q で解く。
    .filter((q) => (q.requiredSelections ?? 1) === 1)
    .slice(0, STREAM_POOL_SIZE);

  return (
    <>
      <h1 className="sr-only">{EXAM_CONFIGS[exam].nameFull} ストリーム過去問演習</h1>
      <QuizModeTabs active="stream" exam={exam} />
      <PracticeSessionTabs sessions={[...sessions]} selected={session} />
      <StreamQuizLoader pool={pool} backHref={quizBackHref({ exam, returnTo: sp.returnTo })} />
    </>
  );
}
