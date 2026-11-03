import {beforeEach,afterEach,expect,it,vi} from "vitest";
import {fireEvent,render,screen,waitFor,within,cleanup} from "@testing-library/react";
import {AuthorizedContent} from "@/mobile/shared/AuthorizedContent";
import type {ExamQuestion} from "@/lib/exam-library-model";
import {examProgressKey} from "@/lib/exam-library-progress";

const paper="lckohyo-TEST01";
const questions:ExamQuestion[]=Array.from({length:11},(_,i)=>({id:`${paper}-q${i+1}`,number:i+1,text:`許可本文${i+1}`,
  images:[],choiceCount:3,correctChoice:2,answerAuthority:"official"}));
const paperIndex=questions.map(({id,number,choiceCount,answerAuthority})=>({id,number,choiceCount,answerAuthority,scorable:true}));
function mount(initialId?:string,initialView?:"question"|"summary") {
  return render(<AuthorizedContent paper={paper} paperIndex={paperIndex} items={paperIndex.map(q=>({id:q.id,title:`問${q.number}`}))} initialId={initialId} initialView={initialView}/>);
}
function mockGrants(paid:boolean) {
  const granted=new Set<string>();
  const fetcher=vi.fn(async (_url:unknown,init?:RequestInit)=>{
    const {id}=JSON.parse(String(init?.body));
    const q=questions.find(q=>q.id===id);
    if(!q)throw Error("Unexpected content request");
    if(!paid&&!granted.has(id)&&granted.size>=10)return Response.json({error:"daily_limit"},{status:429});
    granted.add(id);return Response.json({question:q});
  });
  vi.stubGlobal("fetch",fetcher);return {fetcher,granted};
}
beforeEach(()=>{localStorage.clear();sessionStorage.clear();});
afterEach(()=>{cleanup();vi.unstubAllGlobals();});

