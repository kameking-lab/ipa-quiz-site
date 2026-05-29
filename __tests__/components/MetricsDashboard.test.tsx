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
