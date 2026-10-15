import { describe,it,expect } from 'vitest';
import { execFileSync } from 'node:child_process';
import { existsSync } from 'node:fs';
import path from 'node:path';
import { RIKU_TECH2_QUESTIONS as riku } from '@/data/questions/riku-tech2';
import { AMATEUR2_QUESTIONS as am2 } from '@/data/questions/amateur2';
import { MARITIME_RADAR_QUESTIONS as radar } from '@/data/questions/maritime-radar';
import { AMATEUR1_QUESTIONS as am } from '@/data/questions/amateur1';
import { MARITIME_SPECIAL1_QUESTIONS as sea } from '@/data/questions/maritime-special1';
import { AVIATION_COMM_QUESTIONS as avi } from '@/data/questions/aviation-comm';
import { getAllQuestions,getQuestionById } from '@/lib/questions/load';
import { getIndexableQuestions,getSitemapQuestions } from '@/lib/seo/sitemap-pagination';
import { getPoolIds,getExplicitPoolIds } from '@/lib/questions/pool-server';
import { QUESTIONS_BY_EXAM } from '@/data/questions';
import { getQuestionsForExam,getRegisteredExamCodes } from '@/lib/questions/get-questions';
import { isPracticeReadyQuestion,shuffleChoices } from '@/lib/questions/filter';
import { normalizeQuestionData,gradeNativeB } from '@/lib/questions/native-b';
import { questionPagePath,findQuestionByRoute } from '@/lib/seo/question-url';
import { getQuestionsByExamStrict,groupByYearSeason } from '@/lib/seo/exam-meta';
import { choiceDisplayLabel,usesNumberedChoices } from '@/lib/questions/display';
import { getHomeDirectory } from '@/lib/home/home-directory';
import { ALL_EXAM_CODES } from '@/lib/exam-config';
import { getQualificationByExamCode } from '@/lib/qualifications/catalog';
import { GET as nextGET } from '@/app/api/questions/next/route';
import { GET as searchGET } from '@/app/api/search/questions/route';
import { POST as duePOST } from '@/app/api/review/due/route';
const holds=new Set(['radio21-amateur1-2026-05-kogaku-q19','radio21-riku-tech2-2026-01-kogaku-b-q25','radio21-amateur2-2026-05-kogaku-q17']);
const all=[...avi,...am,...sea,...riku,...am2,...radar];
const cases=[{exam:'riku-tech2',qs:riku,stored:190,ready:189,periodCounts:[94,95],commit:'dc70a431',sessions:['houki','kiso','kogaku-a','kogaku-b']},{exam:'amateur2',qs:am2,stored:110,ready:109,periodCounts:[54,55],commit:'1a5b7c4b',sessions:['houki','kogaku']},{exam:'maritime-radar',qs:radar,stored:48,ready:48,periodCounts:[24,24],commit:'8bda096d',sessions:['houki','kogaku']}] as const;
describe('581-ready combined candidate integration',()=>{
 it('retains584 originals/581 ready, three exact HOLDs and1000 raw versus993 ready grading cells',()=>{expect(all).toHaveLength(584);expect(new Set(all.map(q=>q.id)).size).toBe(584);const ready=all.filter(isPracticeReadyQuestion);expect(ready).toHaveLength(581);expect(new Set(all.filter(q=>!isPracticeReadyQuestion(q)).map(q=>q.id))).toEqual(holds);expect(getRegisteredExamCodes()).toHaveLength(73);expect(all.reduce((n,q)=>n+(q.nativeB?.slots.length??1),0)).toBe(1000);expect(ready.reduce((n,q)=>n+(q.nativeB?.slots.length??1),0)).toBe(993);});
 for(const {exam,qs,stored,ready,periodCounts,commit} of cases){
  it(`${exam}: preserves exact normalized final data and every source asset`,async()=>{
   const git=(...a:string[])=>execFileSync('git',['--no-optional-locks',...a],{encoding:'utf8',maxBuffer:25*1024*1024});const paths=git('ls-tree','-r','--name-only',commit,`data/questions/${exam}`).trim().split(/\r?\n/).filter(p=>p.endsWith('.json'));const expected=paths.flatMap(p=>JSON.parse(git('show',`${commit}:${p}`))).map(normalizeQuestionData);expect(qs).toEqual(expected);expect(qs).toHaveLength(stored);expect(await getQuestionsForExam(exam)).toEqual(qs);expect(QUESTIONS_BY_EXAM[exam]).toEqual(qs.filter(isPracticeReadyQuestion));expect(ALL_EXAM_CODES).not.toContain(exam);expect(qs.every(q=>q.exam===exam&&q.year===2026)).toBe(true);
   for(const q of qs){expect(shuffleChoices(q)).toBe(q);expect(usesNumberedChoices(exam)).toBe(true);expect(choiceDisplayLabel(exam,'ア')).toBe('1');for(const url of [...(q.imageUrls??[]),...(q.nativeB?.bankImageUrls??[])])expect(existsSync(path.join(process.cwd(),'public',url.slice(1)))).toBe(true);}
  });
  it(`${exam}: shows only practice-ready totals and free past-paper scope`,()=>{expect(getQuestionsByExamStrict(exam)).toHaveLength(ready);expect(groupByYearSeason(getQuestionsByExamStrict(exam)).map(g=>g.count).sort((a,b)=>a-b)).toEqual(periodCounts);const home=getHomeDirectory().flatMap(d=>[...d.featured,...d.compact]).find(c=>c.key===exam)!;expect(home.questionCount).toBe(ready);expect(home.periodLabel).toBe('2期分');const catalog=getQualificationByExamCode(exam)!;expect(catalog.status).toBe('live');expect(catalog.reuseSummary).toContain('無料');expect(catalog.reuseSummary).toContain('回数制限なく');});
  it(`${exam}: retains source numbering and all ready search results without the HOLD`,async()=>{const readyQs=qs.filter(isPracticeReadyQuestion);expect(new Set(qs.map(questionPagePath)).size).toBe(stored);const hits:{id:string}[]=[];for(let offset=0;offset<ready;offset+=60){const res=await searchGET(new Request(`http://localhost/api/search/questions?exam=${exam}&limit=60&offset=${offset}`));expect(res.status).toBe(200);const data=await res.json();expect(data.total).toBe(ready);hits.push(...data.hits);}expect(new Set(hits.map(h=>h.id))).toEqual(new Set(readyQs.map(q=>q.id)));for(const q of qs){const [,,ex,ys,section,qnum]=questionPagePath(q).split('/');expect(findQuestionByRoute([...qs],{exam:ex!,yearSeason:ys!,section:section!,qnum:qnum!})?.id).toBe(q.id);}});
  it(`${exam}: public unauthenticated next API and due review preserve original IDs and protect HOLD`,async()=>{for(const q of qs){const res=await nextGET(new Request(`http://localhost/api/questions/next?id=${q.id}&shuffle=1`));if(holds.has(q.id)){expect(res.status).toBe(409);const body=await res.json();expect(body.error).toBe('content_under_review');expect(body.question).toBeUndefined();expect(body.choices).toBeUndefined();expect(body.nativeB).toBeUndefined();expect(res.headers.get('Cache-Control')).toBe('no-store');}else{expect(res.status).toBe(200);expect(await res.json()).toEqual(q);}}const res=await duePOST(new Request('http://localhost/api/review/due',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({exam,historyIds:qs.map(q=>q.id),reviewStore:{},today:'2026-10-15'})}));expect(res.status).toBe(200);const data=await res.json();expect(new Set(data.questions.map((q:{id:string})=>q.id))).toEqual(new Set(qs.filter(isPracticeReadyQuestion).map(q=>q.id)));});
 }
 it('excludes each of the three HOLDs from central load, ID lookup, sitemap, server pools and explicit history pools',async()=>{for(const id of holds){expect(getAllQuestions().some(q=>q.id===id)).toBe(false);expect(getQuestionById(id)).toBeUndefined();expect(getIndexableQuestions().some(q=>q.id===id)).toBe(false);expect(getSitemapQuestions().some(q=>q.id===id)).toBe(false);expect(await getExplicitPoolIds([id,avi[0]!.id].join(','))).toEqual([avi[0]!.id]);}for(const c of cases){expect(getSitemapQuestions().filter(q=>q.exam===c.exam)).toHaveLength(c.ready);for(const session of c.sessions){expect(new Set(await getPoolIds({exam:c.exam,session,mode:'random'}))).toEqual(new Set(c.qs.filter(q=>q.session===session&&isPracticeReadyQuestion(q)).map(q=>q.id)));}}});
 it('retains104 stored native originals and grades103 ready originals /515 slots with partial, empty and repeated candidates',()=>{const raw=all.filter(q=>q.nativeB);expect(raw).toHaveLength(104);expect(raw.reduce((n,q)=>n+q.nativeB!.slots.length,0)).toBe(520);const bs=raw.filter(isPracticeReadyQuestion);expect(bs).toHaveLength(103);let perfect=0,partial=0;for(const q of bs){const b=q.nativeB!;const a=Object.fromEntries(b.slots.map(s=>[s.label,s.answer]));perfect+=gradeNativeB(b,a).correctSlots;delete a[b.slots[0]!.label];partial+=gradeNativeB(b,a).correctSlots;expect(gradeNativeB(b,{}).slotResults.every(r=>r.status==='unanswered')).toBe(true);expect(gradeNativeB(b,Object.fromEntries(b.slots.map(s=>[s.label,b.candidates[0]!.id]))).slotResults.every(r=>r.status!=='invalid')).toBe(true);}expect(perfect).toBe(515);expect(partial).toBe(412);});
});
