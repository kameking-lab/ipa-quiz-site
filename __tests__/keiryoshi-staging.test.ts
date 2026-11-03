import { existsSync } from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";
import { KEIRYOSHI_CANDIDATES, KEIRYOSHI_SOURCE_QUESTIONS, KEIRYOSHI_SUBJECTS, getKeiryoshiCandidates } from "@/data/questions/keiryoshi";
import official from "@/docs/evidence/keiryoshi-76/official-answers.json";
import sourcePack from "@/data/exam-library/source-packs/keiryoshi-76.json";
import draft75 from "@/data/questions/keiryoshi/2024-ichiki.json";
import official75 from "@/docs/evidence/keiryoshi-75/official-answers.json";
import sourcePack75 from "@/data/exam-library/source-packs/keiryoshi-75.json";
import { EXAM_CONFIGS } from "@/lib/exam-config";
import { isAcceptedAnswer, isCompleteSelectionCorrect, requiredSelectionCount } from "@/lib/questions/answers";
import { choiceDisplayLabel, formatQuestionAnswerForDisplay } from "@/lib/questions/display";
import { getQuestionsForExam, getRegisteredExamCodes } from "@/lib/questions/get-questions";
import { getQuestionById, getQuestionsByExam } from "@/lib/questions/load";
import { getQualificationByExamCode, isExamPublished } from "@/lib/qualifications/catalog";
import { questionPagePath } from "@/lib/seo/question-url";
import { questionSourceEdition } from "@/lib/questions/source-label";
import { buildQuestionJsonLd } from "@/lib/seo/question-jsonld";

const keys = ["ア", "イ", "ウ", "エ", "オ"] as const;
const exams = ["keiryoshi", "keiryoshi-nodo", "keiryoshi-soon"] as const;

