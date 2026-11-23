import { describe, expect, it } from "vitest";
import { createHash } from "node:crypto";
import { SHINRISHI_CANDIDATES, SHINRISHI_QUESTIONS } from "@/data/questions/shinrishi";
import { EXAM_DESCRIPTIONS, examMetaDescription, getAvailableExams, getQuestionsByExamStrict, groupByYearSeason } from "@/lib/seo/exam-meta";
import audit9 from "@/reports/shinrishi-9-source-audit.json";
import audit8 from "@/reports/shinrishi-8-source-audit.json";
import { QUESTIONS_BY_EXAM } from "@/data/questions";
import { ALL_EXAM_CODES, ALL_QUIZ_EXAM_CODES, EXAM_CONFIGS } from "@/lib/exam-config";
import { getQuestionsForExam } from "@/lib/questions/get-questions";
import { getQualificationByExamCode, isExamPublished } from "@/lib/qualifications/catalog";
import { isCompleteSelectionCorrect } from "@/lib/questions/answers";
import { questionSourceEdition } from "@/lib/questions/source-label";
import { choiceDisplayLabel } from "@/lib/questions/display";
import { shuffleChoices } from "@/lib/questions/filter";

const recent = SHINRISHI_CANDIDATES.filter(q => q.year === 2025 || q.year === 2026);

