import { describe,it,expect,vi } from 'vitest';
import { renderToStaticMarkup } from 'react-dom/server';
import YearPage,{generateMetadata as yearMetadata} from '@/app/modes/year/page';
import TopicPage,{generateMetadata as topicMetadata} from '@/app/modes/topic/page';
import StreamPage from '@/app/quiz/stream/page';
import PaperPage from '@/app/[exam]/[yearSeason]/page';
import HubPage from '@/app/[exam]/page';
import QuestionPage from '@/app/q/[exam]/[yearSeason]/[section]/[qnum]/page';
import { AMATEUR1_QUESTIONS as am } from '@/data/questions/amateur1';
import { MARITIME_SPECIAL1_QUESTIONS as sea } from '@/data/questions/maritime-special1';
import { isPracticeReadyQuestion } from '@/lib/questions/filter';
import { questionPagePath } from '@/lib/seo/question-url';
vi.mock('next/dynamic',()=>({default:()=>()=>null}));
vi.mock('next/navigation',()=>({useSearchParams:()=>new URLSearchParams(),usePathname:()=>'/quiz/stream',useRouter:()=>({push:vi.fn(),replace:vi.fn()}),notFound:()=>{throw Error('NOT_FOUND');},redirect:()=>{throw Error('REDIRECT');}}));
vi.mock('@/lib/posthog',()=>({posthogCapture:vi.fn()}));
function pool(n:unknown):unknown[]|undefined{if(Array.isArray(n)){for(const c of n){const p=pool(c);if(p)return p;}}if(n&&typeof n==='object'&&'props' in n){const p=(n as {props:{pool?:unknown[];children?:unknown}}).props;if(Array.isArray(p.pool))return p.pool;return pool(p.children);}return undefined;}
const cases=[{exam:'amateur1',name:'第一級アマチュア無線技士',qs:am,months:['may','august'],counts:[59,60]},{exam:'maritime-special1',name:'第一級海上特殊無線技士',qs:sea,months:['february','june'],counts:[24,24]}] as const;
describe('new two qualifications actual page consumers',()=>{
 for(const c of cases){
  for(const [name,page] of [['year',YearPage],['topic',TopicPage],['stream',StreamPage]] as const)it(`${c.exam}: real ${name} headings and selected pools never fall back to AP`,async()=>{for(const session of ['houki','kogaku']){const element=await page({searchParams:Promise.resolve({exam:c.exam,session})});const html=renderToStaticMarkup(element);const h=html.match(/<h1\b[^>]*>([\s\S]*?)<\/h1>/)?.[1]?.replace(/<[^>]*>/g,'');expect(h).toContain(c.name);expect(h).not.toContain('応用情報');expect(html).toContain(`exam=${c.exam}`);if(name==='stream')expect(new Set((pool(element) as typeof am).map(q=>q.id))).toEqual(new Set(c.qs.filter(q=>q.session===session&&isPracticeReadyQuestion(q)).map(q=>q.id)));}});
  it(`${c.exam}: hub, annual papers and metadata retain correct qualification and ready counts`,async()=>{const hub=renderToStaticMarkup(await HubPage({params:Promise.resolve({exam:c.exam})}));expect(hub).toContain(c.name);for(let i=0;i<2;i++){const html=renderToStaticMarkup(await PaperPage({params:Promise.resolve({exam:c.exam,yearSeason:`2026-${c.months[i]}`})}));expect(html).toContain(c.name);expect(html).toContain(String(c.counts[i]));}for(const [mode,fn] of [['year',yearMetadata],['topic',topicMetadata]] as const){const m=await fn({searchParams:Promise.resolve({exam:c.exam})});expect(m.title).toContain(c.name);expect(m.alternates?.canonical).toBe(`/modes/${mode}?exam=${c.exam}`);}});
  it(`${c.exam}: ready question detail renders actual original`,async()=>{const q=c.qs.find(q=>q.nativeB)??c.qs[0]!;const [,,exam,yearSeason,section,qnum]=questionPagePath(q).split('/');const html=renderToStaticMarkup(await QuestionPage({params:Promise.resolve({exam:exam!,yearSeason:yearSeason!,section:section!,qnum:qnum!})}));expect(html).toContain(c.name);if(q.nativeB)expect((html.match(/<select /g)??[]).length).toBe(5);});
 }
});
