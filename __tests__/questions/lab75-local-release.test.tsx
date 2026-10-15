import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";
import path from "node:path";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { ALL_QUESTIONS } from "@/data/questions";
import { RINSHO_KENSAGISHI_QUESTIONS } from "@/data/questions/rinsho-kensagishi";
import release from "@/data/questions/rinsho-kensagishi/partial75-20261011.json";
import held7 from "@/data/questions/rinsho-kensagishi/2025-annual-pm-batch2.json";
import baseline from "@/docs/evidence/lab75-local-release-20261011/BASELINE-INTEGRITY.json";
import packet from "@/docs/evidence/lab75-local-release-20261011/SOURCE-INTEGRITY.json";
import pngs from "@/docs/evidence/lab75-local-release-20261011/PNG-INTEGRITY.json";
import { isCompleteSelectionCorrect } from "@/lib/questions/answers";
import { isPracticeReadyQuestion } from "@/lib/questions/filter";
import { getQuestionsForExam, getQuestionCountsByExam } from "@/lib/questions/get-questions";
import { getQuestionsByExam } from "@/lib/questions/load";
import type { Question } from "@/lib/questions/types";
import { EXAM_CONFIGS } from "@/lib/exam-config";
import { getExamQuestionCount } from "@/lib/constants/exam-question-counts";
import { countByExam, examMetaDescription } from "@/lib/seo/exam-meta";
import { findQuestionByRoute, questionPagePath } from "@/lib/seo/question-url";
import { getIndexableQuestions, getSitemapQuestions, getSitemapChunkCount } from "@/lib/seo/sitemap-pagination";
import { renderQuestionsSitemapChunkXml } from "@/lib/seo/sitemap-xml";
import QuestionPage, { generateStaticParams } from "@/app/q/[exam]/[yearSeason]/[section]/[qnum]/page";
import ExamTopPage from "@/app/[exam]/page";

const selected = release as Question[];
const expectedIds = new Set(packet.rows.map(row => row.id));
const sha256 = (value: string | Buffer) => createHash("sha256").update(value).digest("hex");
function canonical(value: unknown): string {
  if (Array.isArray(value)) return `[${value.map(canonical).join(",")}]`;
  if (value !== null && typeof value === "object") {
    const record = value as Record<string, unknown>;
    return `{${Object.keys(record).sort().map(key => `${JSON.stringify(key)}:${canonical(record[key])}`).join(",")}}`;
  }
  return JSON.stringify(value)!;
}
const route = (q: Question) => ({ exam: q.exam, yearSeason: `${q.year}-${q.season}`, section: q.session, qnum: `q${q.qNumber}` });

