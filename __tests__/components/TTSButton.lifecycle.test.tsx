import { beforeEach, afterEach, it, expect, vi } from "vitest";
import { render, screen, fireEvent, cleanup, act } from "@testing-library/react";
import { TTSButton } from "@/components/quiz/TTSButton";
let spoken: SpeechSynthesisUtterance[];
let cancel: ReturnType<typeof vi.fn>;
let speak: ReturnType<typeof vi.fn>;
beforeEach(()=>{
 window.localStorage.clear();
 spoken=[];cancel=vi.fn();speak=vi.fn((u:SpeechSynthesisUtterance)=>spoken.push(u));
 vi.stubGlobal("speechSynthesis",{cancel,speak});
 vi.stubGlobal("SpeechSynthesisUtterance",class { text:string; constructor(text:string){this.text=text;} });
});
afterEach(()=>{cleanup();vi.unstubAllGlobals();});
function play(){fireEvent.click(screen.getByRole("button",{name:"Read"}));}
it("renders unsupported when utterance constructor missing",()=>{
 vi.stubGlobal("SpeechSynthesisUtterance",undefined);render(<TTSButton text="one" label="Read"/>);
 expect(screen.queryByRole("button",{name:"Read"})).toBeNull();expect(speak).not.toHaveBeenCalled();
});
it.each(["constructor","speak","cancel"])("reports synchronous %s failure and allows retry",kind=>{
 render(<TTSButton text="one" label="Read"/>);
 if(kind==="constructor") vi.stubGlobal("SpeechSynthesisUtterance",class {constructor(){throw Error("failed");}});
 if(kind==="speak") speak.mockImplementationOnce(()=>{throw Error("failed");});
 if(kind==="cancel") cancel.mockImplementationOnce(()=>{throw Error("failed");});
 play();expect(screen.getByRole("status")).toHaveTextContent("読み上げに失敗");expect(screen.getByRole("button",{name:"Read"})).toHaveAttribute("aria-pressed","false");
 if(kind==="constructor") vi.stubGlobal("SpeechSynthesisUtterance",class {text:string;constructor(text:string){this.text=text;}});
 play();expect(spoken).toHaveLength(1);expect(screen.queryByRole("status")).toBeNull();expect(screen.getAllByRole("button")[0]).toHaveAttribute("aria-pressed","true");
});
it("invalidates old callbacks before rate restart and text change",()=>{
 const {rerender}=render(<TTSButton text="one" label="Read"/>);play();const first=spoken[0];
 // Opening rate settings is the other button.
 fireEvent.click(screen.getAllByRole("button")[1]);
 cancel.mockImplementation(()=>first.onend?.call(first,new Event("end") as SpeechSynthesisEvent));
 fireEvent.change(screen.getByRole("slider"),{target:{value:"1.5"}});
 expect(spoken).toHaveLength(2);expect(screen.getAllByRole("button")[0]).toHaveAttribute("aria-pressed","true");
 act(()=>{first.onerror?.call(first,{error:"network"} as SpeechSynthesisErrorEvent);});expect(screen.queryByRole("status")).toBeNull();
 const second=spoken[1];rerender(<TTSButton text="two" label="Read"/>);
 act(()=>{second.onerror?.call(second,{error:"network"} as SpeechSynthesisErrorEvent);});
 expect(screen.getByRole("button",{name:"Read"})).toHaveAttribute("aria-pressed","false");expect(screen.queryByRole("status")).toBeNull();
});
it("reports current asynchronous failure",()=>{
 render(<TTSButton text="one" label="Read"/>);play();
 const current=spoken[0];act(()=>{current.onerror?.call(current,{error:"network"} as SpeechSynthesisErrorEvent);});
 expect(screen.getByRole("status")).toHaveTextContent("読み上げに失敗");
});

it.each(["constructor","speak","cancel"])("reports %s failure during speed update",kind=>{
 render(<TTSButton text="one" label="Read"/>);play();
 fireEvent.click(screen.getAllByRole("button")[1]);
 if(kind==="constructor") vi.stubGlobal("SpeechSynthesisUtterance",class {constructor(){throw Error("failed");}});
 if(kind==="speak") speak.mockImplementationOnce(()=>{throw Error("failed");});
 if(kind==="cancel") cancel.mockImplementationOnce(()=>{throw Error("failed");});
 fireEvent.change(screen.getByRole("slider"),{target:{value:"1.5"}});
 expect(screen.getByRole("status")).toHaveTextContent("読み上げに失敗");
 expect(screen.getByRole("button",{name:"Read"})).toHaveAttribute("aria-pressed","false");
});
