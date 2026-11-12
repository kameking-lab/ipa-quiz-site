import { describe, expect, it } from "vitest";
import { readFileSync, existsSync } from "node:fs";
import path from "node:path";
import { DENSHI_KIKI_KUMITATE2_QUESTIONS as questions } from "@/data/questions/denshi-kiki-kumitate2";
import sources from "@/data/questions/denshi-kiki-kumitate2/sources.json";
import { getQuestionsForExam } from "@/lib/questions/get-questions";
import { EXAM_CONFIGS } from "@/lib/exam-config";
import { formatQuestionAnswerForDisplay, choiceDisplayLabel, questionNumberLabel } from "@/lib/questions/display";
import { questionSourceEdition } from "@/lib/questions/source-label";
import { getQualificationByExamCode } from "@/lib/qualifications/catalog";

const exam = "denshi-kiki-kumitate2";
// 中央職業能力開発協会の公式正解表（2025/08/31）の行を独立して転記。
const officialA = ["○○○×○", "××○×○", "××○○○", "×○×○○", "○×○×○"].join("").split("");
const officialB = ["ニハハハハ", "ハハイハロ", "イロハイニ", "ロハロハロ", "ロイロハハ"].join("").split("");
const multipleChoiceMap: Record<string, string> = { イ: "ア", ロ: "イ", ハ: "ウ", ニ: "エ" };

describe("電子機器組立て2級 2025年度前期", () => {
  it("A群・B群各25問を公式正答どおりに対応させる", () => {
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
      expect(q.explanationCoverage).toBe("full");
      expect(q.sourcePdfUrl).toMatch(/kentei\.javada\.or\.jp\/pdf\/.+#page=[2-8]$/);
      expect(questionNumberLabel(q)).toBe(`${a ? "A" : "B"}群 ${n}`);
      expect(formatQuestionAnswerForDisplay(q, q.answer)).toBe(official);
      expect(questionSourceEdition(q)).toBe("2025年度前期");
    });
  });

  it("図9点を参照でき、解説・本文と原図の監査記録を保持する", () => {
    const imageQuestions = questions.filter(q => q.hasImage);
    expect(imageQuestions.map(q => q.qNumber)).toEqual([9, 24, 31, 32, 34, 35, 36, 38, 44]);
    expect(sources.audit).toHaveLength(50);
    imageQuestions.forEach(q => {
      expect(q.imageAltTexts).toHaveLength(1);
      const file = path.join(process.cwd(), "public", q.imageUrls![0]);
      expect(existsSync(file)).toBe(true);
      const bytes = readFileSync(file);
      expect(bytes.subarray(0, 4).toString()).toBe("RIFF");
      expect(bytes.subarray(8, 12).toString()).toBe("WEBP");
    });
  });

  it("資格カタログ・遅延ローダー・50問の出題設定を接続する", async () => {
    expect(await getQuestionsForExam(exam)).toEqual(questions);
    expect(getQualificationByExamCode(exam)?.status).toBe("live");
    expect(EXAM_CONFIGS[exam].sessions[0].expectedQuestions).toBe(50);
    expect(["ア", "イ", "ウ", "エ"].map(k => choiceDisplayLabel(exam, k as "ア"))).toEqual(["イ", "ロ", "ハ", "ニ"]);
  });
});
