import type * as React from "react";
import { describe, it, expect, beforeEach, vi } from "vitest";
import { render, screen, cleanup } from "@testing-library/react";

// recharts は ResizeObserver（jsdom に無い）を使うため、各 export を子をそのまま
// 通す no-op に差し替える。検証対象の role="img"/aria-label はチャートのラッパ
// <div>（recharts の外側）に付与しているのでラッパだけが残れば検証できる。
vi.mock("recharts", () => {
  const Passthrough = ({ children }: { children?: React.ReactNode }) => (
    <>{children}</>
  );
  return {
    Bar: Passthrough,
    BarChart: Passthrough,
    CartesianGrid: Passthrough,
    Line: Passthrough,
    LineChart: Passthrough,
    ResponsiveContainer: Passthrough,
    Tooltip: Passthrough,
    XAxis: Passthrough,
    YAxis: Passthrough,
  };
});

import { StatsCharts } from "@/app/transparency/StatsCharts";

beforeEach(() => {
  cleanup();
});

// /transparency（indexable）の2チャートは role/aria-label を持たず、本文に代替表現も
// 無いため SR 利用者は図の意味を得られなかった（WCAG 1.1.1）。ラッパ div に
// role="img" と説明ラベルを付与する。
describe("TransparencyStatsCharts — チャートの代替テキスト (WCAG 1.1.1)", () => {
  it("収録問題数の棒グラフが role=img と説明ラベルを持つ", () => {
    render(
      <StatsCharts
        byExam={[{ exam: "ap", label: "AP", count: 100 }]}
        monthlySeries={[{ month: "2026-01", users: 10, aiCalls: 5 }]}
      />,
    );
    expect(
      screen.getByRole("img", { name: "試験区分別の収録問題数を示す棒グラフ" }),
    ).toBeInTheDocument();
  });

  it("月次利用状況の折れ線グラフが role=img と説明ラベルを持つ", () => {
    render(
      <StatsCharts
        byExam={[{ exam: "ap", label: "AP", count: 100 }]}
        monthlySeries={[{ month: "2026-01", users: 10, aiCalls: 5 }]}
      />,
    );
    expect(
      screen.getByRole("img", {
        name: "月次のユニーク利用者数とAI呼び出し回数の推移を示す折れ線グラフ",
      }),
    ).toBeInTheDocument();
  });
});
