import {expect,it} from "vitest";
import {auditProtectedArtifact,fingerprints,containsGradingIndex} from "../scripts/web-content-audit";
const gate='<p role="status">利用枠を確認しています…</p>';
it("treats official source links as public metadata while retaining long question text",()=>{
  const question="未許可の本文を検出します。".repeat(8);
  expect(fingerprints({accepted:{question,questionReference:"https://www.ipa.go.jp/"+"source".repeat(20)}})).toEqual([question.slice(0,80)]);
});
it("rejects answers hidden inside escaped Flight frames even when the visible gate exists",()=>{
  const payload='0:["$","$L1",null,{"items":[{"id":"q1","correctChoice":2}]}]';
  const html=gate+`<script>self.__next_f.push(${JSON.stringify([1,payload])})</script>`;
  expect(()=>auditProtectedArtifact(html,[],true,false)).toThrow("Serialized protected");
});
it("distinguishes a public reference-only ID from the actual grading index, including escaped JSON",()=>{
  const ids=["private-q1","private-q12","private-q2"];
  expect(containsGradingIndex('return "private-q12"===id',ids,"private-q12")).toBe(false);
  for(const text of ['[{"id":"private-q1","correctChoice":2}]',JSON.stringify('[{"id":"private-q2","correctChoice":3}]')])expect(containsGradingIndex(text,ids,"private-q12")).toBe(true);
});
it("rejects rendered source text with HTML entities and whitespace changes",()=>{
  const body='A & B: '+"未許可の問題本文を検証するための長い文章です。".repeat(4);
  expect(()=>auditProtectedArtifact(gate+body.replace("&","&amp;"),fingerprints({question:body}),true,false)).toThrow("fingerprint");
});
it("accepts routing metadata and a paper gate but rejects a gate-free page and raw RSC answer",()=>{
  expect(()=>auditProtectedArtifact(gate+'{"items":[{"id":"q1","title":"問1"}]}',[],true,false)).not.toThrow();
  expect(()=>auditProtectedArtifact("利用枠と回答済みの問題を確認しています…",[],true,true)).not.toThrow();
  expect(()=>auditProtectedArtifact("問題本文",[],true,false)).toThrow("Missing content gate");
  expect(()=>auditProtectedArtifact('0:{"modelAnswer":"secret"}',[],false,false)).toThrow("Serialized protected");
});
