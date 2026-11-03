import "server-only";
import { createHmac, timingSafeEqual } from "node:crypto";
import { z } from "zod";
import { prisma } from "@/lib/db/prisma";
import { BillingError } from "@/lib/billing/domain";
import { requireMobileReady, mobileConfig } from "./config";

export function appUserIdentity(userId: string, secret: string) {
  if (secret.length < 32) throw new BillingError("mobile_identity_unconfigured", 503);
  return `kakomon_${createHmac("sha256", secret).update(`rc:v1:${userId}`).digest("hex")}`;
}
export function validWebhookAuthorization(actual: string | null, expected: string) {
  return expected.length >= 32 && actual !== null && Buffer.byteLength(actual) === Buffer.byteLength(expected)
    && timingSafeEqual(Buffer.from(actual), Buffer.from(expected));
}
const subscriberSchema = z.object({ subscriber: z.object({
  entitlements: z.record(z.string(), z.object({ product_identifier: z.string(), expires_date: z.string().nullable(), purchase_date: z.string() })),
  subscriptions: z.record(z.string(), z.object({ store: z.string(), is_sandbox: z.boolean(), expires_date: z.string().nullable(), refunded_at: z.string().nullable().optional() })),
}) });
export function verifiedExpiration(body: unknown, config: { entitlement: string; productId: string; environment: string }, now: number): string | null {
  const { subscriber } = subscriberSchema.parse(body);
  const e = subscriber.entitlements[config.entitlement], sub = subscriber.subscriptions[config.productId];
  if (!e || !sub || e.product_identifier !== config.productId || sub.store !== "app_store" || sub.refunded_at
    || sub.is_sandbox !== (config.environment === "SANDBOX") || !e.expires_date || !sub.expires_date) return null;
  const end = Math.min(Date.parse(e.expires_date), Date.parse(sub.expires_date));
  const purchased=Date.parse(e.purchase_date);
  if (!Number.isFinite(end) || end <= now || !Number.isFinite(purchased) || purchased > now) return null;
  return new Date(end).toISOString();
}
interface AccountRow { userId: string; appUserId: string; expiresAt: Date | null; checkedAt: Date | null }
export async function ensureRevenueCatAccount(userId: string) {
  const c = requireMobileReady(), appUserId = appUserIdentity(userId, c.identitySecret);
  await prisma.$executeRawUnsafe('INSERT INTO "MobileRevenueCatAccount" ("userId", "appUserId") VALUES ($1,$2) ON CONFLICT ("userId") DO NOTHING', userId, appUserId);
  const rows = await prisma.$queryRawUnsafe<AccountRow[]>('SELECT * FROM "MobileRevenueCatAccount" WHERE "userId"=$1', userId);
  if (rows[0]?.appUserId !== appUserId) throw new BillingError("mobile_identity_conflict", 503);
  return rows[0];
}
/** Serialize BEFORE fetching the authoritative subscriber. Replayed/out-of-order webhooks cannot restore an old snapshot. */
export async function refreshRevenueCat(appUserId: string, transport: typeof fetch = fetch) {
  const c = requireMobileReady();
  return prisma.$transaction(async tx => {
    const rows = await tx.$queryRawUnsafe<AccountRow[]>('SELECT * FROM "MobileRevenueCatAccount" WHERE "appUserId"=$1 FOR UPDATE', appUserId);
    if (!rows[0]) return null;
    const response = await transport(`https://api.revenuecat.com/v1/subscribers/${encodeURIComponent(appUserId)}`, {
      headers: { Authorization: `Bearer ${c.apiKey}`, Accept: "application/json" }, cache: "no-store", signal: AbortSignal.timeout(8000), redirect: "error",
    });
    if (!response.ok && response.status !== 404) throw new BillingError("mobile_verification_unavailable", 503);
    const now = Date.now(), expiresAt = response.status === 404 ? null : verifiedExpiration(await response.json(), c, now);
    await tx.$executeRawUnsafe('UPDATE "MobileRevenueCatAccount" SET "expiresAt"=$2, "checkedAt"=$3 WHERE "appUserId"=$1', appUserId, expiresAt ? new Date(expiresAt) : null, new Date(now));
    return { ...rows[0], expiresAt: expiresAt ? new Date(expiresAt) : null, checkedAt: new Date(now) };
  }, { maxWait: 5000, timeout: 15000 });
}
export async function revenueCatAccess(userId: string, fresh = false) {
  if (!mobileConfig().enabled) return null;
  const a = await ensureRevenueCatAccount(userId);
  const row = fresh || !a.checkedAt || Date.now() - a.checkedAt.getTime() > 60000 ? await refreshRevenueCat(a.appUserId) : a;
  return row && row.expiresAt && row.expiresAt.getTime() > Date.now() ? row : null;
}
