import {expect,it,vi} from "vitest";
const mocks=vi.hoisted(()=>({rows:[{id:"essay-1",title:"表示名",question:"PROTECTED_BODY",modelAnswer:"PROTECTED_ANSWER"}]}));
vi.mock("@/lib/essay/load",()=>({getAllEssayQuestions:()=>mocks.rows}));
vi.mock("@/app/account/essay-history/EssayHistoryView",()=>({EssayHistoryView:()=>null}));
import Page from "@/app/account/essay-history/page";
it("passes only ID and title across the history client boundary",()=>{
  const page=Page();
  const serialized=JSON.stringify(page);
  expect(serialized).not.toContain("PROTECTED_BODY");expect(serialized).not.toContain("PROTECTED_ANSWER");
  const history=page.props.children[1];
  expect(history.props.questions).toEqual([{id:"essay-1",title:"表示名"}]);
});
