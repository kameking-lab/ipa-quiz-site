import "server-only";
import { sign } from "node:crypto";
import { billingRuntime } from "@/lib/billing/runtime";
import { monthlySelected } from "@/lib/billing/subscription/config";
import { monthlyRuntime } from "@/lib/billing/subscription/runtime";
import { mobileConfig } from "./config";
import { ensureRevenueCatAccount, revenueCatAccess } from "./revenuecat";
import type { MobileEntitlement } from "../shared/contracts";

export async function webEntitlement(userId: string) {
  const service = monthlySelected() ? monthlyRuntime().service : billingRuntime().service;
  return service.status(userId);
}
export function signLease(userId: string, expiresAt: string, now: number, privateKey: string) {
  const until = Math.min(Date.parse(expiresAt), now + 24 * 3600000);
  const payload = Buffer.from(JSON.stringify({ version: 1, userId, entitlement: "kakomon_pro", issuedAt: now, expiresAt: until })).toString("base64url");
  return `${payload}.${sign("sha256", Buffer.from(payload), {key:privateKey.replace(/\\n/g, "\n"),dsaEncoding:"ieee-p1363"}).toString("base64url")}`;
}
export async function mobileEntitlement(userId: string | null, fresh = false): Promise<MobileEntitlement> {
  const now = Date.now(), c = mobileConfig();
  const result: MobileEntitlement = { userId, appUserId: null, entitled: false, source: "free", expiresAt: null, checkedAt: new Date(now).toISOString(), lease: null };
  if (!userId) return result;
  // A failed web lookup must never expose a purchase button to an existing paying member.
  const web = await webEntitlement(userId);
  if (web.entitled && web.expiresAt) Object.assign(result, { entitled: true, source: "web", expiresAt: web.expiresAt });
  if (c.enabled) {
    const a = await ensureRevenueCatAccount(userId);
    result.appUserId = a.appUserId;
    if (!result.entitled) {
      const rc = await revenueCatAccess(userId, fresh);
      if (rc?.expiresAt) Object.assign(result, { entitled: true, source: "app-store", expiresAt: rc.expiresAt.toISOString() });
    }
  }
  if (result.entitled && result.expiresAt && c.leasePrivateKey) result.lease = signLease(userId, result.expiresAt, now, c.leasePrivateKey);
  return result;
}
