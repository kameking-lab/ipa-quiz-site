import { createHash } from 'node:crypto';
import { existsSync, readFileSync, readdirSync } from 'node:fs';
import { resolve, sep } from 'node:path';
import { engineerNumbering } from './lq4e-numbering.mjs';
import { checkReviewEvidence } from './lq4e-review-evidence.mjs';

// Engineer-only receipt: LQ4D owns building hygiene and the LQ4C receipt.
const root = resolve(import.meta.dirname, '..');
const hash = value => createHash('sha256').update(value).digest('hex');
const failures = [];
const check = (condition, message) => { if (!condition) failures.push(message); };
const safePath = value => {
  if (typeof value !== 'string') return null;
  const path = resolve(root, value);
  return path.startsWith(root + sep) ? path : null;
};
const bytes = value => readFileSync(resolve(root, value));
const json = value => JSON.parse(bytes(value).toString('utf8'));
const dir = 'data/qualification-staging/lq4e-engineer-first';
const receiptPath = 'reports/lq4e-20261104/acceptance.json';
const inventory = json('reports/lq4b-20261104/source-inventory.json').filter(s => s.qualification === 'gijutsushi1-kikai');
const official = json('reports/lq4b-20261104/official-answer-index.json').records.filter(s => s.qualification === 'gijutsushi1-kikai');
const key = (year, subject, number) => `${year}/${subject}/${number}`;
const index = new Map(official.map(q => [key(q.year, q.subject, q.printedNumber), q]));
const semantic = data => data.questions.map(q => Object.fromEntries(Object.entries(q).filter(([k]) => !['needsIndependentReview', 'publicGo', 'contentReview'].includes(k))));
const receipt = existsSync(resolve(root, receiptPath)) ? json(receiptPath) : null;
const batches = receipt?.batches ?? [];
check(new Set(batches.map(b => b.path)).size === batches.length, 'duplicate receipt batch');
const seen = new Set();
for (const oldDir of ['lq4b-engineer-first', 'lq4c-engineer-first']) {
  for (const file of readdirSync(resolve(root, 'data/qualification-staging', oldDir)).filter(f => f.endsWith('.json'))) {
    for (const q of json(`data/qualification-staging/${oldDir}/${file}`).questions) {
      check(q.contentReview?.status === 'PASS', `${q.id}: baseline not accepted`);
      check(!seen.has(q.id), `${q.id}: duplicate baseline`); seen.add(q.id);
    }
  }
}
const baseline = seen.size;
check(baseline === 30 && official.length === 160, 'baseline or official total changed');
let originals = 0, accepted = 0, figures = 0;
const byYearSubject = {};
for (const file of readdirSync(resolve(root, dir)).filter(f => f.endsWith('.json')).sort()) {
  const path = `${dir}/${file}`;
  const data = json(path), batch = batches.find(b => b.path === path);
  check(data.qualification === 'gijutsushi1-kikai' && [2024, 2025].includes(data.year) && ['basis', 'mechanical'].includes(data.subject), `${path}: wrong scope`);
  check(data.expectedFullQualificationCount === 160, `${path}: expected total mismatch`);
  check(Array.isArray(data.questions) && data.questions.length > 0, `${path}: empty batch`);
  if (batch) {
    check(batch.status === 'PASS' && batch.model === 'gpt-6-astra', `${path}: invalid acceptance`);
    check(batch.sha256 === hash(bytes(path)), `${path}: accepted manuscript changed`);
    check(batch.semanticSha256 === hash(JSON.stringify(semantic(data))), `${path}: semantic hash mismatch`);
    check(batch.originals === data.questions.length && JSON.stringify(batch.questionIds) === JSON.stringify(data.questions.map(q => q.id)), `${path}: accepted set mismatch`);
    const snapshot = safePath(batch.reviewedSnapshot), report = safePath(batch.report);
    check(snapshot && existsSync(snapshot), `${path}: missing reviewed snapshot`);
    if (snapshot && existsSync(snapshot)) {
      const snapshotBytes = readFileSync(snapshot), reviewed = JSON.parse(snapshotBytes.toString('utf8'));
      check(hash(snapshotBytes) === batch.reviewedFileSha256, `${path}: reviewed snapshot hash mismatch`);
      check(JSON.stringify(semantic(data)) === JSON.stringify(semantic(reviewed)), `${path}: differs from reviewed snapshot`);
      for (const field of ['qualification', 'year', 'subject', 'expectedFullQualificationCount']) check(data[field] === reviewed[field], `${path}: reviewed envelope changed`);
    }
    check(report && existsSync(report), `${path}: missing review report`);
    if (report && existsSync(report)) {
      check(hash(readFileSync(report)) === batch.reportSha256, `${path}: review report changed`);
      check(/^\s*(?:\*\*)?PASS\b/.test(readFileSync(report, 'utf8')), `${path}: report does not start with PASS`);
      check(readFileSync(report,'utf8').includes(batch.reviewedFileSha256), `${path}: report does not attest reviewed snapshot`);
    }
    for (const failure of checkReviewEvidence(root,batch.execution, batch.report)) check(false, `${path}: ${failure}`);
    const executionFile=safePath(batch.execution);
    if (executionFile && existsSync(executionFile)) check(hash(readFileSync(executionFile))===batch.executionSha256, `${path}: execution evidence changed`);
    check(data.status === 'PARTIAL_CONTENT_ACCEPTED_NOT_REGISTERED', `${path}: wrong accepted status`);
  } else check(data.status === 'DRAFT_PENDING_INDEPENDENT_REVIEW', `${path}: unreviewed status`);
  for (const q of data.questions) {
    originals++;
    const numberSpec = engineerNumbering(data.subject, q.questionNumber);
    check(Number.isInteger(q.questionNumber) && q.questionNumber > 0, `${q.id}: invalid number`);
    check(numberSpec && q.printedNumber === numberSpec.printed, `${q.id}: subject printed number mismatch`);
    check(numberSpec && q.id === `gijutsushi1-kikai-${data.year}-${data.subject}-${numberSpec.idSuffix}`, `${q.id}: id mismatch`);
    check(!seen.has(q.id), `${q.id}: duplicate original`); seen.add(q.id);
    const answer = index.get(key(data.year, data.subject, numberSpec?.official));
    check(Boolean(answer), `${q.id}: no official original`);
    if (answer) {
      check(q.officialAnswer === answer.officialAnswer && q.scoringException === answer.scoringException, `${q.id}: official answer/scoring exception mismatch`);
      if (answer.scoringException) check(q.officialAnswer === null && q.scoringException === 'selected-question-full-credit', `${q.id}: exception must not have a normal answer`);
      else check(Number.isInteger(q.officialAnswer) && q.officialAnswer >= 1 && q.officialAnswer <= 5, `${q.id}: invalid normal answer`);
      check(q.sourceAnswerUrl === answer.sourceAnswerUrl && q.sourceAnswerPage === answer.answerPage && q.sourceAnswerSha256 === answer.sourceSha256, `${q.id}: answer provenance mismatch`);
    }
    const source = inventory.find(s => s.year === data.year && s.kind === data.subject);
    check(Boolean(source), `${q.id}: question source missing`);
    if (source) check(q.sourceQuestionUrl === source.url && q.sourceQuestionSha256 === source.sha256 && Number.isInteger(q.sourceQuestionPage) && q.sourceQuestionPage >= 1 && q.sourceQuestionPage <= source.pages, `${q.id}: question provenance mismatch`);
    for (const field of ['choices', 'choiceExplanations']) check(JSON.stringify(Object.keys(q[field] ?? {}).sort()) === JSON.stringify(['1','2','3','4','5']), `${q.id}: incomplete ${field}`);
    const texts = [q.questionText, q.explanation, q.sourceAttribution, q.transcription, ...Object.values(q.choices ?? {}), ...Object.values(q.choiceExplanations ?? {})];
    check(texts.every(t => typeof t === 'string' && t.trim().length > 0 && !/\?{2,}|\uFFFD/.test(t)), `${q.id}: missing text/encoding corruption`);
    check(q.publicGo === false, `${q.id}: staging must remain unpublished`);
    check(typeof q.hasRequiredFigure === 'boolean', `${q.id}: figure decision missing`);
    if (q.hasRequiredFigure) check(Array.isArray(q.figures) && q.figures.length > 0, `${q.id}: required figure missing`);
    for (const f of q.figures ?? []) {
      figures++;
      const asset = safePath(f.path);
      check(asset && existsSync(asset), `${q.id}: figure asset missing`);
      if (asset && existsSync(asset)) check(hash(readFileSync(asset)) === f.sha256, `${q.id}: figure hash mismatch`);
      check(typeof f.alt === 'string' && f.alt.trim().length > 0 && f.sourceQuestionPage === q.sourceQuestionPage, `${q.id}: figure provenance missing`);
      const c = f.sourceClipPdfPoints;
      check(Array.isArray(c) && c.length === 4 && c.every(Number.isFinite) && c[0] >= 0 && c[1] >= 0 && c[2] > c[0] && c[3] > c[1] && Number.isInteger(f.renderDpi) && f.renderDpi >= 160, `${q.id}: invalid figure clip`);
    }
    if (batch) {
      accepted++;
      check(q.needsIndependentReview === false && q.contentReview?.status === 'PASS' && q.contentReview.model === 'gpt-6-astra' && q.contentReview.report === batch.report, `${q.id}: review metadata mismatch`);
    } else check(q.needsIndependentReview === true, `${q.id}: draft marked accepted`);
    if (process.argv.includes('--require-reviewed')) check(Boolean(batch), `${q.id}: independent review pending`);
    const group = `${data.year}/${data.subject}`;
    byYearSubject[group] ??= { originals: 0, accepted: 0 };
    byYearSubject[group].originals++;
    if (batch) byYearSubject[group].accepted++;
  }
}
for (const b of batches) check(b.path.startsWith(dir + '/') && existsSync(resolve(root, b.path)), `${b.path}: accepted file missing or outside scope`);
if (receipt) {
  check(receipt.status === 'PARTIAL_CONTENT_ACCEPTED_NOT_REGISTERED' && receipt.qualification === 'gijutsushi1-kikai', 'receipt must remain partial and engineer-only');
  check(receipt.baselineAccepted === baseline && receipt.expected === 160 && receipt.newAccepted === accepted && receipt.accepted === baseline + accepted && receipt.remaining === 160 - baseline - accepted, 'receipt totals mismatch');
}
if (process.argv.includes('--sources')) for (const s of inventory) {
  check(existsSync(s.path), `${s.kind}/${s.year}: saved source missing`);
  if (existsSync(s.path)) check(hash(readFileSync(s.path)) === s.sha256, `${s.kind}/${s.year}: saved source hash mismatch`);
}
console.log(JSON.stringify({ status: failures.length ? 'FAIL' : 'PASS', scope: 'gijutsushi1-kikai', baselineAccepted: baseline, originals, accepted, figures, totalAccepted: baseline + accepted, expected:160, remaining:160 - baseline - accepted, byYearSubject, failures }, null, 2));
if (failures.length) process.exitCode = 1;
