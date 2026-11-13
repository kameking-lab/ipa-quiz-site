import { Browser } from "@capacitor/browser";
import { App } from "@capacitor/app";
import { Preferences } from "@capacitor/preferences";
const PENDING = "kakomon:auth-pkce:v1";
// A sign-in return that reached the bundled offline shell is finished by the
// website itself, so the session cookie lands in the WebView's own cookie jar.
const RETURNED = "kakomon:auth-return:v1";
const b64 = (bytes: Uint8Array) => btoa(String.fromCharCode(...bytes)).replace(/\+/g,"-").replace(/\//g,"_").replace(/=+$/,"");
export async function beginLogin(origin: string, returnTo = location.pathname+location.search+location.hash, reauthenticate = false) {
  const verifier = b64(crypto.getRandomValues(new Uint8Array(32))), state = b64(crypto.getRandomValues(new Uint8Array(32)));
  const challenge = b64(new Uint8Array(await crypto.subtle.digest("SHA-256", new TextEncoder().encode(verifier))));
  if(!returnTo.startsWith("/")||returnTo.startsWith("//")||returnTo.startsWith("/\\"))returnTo="/";
  const callback = `/api/mobile/auth/complete?challenge=${challenge}&state=${state}${reauthenticate ? "&reauth=1" : ""}`;
  // Open the sign-in sheet at once; saving the verifier runs alongside (the
  // return needs the user to finish signing in, long after this write).
  const saving = Preferences.set({ key: PENDING, value: JSON.stringify({ verifier, state, returnTo, createdAt: Date.now() }) });
  await Promise.all([saving, Browser.open({ url: `${origin}/auth/signin?${reauthenticate ? "reauth=1&" : ""}callbackUrl=${encodeURIComponent(callback)}` })]);
}
/** The WebView must see the new session before we leave the page, or the next page loads signed out. */
async function waitForSession(origin: string) {
  for (let attempt = 0; attempt < 6; attempt++) {
    const response = await fetch(`${origin}/api/auth/session`, { cache: "no-store", credentials: "include" }).catch(() => null);
    if (response?.ok) {
      const body = await response.json().catch(() => null) as { user?: { id?: string | null } } | null;
      if (body?.user) return;
    }
    await new Promise(resolve => setTimeout(resolve, 250 * (attempt + 1)));
  }
  throw new Error("ログイン情報をアプリに保存できませんでした（session_missing）。もう一度ログインしてください。");
}
export async function finishLogin(url: string, origin: string, onStart?: () => void, fromLaunch = false) {
  const parsed = new URL(url);
  if (parsed.protocol !== "kakomonai:" || parsed.hostname !== "auth") return false;
  const raw = (await Preferences.get({ key: PENDING })).value;
  // getLaunchUrl() repeats the same URL on every page of a cold-started app;
  // once it has been used there is nothing to report.
  if (!raw) { if (fromLaunch) return false; throw new Error("ログインをやり直してください（ログイン開始情報なし）。"); }
  const pending = JSON.parse(raw) as { verifier: string; state: string; returnTo?:string; createdAt: number };
  if (parsed.searchParams.get("state") !== pending.state) { if (fromLaunch) return false; throw new Error("ログインの応答を確認できません（state 不一致）。もう一度ログインしてください。"); }
  if (Date.now() - pending.createdAt > 600000) throw new Error("ログインの有効時間（10分）を過ぎました。もう一度ログインしてください。");
  if (!/^[\w-]{43}$/.test(parsed.searchParams.get("code") ?? "")) throw new Error("ログインの応答を確認できません（code 不正）。");
  onStart?.();
  if (location.origin !== origin) {
    // Bundled shell (capacitor://localhost): a cross-origin exchange would put
    // the cookie in the wrong jar. Hand the one-time code to the website.
    await Preferences.set({ key: RETURNED, value: url });
    await Browser.close().catch(()=>{});
    window.location.replace(new URL(pending.returnTo ?? "/", origin).href);
    return true;
  }
  const data={code:parsed.searchParams.get("code"),verifier:pending.verifier,returnTo:pending.returnTo??"/"};
  // Same-origin fetch: the Set-Cookie is stored by WebKit itself. The native
  // HTTP path copied cookies into the WebView asynchronously and the page
  // could reload before they arrived ("ログインできない" on TestFlight).
  const response=await fetch(`${origin}/api/mobile/auth/exchange`,{method:"POST",headers:{"Content-Type":"application/json","X-Kakomon-Native":"ios"},body:JSON.stringify(data),credentials:"include",cache:"no-store"}).catch(()=>null);
  if(!response) throw new Error("ログインを完了できませんでした（通信エラー）。電波の良い場所でもう一度ログインしてください。");
  if(!response.ok) {
    const reason=await response.json().then((b:{error?:string})=>b.error).catch(()=>"");
    await Preferences.remove({ key: PENDING });
    throw new Error(`ログインを完了できませんでした（${reason||`HTTP ${response.status}`}）。もう一度ログインしてください。`);
  }
  const destination=(await response.json() as {redirectTo?:unknown}).redirectTo;
  if(typeof destination!=="string"||new URL(destination).origin!==origin)throw new Error("ログインの戻り先が不正です。");
  await Preferences.remove({ key: PENDING });
  await Browser.close().catch(()=>{});
  await waitForSession(origin);
  window.location.replace(destination);
  return true;
}
export async function observeLogin(origin: string, onError: (error: unknown)=>void, onStart?: () => void) {
  const handle = await App.addListener("appUrlOpen", event => { void finishLogin(event.url, origin, onStart).catch(onError); });
  if (location.origin === origin) {
    const returned = (await Preferences.get({ key: RETURNED })).value;
    if (returned) { await Preferences.remove({ key: RETURNED }); await finishLogin(returned, origin, onStart).catch(onError); }
  }
  const launch = await App.getLaunchUrl();
  if (launch?.url) await finishLogin(launch.url, origin, onStart, true).catch(onError);
  return () => { void handle.remove(); };
}
