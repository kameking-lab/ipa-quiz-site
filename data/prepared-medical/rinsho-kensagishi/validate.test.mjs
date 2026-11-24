import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { folder, loadPrepared, validateQuestions, validateImages, sha256 } from './validate.mjs';
import { isCompleteSelectionCorrect } from '../../../lib/questions/answers.ts';
const { questions, evidence } = loadPrepared();
const changed = fn => { const q = structuredClone(questions); const e = structuredClone(evidence); fn(q, e); return [q, e]; };
test('held drafts retain original text, all five reasons and official keys', () => assert.equal(validateQuestions(questions, evidence).originals, questions.length));
test('official diagrams are resolvable and byte-identical', () => validateImages(questions, evidence));
test('edited original wording fails the primary source binding', () => assert.throws(() => validateQuestions(...changed((q) => { q[0].choices.ア += '改変'; })), /CHOICE_MISMATCH/u));
test('altered source evidence fails SHA binding', () => assert.throws(() => validateQuestions(...changed((q,e) => { e.rows[0].rawOfficialQuestionTextBlock += '改変'; })), /SOURCE_HASH/u));
test('one missing wrong-choice reason fails coverage', () => assert.throws(() => validateQuestions(...changed((q) => { q[0].choiceExplanations.イ = ''; })), /MISSING_REASON/u));
test('duplicate ownership cannot create two copies of a question', () => assert.throws(() => validateQuestions(...changed((q) => { q.push(structuredClone(q[0])); })), /DUPLICATE_ID/u));
test('draft cannot release itself by flipping needsReview', () => assert.throws(() => validateQuestions(...changed((q) => { q[0].needsReview = false; })), /REVIEW_HOLD/u));
test('provider-stop tail cannot enter the new authoring scope', () => assert.throws(() => validateQuestions(...changed((q) => { q[0].year=2026;q[0].session='pm';q[0].qNumber=60;q[0].id='rinsho-kensagishi-2026-annual-pm-q60'; })), /PROVIDER_STOP_SCOPE/u));
test('71AM4 accepts either official answer separately and rejects simultaneous selection', () => {
  const q=questions.find(x=>x.id==='rinsho-kensagishi-2025-annual-am-q4');
  assert.equal(isCompleteSelectionCorrect(q.answer,['ア'],q.requiredSelections),true);
  assert.equal(isCompleteSelectionCorrect(q.answer,['エ'],q.requiredSelections),true);
  assert.equal(isCompleteSelectionCorrect(q.answer,['ア','エ'],q.requiredSelections),false);
  assert.equal(isCompleteSelectionCorrect(q.answer,['イ'],q.requiredSelections),false);
});
test('71AM44 and 63 require both official selections', () => {
  for(const n of [44,63]) {
    const q=questions.find(x=>x.id===`rinsho-kensagishi-2025-annual-am-q${n}`);
    assert.equal(isCompleteSelectionCorrect(q.answer,['エ','オ'],q.requiredSelections),true);
    assert.equal(isCompleteSelectionCorrect(q.answer,['エ'],q.requiredSelections),false);
    assert.equal(isCompleteSelectionCorrect(q.answer,['エ','エ'],q.requiredSelections),false);
  }
});
test('new files remain outside the runtime question index', () => {
  const index=readFileSync(resolve(folder,'../../questions/rinsho-kensagishi/index.ts'),'utf8');
  assert.ok(!index.includes('prepared-medical'));
  assert.equal(evidence.runtimeRegistrationAdded,false);
  assert.equal(evidence.publicGo,0);
});

test('71PM12 and 19 accept either permitted single answer, never both together', () => {
  for (const [number, valid] of [[12, ['エ','オ']], [19, ['イ','エ']]]) {
    const q = questions.find(x => x.id === `rinsho-kensagishi-2025-annual-pm-q${number}`);
    assert.equal(q.requiredSelections, 1);
    for (const choice of valid) assert.equal(isCompleteSelectionCorrect(q.answer, [choice], q.requiredSelections), true);
    assert.equal(isCompleteSelectionCorrect(q.answer, valid, q.requiredSelections), false);
    assert.equal(isCompleteSelectionCorrect(q.answer, ['ア'], q.requiredSelections), false);
  }
});
test('a relative figure path cannot escape its prepared figure directory', () => {
  const [q, e] = changed(q => { q.find(x => x.hasImage).imageUrls = ['./figures/../../outside.png']; });
  assert.throws(() => validateImages(q, e), /UNPROMOTED_IMAGE_PATH/u);
});

test('all five 72AM98 diagram choices depend on the unchanged official question image', () => {
  assert.throws(() => validateQuestions(...changed(q => {
    q.find(x => x.id === 'rinsho-kensagishi-2026-annual-am-q98').imageUrls = [];
  })), /MISSING_ORIGINAL_SYMBOL/u);
  assert.throws(() => validateQuestions(...changed(q => {
    q.find(x => x.id === 'rinsho-kensagishi-2026-annual-am-q98').choices.ア = '推測した記号';
  })), /MISSING_ORIGINAL_SYMBOL/u);
});

test('all prepared question files match their Git-normalized file hashes on Windows and Linux', () => {
  const prepared = loadPrepared();
  assert.equal(prepared.files.length, evidence.questionFiles.length);
  for (const file of evidence.questionFiles) {
    const target = resolve(folder, '../../..', file.path);
    const normalized = readFileSync(target, 'utf8').replace(/\r\n/gu, '\n');
    assert.equal(sha256(Buffer.from(normalized)), file.gitNormalizedSha256, `GIT_FILE_SHA ${file.path}`);
  }
});
