import { describe, expect, it } from "vitest";
import { studyPlanCalendar } from "@/lib/study-plan/calendar";
import { examTopPlanDate, planReferral, nextQualificationKeys } from "@/lib/study-plan/next-qualification";
import { createPacePlan } from "@/lib/study-plan/pace";
import { parseRegistration } from "@/lib/study-plan/schedule";

describe("learning calendar", () => {
  it("starts on the first selected weekday, repeats through the day before the exam, and includes the plan URL twice", () => {
    const plan = createPacePlan({ id: "plan-demo", exam: "sc", examDate: "2026-12-16", sessionId: null,
      startDate: "2026-12-02", studyWeekdays: [1, 5] }, [], "2026-12-02T02:00:00Z");
    const content = studyPlanCalendar(plan, "情報処理安全確保支援士", "https://www.kakomon-ai.jp", "2026-12-02", new Date("2026-12-02T02:00:00Z"));
    expect(content).not.toBeNull();
    const unfolded = content!.replaceAll("\r\n ", "");
    expect(unfolded).toContain("DTSTART;VALUE=DATE:20261204\r\n");
    expect(unfolded).toContain("DTSTART;VALUE=DATE:20261216\r\n");
    expect(unfolded).toContain("RRULE:FREQ=WEEKLY;BYDAY=MO,FR;UNTIL=20261215");
    expect(unfolded.match(/URL:https:\/\/www\.kakomon-ai\.jp\/quiz\/today\?plan=plan-demo/g)).toHaveLength(2);
    expect(content!.split("\r\n").every(line => new TextEncoder().encode(line).length <= 75)).toBe(true);
  });
});

describe("exam hub study plan date", () => {
  const today = "2026-11-22";
  const fixed = { id: "fixed", label: "固定日", scheduleStatus: "official", examDate: "2027-02-28",
    sourceUrl: "https://www.ipa.go.jp/shiken/" };
  const sessions = parseRegistration({ id: "kihon-joho", sessions: [fixed] }, "kihon-joho");
  const resolve = (query: string, dates = sessions) => examTopPlanDate("fe", new URLSearchParams(query), dates, today);

  it("uses a single valid future query date even without an API date", () => {
    expect(resolve("examDate=2026-12-01")).toMatchObject({ examDate: "2026-12-01", daysUntil: 9 });
    expect(resolve("examDate=2028-02-29", [])?.examDate).toBe("2028-02-29");
    expect(resolve("examDate=2027-02-28")?.qualificationId).toBe("kihon-joho");
  });

  it.each(["", "2027-02-29", "2027-2-28", "2027-02-28T00:00:00Z", "2026-11-21", "2026-11-22",
    "2027-03-01&examDate=2027-03-01"])("falls back to an official API date for query value %s", value => {
    expect(resolve("examDate=" + value)).toEqual({ examDate: "2027-02-28", daysUntil: 98, qualificationId: "kihon-joho" });
  });

  it("uses the next confirmed single day and skips tentative, past and incomplete dates", () => {
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
    expect(resolve("", [...otherSessions, ...sessions])?.examDate).toBe("2027-02-28");
    expect(resolve("", otherSessions.slice(1))).toBeNull();
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
