import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import QuestionPage from "@/app/q/[exam]/[yearSeason]/[section]/[qnum]/page";
import { YAKUZAISHI_QUESTIONS } from "@/data/questions/yakuzaishi";

describe("薬剤師の共通症例がある問題ページ", () => {
  it.each([[2024, 286], [2026, 199]])("共通症例と問題文を表示する（%i年度 問%i）", async (year, qNumber) => {
    const question = YAKUZAISHI_QUESTIONS.find(q => q.year === year && q.qNumber === qNumber && q.session === "practical");
    expect(question?.originalContent?.body).toBeUndefined();
    const passage = question?.originalContent?.sharedPassages?.[0];
    expect(passage).toBeDefined();
    const page = await QuestionPage({
      params: Promise.resolve({ exam: "yakuzaishi", yearSeason: `${year}-annual`, section: "practical", qnum: `q${qNumber}` }),
    });
    const html = new DOMParser().parseFromString(renderToStaticMarkup(page), "text/html");
    const source = html.querySelector('section[aria-label="原問の資料"]');
    expect(source?.textContent).toContain(passage!.label);
    expect(source?.textContent).toContain(passage!.text.split("\n")[0]);
    expect(source?.querySelector("details")).toBeNull();
    expect(html.querySelector('section[aria-label="問題文"]')?.textContent).toContain(question!.question.split("\n")[0]);
  });
});
