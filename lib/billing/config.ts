import "server-only";
import { createHash } from "node:crypto";

export interface BillingConfig {
  mode: "off" | "mock" | "stripe-test" | "stripe-live";
  livePriceId?: string;
  migrationPolicyUrl?: string;
  sourceInstance?: string;
  priceYen: number;
  days: number;
  freeDaily: number;
  origin: string;
  termsVersion: string;
  transitionStartsAt: string | null;
  transitionDays: number;
  transitionEndsAt?: string | null;
  noticeAt: string | null;
  legalReviewed: boolean;
  seller: { name: string; address: string; phone: string; support: string; refund: string };
}

function integer(value: string | undefined, fallback: number, max: number) {
  if (value === undefined) return fallback;
  const n = Number(value);
  if (!Number.isSafeInteger(n) || n < 1 || n > max) throw new Error("Invalid billing configuration");
  return n;
}

/** One realm per process. A hosted sandbox requires an explicitly opted-in, confirmed Vercel Preview. */
function realmAllowed(mode: Exclude<BillingConfig["mode"], "off">, env: Readonly<Record<string, string | undefined>>) {
  const vercelContext = env.VERCEL !== undefined || env.VERCEL_ENV !== undefined;
  if (vercelContext) {
    if (env.VERCEL !== "1") return false;
    if (env.VERCEL_ENV === "preview") return mode === "stripe-test" && env.BILLING_PREVIEW_TEST_ENABLED === "true";
    if (env.VERCEL_ENV === "production") return mode === "stripe-live";
    return false; // Missing, development, or unknown hosted environment: no payment realm.
  }
  return env.NODE_ENV !== "production" || mode === "stripe-live";
}

/** Only the opted-in Preview may derive an origin from trusted platform metadata. */
function billingOrigin(mode: BillingConfig["mode"], env: Readonly<Record<string, string | undefined>>) {
  // An explicit value, including an invalid/empty one, must go through the existing validator.
  if (env.BILLING_ORIGIN !== undefined) return env.BILLING_ORIGIN;
  if (mode !== "stripe-test" || env.VERCEL !== "1" || env.VERCEL_ENV !== "preview"
    || env.BILLING_PREVIEW_TEST_ENABLED !== "true") return "http://localhost:3328";
  const hostname = env.VERCEL_URL ?? "";
  const match = /^ipa-quiz-site-[a-z0-9]{9}-kameking-labs-projects\.vercel\.app$/.exec(hostname);
  if (env.VERCEL_PROJECT_ID !== "prj_t0YGXuTY62TNajIJg2v6W68TciT1" || match?.[0] !== hostname) {
    throw new Error("Invalid Preview billing origin metadata");
  }
  return `https://${hostname}`;
}

