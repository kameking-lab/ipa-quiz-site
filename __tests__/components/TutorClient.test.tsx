import type * as React from "react";
import { describe, it, expect, beforeEach, vi } from "vitest";
import { render, screen, cleanup } from "@testing-library/react";
import { LS_KEYS } from "@/lib/storage/keys";

vi.mock("recharts", () => {
  const Passthrough = ({ children }: { children?: React.ReactNode }) => (
    <>{children}</>
  );
  return {
    ResponsiveContainer: Passthrough,
    Bar: Passthrough,
    BarChart: Passthrough,
    CartesianGrid: Passthrough,
    Tooltip: Passthrough,
    XAxis: Passthrough,
    YAxis: Passthrough,
  };
});

import { TutorClient } from "@/app/account/tutor/TutorClient";

const CATEGORY_BY_ID: Record<string, string> = {
  q1: "ネットワーク",
  q2: "データベース",
};

function seedHistory() {
  // totalAttempts >= 5 でレポート（チャート含む）が描画される。
  const entries = [0, 1, 2, 3, 4, 5].map((n) => ({
    id: n % 2 === 0 ? "q1" : "q2",
    selected: "ア",
    correct: n % 2 === 0,
    at: 1_700_000_000_000 + n * 1000,
  }));
  window.localStorage.setItem(
    LS_KEYS.history,
    JSON.stringify({ entries, starredIds: [] }),
  );
}

beforeEach(() => {
  cleanup();
  window.localStorage.clear();
});

// /account/tutor の演習量バーチャートは role/aria-label を持たず、SR 利用者は図の意味を
// 得られなかった（WCAG 1.1.1）。ラッパ div に role="img" と説明ラベルを付与する。
describe("TutorClient — 演習量バーチャートの代替テキスト (WCAG 1.1.1)", () => {
  it("直近30日の演習量バーチャートが role=img と説明ラベルを持つ", async () => {
    seedHistory();
    render(<TutorClient categoryById={CATEGORY_BY_ID} />);
    expect(
      await screen.findByRole("img", {
        name: "直近30日間に解いた問題数の推移を示す棒グラフ",
      }),
    ).toBeInTheDocument();
  });
});
