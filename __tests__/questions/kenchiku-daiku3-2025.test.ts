import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { KENCHIKU_DAIKU3_QUESTIONS as questions } from "@/data/questions/kenchiku-daiku3";
import sources from "@/data/questions/kenchiku-daiku3/sources.json";
import { QUESTIONS_BY_EXAM } from "@/data/questions";
import { getQuestionsForExam } from "@/lib/questions/get-questions";
import { formatQuestionAnswerForDisplay, questionNumberLabel } from "@/lib/questions/display";
import { isPracticeReadyQuestion } from "@/lib/questions/filter";
import { EXAM_CONFIGS } from "@/lib/exam-config";
import { getQualificationByExamCode } from "@/lib/qualifications/catalog";
import { questionSourceEdition } from "@/lib/questions/source-label";

// Independently read from the official 2025/07/13 answer sheet, ten per row.
const official = ["○×××○×○○××", "○××○○×○○××", "×○×××○○○××"].join("").split("");

describe("建築大工技能士3級 2025年度前期 原本30問", () => {
  it("原本の30正答を採点キーと画面上の○・×に対応させる", () => {
    expect(questions).toHaveLength(30);
    expect(new Set(questions.map(q => q.id)).size).toBe(30);
    questions.forEach((q, i) => {
      expect(q.id).toBe(`kenchiku-daiku3-2025-early-gakka-${String(i + 1).padStart(3, "0")}`);
      expect(q.qNumber).toBe(i + 1);
      expect(questionNumberLabel(q)).toBe(String(i + 1));
      expect(q.officialAnswerNumber).toBe(official[i]);
      expect(q.answer).toBe(official[i] === "○" ? "ア" : "イ");
      expect(formatQuestionAnswerForDisplay(q, q.answer)).toBe(official[i]);
      expect(q.choices).toEqual({ ア: "正しい（○）", イ: "誤り（×）" });
      expect(Object.keys(q.choiceExplanations ?? {}).sort()).toEqual(["ア", "イ"]);
      expect(isPracticeReadyQuestion(q), q.id).toBe(true);
      expect(q.examDate).toBe("2025-07-13");
      expect(q.fiscalYear).toBe(2025);
      expect(questionSourceEdition(q)).toBe("2025年度前期（2025年7月13日実施）");
      expect(q.sourcePdfUrl).toContain("kentei.javada.or.jp/pdf/R07-1-D19-");
      expect(q.sourcePdfUrl).toMatch(/#page=[234]$/);
      expect(q.sourceAnswerUrl).toContain("%E6%AD%A3%E8%A7%A3%E8%A1%A8");
    });
  });

  it("問題の判断対象・数値・順序を原本どおり保持する", () => {
    expect(questions[3].question).toContain("15mm×90mm");
    expect(questions[8].question).toContain("表目で約17");
    expect(questions[9].question).toContain("中勾の返し勾配");
    expect(questions[12].question).toContain("仕込み勾配（切削角）");
    expect(questions[12].question).toContain("緩勾配");
    expect(questions[12].explanation).toContain("刃を研ぐ刃先角ではなく");
    expect(questions[18].question).toContain("①土台→②小屋組→③軸組");
    expect(questions[28].question).toContain("下に人がいなければ");
    expect(questions[29].question).toContain("30cm以上");
    expect(questions[29].explanation).toContain("60cm以上");
  });

  it("原図4点と出典記録を保持する", () => {
    expect(questions.filter(q => q.hasImage).map(q => q.qNumber)).toEqual([8, 14, 27, 28]);
    expect(sources.figures).toHaveLength(4);
    expect(sources.questions).toHaveLength(30);
    for (const q of questions.filter(q => q.hasImage)) {
      const record = sources.figures.find(f => f.originalQuestion === q.officialQuestionLabel)!;
      expect(q.imageUrls).toEqual([record.url]);
      expect(q.imageAltTexts?.[0].length).toBeGreaterThan(10);
      const bytes = readFileSync(join(process.cwd(), "public", record.url));
      expect(bytes.subarray(0, 4).toString("ascii")).toBe("RIFF");
      expect(bytes.subarray(8, 12).toString("ascii")).toBe("WEBP");
      expect(createHash("sha256").update(bytes).digest("hex")).toBe(record.sha256);
    }
  });

  it("一覧・同期と遅延ローダーで30問を取得できる", async () => {
    expect(QUESTIONS_BY_EXAM["kenchiku-daiku3"]).toEqual(questions);
    expect(await getQuestionsForExam("kenchiku-daiku3")).toEqual(questions);
    expect(getQualificationByExamCode("kenchiku-daiku3")?.status).toBe("live");
    const config = EXAM_CONFIGS["kenchiku-daiku3"];
    expect(config.sessions[0].expectedQuestions).toBe(30);
    expect(config.seasons).toEqual(["early"]);
    expect(questions.every(q => config.sessions[0].categories.includes(q.category))).toBe(true);
  });
});
