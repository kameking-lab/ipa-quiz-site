import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import { KANGOSHI_QUESTIONS } from "@/data/questions/kangoshi";
import { SHAROUSHI_QUESTIONS } from "@/data/questions/sharoushi";
import { FP1_QUESTIONS } from "@/data/questions/fp1";
import { getFp1AppliedEdition } from "@/lib/fp1/applied";
import { getFp1ExtensionQuestions } from "@/lib/fp1/published-extension";
import proof from "@/docs/evidence/nurse-sharo-next-bundle-20261010/INTEGRATION.json";
const canonical = (v: unknown): unknown => Array.isArray(v)?v.map(canonical):v&&typeof v === "object"?Object.fromEntries(Object.entries(v).sort(([a],[b])=>a<b?-1:a>b?1:0).map(([k,x])=>[k,canonical(x)])):v;
const hash=(v:unknown)=>createHash("sha256").update(JSON.stringify(canonical(v))).digest("hex");
describe("frozen next nurse and labor consultant bundle",()=>{
  it("retains every root281 nurse and16 labor consultant original with identical contents",()=>{
    expect(proof.previousNurse281ObjectHashes).toHaveLength(281);expect(proof.previousSharoushi16ObjectHashes).toHaveLength(16);
    for(const item of proof.previousNurse281ObjectHashes)expect(hash(KANGOSHI_QUESTIONS.find(q=>q.id===item.id)),item.id).toBe(item.sha256);
    for(const item of proof.previousSharoushi16ObjectHashes)expect(hash(SHAROUSHI_QUESTIONS.find(q=>q.id===item.id)),item.id).toBe(item.sha256);
    expect(KANGOSHI_QUESTIONS).toHaveLength(387);expect(SHAROUSHI_QUESTIONS).toHaveLength(40);
    expect(KANGOSHI_QUESTIONS.reduce((n,q)=>n+Object.keys(q.choices??{}).length,0)).toBe(1598);
    expect(SHAROUSHI_QUESTIONS.reduce((n,q)=>n+Object.keys(q.choices??{}).length,0)).toBe(200);
    expect(new Set(KANGOSHI_QUESTIONS.map(q=>q.id)).size).toBe(387);expect(new Set(SHAROUSHI_QUESTIONS.map(q=>q.id)).size).toBe(40);
    for(const id of proof.excludedLaterGoIds)expect(KANGOSHI_QUESTIONS.some(q=>q.id===id),id).toBe(false);
    expect(KANGOSHI_QUESTIONS.filter(q=>q.type === "numeric")).toHaveLength(2);
  });
  it("preserves all FP1 source files and its129 basic/applied originals",()=>{
    for(const item of proof.fp1UnchangedSourceFiles)expect(createHash("sha256").update(readFileSync(item.path,"utf8").replace(/\r\n/g,"\n")).digest("hex"),item.path).toBe(item.sha256);
    const applied=getFp1AppliedEdition("202605")!.questions.length+getFp1ExtensionQuestions("202605").length+getFp1ExtensionQuestions("202609").length;
    expect(FP1_QUESTIONS.length+applied).toBe(129);
  });
});
