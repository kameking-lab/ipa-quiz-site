import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { QuestionFigures } from "@/components/quiz/QuestionFigures";
import { YAKUZAISHI_QUESTIONS } from "@/data/questions/yakuzaishi";
import { isPracticeReadyQuestion } from "@/lib/questions/filter";
import proof from "@/docs/evidence/pharmacy-latest-two-model-manifest.json";

const cases = [[2025,46,"4"],[2025,47,"4"],[2025,48,"4"],[2025,51,"2"],[2025,94,"1,2"],[2025,175,"1,3"],[2026,48,"5"],[2026,173,"2,5"],[2026,174,"5"],[2026,175,"3,5"]] as const;

describe("fixed pharmacist linear-model and physical-science originals", () => {
  it("loads the exact ten official answer sets as practice-ready originals", () => {
    for (const [year,number,key] of cases) {
      const id=`yakuzaishi-${year}-annual-${number<=90?"required":"theory"}-q${number}`;
      const matches=YAKUZAISHI_QUESTIONS.filter(q=>q.id===id);
      expect(matches,id).toHaveLength(1);
      const q=matches[0]!;
      expect(isPracticeReadyQuestion(q),id).toBe(true);
      expect(q.officialAnswerNumber,id).toBe(key);
      expect(q.requiredSelections,id).toBe(key.split(",").length);
      expect(Object.keys(q.choiceExplanations??{}).sort()).toEqual(Object.keys(q.choices??{}).sort());
    }
  });

  it("renders the five immutable graphs and tables without leaking answers in alt text", () => {
    const figures=proof.questions.filter(r=>r.crop);
    expect(figures).toHaveLength(5);
    for(const r of figures) {
      const crop=r.crop!;
      const q=YAKUZAISHI_QUESTIONS.find(q=>q.id===r.id)!;
      expect(createHash("sha256").update(readFileSync(crop.path)).digest("hex")).toBe(crop.sha256);
      const doc=new DOMParser().parseFromString(renderToStaticMarkup(<QuestionFigures question={q}/>),"text/html");
      expect(doc.querySelectorAll("img")).toHaveLength(1);
      expect(doc.querySelector("img")?.getAttribute("src")).toBe(q.imageUrls![0]);
      expect(doc.querySelector("img")?.getAttribute("alt")).toBe(q.imageAltTexts![0]);
      expect(q.imageAltTexts![0]).not.toMatch(/正解|チキソトロピー|非晶質|35 mg|34.65/);
    }
  });

  it("keeps the repaired Q51 source boundary and qualifies the Q46 kinetic assumption",()=>{
    expect(YAKUZAISHI_QUESTIONS.find(q=>q.id==="yakuzaishi-2025-annual-required-q51")!.sourcePdfUrl).toMatch(/#page=23$/);
    expect(YAKUZAISHI_QUESTIONS.find(q=>q.id==="yakuzaishi-2025-annual-required-q46")!.explanation).toContain("ka と ke が変わらなければ");
  });
});
