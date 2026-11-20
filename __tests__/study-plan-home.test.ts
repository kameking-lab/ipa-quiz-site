import { describe, expect, it } from "vitest";
import { createPacePlan, selectTodayQuestions } from "@/lib/study-plan/pace";
import { answersToday, deadlineWarning, shouldShowPaceOffer, todayQuestionGoal } from "@/lib/study-plan/home";
const questions = Array.from({ length: 200 }, (_, i) => ({ id: `ip-q${i}`, exam: "ip", year: 2026 }));
const plan = createPacePlan({ id: "p", exam: "ip", examDate: "2026-11-20", sessionId: "s", startDate: "2026-11-01" }, questions, "2026-11-01T00:00:00+09:00");
describe("home pace rules", () => {
  it("shows deadline bands only in the final 14 days, until registration", () => {
    const p = { ...plan, registration: { label: "test", start: "2026-10-01", deadline: "2026-11-18", resultDate: null, sourceUrl: null, estimated: false } };
    expect(deadlineWarning(p, "2026-11-03")).toBeNull();
    expect(deadlineWarning(p, "2026-11-04")?.urgency).toBe("notice");
    expect(deadlineWarning(p, "2026-11-11")?.urgency).toBe("soon");
    expect(deadlineWarning(p, "2026-11-17")?.urgency).toBe("urgent");
    expect(deadlineWarning(p, "2026-11-18")?.remaining).toBe(0);
    expect(deadlineWarning(p, "2026-11-19")).toBeNull();
    expect(deadlineWarning({ ...p, registered: true }, "2026-11-17")).toBeNull();
  });
  it("limits the paid line by pace, membership, day and seven-day dismissal", () => {
    expect(shouldShowPaceOffer(plan, [], "2026-11-17", false, {})).toBe(true);
    expect(shouldShowPaceOffer(plan, [], "2026-11-17", true, {})).toBe(false);
    expect(shouldShowPaceOffer(plan, [], "2026-11-17", false, { shownOn: "2026-11-17" })).toBe(false);
    expect(shouldShowPaceOffer(plan, [], "2026-11-17", false, { dismissedOn: "2026-11-11" })).toBe(false);
    expect(shouldShowPaceOffer(plan, [], "2026-11-17", false, { dismissedOn: "2026-11-10" })).toBe(true);
    expect(shouldShowPaceOffer(plan, questions.map(q => ({ id: q.id, correct: true, at: Date.parse("2026-11-16T12:00:00+09:00") })), "2026-11-17", false, {})).toBe(false);
  });
  it("uses JST day boundaries, deduplicates mirrored actions and freezes today's goal", () => {
    const attempts = [{ id: "ip-q0", correct: true, at: Date.parse("2026-11-16T15:00:00Z") }, { id: "ip-q0", correct: true, at: Date.parse("2026-11-16T15:00:00.200Z") }, { id: "ip-q1", correct: true, at: Date.parse("2026-11-17T15:00:00Z") }];
    expect(answersToday(attempts, "2026-11-17")).toBe(1);
    expect(todayQuestionGoal(plan, attempts, "2026-11-17")).toBe(todayQuestionGoal(plan, [], "2026-11-17"));
  });
  it("orders due mistakes, resume, fresh questions and a 10% confirmation without duplicates", () => {
    const answers = [{ id: "ip-q0", correct: true, at: 1 }, { id: "ip-q7", correct: false, at: 2 }];
    const ids = selectTodayQuestions(plan, questions, answers, 10, ["ip-q7", "foreign"], "ip-q9");
    expect(ids.slice(0, 2)).toEqual(["ip-q7", "ip-q9"]);
    expect(ids).toHaveLength(10); expect(ids[9]).toBe("ip-q0"); expect(new Set(ids).size).toBe(10);
    expect(selectTodayQuestions(plan, questions, answers, 0)).toEqual([]);
  });
});
