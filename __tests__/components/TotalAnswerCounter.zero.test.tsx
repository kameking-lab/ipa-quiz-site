// @vitest-environment jsdom
import { act, cleanup, render, screen, within } from "@testing-library/react";
import "@testing-library/jest-dom/vitest";
import { renderToString } from "react-dom/server";
import { afterEach, describe, expect, it, vi } from "vitest";
import { TotalAnswerCounter } from "@/components/home/TotalAnswerCounter";
import { StudyPresence } from "@/components/StudyPresence";
import { PRESENCE_EVENT, PRESENCE_REFRESH_MS, type StudyPresenceSnapshot } from "@/lib/study-presence";
import { measuredPresence, PRESENCE_STATE_EVENT } from "@/lib/study-presence-contract";

const suggestions = [{ name: "基本情報技術者", href: "/exams/fe" }];
const zero: StudyPresenceSnapshot = {count:0,exams:[]};
const positive = {count:2,exams:[{exam:"fe",count:2}]};
const viewer=()=>screen.getByRole("region",{name:/学習のご案内|前回取得時点の学習状況/});
const scene=()=>within(viewer()).getByRole("group",{name:/資格を紹介するイメージルーム|前回取得時点の集計に基づく/});
const seats=()=>within(scene()).queryAllByRole("button",{name:/チワワ/});
const emit=(detail:unknown,name=PRESENCE_STATE_EVENT)=>act(()=>window.dispatchEvent(new CustomEvent(name,{detail})));
const measured=(value=zero)=>({mode:"measured",snapshot:measuredPresence(value,Date.now()),previous:null});
function guidance(){expect(viewer()).toHaveAccessibleName("学習のご案内");expect(screen.getByText("資格紹介")).toBeVisible();expect(screen.getByRole("link",{name:"ほかの資格を探す"})).toHaveAttribute("href","#choose-qualification");}
afterEach(()=>{cleanup();vi.useRealTimers();vi.unstubAllGlobals();vi.restoreAllMocks();});

describe("public qualification guidance preserved beside the independent answer reward",()=>{
 it("server-renders qualification guidance and rejects legacy/unverified counts",()=>{
  const html=renderToString(<TotalAnswerCounter suggestions={suggestions}/>);expect(html).toContain("資格紹介");
  render(<TotalAnswerCounter suggestions={suggestions}/>);const stable=viewer();
  for(const detail of [null,{mode:"measured",snapshot:positive},{mode:"demo",snapshot:positive}]){emit(detail);guidance();expect(viewer()).toBe(stable);}
  emit(positive,PRESENCE_EVENT);guidance();expect(screen.queryByText(/前回取得時点の直近5分の学習者 2人/)).toBeNull();
 });
 it("retains a validated historical zero/positive and its original time after stale/90-second expiry",async()=>{
  vi.useFakeTimers();render(<TotalAnswerCounter suggestions={suggestions}/>);
  emit(measured());expect(screen.getByText("前回取得時点の直近5分の学習人数は0人です。")).toBeVisible();
  const sample=measured(positive);emit(sample);
  expect(screen.getByRole("listitem")).toHaveTextContent("前回取得時点の直近5分に2人が基本情報技術者を学習しました。");
  emit({mode:"stale",snapshot:null,previous:sample.snapshot,reason:"unavailable"});
  await act(async()=>{await vi.advanceTimersByTimeAsync(90_000);});
  expect(document.querySelector("time")).toHaveAttribute("datetime",sample.snapshot.measuredAt);
  expect(viewer()).toHaveAccessibleName("前回取得時点の学習状況");
  expect(screen.getByText(/リアルタイム表示ではありません/)).toBeVisible();
  expect(screen.getByText(/JST/)).toBeVisible();
 });
 it("keeps the directory link available without suggestions",()=>{
  render(<TotalAnswerCounter/>);
  for(const detail of [null,measured(),{mode:"promotion",snapshot:null}]){emit(detail);expect(screen.getByRole("link")).toHaveAttribute("href",detail?.mode==="measured"?"#home-directory-title":"#choose-qualification");}
 });
 it("paginates 25 historical learners as 12/12/1 without inventing seats",()=>{
  render(<TotalAnswerCounter suggestions={suggestions}/>);
  emit(measured({count:25,exams:[{exam:"fe",count:14},{exam:"ip",count:11}]}));expect(seats()).toHaveLength(12);
  act(()=>screen.getByRole("button",{name:"次の部屋"}).click());
  expect(within(scene()).getAllByRole("button",{name:/基本情報技術者のチワワ/})).toHaveLength(2);
  expect(within(scene()).getAllByRole("button",{name:/ITパスポートのチワワ/})).toHaveLength(10);
  act(()=>screen.getByRole("button",{name:"次の部屋"}).click());expect(seats()).toHaveLength(1);expect(screen.getByRole("button",{name:"次の部屋"})).toBeDisabled();
  emit(measured());expect(seats()).toHaveLength(0);expect(screen.queryByRole("navigation",{name:"自習室の部屋を選ぶ"})).toBeNull();
 });
 it("preserves selection, Escape clearing and focus return independently of reward controls",()=>{
  render(<TotalAnswerCounter suggestions={suggestions}/>);guidance();
  const seat=within(scene()).getByRole("button",{name:/基本情報技術者のチワワ/});act(()=>seat.click());expect(seat).toHaveAttribute("aria-pressed","true");
  expect(screen.getByRole("link",{name:"基本情報技術者の問題を見る"})).toHaveAttribute("href","/exams/fe");
  act(()=>scene().dispatchEvent(new KeyboardEvent("keydown",{key:"Escape",bubbles:true})));expect(seat).toHaveAttribute("aria-pressed","false");
  act(()=>seat.click());act(()=>screen.getByRole("button",{name:"選択を戻す"}).click());expect(seat).toHaveFocus();expect(seat).toHaveAttribute("aria-pressed","false");
 });
 it("uses real hourly client events and retains the historical measurement through unavailable refresh",async()=>{
  vi.useFakeTimers();vi.spyOn(navigator,"userAgent","get").mockReturnValue("Mozilla/5.0");
  vi.spyOn(document,"visibilityState","get").mockReturnValue("visible");
  const fetcher=vi.fn().mockImplementation(async()=>({ok:true,status:200,headers:new Headers(),json:async()=>measuredPresence(positive,Date.now())}));vi.stubGlobal("fetch",fetcher);
  render(<><StudyPresence/><TotalAnswerCounter suggestions={suggestions}/></>);await act(async()=>{await vi.advanceTimersByTimeAsync(1);});
  expect(fetcher).toHaveBeenCalledOnce();const first=document.querySelector("time")!.getAttribute("datetime");
  fetcher.mockResolvedValue({ok:false,status:503,headers:new Headers(),json:async()=>({count:999,exams:[]})});
  for(let elapsed=0;elapsed<PRESENCE_REFRESH_MS;elapsed+=60_000){act(()=>window.dispatchEvent(new Event("pointerdown")));await act(async()=>{await vi.advanceTimersByTimeAsync(60_000);});}
  expect(fetcher).toHaveBeenCalledTimes(2);expect(document.querySelector("time")).toHaveAttribute("datetime",first);
  expect(screen.queryByText(/999人/)).toBeNull();expect(seats()).toHaveLength(2);expect(screen.getByText(/リアルタイム表示ではありません/)).toBeVisible();
 });
 it("does not carry selected qualifications across introduction, changed measurement or room",()=>{
  render(<TotalAnswerCounter suggestions={[...suggestions,...suggestions,{name:"ITパスポート",href:"/ip"}]}/>);expect(seats()).toHaveLength(2);
  act(()=>within(scene()).getByRole("button",{name:/基本情報技術者のチワワ/}).click());
  emit(measured({count:1,exams:[{exam:"ip",count:1}]}));expect(screen.queryByRole("button",{name:"選択を戻す"})).toBeNull();expect(seats()[0]).toHaveAttribute("aria-pressed","false");
  emit(measured({count:25,exams:[{exam:"ip",count:25}]}));act(()=>seats()[0].click());act(()=>screen.getByRole("button",{name:"次の部屋"}).click());expect(screen.queryByRole("button",{name:"選択を戻す"})).toBeNull();
 });
 it("bounds a million-person history to twelve visible DOM seats",()=>{
  render(<TotalAnswerCounter suggestions={suggestions}/>);emit(measured({count:1_000_000,exams:[{exam:"fe",count:1_000_000}]}));
  expect(seats()).toHaveLength(12);expect(screen.getAllByText("部屋 1 / 83,334")).toHaveLength(2);
 });
});

