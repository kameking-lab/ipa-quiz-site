import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { SASSHI2_QUESTIONS as questions } from "@/data/questions/sasshi2";
import sources from "@/data/questions/sasshi2/sources.json";
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

// 公式正答表の画像の5問枠から、データ生成とは独立して転記。
const trueFalse = ["××○○×", "×××○○", "×○×××", "○○○○×", "○○×○○"].join("").split("");
const multipleChoice = ["ハハハニイ", "ロロニニイ", "ロハイイニ", "ロイロイハ", "イハニニハ"].join("").split("");
const keys: ChoiceKey[] = ["ア", "イ", "ウ", "エ"];
const labels = ["イ", "ロ", "ハ", "ニ"];

describe("サッシ施工技能士2級 ビル用サッシ施工作業 2025年度前期", () => {
  it("公式正答50件・A/B群番号・全150肢解説を保持する", () => {
    expect(questions).toHaveLength(50);
    expect(new Set(questions.map(q => q.id)).size).toBe(50);
    let count = 0;
    for (const [index, q] of questions.entries()) {
      const a = index < 25;
      const n = index % 25 + 1;
      const official = (a ? trueFalse : multipleChoice)[n - 1];
      expect(q.id).toBe(`sasshi2-2025-early-gakka-${a ? "a" : "b"}-${String(n).padStart(3, "0")}`);
      expect(q.qNumber).toBe(index + 1);
      expect(questionNumberLabel(q)).toBe(`${a ? "A" : "B"}群 ${n}`);
      expect(q.officialAnswerNumber, q.id).toBe(official);
      expect(q.answer, q.id).toBe(a ? (official === "○" ? "ア" : "イ") : keys[labels.indexOf(official)]);
      expect(Object.keys(q.choices ?? {})).toHaveLength(a ? 2 : 4);
      expect(Object.keys(q.choiceExplanations ?? {})).toEqual(Object.keys(q.choices ?? {}));
      expect(Object.values(q.choiceExplanations ?? {}).every(reason => reason!.length > 20), q.id).toBe(true);
      expect(isPracticeReadyQuestion(q), q.id).toBe(true);
      expect(q.sourcePdfUrl).toMatch(/kentei\.javada\.or\.jp\/pdf\/R07-1-B81-.*#page=[2-8]$/);
      expect(q.sourceAnswerUrl).toContain("%E6%AD%A3%E8%A7%A3%E8%A1%A8");
      expect(q.examDate).toBe("2025-08-24");
      expect(questionSourceEdition(q)).toBe("2025年度前期（2025年8月24日実施）");
      expect(shuffleChoices(q)).toBe(q);
      count += Object.keys(q.choices ?? {}).length;
    }
    expect(count).toBe(150);
  });

  it("イロハニ表示と50個の個別URLを接続する", () => {
    expect(keys.map(key => choiceDisplayLabel("sasshi2", key))).toEqual(labels);
    expect(usesNumberedChoices("sasshi2")).toBe(true);
    expect(questions[0].choices).toEqual({ ア: "正しい（○）", イ: "誤り（×）" });
    expect(new Set(questions.map(questionPagePath)).size).toBe(50);
    for (const q of questions) {
      const [, , exam, yearSeason, section, qnum] = questionPagePath(q).split("/");
      expect(findQuestionByRoute(questions, { exam, yearSeason, section, qnum })?.id, q.id).toBe(q.id);
    }
  });

  it("一覧・同期/遅延読込・8分野の出題・公開件数を接続する", async () => {
    expect(QUESTIONS_BY_EXAM.sasshi2).toEqual(questions);
    expect(await getQuestionsForExam("sasshi2")).toEqual(questions);
    expect(getQualificationByExamCode("sasshi2")?.status).toBe("live");
    expect(getExamQuestionCount("sasshi2")).toBe(50);
    const config = EXAM_CONFIGS.sasshi2;
    expect(config.sessions[0].expectedQuestions).toBe(50);
    expect(config.seasons).toEqual(["early"]);
    expect(config.sessions[0].categories).toHaveLength(8);
    expect(new Set(config.sessions[0].categories)).toEqual(new Set(questions.map(q => q.category)));
    for (const category of config.sessions[0].categories) {
      expect(filterQuestions(questions, { exam: "sasshi2", category, mode: "random" }).length).toBeGreaterThan(0);
    }
  });

  it("原図2点のPNGと出典ページ・原本の数値/表/否定条件を保持する", () => {
    expect(questions.filter(q => q.hasImage).map(q => q.officialQuestionLabel)).toEqual(["A群 23", "B群 23"]);
    for (const q of questions.filter(q => q.hasImage)) {
      expect(q.imageUrls).toHaveLength(1);
      expect(q.imageAltTexts?.[0].length).toBeGreaterThan(20);
      const png = readFileSync(join(process.cwd(), "public", q.imageUrls![0]));
      expect(png.subarray(0, 8).toString("hex")).toBe("89504e470d0a1a0a");
    }
    expect(questions[14].question).toContain("±4mm");
    expect(questions[28].choices?.エ).toBe("沓摺");
    expect(questions[31].choices?.イ).toBe("3.2mm");
    expect(questions[32].choices?.ウ).toBe("2面接着の防止");
    expect(questions[44].choices?.ウ).toBe("① 引張り力　② 圧縮力");
    expect(questions[48].choices?.エ).toBe("間仕切壁");
    expect(questions[48].choiceExplanations?.エ).toContain("構造上重要でない");
    expect(sources.review).toHaveLength(50);
    expect(sources.sources.map(s => s.pages)).toEqual([8, 1]);
    expect(sources.figureCount).toBe(2);
    for (const [index, entry] of sources.review.entries()) {
      expect(entry.officialAnswer).toBe(questions[index].officialAnswerNumber);
      expect(entry.internalAnswer).toBe(questions[index].answer);
      expect(entry.pdfPage).toBe(Number(questions[index].sourcePdfUrl!.split("#page=")[1]));
    }
  });

  it("構造化データに公式正答と試験実施機関を出す", () => {
    const q = questions[40];
    const resource = buildQuestionJsonLd({ question: q, pageUrlAbs: `https://www.kakomon-ai.jp${questionPagePath(q)}`, title: "サッシ施工技能士2級 B群16" })["@graph"][0];
    if (!("hasPart" in resource) || !("acceptedAnswer" in resource.hasPart)) throw new Error("Missing accepted answer");
    expect(resource.hasPart.author.name).toBe("中央職業能力開発協会");
    expect(resource.hasPart.acceptedAnswer).toMatchObject({ text: "ロ: 50N" });
  });
});
