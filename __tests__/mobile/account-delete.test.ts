import {beforeEach,expect,it,vi} from "vitest";
const m=vi.hoisted(()=>({auth:vi.fn(),remove:vi.fn()}));
vi.mock("@/lib/auth",()=>({auth:m.auth}));
vi.mock("@/lib/auth/delete-account",()=>({deleteAccount:m.remove}));
import {POST} from "@/app/api/account/delete/route";
const request=(origin="https://site.test",confirmation="DELETE")=>new Request("https://site.test/api/account/delete",{method:"POST",headers:{origin},body:JSON.stringify({confirmation,userId:"victim"})});
beforeEach(()=>{vi.clearAllMocks();vi.stubEnv("DATABASE_URL","postgresql://mock.invalid/mock");m.auth.mockResolvedValue({user:{id:"owner"},authenticatedAt:Date.now()});});
it("requires origin, explicit confirmation and recent server authentication",async()=>{
  expect((await POST(request("https://evil.test"))).status).toBe(403);
  expect((await POST(request("https://site.test","yes"))).status).toBe(400);
  m.auth.mockResolvedValue({user:{id:"owner"},authenticatedAt:Date.now()-300001});expect((await POST(request())).status).toBe(401);
  m.auth.mockResolvedValue(null);expect((await POST(request())).status).toBe(401);expect(m.remove).not.toHaveBeenCalled();
});
it("deletes the authenticated owner and expires session cookies only after success",async()=>{
  const result=await POST(request());expect(result.status).toBe(200);expect(m.remove).toHaveBeenCalledWith("owner");
  expect(result.headers.get("set-cookie")).toContain("Max-Age=0");expect(await result.json()).toEqual({deleted:true});
  m.remove.mockRejectedValue(Error("transaction rolled back"));const failure=await POST(request());expect(failure.status).toBe(503);expect(failure.headers.get("set-cookie")).toBeNull();
});
