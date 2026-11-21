import { act, cleanup, fireEvent, render, screen, within } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { ReviewClient } from "@/app/review/ReviewClient";
import { QuizPlayer } from "@/components/quiz/QuizPlayer";
import { createHistoryStore } from "@/lib/storage/history";
import { toggleBookmark } from "@/lib/storage/bookmarks";
import { LS_KEYS } from "@/lib/storage/keys";
import { IP_QUESTIONS } from "@/data/questions/ip";
import { calculatePace, createPacePlan } from "@/lib/study-plan/pace";
import { paceAttempts } from "@/lib/study-plan/client";

vi.mock("next/navigation", () => ({ useRouter: () => ({ push: vi.fn() }) }));
const q = IP_QUESTIONS.find(q => q.id === "ip-2009a-am-q1")!;
const old = { id: q.id, selected: "ア", correct: false, at: Date.now() - 1000 };
const items = [{ key: "ip", name: "ITパスポート", href: "/ip" }];
const next = vi.fn();
beforeEach(() => {
  localStorage.clear();
  next.mockClear();
  vi.stubGlobal("fetch", vi.fn(async (url: string) => url.endsWith("/catalog/ip") ? Response.json({ questions: [q] }) : new Response(null, { status: 204 })));
});
afterEach(() => { cleanup(); vi.unstubAllGlobals(); });

describe("weak list uses the common assessed history", () => {
  it("corrects the newest recorded grade without pressing next and updates the track", async () => {
    const history = createHistoryStore();
    history.record(old);
    const list = render(<ReviewClient examFromQuery="ip" items={items} />);
    await screen.findByRole("link", { name: "苦手1問をまとめて解く" });
    expect(fetch).toHaveBeenCalledWith("/api/study-plan/catalog/ip", expect.anything());
    list.unmount();
    const practice = render(<QuizPlayer quiet question={q} exam="ip" mode="year" index={0} total={2} onNext={next} />);
    const key = Array.isArray(q.answer) ? q.answer[0] : q.answer;
    const correct = screen.getByRole("radio", { name: new RegExp("^選択肢 " + key) });
    fireEvent.click(correct);
    fireEvent.click(correct);
    expect(history.getAllEntries()).toMatchObject([old, { id: q.id, selected: key, correct: true }]);
    expect(next).not.toHaveBeenCalled();
    const plan = createPacePlan({ id: "p", exam: "ip", sessionId: null, startDate: "2026-11-17", examDate: null }, [q], "2026-11-17T00:00:00Z");
    expect(calculatePace(plan, [q], paceAttempts(), "2026-11-17").mastered).toBe(1);
    practice.unmount();
    render(<ReviewClient examFromQuery="ip" items={items} />);
    expect(await screen.findByText("苦手リストは空です")).toBeVisible();
  });

  it("ignores old due dates and keeps a manual mark after a correct answer", async () => {
    const history = createHistoryStore();
    history.record(old);
    history.record({ ...old, correct: true, at: Date.now() });
    history.toggleStar(q.id);
    const legacy = JSON.stringify({ [q.id]: { nextReviewAt: "2099-01-01" } });
    localStorage.setItem(LS_KEYS.reviewSchedule, legacy);
    render(<ReviewClient examFromQuery="ip" items={items} />);
    await screen.findByText("苦手の印");
    expect(screen.queryByText("前回不正解")).not.toBeInTheDocument();
    fireEvent.click(screen.getByRole("button", { name: "苦手の印を外す" }));
    expect(await screen.findByText("苦手リストは空です")).toBeVisible();
    expect(localStorage.getItem(LS_KEYS.reviewSchedule)).toBe(legacy);
    expect(history.getAllEntries()).toHaveLength(2);
  });

  it("shows both reasons in one row and keeps the row after the mark is removed", async () => {
    const history = createHistoryStore();
    history.record(old);
    history.toggleStar(q.id);
    localStorage.setItem(LS_KEYS.reviewSchedule, "invalid-json");
    render(<ReviewClient examFromQuery="ip" items={items} />);
    const row = await screen.findByRole("listitem");
    expect(within(row).getByText("前回不正解")).toBeVisible();
    expect(within(row).getByText("苦手の印")).toBeVisible();
    fireEvent.click(within(row).getByRole("button", { name: "苦手の印を外す" }));
    expect(screen.getAllByRole("listitem")).toHaveLength(1);
    expect(within(row).queryByText("苦手の印")).not.toBeInTheDocument();
    expect(localStorage.getItem(LS_KEYS.reviewSchedule)).toBe("invalid-json");
  });

  it("keeps a tag-only bookmark out of the list and marks local to this device", async () => {
    toggleBookmark(q);
    const first = render(<ReviewClient examFromQuery="ip" items={items} />);
    await screen.findByText("苦手リストは空です");
    act(() => { createHistoryStore().toggleStar(q.id); });
    expect(await screen.findByText("苦手の印")).toBeVisible();
    first.unmount();
    localStorage.removeItem(LS_KEYS.history);
    render(<ReviewClient examFromQuery="ip" items={items} />);
    expect(await screen.findByText("苦手リストは空です")).toBeVisible();
  });

  it("shows a retry for failed requests and a real empty list after success", async () => {
    vi.mocked(fetch).mockResolvedValueOnce(new Response(null, { status: 503 }));
    render(<ReviewClient examFromQuery="ip" items={items} />);
    expect(await screen.findByRole("alert")).toHaveTextContent("問題を読み込めませんでした");
    expect(screen.queryByText("苦手リストは空です")).not.toBeInTheDocument();
    fireEvent.click(screen.getByRole("button", { name: "再読み込み" }));
    expect(await screen.findByText("苦手リストは空です")).toBeVisible();
  });

  it("offers qualification selection without fetching an arbitrary exam", () => {
    render(<ReviewClient items={items} />);
    expect(screen.getByRole("combobox", { name: "資格" })).toHaveValue("");
    expect(fetch).not.toHaveBeenCalled();
  });

  it("does not change the latest recorded grade with history switched off", async () => {
    const history = createHistoryStore();
    history.record(old);
    localStorage.setItem(LS_KEYS.settings, JSON.stringify({ recordHistory: false }));
    const view = render(<QuizPlayer quiet question={q} exam="ip" mode="year" index={0} total={2} onNext={next} />);
    const key = Array.isArray(q.answer) ? q.answer[0] : q.answer;
    await act(async () => fireEvent.click(screen.getByRole("radio", { name: new RegExp("^選択肢 " + key) })));
    expect(history.getAllEntries()).toEqual([old]);
    view.unmount();
    render(<ReviewClient examFromQuery="ip" items={items} />);
    expect(await screen.findByText("前回不正解")).toBeVisible();
  });
});
