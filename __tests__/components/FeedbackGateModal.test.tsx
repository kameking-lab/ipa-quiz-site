import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import { render, screen, cleanup, fireEvent, waitFor } from "@testing-library/react";

import { FeedbackGateModal } from "@/components/FeedbackGateModal";

beforeEach(() => {
  cleanup();
  window.localStorage.clear();
});

afterEach(() => {
  vi.unstubAllGlobals();
});

// フィードバックゲート（フィードバック駆動の無料枠解放）のコメント textarea は
// placeholder のみでアクセシブルネームを持たず、SR 利用者は用途を把握できなかった
// （placeholder はラベルの代替にならない / WCAG 4.1.2）。aria-label を付与する。
describe("FeedbackGateModal — コメント textarea のアクセシブルネーム", () => {
  it("コメント textarea がラベルで参照でき、textarea である", () => {
    render(<FeedbackGateModal open onClose={() => {}} />);
    const textarea = screen.getByLabelText("ご意見・改善要望（任意・1000 字以内）");
    expect(textarea.tagName).toBe("TEXTAREA");
  });
});

// radix Dialog は開いた時点の DialogTitle しか読み上げず、送信後にフォームを成功
// ビューへ差し替えても再アナウンスしないため、送信完了(無料枠解放)が SR に届かない。
// 常設の live region で送信完了を通知する(WCAG 4.1.3)。
describe("FeedbackGateModal — 送信完了の live region 通知", () => {
  it("送信前は通知が空で、送信後は role=status が無料枠解放を読み上げる", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn(async () => ({ ok: true, text: async () => "" })),
    );

    render(<FeedbackGateModal open onClose={() => {}} source="ai-limit" />);

    // 送信前は常設 live region が空（無通知）
    expect(screen.getByRole("status").textContent).toBe("");

    // 選択肢を1つ選び（ラジオを選択）、送信する
    fireEvent.click(screen.getByRole("radio", { name: "とても役に立った" }));
    fireEvent.click(screen.getByRole("button", { name: /送信して続ける/ }));

    // 送信完了が role=status へ反映される（成功ビューの ShareButtons も status を持つため
    // 全 status のうち live region 固有の文言 "受け付けました" を含むものがあることを確認）
    await waitFor(() => {
      const statuses = screen.getAllByRole("status");
      expect(
        statuses.some((s) => s.textContent?.includes("受け付けました")),
      ).toBe(true);
    });
  });
});
