import { getQuestionsByExamStrict } from "@/lib/seo/exam-meta";
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { SENTAKU_ORIGINALS, PUBLISHED_SENTAKU, parseSentakuOriginals, getSentakuQuestion, sentakuSitemapPaths } from "@/lib/sharoushi/sentaku";
import { SentakuReader } from "@/app/sharoushi/sentaku/_components/reader";
import { generateMetadata, generateStaticParams } from "@/app/sharoushi/sentaku/[edition]/[number]/page";
import { createHash } from "node:crypto";
import integration from "@/docs/evidence/sharoushi-mc32-20261010/INTEGRATION-MANIFEST.json";

const sortedJson = (value: unknown): unknown => {
  if (Array.isArray(value)) return value.map(sortedJson);
  if (value && typeof value === "object") {
    return Object.fromEntries(Object.entries(value).sort(([a], [b]) => a.localeCompare(b)).map(([key, item]) => [key, sortedJson(item)]));
  }
  return value;
};
const objectHash = (value: unknown) => createHash("sha256").update(JSON.stringify(sortedJson(value))).digest("hex");

const keys = [[3,16,6,4,7],[8,17,4,16,18],[18,15,8,10,3],[2,17,6,12,9],[3,15,5,14,9],[15,4,10,7,20],[7,1,16,19,11],[19,11,14,7,4],[19,20,10,5,15],[3,2,4,1,3],[4,4,3,4,2],[2,3,4,3,3],[7,18,3,12,14],[15,9,18,11,3],[20,2,11,8,16],[9,16,2,10,14]];
const clone=()=>structuredClone(SENTAKU_ORIGINALS);
describe("社労士選択式 原問契約",()=>{
 it("既公開40原問を保持し、択一110原問と選択16原問を分離して計126原問とする",()=>{
  const mc=getQuestionsByExamStrict("sharoushi");
  expect(mc).toHaveLength(110);
  expect(mc.some(q=>q.session==="sentaku")).toBe(false);
  expect(mc.length+PUBLISHED_SENTAKU.length).toBe(126);
  expect(PUBLISHED_SENTAKU.flatMap(q=>q.blanks)).toHaveLength(80);
  const oldHashes = integration.oldObjectSha256 as Record<string, string>;
  expect(Object.keys(oldHashes)).toHaveLength(40);
  for (const [id, sha] of Object.entries(oldHashes)) {
    const old = mc.find(q => q.id === id);
    expect(old, id).toBeDefined();
    expect(objectHash(old), id).toBe(sha);
  }
  expect(mc.filter(q => !Object.hasOwn(oldHashes, q.id))).toHaveLength(70);
 });
 it("16原問80空欄の公式キーと20語群を保持する",()=>{
  expect(SENTAKU_ORIGINALS).toHaveLength(16);
  expect(SENTAKU_ORIGINALS.flatMap(q=>q.blanks)).toHaveLength(80);
  expect(SENTAKU_ORIGINALS.map(q=>q.blanks.map(b=>b.answerOptionId))).toEqual(keys);
  expect(SENTAKU_ORIGINALS.filter(q=>q.wordBankMode==="shared-20")).toHaveLength(13);
  expect(SENTAKU_ORIGINALS.filter(q=>q.wordBankMode==="per-blank-4").map(q=>q.id)).toEqual([2,3,4].map(n=>`sharoushi-2026-sentaku-q0${n}`));
 });
 it("同じC空欄の反復を別原問・別欄にしない",()=>{const q=getSentakuQuestion("2026","2")!;expect(q.stem.match(/\{\{C\}\}/g)).toHaveLength(2);expect(q.blanks).toHaveLength(5);});
 it("語群の番号重複・正答不一致・空欄欠落・未知fieldを拒否する",()=>{
  const duplicate=clone();duplicate[0].sharedWordBank![1].id=1;expect(()=>parseSentakuOriginals(duplicate)).toThrow();
  const wrong=clone();wrong[0].blanks[0].answerText="別の語";expect(()=>parseSentakuOriginals(wrong)).toThrow();
  const missing=clone();missing[0].stem=missing[0].stem.replaceAll("{{A}}","");expect(()=>parseSentakuOriginals(missing)).toThrow();
  const extra=clone();expect(()=>parseSentakuOriginals([{...extra[0], answer:"A"}])).toThrow();
 });
 it("重複原問・空欄別語群欠落・施行日取り違えを拒否する",()=>{
  expect(()=>parseSentakuOriginals([SENTAKU_ORIGINALS[0],SENTAKU_ORIGINALS[0]])).toThrow();
  const dates=clone();dates[0].lawAsOf="2026-04-10";expect(()=>parseSentakuOriginals(dates)).toThrow();
  const bank=structuredClone(getSentakuQuestion("2026","2")!);if(bank.wordBankMode==="per-blank-4")bank.blankWordBanks.A.pop();expect(()=>parseSentakuOriginals([bank])).toThrow();
 });
 it("未解消の事実がある原問を公開承認にできない",()=>{const all=clone();all[1].blanks[2].reviewFlags=["unresolved-source"];expect(()=>parseSentakuOriginals(all)).toThrow();});
 it("公開16原問80欄がcanonicalとsitemapに一意に揃い、範囲外は非公開",()=>{
  expect(PUBLISHED_SENTAKU).toHaveLength(16);expect(generateStaticParams()).toHaveLength(16);
  expect(sentakuSitemapPaths()).toHaveLength(19);
  expect(new Set(sentakuSitemapPaths()).size).toBe(19);
  for(const q of SENTAKU_ORIGINALS){expect(getSentakuQuestion(String(q.year),String(q.questionNumber))).toEqual(q);expect(sentakuSitemapPaths()).toContain(`/sharoushi/sentaku/${q.year}/${q.questionNumber}`);}
  expect(getSentakuQuestion("2026","02")).toBeUndefined();
  expect(getSentakuQuestion("2026","9")).toBeUndefined();
  expect(getSentakuQuestion("2024","1")).toBeUndefined();
 });
 it("canonicalを原問URLへ固定する",async()=>{for(const q of PUBLISHED_SENTAKU){const m=await generateMetadata({params:Promise.resolve({edition:String(q.year),number:String(q.questionNumber)})});expect(m.alternates?.canonical).toBe(`/sharoushi/sentaku/${q.year}/${q.questionNumber}`);}});
 it.each([["2025","4","共通の語群（①〜⑳）"],["2026","2","空欄ごとの語群（各①〜④）"]])("%s/%sのreaderは解答を最初に開かず原語群を表示する",(year,number,title)=>{
  const {container}=render(<SentakuReader question={getSentakuQuestion(year,number)!}/>);
  expect(screen.getByRole("heading",{name:title})).toBeInTheDocument();
  const answers=container.querySelector('[data-testid="sentaku-answers"]')!;expect(answers).not.toHaveAttribute("open");
  expect(container.querySelector('[aria-label="語群"]')!.querySelectorAll("li")).toHaveLength(20);
  expect(container.querySelectorAll('a[href*="#page="]').length).toBeGreaterThan(0);
  expect(screen.queryByText("回答済み")).not.toBeInTheDocument();
 });
});
