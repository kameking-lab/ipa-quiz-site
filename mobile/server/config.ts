import "server-only";
import { BillingError } from "@/lib/billing/domain";
export function mobileConfig(env: NodeJS.ProcessEnv = process.env) {
  const production = env.NODE_ENV === "production";
  return {
    enabled: env.MOBILE_IAP_ENABLED === "true",
    environment: production && env.VERCEL_ENV !== "preview" ? "PRODUCTION" : "SANDBOX",
    entitlement: env.MOBILE_RC_ENTITLEMENT ?? "kakomon_pro",
    productId: env.MOBILE_RC_PRODUCT_ID ?? "",
    appId: env.MOBILE_RC_APP_ID ?? "",
    offeringId: env.MOBILE_RC_OFFERING_ID ?? "",
    sdkKey: env.MOBILE_RC_IOS_PUBLIC_KEY ?? "",
    apiKey: env.MOBILE_RC_SECRET_KEY ?? "",
    webhookAuthorization: env.MOBILE_RC_WEBHOOK_AUTHORIZATION ?? "",
    identitySecret: env.MOBILE_RC_IDENTITY_SECRET ?? "",
    leasePrivateKey: env.MOBILE_LEASE_PRIVATE_KEY ?? "",
    leasePublicKey: env.MOBILE_LEASE_PUBLIC_KEY ?? "",
  };
}
export function requireMobileReady() {
  const c = mobileConfig();
  if (!c.enabled || c.entitlement!=="kakomon_pro" || !c.productId || !c.appId || !c.identitySecret || !c.apiKey) throw new BillingError("mobile_iap_unconfigured", 503);
  return c;
}
