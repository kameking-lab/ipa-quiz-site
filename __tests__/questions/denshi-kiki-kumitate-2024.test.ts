import { readFileSync } from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";
import { QUESTIONS_BY_EXAM } from "@/data/questions";
import { DENSHI_KIKI_KUMITATE1_QUESTIONS } from "@/data/questions/denshi-kiki-kumitate1";
import { DENSHI_KIKI_KUMITATE3_QUESTIONS } from "@/data/questions/denshi-kiki-kumitate3";
import { getQuestionsForExam } from "@/lib/questions/get-questions";
import { choiceDisplayLabel, formatQuestionAnswerForDisplay } from "@/lib/questions/display";
import { isPracticeReadyQuestion } from "@/lib/questions/filter";
import { questionSourceEdition } from "@/lib/questions/source-label";
import { findQuestionByRoute, questionPagePath } from "@/lib/seo/question-url";
import { getQualificationByExamCode } from "@/lib/qualifications/catalog";
import type { ChoiceKey } from "@/lib/questions/types";

// Independently transcribed from each rendered official answer table, five per group.
const sittings = [{
  exam: "denshi-kiki-kumitate1", season: "early", all: DENSHI_KIKI_KUMITATE1_QUESTIONS,
  answers: "○×○○×" + "×××○○" + "××○○○" + "×○○○×" + "○○×××"
    + "ニハロロロ" + "ハイハハニ" + "ニロロニイ" + "ロロイニハ" + "イハイハイ",
  figures: 16,
}, {
  exam: "denshi-kiki-kumitate3", season: "early", all: DENSHI_KIKI_KUMITATE3_QUESTIONS,
  answers: "××○○○" + "×○○○○" + "○××○×" + "○××○○" + "××○×○" + "○××○○",
  figures: 10,
}] as const;

describe("電子機器組立て2024年度の公式原本と学習経路", () => {
  for (const { exam, season, all, answers, figures } of sittings) {
    const questions = all.filter(q => q.year === 2024 && q.season === season);
    it(`${exam}/${season}: 公式正答全件と表示・採点が一致する`, () => {
      expect(questions).toHaveLength(answers.length);
      expect(questions.map(q => q.qNumber)).toEqual(Array.from({ length: answers.length }, (_, i) => i + 1));
      expect(questions.map(q => q.officialAnswerNumber).join("")).toBe(answers);
      for (const q of questions) {
        const official = answers[q.qNumber - 1];
        const expected = official === "○" ? "ア" : official === "×" ? "イ" : "アイウエ"["イロハニ".indexOf(official)];
        expect(q.answer, q.id).toBe(expected);
        expect(formatQuestionAnswerForDisplay(q, q.answer as ChoiceKey), q.id).toBe(official);
        expect(Object.keys(q.choiceExplanations ?? {}), q.id).toEqual(Object.keys(q.choices!));
        expect(q.explanationCoverage).toBe("full");
        expect(isPracticeReadyQuestion(q), q.id).toBe(true);
        expect(questionSourceEdition(q), q.id).toBe(`2024年度${season === "early" ? "前期" : "後期"}`);
      }
    });
    it(`${exam}/${season}: カタログ・同期/遅延読込・個別URLが全問一致する`, async () => {
      expect(QUESTIONS_BY_EXAM[exam]).toEqual(all);
      expect(await getQuestionsForExam(exam)).toEqual(all);
      expect(getQualificationByExamCode(exam)?.status).toBe("live");
      expect(new Set(questions.map(q => q.id)).size).toBe(answers.length);
      expect(new Set(questions.map(questionPagePath)).size).toBe(answers.length);
      for (const q of questions) {
        const [, , routeExam, yearSeason, section, qnum] = questionPagePath(q).split("/");
        expect(findQuestionByRoute(all, { exam: routeExam, yearSeason, section, qnum })?.id, q.id).toBe(q.id);
      }
    });
    it(`${exam}/${season}: 原本照合記録と読めるWebP原図を保持する`, () => {
      const source = JSON.parse(readFileSync(path.join(process.cwd(), `data/questions/${exam}/2024-${season}.sources.json`), "utf8"));
      expect(source.questions).toHaveLength(answers.length);
      expect(source.officialAnswers.join("")).toBe(answers);
      expect(questions.filter(q => q.hasImage)).toHaveLength(figures);
      expect(source.figures).toHaveLength(figures);
      for (const q of questions.filter(q => q.hasImage)) {
        expect(q.imageUrls, q.id).toHaveLength(1);
        expect(q.imageAltTexts?.[0], q.id).toBeTruthy();
        const bytes = readFileSync(path.join(process.cwd(), "public", q.imageUrls![0]));
        expect(bytes.subarray(0, 4).toString(), q.id).toBe("RIFF");
        expect(bytes.subarray(8, 12).toString(), q.id).toBe("WEBP");
      }
    });
  }
  it("1級の目盛・並列回路・リレーとLED材料の注記を保持する", () => {
    const byNumber = (n: number) => DENSHI_KIKI_KUMITATE1_QUESTIONS.find(q => q.year === 2024 && q.qNumber === n)!;
    expect(byNumber(20).explanation).toContain("6.74 mm");
    expect(byNumber(36).explanation).toContain("1.41 A");
    expect(byNumber(49).explanation).toContain("並列");
    expect(byNumber(49).officialAnswerNumber).toBe("ハ");
    expect(byNumber(47).officialAnswerNumber).toBe("ハ");
    expect(byNumber(47).explanation).toContain("AlGaInPにも赤色");
    expect(["ア", "イ", "ウ", "エ"].map(k => choiceDisplayLabel("denshi-kiki-kumitate1", k as ChoiceKey))).toEqual(["イ", "ロ", "ハ", "ニ"]);
  });
  it("3級前期のLED電流・電力量・平均値とPNP記号を区別する", () => {
    const byNumber = (n: number) => DENSHI_KIKI_KUMITATE3_QUESTIONS.find(q => q.year === 2024 && q.season === "early" && q.qNumber === n)!;
    expect(byNumber(13).explanation).toContain("20 mA");
    expect(byNumber(15).explanation).toContain("40 Wh");
    expect(byNumber(24).explanation).toContain("3.0");
    expect(byNumber(28).explanation).toContain("PNP");
    expect(choiceDisplayLabel("denshi-kiki-kumitate3", "ア")).toBe("○");
    expect(choiceDisplayLabel("denshi-kiki-kumitate3", "イ")).toBe("×");
  });
});
