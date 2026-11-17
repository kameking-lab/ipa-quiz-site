import { act, cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

vi.mock("@/components/exam-library/SafetyLearningProgress", () => ({ SafetyLearningProgress: () => null }));
vi.mock("@/components/account/tabs/DashboardOverview", () => ({ DashboardOverview: () => <p>概要の記録</p> }));
vi.mock("@/components/account/tabs/DashboardStudyPlan", () => ({ DashboardStudyPlan: () => <p>計画の記録</p> }));
vi.mock("@/components/account/tabs/MockScoreHistory", () => ({ MockScoreHistory: () => <p>模試の記録</p> }));
vi.mock("@/components/account/tabs/DashboardProgress", () => ({ DashboardProgress: () => <p>進捗の記録</p> }));
vi.mock("@/components/account/tabs/DashboardWeakness", () => ({ DashboardWeakness: () => <p>弱点の記録</p> }));
vi.mock("@/components/account/tabs/DashboardBadges", () => ({ DashboardBadges: () => <p>バッジの記録</p> }));

import { DashboardTabs } from "@/components/account/DashboardTabs";

beforeEach(() => { window.history.replaceState(null, "", "/account/dashboard"); });
afterEach(cleanup);

describe("学習記録のタブ操作", () => {
  it("矢印キーで隣へ移り、フォーカス・表示パネル・URLを一致させる", () => {
    render(<DashboardTabs categoryById={{}} />);
    const overview = screen.getByRole("tab", { name: "概要" });
    overview.focus();
    fireEvent.keyDown(overview, { key: "ArrowRight" });
    const plan = screen.getByRole("tab", { name: "今日の計画" });
    expect(plan).toHaveFocus();
    expect(plan).toHaveAttribute("aria-selected", "true");
    expect(screen.getByRole("tabpanel")).toHaveTextContent("計画の記録");
    expect(window.location.hash).toBe("#study-plan");
    expect(screen.getAllByRole("tab").filter(tab => tab.tabIndex === 0)).toEqual([plan]);
  });

  it("Home・Endキーで先頭と末尾へ移動し、左右端で循環する", () => {
    render(<DashboardTabs categoryById={{}} />);
    const first = screen.getByRole("tab", { name: "概要" });
    fireEvent.keyDown(first, { key: "End" });
    const last = screen.getByRole("tab", { name: "バッジ" });
    expect(last).toHaveFocus();
    fireEvent.keyDown(last, { key: "ArrowRight" });
    expect(first).toHaveFocus();
    fireEvent.keyDown(first, { key: "ArrowLeft" });
    expect(last).toHaveFocus();
    fireEvent.keyDown(last, { key: "Home" });
    expect(first).toHaveFocus();
  });

  it("既存のクエリ付きリンクから弱点を開く", () => {
    window.history.replaceState(null, "", "/account/dashboard?tab=weakness");
    render(<DashboardTabs categoryById={{}} />);
    expect(screen.getByRole("tab", { name: "弱点" })).toHaveAttribute("aria-selected", "true");
    expect(screen.getByRole("tabpanel")).toHaveTextContent("弱点の記録");
  });

  it("ハッシュ変更に追従し、不明なハッシュで表示を壊さない", () => {
    render(<DashboardTabs categoryById={{}} />);
    act(() => { window.location.hash = "mock-scores"; window.dispatchEvent(new HashChangeEvent("hashchange")); });
    expect(screen.getByRole("tabpanel")).toHaveTextContent("模試の記録");
    act(() => { window.location.hash = "unknown"; window.dispatchEvent(new HashChangeEvent("hashchange")); });
    expect(screen.getByRole("tabpanel")).toHaveTextContent("模試の記録");
  });
});
