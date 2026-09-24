import fs from 'node:fs';
import path from 'node:path';
import { createHash } from 'node:crypto';
import { fileURLToPath } from 'node:url';

// Read-only publication gate. Run from any directory with Node 20+.
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const data = path.join(root, 'data/exam-library');
const read = (name) => JSON.parse(fs.readFileSync(path.join(data, name), 'utf8').replace(/^\uFEFF/, ''));
const catalog = read('official-catalog.json');
const explanations = read('explanations.json');
const choiceExplanations = read('choice-explanations.json');
const coverageContract = read('coverage-contract.json');
const errors = [];
const check = (condition, message) => { if (!condition) errors.push(message); };
const paperIds = new Set();
const questions = new Map();
const images = new Set();
const groups = {};
const authority = { official: 0, unconfirmed: 0, descriptive: 0 };
const duplicates = new Map();

for (const paper of catalog) {
  check(/^(lckohyo|emkohyo|cskohyo)-[A-Za-z0-9-]+$/.test(paper.id), `Unsafe paper ID: ${paper.id}`);
  if (!/^(lckohyo|emkohyo|cskohyo)-[A-Za-z0-9-]+$/.test(paper.id)) continue;
  check(!paperIds.has(paper.id), `Duplicate paper ID: ${paper.id}`);
  paperIds.add(paper.id);
  groups[paper.group] = (groups[paper.group] ?? 0) + 1;
  check(paper.id.startsWith(`${paper.group}-`), `Group mismatch: ${paper.id}`);
  check(
    paper.sourceMode === 'official-pdf' || paper.sourceMode === 'official-archive-copy',
    `Unexpected source mode: ${paper.id}`,
  );
  if (paper.sourceMode === 'official-archive-copy') {
    check(/^cskohyo-CS202119\d{2}$/u.test(paper.id), `Archive copy outside reviewed 2021 consultant set: ${paper.id}`);
    check(
      typeof paper.archiveSourceUrl === 'string' &&
        /^https:\/\/osh-lab\.com\/wp-content\/uploads\/2022\/06\/[a-f0-9]{32}\.pdf$/u.test(paper.archiveSourceUrl),
      `Missing reviewed archive source: ${paper.id}`,
    );
    check(
      paper.officialArchiveManifestUrl ===
        'https://web.archive.org/web/20220528065047id_/https://www.exam.or.jp/exmn/csv/cspdf.csv',
      `Missing official archive manifest: ${paper.id}`,
    );
  }
  check(['reference', 'official-choice'].includes(paper.answerMode), `Unexpected answer mode: ${paper.id}`);
  for (const key of ['pdfUrl', 'indexUrl']) {
    try {
      const url = new URL(paper[key]);
      check(url.protocol === 'https:' && url.hostname === 'www.exam.or.jp', `Unexpected source URL: ${paper.id}/${key}`);
    } catch { errors.push(`Invalid source URL: ${paper.id}/${key}`); }
  }
  for (const key of ['indexSha256', 'pdfSha256']) check(/^[a-f0-9]{64}$/.test(paper[key]), `Missing source checksum: ${paper.id}/${key}`);
  check(['publication', 'exam'].includes(paper.dateKind), `Invalid date kind: ${paper.id}`);
  check(/^\d{4}-\d{2}(?:-\d{2})?$/.test(paper.date), `Invalid source date: ${paper.id}`);
  let rows;
  try { rows = read(`papers/${paper.id}.json`); } catch (error) { errors.push(`${paper.id}: ${error.message}`); continue; }
  check(rows.length === paper.questionCount, `Question count mismatch: ${paper.id}`);
  check(rows.filter(q => q.answerAuthority === 'official').length === paper.scoredCount, `Scored count mismatch: ${paper.id}`);
  for (const [index, q] of rows.entries()) {
    check(q.number === index + 1 && q.id === `${paper.id}-q${q.number}`, `Question identity mismatch: ${q.id}`);
    check(!questions.has(q.id), `Duplicate question ID: ${q.id}`);
    questions.set(q.id, q);
    check(typeof q.text === 'string' && q.text.trim().length > 0, `Empty question: ${q.id}`);
    check(q.extractionStatus === 'complete', `Incomplete extraction: ${q.id}`);
    check(Number.isInteger(q.sourceQuestionNumber) && q.sourceQuestionNumber > 0, `Invalid original question number: ${q.id}`);
    check(Array.isArray(q.sourcePages) && q.sourcePages.length > 0 && q.sourcePages.every(p => Number.isInteger(p) && p > 0 && p <= paper.pageCount), `Invalid PDF pages: ${q.id}`);
    check(Object.hasOwn(authority, q.answerAuthority), `Invalid answer authority: ${q.id}`);
    if (Object.hasOwn(authority, q.answerAuthority)) authority[q.answerAuthority]++;
    // 特級の同一PDFには記述16問と公式正答付き択一8問が併載されている。
    const mixedBoilerChoice = ['lckohyo-LC20260401-2', 'lckohyo-LC20251101'].includes(paper.id)
      && [4, 5, 10, 11, 16, 17, 22, 23].includes(q.number)
      && q.answerAuthority === 'official' && q.choiceCount === 5;
    check(mixedBoilerChoice || (paper.answerMode === 'reference') === (q.answerAuthority === 'descriptive'), `Paper/question answer mode mismatch: ${q.id}`);
    if (q.answerAuthority === 'official') {
      check(q.choiceCount === 5 && Number.isInteger(q.correctChoice) && q.correctChoice >= 1 && q.correctChoice <= 5, `Invalid official answer: ${q.id}`);
    } else {
      check(q.correctChoice === null, `Unverified question must not be graded: ${q.id}`);
      check(q.choiceCount === (q.answerAuthority === 'descriptive' ? 0 : 5), `Invalid non-graded choices: ${q.id}`);
    }
    check(Array.isArray(q.images) && q.images.length > 0, `Missing question images: ${q.id}`);
    for (const image of q.images ?? []) {
      const safe = typeof image === 'string' && image.startsWith(`/exam-library/${paper.id}/`) && /^\/exam-library\/[A-Za-z0-9-]+\/q\d+-p\d+-\d+\.webp$/.test(image);
      check(safe, `Invalid image path: ${q.id}/${image}`);
      if (!safe) continue;
      images.add(image);
      try {
        const bytes = fs.readFileSync(path.join(root, 'public', image));
        check(bytes.length > 12 && bytes.toString('ascii', 0, 4) === 'RIFF' && bytes.toString('ascii', 8, 12) === 'WEBP', `Invalid WebP: ${image}`);
      } catch { errors.push(`Missing image file: ${image}`); }
    }
    if (q.answerAuthority === 'official') {
      // Only the displayed question number and PDF line wrapping are ignored.
      // Figure content is not compared: these are review candidates, never automatic reuse.
      const text = q.text.replace(/^問\s*[0-9０-９]+\s*/, '').replace(/\s+/gu, '');
      const key = JSON.stringify([text, q.correctChoice, q.choiceCount]);
      duplicates.set(key, [...(duplicates.get(key) ?? []), q.id]);
    }
  }
}
const paperFiles = fs.readdirSync(path.join(data, 'papers')).filter(name => name.endsWith('.json'));
check(paperFiles.length === catalog.length && paperFiles.every(name => paperIds.has(name.slice(0, -5))), 'Catalog and paper files differ');
for (const [id, explanation] of Object.entries(explanations)) {
  check(questions.has(id), `Orphan explanation: ${id}`);
  // A learning explanation is independent of grading authority. Unconfirmed and
  // descriptive questions may have authored reasoning without an official key.
  check(typeof explanation === 'string' && explanation.trim().length >= 120, `Empty/insubstantial explanation: ${id}`);
  check(!/準備中|今後追加|解説を作成できません/.test(explanation), `Placeholder explanation: ${id}`);
}
if (process.argv.includes('--require-explanations')) {
  for (const [id, question] of questions) {
    const hasNarrativeExplanation = Object.hasOwn(explanations, id);
    const hasStructuredChoiceExplanation =
      question.answerAuthority === 'official'
      && question.choiceCount === 5
      && Object.hasOwn(choiceExplanations, id);
    check(
      hasNarrativeExplanation || hasStructuredChoiceExplanation,
      `Missing explanation: ${id}`,
    );
  }
}

