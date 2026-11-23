import { hasSingleExamDay, sessionCountdownDates } from "./countdown";
import { tsuginoQualificationHref } from "./next-qualification";
import { dayNumber, EVERY_DAY, type PacePlan } from "./pace";
import { qualificationIdsForExam, type ExamScheduleSession } from "./schedule";

const MS_PER_DAY = 86_400_000;
const WEEKDAYS = ["SU", "MO", "TU", "WE", "TH", "FR", "SA"] as const;
const encoder = new TextEncoder();
const compact = (date: string) => date.replaceAll("-", "");
const dateValue = (day: number) => new Date(day * MS_PER_DAY).toISOString().slice(0, 10);
const text = (value: string) => value.replaceAll("\\", "\\\\").replace(/\r\n?|\n/g, "\\n").replace(/[;,]/g, "\\$&");

function fold(line: string): string {
  let output = "", bytes = 0;
  for (const character of line) {
    const size = encoder.encode(character).length;
    if (bytes + size > 75) { output += "\r\n "; bytes = 1; }
    output += character;
    bytes += size;
  }
  return output;
}

export function studyPlanCalendar(plan: PacePlan, name: string, origin: string, today: string, now = new Date(),
  sessions: readonly ExamScheduleSession[] = []) {
  const session = sessions.find(item => item.id === plan.sessionId);
  const dates = session && sessionCountdownDates(session, sessions);
  const end = plan.examDate && dayNumber(plan.examDate);
  const start = dayNumber(today);
  if (typeof end !== "number" || start === null || end < start) return null;
  const planStart = dayNumber(plan.startDate) ?? start;
  const days = [...new Set(plan.studyWeekdays ?? EVERY_DAY)].filter(day => WEEKDAYS[day]);
  const first = Array.from({ length: 7 }, (_, offset) => Math.max(start, planStart) + offset)
    .find(day => days.includes(new Date(day * MS_PER_DAY).getUTCDay()));
  const url = new URL("/quiz/today", origin);
  url.searchParams.set("plan", plan.id);
  const stamp = now.toISOString().replace(/[-:]|\.\d{3}/g, "");
  const event = (kind: string, summary: string, date: number, description: string, href: string, extra: string[] = []) => [
    "BEGIN:VEVENT", "UID:" + text(plan.id + "-" + kind + "@" + url.hostname), "DTSTAMP:" + stamp,
    "DTSTART;VALUE=DATE:" + compact(dateValue(date)), "SUMMARY:" + text(summary),
    "DESCRIPTION:" + text(description), "URL:" + href, ...extra, "END:VEVENT",
  ];
  const studyDescription = "計画の問題を解く\n" + url.href;
  const study = first !== undefined && first < end ? event("study", name + "の勉強", first, studyDescription, url.href, [
    "RRULE:FREQ=WEEKLY;BYDAY=" + days.map(day => WEEKDAYS[day]).join(",") + ";UNTIL=" + compact(dateValue(end - 1)),
  ]) : [];

  const ids = qualificationIdsForExam(plan.exam);
  const qualificationId = session?.qualificationId ?? (ids.length === 1 ? ids[0] : null);
  const scheduleUrl = qualificationId && tsuginoQualificationHref(qualificationId, "exam_schedule");
  const scheduleDescription = scheduleUrl ? "申込方法・最新の日程を次の資格で確認\n" + scheduleUrl : studyDescription;
  const examDay = (dates?.examDate ? dayNumber(dates.examDate) : null) ?? end;
  const examEstimated = dates?.examBasisYear || (!dates && plan.registration?.estimated) ||
    (session?.scheduleStatus === "tentative" && hasSingleExamDay(session) && session.examDate === plan.examDate);
  const exam = event("exam", name + "の試験" + (examEstimated ? "（見込み）" : ""), examDay, scheduleDescription, scheduleUrl || url.href);
  const saved = plan.registration?.sourceUrl && !plan.registration.estimated ? plan.registration : null;
  const registrationEvents = [
    { kind: "application-start", label: "申込開始", date: dates ? dates.applicationStart : saved?.start },
    { kind: "application-deadline", label: "申込締切", date: dates ? dates.applicationDeadline : saved?.deadline },
  ].flatMap(({ kind, label, date }) => {
    const day = date ? dayNumber(date) : null;
    if (day === null) return [];
    const summary = name + "の" + label + (dates?.applicationBasisYear ? "（見込み）" : "");
    const alarms = kind === "application-deadline" ? ["-P1D", "-P3D"].flatMap(trigger => [
      "BEGIN:VALARM", "TRIGGER:" + trigger, "ACTION:DISPLAY", "DESCRIPTION:" + text(summary), "END:VALARM",
    ]) : [];
    return event(kind, summary, day, scheduleDescription, scheduleUrl || url.href, alarms);
  });
  return ["BEGIN:VCALENDAR", "VERSION:2.0", "PRODID:-//Kakomon AI//Study Plan//JA", "CALSCALE:GREGORIAN",
    ...study, ...exam, ...registrationEvents, "END:VCALENDAR", ""].map(fold).join("\r\n");
}
