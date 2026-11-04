import { describe, it, expect, beforeEach, vi } from "vitest";

/**
 * 問い合わせフォームの Slack 通知は after() で送る。
 *
 * - 素の void は投げっぱなしで、サーバレスがレスポンス完了で凍結すると
 *   fetch ごと消える（recordAiCost で実際に起きたのと同じ失われ方）。
 * - await はユーザーのフォーム送信に Slack 往復（最大 3 秒）を乗せてしまう。
 *
 * ここで固定するのは「レスポンスを返すまでに Slack を叩いていない」ことと、
 * 「after に登録したコールバックが実際に Slack を叩く」ことの両方。
 */

const hoisted = vi.hoisted(() => ({
  afterCallbacks: [] as Array<() => unknown>,
  slackCalls: [] as string[],
  afterThrows: false,
}));

vi.mock("next/server", async () => {
  const actual = await vi.importActual<typeof import("next/server")>("next/server");
  return {
    ...actual,
    after: (cb: () => unknown) => {
      if (hoisted.afterThrows) {
        throw new Error("`after` was called outside a request scope.");
      }
      hoisted.afterCallbacks.push(cb);
    },
  };
});

vi.mock("@/lib/notify/slack", () => ({
  sendSlackMessage: async (text: string) => {
    hoisted.slackCalls.push(text);
    return true;
  },
}));

const { POST } = await import("@/app/api/contact/route");

let ipCounter = 0;
function req(body: unknown): Request {
  ipCounter += 1;
  return new Request("http://localhost/api/contact", {
    method: "POST",
    headers: {
      "content-type": "application/json",
      "x-forwarded-for": `172.30.0.${ipCounter}`,
    },
    body: JSON.stringify(body),
  });
}

beforeEach(() => {
  delete process.env.KV_REST_API_URL;
  delete process.env.KV_REST_API_TOKEN;
  delete process.env.TURNSTILE_SECRET_KEY;
  hoisted.afterCallbacks = [];
  hoisted.slackCalls = [];
  hoisted.afterThrows = false;
});

describe("POST /api/contact — Slack 通知は after() で送る", () => {
  it("次の資格の問い合わせをサイト名つきで通知し、本文・メールをログへ残さない", async () => {
    const log = vi.spyOn(console, "log").mockImplementation(() => {});
    try {
      const res = await POST(req({ kind: "contact", category: "tsugino", body: "日程の訂正をお願いします", email: "reply@example.test" }));
      expect(res.status).toBe(200);
      expect(hoisted.slackCalls).toHaveLength(0);
      await hoisted.afterCallbacks[0]();
      expect(hoisted.slackCalls[0]).toContain("[次の資格] contact 受信");
      expect(hoisted.slackCalls[0]).toContain("種別: tsugino");
      expect(hoisted.slackCalls[0]).toContain("reply@example.test");
      expect(JSON.stringify(log.mock.calls)).not.toContain("日程の訂正");
      expect(JSON.stringify(log.mock.calls)).not.toContain("reply@example.test");
    } finally {
      log.mockRestore();
    }
  });

  it("通常の問い合わせは従来どおり過去問AIとして通知し、返信先なしでも受け付ける", async () => {
    const res = await POST(req({ kind: "contact", category: "question", body: "使い方を教えてください" }));
    expect(res.status).toBe(200);
    await hoisted.afterCallbacks[0]();
    expect(hoisted.slackCalls[0]).toContain("[過去問AI] contact 受信");
    expect(hoisted.slackCalls[0]).toContain("メール: (未記入)");
  });

  it("次の資格でも必須本文・種別の検証を維持する", async () => {
    for (const payload of [
      { kind: "contact", category: "tsugino" },
      { kind: "contact", category: "tsugino", body: "" },
      { kind: "contact", category: "tsugino", body: "x".repeat(4001) },
      { kind: "contact", category: "untrusted", body: "問い合わせ" },
    ]) expect((await POST(req(payload))).status).toBe(400);
    expect(hoisted.afterCallbacks).toHaveLength(0);
  });

  it("次の資格でもTurnstile有効時はトークンなしで拒否する", async () => {
    process.env.TURNSTILE_SECRET_KEY = "test-secret-only";
    try {
      const res = await POST(req({ kind: "contact", category: "tsugino", body: "掲載情報の訂正" }));
      expect(res.status).toBe(403);
      expect(hoisted.afterCallbacks).toHaveLength(0);
    } finally {
      delete process.env.TURNSTILE_SECRET_KEY;
    }
  });

  it("レスポンスを返す時点では Slack を叩いていない（送信レイテンシを乗せない）", async () => {
    const res = await POST(req({ kind: "feedback", choice: "役に立った", comment: "よい" }));
    expect(res.status).toBe(200);
    // ここで既に叩かれていたら void / await のどちらかに戻っている
    expect(hoisted.slackCalls).toHaveLength(0);
    expect(hoisted.afterCallbacks).toHaveLength(1);
  });

  it("after のコールバックが実際に Slack へ送る", async () => {
    await POST(req({ kind: "question-comment", questionId: "ap-2024h-am-q1", comment: "誤植" }));
    expect(hoisted.afterCallbacks).toHaveLength(1);
    await hoisted.afterCallbacks[0]();
    expect(hoisted.slackCalls).toHaveLength(1);
    expect(hoisted.slackCalls[0]).toContain("ap-2024h-am-q1");
  });

  it("Slack が失敗しても問い合わせは受理済み（fail-open）", async () => {
    const res = await POST(req({ kind: "feedback", choice: "分かりにくい" }));
    expect(res.status).toBe(200);
    expect((await res.json()).ok).toBe(true);
  });

  it("after() が使えない文脈でも 500 にせず通知を試みる（fail-open）", async () => {
    // after() はリクエストスコープ外で throw する。通知の都合で利用者の
    // 問い合わせが失われてはいけない。
    hoisted.afterThrows = true;
    const res = await POST(req({ kind: "feedback", choice: "役に立った" }));
    expect(res.status).toBe(200);
    expect((await res.json()).ok).toBe(true);
    // 素の void へ落として通知自体は試みている
    expect(hoisted.slackCalls).toHaveLength(1);
  });
});
