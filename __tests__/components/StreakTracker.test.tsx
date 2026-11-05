import { afterEach, expect, it, vi } from "vitest";
import { act, cleanup, render, screen } from "@testing-library/react";
import { StreakTracker } from "@/lib/streak/StreakTracker";
import { LS_KEYS } from "@/lib/storage/keys";
const mocks = vi.hoisted(() => ({ pathname: "/" }));
vi.mock("next/navigation", () => ({ usePathname: () => mocks.pathname }));
afterEach(() => { cleanup(); vi.useRealTimers(); localStorage.clear(); });
it("does not turn old history into today's streak; records an actual answer even at the history cap", () => {
  vi.useFakeTimers(); vi.setSystemTime(new Date("2026-11-05T03:00:00Z"));
  localStorage.setItem(LS_KEYS.history, JSON.stringify({ entries: [{ id: "old", selected: "ア", correct: true, at: Date.now() - 86400000 }], starredIds: [] }));
  const view = render(<StreakTracker />);
  expect(localStorage.getItem("ipa-quiz:streak:v1")).toBeNull();
  const entries = Array.from({ length: 2000 }, (_, i) => ({ id: `q${i}`, at: Date.now(), correct: true, selected: "ア" }));
  localStorage.setItem(LS_KEYS.history, JSON.stringify({ entries, starredIds: [] }));
  act(() => vi.advanceTimersByTime(5000));
  expect(JSON.parse(localStorage.getItem("ipa-quiz:streak:v1")!)).toMatchObject({ lastStudyDate: "2026-11-05", currentStreak: 1 });
  view.unmount();
});
it("keeps a milestone from covering article or quiz choices", () => {
  mocks.pathname = "/blog/test";
  vi.useFakeTimers(); vi.setSystemTime(new Date("2026-11-05T03:00:00Z"));
  localStorage.setItem("ipa-quiz:streak:v1", JSON.stringify({ currentStreak: 2, longestStreak: 2, lastStudyDate: "2026-11-04", milestonesReached: [] }));
  localStorage.setItem(LS_KEYS.history, JSON.stringify({ entries: [{ id: "today", at: Date.now() }], starredIds: [] }));
  render(<StreakTracker />);
  expect(JSON.parse(localStorage.getItem("ipa-quiz:streak:v1")!).currentStreak).toBe(3);
  expect(screen.queryByRole("status")).toBeNull();
  mocks.pathname = "/";
});
