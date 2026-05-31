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
    Radar: Passthrough,
    RadarChart: Passthrough,
    PolarGrid: Passthrough,
    PolarAngleAxis: Passthrough,
    PolarRadiusAxis: Passthrough,
    Tooltip: Passthrough,
  };
});

import { WeaknessHeatmapClient } from "@/app/account/weakness/WeaknessHeatmapClient";

// 3 分野・21 回答（>=20 かつ chartData.length>=3）を満たす履歴を投入してチャートを描画させる。
const CATEGORY_BY_ID: Record<string, string> = {
  q1: "ネットワーク",
  q2: "ネットワーク",
  q3: "データベース",
  q4: "データベース",
  q5: "セキュリティ",
  q6: "セキュリティ",
  q7: "セキュリティ",
};

function seedHistory() {
  const ids = Object.keys(CATEGORY_BY_ID);
  const entries = ids.flatMap((id, i) =>
    [0, 1, 2].map((n) => ({
      id,
      selected: "ア",
      correct: (i + n) % 2 === 0,
      at: 1_700_000_000_000 + i * 1000 + n,
    })),
  );
  window.localStorage.setItem(
    LS_KEYS.history,
    JSON.stringify({ entries, starredIds: [] }),
  );
}

beforeEach(() => {
  cleanup();
  window.localStorage.clear();
});

// /account/weakness の分野別レーダーチャートは role/aria-label を持たず、SR 利用者は
// 図の意味を得られなかった（WCAG 1.1.1）。ラッパ div に role="img" と説明ラベルを付与する。
describe("WeaknessHeatmapClient — レーダーチャートの代替テキスト (WCAG 1.1.1)", () => {
  it("分野別レーダーチャートが role=img と説明ラベルを持つ", async () => {
    seedHistory();
    render(<WeaknessHeatmapClient categoryById={CATEGORY_BY_ID} />);
    expect(
      await screen.findByRole("img", {
        name: "分野別の正答率を示すレーダーチャート（各分野の正答率は下部の一覧でも確認できます）",
      }),
    ).toBeInTheDocument();
  });
});
