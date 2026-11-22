import { japanDate } from "@/lib/home/featured-exams";
import { dayNumber } from "./pace";
import { qualificationIdsForExam, type ExamScheduleSession } from "./schedule";

const progression: Record<string, readonly string[]> = {
  ip: ["fe"], fe: ["ap"], ap: ["sc", "nw", "db"], fp3: ["fp2"], fp2: ["fp1"],
  denko2: ["denko1"], denken3: ["denken2"], denken2: ["denken1"], kankoji2: ["kankoji1"],
  civil2: ["civil1"], zoen2: ["zoen1"], takken: ["kanri", "chintai"],
};

const relatedFields = [
  ["ip", "sg", "fe", "ap", "sc", "nw", "db", "st", "sa", "pm", "sm", "es", "au"],
  ["takken", "kanri", "chintai", "mankan"],
  ["fp3", "fp2", "fp1"],
  ["denko2", "denko1", "denken3", "denken2", "denken1"],
  ["kankoji2", "kankoji1", "civil2", "civil1", "zoen2", "zoen1"],
] as const;

export function nextQualificationKeys(exam: string) {
  const priority = Object.hasOwn(progression, exam) ? progression[exam] : [];
  const field = relatedFields.find(group => group.some(key => key === exam)) ?? [];
  return { priority: priority.filter(key => qualificationIdsForExam(key).length > 0),
    nearby: field.filter(key => key !== exam && !priority.includes(key) && qualificationIdsForExam(key).length > 0) };
}

export function tsuginoQualificationHref(qualificationId: string | null, campaign: "next" | "exam_schedule") {
  const path = qualificationId ? "/shikaku/" + encodeURIComponent(qualificationId) : "/calendar";
  return "https://tsugino-shikaku.jp" + path + "?" + new URLSearchParams({ utm_source: "kakomon", utm_campaign: campaign });
}

export function nextDatedSession(sessions: readonly ExamScheduleSession[], today = japanDate(new Date())) {
  return sessions.filter(session => session.scheduleStatus === "official" && !session.unannounced &&
    session.sourceUrl && session.examDate && (session.examDateEnd ?? session.examDate) >= today)
    .sort((a, b) => a.examDate!.localeCompare(b.examDate!))[0];
}

export function planReferral(search: { getAll(key: string): string[] }, keys: readonly string[], today: string) {
  const [exam, ...extraExams] = search.getAll("plan");
  const [examDate, ...extraDates] = search.getAll("examDate");
  return exam && examDate && !extraExams.length && !extraDates.length && keys.includes(exam)
    && dayNumber(examDate) !== null && examDate >= today ? { exam, examDate } : null;
}
