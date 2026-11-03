import {createRoot} from "react-dom/client";
import {downloads} from "../../src/downloads";
import {NativeTools} from "../../src/NativeTools";
import config from "../../config/public.json";
import type {CatalogEntry,MobileEntitlement} from "../../shared/contracts";
declare global { interface Window {mobileTest:{seed:(questions:Array<{id:string}>,entry:CatalogEntry,access:MobileEntitlement)=>Promise<void>;invalidate:()=>Promise<void>;showMembership:()=>void}} }
window.mobileTest={async seed(questions,entry,access){await downloads.updateRights(access,config.leasePublicKey);await downloads.download(entry.code,async()=>Response.json({entry,questions,nextOffset:null,entitlement:access}),()=>{},new AbortController().signal);},invalidate:()=>downloads.invalidate(),showMembership:()=>createRoot(document.getElementById("root")!).render(<NativeTools membershipOnly/>)};
