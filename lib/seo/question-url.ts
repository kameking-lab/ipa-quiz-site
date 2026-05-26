import type { Question, Season, Session, ExamCode } from "@/lib/questions/types";

export interface QuestionRouteParams {
  exam: string;
  yearSeason: string;
  section: string;
  qnum: string;
}

export function questionPagePath(q: Pick<Question, "exam" | "year" | "season" | "session" | "qNumber">): string {
  return `/q/${q.exam}/${q.year}-${q.season}/${q.session}/q${q.qNumber}`;
}

export function parseQuestionRoute(params: QuestionRouteParams): {
  exam: ExamCode;
  year: number;
  season: Season;
  session: Session;
  qNumber: number;
} | null {
  const match = /^(\d{4})-(spring|autumn|cbt)$/.exec(params.yearSeason);
  if (!match) return null;
  const year = Number(match[1]);
  const season = match[2] as Season;

  const qMatch = /^q(\d+)$/.exec(params.qnum);
  if (!qMatch) return null;
  const qNumber = Number(qMatch[1]);

  return {
    exam: params.exam as ExamCode,
    year,
    season,
    session: params.section as Session,
    qNumber,
  };
}

function routeKey(
  exam: string,
  year: number,
  season: string,
  session: string,
  qNumber: number,
): string {
  return `${exam}/${year}-${season}/${session}/q${qNumber}`;
}

// O(1) route lookup. The /q/* page resolves the question twice per request
// (generateMetadata + the page body); on an ISR cache-miss that was two linear
// scans of ~14k questions. Index once per pool (keyed by array identity, so the
// stable module-level ALL_QUESTIONS array builds the map a single time and
// reuses it across requests) and look up by key thereafter. See
// logs/ttfb-optimization-2026-05-23.md.
const routeIndexByPool = new WeakMap<Question[], Map<string, Question>>();

function getRouteIndex(pool: Question[]): Map<string, Question> {
  let index = routeIndexByPool.get(pool);
  if (!index) {
    index = new Map();
    for (const q of pool) {
      index.set(routeKey(q.exam, q.year, q.season, q.session, q.qNumber), q);
    }
    routeIndexByPool.set(pool, index);
  }
  return index;
}

export function findQuestionByRoute(
  pool: Question[],
  params: QuestionRouteParams,
): Question | undefined {
  const parsed = parseQuestionRoute(params);
  if (!parsed) return undefined;
  return getRouteIndex(pool).get(
    routeKey(parsed.exam, parsed.year, parsed.season, parsed.session, parsed.qNumber),
  );
}
