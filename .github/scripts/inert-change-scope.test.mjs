import assert from 'node:assert/strict';
import { execFileSync, spawnSync } from 'node:child_process';
import { mkdirSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { dirname, join } from 'node:path';
import { test } from 'node:test';
import { classifyChanges, dependencySnapshot, githubDecision, isInertPath, vercelDecision } from './inert-change-scope.mjs';

function fixture(t) {
  const cwd = mkdtempSync(join(tmpdir(), 'inert-scope-'));
  t.after(() => rmSync(cwd, { recursive: true, force: true }));
  const git = (...args) => execFileSync('git', args, { cwd, encoding: 'utf8', stdio: ['ignore', 'pipe', 'pipe'] }).trim();
  git('init', '-q');
  git('config', 'user.name', 'Scope Test');
  git('config', 'user.email', 'scope-test@example.invalid');
  git('config', 'core.autocrlf', 'false');
  git('config', 'commit.gpgsign', 'false');
  const write = (path, content = 'record\n') => {
    mkdirSync(dirname(join(cwd, path)), { recursive: true });
    writeFileSync(join(cwd, path), content);
  };
  write('package.json', '{"scripts":{"build":"next build"}}\n');
  write('app/page.tsx', 'export default function Page() { return null; }\n');
  write('lib/reader.ts', 'import fs from "node:fs"; const file = "data/papers/a.json";\n');
  write('reports/audit.json', '{}\n');
  const commit = () => {
    // Only the disposable fixture uses -A, never a shared checkout.
    git('add', '-A'); git('commit', '-qm', 'Fixture'); return git('rev-parse', 'HEAD');
  };
  const base = commit();
  const audit = { version: 1, ...dependencySnapshot(cwd, base) };
  return { cwd, git, write, commit, base, audit, classify: head => classifyChanges({ cwd, base, head, audit }) };
}

test('ordinary non-code records qualify and lookalikes/code/assets do not', () => {
  for (const path of ['reports/ops/run.json', 'reports/a.md', 'docs/evidence/exam/receipt.json',
    'docs/candidates/exam/README.md', 'reports/a.csv', 'reports/a.jsonl']) assert.equal(isInertPath(path), true);
  for (const path of ['reports-other/a.json', 'Reports/a.json', 'reports/../app/a.json',
    'reports//a.json', 'reports/.config/a.json', 'reports/a\\b.json', 'reports/a.json\n',
    'reports/email-list.jsonl', 'docs/evidence/email-list.jsonl', 'reports/a.png', 'docs/evidence/a.pdf', 'docs/candidates/a.ts', 'reports/a.mjs', 'reports/a.mts']) {
    assert.equal(isInertPath(path), false, path);
  }
});
test('complete non-code record diff is eligible', t => {
  const f = fixture(t);
  for (const path of ['reports/b.json', 'docs/evidence/exam/receipt.json', 'docs/candidates/exam/README.md']) f.write(path);
  assert.equal(f.classify(f.commit()).inert, true);
});
for (const path of ['app/page.tsx', 'lib/loader.ts', 'data/questions/exam.json', 'data/prepared/a.json',
  'public/a.png', 'reports/email-list.jsonl', 'docs/evidence/email-list.jsonl', 'reports/a.png', 'docs/evidence/a.pdf', 'docs/candidates/a.ts',
  '__tests__/audit.test.ts', 'docs/guide.md', 'pnpm-lock.yaml', 'next.config.ts', '.github/workflows/e2e.yml']) {
  test(`runtime, prepared, tests or config requires full checks: ${path}`, t => {
    const f = fixture(t); f.write(path); f.write('reports/b.json');
    assert.equal(f.classify(f.commit()).inert, false);
  });
}
test('cumulative PR cannot hide an earlier app change behind the last record-only commit', t => {
  const f = fixture(t); f.write('app/page.tsx', 'export default 1;\n'); const appHead = f.commit();
  f.write('reports/b.json'); const head = f.commit();
  assert.equal(classifyChanges({ ...f, base: appHead, head }).inert, true, 'last-commit diff alone would be unsafe');
  assert.equal(githubDecision({ GITHUB_EVENT_NAME: 'pull_request', SCOPE_BASE_SHA: f.base,
    SCOPE_HEAD_SHA: head }, f.cwd, f.audit).inert, false);
});
test('preview includes all changes since last successful deployment', t => {
  const f = fixture(t); f.write('data/questions/a.json'); f.commit();
  f.write('reports/b.json'); const head = f.commit();
  assert.equal(vercelDecision({ VERCEL_ENV: 'preview', VERCEL_GIT_PREVIOUS_SHA: f.base,
    VERCEL_GIT_COMMIT_SHA: head }, f.cwd, f.audit).inert, false);
});
test('eligible PR/preview decisions; production/main always validate', t => {
  const f = fixture(t); f.write('reports/b.json'); const head = f.commit();
  const pr = { GITHUB_EVENT_NAME: 'pull_request', SCOPE_BASE_SHA: f.base, SCOPE_HEAD_SHA: head };
  const preview = { VERCEL_ENV: 'preview', VERCEL_GIT_PREVIOUS_SHA: f.base, VERCEL_GIT_COMMIT_SHA: head };
  assert.equal(githubDecision(pr, f.cwd, f.audit).inert, true);
  assert.equal(vercelDecision(preview, f.cwd, f.audit).inert, true);
  assert.equal(githubDecision({ ...pr, SCOPE_HEAD_SHA: f.base }, f.cwd, f.audit).inert, false);
  assert.equal(vercelDecision({ ...preview, VERCEL_GIT_COMMIT_SHA: f.base }, f.cwd, f.audit).inert, false);
  for (const event of ['push', 'workflow_dispatch', undefined]) {
    assert.equal(githubDecision({ ...pr, GITHUB_EVENT_NAME: event }, f.cwd, f.audit).inert, false);
  }
  for (const env of ['production', 'development', undefined]) {
    assert.equal(vercelDecision({ ...preview, VERCEL_ENV: env }, f.cwd, f.audit).inert, false);
  }
});
test('empty diffs/redeploys, missing/truncated refs and unknown audit require build', t => {
  const f = fixture(t);
  for (const base of [undefined, 'HEAD^', 'a'.repeat(40), f.base]) {
    assert.equal(classifyChanges({ ...f, base, head: f.base }).inert, false);
  }
  f.write('reports/b.json'); const head = f.commit();
  assert.equal(classifyChanges({ ...f, head, audit: { version: 99 } }).inert, false);
  assert.equal(vercelDecision({ VERCEL_ENV: 'preview', VERCEL_GIT_COMMIT_SHA: head }, f.cwd, f.audit).inert, false);
});
test('non-ancestor previews build', t => {
  const f = fixture(t);
  f.git('checkout', '--orphan', 'unrelated'); f.write('reports/b.json'); const head = f.commit();
  assert.equal(vercelDecision({ VERCEL_ENV: 'preview', VERCEL_GIT_PREVIOUS_SHA: f.base,
    VERCEL_GIT_COMMIT_SHA: head }, f.cwd, f.audit).inert, false);
});
test('rename from records to application paths is not exempt', t => {
  const f = fixture(t); f.git('mv', 'reports/audit.json', 'app/audit.json');
  assert.equal(f.classify(f.commit()).inert, false);
});
test('regular deletion qualifies; executable and symlink records do not', t => {
  const f = fixture(t); f.git('rm', 'reports/audit.json');
  assert.equal(f.classify(f.commit()).inert, true);
  f.write('reports/b.json'); f.git('add', 'reports/b.json');
  f.git('update-index', '--chmod=+x', 'reports/b.json');
  f.git('commit', '-qm', 'Executable record');
  assert.equal(f.classify(f.git('rev-parse', 'HEAD')).inert, false);
  const blob = f.git('rev-parse', 'HEAD:reports/b.json');
  f.git('update-index', '--add', '--cacheinfo', `120000,${blob},reports/link.json`);
  f.git('commit', '-qm', 'Symlink record');
  assert.equal(f.classify(f.git('rev-parse', 'HEAD')).inert, false);
});
for (const [path, content] of [
  ['lib/reader.ts', 'import fs from "node:fs"; fs.readFileSync("reports/audit.json");\n'],
  ['helpers/reader.ts', 'import fs from "node:fs"; fs.readFileSync("reports/audit.json");\n'],
  ['lib/new.ts', 'import record from "../reports/audit.json";\n'],
  ['app/globals.css', '@import "../reports/style.txt";\n'],
  ['data/questions/reader.ts', 'const load = () => import("../reports/audit.json");\n'],
  ['package.json', '{"scripts":{"build":"node scripts/load-reports.mjs"}}\n'],
  ['next.config.ts', 'export default { outputFileTracingIncludes: {"/*":["reports/**"]} };\n'],
]) {
  test(`consumer/config drift disables later record-only exemption: ${path}`, t => {
    const f = fixture(t); f.write(path, content); const base = f.commit();
    f.write('reports/b.json'); const head = f.commit();
    assert.equal(classifyChanges({ ...f, base, head }).inert, false);
  });
}
test('actual CLI continues production/first previews and ignores only proven preview records', t => {
  const f = fixture(t); f.write('reports/b.json'); const head = f.commit();
  const script = join(f.cwd, '.github/scripts/inert-change-scope.mjs');
  f.write('.github/scripts/inert-change-scope.mjs',
    readFileSync(new URL('./inert-change-scope.mjs', import.meta.url), 'utf8'));
  f.write('.github/scripts/inert-change-audit.json', JSON.stringify(f.audit));
  const preview = { VERCEL_ENV: 'preview', VERCEL_GIT_PREVIOUS_SHA: f.base, VERCEL_GIT_COMMIT_SHA: head };
  for (const [env, status] of [[preview, 0], [{ ...preview, VERCEL_ENV: 'production' }, 1],
    [{ ...preview, VERCEL_GIT_PREVIOUS_SHA: '' }, 1], [{ ...preview, VERCEL_GIT_PREVIOUS_SHA: head }, 1]]) {
    const r = spawnSync(process.execPath, [script, 'vercel'], { cwd: f.cwd,
      env: { ...process.env, ...env }, encoding: 'utf8' });
    assert.ifError(r.error); assert.equal(r.status, status, r.stdout + r.stderr);
  }
});
test('workflow scope is tested, quality remains unconditional and Vercel cron is preserved', () => {
  const workflow = readFileSync(new URL('../workflows/e2e.yml', import.meta.url), 'utf8').replaceAll('\r\n', '\n');
  const browser = workflow.split('  browser:')[1].split('  e2e:')[0];
  assert.match(browser, /fetch-depth: 2/);
  assert.match(browser, /SCOPE_BASE_SHA: \$\{\{ github\.event\.pull_request\.base\.sha \}\}/);
  assert.match(browser, /SCOPE_HEAD_SHA: \$\{\{ github\.sha \}\}/);
  assert.match(browser, /node --test \.github\/scripts\/inert-change-scope\.test\.mjs/);
  for (const step of ['Install dependencies', 'Build', 'Configure bounded APT downloads',
    'Install Playwright browsers', 'Run E2E']) {
    assert.ok(browser.includes(`- name: ${step}\n        if: steps.scope.outputs.inert != 'true'`), step);
  }
  const quality = workflow.split('  quality:')[1].split('  browser:')[0];
  assert.doesNotMatch(quality, /^        if:/m);
  for (const command of ['pnpm lint', 'pnpm typecheck', 'pnpm test',
    'validate-safety-exams.mjs --require-consultant-five-years --require-explanations',
    'validate-government-source-links.mjs --skip-live']) assert.ok(quality.includes(command));
  const vercel = JSON.parse(readFileSync(new URL('../../vercel.json', import.meta.url), 'utf8'));
  assert.equal(vercel.ignoreCommand, 'node .github/scripts/inert-change-scope.mjs vercel');
  assert.deepEqual(vercel.crons, [{ path: '/api/cron/health-check', schedule: '0 0 * * *' }]);
});
