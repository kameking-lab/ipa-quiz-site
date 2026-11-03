import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { createHash } from 'node:crypto';
import { validatePilot } from './validate.mjs';
const raw=readFileSync(new URL('./pilot.json',import.meta.url));
const gate=JSON.parse(readFileSync(new URL('./gate.json',import.meta.url),'utf8'));
function changed(change) { const d=JSON.parse(raw); change(d); const r=Buffer.from(JSON.stringify(d)); return [r,{...gate,candidateSha256:createHash('sha256').update(r).digest('hex')}]; }
test('frozen pilot validates while publication remains blocked',()=>assert.equal(validatePilot(raw,gate).publicAllowed,false));
test('one-byte source change loses review binding',()=>assert.throws(()=>validatePilot(Buffer.concat([raw,Buffer.from(' ')]),gate),/HASH_MISMATCH/));
test('cannot enable publication by flipping data flag',()=>assert.throws(()=>validatePilot(...changed(d=>d.publicAllowed=true)),/UNAPPROVED_RELEASE/));
test('cannot expand independently reviewed question scope',()=>assert.throws(()=>validatePilot(...changed(d=>d.questions.push({...d.questions[0],id:'hokenshi-112-am-q3'}))),/UNREVIEWED_SCOPE/));
test('each wrong choice also requires an explanation',()=>assert.throws(()=>validatePilot(...changed(d=>d.questions[0].choiceExplanations[0]='')),/MISSING_CHOICE_EXPLANATION/));
test('zero is not a valid official answer',()=>assert.throws(()=>validatePilot(...changed(d=>d.questions[0].officialAnswer=[0])),/INVALID_ANSWER/));
test('missing independent review fails closed',()=>assert.throws(()=>validatePilot(raw,{...gate,independentAllChoiceReviewStatus:null}),/INDEPENDENT_REVIEW_MISSING/));
test('self-review cannot replace final review hold',()=>assert.throws(()=>validatePilot(...changed(d=>d.questions[0].needsReview=false)),/MISSING_PRIMARY_OR_FINAL_HOLD/));
