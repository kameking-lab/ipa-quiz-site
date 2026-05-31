import { describe, it, expect, beforeEach } from "vitest";
import { render, screen, cleanup } from "@testing-library/react";

import { AfternoonGradingDemo } from "@/components/demo/AfternoonGradingDemo";

beforeEach(() => {
  cleanup();
});

// 午後 AI 採点デモ(/demo/afternoon)の解答 textarea が placeholder のみで
// アクセシブルネームを持たず、SR 利用者はどの入力欄か把握できなかった
// (placeholder はラベル代替にならない / WCAG 4.1.2)。aria-label を付与する。
describe("AfternoonGradingDemo — 解答 textarea のアクセシブルネーム", () => {
  it("解答 textarea がラベルで参照でき、textarea である", () => {
    render(<AfternoonGradingDemo />);
    const textarea = screen.getByLabelText("解答を入力");
    expect(textarea.tagName).toBe("TEXTAREA");
  });
});
