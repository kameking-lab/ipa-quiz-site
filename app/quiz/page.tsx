import type { ExamCode, QuizFilter, QuizMode, Season, Session } from "@/lib/questions/types";
import { getPoolIds } from "@/lib/questions/pool-server";
import { QuizClient } from "./QuizClient";

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

const VALID_MODES: QuizMode[] = ["random", "year", "topic", "review", "unanswered"];
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

  const filter: QuizFilter = {
    mode,
    exam: examGroup ? undefined : ((sp.exam as ExamCode | undefined) ?? "ap"),
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

  return <QuizClient poolIds={poolIds} mode={mode} backHref="/" />;
}
