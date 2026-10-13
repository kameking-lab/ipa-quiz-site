import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import SettingsPage from "@/app/settings/page";
import { createHistoryStore } from "@/lib/storage/history";
import { LS_KEYS } from "@/lib/storage/keys";
import { readSettings } from "@/lib/storage/settings";
import { USER_CONTEXT_LS_KEY } from "@/lib/storage/user-context";

vi.mock("@/components/theme-provider", () => ({ useTheme: () => ({ theme: "light", setTheme: vi.fn() }) }));
vi.mock("@/components/character/CharacterSelector", () => ({ CharacterSelector: () => null }));
vi.mock("@/app/account/notifications/NotificationSettings", () => ({ NotificationSettings: () => null }));
vi.mock("@/components/account/CloudSyncPanel", () => ({ CloudSyncPanel: () => null }));
const entry = { id: "ap-2024a-am-q1", selected: "ア", correct: false, at: 1 };
const untouched = [LS_KEYS.spacedRepetition, LS_KEYS.studyDays, LS_KEYS.bookmarks, LS_KEYS.syncMeta];
beforeEach(() => {
  localStorage.clear();
  const history = createHistoryStore(); history.record(entry); history.toggleStar(entry.id);
  for (const key of untouched) localStorage.setItem(key, JSON.stringify({ keep: key }));
  localStorage.setItem(LS_KEYS.lastQuestion, JSON.stringify({ id: entry.id }));
  localStorage.setItem(LS_KEYS.quizResume, JSON.stringify({ version: 1, route: "/quiz?exam=ap&mode=random", ids: [entry.id], index: 0, deferredIds: [], phase: "primary", updatedAt: 1 }));
  localStorage.setItem(USER_CONTEXT_LS_KEY, JSON.stringify({ visitCount: 5, lastVisitAt: "2026-10-13" }));
});
afterEach(() => { vi.unstubAllGlobals(); vi.restoreAllMocks(); });