describe("第76回計量士・未公開ステージング", () => {
  it("200原問を公式の科目対応で各資格100問に割り当て、共通科目の訂正を共有する", () => {
    expect(KEIRYOSHI_SOURCE_QUESTIONS).toHaveLength(200);
    expect(KEIRYOSHI_CANDIDATES).toHaveLength(300);
    expect(new Set(KEIRYOSHI_CANDIDATES.map(q => q.id)).size).toBe(300);
    expect(new Set(KEIRYOSHI_CANDIDATES.map(questionPagePath)).size).toBe(300);
    expect(sourcePack.publicationStatus).toBe("staging");
    for (const exam of exams) {
      const questions = getKeiryoshiCandidates(exam);
      expect(questions).toHaveLength(100);
      expect(new Set(questions.map(q => q.subject))).toEqual(new Set(KEIRYOSHI_SUBJECTS[exam]));
      for (const session of EXAM_CONFIGS[exam].sessions) {
        expect(questions.filter(q => q.session === session.session).map(q => q.qNumber)).toEqual(
          Array.from({ length: session.expectedQuestions }, (_, i) => i + 1),
        );
      }
      expect(questions.find(q => q.subject === "法規" && q.qNumber === 21)?.answer).toBe("イ");
    }
  });

  it("全原問の正答を訂正版PDF由来の別台帳と照合し、全5肢の本文・解説と出典を持つ", () => {
    const answers: Record<string, Record<string, string>> = official.answers;
    for (const q of KEIRYOSHI_SOURCE_QUESTIONS) {
      expect(q.officialAnswerNumber, `${q.subject} ${q.qNumber}`).toBe(answers[q.subject!]?.[q.qNumber]);
      expect(q.answer).toEqual(q.officialAnswerNumber === "全員正解" ? [...keys] : keys[Number(q.officialAnswerNumber) - 1]);
      expect(Object.keys(q.choices ?? {})).toEqual([...keys]);
      expect(Object.keys(q.choiceExplanations ?? {})).toEqual([...keys]);
      for (const key of keys) {
        expect(q.choices?.[key]?.trim().length).toBeGreaterThan(0);
        expect(q.choiceExplanations?.[key]?.trim().length).toBeGreaterThan(5);
      }
      expect(q.question.length).toBeGreaterThan(10);
      expect(JSON.stringify(q)).not.toContain("�");
      expect(q.sourceAnswerUrl).toBe(official.url);
      expect(q.sourcePdfUrl).toMatch(/^https:\/\/www\.meti\.go\.jp\//);
      expect(q.sourceAttribution).toContain("独自作成");
      expect(q.hasImage).toBe(Boolean(q.imageUrls?.length));
      for (const url of q.imageUrls ?? []) expect(existsSync(path.join(process.cwd(), "public", url))).toBe(true);
      if (q.subject === "法規") {
        expect(q.lawReferenceDate).toBe("2025-12-14");
        expect(q.explanation).toContain("令和7年12月（出題時点）の法令");
      }
    }
  });

  it("環濃問3はどの1肢でも正解と採点し、5肢同時選択を要求しない", () => {
    const q = getKeiryoshiCandidates("keiryoshi-nodo").find(q => q.subject === "環濃" && q.qNumber === 3)!;
    expect(requiredSelectionCount(q)).toBe(1);
    expect(formatQuestionAnswerForDisplay(q, q.answer)).toBe("全員正解");
    for (const key of keys) {
      expect(isAcceptedAnswer(q.answer, key)).toBe(true);
      expect(isCompleteSelectionCorrect(q.answer, [key], requiredSelectionCount(q))).toBe(true);
      expect(formatQuestionAnswerForDisplay(q, key)).toBe(String(keys.indexOf(key) + 1));
    }
    expect(isAcceptedAnswer(q.answer, undefined)).toBe(false);
    expect(isCompleteSelectionCorrect(q.answer, [], requiredSelectionCount(q))).toBe(false);
    expect(isCompleteSelectionCorrect(q.answer, ["ア", "イ"], requiredSelectionCount(q))).toBe(false);
    expect(formatQuestionAnswerForDisplay({ ...q, answer: ["ア", "ウ"] }, ["ア", "ウ"])).toBe("1・3");
    expect(formatQuestionAnswerForDisplay({ ...q, requiredSelections: 5 }, [...keys])).toBe("1・2・3・4・5");
  });

  it("通常の一覧・同期/非同期ローダー・ID指定から公開前データを取得させない", async () => {
    for (const exam of exams) {
      expect(getQualificationByExamCode(exam)?.status).toBe("ready-to-ingest");
      expect(isExamPublished(exam)).toBe(false);
      expect(getRegisteredExamCodes()).not.toContain(exam);
      expect(getQuestionsByExam(exam)).toEqual([]);
      expect(await getQuestionsForExam(exam)).toEqual([]);
    }
    for (const q of KEIRYOSHI_CANDIDATES) expect(getQuestionById(q.id)).toBeUndefined();
  });

  it("公式の番号・回次・経済産業省の著者/利用条件を表示する", () => {
    for (const exam of exams) {
      const q = getKeiryoshiCandidates(exam)[0]!;
      expect(keys.map(key => choiceDisplayLabel(exam, key))).toEqual(["1", "2", "3", "4", "5"]);
      expect(questionSourceEdition(q)).toBe("第76回（令和7年12月実施）");
      const graph = buildQuestionJsonLd({ question: q, pageUrlAbs: `https://example.org${questionPagePath(q)}`, title: exam, lastUpdatedISO: "2026-11-03" });
      expect(JSON.stringify(graph)).toContain("経済産業省");
      expect(JSON.stringify(graph)).toContain("https://www.meti.go.jp/main/rules.html");
    }
  });
});

describe("第75回計量士・未登録の途中ドラフト", () => {
  it("途中データを既存の第76回候補や一般出題経路へ混ぜない", () => {
    expect(sourcePack75.publicationStatus).toBe("staging");
    expect(sourcePack75.ingestedSourceQuestionCount).toBe(0);
    expect(draft75).toHaveLength(25);
    for (const q of draft75) {
      const id = `keiryoshi-${q.year}-${q.season}-${q.session}-q${q.qNumber}`;
      expect(KEIRYOSHI_CANDIDATES.some(candidate => candidate.id === id)).toBe(false);
      expect(getQuestionById(id)).toBeUndefined();
      expect(q.needsReview).toBe(true);
      expect(q.year).toBe(2024);
      expect(q.examDate).toBe("2024-12-15");
      expect(questionSourceEdition({ year: q.year, season: "annual", sourcePdfUrl: q.sourcePdfUrl })).toBe("第75回（令和6年12月実施）");
      expect(q.officialAnswerNumber).toBe((official75.answers.一基 as Record<string, string>)[q.qNumber]);
      expect(q.answer).toBe(keys[Number(q.officialAnswerNumber) - 1]);
      expect(q.sourceAnswerUrl).toBe(official75.url);
      expect(Object.keys(q.choices)).toEqual([...keys]);
      expect(Object.keys(q.choiceExplanations)).toEqual([...keys]);
      for (const url of q.imageUrls ?? []) expect(existsSync(path.join(process.cwd(), "public", url))).toBe(true);
    }
    expect(new Set(KEIRYOSHI_SOURCE_QUESTIONS.map(q => q.year))).toEqual(new Set([2025]));
  });
});
