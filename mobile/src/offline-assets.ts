import { Capacitor, CapacitorHttp } from "@capacitor/core";
import { Filesystem, Directory } from "@capacitor/filesystem";
export interface SavedAsset { path: string; sha256: string; bytes: number }
/** Native uses durable file URLs; the web test adapter reads its IndexedDB bytes. */
export async function localAssetSrc(asset: SavedAsset) {
  if(Capacitor.isNativePlatform())return Capacitor.convertFileSrc((await Filesystem.getUri({directory:Directory.Data,path:asset.path})).uri);
  const data=await Filesystem.readFile({directory:Directory.Data,path:asset.path});
  if(typeof data.data!=="string")throw new Error("保存画像がありません。");
  const extension=asset.path.split(".").pop()?.toLowerCase();
  const mime=extension==="pdf"?"application/pdf":extension==="svg"?"image/svg+xml":extension==="jpg"?"image/jpeg":`image/${extension}`;
  return `data:${mime};base64,${data.data}`;
}
const ORIGIN = "https://www.kakomon-ai.jp";
export function requiredImages(value: unknown): string[] {
  const urls = new Set<string>();
  const referencePdfs = JSON.stringify(value).includes('"originalReferenceRequired":true');
  const visit = (v: unknown) => {
    if (typeof v === "string") {
      const candidates = [v, ...Array.from(v.matchAll(/(?:https?:\/\/[^\s"'<>()[\]]+|\/[\w./%-]+)\.(?:png|jpe?g|webp|gif|svg)(?:\?[^\s"'<>()[\]]*)?/gi), m=>m[0])];
      for (const raw of candidates) {
        try { const u = new URL(raw, ORIGIN); if (/\.(png|jpe?g|webp|gif|svg)$/i.test(u.pathname)) { if (u.origin !== ORIGIN) throw new Error("外部画像は保存できません。"); urls.add(u.href); } else if(referencePdfs && u.protocol==="https:" && u.hostname==="www.ipa.go.jp" && u.pathname.endsWith(".pdf")) urls.add(u.href); } catch (e) { if (e instanceof Error && e.message === "外部画像は保存できません。") throw e; }
      }
    } else if (Array.isArray(v)) v.forEach(visit);
    else if (v && typeof v === "object") Object.values(v).forEach(visit);
  };
  visit(value); return [...urls].sort();
}
const hash = async (data: string) => {
  const bytes = Uint8Array.from(atob(data), c=>c.charCodeAt(0));
  return Array.from(new Uint8Array(await crypto.subtle.digest("SHA-256", bytes)), b=>b.toString(16).padStart(2,"0")).join("");
};
export async function removeAssets(assets: Record<string, SavedAsset>) {
  for (const asset of Object.values(assets)) await Filesystem.deleteFile({directory:Directory.Data,path:asset.path}).catch(()=>{});
}
export async function saveAssets(value: unknown, prefix: string, signal: AbortSignal) {
  const assets: Record<string, SavedAsset> = {};
  try {
    for (const [i,url] of requiredImages(value).entries()) {
      signal.throwIfAborted();
      const r = await CapacitorHttp.get({url,responseType:"arraybuffer",disableRedirects:true,connectTimeout:10000,readTimeout:30000});
      if (r.status !== 200 || typeof r.data !== "string" || !r.data.length || r.data.length > 32*1048576) throw new Error("必須画像を保存できません。");
      const sha256 = await hash(r.data), path = `${prefix}/${i}.${new URL(url).pathname.split(".").pop()}`;
      assets[url] = {path,sha256,bytes:atob(r.data).length};
      await Filesystem.writeFile({directory:Directory.Data,path,data:r.data,recursive:true});
      const saved = await Filesystem.readFile({directory:Directory.Data,path});
      if (typeof saved.data !== "string" || await hash(saved.data) !== sha256) throw new Error("保存画像の検証に失敗しました。");
      signal.throwIfAborted();
    }
    return assets;
  } catch(e) { await removeAssets(assets); throw e; }
}
export async function checkAssets(value: unknown, assets: Record<string, SavedAsset>) {
  const urls = requiredImages(value);
  if (urls.length !== Object.keys(assets).length) throw new Error("画像が不足しています。再ダウンロードしてください。");
  for (const url of urls) {
    const asset = assets[url]; if (!asset) throw new Error("画像が不足しています。");
    const saved = await Filesystem.readFile({directory:Directory.Data,path:asset.path});
    if (typeof saved.data !== "string" || atob(saved.data).length !== asset.bytes || await hash(saved.data) !== asset.sha256) throw new Error("保存画像が壊れています。");
  }
}
