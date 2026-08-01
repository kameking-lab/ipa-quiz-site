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
//
// 共有への抑制（v2）: v1 は「解除されているか」しか分からず、1 本を大人数で
// 回されても数えようがなかった（IP 単位の枠は IP が違えば別枠なので効かない）。
// v2 では発行のたびに一意な ID を載せ、トークン単位でも日次の利用回数を
// 数えられるようにしている。上限は 1 人分の枠と同じ値なので、普通に 1 人で
// 使う限り到達しない＝正規利用者に副作用を出さずに増幅だけを止められる。
// v1 は失効させず受理し続ける（既に配布済みのぶんを無効化しない）。1 年の
// 有効期限で自然に入れ替わる。

import { createHmac, randomUUID, timingSafeEqual } from "node:crypto";

export const FEEDBACK_COOKIE_NAME = "ipa_fb";
/** 新規発行するトークンの形式。v1 は検証のみ受理する。 */
const TOKEN_VERSION = "v2";
const LEGACY_TOKEN_VERSION = "v1";
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
  // 一意 ID。共有されたトークンを 1 本として数えるためだけに使う識別子で、
  // 個人を特定する情報は載せない（載せる必要が無いし、載せると Cookie が
  // 個人データになる）。
  const jti = randomUUID().replace(/-/g, "");
  const payload = `${TOKEN_VERSION}.${jti}.${exp}`;
  return `${payload}.${sign(payload, key)}`;
}

export interface FeedbackTokenInfo {
  /** 署名・有効期限ともに正しく、無料枠解除を認めてよいか。 */
  valid: boolean;
  /**
   * トークン単位で回数を数えるための一意 ID。v1 トークンには存在しないため
   * null になる（その場合はトークン単位の上限を適用できない）。
   */
  id: string | null;
}

/**
 * 署名と有効期限を検証し、トークン単位の識別子まで取り出す。
 * 少しでも疑わしければ valid:false（fail-closed）。
 */
export function readFeedbackToken(
  raw: string | null | undefined,
  nowMs: number = Date.now(),
): FeedbackTokenInfo {
  const invalid: FeedbackTokenInfo = { valid: false, id: null };
  const key = signingKey();
  if (!key || !raw) return invalid;

  const parts = raw.split(".");
  // v2: version.jti.exp.sig / v1: version.exp.sig
  const isV2 = parts.length === 4 && parts[0] === TOKEN_VERSION;
  const isV1 = parts.length === 3 && parts[0] === LEGACY_TOKEN_VERSION;
  if (!isV2 && !isV1) return invalid;

  const signature = parts[parts.length - 1];
  const payload = parts.slice(0, -1).join(".");
  const expRaw = isV2 ? parts[2] : parts[1];
  const jti = isV2 ? parts[1] : null;

  const exp = Number(expRaw);
  if (!Number.isInteger(exp) || exp * 1000 <= nowMs) return invalid;
  if (isV2 && !/^[0-9a-f]{32}$/.test(jti ?? "")) return invalid;

  const given = Buffer.from(signature);
  const want = Buffer.from(sign(payload, key));
  // timingSafeEqual は長さが違うと throw するので先に弾く。
  if (given.length !== want.length) return invalid;
  if (!timingSafeEqual(given, want)) return invalid;

  return { valid: true, id: jti };
}

/** 署名と有効期限を検証する。少しでも疑わしければ false（fail-closed）。 */
export function verifyFeedbackToken(
  raw: string | null | undefined,
  nowMs: number = Date.now(),
): boolean {
  return readFeedbackToken(raw, nowMs).valid;
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
