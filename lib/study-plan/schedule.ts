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
  scheduleStatus: z.enum(["official", "tentative", "ondemand"]), sourceUrl: sourceUrl.nullable(),
  verifiedDate: nullableDate, datePrecision: z.string().nullable().optional(),
  applicationEstimated: z.boolean().optional().default(false), estimateLabel: z.string().nullable().optional(),
});
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
  exams: readonly { key: string; checkedAt?: string; dates?: readonly { date: string; endDate?: string; note?: string; sourceUrl: string }[] }[];
}
export function fallbackSessions(exam: string, fallback: OfficialFallback): ExamScheduleSession[] {
  const entry = fallback.exams.find(item => item.key === exam);
  return (entry?.dates ?? []).flatMap((item, i) => {
    if (dayNumber(item.date) === null || !sourceUrl.safeParse(item.sourceUrl).success) return [];
    return [{ id: `fallback-${exam}-${i}`, label: item.note ?? item.date, qualificationId: null,
      applicationStart: null, applicationDeadline: null, examDate: item.date, examDateEnd: item.endDate ?? null,
      resultDate: null, examPhaseWindows: [], scheduleStatus: "official" as const, sourceUrl: item.sourceUrl,
      verifiedDate: entry?.checkedAt ?? fallback.checkedAt, applicationEstimated: false }];
  });
}
