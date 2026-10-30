import { StrictMode } from "react";
import { cleanup, fireEvent, render, screen, waitFor } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
vi.mock("next/navigation", () => ({ useRouter: () => ({ push: vi.fn(), replace: vi.fn(), prefetch: vi.fn(), back: vi.fn() }) }));
import { QuizClient } from "@/app/quiz/QuizClient";
import { FE_QUESTIONS_2009_AUTUMN_AM } from "@/data/questions/fe/by-year/2009-autumn-am";
import { FP3_QUESTIONS } from "@/data/questions/fp3";
import { createHistoryStore } from "@/lib/storage/history";
import { getStudyReward } from "@/lib/study-reward";
import { LS_KEYS } from "@/lib/storage/keys";
import type { PracticeAccess } from "@/lib/billing/practice-contract";

const baseAccess: PracticeAccess = { kind: "guest", remaining: 10, freeDaily: 10, resetAt: "2026-10-30T15:00:00.000Z", retryAfter: null };
beforeEach(() => {
  cleanup(); localStorage.clear(); sessionStorage.clear();
  window.history.replaceState({}, "", "/quiz?mode=year&exam=fe");
  Object.defineProperty(navigator, "locks", { configurable: true, value: undefined });
  Object.defineProperty(HTMLElement.prototype, "scrollIntoView", { configurable: true, value: vi.fn() });
  vi.spyOn(window, "scrollTo").mockImplementation(() => {});
});
afterEach(() => { cleanup(); vi.unstubAllGlobals(); vi.restoreAllMocks(); });

