import { describe, expect, it } from "vitest";
import { calculatePace, createPacePlan } from "@/lib/study-plan/pace";
import { japanDate } from "@/lib/home/featured-exams";

describe("JST study days instead of a separate review calendar", () => {
  const questions = [{ exam: "ip", id: "q", year: 2026 }];
  const plan = createPacePlan({ id: "p", exam: "ip", sessionId: null, startDate: "2026-05-31",
    examDate: "2026-06-01", studyWeekdays: [0] }, questions, "2026-05-30T15:00:00Z");
  it.each([
    ["2026-05-30T14:59:59Z", "2026-05-30", 1, false],
    ["2026-05-30T15:00:00Z", "2026-05-31", 1, true],
    ["2026-05-31T14:59:59Z", "2026-05-31", 1, true],
    ["2026-05-31T15:00:00Z", "2026-06-01", 0, false],
  ] as const)("counts the same Saturday/Sunday boundary in JST (%s)", (iso, date, studyDays, scheduledToday) => {
    const now = new Date(iso), today = japanDate(now);
    expect(today).toBe(date);
    expect(calculatePace(plan, questions, [], today, now.getTime())).toMatchObject({ studyDays, scheduledToday });
  });
});
