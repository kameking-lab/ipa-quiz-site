import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { FREE_AI_DAILY_LIMIT, POST_FEEDBACK_AI_DAILY_LIMIT } from "@/lib/constants/ai-quota";
import { LS_KEYS } from "@/lib/storage/keys";
import {
  readAiUsage,
  incrementAiUsage,
  readFeedbackSubmitted,
  setFeedbackSubmitted,
  effectiveDailyLimit,
} from "@/lib/storage/rate-limit-client";

// quota-sync.test.ts pins that the client/server/constant limits agree, but the
// behavioral surface of the client quota gate (§9: 初回 N 回 / JST 0:00 リセット /
// フィードバック後ほぼ無制限) is otherwise uncovered. These tests fix the runtime
// contract. The clock is faked so the JST day-rollover reset is deterministic:
// 2024-06-15T03:00:00Z is 2024-06-15 12:00 JST → JST date "2024-06-15".
const FIXED_NOW = new Date("2024-06-15T03:00:00Z");
const TODAY_JST = "2024-06-15";

beforeEach(() => {
  window.localStorage.clear();
  vi.useFakeTimers({ toFake: ["Date"] });
  vi.setSystemTime(FIXED_NOW);
});

afterEach(() => {
  vi.useRealTimers();
});

describe("readAiUsage", () => {
  it("defaults to today's JST date with a zero count when nothing is stored", () => {
    expect(readAiUsage()).toEqual({ date: TODAY_JST, count: 0 });
  });

  it("returns the stored usage when it is for the current JST day", () => {
    window.localStorage.setItem(LS_KEYS.aiUsage, JSON.stringify({ date: TODAY_JST, count: 3 }));
    expect(readAiUsage()).toEqual({ date: TODAY_JST, count: 3 });
  });

  it("resets to zero when the stored usage is from a previous JST day", () => {
    window.localStorage.setItem(LS_KEYS.aiUsage, JSON.stringify({ date: "2024-06-14", count: 7 }));
    expect(readAiUsage()).toEqual({ date: TODAY_JST, count: 0 });
  });

  it("fails soft to a zero count when the stored value is corrupt", () => {
    window.localStorage.setItem(LS_KEYS.aiUsage, "not json");
    expect(readAiUsage()).toEqual({ date: TODAY_JST, count: 0 });
  });
});

describe("incrementAiUsage", () => {
  it("increments the count and persists it for read-back", () => {
    window.localStorage.setItem(LS_KEYS.aiUsage, JSON.stringify({ date: TODAY_JST, count: 2 }));
    expect(incrementAiUsage()).toEqual({ date: TODAY_JST, count: 3 });
    expect(readAiUsage()).toEqual({ date: TODAY_JST, count: 3 });
  });

  it("counts from zero on a new JST day even if a stale count was stored", () => {
    window.localStorage.setItem(LS_KEYS.aiUsage, JSON.stringify({ date: "2024-06-14", count: 9 }));
    expect(incrementAiUsage().count).toBe(1);
  });
});

describe("feedback flag", () => {
  it("is false by default and round-trips through set", () => {
    expect(readFeedbackSubmitted()).toBe(false);
    setFeedbackSubmitted();
    expect(readFeedbackSubmitted()).toBe(true);
    setFeedbackSubmitted(false);
    expect(readFeedbackSubmitted()).toBe(false);
  });
});

describe("effectiveDailyLimit", () => {
  it("is the initial free limit before feedback is submitted", () => {
    expect(effectiveDailyLimit()).toBe(FREE_AI_DAILY_LIMIT);
  });

  it("rises to the post-feedback limit once feedback is submitted", () => {
    setFeedbackSubmitted();
    expect(effectiveDailyLimit()).toBe(POST_FEEDBACK_AI_DAILY_LIMIT);
  });
});
