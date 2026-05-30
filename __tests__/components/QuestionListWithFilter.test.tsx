import { describe, it, expect, beforeEach } from "vitest";
import { render, screen, fireEvent, cleanup } from "@testing-library/react";

import {
  QuestionListWithFilter,
  type SessionGroup,
} from "@/app/[exam]/[yearSeason]/QuestionListWithFilter";
import { LS_KEYS } from "@/lib/storage/keys";

function makeGroups(): SessionGroup[] {
  return [
    {
      session: "am",
      items: [
        {
          id: "ap-2024a-am-q1",
          qNumber: 1,
          category: "テクノロジ系",
          isCalculation: false,
          isPlaceholder: false,
          questionPreview: "問1の問題文プレビュー。",
          href: "/q/ap/2024-spring/am/q1",
        },
        {
          id: "ap-2024a-am-q2",
          qNumber: 2,
          category: "マネジメント系",
          isCalculation: false,
          isPlaceholder: false,
          questionPreview: "問2の問題文プレビュー。",
          href: "/q/ap/2024-spring/am/q2",
        },
      ],
    },
  ];
}

beforeEach(() => {
  cleanup();
  window.localStorage.clear();
  // 解答状況フィルターは answered > 0 のときだけ描画されるため履歴を投入する。
  window.localStorage.setItem(
    LS_KEYS.history,
    JSON.stringify({ entries: [{ id: "ap-2024a-am-q1", correct: false }] }),
  );
});

// 解答状況フィルター（全て/未解答のみ/不正解のみ）はセグメント型のトグルであり、
// 矢印キーや tabpanel の暗黙契約を満たさないため role="tab"/aria-selected を使わず、
// codebase 既定の aria-pressed トグル（AfternoonResultView と統一）で実装する。
describe("QuestionListWithFilter — 解答状況フィルター A11y", () => {
  it("フィルターは aria-pressed トグルで、tab ロールを名乗らない", () => {
    render(<QuestionListWithFilter groups={makeGroups()} />);

    expect(screen.queryAllByRole("tab")).toHaveLength(0);
    expect(screen.queryAllByRole("tablist")).toHaveLength(0);

    // 初期フィルターは "all" = 「全て」が pressed
    const all = screen.getByRole("button", { name: /全て/ });
    expect(all.getAttribute("aria-pressed")).toBe("true");

    const unanswered = screen.getByRole("button", { name: /未解答のみ/ });
    expect(unanswered.getAttribute("aria-pressed")).toBe("false");
  });

  it("フィルターを切り替えると pressed 状態が移る", () => {
    render(<QuestionListWithFilter groups={makeGroups()} />);

    fireEvent.click(screen.getByRole("button", { name: /未解答のみ/ }));

    expect(
      screen.getByRole("button", { name: /未解答のみ/ }).getAttribute("aria-pressed"),
    ).toBe("true");
    expect(
      screen.getByRole("button", { name: /全て/ }).getAttribute("aria-pressed"),
    ).toBe("false");
  });
});
