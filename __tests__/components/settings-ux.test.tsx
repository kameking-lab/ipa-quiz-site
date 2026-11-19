import { act, cleanup, render, screen } from "@testing-library/react";
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

describe("学習記録と既存URL", () => {
  it("進捗を最初から表示し、計画・模試を閉じて表示する", () => {
    const { container } = render(<DashboardTabs categoryById={{}} />);
    expect(screen.getByText("進捗の記録")).toBeVisible();
    expect(container.querySelector("details#study-plan")).not.toHaveAttribute("open");
    expect(container.querySelector("details#mock-scores")).not.toHaveAttribute("open");
    expect(screen.queryByRole("tab")).toBeNull();
  });

  it("既存のクエリ付きリンクから弱点を開く", () => {
    window.history.replaceState(null, "", "/account/dashboard?tab=weakness");
    const { container } = render(<DashboardTabs categoryById={{}} />);
    expect(container.querySelector("details#weakness")).toHaveAttribute("open");
  });

  it("既存のハッシュ付きリンクから模試を開く", () => {
    const { container } = render(<DashboardTabs categoryById={{}} />);
    act(() => { window.location.hash = "mock-scores"; window.dispatchEvent(new HashChangeEvent("hashchange")); });
    expect(container.querySelector("details#mock-scores")).toHaveAttribute("open");
  });
});
