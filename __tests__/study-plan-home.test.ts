import { describe, expect, it } from "vitest";
import { answersToday } from "@/lib/study-plan/home";

describe("home answers", () => {
  it("counts mirrored records once with midnight in JST", () => {
    const at = Date.parse("2026-11-16T15:00:00Z");
    const entries = [{ id: "ip", correct: false, at }, { id: "ip", correct: false, at: at + 5 },
      { id: "ip", correct: true, at: at - 1 }, { id: "ap", correct: true, at: at + 1000 }];
    expect(answersToday(entries, "2026-11-17")).toBe(2);
    expect(answersToday(entries, "2026-11-16")).toBe(1);
    expect(answersToday(entries, "2026-11-17", new Set(["ip"]))).toBe(1);
  });
});
