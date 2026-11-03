import React, { useEffect, useRef, useState,lazy,Suspense } from "react";
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
import { observeConnection, observeReminderTap, setReminder } from "./platform";
import { observeLogin } from "./login";
import { refreshDeviceRights } from "./refresh-rights";
import { installLocalApi } from "./local-api";
import { App as NativeApp } from "@capacitor/app";
import { Capacitor } from "@capacitor/core";
import { Preferences } from "@capacitor/preferences";
import { Share } from "@capacitor/share";
import catalog from "./generated/catalog.json";
import { QualificationCardActions } from "./QualificationActions";
import "./native.css";
const ORIGIN="https://www.kakomon-ai.jp";
const MaterialReader=lazy(()=>import("./MaterialReader"));
function App() {
  const [saved,setSaved]=useState<DownloadIndex>({}),[notice,setNotice]=useState("");
  const [online,setOnline]=useState(false),[busy,setBusy]=useState(false);
  const [mode,setMode]=useState<QuizMode>("random"),[year,setYear]=useState(""),[category,setCategory]=useState(""),[session,setSession]=useState("");
  const [pool,setPool]=useState<Question[]>([]),[index,setIndex]=useState(0),[question,setQuestion]=useState<Question|null>(null);
  const [library,setLibrary]=useState<{entry:CatalogEntry;questions:ExamQuestion[]}|null>(null);
  const [materials,setMaterials]=useState<Material[]>([]),[materialIndex,setMaterialIndex]=useState(0);
  const [owner,setOwner]=useState<string|null>(null),[time,setTime]=useState("20:00");
  const [ready,setReady]=useState(false);
  const ownerRef=useRef<string|null>(null),readyRef=useRef(false),reading=useRef(false),running=useRef(false);
  useEffect(()=>{reading.current=!!(pool.length||library||materials.length);},[pool.length,library,materials.length]);
  const history=createHistoryStore(),stats=history.getStats();
  useEffect(()=>{
    let disposed=false; const disposers:Array<()=>void>=[];
    const keep=(dispose:()=>void)=>{ if(disposed) dispose(); else disposers.push(dispose); };
    void downloads.list().then(v=>{ if(!disposed) setSaved(v); }).catch(e=>setNotice(String(e)));
    void downloads.rights().then(async r=>{
      const id=await studyOwner(r?.access.userId??null);await restoreStudy(id);
      if(!disposed){ownerRef.current=id;readyRef.current=true;setOwner(id);setReady(true);}
    }).catch(e=>setNotice(String(e)));
    void observeConnection(setOnline).then(keep);
    void observeReminderTap(()=>{ setPool([]);setLibrary(null);setMaterials([]);setQuestion(null);setMode("review"); }).then(keep);
    if(Capacitor.isNativePlatform()) {
      void observeLogin(ORIGIN,e=>setNotice(String(e))).then(keep);
      void NativeApp.addListener("appStateChange",s=>{
        if(!readyRef.current)return;
        if(!s.isActive)void persistStudy(ownerRef.current).catch(e=>setNotice(String(e)));
        else void refreshDeviceRights().then(()=>{if(reading.current)return downloads.authorize();}).catch(e=>{setPool([]);setQuestion(null);setLibrary(null);setMaterials([]);setNotice(String(e));});
      }).then(h=>keep(()=>{ void h.remove(); }));
    }
    const home=()=>{setPool([]);setQuestion(null);setLibrary(null);setMaterials([]);};window.addEventListener("mobile:home",home);
    window.addEventListener("mobile:offline-rights-changed",home);
    const deleted=()=>{readyRef.current=false;ownerRef.current=null;home();};window.addEventListener("mobile:account-deleted",deleted);
    const timer=setInterval(()=>{
      if(!readyRef.current)return;
      void persistStudy(ownerRef.current).catch(e=>setNotice(String(e)));
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
      const entry=(catalog.exams as CatalogEntry[]).find(e=>e.code===code)!;
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
  async function openOnline(path="/") { await persistStudy(owner);location.assign(ORIGIN+path); }
  return <>
    <header className="native-shell flex flex-wrap gap-3 border-b"><strong>過去問AI</strong><span>{online?"オンライン":"オフライン"}</span><button onClick={()=>void run(()=>openOnline())}>オンラインの全機能</button><button onClick={()=>{setPool([]);setQuestion(null);setLibrary(null);setMaterials([]);}}>資格目次</button></header>
    {notice&&<p role="status" className="native-shell">{notice}</p>}
    {materials.length?<div className="native-shell"><label>保存した問題<select value={materialIndex} onChange={e=>setMaterialIndex(Number(e.target.value))}>{materials.map((m,i)=><option key={m.id} value={i}>{m.title}</option>)}</select></label><Suspense fallback={<p>表示を準備しています…</p>}><MaterialReader material={materials[materialIndex]}/></Suspense></div>:library?.entry.paper ? <div className="native-shell"><ExamQuestionPlayer examId={library.entry.paper.id} examTitle={library.entry.name} pdfUrl={library.entry.paper.pdfUrl} indexUrl={library.entry.paper.indexUrl} questions={library.questions}/></div> : pool.length ? <><p className="native-shell">有料会員の保存済み問題を使用中。AI・クラウド同期はオンライン画面で利用できます。</p><QuizPlayer question={question} index={index} total={pool.length} mode={mode} exam={pool[index]?.exam} backHref="/" onNext={()=>{
      void run(async()=>{await downloads.authorize();await persistStudy(owner);if(index+1>=pool.length){setPool([]);setQuestion(null);setNotice("演習が終わりました。");}else setIndex(i=>i+1);});
    }}/></> : <main className="native-shell space-y-5">
      <h1>全資格の過去問を、いつでも。</h1><p>オンラインではウェブと同じ全ページ・全モードを利用できます。無料はログインして全問題から1日10問、ウェブとアプリで枠を共有します。有料会員は回数無制限です。</p>
      <div className="flex flex-wrap gap-3">{[["/quiz?mode=random","ランダム"],["/modes/year","年度別"],["/modes/topic","分野別"],["/mock-exam","模試"],["/quiz?mode=unanswered","未回答"],["/review","復習"],["/bookmarks","ブックマーク"],["/account/dashboard","学習履歴・統計"],["/quiz?mode=random&exam=ap","AIコパイロット"],["/essay","記述・論述採点"],["/settings","設定・同期"],["/billing","有料会員・ダウンロード"]].map(([path,label])=><button key={path} onClick={()=>void run(()=>openOnline(path))}>{label}</button>)}</div>
      <h2>保存済みの問題を解く</h2><p>資格別の事前ダウンロードは有料会員専用です。オンライン画面の「iPhone設定・会員・保存」から保存してください。失効後は保存問題を利用できません。</p>
      <div className="native-grid"><label>モード<select value={mode} onChange={e=>setMode(e.target.value as QuizMode)}>{[["random","ランダム"],["year","年度別"],["topic","分野別"],["review","復習"],["unanswered","未回答"],["weakness","苦手"]].map(([v,n])=><option key={v} value={v}>{n}</option>)}</select></label><label>年度<input inputMode="numeric" placeholder="すべて" value={year} onChange={e=>setYear(e.target.value)}/></label><label>分野<input placeholder="すべて" value={category} onChange={e=>setCategory(e.target.value)}/></label><label>科目<input placeholder="すべて（例 am / pm / kamoku-a）" value={session} onChange={e=>setSession(e.target.value)}/></label></div>
      <div className="native-grid">{(catalog.exams as CatalogEntry[]).map(e=><article key={e.code} className="native-exam"><h3>{e.name}</h3><p>{e.count.toLocaleString()}問 · {(e.bytes/1048576).toFixed(1)}MB</p>{saved[e.code]?<><button disabled={busy} onClick={()=>void run(()=>begin(e.code))}>保存問題で学習</button><button disabled={busy} onClick={()=>void run(async()=>{await downloads.removeQualification(e.code);setSaved(await downloads.list());})}>保存を削除</button></>:<button onClick={()=>void run(()=>openOnline(e.href??(e.code.startsWith("library.")?`/e-learning/exams/${e.code.slice(8)}`:`/quiz?exam=${e.code}&mode=random`)))}>オンラインで解く</button>}<QualificationCardActions code={e.qualification ?? e.code}/></article>)}</div>
      <h2>この端末の学習履歴</h2><p>{stats.total}問 · 正解{stats.correct}問 · 正答率{stats.accuracy}%</p><ol>{history.getAllEntries().slice(-20).reverse().map((a,i)=><li key={`${a.at}-${i}`}>{a.correct?"正解":"誤答"} · {a.id} · {new Date(a.at).toLocaleString("ja-JP")}</li>)}</ol>
      <h2>学習リマインダー</h2><label>時刻<input type="time" value={time} onChange={e=>setTime(e.target.value)}/></label><button disabled={busy} onClick={()=>void run(()=>setReminder(time))}>毎日の通知を設定</button><button disabled={busy} onClick={()=>void run(()=>setReminder(null))}>通知を停止</button>
      <button onClick={()=>void run(async()=>{await Share.share({title:"過去問AI",text:`累計${stats.total}問を学習しました`,url:ORIGIN});})}>学習結果を共有</button>
      <p><a href={`${ORIGIN}/terms`}>利用規約</a> · <a href={`${ORIGIN}/privacy`}>プライバシーポリシー</a></p>
    </main>}
  </>;
}
async function start() {
  // Preferences is shared with the online WebView, whose Next.js code has no Vite env.
  const publicSdkKey = import.meta.env.MOBILE_RC_IOS_PUBLIC_KEY;
  if (Capacitor.isNativePlatform() && publicSdkKey) {
    await Preferences.set({ key: "kakomon:rc-ios-public-key", value: publicSdkKey });
  }
  installLocalApi();
  createRoot(document.getElementById("root")!).render(<App/>);
}
void start().catch(() => {
  document.getElementById("root")!.textContent = "アプリの設定を保存できませんでした。再起動してください。";
});
