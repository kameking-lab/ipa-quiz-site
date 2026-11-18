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
import { Membership, deviceMembership, purchaseError, nativePublicSdkKey, describeStoreError, StoreError, checkNativePurchase, startNativePurchase } from "./purchases";
import { fallbackPurchaseExpiry, reconcilePendingPurchase, retryPendingApproval, savePendingPurchase, type PendingPurchase, type PendingPurchaseStatus } from "./pending-purchase";
import { beginLogin, observeLogin } from "./login";
import { PLAN_OFFER } from "@/lib/billing/plan-offer";
import { PURCHASE_MESSAGES } from "@/lib/billing/purchase-messages";
import { sendConversion } from "@/lib/billing/conversion-client";
import { observeReminderTap, setReminder } from "./platform";
import { persistStudy, restoreStudy } from "./portable-storage";
import { cachedImage } from "./images";
import { NativePageQualificationActions } from "./QualificationActions";
import { isQualificationUrl } from "../shared/qualification-schedules";
import { openQualificationUrl } from "./qualification-platform";
import { ManageSubscriptionButton } from "@/app/billing/ManageSubscriptionButton";
import { blocksNativeWebPurchase } from "../shared/native-billing-policy";
import { installNativePetSupport, observePetStudyWrites, persistStudyAfterPets } from "./pet-support";
const defaultMembership = deviceMembership;
/** User-facing text for a failure: the message, without the "Error: " prefix String(e) adds. */
export function noticeText(error: unknown): string { return error instanceof Error ? error.message : String(error); }
export const SITE_ORIGIN = "https://www.kakomon-ai.jp";
// The bundled shell: offline study with saved questions (paid downloads).
const localUrl = "capacitor://localhost/index.html?local=1";
// 「登録」/「購入を復元」 tapped while signed out: sign in first, then carry on
// automatically when the panel reopens after the sign-in return.
const INTENT_KEY = "kakomon:purchase-intent:v1";
type Intent = "buy" | "restore";
const defaultSignIn = (returnTo: string, switchAccount = false) => beginLogin(SITE_ORIGIN, returnTo, switchAccount ? "switch-account" : false);
/** Message for a failed action: our own sentences as-is, SDK failures with their code. */
/** The membership check itself failed. Shown once, as its own line, and cleared by the next success. */
export class StatusError extends Error {}
export async function statusFailureText(response: Response | null): Promise<string> {
  if (!response) return "会員状態を確認できません（通信エラー）。電波の良い場所で「再確認」を押してください。";
  const body = await response.json().catch(() => null) as { error?: string; detail?: string } | null;
  const reason = [body?.error || `HTTP ${response.status}`, body?.detail].filter(Boolean).join(" / ");
  return `会員状態を確認できません（${reason}）。「再確認」を押してください。続く場合はこの表示をお知らせください。`;
}
export function actionFailureText(error: unknown, step: string): string {
  if (error instanceof StoreError || error instanceof StatusError) return error.message;
  if (error instanceof Error && !("code" in error)) return error.message;
  return describeStoreError(error, step);
}
export function NativeTools({ membershipOnly = false, membership = defaultMembership, signIn = defaultSignIn }: { membershipOnly?: boolean; membership?:Membership; signIn?: (returnTo: string, switchAccount?: boolean)=>Promise<void> }) {
  const [open, setOpen] = useState(membershipOnly || (typeof location !== "undefined" && location.hash === "#app-settings")), [access, setAccess] = useState<MobileEntitlement | null>(null);
  const [config, setConfig] = useState<MobileConfiguration | null>(null), [offer, setOffer] = useState<PurchasesPackage | null>(null);
  const [catalog, setCatalog] = useState<CatalogEntry[]>([]), [saved, setSaved] = useState<DownloadIndex>({});
  const [notice, setNotice] = useState(""), [busy, setBusy] = useState(false), [time, setTime] = useState("20:00");
  const [purchaseSignIn, setPurchaseSignIn] = useState(false);
  const [manageWebPurchase, setManageWebPurchase] = useState(false);
  const [signingIn, setSigningIn] = useState<"" | "opening" | "finishing">("");
  const [purchasePending,setPurchasePending]=useState<PendingPurchaseStatus>(null);
  // Why the price could not be shown. Kept apart from `notice`, which every
  // later action clears, so the reason stays on screen until it is fixed.
  const [offerError,setOfferError]=useState(""), [offerLoading,setOfferLoading]=useState(false);
  const [resume,setResume]=useState<Intent|null>(null);
  // The last failed membership check (server code included). Separate from
  // `notice` so a later success removes it instead of leaving a stale banner.
  const [statusError,setStatusError]=useState("");
  // Bumped whenever something other than the 「会員・設定」 button opens the panel
  // (a /billing link, a blocked web checkout, returning from sign-in). The panel
  // sits above the site header, so without scrolling to it the tap looked dead.
  const [revealTick,setRevealTick]=useState(0);
  const heading=useRef<HTMLHeadingElement>(null);
  const [downloading,setDownloading]=useState(false);
  const [downloadCode,setDownloadCode]=useState<string|null>(null), [downloadProgress,setDownloadProgress]=useState("");
  const abort = useRef<AbortController | null>(null), user = useRef<string | null>(null);
  const studyReady = useRef(false), accessSignature = useRef("");
  const signingOut = useRef(false);
  const running=useRef(false);
  const storeKitRunning=useRef(false);
  const refreshing=useRef<Promise<unknown>>(Promise.resolve());
  const inSite = typeof location !== "undefined" && location.origin === SITE_ORIGIN;
  const refresh = useCallback((fresh = false) => {
    const task=refreshing.current.then(async()=>{
    const response = await fetch("/api/mobile/entitlement", { method: fresh ? "POST" : "GET", cache: "no-store" }).catch(()=>null);
    if (!response?.ok) {
      // Keep what we last knew (signed in / member): replacing it with a login
      // button made a signed-in buyer look signed out right after paying.
      setOffer(null);
      // A failed request proves no revocation. Existing offline leases still
      // go through signature, owner and expiry checks when opened.
      if (response && [401, 403].includes(response.status)) await downloads.invalidate();
      const message=await statusFailureText(response);
      setStatusError(message); throw new StatusError(message);
    }
    setStatusError("");
    const result = await response.json() as { entitlement: MobileEntitlement; configuration: MobileConfiguration };
    result.configuration.sdkKey = await nativePublicSdkKey(result.configuration.sdkKey);
    if (signingOut.current) throw new StatusError("ログアウト中です。");
    if (studyReady.current && result.entitlement.userId !== user.current) {
      abort.current?.abort(); await downloads.invalidate(); await membership.disconnect(); studyReady.current=false;
    }
    if (!studyReady.current) {
      await restoreStudy(result.entitlement.userId);
      if (signingOut.current) throw new StatusError("ログアウト中です。");
      studyReady.current=true;
    }
    user.current = result.entitlement.userId;
    let pending: PendingPurchaseStatus = null;
    if (!storeKitRunning.current) {
      pending = result.entitlement.userId
        ? await reconcilePendingPurchase(result.entitlement.userId, result.entitlement.source === "app-store") : null;
      setPurchasePending(pending);
    }
    const signature=JSON.stringify([result.entitlement.userId,result.entitlement.entitled]);
    if(accessSignature.current!==signature) { accessSignature.current=signature;window.dispatchEvent(new Event("mobile:entitlement-changed")); }
    if (signingOut.current) throw new StatusError("ログアウト中です。");
    setAccess(result.entitlement); setConfig(result.configuration);
    if (result.entitlement.entitled && result.entitlement.lease) await downloads.updateRights(result.entitlement, result.configuration.leasePublicKey).catch(()=>{setNotice("オフライン用の検証キーは配布設定待ちです。オンラインの学習・会員権利は利用できます。");});
    else if (!result.entitlement.entitled) await downloads.invalidate();
    else {
      const cached = await downloads.rights();
      if (cached && cached.access.userId !== result.entitlement.userId) await downloads.invalidate();
    }
    setSaved(await downloads.list());
    return { ...result, pending };
    });
    refreshing.current=task.catch(()=>{});
    return task;
  }, [membership]);
  const run = useCallback(async (fn: ()=>Promise<void>)=>{
    if(running.current || signingOut.current)return;
    running.current=true;
    setBusy(true); setNotice(""); setPurchaseSignIn(false); setManageWebPurchase(false);
    try { await fn(); } catch(error) {
      const {cancelled,pending}=purchaseError(error);
      setPurchaseSignIn(error instanceof StoreError && error.code === "purchase_signin");
      setManageWebPurchase(error instanceof StoreError && error.code === "web_subscription_exists");
      // A failed membership check is already on screen as statusError.
      setNotice(error instanceof StatusError?"":cancelled?"購入をキャンセルしました。":pending?"購入の承認待ちです。再購入せず、承認後に権利を再確認してください。":actionFailureText(error,"処理を完了できませんでした"));
    }
    finally { running.current=false;setBusy(false); }
  }, []);
  useEffect(()=>{
    if (!Capacitor.isNativePlatform() || !inSite) return;
    const disposers: Array<()=>void> = []; let disposed = false;
    const keep = (dispose: ()=>void)=> { if (disposed) dispose(); else disposers.push(dispose); };
    const report=(e:unknown)=>{ if(!(e instanceof StatusError))setNotice(noticeText(e)); };
    keep(installNativePetSupport());
    keep(observePetStudyWrites(()=>({ready:studyReady.current,owner:user.current}),e=>setNotice(noticeText(e))));
    void refresh().catch(report);
    void observeLogin(SITE_ORIGIN, e=>{setSigningIn("");setNotice(noticeText(e));}, ()=>{setOpen(true);setRevealTick(n=>n+1);setSigningIn("finishing");}).then(keep);
    void App.addListener("appStateChange", s=>{
      if(s.isActive)void refresh(true).catch(report);
      else if(studyReady.current)void persistStudyAfterPets(user.current).catch(e=>setNotice(noticeText(e)));
    }).then(h=>keep(()=>{ void h.remove(); }));
    const online = () => { void refresh(true).catch(report); };
    window.addEventListener("online", online);
    keep(() => window.removeEventListener("online", online));
    void observeReminderTap(()=>window.location.assign(`${SITE_ORIGIN}/review`)).then(keep);
    void Purchases.addCustomerInfoUpdateListener(()=>{ void refresh(true).catch(report); }).then(id=>keep(()=>{ void Purchases.removeCustomerInfoUpdateListener({ listenerToRemove: id }); })).catch(()=>{});
    const interval = window.setInterval(()=>{ void refresh().catch(report); },60000);
    const deleted=()=>{studyReady.current=false;user.current=null;abort.current?.abort();setAccess(null);setOffer(null);clearInterval(interval);};
    window.addEventListener("mobile:account-deleted",deleted);
    const signingOutNow=()=>{signingOut.current=true;deleted();};
    window.addEventListener("mobile:signing-out",signingOutNow);
    const mirror=window.setInterval(()=>{if(studyReady.current)void persistStudy(user.current).catch(e=>setNotice(noticeText(e)));},5000);
    const cacheVisibleImages=()=>document.querySelectorAll<HTMLImageElement>("img").forEach(img=>{if(img.complete && img.naturalWidth>0)void cachedImage(img.currentSrc||img.src);});
    const imageObserver=new MutationObserver(cacheVisibleImages); imageObserver.observe(document.body,{childList:true,subtree:true});
    document.addEventListener("load",cacheVisibleImages,true);cacheVisibleImages();
    // Web checkout must never run from the native WebView, even via direct navigation.
    const original = window.fetch;
    window.fetch = async (input, init) => {
      const url = new URL(input instanceof Request ? input.url : String(input), location.href);
      if (blocksNativeWebPurchase(url)) { setOpen(true); setRevealTick(n=>n+1); return Response.json({ error: "use_app_store" }, { status: 403 }); }
      return original(input, init);
    };
    const click = (e: MouseEvent)=>{
      const a = (e.target as Element)?.closest?.("a[href]"); if (!a) return;
      const url = new URL(a.getAttribute("href")!, location.href);
      if (url.origin === SITE_ORIGIN && ["/billing", "/billing/start"].includes(url.pathname.replace(/\/$/, ""))) { if (a.hasAttribute("data-monthly-plan")) sendConversion("plan_clicked"); e.preventDefault(); e.stopPropagation(); setOpen(true); setRevealTick(n=>n+1); }
      else if (url.origin !== SITE_ORIGIN && url.protocol === "https:") { e.preventDefault(); e.stopPropagation(); void (isQualificationUrl(url.href) ? openQualificationUrl(url.href) : Browser.open({ url: url.href })).catch(()=>setNotice("リンクを開けませんでした。再度お試しください。")); }
    };
    document.addEventListener("click",click,true);
    return ()=>{ window.removeEventListener("mobile:signing-out",signingOutNow);window.removeEventListener("mobile:account-deleted",deleted);disposed=true; disposers.forEach(fn=>fn()); clearInterval(interval);clearInterval(mirror);imageObserver.disconnect();document.removeEventListener("load",cacheVisibleImages,true); window.fetch=original; document.removeEventListener("click",click,true); abort.current?.abort(); };
  },[inSite,refresh,run]);
  // Loading the panel's data must never hold the action lock: a tap on
  // 「ログイン」 while it loads used to be silently dropped by run().
  const loadOffer = useCallback(async (r: { entitlement: MobileEntitlement; configuration: MobileConfiguration }, isCancelled: ()=>boolean = ()=>false) => {
    if (signingOut.current) return null;
    if (r.entitlement.entitled) { setOffer(null); setOfferError(""); return null; }
    setOfferLoading(true);
    try {
      // Price and the buy button are shown before sign-in (sign-in happens on tap).
      const found = await membership.offer(r.configuration, r.entitlement);
      if (!isCancelled()) { setOffer(found); setOfferError(""); }
      return found;
    } catch (error) {
      if (!isCancelled()) { setOffer(null); setOfferError(actionFailureText(error, "App Storeから商品を取得できませんでした")); }
      return null;
    } finally { if (!isCancelled()) setOfferLoading(false); }
  }, [membership]);
  useEffect(()=>{ if (!open || !inSite) return; let cancelled=false; void (async()=>{
    const r = await refresh(true); if(cancelled)return;
    await loadOffer(r, ()=>cancelled); if(cancelled)return;
    if (r.entitlement.userId) {
      const raw=(await Preferences.get({key:INTENT_KEY})).value;
      if (raw) {
        await Preferences.remove({key:INTENT_KEY});
        const intent=JSON.parse(raw) as {action?:Intent;createdAt?:number};
        if ((intent.action==="buy"||intent.action==="restore") && Date.now()-(intent.createdAt??0)<15*60000 && !cancelled) setResume(intent.action);
      }
    }
    const response = await fetch("/api/mobile/catalog", { cache:"no-store" });
    if (response.ok && !cancelled) setCatalog((await response.json() as { exams: CatalogEntry[] }).exams);
  })().catch(error=>{ if(!cancelled && !(error instanceof StatusError))setNotice(error instanceof Error?error.message:"会員状態を確認できません。"); }); return ()=>{cancelled=true;}; },[open,inSite,refresh,loadOffer]);
  useEffect(()=>{
    if (!revealTick) return;
    const reduced = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    window.scrollTo({ top: 0, behavior: reduced ? "auto" : "smooth" });
    heading.current?.focus({ preventScroll: true });
  },[revealTick]);
  const returnHere = ()=>`${location.pathname}${location.search}#app-settings`;
  const offerVisible = open && !!offer && !!access && !access.entitled;
  const offerWasVisible = useRef(false);
  useEffect(() => {
    if (offerVisible && !offerWasVisible.current) sendConversion("offer_viewed");
    offerWasVisible.current = offerVisible;
  }, [offerVisible]);
  const loginFor = async (action: Intent)=>{
    if (action === "buy") sendConversion("signin_viewed");
    await Preferences.set({key:INTENT_KEY,value:JSON.stringify({action,createdAt:Date.now()})});
    setSigningIn("opening");
    try { await signIn(returnHere()); } finally { setTimeout(()=>setSigningIn(s=>s==="opening"?"":s),1500); }
    setNotice(action==="buy"?"ログインが終わると、そのまま購入画面に進みます。":"ログインが終わると、そのまま購入を復元します。");
  };
  const purchase = ()=>void run(async()=>{
    const r=await refresh(true);
    if(r.entitlement.entitled)throw new Error("すでに有料会員です。追加購入は不要です。");
    if(!r.entitlement.userId){ await loginFor("buy"); return; }
    if(r.pending) return;
    await Preferences.remove({key:INTENT_KEY});
    const selected=offer??await loadOffer(r);
    if(!selected)throw new StoreError("商品情報を取得できないため購入を開始できません。表示中の理由をご確認ください。","no_offer");
    const userId = r.entitlement.userId;
    let pending: PendingPurchase | undefined;
    const writePending = async (next: PendingPurchase) => {
      const marker = { ...next, revision: (pending?.revision ?? 0) + 1 };
      const saved = await savePendingPurchase(userId, pending, marker);
      if (saved) pending = marker;
      return saved;
    };
    let readyForStoreKit = false;
    storeKitRunning.current = true;
    try {
      await membership.buy(r.configuration, r.entitlement, selected, async () => {
        const preparing: PendingPurchase = { state: "preparing", attemptId: crypto.randomUUID() };
        const stale = () => new StoreError(PURCHASE_MESSAGES.app_store_purchase_pending, "purchase_check");
        if (!await writePending(preparing)) throw stale();
        setPurchasePending("processing");
        const reservation = await checkNativePurchase(fetch, preparing.attemptId);
        if (reservation) {
          if (!await writePending({ ...preparing, reservation })) throw stale();
          if (reservation.requiresStart) await startNativePurchase(reservation.id);
        }
        if (!await writePending({ ...preparing, reservation: reservation ?? undefined, state: "recheck", expiresAt: fallbackPurchaseExpiry() })) throw stale();
        readyForStoreKit = true;
      });
      if (pending) await writePending({ ...pending, state: "completed" });
    } catch (error) {
      const outcome = purchaseError(error);
      if (pending?.reservation && (outcome.rejected || !readyForStoreKit)) {
        if (await writePending({ ...pending, state: "release" }))
          setPurchasePending(await reconcilePendingPurchase(userId, false, pending));
      } else if (pending && readyForStoreKit && outcome.rejected) {
        const cleared = await savePendingPurchase(userId, pending);
        setPurchasePending(cleared ? null : "processing");
      } else if (pending && outcome.pending) {
        if (await writePending({ ...pending, state: "approval", expiresAt: fallbackPurchaseExpiry(true) })) {
          setPurchasePending(pending.reservation ? await reconcilePendingPurchase(userId, false, pending) : { approval: pending });
          return;
        }
      } else if (pending && !readyForStoreKit) {
        setPurchasePending(await reconcilePendingPurchase(userId, false, pending));
      }
      throw error;
    } finally {
      storeKitRunning.current = false;
    }
    // StoreKit has charged at this point. RevenueCat may need a moment to show
    // the receipt to our server, so re-check a few times before giving up.
    let confirmed:Awaited<ReturnType<typeof refresh>>|null=null;
    for(let attempt=0;attempt<4&&!confirmed?.entitlement.entitled;attempt++){
      if(attempt)await new Promise(resolve=>setTimeout(resolve,1500));
      confirmed=await refresh(true).catch(()=>null);
    }
    setNotice(confirmed?.entitlement.entitled?"購入を確認しました。有料会員です（ウェブでも同じ会員です）。":"購入は完了しています。会員状態の反映を確認中です。再購入せず、少し待ってから「再確認」を押してください。");
  });
  const retryApproval = () => void run(async () => {
    const userId = access?.userId;
    if (!userId || !purchasePending || purchasePending === "processing") return;
    const { entitlement, configuration } = await refresh(true);
    if (entitlement.userId !== userId || entitlement.entitled) return;
    const state = await retryPendingApproval(userId, purchasePending.approval, async () => {
      const active = await membership.hasActiveAppStorePurchase(configuration, entitlement);
      if (signingOut.current || user.current !== userId) throw new StatusError("ログイン状態が変わりました。");
      return active;
    });
    if (state === undefined) return;
    const confirmed = await refresh(true);
    if (state && !confirmed.entitlement.entitled) setNotice("App Storeの購入を確認中です。反映までお待ちください。");
  });
  const restore = ()=>void run(async()=>{
    storeKitRunning.current = true;
    try {
      const r=await refresh(true);
      if(!r.entitlement.userId){ await loginFor("restore"); return; }
      await Preferences.remove({key:INTENT_KEY});
      await membership.restore(r.configuration,r.entitlement);
    } finally {
      storeKitRunning.current = false;
    }
    const confirmed=await refresh(true);
    setNotice(confirmed.entitlement.entitled?"購入を復元し、サーバーで権利を確認しました。":"有効な購入をサーバーで確認できませんでした。購入に使用したApple IDとログイン中のアカウントをご確認ください。承認待ちの場合は、承認後に再確認してください。");
  });
  // Latest handlers for the resume effect below (effects run in order).
  const actions=useRef({purchase,restore});
  useEffect(()=>{ actions.current={purchase,restore}; });
  useEffect(()=>{ if(!resume)return; setResume(null); if(resume==="buy")actions.current.purchase(); else actions.current.restore(); },[resume]);
  const startLogin = (switchAccount = false)=>{
    // Instant feedback, then the system sign-in sheet; nothing else is awaited first.
    if (signingIn) return;
    setSigningIn("opening"); setNotice("");
    const login = switchAccount ? signIn(returnHere(), true) : beginLogin(SITE_ORIGIN);
    void login.catch(error=>setNotice(error instanceof Error?error.message:"ログイン画面を開けませんでした。")).finally(()=>setTimeout(()=>setSigningIn(s=>s==="opening"?"":s),1500));
  };
  if (!inSite) return null;
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
    {statusError && !open && <div role="alert" className="mx-auto mt-2 flex max-w-2xl items-start gap-2"><p className="min-w-0 flex-1 break-words text-sm">{statusError}</p><button className={pill} disabled={busy} onClick={()=>void run(async()=>{ await refresh(true); })}>再確認</button></div>}
    {notice && !open && <p role="status" className="mx-auto mt-2 max-w-2xl break-words">{notice}</p>}
    {open && <section id="native-settings" className="mx-auto max-w-2xl space-y-4 py-4 text-base">
      <div className="flex items-center justify-between gap-3"><h1 ref={heading} tabIndex={-1} className="text-xl font-bold outline-none">会員・設定</h1>{!membershipOnly && <button className={secondary} onClick={()=>setOpen(false)}>閉じる</button>}</div>
      {statusError && <div role="alert" className="space-y-2 rounded-xl border border-destructive/40 p-3 text-sm"><p className="break-words">{statusError}</p><button className={secondary} disabled={busy} onClick={()=>void run(async()=>{ await refresh(true); })}>会員状態を再確認</button></div>}
      {notice && <p role="status" className="break-words rounded-xl bg-muted p-3 text-sm">{notice}</p>}
      {purchaseSignIn && <button type="button" className={secondary} disabled={busy || !!signingIn} onClick={()=>startLogin(true)}>ログインし直す</button>}
      <section aria-labelledby="native-plan" className={card}>
        <h2 id="native-plan" className="font-bold">月額プラン</h2>
        <p className="text-sm">演習は無料で1日{PLAN_OFFER.freeDaily}問、月額で回数無制限。</p>
        {!access ? <>{!statusError && <><p role="status">会員状態を確認しています…</p><button className={secondary} disabled={busy} onClick={()=>void run(async()=>{ await refresh(true); })}>会員状態を再確認</button></>}</> : <>
          <p className="font-semibold">{access.entitled ? access.source === "web" ? "ウェブの有料会員です。追加購入は不要です。" : "App Storeの有料会員です。" : "無料会員"}</p>
          {(access.source === "web" || manageWebPurchase) && <ManageSubscriptionButton label="ウェブ契約の管理・解約"/>}
          {purchasePending === "processing" && <p role="status" className="text-sm">購入内容をサーバーで確認中です。再購入せず「購入を復元」または会員状態の再確認をご利用ください。</p>}
          {purchasePending && purchasePending !== "processing" && !access.entitled && <div className="text-sm">
            <p role="status">購入の承認待ちです。</p>
            <button type="button" className="min-h-11 underline underline-offset-4 disabled:opacity-50" disabled={busy || !!signingIn} onClick={retryApproval}>承認依頼をやり直す</button>
          </div>}
          {offer && !access.entitled && <button className={primary} disabled={busy||!!purchasePending||!!signingIn}
            aria-describedby="native-purchase-terms" onClick={()=>{sendConversion("plan_clicked");purchase();}}>
            {offer.product.priceString} / 月で登録
          </button>}
          {!access.entitled && !offer && (offerLoading ? <p className="text-sm">App Storeの価格を読み込んでいます…</p> : offerError && <div role="alert" className="space-y-2 rounded-xl border border-destructive/40 p-3 text-sm"><p className="break-words">{offerError}</p><button className={secondary} disabled={busy} onClick={()=>void run(async()=>{ await loadOffer(await refresh(true)); })}>商品情報を再読み込み</button></div>)}
          <div className="space-y-1 text-xs leading-5 text-muted-foreground">
            {offer && !access.entitled && <p id="native-purchase-terms">表示価格は税込です。購入時にApple IDに請求され、毎月自動更新されます。解約はApp Storeのサブスクリプションから。</p>}
            <nav aria-label="App Storeの契約に関する情報" className="flex flex-wrap gap-x-4 [&_a]:inline-flex [&_a]:min-h-8 [&_a]:items-center [&_a]:underline [&_a]:underline-offset-4">
              <Link href="/operator">特商法表示</Link><Link href="/terms">利用規約</Link><Link href="/privacy">プライバシーポリシー</Link>
              <a href="https://www.apple.com/legal/internet-services/itunes/dev/stdeula/">Apple標準使用許諾契約</a>
            </nav>
          </div>
          <div className="grid gap-2 sm:grid-cols-2"><button className={secondary} disabled={busy || !config?.sdkKey || !!signingIn} onClick={restore}>購入を復元</button>
            <button className={secondary} onClick={()=>void Browser.open({ url:"https://apps.apple.com/account/subscriptions" })}>App Storeで管理・解約</button></div>
          {!access.userId && <button type="button" className="inline-flex min-h-11 items-center text-sm underline underline-offset-4 disabled:opacity-60 touch-manipulation"
            aria-busy={!!signingIn} disabled={!!signingIn} onClick={()=>startLogin()}>{signingIn==="finishing"?"ログインしています…":signingIn?"ログイン画面を開いています…":"ログイン"}</button>}
          <details className="rounded-xl border border-border px-3"><summary className="flex min-h-11 cursor-pointer items-center font-semibold">資格ごとの事前ダウンロード（有料会員限定）</summary>
            <div className="space-y-2 pb-3"><p className="text-sm">必要な図表も事前に取得・検証し、すべて保存できた資格のみ保存済みになります。保存した問題は会員権利の有効期限内で利用できます。オフラインの権利確認は最大24時間です。</p>
            {access.entitled && !access.lease && access.leaseError && <p role="status" className="text-sm">事前ダウンロードは現在準備中です（{access.leaseError}）。オンラインの有料機能はそのまま使えます。</p>}
            {catalog.map(e=><div key={e.code} className="flex flex-wrap items-center justify-between gap-2 border-b border-border py-2"><span className="min-w-0 break-words">{e.name} · {e.count}問 · {(e.bytes/1048576).toFixed(1)}MB {saved[e.code] ? "保存済み" : ""}</span>
              <span className="flex gap-2"><button className={secondary} disabled={busy} onClick={()=>void run(async()=>{
                if (!access.entitled) { setNotice("事前ダウンロードは有料会員の特典です。無料でもオンラインで全資格から1日10問使えます。"); return; }
                await refresh(true); abort.current=new AbortController();
                setDownloading(true);setDownloadCode(e.code);setDownloadProgress("準備中…");
                const group=e.qualification?catalog.filter(item=>item.qualification===e.qualification):[e];
                try { for(const part of group) await downloads.download(part.code,path=>fetch(path,{ cache:"no-store",signal:abort.current!.signal }), (n,total)=>setDownloadProgress(`${part.name}: ${n}/${total}問`),abort.current.signal); }
                finally {setDownloading(false);setDownloadCode(null);abort.current=null;}
                setSaved(await downloads.list()); setNotice(`${e.name}を保存しました。`);
              })}>{access.entitled ? "保存・更新" : "有料特典を見る"}</button>
              {saved[e.code] && <button className={secondary} disabled={busy} onClick={()=>void run(async()=>{ await downloads.removeQualification(e.code); setSaved(await downloads.list()); })}>削除</button>}</span>{downloading && downloadCode===e.code && <div className="w-full space-y-2"><p role="status">{e.name}: {downloadProgress}</p><button className={secondary} onClick={()=>abort.current?.abort()}>ダウンロード中止</button></div>}</div>)}
            </div>
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
        {access && <p><Link className="inline-flex min-h-11 items-center font-medium underline underline-offset-4" href={access.userId ? "/account" : "/auth/signin?callbackUrl=/account"}>{access.userId ? "アカウント（ログアウト・削除）" : "ログイン"}</Link></p>}
        <p><Link className="inline-flex min-h-11 items-center font-medium text-destructive underline underline-offset-4" href="/account/delete">アカウント・学習データを削除</Link></p>
      </section>
    </section>}
  </aside>;
}
