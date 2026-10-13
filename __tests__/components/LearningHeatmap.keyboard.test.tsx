import { beforeEach, describe, expect, it } from "vitest";
import { act, cleanup, fireEvent, render, screen, within } from "@testing-library/react";
import { LearningHeatmap } from "@/components/motivation/LearningHeatmap";

beforeEach(() => {
  cleanup();
  window.localStorage.clear();
});

describe("LearningHeatmap keyboard navigation", () => {
  it("uses one Tab stop and supports day, week, and boundary navigation", async () => {
    render(<LearningHeatmap days={14} />);
    const group = await screen.findByRole("group", { name: "過去14日の学習ヒートマップ" });
    const buttons = within(group).getAllByRole("button");
    expect(buttons).toHaveLength(14);
    expect(buttons.filter((button) => button.tabIndex === 0)).toEqual([buttons[13]]);

    act(() => buttons[13]?.focus());
    fireEvent.keyDown(buttons[13]!, { key: "ArrowUp" });
    expect(buttons[12]).toHaveFocus();
    expect(buttons.filter((button) => button.tabIndex === 0)).toEqual([buttons[12]]);

    fireEvent.keyDown(buttons[12]!, { key: "ArrowLeft" });
    expect(buttons[5]).toHaveFocus();
    fireEvent.keyDown(buttons[5]!, { key: "Home" });
    expect(buttons[0]).toHaveFocus();
    fireEvent.keyDown(buttons[0]!, { key: "End" });
    expect(buttons[13]).toHaveFocus();

    fireEvent.click(buttons[13]!);
    expect(screen.getByRole("status")).toHaveTextContent(buttons[13]!.getAttribute("aria-label") ?? "");
  });
});
