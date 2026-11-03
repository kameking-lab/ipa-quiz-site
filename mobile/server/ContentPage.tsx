import "server-only";
import { notFound } from "next/navigation";
import { materialGroups } from "../shared/material-source";
import { getQuestionsForExam } from "@/lib/questions/get-questions";
import { findQuestionByRoute } from "@/lib/seo/question-url";
import type { ExamCode } from "@/lib/questions/types";
import { loadExamPaper } from "@/lib/exam-library-papers";
import { findExamEntry } from "@/lib/exam-library-catalog";
import { examSourcePdfUrl } from "@/lib/exam-library-model";
import { AuthorizedContent } from "../shared/AuthorizedContent";
/** Only IDs/titles cross RSC. No child containing ungranted content is created. */
export async function ContentPage({path,initialId}:{path:string;initialId?:string}) {
  if(path.startsWith("/q/")) {
    const [, ,exam,yearSeason,section,qnum]=path.split("/");
    const q=findQuestionByRoute(await getQuestionsForExam(exam as ExamCode),{exam,yearSeason,section,qnum});
    if(!q)notFound();
    return <AuthorizedContent items={[{id:q.id,title:`${exam.toUpperCase()} 問${q.qNumber}`}]} />;
  }
  if(/^\/e-learning\/exams\/[^/]+$/.test(path)) {
    const paper=path.split("/").pop()!,qs=loadExamPaper(paper);
    if(!qs?.length)notFound();
    const entry=findExamEntry(paper);
    return <AuthorizedContent initialId={initialId} paper={paper} pdfUrl={entry?examSourcePdfUrl(entry):""} indexUrl={entry?.indexUrl} items={qs.map(q=>({id:q.id,title:`問${q.number}`}))}/>;
  }
  const materials=materialGroups().flatMap(g=>g.items).filter(m=>m.href===path || m.href.startsWith(path+"/"));
  if(!materials.length)notFound();
  return <AuthorizedContent material items={materials.map(m=>({id:m.id,title:m.title}))}/>;
}
