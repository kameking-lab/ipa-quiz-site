import { Capacitor, CapacitorHttp } from "@capacitor/core";
import { Filesystem, Directory } from "@capacitor/filesystem";
import { Preferences } from "@capacitor/preferences";
import { downloads, hex } from "./downloads";
import { localAssetSrc } from "./offline-assets";
const ORIGIN = "https://www.kakomon-ai.jp", KEY="kakomon:image-cache:v1", MAX_BYTES=100*1048576;
interface Cached { path: string; bytes: number; at: number }
let queue: Promise<unknown>=Promise.resolve();
const pending = new Map<string,Promise<string>>();
export function imageUrl(raw: string): string | null {
  try { const u=new URL(raw,ORIGIN); return u.origin===ORIGIN && !u.pathname.startsWith("/api/") && /\.(png|jpe?g|webp|gif|svg)$/i.test(u.pathname) ? u.href : null; } catch { return null; }
}
export function cachedImage(raw: string): Promise<string> {
  const url=imageUrl(raw); if (!url) return Promise.resolve(raw);
  return offlineOrCached(url, raw);
}
async function offlineOrCached(url: string, raw: string): Promise<string> {
  const index = await downloads.list();
  const asset = Object.values(index).flatMap(e=>Object.entries(e.assets ?? {})).find(([key])=>key===url)?.[1];
  if (asset) {
    await downloads.authorize();
    return localAssetSrc(asset);
  }
  if (pending.has(url)) return pending.get(url)!;
  const job=queue.then(async()=>{
    const index=JSON.parse((await Preferences.get({ key:KEY })).value ?? "{}") as Record<string,Cached>;
    let entry:Cached|undefined=index[url];
    // iOS may purge Directory.Cache without removing the Preferences index.
    if(entry) {
      try { await Filesystem.stat({directory:Directory.Cache,path:entry.path}); }
      catch { delete index[url];entry=undefined; }
    }
    if (!entry) {
      if (!Capacitor.isNativePlatform()) return url;
      const result=await CapacitorHttp.get({ url,responseType:"arraybuffer",disableRedirects:true,connectTimeout:10000,readTimeout:20000 });
      if (result.status!==200 || typeof result.data!=="string" || result.data.length>8*1048576) throw new Error("画像を取得できません。");
      const extension=new URL(url).pathname.match(/\.(png|jpe?g|webp|gif|svg)$/i)![1].toLowerCase();
      const path=`images/${hex(await crypto.subtle.digest("SHA-256",new TextEncoder().encode(url)))}.${extension}`;
      await Filesystem.writeFile({ directory:Directory.Cache,path,data:result.data,recursive:true });
      entry={ path,bytes:Math.ceil(result.data.length*3/4),at:Date.now() }; index[url]=entry;
    }
    entry.at=Date.now();
    let total=Object.values(index).reduce((n,e)=>n+e.bytes,0);
    for (const [key,value] of Object.entries(index).sort((a,b)=>a[1].at-b[1].at)) {
      if (total<=MAX_BYTES) break;
      if (key===url) continue;
      await Filesystem.deleteFile({ directory:Directory.Cache,path:value.path }).catch(()=>{}); delete index[key]; total-=value.bytes;
    }
    await Preferences.set({ key:KEY,value:JSON.stringify(index) });
    return Capacitor.convertFileSrc((await Filesystem.getUri({ directory:Directory.Cache,path:entry.path })).uri);
  }).catch(()=>url);
  queue=job.catch(()=>{}); pending.set(url,job); void job.finally(()=>pending.delete(url)); return job;
}
export async function hydrateImages<T>(value: T): Promise<T> {
  const entries=await downloads.list();
  const assets=new Map(Object.values(entries).flatMap(e=>Object.entries(e.assets??{})));
  if(assets.size)await downloads.authorize();
  async function visit(v:unknown):Promise<unknown>{
    if(typeof v==="string") {
      let url:string;try{url=new URL(v,ORIGIN).href;}catch{return v;}
      const asset=assets.get(url);
      if(asset)return localAssetSrc(asset);
      return imageUrl(v)?await cachedImage(v):v;
    }
    if(Array.isArray(v))return Promise.all(v.map(visit));
    if(v&&typeof v==="object")return Object.fromEntries(await Promise.all(Object.entries(v).map(async([k,w])=>[k,await visit(w)])));
    return v;
  }
  return await visit(value) as T;
}
