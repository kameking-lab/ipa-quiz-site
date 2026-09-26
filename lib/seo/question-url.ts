import type { Question, Season, Session, ExamCode } from "@/lib/questions/types";

export interface QuestionRouteParams {
  exam: string;
  yearSeason: string;
  section: string;
  qnum: string;
}

export function questionPagePath(q: Pick<Question, "exam" | "year" | "season" | "session" | "qNumber"> & Partial<Pick<Question, "part">>): string {
  return `/q/${q.exam}/${q.year}-${q.season}/${q.session}/q${q.qNumber}${q.part ?? ""}`;
}

export function parseQuestionRoute(params: QuestionRouteParams): {
  exam: ExamCode;
  year: number;
  season: Season;
  session: Session;
  qNumber: number;
  part?: "a" | "b";
} | null {
  const match = /^(\d{4})-(spring|autumn|cbt|published|first|second|early|may|september|january|october|late|annual|july)$/.exec(params.yearSeason);
  if (!match) return null;
  const year = Number(match[1]);
  const season = match[2] as Season;

  const qMatch = /^q(\d+)([ab])?$/.exec(params.qnum);
  if (!qMatch) return null;
  const qNumber = Number(qMatch[1]);
  const part = qMatch[2] as "a" | "b" | undefined;
  if (part && params.exam !== "denken3") return null;

  return {
    exam: params.exam as ExamCode,
    year,
    season,
    session: params.section as Session,
    qNumber,
    ...(part ? { part } : {}),
  };
}

function routeKey(
  exam: string,
  year: number,
  season: string,
  session: string,
  qNumber: number,
  part?: "a" | "b",
): string {
  return `${exam}/${year}-${season}/${session}/q${qNumber}${part ?? ""}`;
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
      index.set(routeKey(q.exam, q.year, q.season, q.session, q.qNumber, q.part), q);
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
    routeKey(parsed.exam, parsed.year, parsed.season, parsed.session, parsed.qNumber, parsed.part),
  );
}
