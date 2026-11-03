import "server-only";
import { createHmac, randomUUID, timingSafeEqual } from "node:crypto";
import { prisma } from "@/lib/db/prisma";
import { BillingError } from "@/lib/billing/domain";
import { billingConfig } from "@/lib/billing/config";
import { monthlyConfig, monthlySelected } from "@/lib/billing/subscription/config";
import { guestRealm } from "@/lib/billing/guest-practice";
import type { SqlSession } from "@/lib/billing/postgres-store";
import { FeedbackUnlockStore, type UnlockIdentity } from "./unlock-store";

export function feedbackRealm() {
  const config = monthlySelected() ? monthlyConfig() : billingConfig();
  return guestRealm(config.mode, config.sourceInstance);
}
export function feedbackHash(label: string, value: string) {
  if (!process.env.AUTH_SECRET) throw new BillingError("feedback_unavailable", 503);
  return createHmac("sha256", process.env.AUTH_SECRET).update(`feedback-unlock:v1:${label}:${value}`).digest("hex");
}
const BROWSER_COOKIE = "feedback_browser";
export function readFeedbackBrowser(request: Request): string | null {
  const raw = request.headers.get("cookie")?.split(";").map(c => c.trim()).find(c => c.startsWith(`${BROWSER_COOKIE}=`))?.slice(BROWSER_COOKIE.length + 1);
  const match = raw && /^([a-f0-9-]{36})\.([a-f0-9]{64})$/.exec(raw);
  if (!match) return null;
  const expected = Buffer.from(feedbackHash("browser-cookie", match[1]), "hex");
  return timingSafeEqual(expected, Buffer.from(match[2], "hex")) ? match[1] : null;
}
export function newFeedbackBrowser() { return randomUUID(); }
export function feedbackBrowserHeader(id: string, secure: boolean) {
  // Independent of the daily practice cookie's 30-day expiry. Renew with the same ID.
  return `${BROWSER_COOKIE}=${id}.${feedbackHash("browser-cookie", id)}; Path=/; HttpOnly; SameSite=Lax; Max-Age=34560000${secure ? "; Secure" : ""}`;
}
export function unlockIdentity(request: Request, userId: string | null, realm = feedbackRealm(), browserOverride?: string): UnlockIdentity {
  const browser = browserOverride ?? readFeedbackBrowser(request);
  return { realm, account: userId ? feedbackHash("account", userId) : null, browser: browser ? feedbackHash("browser", browser) : null };
}
export function feedbackStore() {
  if (!process.env.DATABASE_URL) throw new BillingError("feedback_unavailable", 503);
  const session = (client: Pick<typeof prisma, "$queryRawUnsafe">): SqlSession => ({ query: (sql, values) => client.$queryRawUnsafe(sql, ...values) });
  return new FeedbackUnlockStore({ ...session(prisma), transaction: fn => prisma.$transaction(tx => fn(session(tx)), { maxWait: 5000, timeout: 10000 }) });
}
