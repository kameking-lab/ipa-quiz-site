import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { render, screen, fireEvent, act } from "@testing-library/react";

import { AchievementToast } from "@/components/motivation/AchievementToast";

// "study-first" = はじめの一歩 (bronze) — the badge that fires on the first answer
// and that the empirical review saw covering the post-answer controls.
const ID = "study-first";

beforeEach(() => {
  vi.useFakeTimers();
});
afterEach(() => {
  vi.runOnlyPendingTimers();
  vi.useRealTimers();
});

describe("AchievementToast — non-blocking placement + lifecycle", () => {
  it("renders the badge name and tier label", () => {
    render(<AchievementToast achievementId={ID} onClose={() => {}} />);
    expect(screen.getByText("はじめの一歩")).toBeTruthy();
    expect(screen.getByText(/バッジ獲得/)).toBeTruthy();
  });

  it("is anchored to the TOP, not the bottom (does not cover bottom controls)", () => {
    render(<AchievementToast achievementId={ID} onClose={() => {}} />);
    const toast = screen.getByTestId("achievement-toast");
    expect(toast.className).toMatch(/\btop-/);
    // The 致命傷⑧ bug was bottom-4; ensure no bottom anchoring remains.
    expect(toast.className).not.toMatch(/\bbottom-/);
  });

  it("auto-dismisses after ~5s", () => {
    const onClose = vi.fn();
    render(<AchievementToast achievementId={ID} onClose={onClose} />);
    expect(onClose).not.toHaveBeenCalled();
    act(() => {
      vi.advanceTimersByTime(5000);
    });
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it("pauses the auto-dismiss while hovered, resumes on leave", () => {
    const onClose = vi.fn();
    render(<AchievementToast achievementId={ID} onClose={onClose} />);
    const toast = screen.getByTestId("achievement-toast");

    fireEvent.mouseEnter(toast);
    act(() => {
      vi.advanceTimersByTime(10_000); // long past the 5s window
    });
    expect(onClose, "must not dismiss while hovered").not.toHaveBeenCalled();

    fireEvent.mouseLeave(toast);
    act(() => {
      vi.advanceTimersByTime(5000);
    });
    expect(onClose, "must dismiss after the pointer leaves").toHaveBeenCalledTimes(1);
  });

  it("closes immediately when the × button is clicked", () => {
    const onClose = vi.fn();
    render(<AchievementToast achievementId={ID} onClose={onClose} />);
    fireEvent.click(screen.getByRole("button", { name: "閉じる" }));
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it("renders nothing for an unknown achievement id", () => {
    const { container } = render(
      <AchievementToast achievementId="does-not-exist" onClose={() => {}} />,
    );
    expect(container.firstChild).toBeNull();
  });
});