const isGovernmentPrimarySourceUrl = (value) => {
  if (typeof value !== 'string' || value !== value.trim()) return false;
  try {
    const url = new URL(value);
    return url.protocol === 'https:' && !url.username && !url.password && !url.port
      && url.hostname.endsWith('.go.jp')
      // J-STAGE hosts journal articles, which are not government primary sources.
      && url.hostname !== 'jstage.jst.go.jp' && !url.hostname.endsWith('.jstage.jst.go.jp');
  } catch { return false; }
};
for (const [id, overlay] of Object.entries(choiceExplanations)) {
  const question = questions.get(id);
  check(Boolean(question), `Orphan choice explanation: ${id}`);
  if (!question) continue;
  check(question.answerAuthority === 'official' && question.choiceCount === 5 && Number.isInteger(question.correctChoice), `Choice explanation requires an official five-choice answer: ${id}`);
  check(overlay && typeof overlay === 'object' && !Array.isArray(overlay), `Invalid choice explanation object: ${id}`);
  if (!overlay || typeof overlay !== 'object' || Array.isArray(overlay)) continue;
  const sourceHash = createHash('sha256').update(question.text).digest('hex');
  check(overlay.sourceHash === sourceHash, `Stale choice explanation source: ${id}`);
  check(overlay.correctChoice === question.correctChoice, `Choice explanation answer mismatch: ${id}`);
  check(typeof overlay.summary === 'string' && overlay.summary.trim().length >= 20, `Short choice explanation summary: ${id}`);
  check(
    typeof overlay.summary === 'string' && !/https?:\/\/|\[[^\]]+\]\([^)]+\)|<a\b/iu.test(overlay.summary),
    `Choice explanation summary must keep links in sources: ${id}`,
  );
  check(Array.isArray(overlay.choices) && overlay.choices.length === 5, `Choice explanation must contain five choices: ${id}`);
  if (Array.isArray(overlay.choices)) {
    const numbers = overlay.choices.map(choice => choice?.number);
    check(new Set(numbers).size === 5 && [1, 2, 3, 4, 5].every(number => numbers.includes(number)), `Choice explanation numbers incomplete: ${id}`);
    for (const choice of overlay.choices) {
      check(choice && typeof choice === 'object', `Invalid choice explanation row: ${id}`);
      if (!choice || typeof choice !== 'object') continue;
      check(choice.verdict === (choice.number === question.correctChoice ? 'correct' : 'incorrect'), `Choice explanation verdict mismatch: ${id}/${choice.number}`);
      check(typeof choice.reason === 'string' && choice.reason.trim().length >= 40, `Short choice explanation reason: ${id}/${choice.number}`);
      check(
        typeof choice.reason === 'string' && !/https?:\/\/|\[[^\]]+\]\([^)]+\)|<a\b/iu.test(choice.reason),
        `Choice explanation reason must keep links in sources: ${id}/${choice.number}`,
      );
    }
  }
  check(Array.isArray(overlay.sources) && overlay.sources.length > 0, `Choice explanation requires government sources: ${id}`);
  if (Array.isArray(overlay.sources)) {
    const urls = [];
    for (const source of overlay.sources) {
      check(source && typeof source === 'object' && typeof source.title === 'string' && source.title.trim().length > 0, `Invalid choice explanation source title: ${id}`);
      check(source && typeof source === 'object' && isGovernmentPrimarySourceUrl(source.url), `Non-government choice explanation source: ${id}/${source?.url}`);
      if (source && typeof source === 'object' && typeof source.url === 'string') urls.push(source.url);
    }
    check(new Set(urls).size === urls.length, `Duplicate choice explanation source: ${id}`);
  }
}
const requiredStructuredPapers = coverageContract.structuredChoiceExplanations?.requiredPaperIds;
check(Array.isArray(requiredStructuredPapers), 'Missing structured-choice coverage contract');
const requiredStructuredQuestionIds = [];
for (const paperId of requiredStructuredPapers ?? []) {
  check(paperIds.has(paperId), `Unknown required structured-choice paper: ${paperId}`);
  for (const [id, question] of questions) {
    if (
      id.startsWith(`${paperId}-q`) &&
      question.answerAuthority === 'official' &&
      question.choiceCount === 5
    ) {
      requiredStructuredQuestionIds.push(id);
      check(Object.hasOwn(choiceExplanations, id), `Missing required structured choice explanation: ${id}`);
    }
  }
}

