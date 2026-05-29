import { describe, it, expect, beforeEach } from "vitest";
import { render, screen, cleanup } from "@testing-library/react";

import { StudyPlanClient } from "@/app/account/study-plan/StudyPlanClient";

beforeEach(() => {
  cleanup();
  window.localStorage.clear();
});

// 「受験する試験」select と「試験日」input の可視ラベルが htmlFor で関連付いておらず、
// SR 利用者はアクセシブルネームを得られなかった（WCAG 1.3.1 / 4.1.2）。
// label[htmlFor] + control[id] で関連付ける。
describe("StudyPlanClient — フォームコントロールのラベル関連付け", () => {
  it("「受験する試験」select がラベルで参照できる", () => {
    render(<StudyPlanClient />);
    const select = screen.getByLabelText("受験する試験");
    expect(select.tagName).toBe("SELECT");
  });

  it("「試験日」input がラベルで参照できる", () => {
    render(<StudyPlanClient />);
    const input = screen.getByLabelText("試験日");
    expect(input.tagName).toBe("INPUT");
    expect(input.getAttribute("type")).toBe("date");
  });
});
