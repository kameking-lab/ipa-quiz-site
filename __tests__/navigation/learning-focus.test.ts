import { describe, expect, it } from "vitest";

import { isLearningFocusRoute } from "@/lib/navigation/learning-focus";

describe("isLearningFocusRoute", () => {
  it("hides the bottom nav on QuizPlayer routes", () => {
    expect(isLearningFocusRoute("/quiz")).toBe(true);
    expect(isLearningFocusRoute("/quiz/stream")).toBe(true);
    expect(isLearningFocusRoute("/quiz/review")).toBe(true);
  });

  it("hides the bottom nav on /q/* question pages", () => {
    expect(isLearningFocusRoute("/q/ap/2024-autumn/am/q1")).toBe(true);
    expect(isLearningFocusRoute("/q/ip/2024-spring/am/q5")).toBe(true);
  });

  it("keeps the bottom nav on the home and other primary destinations", () => {
    expect(isLearningFocusRoute("/")).toBe(false);
    expect(isLearningFocusRoute("/search")).toBe(false);
    expect(isLearningFocusRoute("/mock-exam")).toBe(false);
    expect(isLearningFocusRoute("/challenge")).toBe(false);
    expect(isLearningFocusRoute("/account/dashboard")).toBe(false);
    expect(isLearningFocusRoute("/ap")).toBe(false); // exam landing, not a /q/ page
  });

  it("does not match look-alike paths", () => {
    // "/quizzes" must NOT be treated as a quiz route (trailing-slash guard).
    expect(isLearningFocusRoute("/quizzes")).toBe(false);
    // "/queue" etc. start with /q but are not /q/ question pages.
    expect(isLearningFocusRoute("/queue")).toBe(false);
  });

  it("returns false for null/undefined/empty", () => {
    expect(isLearningFocusRoute(null)).toBe(false);
    expect(isLearningFocusRoute(undefined)).toBe(false);
    expect(isLearningFocusRoute("")).toBe(false);
  });
});
