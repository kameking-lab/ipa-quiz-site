import { describe, expect, it } from "vitest";
import { studyPlanCalendar } from "@/lib/study-plan/calendar";
import { planReferral, nextQualificationKeys } from "@/lib/study-plan/next-qualification";
import { createPacePlan } from "@/lib/study-plan/pace";

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
