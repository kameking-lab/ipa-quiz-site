import { describe, expect, it } from "vitest";

import {
  findAfternoonQuestion,
  getAfternoonByYearSeason,
  getAfternoonQuestions,
  getAfternoonYearSeasons,
} from "@/lib/afternoon/load";

// These accessors back the 午後AI採点 routes (C軸 differentiation):
// getAfternoonYearSeasons drives generateStaticParams for
// /[exam]/afternoon/[year]/[season] (which pages get prerendered),
// getAfternoonByYearSeason renders the per-sitting list, and
// findAfternoonQuestion resolves the scoring API target. None were tested.
// Expectations are derived from the live corpus (no hardcoded counts) so the
// pins survive new sittings while still catching a logic mutation.

describe("getAfternoonQuestions", () => {
  it("returns only the requested exam's questions", () => {
    const ap = getAfternoonQuestions("ap");
    expect(ap.length).toBeGreaterThan(0);
    expect(ap.every((q) => q.exam === "ap")).toBe(true);
  });

  it("returns [] for exams with no afternoon corpus (午前のみ)", () => {
    expect(getAfternoonQuestions("ip")).toEqual([]);
    expect(getAfternoonQuestions("sg")).toEqual([]);
  });
});

describe("getAfternoonByYearSeason", () => {
  it("filters to the exact exam + year + season triple", () => {
    const list = getAfternoonByYearSeason("ap", 2024, "spring");
    expect(list.length).toBeGreaterThan(0);
    expect(
      list.every((q) => q.exam === "ap" && q.year === 2024 && q.season === "spring"),
    ).toBe(true);
  });

  it("orders the list by qNumber, non-decreasing", () => {
    const list = getAfternoonByYearSeason("ap", 2024, "spring");
    for (let i = 1; i < list.length; i++) {
      expect(list[i].qNumber).toBeGreaterThanOrEqual(list[i - 1].qNumber);
    }
  });

  it("returns [] for a sitting with no questions", () => {
    expect(getAfternoonByYearSeason("ap", 1999, "spring")).toEqual([]);
  });
});

describe("getAfternoonYearSeasons", () => {
  it("lists each year/season pair at most once", () => {
    const keys = getAfternoonYearSeasons("ap").map((p) => `${p.year}-${p.season}`);
    expect(new Set(keys).size).toBe(keys.length);
  });

  it("covers exactly the distinct sittings present in the corpus", () => {
    const fromList = new Set(
      getAfternoonQuestions("ap").map((q) => `${q.year}-${q.season}`),
    );
    const fromPairs = new Set(
      getAfternoonYearSeasons("ap").map((p) => `${p.year}-${p.season}`),
    );
    expect(fromPairs).toEqual(fromList);
  });

  it("sorts year descending, then season ascending (localeCompare)", () => {
    const pairs = getAfternoonYearSeasons("ap");
    for (let i = 1; i < pairs.length; i++) {
      const prev = pairs[i - 1];
      const cur = pairs[i];
      if (prev.year === cur.year) {
        expect(prev.season.localeCompare(cur.season)).toBeLessThan(0);
      } else {
        expect(prev.year).toBeGreaterThan(cur.year);
      }
    }
  });

  it("puts the newest sitting first", () => {
    const pairs = getAfternoonYearSeasons("ap");
    const maxYear = Math.max(...pairs.map((p) => p.year));
    expect(pairs[0].year).toBe(maxYear);
  });

  it("returns [] for exams with no afternoon corpus", () => {
    expect(getAfternoonYearSeasons("ip")).toEqual([]);
  });
});

describe("findAfternoonQuestion", () => {
  it("resolves an existing id to the very same object", () => {
    const first = getAfternoonQuestions("ap")[0];
    expect(findAfternoonQuestion(first.id)).toBe(first);
  });

  it("returns undefined for an unknown id", () => {
    expect(findAfternoonQuestion("ap-9999z-pm-q99")).toBeUndefined();
  });
});
