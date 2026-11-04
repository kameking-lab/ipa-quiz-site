// @vitest-environment node
import {afterEach,expect,it,vi} from "vitest";
vi.mock("@/mobile/server/ContentPage",()=>({ContentPage:()=>null}));
vi.mock("@/components/quiz/Fp2PracticalView",()=>({Fp2PracticalView:()=>null}));
vi.mock("@/components/quiz/Fp3PracticalView",()=>({Fp3PracticalView:()=>null}));
const body="PROTECTED_QUESTION_BODY_FOR_METADATA";
vi.mock("@/lib/fp2/practical",()=>({FP2_PRACTICAL_EDITIONS:[],getPracticalEdition:()=>({label:"fixture",questions:[{number:1,body:"PROTECTED_QUESTION_BODY_FOR_METADATA"}]}),practicalSourceUrls:()=>({})}));
vi.mock("@/lib/fp3/practical",()=>({FP3_PRACTICAL_EDITIONS:[],getPracticalEdition:()=>({label:"fixture",questions:[{number:1,stem:"PROTECTED_QUESTION_BODY_FOR_METADATA"}]}),practicalSourceUrls:()=>({})}));
import {generateMetadata as fp2} from "@/app/fp2/practical/[edition]/[number]/page";
import {generateMetadata as fp3} from "@/app/fp3/practical/[edition]/[number]/page";
afterEach(()=>vi.unstubAllEnvs());
it("does not put protected FP bodies into HTML/Flight metadata when the shared gate is enabled",async()=>{
  vi.stubEnv("MOBILE_IAP_ENABLED","true");
  for(const metadata of [fp2,fp3]){
    const result=await metadata({params:Promise.resolve({edition:"fixture",number:"1"})});
    expect(JSON.stringify(result)).not.toContain(body);
    expect(result.robots).toEqual({index:false,follow:true});
  }
});
it("keeps ordinary public metadata when the shared gate is disabled",async()=>{
  vi.stubEnv("MOBILE_IAP_ENABLED","false");
  for(const metadata of [fp2,fp3])expect((await metadata({params:Promise.resolve({edition:"fixture",number:"1"})})).description).toBe(body);
});
