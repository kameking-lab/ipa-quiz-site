import { describe, expect, it } from "vitest";

import { daysUntil } from "@/lib/learning/analytics";

/**
 * `daysUntil` must count whole *JST* calendar days to the exam date so the
 * tutor countdown (`buildExamMessage`) flips exactly at JST midnight. The old
 * implementation parsed the date-only string as UTC midnight and compared it to
 * the raw `now`, which made the count one too high during the JST 00:00–09:00
 * window (exam-day morning wrongly showed "あと1日" instead of "本日が試験日").
 */
describe("daysUntil (JST calendar-day countdown)", () => {
  const EXAM = "2024-01-15";

  it("returns 0 on the exam-day morning in JST (regression: was 1)", () => {
    // JST 2024-01-15 00:30 === UTC 2024-01-14 15:30.
    const nowJstMorning = Date.UTC(2024, 0, 14, 15, 30);
    expect(daysUntil(EXAM, nowJstMorning)).toBe(0);
  });

  it("counts whole days in the early-JST window (regression: 5, not 6)", () => {
    // JST 2024-01-10 08:00 === UTC 2024-01-09 23:00. Five calendar days to 01-15.
    const nowEarlyJst = Date.UTC(2024, 0, 9, 23, 0);
    expect(daysUntil(EXAM, nowEarlyJst)).toBe(5);
  });

  it("is stable across the JST day (afternoon matches morning)", () => {
    // JST 2024-01-10 20:00 === UTC 2024-01-10 11:00 — still five days out.
    const nowAfternoonJst = Date.UTC(2024, 0, 10, 11, 0);
    expect(daysUntil(EXAM, nowAfternoonJst)).toBe(5);
  });

  it("still shows 1 the night before, then flips to 0 at JST midnight", () => {
    // JST 2024-01-14 23:30 === UTC 2024-01-14 14:30.
    const eveBeforeMidnightJst = Date.UTC(2024, 0, 14, 14, 30);
    expect(daysUntil(EXAM, eveBeforeMidnightJst)).toBe(1);
    // 30 minutes later it is JST 2024-01-15 00:00 — the exam day.
    const atJstMidnight = Date.UTC(2024, 0, 14, 15, 0);
    expect(daysUntil(EXAM, atJstMidnight)).toBe(0);
  });

  it("never returns negative once the exam date has passed", () => {
    const afterExamJst = Date.UTC(2024, 0, 20, 3, 0);
    expect(daysUntil(EXAM, afterExamJst)).toBe(0);
  });

  it("returns 0 for an unparseable date string", () => {
    expect(daysUntil("not-a-date", Date.UTC(2024, 0, 10, 11, 0))).toBe(0);
  });
});
