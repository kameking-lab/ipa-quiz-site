import fs from 'node:fs';
import path from 'node:path';
import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { execFileSync } from 'node:child_process';

const out = 'reports/int8-20261105';
const hash = bytes => createHash('sha256').update(bytes).digest('hex');
const read = name => JSON.parse(fs.readFileSync(path.join(out, name), 'utf8'));
const labels = ['typecheck-final', 'lint-final', 'test-final', 'validate', 'build', 'e2e-final', 'gates', 'safety', 'government', 'integration-audit', 'visual', 'qa-lint'];
const checks = labels.map(label => {
  const result = read(`${label}.result.json`);
  assert.equal(result.code, 0, label);
  assert.equal(hash(fs.readFileSync(path.join(out, `${label}.log`))), result.logSha256, label + ' log changed');
  return result;
});
const build = checks.find(c => c.label === 'build');
for (const label of ['typecheck-final', 'lint-final', 'test-final', 'e2e-final', 'visual']) assert.equal(checks.find(c => c.label === label).sourceHash, build.sourceHash, label + ' application source differs');
const diff = execFileSync('git', ['diff', build.baseHead, '--', 'app', 'components', 'lib', 'data', 'prisma', 'mobile', 'scripts', 'package.json', 'pnpm-lock.yaml', 'next.config.ts', 'eslint.config.mjs'], { maxBuffer: 32 * 1024 * 1024 });
assert.equal(hash(diff), build.sourceHash, 'Application changed after build');
const builds = fs.readdirSync(out).filter(n => n.endsWith('.result.json')).map(n => {
  try { return read(n); } catch { return null; }
}).filter(r => r?.label === 'build');
assert.equal(builds.length, 1, 'Exactly one local build');
const unit = read('test-final.json');
assert.equal(unit.success, true);
assert.equal(unit.numFailedTests, 0);
assert.equal(unit.numFailedTestSuites, 0);
const e2eLog = fs.readFileSync(path.join(out, 'e2e-final.log'), 'utf8');
const count = label => Number(e2eLog.match(new RegExp(`^\\s+(\\d+) ${label}`, 'm'))?.[1] ?? 0);
const e2e = { passed: count('passed'), skipped: count('skipped'), flaky: count('flaky'), failed: count('failed') };
assert.equal(e2e.failed, 0);
assert.equal(e2e.passed + e2e.skipped + e2e.flaky, 433);
const visual = read('visual-receipt.json');
assert.equal(visual.screenshots.length, 27);
const screenshots = visual.screenshots.map(s => {
  assert.equal(s.overflow, false); assert.deepEqual(s.errors, []); assert.deepEqual(s.ai, []);
  return { ...s, sha256: hash(fs.readFileSync(path.join(out, 'screenshots', s.name + '.png'))) };
});
const manifest = read('source-manifest.json');
const roots = ['app', 'components', 'lib', 'data', 'mobile', 'prisma', 'scripts', 'package.json', 'pnpm-lock.yaml', 'next.config.ts', 'eslint.config.mjs', 'playwright.config.ts', 'middleware.ts', '__tests__', 'tests'];
const gitPaths = args => execFileSync('git', args, { encoding: 'utf8' }).trim().split(/\r?\n/).filter(Boolean);
const currentPaths = [...new Set([...gitPaths(['diff', build.baseHead, '--name-only', '--', ...roots]), ...gitPaths(['ls-files', '--others', '--exclude-standard', '--', ...roots])])].sort();
const before = new Map(manifest.files.map(f => [f.path, f.sha256]));
const changedAfterFreeze = currentPaths.filter(file => hash(fs.readFileSync(file)) !== before.get(file));
assert.deepEqual(changedAfterFreeze, ['__tests__/billing/QuizClient.quiet.test.tsx', '__tests__/streak/practice-quiet.test.tsx', 'tests/e2e/contact-site.spec.ts']);
const finalFiles = currentPaths.map(file => ({ path: file, sha256: hash(fs.readFileSync(file)) }));
fs.writeFileSync(path.join(out, 'source-manifest-final.json'), JSON.stringify({ ...manifest, files: finalFiles, aggregate: hash(JSON.stringify(finalFiles)), changedAfterFreeze }, null, 2) + '\n');
const skippedUnits = unit.testResults.flatMap(suite => suite.assertionResults.filter(t => ['pending', 'skipped', 'todo'].includes(t.status)).map(t => ({ file: path.relative(process.cwd(), suite.name), title: t.fullName, status: t.status })));
const receipt = { timestamp: new Date().toISOString(), buildId: build.buildId, localBuildCount: builds.length, applicationSourceHash: build.sourceHash, checks, unit: { total: unit.numTotalTests, passed: unit.numPassedTests, pending: unit.numPendingTests, failed: unit.numFailedTests, skipped: skippedUnits }, e2e, screenshots, applicationChangedAfterBuild: false, changedAfterFreeze, productionDatabaseAccessed: false, realAiCalled: false, realSupportSent: false };
fs.writeFileSync(path.join(out, 'final-validation.json'), JSON.stringify(receipt, null, 2) + '\n');
console.log(JSON.stringify({ buildId: receipt.buildId, localBuildCount: receipt.localBuildCount, unit: { ...receipt.unit, skipped: skippedUnits.length }, e2e, screenshots: screenshots.length, applicationChangedAfterBuild: false }));
