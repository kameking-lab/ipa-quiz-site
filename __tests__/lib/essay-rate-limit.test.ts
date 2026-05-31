import { describe, it, expect, beforeEach } from "vitest";
import {
  FREE_ESSAY_LIMIT_PER_MONTH,
  readEssayUsage,
  incrementEssayUsage,
  essayUsageRemaining,
} from "@/lib/storage/essay-rate-limit";

const LS_KEY = "ipa-quiz:essay-grading-usage:v1";

function seed(rec: Record<string, unknown>): void {
  window.localStorage.setItem(LS_KEY, JSON.stringify(rec));
}

beforeEach(() => {
  window.localStorage.clear();
});

describe("essayUsageRemaining", () => {
  it("returns Infinity for premium (bypasses the cap)", () => {
    expect(essayUsageRemaining(true)).toBe(Infinity);
    // premium is unaffected even when free usage is exhausted
    incrementEssayUsage();
    incrementEssayUsage();
    incrementEssayUsage();
    expect(essayUsageRemaining(true)).toBe(Infinity);
  });

  it("starts a fresh month at the full free quota", () => {
    expect(essayUsageRemaining(false)).toBe(FREE_ESSAY_LIMIT_PER_MONTH);
  });

  it("decreases by one per use", () => {
    incrementEssayUsage();
    expect(essayUsageRemaining(false)).toBe(FREE_ESSAY_LIMIT_PER_MONTH - 1);
  });

  it("never goes negative once the cap is passed", () => {
    for (let i = 0; i < FREE_ESSAY_LIMIT_PER_MONTH + 2; i++) incrementEssayUsage();
    expect(essayUsageRemaining(false)).toBe(0);
  });
});

describe("readEssayUsage — JST month rollover", () => {
  it("resets the count to 0 when the stored month is stale", () => {
    seed({ yearMonth: "1999-01", count: FREE_ESSAY_LIMIT_PER_MONTH });
    const usage = readEssayUsage();
    expect(usage.count).toBe(0);
    expect(usage.yearMonth).not.toBe("1999-01");
    expect(essayUsageRemaining(false)).toBe(FREE_ESSAY_LIMIT_PER_MONTH);
  });

  it("returns the stored record unchanged within the current month", () => {
    const written = incrementEssayUsage(); // stamps the current JST month
    expect(readEssayUsage()).toEqual(written);
  });
});

describe("incrementEssayUsage", () => {
  it("accumulates monotonically across calls", () => {
    expect(incrementEssayUsage().count).toBe(1);
    expect(incrementEssayUsage().count).toBe(2);
  });
});
