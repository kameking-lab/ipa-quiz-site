import * as React from "react";
import { render, fireEvent } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { useQuizChoiceRoving } from "@/lib/a11y/use-quiz-choice-roving";

// Characterization tests for the quiz-choice roving-tabindex hook.
// Unlike useRovingRadioGroup, this hook is FOCUS-ONLY: arrow keys move the
// roving focus/tab stop but never commit a selection (committing a quiz choice
// reveals the answer irreversibly, so it stays on native button activation).

function Harness({
  selectedIndex = -1,
  disabled = false,
  resetKey = "q1",
  count = 3,
}: {
  selectedIndex?: number;
  disabled?: boolean;
  resetKey?: string;
  count?: number;
}) {
  const { getRadioProps } = useQuizChoiceRoving(count, selectedIndex, disabled, resetKey);
  return (
    <div role="radiogroup" aria-label="t">
      {Array.from({ length: count }, (_, i) => (
        <button key={i} role="radio" aria-checked={i === selectedIndex} {...getRadioProps(i)}>
          {i}
        </button>
      ))}
    </div>
  );
}

const tabIndexes = (radios: HTMLElement[]) => radios.map((r) => r.getAttribute("tabindex"));

describe("useQuizChoiceRoving", () => {
  it("before any selection the roved index (initially 0) is the single tab stop", () => {
    const { getAllByRole } = render(<Harness />);
    expect(tabIndexes(getAllByRole("radio"))).toEqual(["0", "-1", "-1"]);
  });

  it("Arrow keys move the roving focus/tab stop WITHOUT committing a selection", () => {
    const { getAllByRole } = render(<Harness />);
    fireEvent.keyDown(getAllByRole("radio")[0], { key: "ArrowDown" });
    const radios = getAllByRole("radio");
    // tab stop follows the roved focus (selectedIndex stayed -1 = not committed)
    expect(tabIndexes(radios)).toEqual(["-1", "0", "-1"]);
    expect(document.activeElement).toBe(radios[1]);
    // arrow moved focus only — no choice was committed (selection still empty)
    expect(radios[1].getAttribute("aria-checked")).toBe("false");
  });

  it("ArrowUp from the first wraps to the last; Home/End jump to ends", () => {
    const { getAllByRole } = render(<Harness />);
    fireEvent.keyDown(getAllByRole("radio")[0], { key: "ArrowUp" });
    expect(tabIndexes(getAllByRole("radio"))).toEqual(["-1", "-1", "0"]);

    fireEvent.keyDown(getAllByRole("radio")[2], { key: "Home" });
    expect(tabIndexes(getAllByRole("radio"))).toEqual(["0", "-1", "-1"]);

    fireEvent.keyDown(getAllByRole("radio")[0], { key: "End" });
    expect(tabIndexes(getAllByRole("radio"))).toEqual(["-1", "-1", "0"]);
  });

  it("a committed selectedIndex overrides the roved index as the tab stop", () => {
    const { getAllByRole } = render(<Harness selectedIndex={2} />);
    expect(tabIndexes(getAllByRole("radio"))).toEqual(["-1", "-1", "0"]);
  });

  it("when disabled (answer revealed) arrow keys are inert", () => {
    const { getAllByRole } = render(<Harness disabled />);
    fireEvent.keyDown(getAllByRole("radio")[0], { key: "ArrowDown" });
    // tab stop unchanged, focus not moved
    expect(tabIndexes(getAllByRole("radio"))).toEqual(["0", "-1", "-1"]);
    expect(document.activeElement).not.toBe(getAllByRole("radio")[1]);
  });

  it("a new question (changed resetKey) resets the roving focus to the first choice", () => {
    const { getAllByRole, rerender } = render(<Harness resetKey="q1" />);
    fireEvent.keyDown(getAllByRole("radio")[0], { key: "ArrowDown" });
    expect(tabIndexes(getAllByRole("radio"))).toEqual(["-1", "0", "-1"]);

    rerender(<Harness resetKey="q2" />);
    expect(tabIndexes(getAllByRole("radio"))).toEqual(["0", "-1", "-1"]);
  });
});
