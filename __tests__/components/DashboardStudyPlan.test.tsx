import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { DashboardStudyPlan } from "@/components/account/tabs/DashboardStudyPlan";
import { generateStudyPlan } from "@/lib/study-plan/generator";
import { getPlanSyncEntries, getProgress, savePlan } from "@/lib/study-plan/storage";
import { studyTaskLink } from "@/lib/study-plan/task-link";

beforeEach(() => { localStorage.clear(); vi.useFakeTimers(); vi.setSystemTime(new Date("2026-11-04T12:00:00")); });
afterEach(() => { cleanup(); vi.useRealTimers(); });
describe("one saved plan for calendar and daily execution", () => {
  it("uses existing IDs and sync progress for daily completion", () => {
    const plan = generateStudyPlan({ exam: "ap", examDate: "2026-12-04", weekdayMinutes: 30, weekendMinutes: 60, level: "foundation", weakCategories: [] }, ["ネットワーク"]);
    savePlan(plan);
    render(<DashboardStudyPlan />);
    expect(screen.getByRole("link", { name: "この計画の全日程を見る" })).toHaveAttribute("href", `/study-plan/result/${plan.id}`);
    fireEvent.click(screen.getAllByRole("button", { name: "完了にする" })[0]);
    expect(getProgress(plan.id)[plan.daily[0].tasks[0].key].done).toBe(true);
    expect(getPlanSyncEntries()[0]).toMatchObject({ id: plan.id, payload: plan, progress: getProgress(plan.id) });
    const link = screen.getByRole("link", { name: /過去問演習.*リンクを開く/ });
    expect(link.getAttribute("href")).toContain("/quiz?mode=topic&exam=ap");
  });
  it("resolves legacy review and mini-mock links without rewriting saved tasks", () => {
    const task = { key: "old-id", kind: "review" as const, title: "誤答復習", estimatedMinutes: 15, link: "/ip?mode=review" };
    expect(studyTaskLink(task, "ip")).toContain("/quiz?mode=review&exam=ip&scope=exam");
    expect(task.link).toBe("/ip?mode=review");
    expect(studyTaskLink({ ...task, kind: "mock", title: "週末ミニ模試（20問）" }, "sc")).toContain("count=20");
  });
});
