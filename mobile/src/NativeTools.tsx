"use client";
import { useCallback, useEffect, useRef, useState } from "react";
import { App } from "@capacitor/app";
import { Browser } from "@capacitor/browser";
import { Share } from "@capacitor/share";
import { Capacitor } from "@capacitor/core";
import { Purchases, type PurchasesPackage } from "@revenuecat/purchases-capacitor";
import { Preferences } from "@capacitor/preferences";
import Link from "next/link";
import type { MobileConfiguration, MobileEntitlement, CatalogEntry } from "../shared/contracts";
import { downloads, type DownloadIndex } from "./downloads";
import { Membership } from "./purchases";
import { beginLogin, observeLogin } from "./login";
import { observeReminderTap, setReminder } from "./platform";
import { persistStudy, restoreStudy } from "./portable-storage";
import { cachedImage } from "./images";
const membership = new Membership();
export const SITE_ORIGIN = "https://www.kakomon-ai.jp";
const localUrl = "capacitor://localhost/index.html";
export function NativeTools({ membershipOnly = false }: { membershipOnly?: boolean }) {
  const [open, setOpen] = useState(membershipOnly), [access, setAccess] = useState<MobileEntitlement | null>(null);
  const [config, setConfig] = useState<MobileConfiguration | null>(null), [offer, setOffer] = useState<PurchasesPackage | null>(null);
  const [catalog, setCatalog] = useState<CatalogEntry[]>([]), [saved, setSaved] = useState<DownloadIndex>({});
  const [notice, setNotice] = useState(""), [busy, setBusy] = useState(false), [time, setTime] = useState("20:00");
  const [purchasePending,setPurchasePending]=useState(false);
  const [downloading,setDownloading]=useState(false);
  const abort = useRef<AbortController | null>(null), user = useRef<string | null>(null);
  const studyReady = useRef(false), accessSignature = useRef("");
  const running=useRef(false);
  const inSite = typeof location !== "undefined" && location.origin === SITE_ORIGIN;
  const refresh = useCallback(async (fresh = false) => {
    const response = await fetch("/api/mobile/entitlement", { method: fresh ? "POST" : "GET", cache: "no-store" });
    if (!response.ok) { setAccess(null); setOffer(null); await downloads.invalidate(); throw new Error("会員状態を確認できません。購入・保存の前にオンラインで再確認してください。"); }
    const result = await response.json() as { entitlement: MobileEntitlement; configuration: MobileConfiguration };
    if (studyReady.current && result.entitlement.userId !== user.current) {
      await persistStudy(user.current); abort.current?.abort(); await downloads.invalidate(); await membership.disconnect(); studyReady.current=false;
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
  }, []);
  const run = useCallback(async (fn: ()=>Promise<void>)=>{
    if(running.current)return;
    running.current=true;
    setBusy(true); setNotice("");
    try { await fn(); } catch(error) {
      const code=error&&typeof error==="object"&&"code"in error?String(error.code):"";
      const cancelled=code==="1" || !!(error&&typeof error==="object"&&"userCancelled"in error&&error.userCancelled);
      if(cancelled&&user.current){await Preferences.remove({key:`kakomon:pending-purchase:${user.current}`});setPurchasePending(false);}
      setNotice(cancelled?"購入をキャンセルしました。":code==="20"?"購入の承認待ちです。再購入せず、承認後に権利を再確認してください。":error instanceof Error ? error.message : "処理を完了できませんでした。");
    }
    finally { running.current=false;setBusy(false); }
  }, []);
  useEffect(()=>{
    if (!Capacitor.isNativePlatform() || !inSite) return;
    const disposers: Array<()=>void> = []; let disposed = false;
    const keep = (dispose: ()=>void)=> { if (disposed) dispose(); else disposers.push(dispose); };
    void refresh().catch(e=>setNotice(String(e)));
    void observeLogin(SITE_ORIGIN, e=>setNotice(String(e))).then(keep);
    void App.addListener("appStateChange", s=>{ if (s.isActive) void refresh(true).catch(e=>setNotice(String(e))); }).then(h=>keep(()=>{ void h.remove(); }));
    void observeReminderTap(()=>window.location.assign(`${SITE_ORIGIN}/review`)).then(keep);
    void Purchases.addCustomerInfoUpdateListener(()=>{ void refresh(true).catch(e=>setNotice(String(e))); }).then(id=>keep(()=>{ void Purchases.removeCustomerInfoUpdateListener({ listenerToRemove: id }); })).catch(()=>{});
    const interval = window.setInterval(()=>{ void refresh().catch(e=>setNotice(String(e))); },60000);
    const mirror=window.setInterval(()=>{if(studyReady.current)void persistStudy(user.current).catch(e=>setNotice(String(e)));},5000);
    const cacheVisibleImages=()=>document.querySelectorAll<HTMLImageElement>("img").forEach(img=>{if(img.complete && img.naturalWidth>0)void cachedImage(img.currentSrc||img.src);});
    const imageObserver=new MutationObserver(cacheVisibleImages); imageObserver.observe(document.body,{childList:true,subtree:true});
    document.addEventListener("load",cacheVisibleImages,true);cacheVisibleImages();
    // Web checkout must never run from the native WebView, even via direct navigation.
    const original = window.fetch;
    window.fetch = async (input, init) => {
      const url = new URL(input instanceof Request ? input.url : String(input), location.href);
      if (url.origin === SITE_ORIGIN && /^\/api\/billing\/(checkout|portal|mock)$/.test(url.pathname)) { setOpen(true); return Response.json({ error: "use_app_store" }, { status: 403 }); }
      return original(input, init);
    };
    const click = (e: MouseEvent)=>{
      const a = (e.target as Element)?.closest?.("a[href]"); if (!a) return;
      const url = new URL(a.getAttribute("href")!, location.href);
      if (url.origin === SITE_ORIGIN && url.pathname.startsWith("/billing")) { e.preventDefault(); e.stopPropagation(); setOpen(true); }
      else if (url.origin !== SITE_ORIGIN && url.protocol === "https:") { e.preventDefault(); e.stopPropagation(); void Browser.open({ url: url.href }); }
    };
    document.addEventListener("click",click,true);
    return ()=>{ disposed=true; disposers.forEach(fn=>fn()); clearInterval(interval);clearInterval(mirror);imageObserver.disconnect();document.removeEventListener("load",cacheVisibleImages,true); window.fetch=original; document.removeEventListener("click",click,true); abort.current?.abort(); };
  },[inSite,refresh,run]);
  useEffect(()=>{ if (open && inSite) void run(async()=>{
    const r = await refresh(true); setOffer(null);
    if (!r.entitlement.entitled && r.entitlement.userId && r.configuration.sdkKey) setOffer(await membership.offer(r.configuration, r.entitlement));
    const response = await fetch("/api/mobile/catalog", { cache:"no-store" });
    if (response.ok) setCatalog((await response.json() as { exams: CatalogEntry[] }).exams);
  }); },[open,inSite,refresh,run]);
  if (!inSite) return null;
  return <aside aria-label="iPhoneの学習機能" className="border-b bg-card p-3 pt-[max(12px,env(safe-area-inset-top))]">
    {!membershipOnly && <div className="flex flex-wrap gap-3"><button onClick={()=>setOpen(!open)}>iPhone設定・会員・保存</button><button onClick={()=>void run(async()=>{await persistStudy(user.current);location.assign(localUrl);})}>端末内で学習</button><button onClick={()=>void run(async()=>{ await Share.share({ title:"過去問AI", url:location.href }); })}>共有</button></div>}
    {open && <section className="mx-auto max-w-2xl space-y-4 py-4">
      <h1 className="text-xl font-bold">過去問AI 有料会員・端末設定</h1>
      <p>全資格・全問題から無料で1日10問（日本時間0時リセット）。有料会員は回数無制限、資格ごとの事前ダウンロードも使えます。</p>
      {notice && <p role="status">{notice}</p>}
      {!access ? <button disabled={busy} onClick={()=>void run(async()=>{ await refresh(true); })}>会員状態を再確認</button> : <>
        <p>{access.entitled ? access.source === "web" ? "ウェブの有料会員です。追加購入は不要です。" : "App Storeの有料会員です。" : "無料会員"}</p>
        {!access.userId && <button onClick={()=>void run(()=>beginLogin(SITE_ORIGIN))}>ログイン</button>}
        {purchasePending&&<p role="status">購入内容をサーバーで確認中です。再購入せず「購入を復元」または会員状態の再確認をご利用ください。</p>}
        {offer && !access.entitled && <div className="space-y-3 rounded-xl border p-4"><h2>過去問AI 月額プラン</h2><p>{offer.product.priceString} / 1か月（税込・自動更新）</p><p>全資格の問題を無制限で演習、資格ごとの事前ダウンロード。購入確認時にApple IDへ請求されます。解約するまで自動更新され、更新前にApp Storeのサブスクリプション管理で解約できます。解約後も有効期間の末日までは利用できます。</p><button disabled={busy||purchasePending} onClick={()=>void run(async()=>{
          const r=await refresh(true);
          if(r.entitlement.entitled)throw new Error("すでに有料会員です。追加購入は不要です。");
          await Preferences.set({key:`kakomon:pending-purchase:${r.entitlement.userId}`,value:"true"});setPurchasePending(true);
          await membership.buy(r.configuration,r.entitlement,offer);const confirmed=await refresh(true);
          setNotice(confirmed.entitlement.entitled?"購入を確認しました。有料会員の機能を利用できます。":"購入内容の確認待ちです。再購入せず、購入復元または会員状態の再確認をご利用ください。");
        })}>{offer.product.priceString} / 月で登録</button></div>}
        {!access.entitled && access.userId && !offer && <p>商品情報を取得できていません。設定と通信を確認してください。</p>}
        <div className="flex gap-4"><button disabled={busy || !access.userId || !config?.sdkKey} onClick={()=>void run(async()=>{ const r=await refresh(true); await membership.restore(r.configuration,r.entitlement); await refresh(true); setNotice("購入を復元し、サーバーで権利を確認しました。"); })}>購入を復元</button>
          <button onClick={()=>void Browser.open({ url:"https://apps.apple.com/account/subscriptions" })}>App Storeで管理・解約</button></div>
        <p><Link href="/terms">利用規約</Link> · <Link href="/privacy">プライバシーポリシー</Link> · <a href="https://www.apple.com/legal/internet-services/itunes/dev/stdeula/">Apple標準使用許諾契約</a></p>
        <h2 className="font-bold">資格ごとの事前ダウンロード（有料会員限定）</h2><p>画像は表示時に取得してキャッシュします。保存した問題は会員権利の有効期限内で利用できます。オフラインの権利確認は最大24時間です。</p>
        {catalog.map(e=><div key={e.code} className="flex flex-wrap items-center justify-between gap-2 border-b py-2"><span>{e.name} · {e.count}問 · {(e.bytes/1048576).toFixed(1)}MB {saved[e.code] ? "保存済み" : ""}</span>
          <button disabled={busy} onClick={()=>void run(async()=>{
            if (!access.entitled) { setNotice("事前ダウンロードは有料会員の特典です。無料でもオンラインで全資格から1日10問使えます。"); return; }
            await refresh(true); abort.current=new AbortController();
            setDownloading(true);
            const group=e.qualification?catalog.filter(item=>item.qualification===e.qualification):[e];
            try { for(const part of group) await downloads.download(part.code,path=>fetch(path,{ cache:"no-store",signal:abort.current!.signal }), (n,total)=>setNotice(`${part.name}: ${n}/${total}問`),abort.current.signal); }
            finally {setDownloading(false);abort.current=null;}
            setSaved(await downloads.list()); setNotice(`${e.name}を保存しました。`);
          })}>{access.entitled ? "保存・更新" : "有料特典を見る"}</button>
          {saved[e.code] && <button disabled={busy} onClick={()=>void run(async()=>{ await downloads.remove(e.code); setSaved(await downloads.list()); })}>削除</button>}</div>)}
        {downloading && <button onClick={()=>abort.current?.abort()}>ダウンロード中止</button>}
      </>}
      <h2 className="font-bold">毎日の学習通知</h2><label>時刻 <input type="time" value={time} onChange={e=>setTime(e.target.value)} /></label><button disabled={busy} onClick={()=>void run(async()=>{ await setReminder(time); setNotice("通知を設定しました。"); })}>通知を設定</button><button disabled={busy} onClick={()=>void run(async()=>{ await setReminder(null); setNotice("通知を停止しました。"); })}>通知を停止</button>
    </section>}
  </aside>;
}
