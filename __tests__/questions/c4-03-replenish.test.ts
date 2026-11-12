import { describe, expect, it } from "vitest";
import { TOBI3_QUESTIONS } from "@/data/questions/tobi3";
import { QUESTIONS_BY_EXAM } from "@/data/questions";
import { getQuestionsForExam } from "@/lib/questions/get-questions";
import { EXAM_CONFIGS } from "@/lib/exam-config";
import { formatQuestionAnswerForDisplay } from "@/lib/questions/display";
import { questionPagePath, findQuestionByRoute } from "@/lib/seo/question-url";
import { isPracticeReadyQuestion } from "@/lib/questions/filter";

describe("Q4-007 とび3級2023年度前期", () => {
  // 公式正答表の画像を、印刷順に独立転記。
  const official = "○○×○○××○○××○××○○○×××○×××○○○××○";
  const qs = TOBI3_QUESTIONS.filter(q => q.year === 2023 && q.season === "early");

  it("原本30問の正答・表示・採点・公開URLを一致させる", () => {
    expect(qs).toHaveLength(30);
    expect(official).toHaveLength(30);
    expect(new Set(qs.map(questionPagePath)).size).toBe(30);
    qs.forEach((q, i) => {
      expect(q.officialQuestionLabel).toBe(String(i + 1));
      expect(q.officialAnswerNumber, q.id).toBe(official[i]);
      expect(q.answer, q.id).toBe(official[i] === "○" ? "ア" : "イ");
      expect(formatQuestionAnswerForDisplay(q, q.answer!)).toBe(official[i]);
      expect(isPracticeReadyQuestion(q), q.id).toBe(true);
      expect(Object.keys(q.choiceExplanations!)).toEqual(["ア", "イ"]);
      expect(EXAM_CONFIGS.tobi3.sessions[0].categories).toContain(q.category);
      expect(findQuestionByRoute(qs, { exam: "tobi3", yearSeason: "2023-early", section: "gakka", qnum: `q${i + 1}` })).toBe(q);
    });
  });

  it("同期・遅延読込に接続し、てこの距離と資格の区別を説明する", async () => {
    expect(QUESTIONS_BY_EXAM.tobi3).toEqual(TOBI3_QUESTIONS);
    expect(await getQuestionsForExam("tobi3")).toEqual(TOBI3_QUESTIONS);
    expect(qs[5].explanation).toContain("大きくなり");
    expect(qs[21].explanation).toContain("SRC");
    expect(qs[28].explanation).toContain("技能講習");
  });
});
