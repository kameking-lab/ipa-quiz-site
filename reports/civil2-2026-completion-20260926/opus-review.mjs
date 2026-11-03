import { spawn } from 'node:child_process';
import { readFileSync, writeFileSync } from 'node:fs';

const here = new URL('./', import.meta.url);
const group = process.argv[2];
const ranges = { a:[1,5], b:[17,26], c:[27,36], d:[37,47], e:[48,56], f:[57,66], g:[25,25] };
if (!ranges[group]) throw new Error(`unknown group ${group}`);
const [first,last] = ranges[group];
const source = JSON.parse(readFileSync(new URL('official-segments.json', here), 'utf8'));
const overrides = JSON.parse(readFileSync(new URL('visual-overrides.json', here), 'utf8'));
const subset = source.filter(q => q.number>=first && q.number<=last).map(q => {
  const checked = {...q, ...(overrides[q.number]??{})};
  return {number:q.number,pdfPage:q.pdfPage,question:checked.stem,choices:checked.choices,officialAnswerNumber:q.officialAnswerNumber,visualDescription:checked.visualDescription};
});
const prompt = `あなたは2級土木施工管理技術検定（第一次検定・令和8年度前期・土木）教材の厳格な査読者。入力は公式問題PDF SHA256 CF69CAA81A9F411513B9B763B61C21A15B43F327E220BB5FF3F336C0A6BA0792 から抽出した本文と公式正答PDF SHA256 6CF5ABA933D5D7F07F284A2F7BED2A8A99E3CD79794485AC5E47CDE954D89A5A の正解番号。公式正解番号を変更しない。各肢の正誤理由を、設問が「適当でないもの」「正しいもの」等いずれかを読んで正しく説明する。正解肢が事実誤りの場合に「正しい」と言わない。図が必要なのに図が入力にない場合、数式の分子分母や上付き文字が欠けた場合、選択肢または設問に抽出欠落がある場合は、その設問をHOLDし、作り話で補わない。技術基準や法令数値を推測しない。公式正答と説明が衝突した場合はHOLD。入力PDF以外の資料を実際に閲覧したかのようには述べない。出力は厳密なJSONのみ。形式: {"questions":[{"number":1,"status":"PASS|HOLD","category":"短い分類","explanation":"正答の理由を含む総括。2文程度","choiceExplanations":["肢1の具体的理由","肢2の具体的理由","肢3の具体的理由","肢4の具体的理由"],"issue":"HOLDの理由。PASSなら空文字"}],"globalIssues":[]}。対象の全設問を一件も省略しない。各肢理由は教材として意味がある具体性にし、同じ定型文を繰り返さない。入力:\n${JSON.stringify(subset,null,2)}`;
const args=['C:/Users/kanet/AppData/Roaming/npm/node_modules/@anthropic-ai/claude-code/cli-wrapper.cjs','-p','--model','claude-opus-5-5','--output-format','json','--tools','','--permission-mode','plan','--no-session-persistence'];
const startedAt=new Date().toISOString();
const child=spawn(process.execPath,args,{cwd:new URL('../../',here),stdio:['pipe','pipe','pipe'],windowsHide:true});
let stdout='',stderr='';
child.stdout.on('data',d=>stdout+=d);
child.stderr.on('data',d=>stderr+=d);
child.on('close',code=>{
  writeFileSync(new URL(`opus-${group}-raw.json`,here),stdout);
  let raw={};try{raw=JSON.parse(stdout)}catch{}
  let parsed={};try{parsed=JSON.parse(raw.result??'')}catch{}
  const usage=raw.modelUsage??{};
  const correctModel=Object.keys(usage).some(key=>key.includes('claude-opus-5-5'));
  const receipt={startedAt,finishedAt:new Date().toISOString(),requestedModel:'claude-opus-5-5',provider:'firstParty',exitCode:code,isError:raw.is_error??null,modelUsage:usage,correctModel,stderr,questionNumbers:parsed.questions?.map(q=>q.number)??null,statuses:parsed.questions?.map(q=>[q.number,q.status])??null,globalIssues:parsed.globalIssues??null};
  writeFileSync(new URL(`opus-${group}-receipt.json`,here),JSON.stringify(receipt,null,2)+'\n');
  if(correctModel && code===0 && !raw.is_error) writeFileSync(new URL(`opus-${group}-explanations.json`,here),JSON.stringify(parsed,null,2)+'\n');
  console.log(JSON.stringify({group,...receipt},null,2));
});
child.stdin.end(prompt);
