import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import { KAITEN_DENKI1_QUESTIONS } from "@/data/questions/kaiten-denki1";
import { KAITEN_DENKI2_QUESTIONS } from "@/data/questions/kaiten-denki2";
import { HAIDEN_SEIGYO3_QUESTIONS } from "@/data/questions/haiden-seigyo3";
import { ALL_QUESTIONS } from "@/data/questions";
import { getQuestionsForExam } from "@/lib/questions/get-questions";
import { EXAM_CONFIGS } from "@/lib/exam-config";
import { choiceDisplayLabel, formatQuestionAnswerForDisplay, questionNumberLabel, usesNumberedChoices } from "@/lib/questions/display";
import { questionSourceEdition } from "@/lib/questions/source-label";
import { getQualificationByExamCode } from "@/lib/qualifications/catalog";
import { buildQuestionJsonLd } from "@/lib/seo/question-jsonld";
import { questionPagePath, findQuestionByRoute } from "@/lib/seo/question-url";
import { isPracticeReadyQuestion, shuffleChoices } from "@/lib/questions/filter";
import { examCatalog } from "@/mobile/shared/catalog-source";
import type { Question } from "@/lib/questions/types";

// 問題データとは別に、公式正答表の各行を原本画像から転記。
const editions: { code: Question["exam"]; season: "early" | "late"; answers: string; figures: number[]; all: Question[]; work: string }[] = [
  { code: "kaiten-denki1", season: "early", all: KAITEN_DENKI1_QUESTIONS, work: "回転電機巻線製作作業",
    answers: "×××○×" + "○××××" + "○××○×" + "○○×○×" + "○○×××" + "ニハハニロ" + "ロニイニニ" + "ニハハハイ" + "イニイロニ" + "ハニハニニ", figures: [26,28,31] },
  { code: "kaiten-denki2", season: "early", all: KAITEN_DENKI2_QUESTIONS, work: "回転電機巻線製作作業",
    answers: "×○×××" + "××××○" + "○○×○○" + "○○×××" + "○○×○×" + "イイロハイ" + "ハハハイロ" + "ロイイイニ" + "イニロロイ" + "ニニハニハ", figures: [3,27,30,32,34] },
  { code: "haiden-seigyo3", season: "late", all: HAIDEN_SEIGYO3_QUESTIONS, work: "配電盤・制御盤組立て作業",
    answers: "××○×○×○○○○" + "○○○○××××○×" + "×○×○○○×○○○", figures: [5,7,8,17,30] },
];

