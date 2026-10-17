import { beforeEach, describe, expect, it } from "vitest";
import { readFeedbackSubmitted, setFeedbackSubmitted } from "@/lib/storage/rate-limit-client";
import { LS_KEYS } from "@/lib/storage/keys";

describe("local feedback history", () => {
  beforeEach(() => window.localStorage.clear());

  it("records a submission without changing an AI quota", () => {
    expect(readFeedbackSubmitted()).toBe(false);
    setFeedbackSubmitted();
    expect(readFeedbackSubmitted()).toBe(true);
    expect(window.localStorage.getItem(LS_KEYS.feedbackSubmitted)).toBe("true");
    setFeedbackSubmitted(false);
    expect(readFeedbackSubmitted()).toBe(false);
  });
});
