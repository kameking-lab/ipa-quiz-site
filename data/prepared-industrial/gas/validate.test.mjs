import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';
import { questionIdentity, expectedIds, auditPreparedCandidates, auditNativeQuestions, auditEssays, validateProductionPackage } from './validate.mjs';

const folder = dirname(fileURLToPath(import.meta.url));
const root = resolve(folder, '../../..');
const json = p => JSON.parse(readFileSync(p, 'utf8'));
const clone = x => structuredClone(x);
const candidates = json(resolve(folder,'candidates.json'));
const answers = json(resolve(folder,'official-answers.json'));
const sources = json(resolve(folder,'official-sources.json'));
const native = json(resolve(root,'data/questions/gas/hei/ready.json'));
const essays = json(resolve(root,'data/questions/gas/essays.json'));
const raw = readFileSync(resolve(folder,'manifest.json'));
const gate = json(resolve(folder,'gate.json'));

test('scope counts all 348 offered originals and subjects reset their numbering', () => {
 assert.equal(expectedIds().length,348);
 assert.equal(new Set(expectedIds()).size,348);
 assert.notEqual(questionIdentity({grade:'hei',year:2026,subject:'law',qNumber:1}),questionIdentity({grade:'hei',year:2026,subject:'basic',qNumber:1}));
});
test('reject a 59th original or outside sitting', () => {
 assert.throws(()=>questionIdentity({grade:'hei',year:2026,subject:'technology',qNumber:28}),/INVALID_QUESTION_NUMBER/);
 assert.throws(()=>questionIdentity({grade:'hei',year:2024,subject:'law',qNumber:1}),/OUTSIDE_LATEST_TWO/);
});
test('current candidate full explanations pass without artificial minimum length',()=>assert.equal(auditPreparedCandidates(candidates).candidateQuestions,candidates.length));
test('duplicate original rejected independently from text similarity',()=>assert.throws(()=>auditPreparedCandidates([candidates[0],candidates[0]]),/DUPLICATE_CANDIDATE/));
test('original already in main/open PR is rejected',()=>assert.throws(()=>auditPreparedCandidates([candidates[0]],[candidates[0]]),/ALREADY_PRESENT/));
test('missing and empty fifth explanation rejected',()=>{
 const q=clone(candidates[0]); delete q.choiceExplanations['5'];
 assert.throws(()=>auditPreparedCandidates([q]),/MISSING_ALL_CHOICE/);
});
test('bare correctness label is not an explanation',()=>{
 const q=clone(candidates[0]); q.choiceExplanations['5']='誤りです。';
 assert.throws(()=>auditPreparedCandidates([q]),/CHOICE_REASON_MISSING/);
});
test('source cannot silently switch grade or year',()=>{
 const q=clone(candidates[0]); q.sourcePdfUrl=q.sourcePdfUrl.replace('_R8','_R7').replace('q_hei','q_kou');
 if(q.sourcePdfUrl===candidates[0].sourcePdfUrl)q.sourcePdfUrl='https://example.com/question.pdf';
 assert.throws(()=>auditPreparedCandidates([q]),/SOURCE_SITTING_OR_GRADE/);
});
test('candidate review state is retained separately from native registration',()=>{
 const q=clone(candidates[0]); q.needsReview=false;
 assert.throws(()=>auditPreparedCandidates([q]),/UNREVIEWED_CANDIDATE_RELEASE/);
});
test('native official answer must equal source ledger and answer letter',()=>{
 const q=clone(native[0]); q.answer=q.answer==='ア'?'イ':'ア';
 assert.throws(()=>auditNativeQuestions([q],answers,sources),/OFFICIAL_ANSWER_MISMATCH/);
});
test('native source hash and page are checked',()=>{
 const q=clone(native[0]); q.sourceEvidence.questionPage=999;
 assert.throws(()=>auditNativeQuestions([q],answers,sources),/NATIVE_SOURCE_PAGE_OUT_OF_RANGE/);
 q.sourceEvidence.questionPage=2; q.sourceEvidence.questionPdfSha256='a'.repeat(64);
 assert.throws(()=>auditNativeQuestions([q],answers,sources),/NATIVE_SOURCE_HASH_MISMATCH/);
});
test('missing figure blocks native registration',()=>{
 const q=clone(native[0]); q.hasImage=true;q.imageUrls=['/questions/gas/hei/missing.png'];q.imageAltTexts=['原典の図'];
 assert.throws(()=>auditNativeQuestions([q],answers,sources,()=>false),/NATIVE_FIGURE_MISSING/);
});
test('draft production does not imply provider permission or production deployment',()=>{
 assert.equal(validateProductionPackage(raw,gate).productionDeploymentPerformed,false);
 assert.throws(()=>validateProductionPackage(raw,{...gate,rightsPermissionEvidence:'assumed'}),/UNSUPPORTED_RIGHTS/);
 assert.throws(()=>validateProductionPackage(raw,{...gate,productionDeploymentPerformed:true}),/OUTSIDE_TASK_RELEASE/);
});
test('manifest hash is immutable evidence',()=>assert.throws(()=>validateProductionPackage(Buffer.concat([raw,Buffer.from(' ')]),gate),/MANIFEST_HASH/));
test('essays count 16 source originals and 24 grade occurrences',()=>assert.deepEqual(auditEssays(essays,sources),{sourcePaperOriginals:16,gradeOccurrences:24,officialAnswerPublished:false}));
test('independent essay answer cannot be labeled official',()=>{
 const q=clone(essays);q[0].officialAnswerPublished=true;
 assert.throws(()=>auditEssays(q,sources),/OFFICIAL_ANSWER_CLAIM/);
});
