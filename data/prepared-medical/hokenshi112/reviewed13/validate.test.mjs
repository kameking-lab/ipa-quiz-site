import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { createHash } from 'node:crypto';
import { validatePrepared } from './validate.mjs';
import { renderPrivatePreview } from './render-preview.mjs';
const read = n => readFileSync(new URL(n, import.meta.url));
const h = x => createHash('sha256').update(x).digest('hex');
const originals = () => [read('addition10.json'), read('next3.json'), JSON.parse(read('gate.json')), read('evidence.json'), read('source-policy.json'), read('../pilot.json')];
test('exact 13 additional questions keep 60 explanations and 2 existing questions separate', () => {
  const result=validatePrepared(...originals());
  assert.equal(result.additionalQuestionCount,13);assert.equal(result.additionalChoiceCount,60);assert.equal(result.totalPrivateQuestionCount,15);assert.equal(result.publicAllowed,false);
});
for (const field of ['publicAllowed','rootPublicationAuthorization','liveLearningEnabled','registryEnabled','routeEnabled','whole110Complete','twoRoundsComplete']) {
  test(`reject promoted ${field}`, () => { const a=originals();a[2][field]=true;assert.throws(()=>validatePrepared(...a),/PRIVATE_GATE_REQUIRED/); });
}
test('reject fabricated rights and exact integration approval', () => {
  for(const field of ['rightsPermissionPass','exactIntegrationIndependentReview','renderedTableMathReview']) {const a=originals();a[2][field]='selfPASS';assert.throws(()=>validatePrepared(...a),/UNAPPROVED_GATE_PROMOTION/);}
});
const mutations = [
 ['existing q2 duplicate', d=>d.questions[0].id='hokenshi-112-am-q2', /DUPLICATE/],
 ['unknown q36', d=>d.questions[0].id='hokenshi-112-am-q36', /DUPLICATE/],
 ['blank explanation', d=>d.questions[0].choiceExplanations[0]='', /MISSING_FULL/],
 ['answer change', d=>d.questions[0].officialAnswer=[1], /TRANSFORMATION/],
 ['Q25 table event omitted', d=>d.questions[5].table.rows[0].events[2]='', /TRANSFORMATION/],
 ['Q30 made-up example changed', d=>d.questions[7].authorCreatedExample.tables[0].TP=91, /TRANSFORMATION/]
];
for (const [name, mutate, expected] of mutations) test(`reject ${name} even if top payload hash is recomputed`, () => {
  const a=originals();const d=JSON.parse(a[0]);mutate(d);a[0]=Buffer.from(JSON.stringify(d));a[2].addition10Sha256=h(a[0]);assert.throws(()=>validatePrepared(...a),expected);
});
test('reject loss of second answer in next3', () => {const a=originals();const d=JSON.parse(a[1]);d.questions[1].officialAnswer=[2];a[1]=Buffer.from(JSON.stringify(d));a[2].next3Sha256=h(a[1]);assert.throws(()=>validatePrepared(...a),/TRANSFORMATION/);});
test('reject Q15 post-exam source reactivation despite updated hash',()=>{const a=originals();const p=JSON.parse(a[4]);p.q15InactiveAsExamDateAuthorities=[];a[4]=Buffer.from(JSON.stringify(p));a[2].sourcePolicySha256=h(a[4]);assert.throws(()=>validatePrepared(...a),/POST_EXAM/);});
test('preview keeps every stem/choice/reason, 14 calendar cells and two-answer instructions',()=>{
  const html=renderPrivatePreview();const {questions}=validatePrepared(...originals());
  const esc=s=>String(s).replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;').replaceAll('"','&quot;').replaceAll("'",'&#39;');
  for(const q of questions){assert.ok(html.includes(esc(q.question)));for(const s of [...q.choices,...q.choiceExplanations,...(q.explanation ? [q.explanation] : [])])assert.ok(html.includes(esc(s)));}
  assert.equal((html.match(/<td>/g)??[]).length,14);assert.equal((html.match(/<article /g)??[]).length,13);
  assert.ok(html.includes('公式正答：2・5'));assert.ok(html.includes('公式正答：2・4'));assert.ok(html.includes('χ²'));assert.ok(html.includes('体温38.0℃'));assert.ok(html.includes('TP'));assert.ok(!html.includes('href="https://www.bousai.go.jp/taisaku/keikaku/pdf/kihon_basic_plan.pdf"'));
});