/** Activation is an operator decision, never inferred from deploy, host or credentials alone. */
export function billingConfig(env: Readonly<Record<string, string | undefined>> = process.env): BillingConfig {
  const requested = env.BILLING_MODE ?? "off";
  const mode = (requested === "mock" || requested === "stripe-test" || requested === "stripe-live") && realmAllowed(requested, env)
    ? requested : "off";
  // Disabled billing must not make free learning depend on dormant billing settings.
  const off: BillingConfig = {
    mode: "off", origin: "http://localhost:3328", priceYen: 980, days: 30, freeDaily: 10,
    termsVersion: "pass-test-v1", transitionStartsAt: null, transitionEndsAt: null,
    transitionDays: 90, noticeAt: null, legalReviewed: false,
    seller: { name: "", address: "", phone: "", support: "", refund: "" },
  };
  if (mode === "off") return off;
  if (mode === "stripe-live" && (env.BILLING_LIVE_ACTIVATION !== "approved"
    || !/^[a-zA-Z0-9][a-zA-Z0-9._-]{0,99}$/.test(env.BILLING_SOURCE_INSTANCE ?? "")
    || env.BILLING_WEBHOOK_MODE !== "stripe-live"
    || env.BILLING_COPY_UPDATED !== "true" || env.BILLING_ANONYMOUS_MIGRATION_APPROVED !== "true"
    || !env.DATABASE_URL || !/^(rk|sk)_live_/.test(env.BILLING_STRIPE_LIVE_SECRET_KEY ?? "")
    || !/^whsec_\S+$/.test(env.BILLING_STRIPE_LIVE_WEBHOOK_SECRET ?? "")
    || !/^price_\w+$/.test(env.BILLING_STRIPE_LIVE_PRICE_ID ?? ""))) return off;
  try {
    const origin = billingOrigin(mode, env);
    const url = new URL(origin);
    if (url.origin !== origin || !["http:", "https:"].includes(url.protocol)) throw new Error("Invalid billing origin");
    const cutoff = env.BILLING_TRANSITION_STARTS_AT;
    if (cutoff && !/^\d{4}-\d\d-\d\dT\d\d:\d\d:\d\d\.\d{3}Z$/.test(cutoff)) throw new Error("Invalid grandfather cutoff");
    if (cutoff && !Number.isFinite(Date.parse(cutoff))) throw new Error("Invalid grandfather cutoff");
    const end = env.BILLING_TRANSITION_ENDS_AT;
    if (end && (!cutoff || !Number.isFinite(Date.parse(end)) || Date.parse(end) <= Date.parse(cutoff))) throw new Error("Invalid transition end");
    const config: BillingConfig = {
      mode, origin, priceYen: integer(env.BILLING_PRICE_YEN, 980, 100000),
      days: integer(env.BILLING_PASS_DAYS, 30, 365), freeDaily: integer(env.BILLING_FREE_DAILY, 10, 1000),
      termsVersion: mode === "stripe-live" ? "pass-v1" : "pass-test-v1", transitionStartsAt: cutoff ?? null,
      transitionDays: integer(env.BILLING_TRANSITION_DAYS, 90, 365),
      transitionEndsAt: end ?? null,
      noticeAt: env.BILLING_NOTICE_AT ?? null, legalReviewed: env.BILLING_LEGAL_REVIEWED === "true",
      seller: { name: env.BILLING_SELLER_NAME ?? "", address: env.BILLING_SELLER_ADDRESS ?? "",
        phone: env.BILLING_SELLER_PHONE ?? "", support: env.BILLING_SUPPORT_EMAIL ?? "", refund: env.BILLING_REFUND_TERMS ?? "" },
      livePriceId: env.BILLING_STRIPE_LIVE_PRICE_ID,
      migrationPolicyUrl: env.BILLING_MIGRATION_POLICY_URL,
      sourceInstance: env.BILLING_SOURCE_INSTANCE,
    };
    if (mode === "stripe-live") {
      const policy = new URL(config.migrationPolicyUrl ?? "");
      if (url.protocol !== "https:" || policy.origin !== url.origin || !config.legalReviewed
        || !config.noticeAt || !cutoff || !Number.isFinite(Date.parse(config.noticeAt)) || Date.parse(config.noticeAt) >= Date.parse(cutoff)
        || !sellerReady(config)) return off;
    }
    return config;
  } catch (error) { if (mode === "stripe-live") return off; throw error; }
}

export function termsHash(c: BillingConfig) {
  return createHash("sha256").update(JSON.stringify({ price: c.priceYen, days: c.days, free: c.freeDaily,
    version: c.termsVersion, mode: c.mode, seller: c.seller, autoRenew: false, start: "durable-payment-confirmation", scope: "continuous-practice",
    transition: { start: c.transitionStartsAt, end: transitionEnd(c), notice: c.noticeAt, policy: c.migrationPolicyUrl } })).digest("hex");
}

/** Existing payments must reconcile even when new sales / practice restrictions are disabled. */
export function billingWebhookConfig(env: Readonly<Record<string, string | undefined>> = process.env): BillingConfig {
  const mode = env.BILLING_WEBHOOK_MODE;
  if (mode !== "stripe-test" && mode !== "stripe-live") throw new Error("Webhook realm is not configured");
  if (!realmAllowed(mode, env)) throw new Error("Webhook realm is not allowed in this environment");
  // No checkout permission: seller, notice and legal fields remain unset.
  return { ...billingConfig({}), mode, sourceInstance: env.BILLING_SOURCE_INSTANCE };
}

export function checkoutReady(c: BillingConfig) {
  return gateReady(c) && sellerReady(c);
}
function sellerReady(c: BillingConfig) {
  return Object.values(c.seller).every(v => v.trim().length > 0)
    && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(c.seller.support);
}

export function gateReady(c: BillingConfig, now = new Date()) {
  return c.mode !== "off" && c.legalReviewed && !!c.noticeAt && !!c.transitionStartsAt
    && Number.isFinite(Date.parse(c.noticeAt)) && Date.parse(c.noticeAt) <= Date.parse(c.transitionStartsAt)
    && Date.parse(c.transitionStartsAt) <= now.getTime();
}

export function transitionEnd(c: BillingConfig) {
  return c.transitionEndsAt ?? (c.transitionStartsAt ? new Date(Date.parse(c.transitionStartsAt) + c.transitionDays * 86400000).toISOString() : null);
}
