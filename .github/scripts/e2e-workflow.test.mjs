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
