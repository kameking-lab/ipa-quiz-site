import { z } from "zod";
import mapping from "./qualification-map.json";
import { dayNumber } from "./pace";

const isoDate = z.string().refine(value => dayNumber(value) !== null);
const nullableDate = z.preprocess(value => value === "" || value === "tbd" ? null : value, isoDate.nullable()).optional().transform(value => value ?? null);
const sourceUrl = z.string().url().refine(value => /^https?:\/\//.test(value));
const phaseSchema = z.object({ label: z.string(), start: isoDate, end: isoDate });
const sessionSchema = z.object({
  id: z.string(), label: z.string(), fiscalYear: z.string().optional(), applicationStart: nullableDate,
  applicationDeadline: nullableDate, examDate: nullableDate, examDateEnd: nullableDate, resultDate: nullableDate,
  examPhaseWindows: z.array(phaseSchema).optional().default([]),
  scheduleStatus: z.enum(["official", "tentative", "ondemand", "missing"]), sourceUrl: sourceUrl.nullable(),
  verifiedDate: nullableDate, datePrecision: z.string().nullable().optional(),
  applicationEstimated: z.boolean().optional().default(false), estimateLabel: z.string().nullable().optional(),
}).transform(session => ({ ...session, scheduleStatus: session.scheduleStatus === "missing" ? "tentative" as const : session.scheduleStatus,
  unannounced: session.scheduleStatus === "missing" }));
export type ExamScheduleSession = z.infer<typeof sessionSchema> & { qualificationId: string | null };
const registrationSchema = z.object({ id: z.string(), sessions: z.array(sessionSchema) });
export interface ExamSchedule {
  exam: string;
  qualificationIds: string[];
  source: "tsugino" | "fallback" | "manual";
  sessions: ExamScheduleSession[];
  /** One qualification may fail while others succeed. */
  unavailableQualificationIds: string[];
}
export function qualificationIdsForExam(exam: string): string[] {
  return Object.hasOwn(mapping.qualifications, exam)
    ? [...(mapping.qualifications as Record<string, string[]>)[exam]] : [];
}
export function parseRegistration(value: unknown, qualificationId: string): ExamScheduleSession[] {
  const parsed = registrationSchema.parse(value);
  if (parsed.id !== qualificationId) throw new Error("wrong_qualification");
  if (parsed.sessions.some(session => !session.sourceUrl && (session.examDate || session.applicationStart || session.applicationDeadline ||
    session.resultDate || session.examDateEnd || session.examPhaseWindows.length))) throw new Error("missing_schedule_source");
  return parsed.sessions.map(session => ({ ...session, qualificationId }));
}
export interface OfficialFallback {
  checkedAt: string;
  exams: readonly { key: string; checkedAt?: string; scheduleMode?: string; scheduleSourceUrl?: string;
    dates?: readonly { date: string; endDate?: string; note?: string; sourceUrl: string }[] }[];
}
export function fallbackSessions(exam: string, fallback: OfficialFallback): ExamScheduleSession[] {
  const entry = fallback.exams.find(item => item.key === exam);
  if (entry?.scheduleMode === "ondemand" && sourceUrl.safeParse(entry.scheduleSourceUrl).success) {
    return [{ id: `fallback-${exam}-ondemand`, label: "随時受験", qualificationId: null,
      applicationStart: null, applicationDeadline: null, examDate: null, examDateEnd: null, resultDate: null,
      examPhaseWindows: [], scheduleStatus: "ondemand", sourceUrl: entry.scheduleSourceUrl!,
      verifiedDate: entry.checkedAt ?? fallback.checkedAt, applicationEstimated: false, unannounced: false }];
  }
  return (entry?.dates ?? []).flatMap((item, i) => {
    if (dayNumber(item.date) === null || !sourceUrl.safeParse(item.sourceUrl).success) return [];
    return [{ id: `fallback-${exam}-${i}`, label: item.note ?? item.date, qualificationId: null,
      applicationStart: null, applicationDeadline: null, examDate: item.date, examDateEnd: item.endDate ?? null,
      resultDate: null, examPhaseWindows: [], scheduleStatus: "official" as const, sourceUrl: item.sourceUrl,
      verifiedDate: entry?.checkedAt ?? fallback.checkedAt, applicationEstimated: false, unannounced: false }];
  });
}

function sessionYear(session: ExamScheduleSession): number | null {
  const year = session.fiscalYear ?? session.label.normalize("NFKC").match(/\b(20\d{2})\s*年/)?.[1] ?? session.examDate?.slice(0, 4);
  return year && /^20\d{2}$/.test(year) ? Number(year) : null;
}

function sessionRound(session: ExamScheduleSession): string {
  const label = session.label.normalize("NFKC");
  const number = label.match(/第\s*(\d+)\s*回/)?.[1];
  const term = label.match(/前期|後期|上期|下期|春期|秋期|春季|秋季/)?.[0];
  return [term?.replace(/春季|上期/g, "前期").replace(/秋季|下期/g, "後期").replace("春期", "前期").replace("秋期", "後期"), number]
    .filter(Boolean).join("/");
}

/** Project dates only when the same qualification and round are identifiable in adjacent years. */
export function estimateFromPreviousSession(session: ExamScheduleSession, sessions: readonly ExamScheduleSession[]) {
  const year = sessionYear(session);
  if (year === null || !session.qualificationId || session.scheduleStatus === "ondemand") return null;
  const round = sessionRound(session);
  const sameRound = sessions.filter(candidate => candidate.qualificationId === session.qualificationId && sessionRound(candidate) === round);
  // A generated annual summary can accompany the one actual upcoming annual session.
  const current = sameRound.filter(candidate => sessionYear(candidate) === year && !candidate.id.includes(":estimate-"));
  const previous = sameRound.filter(candidate => sessionYear(candidate) === year - 1 && candidate.scheduleStatus === "official");
  if (current.length > 1 || previous.length !== 1) return null;
  if (!round && sessions.some(candidate => candidate.qualificationId === session.qualificationId &&
    (sessionYear(candidate) === year || sessionYear(candidate) === year - 1) && sessionRound(candidate))) return null;

  const basis = previous[0];
  if (!basis.sourceUrl) return null;
  const nextYear = (date: string | null) => {
    if (!date) return null;
    const shifted = `${Number(date.slice(0, 4)) + 1}${date.slice(4)}`;
    return dayNumber(shifted) === null ? null : shifted;
  };
  const singleDay = basis.datePrecision !== "month" && basis.datePrecision !== "unknown" &&
    !basis.examPhaseWindows?.length && (!basis.examDateEnd || basis.examDateEnd === basis.examDate);
  return {
    basisYear: year - 1,
    examDate: singleDay ? nextYear(basis.examDate) : null,
    applicationStart: basis.applicationEstimated ? null : nextYear(basis.applicationStart),
    applicationDeadline: basis.applicationEstimated ? null : nextYear(basis.applicationDeadline),
  };
}
