import { act, cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
const account = vi.hoisted(() => ({ status: "authenticated" }));
vi.mock("@/components/account/AccountNavigation", () => ({ useAccountStatus: () => account.status }));
import { NotificationSettings } from "@/app/account/notifications/NotificationSettings";
import { readNotificationPrefs } from "@/lib/storage/notifications";
beforeEach(() => { cleanup(); localStorage.clear(); account.status = "authenticated"; });
afterEach(() => { cleanup(); vi.unstubAllGlobals(); });
describe("通知設定の実際の提供状態", () => {
  it("定期配信を募集せず、未提供のスイッチ・宛先入力を出さない", () => {
    render(<NotificationSettings />);
    expect(screen.getByText("定期メールの登録受付は終了しました。")).toBeInTheDocument();
    expect(screen.queryByRole("switch")).toBeNull();
    expect(screen.queryByRole("textbox")).toBeNull();
    expect(screen.queryByText(/毎日設定時刻|デイリーチャレンジや連続学習を通知/)).toBeNull();
  });
  it.each(["unauthenticated", "loading"])("%sでは送信操作を表示しない", status => {
    account.status = status; render(<NotificationSettings />);
    expect(screen.queryByRole("button", { name: "テストメールを送信" })).toBeNull();
  });
  it("送信先を入力させず、既存APIにテスト種別だけを送る", async () => {
    const fetchMock = vi.fn().mockResolvedValue(Response.json({ ok: true })); vi.stubGlobal("fetch", fetchMock);
    render(<NotificationSettings />); fireEvent.click(screen.getByRole("button", { name: "テストメールを送信" }));
    expect(await screen.findByText(/テストメールを送信しました/)).toBeInTheDocument();
    expect(fetchMock).toHaveBeenCalledWith("/api/email", expect.objectContaining({ body: JSON.stringify({ type: "test" }) }));
  });
  it("mocked応答を実送信成功と表示しない", async () => {
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue(Response.json({ ok: true, mocked: true })));
    render(<NotificationSettings />); fireEvent.click(screen.getByRole("button", { name: "テストメールを送信" }));
    expect(await screen.findByText("テストメールを送信できませんでした。")).toBeInTheDocument();
    expect(screen.queryByText(/送信しました/)).toBeNull();
  });
  it("ブラウザ許可の取得だけを完了し、serviceWorker.readyで待ち続けない", async () => {
    vi.stubGlobal("Notification", { permission: "default", requestPermission: vi.fn().mockResolvedValue("granted") });
    render(<NotificationSettings />); fireEvent.click(screen.getByRole("button", { name: "通知を許可" }));
    expect(await screen.findByText("このブラウザで通知を許可しました。")).toBeInTheDocument();
    expect(readNotificationPrefs().pushEnabled).toBe(true);
  });
  it("拒否された通知を許可済みと扱わない", async () => {
    vi.stubGlobal("Notification", { permission: "default", requestPermission: vi.fn().mockResolvedValue("denied") });
    render(<NotificationSettings />); fireEvent.click(screen.getByRole("button", { name: "通知を許可" }));
    expect(await screen.findByText("通知は許可されていません。")).toBeInTheDocument();
    expect(readNotificationPrefs().pushEnabled).toBe(false);
  });
  it("待機中からlive regionを常設して結果の変更を告知する", async () => {
    render(<NotificationSettings />); await act(async () => {});
    expect(screen.getByRole("status")).toHaveAttribute("aria-live", "polite");
    expect(screen.getByRole("status")).toBeEmptyDOMElement();
  });
});
