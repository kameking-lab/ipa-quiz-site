import { createHash } from 'node:crypto';
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { spawnSync } from 'node:child_process';
import { checkReviewEvidence } from './lq4e-review-evidence.mjs';
const root=resolve(import.meta.dirname,'..');
const hash=b=>createHash('sha256').update(b).digest('hex');
const json=p=>JSON.parse(readFileSync(resolve(root,p),'utf8'));
const write=(p,d)=>writeFileSync(resolve(root,p),JSON.stringify(d,null,2)+'\n');
const [review,...names]=process.argv.slice(2);
if (!/^\d+$/.test(review??'') || !names.length || names.some(n=>!/^[\w-]+\.json$/.test(n))) throw new Error('Usage: accept-lq4e-batch.mjs review-number manuscript.json ...');
if (new Set(names.map(n=>n.toLowerCase())).size!==names.length) throw new Error('Duplicate input manuscript');
const base='reports/lq4e-20261104';
const report=`${base}/independent-review${review}.md`;
const reportBytes=readFileSync(resolve(root,report));
if (!/^\s*(?:\*\*)?PASS\b/.test(reportBytes.toString('utf8'))) throw new Error('Review is not PASS');
const execution=json(`${base}/review${review}-execution.json`);
if (execution.exitCode!==0 || execution.reportSha256!==hash(reportBytes)) throw new Error('Review execution mismatch');
const executionPath=`${base}/review${review}-execution.json`;
const evidenceFailures=checkReviewEvidence(root,executionPath,report);
if(evidenceFailures.length) throw new Error(evidenceFailures.join('; '));
const validation=spawnSync(process.execPath,[resolve(root,'scripts/validate-lq4e-staging.mjs'),'--sources'],{cwd:root,encoding:'utf8'});
if(validation.status!==0) throw new Error(`Preflight staging validation failed: ${validation.stdout}${validation.stderr}`);
// Preflight every file before mutation; the reviewer must explicitly identify its hash.
const candidates=names.map(name=>{
  const path=`data/qualification-staging/lq4e-engineer-first/${name}`;
  const reviewed=readFileSync(resolve(root,path));
  if (!reportBytes.toString('utf8').includes(hash(reviewed))) throw new Error(`Review does not attest current bytes: ${name}`);
  const data=JSON.parse(reviewed.toString('utf8'));
  if (data.status!=='DRAFT_PENDING_INDEPENDENT_REVIEW' || data.questions.some(q=>q.needsIndependentReview!==true||q.publicGo!==false)) throw new Error(`Not an unpublished draft: ${name}`);
  return {name,path,reviewed,data};
});
const receiptPath=`${base}/acceptance.json`;
const receipt=existsSync(resolve(root,receiptPath))?json(receiptPath):{status:'PARTIAL_CONTENT_ACCEPTED_NOT_REGISTERED',qualification:'gijutsushi1-kikai',baselineAccepted:30,expected:160,batches:[]};
if(candidates.some(c=>receipt.batches.some(b=>b.path===c.path))) throw new Error('Already accepted');
mkdirSync(resolve(root,`${base}/reviewed-manuscripts`),{recursive:true});
for(const c of candidates){
  const snapshot=`${base}/reviewed-manuscripts/review${review}-${c.name}`;
  writeFileSync(resolve(root,snapshot),c.reviewed);
  const semantic=c.data.questions.map(q=>Object.fromEntries(Object.entries(q).filter(([k])=>!['needsIndependentReview','publicGo','contentReview'].includes(k))));
  c.data.status='PARTIAL_CONTENT_ACCEPTED_NOT_REGISTERED';
  for(const q of c.data.questions){q.needsIndependentReview=false;q.contentReview={status:'PASS',model:'gpt-6-astra',report,scope:'BATCH_ONLY_NOT_FULL_QUALIFICATION'};}
  write(c.path,c.data);
  receipt.batches.push({path:c.path,status:'PASS',model:'gpt-6-astra',originals:c.data.questions.length,questionIds:c.data.questions.map(q=>q.id),sha256:hash(readFileSync(resolve(root,c.path))),semanticSha256:hash(JSON.stringify(semantic)),reviewedSnapshot:snapshot,reviewedFileSha256:hash(c.reviewed),report,reportSha256:hash(reportBytes),execution:executionPath,executionSha256:hash(readFileSync(resolve(root,executionPath)))});
}
receipt.newAccepted=receipt.batches.reduce((n,b)=>n+b.originals,0);receipt.accepted=receipt.baselineAccepted+receipt.newAccepted;receipt.remaining=receipt.expected-receipt.accepted;write(receiptPath,receipt);
console.log(`Accepted ${candidates.reduce((n,c)=>n+c.data.questions.length,0)} originals; total ${receipt.accepted}/160`);
