import { act, cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

const identity = vi.hoisted(() => ({
  account: null as { id: string; label: string } | null,
  checking: false, unavailable: false, ownership: "unknown", confirmedFor: null,
  refresh: vi.fn(), setConfirmedFor: vi.fn(),
}));
vi.mock("@/lib/sync/use-sync-identity", () => ({ useSyncIdentity: () => identity }));
vi.mock("next/dynamic", () => ({ default: () => () => null }));
vi.mock("next/navigation", () => ({ useRouter: () => ({ push: vi.fn() }), usePathname: () => "/quiz" }));
vi.mock("@/components/quiz/QuizPlayer", () => ({ QuizPlayer: () => <p>問題本文</p> }));
vi.mock("@/lib/sync", () => ({ readSyncMeta: () => ({ lastSyncedAt: 0 }), syncAll: vi.fn() }));
vi.mock("@/lib/posthog", () => ({ posthogCapture: vi.fn() }));
vi.mock("@/lib/billing/funnel-client", () => ({ sendFunnelEvent: vi.fn() }));
vi.mock("@/lib/billing/runtime", () => ({ billingIdentity: vi.fn(async () => ({})) }));
vi.mock("@/lib/billing/subscription/config", () => ({ monthlyConfig: () => ({ enabled: true }) }));
vi.mock("@/lib/billing/subscription/runtime", () => ({ monthlyRuntime: () => ({ service: { status: async () => ({ canManage: false, subscription: null }) } }) }));

import { AccountNavigationLink, AccountNavigationProvider } from "@/components/account/AccountNavigation";
import { CloudSyncPanel } from "@/components/account/CloudSyncPanel";
import { PracticeDailyLimit } from "@/components/quiz/PracticeTransition";
import { FeedbackUnlock } from "@/components/quiz/FeedbackUnlock";
import { QuizResumeLinks } from "@/app/billing/QuizResumeLinks";
import { QuizClient } from "@/app/quiz/QuizClient";
import { AuthorizedContent } from "@/mobile/shared/AuthorizedContent";
import { ExamQuestionPlayer } from "@/components/exam-library/exam-question-player";
import MonthlyPage from "@/app/billing/MonthlyPage";
import { PurchaseStatus } from "@/app/billing/PurchaseStatus";

beforeEach(() => {
  localStorage.clear(); sessionStorage.clear();
  window.history.replaceState({}, "", "/quiz?mode=year&question=q1");
  identity.account = null; identity.checking = false; identity.unavailable = false;
  vi.stubEnv("NEXT_PUBLIC_TURNSTILE_SITE_KEY", "");
  vi.stubGlobal("fetch", vi.fn(async (url: string) => url === "/api/feedback-unlock"
    ? Response.json({ requiresLogin: true, eligible: false })
    : Response.json({ error: "sign_in_required" }, { status: 401 })));
});
afterEach(() => { cleanup(); vi.unstubAllGlobals(); vi.unstubAllEnvs(); });

for (const state of ["authenticated", "loading", "unauthenticated"] as const) {
  describe(state, () => {
    beforeEach(() => {
      identity.checking = state === "loading";
      identity.account = state === "authenticated" ? { id: "test-user", label: "test" } : null;
    });
    const guest = state === "unauthenticated";
    it("shows account navigation only after the session is known", () => {
      const { container } = render(<AccountNavigationProvider><AccountNavigationLink /></AccountNavigationProvider>);
      expect(container.querySelector('a[href*="/auth/signin"]') !== null).toBe(guest);
      expect(screen.queryByRole("link", { name: "アカウント" }) !== null).toBe(state === "authenticated");
    });
    it("keeps the existing plan offer and hides login advice at the daily limit", () => {
      const { container } = render(<PracticeDailyLimit resumeHref="/quiz?mode=year&question=q1" />);
      expect(screen.getByRole("heading", { name: "今日の無料10問はここまで" })).toBeVisible();
      expect(container.querySelector('a[href^="/billing/start?"]')).toBeVisible();
      expect(screen.queryByText(/購入したときと同じ方法/)).toBeNull();
    });
    it("does not let a stale feedback response show a login link", async () => {
      const { container } = render(<FeedbackUnlock onUnlocked={vi.fn()} />);
      await act(async () => {});
      expect(container.querySelector('a[href*="/auth/signin"]') !== null).toBe(guest);
    });
    it("retains the feedback recheck action after a 401 without prompting signed-in users to log in", async () => {
      vi.stubGlobal("fetch", vi.fn(async (_url: string, init?: RequestInit) => init?.method === "POST"
        ? Response.json({}, { status: 401 }) : Response.json({ eligible: true })));
      const { container } = render(<FeedbackUnlock onUnlocked={vi.fn()} />);
      fireEvent.click(await screen.findByRole("button", { name: "意見を送ってあと10問" }));
      fireEvent.change(screen.getByRole("textbox", { name: /自由記述/ }), { target: { value: "改善希望" } });
      fireEvent.click(screen.getByRole("button", { name: "意見を送信して10問追加" }));
      await screen.findByRole("alert");
      expect(container.querySelector('a[href*="/auth/signin"]') !== null).toBe(guest);
      const recheck = screen.getByRole("button", { name: guest ? "別タブでログインした後に再確認" : "利用状態を再確認" });
      fireEvent.click(recheck);
      await act(async () => {});
      expect(screen.getByRole("button", { name: "意見を送信して10問追加" })).toBeEnabled();
    });
    it.each([false, true])("guards purchase resume login (loginOnly=%s)", loginOnly => {
      const { container } = render(<QuizResumeLinks showLogin loginOnly={loginOnly} />);
      expect(container.querySelector('a[href*="/auth/signin"]') !== null).toBe(guest);
    });
    it("uses the existing account entry for cloud sync", () => {
      render(<CloudSyncPanel />);
      expect(screen.queryByRole("link", { name: "サインインして同期" })).toBeNull();
    });
    it("keeps the monthly checkout link without repeated login advice", async () => {
      const { container } = render(await MonthlyPage({ returnTo: "/quiz?question=q1" }));
      expect(container.querySelector('a[href^="/billing/start?"]')).toBeVisible();
      expect(screen.queryByText(/購入したときと同じ方法/)).toBeNull();
    });
    it("does not turn a stale purchase 401 into login advice for a signed-in user", async () => {
      const { container } = render(<PurchaseStatus order="ux-order" />);
      await screen.findByText("購入状況を確認できません。再購入せず、もう一度確認してください。");
      expect(container.querySelector('a[href*="/auth/signin"]') !== null).toBe(guest);
      if (!guest) {
        expect(container.textContent).not.toContain("ログイン");
        expect(screen.getByRole("button", { name: "購入状況を再確認" })).toBeEnabled();
      }
    });
    it("guards quiz failure login without changing the return path", async () => {
      const { container } = render(<QuizClient poolIds={["q1"]} initialQuestionId="q1" billingGateEnabled mode="year" backHref="/" />);
      await screen.findByRole("alert");
      expect(container.querySelector('a[href*="/auth/signin"]') !== null).toBe(guest);
      if (!guest) expect(container.textContent).not.toContain("ログイン");
      else expect(decodeURIComponent(container.querySelector('a[href*="/auth/signin"]')!.getAttribute("href")!)).toContain("question=q1");
    });
    it.each(["sign_in_required", "daily_limit"])("guards single-question and material failure: %s", async error => {
      vi.stubGlobal("fetch", vi.fn(async () => Response.json({ error }, { status: 403 })));
      const { container } = render(<AuthorizedContent items={[{ id: "q1", title: "問1" }]} />);
      await screen.findByRole("alert");
      expect(container.querySelector('a[href*="/auth/signin"]') !== null).toBe(guest);
      if (!guest) expect(container.textContent).not.toContain("ログイン");
      expect(screen.getByRole("link", { name: "有料会員・購入復元" })).toBeVisible();
    });
    it.each(["sign_in_required", "daily_limit"])("guards public-paper failure: %s", async error => {
      const resolveQuestion = vi.fn(async () => { throw new Error(error); });
      const { container } = render(<ExamQuestionPlayer examId="test-paper" examTitle="試験" questions={[]}
        questionIndex={[{ id: "q1", number: 1, choiceCount: 4, answerAuthority: "official", scorable: true }]}
        resolveQuestion={resolveQuestion} pdfUrl="" indexUrl="" />);
      await screen.findByRole("alert");
      expect(container.querySelector('a[href*="/auth/signin"]') !== null).toBe(guest);
      if (!guest) expect(container.textContent).not.toContain("ログイン");
    });
  });
}

it("does not treat an unavailable session as signed out", () => {
  identity.unavailable = true;
  const { container } = render(<AccountNavigationProvider><AccountNavigationLink /><CloudSyncPanel /><QuizResumeLinks showLogin /></AccountNavigationProvider>);
  expect(container.querySelector('a[href*="/auth/signin"]')).toBeNull();
});
