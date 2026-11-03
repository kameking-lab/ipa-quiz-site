import { existsSync, readFileSync } from 'node:fs';
import { resolve, sep } from 'node:path';
import { createHash } from 'node:crypto';
const sha = b => createHash('sha256').update(b).digest('hex');
export function checkReviewEvidence(root, executionPath, reportPath) {
  const failures = [];
  const inside = p => typeof p === 'string' && resolve(root,p).startsWith(root + sep);
  if (!inside(executionPath) || !inside(reportPath) || !existsSync(resolve(root,executionPath))) return ['missing review execution'];
  let e;
  try { e = JSON.parse(readFileSync(resolve(root,executionPath),'utf8')); } catch { return ['invalid review execution']; }
  const normal = p => typeof p === 'string' ? resolve(root,p).toLowerCase() : '';
  const expected=['gpt-6-astra','-s','read-only','-C',root,'--color','never','-o',reportPath,'-'];
  const exactArguments=Array.isArray(e.arguments)&&e.arguments.length===expected.length&&e.arguments.every((v,i)=>[4,8].includes(i)?normal(v)===normal(expected[i]):v===expected[i]);
  if (e.exitCode !== 0 || e.modelCommand !== 'C:/Users/kanet/AppData/Roaming/npm/codex.cmd exec -m gpt-6-astra' || !exactArguments || normal(e.report) !== normal(reportPath)) failures.push('review model/report execution mismatch');
  for (const [field, digest] of [['prompt','promptSha256'],['report','reportSha256'],['rawLog','rawLogSha256']]) {
    if (typeof e[field] !== 'string' || (field !== 'rawLog' && !inside(e[field])) || !existsSync(resolve(root,e[field]))) { failures.push(`review ${field} missing`); continue; }
    if (sha(readFileSync(resolve(root,e[field]))) !== e[digest]) failures.push(`review ${field} hash mismatch`);
  }
  if (typeof e.rawLog === 'string' && existsSync(resolve(root,e.rawLog)) && existsSync(resolve(root,reportPath))) {
    const log = readFileSync(resolve(root,e.rawLog),'utf8').replaceAll('\r\n','\n');
    // The CLI header precedes all user/tool text. Its final echoed response is
    // after the terminal usage counter, not an arbitrary quote in the transcript.
    const header=/^OpenAI Codex v[^\n]+\n--------\n([\s\S]*?)\n--------\nuser\n/.exec(log)?.[1];
    const models=header?.split('\n').filter(l=>l.startsWith('model: '));
    const terminal=/\ntokens used\n[\d,]+\n([\s\S]*)$/.exec(log)?.[1].trim();
    if (models?.length!==1 || models[0]!=='model: gpt-6-astra' || terminal!==readFileSync(resolve(root,reportPath),'utf8').trim()) failures.push('raw log does not attest model and final report');
  }
  return failures;
}
