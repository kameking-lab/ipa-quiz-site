import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import { KANGOSHI_QUESTIONS } from "@/data/questions/kangoshi";
import { SHAROUSHI_QUESTIONS } from "@/data/questions/sharoushi";
import { FP1_QUESTIONS } from "@/data/questions/fp1";
import { getFp1AppliedEdition } from "@/lib/fp1/applied";
import { getFp1ExtensionQuestions } from "@/lib/fp1/published-extension";
import proof from "@/docs/evidence/nurse-sharo-next-bundle-20261010/INTEGRATION.json";
import afternoonGo from "@/docs/evidence/nurse-afternoon-go-20261010/INTEGRATION.json";
import threeLater from "@/docs/evidence/nurse-pm-three-later-20261010/INTEGRATION.json";
import fourLater from "@/docs/evidence/nurse-pm-four-later-20261010/INTEGRATION.json";
import fiveNext from "@/docs/evidence/nurse-pm-five-next-20261010/INTEGRATION.json";
import go9 from "@/docs/evidence/nurse-pm-go9-20261010/INTEGRATION.json";
import am7 from "./nurse-am6-publication-proof";
import pm4 from "@/docs/evidence/nurse-pm4-followup-20261010/INTEGRATION.json";
const canonical = (v: unknown): unknown => Array.isArray(v)?v.map(canonical):v&&typeof v === "object"?Object.fromEntries(Object.entries(v).sort(([a],[b])=>a<b?-1:a>b?1:0).map(([k,x])=>[k,canonical(x)])):v;
const hash=(v:unknown)=>createHash("sha256").update(JSON.stringify(canonical(v))).digest("hex");
const laterGos = [threeLater, fourLater, fiveNext, go9];
const laterIds = laterGos.flatMap(batch => batch.sourceChecks.map(check => check.id));
const expectedNurseTotal = laterGos.reduce((count, batch) => { expect(batch.previousOriginals).toBe(count); return batch.totalOriginals; }, 430);
const expectedChoiceTotal = pm4.totalChoices;
describe("frozen next nurse and labor consultant bundle",()=>{
  it("retains every root281 nurse and16 labor consultant original with identical contents",()=>{
    expect(proof.previousNurse281ObjectHashes).toHaveLength(281);expect(proof.previousSharoushi16ObjectHashes).toHaveLength(16);
    for(const item of proof.previousNurse281ObjectHashes)expect(hash(KANGOSHI_QUESTIONS.find(q=>q.id===item.id)),item.id).toBe(item.sha256);
    for(const item of proof.previousSharoushi16ObjectHashes)expect(hash(SHAROUSHI_QUESTIONS.find(q=>q.id===item.id)),item.id).toBe(item.sha256);
    expect(KANGOSHI_QUESTIONS).toHaveLength(expectedNurseTotal + am7.addedOriginals + pm4.addedOriginals + 2);expect(SHAROUSHI_QUESTIONS.length).toBeGreaterThanOrEqual(101);
    expect(KANGOSHI_QUESTIONS.reduce((n,q)=>n+Object.keys(q.choices??{}).length,0)).toBe(expectedChoiceTotal + 8);
    expect(SHAROUSHI_QUESTIONS.reduce((n,q)=>n+Object.keys(q.choices??{}).length,0)).toBeGreaterThanOrEqual(505);
    expect(new Set(KANGOSHI_QUESTIONS.map(q=>q.id)).size).toBe(expectedNurseTotal + am7.addedOriginals + pm4.addedOriginals + 2);expect(new Set(SHAROUSHI_QUESTIONS.map(q=>q.id)).size).toBe(SHAROUSHI_QUESTIONS.length);
    for(const id of proof.excludedLaterGoIds)expect(KANGOSHI_QUESTIONS.some(q=>q.id===id),id).toBe(afternoonGo.addedIds.includes(id));
    expect(new Set(laterIds).size).toBe(laterIds.length);
    expect(laterIds).toHaveLength(laterGos.reduce((n, batch) => n + batch.addedOriginals, 0));
    for(const id of laterIds)expect(KANGOSHI_QUESTIONS.filter(q=>q.id===id),id).toHaveLength(1);
    expect(KANGOSHI_QUESTIONS.filter(q=>q.type === "numeric")).toHaveLength(2);
  });
  it("preserves all129 FP1 originals while registering the sole new basic Q10",()=>{
    for(const item of proof.fp1UnchangedSourceFiles){
      let source=readFileSync(item.path,"utf8").replace(/\r\n/g,"\n");
      if(item.path==="data/questions/fp1/index.ts"){
        expect(FP1_QUESTIONS.filter(q=>q.id==="fp1-2026-september-gakka-q10")).toHaveLength(1);
        source=source.replace('import septemberQ10 from "./2026-september-q10.json";\n','').replace(', ...septemberQ10','');
      }
      expect(createHash("sha256").update(source).digest("hex"),item.path).toBe(item.sha256);
    }
    const applied=getFp1AppliedEdition("202605")!.questions.length+getFp1ExtensionQuestions("202605").length+getFp1ExtensionQuestions("202609").length;
    expect(FP1_QUESTIONS.length+applied).toBe(130);
  });
});
