export const FIELD_LABELS = ["A", "B", "C", "D", "E"] as const;
export function sentakuParagraphs(raw:string):string[]{
 const body=raw.split(/〔問\s*\d+〕/)[1]?.split("選択肢\n")[0];
 if(!body) throw new Error("Missing original body / word bank boundary");
 return body.split(/\n(?=[₁₂₃₄₅₆₇₈₉]\s)/).map(part=>part.replace(/[₀-₉]/g,c=>String(c.charCodeAt(0)-0x2080)).replace(/\s+/g,"").replace(/[Ａ-Ｅ]/g,c=>`{{${String.fromCharCode(c.charCodeAt(0)-0xfee0)}}}`)).filter(Boolean);
}
export const sentakuPath=(year:string|number,number?:number)=>`/sharoushi/sentaku/${year}${number===undefined?"":`/${number}`}`;
