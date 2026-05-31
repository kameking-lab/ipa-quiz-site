import { describe, it, expect, beforeEach } from "vitest";
import { render, screen, cleanup } from "@testing-library/react";

import { LearningCalendar } from "@/components/home/LearningCalendar";

beforeEach(() => {
  cleanup();
  window.localStorage.clear();
});

// ホーム（最高トラフィック）の学習カレンダーは、各日が aria-label を持つ
// フォーカス可能な <button>（30個）で構成される。これらを束ねるコンテナに
// role="img" を付けると、img ロールは子孫を「presentational」として支援技術の
// ブラウズモードから隠すため、各日の詳細ラベル（日付・問題数・正答率）が
// スクリーンリーダー利用者に届かなくなる（ARIA 契約違反）。
// interactive な子を持つコンテナには role="group" が正しい（要約ラベルは
// グループ名として保持しつつ、子ボタンを正しく公開する）。
describe("LearningCalendar — ヒートマップコンテナの ARIA ロール", () => {
  it("ヒートマップは role=group で、interactive 子を隠す role=img ではない", async () => {
    render(<LearningCalendar />);
    // 要約ラベル付きのグループとして公開されている
    expect(
      await screen.findByRole("group", {
        name: "過去30日間の学習量ヒートマップ",
      }),
    ).toBeInTheDocument();
    // img ロール（子孫を隠す）でラップされていないこと＝退行ガード
    expect(
      screen.queryByRole("img", { name: "過去30日間の学習量ヒートマップ" }),
    ).toBeNull();
  });

  it("各日が aria-label を持つ button として公開される", async () => {
    render(<LearningCalendar />);
    await screen.findByRole("group", { name: "過去30日間の学習量ヒートマップ" });
    // 履歴なし時は全 30 日が「学習なし」ラベルのボタン
    const dayButtons = screen.getAllByRole("button", { name: /学習なし$/ });
    expect(dayButtons.length).toBe(30);
  });
});
