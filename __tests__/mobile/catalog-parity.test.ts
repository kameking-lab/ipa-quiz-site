import {expect,it} from "vitest";
import {createHash} from "node:crypto";
import generated from "@/mobile/src/generated/catalog.json";
import {catalogCodes,examContent,examCatalog} from "@/mobile/shared/catalog-source";
import {getRegisteredExamCodes,getQuestionsForExam} from "@/lib/questions/get-questions";
import {isPracticeReadyQuestion} from "@/lib/questions/filter";
import {materialGroups} from "@/mobile/shared/material-source";
import {DENKO2_SKILL_PROBLEMS} from "@/lib/denko2/skills";
import {getAnnotatedNotes} from "@/lib/st-annotated-notes/catalog";
import {isExamPublished} from "@/lib/qualifications/catalog";
it("independently includes every released skill and inseparable annotated note",async()=>{
  const skills=await examContent("material.denko2-skill");
  expect(skills?.map(q=>q.id)??[]).toEqual(isExamPublished("denko2")?DENKO2_SKILL_PROBLEMS.map(q=>q.id):[]);
  const notes=await examContent("material.st-annotated-notes");
  expect(notes?.map(q=>q.id)).toEqual(getAnnotatedNotes().map(n=>`note.${n.id}`));
  for(const row of notes??[]){expect(row).toMatchObject({kind:"annotated-note",note:{scoringEnabled:false,registerInQuestionPool:false,originalReferenceRequired:true}});}
});
it("includes exactly every web-published practice question, library paper and alternative reader",async()=>{
  expect(new Set(generated.exams.map(e=>e.code))).toEqual(new Set(catalogCodes()));
  for(const code of getRegisteredExamCodes()){
    const web=(await getQuestionsForExam(code)).filter(isPracticeReadyQuestion);
    expect((await examContent(code))?.map(q=>q.id)).toEqual(web.map(q=>q.id));
  }
  for(const entry of generated.exams){
    const rows=await examContent(entry.code);expect(rows?.length,entry.code).toBe(entry.count);expect(new Set(rows?.map(q=>q.id)).size,entry.code).toBe(entry.count);
    expect(Buffer.byteLength(JSON.stringify(rows)),entry.code).toBe(entry.bytes);
    expect(createHash("sha256").update(JSON.stringify(rows)).digest("hex"),entry.code).toBe(entry.revision);
    expect(await examCatalog(entry.code)).toEqual(entry);
    expect(JSON.stringify(entry)).not.toContain('"question":');
  }
  expect(materialGroups().reduce((n,g)=>n+g.items.length,0)).toBeGreaterThan(500);
},60000);
