import { describe, it, expect, vi, beforeEach } from "vitest";

// lib/api/rate-limit.ts は公開 API のレート制限キー導出とヘッダ整形。
// checkApiRateLimit は Bearer トークン（trim 後12文字以上）があれば
// `key:<先頭64文字>` を制限キーにし、そうでなければ `ip:<clientIp>` に
// フォールバックする（社内 NAT 配下で個別 quota を保つため）。この導出が
// 崩れると、無効な短トークンが共有 IP プールを汚したり、長トークンが未切詰で
// キー肥大化する。崩れたら落ちる契約として現挙動を回帰固定する
// （source 無変更・監査で実害バグ無し）。

const checkRateLimit = vi.fn();
const getClientIp = vi.fn();
vi.mock("@/lib/rate-limit/server", () => ({
  checkRateLimit: (...args: unknown[]) => checkRateLimit(...args),
  getClientIp: (...args: unknown[]) => getClientIp(...args),
}));

import { checkApiRateLimit, buildRateLimitHeaders } from "@/lib/api/rate-limit";

const RESULT = { ok: true, remaining: 9, limit: 10, resetAt: 1_700_000 };

beforeEach(() => {
  checkRateLimit.mockReset().mockResolvedValue(RESULT);
  getClientIp.mockReset().mockReturnValue("1.2.3.4");
});

function req(headers: Record<string, string> = {}): Request {
  return new Request("https://example.test/api", { headers });
}

describe("checkApiRateLimit — キー導出", () => {
  it("12文字以上の Bearer トークンは key:<token> を制限キーにする", async () => {
    const r = await checkApiRateLimit(req({ authorization: "Bearer abcdefghijkl" }));
    expect(r.keyId).toBe("key:abcdefghijkl");
    expect(checkRateLimit).toHaveBeenCalledWith({ ip: "key:abcdefghijkl" });
  });

  it("トークンは trim 後に長さ判定される（短い→ip フォールバック）", async () => {
    const r = await checkApiRateLimit(req({ authorization: "Bearer    short   " }));
    expect(r.keyId).toBe("ip:1.2.3.4");
  });

  it("trim 後 11文字は不足で ip フォールバック、12文字ちょうどは key", async () => {
    expect((await checkApiRateLimit(req({ authorization: "Bearer 12345678901" }))).keyId).toBe(
      "ip:1.2.3.4",
    );
    expect((await checkApiRateLimit(req({ authorization: "Bearer 123456789012" }))).keyId).toBe(
      "key:123456789012",
    );
  });

  it("長いトークンは先頭64文字に切り詰める", async () => {
    const long = "a".repeat(70);
    const r = await checkApiRateLimit(req({ authorization: `Bearer ${long}` }));
    expect(r.keyId).toBe(`key:${"a".repeat(64)}`);
  });

  it("authorization ヘッダ無しは ip フォールバック", async () => {
    const r = await checkApiRateLimit(req());
    expect(r.keyId).toBe("ip:1.2.3.4");
    expect(getClientIp).toHaveBeenCalled();
  });

  it("制限結果を展開しつつ keyId を併せて返す", async () => {
    const r = await checkApiRateLimit(req({ authorization: "Bearer abcdefghijkl" }));
    expect(r).toMatchObject({ ...RESULT, keyId: "key:abcdefghijkl" });
  });
});

describe("buildRateLimitHeaders — ヘッダ整形", () => {
  it("X-RateLimit-Limit/Remaining/Reset を文字列で返す", () => {
    expect(
      buildRateLimitHeaders({ ok: true, remaining: 9, limit: 10, resetAt: 1_700_000 }),
    ).toEqual({
      "X-RateLimit-Limit": "10",
      "X-RateLimit-Remaining": "9",
      "X-RateLimit-Reset": "1700000",
    });
  });
});
