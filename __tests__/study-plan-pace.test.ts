import { describe, expect, it } from "vitest";
import { calculatePace, createPacePlan, dayNumber, mastery, recommendedRange, refreshThinRange, selectTodayQuestions, weekStart,
  type AnswerAttempt, type PlanQuestion } from "@/lib/study-plan/pace";
import { createActiveClock, dailyLearningPoints, japanDate, mergeLearningActions, type LearningAction } from "@/lib/study-plan/activity";
import { passingLineForExam, planOutfitForExam, planPolicyWarnings } from "@/lib/study-plan/policy";

const questions = (count: number, year = 2026): PlanQuestion[] => Array.from({ length: count }, (_, i) => ({ id: `ap-${year}-${i}`, exam: "ap", year }));
const makePlan = (count = 100, examDate: string | null = "2026-12-01") => createPacePlan({ id: "p1", exam: "ap", sessionId: "ap-next",
  startDate: "2026-11-01", examDate }, questions(count), "2026-11-01T00:00:00+09:00");
const answers = (count: number, date = "2026-11-15"): AnswerAttempt[] => questions(count).map(q => ({ id: q.id, correct: true, at: Date.parse(`${date}T12:00:00+09:00`) }));

describe("recommended scope and immutable plan snapshots", () => {
  it.each([0, 199, 200, 500])("includes all distinct problems for %i questions", count => {
    const source = questions(count);
    expect(recommendedRange([...source, ...source], "ap")).toHaveLength(count);
  });
  it("uses the newest five distinct available years above 500, never other exams", () => {
    const bank = Array.from({ length: 8 }, (_, i) => questions(100, 2026 - i)).flat();
    expect(recommendedRange([...bank, { id: "foreign", exam: "fe", year: 2030 }], "ap")).toHaveLength(500);
    expect(new Set(recommendedRange(bank, "ap").map(q => q.year))).toEqual(new Set([2026, 2025, 2024, 2023, 2022]));
  });
  it("freezes normal plans when problems are added or removed", () => {
    const plan = makePlan(200);
    expect(refreshThinRange(plan, questions(500), "2026-11-16")).toBe(plan);
    expect(refreshThinRange(plan, [], "2026-11-16")).toBe(plan);
  });
  it("expands initially thin plans once/week and grants grace through Sunday", () => {
    const plan = makePlan(199);
    expect(refreshThinRange(plan, questions(210), "2026-11-01")).toBe(plan);
    const expanded = refreshThinRange(plan, questions(210), "2026-11-02");
    expect(expanded.range.questionIds).toHaveLength(210);
    expect(expanded.range.initialCount).toBe(199);
    expect(expanded.range.graceUntil).toBe("2026-11-09");
    expect(refreshThinRange(expanded, questions(220), "2026-11-08")).toBe(expanded);
    const second = refreshThinRange(expanded, questions(220), "2026-11-09");
    expect(second.range.questionIds).toHaveLength(220);
    expect(plan.range.questionIds).toHaveLength(199);
    expect(refreshThinRange(second, [], "2026-11-16").range.questionIds).toHaveLength(220);
  });
  it.each(["2026-02-30", "2025-02-29", "not-a-date", "2026-1-01"])("rejects invalid date %s", date => {
    expect(dayNumber(date)).toBeNull();
    expect(() => createPacePlan({ id: "p", exam: "new", sessionId: null, startDate: date, examDate: null }, [], "2026-11-17")).toThrow();
  });
  it("handles leap dates and year-crossing Mondays", () => {
    expect(dayNumber("2024-02-29")).not.toBeNull();
    expect(weekStart("2027-01-03")).toBe("2026-12-28");
  });
  it("anchors the captured scope to creation day, independent of the plan start", () => {
    const plan = createPacePlan({ id: "future", exam: "ap", sessionId: null, startDate: "2026-12-01", examDate: null },
      questions(10), "2026-11-17T23:30:00Z");
    expect(plan.range.capturedOn).toBe("2026-11-18");
    expect(plan.range.lastExpansionWeek).toBe("2026-11-16");
    expect(refreshThinRange(plan, questions(20), "2026-11-22")).toBe(plan);
  });
});

