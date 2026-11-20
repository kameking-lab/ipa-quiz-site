import { cleanup, fireEvent, render, screen, waitFor } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { HomePace } from "@/components/home/pace/HomePace";
import type { HomeDirectoryDomain } from "@/lib/home/home-directory";
import { LS_KEYS } from "@/lib/storage/keys";
import { createPacePlan } from "@/lib/study-plan/pace";
import { listPacePlans, savePacePlan } from "@/lib/study-plan/pace-storage";

const router = vi.hoisted(() => ({ replace: vi.fn(), push: vi.fn() }));
vi.mock("next/navigation", () => ({ useRouter: () => router }));

const domains: HomeDirectoryDomain[] = [{
  id: "it", title: "IT", lead: "", allHref: "/ipa", allLabel: "すべて", compact: [], totalQuestions: 2, qualificationCount: 2,
  featured: [
    { key: "ip", name: "ITパスポート", href: "/ip", questionCount: 1, periodLabel: "1回分" },
    { key: "fe", name: "基本情報技術者", href: "/fe", questionCount: 1, periodLabel: "1回分" },
    { key: "eisei", name: "衛生管理者", href: "/e-learning/exams/qualifications/eisei", questionCount: 1, periodLabel: "1回分", historyPrefixes: ["eisei-paper-"] },
  ],
}];
const catalog = [{ id: "ip-2024h-am-q1", exam: "ip", year: 2024, season: "spring" as const, session: "am" as const, qNumber: 1 }];
const plan = () => createPacePlan({ id: "past-pace", exam: "ip", sessionId: null, examDate: "2024-05-31", startDate: "2024-05-01" }, catalog, "2024-05-01T00:00:00+09:00");

beforeEach(() => {
  vi.stubGlobal("fetch", vi.fn(async (url: string) => Response.json(url.includes("schedule") ? { sessions: [] }
    : url.includes("catalog") ? { questions: catalog } : url.includes("resume") ? { exam: "ip", name: "ITパスポート", href: "/ip", caption: "問1" }
      : { entitled: false })));
});
afterEach(() => { cleanup(); localStorage.clear(); sessionStorage.clear(); vi.unstubAllGlobals(); });

