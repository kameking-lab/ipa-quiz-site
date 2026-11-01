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

// Former public E2E interaction contract, retained with explicitly synthetic
// component data after the original SC prompts were withdrawn from publication.
it("keeps all eight industry choices and changes only the selected visible panel", () => {
  const pairs = [
    ["it", "IT・情報サービス業"], ["manufacturing", "製造業"],
    ["finance", "金融業"], ["retail", "流通・小売業"],
    ["telecom", "通信業"], ["construction", "建設業"],
    ["healthcare", "医療・ヘルスケア"], ["public", "公共・自治体"],
  ] as const;
  const industries: SCEssayAnswer[] = pairs.map(([industryId, industryName]) => ({ industryId, industryName, intro: `${industryId} fixture intro`, body: "fixture body", conclusion: "fixture conclusion" }));
  const { container } = render(<EssayIndustryTabs industries={industries} pdfUrl="https://example.invalid/archive" />);
  const group = screen.getByRole("group", { name: "業種選択" });
  expect(group.querySelectorAll("button")).toHaveLength(8);
  expect(screen.getByRole("button", { name: pairs[0][1], exact: true }).getAttribute("aria-pressed")).toBe("true");
  for (const [id, label] of pairs) {
    const button = screen.getByRole("button", { name: label, exact: true });
    fireEvent.click(button);
    expect(button.getAttribute("aria-pressed")).toBe("true");
    expect(group.querySelectorAll('button[aria-pressed="true"]')).toHaveLength(1);
    const visible = container.querySelectorAll(":scope > section:not([hidden])");
    expect(visible).toHaveLength(1);
    expect(visible[0]?.textContent).toContain(`${id} fixture intro`);
    expect(screen.getByRole("heading", { name: `${label}の参考答案例`, exact: true })).toBeTruthy();
  }
});
