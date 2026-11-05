import {act,render,screen} from "@testing-library/react";
import {afterEach,beforeEach,expect,it,vi} from "vitest";
const m=vi.hoisted(()=>({authorize:vi.fn(),practice:vi.fn()}));
vi.mock("@/mobile/shared/contracts",()=>({nativeClient:()=>true}));
vi.mock("@/mobile/src/downloads",()=>({downloads:{authorize:m.authorize}}));
vi.mock("@/lib/billing/guest-client",()=>({fetchPracticeQuestion:m.practice}));
vi.mock("next/dynamic",()=>({default:()=>()=>null}));
import {NativeQuestionGate} from "@/mobile/shared/NativeQuestionGate";
beforeEach(()=>{vi.resetAllMocks();vi.stubGlobal("location",{protocol:"capacitor:"});});
afterEach(()=>{vi.useRealTimers();vi.unstubAllGlobals();});
it("removes an already visible offline question as soon as rights are revoked",async()=>{
  m.authorize.mockResolvedValueOnce({validatedUntil:Date.now()+60000});
  render(<NativeQuestionGate id="ip-1"><p>saved question content</p></NativeQuestionGate>);
  await act(async()=>{});expect(screen.getByText("saved question content")).toBeVisible();
  m.authorize.mockRejectedValue(new Error("revoked"));
  await act(async()=>{window.dispatchEvent(new Event("mobile:offline-rights-changed"));});
  expect(screen.queryByText("saved question content")).toBeNull();expect(screen.getByText("revoked")).toBeVisible();
  expect(m.practice).not.toHaveBeenCalled();
});
it("does not accept an old in-flight authorization after the revocation event",async()=>{
  let complete!:(value:unknown)=>void;
  m.authorize.mockImplementationOnce(()=>new Promise(resolve=>{complete=resolve;})).mockRejectedValue(new Error("revoked"));
  render(<NativeQuestionGate id="ip-1"><p>saved question content</p></NativeQuestionGate>);
  await act(async()=>{});
  await act(async()=>{window.dispatchEvent(new Event("mobile:offline-rights-changed"));});
  await act(async()=>{complete({validatedUntil:Date.now()+60000});});
  expect(screen.queryByText("saved question content")).toBeNull();expect(screen.getByText("revoked")).toBeVisible();
});
it("hides a visible question at the signed permit's expiry even without another question transition",async()=>{
  vi.useFakeTimers();m.authorize.mockResolvedValue({validatedUntil:Date.now()+1000});
  render(<NativeQuestionGate id="ip-1"><p>saved question content</p></NativeQuestionGate>);
  await act(async()=>{});expect(screen.getByText("saved question content")).toBeVisible();
  await act(async()=>{vi.advanceTimersByTime(1001);});
  expect(screen.queryByText("saved question content")).toBeNull();expect(screen.getByText(/保存問題の利用期限が切れました/)).toBeVisible();
});
