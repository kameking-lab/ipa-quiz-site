import { act, cleanup, fireEvent, render, screen, waitFor } from "@testing-library/react";
import { beforeEach, afterEach, describe, expect, it, vi } from "vitest";
import { CloudSyncAutoSync } from "@/components/sync/CloudSyncAutoSync";
import { CloudSyncPanel } from "@/components/account/CloudSyncPanel";
import { HistorySyncPanel } from "@/app/account/HistorySyncPanel";
import { LS_KEYS } from "@/lib/storage/keys";
import type { SyncAllResult } from "@/lib/sync";
const mock = vi.hoisted(() => ({ syncAll: vi.fn(), history: vi.fn() }));
vi.mock("@/lib/sync", () => ({ syncAll: mock.syncAll, readSyncMeta: () => ({ lastSyncedAt: 0 }) }));
vi.mock("@/lib/sync/history-sync", () => ({ syncHistory: mock.history }));
let user: string;
function result(overall: SyncAllResult["overall"]): SyncAllResult {
  return { overall, userId: user, byType: {
    history: { state: "ok", merged: 0, total: 0 },
    bookmarks: { state: "ok", merged: 0, total: 0 },
    customTags: { state: "ok", merged: 0, total: 0 },
    studyPlans: overall === "ok" ? { state: "ok", merged: 0, total: 0 } : { state: "error", message: "offline" },
  } };
}
function owner() { localStorage.setItem(LS_KEYS.syncLocalOwner, JSON.stringify({ userId: user, token: user + "-token" })); }
beforeEach(() => {
  user = "A";
  localStorage.clear();
  sessionStorage.clear();
  vi.clearAllMocks();
  vi.stubGlobal("fetch", vi.fn(async () => ({ ok: true, json: async () => ({ user: { id: user, email: user + "@example.invalid" } }) })));
  mock.syncAll.mockImplementation(async () => result("ok"));
  mock.history.mockResolvedValue({ state: "ok", merged: 0, total: 0 });
});
afterEach(() => { cleanup(); vi.unstubAllGlobals(); });
describe("optional browser-data import UI", () => {
  it.each([["history", HistorySyncPanel], ["all", CloudSyncPanel]] as const)("%s entry waits for explicit optional confirmation and passes the displayed user", async (kind, Panel) => {
    render(<Panel />);
    const checkbox = await screen.findByRole("checkbox");
    const button = screen.getByRole("button", { name: kind === "history" ? "クラウドと同期" : "今すぐ同期" });
    expect(button).toBeDisabled();
    expect(mock.syncAll).not.toHaveBeenCalled();
    expect(mock.history).not.toHaveBeenCalled();
    expect(screen.getByText(/引継ぎは任意/)).toBeTruthy();
    fireEvent.click(checkbox);
    expect(button).not.toBeDisabled();
    fireEvent.click(button);
    await waitFor(() => expect(kind === "history" ? mock.history : mock.syncAll).toHaveBeenCalledWith({
      expectedUserId: "A", confirmUnowned: true,
    }));
  });
  it("keeps another owner's data on hold in the manual history entry", async () => {
    user = "B";
    owner();
    user = "A";
    render(<HistorySyncPanel />);
    await screen.findByText(/同期を保留しています/);
    expect(screen.queryByRole("checkbox")).toBeNull();
    expect(screen.getByRole("button", { name: "クラウドと同期" })).toBeDisabled();
    expect(mock.history).not.toHaveBeenCalled();
  });
  it("shows partial failure in the manual panel", async () => {
    owner();
    mock.syncAll.mockImplementation(async () => result("partial"));
    render(<CloudSyncPanel />);
    const button = await screen.findByRole("button", { name: "今すぐ同期" });
    await waitFor(() => expect(button).not.toBeDisabled());
    fireEvent.click(button);
    await screen.findByText(/一部の同期に失敗しました/);
  });
});
describe("automatic completion and retries", () => {
  it("does not send unowned data automatically", async () => {
    render(<CloudSyncAutoSync />);
    await waitFor(() => expect(fetch).toHaveBeenCalled());
    await act(async () => { await Promise.resolve(); });
    expect(mock.syncAll).not.toHaveBeenCalled();
  });
  it("retries partial on focus, and records success only after all types complete", async () => {
    owner();
    mock.syncAll.mockImplementationOnce(async () => result("partial"));
    render(<CloudSyncAutoSync />);
    await screen.findByText(/一部の同期に失敗しました/);
    expect(sessionStorage.getItem(LS_KEYS.syncSessionSuccessPrefix + "A")).toBeNull();
    expect(sessionStorage.getItem(LS_KEYS.syncSessionInFlightPrefix + "A")).toBeNull();
    fireEvent(window, new Event("focus"));
    await screen.findByText("学習履歴・ブックマーク・タグ・学習計画を同期しました。");
    expect(mock.syncAll).toHaveBeenCalledTimes(2);
    expect(sessionStorage.getItem(LS_KEYS.syncSessionSuccessPrefix + "A")).toBe("1");
    fireEvent(window, new Event("focus"));
    await act(async () => { await Promise.resolve(); });
    expect(mock.syncAll).toHaveBeenCalledTimes(2);
  });
  it("keeps in-flight and success guards scoped to the current user", async () => {
    owner();
    let finish!: (value: SyncAllResult) => void;
    mock.syncAll.mockImplementationOnce(() => new Promise<SyncAllResult>((resolve) => { finish = resolve; }));
    render(<CloudSyncAutoSync />);
    await screen.findByText("同期中…");
    expect(sessionStorage.getItem(LS_KEYS.syncSessionInFlightPrefix + "A")).toBeTruthy();
    expect(sessionStorage.getItem(LS_KEYS.syncSessionSuccessPrefix + "A")).toBeNull();
    await act(async () => finish(result("ok")));
    expect(sessionStorage.getItem(LS_KEYS.syncSessionInFlightPrefix + "A")).toBeNull();
    user = "B";
    owner();
    fireEvent(window, new Event("focus"));
    await waitFor(() => expect(mock.syncAll).toHaveBeenCalledWith({ expectedUserId: "B" }));
    await waitFor(() => expect(sessionStorage.getItem(LS_KEYS.syncSessionSuccessPrefix + "B")).toBe("1"));
  });
});
