import type * as React from "react";
import { describe, it, expect, beforeEach, vi } from "vitest";
import { render, screen, cleanup } from "@testing-library/react";

// recharts は ResizeObserver（jsdom に無い）を使うため、そのまま render すると
// 落ちる。検証対象の role="img" / aria-label は各チャートコンポーネント自身の
// ラッパ <div>（recharts の外側）に付与しているので、recharts の各 export を
// 子をそのまま通す no-op に差し替えてラッパだけを残し、クラッシュを回避する。
vi.mock("recharts", () => {
  const Passthrough = ({ children }: { children?: React.ReactNode }) => (
    <>{children}</>
  );
  return {
    Area: Passthrough,
    AreaChart: Passthrough,
    Bar: Passthrough,
    BarChart: Passthrough,
    CartesianGrid: Passthrough,
    Cell: Passthrough,
    Pie: Passthrough,
    PieChart: Passthrough,
    ResponsiveContainer: Passthrough,
    Tooltip: Passthrough,
    XAxis: Passthrough,
    YAxis: Passthrough,
    Legend: Passthrough,
  };
});

import {
  ContentByExamChart,
  ImpressionsTrendChart,
  FeatureBreakdownChart,
  ReferrerBreakdownChart,
} from "@/app/stats/StatsCharts";

beforeEach(() => {
  cleanup();
});

// /stats（indexable）のデータ可視化チャートは role/aria-label を持たず、SR 利用者は
// SVG 内の軸ラベルが断片的に読み上げられるだけで図の意味を得られなかった
// （WCAG 1.1.1 Non-text Content）。各チャートのラッパ div に role="img" と説明
// ラベルを付与し、AT から単一の名前付き画像として扱われるようにする。
describe("StatsCharts — データ可視化チャートの代替テキスト (WCAG 1.1.1)", () => {
  it("ContentByExamChart が role=img と説明ラベルを持つ", () => {
    render(<ContentByExamChart rows={[{ label: "AP", total: 100 }]} />);
    expect(
      screen.getByRole("img", { name: "試験区分別の収録問題数を示す棒グラフ" }),
    ).toBeInTheDocument();
  });

  it("ImpressionsTrendChart が role=img と説明ラベルを持つ", () => {
    render(
      <ImpressionsTrendChart
        trend={[{ date: "2026-01-01", impressions: 10, clicks: 1 }]}
      />,
    );
    expect(
      screen.getByRole("img", {
        name: "直近90日間のGoogle検索表示回数の推移を示す折れ線グラフ",
      }),
    ).toBeInTheDocument();
  });

  it("FeatureBreakdownChart が role=img と説明ラベルを持つ", () => {
    render(
      <FeatureBreakdownChart rows={[{ feature: "クイズ", pageviews: 10, pct: 50 }]} />,
    );
    expect(
      screen.getByRole("img", { name: "機能別アクセス比率を示す円グラフ" }),
    ).toBeInTheDocument();
  });

  it("ReferrerBreakdownChart が role=img と説明ラベルを持つ", () => {
    render(
      <ReferrerBreakdownChart rows={[{ source: "Search", pageviews: 10, pct: 50 }]} />,
    );
    expect(
      screen.getByRole("img", { name: "流入元の構成比を示す円グラフ" }),
    ).toBeInTheDocument();
  });
});
