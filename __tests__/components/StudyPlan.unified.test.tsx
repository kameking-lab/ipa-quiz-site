import { describe, it, expect, beforeEach, vi } from "vitest";
import { render, screen, cleanup, fireEvent } from "@testing-library/react";
vi.mock("next/navigation", () => ({ useRouter: () => ({ push: vi.fn() }), redirect: vi.fn() }));
import { SchedulePlanner } from "@/components/SchedulePlanner";
import { listPlans } from "@/lib/study-plan/storage";

beforeEach(() => { cleanup(); localStorage.clear(); });
describe("unified calculated planner labels and period", () => {
  it("keeps the exam and period controls accessible", () => {
    render(<SchedulePlanner />);
    expect(screen.getByRole("button", { name: "ap 応用情報技術者" })).toHaveAttribute("aria-pressed", "true");
    fireEvent.click(screen.getByRole("button", { name: "次へ" }));
    expect(screen.getByRole("combobox", { name: "学習期間" })).toBeVisible();
    expect(screen.getByRole("link", { name: "次の資格" })).toHaveAttribute("href", "https://tsugino-shikaku.jp/shikaku/ap");
  });
  it("calculates 28 days with only available subject categories and saves the existing plan shape", () => {
    render(<SchedulePlanner categoriesByExam={{ ap: ["ネットワーク"] }} />);
    for (let step = 0; step < 3; step++) fireEvent.click(screen.getByRole("button", { name: "次へ" }));
    fireEvent.click(screen.getByRole("button", { name: "学習スケジュールを生成" }));
    const plan = listPlans()[0];
    expect(plan.summary.daysRemaining).toBe(28);
    expect(plan.daily.flatMap((day) => day.tasks.filter((task) => task.category).map((task) => task.category))).toEqual(expect.arrayContaining(["ネットワーク"]));
    expect(new Set(plan.daily.flatMap((day) => day.tasks.filter((task) => task.category).map((task) => task.category))).size).toBe(1);
  });
});
