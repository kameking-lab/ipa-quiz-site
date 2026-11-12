import { readFileSync } from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";
import { QUESTIONS_BY_EXAM } from "@/data/questions";
import { DENSHI_KIKI_KUMITATE1_QUESTIONS } from "@/data/questions/denshi-kiki-kumitate1";
import { DENSHI_KIKI_KUMITATE3_QUESTIONS } from "@/data/questions/denshi-kiki-kumitate3";
import { getQuestionsForExam } from "@/lib/questions/get-questions";
import { formatQuestionAnswerForDisplay, usesNumberedChoices } from "@/lib/questions/display";
import { isPracticeReadyQuestion } from "@/lib/questions/filter";
import { findQuestionByRoute, questionPagePath } from "@/lib/seo/question-url";
import { questionSourceEdition } from "@/lib/questions/source-label";
import { getQualificationByExamCode } from "@/lib/qualifications/catalog";
import type { ChoiceKey, Question } from "@/lib/questions/types";

// Read independently from the rendered official answer table, five per row.
const SITTINGS = [{
  exam: "denshi-kiki-kumitate1", year: 2025, season: "early", all: DENSHI_KIKI_KUMITATE1_QUESTIONS,
  answers: "○××××" + "××××○" + "○○○○○" + "○○××○" + "○○××○"
    + "ニニニハイ" + "ロハハロニ" + "イハハロロ" + "ロイロハハ" + "ニイハハハ",
}, {
  exam: "denshi-kiki-kumitate3", year: 2025, season: "early", all: DENSHI_KIKI_KUMITATE3_QUESTIONS,
  answers: "○×○○○○×○×○" + "○○○×○×○○○○" + "○○×○○×××○×",
}, {
  exam: "denshi-kiki-kumitate3", year: 2025, season: "late", all: DENSHI_KIKI_KUMITATE3_QUESTIONS,
  answers: "○○○○××○○××" + "○××○××××○○" + "○○○○××××××",
}, {
  exam: "denshi-kiki-kumitate1", year: 2023, season: "early", all: DENSHI_KIKI_KUMITATE1_QUESTIONS,
  answers: "××○○○" + "○○○×○" + "○○○○○" + "××××○" + "○○××○"
    + "イハイロハ" + "ロハハニイ" + "ハハニニニ" + "ニロニイロ" + "ニイニイニ",
}] as const;

describe("電子機器組立ての公式原本と学習経路", () => {
  for (const { exam, year, season, all, answers } of SITTINGS) {
    const questions: Question[] = all.filter(q => q.year === year && q.season === season);
    it(`${exam}/${year}/${season}: 公式正答を原本表記で表示して採点する`, () => {
      expect(questions).toHaveLength(answers.length);
      expect(questions.map(q => q.qNumber)).toEqual(Array.from({ length: answers.length }, (_, i) => i + 1));
      expect(questions.map(q => q.officialAnswerNumber).join("")).toBe(answers);
      for (const q of questions) {
        const official = answers[q.qNumber - 1];
        const answer = official === "○" ? "ア" : official === "×" ? "イ" : "アイウエ"["イロハニ".indexOf(official)];
        expect(q.answer, q.id).toBe(answer);
        expect(formatQuestionAnswerForDisplay(q, q.answer as ChoiceKey), q.id).toBe(official);
        expect(Object.keys(q.choiceExplanations ?? {}), q.id).toEqual(Object.keys(q.choices!));
        expect(isPracticeReadyQuestion(q), q.id).toBe(true);
        expect(questionSourceEdition(q), q.id).toBe(`${year}年度${season === "early" ? "前期" : "後期"}`);
      }
      expect(usesNumberedChoices(exam)).toBe(true);
    });
    it(`${exam}/${year}/${season}: 同期・遅延読込と全問の個別URLが一致する`, async () => {
      expect(QUESTIONS_BY_EXAM[exam]).toEqual(all);
      expect(await getQuestionsForExam(exam)).toEqual(all);
      expect(getQualificationByExamCode(exam)?.status).toBe("live");
      expect(new Set(all.map(q => q.id)).size).toBe(all.length);
      expect(new Set(all.map(questionPagePath)).size).toBe(all.length);
      for (const q of questions) {
        const [, , routeExam, yearSeason, section, qnum] = questionPagePath(q).split("/");
        expect(findQuestionByRoute(all, { exam: routeExam, yearSeason, section, qnum })?.id, q.id).toBe(q.id);
      }
    });
    it(`${exam}/${year}/${season}: 図問題に読み込める原図と代替文がある`, () => {
      const source = JSON.parse(readFileSync(path.join(process.cwd(), `data/questions/${exam}/${year}-${season}.sources.json`), "utf8"));
      expect(source.questions).toHaveLength(answers.length);
      for (const q of questions.filter(q => q.hasImage)) {
        expect(q.imageUrls, q.id).toHaveLength(1);
        expect(q.imageAltTexts?.[0], q.id).toBeTruthy();
        const bytes = readFileSync(path.join(process.cwd(), "public", q.imageUrls![0]));
        expect(bytes.subarray(8, 12).toString(), q.id).toBe("WEBP");
      }
    });
  }
  it("単相3線の電力、内部抵抗、器差の符号を原本どおり扱う", () => {
    const byNumber = (n: number) => DENSHI_KIKI_KUMITATE1_QUESTIONS.find(q => q.qNumber === n)!;
    expect(byNumber(10).explanation).toContain("10 A");
    expect(byNumber(19).officialAnswerNumber).toBe("×");
    expect(byNumber(19).explanation).toContain("0.6 Ω");
    expect(byNumber(44).explanation).toContain("159.98 mm");
  });
  it("3級前期の抵抗カラーコードを3.9 MΩと読み、公式正答×を保持する", () => {
    const q = DENSHI_KIKI_KUMITATE3_QUESTIONS.find(q => q.season === "early" && q.qNumber === 16)!;
    expect(q.question).toContain("39 MΩ");
    expect(q.officialAnswerNumber).toBe("×");
    expect(q.explanation).toContain("3.9 MΩ");
  });
  it("3級後期の実効値、並列抵抗、電力量を区別して学べる", () => {
    const byNumber = (n: number) => DENSHI_KIKI_KUMITATE3_QUESTIONS.find(q => q.season === "late" && q.qNumber === n)!;
    expect(byNumber(9).explanation).toContain("141 V");
    expect(byNumber(14).officialAnswerNumber).toBe("○");
    expect(byNumber(14).explanation).toContain("40 Wh");
    expect(byNumber(15).officialAnswerNumber).toBe("×");
    expect(byNumber(15).explanation).toContain("12 Ω");
  });
});
