import "server-only";
import { MONTHLY_PUBLIC_OFFER, monthlySellerDisclosure } from "./public-offer";
import { BillingError } from "../domain";
import type { MonthlyConfig, Realm } from "./domain";

export const monthlySelected = (env: Readonly<Record<string, string | undefined>> = process.env) => env.BILLING_PRODUCT === "subscription";
/** Dormant by default. Product selection is separate from sales and webhook operation. */
export function monthlyConfig(env: Readonly<Record<string, string | undefined>> = process.env): MonthlyConfig {
  const mode = env.BILLING_WEBHOOK_MODE;
  if (!monthlySelected(env) || mode !== "stripe-test" && mode !== "stripe-live") throw new BillingError("subscription_unconfigured", 503);
  if (env.VERCEL !== undefined || env.VERCEL_ENV !== undefined) {
    if (env.VERCEL !== "1" || !(mode === "stripe-live" && env.VERCEL_ENV === "production"
      || mode === "stripe-test" && env.VERCEL_ENV === "preview" && env.BILLING_PREVIEW_TEST_ENABLED === "true")) throw new BillingError("payment_mode_mismatch", 503);
  } else if (env.NODE_ENV === "production" && mode !== "stripe-live") throw new BillingError("payment_mode_mismatch", 503);
  const origin = env.BILLING_ORIGIN ?? "http://localhost:3338";
  const url = new URL(origin);
  if (url.origin !== origin || !["http:", "https:"].includes(url.protocol) || mode === "stripe-live" && url.protocol !== "https:") throw new BillingError("invalid_origin", 503);
  const sourceInstance = env.BILLING_SOURCE_INSTANCE ?? "";
  if (!/^[A-Za-z0-9][A-Za-z0-9._-]{0,99}$/.test(sourceInstance)) throw new BillingError("source_instance_missing", 503);
  const number = (value: string | undefined, fallback: number, max: number) => {
    const n = value === undefined ? fallback : Number(value);
    if (!Number.isSafeInteger(n) || n < 1 || n > max) throw new BillingError("invalid_configuration", 503);
    return n;
  };
  const live = mode === "stripe-live";
  const priceId = (live ? env.BILLING_STRIPE_LIVE_PRICE_ID : env.BILLING_STRIPE_TEST_PRICE_ID) ?? "";
  const portalConfigurationId = env.BILLING_SUBSCRIPTION_PORTAL_CONFIGURATION_ID ?? "";
  const disclosureMode = env.BILLING_SELLER_DISCLOSURE_MODE;
  const onRequest = disclosureMode === "on-request";
  const disclosure = monthlySellerDisclosure();
  const seller = { name: onRequest ? "" : env.BILLING_SELLER_NAME ?? "", address: onRequest ? "" : env.BILLING_SELLER_ADDRESS ?? "", phone: onRequest ? "" : env.BILLING_SELLER_PHONE ?? "",
    support: env.BILLING_SUPPORT_EMAIL ?? "", refund: env.BILLING_REFUND_TERMS ?? "" };
  const sellerReady = onRequest
    ? disclosure.ready && env.BILLING_DISCLOSURE_WORKFLOW_APPROVED === "true"
      && seller.support === disclosure.email && !!seller.refund.trim()
    : (disclosureMode === undefined || disclosureMode === "direct") && Object.values(seller).every(v => v.trim());
  const starts = Date.parse(env.BILLING_STARTS_AT ?? ""), notice = Date.parse(env.BILLING_NOTICE_AT ?? "");
  const priceYen = number(env.BILLING_PRICE_YEN, MONTHLY_PUBLIC_OFFER.priceYen, 100000);
  const freeDaily = number(env.BILLING_FREE_DAILY, MONTHLY_PUBLIC_OFFER.freeDaily, 1000);
  const enabled = disclosure.ready && priceYen === MONTHLY_PUBLIC_OFFER.priceYen && freeDaily === MONTHLY_PUBLIC_OFFER.freeDaily
    && env.BILLING_MODE === mode && env.BILLING_SUBSCRIPTION_ENABLED === "true"
    && /^price_\w+$/.test(priceId) && /^bpc_\w+$/.test(portalConfigurationId)
    && sellerReady && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(seller.support)
    && Number.isFinite(starts) && Number.isFinite(notice) && notice <= starts && starts <= Date.now()
    && env.BILLING_LEGAL_REVIEWED === "true" && (!live || env.BILLING_LIVE_ACTIVATION === "approved"
      && env.BILLING_SUBSCRIPTION_TERMS_APPROVED === "true" && env.BILLING_COPY_UPDATED === "true"
      && !!env.BILLING_PRICE_YEN && !!env.BILLING_FREE_DAILY && !!env.BILLING_SUBSCRIPTION_TERMS_VERSION
      && !!env.DATABASE_URL && /^rk_live_/.test(env.BILLING_STRIPE_LIVE_SECRET_KEY ?? "")
      && /^whsec_\S+$/.test(env.BILLING_STRIPE_LIVE_WEBHOOK_SECRET ?? ""));
  return { mode: mode as Realm, sourceInstance, origin, enabled, priceId, portalConfigurationId,
    priceYen, freeDaily,
    termsVersion: env.BILLING_SUBSCRIPTION_TERMS_VERSION ?? "monthly-draft-v1", seller };
}
