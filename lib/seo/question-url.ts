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

export function findQuestionByRoute(
  pool: Question[],
  params: QuestionRouteParams,
): Question | undefined {
  const parsed = parseQuestionRoute(params);
  if (!parsed) return undefined;
  return pool.find(
    (q) =>
      q.exam === parsed.exam &&
      q.year === parsed.year &&
      q.season === parsed.season &&
      q.session === parsed.session &&
      q.qNumber === parsed.qNumber,
  );
}
