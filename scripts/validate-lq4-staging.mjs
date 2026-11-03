import { createHash } from 'node:crypto';
import { existsSync, readFileSync, readdirSync } from 'node:fs';
import { resolve, relative } from 'node:path';

// Staging is deliberately separate from public question loaders. This check binds
// accepted content to the exact reviewed bytes and the frozen official sources.
const root = resolve(import.meta.dirname, '..');
const json = p => JSON.parse(readFileSync(resolve(root, p), 'utf8'));
const sha = v => createHash('sha256').update(v).digest('hex');
const sourceInventory = json('reports/lq4b-20261104/source-inventory.json');
const official = json('reports/lq4b-20261104/official-answer-index.json').records;
const key = (qualification, year, subject, number) => `${qualification}/${year}/${subject}/${number}`;
const index = new Map(official.map(r => [key(r.qualification, r.year, r.subject, r.printedNumber), r]));
const requireReviewed = process.argv.includes('--require-reviewed');
const verifySources = process.argv.includes('--sources');
const failures = [];
const check = (condition, message) => { if (!condition) failures.push(message); };
const dirs = ['lq4b-engineer-first', 'lq4c-engineer-first', 'lq4c-biru-kan'];
const receipt = existsSync(resolve(root, 'reports/lq4c-20261104/acceptance.json'))
  ? json('reports/lq4c-20261104/acceptance.json') : null;
