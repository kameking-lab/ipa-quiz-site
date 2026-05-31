import { describe, expect, it } from "vitest";

import { getClientIp, readFeedbackFlag } from "@/lib/rate-limit/server";

/**
 * Characterization tests for the pure request-header helpers in
 * lib/rate-limit/server.ts. checkRateLimit の挙動は ip-rate-limit / quota-sync で
 * 別途固定されているが、これら 2 つのヘッダ読み取り関数の「実挙動」は未テストだった
 * （rate-limit-key.test はモジュール全体をモックするため実装を通らない）。
 *
 * 特に readFeedbackFlag は「x-feedback-submitted: 1」を厳密一致で判定する
 * セキュリティ境界。ここが緩むと（例: 真偽値化や != null）任意の値で
 * POST_FEEDBACK の準無制限日次枠が解放され、無料枠の悪用経路になる。
 * source 無変更・現挙動の回帰固定（崩れたら落ちる契約）。
 */

function req(headers: Record<string, string> = {}): Request {
  return new Request("https://example.test/api/copilot", { headers });
}

describe("readFeedbackFlag — フィードバック枠ゲート", () => {
  it("x-feedback-submitted がちょうど \"1\" のときだけ true", () => {
    expect(readFeedbackFlag(req({ "x-feedback-submitted": "1" }))).toBe(true);
  });

  it("ヘッダ未指定は false", () => {
    expect(readFeedbackFlag(req())).toBe(false);
  });

  it("\"1\" 以外の真っぽい値は全て false（厳密一致＝緩めない）", () => {
    // この 3 値はいずれも !== "1"。`=== "1"` が真偽値化や != null に緩むと
    // どれかが true になり、準無制限枠が誤って解放される。
    // （" 1 " のような前後空白は Headers API が OWS トリムし "1" になるため対象外）
    for (const v of ["0", "true", "2"]) {
      expect(readFeedbackFlag(req({ "x-feedback-submitted": v }))).toBe(false);
    }
  });

  it("空文字も false", () => {
    expect(readFeedbackFlag(req({ "x-feedback-submitted": "" }))).toBe(false);
  });

  it("ヘッダ名は大文字小文字を問わない（Headers 正規化）", () => {
    expect(readFeedbackFlag(req({ "X-Feedback-Submitted": "1" }))).toBe(true);
  });
});

describe("getClientIp — クライアント IP 抽出", () => {
  it("x-forwarded-for があれば先頭ホップを採用しトリムする", () => {
    expect(getClientIp(req({ "x-forwarded-for": "203.0.113.7" }))).toBe("203.0.113.7");
    expect(
      getClientIp(req({ "x-forwarded-for": "203.0.113.7, 70.41.3.18, 150.172.238.178" })),
    ).toBe("203.0.113.7");
    expect(getClientIp(req({ "x-forwarded-for": "  203.0.113.7 , 70.41.3.18" }))).toBe(
      "203.0.113.7",
    );
  });

  it("x-forwarded-for が無ければ x-real-ip にフォールバックしトリムする", () => {
    expect(getClientIp(req({ "x-real-ip": "198.51.100.5" }))).toBe("198.51.100.5");
    expect(getClientIp(req({ "x-real-ip": "  198.51.100.5  " }))).toBe("198.51.100.5");
  });

  it("x-forwarded-for は x-real-ip より優先される", () => {
    expect(
      getClientIp(req({ "x-forwarded-for": "203.0.113.7", "x-real-ip": "198.51.100.5" })),
    ).toBe("203.0.113.7");
  });

  it("いずれのヘッダも無ければ 0.0.0.0 を返す", () => {
    expect(getClientIp(req())).toBe("0.0.0.0");
  });
});
