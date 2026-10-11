import followup from "@/docs/evidence/nurse-latest-two-followup-20261011/INTEGRATION.json";
import { describe, expect, it } from "vitest";
import { renderToStaticMarkup } from "react-dom/server";
import YearPage from "@/app/[exam]/[yearSeason]/page";
import { KANGOSHI_QUESTIONS } from "@/data/questions/kangoshi";
import { isPracticeReadyQuestion } from "@/lib/questions/filter";
import { isNumericAnswerCorrect, numericQuestionIssue } from "@/lib/questions/numeric";
import { isCompleteSelectionCorrect } from "@/lib/questions/answers";
import type { ChoiceKey } from "@/lib/questions/types";
import proof from "@/docs/evidence/nurse114-next57-20261010/INTEGRATION.json";
import afternoonGo from "@/docs/evidence/nurse-afternoon-go-20261010/INTEGRATION.json";
import afternoonNine from "@/docs/evidence/nurse-afternoon-nine-go-20261010/INTEGRATION.json";
import afternoonThree from "@/docs/evidence/nurse-afternoon-three-go-20261010/INTEGRATION.json";
import laterThree from "@/docs/evidence/nurse-pm-three-later-20261010/INTEGRATION.json";
import laterFour from "@/docs/evidence/nurse-pm-four-later-20261010/INTEGRATION.json";
import laterFive from "@/docs/evidence/nurse-pm-five-next-20261010/INTEGRATION.json";
import go9 from "@/docs/evidence/nurse-pm-go9-20261010/INTEGRATION.json";
import pm4 from "@/docs/evidence/nurse-pm4-followup-20261010/INTEGRATION.json";
import { historicalNurseHash } from "./nurse-pm-category-hash";

const added=KANGOSHI_QUESTIONS.filter(q=>proof.addedIds.includes(q.id));
const laterVerifiedIds = new Set([
  ...afternoonGo.addedIds,
  ...afternoonNine.sourceChecks.map(check => check.id),
  ...afternoonThree.sourceChecks.map(check => check.id),
  ...laterThree.sourceChecks.map(check => check.id),
  ...laterFour.sourceChecks.map(check => check.id),
  ...laterFive.sourceChecks.map(check => check.id),
  ...go9.sourceChecks.map(check => check.id),
  ...pm4.sourceChecks.map(check => check.id),
]);

describe("saved114th afternoon next57 registration",()=>{
  it("preserves all previous281 originals and adds the exact ready56 plus the source-verified decimal original",()=>{
    expect(proof.previous281ObjectHashes).toHaveLength(281);
    for(const old of proof.previous281ObjectHashes){const q=KANGOSHI_QUESTIONS.find(q=>q.id===old.id);expect(q,old.id).toBeDefined();expect(historicalNurseHash(q,old.id),old.id).toBe(old.sha256);}
    expect(added).toHaveLength(57);
    expect(added.map(q=>q.id).sort()).toEqual(proof.addedIds.slice().sort());
    expect(added.filter(q=>q.type === "multiple-choice")).toHaveLength(56);
    expect(added.filter(q=>q.type === "numeric")).toHaveLength(1);
    expect(added.reduce((n,q)=>n+Object.keys(q.choices??{}).length,0)).toBe(238);
    expect(new Set(KANGOSHI_QUESTIONS.map(q=>q.id)).size).toBe(KANGOSHI_QUESTIONS.length);
    for(const held of proof.heldIdsNotRegistered)expect(KANGOSHI_QUESTIONS.some(q=>q.id===held),held).toBe(laterVerifiedIds.has(held)||held==="kangoshi-2024-annual-pm-q107"||followup.addedIds.includes(held));
    expect(proof.heldIdsNotRegistered).toHaveLength(38);
    for(const n of [27,45,55,71,80]){
      const id=`kangoshi-2024-annual-pm-q${n}`;
      expect(laterVerifiedIds.has(id),id).toBe(true);
      expect(KANGOSHI_QUESTIONS.some(q=>q.id===id),id).toBe(true);
    }
  });
  it("retains original sessions, full choice explanations, shared cases and multiple-selection keys",()=>{
    for(const q of added){
      expect(q.year).toBe(2024);expect(q.session).toBe("pm");expect(q.id).toBe(`kangoshi-2024-annual-pm-q${q.qNumber}`);
      expect(q.sourcePdfUrl).toMatch(/tp250428-05c_01\.pdf#page=\d+$/);
      expect(q.sourceAnswerUrl).toContain("tp250428-05seitou.pdf");
      expect(isPracticeReadyQuestion(q),q.id).toBe(true);
      if(q.type === "numeric")continue;
      expect(Object.keys(q.choiceExplanations??{}).sort()).toEqual(Object.keys(q.choices??{}).sort());
      for(const reason of Object.values(q.choiceExplanations??{}))expect(reason?.trim().length).toBeGreaterThan(0);
      if((q.requiredSelections??1)>1){const answers=q.answer as ChoiceKey[];expect(isCompleteSelectionCorrect(answers,[...answers].reverse())).toBe(true);expect(isCompleteSelectionCorrect(answers,answers.slice(0,1))).toBe(false);}
    }
    const q116=added.find(q=>q.qNumber===116)!;expect(q116.answer).toEqual(["ア","オ"]);expect(q116.requiredSelections).toBe(2);
    for(const batch of proof.batches)for(const source of batch.sourceChecks){const q=added.find(q=>q.id===source.id)!;expect(historicalNurseHash(q,source.id),source.id).toBe(source.objectSha256);}
  });
  it("opens the real decimal PM90 from the year list without initial answer exposure or fake choices",async()=>{
    const q=added.find(q=>q.qNumber===90)!;
    expect(q.numericAnswer).toEqual({format:"decimal",precision:1,unit:"BMI"});expect(numericQuestionIssue(q)).toBeUndefined();
    expect(isNumericAnswerCorrect(q,"２３．４")).toBe(true);expect(isNumericAnswerCorrect(q,"23.4375")).toBe(false);expect(q.choices).toBeUndefined();
    const doc=new DOMParser().parseFromString(renderToStaticMarkup(await YearPage({params:Promise.resolve({exam:"kangoshi",yearSeason:"2024-annual"})})),"text/html");
    const link=[...doc.querySelectorAll('a[href^="/quiz?"]')].find(a=>new URL(a.getAttribute("href")!,"https://www.kakomon-ai.jp").searchParams.get("question")===q.id);
    expect(link).toBeDefined();const query=new URL(link!.getAttribute("href")!,"https://www.kakomon-ai.jp").searchParams;
    expect(Object.fromEntries(query)).toMatchObject({exam:"kangoshi",year:"2024",session:"pm",question:q.id,returnTo:"/kangoshi/2024-annual"});
    expect(doc.body.textContent).not.toContain("23.4 BMI");
  });
});
