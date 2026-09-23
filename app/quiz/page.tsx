import { defaultPracticeSession, parsePracticeSession, quizBackHref, PRACTICE_SESSIONS } from "@/lib/questions/practice-session";
import { PracticeSessionTabs } from "@/components/quiz/PracticeSessionTabs";
import { ALL_QUIZ_EXAM_CODES, EXAM_CONFIGS } from "@/lib/exam-config";
import type { Metadata } from "next";
import type { ExamCode, QuizFilter, QuizMode, Season } from "@/lib/questions/types";
import { getExplicitPoolIds, getPoolIds } from "@/lib/questions/pool-server";
import { getQuestionsForExam } from "@/lib/questions/get-questions";
import { QuizClient } from "./QuizClient";
import { QuizModeTabs } from "@/components/quiz/QuizModeTabs";

// /quiz is the interactive quiz player (app shell), not an SEO landing.
// next.config.ts 308-redirects bare /quiz to "/" (no `mode` query), so the
// previous `canonical:/quiz` + `index:true` pair was self-defeating: Google
// resolved the declared canonical, followed the 308 to "/", and consolidated
// every /quiz?mode=… page's signals into the homepage anyway — while `index:
// true` was dead (Google cannot index a URL that 308s). The /q/* static pages
// are the indexable surface for question content; this player URL is for
// human/agent navigation only.
//
// Honest signals now: noindex (do not try to index this URL) + follow (let
// link equity flow out to the real content) + canonical:"/" (match the 308
// destination so signals consolidate where they actually land, instead of
// pointing Google at a URL that redirects away).
export const metadata: Metadata = {
  title: "クイズ — 過去問演習",
  description:
    "IPA情報処理技術者試験とFP3級の公式公開過去問をランダム・年度別・分野別・復習・未回答・苦手の6モードで演習。AIコパイロットが各選択肢を解説します。",
  alternates: { canonical: "/" },
  robots: { index: false, follow: true },
};

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
  /**
   * Optional pool cap. The home "3問だけ試す" CTA and the onboarding tour send
   * `limit=3` for the '3問体験' flow; without this server-side slice the
   * QuizPlayer's progress counter said '1問目 / 80問中' instead of '1問目 / 3問中'.
   */
  limit?: string;
  returnTo?: string;
  source?: string;
  ids?: string | string[];
  /** Serialized /search filters, retained for diagnostics and shareability. */
  search?: string;
}

const VALID_MODES: QuizMode[] = ["random", "year", "topic", "review", "unanswered", "weakness"];
const MODE_LABELS: Record<QuizMode, string> = {
  random: "ランダム",
  year: "年度別",
  topic: "分野別",
  review: "復習",
  unanswered: "未回答",
  weakness: "苦手",
};

export default async function QuizPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const sp = await searchParams;
  const mode = (VALID_MODES.includes(sp.mode as QuizMode) ? sp.mode : "random") as QuizMode;


  const examGroup = sp.examGroup
    ? (sp.examGroup
        .split(",")
        .map((s) => s.trim())
        .filter((s): s is ExamCode => ALL_QUIZ_EXAM_CODES.includes(s as ExamCode)))
    : undefined;
  const categoryGroup = sp.categoryGroup
    ? sp.categoryGroup
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean)
    : undefined;

  const exam: ExamCode = ALL_QUIZ_EXAM_CODES.includes(sp.exam as ExamCode) ? sp.exam as ExamCode : "ap";
  const isSearchPool = sp.source === "search";
  const session = isSearchPool
    ? undefined
    : parsePracticeSession(sp.session) ?? (examGroup?.length ? undefined : defaultPracticeSession(exam, sp.year ? Number(sp.year) : undefined));
  const examQuestions = await getQuestionsForExam(exam);
  const sessions = PRACTICE_SESSIONS.filter((s) => examQuestions.some((q) => q.session === s && (!sp.year || q.year === Number(sp.year)) && (!sp.season || q.season === sp.season)));
  const filter: QuizFilter = {
    mode,
    exam: examGroup?.length ? undefined : exam,
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

  // Search-origin sessions carry an exact, bounded set. Invalid or stale IDs
  // are discarded and an invalid payload fails closed to the empty state.
  const fullPoolIds = isSearchPool
    ? await getExplicitPoolIds(sp.ids ?? "")
    : await getPoolIds(filter);
  // Honor the optional limit query (the home 3問体験 CTA sends limit=3).
  // Cap at 200 so a malformed value cannot make the page hang.
  const limit = sp.limit ? Math.max(1, Math.min(200, Number(sp.limit) || 0)) : 0;
  const poolIds = limit > 0 ? fullPoolIds.slice(0, limit) : fullPoolIds;
  const backHref = quizBackHref({ exam, mode, returnTo: sp.returnTo });

  let categoryById: Record<string, string> | undefined;
  if (mode === "weakness") {
    const examQuestions = await getQuestionsForExam(exam);
    categoryById = {};
    for (const q of examQuestions) categoryById[q.id] = q.category;
  }

  return (
    <>
      <h1 className="sr-only">
        {isSearchPool
          ? "検索結果から選んだ過去問演習"
          : `${EXAM_CONFIGS[exam].nameFull} ${MODE_LABELS[mode]}過去問演習`}
      </h1>
      {!isSearchPool && <QuizModeTabs active={mode} exam={exam} />}
      {!isSearchPool && !examGroup?.length && <PracticeSessionTabs sessions={[...sessions]} selected={session} />}
      <QuizClient
        poolIds={poolIds}
        mode={mode}
        backHref={backHref}
        backLabel={isSearchPool ? "検索結果に戻る" : undefined}
        exam={isSearchPool ? "search" : exam}
        completionLabel={isSearchPool ? "検索結果から選んだ問題" : undefined}
        completionShareHref={isSearchPool ? backHref : undefined}
        categoryById={categoryById}
      />
    </>
  );
}
