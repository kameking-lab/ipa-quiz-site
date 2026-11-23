import { createHash } from "node:crypto";
import { getRegisteredExamCodes, getQuestionsForExam } from "@/lib/questions/get-questions";
import { isPracticeReadyQuestion } from "@/lib/questions/filter";
import { examLabel } from "@/lib/utils";
import type { ExamCode } from "@/lib/questions/types";
import { canonicalExamCode } from "@/lib/questions/exam-aliases";
import type { CatalogEntry } from "./contracts";
import { EXAM_CATALOG, findExamEntry } from "@/lib/exam-library-catalog";
import { loadExamPaper } from "@/lib/exam-library-papers";
import { withLearningAssets } from "@/lib/learning-assets";
import {materialGroups} from "./material-source";
export function catalogCodes() { return [...getRegisteredExamCodes(), ...EXAM_CATALOG.filter(e=>loadExamPaper(e.id)?.length).map(e=>`library.${e.id}`),...materialGroups().map(g=>g.code)]; }
export async function examContent(code: string) {
  if(code.startsWith("material."))return materialGroups().find(g=>g.code===code)?.items??null;
  if (code.startsWith("library.")) return (loadExamPaper(code.slice(8)) ?? []).map(withLearningAssets);
  if (!getRegisteredExamCodes().includes(canonicalExamCode(code as ExamCode))) return null;
  return (await getQuestionsForExam(code as ExamCode)).filter(isPracticeReadyQuestion);
}
export async function examCatalog(code: string): Promise<CatalogEntry | null> {
  const qs = await examContent(code);
  if (!qs) return null;
  const json = JSON.stringify(qs);
  if(code.startsWith("material.")) {
    const g=materialGroups().find(g=>g.code===code);if(!g)return null;
    return {code,name:g.name,count:qs.length,years:[],categories:[],sessions:[],bytes:Buffer.byteLength(json),revision:createHash("sha256").update(json).digest("hex"),material:true,qualification:g.qualification,href:g.items[0]?.href};
  }
  if (code.startsWith("library.")) {
    const paper=findExamEntry(code.slice(8)); if(!paper || !qs.length)return null;
    return { code,name:`${paper.subject} ${paper.date}`,count:qs.length,years:[Number(paper.date.slice(0,4))],categories:[paper.subject],sessions:[],
      bytes:Buffer.byteLength(json),revision:createHash("sha256").update(json).digest("hex"),paper,qualification:`library.${paper.group}.${paper.subject}` };
  }
  const questions=qs as import("@/lib/questions/types").Question[];
  return { code,qualification:code, name: examLabel(code), count: questions.length, years: [...new Set(questions.map(q => q.year))].sort((a,b)=>b-a),
    categories: [...new Set(questions.map(q=>q.category))].sort(), sessions: [...new Set(questions.map(q=>q.session))],
    bytes: Buffer.byteLength(json), revision: createHash("sha256").update(json).digest("hex") };
}
