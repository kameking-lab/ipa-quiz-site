import { describe, expect, it } from "vitest";
import { FP1_QUESTIONS } from "@/data/questions/fp1";
import mayLaunch from "@/data/questions/fp1/launch.json";
import mayAddition from "@/data/questions/fp1/2026-may-addition.json";
import q51q55 from "@/data/questions/fp1/applied-2026-september-q51-q55.json";
import q56q60 from "@/data/questions/fp1/applied-2026-september-q56-q60.json";
import q61q65 from "@/data/questions/fp1/applied-2026-september-q61-q65.json";
import { getFp1ExtensionQuestions, getFp1PublishedExtension } from "@/lib/fp1/published-extension";
import { getFp1AppliedEdition } from "@/lib/fp1/applied";
import { parseFp1SeptemberAppliedParts } from "@/lib/fp1/september-applied-parts";

describe("FP1 September combined publication boundary", () => {
  it("keeps May unchanged and publishes every September basic original including Q10", () => {
    expect(FP1_QUESTIONS.filter(q => q.season === "may")).toEqual([...mayLaunch, ...mayAddition].sort((a,b) => a.qNumber-b.qNumber));
    const september = FP1_QUESTIONS.filter(q => q.year === 2026 && q.season === "september");
    expect(september.map(q => q.qNumber)).toEqual(Array.from({length:50},(_,i)=>i+1));
    expect(new Set(FP1_QUESTIONS.map(q => q.id)).size).toBe(100);
    expect(september.every(q => q.session === "gakka" && q.lawReferenceDate === "2026-04-01")).toBe(true);
    expect(september.every(q => Object.keys(q.choices ?? {}).length === 4 && Object.keys(q.choiceExplanations ?? {}).length === 4)).toBe(true);
  });

  it("publishes all 15 September applied originals with 57 fields and the complete shared cases", () => {
    const extension = getFp1PublishedExtension("202609")!;
    expect(getFp1ExtensionQuestions("202609").map(q => q.number)).toEqual(Array.from({length:15},(_,i)=>51+i));
    expect(extension.questions.reduce((sum,q) => sum + (q.type === "originalmixedcloze" ? q.fields.length : q.answers.length),0)).toBe(57);
    expect(extension.sharedCases.map(c => c.includedQuestionNumbers)).toEqual([[51,52,53],[54,55,56],[57,58,59],[60,61,62],[63,64,65]]);
    expect(extension.sharedCases.find(c => c.number===2)?.blocks).toEqual(q51q55.sharedCases.find(c => c.number===2)?.blocks);
    expect(extension.sharedCases.find(c => c.number===4)?.blocks).toEqual(q56q60.sharedCases.find(c => c.number===4)?.blocks);
    expect([...getFp1AppliedEdition("202605")!.questions, ...getFp1ExtensionQuestions("202605")].map(q => q.number)).toEqual(Array.from({length:15},(_,i)=>51+i));
  });

  it("rejects duplicated original parts and contradictory source bindings", () => {
    expect(() => parseFp1SeptemberAppliedParts([q51q55,q51q55])).toThrow("overlap");
    const wrong = structuredClone(q61q65);
    wrong.sourceAnswerUrl = "https://www2.kinzai.or.jp/data/202605/fp01_g.pdf";
    expect(() => parseFp1SeptemberAppliedParts([q51q55,q56q60,wrong])).toThrow();
  });
});