// Pin every official EM paper from the two latest complete publication years.
// The target is visible in normal validation; --require-em-two-years closes
// the publication gate only after every official five-choice row is reviewed.
const emTarget = coverageContract.structuredChoiceExplanations?.emkohyoTwoYearTarget;
const emYears = emTarget?.years ?? [];
const emPaperIds = emTarget?.paperIds ?? [];
check(Array.isArray(emYears) && emYears.length === 2, 'Missing EM two-year target years');
check(Array.isArray(emPaperIds) && new Set(emPaperIds).size === emPaperIds.length, 'Invalid EM two-year paper IDs');
const emCatalog = catalog.filter(paper => paper.group === 'emkohyo' && emYears.includes(Number(paper.date.slice(0, 4))));
const actualEmPaperIds = new Set(emCatalog.map(paper => paper.id));
check(emPaperIds.length === emCatalog.length && emPaperIds.every(id => actualEmPaperIds.has(id)), 'EM two-year contract differs from official catalog');
const emQuestionIds = [];
let emTextCards = 0;
let emFigureCrops = 0;
for (const paper of emCatalog) {
  const rows = read(`papers/${paper.id}.json`);
  let presentation;
  try { presentation = read(`presentation/${paper.id}.json`); }
  catch (error) { errors.push(`Missing EM text presentation: ${paper.id}: ${error.message}`); continue; }
  const eligible = rows.filter(row => row.answerAuthority === 'official' && row.choiceCount === 5);
  check(eligible.length === emTarget?.expectedQuestionsPerPaper, `EM target paper count mismatch: ${paper.id}`);
  emQuestionIds.push(...eligible.map(row => row.id));
  check(Object.keys(presentation).length === eligible.length, `EM presentation count mismatch: ${paper.id}`);
  for (const row of eligible) {
    const shown = presentation[row.id];
    check(Boolean(shown), `Missing EM text card: ${row.id}`);
    if (!shown) continue;
    emTextCards++;
    check(shown.sourceHash === createHash('sha256').update(row.text).digest('hex'), `Stale EM text card: ${row.id}`);
    check(typeof shown.prompt === 'string' && shown.prompt.trim().length > 0, `Empty EM text prompt: ${row.id}`);
    const cards = shown.choices;
    check(Array.isArray(cards) && cards.length === 5, `Missing five EM choice cards: ${row.id}`);
    if (Array.isArray(cards) && cards.length === 5) {
      check(cards.every((card, index) => card?.number === index + 1
        && typeof card.text === 'string' && card.text.trim().length > 0), `Invalid EM choice card: ${row.id}`);
      check(new Set(cards.map(card => card?.text?.trim())).size === 5, `Repeated EM choice card: ${row.id}`);
    }
    for (const figure of shown.figures ?? []) {
      const safe = typeof figure.src === 'string'
        && figure.src.startsWith(`/exam-library/${paper.id}/`)
        && figure.src.endsWith('.webp');
      check(safe, `Invalid EM figure crop path: ${row.id}/${figure.src}`);
      if (!safe) continue;
      emFigureCrops++;
      try {
        const bytes = fs.readFileSync(path.join(root, 'public', figure.src));
        check(bytes.length > 12 && bytes.toString('ascii', 0, 4) === 'RIFF'
          && bytes.toString('ascii', 8, 12) === 'WEBP', `Invalid EM figure crop: ${row.id}/${figure.src}`);
      } catch { errors.push(`Missing EM figure crop: ${row.id}/${figure.src}`); }
    }
  }
}
check(emQuestionIds.length === emTarget?.expectedQuestions, 'EM two-year expected question count mismatch');
const emStructuredCount = emQuestionIds.filter(id => Object.hasOwn(choiceExplanations, id)).length;
for (const id of emQuestionIds) {
  const overlay = choiceExplanations[id];
  if (!overlay) continue;
  for (const choice of overlay.choices ?? []) {
    check(typeof choice.reason === 'string' && choice.reason.trim().length >= 55,
      `Short EM two-year choice reason: ${id}/${choice.number}`);
  }
}
if (process.argv.includes('--require-em-two-years')) {
  for (const id of emQuestionIds) check(Object.hasOwn(choiceExplanations, id), `Missing EM two-year choice explanation: ${id}`);
}

