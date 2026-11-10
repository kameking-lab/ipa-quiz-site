import React, { Component, useEffect, useMemo, useRef, useState,lazy,Suspense, type ReactNode } from "react";
import { createRoot } from "react-dom/client";
import { QuizPlayer } from "@/components/quiz/QuizPlayer";
import { ExamQuestionPlayer } from "@/components/exam-library/exam-question-player";
import type { ExamQuestion } from "@/lib/exam-library-model";
import type { CatalogEntry } from "../shared/contracts";
import type {Material} from "../shared/material-types";
import { filterQuestions } from "@/lib/questions/filter";
import { deriveSessionPool } from "@/lib/questions/session-pool";
import { createHistoryStore } from "@/lib/storage/history";
import { startSession } from "@/lib/motivation/session";
import type { Question, QuizMode } from "@/lib/questions/types";
import { downloads, type DownloadIndex } from "./downloads";
import { hydrateImages } from "./images";
import { persistStudy, restoreStudy, studyOwner } from "./portable-storage";
import { isOnline, observeConnection, observeReminderTap, setReminder } from "./platform";
import { observeLogin } from "./login";
import { refreshDeviceRights } from "./refresh-rights";
import { applyDeviceTheme } from "./theme";
import { installLocalApi } from "./local-api";
import { App as NativeApp } from "@capacitor/app";
import { Capacitor } from "@capacitor/core";
import { Preferences } from "@capacitor/preferences";
import { Share } from "@capacitor/share";
import catalog from "./generated/catalog.json";
import { QualificationCardActions } from "./QualificationActions";
import "./native.css";
import { prepareTrackingPrivacy } from "./tracking";
import { installNativePetSupport, observePetStudyWrites, persistStudyAfterPets } from "./pet-support";
const ORIGIN="https://www.kakomon-ai.jp";
const MaterialReader=lazy(()=>import("./MaterialReader"));
const EXAMS=catalog.exams as CatalogEntry[];
/** Shown first so the most common qualifications need no search. */
const POPULAR=["ip","fe","sg","ap","takken","fp3","denken3","denko2"];
const ONLINE_MENU:Array<[string,string]>=[["/modes/year","年度別"],["/modes/topic","分野別"],["/mock-exam","模試"],["/quiz?mode=unanswered","未回答"],["/review","復習"],["/bookmarks","ブックマーク"],["/account/dashboard","学習履歴・統計"],["/quiz?mode=random&exam=ap","AIコパイロット"],["/essay","記述・論述採点"],["/settings","設定・同期"]];
const log=(step:string)=>(error:unknown)=>console.error(`[kakomon] ${step} failed`,error);
const onlineHref=(e:CatalogEntry)=>e.href??(e.code.startsWith("library.")?`/e-learning/exams/${e.code.slice(8)}`:`/quiz?exam=${e.code}&mode=random`);
const primaryButton="inline-flex min-h-12 w-full items-center justify-center rounded-xl bg-primary px-4 text-base font-semibold text-primary-foreground disabled:opacity-50";
const secondaryButton="inline-flex min-h-11 items-center justify-center rounded-xl border border-border bg-background px-4 text-sm font-medium disabled:opacity-50";
const field="min-h-11 w-full rounded-xl border border-border bg-background px-3";
function App({ offlineFallback = false }: { offlineFallback?: boolean }) {
  const [saved,setSaved]=useState<DownloadIndex>({}),[notice,setNotice]=useState(offlineFallback?"オフラインです。保存した問題と通知はここで使えます。":"");
  const [online,setOnline]=useState(typeof navigator==="undefined"?true:navigator.onLine),[busy,setBusy]=useState(false);
  const [mode,setMode]=useState<QuizMode>("random"),[year,setYear]=useState(""),[category,setCategory]=useState(""),[session,setSession]=useState("");
  const [pool,setPool]=useState<Question[]>([]),[index,setIndex]=useState(0),[question,setQuestion]=useState<Question|null>(null);
  const [library,setLibrary]=useState<{entry:CatalogEntry;questions:ExamQuestion[]}|null>(null);
  const [materials,setMaterials]=useState<Material[]>([]),[materialIndex,setMaterialIndex]=useState(0);
  const [owner,setOwner]=useState<string|null>(null),[time,setTime]=useState("20:00");
  const [ready,setReady]=useState(false);
  const [query,setQuery]=useState(""),[selected,setSelected]=useState<CatalogEntry|null>(null);
  const ownerRef=useRef<string|null>(null),readyRef=useRef(false),reading=useRef(false),running=useRef(false);
  // False when the study snapshot could not be read: never overwrite it then.
  const persistAllowed=useRef(true);
  useEffect(()=>{reading.current=!!(pool.length||library||materials.length);},[pool.length,library,materials.length]);
  const history=createHistoryStore(),stats=history.getStats();
  const persist=(id:string|null)=>persistAllowed.current?persistStudy(id):Promise.resolve();
  // Leaving the shell (background / online) also flushes pending pet state.
  const persistLeaving=(id:string|null)=>persistAllowed.current?persistStudyAfterPets(id):Promise.resolve();
  useEffect(()=>{
    let disposed=false; const disposers:Array<()=>void>=[];
    const keep=(dispose:()=>void)=>{ if(disposed) dispose(); else disposers.push(dispose); };
    keep(observePetStudyWrites(()=>({ready:readyRef.current&&persistAllowed.current,owner:ownerRef.current}),e=>setNotice(String(e))));
    const markReady=(id:string|null)=>{ if(!disposed){ownerRef.current=id;readyRef.current=true;setOwner(id);setReady(true);} };
    void downloads.list().then(v=>{ if(!disposed) setSaved(v); }).catch(log("saved index"));
    void downloads.rights().then(async r=>{
      const id=await studyOwner(r?.access.userId??null);await restoreStudy(id);markReady(id);
    }).catch(error=>{
      // The app must stay usable: study online, but do not overwrite history we could not read.
      log("study restore")(error);persistAllowed.current=false;markReady(null);
      if(!disposed)setNotice("この端末の学習履歴を読み込めませんでした。問題は解けますが、端末内の履歴は更新されません。");
    });
    void observeConnection(setOnline).then(keep).catch(log("network status"));
    void observeReminderTap(()=>{ setPool([]);setLibrary(null);setMaterials([]);setQuestion(null);setMode("review"); }).then(keep).catch(log("reminder listener"));
    if(Capacitor.isNativePlatform()) {
      void observeLogin(ORIGIN,e=>setNotice(String(e))).then(keep).catch(log("login listener"));
      void NativeApp.addListener("appStateChange",s=>{
        if(!readyRef.current)return;
        if(!s.isActive)void persistLeaving(ownerRef.current).catch(log("persist study"));
        else void refreshDeviceRights().then(()=>{if(reading.current)return downloads.authorize();}).catch(e=>{setPool([]);setQuestion(null);setLibrary(null);setMaterials([]);setNotice(String(e));});
      }).then(h=>keep(()=>{ void h.remove(); })).catch(log("app state listener"));
    }
    const home=()=>{setPool([]);setQuestion(null);setLibrary(null);setMaterials([]);};window.addEventListener("mobile:home",home);
    window.addEventListener("mobile:offline-rights-changed",home);
    const deleted=()=>{readyRef.current=false;ownerRef.current=null;home();};window.addEventListener("mobile:account-deleted",deleted);
    const timer=setInterval(()=>{
      if(!readyRef.current)return;
      void persist(ownerRef.current).catch(log("persist study"));
      if(reading.current) void downloads.authorize().catch(e=>{home();setNotice(String(e));});
    },15000);
    return()=>{window.removeEventListener("mobile:account-deleted",deleted);disposed=true;disposers.forEach(d=>d());clearInterval(timer);window.removeEventListener("mobile:home",home);window.removeEventListener("mobile:offline-rights-changed",home);};
  },[]);
  useEffect(()=>{
    if(online&&ready)void refreshDeviceRights().catch(e=>{setPool([]);setQuestion(null);setLibrary(null);setMaterials([]);setNotice(String(e));});
  },[online,ready]);
  useEffect(()=>{
    let cancelled=false;setQuestion(null);
    const current=pool[index]; if(!current)return;
    void downloads.authorize().then(()=>hydrateImages(current)).then(q=>{ if(!cancelled)setQuestion(q); }).catch(e=>{ if(!cancelled){setPool([]);setNotice(String(e));} });
    return()=>{cancelled=true;};
  },[pool,index]);
  const results=useMemo(()=>{
    const q=query.trim().toLowerCase();
    return q?EXAMS.filter(e=>e.name.toLowerCase().includes(q)||e.code.toLowerCase().includes(q)):EXAMS;
  },[query]);
  async function run(fn:()=>Promise<void>) {
    if(running.current)return;
    if(!readyRef.current){setNotice("学習履歴を準備しています。少し待ってからお試しください。");return;}
    running.current=true;setBusy(true);setNotice("");try{await fn();}catch(e){setNotice(e instanceof Error?e.message:String(e));}finally{running.current=false;setBusy(false);}
  }
  async function begin(code:string) {
    await refreshDeviceRights();
    if(code.startsWith("material.")) {
      setMaterials(await hydrateImages(await downloads.load<Material>(code)));setMaterialIndex(0);return;
    }
    if(code.startsWith("library.")) {
      const entry=EXAMS.find(e=>e.code===code)!;
      const questions=await hydrateImages(await downloads.load<ExamQuestion>(code));
      setLibrary({entry,questions});return;
    }
    const questions=await downloads.load(code);
    const filtered=filterQuestions(questions,{ mode,year:year?Number(year):undefined,category:category||undefined,session:session as Question["session"]||undefined,inOrder:mode==="year" },history);
    const ids=deriveSessionPool(filtered.map(q=>q.id),mode,Object.fromEntries(filtered.map(q=>[q.id,q.category])));
    const byId=new Map(filtered.map(q=>[q.id,q]));
    const next=ids.map(id=>byId.get(id)!);
    if(!next.length)throw new Error("条件に合う問題がありません。");
    startSession(mode);setPool(next);setIndex(0);
  }
  async function openOnline(path="/") {
    // History hand-off must not block studying: log and continue online.
    await persistLeaving(owner).catch(log("persist before online"));
    location.assign(ORIGIN+path);
  }
  const studying=!!(materials.length||library?.entry.paper||pool.length);
  const toList=()=>{setPool([]);setQuestion(null);setLibrary(null);setMaterials([]);setSelected(null);};
  const header=<header className="native-header">
    <strong className="text-lg font-bold tracking-tight">過去問AI</strong>
    <span className={`rounded-full px-2 py-0.5 text-xs ${online?"bg-primary/10 text-primary":"bg-muted text-muted-foreground"}`}>{online?"オンライン":"オフライン"}</span>
    {studying||selected
      ? <button className={`${secondaryButton} ml-auto`} onClick={toList}>資格一覧</button>
      : offlineFallback||!online
        ? <button className={`${secondaryButton} ml-auto`} onClick={()=>{try{sessionStorage.removeItem(HANDOFF_KEY);}catch{/* best effort */}location.replace(ORIGIN+"/");}}>オンラインで開く</button>
        : <button className={`${secondaryButton} ml-auto`} onClick={()=>void run(()=>openOnline("/settings#app-settings"))}>会員・設定</button>}
  </header>;
  const status=notice&&<p role="status" className="native-notice">{notice}</p>;
  if(materials.length) return <>{header}{status}<div className="native-shell"><label className="flex flex-col gap-1">保存した問題<select className={field} value={materialIndex} onChange={e=>setMaterialIndex(Number(e.target.value))}>{materials.map((m,i)=><option key={m.id} value={i}>{m.title}</option>)}</select></label><Suspense fallback={<p>表示を準備しています…</p>}><MaterialReader material={materials[materialIndex]}/></Suspense></div></>;
  if(library?.entry.paper) return <>{header}{status}<div className="native-shell"><ExamQuestionPlayer examId={library.entry.paper.id} examTitle={library.entry.name} pdfUrl={library.entry.paper.pdfUrl} indexUrl={library.entry.paper.indexUrl} questions={library.questions}/></div></>;
  if(pool.length) return <>{header}{status}<p className="native-shell-note">有料会員の保存済み問題を使用中。AI・クラウド同期はオンライン画面で利用できます。</p><div className="native-quiz"><QuizPlayer question={question} index={index} total={pool.length} mode={mode} exam={pool[index]?.exam} backHref="/" onNext={()=>{
      void run(async()=>{await downloads.authorize();await persist(owner);if(index+1>=pool.length){setPool([]);setQuestion(null);setNotice("演習が終わりました。");}else setIndex(i=>i+1);});
    }}/></div></>;
  if(selected) {
    const e=selected,isSaved=!!saved[e.code],quiz=!e.code.startsWith("library.")&&!e.code.startsWith("material.");
    return <>{header}{status}<main className="native-main space-y-5" data-mobile-ready={ready}>
      <div><h1 className="text-2xl font-bold leading-snug">{e.name}</h1><p className="text-sm text-muted-foreground">{e.count.toLocaleString()}問{isSaved?" · 保存済み":""}</p></div>
      <div className="space-y-3">
        {isSaved
          ? <><button className={primaryButton} disabled={busy} onClick={()=>void run(()=>begin(e.code))}>保存問題で学習</button><button className={`${secondaryButton} w-full`} disabled={busy} onClick={()=>void run(()=>openOnline(onlineHref(e)))}>オンラインで解く</button></>
          : <button className={primaryButton} disabled={busy} onClick={()=>void run(()=>openOnline(onlineHref(e)))}>問題を解く</button>}
        <p className="text-sm text-muted-foreground">{isSaved?"保存問題は通信なしで解けます。":online?"ログイン不要で1日10問まで無料です。":"オフラインです。通信できる場所で解けます。"}</p>
      </div>
      {isSaved&&quiz&&<details className="native-card"><summary className="native-summary">出題条件（保存問題）</summary><div className="grid grid-cols-2 gap-3 pb-3">
        <label className="flex flex-col gap-1 text-sm">モード<select className={field} value={mode} onChange={ev=>setMode(ev.target.value as QuizMode)}>{[["random","ランダム"],["year","年度別"],["topic","分野別"],["review","復習"],["unanswered","未回答"],["weakness","苦手"]].map(([v,n])=><option key={v} value={v}>{n}</option>)}</select></label>
        <label className="flex flex-col gap-1 text-sm">年度<input className={field} inputMode="numeric" placeholder="すべて" value={year} onChange={ev=>setYear(ev.target.value)}/></label>
        <label className="flex flex-col gap-1 text-sm">分野<input className={field} placeholder="すべて" value={category} onChange={ev=>setCategory(ev.target.value)}/></label>
        <label className="flex flex-col gap-1 text-sm">科目<input className={field} placeholder="例 am / pm" value={session} onChange={ev=>setSession(ev.target.value)}/></label>
      </div></details>}
      <div className="native-card"><QualificationCardActions code={e.qualification ?? e.code}/></div>
      {isSaved&&<button className={secondaryButton} disabled={busy} onClick={()=>void run(async()=>{await downloads.removeQualification(e.code);setSaved(await downloads.list());})}>保存を削除</button>}
    </main></>;
  }
  return <>{header}{status}<main className="native-main space-y-6" data-mobile-ready={ready}>
    <section className="space-y-2 pt-2"><h1 className="text-[1.75rem] font-bold leading-snug tracking-tight">全資格の過去問を、いつでも。</h1><p className="text-muted-foreground">ログイン不要で1日10問（全資格共通・日本時間0時リセット）。有料会員は回数無制限です。</p></section>
    <section aria-labelledby="pick-title" className="space-y-3">
      <h2 id="pick-title" className="text-lg font-bold">資格を選んで始める</h2>
      <input type="search" aria-label="資格名で探す" className={field} placeholder="資格名で探す（例：宅建、ITパスポート）" value={query} onChange={e=>setQuery(e.target.value)}/>
      {!query&&<div className="grid grid-cols-2 gap-2">{POPULAR.map(code=>EXAMS.find(e=>e.code===code)).filter((e):e is CatalogEntry=>!!e).map(e=><button key={e.code} className="native-pick" onClick={()=>setSelected(e)}>{e.name}</button>)}</div>}
      <h3 className="pt-2 text-sm font-semibold text-muted-foreground">{query?`検索結果 ${results.length}件`:`すべての資格（${EXAMS.length}）`}</h3>
      <ul className="native-list">{results.map(e=><li key={e.code}><button className="native-exam" onClick={()=>setSelected(e)}><span className="min-w-0 flex-1 break-words">{e.name}</span><span className="shrink-0 text-xs text-muted-foreground">{saved[e.code]?"保存済み · ":""}{e.count.toLocaleString()}問</span></button></li>)}</ul>
      {!results.length&&<p className="text-sm text-muted-foreground">該当する資格がありません。</p>}
    </section>
    <section aria-labelledby="reminder-title" className="native-card space-y-3">
      <h2 id="reminder-title" className="font-bold">毎日の学習通知</h2>
      <label className="flex items-center gap-3 text-sm"><span className="shrink-0">時刻</span><input className="min-h-11 min-w-0 flex-1 rounded-xl border border-border bg-background px-3" type="time" value={time} onChange={e=>setTime(e.target.value)}/></label>
      <div className="grid grid-cols-2 gap-2"><button className={secondaryButton} disabled={busy} onClick={()=>void run(()=>setReminder(time))}>毎日の通知を設定</button><button className={secondaryButton} disabled={busy} onClick={()=>void run(()=>setReminder(null))}>通知を停止</button></div>
    </section>
    <details className="native-card"><summary className="native-summary">その他の機能</summary><div className="space-y-5 pb-3">
      <div className="space-y-2"><h2 className="text-sm font-semibold">オンラインの学習機能</h2><div className="grid grid-cols-2 gap-2">{ONLINE_MENU.map(([path,label])=><button key={path} className={secondaryButton} onClick={()=>void run(()=>openOnline(path))}>{label}</button>)}</div></div>
      <div className="space-y-1"><h2 className="text-sm font-semibold">保存済みの問題（有料会員）</h2><p className="text-sm text-muted-foreground">資格別の事前ダウンロードは有料会員専用です。「会員・設定」から保存できます。失効後は保存問題を利用できません。</p></div>
      <div className="space-y-1"><h2 className="text-sm font-semibold">この端末の学習履歴</h2><p className="text-sm">{stats.total}問 · 正解{stats.correct}問 · 正答率{stats.accuracy}%</p><ol className="space-y-1 text-xs text-muted-foreground">{history.getAllEntries().slice(-20).reverse().map((a,i)=><li key={`${a.at}-${i}`} className="break-all">{a.correct?"正解":"誤答"} · {a.id} · {new Date(a.at).toLocaleString("ja-JP")}</li>)}</ol></div>
      <button className={secondaryButton} onClick={()=>void run(async()=>{await Share.share({title:"過去問AI",text:`累計${stats.total}問を学習しました`,url:ORIGIN});})}>学習結果を共有</button>
    </div></details>
    <p className="text-center text-sm"><a className="inline-flex min-h-11 items-center underline underline-offset-4" href={`${ORIGIN}/terms`}>利用規約</a> · <a className="inline-flex min-h-11 items-center underline underline-offset-4" href={`${ORIGIN}/privacy`}>プライバシーポリシー</a></p>
  </main></>;
}
/** A render error must leave a way back instead of a blank WebView. */
class StartupBoundary extends Component<{children:ReactNode},{failed:boolean}> {
  state={failed:false};
  static getDerivedStateFromError(){return {failed:true};}
  componentDidCatch(error:unknown){log("render")(error);}
  render(){
    if(!this.state.failed)return this.props.children;
    return <main className="native-main space-y-4"><h1 className="text-xl font-bold">画面を表示できませんでした</h1><p>もう一度読み込んでください。学習履歴は端末に残っています。</p><button className={primaryButton} onClick={()=>location.reload()}>再読み込み</button></main>;
  }
}
async function step(name:string,fn:()=>unknown) {
  // One failing native call must never blank the whole app (TestFlight build 12).
  try { await fn(); } catch(error) { log(name)(error); }
}
/**
 * Online, the app opens the real website home (same chihuahua home, presence
 * count, pet game and every mode as the web). This bundled shell is the
 * offline fallback, and "?local=1" opens it on purpose (saved questions).
 */
