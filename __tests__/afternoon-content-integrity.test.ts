import { describe, expect, it } from "vitest";
import { getAfternoonQuestions, findAfternoonQuestion } from "@/lib/afternoon/load";
import { getAllEssayQuestions } from "@/lib/essay/load";
import { getSCpm2Questions, getEssayQuestionsByExam, ESSAY_EXAM_CODES } from "@/lib/essays/load";

const questions = (["ap", "fe", "st", "sa", "pm", "sm", "au", "nw", "db", "es", "sc"] as const).flatMap(getAfternoonQuestions);

describe("独自午後教材の解答条件", () => {
  it("業種別の全144答案を保持し、実際の設問の字数条件を満たす", () => {
    const all = ESSAY_EXAM_CODES.flatMap(getEssayQuestionsByExam);
    expect(all).toHaveLength(18);
    expect(all.flatMap(q => q.industries)).toHaveLength(144);
    for (const q of all) {
      const parent = findAfternoonQuestion(q.id);
      for (const a of q.industries) {
        const parts = [a.intro, a.body, a.conclusion];
        for (const [i, part] of parts.entries()) {
          const condition = parent?.subQuestions[i];
          const fallbackMax = [800, 1600, 600][i]!;
          expect(part.length, `${q.id}/${a.industryId}/${i}`).toBeGreaterThanOrEqual(condition?.minLength ?? 0);
          expect(part.length, `${q.id}/${a.industryId}/${i}`).toBeLessThanOrEqual(condition?.maxLength ?? fallbackMax);
        }
      }
    }
  });
  it("SCの全24業種答案は各設問の上限内で読める", () => {
    const sc = getSCpm2Questions();
    expect(sc).toHaveLength(3);
    for (const q of sc) {
      expect(q.industries).toHaveLength(8);
      expect(q.license).toBe("original");
      for (const a of q.industries) {
        expect(a.intro.length, `${q.id}/${a.industryId}/ア`).toBeLessThanOrEqual(800);
        expect(a.body.length, `${q.id}/${a.industryId}/イ`).toBeLessThanOrEqual(1600);
        expect(a.conclusion.length, `${q.id}/${a.industryId}/ウ`).toBeLessThanOrEqual(600);
      }
    }
  });
  it("全23大問を保持し、2回答は個別欄へ分ける", () => {
    expect(questions).toHaveLength(23);
    expect(questions.flatMap(q => q.subQuestions)).toHaveLength(83);
    const es = findAfternoonQuestion("es-2024h-pm1-q1")!;
    expect(es.subQuestions.filter(s => s.label.startsWith("設問4"))).toHaveLength(2);
    expect(es.subQuestions.reduce((sum, s) => sum + (s.points ?? 0), 0)).toBe(100);
  });

  for (const q of questions) {
    for (const s of q.subQuestions) {
      it(`${q.id} ${s.label}: 解答が本文と入力欄の字数条件を満たす`, () => {
        expect(s.modelAnswer.length).toBeGreaterThanOrEqual(s.minLength ?? 0);
        expect(s.modelAnswer.length).toBeLessThanOrEqual(s.maxLength ?? Infinity);
        const prompt = s.prompt.replaceAll(",", "");
        const max = prompt.match(/(\d+)字以内/);
        const min = prompt.match(/(\d+)字以上/);
        if (max) expect(s.maxLength).toBe(Number(max[1]));
        if (min) expect(s.minLength).toBe(Number(min[1]));
        if (s.label === "設問ア" && !min) expect(s.minLength ?? 0).toBe(0);
      });
    }
  }

  it("独自論文12題は独自の評価観点を持ち、公式講評と称さない", () => {
    const essays = getAllEssayQuestions();
    expect(essays).toHaveLength(12);
    for (const q of essays) {
      expect(q.license).toBe("original");
      expect(q.editorialReview.length).toBeGreaterThan(0);
      expect(q).not.toHaveProperty("officialReview");
    }
  });
});
