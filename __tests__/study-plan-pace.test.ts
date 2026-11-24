import { describe, expect, it } from "vitest";
import { calculatePace, createPacePlan, dayNumber, latestAnswers, planOldestYear, rangeOptions, weakQuestions,
  type AnswerAttempt, type PlanQuestion } from "@/lib/study-plan/pace";
import { createActiveClock, dailyLearningPoints, japanDate, mergeLearningActions, type LearningAction } from "@/lib/study-plan/activity";
import { passingLineForExam, planOutfitForExam, planPolicyWarnings } from "@/lib/study-plan/policy";

const exam = "ap";
const today = "2026-11-16";
const now = Date.parse(today + "T12:00:00+09:00");
const catalog = (count: number): PlanQuestion[] => Array.from({ length: count }, (_, i) => ({ id: "q" + i, exam, year: 2026 - i }));
const build = (bank: PlanQuestion[], examDate: string | null = "2026-11-26", studyWeekdays?: number[], year?: number) =>
  createPacePlan({ id: "p", exam, examDate, sessionId: null, startDate: today, studyWeekdays }, bank, new Date(now).toISOString(), year);
const answer = (id: string, correct: boolean, at = now - 1000): AnswerAttempt => ({ id, correct, at });

describe("catalog and saved range", () => {
  it.each([[0, [], 0], [3, [3], 3], [5, [5], 5], [8, [5, 8], 8], [10, [5, 10], 5], [12, [5, 10], 5]] as const)(
    "offers available distinct years and the recommended selection for %i years", (count, sizes, recommended) => {
      const options = rangeOptions(catalog(count), exam);
      expect(options.map(option => option.count)).toEqual(sizes);
      expect(options.find(option => option.recommended)?.count ?? 0).toBe(recommended);
    },
  );
  it("counts spring and fall as one year, skips missing years and deduplicates IDs", () => {
    const bank = [...catalog(6), { id: "fall", exam, year: 2026 }, { id: "q0", exam, year: 2026 }].filter(q => q.year !== 2025);
    expect(rangeOptions(bank, exam)).toEqual([{ oldestYear: 2021, count: 5, total: 6, all: true, recommended: true }]);
  });
  it("keeps the oldest year on weekday edits and includes additions and withdrawals immediately", () => {
    const bank = catalog(12);
    const initial = build(bank);
    const next = [{ id: "new", exam, year: 2027 }, { id: "added", exam, year: 2023 },
      { id: "outside", exam, year: 2020 }, { id: "foreign", exam: "ip", year: 2025 }, ...bank.slice(1)];
    const edited = { ...initial, studyWeekdays: [1] };
    expect(calculatePace(edited, next, [], today, now)).toMatchObject({ oldestYear: 2022, total: 6, studyDays: 2, target: 3 });
    const ten = build(bank, null, [1], 2017);
    expect(calculatePace(ten, bank, [], today, now).total).toBe(10);
    expect(calculatePace(build(bank, null, [1], 2022), bank, [], today, now).total).toBe(5);
  });
  it("recovers old rows from matching IDs and detects missing ranges", () => {
    const bank = catalog(6);
    const plan = build(bank);
    plan.range.years = [];
    expect(planOldestYear(plan, bank)).toBe(2021);
    expect(planOldestYear(plan, [{ id: "q0", exam: "ip", year: 2026 }])).toBeNull();
  });
  it.each(["2026-02-30", "2025-02-29", "not-a-date", "2026-1-01"])("rejects invalid dates (%s)", date => {
    expect(dayNumber(date)).toBeNull();
    expect(() => build([], date)).toThrow();
  });
  it("uses the JST date on a saved plan even before UTC midnight", () => {
    expect(dayNumber("2024-02-29")).not.toBeNull();
    const plan = createPacePlan({ id: "p", exam, sessionId: null, startDate: today, examDate: null }, catalog(3), "2026-11-17T23:30:00Z");
    expect(plan.range.capturedOn).toBe("2026-11-18");
  });
});