describe("plain settings and their actual saved scope", () => {
  it("rejects a broken backup without overwriting the original history or crashing", () => {
    const original = localStorage.getItem(LS_KEYS.history);
    vi.stubGlobal("FileReader", class {
      onload: ((event: { target: { result: string } }) => void) | null = null;
      readAsText() { this.onload?.({ target: { result: '{"entries":[null]}' } }); }
    });
    render(<SettingsPage />);
    fireEvent.change(document.querySelector('input[type="file"]')!, { target: { files: [new File(["bad"], "backup.json")] } });
    expect(screen.getByRole("status")).toHaveTextContent("ファイルを読めませんでした。学習データは変更していません。");
    expect(localStorage.getItem(LS_KEYS.history)).toBe(original);
    expect(screen.getByRole("button", { name: "ファイルに保存" })).toBeEnabled();
  });
  it("keeps the original history and reports a file read failure", () => {
    const original = localStorage.getItem(LS_KEYS.history);
    vi.stubGlobal("FileReader", class {
      onerror: (() => void) | null = null;
      readAsText() { this.onerror?.(); }
    });
    render(<SettingsPage />);
    fireEvent.change(document.querySelector('input[type="file"]')!, { target: { files: [new File(["bad"], "backup.json")] } });
    expect(screen.getByRole("status")).toHaveTextContent("ファイルを読めませんでした");
    expect(localStorage.getItem(LS_KEYS.history)).toBe(original);
  });
  it("recovers an interrupted import on the existing settings visit without confirmation", () => {
    const original = localStorage.getItem(LS_KEYS.history);
    localStorage.setItem(LS_KEYS.learningBackupRecovery, JSON.stringify({ version: 1, originals: { [LS_KEYS.history]: original }, updates: { [LS_KEYS.history]: '{"entries":[],"starredIds":[]}' } }));
    localStorage.setItem(LS_KEYS.history, '{"entries":[],"starredIds":[]}');
    const confirm = vi.spyOn(window, "confirm").mockReturnValue(true);
    render(<SettingsPage />);
    expect(localStorage.getItem(LS_KEYS.history)).toBe(original);
    expect(localStorage.getItem(LS_KEYS.learningBackupRecovery)).toBeNull();
    expect(confirm).not.toHaveBeenCalled();
    expect(screen.getByRole("button", { name: "ファイルに保存" })).toBeEnabled();
  });
  it("does not crash or display fake zero totals when storage access is blocked", () => {
    vi.spyOn(window, "localStorage", "get").mockImplementation(() => { throw new DOMException("Blocked", "SecurityError"); });
    render(<SettingsPage />);
    expect(screen.getByRole("status")).toHaveTextContent("前の読込を完了できませんでした");
    expect(screen.getByRole("button", { name: "ファイルに保存" })).toBeDisabled();
    expect(screen.getByRole("button", { name: "ファイルから戻す" })).toBeDisabled();
    expect(screen.getAllByText("--", { exact: true })).toHaveLength(3);
  });

  it("describes history OFF accessibly and retains existing data when switching it off", () => {
    render(<SettingsPage />);
    const control = screen.getByRole("switch", { name: "学習履歴を記録する" });
    expect(control).toHaveAccessibleDescription(/新しい回答履歴.*これまでの履歴は残り.*復習予定.*学習日.*しおり/);
    fireEvent.click(control);
    expect(readSettings().recordHistory).toBe(false);
    expect(createHistoryStore().getAllEntries()).toEqual([entry]);
    expect(createHistoryStore().getStarredIds()).toEqual([entry.id]);
    for (const key of untouched) expect(localStorage.getItem(key)).toBe(JSON.stringify({ keep: key }));
    expect(screen.getByRole("switch", { name: "計算問題のみ" })).toHaveAccessibleDescription(/計算問題として登録/);
    expect(document.body.textContent).not.toMatch(/isCalculation|プリファレンス|出題ロジック|おすすめ問題のシード/);
  });
  it("deletes only the clearly named local history, stars and resume information after confirmation", () => {
    const confirm = vi.spyOn(window, "confirm").mockReturnValue(true);
    render(<SettingsPage />);
    fireEvent.click(screen.getByRole("button", { name: "回答履歴を削除" }));
    expect(confirm).toHaveBeenCalledWith(expect.stringMatching(/このブラウザ.*回答履歴.*苦手復習.*続きから.*復習予定.*同期先.*残ります.*取り消せません/));
    expect(createHistoryStore().getAllEntries()).toEqual([]);
    expect(createHistoryStore().getStarredIds()).toEqual([]);
    expect(localStorage.getItem(LS_KEYS.lastQuestion)).toBeNull();
    expect(localStorage.getItem(LS_KEYS.quizResume)).toBeNull();
    for (const key of untouched) expect(localStorage.getItem(key)).toBe(JSON.stringify({ keep: key }));
    expect(localStorage.getItem(USER_CONTEXT_LS_KEY)).not.toBeNull();
  });
  it("does not delete anything when confirmation is cancelled", () => {
    vi.spyOn(window, "confirm").mockReturnValue(false);
    render(<SettingsPage />);
    fireEvent.click(screen.getByRole("button", { name: "回答履歴を削除" }));
    expect(createHistoryStore().getAllEntries()).toEqual([entry]);
    expect(createHistoryStore().getStarredIds()).toEqual([entry.id]);
    expect(localStorage.getItem(LS_KEYS.lastQuestion)).not.toBeNull();
    expect(localStorage.getItem(LS_KEYS.quizResume)).not.toBeNull();
  });
  it("initialises visits and resume without deleting the answer history or stars", () => {
    vi.spyOn(window, "confirm").mockReturnValue(true);
    render(<SettingsPage />);
    fireEvent.click(screen.getByRole("button", { name: "訪問・続きからを初期化" }));
    expect(localStorage.getItem(USER_CONTEXT_LS_KEY)).toBeNull();
    expect(localStorage.getItem(LS_KEYS.lastQuestion)).toBeNull();
    expect(localStorage.getItem(LS_KEYS.quizResume)).toBeNull();
    expect(createHistoryStore().getAllEntries()).toEqual([entry]);
    expect(createHistoryStore().getStarredIds()).toEqual([entry.id]);
    for (const key of untouched) expect(localStorage.getItem(key)).toBe(JSON.stringify({ keep: key }));
  });
});
