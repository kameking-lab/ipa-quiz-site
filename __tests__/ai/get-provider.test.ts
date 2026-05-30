import { describe, it, expect, beforeEach, afterEach } from "vitest";
import { getProvider, resolveModel } from "@/lib/ai/provider";

/**
 * provider.ts の getProvider/resolveModel は LLM 抽象レイヤの入口（§5）。
 * ここが守る契約は運用上クリティカル:
 *  - GEMINI_API_KEY 未設定なら自動で mock にフォールバック（キーなしでも UI/E2E
 *    が成立する§5 の前提）。
 *  - resolveModel のデフォルトモデル文字列（free=flash-lite / premium=flash）は
 *    §9/§10 で「デフォルトモデル変更＝承認必須」。誤って既定を書き換えると
 *    無料ユーザーが高コストモデルに流れる/逆に品質が落ちる。
 * 崩れると、キー未設定で本番 SDK を掴んで例外、あるいは既定モデルが静かに変わる。
 */

const ENV_KEYS = [
  "LLM_PROVIDER",
  "GEMINI_API_KEY",
  "GEMINI_MODEL_FREE",
  "GEMINI_MODEL_PREMIUM",
] as const;

let saved: Record<string, string | undefined>;

beforeEach(() => {
  saved = {};
  for (const k of ENV_KEYS) {
    saved[k] = process.env[k];
    delete process.env[k];
  }
});

afterEach(() => {
  for (const k of ENV_KEYS) {
    if (saved[k] === undefined) delete process.env[k];
    else process.env[k] = saved[k];
  }
});

describe("getProvider", () => {
  it("既定(env 無指定)＝gemini かつ GEMINI_API_KEY 未設定 → mock フォールバック", async () => {
    const provider = await getProvider();
    expect(provider.name).toBe("mock");
  });

  it("gemini かつ GEMINI_API_KEY 設定済 → gemini プロバイダ", async () => {
    process.env.GEMINI_API_KEY = "dummy-key-for-test";
    const provider = await getProvider();
    expect(provider.name).toBe("gemini");
  });

  it("preferred は env より優先される（mock 指定 → mock）", async () => {
    process.env.LLM_PROVIDER = "gemini";
    process.env.GEMINI_API_KEY = "dummy-key-for-test";
    const provider = await getProvider("mock");
    expect(provider.name).toBe("mock");
  });

  it("preferred=claude → claude スタブ", async () => {
    const provider = await getProvider("claude");
    expect(provider.name).toBe("claude");
  });

  it("preferred=openai → openai スタブ", async () => {
    const provider = await getProvider("openai");
    expect(provider.name).toBe("openai");
  });

  it("LLM_PROVIDER env を尊重する（claude）", async () => {
    process.env.LLM_PROVIDER = "claude";
    const provider = await getProvider();
    expect(provider.name).toBe("claude");
  });

  it("未知の id は mock にフォールバック（最終分岐）", async () => {
    const provider = await getProvider("bogus" as never);
    expect(provider.name).toBe("mock");
  });
});

describe("resolveModel（既定モデルは承認必須＝§9/§10）", () => {
  it("free の既定は gemini-2.5-flash-lite", () => {
    expect(resolveModel("free")).toBe("gemini-2.5-flash-lite");
  });

  it("premium の既定は gemini-2.5-flash", () => {
    expect(resolveModel("premium")).toBe("gemini-2.5-flash");
  });

  it("free は GEMINI_MODEL_FREE env で上書き可能", () => {
    process.env.GEMINI_MODEL_FREE = "custom-free-model";
    expect(resolveModel("free")).toBe("custom-free-model");
  });

  it("premium は GEMINI_MODEL_PREMIUM env で上書き可能", () => {
    process.env.GEMINI_MODEL_PREMIUM = "custom-premium-model";
    expect(resolveModel("premium")).toBe("custom-premium-model");
  });
});
