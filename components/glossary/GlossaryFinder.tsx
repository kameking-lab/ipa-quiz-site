"use client";
import { useId, useState, type ReactNode } from "react";
import { filterGlossaryGroups } from "../../lib/glossary/filter.mjs";

export interface GlossaryFinderGroup {
 id: string;
 label: string;
 terms: Array<{term:string;reading:string;english?:string;content:ReactNode}>;
}
/** content is the existing server-rendered term card, including host-admitted links. */
export function GlossaryFinder({groups}:{groups:GlossaryFinderGroup[]}) {
 const [query,setQuery]=useState("");
 const inputId=useId();
 const visible=filterGlossaryGroups(groups,query);
 const total=groups.reduce((sum,g)=>sum+g.terms.length,0);
 const count=visible.reduce((sum,g)=>sum+g.terms.length,0);
 return <div className="space-y-6">
  <div className="space-y-2 rounded-xl border border-border p-4">
   <label htmlFor={inputId} className="block text-sm font-medium">用語を絞り込む</label>
   <p id={`${inputId}-hint`} className="text-sm text-muted-foreground">用語名・読み・英語表記で探せます。</p>
   <div className="flex flex-wrap gap-2">
    <input id={inputId} type="search" value={query} onChange={event=>setQuery(event.target.value)}
     aria-describedby={`${inputId}-hint`} className="min-w-0 flex-1 rounded-md border border-border bg-background px-3 py-2 text-base"
     placeholder="例：DNS、でぃーえぬえす" />
    <button type="button" onClick={()=>setQuery("")} disabled={!query}
     className="rounded-md border border-border px-3 py-2 text-sm disabled:opacity-50">クリア</button>
   </div>
   <p role="status" aria-live="polite" aria-atomic="true" className="text-sm">{total}語中{count}語を表示</p>
  </div>
  {visible.length>0?<>
   <nav aria-label="表示中の用語の分類" className="flex flex-wrap gap-2">
    {visible.map(group=><a key={group.id} href={`#${group.id}`} className="rounded-full border border-border px-3 py-2 text-sm underline underline-offset-2">{group.label}（{group.terms.length}）</a>)}
   </nav>
   <div className="space-y-10">{visible.map(group=><section key={group.id} id={group.id} aria-label={group.label} className="scroll-mt-20">
    <h2 className="mb-3 text-base font-bold tracking-tight text-foreground sm:text-lg">{group.label}</h2>
    <dl className="space-y-3">{group.terms.map(term=><TermContent key={term.term} content={term.content}/>)}</dl>
   </section>)}</div>
  </>:<p className="rounded-xl border border-border p-4">一致する用語はありません。入力を短くするか、クリアして一覧へ戻ってください。</p>}
 </div>;
}
function TermContent({content}:{content:ReactNode}) {return <>{content}</>;}
