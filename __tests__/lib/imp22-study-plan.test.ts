import { describe, expect, it } from "vitest";
import { studyPlanCalendar } from "@/lib/study-plan/calendar";
import { examTopSchedule, planReferral, nextQualificationKeys } from "@/lib/study-plan/next-qualification";
import { createPacePlan } from "@/lib/study-plan/pace";
import { parseRegistration } from "@/lib/study-plan/schedule";

describe("learning calendar", () => {
  it("starts on the first selected weekday, repeats through the day before the exam, and links to both actions", () => {
    const plan = createPacePlan({ id: "plan-demo", exam: "sc", examDate: "2026-12-16", sessionId: null,
      startDate: "2026-12-02", studyWeekdays: [1, 5] }, [], "2026-12-02T02:00:00Z");
    const content = studyPlanCalendar(plan, "情報処理安全確保支援士", "https://www.kakomon-ai.jp", "2026-12-02", new Date("2026-12-02T02:00:00Z"));
    expect(content).not.toBeNull();
    const unfolded = content!.replaceAll("\r\n ", "");
    expect(unfolded).toContain("DTSTART;VALUE=DATE:20261204\r\n");
    expect(unfolded).toContain("DTSTART;VALUE=DATE:20261216\r\n");
    expect(unfolded).toContain("RRULE:FREQ=WEEKLY;BYDAY=MO,FR;UNTIL=20261215");
    expect(unfolded).toContain("URL:https://www.kakomon-ai.jp/quiz/today?plan=plan-demo");
    expect(unfolded).toContain("URL:https://tsugino-shikaku.jp/shikaku/sc?utm_source=kakomon&utm_campaign=exam_schedule");
    expect(content!.split("\r\n").every(line => new TextEncoder().encode(line).length <= 75)).toBe(true);
  });

  const origin = "https://www.kakomon-ai.jp";
  const today = "2026-12-02";
  const now = new Date("2026-12-02T02:00:00Z");
  const plan = createPacePlan({ id: "calendar", exam: "sc", examDate: "2026-12-16", sessionId: "next",
    startDate: today }, [], now.toISOString());
  const official = { id: "next", label: "2026年度", fiscalYear: "2026", scheduleStatus: "official",
    examDate: "2026-12-16", applicationStart: "2026-12-01", applicationDeadline: "2026-12-10",
    sourceUrl: "https://www.ipa.go.jp/shiken/" };
  const parse = (...sessions: object[]) => parseRegistration({ id: "sc", sessions }, "sc");
  const calendar = (sessions: ReturnType<typeof parse>, savedPlan = plan) =>
    studyPlanCalendar(savedPlan, "支援士", origin, today, now, sessions)!.replaceAll("\r\n ", "");

  it("exports confirmed study, exam and registration dates with both alerts on the deadline only", () => {
    const content = calendar(parse(official));
    expect(content.match(/BEGIN:VEVENT/g)).toHaveLength(4);
    expect(content).toMatch(/DTSTART;VALUE=DATE:20261216\r\nSUMMARY:支援士の試験\r\n/);
    expect(content).toMatch(/DTSTART;VALUE=DATE:20261201\r\nSUMMARY:支援士の申込開始\r\n/);
    expect(content).toMatch(/DTSTART;VALUE=DATE:20261210\r\nSUMMARY:支援士の申込締切\r\n/);
    const events = content.split("BEGIN:VEVENT");
    expect(events.filter(event => event.includes("BEGIN:VALARM"))).toEqual([events[4]]);
    expect(events[4].match(/BEGIN:VALARM/g)).toHaveLength(2);
    expect(events[4]).toContain("TRIGGER:-P1D\r\nACTION:DISPLAY");
    expect(events[4]).toContain("TRIGGER:-P3D\r\nACTION:DISPLAY");
    const scheduleUrl = "https://tsugino-shikaku.jp/shikaku/sc?utm_source=kakomon&utm_campaign=exam_schedule";
    for (const event of events.slice(2)) {
      expect(event).toContain("\\n" + scheduleUrl + "\r\nURL:" + scheduleUrl);
    }
  });

  it("exports estimates from the preceding official round and marks only the estimated events", () => {
    const content = calendar(parse(
      { id: "next", label: "2026年度", fiscalYear: "2026", scheduleStatus: "missing", sourceUrl: null },
      { ...official, id: "prior", label: "2025年度", fiscalYear: "2025", examDate: "2025-12-17",
        applicationStart: "2025-12-01", applicationDeadline: "2025-12-11" },
    ));
    expect(content.match(/BEGIN:VEVENT/g)).toHaveLength(4);
    expect(content).toMatch(/DTSTART;VALUE=DATE:20261217\r\nSUMMARY:支援士の試験（見込み）/);
    expect(content).toMatch(/DTSTART;VALUE=DATE:20261201\r\nSUMMARY:支援士の申込開始（見込み）/);
    expect(content).toMatch(/DTSTART;VALUE=DATE:20261211\r\nSUMMARY:支援士の申込締切（見込み）/);
    expect(content).toContain("SUMMARY:支援士の勉強\r\n");
  });

  it("keeps a saved sourced deadline when the schedule is unavailable and skips unsupported estimates", () => {
    const registration = { label: official.label, start: null, deadline: official.applicationDeadline,
      resultDate: null, sourceUrl: official.sourceUrl, estimated: false };
    const content = calendar([], { ...plan, registration });
    expect(content.match(/BEGIN:VEVENT/g)).toHaveLength(3);
    expect(content).toContain("SUMMARY:支援士の申込締切\r\n");
    const uncertain = calendar([], { ...plan, registration: { ...registration, estimated: true } });
    expect(uncertain.match(/BEGIN:VEVENT/g)).toHaveLength(2);
    expect(uncertain).toContain("SUMMARY:支援士の試験（見込み）\r\n");
  });
});

