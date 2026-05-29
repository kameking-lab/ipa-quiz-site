import type * as React from "react";
import { describe, it, expect, beforeEach, vi } from "vitest";
import { render, screen, cleanup } from "@testing-library/react";

// recharts は ResizeObserver（jsdom に無い）を使うため no-op に差し替える。
// 検証対象の role="img" / aria-label は recharts の外側のラッパ div に付与している。
vi.mock("recharts", () => {
  const Passthrough = ({ children }: { children?: React.ReactNode }) => (
    <>{children}</>
  );
  return {
    ResponsiveContainer: Passthrough,
    Radar: Passthrough,
    RadarChart: Passthrough,
    PolarGrid: Passthrough,
    PolarAngleAxis: Passthrough,
    PolarRadiusAxis: Passthrough,
    Tooltip: Passthrough,
  };
});

import { DashboardProgress } from "@/components/account/tabs/DashboardProgress";

beforeEach(() => {
  cleanup();
  window.localStorage.clear();
});

// /account ダッシュボードの分野別習熟度レーダーチャートは role/aria-label を持たず、
// SR 利用者は図の意味を得られなかった（WCAG 1.1.1 Non-text Content）。ラッパ div に
// role="img" と説明ラベルを付与し、AT から単一の名前付き画像として扱われるようにする。
describe("DashboardProgress — レーダーチャートの代替テキスト (WCAG 1.1.1)", () => {
  it("分野別習熟度レーダーチャートが role=img と説明ラベルを持つ", async () => {
    render(<DashboardProgress />);
    expect(
      await screen.findByRole("img", {
        name: "分野別習熟度を示すレーダーチャート（直近10分野の正答率）",
      }),
    ).toBeInTheDocument();
  });
});
