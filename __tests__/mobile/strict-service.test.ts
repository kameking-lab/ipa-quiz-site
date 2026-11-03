import {afterEach,expect,it,vi} from "vitest";
import {BillingService} from "@/lib/billing/service";
import {billingConfig} from "@/lib/billing/config";
import {MemoryStore} from "../billing/memory-store";
afterEach(()=>vi.unstubAllEnvs());
it("serializes concurrent cross-device requests into exactly ten grants, disabling the old free grace",async()=>{
  vi.stubEnv("MOBILE_IAP_ENABLED","true");
  const store=new MemoryStore(),c={...billingConfig({}),mode:"mock" as const,transitionStartsAt:"2026-10-02T00:00:00.000Z",transitionDays:90};
  let now=new Date("2026-10-25T14:59:59Z");
  const web=new BillingService(store,c,()=>now),app=new BillingService(store,c,()=>now);
  expect((await web.status("alice")).entitled).toBe(false);
  const results=await Promise.allSettled(Array.from({length:11},(_,i)=>(i%2?web:app).grant("alice",`exam-${i}`)));
  expect(results.filter(r=>r.status==="fulfilled")).toHaveLength(10);
  expect(results.filter(r=>r.status==="rejected")).toHaveLength(1);
  await expect(app.grant("alice","exam-0")).resolves.toMatchObject({remaining:0});
  now=new Date("2026-10-25T15:00:00Z");await expect(web.grant("alice","new-day")).resolves.toMatchObject({remaining:9});
});
