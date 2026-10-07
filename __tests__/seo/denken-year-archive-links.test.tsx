import { describe, expect, it } from "vitest";
import { renderToStaticMarkup } from "react-dom/server";
import Denken3Page from "@/app/denken3/page";
import Denken2Page from "@/app/denken2/page";
import Denken1Page from "@/app/denken1/page";
import YearPage, { generateStaticParams, generateMetadata } from "@/app/[exam]/[yearSeason]/page";
import { getQuestionsByExamStrict, groupByYearSeason } from "@/lib/seo/exam-meta";
import type { ExamCode } from "@/lib/questions/types";

function documentFor(html: string) {
  return new DOMParser().parseFromString(html, "text/html");
}

describe("dedicated electrical-exam hubs link to existing year archives", () => {
  it.each(["denken3", "denken2", "denken1"] as const)("%s links exactly its practice-ready years, with a return link", async (exam) => {
    const page = exam === "denken3" ? await Denken3Page({ searchParams: Promise.resolve({}) }) : exam === "denken2" ? Denken2Page() : Denken1Page();
    const doc = documentFor(renderToStaticMarkup(page));
    const years = groupByYearSeason(getQuestionsByExamStrict(exam));
    const links = [...doc.querySelectorAll(`[aria-labelledby="${exam}-year-archives"] a`)]
      .map(a => a.getAttribute("href"));
    expect(links).toEqual(years.map(y => `/${exam}/${y.key}`));
    expect(new Set(links).size).toBe(links.length);
    expect(links.length).toBe(exam === "denken3" ? 4 : 1);
    const staticParams = await generateStaticParams();
    for (const year of years) {
      const params = { exam, yearSeason: year.key };
      expect(staticParams).toContainEqual(params);
      const metadata = await generateMetadata({ params: Promise.resolve(params) });
      expect(metadata.alternates?.canonical).toBe(`/${exam}/${year.key}`);
      const yearDoc = documentFor(renderToStaticMarkup(await YearPage({ params: Promise.resolve(params) })));
      expect(yearDoc.querySelector(`a[href="/${exam}"]`)).not.toBeNull();
    }
  });

  it.each([
    ["2025", "first"], ["2025", "second"], ["2024", "first"], ["2024", "second"],
  ] as const)("keeps the selected third-class %s/%s subject quizzes and filter return target", async (year, season) => {
    const doc = documentFor(renderToStaticMarkup(await Denken3Page({ searchParams: Promise.resolve({ year, season }) })));
    const quizzes = [...doc.querySelectorAll('a[href^="/quiz?"]')];
    expect(quizzes).toHaveLength(4);
    expect(doc.querySelector(`a[href="/denken3?year=${year}&season=${season}"][aria-current="page"]`)).not.toBeNull();
    for (const quiz of quizzes) {
      const query = new URL(quiz.getAttribute("href")!, "https://www.kakomon-ai.jp").searchParams;
      expect(query.get("exam")).toBe("denken3");
      expect(query.get("year")).toBe(year);
      expect(query.get("season")).toBe(season);
      expect(query.get("returnTo")).toBe(`/denken3?year=${year}&season=${season}`);
    }
  });

  it.each(["denken2", "denken1"] as const)("keeps %s empty-slot units, scope and subject quizzes", (exam) => {
    const doc = documentFor(renderToStaticMarkup(exam === "denken2" ? Denken2Page() : Denken1Page()));
    expect(doc.body.textContent).toContain(`全${getQuestionsByExamStrict(exam as ExamCode).length}空欄`);
    expect(doc.body.textContent).toContain("未収録");
    const quizzes = [...doc.querySelectorAll('a[href^="/quiz?"]')];
    expect(quizzes).toHaveLength(new Set(getQuestionsByExamStrict(exam).map(q => q.session)).size);
    for (const quiz of quizzes) {
      const query = new URL(quiz.getAttribute("href")!, "https://www.kakomon-ai.jp").searchParams;
      expect(query.get("exam")).toBe(exam);
      expect(query.get("year")).toBe("2026");
      expect(query.get("season")).toBe("primary");
      expect(query.get("returnTo")).toBe(`/${exam}`);
    }
  });
});
