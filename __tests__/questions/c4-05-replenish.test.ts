import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import { createHash } from "node:crypto";
import { KENCHIKU_DAIKU1_QUESTIONS } from "@/data/questions/kenchiku-daiku1";
import { QUESTIONS_BY_EXAM } from "@/data/questions";
import { getQuestionsForExam } from "@/lib/questions/get-questions";
import { EXAM_CONFIGS } from "@/lib/exam-config";
import { formatQuestionAnswerForDisplay } from "@/lib/questions/display";
import { questionSourceEdition } from "@/lib/questions/source-label";
import { findQuestionByRoute, questionPagePath } from "@/lib/seo/question-url";
import { isPracticeReadyQuestion } from "@/lib/questions/filter";
import type { ChoiceKey, ExamCode, Question } from "@/lib/questions/types";

function checkSitting(exam: ExamCode, season: "early" | "late", qs: Question[], a: string, b = "") {
  it("原本の全正答と番号を保持し、全肢解説と演習URLを使える", () => {
    const symbols = a + b;
    expect(qs).toHaveLength(symbols.length);
    expect(new Set(qs.map(questionPagePath)).size).toBe(qs.length);
    qs.forEach((q, i) => {
      const tf = i < a.length;
      const keys: ChoiceKey[] = ["ア", "イ", "ウ", "エ"];
      const answer = tf ? (symbols[i] === "○" ? "ア" : "イ") : keys["イロハニ".indexOf(symbols[i])];
      expect(q.officialAnswerNumber, q.id).toBe(symbols[i]);
      expect(q.answer, q.id).toBe(answer);
      expect(q.qNumber).toBe(i + 1);
      expect(q.officialQuestionLabel).toBe(b ? `${tf ? "A" : "B"}群 ${i % 25 + 1}` : String(i + 1));
      expect(formatQuestionAnswerForDisplay(q, answer)).toBe(symbols[i]);
      expect(questionSourceEdition(q)).toBe(`2023年度${season === "late" ? "後期" : "前期"}`);
      expect(isPracticeReadyQuestion(q), q.id).toBe(true);
      expect(Object.keys(q.choiceExplanations!).sort()).toEqual(Object.keys(q.choices!).sort());
      expect(EXAM_CONFIGS[exam].sessions[0].categories).toContain(q.category);
      expect(findQuestionByRoute(qs, { exam, yearSeason: `2023-${season}`, section: "gakka", qnum: `q${i + 1}` })).toBe(q);
    });
  });

  it("同期・遅延ローダーと原図を接続し、原本切り出しのハッシュを一致させる", async () => {
    expect(QUESTIONS_BY_EXAM[exam]).toEqual(await getQuestionsForExam(exam));
    expect(QUESTIONS_BY_EXAM[exam]).toEqual(expect.arrayContaining(qs));
    const source = JSON.parse(readFileSync(`data/questions/${exam}/sources-2023-${season}.json`, "utf8"));
    expect(qs.filter(q => q.hasImage)).toHaveLength(source.figures.length);
    for (const figure of source.figures) {
      const data = readFileSync(`public${figure.url}`);
      expect(data.subarray(8, 12).toString()).toBe("WEBP");
      expect(createHash("sha256").update(data).digest("hex")).toBe(figure.sha256);
      expect(qs.some(q => q.imageUrls?.includes(figure.url))).toBe(true);
    }
  });
}

describe("Q4-013 建築大工1級2023年度後期", () => {
  // 公式正答表画像の左右各25記号を、採点データと独立に転記。
  const qs = KENCHIKU_DAIKU1_QUESTIONS.filter(q => q.year === 2023 && q.season === "late");
  checkSitting("kenchiku-daiku1", "late", qs, "×○○○×○○×○××○○○×○○○○×○○○××", "ニイイハロロイニハイロイハロイイロニハロロニイハニ");

  it("誤りの数値と足場の指示位置を説明する", () => {
    expect(qs[23].explanation).toContain("3分の1");
    expect(qs[24].explanation).toContain("75度");
    expect(qs[38].choiceExplanations?.イ).toContain("作業床下");
    expect(qs[48].answer).toBe("ウ");
  });
});
