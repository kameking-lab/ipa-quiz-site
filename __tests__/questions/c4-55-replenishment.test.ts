import { readFileSync, existsSync } from "node:fs";
import { describe, expect, it } from "vitest";
import { QUESTIONS_BY_EXAM } from "@/data/questions";
import { getQuestionsForExam } from "@/lib/questions/get-questions";
import { formatQuestionAnswerForDisplay, choiceDisplayLabel, questionNumberLabel } from "@/lib/questions/display";
import { isPracticeReadyQuestion, shuffleChoices } from "@/lib/questions/filter";
import { questionPagePath, findQuestionByRoute } from "@/lib/seo/question-url";
import { questionSourceEdition } from "@/lib/questions/source-label";
import { buildQuestionJsonLd } from "@/lib/seo/question-jsonld";
import { EXAM_CONFIGS } from "@/lib/exam-config";
import { examCatalog, examContent } from "@/mobile/shared/catalog-source";
import type { ChoiceKey, ExamCode } from "@/lib/questions/types";

// Transcribed independently from the official answer tables, five answers per block.
const editions = [
 { exam: "kinzoku-press2", a: "×○×○× ○×○×× ○×○×○ ○×○×× ○○××○", b: "イニニロニ ロハハイイ ロイハハロ ロニハハニ イロハロハ", figures: [23,28,31,45,46,49] },
 { exam: "naiso-kosei2", a: "○○○×○ ×○○○○ ○××○× ○××○○ ××○×○", b: "ハイイロハ ニハハイハ ハイハニハ ロハハロニ ハハロイニ", figures: [6,7,29,30,31,32,44] },
 { exam: "bousui-urethane2", a: "×○○○○ ××○○○ ○×××× ○○○×× ○○○○○", b: "ニハハハロ イニニイニ ハロイロニ ニハイロロ ニロニハハ", figures: [3,27,28] },
] as const;
for (const edition of editions) describe(edition.exam, () => {
 const exam = edition.exam as ExamCode;
 const all = QUESTIONS_BY_EXAM[exam]!;
 const official = (edition.a+edition.b).replaceAll(" ", "");
 it("preserves all official answers and printed labels through routing and scoring", () => {
  expect(all).toHaveLength(50);
  expect(new Set(all.map(q=>q.id)).size).toBe(50);
  expect(new Set(all.map(questionPagePath)).size).toBe(50);
  all.forEach((q,i)=>{
   const isB=i>=25; const n=isB?i-24:i+1;
   expect(q.qNumber).toBe(i+1);
   expect(questionNumberLabel(q)).toBe(`${isB?"B":"A"}群 ${n}`);
   expect(q.officialAnswerNumber).toBe(official[i]);
   expect(q.answer).toBe(isB?"アイウエ"["イロハニ".indexOf(official[i])]:official[i]==="○"?"ア":"イ");
   expect(formatQuestionAnswerForDisplay(q,q.answer)).toBe(official[i]);
   expect(Object.keys(q.choices!)).toEqual(isB?["ア","イ","ウ","エ"]:["ア","イ"]);
   expect(Object.keys(q.choiceExplanations!)).toEqual(Object.keys(q.choices!));
   for(const key of Object.keys(q.choices!)) {
    expect(q.choiceExplanations![key as ChoiceKey]).toMatch(key===q.answer?/^正解。/:/^不正解。/);
    if(isB)expect(choiceDisplayLabel(exam,key as ChoiceKey)).toBe("イロハニ"["アイウエ".indexOf(key)]);
   }
   expect(isPracticeReadyQuestion(q),q.id).toBe(true);
   expect(shuffleChoices(q)).toBe(q);
   expect(questionSourceEdition(q)).toBe("2025年度前期");
   expect(q.question).not.toContain("\\n");
   const [, , routeExam,yearSeason,section,qnum]=questionPagePath(q).split("/");
   expect(findQuestionByRoute(all,{exam:routeExam,yearSeason,section,qnum})?.id).toBe(q.id);
   expect(EXAM_CONFIGS[exam].sessions[0].categories).toContain(q.category);
  });
 });
 it("delivers the complete edition through web and mobile loaders",async()=>{
  expect(await getQuestionsForExam(exam)).toEqual(all);
  expect(await examContent(exam)).toEqual(all);
  const generated=JSON.parse(readFileSync("mobile/src/generated/catalog.json","utf8"));
  expect(generated.exams.find((e:{code:string})=>e.code===exam)).toEqual(await examCatalog(exam));
 });
 it("retains original figures and source provenance",()=>{
  const sources=JSON.parse(readFileSync(`data/questions/${exam}/2025-early.sources.json`,"utf8"));
  expect(sources.review).toHaveLength(50);
  expect(sources.choiceExplanationCount).toBe(150);
  expect(sources.sources.every((s:{httpStatus:number;sha256:string})=>s.httpStatus===200&&/^[a-f0-9]{64}$/.test(s.sha256))).toBe(true);
  expect(all.filter(q=>q.hasImage).map(q=>q.qNumber)).toEqual(edition.figures);
  all.forEach((q,i)=>{
   expect(sources.review[i].officialAnswer).toBe(official[i]);
   expect(q.sourcePdfUrl).toMatch(/kentei\.javada\.or\.jp\/pdf\/.*#page=\d+$/);
   expect(sources.review[i].pdfPage).toBe(Number(q.sourcePdfUrl!.split("#page=")[1]));
   const graph=buildQuestionJsonLd({question:q,pageUrlAbs:`https://www.kakomon-ai.jp${questionPagePath(q)}`,title:exam})["@graph"][0];
   if(!("hasPart" in graph)||!("acceptedAnswer" in graph.hasPart)||Array.isArray(graph.hasPart.acceptedAnswer))throw new Error("Missing answer");
   expect(graph.hasPart.author.name).toBe("中央職業能力開発協会");
   expect(graph.hasPart.acceptedAnswer.text).toContain(official[i]);
   if(q.hasImage){
    expect(q.imageUrls).toHaveLength(1); expect(q.imageAltTexts![0].length).toBeGreaterThan(10);
    expect(existsSync("public"+q.imageUrls![0])).toBe(true);
    const png=readFileSync("public"+q.imageUrls![0]);
    expect(png.readUInt32BE(16)).toBeGreaterThan(80);expect(png.readUInt32BE(20)).toBeGreaterThan(50);
   }
  });
 });
});

it("retains the different official scoring for the same printed building symbol", () => {
 const naiso=QUESTIONS_BY_EXAM["naiso-kosei2"]![5];
 const bousui=QUESTIONS_BY_EXAM["bousui-urethane2"]![2];
 expect(naiso.officialAnswerNumber).toBe("×"); expect(naiso.answer).toBe("イ");
 expect(bousui.officialAnswerNumber).toBe("○"); expect(bousui.answer).toBe("ア");
 expect(naiso.explanation).toContain("そのまま採用");
 expect(bousui.explanation).toContain("そのまま採用");
});
it("checks the given quantities and distinguishes the original door diagrams", () => {
 const press=QUESTIONS_BY_EXAM["kinzoku-press2"]!;
 const naiso=QUESTIONS_BY_EXAM["naiso-kosei2"]!;
 const bousui=QUESTIONS_BY_EXAM["bousui-urethane2"]!;
 expect(2+1/(1/2+1/2)).toBe(3);
 expect(press[48].explanation).toContain("3 Ω");
 expect(1*0.002*1000*1.2).toBe(2.4);
 expect(bousui[46].choices?.イ).toBe("2.4");
 expect(naiso[30].choiceExplanations?.ウ).toContain("片開き");
 expect(naiso[30].choiceExplanations?.エ).toContain("両開き");
});
