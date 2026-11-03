import { z } from "zod";
import originalData from "@/data/questions/sharoushi/sentaku/originals.json";

export const FIELD_LABELS = ["A", "B", "C", "D", "E"] as const;
const text = z.string().trim().min(1);
const label = z.enum(FIELD_LABELS);
const hash = z.string().regex(/^[a-f0-9]{64}$/);
const option = z.object({ id: z.number().int().min(1).max(20), label: text, text }).strict();
const blank = z.object({ id: label, answerOptionId: z.number().int().positive(), answerText: text, explanation: text,
  evidenceStatus: z.enum(["not-directly-verified", "direct-primary-verified"]), reviewFlags: z.array(text), primaryRefs: z.array(text).optional(),
}).strict();
const common = {
  id: text, year: z.union([z.literal(2025), z.literal(2026)]), examRound: z.union([z.literal(57),z.literal(58)]),
  questionNumber: z.number().int().min(1).max(8), subject: text, format: z.literal("official-cloze"),
  lawAsOf: z.string().regex(/^\d{4}-\d{2}-\d{2}$/), stem: text, rawSourceText: text,
  sourcePdfPhysicalPages: z.array(z.number().int().positive()).min(1), sourcePdfSha256: hash,
  sourceUrl: z.url(), officialAnswerUrl: z.url(), officialAnswerPdfSha256: hash,
  blanks: z.array(blank).length(5), explanation: text,
  review: z.object({ status: z.enum(["approved","hold"]), reason: text, evidenceUrls: z.array(z.url()) }).strict(),
};
/** PDF soft line wraps are removed; original numbered sections retain paragraph breaks. */
export function sentakuParagraphs(raw:string):string[]{
 const body=raw.split(/〔問\s*\d+〕/)[1]?.split("選択肢\n")[0];
 if(!body) throw new Error("Missing original body / word bank boundary");
 return body.split(/\n(?=[₁₂₃₄₅₆₇₈₉]\s)/).map(part=>part.replace(/[₀-₉]/g,c=>String(c.charCodeAt(0)-0x2080)).replace(/\s+/g,"").replace(/[Ａ-Ｅ]/g,c=>`{{${String.fromCharCode(c.charCodeAt(0)-0xfee0)}}}`)).filter(Boolean);
}
const schema = z.discriminatedUnion("wordBankMode", [
  z.object({ ...common, wordBankMode: z.literal("shared-20"), sharedWordBank: z.array(option).length(20), blankWordBanks: z.null() }).strict(),
  z.object({ ...common, wordBankMode: z.literal("per-blank-4"), sharedWordBank: z.array(option).length(0), blankWordBanks: z.object({ A:z.array(option).length(4),B:z.array(option).length(4),C:z.array(option).length(4),D:z.array(option).length(4),E:z.array(option).length(4) }).strict() }).strict(),
]).superRefine((q,ctx) => {
  const fail=(message:string)=>ctx.addIssue({code:"custom",message});
  if(q.id!==`sharoushi-${q.year}-sentaku-q${String(q.questionNumber).padStart(2,"0")}`) fail("Original identity mismatch");
  if(q.examRound!==q.year-1968 || q.lawAsOf!==(q.year===2025?"2025-04-11":"2026-04-10")) fail("Edition / law date mismatch");
  if(q.blanks.map(b=>b.id).join("")!=="ABCDE") fail("Five ordered original fields required");
  const tokens=[...q.stem.matchAll(/\{\{([^{}]+)\}\}/g)].map(m=>m[1]);
  if(tokens.some(t=>!FIELD_LABELS.includes(t as typeof FIELD_LABELS[number])) || FIELD_LABELS.some(l=>!tokens.includes(l))) fail("Invalid or missing stem field");
  if(/[{}]/.test(q.stem.replace(/\{\{[A-E]\}\}/g,""))) fail("Malformed stem field");
  if((q.wordBankMode==="per-blank-4") !== (q.year===2026 && [2,3,4].includes(q.questionNumber))) fail("Official bank mode mismatch");
  if(q.sourcePdfPhysicalPages.some((p,i,a)=>i>0 && p<=a[i-1])) fail("Source pages must be ordered and unique");
  if(sentakuParagraphs(q.rawSourceText).join("")!==q.stem) fail("Original body differs from normalized stem");
  const banks=q.wordBankMode==="shared-20"?[q.sharedWordBank]:Object.values(q.blankWordBanks);
  for(const bank of banks) if(bank.some((o,i)=>o.id!==i+1 || o.label!==String.fromCodePoint(0x2460+i))) fail("Original option numbers must be consecutive and unique");
  for(const b of q.blanks){
    const bank=q.wordBankMode==="shared-20"?q.sharedWordBank:q.blankWordBanks[b.id];
    if(bank.find(o=>o.id===b.answerOptionId)?.text!==b.answerText) fail(`Official key / word mismatch: ${b.id}`);
    if(q.review.status==="approved" && (b.explanation.includes("HOLD") || b.reviewFlags.some(f=>f!=="judgment-wording-checked-against-stem-only"))) fail(`Unresolved field cannot be published: ${b.id}`);
  }
});
export type SentakuQuestion = z.infer<typeof schema>;
export function parseSentakuOriginals(input:unknown):SentakuQuestion[]{
 const items=z.array(schema).parse(input);
 if(new Set(items.map(q=>q.id)).size!==items.length) throw new Error("Duplicate original");
 return items;
}
// Original fields never enter the multiple-choice practice registry or count as separate questions.
export const SENTAKU_ORIGINALS=parseSentakuOriginals(originalData);
export const PUBLISHED_SENTAKU=SENTAKU_ORIGINALS.filter(q=>q.review.status==="approved");
export const SENTAKU_EDITIONS=[...new Set(PUBLISHED_SENTAKU.map(q=>String(q.year)))].sort().reverse();
export const sentakuPath=(year:string|number,number?:number)=>`/sharoushi/sentaku/${year}${number===undefined?"":`/${number}`}`;
export const getSentakuEdition=(year:string)=>PUBLISHED_SENTAKU.filter(q=>String(q.year)===year);
export function getSentakuQuestion(year:string,number:string){return getSentakuEdition(year).find(q=>String(q.questionNumber)===number);}
export const sentakuSitemapPaths=()=>["/sharoushi/sentaku",...SENTAKU_EDITIONS.map(y=>sentakuPath(y)),...PUBLISHED_SENTAKU.map(q=>sentakuPath(q.year,q.questionNumber))];
