import { describe,expect,it,vi } from 'vitest';
import { renderToStaticMarkup } from 'react-dom/server';
import YearPage,{generateMetadata as yearMetadata} from '@/app/modes/year/page';
import TopicPage,{generateMetadata as topicMetadata} from '@/app/modes/topic/page';
import StreamPage from '@/app/quiz/stream/page';
import QuestionPage from '@/app/q/[exam]/[yearSeason]/[section]/[qnum]/page';
import PaperPage from '@/app/[exam]/[yearSeason]/page';
import { AVIATION_COMM_QUESTIONS as qs } from '@/data/questions/aviation-comm';
import { questionPagePath } from '@/lib/seo/question-url';
import { createHistoryStore } from '@/lib/storage/history';
import { NativeBReview } from '@/app/review/NativeBReview';
import { cleanup,fireEvent,render,screen } from '@testing-library/react';
vi.mock('next/dynamic',()=>({default:()=>()=>null}));
vi.mock('next/navigation',()=>({useSearchParams:()=>new URLSearchParams(),usePathname:()=>'/quiz/stream',useRouter:()=>({push:vi.fn(),replace:vi.fn()}),notFound:()=>{throw Error('NOT_FOUND');},redirect:()=>{throw Error('REDIRECT');}}));
vi.mock('@/lib/posthog',()=>({posthogCapture:vi.fn()}));
function boundaryPool(n:unknown):unknown[]|undefined{if(Array.isArray(n)){for(const c of n){const p=boundaryPool(c);if(p)return p;}}if(n&&typeof n==='object'&&'props' in n){const p=(n as {props:{pool?:unknown[];children?:unknown}}).props;if(Array.isArray(p.pool))return p.pool;return boundaryPool(p.children);}return undefined;}
describe('aviation68 real entrypoint contract',()=>{
 for(const [name,page] of [['year',YearPage],['topic',TopicPage],['stream',StreamPage]] as const)it(`keeps aviation heading and navigation on ${name} for both subjects`,async()=>{
  for(const session of ['houki','kogaku']){const html=renderToStaticMarkup(await page({searchParams:Promise.resolve({exam:'aviation-comm',session})}));const heading=html.match(/<h1\b[^>]*>([\s\S]*?)<\/h1>/)?.[1]?.replace(/<[^>]*>/g,'');expect(heading).toContain('航空無線通信士');expect(heading).not.toContain('応用情報');expect(html).toContain('exam=aviation-comm');if(name!=='stream')expect(html).toContain('href="/aviation-comm"');}
 });
 it('retains aviation canonical metadata for year/topic',async()=>{for(const [mode,meta] of [['year',yearMetadata],['topic',topicMetadata]] as const){const v=await meta({searchParams:Promise.resolve({exam:'aviation-comm'})});expect(v.title).toContain('航空無線通信士');expect(v.alternates?.canonical).toBe(`/modes/${mode}?exam=aviation-comm`);}});
 it('passes the exact selected aviation subject originals to the stream client boundary',async()=>{for(const session of ['houki','kogaku']){const pool=boundaryPool(await StreamPage({searchParams:Promise.resolve({exam:'aviation-comm',session})})) as typeof qs;expect(pool).toBeDefined();expect(new Set(pool.map(q=>q.id))).toEqual(new Set(qs.filter(q=>q.session===session).map(q=>q.id)));}});
 it('renders both34-original annual paper pages with the aviation source label',async()=>{for(const month of ['february','august']){const html=renderToStaticMarkup(await PaperPage({params:Promise.resolve({exam:'aviation-comm',yearSeason:`2026-${month}`})}));expect(html).toContain('航空無線通信士');expect(html).toContain('34');expect(html).toContain('exam=aviation-comm');}});
 it('renders five independent inputs on an actual native B detail URL',async()=>{const q=qs.find(q=>q.nativeB)!;const [,,exam,yearSeason,section,qnum]=questionPagePath(q).split('/');const html=renderToStaticMarkup(await QuestionPage({params:Promise.resolve({exam:exam!,yearSeason:yearSeason!,section:section!,qnum:qnum!})}));expect(html).toContain('五つの空欄の回答');expect((html.match(/<select /g)??[]).length).toBe(5);expect(html).toContain('回答を採点する');});
 it('records one native original after partial grading and advances with its actual result',()=>{cleanup();localStorage.clear();const q=qs.find(q=>q.nativeB)!;const next=vi.fn();render(<NativeBReview question={q} onNext={next}/>);const inputs=screen.getAllByRole('combobox');q.nativeB!.slots.slice(0,4).forEach((s,i)=>fireEvent.change(inputs[i]!,{target:{value:s.answer}}));fireEvent.click(screen.getByRole('button',{name:'回答を採点する'}));expect(screen.getByRole('status').textContent).toContain('正答枠数 4/5');const history=createHistoryStore().getAllEntries();expect(history).toHaveLength(1);expect(history[0]!.id).toBe(q.id);expect(history[0]!.nativeBResult!.correctSlots).toBe(4);fireEvent.click(screen.getByRole('button',{name:'次の問題へ'}));expect(next).toHaveBeenCalledExactlyOnceWith(false);cleanup();});
});