describe("QuizClient with the real player and local learning stores", () => {
  it("answers ordinary questions across qualifications, preserves player state and storage, and offers exits at the eleventh", async () => {
    const fe = FE_QUESTIONS_2009_AUTUMN_AM.slice(0, 6);
    const fp = FP3_QUESTIONS.slice(0, 6);
    const questions = new Map([...fe, ...fp].map(question => [question.id, question]));
    const started = new Set<string>();
    let cookie = false;
    const fetcher = vi.fn(async (url: string, options?: RequestInit) => {
      if (url.startsWith("/api/questions/next?")) {
        return Response.json(questions.get(new URL(url, "http://localhost").searchParams.get("id")!));
      }
      if (url !== "/api/billing/question") throw new Error(`Unexpected external or AI request: ${url}`);
      const { id } = JSON.parse(options!.body as string);
      if (!cookie) { cookie = true; return Response.json({ error: "guest_cookie_required", access: baseAccess }, { status: 428 }); }
      if (!started.has(id) && started.size >= 10) return Response.json({ error: "daily_limit", access: { ...baseAccess, remaining: 0 } }, { status: 429 });
      started.add(id);
      return Response.json({ question: questions.get(id), access: { ...baseAccess, remaining: 10 - started.size } });
    });
    vi.stubGlobal("fetch", fetcher);
    localStorage.setItem(LS_KEYS.studyRewardPreferences, JSON.stringify({ closed: false, paused: true }));
    const first = render(<StrictMode><QuizClient billingGateEnabled poolIds={fe.map(q => q.id)} mode="year" exam="fe" backHref="/fe" /></StrictMode>);

    for (let i = 0; i < 5; i += 1) {
      await waitFor(() => {
        expect(screen.getByRole("complementary", { name: "ログインなしの無料演習枠" })).toHaveTextContent(`今日あと${9 - i}問`);
        expect(screen.getAllByRole("radio")[0]).not.toBeDisabled();
      });
      expect(screen.queryByText("1問、回答しました。")).toBeNull();
      const choice = screen.getAllByRole("radio")[0];
      fireEvent.click(choice); fireEvent.click(choice);
      expect(screen.getByRole("region", { name: /^(正解|不正解)の解説$/ })).toBeInTheDocument();
      expect(createHistoryStore().getAllEntries()).toHaveLength(i + 1);
      expect(getStudyReward()?.questionId).toBe(fe[i].id);
      // The cumulative count would reset here if the banner re-mounted Player.
      expect(screen.getByLabelText(new RegExp(`回答済み ${i + 1}（`))).toBeInTheDocument();
      if (i < 4) fireEvent.click(screen.getByRole("button", { name: "次の問題へ" }));
    }
    first.unmount();
    window.history.replaceState({}, "", "/quiz?mode=year&exam=fp3");
    render(<QuizClient billingGateEnabled poolIds={fp.map(q => q.id)} mode="year" exam="fp3" backHref="/fp3" />);
    for (let i = 0; i < 5; i += 1) {
      await waitFor(() => {
        expect(screen.getByRole("complementary", { name: "ログインなしの無料演習枠" })).toHaveTextContent(`今日あと${4 - i}問`);
        expect(screen.getAllByRole("radio")[0]).not.toBeDisabled();
      });
      expect(screen.queryByText("1問、回答しました。")).toBeNull();
      fireEvent.click(screen.getAllByRole("radio")[0]);
      expect(screen.getByRole("region", { name: /^(正解|不正解)の解説$/ })).toBeInTheDocument();
      expect(createHistoryStore().getAllEntries()).toHaveLength(i + 6);
      if (i < 4) fireEvent.click(screen.getByRole("button", { name: "次の問題へ" }));
    }
    const history = localStorage.getItem(LS_KEYS.history);
    const reward = sessionStorage.getItem(LS_KEYS.studyReward);
    fireEvent.click(screen.getByRole("button", { name: "次の問題へ" }));
    const limit = await screen.findByRole("alert");
    expect(limit).toHaveTextContent("本日の無料連続演習枠を使い切りました");
    expect(limit).toHaveTextContent("10/31 0:00（日本時間）");
    expect(screen.getByRole("link", { name: "保存済みの履歴・無料復習" })).toHaveAttribute("href", "/review");
    expect(screen.getByRole("link", { name: "無料試用・料金と利用条件" })).toHaveAttribute("href", "/billing");
    expect(decodeURIComponent(screen.getByRole("link", { name: "この問題から再開するためにログイン" }).getAttribute("href")!)).toContain(`question=${fp[5].id}`);
    expect(limit).toHaveTextContent("ログインだけで本日の無料枠が追加されることはありません");
    expect(screen.queryByRole("radiogroup")).toBeNull();
    expect(started.size).toBe(10);
    expect(localStorage.getItem(LS_KEYS.history)).toBe(history);
    expect(sessionStorage.getItem(LS_KEYS.studyReward)).toBe(reward);
    expect(JSON.parse(localStorage.getItem(LS_KEYS.studyRewardPreferences)!)).toEqual({ closed: false, paused: true });
    expect(createHistoryStore().getAllEntries().some(entry => entry.id === fp[5].id)).toBe(false);
    expect(fetcher.mock.calls.every(([url]) => url.startsWith("/api/questions/next?") || url === "/api/billing/question")).toBe(true);
  });

  it.each([
    [428, "guest_cookie_required", baseAccess, /Cookieを保存できませんでした/],
    [429, "guest_rate_limited", { ...baseAccess, retryAfter: 60 }, /60秒ほど待って/],
    [503, "billing_unavailable", { ...baseAccess, kind: "unavailable", remaining: null }, /問題を読み込めませんでした/],
  ])("keeps free exits and storage when %s %s is returned", async (status, error, access, message) => {
    localStorage.setItem(LS_KEYS.history, JSON.stringify({ entries: [{ id: "prior", correct: false, selected: "ア", at: 1 }], starredIds: [] }));
    const history = localStorage.getItem(LS_KEYS.history);
    const fetcher = vi.fn(async () => Response.json({ error, access }, { status: status as number }));
    vi.stubGlobal("fetch", fetcher);
    render(<QuizClient billingGateEnabled poolIds={["normal-question"]} mode="year" backHref="/fe" />);
    await screen.findByText(message as RegExp);
    expect(screen.getByRole("link", { name: "保存済みの履歴・無料復習" })).toHaveAttribute("href", "/review");
    expect(screen.getByRole("link", { name: "科目選択へ戻る" })).toHaveAttribute("href", "/fe");
    expect(localStorage.getItem(LS_KEYS.history)).toBe(history);
    await waitFor(() => expect(fetcher).toHaveBeenCalledTimes(status === 428 ? 2 : 1));
    expect(screen.queryByText(/本日の無料連続演習枠を使い切りました/)).toBeNull();
  });
});
