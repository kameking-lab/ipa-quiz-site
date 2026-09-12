import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

// Read-only publication gate. Run from any directory with Node 20+.
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const data = path.join(root, 'data/exam-library');
const read = (name) => JSON.parse(fs.readFileSync(path.join(data, name), 'utf8').replace(/^\uFEFF/, ''));
const catalog = read('official-catalog.json');
const explanations = read('explanations.json');
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
  check(paper.sourceMode === 'official-pdf', `Unexpected source mode: ${paper.id}`);
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
    check((paper.answerMode === 'reference') === (q.answerAuthority === 'descriptive'), `Paper/question answer mode mismatch: ${q.id}`);
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
  for (const id of questions.keys()) check(Object.hasOwn(explanations, id), `Missing explanation: ${id}`);
}
const duplicateGroups = [...duplicates.values()].filter(ids => ids.length > 1);
const explanationReuseCandidates = duplicateGroups.flatMap(ids => {
  const sources = ids.filter(id => Object.hasOwn(explanations, id));
  return sources.length ? ids.filter(id => !Object.hasOwn(explanations, id)).map(target => ({ target, sources })) : [];
});
const result = {
  ok: errors.length === 0, papers: catalog.length, groups, questions: questions.size,
  officialAnswers: authority.official, unconfirmed: authority.unconfirmed,
  descriptive: authority.descriptive, images: images.size,
  explanations: Object.keys(explanations).length,
  explanationCoverage: Number((Object.keys(explanations).length / questions.size * 100).toFixed(2)),
  duplicateGroups: duplicateGroups.length,
  duplicateQuestions: duplicateGroups.reduce((sum, ids) => sum + ids.length, 0),
  explanationReuseCandidates, errors,
  ...(process.argv.includes('--duplicates') ? { duplicateQuestionGroups: duplicateGroups } : {}),
};
console.log(JSON.stringify(result, null, 2));
process.exitCode = errors.length ? 1 : 0;
