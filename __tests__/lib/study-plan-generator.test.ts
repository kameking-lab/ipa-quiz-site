import { afterEach, describe, expect, it, vi } from "vitest";
import {
  formatLocalDate,
  generateStudyPlan,
  isWeekend,
  listDates,
} from "@/lib/study-plan/generator";
import type { StudyPlanInput } from "@/lib/study-plan/types";

describe("formatLocalDate", () => {
  it("zero-pads month and day to YYYY-MM-DD", () => {
    // Constructed from a local-time string so the calendar day is TZ-stable.
    expect(formatLocalDate(new Date("2024-01-05T00:00:00"))).toBe("2024-01-05");
    expect(formatLocalDate(new Date("2024-12-31T00:00:00"))).toBe("2024-12-31");
    expect(formatLocalDate(new Date("2024-09-09T00:00:00"))).toBe("2024-09-09");
  });
});

describe("listDates", () => {
  it("returns the inclusive range from start to end", () => {
    expect(listDates("2024-01-01", "2024-01-04")).toEqual([
      "2024-01-01",
      "2024-01-02",
      "2024-01-03",
      "2024-01-04",
    ]);
  });

  it("returns a single day when from === to (inclusive)", () => {
    expect(listDates("2024-03-10", "2024-03-10")).toEqual(["2024-03-10"]);
  });

  it("crosses month and leap-year boundaries correctly", () => {
    expect(listDates("2024-02-27", "2024-03-01")).toEqual([
      "2024-02-27",
      "2024-02-28",
      "2024-02-29", // 2024 is a leap year
      "2024-03-01",
    ]);
  });

  it("returns [] when end is before start", () => {
    expect(listDates("2024-01-05", "2024-01-01")).toEqual([]);
  });

  it("returns [] for unparseable input", () => {
    expect(listDates("not-a-date", "2024-01-01")).toEqual([]);
    expect(listDates("2024-01-01", "garbage")).toEqual([]);
  });
});

describe("isWeekend", () => {
  it("is true for Saturday and Sunday, false for weekdays", () => {
    expect(isWeekend("2024-01-06")).toBe(true); // Saturday
    expect(isWeekend("2024-01-07")).toBe(true); // Sunday
    expect(isWeekend("2024-01-08")).toBe(false); // Monday
    expect(isWeekend("2024-01-10")).toBe(false); // Wednesday
    expect(isWeekend("2024-01-12")).toBe(false); // Friday
  });
});

describe("generateStudyPlan", () => {
  afterEach(() => {
    vi.useRealTimers();
  });

  const baseInput: StudyPlanInput = {
    exam: "ip",
    examDate: "2024-02-01",
    level: "beginner",
    weekdayMinutes: 60,
    weekendMinutes: 120,
    weakCategories: [],
  };

  function planAt(now: string, input: StudyPlanInput = baseInput) {
    vi.useFakeTimers();
    vi.setSystemTime(new Date(now));
    return generateStudyPlan(input);
  }

  it("excludes the exam day itself from the study schedule", () => {
    // today 2024-01-01 .. exam 2024-02-01 inclusive = 32 days; minus exam day = 31.
    const plan = planAt("2024-01-01T12:00:00");
    expect(plan.daily).toHaveLength(31);
    expect(plan.summary.daysRemaining).toBe(31);
    // Last study day is the day before the exam, never the exam date.
    expect(plan.daily.map((d) => d.date)).not.toContain("2024-02-01");
    expect(plan.daily[plan.daily.length - 1].date).toBe("2024-01-31");
  });

  it("produces an empty schedule when the exam date is today (no study days)", () => {
    const plan = planAt("2024-02-01T12:00:00");
    expect(plan.daily).toHaveLength(0);
    expect(plan.summary.daysRemaining).toBe(0);
  });

  it("produces an empty schedule when the exam date is in the past", () => {
    const plan = planAt("2024-03-01T12:00:00");
    expect(plan.daily).toHaveLength(0);
  });

  it("assigns phases in non-decreasing early→middle→late order", () => {
    const plan = planAt("2024-01-01T12:00:00");
    const rank = { early: 0, middle: 1, late: 2 };
    let prev = -1;
    for (const day of plan.daily) {
      const r = rank[day.phase];
      expect(r).toBeGreaterThanOrEqual(prev);
      prev = r;
    }
    // Schedule starts in the early phase and ends in the late phase.
    expect(plan.daily[0].phase).toBe("early");
    expect(plan.daily[plan.daily.length - 1].phase).toBe("late");
  });

  it("gives every task a unique stable key", () => {
    const plan = planAt("2024-01-01T12:00:00");
    const keys = plan.daily.flatMap((d) => d.tasks.map((t) => t.key));
    expect(keys.length).toBeGreaterThan(0);
    expect(new Set(keys).size).toBe(keys.length);
  });

  it("budgets weekend days higher than weekdays per the inputs", () => {
    const plan = planAt("2024-01-01T12:00:00");
    for (const day of plan.daily) {
      expect(day.budgetMinutes).toBe(day.isWeekend ? 120 : 60);
    }
  });

  it("scales required hours down for higher knowledge levels", () => {
    const beginner = planAt("2024-01-01T12:00:00", {
      ...baseInput,
      level: "beginner",
    });
    const review = planAt("2024-01-01T12:00:00", {
      ...baseInput,
      level: "final-review",
    });
    // final-review multiplier (0.25) < beginner (1.0): fewer required hours.
    expect(review.summary.totalHoursRequired).toBeLessThan(
      beginner.summary.totalHoursRequired,
    );
  });
});
