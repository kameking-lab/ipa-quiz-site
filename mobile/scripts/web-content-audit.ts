const contentKeys=new Set(["question","text","stem","body","prompt","explanation","choiceExplanation","conditionsText","instructionText","diagramNotesText","modelAnswer","scoringCriteria","answer","correctAnswer","solution","choices","accepted"]);
const forbiddenKeys=/"(answer|acceptedAnswer|correctChoice|correctAnswer|modelAnswer|scoringCriteria|conditionsText|instructionText|diagramNotesText|choiceExplanation|explanation|choices)"\s*:/;
const publicKeys=new Set(["id","title","topic","href","url","label","name","source","sourceUrl","sourceAnswerUrl","sourceIndexUrl","originalPdf","answerPdf"]);
export function fingerprints(value:unknown,protectedValue=false):string[] {
  if(typeof value==="string")return protectedValue&&!/^https?:\/\//.test(value)&&value.trim().length>=48?[value.trim().slice(0,80)]:[];
  if(Array.isArray(value))return value.flatMap(item=>fingerprints(item,protectedValue));
  if(value&&typeof value==="object")return Object.entries(value).filter(([key])=>!publicKeys.has(key)).flatMap(([key,item])=>fingerprints(item,protectedValue||contentKeys.has(key)));
  return [];
}
export function decodedArtifact(text:string):string {
  // HTML contains escaped Flight frames; .rsc files contain the same frames raw.
  const frames=[...text.matchAll(/self\.__next_f\.push\((\[[^\n]*?\])\)<\/script>/g)].flatMap(match=>{
    const frame:unknown=JSON.parse(match[1]);
    return Array.isArray(frame)?frame.filter((item):item is string=>typeof item==="string"):[];
  });
  return [text,...frames].join("\n");
}
function normalized(text:string):string {
  return text.replace(/&quot;/g,'"').replace(/&#x27;|&#39;/g,"'").replace(/&lt;/g,"<").replace(/&gt;/g,">").replace(/&amp;/g,"&").replace(/\s+/g,"");
}
export function auditProtectedArtifact(text:string,samples:readonly string[],html:boolean,paper:boolean):void {
  const decoded=decodedArtifact(text);
  if(html&&!decoded.includes(paper?"利用枠と回答済みの問題を確認しています":"利用枠を確認しています"))throw new Error("Missing content gate");
  if(forbiddenKeys.test(decoded))throw new Error("Serialized protected body or answer field");
  const compact=normalized(decoded);
  for(const sample of samples){
    if(compact.includes(normalized(sample))||decoded.includes(JSON.stringify(sample).slice(1,-1)))throw new Error("Protected source fingerprint found");
  }
}
export function containsGradingIndex(text:string,ids:readonly string[],publicReferenceId:string):boolean {
  // One ID is also a public non-scoring exclusion rule. Match whole string
  // literals so q1 does not falsely match that rule's q12 suffix.
  return ids.filter(id=>id!==publicReferenceId).some(id=>text.includes(JSON.stringify(id))||text.includes(JSON.stringify(JSON.stringify(id)).slice(1,-1)));
}
