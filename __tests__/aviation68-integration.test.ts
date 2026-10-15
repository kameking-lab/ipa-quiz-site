import { describe,expect,it } from 'vitest';
import { existsSync, readFileSync } from 'node:fs';
import path from 'node:path';
import { execFileSync } from 'node:child_process';
import { AVIATION_COMM_QUESTIONS as questions } from '@/data/questions/aviation-comm';
import { ALL_QUESTIONS,QUESTIONS_BY_EXAM } from '@/data/questions';
import { RIKU_TECH1_QUESTIONS } from '@/data/questions/riku-tech1';
import { MARITIME4_QUESTIONS } from '@/data/questions/maritime4';
import { LAND_SPECIAL1_QUESTIONS } from '@/data/questions/land-special1';
import { getQuestionsForExam,getRegisteredExamCodes } from '@/lib/questions/get-questions';
import { isPracticeReadyQuestion,shuffleChoices } from '@/lib/questions/filter';
import { gradeNativeB,normalizeQuestionData } from '@/lib/questions/native-b';
import { questionPagePath,findQuestionByRoute,parseQuestionRoute } from '@/lib/seo/question-url';
import { choiceDisplayLabel,questionNumberLabel,usesNumberedChoices } from '@/lib/questions/display';
import { getQuestionsByExamStrict,groupByYearSeason } from '@/lib/seo/exam-meta';
import { getQualificationByExamCode } from '@/lib/qualifications/catalog';
import { EXAM_CONFIGS,ALL_EXAM_CODES } from '@/lib/exam-config';
import { defaultPracticeSession } from '@/lib/questions/practice-session';
import { GET as nextGET } from '@/app/api/questions/next/route';
import { GET as searchGET } from '@/app/api/search/questions/route';
import { POST as duePOST } from '@/app/api/review/due/route';
import { buildQuestionJsonLd } from '@/lib/seo/question-jsonld';
import { getHomeDirectory } from '@/lib/home/home-directory';
import { tsuginoScheduleUrl,tsuginoLearningUrl } from '@/lib/tsugino-qualification';
const exam='aviation-comm';

