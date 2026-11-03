import { describe, expect, it } from "vitest";
import { loadExamPaper } from "@/lib/exam-library-papers";
import { EXAM_CATALOG } from "@/lib/exam-library-catalog";
import { isScorableQuestion, gradeExamAnswer } from "@/lib/exam-library-model";
import keys from "@/data/exam-library/reviewed-answer-keys.json";

describe("source-reviewed safety repairs", () => {
  it("grades all 360 visually reviewed vector-mark answers against the exact source manifest", () => {
    expect(keys).toHaveLength(18);
    for (const source of keys) {
      const catalog = EXAM_CATALOG.find((p) => p.id === source.paperId)!;
      const questions = loadExamPaper(source.paperId)!;
      expect(catalog.pdfUrl).toBe(source.pdfUrl);
      expect(catalog.answerMode).toBe("official-choice");
      expect(catalog.scoredCount).toBe(20);
      expect(questions).toHaveLength(20);
      expect(questions.map((q) => q.correctChoice)).toEqual(source.answers);
      for (const [i, q] of questions.entries()) {
        expect(q.sourcePages).toContain(source.pages[i]);
        expect(isScorableQuestion(q)).toBe(true);
        expect(gradeExamAnswer(q, source.answers[i]!)).toBe("correct");
        expect(gradeExamAnswer(q, source.answers[i]! % 5 + 1)).toBe("incorrect");
      }
    }
  });

  it("aligns the nine replaced explanation conclusions with the official choice", () => {
    const expected = {
      "emkohyo-EM20261801-q12": 4, "emkohyo-20260217-q1": 5,
      "emkohyo-EM20261802-q1": 4, "emkohyo-EM20261802-q13": 2,
      "emkohyo-20260217-2-q20": 1, "emkohyo-20260217-3-q14": 4,
      "emkohyo-EM20261806-q8": 3, "emkohyo-EM20261806-q10": 1,
      "emkohyo-EM20251806-q12": 4,
    };
    for (const [id, answer] of Object.entries(expected)) {
      const q = loadExamPaper(id.replace(/-q\d+$/, ""))!.find((q) => q.id === id)!;
      expect(q.correctChoice).toBe(answer);
      expect(q.explanation).toMatch(new RegExp(`^公式正答は（${answer}）です。`));
      expect(q.explanation!.length).toBeGreaterThanOrEqual(120);
      expect(q.explanation).not.toMatch(/解説準備中|TODO|TBD/);
      expect(q.explanation).not.toContain("https://www.exam.or.jp/");
    }
  });

  it("retains necessary blank instructions, exponents and source-only diagrams", () => {
    const get = (paper: string, number: number) => loadExamPaper(paper)!.find((q) => q.number === number)!.presentation!;
    for (const [paper, number] of [["lckohyo-LC20260403", 33], ["lckohyo-LC20252104", 37], ["lckohyo-LC20260410-1", 13]] as const) {
      expect(get(paper, number).prompt).toMatch(/内に入れる.*組合せ/);
    }
    expect(get("emkohyo-20260217", 12).prompt).toBe("局所振動障害に関する次の記述のうち、誤っているものはどれか。");
    expect(get("cskohyo-CS20251904", 4).prompt).toContain("1×10¹² Ω");
    expect(get("emkohyo-EM20261801", 12).choices[1]!.text).toContain("aₓ²＋aᵧ²＋a_z²");
    const em15 = get("emkohyo-EM20261807", 15).figures;
    expect(em15.find((f) => f.src.endsWith("text-q15-p10-fig2.webp"))!.width).toBe(454);
    expect(em15.map((f) => f.alt)).toEqual(["問15・選択肢1の図表", "問15・選択肢2の図表", "問15・選択肢3の図表", "問15・選択肢5の図表"]);
    expect(get("emkohyo-20260217-4", 16).figures[0]!.height).toBe(390);
    expect(get("lckohyo-LC20260409-1", 34).figures.some((f) => f.src.endsWith("fig2.webp"))).toBe(false);
  });

  it("distinguishes additional damper loss from the requested total and supplies discharge rows", () => {
    const e = loadExamPaper("cskohyo-CS20251911")!.find((q) => q.number === 3)!.explanation!;
    expect(e).toContain("ΔPダンパー＝ΔP開放＋118 Pa");
    for (const row of ["9-10", "10-11", "11-12", "12-13", "13-0"]) expect(e).toContain(`| ${row} |`);
    expect(e).not.toContain("すなわちダンパー（14-15番地）の圧力損失（部分）は約118 Pa");
  });
});
