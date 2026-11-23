import "server-only";
import fallback from "@/lib/home/featured-official.json";
import { fallbackSessions, parseRegistration, qualificationIdsForExam, type ExamSchedule, type ExamScheduleSession } from "./schedule";

export const SCHEDULE_CACHE_SECONDS = 3600;
/** Fixed origin and allowlisted ids; neither a URL nor an upstream path is accepted from callers. */
export async function getExamSchedule(exam: string, fetcher: typeof fetch = fetch): Promise<ExamSchedule> {
  const ids = qualificationIdsForExam(exam);
  const sessions: ExamScheduleSession[] = [];
  const unavailable: string[] = [];
  // Sequential calls avoid bursts for qualifications with multiple schedule providers.
  for (const id of ids) {
    try {
      const response = await fetcher(`https://tsugino-shikaku.jp/api/qualification-registration/${encodeURIComponent(id)}`, {
        cache: "force-cache", next: { revalidate: SCHEDULE_CACHE_SECONDS }, signal: AbortSignal.timeout(5000),
        headers: { Accept: "application/json" }, redirect: "error",
      });
      if (!response.ok) throw new Error("schedule_unavailable");
      sessions.push(...parseRegistration(await response.json(), id));
    } catch { unavailable.push(id); }
  }
  if (sessions.length) return { exam, qualificationIds: ids, source: "tsugino", sessions, unavailableQualificationIds: unavailable };
  const local = fallbackSessions(exam, fallback);
  return { exam, qualificationIds: ids, source: local.length ? "fallback" : "manual", sessions: local, unavailableQualificationIds: unavailable };
}
