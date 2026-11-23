import { japanDate } from "@/lib/home/featured-exams";
import { dateCountdown, registrationTiming, sessionCountdownDates } from "./countdown";
import { dayNumber } from "./pace";
import { isRedundantScheduleEstimate, qualificationIdsForExam, type ExamScheduleSession } from "./schedule";

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

export function examTopSchedule(exam: string, search: ReferralSearch, sessions: readonly ExamScheduleSession[], today: string) {
  const incomingDate = examDateFromSearch(search, today);
  const schedules = sessions.flatMap(session => {
    if (!session.qualificationId || session.scheduleStatus === "ondemand" || isRedundantScheduleEstimate(session, sessions)) return [];
    const dates = sessionCountdownDates(session, sessions);
    const windows = session.scheduleStatus === "official" && !session.unannounced && session.sourceUrl &&
      session.examDate && session.examDate >= today && session.datePrecision !== "unknown" && !dates.examDate
      ? session.examPhaseWindows?.length ? session.examPhaseWindows : [{
        label: "", start: session.datePrecision === "month" ? session.examDate.slice(0, 7) : session.examDate,
        end: session.examDateEnd === session.examDate ? null : session.examDateEnd,
      }]
      : [];
    const examCountdown = dateCountdown(dates.examDate, today, dates.examBasisYear);
    const registration = registrationTiming(dates.applicationStart, dates.applicationDeadline, today, dates.applicationBasisYear);
    const orderDate = dates.examDate ?? windows[0]?.start ?? dates.applicationDeadline ?? dates.applicationStart;
    if (!orderDate || (!examCountdown && !windows.length &&
      (orderDate < today || registration.state === "closed"))) return [];
    return [{ orderDate, examCountdown, windows, registration, dates,
      qualificationId: session.qualificationId, sessionId: session.id }];
  }).sort((a, b) => a.orderDate.localeCompare(b.orderDate) ||
    Number(!!a.examCountdown?.basisYear) - Number(!!b.examCountdown?.basisYear));

  if (!incomingDate) return schedules[0] ?? null;
  return schedules.find(schedule => schedule.examCountdown?.date === incomingDate) ?? {
    examCountdown: dateCountdown(incomingDate, today),
    qualificationId: qualificationIdsForExam(exam)[0] ?? null,
  };
}

export function planCreatedHref(id: string) {
  return "/#plan-created=" + encodeURIComponent(id);
}
