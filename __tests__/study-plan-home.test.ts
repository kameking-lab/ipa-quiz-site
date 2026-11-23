import { describe, expect, it } from "vitest";
import { answersToday, deadlineWarning } from "@/lib/study-plan/home";
import { createPacePlan } from "@/lib/study-plan/pace";

const plan = createPacePlan({ id: "p", exam: "ip", examDate: "2026-12-01", sessionId: null, startDate: "2026-11-01" }, [], "2026-11-01T00:00:00+09:00");

describe("home dates and answers", () => {
  it("shows an existing registration deadline until acknowledged", () => {
    const pending = { ...plan, registration: { label: "予定", start: null, deadline: "2026-11-18", resultDate: null, sourceUrl: null, estimated: true } };
    expect(deadlineWarning(pending, "2026-11-17")).toMatchObject({ remaining: 1, urgency: "urgent" });
    expect(deadlineWarning({ ...pending, registered: true }, "2026-11-17")).toBeNull();
    expect(deadlineWarning(pending, "2026-11-19")).toBeNull();
  });
  it("counts mirrored records once with midnight in JST", () => {
    const at = Date.parse("2026-11-16T15:00:00Z");
    const entries = [{ id: "ip", correct: false, at }, { id: "ip", correct: false, at: at + 5 },
      { id: "ip", correct: true, at: at - 1 }, { id: "ap", correct: true, at: at + 1000 }];
    expect(answersToday(entries, "2026-11-17")).toBe(2);
    expect(answersToday(entries, "2026-11-16")).toBe(1);
    expect(answersToday(entries, "2026-11-17", new Set(["ip"]))).toBe(1);
  });
});
