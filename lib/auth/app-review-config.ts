// Server configuration only. Never pass this object to a client component.
export function appReviewConfig(now = Date.now()) {
  const email = process.env.APP_REVIEW_EMAIL?.trim().toLowerCase();
  const userId = process.env.APP_REVIEW_USER_ID?.trim();
  const codeHash = process.env.APP_REVIEW_CODE_SHA256;
  const expiresAt = Date.parse(process.env.APP_REVIEW_EXPIRES_AT ?? "");
  try {
    if (new URL(process.env.AUTH_URL ?? "").protocol !== "https:") return null;
  } catch { return null; }
  if (process.env.APP_REVIEW_LOGIN_ENABLED !== "true" || !email || !userId ||
      !codeHash || !/^[a-f0-9]{64}$/.test(codeHash) || !Number.isFinite(expiresAt) || expiresAt <= now ||
      !process.env.AUTH_SECRET || !process.env.DATABASE_URL ||
      !process.env.KV_REST_API_URL || !process.env.KV_REST_API_TOKEN) return null;
  return { email, userId, codeHash, expiresAt };
}
