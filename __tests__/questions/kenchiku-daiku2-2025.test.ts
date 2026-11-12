import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { KENCHIKU_DAIKU2_QUESTIONS as questions } from "@/data/questions/kenchiku-daiku2";
import sources from "@/data/questions/kenchiku-daiku2/sources.json";
import { QUESTIONS_BY_EXAM } from "@/data/questions";
import { getQuestionsForExam } from "@/lib/questions/get-questions";
import { choiceDisplayLabel, formatQuestionAnswerForDisplay, questionNumberLabel } from "@/lib/questions/display";
import { isPracticeReadyQuestion } from "@/lib/questions/filter";
import { EXAM_CONFIGS } from "@/lib/exam-config";
import { getQualificationByExamCode } from "@/lib/qualifications/catalog";
import { questionSourceEdition } from "@/lib/questions/source-label";
import type { ChoiceKey } from "@/lib/questions/types";

// Official answer sheet: 令和07年度（後期）建築大工／大工工事作業【2級】2026/02/08.
// Independently recorded from the answer sheet, not inferred from explanations.
const trueFalse = ["×○○○○", "××○×○", "×○×○○", "○○×○×", "○○×○○"].join("").split("");
const multiple = ["ロロニロイ", "ニニニイハ", "ハハニニイ", "ロロイニニ", "イイイハロ"].join("").split("");
const keys: ChoiceKey[] = ["ア", "イ", "ウ", "エ"];
const labels = ["イ", "ロ", "ハ", "ニ"];

describe("建築大工技能士2級 2025年度後期 原本50問", () => {
  it("原本の群・番号・公式正答と内部の採点キーが全50問対応する", () => {
    expect(questions).toHaveLength(50);
    expect(new Set(questions.map(q => q.id)).size).toBe(50);
    questions.forEach((q, i) => {
      const a = i < 25;
      const number = i % 25 + 1;
      const official = (a ? trueFalse : multiple)[number - 1];
      expect(q.id).toBe(`kenchiku-daiku2-2025-late-gakka-${a ? "a" : "b"}-${String(number).padStart(3, "0")}`);
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
      expect(q.sourcePdfUrl).toMatch(/#page=[2-9]$/);
      expect(q.sourceAnswerUrl).toContain("%E6%AD%A3%E8%A7%A3%E8%A1%A8");
      if (!a) expect(formatQuestionAnswerForDisplay(q, q.answer)).toBe(official);
    });
    expect(keys.map(k => choiceDisplayLabel("kenchiku-daiku2", k))).toEqual(labels);
    expect(questions[0].choices).toEqual({ ア: "正しい（○）", イ: "誤り（×）" });
  });

  it("原図13点の群・問番号と内容ハッシュが照合台帳に一致する", () => {
    const expected = ["A群 3", "A群 5", "A群 6", "A群 7", "A群 8", "A群 17", "A群 23", "B群 2", "B群 6", "B群 7", "B群 13", "B群 17", "B群 22"];
    const illustrated = questions.filter(q => q.hasImage);
    expect(illustrated.map(q => q.officialQuestionLabel)).toEqual(expected);
    expect(sources.figures).toHaveLength(13);
    for (const q of illustrated) {
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

  it("図を選ぶ問題もイロハニの全4肢を持ち、法令と原本条件を保つ", () => {
    for (const number of [2, 13, 17, 22]) {
      expect(Object.values(questions[24 + number].choices ?? {})).toEqual(["図イ", "図ロ", "図ハ", "図ニ"]);
    }
    expect(questions[38].question).toContain("べた基礎");
    expect(questions[49].question).toContain("一側足場及びわく組足場の場合を除き");
    expect(questions[45].choices?.ア).toBe("F☆☆☆☆");
    expect(questions[48].choices?.ウ).toBe("建築面積÷敷地面積");
    expect(questions[23].lawReferenceDate).toBe("2026-02-08");
  });

  it("公開カタログと同期・遅延ローダーから50問を取得できる", async () => {
    expect(QUESTIONS_BY_EXAM["kenchiku-daiku2"]).toEqual(questions);
    expect(await getQuestionsForExam("kenchiku-daiku2")).toEqual(questions);
    expect(getQualificationByExamCode("kenchiku-daiku2")?.status).toBe("live");
    const config = EXAM_CONFIGS["kenchiku-daiku2"];
    expect(config.sessions[0].expectedQuestions).toBe(50);
    expect(config.seasons).toEqual(["late"]);
    expect(questions.every(q => config.sessions[0].categories.includes(q.category))).toBe(true);
  });
});
