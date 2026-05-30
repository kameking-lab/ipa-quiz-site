import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import { render, screen, cleanup, fireEvent } from "@testing-library/react";

import { HistorySyncPanel } from "@/app/account/HistorySyncPanel";

beforeEach(() => {
  cleanup();
  localStorage.clear();
});

afterEach(() => {
  vi.unstubAllGlobals();
});

// 同期/エクスポートの結果メッセージは押下後に動的挿入されるため、
// role/aria-live を持たないと SR 利用者には成功・失敗が一切告知されない
// (WCAG 4.1.3 Status Messages)。成功=polite status、失敗=alert で告知する。
describe("HistorySyncPanel — 結果メッセージの SR 通知", () => {
  it("同期成功カードが role=status / aria-live=polite の live region で告知される", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue({
        ok: true,
        json: async () => ({ entries: [], merged: 3, total: 12 }),
      }),
    );

    render(<HistorySyncPanel />);
    fireEvent.click(screen.getByRole("button", { name: /クラウドと同期/ }));

    const status = await screen.findByRole("status");
    expect(status).toHaveAttribute("aria-live", "polite");
    expect(status).toHaveTextContent("同期完了");
  });

  it("同期失敗メッセージが role=alert で告知される", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue({
        ok: false,
        status: 503,
        text: async () => "unavailable",
      }),
    );

    render(<HistorySyncPanel />);
    fireEvent.click(screen.getByRole("button", { name: /クラウドと同期/ }));

    const alert = await screen.findByRole("alert");
    expect(alert).toHaveTextContent("同期失敗");
  });

  it("押下前は status / alert いずれの live region も存在しない", () => {
    render(<HistorySyncPanel />);
    expect(screen.queryByRole("status")).toBeNull();
    expect(screen.queryByRole("alert")).toBeNull();
  });
});
