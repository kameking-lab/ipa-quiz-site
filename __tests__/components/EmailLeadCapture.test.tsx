import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import { render, screen, cleanup, fireEvent, waitFor } from "@testing-library/react";

import { EmailLeadCapture } from "@/components/EmailLeadCapture";

beforeEach(() => {
  cleanup();
  localStorage.clear();
});

afterEach(() => {
  vi.unstubAllGlobals();
});

// メール登録フォームの送信結果(成功/重複/失敗)は視覚的なトーストでのみ表示され、
// role/aria-live を持たないため SR 利用者には一切フィードバックされなかった
// (WCAG 4.1.3 Status Messages)。トーストを常設の polite live region にして通知する。
describe("EmailLeadCapture — 送信結果の SR 通知", () => {
  it("結果トーストが role=status / aria-live=polite の live region で通知される", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue({
        ok: false,
        json: async () => ({ ok: false, error: "登録に失敗しました" }),
      }),
    );

    render(<EmailLeadCapture variant="home" />);

    // live region は常設(toast 無しでも DOM に存在)していること
    const status = screen.getByRole("status");
    expect(status).toHaveAttribute("aria-live", "polite");

    const input = screen.getByLabelText("メールアドレス");
    fireEvent.change(input, { target: { value: "a@example.com" } });
    fireEvent.submit(input.closest("form") as HTMLFormElement);

    // 送信後、エラー文言が同じ live region 内に反映されること
    await waitFor(() => expect(status).toHaveTextContent("登録に失敗しました"));
  });
});
