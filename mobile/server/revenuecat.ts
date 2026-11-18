import "server-only";
import { createHmac, timingSafeEqual } from "node:crypto";
import { z } from "zod";
import { prisma } from "@/lib/db/prisma";
import { BillingError } from "@/lib/billing/domain";
import type { AppStorePurchaseState } from "@/lib/billing/subscription/domain";
import { requireMobileReady, mobileConfig } from "./config";
import { auditDuplicatePurchases } from "@/lib/billing/duplicate-purchase-runtime";

export function appUserIdentity(userId: string, secret: string) {
  if (secret.length < 32) throw new BillingError("mobile_identity_unconfigured", 503);
  return `kakomon_${createHmac("sha256", secret).update(`rc:v1:${userId}`).digest("hex")}`;
}
export function validWebhookAuthorization(actual: string | null, expected: string) {
  return expected.length >= 32 && actual !== null && Buffer.byteLength(actual) === Buffer.byteLength(expected)
    && timingSafeEqual(Buffer.from(actual), Buffer.from(expected));
}
const subscriberSchema = z.object({ subscriber: z.object({
  entitlements: z.record(z.string(), z.object({ product_identifier: z.string(), expires_date: z.string().nullable(), purchase_date: z.string(), grace_period_expires_date:z.string().nullable().optional() })),
  subscriptions: z.record(z.string(), z.object({ store: z.string(), is_sandbox: z.boolean(), expires_date: z.string().nullable(), refunded_at: z.string().nullable().optional(), grace_period_expires_date:z.string().nullable().optional(),
    billing_issues_detected_at: z.string().nullable().optional(), unsubscribe_detected_at: z.string().nullable().optional(),
  })),
}) });
type StoreConfig = { entitlement: string; productId: string; environment: string };
function parseSubscriber(body: unknown) {
  const parsed = subscriberSchema.safeParse(body);
  if (!parsed.success) {
    console.error("[revenuecat] unexpected subscriber shape", parsed.error.issues.slice(0, 5).map(issue => issue.path.join(".")).join(","));
    throw new BillingError("mobile_verification_unexpected_response", 503);
  }
  return parsed.data.subscriber;
}
type Subscriber = ReturnType<typeof parseSubscriber>;
function verifiedAppStoreSubscription(subscriber: Subscriber, config: StoreConfig) {
  if (!["PRODUCTION","SANDBOX","APP_STORE"].includes(config.environment)) return null;
  const sub = subscriber.subscriptions[config.productId];
  return sub && sub.store === "app_store" && !sub.refunded_at
    && (config.environment === "APP_STORE" || sub.is_sandbox === (config.environment === "SANDBOX")) ? sub : null;
}
function accessExpiration(subscriber: Subscriber, config: StoreConfig, now: number): string | null {
  const e = subscriber.entitlements[config.entitlement], sub = verifiedAppStoreSubscription(subscriber, config);
  if (!e || !sub || e.product_identifier !== config.productId || !e.expires_date || !sub.expires_date) return null;
  const regularEnd = Math.min(Date.parse(e.expires_date), Date.parse(sub.expires_date));
  // Only RevenueCat's verified App Store grace extends access; a billing issue
  // or cancellation alone never creates a new paid period.
  const subscriptionGrace=sub.grace_period_expires_date?Date.parse(sub.grace_period_expires_date):0;
  const entitlementGrace=e.grace_period_expires_date?Date.parse(e.grace_period_expires_date):subscriptionGrace;
  const graceEnd=Math.min(subscriptionGrace,entitlementGrace);
  const end=Math.max(regularEnd,Number.isFinite(graceEnd)?graceEnd:0);
  const purchased=Date.parse(e.purchase_date);
  if (!Number.isFinite(end) || end <= now || !Number.isFinite(purchased) || purchased > now) return null;
  return new Date(end).toISOString();
}
export function verifiedExpiration(body: unknown, config: StoreConfig, now: number): string | null {
  if (!["PRODUCTION","SANDBOX","APP_STORE"].includes(config.environment)) return null;
  return accessExpiration(parseSubscriber(body), config, now);
}
export function appStorePurchaseState(body: unknown, config: StoreConfig, now: number) {
  const subscriber = parseSubscriber(body);
  if (accessExpiration(subscriber, config, now)) return "active";
  const sub = verifiedAppStoreSubscription(subscriber, config);
  if (!sub?.expires_date) return null;
  const expiration = Date.parse(sub.expires_date);
  if (expiration > now) return "processing";
  const billingIssue = Date.parse(sub.billing_issues_detected_at ?? "");
  const unsubscribe = Date.parse(sub.unsubscribe_detected_at ?? "");
  // Apple may retry a lapsed renewal for up to 60 days. This affects purchases only.
  if (billingIssue <= now && !(unsubscribe < billingIssue) && now < expiration + 60 * 86400000) return "processing";
  return null;
}

