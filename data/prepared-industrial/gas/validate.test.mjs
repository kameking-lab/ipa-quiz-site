import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { createHash } from 'node:crypto';
import { validateHeldPackage, auditPreparedCandidates, questionIdentity } from './validate.mjs';

const raw = readFileSync(new URL('./manifest.json', import.meta.url));
const gate = JSON.parse(readFileSync(new URL('./gate.json', import.meta.url), 'utf8'));
const fixture = () => ({
  id: 'gas-kou-2026-law-q1', grade: 'kou', year: 2026, subject: 'law', qNumber: 1,
  question: 'Synthetic validator fixture only; no exam transcription.', explanation: 'Synthetic structural validation fixture.',
  choices: { 1: 'Fixture one', 2: 'Fixture two', 3: 'Fixture three', 4: 'Fixture four', 5: 'Fixture five' },
  choiceExplanations: { 1: 'Fixture reason one', 2: 'Fixture reason two', 3: 'Fixture reason three', 4: 'Fixture reason four', 5: 'Fixture reason five' },
  officialAnswerNumber: '1', needsReview: true, publicAllowed: false, hasImage: false,
  sourcePdfUrl: 'https://www.jia-page.or.jp/files/user/doc/exam/q_kou_R8.pdf',
  sourceAnswerUrl: 'https://www.jia-page.or.jp/files/user/doc/exam/a_kou_R8.pdf',
  sourceEvidence: { questionPdfSha256: 'a'.repeat(64), answerPdfSha256: 'b'.repeat(64), questionPage: 1 },
});
const rehash = manifest => {
  const bytes = Buffer.from(JSON.stringify(manifest));
  return [bytes, { ...gate, manifestSha256: createHash('sha256').update(bytes).digest('hex') }];
};

test('hash-bound manifest uses canonical LF bytes on every platform', () => {
  assert.equal(raw.includes(13), false);
});

