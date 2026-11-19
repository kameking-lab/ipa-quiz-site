import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { CHOSASHI_QUESTIONS } from "@/data/questions/chosashi";
import { getQuestionsForExam } from "@/lib/questions/get-questions";
import { ALL_EXAM_CODES, EXAM_CONFIGS } from "@/lib/exam-config";
import { isPracticeReadyQuestion } from "@/lib/questions/filter";
import { choiceDisplayLabel } from "@/lib/questions/display";
import { buildQuestionJsonLd } from "@/lib/seo/question-jsonld";

describe("土地家屋調査士・公式原問の完備", () => {
  it("年度別の午前・午後を原問で数え、択一90・記述6を重複させない", () => {
    expect(CHOSASHI_QUESTIONS).toHaveLength(96);
    const identities = CHOSASHI_QUESTIONS.map(q => `${q.year}/${q.session}/${q.qNumber}`);
    expect(new Set(identities).size).toBe(96);
    for (const [year, am, pm] of [[2022, 10, 20], [2024, 11, 22], [2025, 11, 22]] as const) {
      for (const [session, total] of [["am", am], ["pm", pm]] as const) {
        const pool = CHOSASHI_QUESTIONS.filter(q => q.year === year && q.session === session);
        expect(pool.map(q => q.qNumber).sort((a,b) => a-b)).toEqual(Array.from({length:total},(_,i) => i+1));
      }
    }
    expect(CHOSASHI_QUESTIONS.filter(q => q.type === "multiple-choice")).toHaveLength(90);
    expect(CHOSASHI_QUESTIONS.filter(q => q.type === "descriptive")).toHaveLength(6);
  });

  it("五択450肢に具体解説を持ち、公式番号を表示・正答へ一対一で対応する", () => {
    for (const q of CHOSASHI_QUESTIONS.filter(q => q.type === "multiple-choice")) {
      expect(Object.keys(q.choices ?? {})).toEqual(["ア", "イ", "ウ", "エ", "オ"]);
      expect(choiceDisplayLabel(q.exam, String(q.answer) as "ア")).toBe(q.officialAnswerNumber);
      expect(q.sourceAnswerUrl).toMatch(/^https:\/\/www\.moj\.go\.jp\.?\/content\/\d+\.pdf(?:#page=\d+)?$/);
      for (const key of ["ア", "イ", "ウ", "エ", "オ"] as const) expect(q.choiceExplanations?.[key]?.length).toBeGreaterThan(20);
    }
  });

  it("必要原図と独自作図のファイルが実在し、記述が公式解答として扱われない", () => {
    for (const q of CHOSASHI_QUESTIONS) {
      expect(isPracticeReadyQuestion(q), q.id).toBe(true);
      expect(q.sourcePdfUrl).toMatch(/^https:\/\/www\.moj\.go\.jp\.?\/content\/\d+\.pdf(?:#page=\d+)?$/);
      for (const url of q.imageUrls ?? []) expect(existsSync(join(process.cwd(),"public",url)), `${q.id}: ${url}`).toBe(true);
      if (q.type === "descriptive") {
        expect(q.modelAnswer).toContain("公式問題に基づく独自解答例");
        expect(q.modelAnswer).toContain("法務省の公式解答ではありません");
        const images = [...(q.modelAnswer ?? "").matchAll(/!\[[^\]]*\]\(\/images\/questions\/chosashi\/([^\s)]+\.svg)\)/g)];
        expect(images.length, q.id).toBe(q.id === "chosashi-2024-pm-q22" ? 2 : 1);
        for (const image of images) {
          const path = join(process.cwd(),"public/images/questions/chosashi",image[1]);
          expect(existsSync(path), path).toBe(true);
          expect(readFileSync(path,"utf8")).toContain("<svg");
        }
        expect(q.sourceAnswerUrl).toBeUndefined();
        expect(q.scoringCriteria?.length).toBeGreaterThan(10);
      }
    }
  });

  it("IPA向けのPDF取込対象から分離し、公開ローダーと午前・午後の設定が一致する", async () => {
    expect(ALL_EXAM_CODES).not.toContain("chosashi");
    expect(EXAM_CONFIGS.chosashi.sessions.map(s => s.expectedQuestions)).toEqual([11,22]);
    expect((await getQuestionsForExam("chosashi")).map(q => q.id)).toEqual(CHOSASHI_QUESTIONS.map(q => q.id));
  });

  it("記述の構造化データは法務省を出題者、独自解答をsuggestedAnswerとする", () => {
    const question = CHOSASHI_QUESTIONS.find(q => q.type === "descriptive")!;
    const graph = JSON.stringify(buildQuestionJsonLd({question,pageUrlAbs:"https://www.kakomon-ai.jp/q/chosashi/2025-autumn/am/q11",title:"土地家屋調査士",lastUpdatedISO:"2026-10-11"}));
    expect(graph).toContain('"name":"法務省"');
    expect(graph).toContain('"suggestedAnswer"');
    expect(graph).not.toContain('"acceptedAnswer"');
    expect(graph).not.toContain("情報処理推進機構");
  });
});
