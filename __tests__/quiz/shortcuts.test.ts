import { describe, expect, it } from "vitest";
import {
  choiceShortcutIndex,
  choiceShortcutLabel,
  shortcutHelpRows,
  shouldIgnoreQuizShortcut,
} from "@/lib/quiz/shortcuts";

describe("quiz shortcut contract", () => {
  it.each([
    [4, "1〜4"],
    [5, "1〜5"],
    [10, "1〜9・0"],
    [11, "1〜9・0（先頭10肢）"],
  ] as const)("describes only actionable choices for %i choices", (count, label) => {
    expect(choiceShortcutLabel(count)).toBe(label);
    expect(choiceShortcutIndex(String(Math.min(count, 9)), count)).toBe(Math.min(count, 9) - 1);
  });

  it("maps zero to the tenth choice but never invents an eleventh shortcut", () => {
    expect(choiceShortcutIndex("0", 9)).toBe(-1);
    expect(choiceShortcutIndex("0", 10)).toBe(9);
    expect(choiceShortcutIndex("0", 11)).toBe(9);
    expect(choiceShortcutIndex("a", 11)).toBe(-1);
    expect(choiceShortcutIndex("11", 11)).toBe(-1);
  });

  it("describes next and review keys only in the mode that implements them", () => {
    const main = shortcutHelpRows("main", 5);
    const stream = shortcutHelpRows("stream", 5);
    expect(main).toContainEqual({ keys: "1〜5", description: "選択肢を選ぶ（選択式のみ）" });
    expect(main.some(({ keys }) => keys === "R")).toBe(true);
    expect(main.some(({ keys }) => keys === "Enter / Space / →")).toBe(true);
    expect(stream.some(({ keys }) => keys === "R" || keys.includes("Space"))).toBe(false);
    expect(stream.some(({ keys }) => keys === "Enter")).toBe(true);
    expect(shortcutHelpRows("main", 0).some(({ description }) => description.includes("選択肢"))).toBe(false);
  });

  it("describes only choice focus and selection on detail pages", () => {
    const detail = shortcutHelpRows("detail", 11);
    expect(detail).toContainEqual({ keys: "1〜9・0（先頭10肢）", description: "選択肢を選ぶ（選択式のみ）" });
    expect(detail).toContainEqual({ keys: "矢印キー", description: "選択肢間でフォーカスを移動" });
    expect(detail).toContainEqual({ keys: "Enter / Space", description: "フォーカスした選択肢を選ぶ" });
    expect(detail.some(({ keys }) => keys === "R" || keys.includes("→") || keys === "Enter")).toBe(false);
    expect(shortcutHelpRows("detail", 0).map(({ keys }) => keys)).toEqual(["?", "Esc"]);
  });

  it("leaves typing controls, dialogs, action buttons and browser modifiers alone", () => {
    const target = document.createElement("input");
    const event = new KeyboardEvent("keydown", { key: "1" });
    Object.defineProperty(event, "target", { value: target });
    expect(shouldIgnoreQuizShortcut(event)).toBe(true);
    const dialog = document.createElement("div");
    dialog.setAttribute("role", "dialog");
    dialog.appendChild(target);
    expect(shouldIgnoreQuizShortcut(event, true)).toBe(true);
    for (const modifier of [{ ctrlKey: true }, { metaKey: true }, { altKey: true }]) {
      expect(shouldIgnoreQuizShortcut(new KeyboardEvent("keydown", { key: "1", ...modifier }))).toBe(true);
    }
    const button = document.createElement("button");
    const buttonEvent = new KeyboardEvent("keydown", { key: "Enter" });
    Object.defineProperty(buttonEvent, "target", { value: button });
    expect(shouldIgnoreQuizShortcut(buttonEvent)).toBe(true);
    button.setAttribute("role", "radio");
    expect(shouldIgnoreQuizShortcut(buttonEvent, true)).toBe(false);
  });
});
