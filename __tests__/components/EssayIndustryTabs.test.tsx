import { describe, it, expect, beforeEach } from "vitest";
import { render, screen, fireEvent, cleanup } from "@testing-library/react";

import EssayIndustryTabs from "@/app/essays/[exam]/[yearSeason]/[section]/[qnum]/_components/EssayIndustryTabs";
import type { SCEssayAnswer } from "@/lib/essays/types";

function makeIndustries(): SCEssayAnswer[] {
  return [
    {
      industryId: "it",
      industryName: "IT・情報サービス業",
      intro: "IT序論サンプル。",
      body: "IT本論サンプル。",
      conclusion: "IT結論サンプル。",
    },
    {
      industryId: "manufacturing",
      industryName: "製造業",
      intro: "製造業序論サンプル。",
      body: "製造業本論サンプル。",
      conclusion: "製造業結論サンプル。",
    },
  ];
}

beforeEach(() => {
  cleanup();
});

// 業種セレクタは「タブ」ではなく aria-pressed トグルボタン群（codebase 既定の
// セグメント UI 慣用＝AfternoonResultView と統一）。role="tab"/aria-selected は
// 矢印キーや tabpanel の暗黙契約を約束してしまうが本実装はそれを満たさないため使わない。
describe("EssayIndustryTabs — 業種セレクタ A11y", () => {
  it("業種ボタンは aria-pressed トグルで、tab ロールを使わない", () => {
    render(<EssayIndustryTabs industries={makeIndustries()} pdfUrl="https://example.com/q.pdf" />);

    // tab ロールが存在しない（壊れたタブ契約を名乗らない）
    expect(screen.queryAllByRole("tab")).toHaveLength(0);
    expect(screen.queryAllByRole("tablist")).toHaveLength(0);

    // INDUSTRY_ORDER 先頭の "it" が初期選択 = aria-pressed=true
    const it = screen.getByRole("button", { name: "IT・情報サービス業" });
    expect(it.getAttribute("aria-pressed")).toBe("true");

    const mfg = screen.getByRole("button", { name: "製造業" });
    expect(mfg.getAttribute("aria-pressed")).toBe("false");
  });

  it("業種を選ぶと pressed 状態と模範答案が切り替わる", () => {
    render(<EssayIndustryTabs industries={makeIndustries()} pdfUrl="https://example.com/q.pdf" />);

    fireEvent.click(screen.getByRole("button", { name: "製造業" }));

    expect(
      screen.getByRole("button", { name: "製造業" }).getAttribute("aria-pressed"),
    ).toBe("true");
    expect(
      screen.getByRole("button", { name: "IT・情報サービス業" }).getAttribute("aria-pressed"),
    ).toBe("false");
    // 製造業の模範答案（序論）が表示される
    expect(screen.getByText("製造業序論サンプル。")).toBeTruthy();
  });
});
