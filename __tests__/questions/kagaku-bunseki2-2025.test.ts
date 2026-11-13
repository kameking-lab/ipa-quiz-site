import { describe, expect, it } from "vitest";
import { KAGAKU_BUNSEKI2_QUESTIONS as allQuestions } from "@/data/questions/kagaku-bunseki2";
import sources from "@/data/questions/kagaku-bunseki2/sources.json";
import { QUESTIONS_BY_EXAM } from "@/data/questions";
import { EXAM_CONFIGS } from "@/lib/exam-config";
import { getQuestionsForExam } from "@/lib/questions/get-questions";
import { getExamQuestionCount } from "@/lib/constants/exam-question-counts";
import { getQualificationByExamCode } from "@/lib/qualifications/catalog";
import { choiceDisplayLabel, questionNumberLabel, usesNumberedChoices } from "@/lib/questions/display";
import { filterQuestions, isPracticeReadyQuestion, shuffleChoices } from "@/lib/questions/filter";
import { questionSourceEdition } from "@/lib/questions/source-label";
import { findQuestionByRoute, questionPagePath } from "@/lib/seo/question-url";
import { buildQuestionJsonLd } from "@/lib/seo/question-jsonld";
import type { ChoiceKey } from "@/lib/questions/types";

// 正答PDFの画像から5問枠ごとに独立転記。データのanswerから生成しない。
const officialA = ["×○○○×", "○○○○×", "××○○○", "○×○××", "×○×○×"].join("");
const officialB = ["イイイニロ", "ニイハロロ", "イロニイハ", "イロロロハ", "ハニニハロ"].join("");
const keys: ChoiceKey[] = ["ア", "イ", "ウ", "エ"];
const labels = ["イ", "ロ", "ハ", "ニ"];

const questions = allQuestions.filter(q => q.year === 2025 && q.season === "early");

