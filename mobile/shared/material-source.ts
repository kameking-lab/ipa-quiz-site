// Server/tooling entry only. Mobile renderers import material-types (type-only).
import {DENKEN1_NATIVE_PARTS,denken1NativeQuestionPath} from "@/lib/denken1/native";
import {NATIVE_EDITIONS,NATIVE_QUESTIONS,nativeQuestionPath} from "@/lib/denken2/native";
import {DENKEN3_NATIVE_PARTS,denken3NativeQuestionPath} from "@/lib/denken3/native";
import {SECONDARY_QUESTIONS,secondaryQuestionPath} from "@/lib/denken2/secondary";
import {FP2_PRACTICAL_EDITIONS,getPracticalEdition as fp2,practicalSourceUrls as fp2Source} from "@/lib/fp2/practical";
import {FP3_PRACTICAL_EDITIONS,getPracticalEdition as fp3,practicalSourceUrls as fp3Source} from "@/lib/fp3/practical";
import {FP1_APPLIED_EDITIONS,getFp1AppliedEdition,fp1AppliedQuestionPath} from "@/lib/fp1/applied";
import {getFp1ExtensionQuestions,getFp1PublishedExtension} from "@/lib/fp1/published-extension";
import {PUBLISHED_SENTAKU,sentakuPath} from "@/lib/sharoushi/sentaku";
import {CHUSHO_SECONDARY_CASES,chushoQuestionPath} from "@/lib/chusho-secondary/data";
import {getAllEssayQuestions} from "@/lib/essay/load";
import type {Material} from "./material-types";
export interface MaterialGroup {code:string;name:string;qualification:string;items:Material[]}
let memo:MaterialGroup[]|undefined;
export function materialGroups():MaterialGroup[] {
  if(memo)return memo;
  const groups:MaterialGroup[]=[];
  const add=(code:string,name:string,qualification:string,items:Material[])=>{if(items.length)groups.push({code:`material.${code}`,name,qualification,items});};
  add("denken1-native","電験一種 原問形式","denken1",DENKEN1_NATIVE_PARTS.flatMap(p=>p.questions.map(q=>({id:q.id,title:q.topic,href:denken1NativeQuestionPath(q.year,q.subject,q.number),kind:"native" as const,question:q,readerConfig:{examName:"電験一種",examPath:"/denken1" as const,sourceAnswerUrl:p.sourceAnswerUrl,sourceIndexUrl:p.sourceIndexUrl}}))));
  add("denken2-native","電験二種 原問形式","denken2",NATIVE_QUESTIONS.map(q=>{const p=NATIVE_EDITIONS.find(p=>p.year===q.year)!;return {id:q.id,title:q.topic,href:nativeQuestionPath(q.year,q.subject,q.number),kind:"native" as const,question:q,readerConfig:{examName:"電験二種",examPath:"/denken2" as const,sourceAnswerUrl:p.sourceAnswerUrl,sourceIndexUrl:p.sourceIndexUrl}};}));
  add("denken3-native","電験三種 原問形式","denken3",DENKEN3_NATIVE_PARTS.flatMap(p=>p.questions.map(q=>({id:q.id,title:q.topic,href:denken3NativeQuestionPath(q.sitting,q.subject,q.number),kind:"native" as const,question:q,readerConfig:{examName:"電験三種",examPath:"/denken3" as const,editionSlug:q.sitting,editionLabel:q.sitting,sourceAnswerUrl:p.sourceAnswerUrl,sourceIndexUrl:p.sourceIndexUrl,lawReferenceDate:q.subject==="law"?`${q.year}-04-01`:undefined}}))));
  add("denken2-secondary","電験二種 二次記述","denken2",SECONDARY_QUESTIONS.map(q=>({id:q.id,title:q.topic,href:secondaryQuestionPath(q),kind:"secondary",question:q})));
  add("fp2-practical","FP2級 実技","fp2",FP2_PRACTICAL_EDITIONS.flatMap(edition=>{const d=fp2(edition);if(!d)return [];const {questions,...data}=d;return questions.map(q=>({id:`fp2-practical-${edition}-${q.number}`,title:`${d.label} 問${q.number}`,href:`/fp2/practical/${edition}/${q.number}`,kind:"fp2" as const,edition,data,q,source:fp2Source(edition)}));}));
  add("fp3-practical","FP3級 実技","fp3",FP3_PRACTICAL_EDITIONS.flatMap(edition=>{const d=fp3(edition);if(!d)return [];const {questions,...data}=d;return questions.map(q=>({id:`fp3-practical-${edition}-${q.number}`,title:`${d.label} 問${q.number}`,href:`/fp3/practical/${edition}/${q.number}`,kind:"fp3" as const,edition,data,q,source:fp3Source(edition)}));}));
  add("fp1-applied","FP1級 学科応用編","fp1",FP1_APPLIED_EDITIONS.flatMap(edition=>{
    const items:Material[]=[];const d=getFp1AppliedEdition(edition);
    if(d){const {questions,...data}=d;for(const question of questions)items.push({id:question.id,title:question.title,href:fp1AppliedQuestionPath(edition,question.number),kind:"fp1",edition,data,question});}
    const ext=getFp1PublishedExtension(edition);
    if(ext){const {questions:omittedQuestions,...data}=ext;void omittedQuestions;for(const question of getFp1ExtensionQuestions(edition))items.push({id:question.id,title:question.title,href:fp1AppliedQuestionPath(edition,question.number),kind:"fp1-extension",data,question});}
    return items;
  }));
  add("sharoushi-sentaku","社労士 選択式","sharoushi",PUBLISHED_SENTAKU.map(question=>({id:question.id,title:question.subject,href:sentakuPath(question.year,question.questionNumber),kind:"sentaku",question})));
  add("chusho-secondary","中小企業診断士 二次","chusho-kigyo-shindanshi",CHUSHO_SECONDARY_CASES.flatMap(paper=>paper.questions.map(question=>({id:question.id,title:question.topic,href:chushoQuestionPath(paper.year,paper.case,question.number),kind:"chusho" as const,paper,question}))));
  for(const exam of ["st","sa","pm","sm","au"])add(`essay-${exam}`,`${exam.toUpperCase()} 論述練習`,exam,getAllEssayQuestions().filter(q=>q.exam===exam).map(question=>({id:question.id,title:question.title,href:`/essay/${question.exam}/${question.id}`,kind:"essay",question})));
  memo=groups;return groups;
}
export function findMaterial(id:string){return materialGroups().flatMap(g=>g.items).find(q=>q.id===id);}
