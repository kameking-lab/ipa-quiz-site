import { QUALIFICATION_HUBS } from "@/lib/exam-qualification-hubs";
import { EXAM_LABELS } from "@/lib/utils";
import { QUALIFICATION_CATALOG } from "@/lib/qualifications/catalog";

export const PRESENCE_WINDOW_MS = 120_000;
export const PRESENCE_POLL_MS = 30_000;
export const PRESENCE_EVENT = "study-presence-count";
export const PRESENCE_EXAM_ATTRIBUTE = "data-study-presence-exam";

// Reuse public Japanese names; never display an unrecognised code as a name.
const aliases: Record<string, string> = { "dai-1-shu-eisei-kanrisha": "eisei1", "dai-2-shu-eisei-kanrisha": "eisei2" };
const names = new Map(Object.entries(EXAM_LABELS));
for (const hub of QUALIFICATION_HUBS) names.set(aliases[hub.slug] ?? hub.slug, hub.name);
export function canonicalPresenceExam(code: string): string | null {
  const exam = aliases[code] ?? code;
  return names.has(exam) ? exam : null;
}
for (const entry of QUALIFICATION_CATALOG) {
  const code = entry.examCode ?? entry.slug;
  if (entry.status === "live") names.set(code, entry.shortName);
  else names.delete(code);
}
export function presenceExamName(exam: string): string | undefined { return names.get(aliases[exam] ?? exam); }

export interface StudyPresenceCount { exam: string; count: number }
export interface StudyPresenceSnapshot { count: number; exams: StudyPresenceCount[] }

export function parseStudyPresence(value: unknown): StudyPresenceSnapshot | null {
  if (!value || typeof value !== "object") return null;
  const data = value as Record<string, unknown>;
  if (!Number.isSafeInteger(data.count) || (data.count as number) < 0 || !Array.isArray(data.exams)) return null;
  const exams: StudyPresenceCount[] = [];
  const seen = new Set<string>();
  for (const item of data.exams) {
    if (!item || typeof item !== "object") return null;
    const row = item as Record<string, unknown>;
    if (typeof row.exam !== "string" || !presenceExamName(row.exam) || seen.has(row.exam) ||
        !Number.isSafeInteger(row.count) || (row.count as number) <= 0) return null;
    seen.add(row.exam);
    exams.push({ exam: row.exam, count: row.count as number });
  }
  if (exams.reduce((total, row) => total + row.count, 0) !== data.count) return null;
  exams.sort((a, b) => b.count - a.count || a.exam.localeCompare(b.exam, "en"));
  return { count: data.count as number, exams };
}

export function isActiveStudyTab(visible: boolean, lastActivity: number, now: number) {
  return visible && now - lastActivity < PRESENCE_WINDOW_MS;
}

export function isPresenceBot(userAgent: string): boolean {
  return /bot|crawler|spider|headless|playwright|puppeteer|lighthouse|monitor|health-check/i.test(userAgent);
}
