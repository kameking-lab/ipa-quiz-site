import { createHash } from 'node:crypto';
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { mkdtempSync, mkdirSync, readFileSync, writeFileSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { resolve, join, sep } from 'node:path';
import { spawnSync } from 'node:child_process';

const repo = resolve(import.meta.dirname, '..');
const readJson = path => JSON.parse(readFileSync(resolve(repo, path), 'utf8'));
const candidatePath = 'data/qualification-staging/lq4c-engineer-first/2024-aptitude-partial.json';
const receipt = readJson('reports/lq4c-20261104/acceptance.json');
const approved = receipt.batches.find(b => b.path === candidatePath);

function fixture(run) {
  const tempParent = resolve(tmpdir());
  const dir = mkdtempSync(join(tempParent, 'lq4c-validator-'));
  const put = (path, bytes) => {
    mkdirSync(resolve(dir, path, '..'), { recursive: true });
    writeFileSync(resolve(dir, path), bytes);
  };
  const writeJson = (path, data) => put(path, JSON.stringify(data, null, 2) + '\n');
  try {
    for (const p of ['scripts/validate-lq4-staging.mjs', candidatePath, approved.report, approved.reviewedSnapshot, 'data/qualification-staging/lq4b-engineer-first/2024-aptitude-partial.json', 'data/qualification-staging/lq4b-engineer-first/2025-aptitude-partial.json', 'reports/lq4b-20261104/source-inventory.json', 'reports/lq4b-20261104/official-answer-index.json']) put(p, readFileSync(resolve(repo, p)));
    writeJson('reports/lq4c-20261104/acceptance.json', { ...receipt, batches: [approved], accepted: 7, remaining: 513 });
    const questionData = JSON.parse(readFileSync(resolve(dir, candidatePath), 'utf8'));
    const invoke = () => spawnSync(process.execPath, [resolve(dir, 'scripts/validate-lq4-staging.mjs'), '--require-reviewed'], { encoding: 'utf8' });
    run({ dir, questionData, writeJson, invoke, put });
  } finally {
    // Delete only this verified mkdtemp directory under the OS temp directory.
    assert.ok(resolve(dir).startsWith(tempParent + sep + 'lq4c-validator-'));
    rmSync(dir, { recursive: true, force: true });
  }
}

test('accepts the actual independently reviewed batch with unchanged evidence', () => fixture(({ invoke }) => {
  const result = invoke(); assert.equal(result.status, 0, result.stdout + result.stderr);
  assert.equal(JSON.parse(result.stdout).newAccepted, 5);
}));

for (const [name, mutate, expected] of [
  ['changed manuscript after review', d => { d.questions[0].questionText += '改変'; }, /changed since review/],
  ['official answer mismatch', d => { d.questions[0].officialAnswer = 1; }, /official answer mismatch/],
  ['duplicate original hidden by counts', d => { d.questions.push(structuredClone(d.questions[0])); }, /duplicate original/],
  ['encoding corruption', d => { d.questions[0].questionText = '????'; }, /encoding corruption/],
  ['missing choice explanation', d => { delete d.questions[0].choiceExplanations['5']; }, /incomplete choiceExplanations/],
  ['required figure omitted', d => { d.questions[0].hasRequiredFigure = true; }, /required figure missing/],
  ['accidental publication of staging', d => { d.questions[0].publicGo = true; }, /must stay unpublished/],
]) test(`rejects ${name}`, () => fixture(({ questionData, writeJson, invoke }) => {
  mutate(questionData); writeJson(candidatePath, questionData);
  const result = invoke(); assert.equal(result.status, 1, result.stdout + result.stderr);
  assert.match(result.stdout, expected);
}));

test('rejects altered review evidence', () => fixture(({ put, invoke }) => {
  put(approved.report, 'PASS substituted report');
  const result = invoke(); assert.equal(result.status, 1); assert.match(result.stdout, /review evidence changed/);
}));

test('rejects removed acceptance record in strict mode', () => fixture(({ writeJson, invoke }) => {
  writeJson('reports/lq4c-20261104/acceptance.json', { ...receipt, batches: [], accepted: 2, remaining: 518 });
  const result = invoke(); assert.equal(result.status, 1); assert.match(result.stdout, /independent review pending/);
}));


test('rejects false qualification-complete receipt', () => fixture(({ writeJson, invoke }) => {
  writeJson('reports/lq4c-20261104/acceptance.json', { ...receipt, status: 'PUBLIC_COMPLETE', accepted: 520, remaining: 0, batches: [approved] });
  const result = invoke(); assert.equal(result.status, 1); assert.match(result.stdout, /must remain partial/);
}));

test('rejects invented reviewed hash even when it is 64 hex characters', () => fixture(({ writeJson, invoke }) => {
  writeJson('reports/lq4c-20261104/acceptance.json', { ...receipt, batches: [{ ...approved, reviewedFileSha256: '0'.repeat(64) }], accepted: 7, remaining: 513 });
  const result = invoke(); assert.equal(result.status, 1); assert.match(result.stdout, /reviewed snapshot hash mismatch/);
}));

test('rejects changed explanation even if current and semantic hashes are recomputed', () => fixture(({ questionData, writeJson, invoke }) => {
  questionData.questions[0].explanation += 'Altered explanation';
  const bytes = JSON.stringify(questionData, null, 2) + '\n';
  writeJson(candidatePath, questionData);
  const hash = value => createHash('sha256').update(value).digest('hex');
  const semantic = questionData.questions.map(q => Object.fromEntries(Object.entries(q).filter(([k]) => !['needsIndependentReview', 'publicGo', 'contentReview'].includes(k))));
  writeJson('reports/lq4c-20261104/acceptance.json', { ...receipt, batches: [{ ...approved, sha256: hash(bytes), semanticSha256: hash(JSON.stringify(semantic)) }], accepted: 7, remaining: 513 });
  const result = invoke(); assert.equal(result.status, 1); assert.match(result.stdout, /content differs from reviewed snapshot/);
}));
