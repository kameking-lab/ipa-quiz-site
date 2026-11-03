import {expect,it} from "vitest";
import registry from "@/data/exam-library/answer-figures.json";
import {EXAM_CATALOG} from "@/lib/exam-library-catalog";
import {loadExamPaper} from "@/lib/exam-library-papers";
import {examContent} from "@/mobile/shared/catalog-source";
import {learningAssetUrls} from "@/lib/learning-assets";
const figures:Record<string,{src:string}[]>=registry;
it("covers image references independently read from every paper renderer input and answer registry",async()=>{
  for(const paper of EXAM_CATALOG) {
    const rows=loadExamPaper(paper.id);if(!rows)continue;
    const inventory=learningAssetUrls(await examContent(`library.${paper.id}`));
    // These are the actual figure renderer inputs, not the download enumerator's output.
    const references=rows.flatMap(q=>[...q.images,...q.presentation?.figures.map(f=>f.src)??[],...figures[q.id]?.map(f=>f.src)??[]]);
    for(const src of references)expect(inventory,`${paper.id}: ${src}`).toContain(new URL(src,"https://www.kakomon-ai.jp").href);
  }
});
it("includes precisely the seven previously omitted renderer figures in hashed content",async()=>{
  const ids=["lckohyo-LC20260401-2-q2","cskohyo-CS20251905-q4","cskohyo-CS20241911-q4"];
  expect(ids.flatMap(id=>figures[id])).toHaveLength(7);
  for(const id of ids) {
    const rows=await examContent(`library.${id.replace(/-q\d+$/,"")}`);
    const question=rows?.find(q=>q.id===id) as import("@/lib/exam-library-model").ExamQuestion;
    expect(question.learningAssets?.answerFigures).toEqual(figures[id]);
    for(const f of figures[id])expect(question.learningAssets?.files).toContain(new URL(f.src,"https://www.kakomon-ai.jp").href);
  }
});
