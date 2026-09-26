import type { Question, QuestionPart, Season, Session, ExamCode } from "@/lib/questions/types";

export interface QuestionRouteParams {
  exam: string;
  yearSeason: string;
  section: string;
  qnum: string;
}

/** URLの問番号部分。枝問は `q15a`、電験二種の空欄は `q1-3`（問1の空欄(3)）。 */
export function questionNumberSegment(qNumber: number, part?: QuestionPart): string {
  if (!part) return `q${qNumber}`;
  return /^\d$/.test(part) ? `q${qNumber}-${part}` : `q${qNumber}${part}`;
}

/** 枝問(a)/(b)は電験三種、空欄番号(1)〜(5)は電験二種だけが使う。 */
const PART_EXAMS: Record<"letter" | "blank", readonly string[]> = {
  letter: ["denken3"],
  blank: ["denken2"],
};

export function parseQuestionNumberSegment(exam: string, qnum: string): { qNumber: number; part?: QuestionPart } | null {
  const match = /^q(\d+)(?:([ab])|-([1-5]))?$/.exec(qnum);
  if (!match) return null;
  const qNumber = Number(match[1]);
  if (match[2]) return PART_EXAMS.letter.includes(exam) ? { qNumber, part: match[2] as QuestionPart } : null;
  if (match[3]) return PART_EXAMS.blank.includes(exam) ? { qNumber, part: match[3] as QuestionPart } : null;
  return { qNumber };
}

export function questionPagePath(q: Pick<Question, "exam" | "year" | "season" | "session" | "qNumber"> & Partial<Pick<Question, "part">>): string {
  return `/q/${q.exam}/${q.year}-${q.season}/${q.session}/${questionNumberSegment(q.qNumber, q.part)}`;
}

export function parseQuestionRoute(params: QuestionRouteParams): {
  exam: ExamCode;
  year: number;
  season: Season;
  session: Session;
  qNumber: number;
  part?: QuestionPart;
} | null {
  const match = /^(\d{4})-(spring|autumn|cbt|published|first|second|early|may|september|january|october|late|annual|primary|kansai)$/.exec(params.yearSeason);
  if (!match) return null;
  const year = Number(match[1]);
  const season = match[2] as Season;

  const segment = parseQuestionNumberSegment(params.exam, params.qnum);
  if (!segment) return null;
  const { qNumber, part } = segment;

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
  part?: QuestionPart,
): string {
  return `${exam}/${year}-${season}/${session}/${questionNumberSegment(qNumber, part)}`;
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
