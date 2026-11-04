import fs from 'node:fs/promises';
import assert from 'node:assert/strict';

const [beforePhase = 'before-v5', afterPhase = 'after-v5'] = process.argv.slice(2);
for (const phase of [beforePhase, afterPhase]) assert.match(phase, /^(before|after)-[a-z0-9-]+$/);
const before = JSON.parse(await fs.readFile(`.cache/kux1/${beforePhase}/summary.json`, 'utf8'));
const after = JSON.parse(await fs.readFile(`.cache/kux1/${afterPhase}/summary.json`, 'utf8'));
for (const key of ['scriptSha256', 'browser', 'node', 'viewport', 'cpuSlowdown', 'runs', 'selection', 'readingPauseMs', 'environment', 'storage', 'network', 'workload']) assert.deepEqual(before.provenance[key], after.provenance[key], `Provenance ${key} must match`);
assert.equal(before.provenance.selection, 'all');
assert.equal(before.samples.length, 81);
assert.equal(after.samples.length, 81);
const keyOf = sample => `${sample.route}:${sample.run}`;
const paired = new Map(after.samples.map(sample => [keyOf(sample), sample]));
assert.equal(paired.size, 81);
for (const sample of before.samples) {
  const other = paired.get(keyOf(sample));
  assert.ok(other);
  for (const key of ['url', 'questionId', 'questionUiSha256', 'choiceLabels', 'selectedChoice', 'seed', 'tapsToQuestion', 'tapsToAnswer']) assert.deepEqual(sample[key], other[key], `${keyOf(sample)} ${key} must match`);
  for (const value of [sample, other]) {
    assert.deepEqual(value.ai, []);
    assert.deepEqual(value.errors, []);
    assert.deepEqual(value.dialogs, []);
  }
}
const median = values => [...values].sort((a, b) => a - b)[Math.floor(values.length / 2)];
function summarize(samples) {
  assert.equal(samples.length, 3);
  return {
    tapsToQuestion: samples[0].tapsToQuestion, tapsToAnswer: samples[0].tapsToAnswer,
    questionId: samples[0].questionId,
    readySeconds: median(samples.map(s => s.readyMs)) / 1000,
    answerSeconds: median(samples.map(s => s.answeredMs)) / 1000,
    answerSecondsRange: [Math.min(...samples.map(s => s.answeredMs)) / 1000, Math.max(...samples.map(s => s.answeredMs)) / 1000],
    explanationMs: median(samples.map(s => s.explanationMs)),
    ctaY: samples[0].ctaY,
    scrollY: median(samples.map(s => s.scrollBeforeAnswer)),
    achievementToasts: samples.filter(s => s.achievementToast !== null).length,
    swipeHints: samples.filter(s => s.swipeHint).length,
    adSlots: [...new Set(samples.map(s => s.ads))],
    overlays: [...new Set(samples.flatMap(s => s.overlays))],
  };
}
const routes = [...new Set(before.samples.map(s => s.route))];
assert.equal(routes.length, 27);
const rows = routes.map(route => ({ route, url: before.samples.find(s => s.route === route).url,
  before: summarize(before.samples.filter(s => s.route === route)), after: summarize(after.samples.filter(s => s.route === route)) }));
const comparison = { beforePhase, afterPhase, pairedSamples: 81, provenance: { before: before.provenance, after: after.provenance }, rows };
await fs.writeFile('.cache/kux1/comparison.json', JSON.stringify(comparison, null, 2));
console.log(JSON.stringify({ pairedSamples: 81, routes: 27, questionAndOrderedInputsMatch: true, output: '.cache/kux1/comparison.json' }));
