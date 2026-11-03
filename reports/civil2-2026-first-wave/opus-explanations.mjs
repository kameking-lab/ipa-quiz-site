import { spawn } from 'node:child_process';
import { readFileSync, writeFileSync } from 'node:fs';

const here = new URL('./', import.meta.url);
const transcription = readFileSync(new URL('source-transcription.json', here), 'utf8');
const prompt = `あなたは2級土木施工管理技術検定の学習解説の独立査読者。以下は令和8年度第一次検定前期の公式問題PDF p6-8から人手文字起こししたNo.6-16と、別PDFの公式正答。公式正答は固定し、各設問で4肢の正誤理由を一つずつ具体的・簡潔に説明してください。設問は「適当でないもの」を選ぶものもあるので、「正解肢」と「事実として正しい記述」を混同しないこと。技術基準の閾値を根拠なく創作しないこと。曖昧・公式正答と衝突・文字起こし疑義があれば当該設問をHOLDとする。出力は厳密なJSONのみ：{"questions":[{"number":6,"status":"PASS|HOLD","explanation":"総括","choiceExplanations":["選択肢1の理由","選択肢2の理由","選択肢3の理由","選択肢4の理由"],"issue":"HOLD時理由または空"},...],"globalIssues":[]}。問題番号は11件を省略しない。引用できる公式根拠は問題PDFと正答PDFのみなので、根拠資料を閲覧したふりをしない。\n\n${transcription}`;
const startedAt = new Date().toISOString();
const args = ['C:/Users/kanet/AppData/Roaming/npm/node_modules/@anthropic-ai/claude-code/cli-wrapper.cjs',
  '-p', '--model', 'claude-opus-5-5', '--output-format', 'json', '--tools', '',
  '--permission-mode', 'plan', '--no-session-persistence'];
const child = spawn(process.execPath, args, {cwd:new URL('../../',here),stdio:['pipe','pipe','pipe'],windowsHide:true});
let stdout='',stderr='';
child.stdout.on('data',d=>stdout+=d);
child.stderr.on('data',d=>stderr+=d);
child.on('close',code=>{
  writeFileSync(new URL('opus-raw.json',here),stdout);
  let raw={};try{raw=JSON.parse(stdout)}catch{}
  let parsed={};try{parsed=JSON.parse(raw.result ?? '')}catch{}
  const receipt={startedAt,finishedAt:new Date().toISOString(),requestedModel:'claude-opus-5-5',exitCode:code,isError:raw.is_error??null,modelUsage:raw.modelUsage??null,stderr,questionCount:parsed.questions?.length??null,statuses:parsed.questions?.map(q=>[q.number,q.status])??null,globalIssues:parsed.globalIssues??null};
  writeFileSync(new URL('opus-receipt.json',here),JSON.stringify(receipt,null,2)+'\n');
  writeFileSync(new URL('opus-explanations.json',here),JSON.stringify(parsed,null,2)+'\n');
  console.log(JSON.stringify(receipt,null,2));
});
child.stdin.end(prompt);