test('six papers cover 348 original questions while the source-only gate remains closed', () => {
  const result = validateHeldPackage(raw, gate);
  assert.equal(result.remainingOriginalQuestions, 348);
  assert.equal(result.preparedOriginalQuestions, 0);
  assert.equal(result.publicOriginalQuestions, 0);
  assert.equal(result.publicAllowed, false);
  assert.equal(result.essayOriginalQuestionCount, null);
});
test('optional-answer quotas are not used as original-question totals', () => {
  const manifest = JSON.parse(raw);
  manifest.papers[0].expectedOriginalQuestions = 46;
  assert.throws(() => validateHeldPackage(...rehash(manifest)), /INCORRECT_PAPER_COMPLETION/);
});
test('content hash changes cannot silently alter the held manifest', () => {
  assert.throws(() => validateHeldPackage(Buffer.from('{}'), gate), /MANIFEST_HASH_MISMATCH/);
});
test('source-only preparation or release flags cannot be flipped', () => {
  for (const field of ['preparationAllowed', 'publicAllowed', 'runtimeRegistration']) {
    assert.throws(() => validateHeldPackage(raw, { ...gate, [field]: true }), /SOURCE_ONLY_GATE_CHANGED/);
  }
  assert.throws(() => validateHeldPackage(raw, { ...gate, rightsStatus: 'PASS' }), /SOURCE_ONLY_HOLD_CHANGED/);
});
test('source-only data rejects new draft bodies even with a recalculated hash', () => {
  const manifest = JSON.parse(raw);
  manifest.preparedQuestions.push(fixture());
  assert.throws(() => validateHeldPackage(...rehash(manifest)), /SOURCE_ONLY_CONTENT_INSERTED/);
});
test('duplicated or missing grade/year papers are rejected', () => {
  const manifest = JSON.parse(raw);
  manifest.papers[1] = manifest.papers[0];
  assert.throws(() => validateHeldPackage(...rehash(manifest)), /DUPLICATE_PAPER/);
});
test('a lost question identity is detected even after rehashing', () => {
  const manifest = JSON.parse(raw);
  manifest.papers[0].expectedQuestionIds.pop();
  assert.throws(() => validateHeldPackage(...rehash(manifest)), /MISSING_OR_DUPLICATE_QUESTION_IDENTITY/);
});
test('duplicated subjects, incorrect optional quotas, and wrong grade labels cannot pass', () => {
  let manifest = JSON.parse(raw);
  manifest.papers[0].subjects[1] = manifest.papers[0].subjects[0];
  assert.throws(() => validateHeldPackage(...rehash(manifest)), /INCORRECT_SUBJECT_COUNT/);
  manifest = JSON.parse(raw);
  manifest.subjects[1].requiredAnswers = 15;
  assert.throws(() => validateHeldPackage(...rehash(manifest)), /INCORRECT_SUBJECT_COUNT/);
  manifest = JSON.parse(raw);
  manifest.papers[0].gradeLabel = '乙種';
  assert.throws(() => validateHeldPackage(...rehash(manifest)), /PAPER_LABEL_MISMATCH/);
});
test('identity includes grade, year, subject and original question number', () => {
  const q = fixture();
  assert.notEqual(questionIdentity(q), questionIdentity({ ...q, subject: 'basic' }));
  assert.notEqual(questionIdentity(q), questionIdentity({ ...q, grade: 'otsu' }));
  assert.notEqual(questionIdentity(q), questionIdentity({ ...q, year: 2025 }));
  assert.throws(() => questionIdentity({ ...q, qNumber: 17 }), /INVALID_QUESTION_NUMBER/);
});
test('a structural candidate check does not claim substantive verification or publication', () => {
  const result = auditPreparedCandidates([fixture()]);
  assert.equal(result.candidateQuestions, 1);
  assert.equal(result.missingOriginalQuestions, 347);
  assert.equal(result.publicAllowed, false);
  assert.equal(result.semanticReview, 'NOT_PERFORMED_BY_STRUCTURAL_AUDIT');
});
test('duplicates in drafts and already present main/PR identities are rejected', () => {
  const q = fixture();
  assert.throws(() => auditPreparedCandidates([q, q]), /DUPLICATE_CANDIDATE_IDENTITY/);
  assert.throws(() => auditPreparedCandidates([q], [{ ...q, id: 'a-different-legacy-id' }]), /ALREADY_PRESENT_IN_MAIN_OR_PR/);
  assert.throws(() => auditPreparedCandidates([], [q, q]), /DUPLICATE_EXISTING_IDENTITY/);
});
test('all five choices and all five explanations must be present', () => {
  const q = fixture();
  delete q.choiceExplanations[5];
  assert.throws(() => auditPreparedCandidates([q]), /MISSING_ALL_CHOICE_EXPLANATIONS/);
});
test('sources must match the exact grade and sitting', () => {
  const q = fixture();
  q.sourcePdfUrl = q.sourcePdfUrl.replace('R8', 'R7');
  assert.throws(() => auditPreparedCandidates([q]), /SOURCE_SITTING_OR_GRADE_MISMATCH/);
});
test('image questions require preserved figures and matching alternative text', () => {
  const q = fixture();
  q.hasImage = true;
  q.imageUrls = ['/fixtures/gas-figure.png'];
  assert.throws(() => auditPreparedCandidates([q]), /MISSING_FIGURE_OR_ALT_TEXT/);
  q.imageAltTexts = ['Synthetic figure fixture'];
  assert.equal(auditPreparedCandidates([q]).candidateQuestions, 1);
});
test('an invented answer number, source hash, or unsupported sitting cannot pass', () => {
  assert.throws(() => auditPreparedCandidates([{ ...fixture(), officialAnswerNumber: '6' }]), /INVALID_OFFICIAL_ANSWER/);
  assert.throws(() => auditPreparedCandidates([{ ...fixture(), sourceEvidence: {} }]), /MISSING_SOURCE_EVIDENCE/);
  assert.throws(() => auditPreparedCandidates([{ ...fixture(), year: 2024 }]), /OUTSIDE_LATEST_TWO_GRADE_SCOPE/);
});
test('held gas data is not registered in the public question loader', () => {
  const index = readFileSync(new URL('../../questions/index.ts', import.meta.url), 'utf8');
  assert.doesNotMatch(index, /prepared-industrial|gas-(?:kou|otsu|hei)/);
});
