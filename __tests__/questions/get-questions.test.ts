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

  // EXAM_LOADERS は `key: () => import("@/data/questions/{key}")` の手書きマップで、
  // キーは Partial<Record<ExamCode>> 型で検証されるが **キーと import 先モジュールの
  // 対応は型で守れない**（コピペで loader sm が別区分の問題を import しても通る）。
  // その場合 getQuestionsForExam(code) が他区分の問題を静かに返し、クイズ母集団が
  // 区分を取り違える実害になる。ap 単体は上で pin 済だが、全登録区分について
  // 「ロードされた全問の exam がキーと一致」を回帰固定する。
  it("全登録区分でロードされた問題は exam フィールドがキーと一致する", async () => {
    for (const code of getRegisteredExamCodes()) {
      const qs = await getQuestionsForExam(code);
      expect(qs.length, `${code} は非空`).toBeGreaterThan(0);
      const mismatched = qs.filter((q) => q.exam !== code).map((q) => q.id);
      expect(mismatched, `${code} ローダが返した他区分の問題`).toEqual([]);
    }
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
