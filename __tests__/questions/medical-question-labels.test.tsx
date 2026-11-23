import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import QuestionPage from "@/app/q/[exam]/[yearSeason]/[section]/[qnum]/page";
import ExamTopPage, { generateMetadata } from "@/app/[exam]/page";
import { QuestionCard } from "@/components/quiz/QuestionCard";
import { HOKENSHI_QUESTIONS } from "@/data/questions/hokenshi";
import { getQuestionsByExamStrict } from "@/lib/seo/exam-meta";
import { getQualificationByExamCode } from "@/lib/qualifications/catalog";

describe("medical question and quiz display names", () => {
  it("shows 保健師 in the Q45 breadcrumb, heading, badge, and quiz question card", async () => {
    const question = HOKENSHI_QUESTIONS.find(q => q.year === 2024 && q.session === "am" && q.qNumber === 45)!;
    expect(question).toBeDefined();
    const page = await QuestionPage({ params: Promise.resolve({ exam: "hokenshi", yearSeason: "2024-annual", section: "am", qnum: "q45" }) });
    const doc = new DOMParser().parseFromString(renderToStaticMarkup(page), "text/html");
    expect(doc.querySelector('nav[aria-label="パンくずリスト"] a[href="/hokenshi"]')?.textContent).toBe("保健師");
    expect(doc.querySelector("header h1")?.textContent).toContain("保健師");
    expect(renderToStaticMarkup(<QuestionCard question={question} />)).toContain("保健師");
  });

  it.each([
    "sagyo-ryohoshi", "shino-kunrenshi",
  ] as const)("describes the current registered AM and PM coverage for %s", async exam => {
    const pool = getQuestionsByExamStrict(exam);
    expect(new Set(pool.map(q => q.session))).toEqual(new Set(["am", "pm"]));
    const page = await ExamTopPage({ params: Promise.resolve({ exam }) });
    const doc = new DOMParser().parseFromString(renderToStaticMarkup(page), "text/html");
    expect(doc.body.textContent).toContain(`${pool.length}原問を部分収録`);
  });

  it.each([
    ["hokenshi", "保健師"],
  ] as const)("shows the current %s count and confirmed recent coverage", async (exam, label) => {
    const count = getQuestionsByExamStrict(exam).length;
    const metadata = await generateMetadata({ params: Promise.resolve({ exam }) });
    expect(metadata.openGraph?.title).toContain(label);
    expect(metadata.description).toContain(`${count.toLocaleString("ja-JP")}問`);
    expect(getQualificationByExamCode(exam)?.reuseSummary).toContain("第112・111回の午前・午後を各110問、計220問収録");
  });

  it("describes both complete scored midwife rounds and the official exclusion", async () => {
    const questions = getQuestionsByExamStrict("josanshi");
    expect(questions.filter(q => q.year === 2024 || q.year === 2025)).toHaveLength(219);
    expect(questions.some(q => q.year === 2025 && q.session === "pm" && q.qNumber === 31)).toBe(false);
    const summary = getQualificationByExamCode("josanshi")!.reuseSummary;
    expect(summary).toContain("採点対象219問");
    expect(summary).toContain("午後問31");
    expect(summary).toContain("採点対象から除外");
  });
});
