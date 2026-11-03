import { act, cleanup, render, screen } from "@testing-library/react";
import { afterEach, beforeEach, expect, it, vi } from "vitest";
import { StudyPresence } from "@/components/StudyPresence";
import { TotalAnswerCounter } from "@/components/home/TotalAnswerCounter";
import { LS_KEYS } from "@/lib/storage/keys";
import { PRESENCE_POLL_MS, PRESENCE_REFRESH_MS, PRESENCE_WINDOW_MS } from "@/lib/study-presence";
import { measuredPresence, PRESENCE_STATE_EVENT } from "@/lib/study-presence-contract";
const fetchMock=vi.fn();
const data={count:3,exams:[{exam:"fe",count:3}]};
const response=(status=200,retryAfter?:string)=>({ok:status===200,status,headers:new Headers(retryAfter?{"Retry-After":retryAfter}:{}),json:async()=>measuredPresence(data,Date.now())});
const advance=(ms:number)=>act(()=>vi.advanceTimersByTimeAsync(ms));
async function activeFor(ms:number){while(ms>0){await act(async()=>{window.dispatchEvent(new Event("pointerdown"));});const step=Math.min(ms,60_000);await advance(step);ms-=step;}}
const emit=(detail:unknown)=>act(()=>{window.dispatchEvent(new CustomEvent(PRESENCE_STATE_EVENT,{detail}));});
beforeEach(()=>{
  vi.useFakeTimers();vi.setSystemTime(new Date("2026-10-28T10:00:00Z"));localStorage.clear();sessionStorage.clear();fetchMock.mockReset();fetchMock.mockImplementation(async()=>response());vi.stubGlobal("fetch",fetchMock);
  Object.defineProperty(document,"visibilityState",{configurable:true,value:"visible"});
  Object.defineProperty(navigator,"webdriver",{configurable:true,value:false});
  Object.defineProperty(navigator,"locks",{configurable:true,value:{request:async(_k:string,_o:unknown,task:()=>Promise<unknown>)=>task()}});
});
afterEach(()=>{cleanup();vi.useRealTimers();vi.unstubAllGlobals();});
it("separates hourly acquisition from unchanged measurement validity and aggregation window",()=>{expect(PRESENCE_REFRESH_MS).toBe(3_600_000);expect(PRESENCE_POLL_MS).toBe(90_000);expect(PRESENCE_WINDOW_MS).toBe(300_000);});
it("reads the viewer endpoint initially and only once per hour despite user activity",async()=>{
  render(<><div data-study-presence-viewer/><StudyPresence/></>);await advance(1);
  expect(fetchMock).toHaveBeenCalledOnce();expect(fetchMock.mock.calls[0][0]).toBe("/api/stats/study-presence");expect(fetchMock.mock.calls[0][1].method).toBe("GET");
  await activeFor(PRESENCE_REFRESH_MS-2);expect(fetchMock).toHaveBeenCalledOnce();await activeFor(1);expect(fetchMock).toHaveBeenCalledTimes(2);
});
it("posts a problem qualification hourly while preserving the existing browser identifier",async()=>{
  render(<><div data-study-presence-exam="fe"/><StudyPresence/></>);await advance(1);const first=JSON.parse(fetchMock.mock.calls[0][1].body);
  await activeFor(PRESENCE_REFRESH_MS-1);expect(fetchMock).toHaveBeenCalledTimes(2);expect(fetchMock.mock.calls[1][1].method).toBe("POST");expect(JSON.parse(fetchMock.mock.calls[1][1].body)).toMatchObject({exam:"fe",visitorId:first.visitorId});
});
it("does not retry a network error before one hour",async()=>{
  fetchMock.mockRejectedValue(new Error("offline"));render(<><div data-study-presence-viewer/><StudyPresence/></>);await advance(1);
  await activeFor(PRESENCE_REFRESH_MS-2);expect(fetchMock).toHaveBeenCalledOnce();await activeFor(1);expect(fetchMock).toHaveBeenCalledTimes(2);
});
it("honors longer Retry-After while visibility and activity cannot force an early read",async()=>{
  fetchMock.mockResolvedValue(response(503,"7200"));render(<><div data-study-presence-viewer/><StudyPresence/></>);await advance(1);
  Object.defineProperty(document,"visibilityState",{configurable:true,value:"hidden"});await act(async()=>document.dispatchEvent(new Event("visibilitychange")));await advance(1000);
  Object.defineProperty(document,"visibilityState",{configurable:true,value:"visible"});await act(async()=>document.dispatchEvent(new Event("visibilitychange")));
  await activeFor(7_198_998);expect(fetchMock).toHaveBeenCalledOnce();await activeFor(1);expect(fetchMock).toHaveBeenCalledTimes(2);
});
it("stops while idle and resumes without a catch-up request before the hourly boundary",async()=>{
  render(<><div data-study-presence-viewer/><StudyPresence/></>);await advance(120_000);expect(fetchMock).toHaveBeenCalledOnce();
  await advance(60_000);await act(async()=>window.dispatchEvent(new Event("pointerdown")));await advance(1);expect(fetchMock).toHaveBeenCalledOnce();
});
it("labels a retained historical sample with its original timestamp and never clears learning data",async()=>{
  localStorage.setItem(LS_KEYS.history,"existing-history");render(<TotalAnswerCounter/>);
  expect(screen.getByText(/リアルタイム表示ではありません/)).toBeInTheDocument();
  const snapshot=measuredPresence(data,Date.now());emit({mode:"measured",snapshot,previous:null});
  expect(screen.getByLabelText("前回取得時点の学習状況")).toBeInTheDocument();expect(screen.getByText(/前回取得時点の直近5分の学習者 3人/)).toBeInTheDocument();
  await advance(PRESENCE_REFRESH_MS);emit({mode:"stale",snapshot:null,previous:snapshot,reason:"unavailable"});
  expect(document.querySelector("time")?.getAttribute("datetime")).toBe(snapshot.measuredAt);expect(screen.getByText(/JST/)).toBeInTheDocument();expect(localStorage.getItem(LS_KEYS.history)).toBe("existing-history");
});
it("preserves a measured zero but refuses unvalidated error-body counts",()=>{
  render(<TotalAnswerCounter/>);const snapshot=measuredPresence({count:0,exams:[]},Date.now());emit({mode:"measured",snapshot,previous:null});expect(screen.getByText(/前回取得時点の直近5分の学習者 0人/)).toBeInTheDocument();
  emit({mode:"stale",previous:{count:99,exams:[]},snapshot:null});expect(screen.queryByText(/99人/)).not.toBeInTheDocument();expect(document.querySelector("time")).toBeNull();
});
