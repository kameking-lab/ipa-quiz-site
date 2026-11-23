import { describe, it, expect, beforeEach } from "vitest";
import { render, screen, cleanup, within } from "@testing-library/react";
import { LS_KEYS } from "@/lib/storage/keys";

import { LearningHeatmap } from "@/components/motivation/LearningHeatmap";

beforeEach(() => {
  cleanup();
  window.localStorage.clear();
});

// /account ダッシュボードの学習ヒートマップは、コンテナ <div> に aria-label を
// 付けていたが role が無かった。ARIA 仕様では role を持たない generic 要素は
// 命名禁止（Naming Prohibited）で、aria-label は多くの支援技術に無視される
// ため、ヒートマップの要約名が届かなかった。子セルは aria-label 付きの
// フォーカス可能 <button> として正しく公開されているため、コンテナには
// role="group" が適切（命名を有効化しつつ子ボタンを隠さない）。
describe("LearningHeatmap — コンテナの ARIA ロール", () => {
  it("ヒートマップが role=group で要約ラベルを持つ", async () => {
    render(<LearningHeatmap />);
    expect(
      await screen.findByRole("group", {
        name: "過去365日の学習ヒートマップ",
      }),
    ).toBeInTheDocument();
  });

  it("12週間の記録は日付と件数を読み上げ、操作のないセルをボタンにしない", async () => {
    render(<LearningHeatmap days={84} interactive={false} />);
    const calendar = await screen.findByRole("group", { name: "過去84日の学習ヒートマップ" });
    expect(within(calendar).getAllByRole("img")).toHaveLength(84);
    expect(within(calendar).queryByRole("button")).toBeNull();
    expect(within(calendar).getAllByRole("img")[0]).toHaveAccessibleName(/学習なし/);
  });

  it("カレンダーの件数に表示期間外の履歴を混ぜない", async () => {
    localStorage.setItem(LS_KEYS.history, JSON.stringify({ entries: [
      { id: "q1", selected: "ア", correct: true, at: Date.now() },
      { id: "q2", selected: "イ", correct: false, at: Date.now() },
      { id: "q3", selected: "ア", correct: true, at: Date.now() - 100 * 86400000 },
    ], starredIds: [] }));
    render(<LearningHeatmap days={84} interactive={false} />);
    await screen.findByRole("group", { name: "過去84日の学習ヒートマップ" });
    expect(screen.getByText("1", { selector: "strong" })).toBeInTheDocument();
    expect(screen.getByText("2", { selector: "strong" })).toBeInTheDocument();
    expect(screen.queryByText("3", { selector: "strong" })).toBeNull();
  });
});
