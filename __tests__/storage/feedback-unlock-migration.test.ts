import { describe, it, expect, beforeEach } from "vitest";

import {
  POST_FEEDBACK_DAILY_LIMIT_CLIENT,
  FREE_DAILY_LIMIT_CLIENT,
  readFeedbackSubmitted,
  setFeedbackSubmitted,
  syncFeedbackUnlockFromResponse,
} from "@/lib/storage/rate-limit-client";

/**
 * 旧方式ユーザーの移行（ブロッカー2）。
 *
 * 解除の根拠が「自己申告ヘッダ」から「サーバ署名済み Cookie」へ変わったため、
 * 旧方式で解除済みのユーザーは localStorage だけ true でサーバ側の証跡が無い。
 * 放置すると UI は「解除済み」表示のまま実際は 10 回で止まり、ユーザーから見て
 * 原因不明の頭打ちになる（＝正当な解除が壊れたように見える）。
 *
 * 成功レスポンスの X-RateLimit-Limit を見て乖離を検出したらローカルフラグを
 * 落とし、フィードバックゲートを一度だけ再表示させる契約を固定する。
 */

function res(limit: number | null, ok = true): Response {
  const headers = new Headers();
  if (limit !== null) headers.set("X-RateLimit-Limit", String(limit));
  return new Response(null, { status: ok ? 200 : 429, headers });
}

beforeEach(() => {
  window.localStorage.clear();
});

describe("syncFeedbackUnlockFromResponse — 旧方式解除ユーザーの再同期", () => {
  it("ローカルは解除済みなのにサーバが無料枠 → フラグを落として再取得を促す", () => {
    setFeedbackSubmitted(true);
    syncFeedbackUnlockFromResponse(res(FREE_DAILY_LIMIT_CLIENT));
    // ここが落ちると、UI 解除済み表示のまま 10 回で止まる状態が残る。
    expect(readFeedbackSubmitted()).toBe(false);
  });

  it("サーバも解除済みならフラグを維持する（正当な解除を壊さない）", () => {
    setFeedbackSubmitted(true);
    syncFeedbackUnlockFromResponse(res(POST_FEEDBACK_DAILY_LIMIT_CLIENT));
    expect(readFeedbackSubmitted()).toBe(true);
  });

  it("そもそも未解除のユーザーには何もしない", () => {
    setFeedbackSubmitted(false);
    syncFeedbackUnlockFromResponse(res(FREE_DAILY_LIMIT_CLIENT));
    expect(readFeedbackSubmitted()).toBe(false);
  });

  it("失敗レスポンス(429)は判断材料にしない（分次制限が別の limit を返すため）", () => {
    setFeedbackSubmitted(true);
    syncFeedbackUnlockFromResponse(res(15, false));
    expect(readFeedbackSubmitted()).toBe(true);
  });

  it("ヘッダが無い・不正なレスポンスでは誤ってフラグを落とさない", () => {
    setFeedbackSubmitted(true);
    syncFeedbackUnlockFromResponse(res(null));
    expect(readFeedbackSubmitted()).toBe(true);

    const bad = new Response(null, {
      status: 200,
      headers: new Headers({ "X-RateLimit-Limit": "not-a-number" }),
    });
    syncFeedbackUnlockFromResponse(bad);
    expect(readFeedbackSubmitted()).toBe(true);
  });
});