describe("home plan entry", () => {
  it("finds IT Passport by nickname and keeps its existing destination", async () => {
    render(<HomePace domains={domains} planExamKeys={["ip", "fe"]} />);
    const search = await screen.findByRole("searchbox", { name: "資格名・略称で検索" });
    fireEvent.change(search, { target: { value: "あいぱす" } });
    expect(screen.getByRole("link", { name: "ITパスポート" })).toHaveAttribute("href", "/ip");
  });

  it("uses the parent in home search and fetches a study schedule only after choosing a child", async () => {
    const regional = { ...domains[0], featured: [...domains[0].featured,
      { key: "chori-hokkaido", name: "調理師試験（北海道）", href: "/chori-hokkaido", questionCount: 60, periodLabel: "1期分" },
      { key: "chori-gunma", name: "調理師試験（群馬県）", href: "/chori-gunma", questionCount: 60, periodLabel: "1期分" },
    ] };
    render(<HomePace domains={[regional]} planExamKeys={["ip", "chori-hokkaido", "chori-gunma"]} />);
    fireEvent.change(screen.getByRole("searchbox", { name: "資格名・略称で検索" }), { target: { value: "北海道" } });
    expect(screen.getByRole("link", { name: "調理師試験（都道府県別 2）" })).toHaveAttribute("href", "/qualifications/chori");
    fireEvent.click(screen.getByRole("button", { name: "試験日を決めると、チワワが走り出す" }));
    fireEvent.change(screen.getByLabelText("受ける資格"), { target: { value: "group:chori" } });
    expect(screen.queryByLabelText("受験日")).not.toBeInTheDocument();
    const child = screen.getByLabelText("地域");
    expect(child).toHaveValue("");
    fireEvent.change(child, { target: { value: "chori-gunma" } });
    expect(await screen.findByLabelText("受験日")).toBeVisible();
    const calls = vi.mocked(fetch).mock.calls.map(([url]) => url);
    expect(calls).toContain("/api/exam-schedule/chori-gunma");
    expect(calls).not.toContain("/api/exam-schedule/group%3Achori");
    expect(calls).not.toContain("/api/exam-schedule/");
  });

  it.each([false, true])("opens creation from the home screen with prior study (%s)", async (returning) => {
    if (returning) localStorage.setItem(LS_KEYS.lastQuestion, JSON.stringify({ ...catalog[0], answeredAt: 1 }));
    render(<HomePace domains={domains} planExamKeys={["ip", "fe"]} />);
    if (returning) {
      expect(await screen.findByRole("link", { name: /続きを解く/ })).toBeVisible();
      expect(screen.queryByRole("heading", { name: "最近解いた資格" })).not.toBeInTheDocument();
      expect(screen.queryByRole("heading", { name: "試験が近い資格" })).not.toBeInTheDocument();
    }
    expect(screen.getByRole("searchbox", { name: "資格名・略称で検索" })).toHaveAttribute("placeholder", returning ? "ほかの資格をさがす" : "受ける資格は？");
    expect(screen.getByRole("img", { name: "進み具合0%、試験日未設定" })).toBeVisible();
    fireEvent.click(screen.getByRole("button", { name: returning ? "試験日を決める" : "試験日を決めると、チワワが走り出す" }));
    expect(screen.getByRole("dialog", { name: "学習計画を作成" })).toBeVisible();
    expect(await screen.findByLabelText("受験日")).toBeVisible();
  });

  it("includes an answered library paper under its qualification and omits the current one", async () => {
    localStorage.setItem(LS_KEYS.lastQuestion, JSON.stringify({ ...catalog[0], answeredAt: Date.parse("2026-11-20T09:00:00+09:00") }));
    sessionStorage.setItem(`${LS_KEYS.examLibrarySessionPrefix}eisei-paper`, JSON.stringify({ summary: {
      examId: "eisei-paper", examTitle: "公表問題", lastQuestionId: "eisei-paper-q1", updatedAt: "2026-11-19T12:00:00+09:00",
      answered: 1, total: 1, correct: 1, incorrect: 0, unscored: 0, scorable: 1,
    } }));
    render(<HomePace domains={domains} planExamKeys={["ip", "fe", "eisei"]} />);
    expect(await screen.findByRole("list", { name: "最近解いた資格" })).toBeVisible();
    expect(screen.getByRole("link", { name: /^衛生管理者/ })).toHaveAttribute("href", "/e-learning/exams/qualifications/eisei");
    expect(screen.getAllByRole("listitem")).toHaveLength(1);
  });

  it("stays on the first-visit screen when saved coordinates do not resolve and there are no answers", async () => {
    localStorage.setItem(LS_KEYS.lastQuestion, JSON.stringify({ ...catalog[0], qNumber: 999, answeredAt: 1 }));
    vi.stubGlobal("fetch", vi.fn(async (url: string) => url.includes("/api/home/resume?")
      ? Response.json(null, { status: 404 }) : Response.json({ entitled: false })));
    render(<HomePace domains={domains} planExamKeys={["ip", "fe"]} />);
    await waitFor(() => expect(fetch).toHaveBeenCalledWith(expect.stringContaining("qNumber=999"), expect.anything()));
    expect(screen.getByPlaceholderText("受ける資格は？")).toBeEnabled();
    expect(screen.queryByRole("link", { name: /続きを解く/ })).not.toBeInTheDocument();
  });

  it.each([["合格", "passed"], ["不合格", "failed"], ["受けなかった", "absent"]] as const)("saves %s and offers the next step", async (label, result) => {
    savePacePlan(plan());
    render(<HomePace domains={domains} planExamKeys={["ip", "fe"]} />);
    for (const name of ["合格", "不合格", "受けなかった"]) expect(screen.getByRole("button", { name })).toBeVisible();
    expect(screen.getByRole("searchbox")).toBeVisible();
    expect(screen.getByRole("img", { name: "進み具合0%、試験終了" })).toBeVisible();
    fireEvent.click(screen.getByRole("button", { name: label }));
    expect(listPacePlans()[0].result).toBe(result);
    expect(screen.getByRole("searchbox")).toBeVisible();
    expect(screen.getByRole("img", { name: "進み具合0%、試験終了" })).toBeVisible();
    if (result === "passed") {
      expect(screen.getByRole("link", { name: "次は 基本情報技術者へ" })).toHaveAttribute("href", "/fe");
    } else {
      fireEvent.click(screen.getByRole("button", { name: "学習計画を作成" }));
      expect(await screen.findByLabelText("受験日")).toBeVisible();
    }
  });
});
