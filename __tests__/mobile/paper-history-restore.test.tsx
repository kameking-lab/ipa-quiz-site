import {afterEach,beforeEach,expect,it,vi} from "vitest";
import {act,cleanup,fireEvent,render,screen,within} from "@testing-library/react";
import {AuthorizedContent} from "@/mobile/shared/AuthorizedContent";
import {createExamProgress,examProgressKey} from "@/lib/exam-library-progress";
import type {ExamQuestion} from "@/lib/exam-library-model";
import {LS_KEYS} from "@/lib/storage/keys";
const paper="lckohyo-TEST01";
const rows:ExamQuestion[]=Array.from({length:12},(_,i)=>({id:`${paper}-q${i+1}`,number:i+1,text:`境界本文${i+1}`,images:[],choiceCount:3,correctChoice:2,answerAuthority:"official"}));
const index=rows.map(({id,number,choiceCount,answerAuthority})=>({id,number,choiceCount,answerAuthority,scorable:true}));
const mount=(view:"question"|"summary"="summary",initialId?:string)=>render(<AuthorizedContent paper={paper} paperIndex={index} items={[]} initialView={view} initialId={initialId}/>);
beforeEach(()=>{localStorage.clear();sessionStorage.clear();});
afterEach(()=>{cleanup();vi.unstubAllGlobals();});

for(const used of [0,4,10])for(const save of [false,true])it(`restores 11 answers with ${used} daily grants used and save=${save}, without bulk body grants`,async()=>{
  const answers=Object.fromEntries(rows.slice(0,11).map((q,i)=>[q.id,{choice:i%2?2:1,memo:"保存メモ",submitted:true}]));
  const progress=createExamProgress(paper,answers,rows[10].id,new Date("2026-11-03T14:59:59Z"));
  if(save)localStorage.setItem(examProgressKey(paper),JSON.stringify(progress));
  else sessionStorage.setItem(`${LS_KEYS.examLibrarySessionPrefix}${paper}`,JSON.stringify({progress}));
  const bodies:string[]=[],today=new Set(Array.from({length:used},(_,i)=>`other-${i}`));
  vi.stubGlobal("fetch",vi.fn(async(url:unknown,init?:RequestInit)=>{
    const body=JSON.parse(String(init?.body));
    if(String(url).endsWith("/paper-results"))return Response.json({results:body.answers.map((a:{id:string;choice:number})=>({...a,result:a.choice===2?"correct":"incorrect"}))});
    bodies.push(body.id);
    if(!today.has(body.id)&&today.size>=10)return Response.json({error:"daily_limit"},{status:429});
    today.add(body.id);return Response.json({question:rows.find(q=>q.id===body.id)});
  }));
  mount();await screen.findByRole("button",{name:"間違えた6問を解き直す"});
  expect(screen.getByText("11／12問")).toBeVisible();expect(bodies).toEqual([]);expect(today.size).toBe(used);
  const section=screen.getByRole("heading",{name:"結果と見直し"}).closest("section")!;
  expect(within(section).getByText("正解",{selector:"dt"}).nextElementSibling).toHaveTextContent("5問");
  fireEvent.click(screen.getByRole("button",{name:"問11を開く"}));
  if(used===10) {
    await screen.findByRole("alert");fireEvent.click(screen.getByRole("button",{name:"結果を見る"}));
    expect(await screen.findByRole("heading",{name:"結果と見直し"})).toBeVisible();
    fireEvent.click(screen.getByRole("button",{name:"間違えた6問を解き直す"}));
    await screen.findByRole("alert");fireEvent.click(screen.getByRole("button",{name:"結果を見る"}));
    expect(screen.getByText("11／12問")).toBeVisible();
    if(save)expect(Object.values(JSON.parse(localStorage.getItem(examProgressKey(paper))!).answers).filter((a:any)=>a.submitted)).toHaveLength(11);
  } else {
    await screen.findByText("境界本文11");
    fireEvent.click(screen.getByRole("button",{name:"結果を見る"}));
    fireEvent.click(screen.getByRole("button",{name:"間違えた6問を解き直す"}));
    await screen.findByText("境界本文1");expect(screen.getByRole("radiogroup")).toBeVisible();
  }
  expect(bodies.every(id=>id===rows[10].id||id===rows[0].id)).toBe(true);
});
it("keeps an allowed current question interactive when historic grading fails or is still pending",async()=>{
  let finish!:(response:Response)=>void;
  const progress=createExamProgress(paper,Object.fromEntries(rows.slice(0,11).map(q=>[q.id,{choice:1,memo:"",submitted:true}])),rows[11].id);
  localStorage.setItem(examProgressKey(paper),JSON.stringify(progress));
  const fetcher=vi.fn(async(url:unknown,init?:RequestInit)=>String(url).endsWith("/paper-results")?new Promise<Response>(resolve=>{finish=resolve;}):Response.json({question:rows.find(q=>q.id===JSON.parse(String(init?.body)).id)}));
  vi.stubGlobal("fetch",fetcher);mount();
  await screen.findByText("11／12問");fireEvent.click(screen.getByRole("button",{name:"未回答の問題から続ける"}));
  await screen.findByText("境界本文12");fireEvent.click(screen.getByRole("radio",{name:/^選択肢 2:/}));
  expect(screen.getByRole("radio",{name:/^選択肢 2:/})).toHaveAttribute("aria-checked","true");
  await act(async()=>finish(Response.json({error:"billing_unavailable"},{status:503})));
  expect(screen.getByText("境界本文12")).toBeVisible();
  expect(fetcher.mock.calls.filter(([url])=>String(url).endsWith("/question"))).toHaveLength(1);
});
