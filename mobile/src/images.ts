import { Capacitor, CapacitorHttp } from "@capacitor/core";
import { Filesystem, Directory } from "@capacitor/filesystem";
import { Preferences } from "@capacitor/preferences";
import { hex } from "./downloads";
const ORIGIN = "https://www.kakomon-ai.jp", KEY="kakomon:image-cache:v1", MAX_BYTES=100*1048576;
interface Cached { path: string; bytes: number; at: number }
let queue: Promise<unknown>=Promise.resolve();
const pending = new Map<string,Promise<string>>();
export function imageUrl(raw: string): string | null {
  try { const u=new URL(raw,ORIGIN); return u.origin===ORIGIN && !u.pathname.startsWith("/api/") && /\.(png|jpe?g|webp|gif|svg)$/i.test(u.pathname) ? u.href : null; } catch { return null; }
}
export function cachedImage(raw: string): Promise<string> {
  const url=imageUrl(raw); if (!url) return Promise.resolve(raw);
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
  if (typeof value==="string") return (imageUrl(value) ? await cachedImage(value) : value) as T;
  if (Array.isArray(value)) return await Promise.all(value.map(v=>hydrateImages(v))) as T;
  if (value && typeof value==="object") return Object.fromEntries(await Promise.all(Object.entries(value).map(async([k,v])=>[k,await hydrateImages(v)]))) as T;
  return value;
}
