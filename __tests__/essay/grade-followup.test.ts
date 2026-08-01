import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import { join } from "node:path";

import { getEssayQuestionsByExam, findEssayQuestion } from "@/lib/essay/load";

// 強み4: 採点→弱点→次の練習の伴走。採点結果(EssayResultView)が最弱の評価軸を
// 言語化し、同区分の他の論述問題へ誘導する。汎用LLMの単発採点に対する連続性の堀。

const ESSAY_EXAMS = ["st", "sa", "pm", "sm", "au"] as const;

describe("EssayResultView — 採点後の弱点→次の練習 導線（強み4）", () => {
  const source = readFileSync(
    join(process.cwd(), "components/essay/EssayResultView.tsx"),
    "utf8",
  );

  it("最弱の評価軸を算出する weakestAxis を持つ", () => {
    expect(source).toContain("weakestAxis");
    expect(source).toContain("弱点を踏まえて次に取り組む");
  });

  it("同区分の他の論述問題を getEssayQuestionsByExam で提示する（自分は除外）", () => {
    expect(source).toContain("getEssayQuestionsByExam(question.exam)");
    expect(source).toMatch(/filter\(\(q\) => q\.id !== question\.id\)/);
    expect(source).toContain("/essay/${q.exam}/${q.id}");
  });
});

describe("採点後の次の論述リンクは実在する論述問題のみ（no 404）", () => {
  it("各論文区分の getEssayQuestionsByExam は findEssayQuestion で解決する", () => {
    let total = 0;
    for (const exam of ESSAY_EXAMS) {
      const qs = getEssayQuestionsByExam(exam);
      for (const q of qs) {
        // /essay/{exam}/{id} の行先が実在＝採点後の導線が 404 にならない
        expect(findEssayQuestion(q.id)?.id, `essay ${q.id}`).toBe(q.id);
        expect(q.exam).toBe(exam);
        total++;
      }
    }
    expect(total).toBeGreaterThan(0);
  });
});
