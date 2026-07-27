import { describe, it, expect, beforeAll, beforeEach, vi } from "vitest";

import { POST } from "@/app/api/contact/route";
import { readFeedbackFlag } from "@/lib/rate-limit/server";
import { FEEDBACK_COOKIE_NAME } from "@/lib/rate-limit/feedback-token";

/**
 * 無料枠解除の証跡の発行経路（ブロッカー2）。
 *
 * 解除の唯一の根拠は「/api/contact がフィードバックを受理したときに発行する
 * サーバ署名済み Cookie」。ここで固定する契約:
 *  1. feedback を投稿すると HttpOnly な署名 Cookie が Set-Cookie される
 *  2. その Cookie を積んだリクエストは readFeedbackFlag が解除と認める
 *  3. feedback 以外の kind（contact / question-comment）では発行しない
 *  4. 発行された値は自己申告では作れない（署名検証を通る必要がある）
 */

vi.mock("@/lib/notify/slack", () => ({ sendSlackMessage: vi.fn() }));

beforeAll(() => {
  process.env.AUTH_SECRET = "test-secret-for-contact-unlock";
});

beforeEach(() => {
  delete process.env.KV_REST_API_URL;
  delete process.env.KV_REST_API_TOKEN;
  delete process.env.RESEND_API_KEY;
});

function post(body: unknown, ip: string): Request {
  return new Request("http://localhost/api/contact", {
    method: "POST",
    headers: { "content-type": "application/json", "x-forwarded-for": ip },
    body: JSON.stringify(body),
  });
}

/** Set-Cookie ヘッダから解除トークンの値を取り出す。 */
function unlockCookieFrom(res: Response): string | null {
  const raw = res.headers.get("set-cookie");
  if (!raw) return null;
  const m = raw.match(new RegExp(`${FEEDBACK_COOKIE_NAME}=([^;]+)`));
  return m ? decodeURIComponent(m[1]) : null;
}

describe("/api/contact — 無料枠解除トークンの発行", () => {
  it("feedback 投稿で HttpOnly な署名 Cookie を発行する", async () => {
    const res = await POST(
      post({ kind: "feedback", choice: "役に立った", comment: "良い" }, "10.2.0.1"),
    );
    expect(res.status).toBe(200);

    const setCookie = res.headers.get("set-cookie");
    expect(setCookie).toContain(FEEDBACK_COOKIE_NAME);
    // ページ JS から読めてはいけない（読めると自己申告に戻る）
    expect(setCookie?.toLowerCase()).toContain("httponly");
    expect(setCookie?.toLowerCase()).toContain("samesite=lax");
  });

  it("発行された Cookie を積むと解除が認められる（往復の実接続）", async () => {
    const res = await POST(post({ kind: "feedback", choice: "役に立った" }, "10.2.0.2"));
    const token = unlockCookieFrom(res);
    expect(token).toBeTruthy();

    const next = new Request("http://localhost/api/copilot", {
      headers: { cookie: `${FEEDBACK_COOKIE_NAME}=${token}` },
    });
    expect(readFeedbackFlag(next)).toBe(true);
  });

  it("feedback 以外の kind では解除 Cookie を発行しない", async () => {
    const comment = await POST(
      post(
        { kind: "question-comment", questionId: "ap-2024h-am-q1", comment: "誤字" },
        "10.2.0.3",
      ),
    );
    expect(comment.status).toBe(200);
    expect(unlockCookieFrom(comment)).toBeNull();

    const contact = await POST(
      post({ kind: "contact", category: "question", body: "問い合わせ" }, "10.2.0.4"),
    );
    expect(contact.status).toBe(200);
    expect(unlockCookieFrom(contact)).toBeNull();
  });
});