describe("公認心理師第8・9回の公式原問と公開", () => {
  it("2回分308問を公式通し番号・午前午後・4/5肢のまま保存する", () => {
    expect(recent).toHaveLength(308);
    for (const audit of [audit9, audit8]) {
      expect(audit.checked).toBe(154);
      expect(audit.questions.map(q => q.number)).toEqual(Array.from({ length: 154 }, (_, i) => i + 1));
      expect(SHINRISHI_CANDIDATES.filter(q => q.year === (audit.round === 9 ? 2026 : 2025)).map(q => q.qNumber)).toEqual(audit.questions.map(q => q.number));
    }
    expect(new Set(recent.map(q => q.id)).size).toBe(audit9.checked + audit8.checked);
    for (const q of recent) {
      const audit = q.year === 2026 ? audit9 : audit8;
      expect(q.session).toBe(q.qNumber <= 77 ? "am" : "pm");
      expect(Object.values(q.choices ?? {})).toHaveLength(q.year === 2026
        ? ((q.qNumber >= 46 && q.qNumber <= 53) || (q.qNumber >= 122 && q.qNumber <= 128) ? 4 : 5)
        : ((q.qNumber >= 50 && q.qNumber <= 54) || q.qNumber === 74 || (q.qNumber >= 127 && q.qNumber <= 131) ? 4 : 5));
      expect(q.question.length).toBeGreaterThan(15);
      expect(q.explanation.length).toBeGreaterThan(30);
      expect(q.hasImage).toBe(false);
      expect(q.sourceAnswerUrl).toBe(audit.sources.answers.url);
      expect(questionSourceEdition(q)).toBe(q.year === 2026 ? "第9回（2026年3月1日実施）" : "第8回（2025年3月2日実施）");
      const source = audit.questions.find(item => item.number === q.qNumber)!;
      // PDF由来の監査ハッシュと照合し、本文・選択肢の後続変更も検出する。
      const normalizedText = (q.question + Object.values(q.choices ?? {}).join(""))
        .replaceAll("²", "2").replace(/[\s\x08─]/g, "");
      expect(createHash("sha256").update(normalizedText).digest("hex")).toBe(source.textSha256);
      expect(q.sourcePdfUrl).toBe(`${audit.sources[q.session as "am" | "pm"].url}#page=${source.pdfPage}`);
      const answer = source.officialAnswer.map(n => "アイウエオ"[n - 1]);
      expect(Array.isArray(q.answer) ? q.answer : [q.answer]).toEqual(answer);
      expect(q.requiredSelections ?? 1).toBe(answer.length);
      expect(isCompleteSelectionCorrect(q.answer, answer, q.requiredSelections)).toBe(true);
      if (answer.length === 2) expect(isCompleteSelectionCorrect(q.answer, answer.slice(0, 1), q.requiredSelections)).toBe(false);
    }
  });

  it("公開する全308問の全選択肢に独自解説を保持する", () => {
    for (const q of recent) {
      expect(q.explanationCoverage, q.id).toBe("full");
      expect(Object.keys(q.choiceExplanations ?? {}).sort(), q.id).toEqual(Object.keys(q.choices ?? {}).sort());
      const explanations = Object.values(q.choiceExplanations ?? {});
      expect(new Set(explanations).size, q.id).toBe(explanations.length);
      for (const explanation of explanations) expect(explanation?.trim().length, q.id).toBeGreaterThan(15);
    }
  });

  it("公式の選択肢番号と解説を保つため4肢問題も並べ替えない", () => {
    for (const q of SHINRISHI_CANDIDATES) expect(shuffleChoices(q)).toBe(q);
  });

  it("公開一覧と同期・非同期プールに各回の演習対象を出す", async () => {
    expect(choiceDisplayLabel("shinrishi", "ア")).toBe("1");
    expect(EXAM_CONFIGS.shinrishi.sessions).toHaveLength(2);
    expect(getQualificationByExamCode("shinrishi")?.status).toBe("live");
    expect(getQualificationByExamCode("shinrishi")?.officialReuseTermsUrl).toBe("https://www.jccpp.or.jp/policy.html");
    expect(getQualificationByExamCode("shinrishi")?.reuseSummary).toContain("第5〜9回");
    expect(getQualificationByExamCode("shinrishi")?.remainingWork).toEqual([]);
    expect(isExamPublished("shinrishi")).toBe(true);
    // ALL_EXAM_CODES はIPAの取込ツール専用。外部資格の公開一覧は ALL_QUIZ_EXAM_CODES。
    expect(ALL_EXAM_CODES).not.toContain("shinrishi");
    expect(ALL_QUIZ_EXAM_CODES).toContain("shinrishi");
    expect(getAvailableExams()).toContain("shinrishi");
    expect(SHINRISHI_CANDIDATES).toHaveLength(770);
    expect(new Set(SHINRISHI_CANDIDATES.map(q => q.id)).size).toBe(770);
    const excluded = SHINRISHI_CANDIDATES.filter(q => q.officialScoring);
    expect(excluded).toHaveLength(1);
    expect(excluded[0]).toMatchObject({ year: 2022, session: "am", officialAnswerNumber: null });
    expect(SHINRISHI_QUESTIONS).toHaveLength(769);
    expect(SHINRISHI_QUESTIONS.every(q => !q.needsReview)).toBe(true);
    expect(QUESTIONS_BY_EXAM.shinrishi).toEqual(SHINRISHI_QUESTIONS);
    expect(await getQuestionsForExam("shinrishi")).toEqual(SHINRISHI_QUESTIONS);
  });

  it("第5〜9回の演習件数を年度一覧と公開説明へ反映する", () => {
    const published = getQuestionsByExamStrict("shinrishi");
    expect(published).toHaveLength(769);
    const seasons = groupByYearSeason(published);
    expect(seasons.map(({ year, count }) => [year, count])).toEqual([[2026, 154], [2025, 154], [2024, 154], [2023, 154], [2022, 153]]);
    expect(seasons.slice(0, 2)).toEqual([
      { year: 2026, season: "annual", key: "2026-annual", label: "第9回（2026年3月1日実施）", count: 154 },
      { year: 2025, season: "annual", key: "2025-annual", label: "第8回（2025年3月2日実施）", count: 154 },
    ]);
    expect(EXAM_CONFIGS.shinrishi.yearRange).toEqual({ start: 2022, end: 2026 });
    expect(EXAM_DESCRIPTIONS.shinrishi).toContain("第5〜9回");
    expect(examMetaDescription("shinrishi", published.length)).toContain("769問");
    expect(EXAM_DESCRIPTIONS.shinrishi).not.toContain("準備中");
    expect(examMetaDescription("shinrishi", published.length)).not.toContain("準備中");
  });
});
