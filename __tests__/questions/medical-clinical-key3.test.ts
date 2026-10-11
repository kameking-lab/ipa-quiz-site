import { describe, expect, it } from "vitest";
import { RIGAKU_RYOHOUSHI_QUESTIONS } from "@/data/questions/rigaku-ryohoshi";
import { SAGYO_RYOHOSHI_QUESTIONS } from "@/data/questions/sagyo-ryohoshi";
import { isAcceptedAnswer, isCompleteSelectionCorrect, requiredSelectionCount } from "@/lib/questions/answers";
import { getQuestionsForExam } from "@/lib/questions/get-questions";
import type { ExamCode, Question } from "@/lib/questions/types";

const cases = [
  {
    id: "rigaku-ryohoshi-2026-annual-pm-q30",
    exam: "rigaku-ryohoshi",
    stem: "フレイルの判定に用いる基本チェックリストで正しいのはどれか。",
    choices: ["経済状況を含む。", "指輪っかテストを含む。", "反復唾液嚥下テストを含む。", "対象者に対面せず評価できる。", "二次予防事業対象者を選定する。"],
    official: "45",
    accepted: ["エ", "オ"],
  },
  {
    id: "rigaku-ryohoshi-2026-annual-pm-q75",
    exam: "rigaku-ryohoshi",
    stem: "ショックの症状はどれか。",
    choices: ["血圧上昇", "呼吸促迫", "徐　脈", "多　尿", "皮膚紅潮"],
    official: "23",
    accepted: ["イ", "ウ"],
  },
  {
    id: "sagyo-ryohoshi-2024-annual-pm-q27",
    exam: "sagyo-ryohoshi",
    stem: "MTDLPでインテーク面接が終了し、対象者の望む生活の把握ができた。次の段階で用いるのはどれか。",
    choices: ["生活行為申し送り表", "生活行為課題分析シート", "生活行為聞き取りシート", "興味・関心チェックシート", "生活行為向上マネジメントシート"],
    official: "25",
    accepted: ["イ", "オ"],
  },
] as const;

const keys = ["ア", "イ", "ウ", "エ", "オ"] as const;
const all = [...RIGAKU_RYOHOUSHI_QUESTIONS, ...SAGYO_RYOHOSHI_QUESTIONS];

describe("three medical originals with alternative single answers", () => {
  it("loads each exact ID once through its exam loader and preserves unknown-exam fallback", async () => {
    for (const spec of cases) {
      const registered = all.filter(question => question.id === spec.id);
      expect(registered, spec.id).toHaveLength(1);
      const loaded = await getQuestionsForExam(spec.exam);
      expect(loaded.filter(question => question.id === spec.id), spec.id).toHaveLength(1);
    }
    expect(await getQuestionsForExam("xx" as ExamCode)).toEqual([]);
  });

  it.each(cases)("keeps original text, five explained choices, and single-choice alternative grading: $id", spec => {
    const question = all.find(row => row.id === spec.id) as Question;
    expect(question).toBeDefined();
    expect(question.exam).toBe(spec.exam);
    expect(question.type).toBe("multiple-choice");
    expect(question.question).toBe(spec.stem);
    expect(keys.map(key => question.choices?.[key])).toEqual(spec.choices);
    expect(keys.every(key => Boolean(question.choiceExplanations?.[key]?.trim()))).toBe(true);
    expect(question.explanation.trim()).not.toBe("");
    expect(question.officialAnswerNumber).toBe(spec.official);
    expect(question.requiredSelections).toBe(1);
    expect(requiredSelectionCount(question)).toBe(1);
    expect(question.answer).toEqual(spec.accepted);
    expect(question.hasImage).toBe(false);
    expect(question.needsReview).toBe(false);
    expect(question.sourcePdfUrl).toMatch(/^https:\/\/www\.mhlw\.go\.jp\//);
    expect(question.sourceAnswerUrl).toMatch(/^https:\/\/www\.mhlw\.go\.jp\//);

    for (const key of keys) {
      const expected = spec.accepted.includes(key as never);
      expect(isAcceptedAnswer(question.answer, key), `${spec.id} ${key}`).toBe(expected);
      expect(isCompleteSelectionCorrect(question.answer, [key], question.requiredSelections), `${spec.id} [${key}]`).toBe(expected);
    }
    expect(isCompleteSelectionCorrect(question.answer, [...spec.accepted], question.requiredSelections)).toBe(false);
  });
});
