import "server-only";
import { createHash, createHmac, timingSafeEqual } from "node:crypto";
import { prisma } from "@/lib/db/prisma";
import { sharedUsageStore } from "@/lib/ai/usage-kv";
import { appReviewConfig } from "./app-review-config";
import { getClientIp } from "@/lib/rate-limit/server";

export function reviewSessionClaims(userId: string) {
  const config = appReviewConfig();
  if (!config || config.userId !== userId) return {};
  return { reviewVersion: createHmac("sha256", process.env.AUTH_SECRET!)
    .update(JSON.stringify([config.userId, config.email, config.codeHash, config.expiresAt])).digest("hex") };
}

export function reviewSessionValid(token: { id?: unknown; reviewVersion?: unknown }) {
  if (token.reviewVersion === undefined && token.id !== process.env.APP_REVIEW_USER_ID?.trim()) return true;
  if (typeof token.id !== "string" || !appReviewConfig()) return false;
  return typeof token.reviewVersion === "string" && token.reviewVersion === reviewSessionClaims(token.id).reviewVersion;
}

function audit(outcome: "denied" | "limited" | "unavailable" | "accepted", attempt: string) {
  // No input, address, raw IP, code/hash or transport errors in the audit log.
  console.info(JSON.stringify({ event: "app_review_login", outcome, attempt, at: new Date().toISOString() }));
}

export async function authorizeAppReview(credentials: Partial<Record<"email" | "code", unknown>>, request: Request) {
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
    const email = typeof credentials.email === "string" && credentials.email.length <= 254 ? credentials.email.trim().toLowerCase() : "";
    const code = typeof credentials.code === "string" && /^[A-Za-z0-9_-]{43,128}$/.test(credentials.code) ? credentials.code : "";
    const hash = createHash("sha256").update(code).digest();
    const matches = timingSafeEqual(hash, Buffer.from(config.codeHash, "hex"));
    if (!matches || !code || email !== config.email) { audit("denied", attempt); return null; }
    // Anonymous guesses cannot consume the shared valid-credential quota.
    // A 256-bit random secret protects against distributed guessing; this
    // second quota limits use of a leaked code across sources/instances.
    const subject = `app-review:${config.userId}:${config.codeHash}`;
    const admissions = await Promise.all([
      sharedUsageStore.admit(`${subject}:daily`, 100, 0, Date.now()),
      sharedUsageStore.admit(`${subject}:hour:${Math.floor(Date.now() / 3_600_000)}`, 20, 0, Date.now()),
    ]);
    if (admissions.some(result => !result.allowed)) { audit("limited", attempt); return null; }
    const user = await prisma.user.findUnique({ where: { id: config.userId }, select: { id: true, email: true, name: true, image: true, plan: true } });
    // Never create, link or upgrade an account. Deleted-account billing rows are excluded.
    if (!user || user.id.startsWith("deleted-billing-") || user.email?.toLowerCase() !== config.email || user.plan === "team") {
      audit("denied", attempt); return null;
    }
    audit("accepted", attempt);
    return user;
  } catch {
    audit("unavailable", attempt); return null;
  }
}
