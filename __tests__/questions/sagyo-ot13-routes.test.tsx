import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import QuestionPage, { dynamicParams, generateMetadata, generateStaticParams } from "@/app/q/[exam]/[yearSeason]/[section]/[qnum]/page";
import ExamTopPage from "@/app/[exam]/page";
import { ALL_QUESTIONS } from "@/data/questions";
import { findQuestionByRoute, questionPagePath } from "@/lib/seo/question-url";
import { OT13_RECOVERED_QUESTIONS, OT13_OFFICIAL_EXCLUSIONS } from "@/data/qualification-staging/sagyo-ryohoshi/ot13-recovered";

function route(question: { year: number; session: string; qNumber: number }) {
  return { exam: "sagyo-ryohoshi", yearSeason: `${question.year}-annual`, section: question.session, qnum: `q${question.qNumber}` };
}

function imageSource(image: HTMLImageElement) {
  const source = image.getAttribute("src") ?? "";
  return source.startsWith("/_next/image") ? new URL(source, "https://example.invalid").searchParams.get("url") : source;
}

describe("registered OT source-backed routes and figures", () => {
  it("resolves all 11 recovered routes on demand and keeps official exclusions unavailable", async () => {
    expect(dynamicParams).toBe(true);
    const paths = await generateStaticParams();
    for (const question of OT13_RECOVERED_QUESTIONS) {
      if (question.year >= 2026) expect(paths, question.id).toContainEqual(route(question));
      else expect(paths, question.id).not.toContainEqual(route(question));
      expect(findQuestionByRoute(ALL_QUESTIONS, route(question)), question.id).toEqual(question);
      const metadata = await generateMetadata({ params: Promise.resolve(route(question)) });
      expect(metadata.robots).toEqual({ index: true, follow: true });
      expect(metadata.alternates?.canonical, question.id).toBe(questionPagePath(question));
    }
    for (const question of OT13_OFFICIAL_EXCLUSIONS) {
      expect(paths).not.toContainEqual(route(question));
      const metadata = await generateMetadata({ params: Promise.resolve(route(question)) });
      expect(metadata.robots).toEqual({ index: false, follow: false });
      await expect(QuestionPage({ params: Promise.resolve(route(question)) })).rejects.toThrow();
    }
  });

  it.each([
    "sagyo-ryohoshi-2024-annual-am-q2",
    "sagyo-ryohoshi-2024-annual-am-q6",
    "sagyo-ryohoshi-2024-annual-pm-q1",
  ])("%s displays the original main or choice figures with the correct OT label", async id => {
    const question = OT13_RECOVERED_QUESTIONS.find(question => question.id === id);
    if (!question) throw new Error(`Missing recovered original: ${id}`);
    const page = await QuestionPage({ params: Promise.resolve(route(question)) });
    const doc = new DOMParser().parseFromString(renderToStaticMarkup(page), "text/html");
    expect(doc.querySelector("header h1")?.textContent).toContain("作業療法士");
    const shown = [...doc.querySelectorAll("img")].map(imageSource);
    for (const url of [...(question.imageUrls ?? []), ...Object.values(question.choiceImageUrls ?? {})]) {
      expect(shown).toContain(url);
    }
    if (question.requiredSelections === 2) {
      expect(doc.querySelector('section[aria-label="選択肢と解答"]')?.textContent).toMatch(/2.{0,8}選/);
    }
  });

  it("shows the 310-question partial-coverage count in the qualification hub", async () => {
    const page = await ExamTopPage({ params: Promise.resolve({ exam: "sagyo-ryohoshi" }) });
    const doc = new DOMParser().parseFromString(renderToStaticMarkup(page), "text/html");
    const summary = doc.querySelector("header > p")?.textContent ?? "";
    expect(summary).toContain("310問を部分収録");
    expect(summary).toContain("未収録");
  });
});