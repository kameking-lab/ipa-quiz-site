import { dayNumber, EVERY_DAY, type PacePlan } from "./pace";

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

export function studyPlanCalendar(plan: PacePlan, name: string, origin: string, today: string, now = new Date()) {
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
  const event = (kind: string, summary: string, date: number, repeat: string[] = []) => [
    "BEGIN:VEVENT", "UID:" + text(plan.id + "-" + kind + "@" + url.hostname), "DTSTAMP:" + stamp,
    "DTSTART;VALUE=DATE:" + compact(dateValue(date)), "SUMMARY:" + text(summary),
    "DESCRIPTION:" + text("計画の問題を解く\n" + url.href), "URL:" + url.href, ...repeat, "END:VEVENT",
  ];
  const study = first !== undefined && first < end ? event("study", name + "の勉強", first, [
    "RRULE:FREQ=WEEKLY;BYDAY=" + days.map(day => WEEKDAYS[day]).join(",") + ";UNTIL=" + compact(dateValue(end - 1)),
  ]) : [];
  return ["BEGIN:VCALENDAR", "VERSION:2.0", "PRODID:-//Kakomon AI//Study Plan//JA", "CALSCALE:GREGORIAN",
    ...study, ...event("exam", name + "の試験", end), "END:VCALENDAR", ""].map(fold).join("\r\n");
}
