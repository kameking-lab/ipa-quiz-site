import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";
import { renderToStaticMarkup } from "react-dom/server";
import paper from "@/data/questions/yakuzaishi/2025-2026-reviewed52.json";
import { YAKUZAISHI_QUESTIONS } from "@/data/questions/yakuzaishi";
import { QuestionFigures } from "@/components/quiz/QuestionFigures";
import { isCompleteSelectionCorrect } from "@/lib/questions/answers";
import { isPracticeReadyQuestion } from "@/lib/questions/filter";
import { getQuestionsForExam } from "@/lib/questions/get-questions";
import { findQuestionByRoute, questionPagePath } from "@/lib/seo/question-url";
import type { Question } from "@/lib/questions/types";
import { EXAM_DESCRIPTIONS } from "@/lib/seo/exam-meta";
import { QUALIFICATION_CATALOG } from "@/lib/qualifications/catalog";

const selected = paper as Question[];

describe("saved pharmacist reviewed52 publication integration", () => {
  it("shows the actual merged question and choice-reason counts in public coverage text", () => {
    const count = YAKUZAISHI_QUESTIONS.length;
    const reasons = YAKUZAISHI_QUESTIONS.reduce((sum, q) => sum + Object.keys(q.choiceExplanations ?? {}).length, 0);
    expect(count).toBe(359);
    expect(reasons).toBe(1797);
    expect(EXAM_DESCRIPTIONS.yakuzaishi).toContain(`${count}\u539f\u554f`);
    expect(EXAM_DESCRIPTIONS.yakuzaishi).toContain(`${reasons}\u80a2`);
    expect(QUALIFICATION_CATALOG.find(q => q.examCode === "yakuzaishi")!.reuseSummary).toContain(`${count}\u539f\u554f`);
  });

  it("binds the unchanged saved manuscript and adds exactly52 usable static and lazy questions", async () => {
    const bytes = readFileSync(path.resolve("data/questions/yakuzaishi/2025-2026-reviewed52.json"), "utf8").replace(/\r\n/g, "\n");
    expect(createHash("sha256").update(bytes).digest("hex")).toBe("90567a35b7ad5911628e6bf510f63822cbca8c9fd9dfeb9a671f89587f867cd3");
    expect(selected).toHaveLength(52);
    expect(YAKUZAISHI_QUESTIONS).toHaveLength(359);
    expect(new Set(YAKUZAISHI_QUESTIONS.map(q => q.id)).size).toBe(359);
    expect(await getQuestionsForExam("yakuzaishi")).toEqual(YAKUZAISHI_QUESTIONS);
    expect(selected.some(q => q.id === "yakuzaishi-2026-annual-required-q84")).toBe(false);
    for (const q of selected) {
      expect(isPracticeReadyQuestion(q), q.id).toBe(true);
      expect(Object.keys(q.choiceExplanations!)).toHaveLength(5);
      expect(findQuestionByRoute(YAKUZAISHI_QUESTIONS, { exam: q.exam, yearSeason: `${q.year}-${q.season}`, section: q.session, qnum: `q${q.qNumber}` })).toEqual(q);
      expect(questionPagePath(q)).toBe(`/q/${q.exam}/${q.year}-${q.season}/${q.session}/q${q.qNumber}`);
    }
  });

  it("requires complete selections and does not accept a partial multi-answer set", () => {
    expect(selected.filter(q => (q.requiredSelections ?? 1) > 1)).toHaveLength(37);
    for (const q of selected) {
      const answers = Array.isArray(q.answer) ? q.answer : [q.answer];
      const count = q.requiredSelections ?? 1;
      expect(isCompleteSelectionCorrect(q.answer, answers.slice(0, count), count), q.id).toBe(true);
      expect(isCompleteSelectionCorrect(q.answer, [], count), q.id).toBe(false);
      if (count > 1) expect(isCompleteSelectionCorrect(q.answer, answers.slice(0, count - 1), count), q.id).toBe(false);
    }
  });

  it("keeps all35 official source images available and links them at native resolution", () => {
    const urls = new Set(selected.flatMap(q => [...(q.imageUrls ?? []), ...Object.values(q.choiceImageUrls ?? {}).filter((url): url is string => typeof url === "string")]));
    expect(urls.size).toBe(35);
    for (const url of urls) {
      const file = readFileSync(path.resolve("public", url.slice(1)));
      expect(file.subarray(0, 8).toString("hex"), url).toBe("89504e470d0a1a0a");
      expect(file.readUInt32BE(16), url).toBeGreaterThan(0);
      expect(file.readUInt32BE(20), url).toBeGreaterThan(0);
    }
    for (const q of selected.filter(q => q.imageUrls?.length)) {
      const html = renderToStaticMarkup(<QuestionFigures question={q} />);
      for (const url of q.imageUrls!) expect(html, q.id).toContain(`href="${url}"`);
      expect(html).toContain("noopener noreferrer");
      expect(html).toContain("min-h-11");
    }
  });
});
