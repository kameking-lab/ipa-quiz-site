import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import { join } from "node:path";

import { costJpy, tierForModel } from "@/lib/ai/cost-tracker";
import { resolveModel } from "@/lib/ai/provider";

/**
 * 単価表と課金層導出の契約テスト（ブロッカー3）。
 *
 * 背景: 単価表に flash / flash-lite しか無く、午後採点が resolveModel("grading")
 * = gemini-2.5-pro を使うようになった後も、各ルートは tier: "flash-lite" を
 * 手書きしていた。pro の出力単価は flash-lite の 25 倍なので、§0 の月間
 * ¥50,000 上限が実支出のごく一部しか見ないまま素通りする状態だった。
 *
 * ここで固定する契約:
 *  1. pro の単価行が存在し、flash / flash-lite より高い
 *  2. 課金層はモデル ID から導出される（手書き禁止）
 *  3. env 未設定時の grading 既定は安全側（pro に上がらない）／env 明示なら pro を使える
 *  4. 未知モデルは最上位単価にフォールバックする（過小計上させない）
 *  5. recordAiCost を呼ぶ全ルートが tier を手書きしていない
 */

describe("tierForModel — モデル ID から課金層を導出", () => {
  it("Gemini 2.5 の 3 モデルをそれぞれの層に割り当てる", () => {
    expect(tierForModel("gemini-2.5-pro")).toBe("pro");
    expect(tierForModel("gemini-2.5-flash")).toBe("flash");
    // "flash-lite" は "flash" を含む。判定順が逆だと flash 層に落ちて 3 倍過大になる。
    expect(tierForModel("gemini-2.5-flash-lite")).toBe("flash-lite");
  });

  it("未知モデル・未定義は最上位単価(pro)にフォールバックする", () => {
    // 過小計上（＝上限を素通り）だけは起こしてはならない。
    expect(tierForModel("gemini-9.9-unknown")).toBe("pro");
    expect(tierForModel(undefined)).toBe("pro");
    expect(tierForModel("")).toBe("pro");
  });

  it("GEMINI_MODEL_GRADING 未設定なら既定は安全側で、pro 層へは上がらない", () => {
    // 既定を pro にしていると、env の設定漏れ・消失がそのまま単価 4 倍の暴走になる。
    // さらに scoring の maxTokens 1500 では pro が採点 JSON を返しきれず、
    // 課金だけ発生して中身は簡易採点に落ちる（Preview 実測）。
    // 既定が pro に戻ったらここが落ちる。
    const prev = process.env.GEMINI_MODEL_GRADING;
    delete process.env.GEMINI_MODEL_GRADING;
    try {
      expect(resolveModel("grading")).toBe("gemini-2.5-flash");
      expect(tierForModel(resolveModel("grading"))).not.toBe("pro");
    } finally {
      if (prev !== undefined) process.env.GEMINI_MODEL_GRADING = prev;
    }
  });

  it("GEMINI_MODEL_GRADING で pro を明示すれば pro 層で計上される", () => {
    // 既定を下げても「運用側が明示すれば上位モデルを使える」形は維持する。
    const prev = process.env.GEMINI_MODEL_GRADING;
    process.env.GEMINI_MODEL_GRADING = "gemini-2.5-pro";
    try {
      expect(resolveModel("grading")).toBe("gemini-2.5-pro");
      expect(tierForModel(resolveModel("grading"))).toBe("pro");
    } finally {
      if (prev === undefined) delete process.env.GEMINI_MODEL_GRADING;
      else process.env.GEMINI_MODEL_GRADING = prev;
    }
  });

  it("resolveModel('free') の実戻り値は flash-lite 層のまま", () => {
    const prev = process.env.GEMINI_MODEL_FREE;
    delete process.env.GEMINI_MODEL_FREE;
    try {
      expect(tierForModel(resolveModel("free"))).toBe("flash-lite");
    } finally {
      if (prev !== undefined) process.env.GEMINI_MODEL_FREE = prev;
    }
  });
});

describe("単価表 — pro 行の存在", () => {
  it("pro の単価行があり、同一トークン数で flash / flash-lite より高い", () => {
    const pro = costJpy("pro", 1_000_000, 1_000_000);
    const flash = costJpy("flash", 1_000_000, 1_000_000);
    const lite = costJpy("flash-lite", 1_000_000, 1_000_000);
    // pro 行が無い（= 型エラー）か 0 単価だと、この不等式が崩れる。
    expect(pro).toBeGreaterThan(flash);
    expect(flash).toBeGreaterThan(lite);
    expect(pro).toBeGreaterThan(0);
  });

  it("pro の出力単価は flash-lite の 25 倍（過小計上の実害規模を固定）", () => {
    // 出力のみで比較（$10.00 vs $0.40 = 25 倍）。
    expect(costJpy("pro", 0, 1_000_000) / costJpy("flash-lite", 0, 1_000_000)).toBeCloseTo(25, 5);
  });
});

describe("全 AI ルートが課金層を手書きしていない", () => {
  const ROUTES = [
    "app/api/copilot/route.ts",
    "app/api/essay-grade/route.ts",
    "app/api/generate-question/route.ts",
    "app/api/scoring/route.ts",
  ];

  it.each(ROUTES)("%s は tier をリテラルで書かず tierForModel(model) を使う", (rel) => {
    const src = readFileSync(join(process.cwd(), rel), "utf-8");
    // recordAiCost を呼ぶ以上、層はモデルから導出されていなければならない。
    expect(src).toContain("recordAiCost");
    expect(src).toContain("tierForModel(model)");
    // tier: "flash-lite" 等のリテラル手書きが復活したら落ちる。
    expect(src).not.toMatch(/tier:\s*"(pro|flash|flash-lite)"/);
  });
});
