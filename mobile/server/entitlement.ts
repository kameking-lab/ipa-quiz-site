import "server-only";
import { createPrivateKey, createPublicKey, sign, verify, type KeyObject } from "node:crypto";
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
/**
 * Accepts the P-256 key as PEM (with real or escaped newlines) or as bare
 * base64 DER, the form the public key is stored in. Bare base64 used to be
 * passed to sign() as if it were PEM, which throws ERR_OSSL_UNSUPPORTED: every
 * entitled response failed right after a purchase ("会員状態を確認できません").
 */
function keyText(raw: string) { return raw.replace(/\\n/g, "\n").trim(); }
export function leaseSigningKey(raw: string): KeyObject {
  const text = keyText(raw);
  if (text.includes("-----BEGIN")) return createPrivateKey(text);
  const der = Buffer.from(text.replace(/\s/g, ""), "base64");
  try { return createPrivateKey({ key: der, format: "der", type: "pkcs8" }); }
  catch { return createPrivateKey({ key: der, format: "der", type: "sec1" }); }
}
export function leaseVerifyingKey(raw: string): KeyObject {
  const text = keyText(raw);
  if (text.includes("-----BEGIN")) return createPublicKey(text);
  return createPublicKey({ key: Buffer.from(text.replace(/\s/g, ""), "base64"), format: "der", type: "spki" });
}
export function signLease(userId: string, expiresAt: string, now: number, privateKey: string, publicKey = "") {
  const until = Math.min(Date.parse(expiresAt), now + 24 * 3600000);
  const payload = Buffer.from(JSON.stringify({ version: 1, userId, entitlement: "kakomon_pro", issuedAt: now, expiresAt: until })).toString("base64url");
  const signature = sign("sha256", Buffer.from(payload), { key: leaseSigningKey(privateKey), dsaEncoding: "ieee-p1363" });
  // A lease the app cannot verify is worse than none: catch a mismatched pair here.
  if (publicKey && !verify("sha256", Buffer.from(payload), { key: leaseVerifyingKey(publicKey), dsaEncoding: "ieee-p1363" }, signature)) throw new Error("lease key pair mismatch");
  return `${payload}.${signature.toString("base64url")}`;
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
  if (result.entitled && result.expiresAt && c.leasePrivateKey) {
    // Offline downloads need the lease; membership itself must never fail because of it.
    try { result.lease = signLease(userId, result.expiresAt, now, c.leasePrivateKey, c.leasePublicKey); }
    catch (error) {
      result.leaseError = "lease_key_invalid";
      console.error("[mobile/entitlement] lease signing failed", error instanceof Error ? `${error.name}:${(error as { code?: string }).code ?? error.message}` : "unknown");
    }
  }
  return result;
}
