import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import { KINZOKU_NETSUSHORI2_QUESTIONS } from "@/data/questions/kinzoku-netsushori2";
import { QUESTIONS_BY_EXAM } from "@/data/questions";
import { getQuestionsForExam } from "@/lib/questions/get-questions";
import { EXAM_CONFIGS } from "@/lib/exam-config";
import { formatQuestionAnswerForDisplay, questionNumberLabel, choiceDisplayLabel } from "@/lib/questions/display";
import { questionSourceEdition } from "@/lib/questions/source-label";
import { findQuestionByRoute, questionPagePath } from "@/lib/seo/question-url";
import { getQualificationByExamCode } from "@/lib/qualifications/catalog";
import { buildQuestionJsonLd } from "@/lib/seo/question-jsonld";

// 公式正答表の5問ずつのブロックを、問題JSONとは独立に転記。
const answers = ["○○×××", "○××○×", "××○×○", "○×○×○", "○×○○×", "ニイイロニ", "ハロニニロ", "イロハイイ", "イイイハイ", "ニハハハニ"].join("").split("");
const questions = KINZOKU_NETSUSHORI2_QUESTIONS.filter(q => q.year === 2024);
describe("金属熱処理2級2024年度前期", () => {
  it("両群50問の公式正答・群番号・全肢解説とURLの対応を保持する", () => {
    expect(questions).toHaveLength(50);
    expect(new Set(questions.map(q => q.id)).size).toBe(50);
    expect(new Set(questions.map(questionPagePath)).size).toBe(50);
    questions.forEach((q, i) => {
      expect(q.id).toBe(`kinzoku-netsushori2-2024-early-gakka-${i < 25 ? "a" : "b"}-${String(i % 25 + 1).padStart(3, "0")}`);
      expect(q.qNumber).toBe(i + 1);
      expect(questionNumberLabel(q)).toBe(`${i < 25 ? "A" : "B"}群 ${i % 25 + 1}`);
      expect(q.officialAnswerNumber).toBe(answers[i]);
      expect(formatQuestionAnswerForDisplay(q, q.answer)).toBe(answers[i]);
      expect(questionSourceEdition(q)).toBe("2024年度前期");
      expect(Object.keys(q.choiceExplanations ?? {})).toEqual(Object.keys(q.choices ?? {}));
      expect(EXAM_CONFIGS[q.exam].sessions[0].categories).toContain(q.category);
      const [, , exam, yearSeason, section, qnum] = questionPagePath(q).split("/");
      expect(findQuestionByRoute(questions, { exam, yearSeason, section, qnum })?.id).toBe(q.id);
    });
    expect(choiceDisplayLabel("kinzoku-netsushori2", "エ")).toBe("ニ");
  });
  it("図3点と公式正答に疑義があるB群6の本文・正答を保持する", () => {
    expect(questions.filter(q => q.hasImage).map(q => q.qNumber)).toEqual([41, 48, 49]);
    for (const q of questions) for (const url of q.imageUrls ?? []) {
      const bytes = readFileSync(`public${url}`);
      expect(bytes.subarray(0, 4).toString()).toBe("RIFF");
      expect(bytes.subarray(8, 12).toString()).toBe("WEBP");
    }
    expect(questions[30].officialAnswerNumber).toBe("ハ");
    expect(questions[30].choices?.エ).toBe("処理後、水冷によって硬化する。");
    expect(questions[30].explanation).toContain("公式本文・公式正答を保持");
  });
  it("同期・遅延ローダー、資格一覧と構造化データに接続する", async () => {
    expect(QUESTIONS_BY_EXAM["kinzoku-netsushori2"]).toEqual(KINZOKU_NETSUSHORI2_QUESTIONS);
    expect(await getQuestionsForExam("kinzoku-netsushori2")).toEqual(KINZOKU_NETSUSHORI2_QUESTIONS);
    expect(getQualificationByExamCode("kinzoku-netsushori2")?.status).toBe("live");
    expect(EXAM_CONFIGS["kinzoku-netsushori2"].sessions[0].expectedQuestions).toBe(50);
    expect(JSON.stringify(buildQuestionJsonLd({ question: questions[0], pageUrlAbs: "https://www.kakomon-ai.jp/q/kinzoku-netsushori2/2024-early/gakka/q1", title: "金属熱処理2級", lastUpdatedISO: "2026-11-13" }))).toContain("中央職業能力開発協会");
  });
});