describe("last-answer mastery and pace", () => {
  it("uses latest time, not array order, and removes a failed confirmation", () => {
    const entries = [...answers(10), { ...answers(1)[0], correct: false, at: Date.parse("2026-11-16T12:00:00+09:00") }];
    expect(mastery(makePlan().range.questionIds, entries.reverse()).mastered).toBe(9);
    expect(mastery(["ap-2026-0", "ap-2026-0"], entries).percent).toBe(0);
  });
  it("does not count future records", () => {
    expect(calculatePace(makePlan(), answers(100, "2026-12-02"), "2026-11-15").percent).toBe(0);
  });
  it.each([[45, "on-track"], [55, "on-track"], [44, "behind"], [56, "ahead"]] as const)("judges %i%% at the exact ±5pt boundaries", (count, judgment) => {
    const pace = calculatePace(makePlan(), answers(count), "2026-11-16");
    expect(pace.idealPercent).toBe(50);
    expect(pace.judgment).toBe(judgment);
  });
  it("starts at 0 ideal and ends at 100 on the exam day", () => {
    expect(calculatePace(makePlan(), [], "2026-11-01").idealPercent).toBe(0);
    const today = calculatePace(makePlan(), answers(50), "2026-12-01");
    expect(today).toMatchObject({ idealPercent: 100, daysRemaining: 0, requiredQuestionsPerDay: 50, forecastPercent: 50 });
  });
  it("does not divide by zero when the start is on/after the exam", () => {
    expect(calculatePace(makePlan(100, "2026-11-01"), [], "2026-11-01").idealPercent).toBe(100);
    expect(calculatePace(makePlan(100, "2026-10-31"), [], "2026-11-01").requiredQuestionsPerDay).toBeNull();
  });
  it("keeps a past exam distinct from an actionable target", () => {
    expect(calculatePace(makePlan(), [], "2026-12-02")).toMatchObject({ daysRemaining: -1, forecastPercent: null, requiredQuestionsPerDay: null });
  });
  it("supports on-demand/no schedule without inventing a date", () => {
    expect(calculatePace(makePlan(100, null), answers(10), "2026-11-17")).toMatchObject({ percent: 10, idealPercent: null,
      judgment: "unscheduled", forecastPercent: null, requiredQuestionsPerDay: null });
  });
  it("handles zero questions and all correct without Infinity/NaN", () => {
    expect(calculatePace(makePlan(0), [], "2026-11-17")).toMatchObject({ percent: 0, total: 0, requiredQuestionsPerDay: 0, forecastPercent: null });
    expect(calculatePace(makePlan(), answers(100), "2026-11-17")).toMatchObject({ percent: 100, requiredQuestionsPerDay: 0, forecastPercent: 100 });
  });
  it("predicts from net mastery gained over the last 14 calendar days", () => {
    const pace = calculatePace(makePlan(), [...answers(10, "2026-11-01"), ...answers(24, "2026-11-17")], "2026-11-17");
    expect(pace.gainPerDay).toBe(1);
    expect(pace.forecastPercent).toBe(38);
    expect(pace.requiredQuestionsPerDay).toBe(6);
    expect(calculatePace(makePlan(), answers(5, "2026-11-01"), "2026-11-01").forecastPercent).toBeNull();
  });
  it("does not mark a thin-plan supplement as behind during its grace week", () => {
    const plan = refreshThinRange(makePlan(10), questions(100), "2026-11-16");
    expect(calculatePace(plan, [], "2026-11-22").judgment).toBe("on-track");
    expect(calculatePace(plan, [], "2026-11-23").judgment).toBe("behind");
  });
});

describe("today's problem composition", () => {
  it("prioritizes due incorrect, resume, new; inserts 10% old correct questions", () => {
    const plan = makePlan();
    const batch = selectTodayQuestions(plan, questions(101), answers(10), 10, ["ap-2026-20"], "ap-2026-21");
    expect(batch).toHaveLength(10);
    expect(batch.slice(0, 2)).toEqual(["ap-2026-20", "ap-2026-21"]);
    expect(batch.filter(id => answers(10).some(answer => answer.id === id))).toHaveLength(1);
    expect(new Set(batch).size).toBe(10);
  });
  it("allows later supplements without increasing a frozen denominator", () => {
    const plan = makePlan(200);
    const result = selectTodayQuestions(plan, questions(201), answers(200), 10);
    expect(result).toContain("ap-2026-200");
    expect(plan.range.questionIds).toHaveLength(200);
  });
  it("supports 0 allowance, empty banks and all-correct thin banks", () => {
    expect(selectTodayQuestions(makePlan(), questions(100), [], 0)).toEqual([]);
    expect(selectTodayQuestions(makePlan(), [], [], 10)).toEqual([]);
    expect(selectTodayQuestions(makePlan(3), questions(3), answers(3), 10)).toHaveLength(3);
    expect(selectTodayQuestions(makePlan(), questions(100), [], Infinity)).toEqual([]);
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