const manifests = receipt?.batches ?? [];
const semanticQuestions = data => data.questions.map(q => Object.fromEntries(Object.entries(q).filter(([k]) => !['needsIndependentReview', 'publicGo', 'contentReview'].includes(k))));
check(new Set(manifests.map(b => b.path)).size === manifests.length, 'duplicate acceptance batch');
const seen = new Set();
let count = 0, accepted = 0, newCount = 0, newAccepted = 0, baselineAccepted = 0;
const byQualification = {};
for (const dir of dirs) {
  const full = resolve(root, 'data/qualification-staging', dir);
  if (!existsSync(full)) continue;
  for (const file of readdirSync(full).filter(f => f.endsWith('.json')).sort()) {
    const path = relative(root, resolve(full, file)).replaceAll('\\', '/');
    const bytes = readFileSync(resolve(root, path));
    const data = JSON.parse(bytes.toString('utf8'));
    check(Array.isArray(data.questions) && data.questions.length > 0, `${path}: empty questions`);
    const isNew = dir.startsWith('lq4c-');
    const batch = manifests.find(b => b.path === path);
    if (batch) {
      check(batch.status === 'PASS' && batch.model === 'gpt-6-astra', `${path}: invalid acceptance`);
      check(batch.sha256 === sha(bytes), `${path}: accepted file changed since review`);
      check(data.status === 'PARTIAL_CONTENT_ACCEPTED_NOT_REGISTERED', `${path}: accepted status missing`);
      check(batch.originals === data.questions.length && JSON.stringify(batch.questionIds) === JSON.stringify(data.questions.map(q => q.id)), `${path}: accepted original set mismatch`);
      const semantic = semanticQuestions(data);
      check(batch.semanticSha256 === sha(JSON.stringify(semantic)), `${path}: reviewed semantic content changed`);
      check(/^[a-f0-9]{64}$/.test(batch.reviewedFileSha256 ?? ''), `${path}: reviewed snapshot hash missing`);
      const snapshot = batch.reviewedSnapshot && resolve(root, batch.reviewedSnapshot);
      check(Boolean(snapshot && existsSync(snapshot)), `${path}: reviewed snapshot missing`);
      if (snapshot && existsSync(snapshot)) {
        const reviewedBytes = readFileSync(snapshot);
        check(sha(reviewedBytes) === batch.reviewedFileSha256, `${path}: reviewed snapshot hash mismatch`);
        const reviewed = JSON.parse(reviewedBytes.toString('utf8'));
        check(JSON.stringify(semanticQuestions(reviewed)) === JSON.stringify(semantic), `${path}: content differs from reviewed snapshot`);
        for (const field of ['qualification', 'year', 'subject', 'expectedFullQualificationCount']) check(reviewed[field] === data[field], `${path}: reviewed envelope differs`);
      }
      const reportPath = resolve(root, batch.report);
      check(existsSync(reportPath), `${path}: missing review evidence`);
      if (existsSync(reportPath)) check(batch.reportSha256 === sha(readFileSync(reportPath)), `${path}: review evidence changed`);
    }
    for (const q of data.questions) {
      count++;
      if (isNew) newCount++;
      check(!seen.has(q.id), `${q.id}: duplicate original`); seen.add(q.id);
      check(q.publicGo === false, `${q.id}: staging must stay unpublished`);
      check(Number.isInteger(q.questionNumber) && q.questionNumber > 0, `${q.id}: invalid number`);
      check(q.printedNumber === (data.qualification === 'biru-kan' ? String(q.questionNumber) : `Ⅱ－${q.questionNumber}`), `${q.id}: printed number mismatch`);
      const subject = data.qualification === 'biru-kan' ? 'all' : data.subject;
      const num = data.qualification === 'biru-kan' ? String(q.questionNumber) : `II-${q.questionNumber}`;
      const answer = index.get(key(data.qualification, data.year, subject, num));
      check(Boolean(answer), `${q.id}: no official original`);
      if (answer) {
        check(q.officialAnswer === answer.officialAnswer, `${q.id}: official answer mismatch`);
        check(q.sourceAnswerSha256 === answer.sourceSha256 && q.sourceAnswerUrl === answer.sourceAnswerUrl && q.sourceAnswerPage === answer.answerPage, `${q.id}: answer source mismatch`);
      }
      const source = sourceInventory.find(s => s.qualification === data.qualification && s.year === data.year && s.kind === data.subject);
      check(Boolean(source), `${q.id}: missing question PDF`);
      if (source) {
        check(q.sourceQuestionUrl === source.url && q.sourceQuestionSha256 === source.sha256, `${q.id}: question source mismatch`);
        check(Number.isInteger(q.sourceQuestionPage) && q.sourceQuestionPage >= 1 && q.sourceQuestionPage <= source.pages, `${q.id}: invalid PDF page`);
      }
      for (const field of ['choices', 'choiceExplanations']) {
        check(JSON.stringify(Object.keys(q[field] ?? {}).sort()) === JSON.stringify(['1','2','3','4','5']), `${q.id}: incomplete ${field}`);
      }
      const text = [q.questionText, q.explanation, q.sourceAttribution, ...Object.values(q.choices ?? {}), ...Object.values(q.choiceExplanations ?? {})];
      check(text.every(t => typeof t === 'string' && t.trim().length > 0 && !/\?{2,}|\uFFFD/.test(t)), `${q.id}: missing text / encoding corruption`);
      check(typeof q.hasRequiredFigure === 'boolean', `${q.id}: figure decision missing`);
      if (q.hasRequiredFigure) check(Array.isArray(q.figures) && q.figures.length > 0 && q.figures.every(f => existsSync(resolve(root, f.path))), `${q.id}: required figure missing`);
      const pass = isNew ? Boolean(batch?.status === 'PASS') : q.contentReview?.status === 'PASS';
      if (pass) { accepted++; if (isNew) newAccepted++; else baselineAccepted++; }
      if (isNew && pass) {
        check(q.needsIndependentReview === false && q.contentReview?.status === 'PASS' && q.contentReview.model === 'gpt-6-astra' && q.contentReview.report === batch.report, `${q.id}: review metadata mismatch`);
      }
      if (isNew && !pass) check(q.needsIndependentReview === true, `${q.id}: unreviewed content marked accepted`);
      if (requireReviewed && isNew) check(pass, `${q.id}: independent review pending`);
      byQualification[data.qualification] ??= { total: 0, accepted: 0 };
      byQualification[data.qualification].total++;
      if (pass) byQualification[data.qualification].accepted++;
    }
  }
}
if (receipt) {
  check(receipt.status === 'PARTIAL_CONTENT_ACCEPTED_NOT_REGISTERED', 'receipt must remain partial and unpublished');
  check(receipt.baselineAccepted === 2 && receipt.totalExpected === official.length && receipt.totalExpected === 520, 'receipt baseline/expected mismatch');
  check(receipt.accepted === receipt.baselineAccepted + manifests.reduce((n, b) => n + b.originals, 0), 'receipt accepted count mismatch');
  check(receipt.remaining === receipt.totalExpected - receipt.accepted, 'receipt remaining count mismatch');
  check(baselineAccepted === receipt.baselineAccepted && accepted === receipt.accepted, 'receipt count differs from manuscripts');
}
for (const batch of manifests) check(existsSync(resolve(root, batch.path)), `${batch.path}: accepted file missing`);
if (verifySources) for (const source of sourceInventory) {
  check(existsSync(source.path), `missing saved PDF: ${source.qualification}/${source.year}/${source.kind}`);
  if (existsSync(source.path)) check(sha(readFileSync(source.path)) === source.sha256, `saved PDF hash mismatch: ${source.qualification}/${source.year}/${source.kind}`);
}
console.log(JSON.stringify({ status: failures.length ? 'FAIL' : 'PASS', originals: count, accepted, newOriginals: newCount, newAccepted, expected: 520, remainingContentAcceptance: 520 - accepted, byQualification, failures }, null, 2));
if (failures.length) process.exitCode = 1;
