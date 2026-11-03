// @vitest-environment node
import { expect, it } from "vitest";
import { monthlyConfig } from "@/lib/billing/subscription/config";
const env = {
  BILLING_PRODUCT: "subscription", BILLING_MODE: "stripe-test", BILLING_WEBHOOK_MODE: "stripe-test",
  BILLING_SUBSCRIPTION_ENABLED: "true", BILLING_SOURCE_INSTANCE: "disclosure-fixture",
  BILLING_STRIPE_TEST_PRICE_ID: "price_fixture", BILLING_SUBSCRIPTION_PORTAL_CONFIGURATION_ID: "bpc_fixture",
  BILLING_ORIGIN: "http://localhost:3338", BILLING_STARTS_AT: "2026-01-02T00:00:00Z", BILLING_NOTICE_AT: "2026-01-01T00:00:00Z",
  BILLING_LEGAL_REVIEWED: "true", BILLING_SUPPORT_EMAIL: "kenshi.ycc@gmail.com", BILLING_REFUND_TERMS: "approved fixture policy",
  BILLING_SELLER_DISCLOSURE_MODE: "on-request", BILLING_DISCLOSURE_WORKFLOW_APPROVED: "true",
};
it("explicit approved mail/manual disclosure works without storing seller PII in app config",()=>{
  const result=monthlyConfig(env);expect(result.enabled).toBe(true);
  expect(result.seller).toMatchObject({name:"",address:"",phone:""});
});
it.each([
  {BILLING_DISCLOSURE_WORKFLOW_APPROVED:undefined}, {BILLING_DISCLOSURE_WORKFLOW_APPROVED:"false"},
  {BILLING_DISCLOSURE_WORKFLOW_APPROVED:"1"},
  {BILLING_SUPPORT_EMAIL:"other@example.invalid"}, {BILLING_REFUND_TERMS:""},
  {BILLING_SELLER_DISCLOSURE_MODE:undefined}, {BILLING_SELLER_DISCLOSURE_MODE:"direct"},
  {BILLING_SELLER_DISCLOSURE_MODE:"unknown"}, {BILLING_LEGAL_REVIEWED:"false"},
  {BILLING_SELLER_DISCLOSURE_MODE:""}, {BILLING_REFUND_TERMS:"   "},
  {BILLING_MODE:"off"}, {BILLING_PRICE_YEN:"981"}, {BILLING_FREE_DAILY:"11"},
])("does not bypass another required sales condition: %j",change=>{expect(monthlyConfig({...env,...change}).enabled).toBe(false);});
it("direct mode continues requiring all seller fields and does not inherit the manual-workflow exception",()=>{
  const direct={...env,BILLING_SELLER_DISCLOSURE_MODE:"direct",BILLING_SELLER_NAME:"fixture",BILLING_SELLER_ADDRESS:"fixture",BILLING_SELLER_PHONE:"000"};
  expect(monthlyConfig(direct).enabled).toBe(true);
  expect(monthlyConfig({...direct,BILLING_SELLER_PHONE:""}).enabled).toBe(false);
});
it("on-request config never returns private seller fields even if they exist in the environment",()=>{
  const result=monthlyConfig({...env,BILLING_SELLER_NAME:"PRIVATE_NAME",BILLING_SELLER_ADDRESS:"PRIVATE_ADDRESS",BILLING_SELLER_PHONE:"PRIVATE_PHONE"});
  expect(result.enabled).toBe(true);expect(result.seller).toMatchObject({name:"",address:"",phone:""});
});
it("on-request verification never replaces the existing production activation/key/storage gates",()=>{
  const live={...env,BILLING_MODE:"stripe-live",BILLING_WEBHOOK_MODE:"stripe-live",BILLING_ORIGIN:"https://fixture.example.invalid",BILLING_STRIPE_LIVE_PRICE_ID:"price_fixture"};
  expect(monthlyConfig(live).enabled).toBe(false);
});
