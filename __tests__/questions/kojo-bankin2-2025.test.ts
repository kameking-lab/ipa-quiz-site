import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import path from "node:path";
import { KOJO_BANKIN2_QUESTIONS as allQuestions } from "@/data/questions/kojo-bankin2";
import sources from "@/data/questions/kojo-bankin2/sources.json";
import { getQuestionsForExam } from "@/lib/questions/get-questions";
import { EXAM_CONFIGS } from "@/lib/exam-config";
import { choiceDisplayLabel, formatQuestionAnswerForDisplay, questionNumberLabel, usesNumberedChoices } from "@/lib/questions/display";
import { questionSourceEdition } from "@/lib/questions/source-label";
import { getQualificationByExamCode } from "@/lib/qualifications/catalog";

const questions = allQuestions.filter(q => q.year === 2025);

const exam = "kojo-bankin2";
// 公式正解表（2025/09/07）の行を、問題データとは別に転記。
const officialA = ["×○○×○", "×○○○×", "○××××", "○×○××", "○○○○×"].join("").split("");
const officialB = ["ニロニニイ", "ハイハハハ", "ロイハロニ", "ハイニロイ", "ハロニハロ"].join("").split("");
const multipleChoiceMap: Record<string, string> = { イ: "ア", ロ: "イ", ハ: "ウ", ニ: "エ" };

describe("工場板金技能士2級（曲げ板金作業）2025年度前期", () => {
  it("A群・B群各25問を原本番号と公式正答に対応させる", () => {
    expect(questions).toHaveLength(50);
    expect(new Set(questions.map(q => q.id)).size).toBe(50);
    expect(questions.map(q => q.qNumber)).toEqual(Array.from({ length: 50 }, (_, i) => i + 1));
    expect(sources.officialAnswers).toEqual({ A: officialA, B: officialB });
    questions.forEach((q, i) => {
      const a = i < 25;
      const n = i % 25 + 1;
      const official = (a ? officialA : officialB)[n - 1];
      expect(q.id).toBe(`${exam}-2025-early-gakka-${a ? "a" : "b"}-${String(n).padStart(3, "0")}`);
      expect(q.officialAnswerNumber).toBe(official);
      expect(q.answer).toBe(a ? (official === "○" ? "ア" : "イ") : multipleChoiceMap[official]);
      expect(Object.keys(q.choices ?? {})).toHaveLength(a ? 2 : 4);
      expect(Object.keys(q.choiceExplanations ?? {})).toEqual(Object.keys(q.choices ?? {}));
      expect(q.sourcePdfUrl).toMatch(/kentei\.javada\.or\.jp\/pdf\/.+#page=[2-9]$/);
      expect(questionNumberLabel(q)).toBe(`${a ? "A" : "B"}群 ${n}`);
      expect(formatQuestionAnswerForDisplay(q, q.answer)).toBe(official);
      expect(questionSourceEdition(q)).toBe("2025年度前期");
    });
  });

  it("図5問・画像9点と、すみ肉溶接の四つの選択肢画像を参照できる", () => {
    expect(questions.filter(q => q.hasImage).map(q => q.qNumber)).toEqual([12, 17, 21, 38, 45]);
    expect(sources.audit).toHaveLength(50);
    expect(sources.figures).toHaveLength(9);
    const files = questions.flatMap(q => [...q.imageUrls ?? [], ...Object.values(q.choiceImageUrls ?? {})]);
    expect(new Set(files).size).toBe(9);
    files.forEach(file => {
      const bytes = readFileSync(path.join(process.cwd(), "public", file!));
      expect(bytes.subarray(0, 4).toString()).toBe("RIFF");
      expect(bytes.subarray(8, 12).toString()).toBe("WEBP");
    });
    const welding = questions[37];
    expect(Object.keys(welding.choiceImageUrls ?? {})).toEqual(["ア", "イ", "ウ", "エ"]);
    expect(welding.answer).toBe("ウ");
  });

  it("資格一覧・出題ローダー・原本のイロハニ表示に接続する", async () => {
    expect(await getQuestionsForExam(exam)).toEqual(allQuestions);
    expect(getQualificationByExamCode(exam)?.status).toBe("live");
    expect(EXAM_CONFIGS[exam].sessions[0].expectedQuestions).toBe(50);
    expect(questions.every(q => EXAM_CONFIGS[exam].sessions[0].categories?.includes(q.category))).toBe(true);
    expect(usesNumberedChoices(exam)).toBe(true);
    expect(["ア", "イ", "ウ", "エ"].map(k => choiceDisplayLabel(exam, k as "ア"))).toEqual(["イ", "ロ", "ハ", "ニ"]);
  });
});
