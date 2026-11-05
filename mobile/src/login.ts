import { Browser } from "@capacitor/browser";
import { App } from "@capacitor/app";
import { Preferences } from "@capacitor/preferences";
import {Capacitor,CapacitorHttp} from "@capacitor/core";
const PENDING = "kakomon:auth-pkce:v1";
const b64 = (bytes: Uint8Array) => btoa(String.fromCharCode(...bytes)).replace(/\+/g,"-").replace(/\//g,"_").replace(/=+$/,"");
export async function beginLogin(origin: string, returnTo = location.pathname+location.search+location.hash) {
  const verifier = b64(crypto.getRandomValues(new Uint8Array(32))), state = b64(crypto.getRandomValues(new Uint8Array(32)));
  const challenge = b64(new Uint8Array(await crypto.subtle.digest("SHA-256", new TextEncoder().encode(verifier))));
  if(!returnTo.startsWith("/")||returnTo.startsWith("//")||returnTo.startsWith("/\\"))returnTo="/";
  await Preferences.set({ key: PENDING, value: JSON.stringify({ verifier, state, returnTo, createdAt: Date.now() }) });
  const callback = `/api/mobile/auth/complete?challenge=${challenge}&state=${state}`;
  await Browser.open({ url: `${origin}/auth/signin?callbackUrl=${encodeURIComponent(callback)}` });
}
export async function finishLogin(url: string, origin: string) {
  const parsed = new URL(url);
  if (parsed.protocol !== "kakomonai:" || parsed.hostname !== "auth") return false;
  const raw = (await Preferences.get({ key: PENDING })).value;
  if (!raw) throw new Error("ログインをやり直してください。");
  const pending = JSON.parse(raw) as { verifier: string; state: string; returnTo?:string; createdAt: number };
  if (parsed.searchParams.get("state") !== pending.state || Date.now() - pending.createdAt > 600000 || !/^[\w-]{43}$/.test(parsed.searchParams.get("code") ?? "")) throw new Error("ログインの応答を確認できません。");
  const data={code:parsed.searchParams.get("code"),verifier:pending.verifier,returnTo:pending.returnTo??"/"};
  let destination:unknown;
  if(Capacitor.isNativePlatform()) {
    const response=await CapacitorHttp.post({url:`${origin}/api/mobile/auth/exchange`,headers:{"Content-Type":"application/json","X-Kakomon-Native":"ios"},data,responseType:"json",disableRedirects:true,connectTimeout:15000,readTimeout:20000});
    if(response.status!==200)throw new Error("ログインを完了できませんでした。やり直してください。");
    const result=typeof response.data==="string"?JSON.parse(response.data):response.data;destination=result.redirectTo;
  }else {
    const response=await fetch(`${origin}/api/mobile/auth/exchange`,{method:"POST",headers:{"Content-Type":"application/json","X-Kakomon-Native":"ios"},body:JSON.stringify(data),credentials:"include"});
    if(!response.ok)throw new Error("ログインを完了できませんでした。");destination=(await response.json() as {redirectTo:string}).redirectTo;
  }
  if(typeof destination!=="string"||new URL(destination).origin!==origin)throw new Error("ログインの戻り先が不正です。");
  await Preferences.remove({ key: PENDING });
  await Browser.close().catch(()=>{});
  window.location.replace(destination);
  return true;
}
export async function observeLogin(origin: string, onError: (error: unknown)=>void) {
  const handle = await App.addListener("appUrlOpen", event => { void finishLogin(event.url, origin).catch(onError); });
  const launch = await App.getLaunchUrl();
  if (launch?.url) await finishLogin(launch.url, origin).catch(onError);
  return () => { void handle.remove(); };
}
