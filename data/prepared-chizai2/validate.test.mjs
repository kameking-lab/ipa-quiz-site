import assert from "node:assert/strict";
import test from "node:test";
import { readPrepared, validateDraft } from "./validate.mjs";

const { rows, sources, gate } = readPrepared();
const mutate = fn => { const copy = structuredClone(rows); fn(copy); return () => validateDraft(copy, sources); };
test("160 originals match source answer key", () => validateDraft(rows, sources));
test("missing original rejected", () => assert.throws(mutate(copy => copy.pop())));
test("duplicate original rejected", () => assert.throws(mutate(copy => copy[1].id = copy[0].id)));
test("incorrect official answer rejected", () => assert.throws(mutate(copy => copy[0].officialAnswerNumber = "ア")));
test("valid but wrong displayed choice rejected", () => assert.throws(mutate(copy => copy[0].answer = "ア")));
test("historical law date mismatch rejected", () => assert.throws(mutate(copy => copy[0].lawReferenceDate = "2025-09-01")));
test("missing choice reason rejected", () => assert.throws(mutate(copy => delete copy[0].choiceExplanations["ア"])));
test("extra choice reason rejected", () => assert.throws(mutate(copy => copy[0].choiceExplanations["オ"] = "原問題に存在しない選択肢への説明")));
test("missing common case rejected", () => assert.throws(mutate(copy => copy.find(q => q.section === "practical").sharedCase = "")));
test("sibling question leaking into common case rejected", () => assert.throws(mutate(copy => copy.find(q => q.section === "practical").sharedCase += "\n問35\n別の設問")));
test("12 true/false originals preserve official marks", () => {
  const tf = rows.filter(q => ["○", "〇", "×"].includes(q.officialAnswerNumber));
  assert.equal(tf.length,12);
  for (const q of tf) assert.deepEqual(q.choices,{ "ア":"○", "イ":"×" });
});
test("inverted true/false mapping rejected", () => assert.throws(mutate(copy => copy.find(q => q.officialAnswerNumber === "〇").choices = { "ア":"×", "イ":"○" })));
test("six-digit year/month original uses priority application", () => {
  const q = rows.find(q => q.round === 54 && q.type === "numeric");
  const date = new Date(Date.UTC(2025,5+18,5));
  assert.equal(q.answer,`${date.getUTCFullYear()}${String(date.getUTCMonth()+1).padStart(2,"0")}`);
  assert.equal(q.answer,"202612"); assert.deepEqual(q.choices,{});
});
test("yen original counts independent and dependent claims", () => {
  const q = rows.find(q => q.round === 53 && q.type === "numeric");
  assert.equal(q.answer,String(14000+138000+4000*(4+10)));
  assert.equal(q.numericAnswer.unit,"円"); assert.deepEqual(q.choices,{});
});
test("numeric corruption rejected", () => assert.throws(mutate(copy => copy.find(q => q.type === "numeric").answer = "202701")));
test("permission must remain pending", () => assert.throws(mutate(copy => copy[0].license = "IPA-public")));
test("review exclusion cannot silently disappear", () => assert.throws(mutate(copy => copy[0].needsReview = false)));
test("vocabulary options contain no sibling questions", () => {
  for (const q of rows.filter(q => q.section === "practical" && q.qNumber >= 35)) {
    assert.ok(!/^問\d+\s*$/m.test(Object.values(q.choices).join("\n")));
    assert.ok(!/^問\d+\s*$/m.test(q.sharedCase));
  }
});
test("fee table preserves original figures without inserting the answer", () => {
  const q = rows.find(q => q.round === 53 && q.type === "numeric");
  assert.ok(q.question.includes("| 特許出願をする者 | 1件につき14000円 |"));
  assert.ok(q.question.includes("1件につき138000円に1請求項につき4000円を加えた額"));
  assert.ok(!q.question.includes("208000"));
});
test("publication gate stays closed", () => {
  assert.equal(gate.publicRegistration,false);
  assert.equal(gate.permission,"not-confirmed");
  assert.equal(gate.historicalLawReview,"pending");
});

test("original question text corruption rejected", () => assert.throws(mutate(copy => copy[0].question += "追加された無関係な条件")));
test("original choice text corruption rejected", () => assert.throws(mutate(copy => copy[0].choices["ア"] += "訂正されていない誤記")));
test("shared case text corruption rejected", () => assert.throws(mutate(copy => copy.find(q => q.section === "practical").sharedCase += "別の事例")));
test("PDF receipt corruption rejected", () => assert.throws(mutate(copy => copy[0].sourcePdfSha256 = "0".repeat(64))));