describe('aviation communication68 local registration candidate',()=>{
 it('registers exactly68 ready originals through eager/lazy/strict/home without changing the IPA-only list',async()=>{
  expect(questions).toHaveLength(68);expect(new Set(questions.map(q=>q.id)).size).toBe(68);
  expect(getRegisteredExamCodes()).toHaveLength(73);expect(getRegisteredExamCodes()).toContain(exam);expect(ALL_EXAM_CODES).not.toContain(exam);
  expect(await getQuestionsForExam(exam)).toEqual(questions);expect(QUESTIONS_BY_EXAM[exam]).toEqual(questions);expect(ALL_QUESTIONS.filter(q=>q.exam===exam)).toEqual(questions);expect(getQuestionsByExamStrict(exam)).toEqual(questions);expect(questions.every(isPracticeReadyQuestion)).toBe(true);
  const home=getHomeDirectory().flatMap(d=>[...d.featured,...d.compact]).find(q=>q.key===exam)!;expect(home.questionCount).toBe(68);expect(home.periodLabel).toBe('2期分');expect(home.href).toBe('/aviation-comm');
 });
 it('preserves four actual papers, original A/B numbering and the Japanese written-only scope',()=>{
  expect(EXAM_CONFIGS[exam].sessions.map(s=>s.expectedQuestions)).toEqual([14,20]);expect(defaultPracticeSession(exam)).toBe('houki');expect(groupByYearSeason(questions).map(g=>g.count)).toEqual([34,34]);
  for(const season of ['february','august'])for(const session of ['kogaku','houki']){
   const qs=questions.filter(q=>q.season===season&&q.session===session);expect(qs.length).toBe(session==='kogaku'?14:20);
   expect(qs.filter(q=>q.part==='a').map(q=>q.qNumber)).toEqual(Array.from({length:session==='kogaku'?10:14},(_,i)=>i+1));
   expect(qs.filter(q=>q.part==='b').map(q=>q.qNumber)).toEqual(Array.from({length:session==='kogaku'?4:6},(_,i)=>i+1));
  }
  const catalog=getQualificationByExamCode(exam)!;expect(catalog.status).toBe('live');expect(catalog.reuseSummary).toContain('英語の筆記・英会話・通信術は収録していません');expect(catalog.reuseSummary).toContain('無料で回数制限なく');expect(questions.every(q=>q.year===2026&&['february','august'].includes(q.season))).toBe(true);
 });
 it('keeps all68 canonical routes and all68 search hits including A/B parts distinct',async()=>{
  expect(new Set(questions.map(questionPagePath)).size).toBe(68);
  const hits=[];
  for(const offset of [0,60]){const res=await searchGET(new Request(`http://localhost/api/search/questions?exam=${exam}&limit=60&offset=${offset}`));expect(res.status).toBe(200);const data=await res.json();expect(data.total).toBe(68);hits.push(...data.hits);}
  expect(hits).toHaveLength(68);
  for(const hit of hits){const [,,ex,ys,section,qnum]=questionPagePath(hit).split('/');const p={exam:ex!,yearSeason:ys!,section:section!,qnum:qnum!};expect(parseQuestionRoute(p)).not.toBeNull();expect(findQuestionByRoute(questions,p)?.id).toBe(hit.id);expect(['a','b']).toContain(hit.part);}
  for(const season of ['february','august'])for(const session of ['kogaku','houki']){const res=await searchGET(new Request(`http://localhost/api/search/questions?exam=${exam}&season=${season}&session=${session}&limit=60`));expect(res.status).toBe(200);expect((await res.json()).total).toBe(session==='kogaku'?14:20);}
 });
 it('normalizes native20 originals and100 cells, retains candidate reuse and partial/empty grades',()=>{
  const native=questions.filter(q=>q.nativeB);expect(native).toHaveLength(20);expect(questions.filter(q=>q.type==='multiple-choice')).toHaveLength(48);expect(native.filter(q=>q.nativeB!.mode==='binary')).toHaveLength(8);expect(native.filter(q=>q.nativeB!.mode==='shared-bank')).toHaveLength(12);
  let perfect=0,partial=0;
  for(const q of native){const b=q.nativeB!;expect(q.answer).toBe('');expect(q.choices).toBeUndefined();expect(questionNumberLabel(q)).toBe(b.officialLabel);const selected=Object.fromEntries(b.slots.map(s=>[s.label,s.answer]));perfect+=gradeNativeB(b,selected).correctSlots;delete selected[b.slots[0]!.label];const grade=gradeNativeB(b,selected);expect(grade.slotResults[0]!.status).toBe('unanswered');partial+=grade.correctSlots;expect(gradeNativeB(b,{}).slotResults.every(s=>s.status==='unanswered')).toBe(true);const same=Object.fromEntries(b.slots.map(s=>[s.label,b.candidates[0]!.id]));expect(gradeNativeB(b,same).slotResults.every(s=>s.status!=='invalid')).toBe(true);}
  expect(perfect).toBe(100);expect(partial).toBe(80);expect(questions.reduce((n,q)=>n+(q.nativeB?.slots.length??1),0)).toBe(148);
 });
 it('serves every original without authentication and retains native20 due-review IDs',async()=>{
  for(const q of questions){const res=await nextGET(new Request(`http://localhost/api/questions/next?id=${q.id}&shuffle=1`));expect(res.status).toBe(200);expect(await res.json()).toEqual(q);}
  for(let n=0;n<3;n++){const res=await nextGET(new Request(`http://localhost/api/questions/next?id=${questions[0]!.id}`));expect(res.status).toBe(200);}
  const native=questions.filter(q=>q.nativeB);const res=await duePOST(new Request('http://localhost/api/review/due',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({exam,historyIds:native.map(q=>q.id),reviewStore:{},today:'2026-10-15'})}));expect(res.status).toBe(200);const data=await res.json();expect(data.questions).toHaveLength(20);expect(new Set(data.questions.map((q:{id:string})=>q.id))).toEqual(new Set(native.map(q=>q.id)));
 });
 it('keeps official numbered choice order, all68 crop assets and Nichimu attribution for the existing license alias',()=>{
  const assets=new Set<string>();
  for(const q of questions){expect(usesNumberedChoices(exam)).toBe(true);expect(choiceDisplayLabel(exam,'ア')).toBe('1');expect(shuffleChoices(q)).toBe(q);expect(q.needsReview).toBe(false);expect(q.imageUrls).toHaveLength(1);for(const u of q.imageUrls!){expect(existsSync(path.join(process.cwd(),'public',u.slice(1)))).toBe(true);assets.add(u);}const ld=buildQuestionJsonLd({question:q,pageUrlAbs:`https://www.kakomon-ai.jp${questionPagePath(q)}`,title:'航空無線通信士',lastUpdatedISO:'2026-10-15'})['@graph'][0] as {creator:{name:string};license:string};expect(ld.creator.name).toContain('日本無線協会');expect(ld.license).toBe('https://www.nichimu.or.jp/kshiken/siken/index.html');}
  expect(assets.size).toBe(68);
 });
 it('links the existing qualification calendar and learning hub without inventing an exam date',()=>{expect(tsuginoScheduleUrl(exam)).toBe('https://tsugino-shikaku.jp/shikaku/radio-koku');expect(tsuginoLearningUrl(exam)).toBe('https://tsugino-shikaku.jp/learn/radio-koku');});
 it('retains all338 old runtime records and raw source/core bytes against8fc',()=>{
  const player=readFileSync(path.join(process.cwd(),'components/quiz/QuizPlayer.tsx'),'utf8').replace(/\r\n/g,'\n');
  const policyImport='import { isOfficialPastOnlyExam } from "@/lib/questions/past-question-policy";\n';
  expect(player).toContain(policyImport);expect(player).toContain('!native && !isOfficialPastOnlyExam(question.exam) &&');
  const priorPlayer=player.replace(policyImport,'').replace('!native && !isOfficialPastOnlyExam(question.exam) &&','!native &&');
  expect(priorPlayer).toBe(execFileSync('git',['show','8fc06466:components/quiz/QuizPlayer.tsx'],{encoding:'utf8'}));
  const git=(...args:string[])=>execFileSync('git',['--no-optional-locks',...args],{encoding:'utf8',maxBuffer:20*1024*1024});
  const paths=git('ls-tree','-r','--name-only','8fc06466','data/questions/riku-tech1','data/questions/maritime4','data/questions/land-special1').trim().split(/\r?\n/).filter(p=>p.endsWith('.json'));
  const old=paths.flatMap(p=>JSON.parse(git('show',`8fc06466:${p}`))).map(normalizeQuestionData);const current=[...RIKU_TECH1_QUESTIONS,...MARITIME4_QUESTIONS,...LAND_SPECIAL1_QUESTIONS];
  const ordered=(q:typeof current)=>[...q].sort((a,b)=>a.id.localeCompare(b.id));expect(old).toHaveLength(338);expect(ordered(current)).toEqual(ordered(old));expect(git('diff','8fc06466','--','data/questions/riku-tech1','data/questions/maritime4','data/questions/land-special1','lib/questions/native-b.ts','components/quiz/NativeBAnswer.tsx','components/quiz/QuestionAnswerCard.tsx','components/quiz/stream/StreamQuizPlayer.tsx')).toBe('');
 });
});