const HANDOFF_KEY = "kakomon:web-handoff-at";
function recentHandoffFailed(): boolean {
  // Capacitor's errorPath brings a failed navigation back to index.html; never loop.
  try { return Date.now() - Number(sessionStorage.getItem(HANDOFF_KEY) ?? 0) < 60_000; } catch { return false; }
}
async function shouldOpenWebHome(): Promise<boolean> {
  if (!Capacitor.isNativePlatform() || new URLSearchParams(location.search).has("local") || recentHandoffFailed()) return false;
  try { return await isOnline(); } catch { return typeof navigator !== "undefined" && navigator.onLine; }
}
async function openWebHome() {
  try { sessionStorage.setItem(HANDOFF_KEY, String(Date.now())); } catch { /* best effort */ }
  // Carry this device's study history to the web origin first, but never wait long.
  const handOff = (async () => {
    const r = await downloads.rights();
    const owner = await studyOwner(r?.access.userId ?? null);
    await restoreStudy(owner);
    await persistStudyAfterPets(owner);
  })().catch(log("study hand-off"));
  await Promise.race([handOff, new Promise(resolve => setTimeout(resolve, 3000))]);
  location.replace(ORIGIN + "/");
}
async function start() {
  document.documentElement.classList.add("native-app");
  applyDeviceTheme();
  // Install native ad-host blocking before any UI/deep-link can leave the shell.
  // Never rejects: on failure ads simply stay disabled.
  await step("privacy preparation",prepareTrackingPrivacy);
  // Preferences is shared with the online WebView, whose Next.js code has no Vite env.
  const publicSdkKey = import.meta.env.MOBILE_RC_IOS_PUBLIC_KEY;
  if (Capacitor.isNativePlatform() && publicSdkKey) {
    await step("store public SDK key",()=>Preferences.set({ key: "kakomon:rc-ios-public-key", value: publicSdkKey }));
  }
  await step("local API",installLocalApi);
  await step("pet support",installNativePetSupport);
  // index.html's boot splash (Chihuahua on the launch-screen colour) stays up
  // until the web home replaces the page; the offline shell renders over it.
  if (await shouldOpenWebHome()) { await openWebHome(); return; }
  const root = createRoot(document.getElementById("root")!);
  root.render(<StartupBoundary><App offlineFallback={recentHandoffFailed()}/></StartupBoundary>);
}
void start().catch(error => {
  log("startup")(error);
  const root=document.getElementById("root")!;
  const box=document.createElement("main");box.className="native-main space-y-4";
  const text=document.createElement("p");text.textContent="アプリを起動できませんでした。再読み込みしてください。";
  const retry=document.createElement("button");retry.className=primaryButton;retry.textContent="再読み込み";retry.onclick=()=>location.reload();
  box.append(text,retry);root.replaceChildren(box);
});