for(const paid of [false,true])for(const save of [false,true]) {
  it(`retains whole-paper answers and wrong review after reload: paid=${paid}, save=${save}`,async()=>{
    const {fetcher}=mockGrants(paid);const first=mount();
    await screen.findByText("許可本文1");
    expect(fetcher).toHaveBeenCalledTimes(1); // no unread bodies or keys fetched
    if(save)fireEvent.click(screen.getByRole("checkbox",{name:"この端末に保存する"}));
    fireEvent.click(screen.getByRole("radio",{name:/^選択肢 1:/}));
    fireEvent.click(screen.getByRole("button",{name:"次の問題へ"}));
    await screen.findByText("許可本文2");
    fireEvent.click(screen.getByRole("radio",{name:/^選択肢 2:/}));
    fireEvent.click(screen.getByRole("button",{name:"前へ"}));
    await screen.findByText("許可本文1");
    expect(screen.getByRole("radio",{name:/^選択肢 1:/})).toHaveAttribute("aria-checked","true");
    if(save)expect(Object.keys(JSON.parse(localStorage.getItem(examProgressKey(paper))!).answers)).toHaveLength(2);
    else expect(localStorage.getItem(examProgressKey(paper))).toBeNull();
    first.unmount();mount(); // reload with same tab session, as the existing player promises
    await screen.findByText("許可本文1");
    expect(screen.getByRole("radio",{name:/^選択肢 1:/})).toHaveAttribute("aria-checked","true");
    fireEvent.click(screen.getByRole("button",{name:"結果を見る"}));
    await screen.findByRole("heading",{name:"結果と見直し"});
    expect(screen.getByText("2／11問")).toBeVisible();
    const summary=screen.getByRole("heading",{name:"結果と見直し"}).closest("section")!;
    expect(within(summary).getByText("正解",{selector:"dt"}).nextElementSibling).toHaveTextContent("1問");
    expect(within(summary).getByText("不正解",{selector:"dt"}).nextElementSibling).toHaveTextContent("1問");
    fireEvent.click(screen.getByRole("button",{name:"間違えた1問を解き直す"}));
    await screen.findByText("許可本文1");expect(screen.getByText(/解き直し 1問目／1問/)).toBeVisible();
    expect(fetcher.mock.calls.every(([,init])=>questions.slice(0,2).some(q=>JSON.parse(String(init?.body)).id===q.id))).toBe(true);
  });
}
it("restores an opted-in save on a fresh tab without losing either answer",async()=>{
  mockGrants(false);const first=mount();await screen.findByText("許可本文1");
  fireEvent.click(screen.getByRole("checkbox",{name:"この端末に保存する"}));
  fireEvent.click(screen.getByRole("radio",{name:/^選択肢 1:/}));
  fireEvent.click(screen.getByRole("button",{name:"次の問題へ"}));await screen.findByText("許可本文2");
  fireEvent.click(screen.getByRole("radio",{name:/^選択肢 2:/}));first.unmount();sessionStorage.clear();mount(undefined,"summary");
  await screen.findByRole("heading",{name:"結果と見直し"});expect(screen.getByText("2／11問")).toBeVisible();
  expect(screen.getByRole("button",{name:"間違えた1問を解き直す"})).toBeVisible();
});
it("keeps the free eleventh body and key behind the server denial",async()=>{
  const {granted}=mockGrants(false);mount();
  for(let n=1;n<=10;n++) {
    await screen.findByText(`許可本文${n}`);
    fireEvent.click(screen.getByRole("button",{name:"スキップして次へ"}));
  }
  await screen.findByRole("alert");expect(granted.size).toBe(10);
  expect(screen.queryByText("許可本文11")).not.toBeInTheDocument();expect(screen.queryByRole("radiogroup")).not.toBeInTheDocument();
});
it("resumes the requested middle ID without fetching the first question",async()=>{
  const {fetcher}=mockGrants(false);mount(questions[5].id);await screen.findByText("許可本文6");
  await waitFor(()=>expect(fetcher).toHaveBeenCalledTimes(1));expect(JSON.parse(String(fetcher.mock.calls[0][1]?.body)).id).toBe(questions[5].id);
});
it("does not persist opted-out answers into a fresh tab",async()=>{
  mockGrants(false);const first=mount();await screen.findByText("許可本文1");
  fireEvent.click(screen.getByRole("radio",{name:/^選択肢 1:/}));first.unmount();sessionStorage.clear();mount(undefined,"summary");
  await screen.findByRole("heading",{name:"結果と見直し"});expect(screen.getByText("0／11問")).toBeVisible();
  expect(screen.queryByRole("button",{name:"間違えた1問を解き直す"})).not.toBeInTheDocument();
});
it("keeps descriptive memos for both questions across navigation and reload",async()=>{
  const rows=questions.slice(0,2).map(q=>({...q,choiceCount:0,correctChoice:null,answerAuthority:"descriptive" as const}));
  const index=rows.map(({id,number,choiceCount,answerAuthority})=>({id,number,choiceCount,answerAuthority,scorable:false}));
  vi.stubGlobal("fetch",vi.fn(async(_url:unknown,init?:RequestInit)=>Response.json({question:rows.find(q=>q.id===JSON.parse(String(init?.body)).id)})));
  const show=()=>render(<AuthorizedContent paper={paper} paperIndex={index} items={index.map(q=>({id:q.id,title:`問${q.number}`}))}/>);
  const first=show();await screen.findByText("許可本文1");
  fireEvent.change(screen.getByRole("textbox"),{target:{value:"問1の大事なメモ"}});fireEvent.click(screen.getByRole("button",{name:"模範解答を見る"}));
  fireEvent.click(screen.getByRole("button",{name:"次の問題へ"}));await screen.findByText("許可本文2");
  fireEvent.change(screen.getByRole("textbox"),{target:{value:"問2のメモ"}});fireEvent.click(screen.getByRole("button",{name:"模範解答を見る"}));
  fireEvent.click(screen.getByRole("button",{name:"前へ"}));expect(screen.getByRole("textbox")).toHaveValue("問1の大事なメモ");
  first.unmount();show();await screen.findByText("許可本文1");expect(screen.getByRole("textbox")).toHaveValue("問1の大事なメモ");
  fireEvent.click(screen.getByRole("button",{name:"次の問題へ"}));await screen.findByText("許可本文2");expect(screen.getByRole("textbox")).toHaveValue("問2のメモ");
});
