import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";
import evidence from "@/__tests__/fixtures/kikai-hozen-2023-source.json";
import { QUESTIONS_BY_EXAM } from "@/data/questions";
import { KIKAI_HOZEN_QUESTIONS } from "@/data/questions/kikai-hozen";
import { EXAM_CONFIGS } from "@/lib/exam-config";
import { isPracticeReadyQuestion } from "@/lib/questions/filter";
import { formatQuestionAnswerForDisplay } from "@/lib/questions/display";
import { findQuestionByRoute, questionPagePath } from "@/lib/seo/question-url";

const paper = KIKAI_HOZEN_QUESTIONS.filter((q) => q.year === 2023);
// Read separately from the rendered JIPM answer sheet, in rows of ten.
const answers = [
  "×〇〇〇〇×〇××〇", "×〇××〇×××〇×", "〇×〇〇×エイウエウ",
  "エエアエイイウアエア", "アイウイアエエウアイ",
].join("").split("");
const sha = (value: string | Buffer) => createHash("sha256").update(value).digest("hex");

describe("機械保全技能検定 2023年度 第2回 2級 機械系保全作業 学科", () => {
  it("50問を年度選択・出題・問題別URLへ接続する", () => {
    expect(paper.map((q) => q.qNumber)).toEqual(Array.from({ length: 50 }, (_, i) => i + 1));
    expect(new Set(KIKAI_HOZEN_QUESTIONS.map((q) => q.id)).size).toBe(150);
    expect(EXAM_CONFIGS["kikai-hozen"].yearRange).toEqual({ start: 2023, end: 2025 });
    expect(QUESTIONS_BY_EXAM["kikai-hozen"]?.filter((q) => q.year === 2023)).toEqual(paper);
    for (const q of paper) {
      expect(q.id).toBe(`kikai-hozen-2023-kikai2-gakka-q${q.qNumber}`);
      expect(isPracticeReadyQuestion(q), q.id).toBe(true);
      const [, , exam, yearSeason, section, qnum] = questionPagePath(q).split("/");
      expect(findQuestionByRoute(paper, { exam, yearSeason, section, qnum })?.id).toBe(q.id);
    }
  });

  it("公式正答50件と真偽25問・四肢択一25問を保持する", () => {
    expect(paper.map((q) => q.officialAnswerNumber)).toEqual(answers);
    expect(evidence.questions.map((q) => q.officialAnswer)).toEqual(answers);
    for (const q of paper) {
      const symbol = answers[q.qNumber - 1];
      expect(formatQuestionAnswerForDisplay(q, q.answer), q.id).toBe(symbol.replace("〇", "○"));
      if (q.qNumber <= 25) {
        expect(q.choices).toEqual({ ア: "正しい（〇）", イ: "誤り（×）" });
        expect(q.answer).toBe(symbol === "〇" ? "ア" : "イ");
      } else {
        expect(Object.keys(q.choices ?? {})).toEqual(["ア", "イ", "ウ", "エ"]);
        expect(q.answer).toBe(symbol);
      }
    }
  });

  it("目視照合済みの本文・全選択肢と原本ページを照合する", () => {
    expect(evidence.independentExtractionDifferences).toEqual([]);
    expect(evidence.questions).toHaveLength(50);
    for (const q of paper) {
      const receipt = evidence.questions[q.qNumber - 1];
      expect(receipt.number).toBe(q.qNumber);
      expect(receipt.page).toBeGreaterThanOrEqual(1);
      expect(receipt.page).toBeLessThanOrEqual(9);
      expect(sha(JSON.stringify({ question: q.question, choices: q.choices }).normalize("NFC")), q.id)
        .toBe(receipt.textSha256);
      expect(q.sourcePdfUrl).toBe(evidence.paperUrl);
      expect(q.sourceAnswerUrl).toBe(evidence.answerUrl);
      expect(q.examDate).toBe("2023-12-17");
      expect(q.sourceAttribution).toContain(`No.${q.qNumber}。`);
      expect(q.explanationCoverage).toBe("full");
      expect(Object.keys(q.choiceExplanations ?? {})).toEqual(Object.keys(q.choices ?? {}));
      for (const reason of Object.values(q.choiceExplanations ?? {})) expect(reason.length).toBeGreaterThan(25);
    }
    expect(paper[3].question).toContain("min⁻¹");
    expect(paper[16].question).toContain("X̄-R");
    expect(paper[27].question).toContain("①");
    expect(paper[41].question).toContain("②");
  });

  it("原図表5点のファイル・代替文・ハッシュを保持する", () => {
    expect(paper.filter((q) => q.hasImage).map((q) => q.qNumber)).toEqual([17, 47, 48, 49, 50]);
    for (const receipt of evidence.questions) {
      if (!receipt.figure) continue;
      const q = paper[receipt.number - 1];
      expect(q.imageUrls).toEqual([receipt.figure.path]);
      expect(q.imageAltTexts).toEqual([receipt.figure.alt]);
      expect(sha(readFileSync(path.join(process.cwd(), "public", receipt.figure.path)))).toBe(receipt.figure.sha256);
    }
  });

  it("範囲・歯車・はり・穴数の計算を独立に検算する", () => {
    expect(Math.max(10, 9, 11, 8, 12) - Math.min(10, 9, 11, 8, 12)).toBe(4);
    expect(paper[16].officialAnswerNumber).toBe("×");
    expect(Math.PI * 6).toBeCloseTo(18.85, 2);
    expect(paper[26].choices?.[paper[26].answer as "イ"]).toBe("18.8mm");
    const rb = 300 * 30 / (30 + 70);
    expect([300 - rb, rb]).toEqual([210, 90]);
    expect(paper[46].answer).toBe("エ");
    expect(50 + (16 - 1) * 80 + 50).toBe(1300);
    expect(paper[48].choices?.[paper[48].answer as "ア"]).toBe("1,300");
  });
});
