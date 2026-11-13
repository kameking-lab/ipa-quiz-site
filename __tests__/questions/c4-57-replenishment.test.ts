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
 { exam: "sakan2", a: "×○×○× ×○○×○ ○××○× ×○○×× ○○×○○", b: "ロイロイハ イイニロイ ニイイイハ イハニハハ ハハイロハ", figures: [28,29,48] },
 { exam: "sakan3", a: "×○○×○ ○××○○ ××××× ×○○○○ ○×○×○ ×○×○○", b: "", figures: [1,28] },
 { exam: "kensetsu-kikai-seibi1", a: "×○×○○ ××○×× ×○××○ ××××× ○○×○×", b: "ロロロニニ イロイハハ イハイイロ ニロイハハ ロハロハロ", figures: [46,47] },
] as const;

for (const edition of editions) describe(edition.exam, () => {
 const exam = edition.exam as ExamCode;
 const corpus = QUESTIONS_BY_EXAM[exam]!;
 const all = corpus.filter(q => q.year === 2025 && q.season === "early");
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
   expect(questionSourceEdition(q)).toBe("2025年度前期");
   expect(q.question).not.toContain("\\n");
   const [, , routeExam,yearSeason,section,qnum]=questionPagePath(q).split("/");
   expect(findQuestionByRoute(all,{exam:routeExam,yearSeason,section,qnum})?.id).toBe(q.id);
   expect(EXAM_CONFIGS[exam].sessions[0].categories).toContain(q.category);
  });
 });
 it("delivers the full edition through web and mobile without stale catalog counts",async()=>{
  expect(await getQuestionsForExam(exam)).toEqual(corpus);
  expect(await examContent(exam)).toEqual(corpus);
  const generated=JSON.parse(readFileSync("mobile/src/generated/catalog.json","utf8"));
  expect(generated.exams.find((e:{code:string})=>e.code===exam)).toEqual(await examCatalog(exam));
 });
 it("retains the source pages, original diagrams and answer provenance",()=>{
  const sources=JSON.parse(readFileSync(`data/questions/${exam}/2025-early.sources.json`,"utf8"));
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

it("distinguishes gypsum setting from its printed classification while retaining the official key",()=>{
 const q=QUESTIONS_BY_EXAM.sakan2!.find(q => q.year === 2025 && q.season === "early" && q.qNumber === 39)!;
 expect(q.choices?.ウ).toBe("せっこうプラスターは、気硬性材料である。");
 expect(q.officialAnswerNumber).toBe("イ");
 expect(q.answer).toBe("ア");
 expect(q.choiceExplanations?.ウ).toContain("水との反応");
 expect(QUESTIONS_BY_EXAM.sakan3!.find(q => q.year === 2025 && q.season === "early" && q.qNumber === 20)!.officialAnswerNumber).toBe("○");
});

it("calculates the shown circuit and keeps the existing 2級 edition intact",()=>{
 expect(3+1/(1/3+1/6)).toBe(5);
 const q=QUESTIONS_BY_EXAM["kensetsu-kikai-seibi1"]![46];
 expect(q.choices?.ウ).toBe("5Ω");
 expect(q.explanation).toContain("合計5Ω");
 expect(QUESTIONS_BY_EXAM["kensetsu-kikai-seibi2"]).toHaveLength(50);
 expect(QUESTIONS_BY_EXAM["kensetsu-kikai-seibi2"]![0].id).toBe("kensetsu-kikai-seibi2-2025-early-gakka-a-001");
});
