import type { ExamCode, QuizFilter, QuizMode, Season } from "@/lib/questions/types";
import { getPoolIds } from "@/lib/questions/pool-server";
import { QuizClient } from "./QuizClient";

interface SearchParams {
  mode?: string;
  exam?: string;
  year?: string;
  season?: string;
  topic?: string;
  category?: string;
  calc?: string;
  order?: string;
}

const VALID_MODES: QuizMode[] = ["random", "year", "topic", "review", "unanswered"];

export default async function QuizPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const sp = await searchParams;
  const mode = (VALID_MODES.includes(sp.mode as QuizMode) ? sp.mode : "random") as QuizMode;

  const filter: QuizFilter = {
    mode,
    exam: (sp.exam as ExamCode | undefined) ?? "ap",
    year: sp.year ? Number(sp.year) : undefined,
    season: sp.season as Season | undefined,
    topicTag: sp.topic,
    category: sp.category,
    calculationOnly: sp.calc === "1",
    inOrder: sp.order === "1",
  };

  const poolIds = await getPoolIds(filter);

  return <QuizClient poolIds={poolIds} mode={mode} backHref="/" />;
}