describe("化学分析技能士2級 化学分析作業 2025年度前期", () => {
  it("A/B各25問と公式正答・群別番号・全150肢の解説を保持する", () => {
    expect(questions).toHaveLength(50);
    expect(new Set(questions.map(q => q.id)).size).toBe(50);
    let choices = 0;
    for (const [index, q] of questions.entries()) {
      const a = index < 25;
      const n = index % 25 + 1;
      const official = (a ? officialA : officialB)[n - 1];
      expect(q.id).toBe(`kagaku-bunseki2-2025-early-gakka-${a ? "a" : "b"}-${String(n).padStart(3, "0")}`);
      expect(q.qNumber).toBe(index + 1);
      expect(questionNumberLabel(q)).toBe(`${a ? "A" : "B"}群 ${n}`);
      expect(q.officialAnswerNumber, q.id).toBe(official);
      expect(q.answer, q.id).toBe(a ? (official === "○" ? "ア" : "イ") : keys[labels.indexOf(official)]);
      expect(Object.keys(q.choices ?? {})).toHaveLength(a ? 2 : 4);
      expect(Object.keys(q.choiceExplanations ?? {})).toEqual(Object.keys(q.choices ?? {}));
      expect(Object.values(q.choiceExplanations ?? {}).every(reason => reason!.length > 20), q.id).toBe(true);
      expect(isPracticeReadyQuestion(q), q.id).toBe(true);
      expect(shuffleChoices(q)).toBe(q);
      expect(q.examDate).toBe("2025-08-24");
      expect(questionSourceEdition(q)).toBe("2025年度前期（2025年8月24日実施）");
      expect(q.sourcePdfUrl).toMatch(/kentei\.javada\.or\.jp\/pdf\/R07-1-B82-.*#page=[2-8]$/);
      expect(q.sourceAnswerUrl).toContain("%E6%AD%A3%E8%A7%A3%E8%A1%A8");
      choices += Object.keys(q.choices ?? {}).length;
    }
    expect(choices).toBe(150);
  });

  it("イロハニ表示と全50問の個別URLを解決する", () => {
    expect(keys.map(k => choiceDisplayLabel("kagaku-bunseki2", k))).toEqual(labels);
    expect(usesNumberedChoices("kagaku-bunseki2")).toBe(true);
    expect(questions[0].choices).toEqual({ ア: "正しい（○）", イ: "誤り（×）" });
    expect(new Set(questions.map(questionPagePath)).size).toBe(50);
    for (const q of questions) {
      const [, , exam, yearSeason, section, qnum] = questionPagePath(q).split("/");
      expect(findQuestionByRoute(questions, { exam, yearSeason, section, qnum })?.id, q.id).toBe(q.id);
    }
  });

  it("一覧・同期/遅延読込・8分野の練習と収録件数を接続する", async () => {
    expect(QUESTIONS_BY_EXAM["kagaku-bunseki2"]!.filter(q => q.year === 2025 && q.season === "early")).toEqual(questions);
    expect((await getQuestionsForExam("kagaku-bunseki2")).filter(q => q.year === 2025 && q.season === "early")).toEqual(questions);
    expect(getQualificationByExamCode("kagaku-bunseki2")?.status).toBe("live");
    expect(getExamQuestionCount("kagaku-bunseki2")).toBe(allQuestions.length);
    const config = EXAM_CONFIGS["kagaku-bunseki2"];
    expect(config.nameFull).toBe("技能検定 2級化学分析（化学分析作業）学科試験");
    expect(getQualificationByExamCode("kagaku-bunseki2")?.fullName).toBe(config.nameFull);
    expect(config.sessions[0].expectedQuestions).toBe(50);
    expect(config.seasons).toEqual(expect.arrayContaining(["early"]));
    expect(config.sessions[0].categories).toEqual(expect.arrayContaining([...new Set(questions.map(q => q.category))]));
    for (const category of new Set(questions.map(q => q.category))) {
      expect(filterQuestions(questions, { exam: "kagaku-bunseki2", category, mode: "random" }).length).toBeGreaterThan(0);
    }
  });

  it("化学式・計算条件・否定条件・分類表と原本ページを保持する", () => {
    expect(questions[0].question).toContain("15℃");
    expect(questions[18].question).toContain("Ag⁺、Al³⁺及びCa²⁺");
    expect(questions[28].question).toContain("JIS K8085");
    expect(questions[29].question).toContain("H₂SO₄：分子量98.08");
    expect(questions[31].question).toContain("誤っているもの");
    expect(questions[31].choices?.ウ).toContain("試料1L当たりクロロホルム1mL");
    expect(questions[37].question).toContain("MnO₄⁻ + 8H⁺ + (　)e⁻ → Mn²⁺ + 4H₂O");
    expect(questions[43].question).toContain("変動係数(CV) = (　) / 平均の絶対値");
    expect(questions[44].choices).toEqual({ ア: "NaCl", イ: "NaBr", ウ: "KClO₄", エ: "K₂CrO₄" });
    expect(questions[46].choices?.エ).toBe("エステル類：グリセリン");
    expect(questions[48].question).toContain("標準状態で22.4L");
    expect(questions[49].lawReferenceDate).toBe("2025-08-24");
    expect(questions.filter(q => q.hasImage)).toHaveLength(0);
    expect(sources.review).toHaveLength(50);
    expect(sources.sources.map(s => s.pages)).toEqual([8, 1]);
    for (const [index, entry] of sources.review.entries()) {
      expect(entry.officialAnswer).toBe(questions[index].officialAnswerNumber);
      expect(entry.internalAnswer).toBe(questions[index].answer);
      expect(entry.pdfPage).toBe(Number(questions[index].sourcePdfUrl!.split("#page=")[1]));
    }
  });

  it("構造化データでも印刷ラベルと出題機関を保持する", () => {
    const q = questions[44];
    const resource = buildQuestionJsonLd({ question: q, pageUrlAbs: `https://www.kakomon-ai.jp${questionPagePath(q)}`, title: "化学分析技能士2級 B群20" })["@graph"][0];
    if (!("hasPart" in resource) || !("acceptedAnswer" in resource.hasPart)) throw new Error("Missing accepted answer");
    expect(resource.hasPart.author.name).toBe("中央職業能力開発協会");
    expect(resource.hasPart.acceptedAnswer).toMatchObject({ text: "ハ: KClO₄" });
  });
});
