import {expect,it,vi} from "vitest";
vi.mock("@/mobile/shared/material-source",()=>({materialGroups:()=>[{items:[{id:"skill-1",title:"技能1",href:"/denko2/skill/skill-1",problem:{answer:"DO_NOT_SERIALIZE"}}]}]}));
vi.mock("@/lib/exam-library-papers",()=>({loadExamPaper:()=>[{id:"paper-1",number:1,correctChoice:4,explanation:"DO_NOT_SERIALIZE"}]}));
vi.mock("@/lib/questions/get-questions",()=>({getQuestionsForExam:async()=>[]}));
vi.mock("@/lib/seo/question-url",()=>({findQuestionByRoute:()=>({id:"ip-1",qNumber:1,answer:"DO_NOT_SERIALIZE"})}));
import {ContentPage} from "@/mobile/server/ContentPage";
it("serializes IDs and labels only for ordinary, alternative, and library SSR/RSC",async()=>{
  for(const path of ["/q/ip/2026-cbt/am/q1","/denko2/skill/skill-1","/e-learning/exams/test"]){
    const element=await ContentPage({path});const serialized=JSON.stringify(element);
    expect(serialized).not.toContain("DO_NOT_SERIALIZE");expect(serialized).not.toContain("correctChoice");
    expect(element.props.items).toHaveLength(1);
  }
});
