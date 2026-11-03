import "server-only";
import { notFound } from "next/navigation";
import { materialGroups } from "../shared/material-source";
import { getQuestionsForExam } from "@/lib/questions/get-questions";
import { findQuestionByRoute } from "@/lib/seo/question-url";
import type { ExamCode } from "@/lib/questions/types";
import { loadExamPaper } from "@/lib/exam-library-papers";
import { findExamEntry } from "@/lib/exam-library-catalog";
import { examSourcePdfUrl, isScorableQuestion } from "@/lib/exam-library-model";
import { AuthorizedContent } from "../shared/AuthorizedContent";
/** Only IDs/titles cross RSC. No child containing ungranted content is created. */
export async function ContentPage({path,initialId,initialView}:{path:string;initialId?:string;initialView?:"question"|"summary"}) {
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
    const validInitialId=qs.some(q=>q.id===initialId)?initialId:undefined;
    const paperIndex=qs.map(q=>({id:q.id,number:q.number,choiceCount:q.choiceCount,answerAuthority:q.answerAuthority,referenceOnly:q.referenceOnly,scorable:isScorableQuestion(q)}));
    return <AuthorizedContent initialId={validInitialId} initialView={initialView} paper={paper} paperIndex={paperIndex} paperTitle={entry?`${entry.subject} ${entry.label}`:paper} pdfUrl={entry?examSourcePdfUrl(entry):""} indexUrl={entry?.indexUrl} items={qs.map(q=>({id:q.id,title:`問${q.number}`}))}/>;
  }
  const materials=materialGroups().flatMap(g=>g.items).filter(m=>m.href===path || m.href.startsWith(path+"/"));
  if(!materials.length)notFound();
  return <AuthorizedContent material items={materials.map(m=>({id:m.id,title:m.title}))}/>;
}
