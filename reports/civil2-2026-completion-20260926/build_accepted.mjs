import { readFileSync, writeFileSync } from 'node:fs';

const here=new URL('./',import.meta.url);
const repo=new URL('../../',here);
const original=JSON.parse(readFileSync(new URL('data/questions/civil2/2026-early.json',repo),'utf8'));
const source=JSON.parse(readFileSync(new URL('official-segments.json',here),'utf8'));
const overrides=JSON.parse(readFileSync(new URL('visual-overrides.json',here),'utf8'));
const official=JSON.parse(readFileSync(new URL('official-extract.json',here),'utf8'));
const groups=['a','b','c','d','e','f','g'];
const models=new Map();
const accepted=new Map();
for(const group of groups){
  const receipt=JSON.parse(readFileSync(new URL(`opus-${group}-receipt.json`,here),'utf8'));
  if(receipt.exitCode!==0||receipt.isError||!receipt.correctModel||!receipt.modelUsage?.['claude-opus-5-5']) throw new Error(`Unaccepted model ${group}`);
  const review=JSON.parse(readFileSync(new URL(`opus-${group}-explanations.json`,here),'utf8'));
  for(const item of review.questions){
    if(item.status==='PASS') {accepted.set(item.number,item);models.set(item.number,group)}
  }
}
const imageNumbers=new Set([1,2,3,4,5,48,50,62]);
const section=n=>n<=5?'土木一般（必須）':n<=16?'土木一般（選択）':n<=36?'専門土木（選択）':n<=47?'法規（選択）':'施工管理（必須）';
const byNumber=new Map(original.questions.filter(q=>q.number>=6&&q.number<=16).map(q=>[q.number,{...q,topic:q.topic??q.category,category:section(q.number),imageUrl:null}]));
const holds=[];
for(const raw of source){
  const n=raw.number;
  if(byNumber.has(n)) continue;
  const reviewed=accepted.get(n);
  if(!reviewed){holds.push(n);continue}
  const q={...raw,...(overrides[n]??{})};
  if(!q.stem||q.choices.length!==4||q.choices.some(v=>!v)) throw new Error(`Incomplete transcription ${n}`);
  if(reviewed.choiceExplanations.length!==4||reviewed.choiceExplanations.some(v=>!v)) throw new Error(`Incomplete explanations ${n}`);
  if(q.officialAnswerNumber!==official.answerByNumber[String(n)]) throw new Error(`Official answer conflict ${n}`);
  byNumber.set(n,{
    number:n,pdfPage:q.pdfPage,category:section(n),topic:reviewed.category||'土木施工管理',officialAnswerNumber:q.officialAnswerNumber,
    question:q.stem.replace(/^【No\.\s*\d+】\s*/,''),choices:q.choices,
    explanation:n===55?'路床の支持力（強さ）を判定するにはCBR試験を用いるため、適当なのは4。伸度には伸度試験、アスファルトの硬さには針入度試験、舗装の平坦性にはプロフィルメータ等を用いる。':reviewed.explanation,
    choiceExplanations:reviewed.choiceExplanations,
    officialReferenceUrls:[],imageUrl:imageNumbers.has(n)?`/questions/civil2/2026-early/q${n}-official-figure.png`:null,
  });
}
const numbers=[...byNumber.keys()].sort((a,b)=>a-b);
if(numbers.length+holds.length!==66||numbers.some((n,i)=>n===numbers[i-1])) throw new Error('Count/duplicate gate');
const payload={...original,questions:numbers.map(n=>byNumber.get(n))};
writeFileSync(new URL('data/questions/civil2/2026-early.json',repo),JSON.stringify(payload,null,2)+'\n');
writeFileSync(new URL('acceptance-ledger.json',here),JSON.stringify({officialQuestionSha256:official.questionSha256,officialAnswerSha256:official.answerSha256,existingQuestions:[6,7,8,9,10,11,12,13,14,15,16],acceptedNew:numbers.filter(n=>n<6||n>16),held:holds,models:Object.fromEntries(models)},null,2)+'\n');
console.log(JSON.stringify({total:numbers.length,added:numbers.length-11,held:holds}));
