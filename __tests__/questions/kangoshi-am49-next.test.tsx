import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { KANGOSHI_QUESTIONS } from "@/data/questions/kangoshi";
import { QuestionFigures } from "@/components/quiz/QuestionFigures";
import { isPracticeReadyQuestion } from "@/lib/questions/filter";
import { isCompleteSelectionCorrect } from "@/lib/questions/answers";
import type { ChoiceKey } from "@/lib/questions/types";
import YearPage from "@/app/[exam]/[yearSeason]/page";
import proof from "@/docs/evidence/nurse-am49-next-20261010/INTEGRATION.json";

const canonical = (value: unknown): unknown => Array.isArray(value) ? value.map(canonical) : value && typeof value === "object" ? Object.fromEntries(Object.entries(value).sort(([a],[b]) => a<b?-1:a>b?1:0).map(([key,v]) => [key,canonical(v)])) : value;
const sha = (value: string | Buffer) => createHash("sha256").update(value).digest("hex");
const hash = (value: unknown) => sha(JSON.stringify(canonical(value)));
const added = KANGOSHI_QUESTIONS.filter(q => proof.addedIds.includes(q.id));

describe("frozen saved nursing morning49 originals", () => {
  it("adds exactly the verified49 originals and201 choices, retaining every old338 object", () => {
    expect(proof.previous338ObjectHashes).toHaveLength(338);
    for (const old of proof.previous338ObjectHashes) expect(hash(KANGOSHI_QUESTIONS.find(q=>q.id===old.id)),old.id).toBe(old.sha256);
    expect(added).toHaveLength(49);
    expect(added.map(q=>q.id).sort()).toEqual(proof.addedIds.slice().sort());
    expect(added.reduce((sum,q)=>sum+Object.keys(q.choices??{}).length,0)).toBe(201);
    expect(new Set(KANGOSHI_QUESTIONS.map(q=>q.id)).size).toBe(KANGOSHI_QUESTIONS.length);
    expect(proof.heldIdsNotRegistered).toHaveLength(11);
    for(const id of proof.heldIdsNotRegistered) expect(KANGOSHI_QUESTIONS.some(q=>q.id===id),id).toBe(false);
    expect(KANGOSHI_QUESTIONS.some(q=>q.id==="kangoshi-2025-annual-am-q32")).toBe(false);
    expect(KANGOSHI_QUESTIONS.some(q=>q.id==="kangoshi-2025-annual-am-q79")).toBe(false);
  });
  it("retains source-checked full cases, official single/multiple keys and every choice explanation", () => {
    for(const item of proof.sourceChecks){
      const q=added.find(q=>q.id===item.id)!;
      expect(hash(q),q.id).toBe(item.objectSha256);
      expect(q.session).toBe("am");
      expect(q.id).toBe(`kangoshi-${q.year}-annual-am-q${q.qNumber}`);
      expect(q.sourcePdfUrl).toContain(`#page=${item.sourcePhysicalPage}`);
      expect(item.sharedPremiseIncluded).toBe(true);
      expect(isPracticeReadyQuestion(q),q.id).toBe(true);
      expect(Object.keys(q.choiceExplanations??{}).sort()).toEqual(Object.keys(q.choices??{}).sort());
      for(const reason of Object.values(q.choiceExplanations??{}))expect(reason?.trim().length).toBeGreaterThan(0);
      expect(q.requiredSelections).toBe(item.requiredSelections);
      if((q.requiredSelections??1)>1){const answer=q.answer as ChoiceKey[];expect(isCompleteSelectionCorrect(answer,[...answer].reverse())).toBe(true);expect(isCompleteSelectionCorrect(answer,answer.slice(0,1))).toBe(false);}
    }
  });
  it("renders the original supplementary Q107 figure with its source alt text and exact official1+4 key", () => {
    const q=added.find(q=>q.id==="kangoshi-2024-annual-am-q107")!;
    expect(q.answer).toEqual(["ア","エ"]);expect(q.requiredSelections).toBe(2);
    expect(Object.keys(q.choices??{})).toHaveLength(5);expect(q.explanationCoverage).toBe("full");
    expect(sha(readFileSync(proof.figure.assetTargetSitePath))).toBe(proof.figure.assetSha256);
    const doc=new DOMParser().parseFromString(renderToStaticMarkup(<QuestionFigures question={q}/>),"text/html");
    const img=doc.querySelector("img")!;expect(img.getAttribute("src")).toBe(q.imageUrls![0]);
    expect(img.getAttribute("alt")).toBe(proof.figure.figureAltText);expect(img.getAttribute("loading")).toBe("lazy");
    expect(q.imageAltTexts).toEqual([proof.figure.figureAltText]);
  });
  it("opens Q107 from its original morning year list", async () => {
    const q=added.find(q=>q.id==="kangoshi-2024-annual-am-q107")!;
    const doc=new DOMParser().parseFromString(renderToStaticMarkup(await YearPage({params:Promise.resolve({exam:"kangoshi",yearSeason:"2024-annual"})})),"text/html");
    const link=[...doc.querySelectorAll('a[href^="/quiz?"]')].find(a=>new URL(a.getAttribute("href")!,"https://www.kakomon-ai.jp").searchParams.get("question")===q.id);
    expect(link).toBeDefined();expect(Object.fromEntries(new URL(link!.getAttribute("href")!,"https://www.kakomon-ai.jp").searchParams)).toMatchObject({exam:"kangoshi",year:"2024",session:"am",question:q.id,returnTo:"/kangoshi/2024-annual"});
  });
});
