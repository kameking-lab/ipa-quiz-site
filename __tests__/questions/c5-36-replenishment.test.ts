import { describe, expect, it } from "vitest";
import { existsSync } from "node:fs";
import { join } from "node:path";
import { KUUKIATSU_KUMITATE1_QUESTIONS } from "@/data/questions/kuukiatsu-kumitate1";
import { KUUKIATSU_KUMITATE2_QUESTIONS } from "@/data/questions/kuukiatsu-kumitate2";
import { QUESTIONS_BY_EXAM } from "@/data/questions";
import { EXAM_CONFIGS } from "@/lib/exam-config";
import { getQuestionsForExam } from "@/lib/questions/get-questions";
import { getQualificationByExamCode } from "@/lib/qualifications/catalog";
import { choiceDisplayLabel, formatQuestionAnswerForDisplay } from "@/lib/questions/display";
import { questionSourceEdition } from "@/lib/questions/source-label";
import { buildQuestionJsonLd } from "@/lib/seo/question-jsonld";
import { findQuestionByRoute, questionPagePath } from "@/lib/seo/question-url";
import { isPracticeReadyQuestion } from "@/lib/questions/filter";
import type { ChoiceKey } from "@/lib/questions/types";

// 公式正答PDFを5問ずつ確認して固定。内部キーとの対応を独立して検証する。
const editions = [
  { exam: "kuukiatsu-kumitate1" as const, year: 2024, all: KUUKIATSU_KUMITATE1_QUESTIONS,
    answers: "○×○××" + "○○○×○" + "○○○○○" + "××○○×" + "○××○×" + "ロイロイハ" + "ニロイイハ" + "ロイイロハ" + "ニハイイロ" + "ニニロニロ", figures: 6 },
  { exam: "kuukiatsu-kumitate2" as const, year: 2025, all: KUUKIATSU_KUMITATE2_QUESTIONS,
    answers: "○○×××" + "×○○××" + "○×○○○" + "○○○××" + "×○×○○" + "ロイニロロ" + "ハロイニロ" + "イロハイニ" + "ニロハロロ" + "ニイロハハ", figures: 5 },
  { exam: "kuukiatsu-kumitate1" as const, year: 2025, all: KUUKIATSU_KUMITATE1_QUESTIONS,
    answers: "○○×××" + "○××○○" + "×○○×○" + "○○○○○" + "○××○○" + "ニロロハニ" + "ニロハハハ" + "イロイハニ" + "ハイニロハ" + "ハロイハハ", figures: 4 },
];

describe.each(editions)("c5-36 $exam $year 後期", ({ exam, year, all, answers, figures }) => {
  const rows = all.filter(q => q.year === year && q.season === "late");
  it("全50問の公式正答・原本記号・出典・図を保持し、全肢解説を配信する", () => {
    expect(rows).toHaveLength(50);
    expect(new Set(rows.map(q => q.id)).size).toBe(50);
    expect(rows.filter(q => q.hasImage)).toHaveLength(figures);
    for (const [i, q] of rows.entries()) {
      const official = answers[i];
      const key = (i < 25 ? official === "○" ? "ア" : "イ" : "アイウエ"["イロハニ".indexOf(official)]) as ChoiceKey;
      expect(q.answer, q.id).toBe(key);
      expect(q.officialAnswerNumber, q.id).toBe(official);
      expect(formatQuestionAnswerForDisplay(q, key), q.id).toBe(official);
      expect(q.qNumber).toBe(i + 1);
      expect(q.officialQuestionLabel).toBe(i < 25 ? `A群 ${i + 1}` : `B群 ${i - 24}`);
      expect(questionSourceEdition(q)).toBe(`${year}年度後期`);
      expect(isPracticeReadyQuestion(q)).toBe(true);
      expect(Object.keys(q.choiceExplanations!)).toEqual(Object.keys(q.choices!));
      expect(q.explanation.length).toBeGreaterThanOrEqual(50);
      expect(q.sourcePdfUrl).toMatch(/^https:\/\/www\.kentei\.javada\.or\.jp\/pdf\/R0[67]-2-.+\.pdf#page=\d+$/);
      expect(q.sourceAnswerUrl).toMatch(/^https:\/\/www\.kentei\.javada\.or\.jp\/pdf\/.+\.pdf$/);
      expect(EXAM_CONFIGS[exam].sessions[0].categories).toContain(q.category);
      for (const path of q.imageUrls ?? []) expect(existsSync(join(process.cwd(), "public", path))).toBe(true);
      const [, , routeExam, yearSeason, section, qnum] = questionPagePath(q).split("/");
      expect(findQuestionByRoute(all, { exam: routeExam, yearSeason, section, qnum })?.id).toBe(q.id);
      const graph = JSON.stringify(buildQuestionJsonLd({ question: q, pageUrlAbs: `https://www.kakomon-ai.jp${questionPagePath(q)}`, title: q.id }));
      expect(graph).toContain(`${official}: ${q.choices![key]}`);
      expect(graph).toContain("中央職業能力開発協会");
    }
  });
  it("一覧と演習で読み込め、正しい資格名・年度・選択肢記号を表示する", async () => {
    expect(QUESTIONS_BY_EXAM[exam]).toEqual(all);
    expect(await getQuestionsForExam(exam)).toEqual(all);
    expect(EXAM_CONFIGS[exam].nameFull).toContain("空気圧装置組立て（空気圧装置組立て作業）");
    expect(EXAM_CONFIGS[exam].seasons).toEqual(["late"]);
    expect(EXAM_CONFIGS[exam].yearRange.start).toBeLessThanOrEqual(year);
    expect(EXAM_CONFIGS[exam].yearRange.end).toBeGreaterThanOrEqual(year);
    expect(getQualificationByExamCode(exam)?.status).toBe("live");
    expect(getQualificationByExamCode(exam)?.fullName).toContain("空気圧装置組立て");
    expect((["ア", "イ", "ウ", "エ"] as ChoiceKey[]).map(k => choiceDisplayLabel(exam, k))).toEqual(["イ", "ロ", "ハ", "ニ"]);
  });
});


it("級・年度ごとの原本の違いと計算問題を保持する", () => {
  expect(KUUKIATSU_KUMITATE1_QUESTIONS).toHaveLength(100);
  expect(KUUKIATSU_KUMITATE2_QUESTIONS).toHaveLength(50);
  const one2025 = KUUKIATSU_KUMITATE1_QUESTIONS.filter(q => q.year === 2025);
  const one2024 = KUUKIATSU_KUMITATE1_QUESTIONS.filter(q => q.year === 2024);
  const two2025 = KUUKIATSU_KUMITATE2_QUESTIONS;
  expect(one2025[45].explanation).toContain("14Ω");
  expect(one2024[45].explanation).toContain("120Ω");
  expect(one2024[33].explanation).toContain("19.96mm");
  expect(one2024[32].question).toContain("公称ろ過度精度");
  expect(one2024[32].explanation).toContain("原文どおり");
  expect(two2025[49].question).toContain("第二種圧力容器");
  expect(two2025[49].officialAnswerNumber).toBe("ハ");
  expect(two2025[4].imageUrls).toHaveLength(1);
  expect(one2025[43].imageUrls).toHaveLength(1);
  expect(EXAM_CONFIGS["kuukiatsu-kumitate1"].yearRange).toEqual({ start: 2024, end: 2025 });
});
