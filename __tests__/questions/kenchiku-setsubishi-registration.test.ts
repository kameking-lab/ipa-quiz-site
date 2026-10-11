import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";
import { ALL_QUESTIONS, QUESTIONS_BY_EXAM } from "@/data/questions";
import { ALL_QUIZ_EXAM_CODES, EXAM_CONFIGS } from "@/lib/exam-config";
import { getQualificationByExamCode, isExamPublished } from "@/lib/qualifications/catalog";
import { getQuestionsForExam, getRegisteredExamCodes } from "@/lib/questions/get-questions";
import { choiceDisplayLabel, choiceImageAlt, usesNumberedChoices } from "@/lib/questions/display";
import { practiceSessionLabel } from "@/lib/questions/practice-session";
import { questionSourceExam } from "@/lib/questions/source-label";
import { getQuestionCanonicalRepresentative } from "@/lib/seo/question-canonical";
import { buildQuestionJsonLd } from "@/lib/seo/question-jsonld";
import type { Question } from "@/lib/questions/types";

const EXAM = "kenchiku-setsubishi" as const;
const example: Question = {
  id: "kenchiku-setsubishi-2026-annual-am1-q1",
  exam: EXAM,
  session: "am1",
  year: 2026,
  season: "annual",
  qNumber: 1,
  type: "multiple-choice",
  category: "建築一般知識",
  topicTags: [],
  difficulty: 2,
  question: "建築に関する設問",
  choices: { ア: "選択肢A", イ: "選択肢B", ウ: "選択肢C", エ: "選択肢D" },
  answer: "ア",
  explanation: "解説",
  hasImage: false,
  sourcePdfUrl: "https://www.jaeic.or.jp/assets/pdf/shiken/bmee/example.pdf#page=1",
  license: "JAEIC-permission-required",
};

describe("建築設備士の未許諾登録", () => {
  it("keeps the release gate closed across catalog, quiz lists and loaders", async () => {
    expect(getQualificationByExamCode(EXAM)?.status).toBe("permission-required");
    expect(isExamPublished(EXAM)).toBe(false);
    expect(ALL_QUIZ_EXAM_CODES).not.toContain(EXAM);
    expect(getRegisteredExamCodes()).not.toContain(EXAM);
    expect(QUESTIONS_BY_EXAM[EXAM]).toBeUndefined();
    expect(ALL_QUESTIONS.some((question) => question.exam === EXAM)).toBe(false);
    expect(await getQuestionsForExam(EXAM)).toEqual([]);
  });

  it("keeps all six candidates in CLI validation, outside product imports", () => {
    const eager = readFileSync(resolve(process.cwd(), "data/questions/index.ts"), "utf8");
    const lazy = readFileSync(resolve(process.cwd(), "lib/questions/get-questions.ts"), "utf8");
    const cli = readFileSync(resolve(process.cwd(), "scripts/validate-questions.ts"), "utf8");
    const privateIndex = readFileSync(resolve(process.cwd(), "data/questions/kenchiku-setsubishi/index.ts"), "utf8");
    expect(eager).not.toContain("kenchiku-setsubishi");
    expect(eager).not.toContain("KENCHIKU_SETSUBISHI_QUESTIONS");
    expect(lazy).not.toContain('import("@/data/questions/kenchiku-setsubishi")');
    expect(lazy).toContain('"kenchiku-setsubishi": async () => []');
    expect(cli).toContain('import { KENCHIKU_SETSUBISHI_QUESTIONS } from "@/data/questions/kenchiku-setsubishi"');
    expect(cli).toMatch(/\.values\(\),\s*\/\/[^\n]*\n\s*\.\.\.KENCHIKU_SETSUBISHI_QUESTIONS/);
    for (const year of [2025, 2026]) {
      for (const session of ["am1", "am2", "pm"]) {
        expect(privateIndex).toContain(`./${year}-${session}.json`);
      }
    }
  });

  it("retains distinct subject sessions and JAEIC source labels", () => {
    expect(EXAM_CONFIGS[EXAM].sessions.map(({ session, expectedQuestions }) => [session, expectedQuestions])).toEqual([
      ["am1", 27], ["am2", 18], ["pm", 60],
    ]);
    expect(["am1", "am2", "pm"].map((session) => practiceSessionLabel(session as Question["session"], EXAM))).toEqual([
      "建築一般知識", "建築法規", "建築設備",
    ]);
    expect(questionSourceExam(example)).toBe("建築設備士");
    expect(questionSourceExam(example)).not.toContain("IPA");
    expect(getQuestionCanonicalRepresentative([example], example)).toBe(example);
  });

  it("shows the original four numbered choices and figure alt labels", () => {
    expect(["ア", "イ", "ウ", "エ"].map((key) => choiceDisplayLabel(EXAM, key as keyof NonNullable<Question["choices"]>))).toEqual([
      "1", "2", "3", "4",
    ]);
    expect(usesNumberedChoices(EXAM)).toBe(true);
    expect(choiceImageAlt(EXAM, "ア")).toContain("選択肢1");
    expect(choiceImageAlt(EXAM, "エ")).toContain("選択肢4");
  });

  it("attributes structured question data and terms to JAEIC", () => {
    const graph = buildQuestionJsonLd({
      question: example,
      pageUrlAbs: "https://example.test/q/kenchiku-setsubishi-2026-annual-am1-q1",
      title: "建築設備士の問題",
      lastUpdatedISO: "2026-10-11",
    })["@graph"];
    const resource = graph[0];
    expect(resource).toMatchObject({
      creator: { name: "公益財団法人建築技術教育普及センター", url: "https://www.jaeic.or.jp/" },
      license: "https://www.jaeic.or.jp/shiken/bmee/bmee-mondai.html",
      hasPart: { author: { name: "公益財団法人建築技術教育普及センター", url: "https://www.jaeic.or.jp/" } },
    });
  });
});
