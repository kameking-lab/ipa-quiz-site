import { japanDate } from "@/lib/home/featured-exams";
import { dayNumber } from "./pace";
import { qualificationIdsForExam, type ExamScheduleSession } from "./schedule";

const progression: Record<string, readonly string[]> = {
  ip: ["fe"], fe: ["ap"], ap: ["sc", "nw", "db"], fp3: ["fp2"], fp2: ["fp1"],
  denko2: ["denko1"], denken3: ["denken2"], denken2: ["denken1"], kankoji2: ["kankoji1"],
  civil2: ["civil1"], zoen2: ["zoen1"], denki2: ["denki1"], tsushin2: ["tsushin1"], kenki2: ["kenki1"],
  "sekou-kenchiku2": ["sekou-1kenchiku"], takken: ["kanri", "chintai"],
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
    session.sourceUrl && session.examDate && session.examDate >= today)
    .sort((a, b) => a.examDate!.localeCompare(b.examDate!))[0];
}

type ReferralSearch = { getAll(key: string): string[] };

export function examDateFromSearch(search: ReferralSearch, today: string, allowToday = false) {
  const [examDate, ...extraDates] = search.getAll("examDate");
  if (!examDate || extraDates.length || dayNumber(examDate) === null) return null;
  return examDate > today || (allowToday && examDate === today) ? examDate : null;
}

export function planReferral(search: ReferralSearch, keys: readonly string[], today: string) {
  const [exam, ...extraExams] = search.getAll("plan");
  const examDate = examDateFromSearch(search, today, true);
  return exam && examDate && !extraExams.length && keys.includes(exam) ? { exam, examDate } : null;
}

export function examTopPlanDate(exam: string, search: ReferralSearch, sessions: readonly ExamScheduleSession[], today: string) {
  const incomingDate = examDateFromSearch(search, today);
  const singleDays = sessions.filter(session => session.examDate && session.examDate > today &&
    (!incomingDate || session.examDate === incomingDate) && session.datePrecision !== "month" &&
    (!session.examDateEnd || session.examDateEnd === session.examDate) && !session.examPhaseWindows?.length);
  const session = nextDatedSession(singleDays, today);
  const examDate = incomingDate ?? session?.examDate;
  if (!examDate) return null;

  return {
    examDate,
    daysUntil: dayNumber(examDate)! - dayNumber(today)!,
    qualificationId: session?.qualificationId ?? qualificationIdsForExam(exam)[0] ?? null,
  };
}

export function planCreatedHref(id: string) {
  return "/#plan-created=" + encodeURIComponent(id);
}
