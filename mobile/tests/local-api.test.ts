import {afterEach,beforeEach,expect,it,vi} from "vitest";
const m=vi.hoisted(()=>({native:true,online:true,http:vi.fn(),fetch:vi.fn()}));
vi.mock("@capacitor/core",()=>({Capacitor:{isNativePlatform:()=>m.native},CapacitorHttp:{request:m.http}}));
vi.mock("@capacitor/network",()=>({Network:{getStatus:async()=>({connected:m.online})}}));
import {installLocalApi} from "../src/local-api";
beforeEach(()=>{vi.resetAllMocks();m.native=true;m.online=true;vi.stubGlobal("window",{fetch:m.fetch});vi.stubGlobal("location",new URL("capacitor://localhost/index.html"));m.http.mockResolvedValue({status:200,data:"mock AI response",headers:{"content-type":"text/plain"}});});
afterEach(()=>vi.unstubAllGlobals());
it("routes shared relative API calls to the fixed site with native cookies and redirects disabled",async()=>{
  const dispose=installLocalApi();const response=await window.fetch("/api/copilot",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({messages:[]})});
  expect(await response.text()).toBe("mock AI response");expect(m.http).toHaveBeenCalledWith(expect.objectContaining({url:"https://www.kakomon-ai.jp/api/copilot",method:"POST",data:{messages:[]},disableRedirects:true}));expect(m.fetch).not.toHaveBeenCalled();dispose();expect(window.fetch).toBe(m.fetch);
});
it("offline server functions fail explicitly instead of reading the embedded index.html as an AI answer",async()=>{
  m.online=false;installLocalApi();await expect(window.fetch("/api/scoring",{method:"POST",body:"{}"})).rejects.toThrow("オンライン");expect(m.http).not.toHaveBeenCalled();expect(m.fetch).not.toHaveBeenCalled();
});
it("does not patch normal browsers or the live website and leaves static local resources local",async()=>{
  m.native=false;installLocalApi();expect(window.fetch).toBe(m.fetch);m.native=true;installLocalApi();await window.fetch("/assets/icon.svg");expect(m.fetch).toHaveBeenCalledWith("/assets/icon.svg",undefined);expect(m.http).not.toHaveBeenCalled();
});