const consultantContract = coverageContract.consultant;
check(Array.isArray(consultantContract?.years) && consultantContract.years.length > 0, 'Missing consultant year coverage contract');
check(Array.isArray(consultantContract?.subjects) && consultantContract.subjects.length > 0, 'Missing consultant subject coverage contract');
const availablePaperIds = new Set(paperFiles.map(name => name.slice(0, -5)));
const consultantPresent = new Set(catalog.filter(paper => paper.group === 'cskohyo' && availablePaperIds.has(paper.id))
  .map(paper => `${Number(paper.date.slice(0, 4))}|${paper.subject}`));
const missingConsultantPapers = (consultantContract?.years ?? []).flatMap(year =>
  (consultantContract?.subjects ?? []).filter(subject => !consultantPresent.has(`${year}|${subject}`))
    .map(subject => ({ year, subject })));
const missingConsultantYears = (consultantContract?.years ?? []).filter(year =>
  !(consultantContract?.subjects ?? []).some(subject => consultantPresent.has(`${year}|${subject}`)));
if (process.argv.includes('--require-consultant-five-years')) {
  for (const missing of missingConsultantPapers) errors.push(`Missing consultant paper: ${missing.year}/${missing.subject}`);
}
const duplicateGroups = [...duplicates.values()].filter(ids => ids.length > 1);
const explanationReuseCandidates = duplicateGroups.flatMap(ids => {
  const sources = ids.filter(id => Object.hasOwn(explanations, id));
  return sources.length ? ids.filter(id => !Object.hasOwn(explanations, id)).map(target => ({ target, sources })) : [];
});
const explainedQuestionIds = new Set([
  ...Object.keys(explanations),
  ...Object.keys(choiceExplanations),
]);
const result = {
  ok: errors.length === 0, papers: catalog.length, groups, questions: questions.size,
  officialAnswers: authority.official, unconfirmed: authority.unconfirmed,
  descriptive: authority.descriptive, images: images.size,
  explanations: Object.keys(explanations).length,
  totalExplainedQuestions: explainedQuestionIds.size,
  explanationCoverage: Number((explainedQuestionIds.size / questions.size * 100).toFixed(2)),
  structuredChoiceExplanations: Object.keys(choiceExplanations).length,
  requiredStructuredChoiceExplanations: requiredStructuredQuestionIds.length,
  emTwoYearCoverage: {
    years: emYears,
    papers: emCatalog.length,
    expectedQuestions: emQuestionIds.length,
    textCards: emTextCards,
    figureCrops: emFigureCrops,
    structuredChoiceExplanations: emStructuredCount,
    complete: emStructuredCount === emQuestionIds.length,
  },
  consultantCoverage: {
    requiredYears: consultantContract?.years ?? [],
    missingYears: missingConsultantYears,
    missingPapers: missingConsultantPapers.length,
    complete: missingConsultantPapers.length === 0,
  },
  duplicateGroups: duplicateGroups.length,
  duplicateQuestions: duplicateGroups.reduce((sum, ids) => sum + ids.length, 0),
  explanationReuseCandidates, errors,
  ...(process.argv.includes('--duplicates') ? { duplicateQuestionGroups: duplicateGroups } : {}),
};
console.log(JSON.stringify(result, null, 2));
process.exitCode = errors.length ? 1 : 0;