async function fetchSubscriber(appUserId: string, apiKey: string, transport: typeof fetch) {
  const response = await transport(`https://api.revenuecat.com/v1/subscribers/${encodeURIComponent(appUserId)}`, {
    headers: { Authorization: `Bearer ${apiKey}`, Accept: "application/json" }, cache: "no-store", signal: AbortSignal.timeout(8000), redirect: "error",
  });
  if (response.status === 404) return null;
  if (!response.ok) {
    console.error("[revenuecat] subscriber lookup failed", response.status);
    throw new BillingError(`mobile_verification_unavailable_${response.status}`, 503);
  }
  return response.json() as Promise<unknown>;
}
export async function appStorePurchaseStatus(userId: string, requireVerification = false): Promise<AppStorePurchaseState> {
  if (!requireVerification && !mobileConfig().enabled) return null;
  const c = requireMobileReady();
  const { appUserId } = await ensureRevenueCatAccount(userId);
  const body = await fetchSubscriber(appUserId, c.apiKey, fetch);
  return body === null ? null : appStorePurchaseState(body, c, Date.now());
}
export async function appStorePurchaseCheck(userId: string, activeCode = "app_store_subscription_exists") {
  const state = await appStorePurchaseStatus(userId);
  if (state) throw new BillingError(state === "active" ? activeCode : "app_store_purchase_pending", 409);
}
interface AccountRow { userId: string; appUserId: string; expiresAt: Date | null; checkedAt: Date | null }
export async function ensureRevenueCatAccount(userId: string) {
  const c = requireMobileReady(), appUserId = appUserIdentity(userId, c.identitySecret);
  await prisma.$executeRawUnsafe('INSERT INTO "MobileRevenueCatAccount" ("userId", "appUserId") VALUES ($1,$2) ON CONFLICT ("userId") DO NOTHING', userId, appUserId);
  const rows = await prisma.$queryRawUnsafe<AccountRow[]>('SELECT * FROM "MobileRevenueCatAccount" WHERE "userId"=$1', userId);
  if (rows[0]?.appUserId !== appUserId) throw new BillingError("mobile_identity_conflict", 503);
  return rows[0];
}
/** Retry if another request saved a snapshot while RevenueCat was responding. */
export async function refreshRevenueCat(appUserId: string, transport: typeof fetch = fetch) {
  const c = requireMobileReady();
  for (let attempt = 0; attempt < 4; attempt++) {
    const [before] = await prisma.$queryRawUnsafe<AccountRow[]>('SELECT * FROM "MobileRevenueCatAccount" WHERE "appUserId"=$1', appUserId);
    if (!before) return null;
    const body = await fetchSubscriber(appUserId, c.apiKey, transport), now = Date.now();
    const productionExpiresAt = body ? verifiedExpiration(body,{...c,environment:"PRODUCTION"},now) : null;
    const sandboxExpiresAt = body ? verifiedExpiration(body,{...c,environment:"SANDBOX"},now) : null;
    const expiresAt = body ? verifiedExpiration(body,c,now) : null;
    const checkedAt = new Date(Math.max(now, (before.checkedAt?.getTime() ?? 0) + 1));
    // Both store environments are verified separately. The timestamp also
    // fences concurrent refreshes, including two that finish in the same ms.
    const [saved] = await prisma.$queryRawUnsafe<AccountRow[]>(`UPDATE "MobileRevenueCatAccount"
      SET "expiresAt"=$2, "checkedAt"=$3, "productionExpiresAt"=$4, "sandboxExpiresAt"=$5
      WHERE "appUserId"=$1 AND "userId"=$7 AND "checkedAt" IS NOT DISTINCT FROM $6::timestamptz
      RETURNING "userId","appUserId","expiresAt","checkedAt"`, appUserId, expiresAt ? new Date(expiresAt) : null, checkedAt,
    productionExpiresAt ? new Date(productionExpiresAt) : null, sandboxExpiresAt ? new Date(sandboxExpiresAt) : null, before.checkedAt, before.userId);
    if (saved) {
      await auditDuplicatePurchases(saved.userId);
      return saved;
    }
  }
  throw new BillingError("mobile_verification_unavailable", 503);
}
export async function revenueCatAccess(userId: string, fresh = false) {
  if (!mobileConfig().enabled) return null;
  const a = await ensureRevenueCatAccount(userId);
  const row = fresh || !a.checkedAt || Date.now() - a.checkedAt.getTime() > 60000 ? await refreshRevenueCat(a.appUserId) : a;
  return row && row.expiresAt && row.expiresAt.getTime() > Date.now() ? row : null;
}
