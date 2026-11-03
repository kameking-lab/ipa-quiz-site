import { describe, it, expect, beforeEach } from "vitest";
import { render, screen, cleanup, fireEvent } from "@testing-library/react";

import { StudyPlanClient } from "@/app/account/study-plan/StudyPlanClient";

beforeEach(() => {
  cleanup();
  window.localStorage.clear();
});

// 「受験する試験」と「学習期間」の可視ラベルをフォームに関連付ける。
// SR 利用者はアクセシブルネームを得られなかった（WCAG 1.3.1 / 4.1.2）。
// label[htmlFor] + control[id] で関連付ける。
describe("StudyPlanClient — フォームコントロールのラベル関連付け", () => {
  it("「受験する試験」select がラベルで参照できる", () => {
    render(<StudyPlanClient />);
    const select = screen.getByLabelText("受験する試験");
    expect(select.tagName).toBe("SELECT");
  });

  it("「学習期間」select がラベルで参照できる", () => {
    render(<StudyPlanClient />);
    const select = screen.getByLabelText("学習期間");
    expect(select.tagName).toBe("SELECT");
  });
});

describe("StudyPlanClient — 学習期間", () => {
  it("4週間の演習目標を算出し、試験日のカウントダウンを表示しない", () => {
    render(<StudyPlanClient />);
    fireEvent.click(screen.getByText("学習プランを生成"));
    expect(screen.getByText("28日")).toBeInTheDocument();
    expect(screen.queryByText("残り日数")).toBeNull();
    expect(screen.getByRole("link", { name: /試験日・申込締切を「次の資格」で確認/ })).toHaveAttribute("href", "https://tsugino-shikaku.jp/shikaku/kihon-joho");
  });
});
