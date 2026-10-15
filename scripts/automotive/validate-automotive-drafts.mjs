import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

export const QUALIFICATION = 'jidousha-seibishi-gakka';
export const CHOICES = ['ア', 'イ', 'ウ', 'エ'];
export const EXPECTED = {
  'jaspa-2026-first': { '2-gasoline': 40, '2-diesel': 40, '2-motorcycle': 40,
    '3-chassis': 30, '3-gasoline': 30, '3-diesel': 30, body: 40 },
  'jaspa-2025-second': { '1-small-written': 50, '2-gasoline': 40, '2-diesel': 40,
    '2-chassis': 30, '3-chassis': 30, '3-gasoline': 30, '3-diesel': 30,
    '3-motorcycle': 30, electrical: 40, body: 40 },
};

export function originalKey(book, q) {
  return [book.qualification, book.fiscalYear, book.term, book.subjectCode, q.qNumber].join(':');
}

export function partitionOriginals(candidates, published = [], openPr = []) {
  const occupied = new Set([...published, ...openPr]);
  const seen = new Set();
  const accepted = [], excluded = [];
  for (const item of candidates) {
    const reason = occupied.has(item.key) ? 'published-or-open-pr' : seen.has(item.key) ? 'duplicate-in-batch' : null;
    if (reason) excluded.push({ ...item, reason });
    else { seen.add(item.key); accepted.push(item); }
  }
  return { accepted, excluded };
}

function sameAnswer(a, b) {
  return Array.isArray(a) && Array.isArray(b)
    ? a.length === b.length && [...a].sort().join('|') === [...b].sort().join('|') : a === b;
}
const isText = x => typeof x === 'string' && x.trim().length > 0;
const placeholder = /未作成|未着手|解説未了|解説待ち|要転記|後で追加|pending|TODO|OCR一次/i;

export function validateBook(book, expected, table, receipt) {
  const issues = [];
  const rows = [];
  const issue = (qNumber, code, detail) => issues.push({ qNumber, code, detail });
  if (book.qualification !== QUALIFICATION) issue(null, 'qualification', book.qualification);
  if (book.publicGo !== 0 || book.permissionVerified !== false) issue(null, 'publication-gate', 'Must not invent publication approval or verified provider permission.');
  if (book.expectedOriginals !== expected) issue(null, 'denominator', `${book.expectedOriginals}/${expected}`);
  const seen = new Set();
  for (const q of book.questions ?? []) {
    const start = issues.length;
    if (!Number.isInteger(q.qNumber) || q.qNumber < 1 || q.qNumber > expected) issue(q.qNumber, 'q-number', 'Outside official booklet.');
    if (seen.has(q.qNumber)) issue(q.qNumber, 'duplicate', 'Repeated original number.');
    seen.add(q.qNumber);
    const expectedId = `jidosha-${book.fiscalYear}-${book.term}-${book.subjectCode}-q${String(q.qNumber).padStart(2, '0')}`;
    if (q.id !== expectedId) issue(q.qNumber, 'id', `Expected ${expectedId}`);
    if (!isText(q.question) || placeholder.test(q.question)) issue(q.qNumber, 'question', 'Missing or provisional original.');
    if (Object.keys(q.choices ?? {}).sort().join('|') !== [...CHOICES].sort().join('|')) issue(q.qNumber, 'choice-keys', 'Exactly four original options required.');
    for (const key of CHOICES) {
      if (!isText(q.choices?.[key]) || placeholder.test(q.choices[key])) issue(q.qNumber, 'choice', key);
      if (!isText(q.choiceExplanations?.[key]) || placeholder.test(q.choiceExplanations[key])) issue(q.qNumber, 'choice-explanation', key);
    }
    if (!isText(q.explanation) || placeholder.test(q.explanation)) issue(q.qNumber, 'explanation', 'Missing or provisional.');
    if (q.explanationCoverage !== 'full') issue(q.qNumber, 'coverage', q.explanationCoverage);
    const official = table?.answers.find(x => x.qNumber === q.qNumber);
    if (!official) issue(q.qNumber, 'official-answer-missing', 'No verified answer-table entry.');
    else {
      if (!sameAnswer(q.answer, official.answer) || String(q.officialAnswerNumber) !== official.officialAnswerNumber) issue(q.qNumber, 'answer-mismatch', { actual: q.answer, official: official.answer, officialAnswerNumber: official.officialAnswerNumber });
      if (official.officialQuestionStatus === 'withdrawn-all-accepted' && q.needsReview !== true) issue(q.qNumber, 'withdrawn-grading', 'Withdrawn question must remain out of the normal grading pool.');
    }
    if (!Array.isArray(q.sourcePages) || q.sourcePages.length === 0 || q.sourcePages.some(p => !Number.isInteger(p) || p < 1 || p > (receipt?.pageCount ?? 0))) issue(q.qNumber, 'source-pages', q.sourcePages);
    if (typeof q.hasImage !== 'boolean' || typeof q.sourceFigureRequired !== 'boolean' || q.hasImage !== q.sourceFigureRequired) issue(q.qNumber, 'figure', 'Original figure/table requirement must be explicit and consistent.');
    if (!Array.isArray(q.topicTags) || q.topicTags.length === 0 || !Number.isInteger(q.difficulty) || q.difficulty < 1 || q.difficulty > 5) issue(q.qNumber, 'topic-difficulty', 'Missing classification.');
    const withdrawn = official?.officialQuestionStatus === 'withdrawn-all-accepted';
    const contentComplete = issues.length === start;
    const reviewComplete = contentComplete && (q.needsReview === false || withdrawn);
    rows.push({ key: originalKey(book, q), qNumber: q.qNumber, contentComplete, reviewComplete,
      gradable: reviewComplete && !withdrawn, withdrawn, hasImage: q.hasImage === true });
  }
  const missing = Array.from({ length: expected }, (_, n) => n + 1).filter(n => !seen.has(n));
  for (const qNumber of missing) issue(qNumber, 'original-missing', 'Not completed yet; not a source-access hold.');
  return { issues, rows, missing, expected, stored: rows.length,
    contentComplete: rows.filter(q => q.contentComplete).length,
    reviewedComplete: rows.filter(q => q.reviewComplete).length,
    gradable: rows.filter(q => q.gradable).length,
    withdrawn: rows.filter(q => q.withdrawn).length,
    figures: rows.filter(q => q.hasImage).length };
}

