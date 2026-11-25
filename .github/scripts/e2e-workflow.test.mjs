import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { spawnSync } from 'node:child_process';
import { test } from 'node:test';

const workflow = readFileSync(new URL('../workflows/e2e.yml', import.meta.url), 'utf8');
const gate = workflow.match(/^  e2e:\r?\n[\s\S]*$/m)?.[0];
assert.ok(gate, 'The required e2e job must exist');
const script = gate.match(/node --input-type=module <<'NODE'\r?\n([\s\S]*?)\r?\n          NODE/)?.[1];
assert.ok(script, 'Exercise the actual aggregation script from the workflow');

function runGate(jobs) {
  const result = spawnSync(process.execPath, ['--input-type=module', '-e', script], {
    env: { ...process.env, JOB_RESULTS: JSON.stringify(jobs) },
    encoding: 'utf8',
  });
  assert.ifError(result.error);
  return result.status;
}

test('e2e always evaluates both required jobs without skipping on failure', () => {
  assert.match(gate, /^    name: e2e$/m);
  assert.match(gate, /^    needs: \[quality, browser\]$/m);
  assert.match(gate, /^    if: \$\{\{ always\(\) \}\}$/m);
  assert.match(gate, /^          JOB_RESULTS: \$\{\{ toJSON\(needs\) \}\}$/m);
  assert.doesNotMatch(workflow, /continue-on-error:/);
});

// GitHub's four results plus missing/unknown values must all fail closed.
const statuses = ['success', 'failure', 'skipped', 'cancelled', '', 'unknown'];
for (const quality of statuses) {
  for (const browser of statuses) {
    test(`quality=${quality || 'empty'}, browser=${browser || 'empty'}`, () => {
      assert.equal(
        runGate({ quality: { result: quality }, browser: { result: browser } }),
        quality === 'success' && browser === 'success' ? 0 : 1,
      );
    });
  }
}

for (const jobs of [
  {},
  { quality: { result: 'success' } },
  { browser: { result: 'success' } },
  { quality: {}, browser: { result: 'success' } },
  { quality: { result: 'success' }, browser: { result: 'success' }, extra: { result: 'failure' } },
]) {
  test(`missing or unexpected dependency: ${JSON.stringify(jobs)}`, () => {
    assert.equal(runGate(jobs), 1);
  });
}

test('the aggregate rejects a lookalike dependency even when every supplied job succeeds', () => {
  assert.equal(runGate({ quality: { result: 'success' }, unexpected: { result: 'success' } }), 1);
});

function job(name) {
  const section = workflow.match(new RegExp('^  ' + name + ':\\r?\\n([\\s\\S]*?)(?=^  [\\w-]+:|$(?![\\s\\S]))', 'm'));
  assert.ok(section, 'Missing workflow job: ' + name);
  return section[1];
}

for (const [aggregate, upstream, prefix, total] of [
  ['quality', 'quality-checks', 'unit', 4],
  ['browser', 'browser-build', 'browser', 6],
]) {
  test(aggregate + ' rejects a failed, cancelled, skipped or missing shard', () => {
    const jobs = [upstream, ...Array.from({ length: total }, (_, i) => prefix + '-' + (i + 1))];
    const section = job(aggregate);
    assert.ok(section.includes('needs: [' + jobs.join(', ') + ']'));
    assert.match(section, /^    if: \$\{\{ always\(\) \}\}$/m);
    const expression = section.match(/\$\{\{\s+(always\(\) && \([\s\S]+?\))\s+\}\}\r?\n\s+run: exit 1/)?.[1];
    assert.ok(expression, 'Exercise the actual failure step');
    // Dashes are valid in Actions property names. Convert to JS bracket notation.
    const fails = Function('needs', 'always', 'return (' + expression.replace(/needs\.([\w-]+)/g, 'needs["$1"]') + ')');
    const needs = Object.fromEntries(jobs.map(name => [name, { result: 'success' }]));
    assert.equal(fails(needs, () => true), false);
    for (const name of jobs) {
      for (const result of ['failure', 'cancelled', 'skipped', undefined, 'unknown']) {
        assert.equal(fails({ ...needs, [name]: { result } }, () => true), true, name);
      }
    }
    for (let i = 1; i <= total; i++) {
      assert.match(job(prefix + '-' + i), new RegExp('\\n      shard: ' + i + (prefix === 'unit' ? '/4' : '') + '\\r?\\n'));
    }
  });
}

