import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { readFileSync, existsSync, readdirSync } from 'node:fs';
import { dirname, resolve, relative } from 'node:path';
import { fileURLToPath } from 'node:url';

export const folder = dirname(fileURLToPath(import.meta.url));
export const sha256 = raw => createHash('sha256').update(raw).digest('hex');
const letters = [...'アイウエオ'];
const compact = value => value.replace(/\s+/gu, '');

export function parseOriginal(row) {
  const raw = row.rawOfficialQuestionTextBlock.replace(/\n\s*別\s*冊[\s\S]*$/u, '');
  const markers = [...raw.matchAll(/^\s*([1-5])[．.]\s*/gm)];
  assert.deepEqual(markers.map(x => x[1]), [...'12345'], `SOURCE_CHOICES ${row.id}`);
  const n = Number(row.id.match(/q(\d+)$/u)[1]);
  let question = raw.slice(0, markers[0].index).replace(new RegExp(`^\\s*${n}\\s+`, 'u'), '').trim();
  // 71PM19: the PDF text layer separates the dot above V into its own line.
  // The official question PNG on physical page 11 was visually checked on 2026-10-11.
  if (row.id === 'rinsho-kensagishi-2025-annual-pm-q19') question = question.replace(/V\s*・\s*25/u, 'V\u030725');
  const choices = Object.fromEntries(markers.map((m, i) => [letters[i], raw.slice(m.index + m[0].length, markers[i + 1]?.index ?? raw.length).trim()]));
  return { question, choices };
}

export function validateQuestions(questions, evidence) {
  const seen = new Set();
  assert.equal(evidence.publicGo, 0, 'PUBLIC_HOLD');
  assert.equal(evidence.runtimeRegistrationAdded, false, 'RUNTIME_HOLD');
  const rows = new Map(evidence.rows.map(x => [x.id, x]));
  assert.equal(rows.size, evidence.rows.length, 'DUPLICATE_EVIDENCE');
  for (const q of questions) {
    assert.ok(!seen.has(q.id), `DUPLICATE_ID ${q.id}`); seen.add(q.id);
    assert.ok(/^rinsho-kensagishi-202[56]-annual-(am|pm)-q\d+$/u.test(q.id), `QUESTION_ID ${q.id}`);
    assert.ok(!(q.year === 2026 && q.session === 'pm' && q.qNumber >= 60), `PROVIDER_STOP_SCOPE ${q.id}`);
    const row = rows.get(q.id); assert.ok(row, `NO_PRIMARY_EVIDENCE ${q.id}`);
    assert.equal(row.publicGo, 0, `PUBLIC_HOLD ${q.id}`);
    assert.equal(q.needsReview, true, `REVIEW_HOLD ${q.id}`);
    assert.equal(q.explanationCoverage, 'full', `CHOICE_COVERAGE ${q.id}`);
    assert.equal(sha256(Buffer.from(row.rawOfficialQuestionTextBlock)), row.questionTextSha256, `SOURCE_HASH ${q.id}`);
    const official = parseOriginal(row);
    assert.equal(compact(q.question), compact(official.question), `STEM_MISMATCH ${q.id}`);
    assert.deepEqual(Object.keys(q.choices).sort(), letters.toSorted(), `FIVE_CHOICES ${q.id}`);
    assert.deepEqual(Object.keys(q.choiceExplanations).sort(), letters.toSorted(), `FIVE_REASONS ${q.id}`);
    for (const key of letters) {
      if (official.choices[key] !== '') {
        assert.equal(compact(q.choices[key]), compact(official.choices[key]), `CHOICE_MISMATCH ${q.id} ${key}`);
      } else {
        assert.ok(q.choiceImageUrls?.[key], `MISSING_ORIGINAL_SYMBOL ${q.id} ${key}`);
      }
      assert.ok(q.choiceExplanations[key].trim().length >= 15, `MISSING_REASON ${q.id} ${key}`);
    }
    const accepted = [...new Set(row.acceptedAnswerPatterns.join('').split(''))].sort().map(x => letters[Number(x) - 1]);
    assert.deepEqual((Array.isArray(q.answer) ? q.answer : [q.answer]).toSorted(), accepted.toSorted(), `OFFICIAL_ANSWER ${q.id}`);
    assert.equal(q.requiredSelections, row.requiredSelections, `SELECTION_COUNT ${q.id}`);
    assert.equal(q.officialAnswerNumber, row.acceptedAnswerPatterns.join('/'), `OFFICIAL_CELL ${q.id}`);
    assert.ok(q.sourceAttribution?.includes('厚生労働省'), `ATTRIBUTION ${q.id}`);
    assert.ok(q.sourcePdfUrl.startsWith('https://www.mhlw.go.jp/'), `PRIMARY_SOURCE ${q.id}`);
    assert.ok(q.sourceAnswerUrl.startsWith('https://www.mhlw.go.jp/'), `PRIMARY_KEY ${q.id}`);
    assert.ok(q.explanation.trim().length >= 30, `MISSING_EXPLANATION ${q.id}`);
  }
  return { originals: questions.length, choiceReasons: questions.length * 5, publicGo: 0 };
}

export function loadPrepared() {
  const files = readdirSync(folder).filter(x => /^202[56]-annual-.*\.json$/u.test(x)).sort();
  const questions = files.flatMap(x => JSON.parse(readFileSync(resolve(folder, x), 'utf8')));
  const evidence = JSON.parse(readFileSync(resolve(folder, 'source-evidence-owner-completion.json'), 'utf8'));
  return { questions, evidence, files };
}

export function validateImages(questions, evidence) {
  let count = 0;
  const repo = resolve(folder, '../../..');
  for (const q of questions) {
    const row = evidence.rows.find(x => x.id === q.id);
    for (const im of row.preparedImages ?? []) {
      const target = resolve(repo, im.preparedPath);
      assert.ok(!relative(folder, target).startsWith('..'), `IMAGE_OUTSIDE_PREPARED ${q.id}`);
      assert.ok(existsSync(target), `MISSING_ORIGINAL_IMAGE ${q.id}`);
      assert.equal(sha256(readFileSync(target)), im.sha256, `IMAGE_SHA ${q.id}`); count++;
    }
    const urls = [...(q.imageUrls ?? []), ...Object.values(q.choiceImageUrls ?? {})];
    if (q.hasImage) assert.ok(urls.length > 0 && (row.preparedImages ?? []).length > 0, `MISSING_FIGURE_MAP ${q.id}`);
    for (const url of urls) {
      assert.ok(url.startsWith('./figures/'), `UNPROMOTED_IMAGE_PATH ${q.id}`);
      assert.ok(existsSync(resolve(folder, url)), `UNRESOLVED_IMAGE ${q.id}`);
    }
  }
  return count;
}
