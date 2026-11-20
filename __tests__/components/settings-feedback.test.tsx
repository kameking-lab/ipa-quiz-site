import { cleanup, fireEvent, render, screen, waitFor } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
vi.mock("next/navigation", () => ({ useRouter: () => ({ push: vi.fn() }) }));
vi.mock("@/mobile/shared/contracts", () => ({ nativeClient: () => false }));
import { AccountDeletionClient } from "@/app/account/delete/AccountDeletionClient";
import { ApiKeysClient } from "@/app/account/api-keys/ApiKeysClient";
import { appendApiKey } from "@/lib/api-keys/storage";
import { LS_KEYS } from "@/lib/storage/keys";
beforeEach(() => { cleanup(); localStorage.clear(); });
afterEach(() => { cleanup(); vi.restoreAllMocks(); vi.unstubAllGlobals(); });
function confirmDelete() { fireEvent.change(screen.getByRole("textbox"), { target: { value: "DELETE" } }); fireEvent.click(screen.getByRole("button", { name: "アカウントとデータを完全に削除" })); }
describe("削除の結果と再試行", () => {
  it("確認文字列が一致するまで削除しない", () => {
    render(<AccountDeletionClient />);
    expect(screen.getByRole("button", { name: "アカウントとデータを完全に削除" })).toBeDisabled();
    fireEvent.change(screen.getByRole("textbox"), { target: { value: "delete" } });
    expect(screen.getByRole("button", { name: "アカウントとデータを完全に削除" })).toBeDisabled();
  });
  it("サーバー失敗では入力と端末履歴を保持し、生のエラーを出さない", async () => {
    localStorage.setItem(LS_KEYS.history, "fixture");
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue(Response.json({ error: "private_internal_failure" }, { status: 503 })));
    render(<AccountDeletionClient />); confirmDelete();
    await screen.findByText("アカウントを削除できませんでした。もう一度お試しください。");
    expect(screen.getByRole("textbox")).toHaveValue("DELETE"); expect(localStorage.getItem(LS_KEYS.history)).toBe("fixture");
    expect(screen.queryByText("private_internal_failure")).toBeNull();
  });
  it("再認証が必要なら本人確認の操作を示し、確認入力を保持する", async () => {
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue(Response.json({ error: "reauthentication_required" }, { status: 401 })));
    render(<AccountDeletionClient />); confirmDelete();
    expect(await screen.findByRole("button", { name: "再ログインして本人確認" })).toBeInTheDocument();
    expect(screen.getByRole("textbox")).toHaveValue("DELETE");
  });
  it("完了後に削除操作を消し、完了メッセージへフォーカスを移す", async () => {
    const fetchMock = vi.fn().mockResolvedValue(Response.json({ deleted: true })); vi.stubGlobal("fetch", fetchMock);
    localStorage.setItem(LS_KEYS.history, "fixture"); render(<AccountDeletionClient />); confirmDelete();
    const message = await screen.findByText("アカウントとこの端末のデータを削除しました。");
    await waitFor(() => expect(message).toHaveFocus()); expect(localStorage.getItem(LS_KEYS.history)).toBeNull();
    expect(screen.queryByRole("button")).toBeNull(); expect(fetchMock).toHaveBeenCalledTimes(1);
  });
  it("サーバー削除済みの端末消去の再試行ではサーバーを再度削除しない", async () => {
    const fetchMock = vi.fn().mockResolvedValue(Response.json({ deleted: true })); vi.stubGlobal("fetch", fetchMock);
    localStorage.setItem(LS_KEYS.history, "fixture"); vi.spyOn(Storage.prototype, "removeItem").mockImplementationOnce(() => { throw Error("device"); });
    render(<AccountDeletionClient />); confirmDelete();
    fireEvent.click(await screen.findByRole("button", { name: "端末データ消去を再試行" }));
    await screen.findByText("アカウントとこの端末のデータを削除しました。"); expect(fetchMock).toHaveBeenCalledTimes(1);
  });
  it("端末だけの消去でアカウント削除APIを呼ばない", async () => {
    const fetchMock = vi.fn(); vi.stubGlobal("fetch", fetchMock); localStorage.setItem(LS_KEYS.history, "fixture");
    render(<AccountDeletionClient />); fireEvent.change(screen.getByRole("textbox"), { target: { value: "DELETE" } });
    fireEvent.click(screen.getByRole("button", { name: "この端末のデータだけ消去" }));
    await screen.findByText(/サーバーの削除結果は確認できていません/); expect(fetchMock).not.toHaveBeenCalled();
  });
});
describe("APIキーのコピー", () => {
  it("失敗を読み上げ、再試行で成功したら失敗表示を消す", async () => {
    appendApiKey({ id: "fixture", name: "表示確認", prefix: "fixture", secret: "fixture-only-value", createdAt: "2026-11-17T00:00:00Z" });
    const writeText = vi.fn().mockRejectedValueOnce(Error("denied")).mockResolvedValue(undefined);
    vi.stubGlobal("navigator", { clipboard: { writeText } }); render(<ApiKeysClient />);
    fireEvent.click(screen.getByRole("button", { name: "「表示確認」をコピー" }));
    expect(await screen.findByText("コピーできませんでした。キーを表示してコピーしてください。")).toBeInTheDocument();
    fireEvent.click(screen.getByRole("button", { name: "「表示確認」をコピー" }));
    await screen.findByText("API キーをコピーしました"); expect(screen.queryByText(/コピーできませんでした/)).toBeNull();
  });
});
