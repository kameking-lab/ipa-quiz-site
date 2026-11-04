import { beforeEach, describe, expect, it, vi, afterEach } from "vitest";
import { buildReviewRequest } from "@/lib/learning/review-queue";
import { recordReview } from "@/lib/learning/spaced-repetition";
import { createHistoryStore } from "@/lib/storage/history";
import { LS_KEYS } from "@/lib/storage/keys";

beforeEach(() => { localStorage.clear(); vi.useFakeTimers(); vi.setSystemTime(new Date("2026-11-04T14:00:00Z")); });
afterEach(() => { vi.useRealTimers(); });
describe("shared review queue", () => {
  it("includes starred-only and SRS-only questions without altering legacy saved data", () => {
    createHistoryStore().toggleStar("ap-star-only");
    recordReview("ap-srs-only", true);
    const before = localStorage.getItem(LS_KEYS.spacedRepetition);
    const request = buildReviewRequest({ "ip-legacy": { nextReviewAt: "2099-01-01" } });
    expect(request.historyIds).toEqual(["ap-star-only", "ap-srs-only", "ip-legacy"]);
    expect(request.reviewStore["ap-star-only"].nextReviewAt).toBe("2026-11-04");
    expect(request.reviewStore["ap-srs-only"].nextReviewAt).toBe("2026-11-05");
    expect(request.reviewStore["ip-legacy"].nextReviewAt).toBe("2099-01-01");
    expect(localStorage.getItem(LS_KEYS.spacedRepetition)).toBe(before);
  });
  it("offers a fresh miss immediately and defers it after a successful review", () => {
    createHistoryStore().record({ id: "ap-wrong", selected: "ア", correct: false, at: Date.now() });
    recordReview("ap-wrong", false);
    expect(buildReviewRequest({}).reviewStore["ap-wrong"].nextReviewAt).toBe("2026-11-04");
    vi.advanceTimersByTime(1000);
    recordReview("ap-wrong", true);
    expect(buildReviewRequest({}).reviewStore["ap-wrong"].nextReviewAt).toBe("2026-11-05");
  });
});
