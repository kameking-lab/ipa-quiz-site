import { describe, it, expect, beforeEach, vi } from "vitest";
import { render, screen, cleanup, fireEvent } from "@testing-library/react";

import { SessionSummaryDialog } from "@/components/motivation/SessionSummaryDialog";
import type { SessionSummary } from "@/lib/motivation/session";

function makeSummary(): SessionSummary {
  return {
    total: 10,
    correct: 8,
    accuracyPct: 80,
    durationSec: 300,
    byCategory: [],
    recommendedTomorrow: 13,
  };
}

beforeEach(() => {
  cleanup();
});

// シェアパネルの開閉ボタンは showShare state で SocialShare 領域を開閉する
// inline disclosure だが aria-expanded が無く、開閉状態が SR にプログラム的に
// 伝わらなかった（WCAG 4.1.2）。
describe("SessionSummaryDialog — シェア開閉ボタンの aria-expanded", () => {
  it("初期は aria-expanded='false'、クリックで 'true' に同期する", () => {
    render(<SessionSummaryDialog open summary={makeSummary()} onClose={vi.fn()} />);

    const toggle = screen.getByRole("button", { name: "SNSにシェアする" });
    expect(toggle.getAttribute("aria-expanded")).toBe("false");

    fireEvent.click(toggle);

    const opened = screen.getByRole("button", { name: "シェアパネルを閉じる" });
    expect(opened.getAttribute("aria-expanded")).toBe("true");
  });
});
