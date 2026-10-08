import type * as React from "react";
import { describe, it, expect, beforeEach, vi } from "vitest";
import { render, screen, cleanup, fireEvent } from "@testing-library/react";

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
      screen.getByRole("img", { name: "架空の分布による表示デモ。実受験者の人数ではありません" }),
    ).toBeInTheDocument();
  });
});

  it("display samples never enter real learning storage", () => {
    localStorage.clear();
    render(<RankingClient />);
    const before = {...localStorage};
    fireEvent.click(screen.getByRole("button", {name: "保存しないサンプルを表示"}));
    expect({...localStorage}).toEqual(before);
    expect(screen.getByText(/青いバーはデモのサンプル/)).toBeInTheDocument();
    expect(screen.getByText("履歴はまだありません。")).toBeInTheDocument();
    cleanup(); render(<RankingClient />);
    expect(screen.queryByText(/青いバーはデモのサンプル/)).toBeNull();
  });
