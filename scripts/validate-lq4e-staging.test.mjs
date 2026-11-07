import { test } from 'node:test';
import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { mkdtempSync, mkdirSync, readFileSync, writeFileSync, rmSync, cpSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { resolve, join, sep } from 'node:path';
import { spawnSync } from 'node:child_process';
import { engineerNumbering } from './lq4e-numbering.mjs';

const repo = resolve(import.meta.dirname, '..');
const candidate = 'data/qualification-staging/lq4e-engineer-first/2024-mechanical-figures.json';
const sha = v => createHash('sha256').update(v).digest('hex');
const semantic = d => d.questions.map(q => Object.fromEntries(Object.entries(q).filter(([k]) => !['needsIndependentReview', 'publicGo', 'contentReview'].includes(k))));
function fixture(run) {
  const tempRoot = resolve(tmpdir());
  const dir = mkdtempSync(join(tempRoot, 'lq4e-validator-'));
  const put = (path, value) => { mkdirSync(resolve(dir, path, '..'), { recursive:true }); writeFileSync(resolve(dir, path), value); };
  const writeJson = (path, value) => put(path, JSON.stringify(value, null, 2) + '\n');
  try {
    for (const p of ['scripts/validate-lq4e-staging.mjs', 'scripts/lq4e-numbering.mjs', 'scripts/lq4e-review-evidence.mjs', 'scripts/accept-lq4e-batch.mjs', 'reports/lq4e-20261104/render-figures.py', 'reports/lq4b-20261104/source-inventory.json', 'reports/lq4b-20261104/official-answer-index.json']) put(p, readFileSync(resolve(repo, p)));
    for (const d of ['lq4b-engineer-first','lq4c-engineer-first']) cpSync(resolve(repo,'data/qualification-staging',d),resolve(dir,'data/qualification-staging',d),{recursive:true});
    const data = JSON.parse(readFileSync(resolve(repo, candidate), 'utf8'));
    const report = 'reports/lq4e-20261104/fixture-review.md';
    const snapshot = 'reports/lq4e-20261104/reviewed-manuscripts/fixture.json';
    for (const q of data.questions) for (const f of q.figures ?? []) put(f.path, readFileSync(resolve(repo, f.path)));
    const reviewedBytes = JSON.stringify(data, null, 2) + '\n';
    const prompt='reports/lq4e-20261104/fixture-prompt.txt', rawLog='reports/lq4e-20261104/fixture-raw.log', execution='reports/lq4e-20261104/fixture-execution.json';
    const reportText=`PASS\nSynthetic mutation-test evidence. Reviewed snapshot ${sha(reviewedBytes)}\n`;
    put(snapshot, reviewedBytes); put(report, reportText);put(prompt,'Synthetic test prompt');put(rawLog,`OpenAI Codex v0.166.0\n--------\nmodel: gpt-6-astra\n--------\nuser\nSynthetic prompt\ncodex\n${reportText}\ntokens used\n123\n${reportText}`);
    writeJson(execution,{modelCommand:'C:/Users/kanet/AppData/Roaming/npm/codex.cmd exec -m gpt-6-astra',arguments:['gpt-6-astra','-s','read-only','-C',dir,'--color','never','-o',report,'-'],exitCode:0,prompt,promptSha256:sha(readFileSync(resolve(dir,prompt))),report,reportSha256:sha(reportText),rawLog,rawLogSha256:sha(readFileSync(resolve(dir,rawLog)))});
    data.status = 'PARTIAL_CONTENT_ACCEPTED_NOT_REGISTERED';
    for (const q of data.questions) { q.needsIndependentReview = false; q.contentReview = { status:'PASS', model:'gpt-6-astra', report }; }
    writeJson(candidate, data);
    const batch = { path:candidate,status:'PASS',model:'gpt-6-astra',sha256:sha(JSON.stringify(data,null,2)+'\n'),semanticSha256:sha(JSON.stringify(semantic(data))),reviewedSnapshot:snapshot,reviewedFileSha256:sha(reviewedBytes),report,reportSha256:sha(readFileSync(resolve(dir,report))),execution,executionSha256:sha(readFileSync(resolve(dir,execution))),originals:data.questions.length,questionIds:data.questions.map(q=>q.id) };
    const receipt = {status:'PARTIAL_CONTENT_ACCEPTED_NOT_REGISTERED',qualification:'gijutsushi1-kikai',baselineAccepted:30,expected:160,newAccepted:data.questions.length,accepted:30+data.questions.length,remaining:130-data.questions.length,batches:[batch]};
    writeJson('reports/lq4e-20261104/acceptance.json',receipt);
    const invoke = () => spawnSync(process.execPath,[resolve(dir,'scripts/validate-lq4e-staging.mjs'),'--require-reviewed'],{encoding:'utf8'});
    run({dir,data,batch,receipt,put,writeJson,invoke});
  } finally {
    assert.ok(resolve(dir).startsWith(tempRoot + sep + 'lq4e-validator-'));
    rmSync(dir,{recursive:true,force:true});
  }
}
test('basis numbering covers exactly the official five groups of six',()=>{
  const official=JSON.parse(readFileSync(resolve(repo,'reports/lq4b-20261104/official-answer-index.json'),'utf8')).records;
  for(const year of [2024,2025]) {
    const expected=new Set(official.filter(q=>q.year===year&&q.subject==='basis').map(q=>q.printedNumber));
    assert.deepEqual(new Set(Array.from({length:30},(_,i)=>engineerNumbering('basis',i+1).official)),expected);
  }
  assert.equal(engineerNumbering('basis',31),null); assert.equal(engineerNumbering('mechanical',36),null);
  assert.equal(engineerNumbering('basis',0),null); assert.equal(engineerNumbering('mechanical',1.5),null);
});
test('accepts exact reviewed mechanical originals including null scoring exception',()=>fixture(({invoke})=>{
  const r=invoke(); assert.equal(r.status,0,r.stdout+r.stderr); assert.equal(JSON.parse(r.stdout).accepted,22);
}));
for (const [name,mutate,expected] of [
  ['wrong mechanical printed prefix',d=>{d.questions[0].printedNumber='Ⅱ－1';},/printed number mismatch/],
  ['invented normal answer for official exception',d=>{d.questions.find(q=>q.questionNumber===28).officialAnswer=3;},/answer\/scoring exception mismatch/],
  ['removed scoring exception',d=>{d.questions.find(q=>q.questionNumber===28).scoringException=null;},/answer\/scoring exception mismatch/],
  ['wrong official normal answer',d=>{d.questions[0].officialAnswer=1;},/answer\/scoring exception mismatch/],
  ['duplicate question',d=>{d.questions.push(structuredClone(d.questions[0]));},/duplicate original/],
  ['missing option explanation',d=>{delete d.questions[0].choiceExplanations['5'];},/incomplete choiceExplanations/],
  ['missing required figure',d=>{d.questions[0].figures=[];},/required figure missing/],
  ['encoding corruption',d=>{d.questions[0].questionText='????';},/encoding corruption/],
  ['accidental publication',d=>{d.questions[0].publicGo=true;},/remain unpublished/],
  ['wrong source page',d=>{d.questions[0].sourceQuestionPage=999;},/question provenance mismatch/],
]) test(`rejects ${name}`,()=>fixture(({data,writeJson,invoke})=>{
  mutate(data); writeJson(candidate,data); const r=invoke(); assert.equal(r.status,1); assert.match(r.stdout,expected);
}));
test('rejects explanation changes even with recomputed file and semantic hashes',()=>fixture(({data,batch,receipt,writeJson,invoke})=>{
  data.questions[0].explanation+='Changed'; writeJson(candidate,data);
  batch.sha256=sha(JSON.stringify(data,null,2)+'\n'); batch.semanticSha256=sha(JSON.stringify(semantic(data)));
  writeJson('reports/lq4e-20261104/acceptance.json',receipt);
  const r=invoke(); assert.equal(r.status,1); assert.match(r.stdout,/differs from reviewed snapshot/);
}));
test('rejects altered figure',()=>fixture(({data,put,invoke})=>{
  put(data.questions[0].figures[0].path,'substitution'); const r=invoke(); assert.equal(r.status,1); assert.match(r.stdout,/figure hash mismatch/);
}));
test('rejects altered review report',()=>fixture(({batch,put,invoke})=>{
  put(batch.report,'FAIL\nSubstituted report'); const r=invoke(); assert.equal(r.status,1); assert.match(r.stdout,/review report changed/); assert.match(r.stdout,/does not start with PASS/);
}));
test('rejects altered reviewed snapshot',()=>fixture(({batch,put,invoke})=>{
  put(batch.reviewedSnapshot,'{}'); const r=invoke(); assert.notEqual(r.status,0);
}));
test('rejects false qualification completion',()=>fixture(({receipt,writeJson,invoke})=>{
  receipt.status='COMPLETE';receipt.accepted=160;receipt.remaining=0;writeJson('reports/lq4e-20261104/acceptance.json',receipt);
  const r=invoke();assert.equal(r.status,1);assert.match(r.stdout,/remain partial/);assert.match(r.stdout,/totals mismatch/);
}));
test('rejects missing acceptance record',()=>fixture(({receipt,writeJson,invoke})=>{
  receipt.batches=[];writeJson('reports/lq4e-20261104/acceptance.json',receipt);
  const r=invoke();assert.equal(r.status,1);assert.match(r.stdout,/independent review pending/);
}));
test('rejects substituted current content and snapshot with all local content hashes recomputed',()=>fixture(({data,batch,receipt,writeJson,invoke})=>{
  data.questions[0].explanation+='Substituted';writeJson(candidate,data);writeJson(batch.reviewedSnapshot,data);
  batch.sha256=sha(JSON.stringify(data,null,2)+'\n');batch.semanticSha256=sha(JSON.stringify(semantic(data)));batch.reviewedFileSha256=batch.sha256;
  writeJson('reports/lq4e-20261104/acceptance.json',receipt);
  const r=invoke();assert.equal(r.status,1);assert.match(r.stdout,/report does not attest reviewed snapshot/);
}));
test('rejects missing raw execution evidence',()=>fixture(({batch,put,invoke})=>{
  put(batch.execution,'{}');const r=invoke();assert.equal(r.status,1);assert.match(r.stdout,/review rawLog missing/);
}));
test('rejects altered prompt even when manuscript is unchanged',()=>fixture(({put,invoke})=>{
  put('reports/lq4e-20261104/fixture-prompt.txt','Changed');const r=invoke();assert.equal(r.status,1);assert.match(r.stdout,/prompt hash mismatch/);
}));
test('acceptance rejects duplicate inputs before any write',()=>fixture(({dir})=>{
  const before=readFileSync(resolve(dir,'reports/lq4e-20261104/acceptance.json'));
  const r=spawnSync(process.execPath,[resolve(dir,'scripts/accept-lq4e-batch.mjs'),'5','2024-mechanical-figures.json','2024-mechanical-figures.json'],{cwd:dir,encoding:'utf8'});
  assert.notEqual(r.status,0);assert.match(r.stderr,/Duplicate input/);assert.deepEqual(readFileSync(resolve(dir,'reports/lq4e-20261104/acceptance.json')),before);
}));
test('renderer refuses accepted manuscript without modifying assets',()=>fixture(({dir,data})=>{
  const asset=resolve(dir,data.questions[0].figures[0].path),before=readFileSync(asset);
  const r=spawnSync('python',[resolve(dir,'reports/lq4e-20261104/render-figures.py'),candidate],{cwd:dir,encoding:'utf8'});
  assert.notEqual(r.status,0);assert.match(r.stderr,/Only unpublished LQ4E drafts/);assert.deepEqual(readFileSync(asset),before);
}));
test('renderer rejects LQ4D output before any write',()=>fixture(({dir,data,writeJson,put})=>{
  data.status='DRAFT_PENDING_INDEPENDENT_REVIEW';for(const q of data.questions){q.needsIndependentReview=true;delete q.contentReview;}
  const protectedPath='data/qualification-staging/lq4c-biru-kan/protected.png';put(protectedPath,'protected');
  data.questions[0].figures[0].path=protectedPath;writeJson(candidate,data);
  const r=spawnSync('python',[resolve(dir,'reports/lq4e-20261104/render-figures.py'),candidate],{cwd:dir,encoding:'utf8'});
  assert.notEqual(r.status,0);assert.match(r.stderr,/outside exclusive LQ4E/);assert.equal(readFileSync(resolve(dir,protectedPath),'utf8'),'protected');
}));
test('rejects quoted model and report when real header and final result differ',()=>fixture(({dir,batch,receipt,put,writeJson,invoke})=>{
  const e=JSON.parse(readFileSync(resolve(dir,batch.execution),'utf8'));
  const report=readFileSync(resolve(dir,batch.report),'utf8');
  put(e.rawLog,`OpenAI Codex v0.166.0\n--------\nmodel: other-model\n--------\nuser\nmodel: gpt-6-astra\n${report}\ntokens used\n123\nFAIL\n`);
  e.rawLogSha256=sha(readFileSync(resolve(dir,e.rawLog)));writeJson(batch.execution,e);batch.executionSha256=sha(readFileSync(resolve(dir,batch.execution)));writeJson('reports/lq4e-20261104/acceptance.json',receipt);
  const r=invoke();assert.equal(r.status,1);assert.match(r.stdout,/does not attest model and final report/);
}));
test('rejects overriding model in execution args',()=>fixture(({dir,batch,receipt,writeJson,invoke})=>{
  const e=JSON.parse(readFileSync(resolve(dir,batch.execution),'utf8'));e.arguments.push('-m','other-model');writeJson(batch.execution,e);batch.executionSha256=sha(readFileSync(resolve(dir,batch.execution)));writeJson('reports/lq4e-20261104/acceptance.json',receipt);
  const r=invoke();assert.equal(r.status,1);assert.match(r.stdout,/model\/report execution mismatch/);
}));
test('renderer rejects a new draft targeting already accepted assets',()=>fixture(({dir,data,writeJson})=>{
  data.status='DRAFT_PENDING_INDEPENDENT_REVIEW';for(const q of data.questions){q.needsIndependentReview=true;delete q.contentReview;}
  const draft='data/qualification-staging/lq4e-engineer-first/new-draft.json';writeJson(draft,data);
  const asset=resolve(dir,data.questions[0].figures[0].path),before=readFileSync(asset);
  const r=spawnSync('python',[resolve(dir,'reports/lq4e-20261104/render-figures.py'),draft],{cwd:dir,encoding:'utf8'});
  assert.notEqual(r.status,0);assert.match(r.stderr,/belongs to accepted manuscript/);assert.deepEqual(readFileSync(asset),before);
}));
