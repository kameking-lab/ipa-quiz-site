import {beforeEach,expect,it,vi} from "vitest";
import {webcrypto} from "node:crypto";
const m=vi.hoisted(()=>({files:new Map<string,string>(),get:vi.fn(),fail:false}));
vi.mock("@capacitor/core",()=>({CapacitorHttp:{get:m.get}}));
vi.mock("@capacitor/filesystem",()=>({Directory:{Data:"DATA"},Filesystem:{
  writeFile:async({path,data}:{path:string;data:string})=>{if(m.fail)throw Error("disk full");m.files.set(path,data);},
  readFile:async({path}:{path:string})=>({data:m.files.get(path)}),deleteFile:async({path}:{path:string})=>{m.files.delete(path);}
}}));
import {requiredImages,saveAssets,checkAssets,removeAssets} from "../src/offline-assets";
beforeEach(()=>{vi.stubGlobal("crypto",webcrypto);m.files.clear();m.fail=false;m.get.mockReset().mockResolvedValue({status:200,data:"aW1hZ2U="});});
it("enumerates unseen nested and Markdown diagrams and saves them durably as one verified pack",async()=>{
  const content=[{question:"![図](/images/unseen.png)",answers:{figure:"/images/answer.svg"}}];
  expect(requiredImages(content)).toEqual(["https://www.kakomon-ai.jp/images/answer.svg","https://www.kakomon-ai.jp/images/unseen.png"]);
  const assets=await saveAssets(content,"offline-assets/test",new AbortController().signal);
  expect(m.get).toHaveBeenCalledTimes(2);expect(Object.keys(assets)).toHaveLength(2);await expect(checkAssets(content,assets)).resolves.toBeUndefined();
  m.get.mockRejectedValue(Error("airplane mode"));await expect(checkAssets(content,JSON.parse(JSON.stringify(assets)))).resolves.toBeUndefined();
  m.files.set(Object.values(assets)[0].path,"Y29ycnVwdA==");await expect(checkAssets(content,assets)).rejects.toThrow("壊れ");
  await removeAssets(assets);expect(m.files.size).toBe(0);
});
it("never publishes missing images and cleans partial bytes on interruption or insufficient storage",async()=>{
  const content=["/images/1.png","/images/2.png"];
  m.get.mockResolvedValueOnce({status:200,data:"aW1hZ2U="}).mockResolvedValueOnce({status:404,data:""});
  await expect(saveAssets(content,"offline-assets/missing",new AbortController().signal)).rejects.toThrow();expect(m.files.size).toBe(0);
  m.get.mockResolvedValue({status:200,data:"aW1hZ2U="});m.fail=true;
  await expect(saveAssets(content,"offline-assets/full",new AbortController().signal)).rejects.toThrow("disk full");expect(m.files.size).toBe(0);
  const aborted=new AbortController();aborted.abort();await expect(saveAssets(content,"offline-assets/abort",aborted.signal)).rejects.toThrow();
  await expect(checkAssets(content,{})).rejects.toThrow("不足");
});
it("keeps official reference PDFs inseparable from non-scoring ST notes",async()=>{
  const note={originalReferenceRequired:true,sourcePdfUrl:"https://www.ipa.go.jp/shiken/question.pdf",answerPdfUrl:"https://www.ipa.go.jp/shiken/answer.pdf"};
  expect(requiredImages(note)).toHaveLength(2);
  expect(requiredImages({sourcePdfUrl:note.sourcePdfUrl})).toHaveLength(0);
  const assets=await saveAssets(note,"offline-assets/note",new AbortController().signal);await checkAssets(note,assets);expect(m.files.size).toBe(2);
  expect(()=>requiredImages(["https://evil.test/image.png"])).toThrow("外部画像");
});
