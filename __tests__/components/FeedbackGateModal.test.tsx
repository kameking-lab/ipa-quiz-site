import { describe, it, expect, beforeEach } from "vitest";
import { render, screen, cleanup } from "@testing-library/react";

import { FeedbackGateModal } from "@/components/FeedbackGateModal";

beforeEach(() => {
  cleanup();
  window.localStorage.clear();
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
