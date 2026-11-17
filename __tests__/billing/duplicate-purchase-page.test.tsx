// @vitest-environment node
import { renderToStaticMarkup } from "react-dom/server";
import { beforeEach, expect, it, vi } from "vitest";
import type { ReactNode } from "react";
const m = vi.hoisted(()=>({stripe:false,app:false}));
vi.mock("@/lib/billing/runtime",()=>({billingIdentity:async()=>"owner"}));
vi.mock("@/lib/billing/subscription/config",()=>({monthlyConfig:()=>({enabled:true})}));
vi.mock("@/lib/billing/subscription/runtime",()=>({monthlyRuntime:()=>({service:{status:async()=>({entitled:m.stripe,canManage:false,subscription:null})}})}));
vi.mock("@/mobile/server/revenuecat",()=>({revenueCatAccess:async()=>m.app?{}:null}));
// The client account-status guard is covered by auth/login-prompts.test.tsx.
// This server-rendered fixture represents its signed-out reminder slot.
vi.mock("@/components/account/AccountNavigation",()=>({SignedOutOnly:({children}:{children:ReactNode})=>children}));
import MonthlyPage from "@/app/billing/MonthlyPage";
beforeEach(()=>{m.stripe=false;m.app=false;});
it("keeps one signed-out purchase reminder beside the current plan offer",async()=>{
  const html=renderToStaticMarkup(await MonthlyPage());
  expect(html).toContain("購入済みの方は、購入したときと同じ方法（Google / Apple）でログインしてください。");
  expect(html.split("購入したときと同じ方法")).toHaveLength(2);
  expect(html).toContain("data-monthly-plan");
  expect(html.indexOf("購入したときと同じ方法")).toBeGreaterThan(html.indexOf("data-monthly-plan"));
});
it.each(["stripe","app"] as const)("hides both purchase and the reminder for an existing %s member",async source=>{
  m[source]=true;const html=renderToStaticMarkup(await MonthlyPage());
  expect(html).toContain("追加購入は不要");expect(html).not.toContain("同じ方法");expect(html).not.toContain("data-monthly-plan");
});
