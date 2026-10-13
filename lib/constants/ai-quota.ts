/**
 * Legacy default daily rate limit for non-AI routes (for example /api/contact).
 * Public AI routes skip this daily counter but retain minute/hour and site-wide
 * abuse controls. These values are not a commercial quota or user-facing limit.
 */
export const FREE_AI_DAILY_LIMIT = 10;
export const POST_FEEDBACK_AI_DAILY_LIMIT = 9999;

/** Daily cap for a signed feedback token on the legacy default rate-limit path. */
export const FEEDBACK_TOKEN_DAILY_LIMIT = POST_FEEDBACK_AI_DAILY_LIMIT;

export const AI_QUOTA_COPY =
  "公開中のAI学習機能は無料で利用回数の枠はありません。連続利用や大量送信には適正利用制限があります。";

export const AI_QUOTA_COPY_SHORT = "無料・回数枠なし（適正利用制限あり）";
