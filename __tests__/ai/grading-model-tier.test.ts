import { afterEach, describe, expect, it, vi } from "vitest";
import { readFileSync } from "node:fs";
import { join } from "node:path";

import { resolveModel } from "@/lib/ai/provider";

// 強み2: 午後記述・論述の AI 採点だけ上位モデルを使う。汎用LLMに勝つため
// 採点品質を優先し、四択/コパイロット/類題生成は free(flash-lite) のまま。
// resolve("grading") を新設し、採点2ルートだけがそれを使うことをガードする。

afterEach(() => {
  vi.unstubAllEnvs();
});

describe("resolveModel — grading 層（採点専用の上位モデル）", () => {
  it("grading の既定は安全側の flash（env 未設定で pro に上がらない）", () => {
    // 既定を pro にすると env の設定漏れ・消失が単価 4 倍の暴走になり、かつ
    // scoring の maxTokens 1500 では pro が採点 JSON を返しきれず、課金だけ
    // 発生して中身は簡易採点に落ちる（Preview 実測）。既定は必ず安全側。
    vi.unstubAllEnvs();
    expect(resolveModel("grading")).toBe("gemini-2.5-flash");
  });

  it("grading は GEMINI_MODEL_GRADING で上書きできる（本番値は運用側設定）", () => {
    vi.stubEnv("GEMINI_MODEL_GRADING", "gemini-3.0-pro");
    expect(resolveModel("grading")).toBe("gemini-3.0-pro");
  });

  it("free/premium は従来どおり（採点以外のコスト効率を維持）", () => {
    vi.unstubAllEnvs();
    expect(resolveModel("free")).toBe("gemini-2.5-flash-lite");
    expect(resolveModel("premium")).toBe("gemini-2.5-flash");
  });

  it("grading は free より上位（flash-lite と別物）", () => {
    vi.unstubAllEnvs();
    expect(resolveModel("grading")).not.toBe(resolveModel("free"));
  });

  it("運用側が env で pro を明示すれば pro を使える（上位モデルの道は残す）", () => {
    vi.stubEnv("GEMINI_MODEL_GRADING", "gemini-2.5-pro");
    expect(resolveModel("grading")).toBe("gemini-2.5-pro");
  });
});

describe("採点ルートだけが grading 層を使う（用途別の使い分け）", () => {
  const read = (p: string) => readFileSync(join(process.cwd(), p), "utf8");

  it("essay-grade（論文採点）は resolveModel('grading') を使う", () => {
    expect(read("app/api/essay-grade/route.ts")).toMatch(
      /resolveModel\("grading"\)/,
    );
  });

  it("scoring（午後記述採点）は resolveModel('grading') を使う", () => {
    expect(read("app/api/scoring/route.ts")).toMatch(/resolveModel\("grading"\)/);
  });

  it("copilot / generate-question は free のまま（採点以外で上位モデルを浪費しない）", () => {
    expect(read("app/api/copilot/route.ts")).toMatch(/resolveModel\("free"\)/);
    expect(read("app/api/copilot/route.ts")).not.toMatch(
      /resolveModel\("grading"\)/,
    );
    expect(read("app/api/generate-question/route.ts")).toMatch(
      /resolveModel\("free"\)/,
    );
    expect(read("app/api/generate-question/route.ts")).not.toMatch(
      /resolveModel\("grading"\)/,
    );
  });
});
