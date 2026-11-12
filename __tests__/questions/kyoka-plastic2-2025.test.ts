import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { KYOKA_PLASTIC2_QUESTIONS as questions } from "@/data/questions/kyoka-plastic2";
import sources from "@/data/questions/kyoka-plastic2/sources.json";
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

// 正答表の5問枠を画像から独立して転記。問題データの配列から生成しない。
const trueFalse = ["×○○○○", "○○××○", "○○○○○", "○×××○", "○×××○"].join("").split("");
const multipleChoice = ["イハロロロ", "ロニハロハ", "ニイロロイ", "ハハニイハ", "ニハロハロ"].join("").split("");
const keys: ChoiceKey[] = ["ア", "イ", "ウ", "エ"];
const labels = ["イ", "ロ", "ハ", "ニ"];

describe("強化プラスチック成形技能士2級 手積み積層成形作業 2025年度前期", () => {
  it("A/B各25問の公式正答・群別番号・150肢解説を保持する", () => {
    expect(questions).toHaveLength(50);
    expect(new Set(questions.map(q => q.id)).size).toBe(50);
    let count = 0;
    for (const [index, q] of questions.entries()) {
      const a = index < 25;
      const n = index % 25 + 1;
      const official = (a ? trueFalse : multipleChoice)[n - 1];
      expect(q.id).toBe(`kyoka-plastic2-2025-early-gakka-${a ? "a" : "b"}-${String(n).padStart(3, "0")}`);
      expect(q.qNumber).toBe(index + 1);
      expect(questionNumberLabel(q)).toBe(`${a ? "A" : "B"}群 ${n}`);
      expect(q.officialAnswerNumber, q.id).toBe(official);
      expect(q.answer, q.id).toBe(a ? (official === "○" ? "ア" : "イ") : keys[labels.indexOf(official)]);
      expect(Object.keys(q.choices ?? {})).toHaveLength(a ? 2 : 4);
      expect(Object.keys(q.choiceExplanations ?? {})).toEqual(Object.keys(q.choices ?? {}));
      expect(Object.values(q.choiceExplanations ?? {}).every(reason => reason!.length > 20), q.id).toBe(true);
      expect(isPracticeReadyQuestion(q), q.id).toBe(true);
      expect(q.sourcePdfUrl).toMatch(/kentei\.javada\.or\.jp\/pdf\/R07-1-B59-.*#page=[2-8]$/);
      expect(q.sourceAnswerUrl).toContain("%E6%AD%A3%E8%A7%A3%E8%A1%A8");
      expect(q.examDate).toBe("2025-09-07");
      expect(questionSourceEdition(q)).toBe("2025年度前期（2025年9月7日実施）");
      expect(shuffleChoices(q)).toBe(q);
      count += Object.keys(q.choices ?? {}).length;
    }
    expect(count).toBe(150);
  });

  it("印刷ラベル・全50問の個別URLを保持する", () => {
    expect(keys.map(key => choiceDisplayLabel("kyoka-plastic2", key))).toEqual(labels);
    expect(usesNumberedChoices("kyoka-plastic2")).toBe(true);
    expect(questions[0].choices).toEqual({ ア: "正しい（○）", イ: "誤り（×）" });
    expect(new Set(questions.map(questionPagePath)).size).toBe(50);
    for (const q of questions) {
      const [, , exam, yearSeason, section, qnum] = questionPagePath(q).split("/");
      expect(findQuestionByRoute(questions, { exam, yearSeason, section, qnum })?.id, q.id).toBe(q.id);
    }
  });

  it("一覧・同期/遅延読込・分野別練習を50問へ接続する", async () => {
    expect(QUESTIONS_BY_EXAM["kyoka-plastic2"]).toEqual(questions);
    expect(await getQuestionsForExam("kyoka-plastic2")).toEqual(questions);
    expect(getQualificationByExamCode("kyoka-plastic2")?.status).toBe("live");
    expect(getExamQuestionCount("kyoka-plastic2")).toBe(50);
    const config = EXAM_CONFIGS["kyoka-plastic2"];
    expect(config.nameFull).toBe("技能検定 2級強化プラスチック成形（手積み積層成形作業）学科試験");
    expect(getQualificationByExamCode("kyoka-plastic2")?.fullName).toBe(config.nameFull);
    expect(config.sessions[0].expectedQuestions).toBe(50);
    expect(config.seasons).toEqual(["early"]);
    expect(config.sessions[0].categories).toHaveLength(8);
    expect(new Set(config.sessions[0].categories)).toEqual(new Set(questions.map(q => q.category)));
    for (const category of config.sessions[0].categories) {
      expect(filterQuestions(questions, { exam: "kyoka-plastic2", category, mode: "random" }).length).toBeGreaterThan(0);
    }
  });

  it("原図・単位・表・否定条件と出典ページを保持する", () => {
    expect(questions.filter(q => q.hasImage).map(q => q.officialQuestionLabel)).toEqual(["A群 5", "B群 20"]);
    for (const q of questions.filter(q => q.hasImage)) {
      expect(q.imageUrls).toHaveLength(1);
      expect(q.imageAltTexts?.[0].length).toBeGreaterThan(20);
      const png = readFileSync(join(process.cwd(), "public", q.imageUrls![0]));
      expect(png.subarray(0, 8).toString("hex")).toBe("89504e470d0a1a0a");
    }
    expect(questions[9].question).toContain("揺変剤");
    expect(questions[16].question).toContain("巻きつけた後");
    expect(questions[28].question).toContain("GYZ J 934-1");
    expect(questions[29].choices?.イ).toBe("ビニルエステル樹脂：EP");
    expect(questions[38].choices?.イ).toBe("40±5(wt.%)");
    expect(questions[44].choices).toEqual({ ア: "図イ", イ: "図ロ", ウ: "図ハ", エ: "図ニ" });
    expect(questions[47].choices?.イ).toBe("0.3〜0.7Pa・s");
    expect(questions[49].choices?.イ).toBe("Rは、平均値を表す。");
    expect(sources.review).toHaveLength(50);
    expect(sources.sources.map(s => s.pages)).toEqual([8, 1]);
    expect(sources.figureCount).toBe(2);
    for (const [index, entry] of sources.review.entries()) {
      expect(entry.officialAnswer).toBe(questions[index].officialAnswerNumber);
      expect(entry.internalAnswer).toBe(questions[index].answer);
      expect(entry.pdfPage).toBe(Number(questions[index].sourcePdfUrl!.split("#page=")[1]));
    }
  });

  it("構造化データで接合図の公式ラベルと出題機関を保持する", () => {
    const q = questions[44];
    const resource = buildQuestionJsonLd({ question: q, pageUrlAbs: `https://www.kakomon-ai.jp${questionPagePath(q)}`, title: "強化プラスチック成形技能士2級 B群20" })["@graph"][0];
    if (!("hasPart" in resource) || !("acceptedAnswer" in resource.hasPart)) throw new Error("Missing accepted answer");
    expect(resource.hasPart.author.name).toBe("中央職業能力開発協会");
    expect(resource.hasPart.acceptedAnswer).toMatchObject({ text: "ハ: 図ハ" });
  });
});
