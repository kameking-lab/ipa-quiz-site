import { integrationOracle, runtimeFingerprint } from './fixtures/native-integration-oracle';
import { describe,it,expect } from 'vitest';
import { existsSync } from 'node:fs';
import path from 'node:path';
import { AMATEUR1_QUESTIONS as am } from '@/data/questions/amateur1';
import { MARITIME_SPECIAL1_QUESTIONS as sea } from '@/data/questions/maritime-special1';
import { AVIATION_COMM_QUESTIONS as avi } from '@/data/questions/aviation-comm';
import { getAllQuestions,getQuestionById } from '@/lib/questions/load';
import { getIndexableQuestions,getSitemapQuestions } from '@/lib/seo/sitemap-pagination';
import { getPoolIds,getExplicitPoolIds } from '@/lib/questions/pool-server';
import { QUESTIONS_BY_EXAM } from '@/data/questions';
import { getQuestionsForExam,getRegisteredExamCodes } from '@/lib/questions/get-questions';
import { isPracticeReadyQuestion,shuffleChoices } from '@/lib/questions/filter';
import { gradeNativeB } from '@/lib/questions/native-b';
import { questionPagePath,findQuestionByRoute } from '@/lib/seo/question-url';
import { getQuestionsByExamStrict,groupByYearSeason } from '@/lib/seo/exam-meta';
import { choiceDisplayLabel,usesNumberedChoices } from '@/lib/questions/display';
import { getHomeDirectory } from '@/lib/home/home-directory';
import { ALL_EXAM_CODES } from '@/lib/exam-config';
import { getQualificationByExamCode } from '@/lib/qualifications/catalog';
import { GET as nextGET } from '@/app/api/questions/next/route';
import { GET as searchGET } from '@/app/api/search/questions/route';
import { POST as duePOST } from '@/app/api/review/due/route';
const hold='radio21-amateur1-2026-05-kogaku-q19';
const cases=[{exam:'amateur1',qs:am,stored:120,ready:119,periodCounts:[59,60]},{exam:'maritime-special1',qs:sea,stored:48,ready:48,periodCounts:[24,24]}] as const;
describe('235-ready separated candidate integration',()=>{
 it('keeps236 stored originals,235 ready, one exact protected HOLD and67 registered exam codes',()=>{const all=[...avi,...am,...sea];expect(all).toHaveLength(236);expect(new Set(all.map(q=>q.id)).size).toBe(236);expect(all.filter(isPracticeReadyQuestion)).toHaveLength(235);expect(all.filter(q=>!isPracticeReadyQuestion(q)).map(q=>q.id)).toEqual([hold]);expect(getRegisteredExamCodes()).toHaveLength(76);});
 for(const {exam,qs,stored,ready,periodCounts} of cases){
  it(`${exam}: preserves exact normalized final data and every source asset`,async()=>{
   expect(runtimeFingerprint(qs)).toBe(integrationOracle.producers[exam].normalizedRuntimeSha256);expect(qs).toHaveLength(stored);expect(await getQuestionsForExam(exam)).toEqual(qs);expect(QUESTIONS_BY_EXAM[exam]).toEqual(qs.filter(isPracticeReadyQuestion));expect(ALL_EXAM_CODES).not.toContain(exam);expect(qs.every(q=>q.exam===exam&&q.year===2026)).toBe(true);
   for(const q of qs){expect(shuffleChoices(q)).toBe(q);expect(usesNumberedChoices(exam)).toBe(true);expect(choiceDisplayLabel(exam,'ア')).toBe('1');for(const url of [...(q.imageUrls??[]),...(q.nativeB?.bankImageUrls??[])])expect(existsSync(path.join(process.cwd(),'public',url.slice(1)))).toBe(true);}
  });
  it(`${exam}: shows only practice-ready totals and free past-paper scope`,()=>{expect(getQuestionsByExamStrict(exam)).toHaveLength(ready);expect(groupByYearSeason(getQuestionsByExamStrict(exam)).map(g=>g.count).sort((a,b)=>a-b)).toEqual(periodCounts);const home=getHomeDirectory().flatMap(d=>[...d.featured,...d.compact]).find(c=>c.key===exam)!;expect(home.questionCount).toBe(ready);expect(home.periodLabel).toBe('2期分');const catalog=getQualificationByExamCode(exam)!;expect(catalog.status).toBe('live');expect(catalog.reuseSummary).toContain('無料');expect(catalog.reuseSummary).toContain('回数制限なく');});
  it(`${exam}: retains source numbering and all ready search results without the HOLD`,async()=>{const readyQs=qs.filter(isPracticeReadyQuestion);expect(new Set(qs.map(questionPagePath)).size).toBe(stored);const hits:{id:string}[]=[];for(let offset=0;offset<ready;offset+=60){const res=await searchGET(new Request(`http://localhost/api/search/questions?exam=${exam}&limit=60&offset=${offset}`));expect(res.status).toBe(200);const data=await res.json();expect(data.total).toBe(ready);hits.push(...data.hits);}expect(new Set(hits.map(h=>h.id))).toEqual(new Set(readyQs.map(q=>q.id)));for(const q of qs){const [,,ex,ys,section,qnum]=questionPagePath(q).split('/');expect(findQuestionByRoute([...qs],{exam:ex!,yearSeason:ys!,section:section!,qnum:qnum!})?.id).toBe(q.id);}});
  it(`${exam}: public unauthenticated next API and due review preserve original IDs and protect HOLD`,async()=>{for(const q of qs){const res=await nextGET(new Request(`http://localhost/api/questions/next?id=${q.id}&shuffle=1`));if(q.id===hold){expect(res.status).toBe(409);expect((await res.json()).error).toBe('content_under_review');}else{expect(res.status).toBe(200);expect(await res.json()).toEqual(q);}}const res=await duePOST(new Request('http://localhost/api/review/due',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({exam,historyIds:qs.map(q=>q.id),reviewStore:{},today:'2026-10-15'})}));expect(res.status).toBe(200);const data=await res.json();expect(new Set(data.questions.map((q:{id:string})=>q.id))).toEqual(new Set(qs.filter(isPracticeReadyQuestion).map(q=>q.id)));});
 }
 it('excludes A19 from load, ID lookup, sitemap, server subject pools and explicit history pool',async()=>{expect(getAllQuestions().some(q=>q.id===hold)).toBe(false);expect(getQuestionById(hold)).toBeUndefined();expect(getIndexableQuestions().some(q=>q.id===hold)).toBe(false);expect(getSitemapQuestions().some(q=>q.id===hold)).toBe(false);expect(getSitemapQuestions().filter(q=>q.exam==='amateur1')).toHaveLength(119);expect(await getExplicitPoolIds([hold,am[0]!.id].join(','))).toEqual([am[0]!.id]);for(const session of ['houki','kogaku'] as const){expect(new Set(await getPoolIds({exam:'amateur1',session,mode:'random'}))).toEqual(new Set(am.filter(q=>q.session===session&&isPracticeReadyQuestion(q)).map(q=>q.id)));}});
 it('retains all22 amateur native originals and110 cells with perfect/partial/empty/repeated candidate semantics',()=>{const bs=am.filter(q=>q.nativeB);expect(bs).toHaveLength(22);let perfect=0,partial=0;for(const q of bs){const b=q.nativeB!;const a=Object.fromEntries(b.slots.map(s=>[s.label,s.answer]));perfect+=gradeNativeB(b,a).correctSlots;delete a[b.slots[0]!.label];partial+=gradeNativeB(b,a).correctSlots;expect(gradeNativeB(b,{}).slotResults.every(r=>r.status==='unanswered')).toBe(true);expect(gradeNativeB(b,Object.fromEntries(b.slots.map(s=>[s.label,b.candidates[0]!.id]))).slotResults.every(r=>r.status!=='invalid')).toBe(true);}expect(perfect).toBe(110);expect(partial).toBe(88);expect(sea.every(q=>q.type==='multiple-choice')).toBe(true);});
});
