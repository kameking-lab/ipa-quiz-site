import { cleanup, fireEvent, render, screen, waitFor } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
const { findQuestionById } = vi.hoisted(() => ({ findQuestionById: vi.fn() }));
vi.mock("@/lib/questions/pool-server", () => ({ findQuestionById }));
import { QuizPlayer } from "@/components/quiz/QuizPlayer";
vi.mock("next/navigation", () => ({ useRouter: () => ({ push: vi.fn() }) }));
import { ReviewClient } from "@/app/review/ReviewClient";
import { POST } from "@/app/api/review/due/route";
import { IP_QUESTIONS } from "@/data/questions/ip";
import { SHIKA_ISHI_QUESTIONS } from "@/data/questions/shika-ishi";
import { ZOEN2_QUESTIONS } from "@/data/questions/zoen2";
import { KENCHIKU_SETSUBISHI_STUDY_QUESTIONS } from "@/data/questions/kenchiku-setsubishi";
import { LS_KEYS } from "@/lib/storage/keys";
import { createHistoryStore } from "@/lib/storage/history";
import type { ChoiceKey, Question } from "@/lib/questions/types";
const ip = IP_QUESTIONS.find((q) => q.id === "ip-2009a-am-q1")!;
const ap: Question = { ...ip, id: "ap-history-item", exam: "ap", question: "APだけの履歴の問題" };
const shino: Question = { ...ip, id: "hyphenated-history-id", exam: "shino-kunrenshi", question: "視能訓練士だけの履歴の問題" };
const pool = [ip, ap, shino];
const items = [{ key: "ip", name: "ITパスポート", href: "/ip" }, { key: "ap", name: "応用情報技術者", href: "/ap" }, { key: "shino-kunrenshi", name: "視能訓練士", href: "/shino-kunrenshi" }];
const request = (body: object) => new Request("http://localhost/api/review/due", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) });
beforeEach(() => {
  cleanup(); localStorage.clear();
  findQuestionById.mockReset().mockImplementation(async (id: string) => pool.find((q) => q.id === id));
  vi.stubGlobal("fetch", vi.fn(async (url: string) => Response.json({ questions: pool.filter(q => url.endsWith("/" + q.exam)) })));
});
afterEach(() => { cleanup(); vi.unstubAllGlobals(); });
describe("scoped review preserves mixed qualification history", () => {
  it("keeps official numbered choices and their diagrams in building equipment review", async () => {
    const figure = KENCHIKU_SETSUBISHI_STUDY_QUESTIONS.find(q => q.year === 2025 && q.session === "pm" && q.qNumber === 32)!;
    findQuestionById.mockImplementation(async (id: string) => id === figure.id ? figure : undefined);
    createHistoryStore().record({ id: figure.id, selected: "ア", correct: false, at: 1 });
    const historyBefore = localStorage.getItem(LS_KEYS.history);
    render(<QuizPlayer question={figure} exam={figure.exam} mode="year" index={0} total={1} onNext={vi.fn()} />);
    await screen.findByText(figure.question);
    for (const [index, key] of (Object.keys(figure.choices!) as ChoiceKey[]).entries()) {
      const button = screen.getByRole("button", { name: new RegExp(`^${index + 1} `) });
      expect(button).toHaveTextContent(figure.choices![key]!);
      expect(button.querySelector("img")?.getAttribute("src")).toContain(encodeURIComponent(figure.choiceImageUrls![key]).replaceAll("%2F", "/"));
    }
    fireEvent.click(screen.getAllByRole("radio")[0]);
    expect(createHistoryStore().getAllEntries()).toHaveLength(2);
    expect(localStorage.getItem(LS_KEYS.history)).not.toBe(historyBefore);
  });
  it("filters questions, counts and next date by resolved exam metadata", async () => {
    const res = await POST(request({ historyIds: pool.map((q) => q.id), exam: "shino-kunrenshi", today: "2026-10-11", reviewStore: { [ap.id]: { nextReviewAt: "2026-10-12" }, [shino.id]: { nextReviewAt: "2026-10-20" } } }));
    expect(await res.json()).toEqual({ questions: [], seenCount: 1, scheduledCount: 1, nextReviewDate: "2026-10-20" });
  });
  it("rejects an unknown exam rather than silently mixing all qualifications", async () => {
    const res = await POST(request({ historyIds: [ip.id], exam: "constructor", today: "2026-10-11", reviewStore: {} }));
    expect(res.status).toBe(400);
  });
  it("scopes the list and keeps a return link without rewriting history or schedules", async () => {
    const history = createHistoryStore();
    pool.forEach(q => history.record({ id: q.id, selected: "ア", correct: false, at: 1 }));
    history.toggleStar(ap.id);
    const before = localStorage.getItem(LS_KEYS.history);
    const schedule = JSON.stringify({ [ap.id]: { nextReviewAt: "2099-01-01" } });
    localStorage.setItem(LS_KEYS.reviewSchedule, schedule);
    const returnTo = "/q/ip/2024-cbt/am/q1";
    render(<ReviewClient examFromQuery="ip" returnTo={returnTo} items={items} />);
    expect(await screen.findByText(/ITパスポート・全年度\s+1問/)).toBeVisible();
    expect(fetch).toHaveBeenCalledWith("/api/study-plan/catalog/ip", expect.anything());
    expect(screen.getByRole("link", { name: "戻る" })).toHaveAttribute("href", returnTo);
    expect(localStorage.getItem(LS_KEYS.history)).toBe(before);
    expect(localStorage.getItem(LS_KEYS.reviewSchedule)).toBe(schedule);
    expect(history.getStarredIds()).toEqual([ap.id]);
  });
  it("switches qualifications and displays a Japanese name for hyphenated codes", async () => {
    pool.forEach((q) => createHistoryStore().record({ id: q.id, selected: "ア", correct: false, at: 1 }));
    render(<ReviewClient items={items} />);
    const picker = await screen.findByRole("combobox", { name: "資格" });
    expect(picker).toHaveValue("");
    expect(screen.getByRole("option", { name: "視能訓練士" })).toHaveValue("shino-kunrenshi");
    fireEvent.change(picker, { target: { value: "shino-kunrenshi" } });
    await screen.findByText(/視能訓練士・全年度\s+1問/);
    expect(screen.queryByText("SHINO-KUNRENSHI")).not.toBeInTheDocument();
    expect(screen.getByRole("combobox", { name: "資格" })).toHaveValue("shino-kunrenshi");
    expect(screen.queryByText(ip.question)).not.toBeInTheDocument();
    fireEvent.change(screen.getByRole("combobox", { name: "資格" }), { target: { value: "" } });
    await waitFor(() => expect(screen.getByRole("combobox")).toHaveValue(""));
    expect(createHistoryStore().getAnsweredIds()).toHaveLength(3);
  });
  it("records signed dental answers on the shared player", async () => {
    const numeric = SHIKA_ISHI_QUESTIONS.find(q => q.id === "shika-ishi-2026-annual-mondai-c-q90")!;
    const next = vi.fn();
    render(<QuizPlayer quiet question={numeric} exam={numeric.exam} mode="year" index={0} total={2} onNext={next} />);
    fireEvent.change(await screen.findByRole("textbox", { name: "解答（mm）" }), { target: { value: "2.0" } });
    fireEvent.click(screen.getByRole("button", { name: "採点する" }));
    expect(createHistoryStore().getAllEntries()).toEqual([expect.objectContaining({ id: numeric.id, correct: true })]);
    fireEvent.click(screen.getByRole("button", { name: "次の問題へ" }));
    expect(next).toHaveBeenCalledTimes(1);
  });

  it("keeps the original Zoen2 figure visible before revealing the answer", async () => {
    const figure = ZOEN2_QUESTIONS.find((q) => q.id === "zoen2-2025-late-gakka-q9");
    if (!figure?.imageUrls?.[0]) throw new Error("Missing approved Zoen2 figure fixture");
    render(<QuizPlayer quiet question={figure} exam={figure.exam} mode="year" index={0} total={1} onNext={vi.fn()} />);
    const image = await screen.findByRole("img");
    expect(image).toHaveAttribute("src", figure.imageUrls[0]);
    expect(createHistoryStore().getAllEntries()).toHaveLength(0);
    fireEvent.click(screen.getAllByRole("radio")[0]);
    expect(createHistoryStore().getAllEntries()).toHaveLength(1);
    expect(image).toHaveAttribute("src", figure.imageUrls[0]);
  });

  it("unknown query asks for a choice without sending an unfiltered request", () => {
    render(<ReviewClient examFromQuery="unknown" items={items} />);
    expect(screen.getByRole("alert")).toHaveTextContent("資格を確認できません");
    expect(fetch).not.toHaveBeenCalled();
  });
});
