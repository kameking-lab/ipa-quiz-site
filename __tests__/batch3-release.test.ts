import { describe, expect, it } from "vitest";
import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";
import { ALL_QUESTIONS, QUESTIONS_BY_EXAM } from "@/data/questions";
import { getQuestionsForExam, getRegisteredExamCodes } from "@/lib/questions/get-questions";
import { getHomeDirectory } from "@/lib/home/home-directory";
import { getQualificationByExamCode } from "@/lib/qualifications/catalog";
import { EXAM_CONFIGS } from "@/lib/exam-config";
import { isSelfReviewedDescriptiveQuestion } from "@/lib/questions/descriptive";
import { isPracticeReadyQuestion, shuffleChoices } from "@/lib/questions/filter";
import { isAcceptedAnswer, isCompleteSelectionCorrect } from "@/lib/questions/answers";
import { questionSourceEdition } from "@/lib/questions/source-label";
import { questionPagePath, findQuestionByRoute } from "@/lib/seo/question-url";
import { buildQuestionJsonLd } from "@/lib/seo/question-jsonld";
import { GET as nextGET } from "@/app/api/questions/next/route";
import scope from "@/reports/int7-20261105/release-scope.json";
import receipt from "@/reports/int7-20261105/projection-receipt.json";

const codes = Object.keys(scope) as (keyof typeof scope)[];
describe("INT7 batch3 public release integration", () => {
  it.each(codes)("serves %s through eager/lazy registries, canonical routes, home and question API", async code => {
    const questions = QUESTIONS_BY_EXAM[code]!;
    expect(questions).toHaveLength(scope[code].exercises);
    expect(await getQuestionsForExam(code)).toEqual(questions);
    expect(getRegisteredExamCodes()).toContain(code);
    expect(getQualificationByExamCode(code)?.status).toBe("live");
    expect(getHomeDirectory().flatMap(d => [...d.featured, ...d.compact]).find(q => q.key === code)?.questionCount).toBe(questions.length);
    expect(questions.every(isPracticeReadyQuestion)).toBe(true);
    expect(new Set(questions.map(questionPagePath)).size).toBe(questions.length);
    for (const q of questions) {
      expect(EXAM_CONFIGS[code].sessions.some(s => s.session === q.session)).toBe(true);
      const [, , exam, yearSeason, section, qnum] = questionPagePath(q).split("/");
      expect(findQuestionByRoute(ALL_QUESTIONS, {exam, yearSeason, section, qnum})?.id).toBe(q.id);
      if (q.hasImage) expect(q.imageUrls?.length).toBeGreaterThan(0);
      expect(q.sourceAttribution).toBeTruthy();
    }
    const sample = questions[0];
    const response = await nextGET(new Request(`http://localhost/api/questions/next?id=${sample.id}`));
    expect(response.status).toBe(200);
    expect((await response.json()).id).toBe(sample.id);
    const graph = buildQuestionJsonLd({question: sample, pageUrlAbs: `https://www.kakomon-ai.jp${questionPagePath(sample)}`, title: scope[code].name, lastUpdatedISO: "2026-11-05"})["@graph"];
    expect(JSON.stringify(graph)).toContain(getQualificationByExamCode(code)!.administrator);
  });
  it("keeps source asset mappings byte-identical in their public copies", () => {
    expect(Object.keys(receipt.assets).length).toBeGreaterThan(1200);
    for (const [path, item] of Object.entries(receipt.assets)) {
      const digest = (bytes: Buffer) => createHash("sha256").update(bytes).digest("hex");
      expect(digest(readFileSync(path))).toBe(item.sha256);
      expect(digest(readFileSync(`public${item.url}`))).toBe(item.sha256);
    }
  });
  it("preserves exact multi-selection and alternate single-answer semantics", () => {
    const travel = QUESTIONS_BY_EXAM["chiiki-ryoko"]!.filter(q => (q.requiredSelections ?? 1) > 1);
    expect(travel.length).toBeGreaterThan(0);
    for (const q of travel) {
      const answer = q.answer as (keyof NonNullable<typeof q.choices>)[];
      expect(isCompleteSelectionCorrect(q.answer, answer, q.requiredSelections)).toBe(true);
      expect(isCompleteSelectionCorrect(q.answer, answer.slice(1), q.requiredSelections)).toBe(false);
    }
    const nurse = QUESTIONS_BY_EXAM["junkango-kansai"]!.find(q => q.year === 2026 && q.qNumber === 139)!;
    expect(nurse.answer).toEqual(["イ", "エ"]);
    expect(nurse.requiredSelections).toBeUndefined();
    expect(isAcceptedAnswer(nurse.answer, "イ")).toBe(true);
    expect(isAcceptedAnswer(nurse.answer, "エ")).toBe(true);
    expect(shuffleChoices(nurse)).toBe(nurse);
  });
  it("excludes official credit-for-all and keeps the 2026-only scope explicit", () => {
    expect(receipt.excluded).toHaveLength(2);
    for (const q of receipt.excluded) expect(ALL_QUESTIONS.some(r => r.id === q.id)).toBe(false);
    expect(QUESTIONS_BY_EXAM["kukaku-seiri"]!.every(q => q.year === 2026)).toBe(true);
    expect(getQualificationByExamCode("kukaku-seiri")?.reuseSummary).toContain("2026年度のみ");
  });
  it("preserves surveyor descriptive answer images and manual assessment without inventing choice scores", () => {
    const afternoon = QUESTIONS_BY_EXAM.sokuryoshi!.filter(q => q.type === "descriptive");
    expect(afternoon).toHaveLength(10);
    for (const q of afternoon) {
      expect(isSelfReviewedDescriptiveQuestion(q)).toBe(true);
      expect(q.choices).toBeUndefined();
      expect(q.answerImageUrls?.length).toBeGreaterThan(0);
      expect(q.modelAnswer).toBeTruthy();
      expect(q.scoringCriteria).toContain("自動採点しません");
    }
  });
});
