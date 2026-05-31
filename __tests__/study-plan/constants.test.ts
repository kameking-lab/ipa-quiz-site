import { describe, it, expect } from "vitest";
import {
  REQUIRED_HOURS,
  LEVEL_MULTIPLIERS,
  LEVEL_LABELS,
  LEVEL_DESCRIPTIONS,
  PHASE_RATIOS,
  MINUTES_PER_QUESTION,
  MINUTES_PER_BLOG,
  MINUTES_PER_ESSAY,
  MINUTES_PER_MOCK_SMALL,
  MINUTES_PER_MOCK_FULL,
  MIN_WEEKDAY_MINUTES,
  MAX_WEEKDAY_MINUTES,
  MIN_WEEKEND_MINUTES,
  MAX_WEEKEND_MINUTES,
} from "@/lib/study-plan/constants";
import type { ExamCode } from "@/lib/questions/types";
import type { KnowledgeLevel } from "@/lib/study-plan/types";

/**
 * Characterization tests for the study-plan constants — the single source of
 * truth that drives generateStudyPlan (totalHoursRequired = REQUIRED_HOURS[exam]
 * × LEVEL_MULTIPLIERS[level]) and the phase split (generator slices the schedule
 * at PHASE_RATIOS.early / .early+.middle). A drift in any of these silently
 * skews every generated plan, so the invariants are pinned here.
 */

// Canonical exam codes — must mirror ExamCode in lib/questions/types.ts.
const ALL_EXAM_CODES: ExamCode[] = [
  "ip",
  "sg",
  "fe",
  "ap",
  "st",
  "sa",
  "pm",
  "nw",
  "db",
  "es",
  "sc",
  "sm",
  "au",
];

const ALL_LEVELS: KnowledgeLevel[] = [
  "beginner",
  "foundation",
  "learner",
  "final-review",
];

describe("study-plan/constants REQUIRED_HOURS", () => {
  it("covers every ExamCode with a positive integer baseline", () => {
    const keys = Object.keys(REQUIRED_HOURS).sort();
    expect(keys).toEqual([...ALL_EXAM_CODES].sort());
    for (const code of ALL_EXAM_CODES) {
      const hours = REQUIRED_HOURS[code];
      expect(Number.isInteger(hours)).toBe(true);
      expect(hours).toBeGreaterThan(0);
    }
  });

  it("pins the published baseline hours (entry-level < FE < AP < advanced)", () => {
    expect(REQUIRED_HOURS.ip).toBe(40);
    expect(REQUIRED_HOURS.sg).toBe(65);
    expect(REQUIRED_HOURS.fe).toBe(125);
    expect(REQUIRED_HOURS.ap).toBe(250);
    // Difficulty ordering reflected by hours.
    expect(REQUIRED_HOURS.ip).toBeLessThan(REQUIRED_HOURS.sg);
    expect(REQUIRED_HOURS.sg).toBeLessThan(REQUIRED_HOURS.fe);
    expect(REQUIRED_HOURS.fe).toBeLessThan(REQUIRED_HOURS.ap);
    expect(REQUIRED_HOURS.ap).toBeLessThan(REQUIRED_HOURS.nw);
  });
});

describe("study-plan/constants LEVEL_* records", () => {
  it("multipliers cover every level and descend from the beginner baseline", () => {
    expect(Object.keys(LEVEL_MULTIPLIERS).sort()).toEqual(
      [...ALL_LEVELS].sort(),
    );
    // beginner is the 完全初心者 baseline = full required hours.
    expect(LEVEL_MULTIPLIERS.beginner).toBe(1.0);
    expect(LEVEL_MULTIPLIERS.foundation).toBe(0.75);
    expect(LEVEL_MULTIPLIERS.learner).toBe(0.5);
    expect(LEVEL_MULTIPLIERS["final-review"]).toBe(0.25);
    // Strictly decreasing as prior knowledge increases.
    const ordered = ALL_LEVELS.map((lv) => LEVEL_MULTIPLIERS[lv]);
    for (let i = 1; i < ordered.length; i++) {
      expect(ordered[i]).toBeLessThan(ordered[i - 1]);
    }
    // Every multiplier scales down (or holds) — never inflates the baseline.
    for (const lv of ALL_LEVELS) {
      expect(LEVEL_MULTIPLIERS[lv]).toBeGreaterThan(0);
      expect(LEVEL_MULTIPLIERS[lv]).toBeLessThanOrEqual(1.0);
    }
  });

  it("labels and descriptions cover every level with non-empty UI strings", () => {
    expect(Object.keys(LEVEL_LABELS).sort()).toEqual([...ALL_LEVELS].sort());
    expect(Object.keys(LEVEL_DESCRIPTIONS).sort()).toEqual(
      [...ALL_LEVELS].sort(),
    );
    for (const lv of ALL_LEVELS) {
      expect(LEVEL_LABELS[lv].length).toBeGreaterThan(0);
      expect(LEVEL_DESCRIPTIONS[lv].length).toBeGreaterThan(0);
    }
    expect(LEVEL_LABELS.beginner).toBe("完全初心者");
  });
});

describe("study-plan/constants PHASE_RATIOS", () => {
  it("sums to exactly 1.0 so the generator's phase split covers the whole span", () => {
    const sum = PHASE_RATIOS.early + PHASE_RATIOS.middle + PHASE_RATIOS.late;
    expect(sum).toBeCloseTo(1.0, 10);
  });

  it("front-loads study effort (early > middle > late)", () => {
    expect(PHASE_RATIOS.early).toBeGreaterThan(PHASE_RATIOS.middle);
    expect(PHASE_RATIOS.middle).toBeGreaterThan(PHASE_RATIOS.late);
    expect(PHASE_RATIOS.early).toBe(0.6);
    expect(PHASE_RATIOS.middle).toBe(0.3);
    expect(PHASE_RATIOS.late).toBe(0.1);
  });
});

describe("study-plan/constants minute budgets", () => {
  it("pins per-task minute estimates as positive integers", () => {
    expect(MINUTES_PER_QUESTION).toBe(3);
    expect(MINUTES_PER_BLOG).toBe(10);
    expect(MINUTES_PER_ESSAY).toBe(15);
    expect(MINUTES_PER_MOCK_SMALL).toBe(60);
    expect(MINUTES_PER_MOCK_FULL).toBe(150);
    // A full 80問 mock must cost more than a 20問 small mock.
    expect(MINUTES_PER_MOCK_FULL).toBeGreaterThan(MINUTES_PER_MOCK_SMALL);
  });

  it("keeps daily-minute bounds ordered and weekend ceiling >= weekday", () => {
    expect(MIN_WEEKDAY_MINUTES).toBeLessThan(MAX_WEEKDAY_MINUTES);
    expect(MIN_WEEKEND_MINUTES).toBeLessThan(MAX_WEEKEND_MINUTES);
    expect(MAX_WEEKEND_MINUTES).toBeGreaterThanOrEqual(MAX_WEEKDAY_MINUTES);
    expect(MIN_WEEKDAY_MINUTES).toBe(15);
    expect(MAX_WEEKDAY_MINUTES).toBe(480);
    expect(MIN_WEEKEND_MINUTES).toBe(15);
    expect(MAX_WEEKEND_MINUTES).toBe(720);
  });
});
