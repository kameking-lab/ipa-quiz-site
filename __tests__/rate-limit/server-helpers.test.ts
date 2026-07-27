import { beforeAll, describe, expect, it } from "vitest";

import { getClientIp, readFeedbackFlag } from "@/lib/rate-limit/server";
import {
  FEEDBACK_COOKIE_NAME,
  issueFeedbackToken,
} from "@/lib/rate-limit/feedback-token";

/**
 * Characterization tests for the pure request helpers in lib/rate-limit/server.ts.
 * checkRateLimit の挙動は ip-rate-limit / quota-sync で別途固定されているが、
 * これら 2 つの読み取り関数の「実挙動」は未テストだった
 * （rate-limit-key.test はモジュール全体をモックするため実装を通らない）。
 *
 * readFeedbackFlag は日次上限を 10 → 9999 に開けるセキュリティ境界。
 * 以前は x-feedback-submitted ヘッダの値だけで判定しており、クライアントが
 * 自由に付けられるヘッダで準無制限枠が取れた（本番で 9999 を実測）。
 * 現在の判定根拠はサーバ署名済み Cookie のみ。ここが「ヘッダも見る」に
 * 戻ると防御が丸ごと無効になるので、それを落ちる形で固定する。
 */

beforeAll(() => {
  process.env.AUTH_SECRET = "test-secret-for-feedback-token";
});

function req(headers: Record<string, string> = {}): Request {
  return new Request("https://example.test/api/copilot", { headers });
}

function withCookie(value: string): Request {
  return req({ cookie: `${FEEDBACK_COOKIE_NAME}=${value}` });
}

describe("readFeedbackFlag — 自己申告ヘッダは一切信用しない", () => {
  it("x-feedback-submitted: 1 だけでは解除されない（旧・悪用経路）", () => {
    // 修正前はこれが true を返し、curl 一発で準無制限枠が取れた。
    expect(readFeedbackFlag(req({ "x-feedback-submitted": "1" }))).toBe(false);
  });

  it("ヘッダの真っぽい値も全て false", () => {
    for (const v of ["0", "true", "2", "", "1"]) {
      expect(readFeedbackFlag(req({ "x-feedback-submitted": v }))).toBe(false);
    }
    expect(readFeedbackFlag(req({ "X-Feedback-Submitted": "1" }))).toBe(false);
  });

  it("ヘッダも Cookie も無ければ false", () => {
    expect(readFeedbackFlag(req())).toBe(false);
  });
});

describe("readFeedbackFlag — サーバ署名済み Cookie のみを根拠にする", () => {
  it("サーバが発行した正規トークンなら true", () => {
    const token = issueFeedbackToken();
    expect(token).toBeTruthy();
    expect(readFeedbackFlag(withCookie(token!))).toBe(true);
  });

  it("他の Cookie が混在していても正しく取り出す", () => {
    const token = issueFeedbackToken()!;
    const r = req({
      cookie: `theme=dark; ${FEEDBACK_COOKIE_NAME}=${token}; other=1`,
    });
    expect(readFeedbackFlag(r)).toBe(true);
  });

  it("署名を 1 文字でも改竄すると false", () => {
    const token = issueFeedbackToken()!;
    const parts = token.split(".");
    const sig = parts[2];
    const tampered = `${parts[0]}.${parts[1]}.${sig.slice(0, -1)}${sig.endsWith("A") ? "B" : "A"}`;
    expect(readFeedbackFlag(withCookie(tampered))).toBe(false);
  });

  it("有効期限だけ延ばした自作トークンは false（署名が合わない）", () => {
    const token = issueFeedbackToken()!;
    const parts = token.split(".");
    const forged = `${parts[0]}.${Number(parts[1]) + 100_000}.${parts[2]}`;
    expect(readFeedbackFlag(withCookie(forged))).toBe(false);
  });

  it("署名なしの素朴な値（1 / true など）は false", () => {
    for (const v of ["1", "true", "v1.9999999999", "a.b.c", ""]) {
      expect(readFeedbackFlag(withCookie(v))).toBe(false);
    }
  });

  it("別の鍵で署名されたトークンは false", () => {
    const prev = process.env.AUTH_SECRET;
    process.env.AUTH_SECRET = "a-different-secret";
    const foreign = issueFeedbackToken()!;
    process.env.AUTH_SECRET = prev;
    expect(readFeedbackFlag(withCookie(foreign))).toBe(false);
  });

  it("期限切れトークンは false", () => {
    // 1 年 + 1 日ぶん過去に発行 → すでに exp を過ぎている
    const past = Date.now() - (366 * 24 * 60 * 60 * 1000);
    const expired = issueFeedbackToken(past)!;
    expect(readFeedbackFlag(withCookie(expired))).toBe(false);
  });

  it("AUTH_SECRET 未設定なら発行も検証もしない（fail-closed）", () => {
    const token = issueFeedbackToken()!;
    const prev = process.env.AUTH_SECRET;
    delete process.env.AUTH_SECRET;
    try {
      // 鍵が無い状態で「素通り」してはならない。
      expect(readFeedbackFlag(withCookie(token))).toBe(false);
      expect(issueFeedbackToken()).toBeNull();
    } finally {
      process.env.AUTH_SECRET = prev;
    }
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
