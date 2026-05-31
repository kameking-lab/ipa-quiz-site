import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import { render, screen, cleanup, fireEvent, waitFor } from "@testing-library/react";

import { ShareButtons } from "@/components/ShareButtons";

beforeEach(() => {
  cleanup();
  Object.assign(navigator, {
    clipboard: { writeText: vi.fn().mockResolvedValue(undefined) },
  });
});

afterEach(() => {
  vi.restoreAllMocks();
});

// URL コピー成功はボタン文言が「コピー済み」へ変わるだけで、ボタンの
// アクセシブル名変更は SR に自動告知されない(WCAG 4.1.3 Status Messages)。
// compact モードと同様に polite live region で告知する。
describe("ShareButtons — コピー成功の SR 通知", () => {
  it("full モードのコピーで polite live region に成功が反映される", async () => {
    render(<ShareButtons url="https://example.com/q" text="共有テスト" />);

    // 初期は live region は空(role=status は常設だが文言なし)
    const status = screen.getByRole("status");
    expect(status).toHaveAttribute("aria-live", "polite");
    expect(status).toHaveTextContent("");

    fireEvent.click(screen.getByRole("button", { name: /URL コピー/ }));

    await waitFor(() => {
      expect(screen.getByRole("status")).toHaveTextContent("URL をコピーしました");
    });
  });

  it("compact モードのコピー通知 live region も維持されている", async () => {
    render(<ShareButtons url="https://example.com/q" text="共有テスト" compact />);

    fireEvent.click(screen.getByRole("button", { name: /リンクをコピー/ }));

    await waitFor(() => {
      expect(screen.getByRole("status")).toHaveTextContent("リンクをコピーしました");
    });
  });
});
