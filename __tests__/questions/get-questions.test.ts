import { describe, it, expect } from "vitest";
import {
  getQuestionsForExam,
  getAllQuestionsLazy,
  getRegisteredExamCodes,
  getQuestionCountsByExam,
} from "@/lib/questions/get-questions";
import type { ExamCode } from "@/lib/questions/types";

/**
 * questions/get-questions.ts は試験ごとに遅延ロードする問題データの入口。
 * 「登録済み試験はその試験の問題のみ返す」「未登録コードは空配列フォールバック」
 * 「getAllQuestionsLazy は全チャンクを平坦化し、件数は per-exam 合計と一致する」
 * という契約に依存する。崩れるとクイズ母集団の欠落・重複・形状崩れが起きる。
 */
describe("getQuestionsForExam", () => {
  it("ap は非空で、全問が exam=ap である", async () => {
    const qs = await getQuestionsForExam("ap");
    expect(qs.length).toBeGreaterThan(0);
    expect(qs.every((q) => q.exam === "ap")).toBe(true);
  });

  it("未登録コードは空配列にフォールバックする", async () => {
    const qs = await getQuestionsForExam("xx" as ExamCode);
    expect(qs).toEqual([]);
  });
});

describe("getRegisteredExamCodes", () => {
  it("登録済み試験コードを列挙する（全 13 区分）", () => {
    const codes = getRegisteredExamCodes();
    expect(codes).toContain("ap");
    expect(codes).toContain("ip");
    expect(codes.length).toBe(13);
    // 重複なし
    expect(new Set(codes).size).toBe(codes.length);
  });
});

describe("getAllQuestionsLazy / getQuestionCountsByExam の整合", () => {
  it("getAllQuestionsLazy は平坦化された Question[] を返す（配列の配列ではない）", async () => {
    const all = await getAllQuestionsLazy();
    expect(all.length).toBeGreaterThan(0);
    // 平坦化されていれば各要素は id を持つ Question
    expect(typeof all[0].id).toBe("string");
    expect(Array.isArray(all[0])).toBe(false);
  });

  it("全件数は per-exam 件数の合計と一致する（保存則）", async () => {
    const [all, counts] = await Promise.all([
      getAllQuestionsLazy(),
      getQuestionCountsByExam(),
    ]);
    const sum = Object.values(counts).reduce((a, b) => a + (b ?? 0), 0);
    expect(all.length).toBe(sum);
  });

  it("件数マップは登録済みコードを網羅し、各件数は正である", async () => {
    const counts = await getQuestionCountsByExam();
    const codes = getRegisteredExamCodes();
    expect(Object.keys(counts).sort()).toEqual([...codes].sort());
    for (const code of codes) {
      expect(counts[code]).toBeGreaterThan(0);
    }
  });
});
