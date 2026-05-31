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
    Cell: Passthrough,
    CartesianGrid: Passthrough,
    ResponsiveContainer: Passthrough,
    Tooltip: Passthrough,
    XAxis: Passthrough,
    YAxis: Passthrough,
  };
});

import { RankingClient } from "@/app/ranking/RankingClient";

beforeEach(() => {
  cleanup();
});

// /ranking（indexable）のスコア分布チャートは role/aria-label を持たず、分布データは
// 図でしか提示されないため SR 利用者は図の意味を得られなかった（WCAG 1.1.1）。
// ラッパ div に role="img" と説明ラベルを付与する。
describe("RankingClient — スコア分布チャートの代替テキスト (WCAG 1.1.1)", () => {
  it("スコア分布の棒グラフが role=img と説明ラベルを持つ", () => {
    render(<RankingClient />);
    expect(
      screen.getByRole("img", { name: "模試の得点率分布を示す棒グラフ" }),
    ).toBeInTheDocument();
  });
});
