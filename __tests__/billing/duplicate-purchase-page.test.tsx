// @vitest-environment node
import { renderToStaticMarkup } from "react-dom/server";
import { beforeEach, expect, it, vi } from "vitest";
const m = vi.hoisted(()=>({stripe:false,app:false}));
vi.mock("@/lib/billing/runtime",()=>({billingIdentity:async()=>"owner"}));
vi.mock("@/lib/billing/subscription/config",()=>({monthlyConfig:()=>({enabled:true})}));
vi.mock("@/lib/billing/subscription/runtime",()=>({monthlyRuntime:()=>({service:{status:async()=>({entitled:m.stripe,canManage:false,subscription:null})}})}));
vi.mock("@/mobile/server/revenuecat",()=>({revenueCatAccess:async()=>m.app?{}:null}));
import MonthlyPage from "@/app/billing/MonthlyPage";
beforeEach(()=>{m.stripe=false;m.app=false;});
it("offers one checkout link when there is no existing purchase",async()=>{
  const html=renderToStaticMarkup(await MonthlyPage());
  expect(html.match(/data-monthly-plan/g)).toHaveLength(1);
  expect(html).not.toContain("購入したときと同じ方法");
});
it.each(["stripe","app"] as const)("hides both purchase and the reminder for an existing %s member",async source=>{
  m[source]=true;const html=renderToStaticMarkup(await MonthlyPage());
  expect(html).toContain("契約済みです");expect(html).not.toContain("初回7日間無料");expect(html).not.toContain("data-monthly-plan");
});