describe("clinical laboratory first75 local release payload", () => {
  it("adds exactly75 across static and lazy loaders while preserving the35 stored originals and six remaining holds", async () => {
    expect(selected).toHaveLength(75);
    expect(EXAM_CONFIGS["rinsho-kensagishi"].sessions.map(session => session.session)).toEqual(["am", "pm"]);
    expect(new Set(selected.map(q => q.id))).toEqual(expectedIds);
    expect(RINSHO_KENSAGISHI_QUESTIONS).toHaveLength(106);
    expect(new Set(RINSHO_KENSAGISHI_QUESTIONS.map(q => q.id)).size).toBe(106);
    expect(getQuestionsByExam("rinsho-kensagishi")).toEqual(RINSHO_KENSAGISHI_QUESTIONS);
    expect(await getQuestionsForExam("rinsho-kensagishi")).toEqual(RINSHO_KENSAGISHI_QUESTIONS);
    expect(ALL_QUESTIONS.filter(q => q.exam === "rinsho-kensagishi")).toEqual(RINSHO_KENSAGISHI_QUESTIONS);
    expect((await getQuestionCountsByExam())["rinsho-kensagishi"]).toBe(106);
    for (const file of baseline.baselineFiles) {
      expect(sha256(readFileSync(path.resolve(file.path), "utf8").replace(/\r\n/g, "\n")), file.path).toBe(file.sha256);
      for (const id of file.ids) expect(expectedIds.has(id)).toBe(false);
    }
    const newlyAccepted = "rinsho-kensagishi-2025-annual-pm-q35";
    expect(held7.filter(q => RINSHO_KENSAGISHI_QUESTIONS.some(row => row.id === q.id)).map(q => q.id)).toEqual([newlyAccepted]);
    const stillHeld = held7.filter(q => q.id !== newlyAccepted);
    expect(stillHeld).toHaveLength(6);
    for (const q of stillHeld) expect(RINSHO_KENSAGISHI_QUESTIONS.some(row => row.id === q.id)).toBe(false);
    const extra9 = ["2025-annual-pm-q12", "2025-annual-pm-q19", "2026-annual-am-q24", "2026-annual-am-q26", "2026-annual-am-q31", "2026-annual-am-q38", "2026-annual-am-q41", "2026-annual-am-q46", "2026-annual-pm-q55"];
    for (const suffix of extra9) expect(expectedIds.has(`rinsho-kensagishi-${suffix}`)).toBe(false);
    for (const q of selected) expect(q.year === 2026 && q.session === "pm" && q.qNumber >= 60).toBe(false);
  });

  it("binds unchanged stems, choices, answers, selection counts and explanations to the saved source object SHA", () => {
    for (const q of selected) {
      const row = packet.rows.find(row => row.id === q.id)!;
      expect(sha256(canonical(q)), q.id).toBe(row.proposedQuestionObjectSha256);
      expect(sha256(canonical({ ...q, ...row.originalFieldValues })), q.id).toBe(row.questionObjectSha256);
      expect(row.locallyChangedFields.every(key => ["needsReview", "imageUrls", "choiceImageUrls"].includes(key))).toBe(true);
      expect(q.needsReview).toBe(false);
      expect(q.officialAnswerNumber).toBe(row.officialAnswerNumber);
      expect(q.requiredSelections).toBe(row.requiredSelections);
      expect(Object.keys(q.choiceExplanations!)).toEqual(["ア", "イ", "ウ", "エ", "オ"]);
      expect(isPracticeReadyQuestion(q), q.id).toBe(true);
    }
  });

  it("serves all58 byte-identical official PNGs at payload URLs, including the five original q98 symbols", () => {
    expect(pngs.files).toHaveLength(58);
    const refs = selected.flatMap(q => q.imageUrls ?? []);
    expect(new Set(refs)).toEqual(new Set(pngs.files.map(file => file.url)));
    for (const file of pngs.files) expect(sha256(readFileSync(path.resolve(file.publicPath))), file.publicPath).toBe(file.sha256);
    const symbols = selected.find(q => q.id === "rinsho-kensagishi-2026-annual-am-q98")!;
    expect(symbols.imageUrls).toEqual(["/images/exams/rinsho-kensagishi/partial75-20261011/72-am-q98-original-options.png"]);
    expect(Object.values(symbols.choices!)).toEqual([1,2,3,4,5].map(n => `選択肢${n}の図記号（添付原図）`));
  });

  it("retains q4 alternative single-answer grading and required multi-selection for every saved key", () => {
    const alternative = selected.find(q => q.id === "rinsho-kensagishi-2025-annual-am-q4")!;
    expect(alternative.officialAnswerNumber).toBe("1/4");
    expect(alternative.requiredSelections).toBe(1);
    expect(isCompleteSelectionCorrect(alternative.answer, ["ア"], alternative.requiredSelections)).toBe(true);
    expect(isCompleteSelectionCorrect(alternative.answer, ["エ"], alternative.requiredSelections)).toBe(true);
    expect(isCompleteSelectionCorrect(alternative.answer, ["ア", "エ"], alternative.requiredSelections)).toBe(false);
    for (const q of selected) {
      const answers = Array.isArray(q.answer) ? q.answer : [q.answer];
      const count = q.requiredSelections!;
      expect(isCompleteSelectionCorrect(q.answer, answers.slice(0, count), count), q.id).toBe(true);
      expect(isCompleteSelectionCorrect(q.answer, [], count), q.id).toBe(false);
      if (count > 1) expect(isCompleteSelectionCorrect(q.answer, answers.slice(0, count - 1), count), q.id).toBe(false);
    }
  });

  it("adds75 usable canonical routes and exposes the exact106 partial count to SEO and hub metadata", async () => {
    expect(getIndexableQuestions().filter(q => q.exam === "rinsho-kensagishi")).toHaveLength(106);
    expect(getSitemapQuestions().filter(q => q.exam === "rinsho-kensagishi")).toHaveLength(106);
    expect(getExamQuestionCount("rinsho-kensagishi")).toBe(106);
    expect(countByExam("rinsho-kensagishi")).toBe(106);
    const params = await generateStaticParams();
    const xml = Array.from({ length: getSitemapChunkCount() }, (_, i) => renderQuestionsSitemapChunkXml(i)).join("");
    for (const q of selected) {
      expect(params).toContainEqual(route(q));
      expect(findQuestionByRoute(ALL_QUESTIONS, route(q))).toEqual(q);
      expect(xml).toContain(questionPagePath(q));
    }
    const description = examMetaDescription("rinsho-kensagishi", 106);
    expect(description).toContain("106原問を部分収録");
    expect(description).toContain("午前・午後");
    expect(description).toContain("全問は未完備");
    const hub = renderToStaticMarkup(await ExamTopPage({ params: Promise.resolve({ exam: "rinsho-kensagishi" }) }));
    expect(hub).toContain("106原問を部分収録");
  });

  it("renders every native Next detail page with its official sources and full five reasons", async () => {
    for (const q of selected) {
      const html = renderToStaticMarkup(await QuestionPage({ params: Promise.resolve(route(q)) }));
      expect(html, q.id).toContain("臨床検査技師");
      expect(html, q.id).toContain(q.sourcePdfUrl);
      expect(html, q.id).toContain(q.sourceAnswerUrl!);
      for (const image of q.imageUrls ?? []) expect(html, q.id).toContain(image);
      for (const key of ["ア", "イ", "ウ", "エ", "オ"] as const) expect(html, q.id).toContain(q.choiceExplanations![key]!.slice(0, 12));
    }
  });
});