export function inspectDrafts(root, occupied = { published: [], openPr: [] }) {
  const answers = JSON.parse(fs.readFileSync(path.join(root, 'official-answers.json'), 'utf8'));
  const receiptFile = fs.existsSync(path.join(root, 'pdf-receipts.json')) ? 'pdf-receipts.json' : 'source-receipts.json';
  const receipts = JSON.parse(fs.readFileSync(path.join(root, receiptFile), 'utf8'));
  const bundledFile = path.join(root, 'latest-two.json');
  const bundle = fs.existsSync(bundledFile) ? JSON.parse(fs.readFileSync(bundledFile, 'utf8')) : null;
  const books = [], candidates = [];
  for (const [sitting, subjects] of Object.entries(EXPECTED)) {
    for (const [subject, expected] of Object.entries(subjects)) {
      const bookId = `${sitting}-${subject}`;
      const filename = path.join(root, 'drafts', `${bookId}.json`);
      const fiscalYear = Number(sitting.split('-')[1]);
      const term = sitting.split('-')[2];
      if (!bundle && !fs.existsSync(filename)) { books.push({ bookId, expected, stored: 0, contentComplete: 0, reviewedComplete: 0, gradable: 0, withdrawn: 0, figures: 0, issues: [{ code: 'book-missing' }] }); continue; }
      let book;
      try { book = bundle ? { bookId, qualification: bundle.qualification, fiscalYear, term, subjectCode: subject,
        expectedOriginals: expected, publicGo: bundle.publicGo, permissionVerified: bundle.permissionVerified,
        questions: bundle.writtenOriginals.filter(q => q.fiscalYear === fiscalYear && q.term === term && q.subject === subject),
      } : JSON.parse(fs.readFileSync(filename, 'utf8')); }
      catch (error) { books.push({ bookId, expected, stored: 0, contentComplete: 0, reviewedComplete: 0, gradable: 0, withdrawn: 0, figures: 0, issues: [{ code: 'invalid-json', detail: String(error) }] }); continue; }
      const receipt = receipts.rows.find(x => x.name === bookId);
      const result = validateBook(book, expected, answers.tables[sitting]?.[subject], receipt);
      if (book.bookId !== bookId || book.fiscalYear !== fiscalYear || book.term !== term || book.subjectCode !== subject) result.issues.push({ code: 'book-identity', detail: bookId });
      if (bundle) for (const q of book.questions) {
        if (q.year !== fiscalYear || q.qualification !== QUALIFICATION || q.type !== 'multiple-choice' || q.session !== 'gakka') result.issues.push({ qNumber: q.qNumber, code: 'normalized-identity' });
        if (q.hasImage && (!q.sourceFigureAssets?.length || q.sourceFigureAssets.some(asset => !fs.existsSync(path.join(root, asset.relativePath))))) result.issues.push({ qNumber: q.qNumber, code: 'figure-asset-missing' });
      }
      books.push({ bookId, ...result });
      candidates.push(...result.rows);
    }
  }
  const dedup = partitionOriginals(candidates, occupied.published, occupied.openPr);
  const sum = field => books.reduce((n, book) => n + book[field], 0);
  return { schemaVersion: 1, qualification: QUALIFICATION, scope: 'latest-two-overall-sittings-all-offered-written-subjects',
    requiredWrittenOriginals: 610, supplementalOralOriginals: 2,
    storedWrittenOriginals: sum('stored'), contentCompleteOriginals: sum('contentComplete'), reviewedCompleteOriginals: sum('reviewedComplete'),
    gradableOriginals: sum('gradable'), officialWithdrawnOriginals: sum('withdrawn'), figureOriginals: sum('figures'),
    manuscriptsComplete: books.every(book => book.contentComplete === book.expected && book.issues.length === 0) && dedup.excluded.length === 0,
    deduplicatedOriginals: dedup.accepted.length, excludedDuplicates: dedup.excluded,
    complete: books.every(book => book.reviewedComplete === book.expected && book.issues.length === 0) && dedup.excluded.length === 0,
    publicGo: 0, permissionVerified: false, books };
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const args = process.argv.slice(2);
  const root = args.find(arg => !arg.startsWith('--')) ?? path.dirname(fileURLToPath(import.meta.url));
  const report = inspectDrafts(root);
  const reportArg = args.find(arg => arg.startsWith('--report='));
  if (reportArg) fs.writeFileSync(reportArg.slice('--report='.length), JSON.stringify(report, null, 2) + '\n', 'utf8');
  console.log(JSON.stringify({ ...report, books: report.books.map(book => ({ ...book, rows: undefined, issueCount: book.issues.length, issues: book.issues.slice(0, 8) })) }, null, 2));
  if (args.includes('--require-complete') && !report.complete) process.exitCode = 2;
  if (args.includes('--require-manuscripts-complete') && !report.manuscriptsComplete) process.exitCode = 2;
}