describe("exam hub study plan date", () => {
  const today = "2026-11-22";
  const fixed = { id: "fixed", label: "固定日", scheduleStatus: "official", examDate: "2027-02-28",
    sourceUrl: "https://www.ipa.go.jp/shiken/" };
  const sessions = parseRegistration({ id: "kihon-joho", sessions: [fixed] }, "kihon-joho");
  const resolve = (query: string, dates = sessions) => examTopSchedule("fe", new URLSearchParams(query), dates, today);

  it("uses a single valid future query date even without an API date", () => {
    expect(resolve("examDate=2026-12-01")).toMatchObject({ examCountdown: { date: "2026-12-01", days: 9 } });
    expect(resolve("examDate=2028-02-29", [])?.examCountdown?.date).toBe("2028-02-29");
    expect(resolve("examDate=2027-02-28")?.qualificationId).toBe("kihon-joho");
  });

  it.each(["", "2027-02-29", "2027-2-28", "2027-02-28T00:00:00Z", "2026-11-21", "2026-11-22",
    "2027-03-01&examDate=2027-03-01"])("falls back to an official API date for query value %s", value => {
    expect(resolve("examDate=" + value)).toMatchObject({ examCountdown: { date: "2027-02-28", days: 98 }, qualificationId: "kihon-joho" });
  });

  it("uses the next announced window and skips unsourced projections, past and on-demand sessions", () => {
    const otherSessions = parseRegistration({ id: "kihon-joho", sessions: [
      { ...fixed, id: "later", examDate: "2027-03-30" },
      { ...fixed, id: "tentative", examDate: "2027-01-05", scheduleStatus: "tentative" },
      { ...fixed, id: "past", examDate: "2026-11-21" },
      { ...fixed, id: "month", examDate: "2027-01-01", datePrecision: "month" },
      { ...fixed, id: "range", examDate: "2027-01-01", examDateEnd: "2027-01-31" },
      { ...fixed, id: "phased", examDate: "2027-02-01",
        examPhaseWindows: [{ label: "科目A", start: "2027-02-01", end: "2027-02-10" }] },
      { ...fixed, id: "ondemand", examDate: null, scheduleStatus: "ondemand" },
    ] }, "kihon-joho");
    expect(resolve("", [...otherSessions, ...sessions])).toMatchObject({
      examCountdown: null, windows: [{ start: "2027-01", end: null }],
    });
    expect(resolve("", otherSessions.filter(session => session.id === "tentative" || session.id === "ondemand"))).toBeNull();
    expect(resolve("", otherSessions.filter(session => session.id === "past"))).toBeNull();
    expect(resolve("examDate=invalid", [])).toBeNull();
  });
});

describe("Tsugino qualification links", () => {
  it("uses both incoming values and rejects ambiguous or invalid dates", () => {
    const parse = (params: string) => planReferral(new URLSearchParams(params), ["fe"], "2026-11-22");
    expect(parse("plan=fe&examDate=2027-02-28&utm_source=tsugino")).toEqual({ exam: "fe", examDate: "2027-02-28" });
    for (const query of ["plan=bad&examDate=2027-02-28", "plan=fe&examDate=2027-02-29", "plan=fe&examDate=2026-11-21",
      "plan=fe", "plan=fe&plan=ap&examDate=2027-02-28"]) expect(parse(query)).toBeNull();
  });

  it("puts the stated qualification progression first", () => {
    expect(nextQualificationKeys("fe").priority).toEqual(["ap"]);
    expect(nextQualificationKeys("ap").priority).toEqual(["sc", "nw", "db"]);
    expect(nextQualificationKeys("takken").priority).toEqual(["kanri", "chintai"]);
  });
});
