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
it("puts the login reminder next to the purchase button for a free account",async()=>{
  const html=renderToStaticMarkup(await MonthlyPage());
  expect(html).toContain("アプリで購入済みの方は、購入したときと同じ方法（Google / Apple）でログインしてください。");
  expect(html).toMatch(/月額980円で続ける<\/a><p[^>]*>アプリで購入済み/);
});
it.each(["stripe","app"] as const)("hides both purchase and the reminder for an existing %s member",async source=>{
  m[source]=true;const html=renderToStaticMarkup(await MonthlyPage());
  expect(html).toContain("追加購入は不要");expect(html).not.toContain("同じ方法");expect(html).not.toContain("月額980円で続ける");
});
