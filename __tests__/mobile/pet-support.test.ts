import { afterEach, beforeEach, expect, it, vi } from "vitest";
import { installPetLocalPlatform, savePetBackupFile, petLocalOwnerResolver } from "@/lib/pet/v1/platform";
const mock=vi.hoisted(()=>({native:true,write:vi.fn(),remove:vi.fn(),share:vi.fn()}));
vi.mock("@capacitor/core",()=>({Capacitor:{isNativePlatform:()=>mock.native}}));
vi.mock("@capacitor/preferences",()=>({Preferences:{get:async()=>({value:null}),set:async()=>{},keys:async()=>({keys:[]}),remove:async()=>{}}}));
vi.mock("@capacitor/filesystem",()=>({Directory:{Cache:"CACHE"},Encoding:{UTF8:"utf8"},Filesystem:{writeFile:mock.write,deleteFile:mock.remove}}));
vi.mock("@capacitor/share",()=>({Share:{share:mock.share}}));
import { installNativePetSupport } from "@/mobile/src/pet-support";
let dispose=()=>{};
beforeEach(()=>{mock.native=true;mock.write.mockResolvedValue({uri:"file://private/cache/pet-backups/copy.json"});mock.remove.mockResolvedValue(undefined);mock.share.mockResolvedValue({});vi.stubGlobal("location",{protocol:"capacitor:"});});
afterEach(()=>{dispose();vi.unstubAllGlobals();vi.clearAllMocks();});
it("uses a private temporary UTF-8 file and native share UI; checks ownership before presenting and cleans up",async()=>{
  dispose=installNativePetSupport();expect(petLocalOwnerResolver()).toBeTypeOf("function");
  const check=vi.fn(async()=>true);await savePetBackupFile("private-json","copy.json",check);
  expect(mock.write).toHaveBeenCalledWith(expect.objectContaining({directory:"CACHE",data:"private-json",encoding:"utf8"}));
  expect(mock.share).toHaveBeenCalledWith({title:"チワワのバックアップ",files:["file://private/cache/pet-backups/copy.json"]});expect(check).toHaveBeenCalledTimes(2);expect(mock.remove).toHaveBeenCalledTimes(1);
});
it("refuses a changed owner after asynchronous file writing, without presenting another account's data",async()=>{
  dispose=installNativePetSupport();let current=true;mock.write.mockImplementationOnce(async()=>{current=false;return{uri:"private"};});
  await expect(savePetBackupFile("private-json","copy.json",async()=>current)).rejects.toThrow();expect(mock.share).not.toHaveBeenCalled();expect(mock.remove).toHaveBeenCalledTimes(1);
});
it("does not install a native owner source on the online origin and multiple adapter cleanups do not revive disposed handlers",()=>{
  vi.stubGlobal("location",{protocol:"https:"});dispose=installNativePetSupport();expect(petLocalOwnerResolver()).toBeUndefined();
  const first=installPetLocalPlatform({resolveOwner:async()=>null}),second=installPetLocalPlatform({resolveOwner:async()=>null});first();second();expect(petLocalOwnerResolver()).toBeUndefined();
});
