import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { KENCHIKU_DAIKU1_QUESTIONS as allQuestions } from "@/data/questions/kenchiku-daiku1";
import sources from "@/data/questions/kenchiku-daiku1/sources.json";
import { QUESTIONS_BY_EXAM } from "@/data/questions";
import { getQuestionsForExam } from "@/lib/questions/get-questions";
import { choiceDisplayLabel, formatQuestionAnswerForDisplay, questionNumberLabel } from "@/lib/questions/display";
import { isPracticeReadyQuestion } from "@/lib/questions/filter";
import { EXAM_CONFIGS } from "@/lib/exam-config";
import { getQualificationByExamCode } from "@/lib/qualifications/catalog";
import { questionSourceEdition } from "@/lib/questions/source-label";
import type { ChoiceKey } from "@/lib/questions/types";

// Independently transcribed from the 1級 official answer sheet (2026/02/08).
const trueFalse = ["○○×○×", "○○○○×", "×○××○", "○○××○", "×○○○○"].join("").split("");
const multiple = ["ニニロハロ", "ニニハロハ", "ハニロイイ", "イイイハイ", "ロイロハロ"].join("").split("");
const keys: ChoiceKey[] = ["ア", "イ", "ウ", "エ"];
const labels = ["イ", "ロ", "ハ", "ニ"];

const questions = allQuestions.filter(q => q.year === 2025 && q.season === "late");

describe("建築大工技能士1級 2025年度後期 原本50問", () => {
  it("A群・B群の原問番号と公式正答50件を内部採点キーに対応させる", () => {
    expect(questions).toHaveLength(50);
    expect(new Set(questions.map(q => q.id)).size).toBe(50);
    questions.forEach((q, i) => {
      const a = i < 25;
      const number = i % 25 + 1;
      const official = (a ? trueFalse : multiple)[number - 1];
      expect(q.id).toBe(`kenchiku-daiku1-2025-late-gakka-${a ? "a" : "b"}-${String(number).padStart(3, "0")}`);
      expect(q.qNumber).toBe(i + 1);
      expect(q.officialQuestionLabel).toBe(`${a ? "A" : "B"}群 ${number}`);
      expect(questionNumberLabel(q)).toBe(q.officialQuestionLabel);
      expect(q.officialAnswerNumber, q.id).toBe(official);
      expect(q.answer, q.id).toBe(a ? (official === "○" ? "ア" : "イ") : keys[labels.indexOf(official)]);
      expect(q.year).toBe(2025);
      expect(q.fiscalYear).toBe(2025);
      expect(q.season).toBe("late");
      expect(q.examDate).toBe("2026-02-08");
      expect(questionSourceEdition(q)).toBe("2025年度後期（2026年2月8日実施）");
      expect(Object.keys(q.choices ?? {})).toHaveLength(a ? 2 : 4);
      expect(Object.keys(q.choiceExplanations ?? {}).sort()).toEqual(Object.keys(q.choices ?? {}).sort());
      expect(isPracticeReadyQuestion(q), q.id).toBe(true);
      expect(q.sourcePdfUrl).toContain("kentei.javada.or.jp/pdf/R07%2D2%2DB42");
      expect(q.sourcePdfUrl).toMatch(/#page=(?:[2-9]|10)$/);
      expect(q.sourceAnswerUrl).toContain("%E6%AD%A3%E8%A7%A3%E8%A1%A8");
      if (!a) expect(formatQuestionAnswerForDisplay(q, q.answer)).toBe(official);
    });
    expect(keys.map(k => choiceDisplayLabel("kenchiku-daiku1", k))).toEqual(labels);
    expect(questions[0].choices).toEqual({ ア: "正しい（○）", イ: "誤り（×）" });
  });

  it("全図10点と数式1点を欠落なく保持し、画像ハッシュを照合する", () => {
    const expected = ["A群 7", "A群 10", "A群 23", "B群 1", "B群 3", "B群 5", "B群 7", "B群 10", "B群 14", "B群 18", "B群 23"];
    expect(questions.filter(q => q.hasImage).map(q => q.officialQuestionLabel)).toEqual(expected);
    expect(sources.figures).toHaveLength(11);
    for (const q of questions.filter(q => q.hasImage)) {
      expect(q.imageUrls).toHaveLength(1);
      expect(q.imageAltTexts?.[0].length).toBeGreaterThan(10);
      const record = sources.figures.find(f => f.originalQuestion === q.officialQuestionLabel)!;
      expect(record.url).toBe(q.imageUrls![0]);
      const buffer = readFileSync(join(process.cwd(), "public", record.url));
      expect(buffer.subarray(0, 4).toString("ascii")).toBe("RIFF");
      expect(buffer.subarray(8, 12).toString("ascii")).toBe("WEBP");
      expect(createHash("sha256").update(buffer).digest("hex")).toBe(record.sha256);
    }
  });

  it("原本の数式・全肢・法令数値・設問条件を保つ", () => {
    expect(questions[6].question).toContain("玄＝√（殳²＋勾²）");
    for (const number of [1, 5]) {
      expect(Object.values(questions[24 + number].choices ?? {})).toEqual(["図イ", "図ロ", "図ハ", "図ニ"]);
    }
    expect(questions[27].choices?.イ).toBe("図ロ　腕木ひさし");
    expect(questions[32].question).toContain("十分大きい場合");
    expect(questions[40].choices?.ア).toContain("200mm以上");
    expect(questions[48].choices?.ウ).toContain("厚さ1.3cm以上で幅10cm以上");
    expect(questions[48].explanation).toContain("厚さ1.5cm以上・幅9cm以上");
    expect(questions[49].choices?.イ).toBe("75");
    expect(questions[23].lawReferenceDate).toBe("2026-02-08");
  });

  it("試験一覧と同期・遅延ローダーで50問を配信対象として取得できる", async () => {
    expect(QUESTIONS_BY_EXAM["kenchiku-daiku1"]!.filter(q => q.year === 2025 && q.season === "late")).toEqual(questions);
    expect((await getQuestionsForExam("kenchiku-daiku1")).filter(q => q.year === 2025 && q.season === "late")).toEqual(questions);
    expect(getQualificationByExamCode("kenchiku-daiku1")?.status).toBe("live");
    const config = EXAM_CONFIGS["kenchiku-daiku1"];
    expect(config.sessions[0].expectedQuestions).toBe(50);
    expect(config.level).toBe("advanced");
    expect(config.seasons).toEqual(expect.arrayContaining(["late"]));
    expect(questions.every(q => config.sessions[0].categories.includes(q.category))).toBe(true);
  });
});
