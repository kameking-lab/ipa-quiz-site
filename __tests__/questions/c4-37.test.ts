import { describe, expect, it } from "vitest";
import { FLOWER3_QUESTIONS } from "@/data/questions/flower3";
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
