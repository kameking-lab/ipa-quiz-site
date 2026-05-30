import { describe, expect, it } from "vitest";

import { ALL_QUESTIONS, QUESTIONS_BY_EXAM } from "@/data/questions";
import { ALL_ESSAY_QUESTIONS } from "@/data/questions/essay";
import { getContentCounts } from "@/lib/stats/content-count";

// getContentCounts() is the single aggregator behind the /stats page and the
// public /api/stats/content-count route. It advertises 午前+午後+論文 totals and
// a per-exam breakdown. The type system guarantees the *shape* of the result,
// but the value invariants below (conservation, partition consistency, sort
// order) are unenforced and would silently drift on a data edit — e.g. a wrong
// per-exam filter would overstate a badge count without raising any error.
//
// These assertions intentionally derive expectations from the live datasets
// (no hardcoded totals) so the test survives data growth while still failing
// the moment the aggregation logic itself is mutated.

describe("getContentCounts — top-level conservation", () => {
  const counts = getContentCounts();

  it("morning/afternoon/essay match the source dataset lengths", () => {
    expect(counts.morning).toBe(ALL_QUESTIONS.length);
    expect(counts.essay).toBe(ALL_ESSAY_QUESTIONS.length);
    // afternoon has no top-level export; cross-check it against the per-exam
    // breakdown sum below instead.
    expect(counts.afternoon).toBeGreaterThan(0);
  });

  it("total is exactly morning + afternoon + essay", () => {
    expect(counts.total).toBe(counts.morning + counts.afternoon + counts.essay);
  });
});

describe("getContentCounts — per-exam breakdown partitions the totals", () => {
  const counts = getContentCounts();

  it("each row total is the sum of its own components", () => {
    for (const row of counts.byExam) {
      expect(row.total).toBe(row.morning + row.afternoon + row.essay);
    }
  });

  it("the per-exam columns sum back to the top-level totals", () => {
    const sum = (pick: (r: (typeof counts.byExam)[number]) => number) =>
      counts.byExam.reduce((acc, r) => acc + pick(r), 0);
    expect(sum((r) => r.morning)).toBe(counts.morning);
    expect(sum((r) => r.afternoon)).toBe(counts.afternoon);
    expect(sum((r) => r.essay)).toBe(counts.essay);
    expect(sum((r) => r.total)).toBe(counts.total);
  });

  it("morning per-exam counts match QUESTIONS_BY_EXAM partition", () => {
    for (const row of counts.byExam) {
      expect(row.morning).toBe((QUESTIONS_BY_EXAM[row.exam] ?? []).length);
    }
  });

  it("lists each exam at most once", () => {
    const codes = counts.byExam.map((r) => r.exam);
    expect(new Set(codes).size).toBe(codes.length);
  });
});

describe("getContentCounts — ordering and published count", () => {
  const counts = getContentCounts();

  it("sorts the breakdown by total, descending", () => {
    for (let i = 1; i < counts.byExam.length; i++) {
      expect(counts.byExam[i - 1].total).toBeGreaterThanOrEqual(
        counts.byExam[i].total,
      );
    }
  });

  it("publishedExams counts only rows with a positive total", () => {
    expect(counts.publishedExams).toBe(
      counts.byExam.filter((r) => r.total > 0).length,
    );
    expect(counts.publishedExams).toBeGreaterThan(0);
    expect(counts.publishedExams).toBeLessThanOrEqual(counts.byExam.length);
  });
});
