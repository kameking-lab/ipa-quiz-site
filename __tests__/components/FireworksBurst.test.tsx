import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { render, act } from "@testing-library/react";

import { FireworksBurst } from "@/components/motivation/FireworksBurst";

// "big" burst: duration 0.95s → auto-clear timer = 0.95 * 1000 + 100 = 1050ms,
// which is longer than QuizPlayer's 1s elapsed-time re-render interval.
const BIG_CLEAR_MS = 1050;

beforeEach(() => {
  vi.useFakeTimers();
});
afterEach(() => {
  vi.runOnlyPendingTimers();
  vi.useRealTimers();
});

describe("FireworksBurst — auto-clear lifecycle", () => {
  it("calls onDone after the burst duration elapses", () => {
    const onDone = vi.fn();
    render(<FireworksBurst active level="big" onDone={onDone} />);
    expect(onDone).not.toHaveBeenCalled();
    act(() => {
      vi.advanceTimersByTime(BIG_CLEAR_MS);
    });
    expect(onDone).toHaveBeenCalledTimes(1);
  });

  it("does not start a timer while inactive", () => {
    const onDone = vi.fn();
    render(<FireworksBurst active={false} level="big" onDone={onDone} />);
    act(() => {
      vi.advanceTimersByTime(5000);
    });
    expect(onDone).not.toHaveBeenCalled();
  });

  // Regression: the parent (QuizPlayer) re-renders every second and passes a
  // fresh inline onDone={() => setBurst(null)} each tick. The auto-clear timer
  // must NOT restart on those re-renders — otherwise the 1050ms "big" timer is
  // reset every ~1000ms and never fires, leaving the burst state stuck and a
  // perpetual self-resetting timer. (Same stale-closure class as AchievementToast.)
  it("does not reset the auto-clear timer when re-rendered with a new onDone", () => {
    const onDoneA = vi.fn();
    const onDoneB = vi.fn();
    const { rerender } = render(
      <FireworksBurst active level="big" onDone={onDoneA} />,
    );
    // Simulate the parent's per-second re-render BEFORE the 1050ms timer fires.
    act(() => {
      vi.advanceTimersByTime(900);
    });
    rerender(<FireworksBurst active level="big" onDone={onDoneB} />);
    // 300ms more → 1200ms total, past the original 1050ms deadline. If the
    // timer had been reset by the re-render, nothing would fire yet.
    act(() => {
      vi.advanceTimersByTime(300);
    });
    expect(onDoneB).toHaveBeenCalledTimes(1);
    // The latest callback (ref) is invoked, not the stale initial one.
    expect(onDoneA).not.toHaveBeenCalled();
  });
});
