import { describe, it, expect, beforeEach } from "vitest";
import { render, screen, cleanup } from "@testing-library/react";

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
});
