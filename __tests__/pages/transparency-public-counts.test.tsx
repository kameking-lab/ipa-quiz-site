// @vitest-environment jsdom
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { cleanup, render, within } from "@testing-library/react";
import HomePage from "@/app/page";
import TransparencyPage from "@/app/transparency/page";
import { getHomeDirectory } from "@/lib/home/home-directory";

// Keep both real pages and the published directory. Provide browser routing and
// billing fixtures for the interactive home without requesting external services.
vi.mock("next/navigation", () => ({
  useRouter: () => ({ replace: vi.fn() }),
  useSearchParams: () => new URLSearchParams(window.location.search),
}));
vi.mock("@/components/ChihuahuaMascot", () => ({ ChihuahuaMascot: () => null }));
vi.mock("@/components/home/landing/HomeQualificationFinder", () => ({ HomeQualificationFinder: () => null }));
vi.mock("@/components/home/landing/HomeDirectory", () => ({ HomeDirectory: () => null }));
vi.mock("@/components/home/landing/HomeScheduleLink", () => ({ HomeScheduleLink: () => null }));
vi.mock("@/components/home/TotalAnswerCounter", () => ({ TotalAnswerCounter: () => null }));

describe("transparency published counts", () => {
  beforeEach(() => {
    localStorage.clear(); sessionStorage.clear();
    vi.stubGlobal("fetch", vi.fn(async () => Response.json({ entitled: false })));
    // Never request analytics while rendering this server page.
    vi.stubEnv("POSTHOG_API_KEY", "");
    vi.stubEnv("POSTHOG_PROJECT_ID", "");
  });
  afterEach(() => {
    cleanup();
    vi.unstubAllEnvs();
    vi.unstubAllGlobals();
  });

  it("renders the same published counts as the actual home page", async () => {
    const domains = getHomeDirectory();
    const questions = domains.reduce((sum, domain) => sum + domain.totalQuestions, 0);
    const qualifications = domains.reduce((sum, domain) => sum + domain.qualificationCount, 0);
    // The current public directory includes non-IPA qualifications; a fixed 13
    // must fail even though the common IPA catalog has thirteen exam codes.
    expect(qualifications).toBeGreaterThan(13);

    const home = render(<HomePage />);
    expect(within(home.container).getByText(`${qualifications}資格・${questions.toLocaleString("ja-JP")}問・ログインなしで1日10問まで無料`)).toBeInTheDocument();

    const transparency = render(await TransparencyPage());
    const questionsCard = within(transparency.container).getByText("公開中の問題数").parentElement;
    const qualificationsCard = within(transparency.container).getByText("資格・区分").parentElement;
    expect(questionsCard?.children[1]?.textContent).toBe(questions.toLocaleString("ja-JP"));
    expect(qualificationsCard?.children[1]?.textContent).toBe(qualifications.toLocaleString("ja-JP"));
    expect(questionsCard).toHaveTextContent("ホーム掲載資格・区分の合計");
    expect(qualificationsCard).toHaveTextContent("ホームと同じ公開範囲");
  });

  it("publishes verified current changes without unsupported historic costs or achievements", async () => {
    const page = render(await TransparencyPage());
    const view = within(page.container);
    expect(view.getByText("2026-10 月次レポート")).toBeInTheDocument();
    expect(view.queryByText("解説リファクタを残り 12,094 問に展開")).not.toBeInTheDocument();
    expect(page.container).toHaveTextContent("請求・集計証跡を未確認のため、費用実績は未掲載");
    expect(view.getByText("無料の学習機能と月額プランを提供する。")).toBeInTheDocument();
    expect(view.getByText("無料枠 / 月額980円")).toBeInTheDocument();
    expect(page.container).toHaveTextContent("個別問題・原紙・保存済み履歴の閲覧と復習は無料です。連続演習には1日10問の無料枠と税込980円の月額プランがあります。AI コパイロットは月額対象外で、連続利用や大量送信には適正利用制限があります。");
  });
});
