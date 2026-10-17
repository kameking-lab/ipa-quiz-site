import { describe,expect,it } from 'vitest';
import { existsSync } from 'node:fs';
import path from 'node:path';
import { ALL_QUESTIONS,QUESTIONS_BY_EXAM } from '@/data/questions';
import { MARITIME3_QUESTIONS } from '@/data/questions/maritime3';
import { LAND_SPECIAL2_QUESTIONS } from '@/data/questions/land-special2';
import { LAND_SPECIAL3_QUESTIONS } from '@/data/questions/land-special3';
import { getQuestionsForExam,getRegisteredExamCodes } from '@/lib/questions/get-questions';
import { EXAM_CONFIGS,ALL_EXAM_CODES } from '@/lib/exam-config';
import { getQuestionsByExamStrict } from '@/lib/seo/exam-meta';
import { isPracticeReadyQuestion,shuffleChoices } from '@/lib/questions/filter';
import { usesNumberedChoices,choiceDisplayLabel,questionNumberLabel } from '@/lib/questions/display';
import { defaultPracticeSession } from '@/lib/questions/practice-session';
import { questionPagePath,findQuestionByRoute,parseQuestionRoute } from '@/lib/seo/question-url';
import { gradeNativeB } from '@/lib/questions/native-b';
import { getQualificationByExamCode } from '@/lib/qualifications/catalog';
import { formatYearSeason } from '@/lib/utils';
import { questionSourceEdition } from '@/lib/questions/source-label';
import { GET as searchGET } from '@/app/api/search/questions/route';
import { searchQuestions } from '@/lib/search/question-index';
import { buildQuestionJsonLd } from '@/lib/seo/question-jsonld';

