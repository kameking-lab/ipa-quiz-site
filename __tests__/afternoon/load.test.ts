import { describe, expect, it, vi } from "vitest";
import { AP_AFTERNOON_QUESTIONS } from "@/data/questions/afternoon/ap";
import {
  findAfternoonQuestion,
  getAfternoonByYearSeason,
  getAfternoonQuestions,
  getAfternoonYearSeasons,
} from "@/lib/afternoon/load";

describe("published afternoon loader", () => {
  it("retains the original source files but excludes them from every public accessor", () => {
    expect(AP_AFTERNOON_QUESTIONS.length).toBeGreaterThan(0);
    expect(AP_AFTERNOON_QUESTIONS.every((q) => q.license === "original")).toBe(true);
    for (const q of AP_AFTERNOON_QUESTIONS) {
      expect(findAfternoonQuestion(q.id)).toBeUndefined();
    }
    expect(getAfternoonQuestions("ap")).toEqual([]);
    expect(getAfternoonByYearSeason("ap", 2024, "spring")).toEqual([]);
    expect(getAfternoonYearSeasons("ap")).toEqual([]);
  });

  it("accepts a sourced IPA question when the raw import contains one", async () => {
    const official = { ...AP_AFTERNOON_QUESTIONS[0]!, id: "ap-test-official", license: "IPA-public" as const };
    vi.doMock("@/data/questions/afternoon/ap", () => ({
      AP_AFTERNOON_QUESTIONS: [...AP_AFTERNOON_QUESTIONS, official],
    }));
    vi.resetModules();
    try {
      const loader = await import("@/lib/afternoon/load");
      expect(loader.findAfternoonQuestion(official.id)).toEqual(official);
      expect(loader.getAfternoonQuestions("ap")).toEqual([official]);
      expect(loader.getAfternoonByYearSeason("ap", official.year, official.season)).toEqual([official]);
      expect(loader.getAfternoonYearSeasons("ap")).toEqual([{ year: official.year, season: official.season }]);
    } finally {
      vi.doUnmock("@/data/questions/afternoon/ap");
      vi.resetModules();
    }
  });

  it("does not expose unknown question IDs or unsupported exams", () => {
    expect(findAfternoonQuestion("ap-9999z-pm-q99")).toBeUndefined();
    expect(getAfternoonQuestions("ip")).toEqual([]);
    expect(getAfternoonYearSeasons("sg")).toEqual([]);
  });
});
