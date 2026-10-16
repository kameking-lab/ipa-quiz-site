import { describe, expect, it } from "vitest";
import React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { existsSync } from "node:fs";
import path from "node:path";
import { MARITIME2_ALL_QUESTIONS as stored, MARITIME2_QUESTIONS as ready } from "@/data/questions/maritime2";
import { isPracticeReadyQuestion } from "@/lib/questions/filter";
import { gradeNativeB, normalizeQuestionData } from "@/lib/questions/native-b";
import { QuestionAnswerCard } from "@/components/quiz/QuestionAnswerCard";
import { ExplanationCard } from "@/components/quiz/ExplanationCard";
import { buildQuestionJsonLd } from "@/lib/seo/question-jsonld";

describe("maritime2 data-only original contract", () => {
  it("retains190 originals,150 MC,40 native parents and350 official cells across the two sittings", () => {
    expect(stored).toHaveLength(190); expect(ready).toHaveLength(190);
    expect(new Set(stored.map(q => q.id)).size).toBe(190);
    expect(stored.filter(q => q.type === "multiple-choice")).toHaveLength(150);
    expect(stored.filter(q => q.type === "native-b")).toHaveLength(40);
    expect(stored.reduce((n,q) => n + (q.nativeB?.slots.length ?? 1),0)).toBe(350);
    expect(stored.filter(q => q.nativeB?.mode === "binary")).toHaveLength(11);
    expect(stored.filter(q => q.nativeB?.mode === "shared-bank")).toHaveLength(29);
    for (const season of ["march","september"]) expect(stored.filter(q => q.season === season)).toHaveLength(95);
    expect(stored.every(q => q.exam === stored[0]!.exam && q.year === 2026)).toBe(true);
    expect(stored[0]!.exam).toBe("maritime2");
    expect(stored.every(isPracticeReadyQuestion)).toBe(true);
    expect(stored.filter(q => isPracticeReadyQuestion({...q, needsReview:true}))).toHaveLength(0);
  });
  it("renders every MC alternative through the real answer card with aligned explanations", () => {
    let radios=0;
    for (const q of stored.filter(q => q.type === "multiple-choice")) {
      expect(Array.isArray(q.choices)).toBe(false);
      const keys=Object.keys(q.choices!);expect([4,5]).toContain(keys.length);
      expect(Object.keys(q.choiceExplanations!)).toEqual(keys);
      expect(q.answer).toBe(keys[Number(q.officialAnswerNumber)-1]);
      const html=renderToStaticMarkup(<QuestionAnswerCard question={q} questionId={q.id} choices={q.choices} answerKey={q.answer} exam={q.exam} year={q.year} season={q.season} session={q.session} qNumber={q.qNumber} part={q.part}/>);
      expect((html.match(/role="radio"/g)??[])).toHaveLength(keys.length);radios+=keys.length;
      const el=document.createElement("div");el.innerHTML=html;
      for (const text of Object.values(q.choices!)) expect(el.textContent!.replace(/\s+/g,"")).toContain(text!.replace(/\s+/g,""));
    }
    expect(radios).toBe(614);
  });
  it("grades200 independent native slots while preserving original B labels and repeated-bank selection", () => {
    let perfect=0,partial=0;
    for (const q of stored.filter(q=>q.type==="native-b")) {
      expect(normalizeQuestionData(q)).toEqual(q);expect(q.answer).toBe("");expect(q.choices).toBeUndefined();
      const b=q.nativeB!;expect(b.slots.map(s=>s.label)).toEqual(["ア","イ","ウ","エ","オ"]);
      expect(b.officialLabel?.replace(/[-－−ー]/g, "")).toBe(`B${q.qNumber}`);expect(q.part).toBe("b");
      expect(b.candidates).toHaveLength(b.mode==="binary"?2:10);
      const picks=Object.fromEntries(b.slots.map(s=>[s.label,s.answer]));perfect+=gradeNativeB(b,picks).correctSlots;
      delete picks[b.slots[0]!.label];const p=gradeNativeB(b,picks);expect(p.slotResults[0]!.status).toBe("unanswered");partial+=p.correctSlots;
      expect(gradeNativeB(b,{}).correctSlots).toBe(0);
      expect(gradeNativeB(b,Object.fromEntries(b.slots.map(s=>[s.label,b.candidates[0]!.id]))).slotResults.every(s=>s.status!=="invalid")).toBe(true);
    }
    expect(perfect).toBe(200);expect(partial).toBe(160);
  });
  it("renders190 standard official-answer links, source images and attributed JSONLD without private source paths", () => {
    for (const q of stored) {
      expect(q.sourceAnswerUrl).toMatch(/^https:\/\/www\.nichimu\.or\.jp\/.*-kaito\.pdf$/);
      const html=renderToStaticMarkup(<ExplanationCard question={q} selected={undefined} isCorrect={true} starred={false} onToggleStar={()=>{}} onNext={()=>{}} onAskAI={()=>{}}/>);
      expect(html).toContain(`href="${q.sourceAnswerUrl}"`);
      expect(q.imageUrls).toHaveLength(1);
      for (const url of q.imageUrls!) expect(existsSync(path.join(process.cwd(),"public",url.slice(1)))).toBe(true);
      const json=JSON.stringify(buildQuestionJsonLd({question:q,pageUrlAbs:`https://www.kakomon-ai.jp/q/maritime2/${q.year}-${q.season}/${q.session}/q${q.qNumber}${q.part}`,title:"第二級海上無線通信士",lastUpdatedISO:"2026-10-16"}));
      expect(json).toContain("日本無線協会");expect(json).not.toContain("C:/");expect(json).not.toContain("C:\\\\");
    }
  });
});
