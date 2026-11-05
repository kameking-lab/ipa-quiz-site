import "server-only";
import { createHash, createHmac, timingSafeEqual } from "node:crypto";
import { prisma } from "@/lib/db/prisma";
import { sharedUsageStore } from "@/lib/ai/usage-kv";
import { appReviewConfig, APP_REVIEW_USER_ID } from "./app-review-config";
import { getClientIp } from "@/lib/rate-limit/server";
import { activateReviewVersion, revokeReviewSessions } from "./app-review-revocation";

export async function reviewSessionClaims(userId: string) {
  const config = appReviewConfig();
  if (!config || config.userId !== userId) return {};
  const user = await prisma.user.findUnique({ where: { id: userId }, select: { createdAt: true } });
  if (!user?.createdAt) return {};
  const reviewVersion = createHmac("sha256", process.env.AUTH_SECRET!)
    .update(JSON.stringify(["review-v2", config.userId, user.createdAt.toISOString(), config.email, config.codeHash, config.expiresAt])).digest("hex");
  return await activateReviewVersion(reviewVersion) ? { reviewVersion } : {};
}

export async function reviewSessionValid(token: { id?: unknown; reviewVersion?: unknown }) {
  if (token.reviewVersion === undefined && token.id !== APP_REVIEW_USER_ID) return true;
  if (!appReviewConfig()) {
    // A signed review session observing disable/expiry permanently retires the
    // active version. The owner CLI covers changes with no intervening traffic.
    try { await revokeReviewSessions(); } catch { /* Always reject on KV failure. */ }
    return false;
  }
  if (token.id !== APP_REVIEW_USER_ID || typeof token.reviewVersion !== "string") return false;
  const expected = (await reviewSessionClaims(token.id)).reviewVersion;
  return !!expected && typeof token.reviewVersion === "string" && token.reviewVersion === expected;
}

function audit(outcome: "denied" | "limited" | "unavailable" | "accepted", attempt: string) {
  // No input, address, raw IP, code/hash or transport errors in the audit log.
  console.info(JSON.stringify({ event: "app_review_login", outcome, attempt, at: new Date().toISOString() }));
}

export async function authorizeAppReview(credentials: Partial<Record<"code", unknown>>, request: Request) {
  const config = appReviewConfig();
  if (!config) return null;
  const attempt = crypto.randomUUID();
  // Auth.js also checks CSRF. Require the explicitly configured origin here,
  // never trust a client-selected Host/X-Forwarded-For as an authorization signal.
  const expectedOrigin = process.env.AUTH_URL;
  if (!expectedOrigin || request.headers.get("origin") !== new URL(expectedOrigin).origin) {
    audit("denied", attempt); return null;
  }
  try {
    // Source throttling happens before password checking. Only deploy behind
    // the existing trusted reverse proxy that overwrites forwarding headers.
    const now = Date.now();
    const source = getClientIp(request);
    const sourceAdmissions = await Promise.all([
      sharedUsageStore.admit(`app-review:source:${source}:minute:${Math.floor(now / 60000)}`, 10, 0, now),
      sharedUsageStore.admit(`app-review:source:${source}:day`, 100, 0, now),
    ]);
    if (sourceAdmissions.some(result => !result.allowed)) { audit("limited", attempt); return null; }
    const code = typeof credentials.code === "string" && /^[A-Za-z0-9_-]{43,128}$/.test(credentials.code) ? credentials.code : "";
    const hash = createHash("sha256").update(code).digest();
    const matches = timingSafeEqual(hash, Buffer.from(config.codeHash, "hex"));
    if (!matches || !code) { audit("denied", attempt); return null; }
    // Anonymous guesses cannot consume the shared valid-credential quota.
    // A 256-bit random secret protects against distributed guessing; this
    // second quota limits use of a leaked code across sources/instances.
    const subject = `app-review:${config.userId}:${config.codeHash}`;
    const admissions = await Promise.all([
      sharedUsageStore.admit(`${subject}:daily`, 100, 0, Date.now()),
      sharedUsageStore.admit(`${subject}:hour:${Math.floor(Date.now() / 3_600_000)}`, 20, 0, Date.now()),
    ]);
    if (admissions.some(result => !result.allowed)) { audit("limited", attempt); return null; }
    // Atomic creation only after code + shared quotas pass. Empty update never
    // resets purchases/profile; a conflicting or upgraded identity fails closed.
    const user = await prisma.user.upsert({
      where: { id: config.userId }, update: {},
      create: { id: config.userId, email: config.email, name: "App Review", plan: "free" },
      select: { id: true, email: true, name: true, image: true, plan: true, stripeCustomerId: true,
        _count: { select: { accounts: true, subscriptions: true } } },
    });
    if (user.id !== config.userId || user.email !== config.email || user.plan !== "free" ||
        user.stripeCustomerId !== null || user._count.accounts !== 0 || user._count.subscriptions !== 0) {
      audit("denied", attempt); return null;
    }
    audit("accepted", attempt);
    return { id: user.id, email: user.email, name: user.name, image: user.image, plan: user.plan };
  } catch {
    audit("unavailable", attempt); return null;
  }
}