describe("preserved study-room visibility",()=>{
 function setup(){
  const observers=new Map<Element,{callback:(entries:Partial<IntersectionObserverEntry>[])=>void;disconnect:ReturnType<typeof vi.fn>}>();
  vi.stubGlobal("IntersectionObserver",class {disconnect=vi.fn();constructor(private callback:(entries:Partial<IntersectionObserverEntry>[])=>void){}observe(element:Element){observers.set(element,{callback:this.callback,disconnect:this.disconnect});}});
  const view=render(<TotalAnswerCounter suggestions={suggestions}/>),element=scene(),observer=observers.get(element)!;
  return {...view,element,disconnect:observer.disconnect,visible:(visible:boolean)=>act(()=>observer.callback([{isIntersecting:visible,intersectionRatio:visible?1:0}]))};
 }
 it("rests offscreen through data/room/selection changes and resumes only when visible",()=>{
  const view=setup();expect(view.element).toHaveAttribute("data-motion-visible","false");view.visible(true);expect(view.element).toHaveAttribute("data-motion-visible","true");view.visible(false);
  emit(measured({count:13,exams:[{exam:"fe",count:13}]}));act(()=>screen.getByRole("button",{name:"次の部屋"}).click());expect(view.element).toHaveAttribute("data-motion-visible","false");
  view.visible(true);act(()=>seats()[0].click());expect(view.element).toHaveAttribute("data-motion-visible","true");
 });
 it("rests while the document is hidden and disconnects its own observer on unmount",()=>{
  const view=setup(),hidden=vi.spyOn(document,"hidden","get").mockReturnValue(true);view.visible(true);expect(view.element).toHaveAttribute("data-motion-visible","false");
  hidden.mockReturnValue(false);act(()=>document.dispatchEvent(new Event("visibilitychange")));expect(view.element).toHaveAttribute("data-motion-visible","true");
  hidden.mockReturnValue(true);act(()=>document.dispatchEvent(new Event("visibilitychange")));expect(view.element).toHaveAttribute("data-motion-visible","false");view.unmount();expect(view.disconnect).toHaveBeenCalledOnce();
 });
});
