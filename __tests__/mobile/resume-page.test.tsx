import {expect,it,vi} from "vitest";
vi.mock("@/lib/billing/content-policy",()=>({strictContentGateEnabled:()=>true}));
import ExamPage from "@/app/e-learning/exams/[id]/page";
it("forwards the resume query before returning the strict content page",async()=>{
  const result=await ExamPage({params:Promise.resolve({id:"lckohyo-LC20260401-2"}),searchParams:Promise.resolve({question:"lckohyo-LC20260401-2-q2",view:"summary"})});
  expect(result.props).toMatchObject({path:"/e-learning/exams/lckohyo-LC20260401-2",initialId:"lckohyo-LC20260401-2-q2",initialView:"summary"});
});
it("does not accept array-valued resume IDs",async()=>{
  const result=await ExamPage({params:Promise.resolve({id:"lckohyo-LC20260401-2"}),searchParams:Promise.resolve({question:["x","y"]})});
  expect(result.props.initialId).toBeUndefined();
});
