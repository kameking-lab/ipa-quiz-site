import { setPostHogClient } from "@/lib/posthog";
import type { PostHog } from "posthog-js";
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
afterEach(() => { setPostHogClient(null); cleanup(); vi.unstubAllGlobals(); vi.restoreAllMocks(); });

describe("QuizClient with the real player and local learning stores", () => {
  it("answers ordinary questions across qualifications, preserves player state and storage, and offers exits at the eleventh", async () => {
    window.history.replaceState({}, "", "/quiz?mode=year&exam=fe&utm_source=tsugino_shikaku&utm_content=fe.hero");
    const capture = vi.fn(); setPostHogClient({ capture } as unknown as PostHog);
    const fe = FE_QUESTIONS_2009_AUTUMN_AM.slice(0, 6);
    const fp = FP3_QUESTIONS.slice(0, 6);
    const questions = new Map([...fe, ...fp].map(question => [question.id, question]));
    const started = new Set<string>();
    let cookie = false;
    const fetcher = vi.fn(async (url: string, options?: RequestInit) => {
      if (url === "/api/funnel" || url === "/api/activity") return new Response(null, { status: 204 });
      if (url === "/api/auth/session") return Response.json({});
      if (url === "/api/questions/related") return Response.json({ questions: [] });
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
        expect(screen.getAllByRole("radio")[0]).not.toBeDisabled();
      });
      expect(screen.queryByText("1問、回答しました。")).toBeNull();
      expect(screen.queryByRole("link", { name: /ログイン/ })).toBeNull();
      expect(screen.queryByTestId("achievement-toast")).toBeNull();
      expect(screen.queryByRole("dialog")).toBeNull();
      expect(screen.queryByRole("complementary", { name: "ログインなしの無料演習枠" })).toBeNull();
      const choice = screen.getAllByRole("radio")[0];
      fireEvent.click(choice); fireEvent.click(choice);
      expect(screen.getByRole("region", { name: /^(正解|不正解)の解説$/ })).toBeInTheDocument();
      expect(screen.queryByTestId("achievement-toast")).toBeNull();
      expect(createHistoryStore().getAllEntries()).toHaveLength(i + 1);
      expect(getStudyReward()?.questionId).toBe(fe[i].id);
      // The cumulative count must survive every question transition.
      expect(screen.getByLabelText(new RegExp(`回答済み ${i + 1}（`))).toBeInTheDocument();
      if (i < 4) fireEvent.click(screen.getByRole("button", { name: "次の問題へ" }));
    }
    first.unmount();
    window.history.replaceState({}, "", "/quiz?mode=year&exam=fp3");
    render(<QuizClient billingGateEnabled poolIds={fp.map(q => q.id)} mode="year" exam="fp3" backHref="/fp3" />);
    for (let i = 0; i < 5; i += 1) {
      await waitFor(() => {
        expect(screen.getAllByRole("radio")[0]).not.toBeDisabled();
      });
      expect(screen.queryByText("1問、回答しました。")).toBeNull();
      expect(screen.queryByRole("link", { name: /ログイン/ })).toBeNull();
      expect(screen.queryByTestId("achievement-toast")).toBeNull();
      expect(screen.queryByRole("dialog")).toBeNull();
      fireEvent.click(screen.getAllByRole("radio")[0]);
      expect(screen.getByRole("region", { name: /^(正解|不正解)の解説$/ })).toBeInTheDocument();
      expect(screen.queryByTestId("achievement-toast")).toBeNull();
      expect(createHistoryStore().getAllEntries()).toHaveLength(i + 6);
      if (i < 4) fireEvent.click(screen.getByRole("button", { name: "次の問題へ" }));
    }
    const history = localStorage.getItem(LS_KEYS.history);
    const reward = sessionStorage.getItem(LS_KEYS.studyReward);
    fireEvent.click(screen.getByRole("button", { name: "次の問題へ" }));
    const limit = await screen.findByRole("region", { name: "今日の無料10問はここまで" });
    // Purchase first, one line of terms, the feedback bonus, a tiny "tomorrow" line: nothing else.
    const plan = screen.getByRole("link", { name: "月額980円で続ける" });
    const start = new URL(plan.getAttribute("href")!, window.location.origin);
    expect(start.pathname).toBe("/billing/start");
    const resume = start.searchParams.get("returnTo");
    expect(resume).toBe(`/quiz?mode=year&exam=fp3&question=${fp[5].id}`);
    expect(limit).toHaveTextContent("税込・毎月自動更新・いつでも解約可");
    expect(limit).toHaveTextContent("明日また10問");
    expect(limit).not.toHaveTextContent("このボタンだけで課金は始まりません");
    expect(screen.queryByRole("link", { name: "保存済みの履歴を無料で復習する" })).toBeNull();
    expect(document.activeElement).toHaveAttribute("aria-label", "本日の無料演習の終了");
    expect(screen.queryByRole("radiogroup")).toBeNull();
    expect(started.size).toBe(10);
    expect(localStorage.getItem(LS_KEYS.history)).toBe(history);
    expect(sessionStorage.getItem(LS_KEYS.studyReward)).toBe(reward);
    expect(JSON.parse(localStorage.getItem(LS_KEYS.studyRewardPreferences)!)).toEqual({ closed: false, paused: true });
    expect(createHistoryStore().getAllEntries().some(entry => entry.id === fp[5].id)).toBe(false);
    expect(fetcher.mock.calls.every(([url]) => url.startsWith("/api/questions/next?") || url === "/api/billing/question" || url === "/api/questions/related" || url === "/api/auth/session" || url === "/api/funnel" || url === "/api/activity")).toBe(true);
    expect(capture.mock.calls.filter(call => call[0] === "referral_landed")).toHaveLength(1);
    const limits = capture.mock.calls.filter(call => call[0] === "practice_free_limit_reached");
    expect(limits).toHaveLength(1);
    expect(limits[0][1]).toMatchObject({ utm_source: "tsugino_shikaku", utm_content: "fe.hero", reason: "last_free_question", free_daily: 10 });
    expect(capture.mock.calls.some(call => call[0] === "quiz_started" && call[1].utm_content === "fe.hero")).toBe(true);
    const upgrade = screen.getByRole("link", { name: "月額980円で続ける" });
    upgrade.addEventListener("click", event => event.preventDefault());
    fireEvent.click(upgrade);
    expect(capture.mock.calls.some(call => call[0] === "practice_upgrade_clicked" && call[1].utm_content === "fe.hero")).toBe(true);
  });

  it.each([
    [428, "guest_cookie_required", baseAccess, /Cookieを保存できませんでした/],
    [429, "guest_rate_limited", { ...baseAccess, retryAfter: 60 }, /60秒ほど待って/],
    [503, "billing_unavailable", { ...baseAccess, kind: "unavailable", remaining: null }, /問題を読み込めませんでした/],
  ])("keeps free exits and storage when %s %s is returned", async (status, error, access, message) => {
    localStorage.setItem(LS_KEYS.history, JSON.stringify({ entries: [{ id: "prior", correct: false, selected: "ア", at: 1 }], starredIds: [] }));
    const history = localStorage.getItem(LS_KEYS.history);
    const fetcher = vi.fn(async (url: string) => url === "/api/auth/session" ? Response.json({}) : Response.json({ error, access }, { status: status as number }));
    vi.stubGlobal("fetch", fetcher);
    render(<QuizClient billingGateEnabled poolIds={["normal-question"]} mode="year" backHref="/fe" />);
    await screen.findByText(message as RegExp);
    expect(screen.getByRole("link", { name: "保存済みの履歴・無料復習" })).toHaveAttribute("href", "/review");
    expect(screen.getByRole("link", { name: "科目選択へ戻る" })).toHaveAttribute("href", "/fe");
    expect(localStorage.getItem(LS_KEYS.history)).toBe(history);
    // Optional local pet views verify auth independently of billing. Count the
    // billing boundary itself, rather than racing deferred session checks.
    await waitFor(() => expect(fetcher.mock.calls.filter(([url]) => url === "/api/billing/question")).toHaveLength(status === 428 ? 2 : 1));
    expect(screen.queryByText(/本日の無料連続演習枠を使い切りました/)).toBeNull();
  });
});
it("submits feedback at the wall, answers bonus questions 11-20, stops at 21 and preserves exhaustion on reload", async () => {
  const pool = FE_QUESTIONS_2009_AUTUMN_AM.slice(0, 21);
  const questions = new Map(pool.map(q => [q.id, q]));
  const ordinary = new Set(pool.slice(0, 10).map(q => q.id));
  const bonus = new Set<string>();
  let submitted = false;
  let loggedIn = false;
  const fetcher = vi.fn(async (url: string, init?: RequestInit) => {
    if (url === "/api/auth/session") return Response.json(loggedIn ? { user: { id: "billing-test" } } : {});
    if (url === "/api/feedback-unlock") {
      if (!loggedIn) return Response.json({ eligible: false, requiresLogin: true });
      if (init?.method === "POST") { submitted = true; return Response.json({ ok: true, remaining: 10 }); }
      return Response.json({ eligible: !submitted, submitted, remaining: submitted ? 10 - bonus.size : 0 });
    }
    if (url.startsWith("/api/questions/next?")) return Response.json(questions.get(new URL(url, "http://localhost").searchParams.get("id")!));
    if (url !== "/api/billing/question") throw new Error(`Unexpected request: ${url}`);
    const { id } = JSON.parse(init!.body as string);
    if (ordinary.has(id)) return Response.json({ question: questions.get(id), access: { ...baseAccess, kind: "trial", remaining: 0 } });
    if (!submitted || (!bonus.has(id) && bonus.size >= 10)) return Response.json({ error: "daily_limit", access: { ...baseAccess, kind: "trial", remaining: 0 } }, { status: 429 });
    const newlyUsed = !bonus.has(id); bonus.add(id);
    return Response.json({ question: questions.get(id), access: { ...baseAccess, kind: "trial", remaining: 10 - bonus.size, feedbackBonus: { remaining: 10 - bonus.size, newlyUsed } } });
  });
  vi.stubGlobal("fetch", fetcher);
  const anonymous = render(<QuizClient billingGateEnabled poolIds={pool.map(q => q.id)} initialQuestionId={pool[10].id} mode="year" exam="fe" backHref="/fe" />);
  const login = await screen.findByRole("link", { name: "意見を送ってあと10問" }, { timeout: 5000 });
  expect(screen.queryByRole("textbox")).toBeNull();
  const callback = new URL(login.getAttribute("href")!, window.location.origin).searchParams.get("callbackUrl")!;
  expect(callback).toContain(`question=${pool[10].id}#feedback-unlock`);
  anonymous.unmount();
  loggedIn = true;
  window.history.replaceState({}, "", callback);
  const first = render(<QuizClient billingGateEnabled poolIds={pool.map(q => q.id)} initialQuestionId={pool[10].id} mode="year" exam="fe" backHref="/fe" />);
  await screen.findByRole("textbox", { name: /自由記述/ });
  fireEvent.click(screen.getByLabelText("スマホでの使いやすさ"));
  fireEvent.click(screen.getByRole("button", { name: "意見を送信して10問追加" }));
  for (let n = 0; n < 10; n++) {
    await waitFor(() => {
      expect(screen.getByText(`意見による追加10問を利用中です。追加枠は残り${9 - n}問です。`)).toBeInTheDocument();
      expect(screen.getAllByRole("radio")[0]).not.toBeDisabled();
    });
    expect(screen.queryByText(/今日あと/)).toBeNull();
    fireEvent.click(screen.getAllByRole("radio")[0]);
    expect(createHistoryStore().getAllEntries()).toHaveLength(n + 1);
    fireEvent.click(screen.getByRole("button", { name: "次の問題へ" }));
  }
  await screen.findByRole("region", { name: "今日の無料10問はここまで" });
  expect(bonus.size).toBe(10);
  const saved = localStorage.getItem(LS_KEYS.history);
  first.unmount();
  render(<QuizClient billingGateEnabled poolIds={pool.map(q => q.id)} initialQuestionId={pool[20].id} mode="year" exam="fe" backHref="/fe" />);
  await screen.findByRole("region", { name: "今日の無料10問はここまで" });
  expect(screen.queryByRole("radiogroup")).toBeNull();
  expect(localStorage.getItem(LS_KEYS.history)).toBe(saved);
  expect(bonus.size).toBe(10);
});
