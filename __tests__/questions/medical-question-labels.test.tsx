import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import QuestionPage from "@/app/q/[exam]/[yearSeason]/[section]/[qnum]/page";
import ExamTopPage from "@/app/[exam]/page";
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
    expect([...doc.querySelectorAll("header span")].some(badge => badge.textContent === "保健師")).toBe(true);
    expect(renderToStaticMarkup(<QuestionCard question={question} />)).toContain("保健師");
  });

  it.each([
    ["sagyo-ryohoshi", 299],
    ["shino-kunrenshi", 186],
  ] as const)("describes the registered partial AM and PM coverage for %s", (exam, count) => {
    expect(getQuestionsByExamStrict(exam)).toHaveLength(count);
    const summary = getQualificationByExamCode(exam)!.reuseSummary;
    expect(summary).toContain(`午前・午後から、原文・正答・全肢解説を確認した${count}問を部分収録`);
    expect(summary).toContain("最新2回の午前と午後全体は未完備です");
  });

  it.each([
    ["hokenshi", "保健師"],
    ["josanshi", "助産師"],
  ] as const)("shows %s partial coverage in the hub body using the live count", async (exam, label) => {
    const count = getQuestionsByExamStrict(exam).length;
    const page = await ExamTopPage({ params: Promise.resolve({ exam }) });
    const doc = new DOMParser().parseFromString(renderToStaticMarkup(page), "text/html");
    const summary = doc.querySelector("header > p")?.textContent ?? "";
    expect(summary).toContain(`${label}国家試験`);
    expect(summary).toContain(`${count}問を部分収録`);
    expect(summary).toContain("未収録");
  });
});
