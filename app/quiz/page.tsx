import type { ExamCode, QuizFilter, QuizMode, Season, Session } from "@/lib/questions/types";
import { getPoolIds } from "@/lib/questions/pool-server";
import { getQuestionsForExam } from "@/lib/questions/get-questions";
import { QuizClient } from "./QuizClient";
import { QuizModeTabs } from "@/components/quiz/QuizModeTabs";

interface SearchParams {
  mode?: string;
  exam?: string;
  examGroup?: string;
  year?: string;
  season?: string;
  session?: string;
  topic?: string;
  category?: string;
  categoryGroup?: string;
  calc?: string;
  order?: string;
}

const VALID_MODES: QuizMode[] = ["random", "year", "topic", "review", "unanswered", "weakness"];
const VALID_SESSIONS: Session[] = ["am", "am1", "am2", "pm", "pm1", "pm2", "kamoku-a", "kamoku-b"];

export default async function QuizPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const sp = await searchParams;
  const mode = (VALID_MODES.includes(sp.mode as QuizMode) ? sp.mode : "random") as QuizMode;
  const session = VALID_SESSIONS.includes(sp.session as Session)
    ? (sp.session as Session)
    : undefined;

  const examGroup = sp.examGroup
    ? (sp.examGroup
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean) as ExamCode[])
    : undefined;
  const categoryGroup = sp.categoryGroup
    ? sp.categoryGroup
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean)
    : undefined;

  const exam = (sp.exam as ExamCode | undefined) ?? "ap";
  const filter: QuizFilter = {
    mode,
    exam: examGroup ? undefined : exam,
    examGroup,
    year: sp.year ? Number(sp.year) : undefined,
    season: sp.season as Season | undefined,
    session,
    topicTag: sp.topic,
    category: sp.category,
    categoryGroup,
    calculationOnly: sp.calc === "1",
    inOrder: sp.order === "1",
  };

  const poolIds = await getPoolIds(filter);

  let categoryById: Record<string, string> | undefined;
  if (mode === "weakness") {
    const examQuestions = await getQuestionsForExam(exam);
    categoryById = {};
    for (const q of examQuestions) categoryById[q.id] = q.category;
  }

  return (
    <>
      <QuizModeTabs active={mode} exam={exam} />
      <QuizClient
        poolIds={poolIds}
        mode={mode}
        backHref="/"
        exam={exam}
        categoryById={categoryById}
      />
    </>
  );
}
