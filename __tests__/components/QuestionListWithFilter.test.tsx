import { describe, it, expect, beforeEach } from "vitest";
import { render, screen, cleanup } from "@testing-library/react";

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

describe("年度一覧の解答状況", () => {
  it("全問を表示し、誤答履歴は同じ資格の復習へつなぐ", () => {
    render(<QuestionListWithFilter groups={makeGroups()} exam="ap" />);
    expect(screen.getByRole("link", { name: "問1を解く" })).toBeVisible();
    expect(screen.getByRole("link", { name: "問2を解く" })).toBeVisible();
    expect(screen.getByRole("link", { name: "間違えた問題を復習" }))
      .toHaveAttribute("href", "/quiz?exam=ap&mode=review&reviewKind=wrong");
    expect(screen.queryByRole("button", { name: "未解答のみ" })).toBeNull();
  });

  it("出題区分のアンカーと解答済み表示を残す", () => {
    localStorage.setItem(LS_KEYS.history, JSON.stringify({ entries: [{ id: "ap-2024a-am-q1", correct: true }] }));
    render(<QuestionListWithFilter showSectionNavigation exam="ap" groups={[{ ...makeGroups()[0]!, id: "required" }]} />);
    expect(screen.getByRole("navigation", { name: "出題区分へ移動" }).querySelector("a")).toHaveAttribute("href", "#required");
    expect(screen.getByText("正解")).toBeVisible();
    expect(screen.queryByRole("link", { name: "間違えた問題を復習" })).toBeNull();
  });
});
