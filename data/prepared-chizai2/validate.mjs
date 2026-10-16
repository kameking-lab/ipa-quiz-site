import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { createHash } from "node:crypto";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
const root = dirname(fileURLToPath(import.meta.url));
const normalizeMark = value => value === "〇" ? "○" : value;
const expectedNumbers = Array.from({length:40},(_,i)=>i+1);
export function validateDraft(rows, sources) {
  assert.equal(rows.length, 160, "160 originals required");
  assert.equal(new Set(rows.map(row => row.id)).size, 160, "duplicate original ID");
  for (const round of [53, 54]) for (const section of ["gakka", "practical"]) {
    assert.deepEqual(rows.filter(row => row.round === round && row.section === section).map(row => row.qNumber).sort((a,b) => a-b), expectedNumbers);
  }
  for (const row of rows) {
    const source = sources.get(row.id);
    assert.ok(source, `${row.id}: missing official source`);
    assert.equal(normalizeMark(row.officialAnswerNumber), normalizeMark(source.officialAnswer), `${row.id}: official answer mismatch`);
    assert.equal(row.lawReferenceDate, source.lawAsOf, `${row.id}: law date`);
    assert.equal(row.sourcePdfSha256, source.sourcePdfSha256, `${row.id}: PDF receipt`);
    assert.equal(row.sourceTextSha256, source.sourceTextSha256, `${row.id}: text receipt`);
    const contentHash = createHash("sha256").update(JSON.stringify({question:row.question,sharedCase:row.sharedCase,choices:row.choices})).digest("hex");
    assert.equal(contentHash, source.originalContentSha256, `${row.id}: original content changed`);
    assert.equal(row.needsReview, true);
    assert.equal(row.license, "IP-EDU-permission-pending");
    assert.equal(row.figureReviewStatus, "verified-text-and-table");
    assert.ok(row.explanation.length >= 25, `${row.id}: missing explanation`);
    assert.ok(row.basis.length > 0);
    assert.ok(row.question.length > 10);
    assert.ok(row.officialReferenceUrls.length > 0);
    for (const url of row.officialReferenceUrls) assert.equal(new URL(url).protocol, "https:");
    assert.equal(row.hasImage, false, "visual review found text/table content, no pictorial figures");
    if (row.section === "practical") assert.ok(row.sharedCase.length > 10, `${row.id}: shared case missing`);
    else assert.equal(row.sharedCase, "");
    assert.ok(!/^問\d+\s*$/m.test(row.sharedCase), `${row.id}: sibling question leaked into shared case`);
    if (row.type === "numeric") {
      assert.equal(row.qNumber, 34);
      assert.equal(row.section, "practical");
      assert.deepEqual(row.choices, {});
      assert.deepEqual(row.choiceExplanations, {});
      assert.ok(row.calculationSteps.length >= 2);
      assert.equal(row.answer, source.officialAnswer);
      if (row.round === 54) { assert.equal(row.answer, "202612"); assert.equal(row.numericAnswer.unit, "年月（YYYYMM）"); }
      else { assert.equal(row.answer, "208000"); assert.equal(row.numericAnswer.unit, "円"); }
    } else {
      const keys = Object.keys(row.choices);
      assert.deepEqual(Object.keys(row.choiceExplanations).sort(), [...keys].sort(), `${row.id}: choice coverage`);
      assert.ok(keys.includes(row.answer), `${row.id}: answer not a choice`);
      const expectedAnswer = source.answerFormat === "true-false" ? (normalizeMark(source.officialAnswer) === "○" ? "ア" : "イ") : source.officialAnswer;
      assert.equal(row.answer, expectedAnswer, `${row.id}: displayed answer mismatch`);
      if (source.answerFormat === "true-false") assert.deepEqual(row.choices, { "ア": "○", "イ": "×" });
      const count = row.section === "gakka" ? 4 : source.answerFormat === "true-false" ? 2 : row.qNumber >= 35 ? (row.round === 53 ? (row.qNumber <= 37 ? 9 : 7) : (row.qNumber <= 37 ? 9 : 8)) : row.qNumber <= 12 ? undefined : 4;
      if (count !== undefined) assert.equal(keys.length, count, `${row.id}: choice count`);
      else assert.ok(keys.length === 3 || keys.length === 4);
      for (const key of keys) {
        assert.ok(row.choices[key].length > 0);
        assert.ok(row.choiceExplanations[key].length >= 10, `${row.id}/${key}: reason missing`);
      }
    }
  }
}
export function readPrepared() {
  const text = readFileSync(join(root,"questions.ts"),"utf8");
  const rows = JSON.parse(text.slice(text.indexOf(" = ")+3).trim().replace(/;$/, ""));
  const sources = new Map(JSON.parse(readFileSync(join(root,"source-index.json"),"utf8")).questions.map(q=>[q.id,q]));
  const gate = JSON.parse(readFileSync(join(root,"gate.json"),"utf8"));
  validateDraft(rows,sources);
  assert.equal(gate.publicRegistration,false);
  assert.equal(gate.permission,"not-confirmed");
  assert.equal(gate.historicalLawReview,"pending");
  return { rows,sources,gate };
}
if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const { rows,gate } = readPrepared();
  console.log(JSON.stringify({verdict:"PASS",originals:rows.length,choiceReasons:rows.reduce((n,q)=>n+Object.keys(q.choiceExplanations).length,0),publicRegistration:gate.publicRegistration}));
}