const pools={maritime3:MARITIME3_QUESTIONS,'land-special2':LAND_SPECIAL2_QUESTIONS,'land-special3':LAND_SPECIAL3_QUESTIONS} as const;
const all=Object.values(pools).flat();
describe('separate next166 local candidate integration',()=>{
 it('connects exactly166 original accepted questions through all current loaders and strict practice pools',async()=>{
  expect(all).toHaveLength(166);expect(new Set(all.map(q=>q.id)).size).toBe(166);expect(getRegisteredExamCodes()).toHaveLength(75);
  for(const [exam,qs] of Object.entries(pools)){
   const code=exam as keyof typeof pools;expect(await getQuestionsForExam(code)).toEqual(qs);expect(QUESTIONS_BY_EXAM[code]).toEqual(qs);expect(getQuestionsByExamStrict(code)).toEqual(qs);expect(ALL_QUESTIONS.filter(q=>q.exam===code)).toEqual(qs);expect(qs.every(isPracticeReadyQuestion)).toBe(true);expect(ALL_EXAM_CODES).not.toContain(code);expect(getQualificationByExamCode(code)?.status).toBe('live');expect(defaultPracticeSession(code)).toBe('houki');
  }
 });
 it('preserves the actual12 papers, original numbering and historical scope',()=>{
  for(const exam of ['land-special2','land-special3'] as const){
   expect(EXAM_CONFIGS[exam].sessions.map(s=>s.expectedQuestions)).toEqual([12,12]);
   for(const [year,season] of [[2021,'october'],[2022,'february']] as const)for(const session of ['houki','kogaku']){
    const qs=pools[exam].filter(q=>q.year===year&&q.season===season&&q.session===session);expect(qs).toHaveLength(12);expect(qs.map(q=>q.qNumber)).toEqual(Array.from({length:12},(_,i)=>i+(session==='houki'?1:13)));expect(qs.every(q=>q.part===undefined)).toBe(true);
   }
   expect(getQualificationByExamCode(exam)?.reuseSummary).toContain('歴史筆記2回');expect(getQualificationByExamCode(exam)?.reuseSummary).toContain('現在のCBT例題は含みません');
  }
  expect(EXAM_CONFIGS.maritime3.sessions.map(s=>s.expectedQuestions)).toEqual([15,20]);
  for(const season of ['march','september']){
   expect(MARITIME3_QUESTIONS.filter(q=>q.season===season)).toHaveLength(35);
   expect(MARITIME3_QUESTIONS.filter(q=>q.season===season&&q.session==='houki')).toHaveLength(20);expect(MARITIME3_QUESTIONS.filter(q=>q.season===season&&q.session==='kogaku')).toHaveLength(15);
  }
  expect(getQualificationByExamCode('maritime3')?.reuseSummary).toContain('英語の筆記・会話と通信術は含みません');
 });
 it('keeps every canonical route including march and A/B part collisions distinct',async()=>{
  expect(new Set(all.map(questionPagePath)).size).toBe(166);
  for(const q of all){const [,,,yearSeason,section,qnum]=questionPagePath(q).split('/');const p={exam:q.exam,yearSeason:yearSeason!,section:section!,qnum:qnum!};expect(parseQuestionRoute(p)).not.toBeNull();expect(findQuestionByRoute(all,p)?.id).toBe(q.id);}
  expect(questionPagePath(MARITIME3_QUESTIONS.find(q=>q.part==='a')!)).toContain('q1a');expect(questionPagePath(MARITIME3_QUESTIONS.find(q=>q.part==='b')!)).toContain('q1b');expect(formatYearSeason(2026,'march')).toBe('2026年3月試験');expect(questionSourceEdition(MARITIME3_QUESTIONS.find(q=>q.season==='march')!)).toBe('2026年3月試験');
  const response=await searchGET(new Request('http://localhost/api/search/questions?exam=maritime3&season=march&limit=50'));
  expect(response.status).toBe(200);const body=await response.json();expect(body.total).toBe(35);expect(body.hits.every((h:{part?:string})=>h.part==='a'||h.part==='b')).toBe(true);
  const search=await searchQuestions({exam:'land-special2',limit:100});expect(search.total).toBe(48);
 });
 it('uses the existing five-slot grader for18 originals and90 cells without flattening or uniqueness restrictions',()=>{
  const native=all.filter(q=>q.nativeB);expect(native).toHaveLength(18);expect(all.filter(q=>q.type==='multiple-choice')).toHaveLength(148);let slots=0;let repeats=0;
  for(const q of native){const b=q.nativeB!;slots+=b.slots.length;expect(q.answer).toBe('');expect(q.choices).toBeUndefined();expect(questionNumberLabel(q)).toBe(b.officialLabel);const selected=Object.fromEntries(b.slots.map(s=>[s.label,s.answer]));expect(gradeNativeB(b,selected).correctSlots).toBe(5);delete selected[b.slots[0]!.label];expect(gradeNativeB(b,selected).correctSlots).toBe(4);selected[b.slots[0]!.label]='invalid';expect(gradeNativeB(b,selected).isCorrect).toBe(false);if(new Set(b.slots.map(s=>s.answer)).size<5)repeats++;}
  expect(slots).toBe(90);expect(repeats).toBeGreaterThan(0);
 });
 it('keeps numbered choices and original ordering, all82 assets and Nichimu authorship',()=>{
  const assets=new Set<string>();
  for(const q of all){expect(usesNumberedChoices(q.exam)).toBe(true);expect(choiceDisplayLabel(q.exam,'ア')).toBe('1');expect(shuffleChoices(q)).toBe(q);expect(['NICHIMU-educational-reuse','NICHIMU-past-question-study-use']).toContain(q.license);for(const url of [...q.imageUrls??[],...q.nativeB?.bankImageUrls??[]]){expect(existsSync(path.join(process.cwd(),'public',url.slice(1)))).toBe(true);assets.add(url);}const ld=buildQuestionJsonLd({question:q,pageUrlAbs:`https://www.kakomon-ai.jp${questionPagePath(q)}`,title:'候補',lastUpdatedISO:'2026-10-15'})['@graph'][0] as {creator:{name:string}};expect(ld.creator.name).toContain('日本無線協会');}
  expect(assets.size).toBe(82);
 });
});
