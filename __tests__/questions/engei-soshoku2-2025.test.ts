import { describe, expect, it } from "vitest";
import { ENGEI_SOSHOKU2_QUESTIONS as allQuestions } from "@/data/questions/engei-soshoku2";
import sources from "@/data/questions/engei-soshoku2/sources.json";
import { QUESTIONS_BY_EXAM } from "@/data/questions";
import { getQuestionsForExam } from "@/lib/questions/get-questions";
import { choiceDisplayLabel, questionNumberLabel, usesNumberedChoices } from "@/lib/questions/display";
import { filterQuestions, isPracticeReadyQuestion, shuffleChoices } from "@/lib/questions/filter";
import { findQuestionByRoute, questionPagePath } from "@/lib/seo/question-url";
import { questionSourceEdition } from "@/lib/questions/source-label";
import { getQualificationByExamCode } from "@/lib/qualifications/catalog";
import { EXAM_CONFIGS } from "@/lib/exam-config";
import { getExamQuestionCount } from "@/lib/constants/exam-question-counts";
import { buildQuestionJsonLd } from "@/lib/seo/question-jsonld";
import type { ChoiceKey } from "@/lib/questions/types";

// 公式正答表の5問ずつの枠を、転記スクリプトとは独立して画像で照合。
const trueFalse = ["○××○○", "××○×○", "○○○○○", "○×○○×", "×○○×○"].join("").split("");
const multipleChoice = ["ロイハニロ", "ニニハニイ", "ニニニロロ", "ロロニニハ", "ハニロロニ"].join("").split("");
const keys: ChoiceKey[] = ["ア", "イ", "ウ", "エ"];
const labels = ["イ", "ロ", "ハ", "ニ"];

const questions = allQuestions.filter(q => q.year === 2025 && q.season === "early");

describe("園芸装飾技能士2級 室内園芸装飾作業 2025年度前期", () => {
  it("公式正答50件とA/B群の問番号、全150肢の解説を保持する", () => {
    expect(questions).toHaveLength(50);
    expect(new Set(questions.map(q => q.id)).size).toBe(50);
    let choiceCount = 0;
    for (const [index, q] of questions.entries()) {
      const a = index < 25;
      const n = index % 25 + 1;
      const official = (a ? trueFalse : multipleChoice)[n - 1];
      expect(q.id).toBe(`engei-soshoku2-2025-early-gakka-${a ? "a" : "b"}-${String(n).padStart(3, "0")}`);
      expect(q.qNumber).toBe(index + 1);
      expect(questionNumberLabel(q)).toBe(`${a ? "A" : "B"}群 ${n}`);
      expect(q.officialAnswerNumber, q.id).toBe(official);
      expect(q.answer, q.id).toBe(a ? (official === "○" ? "ア" : "イ") : keys[labels.indexOf(official)]);
      expect(Object.keys(q.choices ?? {})).toHaveLength(a ? 2 : 4);
      expect(Object.keys(q.choiceExplanations ?? {})).toEqual(Object.keys(q.choices ?? {}));
      expect(Object.values(q.choiceExplanations ?? {}).every(reason => reason!.length > 20), q.id).toBe(true);
      expect(isPracticeReadyQuestion(q), q.id).toBe(true);
      expect(q.sourcePdfUrl).toMatch(/kentei\.javada\.or\.jp\/pdf\/R07-1-B01-.*#page=[2-7]$/);
      expect(q.sourceAnswerUrl).toContain("%E6%AD%A3%E8%A7%A3%E8%A1%A8");
      expect(q.examDate).toBe("2025-09-07");
      expect(questionSourceEdition(q)).toBe("2025年度前期（2025年9月7日実施）");
      expect(q.hasImage).toBe(false);
      expect(shuffleChoices(q)).toBe(q);
      choiceCount += Object.keys(q.choices ?? {}).length;
    }
    expect(choiceCount).toBe(150);
  });

  it("イロハニ表示と50個のURLを保持し、A群とB群を混同しない", () => {
    expect(keys.map(key => choiceDisplayLabel("engei-soshoku2", key))).toEqual(labels);
    expect(usesNumberedChoices("engei-soshoku2")).toBe(true);
    expect(questions[0].choices).toEqual({ ア: "正しい（○）", イ: "誤り（×）" });
    expect(new Set(questions.map(questionPagePath)).size).toBe(50);
    for (const q of questions) {
      const [, , exam, yearSeason, section, qnum] = questionPagePath(q).split("/");
      expect(findQuestionByRoute(questions, { exam, yearSeason, section, qnum })?.id, q.id).toBe(q.id);
    }
  });

  it("資格一覧・同期/遅延ローダー・8分野の出題・公開件数を接続する", async () => {
    expect(QUESTIONS_BY_EXAM["engei-soshoku2"]!.filter(q => q.year === 2025 && q.season === "early")).toEqual(questions);
    expect((await getQuestionsForExam("engei-soshoku2")).filter(q => q.year === 2025 && q.season === "early")).toEqual(questions);
    expect(getQualificationByExamCode("engei-soshoku2")?.status).toBe("live");
    expect(getExamQuestionCount("engei-soshoku2")).toBe(allQuestions.length);
    const config = EXAM_CONFIGS["engei-soshoku2"];
    expect(config.sessions[0].expectedQuestions).toBe(50);
    expect(config.seasons).toEqual(expect.arrayContaining(["early"]));
    expect(config.sessions[0].categories).toEqual(expect.arrayContaining([...new Set(questions.map(q => q.category))]));
    for (const category of new Set(questions.map(q => q.category))) {
      expect(filterQuestions(questions, { exam: "engei-soshoku2", category, mode: "random" }).length).toBeGreaterThan(0);
    }
  });

  it("原本の紛らわしい表記・否定条件・正答表の対応を維持する", () => {
    expect(questions[11].question).toContain("発泡煉石");
    expect(questions[18].question).toContain("シュロチク");
    expect(questions[33].choices?.エ).toBe("4～5月");
    expect(questions[41].choices?.イ).toBe("直径1.5～2cm程度の軽石");
    expect(questions[42].question).toContain("理由とならない");
    expect(questions[48].choices?.ウ).toBe("木製用材に錆止めを施したもの");
    expect(questions[49].choices?.エ).toBe("75");
    expect(sources.review).toHaveLength(50);
    expect(sources.sources.map(s => s.pages)).toEqual([7, 1]);
    expect(sources.figureCount).toBe(0);
    for (const [index, entry] of sources.review.entries()) {
      expect(entry.officialAnswer).toBe(questions[index].officialAnswerNumber);
      expect(entry.internalAnswer).toBe(questions[index].answer);
      expect(entry.pdfPage).toBe(Number(questions[index].sourcePdfUrl!.split("#page=")[1]));
    }
    const graph = buildQuestionJsonLd({ question: questions[26], pageUrlAbs: `https://www.kakomon-ai.jp${questionPagePath(questions[26])}`, title: "園芸装飾技能士2級 B群2" })["@graph"];
    const resource = graph[0];
    if (!("hasPart" in resource)) throw new Error("Missing learning resource");
    if (!("acceptedAnswer" in resource.hasPart)) throw new Error("Missing official accepted answer");
    expect(resource.hasPart.author.name).toBe("中央職業能力開発協会");
    expect(resource.hasPart.acceptedAnswer).toMatchObject({ text: "イ: エゾマツとアレカヤシ" });
  });
});
