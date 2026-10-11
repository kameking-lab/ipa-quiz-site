import { cleanup, fireEvent, render, screen, waitFor } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
const { findQuestionById } = vi.hoisted(() => ({ findQuestionById: vi.fn() }));
vi.mock("@/lib/questions/pool-server", () => ({ findQuestionById }));
import { ReviewClient } from "@/app/review/ReviewClient";
import { POST } from "@/app/api/review/due/route";
import { IP_QUESTIONS } from "@/data/questions/ip";
import { LS_KEYS } from "@/lib/storage/keys";
import { createHistoryStore } from "@/lib/storage/history";
import type { Question } from "@/lib/questions/types";
const ip = IP_QUESTIONS.find((q) => q.id === "ip-2009a-am-q1")!;
const ap: Question = { ...ip, id: "ap-history-item", exam: "ap", question: "APだけの履歴の問題" };
const shino: Question = { ...ip, id: "hyphenated-history-id", exam: "shino-kunrenshi", question: "視能訓練士だけの履歴の問題" };
const pool = [ip, ap, shino];
const request = (body: object) => new Request("http://localhost/api/review/due", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) });
beforeEach(() => {
  cleanup(); localStorage.clear();
  findQuestionById.mockReset().mockImplementation(async (id: string) => pool.find((q) => q.id === id));
  vi.stubGlobal("fetch", vi.fn(async (_url: string, init?: RequestInit) => POST(new Request("http://localhost/api/review/due", init))));
});
afterEach(() => { cleanup(); vi.unstubAllGlobals(); });
describe("scoped review preserves mixed qualification history", () => {
  it("filters questions, counts and next date by resolved exam metadata", async () => {
    const res = await POST(request({ historyIds: pool.map((q) => q.id), exam: "shino-kunrenshi", today: "2026-10-11", reviewStore: { [ap.id]: { nextReviewAt: "2026-10-12" }, [shino.id]: { nextReviewAt: "2026-10-20" } } }));
    expect(await res.json()).toEqual({ questions: [], seenCount: 1, scheduledCount: 1, nextReviewDate: "2026-10-20" });
  });
  it("rejects an unknown exam rather than silently mixing all qualifications", async () => {
    const res = await POST(request({ historyIds: [ip.id], exam: "constructor", today: "2026-10-11", reviewStore: {} }));
    expect(res.status).toBe(400);
  });
  it("scopes a /q entry, keeps its return link, and preserves history and other schedules through repeat", async () => {
    const history = createHistoryStore();
    pool.forEach((q) => history.record({ id: q.id, selected: "ア", correct: false, at: 1 }));
    history.toggleStar(ap.id);
    const before = localStorage.getItem(LS_KEYS.history);
    const otherSchedule = { questionId: ap.id, level: 3, correctStreak: 3, nextReviewAt: "2099-01-01" };
    localStorage.setItem("ipa-quiz:review:v1", JSON.stringify({ [ap.id]: otherSchedule }));
    const returnTo = "/q/ip/2024-cbt/am/q1";
    render(<ReviewClient examFromQuery="ip" returnTo={returnTo} />);
    await screen.findByText(ip.question);
    expect(screen.queryByText(ap.question)).not.toBeInTheDocument();
    expect(screen.getByRole("combobox", { name: "復習する資格" })).toHaveValue("ip");
    expect(screen.getByRole("link", { name: "ITパスポートに戻る" })).toHaveAttribute("href", returnTo);
    fireEvent.click(screen.getByRole("button", { name: /ア / }));
    fireEvent.click(screen.getByRole("button", { name: "✓ 正解した" }));
    await screen.findByRole("button", { name: "もう一度" });
    fireEvent.click(screen.getByRole("button", { name: "もう一度" }));
    await screen.findByText(ip.question);
    expect(localStorage.getItem(LS_KEYS.history)).toBe(before);
    expect(JSON.parse(localStorage.getItem("ipa-quiz:review:v1")!)[ap.id]).toEqual(otherSchedule);
    expect(history.getStarredIds()).toEqual([ap.id]);
  });
  it("switches qualifications and displays a Japanese name for hyphenated codes", async () => {
    pool.forEach((q) => createHistoryStore().record({ id: q.id, selected: "ア", correct: false, at: 1 }));
    render(<ReviewClient examFromQuery="ip" />);
    await screen.findByText(ip.question);
    fireEvent.change(screen.getByRole("combobox", { name: "復習する資格" }), { target: { value: "shino-kunrenshi" } });
    await screen.findByText(shino.question);
    expect(screen.queryByText("SHINO-KUNRENSHI")).not.toBeInTheDocument();
    expect(screen.getByRole("link", { name: "視能訓練士に戻る" })).toHaveAttribute("href", "/shino-kunrenshi");
    expect(screen.queryByText(ip.question)).not.toBeInTheDocument();
    fireEvent.change(screen.getByRole("combobox", { name: "復習する資格" }), { target: { value: "" } });
    await waitFor(() => expect(screen.getByRole("combobox")).toHaveValue(""));
    expect(createHistoryStore().getAnsweredIds()).toHaveLength(3);
  });
  it("unknown query asks for a choice without sending an unfiltered request", () => {
    render(<ReviewClient examFromQuery="unknown" />);
    expect(screen.getByRole("alert")).toHaveTextContent("資格を確認できません");
    expect(fetch).not.toHaveBeenCalled();
  });
});
