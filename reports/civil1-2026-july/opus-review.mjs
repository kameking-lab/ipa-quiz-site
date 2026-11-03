import { spawn } from 'node:child_process';
import { readFileSync, writeFileSync, existsSync } from 'node:fs';
const here = new URL('./', import.meta.url);
const group = process.argv[2];
const ranges = { a1:['A',1,10], a2:['A',11,20], a3:['A',21,32], a4:['A',33,43], a5:['A',44,54], a6:['A',55,66], b1:['B',1,12], b2:['B',13,24], b3:['B',25,35] };
const extra = process.argv[3]; // optional: comma list like A3,B6 for re-run group
let subsetKeys;
if (extra) subsetKeys = new Set(extra.split(','));
else if (!ranges[group]) throw new Error(`unknown group ${group}`);
const src = JSON.parse(readFileSync(new URL('source-transcription.json', here), 'utf8'));
const note = existsSync(new URL(`notes-${group}.txt`, here)) ? readFileSync(new URL(`notes-${group}.txt`, here), 'utf8') : '';
const subset = src.records.filter(r => subsetKeys ? subsetKeys.has(`${r.paper}${r.number}`) : (r.paper===ranges[group][0] && r.number>=ranges[group][1] && r.number<=ranges[group][2]))
  .map(r => ({paper:`問題${r.paper}`, number:r.number, section:r.category, question:r.question, choices:r.choices.map((c,i)=>`(${i+1}) ${c}`), officialAnswerNumber:r.officialAnswerNumber, figureDescription:r.visualDescription ?? undefined}));
const prompt = `あなたは1級土木施工管理技術検定（令和8年度 第一次検定）教材の厳格な査読者兼執筆者。入力は一般財団法人全国建設研修センターの公式問題PDF（問題A SHA256 ${src.questionAPdf.sha256}、問題B SHA256 ${src.questionBPdf.sha256}）から文字起こしした本文と、公式正答PDF（SHA256 ${src.answerPdf.sha256}）の正解番号である。図がある問題は、原図を目視した人間が書いた figureDescription を与える。
規則:
- 公式正解番号を変更しない。設問が「適当でないもの」「誤っているもの」「正しいもの」「適当なもの」「数」「組合せ」のどれを問うかを読み、各肢がなぜ正解/不正解なのかを具体的に説明する。
- 各肢の説明は、その肢の記述内容が正しいか誤りかを明言し、誤りの場合は正しい内容（どこがどう違うか）を書く。①〜④の記述を含む問題では、各①〜④の正誤を明示した上で、その肢（組合せや数）が正解/不正解になる理由を書く。
- 法令・技術基準の数値は、確信を持てる一般的に確立した内容だけを書く。確信がない数値や条文番号は書かない。推測で補わない。
- 公式正答と自分の判断が衝突する、図や数式の情報が不足している、文字起こしに欠落が疑われる場合は、その設問を HOLD とし、作り話で補わない。
- 入力以外の資料を実際に閲覧したかのようには述べない。
- 選択肢の番号は原本の(1)〜(4)を使ってよいが、サイトではア〜エに変換表示されるため、choiceExplanations の本文中で「肢1」などの番号参照はしない（各肢の説明はその肢自身の内容で完結させる）。explanation でも番号でなく内容で正解を示す。
- 文体は「である」調。各肢 60〜160字程度。同じ定型文を繰り返さない。
出力は厳密なJSONのみ（前後に説明文やコードフェンスを付けない）。形式: {"questions":[{"paper":"A","number":1,"status":"PASS|HOLD","topic":"短い分類(10字程度)","explanation":"正答の理由を含む総括。2〜3文","choiceExplanations":["(1)の具体的理由","(2)の具体的理由","(3)の具体的理由","(4)の具体的理由"],"issue":"HOLDの理由。PASSなら空文字"}],"globalIssues":[]}。対象の全設問を一件も省略しない。
${note}
入力:
${JSON.stringify(subset,null,1)}`;
const cli='C:/Users/kanet/AppData/Roaming/npm/node_modules/@anthropic-ai/claude-code/cli-wrapper.cjs';
const args=[cli,'-p','--model','claude-opus-5-5','--output-format','json','--tools','','--permission-mode','plan','--no-session-persistence'];
const startedAt=new Date().toISOString();
writeFileSync(new URL(`opus-${group}-prompt.txt`,here),prompt);
const child=spawn(process.execPath,args,{cwd:here,stdio:['pipe','pipe','pipe'],windowsHide:true});
let stdout='',stderr='';
child.stdout.on('data',d=>stdout+=d); child.stderr.on('data',d=>stderr+=d);
child.on('close',code=>{
  writeFileSync(new URL(`opus-${group}-raw.json`,here),stdout);
  let raw={};try{raw=JSON.parse(stdout)}catch{}
  let text=(raw.result??'').trim().replace(/^```(?:json)?\s*/,'').replace(/```\s*$/,'');
  let parsed={};try{parsed=JSON.parse(text)}catch(e){parsed={parseError:String(e)}}
  const usage=raw.modelUsage??{};
  const correctModel=Object.keys(usage).some(k=>k.includes('claude-opus-5-5'));
  const receipt={group,startedAt,finishedAt:new Date().toISOString(),requestedModel:'claude-opus-5-5',provider:'firstParty',exitCode:code,isError:raw.is_error??null,modelUsage:usage,totalCostUsd:raw.total_cost_usd??null,correctModel,stderr:stderr.slice(0,2000),questionKeys:parsed.questions?.map(q=>`${q.paper}${q.number}`)??null,statuses:parsed.questions?.map(q=>[`${q.paper}${q.number}`,q.status])??null,globalIssues:parsed.globalIssues??null,parseError:parsed.parseError??null};
  writeFileSync(new URL(`opus-${group}-receipt.json`,here),JSON.stringify(receipt,null,2)+'\n');
  if(correctModel&&code===0&&!raw.is_error&&parsed.questions) writeFileSync(new URL(`opus-${group}-explanations.json`,here),JSON.stringify(parsed,null,2)+'\n');
  console.log(JSON.stringify({group,exitCode:code,correctModel,statuses:receipt.statuses,parseError:receipt.parseError,cost:receipt.totalCostUsd}));
});
child.stdin.end(prompt);
