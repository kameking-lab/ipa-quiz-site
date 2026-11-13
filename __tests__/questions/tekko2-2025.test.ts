import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { TEKKO2_QUESTIONS as allQuestions } from "@/data/questions/tekko2";
import { QUESTIONS_BY_EXAM } from "@/data/questions";
import { getQuestionsForExam } from "@/lib/questions/get-questions";
import { choiceDisplayLabel, questionNumberLabel, usesNumberedChoices } from "@/lib/questions/display";
import { isPracticeReadyQuestion } from "@/lib/questions/filter";
import { findQuestionByRoute, questionPagePath } from "@/lib/seo/question-url";
import { questionSourceEdition } from "@/lib/questions/source-label";
import { getQualificationByExamCode } from "@/lib/qualifications/catalog";
import { EXAM_CONFIGS } from "@/lib/exam-config";
import type { ChoiceKey } from "@/lib/questions/types";

// 公式正答PDF（2025/08/31、鉄工／製缶作業【2級】）の各5問の枠から転記。
const trueFalse = ["○○○○○", "○××○×", "○○××○", "○×○○○", "○××××"].join("").split("");
const multipleChoice = ["ロロハロロ", "ニニロイニ", "ニニハハニ", "ロロロニニ", "ニハイイハ"].join("").split("");
const internalKeys: ChoiceKey[] = ["ア", "イ", "ウ", "エ"];
const printedLabels = ["イ", "ロ", "ハ", "ニ"];

const questions = allQuestions.filter(q => q.year === 2025 && q.season === "early");

describe("鉄工技能士2級 製缶作業 2025年度前期", () => {
  it("公式50正答を内部キーに対応させ、全150肢に独自解説を持つ", () => {
    expect(questions).toHaveLength(50);
    expect(new Set(questions.map(q => q.id)).size).toBe(50);
    let count = 0;
    for (const [index, q] of questions.entries()) {
      const a = index < 25;
      const n = index % 25 + 1;
      const official = (a ? trueFalse : multipleChoice)[n - 1];
      expect(q.qNumber, q.id).toBe(index + 1);
      expect(questionNumberLabel(q)).toBe(`${a ? "A" : "B"}群 ${n}`);
      expect(q.officialAnswerNumber, q.id).toBe(official);
      expect(q.answer, q.id).toBe(a ? (official === "○" ? "ア" : "イ") : internalKeys[printedLabels.indexOf(official)]);
      expect(Object.keys(q.choices ?? {})).toHaveLength(a ? 2 : 4);
      expect(Object.keys(q.choiceExplanations ?? {})).toEqual(Object.keys(q.choices ?? {}));
      expect(Object.values(q.choiceExplanations ?? {}).every(reason => reason!.length > 20), q.id).toBe(true);
      expect(isPracticeReadyQuestion(q), q.id).toBe(true);
      expect(q.sourcePdfUrl).toMatch(/kentei\.javada\.or\.jp\/pdf\/R07-1-B22-.*#page=[2-8]$/);
      expect(q.sourceAnswerUrl).toContain("%E6%AD%A3%E8%A7%A3%E8%A1%A8");
      expect(questionSourceEdition(q)).toBe("2025年度前期（2025年8月31日実施）");
      count += Object.keys(q.choices ?? {}).length;
    }
    expect(count).toBe(150);
  });

  it("原本のイロハニ表示と50件の一意なURLから問題を復元できる", () => {
    expect(internalKeys.map(key => choiceDisplayLabel("tekko2", key))).toEqual(printedLabels);
    expect(usesNumberedChoices("tekko2")).toBe(true);
    expect(questions[0].choices).toEqual({ ア: "正しい（○）", イ: "誤り（×）" });
    expect(new Set(questions.map(questionPagePath)).size).toBe(50);
    for (const q of questions) {
      const [, , exam, yearSeason, section, qnum] = questionPagePath(q).split("/");
      expect(findQuestionByRoute(questions, { exam, yearSeason, section, qnum })?.id, q.id).toBe(q.id);
    }
  });

  it("一覧・同期ローダー・遅延ローダーに全50問と分野が接続される", async () => {
    expect(QUESTIONS_BY_EXAM.tekko2!.filter(q => q.year === 2025 && q.season === "early")).toEqual(questions);
    expect((await getQuestionsForExam("tekko2")).filter(q => q.year === 2025 && q.season === "early")).toEqual(questions);
    expect(getQualificationByExamCode("tekko2")?.status).toBe("live");
    const config = EXAM_CONFIGS.tekko2;
    expect(config.sessions[0].expectedQuestions).toBe(50);
    expect(config.seasons).toEqual(expect.arrayContaining(["early"]));
    expect(config.sessions[0].categories).toEqual(expect.arrayContaining([...new Set(questions.map(q => q.category))]));
  });

  it("問題の解答に必要な原図5点を保持し、代替文で解答を漏らさない", () => {
    const figures = questions.filter(q => q.hasImage);
    expect(figures.map(q => q.officialQuestionLabel)).toEqual(["A群 5", "A群 13", "A群 17", "B群 17", "B群 22"]);
    for (const q of figures) {
      expect(q.imageUrls).toHaveLength(1);
      expect(q.imageAltTexts).toHaveLength(1);
      const png = readFileSync(join(process.cwd(), "public", q.imageUrls![0]));
      expect(png.subarray(0, 8).toString("hex")).toBe("89504e470d0a1a0a");
      expect(png.readUInt32BE(16)).toBeGreaterThan(300);
      expect(png.readUInt32BE(20)).toBeGreaterThan(200);
      expect(q.imageAltTexts![0]).not.toMatch(/974|収まらない|不一致|正解/);
    }
  });

  it("板取り・中立面の計算と、法改正前の公式正答を区別する", () => {
    const nesting = questions[41]; // B17
    expect(nesting.answer).toBe("イ");
    expect(nesting.choices?.イ).toBe("800×1000mm");
    expect(nesting.choiceExplanations?.ア).toContain("790,000");
    const developed = questions[46]; // B22
    expect(developed.answer).toBe("ウ");
    expect(developed.choices?.ウ).toBe("974mm");
    expect(developed.explanation).toContain("290＋80＋290");
    expect(developed.explanation).toContain("90＋10＝100");
    const pressure = questions[49]; // B25: 現行の1.3倍へ採点を変えない
    expect(pressure.officialAnswerNumber).toBe("ハ");
    expect(pressure.answer).toBe("ウ");
    expect(pressure.choices?.ウ).toBe("1.5倍");
    expect(pressure.lawReferenceDate).toBe("2025-08-31");
    expect(pressure.explanation).toContain("2026年4月1日");
    expect(pressure.explanation).toContain("1.3倍");
    expect(pressure.officialReferenceUrls).toContain("https://www.mhlw.go.jp/web/t_doc?dataId=00tc9709&dataType=1");
  });
});
