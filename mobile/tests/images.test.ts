import {beforeEach,expect,it,vi} from "vitest";
import {webcrypto} from "node:crypto";
const m=vi.hoisted(()=>({preferences:new Map<string,string>(),files:new Set<string>(),get:vi.fn(),stat:vi.fn(),write:vi.fn(),remove:vi.fn()}));
vi.mock("@capacitor/core",()=>({Capacitor:{isNativePlatform:()=>true,convertFileSrc:(path:string)=>`capacitor://localhost/_capacitor_file_${path}`},CapacitorHttp:{get:m.get}}));
vi.mock("@capacitor/preferences",()=>({Preferences:{get:async({key}:{key:string})=>({value:m.preferences.get(key)??null}),set:async({key,value}:{key:string;value:string})=>{m.preferences.set(key,value);}}}));
vi.mock("@capacitor/filesystem",()=>({Directory:{Cache:"CACHE"},Filesystem:{stat:m.stat,writeFile:m.write,deleteFile:m.remove,getUri:async({path}:{path:string})=>({uri:`/cache/${path}`})}}));
import {cachedImage,imageUrl} from "../src/images";
beforeEach(()=>{
  vi.clearAllMocks();vi.stubGlobal("crypto",webcrypto);m.preferences.clear();m.files.clear();
  m.get.mockResolvedValue({status:200,data:"aW1hZ2U="});
  m.stat.mockImplementation(async({path}:{path:string})=>{if(!m.files.has(path))throw new Error("purged");return {};});
  m.write.mockImplementation(async({path}:{path:string})=>{m.files.add(path);});
  m.remove.mockImplementation(async({path}:{path:string})=>{m.files.delete(path);});
});
it("keeps image MIME extensions and reuses cached bytes without another network request",async()=>{
  const url="https://www.kakomon-ai.jp/images/mock.png";
  const first=await cachedImage(url);expect(first).toMatch(/\.png$/);
  expect(await cachedImage(url)).toBe(first);expect(m.get).toHaveBeenCalledTimes(1);
  expect(m.stat).toHaveBeenCalledTimes(1);
});
it("refetches a cache entry purged by iOS instead of returning a nonexistent local file",async()=>{
  const url="https://www.kakomon-ai.jp/images/purged.webp";
  const first=await cachedImage(url);m.files.clear();
  expect(await cachedImage(url)).toBe(first);expect(m.get).toHaveBeenCalledTimes(2);
  expect(m.write).toHaveBeenCalledTimes(2);
});
it("coalesces simultaneous requests and returns the original URL on network failure",async()=>{
  const url="https://www.kakomon-ai.jp/images/shared.svg";
  const [a,b]=await Promise.all([cachedImage(url),cachedImage(url)]);expect(a).toBe(b);expect(m.get).toHaveBeenCalledTimes(1);
  m.get.mockRejectedValue(new Error("offline"));
  expect(await cachedImage("/images/missing.png")).toBe("https://www.kakomon-ai.jp/images/missing.png");
});
it("never sends credentials to external hosts or API paths through the image cache",async()=>{
  expect(imageUrl("https://external.test/a.png")).toBeNull();expect(imageUrl("/api/private.png")).toBeNull();
  expect(await cachedImage("javascript:alert(1)")).toBe("javascript:alert(1)");expect(m.get).not.toHaveBeenCalled();
});
