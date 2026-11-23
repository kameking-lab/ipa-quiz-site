import { describe, expect, it } from "vitest";
import { FLOWER3_QUESTIONS } from "@/data/questions/flower3";
import { FLOWER1_QUESTIONS } from "@/data/questions/flower1";
import { QUESTIONS_BY_EXAM } from "@/data/questions";
import { EXAM_CONFIGS } from "@/lib/exam-config";
import { getQuestionsForExam } from "@/lib/questions/get-questions";
import { getQualificationByExamCode } from "@/lib/qualifications/catalog";
import { formatQuestionAnswerForDisplay, questionNumberLabel, choiceDisplayLabel, usesNumberedChoices } from "@/lib/questions/display";
import { questionPagePath, findQuestionByRoute } from "@/lib/seo/question-url";
import { questionSourceEdition } from "@/lib/questions/source-label";
import { buildQuestionJsonLd } from "@/lib/seo/question-jsonld";
import { examFullName, examTopDescription } from "@/lib/seo/exam-meta";

describe("Q4-109 フラワー装飾3級2024年度前期", () => {
  const questions = FLOWER3_QUESTIONS.filter(q => q.year === 2024);
  // 公式正答表の原本画像から独立して転記。問1から問30の順。
  const answers = "○○○○○○×××○" + "××○×○○×××○" + "○○○○○○×○×○";
  it("30問の公式正答と真偽法の表示を保持する", () => {
    expect(questions).toHaveLength(30);
    questions.forEach((q, i) => {
      expect(q.id).toBe(`flower3-2024-early-gakka-${String(i + 1).padStart(3, "0")}`);
      expect(q.officialAnswerNumber).toBe(answers[i]);
      expect(formatQuestionAnswerForDisplay(q, q.answer)).toBe(answers[i]);
      expect(questionNumberLabel(q)).toBe(String(i + 1));
      expect(questionSourceEdition(q)).toBe("2024年度前期");
      expect(q.sourcePdfUrl).toMatch(/#page=[23]$/);
      expect(q.hasImage).toBe(false);
      expect(Object.keys(q.choiceExplanations ?? {})).toEqual(["ア", "イ"]);
      expect(EXAM_CONFIGS.flower3.sessions[0].categories).toContain(q.category);
    });
    expect(choiceDisplayLabel("flower3", "ア")).toBe("○");
    expect(choiceDisplayLabel("flower3", "イ")).toBe("×");
    expect(usesNumberedChoices("flower3")).toBe(true);
  });
  it("同期・遅延ローダーと資格一覧を接続する", async () => {
    expect(QUESTIONS_BY_EXAM.flower3).toEqual(FLOWER3_QUESTIONS);
    expect(await getQuestionsForExam("flower3")).toEqual(FLOWER3_QUESTIONS);
    expect(getQualificationByExamCode("flower3")?.status).toBe("live");
    expect(examFullName("flower3")).toContain("3級フラワー装飾");
    expect(examTopDescription("flower3", 30)).toContain("フラワー装飾");
  });
  it("各原問のURLと出典・正答の構造化データを生成する", () => {
    expect(new Set(questions.map(questionPagePath)).size).toBe(30);
    questions.forEach(q => {
      const [, , exam, yearSeason, section, qnum] = questionPagePath(q).split("/");
      expect(findQuestionByRoute(FLOWER3_QUESTIONS, { exam, yearSeason, section, qnum })?.id).toBe(q.id);
    });
    const jsonld = JSON.stringify(buildQuestionJsonLd({ question: questions[0], pageUrlAbs: `https://www.kakomon-ai.jp${questionPagePath(questions[0])}`, title: "フラワー装飾技能士3級", lastUpdatedISO: "2026-11-13" }));
    expect(jsonld).toContain("中央職業能力開発協会");
    expect(jsonld).toContain("○: 正しい（○）");
  });
});

describe("Q4-111 フラワー装飾3級2023年度前期", () => {
  const questions = FLOWER3_QUESTIONS.filter(q => q.year === 2023);
  // 公式正答表の原本画像から独立して転記。問1から問30の順。
  const answers = "○×○○○×○×××" + "××○××○○××○" + "×○○×○○○○×○";
  it("30問の公式正答と原文・全肢解説を保持する", () => {
    expect(questions).toHaveLength(30);
    questions.forEach((q, i) => {
      expect(q.id).toBe(`flower3-2023-early-gakka-${String(i + 1).padStart(3, "0")}`);
      expect(q.officialAnswerNumber).toBe(answers[i]);
      expect(formatQuestionAnswerForDisplay(q, q.answer)).toBe(answers[i]);
      expect(questionNumberLabel(q)).toBe(String(i + 1));
      expect(questionSourceEdition(q)).toBe("2023年度前期");
      expect(q.sourcePdfUrl).toMatch(/#page=[23]$/);
      expect(q.hasImage).toBe(false);
      expect(Object.keys(q.choiceExplanations ?? {})).toEqual(["ア", "イ"]);
      expect(EXAM_CONFIGS.flower3.sessions[0].categories).toContain(q.category);
    });
    expect(questions[5].question).toBe("無彩色は、色相、明度及び彩度を持っている。");
    expect(questions[5].answer).toBe("イ");
    expect(questions[26].question).toContain("アキザクラ");
    expect(questions[26].answer).toBe("ア");
  });
  it("3級の各年度30問を年度別URLで読み込む", async () => {
    const previousEditions = FLOWER3_QUESTIONS.filter(q => q.year === 2023 || q.year === 2024);
    expect(previousEditions).toHaveLength(60);
    expect(EXAM_CONFIGS.flower3.yearRange.start).toBeLessThanOrEqual(2023);
    expect(EXAM_CONFIGS.flower3.yearRange.end).toBeGreaterThanOrEqual(2024);
    expect(await getQuestionsForExam("flower3")).toEqual(FLOWER3_QUESTIONS);
    expect(new Set(FLOWER3_QUESTIONS.map(questionPagePath)).size).toBe(FLOWER3_QUESTIONS.length);
    questions.forEach(q => {
      const [, , exam, yearSeason, section, qnum] = questionPagePath(q).split("/");
      expect(findQuestionByRoute(FLOWER3_QUESTIONS, { exam, yearSeason, section, qnum })?.id).toBe(q.id);
    });
  });
});

describe("Q4-110 フラワー装飾1級2023年度前期", () => {
  const questions = FLOWER1_QUESTIONS.filter(q => q.year === 2023);
  // 公式正答表の原本画像から独立して転記。A群、B群の順。
  const answers = "×○×○×××○○×××××××○○○×××××○"
    + "ハイニニイロニイイハニロロハロニロハニロイイハロイ";
  it("50問の原問番号と公式正答を表示する", () => {
    expect(questions).toHaveLength(50);
    questions.forEach((q, i) => {
      const group = i < 25 ? "a" : "b";
      expect(q.id).toBe(`flower1-2023-early-gakka-${group}-${String(i % 25 + 1).padStart(3, "0")}`);
      expect(q.officialAnswerNumber).toBe(answers[i]);
      expect(formatQuestionAnswerForDisplay(q, q.answer)).toBe(answers[i]);
      expect(questionNumberLabel(q)).toBe(`${group.toUpperCase()}群 ${i % 25 + 1}`);
      expect(questionSourceEdition(q)).toBe("2023年度前期");
      expect(q.hasImage).toBe(false);
      expect(Object.keys(q.choiceExplanations ?? {})).toEqual(Object.keys(q.choices ?? {}));
      expect(EXAM_CONFIGS.flower1.sessions[0].categories).toContain(q.category);
    });
    expect(choiceDisplayLabel("flower1", "ウ")).toBe("ハ");
    expect(usesNumberedChoices("flower1")).toBe(true);
    expect(questions[49].choices?.ウ).toContain("スイセンのナンプ病");
    expect(questions[45].explanation).toContain("注：ワレモコウは穂状花序");
  });
  it("年度別URLと同期・遅延ローダーに接続する", async () => {
    expect(QUESTIONS_BY_EXAM.flower1).toEqual(FLOWER1_QUESTIONS);
    expect(await getQuestionsForExam("flower1")).toEqual(FLOWER1_QUESTIONS);
    expect(getQualificationByExamCode("flower1")?.status).toBe("live");
    expect(examFullName("flower1")).toContain("1級フラワー装飾");
    expect(examTopDescription("flower1", 50)).toContain("フラワー装飾");
    expect(new Set(questions.map(questionPagePath)).size).toBe(50);
    questions.forEach(q => {
      const [, , exam, yearSeason, section, qnum] = questionPagePath(q).split("/");
      expect(findQuestionByRoute(FLOWER1_QUESTIONS, { exam, yearSeason, section, qnum })?.id).toBe(q.id);
    });
  });
  it("A群・B群の構造化データに原本の正答表示を使う", () => {
    for (const [q, answer] of [[questions[0], "×: 誤り（×）"], [questions[25], "ハ: 日常生活の中で表現する世界"]] as const) {
      const jsonld = JSON.stringify(buildQuestionJsonLd({ question: q, pageUrlAbs: `https://www.kakomon-ai.jp${questionPagePath(q)}`, title: "フラワー装飾技能士1級", lastUpdatedISO: "2026-11-13" }));
      expect(jsonld).toContain("中央職業能力開発協会");
      expect(jsonld).toContain(answer);
    }
  });
});