describe("one calculation for mastery, weakness and pace", () => {
  const states = [undefined, true, false].flatMap(correct => [false, true].map(marked => ({ correct, marked })));
  it.each(states)(
    "latest=$correct mark=$marked", ({ correct, marked }) => {
      const bank = catalog(1), attempts = correct === undefined ? [] : [answer("q0", correct)];
      expect(calculatePace(build(bank), bank, attempts, today, now).mastered).toBe(correct === true ? 1 : 0);
      expect(weakQuestions(bank, exam, attempts, marked ? ["q0"] : [], now)).toHaveLength(correct === false || marked ? 1 : 0);
    },
  );
  it("handles resend, incorrect-correct-incorrect, ties, order and future answers", () => {
    const wrong = answer("q0", false), right = answer("q0", true, now - 500);
    const future = answer("q0", true, now + 1), wrongAgain = answer("q0", false, now - 500);
    const bank = catalog(3), plan = build(bank);
    expect(calculatePace(plan, bank, [wrong, right, right], today, now).mastered).toBe(1);
    for (const attempts of [[wrong, right, wrongAgain, future], [future, wrongAgain, right, wrong]]) {
      expect(latestAnswers(attempts, now).get("q0")).toBe(wrongAgain);
      expect(calculatePace(plan, bank, attempts, today, now).mastered).toBe(0);
    }
  });
  it("puts incorrect questions first, keeps order within a year, and excludes correct/out-of-range/foreign questions", () => {
    const bank = [...catalog(12), { id: "foreign", exam: "ip", year: 2026 }, { id: "spring", exam, year: 2025 }];
    const attempts = [answer("q0", true), answer("spring", false), answer("q4", false), answer("q8", false), answer("foreign", false)];
    const pace = calculatePace(build(bank), bank, attempts, today, now);
    expect(pace.remainingIds).toEqual(["spring", "q4", "q1", "q2", "q3"]);
    expect(pace).toMatchObject({ incorrect: 2, unanswered: 3 });
    expect(weakQuestions(bank, exam, attempts, [], now).map(row => row.question.id)).toEqual(["spring", "q4", "q8"]);
  });
  it("counts actual weekdays and recalculates the current goal after answers and missed days", () => {
    const bank = Array.from({ length: 120 }, (_, i) => ({ id: "q" + i, exam, year: 2026 }));
    const plan = build(bank);
    const first = bank.slice(0, 4).map(q => answer(q.id, true));
    const more = bank.slice(4, 10).map(q => answer(q.id, true, now));
    expect(calculatePace(plan, bank, first, today, now)).toMatchObject({ remaining: 116, studyDays: 10, target: 12 });
    expect(calculatePace(plan, bank, [...first, ...more], today, now).target).toBe(11);
    expect(calculatePace(plan, bank, first, "2026-11-18", now).target).toBe(15);
    expect(calculatePace({ ...plan, studyWeekdays: [0, 6] }, bank, first, today, now))
      .toMatchObject({ studyDays: 2, target: 58, nextWeekday: 6, scheduledToday: false });
    expect(calculatePace({ ...plan, studyWeekdays: [1, 3, 5] }, bank, first, today, now))
      .toMatchObject({ studyDays: 5, nextWeekday: 1, scheduledToday: true });
  });
  it("handles exam eve, exam day, past exam, no date, empty scope and completion", () => {
    const bank = catalog(3), plan = build(bank, "2026-11-17", [1]);
    expect(calculatePace(plan, bank, [], today, now)).toMatchObject({ target: 3, studyDays: 1 });
    expect(calculatePace(plan, bank, [], "2026-11-17", now)).toMatchObject({ target: null, daysRemaining: 0 });
    expect(calculatePace(plan, bank, [], "2026-11-18", now)).toMatchObject({ target: null, daysRemaining: -1 });
    expect(calculatePace({ ...plan, examDate: null }, bank, [], today, now)).toMatchObject({ target: null, daysRemaining: null });
    expect(calculatePace(plan, [], [], today, now)).toMatchObject({ target: null, complete: false });
    expect(calculatePace({ ...plan, examDate: null }, bank, bank.map(q => answer(q.id, true)), today, now))
      .toMatchObject({ complete: true, remaining: 0, target: null });
  });
});

