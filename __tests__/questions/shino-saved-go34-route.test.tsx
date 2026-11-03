import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import QuestionPage from "@/app/q/[exam]/[yearSeason]/[section]/[qnum]/page";
import saved from "@/data/questions/shino-kunrenshi/saved-go34-20261011.json";
import { getQuestionsForExam } from "@/lib/questions/get-questions";

describe("reviewed orthoptist additions: route and original figures", () => {
  it.each([
    "shino-kunrenshi-2024-annual-am-q66",
    "shino-kunrenshi-2025-annual-am-q2",
  ])("loads the canonical session route and renders source figures for %s", async id => {
    const q = saved.find(q => q.id === id)!;
    const loaded = await getQuestionsForExam("shino-kunrenshi");
    expect(loaded.filter(row => row.id === id)).toHaveLength(1);
    const page = await QuestionPage({ params: Promise.resolve({
      exam: "shino-kunrenshi", yearSeason: `${q.year}-annual`,
      section: q.session, qnum: `q${q.qNumber}`,
    }) });
    const doc = new DOMParser().parseFromString(renderToStaticMarkup(page), "text/html");
    expect(doc.querySelector("header h1")?.textContent).toContain("視能訓練士");
    expect(doc.body.textContent).toContain(q.question.split("\n")[0]);
    const figures = Array.from(doc.querySelectorAll("img"));
    for (const [index, url] of (q.imageUrls ?? []).entries()) {
      const image = figures.find(image => image.getAttribute("src") === url);
      expect(image).toBeDefined();
      expect(image?.getAttribute("alt")).toBe(q.imageAltTexts?.[index]);
    }
    if (id.endsWith("q66")) expect(q.imageUrls).toHaveLength(2);
  });
});
