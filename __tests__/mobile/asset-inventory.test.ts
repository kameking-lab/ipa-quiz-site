// @vitest-environment node
import {expect,it} from "vitest";
import registry from "@/data/exam-library/answer-figures.json";
import {EXAM_CATALOG} from "@/lib/exam-library-catalog";
import {loadExamPaper} from "@/lib/exam-library-papers";
import {examContent} from "@/mobile/shared/catalog-source";
import {learningAssetUrls} from "@/lib/learning-assets";
import {materialGroups} from "@/mobile/shared/material-source";
import {getRegisteredExamCodes,getQuestionsForExam} from "@/lib/questions/get-questions";
import {isPracticeReadyQuestion} from "@/lib/questions/filter";
const figures:Record<string,{src:string}[]>=registry;
it("covers image references independently read from every paper renderer input and answer registry",async()=>{
  for(const paper of EXAM_CATALOG) {
    const rows=loadExamPaper(paper.id);if(!rows)continue;
    const inventory=learningAssetUrls(await examContent(`library.${paper.id}`));
    // These are the actual figure renderer inputs, not the download enumerator's output.
    const references=rows.flatMap(q=>[...q.images,...q.presentation?.figures.map(f=>f.src)??[],...figures[q.id]?.map(f=>f.src)??[]]);
    for(const src of references)expect(inventory,`${paper.id}: ${src}`).toContain(new URL(src,"https://www.kakomon-ai.jp").href);
  }
},60000);
it("covers each non-paper renderer's own image and required-PDF input fields",async()=>{
  const assertCovered=(data:unknown,refs:(string|null|undefined)[])=>{
    const inventory=learningAssetUrls(data);
    for(const ref of refs.filter((r):r is string=>!!r)) {
      // Inline figures are already bytes in the downloaded renderer input.
      // They require no network fetch or separate offline cache entry.
      if(ref.startsWith("data:image/")) { expect(JSON.stringify(data)).toContain(ref); continue; }
      expect(inventory,ref).toContain(new URL(ref,"https://www.kakomon-ai.jp").href);
    }
  };
  for(const code of getRegisteredExamCodes()) {
    const rows=(await getQuestionsForExam(code)).filter(isPracticeReadyQuestion);
    // QuizPlayer -> question figure / ChoiceButton / Markdown renderer inputs.
    const refs=rows.flatMap(q=>{
      const markdown=[q.question,q.explanation,q.modelAnswer,q.scoringCriteria,...Object.values(q.choices??{})].flatMap(text=>Array.from((text??"").matchAll(/!\[[^\]]*\]\(([^\s)]+)\)/g),m=>m[1]));
      return [...q.imageUrls??[],...Object.values(q.choiceImageUrls??{}),...q.nativeB?.bankImageUrls??[],...q.nativeB?.candidates.map(c=>c.imageUrl)??[],...markdown];
    });
    assertCovered(rows,refs);
  }
  const kinds=new Set<string>();
  for(const group of materialGroups())for(const m of group.items) {
    kinds.add(m.kind);
    switch(m.kind) {
      case "denko2-skill":assertCovered(m,[m.problem.diagramImage,m.problem.secondFigureImage,m.problem.answerConceptImage,m.problem.answerWiringImage,m.problem.answerExampleImage]);break;
      case "annotated-note":assertCovered(m,[m.note.accepted.sourcePdfUrl,m.note.answerPdfUrl]);break;
      case "native":assertCovered(m,m.question.sourcePages.map(p=>p.url));break;
      case "secondary":assertCovered(m,[...m.question.sourcePages,...m.question.answerPages].map(p=>p.url));break;
      case "fp2":assertCovered(m,[...m.q.panels,...m.q.sharedContext?.panels??[]].map(p=>p.url));break;
      case "fp3":assertCovered(m,m.q.panels.map(p=>p.url));break;
      // The remaining readers render text/forms and do not reference bitmap/PDF assets.
      case "chusho":assertCovered(m,m.paper.sourcePages.map(p=>p.url));break;
      case "essay-example":case "fp1":case "fp1-extension":case "sentaku":case "essay":break;
      default: {const exhaustive:never=m;throw new Error(String(exhaustive));}
    }
  }
  expect(kinds.size).toBe(12);
},120000);
it("includes precisely the seven previously omitted renderer figures in hashed content",async()=>{
  const ids=["lckohyo-LC20260401-2-q2","cskohyo-CS20251905-q4","cskohyo-CS20241911-q4"];
  expect(ids.flatMap(id=>figures[id])).toHaveLength(7);
  for(const id of ids) {
    const rows=await examContent(`library.${id.replace(/-q\d+$/,"")}`);
    const question=rows?.find(q=>q.id===id) as import("@/lib/exam-library-model").ExamQuestion & {learningAssets:import("@/lib/learning-assets").LearningAssets};
    expect(question.learningAssets?.answerFigures).toEqual(figures[id]);
    for(const f of figures[id])expect(question.learningAssets?.files).toContain(new URL(f.src,"https://www.kakomon-ai.jp").href);
  }
});
