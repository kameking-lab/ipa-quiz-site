"use client";
import { Suspense, useCallback, useEffect, useRef, useState } from "react";
import { App } from "@capacitor/app";
import { Browser } from "@capacitor/browser";
import { Share } from "@capacitor/share";
import { Capacitor } from "@capacitor/core";
import { Purchases, type PurchasesPackage } from "@revenuecat/purchases-capacitor";
import { Preferences } from "@capacitor/preferences";
import Link from "next/link";
import type { MobileConfiguration, MobileEntitlement, CatalogEntry } from "../shared/contracts";
import { downloads, type DownloadIndex } from "./downloads";
import { Membership, purchaseError, nativePublicSdkKey } from "./purchases";
import { beginLogin, observeLogin } from "./login";
import { observeReminderTap, setReminder } from "./platform";
import { persistStudy, restoreStudy } from "./portable-storage";
import { cachedImage } from "./images";
import { NativePageQualificationActions } from "./QualificationActions";
import { isQualificationUrl } from "../shared/qualification-schedules";
import { openQualificationUrl } from "./qualification-platform";
import { ManageSubscriptionButton } from "@/app/billing/ManageSubscriptionButton";
import { PrivacyNote } from "@/components/ui/privacy-note";
import { blocksNativeWebPurchase } from "../shared/native-billing-policy";
import { installNativePetSupport, observePetStudyWrites, persistStudyAfterPets } from "./pet-support";
const defaultMembership = new Membership();
export const SITE_ORIGIN = "https://www.kakomon-ai.jp";
// The bundled shell: offline study with saved questions (paid downloads).
const localUrl = "capacitor://localhost/index.html?local=1";
export function NativeTools({ membershipOnly = false, membership = defaultMembership }: { membershipOnly?: boolean; membership?:Membership }) {
  const [open, setOpen] = useState(membershipOnly || (typeof location !== "undefined" && location.hash === "#app-settings")), [access, setAccess] = useState<MobileEntitlement | null>(null);
  const [config, setConfig] = useState<MobileConfiguration | null>(null), [offer, setOffer] = useState<PurchasesPackage | null>(null);
  const [catalog, setCatalog] = useState<CatalogEntry[]>([]), [saved, setSaved] = useState<DownloadIndex>({});
  const [notice, setNotice] = useState(""), [busy, setBusy] = useState(false), [time, setTime] = useState("20:00");
  const [signingIn, setSigningIn] = useState<"" | "opening" | "finishing">("");
  const [purchasePending,setPurchasePending]=useState(false);
  const [downloading,setDownloading]=useState(false);
  const abort = useRef<AbortController | null>(null), user = useRef<string | null>(null);
  const studyReady = useRef(false), accessSignature = useRef("");
  const running=useRef(false);
  const refreshing=useRef<Promise<unknown>>(Promise.resolve());
  const inSite = typeof location !== "undefined" && location.origin === SITE_ORIGIN;
  const refresh = useCallback((fresh = false) => {
    const task=refreshing.current.then(async()=>{
    const response = await fetch("/api/mobile/entitlement", { method: fresh ? "POST" : "GET", cache: "no-store" });
    if (!response.ok) { setAccess(null); setOffer(null); await downloads.invalidate(); throw new Error("会員状態を確認できません。購入・保存の前にオンラインで再確認してください。"); }
    const result = await response.json() as { entitlement: MobileEntitlement; configuration: MobileConfiguration };
    result.configuration.sdkKey = await nativePublicSdkKey(result.configuration.sdkKey);
    if (studyReady.current && result.entitlement.userId !== user.current) {
      abort.current?.abort(); await downloads.invalidate(); await membership.disconnect(); studyReady.current=false;
    }
    if (!studyReady.current) { await restoreStudy(result.entitlement.userId); studyReady.current=true; }
    user.current = result.entitlement.userId;
    if(result.entitlement.userId) {
      const key=`kakomon:pending-purchase:${result.entitlement.userId}`;
      if(result.entitlement.entitled)await Preferences.remove({key});
      setPurchasePending(!result.entitlement.entitled && (await Preferences.get({key})).value==="true");
    }else setPurchasePending(false);
    const signature=JSON.stringify([result.entitlement.userId,result.entitlement.entitled]);
    if(accessSignature.current!==signature) { accessSignature.current=signature;window.dispatchEvent(new Event("mobile:entitlement-changed")); }
    setAccess(result.entitlement); setConfig(result.configuration);
    if (result.entitlement.entitled && result.entitlement.lease) await downloads.updateRights(result.entitlement, result.configuration.leasePublicKey).catch(()=>{setNotice("オフライン用の検証キーは配布設定待ちです。オンラインの学習・会員権利は利用できます。");});
    else await downloads.invalidate();
    setSaved(await downloads.list());
    return result;
    });
    refreshing.current=task.catch(()=>{});
    return task;
  }, [membership]);
  const run = useCallback(async (fn: ()=>Promise<void>)=>{
    if(running.current)return;
    running.current=true;
    setBusy(true); setNotice("");
    try { await fn(); } catch(error) {
      const {cancelled,pending,rejected}=purchaseError(error);
      if(rejected&&user.current){await Preferences.remove({key:`kakomon:pending-purchase:${user.current}`}).catch(()=>{});setPurchasePending(false);}
      setNotice(cancelled?"購入をキャンセルしました。":pending?"購入の承認待ちです。再購入せず、承認後に権利を再確認してください。":error instanceof Error ? error.message : "処理を完了できませんでした。");
    }
    finally { running.current=false;setBusy(false); }
  }, []);
  useEffect(()=>{
    if (!Capacitor.isNativePlatform() || !inSite) return;
    const disposers: Array<()=>void> = []; let disposed = false;
    const keep = (dispose: ()=>void)=> { if (disposed) dispose(); else disposers.push(dispose); };
    keep(installNativePetSupport());
    keep(observePetStudyWrites(()=>({ready:studyReady.current,owner:user.current}),e=>setNotice(String(e))));
    void refresh().catch(e=>setNotice(String(e)));
    void observeLogin(SITE_ORIGIN, e=>{setSigningIn("");setNotice(String(e));}, ()=>{setOpen(true);setSigningIn("finishing");}).then(keep);
    void App.addListener("appStateChange", s=>{
      if(s.isActive)void refresh(true).catch(e=>setNotice(String(e)));
      else if(studyReady.current)void persistStudyAfterPets(user.current).catch(e=>setNotice(String(e)));
    }).then(h=>keep(()=>{ void h.remove(); }));
    void observeReminderTap(()=>window.location.assign(`${SITE_ORIGIN}/review`)).then(keep);
    void Purchases.addCustomerInfoUpdateListener(()=>{ void refresh(true).catch(e=>setNotice(String(e))); }).then(id=>keep(()=>{ void Purchases.removeCustomerInfoUpdateListener({ listenerToRemove: id }); })).catch(()=>{});
    const interval = window.setInterval(()=>{ void refresh().catch(e=>setNotice(String(e))); },60000);
    const deleted=()=>{studyReady.current=false;user.current=null;abort.current?.abort();setAccess(null);setOffer(null);clearInterval(interval);};
    window.addEventListener("mobile:account-deleted",deleted);
    const mirror=window.setInterval(()=>{if(studyReady.current)void persistStudy(user.current).catch(e=>setNotice(String(e)));},5000);
    const cacheVisibleImages=()=>document.querySelectorAll<HTMLImageElement>("img").forEach(img=>{if(img.complete && img.naturalWidth>0)void cachedImage(img.currentSrc||img.src);});
    const imageObserver=new MutationObserver(cacheVisibleImages); imageObserver.observe(document.body,{childList:true,subtree:true});
    document.addEventListener("load",cacheVisibleImages,true);cacheVisibleImages();
    // Web checkout must never run from the native WebView, even via direct navigation.
    const original = window.fetch;
    window.fetch = async (input, init) => {
      const url = new URL(input instanceof Request ? input.url : String(input), location.href);
      if (blocksNativeWebPurchase(url)) { setOpen(true); return Response.json({ error: "use_app_store" }, { status: 403 }); }
      return original(input, init);
    };
    const click = (e: MouseEvent)=>{
      const a = (e.target as Element)?.closest?.("a[href]"); if (!a) return;
      const url = new URL(a.getAttribute("href")!, location.href);
      if (url.origin === SITE_ORIGIN && url.pathname.startsWith("/billing")) { e.preventDefault(); e.stopPropagation(); setOpen(true); }
      else if (url.origin !== SITE_ORIGIN && url.protocol === "https:") { e.preventDefault(); e.stopPropagation(); void (isQualificationUrl(url.href) ? openQualificationUrl(url.href) : Browser.open({ url: url.href })).catch(()=>setNotice("リンクを開けませんでした。再度お試しください。")); }
    };
    document.addEventListener("click",click,true);
    return ()=>{ window.removeEventListener("mobile:account-deleted",deleted);disposed=true; disposers.forEach(fn=>fn()); clearInterval(interval);clearInterval(mirror);imageObserver.disconnect();document.removeEventListener("load",cacheVisibleImages,true); window.fetch=original; document.removeEventListener("click",click,true); abort.current?.abort(); };
  },[inSite,refresh,run]);
  // Loading the panel's data must never hold the action lock: a tap on
  // 「ログイン」 while it loads used to be silently dropped by run().
  useEffect(()=>{ if (!open || !inSite) return; let cancelled=false; void (async()=>{
    const r = await refresh(true); if(cancelled)return; setOffer(null);
    if (!r.entitlement.entitled && r.entitlement.userId && r.configuration.sdkKey) { const found=await membership.offer(r.configuration, r.entitlement); if(!cancelled)setOffer(found); }
    const response = await fetch("/api/mobile/catalog", { cache:"no-store" });
    if (response.ok && !cancelled) setCatalog((await response.json() as { exams: CatalogEntry[] }).exams);
  })().catch(error=>{ if(!cancelled)setNotice(error instanceof Error?error.message:"会員状態を確認できません。"); }); return ()=>{cancelled=true;}; },[open,inSite,refresh,membership]);
  const startLogin = ()=>{
    // Instant feedback, then the system sign-in sheet; nothing else is awaited first.
    if (signingIn) return;
    setSigningIn("opening"); setNotice("");
    void beginLogin(SITE_ORIGIN).catch(error=>setNotice(error instanceof Error?error.message:"ログイン画面を開けませんでした。")).finally(()=>setTimeout(()=>setSigningIn(s=>s==="opening"?"":s),1500));
  };
  if (!inSite) return null;
  const loginButton = <button className={`inline-flex min-h-12 w-full items-center justify-center rounded-xl bg-primary px-4 font-semibold text-primary-foreground disabled:opacity-60 active:opacity-80 touch-manipulation`} aria-busy={!!signingIn} disabled={!!signingIn} onClick={startLogin}>{signingIn==="finishing"?"ログインしています…":signingIn?"ログイン画面を開いています…":"ログイン"}</button>;
  const pill = "inline-flex min-h-11 shrink-0 items-center justify-center rounded-full border border-border bg-background px-3 text-sm font-medium text-foreground disabled:opacity-50";
  const primary = "inline-flex min-h-12 w-full items-center justify-center rounded-xl bg-primary px-4 font-semibold text-primary-foreground disabled:opacity-50";
  const secondary = "inline-flex min-h-11 items-center justify-center rounded-xl border border-border bg-background px-4 text-sm font-medium disabled:opacity-50";
  const card = "space-y-3 rounded-2xl border border-border bg-card p-4";
  return <aside aria-label="iPhoneの学習機能" className="border-b border-border bg-background px-4 py-2 text-sm">
    {!membershipOnly && <div className="mx-auto flex max-w-2xl items-center gap-2">
      {/* Home is the site's own logo link; only app-specific actions live here. */}
      <button className={`${pill} ml-auto`} aria-expanded={open} aria-controls="native-settings" onClick={()=>setOpen(!open)}>会員・設定</button>
      <button className={pill} aria-label="このページを共有" onClick={()=>void run(async()=>{ await Share.share({ title:"過去問AI", url:location.href }); })}>共有</button>
    </div>}
    {!membershipOnly && <Suspense fallback={null}><NativePageQualificationActions collapsed /></Suspense>}
    {notice && !open && <p role="status" className="mx-auto mt-2 max-w-2xl break-words">{notice}</p>}
    {open && <section id="native-settings" className="mx-auto max-w-2xl space-y-4 py-4 text-base">
      <div className="flex items-center justify-between gap-3"><h1 className="text-xl font-bold">会員・設定</h1>{!membershipOnly && <button className={secondary} onClick={()=>setOpen(false)}>閉じる</button>}</div>
      {notice && <p role="status" className="break-words rounded-xl bg-muted p-3 text-sm">{notice}</p>}
      <section aria-labelledby="native-plan" className={card}>
        <h2 id="native-plan" className="font-bold">有料会員（月額プラン）</h2>
        <p className="text-sm">ログイン不要で1日10問（全資格共通・日本時間0時リセット）。意見を1回送ると＋10問。有料会員は回数無制限、資格ごとの事前ダウンロードも使えます。</p>
        {!access ? <>{loginButton}<button className={secondary} disabled={busy} onClick={()=>void run(async()=>{ await refresh(true); })}>会員状態を再確認</button></> : <>
          <p className="font-semibold">{access.entitled ? access.source === "web" ? "ウェブの有料会員です。追加購入は不要です。" : "App Storeの有料会員です。" : "無料会員"}</p>
          {access.source === "web" && <div className="space-y-2"><p className="text-sm">既存のウェブ契約の管理・解約を開きます。</p><ManageSubscriptionButton label="ウェブ契約の管理・解約"/></div>}
          {!access.userId && loginButton}
          {purchasePending&&<p role="status" className="text-sm">購入内容をサーバーで確認中です。再購入せず「購入を復元」または会員状態の再確認をご利用ください。</p>}
          {offer && !access.entitled && <div className="space-y-3 rounded-xl border border-border p-4"><h3 className="font-bold">過去問AI 月額プラン</h3><p>{offer.product.priceString} / 1か月（税込・自動更新）</p><p className="text-sm">全資格の問題を無制限で演習、資格ごとの事前ダウンロード。購入確認時にApple IDへ請求されます。解約するまで自動更新され、更新前にApp Storeのサブスクリプション管理で解約できます。解約後も有効期間の末日までは利用できます。</p><button className={primary} disabled={busy||purchasePending} onClick={()=>void run(async()=>{
            const r=await refresh(true);
            if(r.entitlement.entitled)throw new Error("すでに有料会員です。追加購入は不要です。");
            await membership.buy(r.configuration,r.entitlement,offer,async()=>{
              await Preferences.set({key:`kakomon:pending-purchase:${r.entitlement.userId}`,value:"true"});setPurchasePending(true);
            });const confirmed=await refresh(true);
            setNotice(confirmed.entitlement.entitled?"購入を確認しました。有料会員の機能を利用できます。":"購入内容の確認待ちです。再購入せず、購入復元または会員状態の再確認をご利用ください。");
          })}>{offer.product.priceString} / 月で登録</button><PrivacyNote variant="purchase" /></div>}
          {!access.entitled && access.userId && !offer && <p className="text-sm">商品情報を取得できていません。設定と通信を確認してください。</p>}
          <div className="grid gap-2 sm:grid-cols-2"><button className={secondary} disabled={busy || !access.userId || !config?.sdkKey} onClick={()=>void run(async()=>{ const r=await refresh(true); await membership.restore(r.configuration,r.entitlement); const confirmed=await refresh(true); setNotice(confirmed.entitlement.entitled?"購入を復元し、サーバーで権利を確認しました。":"有効な購入をサーバーで確認できませんでした。購入に使用したApple IDとログイン中のアカウントをご確認ください。承認待ちの場合は、承認後に再確認してください。"); })}>購入を復元</button>
            <button className={secondary} onClick={()=>void Browser.open({ url:"https://apps.apple.com/account/subscriptions" })}>App Storeで管理・解約</button></div>
          <p className="text-sm"><Link className="underline underline-offset-4" href="/terms">利用規約</Link> · <Link className="underline underline-offset-4" href="/privacy">プライバシーポリシー</Link> · <a className="underline underline-offset-4" href="https://www.apple.com/legal/internet-services/itunes/dev/stdeula/">Apple標準使用許諾契約</a></p>
          <details className="rounded-xl border border-border px-3"><summary className="flex min-h-11 cursor-pointer items-center font-semibold">資格ごとの事前ダウンロード（有料会員限定）</summary>
            <div className="space-y-2 pb-3"><p className="text-sm">必要な図表も事前に取得・検証し、すべて保存できた資格のみ保存済みになります。保存した問題は会員権利の有効期限内で利用できます。オフラインの権利確認は最大24時間です。</p>
            {catalog.map(e=><div key={e.code} className="flex flex-wrap items-center justify-between gap-2 border-b border-border py-2"><span className="min-w-0 break-words">{e.name} · {e.count}問 · {(e.bytes/1048576).toFixed(1)}MB {saved[e.code] ? "保存済み" : ""}</span>
              <span className="flex gap-2"><button className={secondary} disabled={busy} onClick={()=>void run(async()=>{
                if (!access.entitled) { setNotice("事前ダウンロードは有料会員の特典です。無料でもオンラインで全資格から1日10問使えます。"); return; }
                await refresh(true); abort.current=new AbortController();
                setDownloading(true);
                const group=e.qualification?catalog.filter(item=>item.qualification===e.qualification):[e];
                try { for(const part of group) await downloads.download(part.code,path=>fetch(path,{ cache:"no-store",signal:abort.current!.signal }), (n,total)=>setNotice(`${part.name}: ${n}/${total}問`),abort.current.signal); }
                finally {setDownloading(false);abort.current=null;}
                setSaved(await downloads.list()); setNotice(`${e.name}を保存しました。`);
              })}>{access.entitled ? "保存・更新" : "有料特典を見る"}</button>
              {saved[e.code] && <button className={secondary} disabled={busy} onClick={()=>void run(async()=>{ await downloads.removeQualification(e.code); setSaved(await downloads.list()); })}>削除</button>}</span></div>)}
            {downloading && <button className={secondary} onClick={()=>abort.current?.abort()}>ダウンロード中止</button>}</div>
          </details>
        </>}
      </section>
      <button className={`${secondary} w-full`} onClick={()=>void run(async()=>{await persistStudyAfterPets(user.current);location.assign(localUrl);})}>保存した問題をオフラインで解く</button>
      <section aria-labelledby="native-reminder" className={card}>
        <h2 id="native-reminder" className="font-bold">毎日の学習通知</h2>
        <label className="flex items-center gap-3">時刻 <input className="min-h-11 rounded-xl border border-border bg-background px-3" type="time" value={time} onChange={e=>setTime(e.target.value)} /></label>
        <div className="grid grid-cols-2 gap-2"><button className={secondary} disabled={busy} onClick={()=>void run(async()=>{ await setReminder(time); setNotice("通知を設定しました。"); })}>通知を設定</button><button className={secondary} disabled={busy} onClick={()=>void run(async()=>{ await setReminder(null); setNotice("通知を停止しました。"); })}>通知を停止</button></div>
      </section>
      <section aria-labelledby="native-account" className={card}>
        <h2 id="native-account" className="font-bold">アカウントとデータ</h2>
        <button className={secondary} onClick={()=>{localStorage.removeItem("kakomon:ai-consent:20261103");setNotice("AI送信の許可を取り消しました。次の送信前に再確認します。");}}>AI送信の許可を取り消す</button>
        <p><Link className="inline-flex min-h-11 items-center font-medium text-destructive underline underline-offset-4" href="/account/delete">アカウント・学習データを削除</Link></p>
      </section>
    </section>}
  </aside>;
}
