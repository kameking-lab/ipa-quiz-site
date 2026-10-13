import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { getAllEssayQuestions } from "@/lib/essay/load";

const source = readFileSync(join(process.cwd(), "components/essay/EssayResultView.tsx"), "utf8");

describe("historical essay result guidance", () => {
  it("retains the historical weak-axis and reference-score display", () => {
    expect(source).toContain("weakestAxis");
    expect(source).toContain("参考評価");
    expect(getAllEssayQuestions()).toHaveLength(12);
  });

  it("links to official IPA past papers without suggesting another original problem", () => {
    expect(source).toContain('href="/essay"');
    expect(source).toContain("IPA 公式の午後II過去問を見る");
    expect(source).not.toContain("getEssayQuestionsByExam(question.exam)");
    expect(source).not.toContain("/essay/${q.exam}/${q.id}");
  });
});
