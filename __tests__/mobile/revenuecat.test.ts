import { beforeEach, expect, it, vi } from "vitest";
import { appUserIdentity, validWebhookAuthorization, verifiedExpiration } from "@/mobile/server/revenuecat";
const now=Date.parse("2026-11-03T03:00:00Z");
const config={entitlement:"kakomon_pro",productId:"mock.monthly",environment:"SANDBOX"};
function snapshot(overrides:Record<string,unknown>={}) {
  return {subscriber:{entitlements:{kakomon_pro:{product_identifier:config.productId,purchase_date:new Date(now-86400000).toISOString(),expires_date:new Date(now+86400000).toISOString()}},
    subscriptions:{[config.productId]:{store:"app_store",is_sandbox:true,expires_date:new Date(now+86400000).toISOString(),...overrides}}}};
}
beforeEach(()=>{vi.stubEnv("MOBILE_IAP_ENABLED","false");});
it("uses a non-guessable stable server identity without exposing the site's user ID",()=>{
  const a=appUserIdentity("user1","x".repeat(32));expect(a).toMatch(/^kakomon_[a-f0-9]{64}$/);expect(a).not.toContain("user1");expect(appUserIdentity("user2","x".repeat(32))).not.toBe(a);expect(()=>appUserIdentity("u","short")).toThrow();
});
it("authenticates webhook authorization instead of trusting customer-supplied entitlement JSON",()=>{
  const expected="Bearer "+"x".repeat(32);expect(validWebhookAuthorization(expected,expected)).toBe(true);expect(validWebhookAuthorization(expected+"x",expected)).toBe(false);expect(validWebhookAuthorization(null,expected)).toBe(false);expect(validWebhookAuthorization("abc","abc")).toBe(false);
});
it("accepts only the configured App Store product in the matching environment",()=>{
  expect(verifiedExpiration(snapshot(),config,now)).toBe(new Date(now+86400000).toISOString());
  for(const invalid of [{store:"stripe"},{is_sandbox:false},{expires_date:new Date(now).toISOString()},{refunded_at:new Date(now-1).toISOString()},{expires_date:null}]) expect(verifiedExpiration(snapshot(invalid),config,now)).toBeNull();
  expect(verifiedExpiration(snapshot(),{...config,productId:"other"},now)).toBeNull();
  expect(verifiedExpiration(snapshot(),{...config,entitlement:"other"},now)).toBeNull();
  expect(()=>verifiedExpiration({entitled:true},config,now)).toThrow();
});
it("does not revoke a paid period just because auto-renewal is canceled",()=>{
  expect(verifiedExpiration(snapshot({unsubscribe_detected_at:new Date(now-100).toISOString()}),config,now)).not.toBeNull();
});
it("honors only the verified grace period and stops at its end, refund or environment mismatch",()=>{
  const grace=now+3600000;
  const body=snapshot({expires_date:new Date(now-1000).toISOString(),grace_period_expires_date:new Date(grace).toISOString()});
  body.subscriber.entitlements.kakomon_pro.expires_date=new Date(now-1000).toISOString();
  expect(verifiedExpiration(body,config,now)).toBe(new Date(grace).toISOString());
  expect(verifiedExpiration(body,config,grace)).toBeNull();
  expect(verifiedExpiration({...body,subscriber:{...body.subscriber,subscriptions:{[config.productId]:{...body.subscriber.subscriptions[config.productId],refunded_at:new Date(now-1).toISOString()}}}},config,now)).toBeNull();
  expect(verifiedExpiration(body,{...config,environment:"PRODUCTION"},now)).toBeNull();
});
it("does not turn a billing issue into an unlimited or malformed grace period",()=>{
  const expired={expires_date:new Date(now-1000).toISOString(),billing_issues_detected_at:new Date(now-2000).toISOString()};
  const body=snapshot(expired);body.subscriber.entitlements.kakomon_pro.expires_date=new Date(now-1000).toISOString();
  expect(verifiedExpiration(body,config,now)).toBeNull();
  const malformed=snapshot({...expired,grace_period_expires_date:"invalid"});
  malformed.subscriber.entitlements.kakomon_pro.expires_date=new Date(now-1000).toISOString();
  expect(verifiedExpiration(malformed,config,now)).toBeNull();
});

it("accepts Apple verified Sandbox on the production app API, never arbitrary stores, and expires review rights",()=>{
  const production={...config,environment:"APP_STORE"};
  expect(verifiedExpiration(snapshot(),production,now)).not.toBeNull();
  expect(verifiedExpiration(snapshot({is_sandbox:false}),production,now)).not.toBeNull();
  expect(verifiedExpiration(snapshot({store:"test_store"}),production,now)).toBeNull();
  expect(verifiedExpiration(snapshot(),production,now+86400000)).toBeNull();
});
