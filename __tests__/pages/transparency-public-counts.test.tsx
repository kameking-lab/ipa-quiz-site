import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { cleanup, render, within } from "@testing-library/react";
import HomePage from "@/app/page";
import TransparencyPage from "@/app/transparency/page";
import { getHomeDirectory } from "@/lib/home/home-directory";

// Keep the real pages, HomeHero and published directory. Unrelated interactive
// widgets are omitted so this server-page regression needs no browser services.
vi.mock("@/components/ChihuahuaMascot", () => ({ ChihuahuaMascot: () => null }));
vi.mock("@/components/home/landing/HomeQuestionPreview", () => ({ HomeQuestionPreview: () => null }));
vi.mock("@/components/home/landing/HomeQualificationFinder", () => ({ HomeQualificationFinder: () => null }));
vi.mock("@/components/home/landing/HomeDirectory", () => ({ HomeDirectory: () => null }));
vi.mock("@/components/home/landing/HomeScheduleLink", () => ({ HomeScheduleLink: () => null }));
vi.mock("@/components/home/landing/HomeGuidesAndTrust", () => ({ HomeNoteGuides: () => null, HomeTrust: () => null }));
vi.mock("@/components/home/landing/HomeStudyModes", () => ({ HomeStudyModes: () => null }));
vi.mock("@/components/home/TotalAnswerCounter", () => ({ TotalAnswerCounter: () => null }));

describe("transparency published counts", () => {
  beforeEach(() => {
    // Never request analytics while rendering this server page.
    vi.stubEnv("POSTHOG_API_KEY", "");
    vi.stubEnv("POSTHOG_PROJECT_ID", "");
  });
  afterEach(() => {
    cleanup();
    vi.unstubAllEnvs();
  });

  it("renders the same published counts as the actual home page", async () => {
    const domains = getHomeDirectory();
    const questions = domains.reduce((sum, domain) => sum + domain.totalQuestions, 0);
    const qualifications = domains.reduce((sum, domain) => sum + domain.qualificationCount, 0);
    // The current public directory includes non-IPA qualifications; a fixed 13
    // must fail even though the historical March report still mentions 13.
    expect(qualifications).toBeGreaterThan(13);

    const home = render(<HomePage />);
    const published = within(home.container).getByRole("group", { name: "公開収録数" });
    const homeQuestions = within(published).getByText("公開中の問題数").nextElementSibling;
    const homeQualifications = within(published).getByText("資格・区分").nextElementSibling;
    expect(homeQuestions?.textContent).toBe(questions.toLocaleString("ja-JP"));
    expect(homeQualifications?.textContent).toBe(qualifications.toLocaleString("ja-JP"));

    const transparency = render(await TransparencyPage());
    const questionsCard = within(transparency.container).getByText("公開中の問題数").parentElement;
    const qualificationsCard = within(transparency.container).getByText("資格・区分").parentElement;
    expect(questionsCard?.children[1]?.textContent).toBe(homeQuestions?.textContent);
    expect(qualificationsCard?.children[1]?.textContent).toBe(homeQualifications?.textContent);
    expect(questionsCard).toHaveTextContent("ホーム掲載資格・区分の合計");
    expect(qualificationsCard).toHaveTextContent("ホームと同じ公開範囲");
  });

  it("preserves historical reports and the existing free-access promises", async () => {
    const page = render(await TransparencyPage());
    const view = within(page.container);
    for (const month of ["2026-03", "2026-04", "2026-05", "2026-09"]) {
      expect(view.getByText(`${month} 月次レポート`)).toBeInTheDocument();
    }
    expect(view.getByText("全 13 試験区分の問題データ統合")).toBeInTheDocument();
    expect(view.getByText("解説リファクタを残り 12,094 問に展開")).toBeInTheDocument();
    expect(view.getByText("全機能を無料で公開し続ける。")).toBeInTheDocument();
    expect(view.getByText("全機能無料")).toBeInTheDocument();
    expect(page.container).toHaveTextContent("金銭的負担はお願いしません。AI コパイロットは無料で質問でき、連続利用や大量送信には適正利用制限があります。");
  });
});
