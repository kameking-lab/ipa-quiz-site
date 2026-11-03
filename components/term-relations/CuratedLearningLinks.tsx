import type { CuratedResult } from '../../lib/term-relations/curated.mjs';

export function CuratedLearningLinks({result,headingId}:{result:CuratedResult;headingId:string}) {
 return <section aria-labelledby={headingId} className="space-y-4">
  <h2 id={headingId}>この内容を次の学習へつなぐ</h2>
  {result.groups.length===0?<p>内容の対応と表示先を確認できたリンクは、まだありません。</p>:
   result.groups.map(group=><div key={group.id} className="space-y-2">
    <h3>{group.title}</h3><ol>{group.items.map(item=><li key={item.id} className="space-y-1">
     <a href={item.href}>{item.title}</a>
     <p>{item.reason}</p><p>解く・読む前に：{item.prerequisite}</p>
     {item.reusedAcrossSteps&&<p>別の手順でも使う同じ問題です。新しい問題数には加えません。</p>}
    </li>)}</ol>
   </div>)}
 </section>;
}
