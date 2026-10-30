import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import { render, screen, cleanup, fireEvent, waitFor } from "@testing-library/react";

import { HistorySyncPanel } from "@/app/account/HistorySyncPanel";

beforeEach(() => {
  cleanup();
  localStorage.clear();
});

afterEach(() => {
  cleanup();
  vi.unstubAllGlobals();
});

function mockSyncResponse(response: object) {
  vi.stubGlobal("fetch", vi.fn(async (input: RequestInfo | URL) =>
    String(input) === "/api/auth/session"
      ? { ok: true, json: async () => ({ user: { id: "a11y-user", email: "a11y@example.invalid" } }) }
      : response,
  ));
}

async function renderReadyPanel() {
  render(<HistorySyncPanel />);
  const confirmation = await screen.findByRole("checkbox");
  const button = screen.getByRole("button", { name: /クラウドと同期/ });
  expect(button).toBeDisabled();
  fireEvent.click(confirmation);
  await waitFor(() => expect(button).not.toBeDisabled());
  return button;
}

// 同期/エクスポートの結果メッセージは押下後に動的挿入されるため、
// role/aria-live を持たないと SR 利用者には成功・失敗が一切告知されない
// (WCAG 4.1.3 Status Messages)。成功=polite status、失敗=alert で告知する。
describe("HistorySyncPanel — 結果メッセージの SR 通知", () => {
  it("同期成功カードが role=status / aria-live=polite の live region で告知される", async () => {
    mockSyncResponse({
      ok: true,
      json: async () => ({ entries: [], merged: 3, total: 12 }),
    });

    fireEvent.click(await renderReadyPanel());

    const status = await screen.findByRole("status");
    expect(status).toHaveAttribute("aria-live", "polite");
    expect(status).toHaveTextContent("同期完了");
  });

  it("同期失敗メッセージが role=alert で告知される", async () => {
    mockSyncResponse({
      ok: false,
      status: 503,
      text: async () => "unavailable",
    });

    fireEvent.click(await renderReadyPanel());

    const alert = await screen.findByRole("alert");
    expect(alert).toHaveTextContent("同期に失敗");
  });

  it("押下前は status / alert いずれの live region も存在しない", async () => {
    mockSyncResponse({ ok: true, json: async () => ({ entries: [], merged: 0, total: 0 }) });
    await renderReadyPanel();
    expect(screen.queryByRole("status")).toBeNull();
    expect(screen.queryByRole("alert")).toBeNull();
  });
});
