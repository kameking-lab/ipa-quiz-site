import { describe, expect, it } from "vitest";
import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";
import path from "node:path";
import { HYOSO2_QUESTIONS as questions } from "@/data/questions/hyoso2";
import sources from "@/data/questions/hyoso2/sources.json";
import { QUESTIONS_BY_EXAM } from "@/data/questions";
import { getQuestionsForExam } from "@/lib/questions/get-questions";
import { EXAM_CONFIGS } from "@/lib/exam-config";
import { choiceDisplayLabel, choiceImageAlt, formatQuestionAnswerForDisplay, questionNumberLabel, usesNumberedChoices } from "@/lib/questions/display";
import { questionSourceEdition } from "@/lib/questions/source-label";
import { getQualificationByExamCode } from "@/lib/qualifications/catalog";
import { isPracticeReadyQuestion } from "@/lib/questions/filter";

const exam = "hyoso2";
// 公式正解表（2025/09/07）を問題データとは別に5問ずつ転記。
const officialA = ["○○××○", "○○○○○", "××○×○", "○×○○○", "○×××○"].join("").split("");
const officialB = ["ハロイニニ", "イハイロニ", "ロニニイロ", "イハニハイ", "イイハニロ"].join("").split("");
const multipleChoiceMap: Record<string, string> = { イ: "ア", ロ: "イ", ハ: "ウ", ニ: "エ" };

describe("表装技能士2級（表具作業）2025年度前期", () => {
  it("A群・B群各25問の公式正答と原本ページを保持する", () => {
    expect(questions).toHaveLength(50);
    expect(new Set(questions.map(q => q.id)).size).toBe(50);
    expect(questions.map(q => q.qNumber)).toEqual(Array.from({ length: 50 }, (_, i) => i + 1));
    expect(sources.officialAnswers).toEqual({ A: officialA, B: officialB });
    questions.forEach((q, i) => {
      const a = i < 25;
      const n = i % 25 + 1;
      const official = (a ? officialA : officialB)[n - 1];
      const page = a ? (n <= 16 ? 2 : 3) : n <= 4 ? 4 : n <= 10 ? 5 : n <= 16 ? 6 : n <= 22 ? 7 : 8;
      expect(q.id).toBe(`${exam}-2025-early-gakka-${a ? "a" : "b"}-${String(n).padStart(3, "0")}`);
      expect(q.officialAnswerNumber).toBe(official);
      expect(q.answer).toBe(a ? (official === "○" ? "ア" : "イ") : multipleChoiceMap[official]);
      expect(Object.keys(q.choices ?? {})).toHaveLength(a ? 2 : 4);
      expect(Object.keys(q.choiceExplanations ?? {})).toEqual(Object.keys(q.choices ?? {}));
      expect(q.explanationCoverage).toBe("full");
      expect(q.sourcePdfUrl).toBe(`${sources.sourcePdfUrl}#page=${page}`);
      expect(q.sourceAnswerUrl).toBe(sources.sourceAnswerUrl);
      expect(questionNumberLabel(q)).toBe(`${a ? "A" : "B"}群 ${n}`);
      expect(formatQuestionAnswerForDisplay(q, q.answer)).toBe(official);
      expect(questionSourceEdition(q)).toBe("2025年度前期");
    });
  });

  it("図6問の原図12点と選択肢画像の対応を保持する", () => {
    expect(questions.filter(q => q.hasImage).map(q => q.qNumber)).toEqual([7, 10, 27, 29, 31, 44]);
    expect(sources.audit).toHaveLength(50);
    expect(sources.figures).toHaveLength(12);
    const files = questions.flatMap(q => [...q.imageUrls ?? [], ...Object.values(q.choiceImageUrls ?? {})]);
    expect(new Set(files).size).toBe(12);
    sources.figures.forEach(figure => {
      const bytes = readFileSync(path.join(process.cwd(), "public", figure.file));
      expect(files).toContain(figure.file);
      expect(bytes.subarray(0, 4).toString()).toBe("RIFF");
      expect(bytes.subarray(8, 12).toString()).toBe("WEBP");
      expect(createHash("sha256").update(bytes).digest("hex")).toBe(figure.sha256);
    });
    expect(Object.keys(questions[26].choiceImageUrls ?? {})).toEqual(["ア", "イ", "ウ", "エ"]);
    expect(questions[26].choiceImageUrls?.["イ"]).toMatch(/b02-ro\.webp$/);
    expect(questions[26].answer).toBe("イ");
    expect(questions[30].choiceImageUrls?.["ア"]).toMatch(/b06-i\.webp$/);
    expect(questions[30].answer).toBe("ア");
    questions.filter(q => q.imageUrls?.length).forEach(q => expect(q.imageAltTexts).toHaveLength(q.imageUrls!.length));
  });

  it("資格一覧・出題ローダー・原本のイロハニ表示に接続する", async () => {
    expect(await getQuestionsForExam(exam)).toEqual(questions);
    expect(QUESTIONS_BY_EXAM[exam]).toEqual(questions);
    expect(questions.filter(isPracticeReadyQuestion)).toHaveLength(50);
    expect(getQualificationByExamCode(exam)?.status).toBe("live");
    expect(EXAM_CONFIGS[exam].sessions[0].expectedQuestions).toBe(50);
    expect(questions.every(q => EXAM_CONFIGS[exam].sessions[0].categories?.includes(q.category))).toBe(true);
    expect(usesNumberedChoices(exam)).toBe(true);
    expect(["ア", "イ", "ウ", "エ"].map(k => choiceDisplayLabel(exam, k as "ア"))).toEqual(["イ", "ロ", "ハ", "ニ"]);
    expect(choiceImageAlt(exam, "イ")).toBe("選択肢ロの図（公式問題PDFより）");
  });
});