test('the PWA suite follows the browser gate and keeps its dedicated two-browser config', () => {
  const browser = job('browser');
  assert.match(browser, /run: exit 1[\s\S]+pnpm exec playwright test --config tests\/pwa-update\.config\.ts/);
  const pwaConfig = readFileSync(new URL('../../tests/pwa-update.config.ts', import.meta.url), 'utf8');
  assert.match(pwaConfig, /name: "chromium"/);
  assert.match(pwaConfig, /name: "webkit-iphone"/);
});

test('the ID-based build download extracts to the directory that restore reads', () => {
  const shard = readFileSync(new URL('../workflows/browser-shard.yml', import.meta.url), 'utf8');
  const download = shard.match(/uses: actions\/download-artifact@v4\r?\n[\s\S]*?(?=^      - name:)/m)?.[0];
  assert.ok(download);
  assert.match(download, /artifact-ids: \$\{\{ inputs\.artifact-id \}\}/);
  assert.match(download, /path: \$\{\{ runner\.temp \}\}\/browser-build/);
  assert.match(download, /merge-multiple: true/);
  assert.match(shard, /browser-build\.sh restore "\$RUNNER_TEMP\/browser-build"/);
});

test('quality runs all three data validations after its unit and static checks pass', () => {
  let section = job('quality');
  for (const command of [
    'run: exit 1',
    'scripts/check-study-plan-policy.ts',
    'scripts/validate-safety-exams.mjs --require-consultant-five-years --require-explanations',
    'scripts/validate-government-source-links.mjs --skip-live',
  ]) {
    const at = section.indexOf(command);
    assert.ok(at >= 0, command);
    section = section.slice(at + command.length);
  }
});

// These expressions use the same operators and context properties in JS and Actions.
function evaluate(expression, github) {
  return Function('github', `"use strict"; return (${expression});`)(github);
}
const groupTemplate = workflow.match(/^  group: (.+)$/m)?.[1];
const cancelExpression = workflow.match(/^  cancel-in-progress: \$\{\{ (.+) \}\}$/m)?.[1];
assert.ok(groupTemplate);
assert.ok(cancelExpression);
function concurrency(github) {
  return {
    group: groupTemplate.replace(/\$\{\{ (.+?) \}\}/g, (_, expression) => evaluate(expression, github)),
    cancel: evaluate(cancelExpression, github),
  };
}
function context(eventName, runId, number) {
  return { workflow: 'E2E', event_name: eventName, run_id: runId, event: { pull_request: { number } } };
}

test('new heads supersede only the same PR; main runs and other workflows remain separate', () => {
  const oldPr = concurrency(context('pull_request', 101, 734));
  const newPr = concurrency(context('pull_request', 102, 734));
  const otherPr = concurrency(context('pull_request', 103, 735));
  const main1 = concurrency(context('push', 104));
  const main2 = concurrency(context('push', 105));
  assert.equal(oldPr.group, newPr.group);
  assert.equal(newPr.cancel, true);
  assert.notEqual(newPr.group, otherPr.group);
  assert.notEqual(newPr.group, main1.group);
  assert.notEqual(main1.group, main2.group);
  assert.equal(main1.cancel, false);
  assert.equal(main2.cancel, false);
  assert.notEqual(newPr.group, concurrency({ ...context('pull_request', 106, 734), workflow: 'Other' }).group);
});
