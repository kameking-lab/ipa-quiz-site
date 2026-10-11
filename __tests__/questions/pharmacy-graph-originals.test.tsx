import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { QuestionFigures } from "@/components/quiz/QuestionFigures";
import { YAKUZAISHI_QUESTIONS } from "@/data/questions/yakuzaishi";
import { isPracticeReadyQuestion } from "@/lib/questions/filter";
import proof from "@/docs/evidence/pharmacy-latest-two-graph-manifest.json";

describe("original pharmacist graph-reading questions", () => {
  it("preserves six-choice graphs and multi-select official keys in the loader", () => {
    for (const r of proof.questions) {
      const matches=YAKUZAISHI_QUESTIONS.filter(q=>q.id===r.id);
      expect(matches,r.id).toHaveLength(1);
      const q=matches[0]!;
      expect(isPracticeReadyQuestion(q),r.id).toBe(true);
      expect(q.officialAnswerNumber,r.id).toBe(r.officialKey.join(","));
      expect(q.requiredSelections,r.id).toBe(r.officialKey.length);
      expect(Object.keys(q.choices??{}),r.id).toHaveLength(r.choiceExplanationCount);
      expect(Object.keys(q.choiceExplanations??{}).sort()).toEqual(Object.keys(q.choices??{}).sort());
    }
  });

  it("renders all eleven original pixel assets in order, including three-page Q181", () => {
    expect(proof.questions.flatMap(r=>r.crops)).toHaveLength(11);
    for(const r of proof.questions.filter(r=>r.crops.length)) {
      const q=YAKUZAISHI_QUESTIONS.find(q=>q.id===r.id)!;
      const doc=new DOMParser().parseFromString(renderToStaticMarkup(<QuestionFigures question={q}/>),"text/html");
      const images=Array.from(doc.querySelectorAll("img"));
      expect(images,r.id).toHaveLength(r.crops.length);
      r.crops.forEach((crop,index)=>{
        expect(createHash("sha256").update(readFileSync(crop.path)).digest("hex")).toBe(crop.sha256);
        expect(images[index]?.getAttribute("src")).toBe(q.imageUrls![index]);
        expect(images[index]?.getAttribute("alt")).toBe(q.imageAltTexts![index]);
        expect(q.imageAltTexts![index]).not.toMatch(/正解|正答|16時間|1.8％|6000/);
      });
    }
    expect(YAKUZAISHI_QUESTIONS.find(q=>q.id==="yakuzaishi-2026-annual-theory-q181")!.imageUrls).toHaveLength(3);
  });

  it("retains the titration procedure needed to solve Q97 independently",()=>{
    const q=YAKUZAISHI_QUESTIONS.find(q=>q.id==="yakuzaishi-2026-annual-theory-q97")!;
    expect(q.question).toContain("第一中和点、第二中和点");
    expect(q.question).toContain("Na2CO3：105.99");
    expect(q.question).toContain("B = 0.25 mL");
    expect(q.explanation).toContain("1.77％");
  });
});
