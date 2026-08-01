import { createHmac } from "node:crypto";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import {
  issueFeedbackToken,
  readFeedbackToken,
  verifyFeedbackToken,
} from "@/lib/rate-limit/feedback-token";
import { FEEDBACK_TOKEN_DAILY_LIMIT } from "@/lib/constants/ai-quota";

// 無料枠解除トークンは所持ベースなので、Cookie 値を配れば複数人で回せる。
// IP 単位の日次枠は IP が違えば別枠になるため、この増幅には効かない。
// 「1 本のトークンが 1 日に使える総量」を上限にして、共有だけを止める。

beforeEach(() => {
  vi.stubEnv("AUTH_SECRET", "test-secret-for-feedback-token");
});

afterEach(() => {
  vi.unstubAllEnvs();
});

describe("トークンは 1 本ずつ識別できる（共有を数えるための前提）", () => {
  it("発行のたびに別の ID が載る", () => {
    const a = readFeedbackToken(issueFeedbackToken());
    const b = readFeedbackToken(issueFeedbackToken());
    expect(a.valid).toBe(true);
    expect(b.valid).toBe(true);
    expect(a.id).toBeTruthy();
    expect(b.id).toBeTruthy();
    // ID が同じだと、全利用者が 1 つのバケットを共有して正規利用者まで
    // 巻き添えで止まる。ここは必ず別でなければならない。
    expect(a.id).not.toBe(b.id);
  });

  it("ID を書き換えたトークンは署名検証で落ちる", () => {
    const token = issueFeedbackToken()!;
    const parts = token.split(".");
    parts[1] = "f".repeat(32);
    expect(verifyFeedbackToken(parts.join("."))).toBe(false);
  });

  it("ID の形式が不正なものは受理しない", () => {
    const token = issueFeedbackToken()!;
    const parts = token.split(".");
    parts[1] = "not-a-hex-id";
    expect(verifyFeedbackToken(parts.join("."))).toBe(false);
  });

  it("期限切れは ID があっても無効", () => {
    const past = Date.now() - 400 * 24 * 60 * 60 * 1000;
    const token = issueFeedbackToken(past)!;
    expect(readFeedbackToken(token).valid).toBe(false);
  });

  it("旧 v1 トークンは失効させず受理する（配布済みを無効化しない）", () => {
    // v1 は ID を持たないので、トークン単位の上限は適用できない。
    // 1 年の有効期限で自然に入れ替わる想定。
    const exp = Math.floor(Date.now() / 1000) + 1000;
    const payload = `v1.${exp}`;
    const sig = createHmac("sha256", "test-secret-for-feedback-token")
      .update(payload)
      .digest("base64url");
    const info = readFeedbackToken(`${payload}.${sig}`);
    expect(info.valid).toBe(true);
    expect(info.id).toBeNull();
  });
});

describe("checkRateLimit — 1 本のトークンで無限に増幅できない", () => {
  it("IP を変えても同じトークンなら日次上限で頭打ちになる", async () => {
    vi.resetModules();
    vi.stubEnv("KV_REST_API_URL", "");
    vi.stubEnv("KV_REST_API_TOKEN", "");
    const { checkRateLimit } = await import("@/lib/rate-limit/server");

    const tokenId = "a".repeat(32);
    // 上限ちょうどまで、毎回違う IP から使う（IP 単位の枠では止まらない）。
    for (let i = 0; i < FEEDBACK_TOKEN_DAILY_LIMIT; i++) {
      const res = await checkRateLimit({
        ip: `10.0.${Math.floor(i / 250)}.${i % 250}`,
        feedbackSubmitted: true,
        feedbackTokenId: tokenId,
      });
      expect(res.ok, `${i} 回目で止まってはいけない`).toBe(true);
    }

    const blocked = await checkRateLimit({
      ip: "10.9.9.9",
      feedbackSubmitted: true,
      feedbackTokenId: tokenId,
    });
    expect(blocked.ok).toBe(false);
    expect(blocked.reason).toBe("daily");
  });

  it("別のトークンは巻き添えにならない", async () => {
    vi.resetModules();
    vi.stubEnv("KV_REST_API_URL", "");
    vi.stubEnv("KV_REST_API_TOKEN", "");
    const { checkRateLimit } = await import("@/lib/rate-limit/server");

    const exhausted = "b".repeat(32);
    for (let i = 0; i < FEEDBACK_TOKEN_DAILY_LIMIT; i++) {
      await checkRateLimit({
        ip: `10.1.${Math.floor(i / 250)}.${i % 250}`,
        feedbackSubmitted: true,
        feedbackTokenId: exhausted,
      });
    }
    const other = await checkRateLimit({
      ip: "10.2.0.1",
      feedbackSubmitted: true,
      feedbackTokenId: "c".repeat(32),
    });
    expect(other.ok).toBe(true);
  });

  it("普通に 1 人で使う限りトークン上限には触れない（副作用ゼロ）", async () => {
    vi.resetModules();
    vi.stubEnv("KV_REST_API_URL", "");
    vi.stubEnv("KV_REST_API_TOKEN", "");
    const { checkRateLimit, POST_FEEDBACK_DAILY_LIMIT } = await import(
      "@/lib/rate-limit/server"
    );
    // トークン上限は 1 人分の日次枠と同じ値。単独利用では IP 側の枠に
    // 先に当たるので、トークン上限が体感に出ることはない。
    expect(FEEDBACK_TOKEN_DAILY_LIMIT).toBe(POST_FEEDBACK_DAILY_LIMIT);
    const res = await checkRateLimit({
      ip: "10.3.0.1",
      feedbackSubmitted: true,
      feedbackTokenId: "d".repeat(32),
    });
    expect(res.ok).toBe(true);
    expect(res.limit).toBe(POST_FEEDBACK_DAILY_LIMIT);
  });
});