describe("action-based learning points", () => {
  const action = (kind: LearningAction["kind"], id: string, overrides: Partial<LearningAction> = {}): LearningAction => ({
    id, kind, questionId: "ap-2026-0", exam: "ap", at: Date.parse("2026-11-17T12:00:00+09:00"), ...overrides });
  it("earns nothing for idle or rapid answers; five seconds earns standard three minutes", () => {
    expect(dailyLearningPoints([])).toEqual([]);
    expect(dailyLearningPoints([action("answer", "rapid", { activeMs: 4999 })])).toEqual([]);
    expect(dailyLearningPoints([action("answer", "ok", { activeMs: 5000 })])[0].minutes).toBe(3);
    expect(dailyLearningPoints([action("answer", "long", { activeMs: 86_400_000 })])[0].minutes).toBe(3);
  });
  it.each([["descriptive", 15], ["essay", 30], ["native-b", 6], ["ordering", 3]] as const)("uses %s weight", (questionType, minutes) => {
    expect(dailyLearningPoints([action("answer", "q", { activeMs: 5000, questionType })])[0].minutes).toBe(minutes);
  });
  it("caps AI questions to two per problem across days and re-reads to once per day", () => {
    const actions = [action("ai-question", "a"), action("ai-question", "b"), action("ai-question", "c", { at: Date.parse("2026-11-18T12:00:00+09:00") }),
      action("explanation-read", "r1"), action("explanation-read", "r2")];
    expect(dailyLearningPoints(actions)).toEqual([{ date: "2026-11-17", minutes: 5, answers: 0, aiQuestions: 2, explanations: 1 }]);
  });
  it("unions immutable actions idempotently and uses JST day boundaries", () => {
    const value = action("answer", "q", { activeMs: 6000, at: Date.parse("2026-11-17T15:00:00Z") });
    expect(mergeLearningActions([value], [value])).toHaveLength(1);
    expect(dailyLearningPoints([value, value])[0]).toMatchObject({ date: "2026-11-18", minutes: 3 });
    expect(japanDate(Date.parse("2026-11-17T14:59:59Z"))).toBe("2026-11-17");
    expect(dailyLearningPoints([value], "fe")).toEqual([]);
  });
  it("awards an answer once per question/JST day across reloads and merged devices", () => {
    const entries = [action("answer", "rapid", { activeMs: 4999 }),
      action("answer", "first", { activeMs: 5000 }),
      action("answer", "reload", { activeMs: 8000, correct: false }),
      action("answer", "device", { activeMs: 6000 }),
      action("answer", "next-day", { activeMs: 6000, at: Date.parse("2026-11-17T15:00:00Z") })];
    expect(dailyLearningPoints(mergeLearningActions(entries, entries))).toEqual([
      { date: "2026-11-17", minutes: 3, answers: 1, aiQuestions: 0, explanations: 0 },
      { date: "2026-11-18", minutes: 3, answers: 1, aiQuestions: 0, explanations: 0 },
    ]);
    expect(dailyLearningPoints([...entries, action("answer", "other", { questionId: "other", activeMs: 5000 })])[0].minutes).toBe(6);
  });
  it("counts foreground time only without awarding anything itself", () => {
    let now = 0;
    const clock = createActiveClock(() => now, true);
    now = 2000; clock.setVisible(false); now = 90000;
    expect(clock.milliseconds()).toBe(2000);
    clock.setVisible(true); now += 3000;
    expect(clock.milliseconds()).toBe(5000);
  });
});

describe("extension defaults and warning-only policy", () => {
  it("uses source-backed criteria, unknown 60% and generic clothes", () => {
    expect(passingLineForExam("ap")).toMatchObject({ percent: 60, isDefault: false });
    expect(passingLineForExam("future-exam")).toMatchObject({ percent: 60, isDefault: true });
    expect(planOutfitForExam("future-exam")).toBe("generic-8");
  });
  it("warns at exactly 90 days, and reports missing dates separately", () => {
    const warnings = planPolicyWarnings([{ exam: "ap", scheduleVerifiedOn: "2026-08-19" }, { exam: "future-exam" }], "2026-11-17");
    expect(warnings.filter(w => w.exam === "ap").map(w => w.code)).toEqual(["stale-schedule"]);
    expect(warnings.filter(w => w.exam === "future-exam")).toHaveLength(4);
    expect(planPolicyWarnings([{ exam: "ap", scheduleVerifiedOn: "2026-08-20" }], "2026-11-17")).toEqual([]);
  });
});
