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
it.each([
  ["unko-kanrisha-kamotsu","運行管理者（貨物）"],
  ["unko-kanrisha-ryokaku","運行管理者（旅客）"],
  ["kikenbutsu-otsu4","危険物取扱者 乙種第4類"],
  ["kikenbutsu-kou","危険物取扱者 甲種"],
  ["kikenbutsu-hei","危険物取扱者 丙種"],
  ["shobo-setsubishi-kou1","消防設備士 甲種第1類"],
  ["shobo-setsubishi-kou4","消防設備士 甲種第4類"],
  ["shobo-setsubishi-otsu6","消防設備士 乙種第6類"],
])("%s is searchable by its Japanese qualification name in the saved catalog",(code,name)=>{
  expect(generated.exams.find(entry=>entry.code===code)?.name).toBe(name);
});
it("independently includes every released skill and inseparable annotated note",async()=>{
  const skills=await examContent("material.denko2-skill");
  expect(skills?.map(q=>q.id)??[]).toEqual(isExamPublished("denko2")?DENKO2_SKILL_PROBLEMS.map(q=>q.id):[]);
  const notes=await examContent("material.st-annotated-notes");
  expect(notes?.map(q=>q.id)).toEqual(getAnnotatedNotes().map(n=>`note.${n.id}`));
  for(const row of notes??[]){expect(row).toMatchObject({kind:"annotated-note",note:{scoringEnabled:false,registerInQuestionPool:false,originalReferenceRequired:true}});}
});
const practiceCodes = getRegisteredExamCodes();

it("lists all web-published exams, library papers, and alternative readers", () => {
  const codes = generated.exams.map(entry => entry.code);
  expect(new Set(codes)).toEqual(new Set(catalogCodes()));
  expect(new Set(codes).size).toBe(codes.length);
  expect(materialGroups().reduce((total, group) => total + group.items.length, 0)).toBeGreaterThan(500);
});

it.each(generated.exams)("$code matches the published content and catalog metadata", async (entry) => {
  const rows = await examContent(entry.code);
  expect(rows?.length).toBe(entry.count);
  expect(new Set(rows?.map(row => row.id)).size).toBe(entry.count);
  const serialized = JSON.stringify(rows);
  expect(Buffer.byteLength(serialized)).toBe(entry.bytes);
  expect(createHash("sha256").update(serialized).digest("hex")).toBe(entry.revision);
  expect(await examCatalog(entry.code)).toEqual(entry);
  expect(JSON.stringify(entry)).not.toContain('"question":');

  const practiceCode = practiceCodes.find(code => code === entry.code);
  if (practiceCode) {
    const webQuestions = (await getQuestionsForExam(practiceCode)).filter(isPracticeReadyQuestion);
    expect(rows?.map(row => row.id)).toEqual(webQuestions.map(question => question.id));
  }
});
