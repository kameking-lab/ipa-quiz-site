import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import { render, screen, cleanup } from "@testing-library/react";

import { MetricsDashboard } from "@/app/admin/metrics/MetricsDashboard";
import { buildMockMetrics } from "@/lib/admin/metrics/mock-data";

beforeEach(() => {
  // マウント時の /api/admin/metrics フェッチを無害化（永久 pending で state 更新なし）
  vi.stubGlobal(
    "fetch",
    vi.fn(() => new Promise(() => {})),
  );
});

afterEach(() => {
  cleanup();
  vi.unstubAllGlobals();
});

// 管理ダッシュボードのカスタム期間ピッカーの2つの date input が
// アクセシブルネームを持たず、SR 利用者はどちらが開始/終了日か把握できなかった
// （WCAG 4.1.2）。aria-label を付与する。
describe("MetricsDashboard — カスタム期間 date input のアクセシブルネーム", () => {
  function renderCustomRange() {
    const initial = buildMockMetrics({
      range: "custom",
      from: "2026-05-01",
      to: "2026-05-30",
      label: "カスタム",
      comparedFrom: "2026-04-01",
      comparedTo: "2026-04-30",
    });
    return render(<MetricsDashboard initial={initial} />);
  }

  it("集計開始日 input がラベルで参照でき、date input である", () => {
    renderCustomRange();
    const input = screen.getByLabelText("集計開始日");
    expect(input.tagName).toBe("INPUT");
    expect(input.getAttribute("type")).toBe("date");
  });

  it("集計終了日 input がラベルで参照でき、date input である", () => {
    renderCustomRange();
    const input = screen.getByLabelText("集計終了日");
    expect(input.tagName).toBe("INPUT");
    expect(input.getAttribute("type")).toBe("date");
  });
});

// 日次推移の折れ線グラフは近接する表/KPI に時系列の代替表現が無く図が唯一の表現。
// SR 利用者向けに role="img" + 説明ラベルを付与する（WCAG 1.1.1）。
// （role を外すと getByRole("img", { name }) が見つからず落ちる＝崩れたら落ちる検証）
describe("MetricsDashboard — 日次推移チャートの代替テキスト", () => {
  it("日次推移チャートが role=img と説明ラベルを持つ", () => {
    const initial = buildMockMetrics({
      range: "7d",
      from: "2026-05-24",
      to: "2026-05-30",
      label: "7日",
      comparedFrom: "2026-05-17",
      comparedTo: "2026-05-23",
    });
    render(<MetricsDashboard initial={initial} />);
    const chart = screen.getByRole("img", { name: "DAU と解答数の日次推移グラフ" });
    expect(chart).toBeTruthy();
  });
});
