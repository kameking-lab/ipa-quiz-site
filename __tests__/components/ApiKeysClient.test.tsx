import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import { render, screen, cleanup, fireEvent, waitFor } from "@testing-library/react";

import { ApiKeysClient } from "@/app/account/api-keys/ApiKeysClient";

beforeEach(() => {
  cleanup();
  localStorage.clear();
  Object.assign(navigator, {
    clipboard: { writeText: vi.fn().mockResolvedValue(undefined) },
  });
});

afterEach(() => {
  vi.restoreAllMocks();
});

// API キーのコピー成功はボタン文言が「コピー済」へ変わるだけで、ボタンの
// アクセシブル名変更は SR に自動告知されない(WCAG 4.1.3 Status Messages)。
// 共有 polite live region で告知する。
describe("ApiKeysClient — コピー成功の SR 通知", () => {
  it("キーのコピーで polite live region に成功が反映される", async () => {
    render(<ApiKeysClient />);

    const status = screen.getByRole("status");
    expect(status).toHaveAttribute("aria-live", "polite");
    expect(status).toHaveTextContent("");

    // キーを 1 件発行してからコピー
    fireEvent.click(screen.getByRole("button", { name: /発行する/ }));
    fireEvent.click(screen.getByRole("button", { name: /^コピー$/ }));

    await waitFor(() => {
      expect(screen.getByRole("status")).toHaveTextContent("API キーをコピーしました");
    });
  });
});