describe.each(editions)("$code 2023年度 $season", ({ code, season, answers, figures, all, work }) => {
  const rows = all.filter(q => q.year === 2023);
  it("公式問番号と全正答を保持し、表示・採点・URLが一意に対応する", () => {
    expect(rows).toHaveLength(answers.length);
    expect(new Set(rows.map(q => q.id)).size).toBe(rows.length);
    expect(new Set(rows.map(questionPagePath)).size).toBe(rows.length);
    rows.forEach((q, i) => {
      const grade3 = rows.length === 30;
      const local = grade3 ? i + 1 : i % 25 + 1;
      expect(q.id).toBe(`${code}-2023-${season}-gakka-${grade3 ? "" : i < 25 ? "a-" : "b-"}${String(local).padStart(3,"0")}`);
      expect(q.qNumber).toBe(i+1);
      expect(q.officialAnswerNumber).toBe(answers[i]);
      expect(q.answer).toBe(answers[i] === "○" ? "ア" : answers[i] === "×" ? "イ" : "アイウエ"["イロハニ".indexOf(answers[i])]);
      expect(formatQuestionAnswerForDisplay(q, q.answer)).toBe(answers[i]);
      expect(questionNumberLabel(q)).toBe(grade3 ? String(local) : `${i < 25 ? "A" : "B"}群 ${local}`);
      expect(questionSourceEdition(q)).toBe(`2023年度${season === "late" ? "後期" : "前期"}`);
      expect(Object.keys(q.choiceExplanations ?? {})).toEqual(Object.keys(q.choices ?? {}));
      for (const [key, value] of Object.entries(q.choiceExplanations ?? {})) {
        expect(value).toMatch(key === q.answer ? /^正解。/ : /^不正解。/);
        expect(value.length).toBeGreaterThan(15);
      }
      expect(q.explanationCoverage).toBe("full");
      expect(q.explanation.length).toBeGreaterThanOrEqual(50);
      expect(q.sourcePdfUrl).toMatch(/^https:\/\/www\.kentei\.javada\.or\.jp\/pdf\/.+#page=[2-8]$/);
      expect(q.sourceAnswerUrl).toContain("www.kentei.javada.or.jp/pdf/");
      expect(EXAM_CONFIGS[code].sessions[0].categories).toContain(q.category);
      expect(ALL_QUESTIONS.filter(x => x.id === q.id)).toHaveLength(1);
      expect(isPracticeReadyQuestion(q)).toBe(true);
      expect(shuffleChoices(q)).toBe(q);
      const [, , exam, yearSeason, section, qnum] = questionPagePath(q).split("/");
      expect(findQuestionByRoute(all, {exam, yearSeason, section, qnum})?.id).toBe(q.id);
    });
  });
  it("原図・代替テキストと公式PDFのハッシュ・正答照合記録を持つ", () => {
    expect(rows.filter(q => q.hasImage).map(q => q.qNumber)).toEqual(figures);
    const evidence = JSON.parse(readFileSync(`data/questions/${code}/2023-${season}.sources.json`, "utf8"));
    expect(evidence.review.map((r: {officialAnswer: string}) => r.officialAnswer).join("")).toBe(answers);
    expect(evidence.sources.every((s: {httpStatus: number; sha256: string}) => s.httpStatus === 200 && /^[a-f0-9]{64}$/.test(s.sha256))).toBe(true);
    rows.forEach((q,i) => expect(evidence.review[i].pdfPage).toBe(Number(q.sourcePdfUrl!.split("#page=")[1])));
    for (const q of rows.filter(q => q.hasImage)) {
      expect(q.imageUrls).toHaveLength(1);
      expect(q.imageAltTexts?.[0].length).toBeGreaterThan(10);
      const bytes = readFileSync(`public${q.imageUrls![0]}`);
      expect(bytes.subarray(1, 4).toString()).toBe("PNG");
      expect(bytes.readUInt32BE(16)).toBeGreaterThan(100);
      expect(bytes.readUInt32BE(20)).toBeGreaterThan(50);
    }
  });
  it("配信・資格一覧・モバイル一覧・構造化データへ接続する", async () => {
    expect(await getQuestionsForExam(code)).toEqual(all);
    expect(getQualificationByExamCode(code)?.status).toBe("live");
    expect(getQualificationByExamCode(code)?.fullName).toContain(work);
    expect(EXAM_CONFIGS[code].sessions[0].expectedQuestions).toBe(rows.length);
    expect(EXAM_CONFIGS[code].yearRange.start).toBeLessThanOrEqual(2023);
    expect(usesNumberedChoices(code)).toBe(true);
    if (rows.length === 50) expect(["ア", "イ", "ウ", "エ"].map(k => choiceDisplayLabel(code, k as "ア"))).toEqual(["イ", "ロ", "ハ", "ニ"]);
    const generated = JSON.parse(readFileSync("mobile/src/generated/catalog.json", "utf8"));
    expect(generated.exams.find((e: {code: string}) => e.code === code)).toEqual(await examCatalog(code));
    const jsonLd = buildQuestionJsonLd({question: rows[0], pageUrlAbs: `https://www.kakomon-ai.jp${questionPagePath(rows[0])}`, title: "電気機器組立て"});
    expect(JSON.stringify(jsonLd)).toContain("中央職業能力開発協会");
  });
});

it("原図の回路値と接点名、計算結果を保持する", () => {
  expect(KAITEN_DENKI1_QUESTIONS[25].choices?.エ).toBe("25V");
  expect((5/25+5/100)*100).toBe(25);
  expect(KAITEN_DENKI2_QUESTIONS[29].choices?.ア).toBe("3");
  expect(10*6/20).toBe(3);
  expect(HAIDEN_SEIGYO3_QUESTIONS.find(q => q.year === 2023 && q.qNumber === 30)?.imageAltTexts?.[0]).toContain("接点A・B");
});
