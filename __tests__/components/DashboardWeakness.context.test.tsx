import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { DashboardWeakness } from "@/components/account/tabs/DashboardWeakness";
import { recordMockExam } from "@/lib/mock-exam/storage";
import { writeLastQuestion } from "@/lib/storage/last-question";
vi.mock("@/app/account/weakness/WeaknessHeatmapClient", () => ({ WeaknessHeatmapClient: () => null }));
vi.mock("@/components/account/MockExamInsight", () => ({ MockExamInsight: () => null }));
beforeEach(() => { localStorage.clear(); });
afterEach(cleanup);
describe("weakness practice retains the latest qualification", () => {
  it("continues SC after an SC mock instead of silently defaulting to AP", () => {
    recordMockExam({ id: "mock-sc", exam: "sc", startedAt: 1, finishedAt: 2, totalQuestions: 10,
      answered: 1, correct: 0, scorePct: 0, passed: false, timeUsedSec: 1, byCategory: {} });
    render(<DashboardWeakness categoryById={{}} />);
    expect(screen.getByRole("link", { name: "情報処理安全確保支援士の弱点問題を解く" })).toHaveAttribute("href", "/quiz?mode=weakness&exam=sc");
  });
  it("prefers a more recent question context and offers selection for an empty device", () => {
    writeLastQuestion({ exam: "ip", year: 2025, season: "cbt", session: "am", qNumber: 1, answeredAt: 3 });
    render(<DashboardWeakness categoryById={{}} />);
    expect(screen.getByRole("link", { name: "ITパスポートの弱点問題を解く" })).toHaveAttribute("href", "/quiz?mode=weakness&exam=ip");
    cleanup(); localStorage.clear(); render(<DashboardWeakness categoryById={{}} />);
    expect(screen.getByRole("link", { name: "資格を選んで学習する" })).toHaveAttribute("href", "/#choose-qualification");
  });
});
