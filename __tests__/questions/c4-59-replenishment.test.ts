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

// Independently transcribed from the official answer tables, five per block.
const editions = [
 { exam: "kenchiku-bankin2", season: "early", a: "×○××× ×○○×× ○×××○ ×○○○× ○○○×○", b: "ロニニロハ イイハニイ イイニハハ ロイイロハ イイニニニ", figures: [3,18,23,28,37,39,49] },
 { exam: "haiden-seigyo1", season: "early", a: "○××○○ ××○○× ○×○○○ ○×××× ○○×○○", b: "ロハハイハ イイハハハ イハロイロ ハハイニニ ハニハハイ", figures: [7,29,30,33,38,43,47,48,49] },
 { exam: "haiden-seigyo3", season: "late", a: "××○○○ ○○○×○ ○○○○× ×××○× ○×××○ ○○×○×", b: "", figures: [5,6,7,8,20] },
] as const;

for (const edition of editions) describe(edition.exam, () => {
 const exam = edition.exam as ExamCode;
 const all = QUESTIONS_BY_EXAM[exam]!.filter(q => q.year === 2025);
 const official = (edition.a+edition.b).replaceAll(" ", "");
 it("preserves printed numbers, every official key, and their scoring/display mapping", () => {
  expect(all).toHaveLength(official.length);
  expect(new Set(all.map(q=>q.id)).size).toBe(official.length);
  expect(new Set(all.map(questionPagePath)).size).toBe(official.length);
  all.forEach((q,i)=>{
   const isB=edition.b!=="" && i>=25; const n=isB?i-24:i+1;
   expect(q.qNumber).toBe(i+1);
   expect(questionNumberLabel(q)).toBe(edition.b===""?String(n):`${isB?"B":"A"}群 ${n}`);
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
   expect(questionSourceEdition(q)).toBe(edition.season==="late"?"2025年度後期":"2025年度前期");
   expect(q.question).not.toContain("\\n");
   const [, , routeExam,yearSeason,section,qnum]=questionPagePath(q).split("/");
   expect(findQuestionByRoute(all,{exam:routeExam,yearSeason,section,qnum})?.id).toBe(q.id);
   expect(EXAM_CONFIGS[exam].sessions[0].categories).toContain(q.category);
  });
 });
 it("delivers the full edition through web and mobile without stale catalog counts",async()=>{
  expect((await getQuestionsForExam(exam)).filter(q => q.year === 2025)).toEqual(all);
  expect((await examContent(exam))?.filter(q => "year" in q && q.year === 2025)).toEqual(all);
  const generated=JSON.parse(readFileSync("mobile/src/generated/catalog.json","utf8"));
  expect(generated.exams.find((e:{code:string})=>e.code===exam)).toEqual(await examCatalog(exam));
 });
 it("retains the source pages, original diagrams and answer provenance",()=>{
  const sources=JSON.parse(readFileSync(`data/questions/${exam}/2025-${edition.season}.sources.json`,"utf8"));
  expect(sources.review).toHaveLength(all.length);
  expect(sources.choiceExplanationCount).toBe(edition.b===""?60:150);
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

it("preserves symbol distractors and their official key",()=>{
 const q=QUESTIONS_BY_EXAM["haiden-seigyo1"]![46];
 expect(q.officialAnswerNumber).toBe("ニ");
 expect(q.answer).toBe("エ");
 expect(q.choiceExplanations?.エ).toContain("U");
 expect(q.choiceExplanations?.ウ).toMatch(/^不正解。/);
 const dims=QUESTIONS_BY_EXAM["haiden-seigyo3"]!.filter(q => q.year === 2025)[23];
 expect(dims.question).toContain("高さ：T");
 expect(dims.officialAnswerNumber).toBe("×");
});
it("verifies the numerical explanations against the original circuit values",()=>{
 expect(Math.hypot(12,100/4-100/5)).toBe(13);
 expect(QUESTIONS_BY_EXAM["haiden-seigyo1"]![28].answer).toBe("ア");
 expect(QUESTIONS_BY_EXAM["haiden-seigyo1"]![28].explanation).toContain("13A");
 expect(12/((4+2)/2)).toBe(4);
 expect(QUESTIONS_BY_EXAM["haiden-seigyo3"]!.filter(q => q.year === 2025)[6].explanation).toContain("4A");
 expect(100*3.14+5*3).toBe(329);
 expect(QUESTIONS_BY_EXAM["kenchiku-bankin2"]![28].choices?.イ).toBe("329mm");
});
