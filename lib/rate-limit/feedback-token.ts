// フィードバック投稿による無料枠解除の「サーバ側で検証可能な証跡」。
//
// 従来は HTTP ヘッダ x-feedback-submitted: 1 の値だけで日次上限を 10 回 →
// 9999 回に開けていた。ヘッダはクライアントが自由に付けられるので、
// curl 一発で準無制限枠が取れる状態だった（本番で 9999 が返ることを実測済み）。
//
// ここでは投稿の受理側（/api/contact）だけがサーバの秘密鍵で署名した短いトークンを
// 発行し、以後はその署名を検証する。クライアントの自己申告は一切信用しない。
//
// 鍵は既存の AUTH_SECRET（NextAuth v5 が必須とする既存シークレット）を流用する。
// 新規シークレット・新規外部サービスは導入しない。
//
// 失効設計: トークンは 1 年で期限切れ。HttpOnly / Secure / SameSite=Lax の
// Cookie に載せるので、ページ JS からは読めない。
//
// 脅威モデルの範囲: これは「実際にフィードバックを投稿した」ことの証跡であって
// 個人の同一性証明ではない。Cookie 値を手動で複製されれば共有はされうるが、
// 発行には必ず投稿の成功が要る（＝フィードバック駆動モデルの意図どおり）。
// 総額の防波堤は別途 §0 の月間コスト上限（lib/ai/cost-guard）が担う。

import { createHmac, timingSafeEqual } from "node:crypto";

export const FEEDBACK_COOKIE_NAME = "ipa_fb";
/** トークン形式のバージョン。将来ローテートするときはここを上げる。 */
const TOKEN_VERSION = "v1";
export const FEEDBACK_TOKEN_TTL_SEC = 365 * 24 * 60 * 60;

function signingKey(): string | null {
  const key = process.env.AUTH_SECRET;
  return key && key.length > 0 ? key : null;
}

function sign(payload: string, key: string): string {
  return createHmac("sha256", key).update(payload).digest("base64url");
}

/**
 * 署名済みトークンを発行する。AUTH_SECRET 未設定なら null（＝解除しない）。
 * 「鍵が無いから素通り」は fail-open なので絶対にやらない。
 */
export function issueFeedbackToken(nowMs: number = Date.now()): string | null {
  const key = signingKey();
  if (!key) {
    console.error(
      "[feedback-token] AUTH_SECRET が未設定のため無料枠解除トークンを発行できません",
    );
    return null;
  }
  const exp = Math.floor(nowMs / 1000) + FEEDBACK_TOKEN_TTL_SEC;
  const payload = `${TOKEN_VERSION}.${exp}`;
  return `${payload}.${sign(payload, key)}`;
}

/** 署名と有効期限を検証する。少しでも疑わしければ false（fail-closed）。 */
export function verifyFeedbackToken(
  raw: string | null | undefined,
  nowMs: number = Date.now(),
): boolean {
  const key = signingKey();
  if (!key || !raw) return false;

  const parts = raw.split(".");
  if (parts.length !== 3) return false;
  const [version, expRaw, signature] = parts;
  if (version !== TOKEN_VERSION) return false;

  const exp = Number(expRaw);
  if (!Number.isInteger(exp) || exp * 1000 <= nowMs) return false;

  const expected = sign(`${version}.${expRaw}`, key);
  const given = Buffer.from(signature);
  const want = Buffer.from(expected);
  // timingSafeEqual は長さが違うと throw するので先に弾く。
  if (given.length !== want.length) return false;
  return timingSafeEqual(given, want);
}

/** Cookie ヘッダから 1 つの値を取り出す。 */
export function readCookieValue(
  cookieHeader: string | null | undefined,
  name: string,
): string | null {
  if (!cookieHeader) return null;
  for (const part of cookieHeader.split(";")) {
    const eq = part.indexOf("=");
    if (eq < 0) continue;
    if (part.slice(0, eq).trim() !== name) continue;
    return decodeURIComponent(part.slice(eq + 1).trim());
  }
  return null;
}

/** /api/contact が Set-Cookie する際の属性。 */
export function feedbackCookieOptions() {
  return {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax" as const,
    path: "/",
    maxAge: FEEDBACK_TOKEN_TTL_SEC,
  };
}
