import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import { join } from "node:path";

import { findEssayQuestion, getEssayQuestionsByExam } from "@/lib/essay/load";

// 強み1: 採点根拠データの構造化。汎用LLMはIPA午後の正確な配点を知らない。
// 過去問AIは各小問に「必須キーワード（部分点の核）」「採点の勘所」を構造化付与し、
// 採点AIがそれを参照することで根拠ある採点を行う。まず1区分(PM)で型を確立。

describe("採点根拠データの型 — PM で確立（強み1）", () => {
  it("pm-2024a-pm2-q1 の全小問に requiredKeywords と scoringPoints が付与されている", () => {
    const q = findEssayQuestion("pm-2024a-pm2-q1");
    expect(q, "型を確立した PM 設問が存在する").toBeTruthy();
    expect(q!.subPrompts.length).toBe(3);
    for (const sub of q!.subPrompts) {
      expect(
        sub.requiredKeywords?.length ?? 0,
        `設問${sub.key} の必須キーワード`,
      ).toBeGreaterThan(0);
      expect(
        sub.scoringPoints?.length ?? 0,
        `設問${sub.key} の採点の勘所`,
      ).toBeGreaterThan(0);
    }
  });

  it.each(["st", "sa", "sm"] as const)(
    "%s の全設問・全小問に rubric が付与されている（横展開）",
    (exam) => {
      const questions = getEssayQuestionsByExam(exam);
      expect(questions.length, `${exam} 設問が存在する`).toBeGreaterThan(0);
      for (const q of questions) {
        for (const sub of q.subPrompts) {
          expect(
            sub.requiredKeywords?.length ?? 0,
            `${q.id} 設問${sub.key} の必須キーワード`,
          ).toBeGreaterThan(0);
          expect(
            sub.scoringPoints?.length ?? 0,
            `${q.id} 設問${sub.key} の採点の勘所`,
          ).toBeGreaterThan(0);
        }
      }
    },
  );

  it("型は任意フィールド＝横展開可能（未付与の設問もそのまま有効にロードできる）", () => {
    // 全論文区分の全設問がロードでき、rubric 未付与でも壊れない。
    const exams = ["st", "sa", "pm", "sm", "au"] as const;
    let withoutRubric = 0;
    let total = 0;
    for (const exam of exams) {
      for (const q of getEssayQuestionsByExam(exam)) {
        for (const sub of q.subPrompts) {
          total++;
          if (!sub.requiredKeywords) withoutRubric++;
        }
      }
    }
    expect(total).toBeGreaterThan(0);
    // 型は段階展開＝まだ rubric 未付与の設問が残っている（横展開の余地）。
    expect(withoutRubric).toBeGreaterThan(0);
  });
});

describe("採点AIが採点根拠データを参照する（buildUserPrompt + プロンプト）", () => {
  const source = readFileSync(
    join(process.cwd(), "app/api/essay-grade/route.ts"),
    "utf8",
  );

  it("buildUserPrompt は requiredKeywords/scoringPoints を採点入力に渡す", () => {
    expect(source).toContain("必須キーワード（部分点の核）");
    expect(source).toContain("採点の勘所");
    expect(source).toMatch(/sub\.requiredKeywords/);
    expect(source).toMatch(/sub\.scoringPoints/);
  });

  it("採点指針が必須キーワードを部分点の核として使うよう指示する", () => {
    expect(source).toMatch(/必須キーワード（部分点の核）.*部分点判定の核/s);
    expect(source).toContain("missingElements に必ず挙げる");
  });
});
