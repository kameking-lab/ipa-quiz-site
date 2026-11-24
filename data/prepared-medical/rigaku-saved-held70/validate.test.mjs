import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { readFileSync, readdirSync } from "node:fs";
import { fileURLToPath } from "node:url";
import test from "node:test";

const read = (name) => JSON.parse(readFileSync(new URL(name, import.meta.url), "utf8"));
const questions = read("candidates70.json");
const baseline = read("saved-baseline70.json");
const manifest = read("manifest.json");
const receipts = read("source-receipts70.json");
const ownership = read("ownership-and-gaps400.json");
const official = read("official-key-table400.json");
const reviews = read("review-summary.json");
const deltas = read("applied-finite-corrections.json");
const ecg = read("qa/pm20-ecg-rr-receipt.json");
const helper = read("qa/helper-pt61-review.json");
const helperPatches = read("qa/helper-pt61-finite-corrections.json");
const helperViews = read("qa/helper-pt61-portable-views.json");
const byId = (rows) => new Map(rows.map((row) => [row.id, row]));
const questionMap = byId(questions);
const baselineMap = byId(baseline);
const receiptMap = byId(receipts.questions);
const keyMap = byId(official.rows);
const kana = "アイウエオ";
const hash = (buffer) => createHash("sha256").update(buffer).digest("hex");
const sorted = (values) => [...values].sort();
const canonical = (value) => Array.isArray(value) ? value.map(canonical) :
  value !== null && typeof value === "object" ? Object.fromEntries(Object.keys(value).sort().map((key) => [key, canonical(value[key])])) : value;

test("the 400-question ownership partition is exhaustive and the 70 candidates are disjoint", () => {
  const denominator = [2025, 2026].flatMap((year) => ["am", "pm"].flatMap((session) =>
    Array.from({ length: 100 }, (_, i) => `rigaku-ryohoshi-${year}-annual-${session}-q${i + 1}`)));
  assert.equal(ownership.classified400.length, 400);
  assert.equal(new Set(ownership.classified400.map((row) => row.id)).size, 400);
  assert.deepEqual(sorted(ownership.classified400.map((row) => row.id)), sorted(denominator));
  const selected = ownership.classified400.filter((row) => row.state === "THIS_OWNER_SAVED_HELD_COMPLETION");
  assert.equal(selected.length, 70);
  assert.deepEqual(sorted(questionMap.keys()), sorted(selected.map((row) => row.id)));
  assert.deepEqual(sorted(manifest.exactIds), sorted(questionMap.keys()));
  for (const pr of ownership.prSnapshots) {
    assert.deepEqual(pr.overlapWithThisScope, []);
    assert.equal(pr.head.length, 40);
    for (const id of pr.ptExactIds) assert.equal(questionMap.has(id), false, `PR${pr.number}: ${id}`);
  }
});

test("all 70 official keys match the independently extracted MHLW answer table", () => {
  assert.equal(official.sourcePacketDependent, false);
  assert.equal(keyMap.size, 400);
  assert.equal(official.rows.filter((row) => row.excludedFromScoring).length, 4);
  for (const q of questions) {
    const key = keyMap.get(q.id);
    const source = receiptMap.get(q.id);
    assert.ok(key && source, q.id);
    assert.equal(key.excludedFromScoring, false, q.id);
    const answers = (Array.isArray(q.answer) ? q.answer : [q.answer]).map((value) => String(kana.indexOf(value) + 1));
    assert.deepEqual(answers, key.oneBasedAcceptedChoices, q.id);
    assert.deepEqual(source.oneBasedAcceptedChoices, key.oneBasedAcceptedChoices, q.id);
    assert.equal(q.requiredSelections, key.requiredSelections, q.id);
    assert.equal(source.requiredSelections, key.requiredSelections, q.id);
  }
  // Concatenated digits are a joint selection; separate columns are accepted alternatives.
  assert.deepEqual(keyMap.get("rigaku-ryohoshi-2025-annual-pm-q21").officialKeyCells, ["14"]);
  assert.equal(questionMap.get("rigaku-ryohoshi-2025-annual-pm-q21").requiredSelections, 2);
  assert.deepEqual(keyMap.get("rigaku-ryohoshi-2025-annual-pm-q22").officialKeyCells, ["1"]);
  assert.equal(questionMap.get("rigaku-ryohoshi-2025-annual-pm-q22").requiredSelections, 1);
  assert.deepEqual(keyMap.get("rigaku-ryohoshi-2025-annual-pm-q31").officialKeyCells, ["1", "2", "4"]);
  assert.equal(keyMap.get("rigaku-ryohoshi-2025-annual-pm-q31").requiredSelections, 1);
  assert.deepEqual(keyMap.get("rigaku-ryohoshi-2026-annual-am-q42").officialKeyCells, ["12", "13", "23"]);
  assert.equal(keyMap.get("rigaku-ryohoshi-2026-annual-am-q42").requiredSelections, 2);
});

test("all 350 choice reasons remain explicit and held behind the review gate", () => {
  assert.equal(questions.length, 70);
  assert.equal(questionMap.size, 70);
  let reasons = 0;
  for (const q of questions) {
    assert.equal(q.needsReview, true, q.id);
    assert.equal(q.explanationCoverage, "full", q.id);
    assert.equal(q.exam, "rigaku-ryohoshi");
    assert.deepEqual(sorted(Object.keys(q.choices)), sorted(kana));
    assert.deepEqual(sorted(Object.keys(q.choiceExplanations)), sorted(kana));
    assert.ok(q.explanation.trim().length >= 20, q.id);
    for (const reason of Object.values(q.choiceExplanations)) {
      assert.ok(reason.trim().length >= 10, q.id);
      assert.equal(/原典照合後に|根拠未取得のため保留|採用保留/.test(reason), false, q.id);
      reasons += 1;
    }
  }
  assert.equal(reasons, 350);
  assert.equal(manifest.publicGo, false);
  assert.equal(manifest.productionImported, false);
  assert.equal(manifest.clinicalReviewComplete, false);
  assert.equal(manifest.independentExpertAcceptance, null);
  assert.equal(manifest.independentPublicationReview, null);
  assert.equal(reviews.expertAcceptance, null);
  assert.equal(reviews.publicGo, false);
  assert.equal(reviews.additional61ClinicalQaQuestions, 19);
  assert.deepEqual(reviews.additional61ClinicalQaPendingIds, []);
  assert.equal(helper.rows.length, 19);
  for (const row of helper.rows) {
    assert.equal(row.choiceChecks.length, 5, row.shortId);
    assert.deepEqual(sorted(row.choiceChecks.map((choice) => String(choice.number))), ["1", "2", "3", "4", "5"]);
  }
});

test("original page assets are byte-identical and all image bindings resolve in this private bundle", () => {
  const assets = new Map(receipts.assets.map((asset) => [asset.path, asset]));
  assert.equal(assets.size, 65);
  for (const asset of assets.values()) {
    assert.match(asset.path, /^sources\/[a-z0-9-]+\.png$/);
    const buffer = readFileSync(new URL(asset.path, import.meta.url));
    assert.equal(hash(buffer), asset.sha256, asset.path);
    assert.deepEqual([...buffer.subarray(0, 8)], [137, 80, 78, 71, 13, 10, 26, 10]);
    assert.equal(asset.unchangedOriginalPage, true);
  }
  for (const q of questions) {
    const source = receiptMap.get(q.id);
    assert.ok(assets.has(source.questionImage), q.id);
    assert.ok(assets.has(source.answerImage), q.id);
    assert.equal(q.hasImage, Boolean(source.figureImage), q.id);
    if (q.hasImage) {
      assert.ok(assets.has(source.figureImage), q.id);
      assert.deepEqual(q.imageUrls, [`./${source.figureImage}`]);
      assert.equal(q.imageAltTexts.length, q.imageUrls.length);
    }
    for (const pdf of source.officialPdfs) {
      assert.match(pdf.url, /^https:\/\/www\.mhlw\.go\.jp\/.+\.pdf$/);
      assert.match(pdf.sha256, /^[a-f0-9]{64}$/);
    }
  }
  assert.equal(questions.filter((q) => q.hasImage).length, 37);
  assert.equal(helperViews.length, 4);
  for (const view of helperViews) {
    assert.equal(hash(readFileSync(new URL(view.path, import.meta.url))), view.sha256, view.id);
    assert.equal(view.originalPageReplaced, false);
    assert.ok(receiptMap.get(view.id).officialPdfs.some((pdf) => pdf.sha256 === view.officialPdf.sha256));
  }
});

test("adjacent-question figure cues are removed while genuine shared-case supplements are preserved", () => {
  for (const n of [1, 44]) {
    const id = `rigaku-ryohoshi-2025-annual-pm-q${n}`;
    assert.equal(questionMap.get(id).hasImage, false);
    assert.equal(receiptMap.get(id).falseAdjacentFigureCueExcluded, true);
  }
  const p2 = questionMap.get("rigaku-ryohoshi-2025-annual-pm-q2");
  const p3 = questionMap.get("rigaku-ryohoshi-2025-annual-pm-q3");
  assert.deepEqual(p2.imageUrls, p3.imageUrls);
  assert.match(p2.imageUrls[0], /2025-supplement-pm-p05-/);
  assert.match(p2.question, /6\s*歳の男児/);
  assert.match(p3.question, /6\s*歳の男児/);
  assert.match(questionMap.get("rigaku-ryohoshi-2025-annual-pm-q20").question, /A\s*は運動開始前/);
  assert.doesNotMatch(questionMap.get("rigaku-ryohoshi-2025-annual-pm-q20").question, /AIは/);
  assert.deepEqual(questionMap.get("rigaku-ryohoshi-2026-annual-am-q12").choices,
    { ア: "Chaddock 反射", イ: "Hoffmann 反射", ウ: "Oppenheim 反射", エ: "Trömner 反射", オ: "Wartenberg 反射" });
  const diagram = questionMap.get("rigaku-ryohoshi-2026-annual-pm-q5");
  assert.deepEqual(Object.values(diagram.choices), Array.from({ length: 5 }, (_, i) => `（公式原図・選択肢${i + 1}）`));
});

test("served-model receipts and prior HOLDs are retained without relabeling Sonnet as Opus", () => {
  const models = {};
  for (const source of receipts.questions) {
    assert.equal(source.provider, "firstParty");
    assert.equal(source.servedModelMatches, true);
    assert.equal(source.regenerationCount, 0);
    assert.equal(source.editionAndSessionUnchanged, true);
    assert.equal(source.priorHoldsUnchanged, true);
    assert.deepEqual(source.oldHoldReasons, ownership.priorHoldReasons[source.id]);
    assert.match(source.receiptSha256, /^[a-f0-9]{64}$/);
    for (const usage of Object.values(source.actualModelUsage)) assert.equal(usage.provider, "firstParty");
    models[source.savedModel] = (models[source.savedModel] ?? 0) + 1;
  }
  assert.deepEqual(models, { "claude-sonnet-5-5": 60, "claude-opus-5-5": 10 });
  assert.deepEqual(manifest.actualSavedModels, models);
  assert.equal(manifest.oldManuscriptsEdited, 0);
  assert.equal(manifest.oldHoldLedgerEdited, 0);
});

test("finite explanation changes have evidence and do not remove any of the five reasons", () => {
  assert.equal(baselineMap.size, 70);
  const recorded = new Map(deltas.map((delta) => [`${delta.id}/${delta.field}`, delta]));
  let count = 0;
  for (const q of questions) {
    const old = baselineMap.get(q.id);
    assert.equal(hash(Buffer.from(JSON.stringify(canonical(old)))), receiptMap.get(q.id).originalExplanationsDigest, q.id);
    assert.deepEqual(old.savedNeedsReviewReasons, receiptMap.get(q.id).oldNeedsReviewReasons, q.id);
    for (const field of ["explanation", ...[...kana].map((key) => `choiceExplanations.${key}`)]) {
      const current = field === "explanation" ? q.explanation : q.choiceExplanations[field.split(".")[1]];
      const previous = field === "explanation" ? old.explanation : old.choiceExplanations[field.split(".")[1]];
      if (current === previous) continue;
      const delta = recorded.get(`${q.id}/${field}`);
      assert.ok(delta, `${q.id}/${field}`);
      assert.equal(delta.before, previous);
      assert.equal(delta.after, current);
      assert.ok(delta.evidenceUrls.length > 0);
      assert.equal(delta.publicGo, false);
      count += 1;
    }
  }
  assert.equal(count, deltas.length);
  assert.equal(count, manifest.appliedFiniteCorrectionCount);
  const verified = helperPatches.rows.filter((patch) => patch.status.startsWith("VERIFIED_"));
  assert.equal(verified.length, 10);
  for (const patch of helperPatches.rows) {
    const q = questionMap.get(patch.id);
    const key = kana[Number(patch.field.split(".")[1]) - 1];
    const current = patch.field === "explanation" ? q.explanation : q.choiceExplanations[key];
    if (patch.status === "PROPOSED_PENDING_DIRECT_SOURCE") {
      assert.equal(current, patch.before, patch.id);
    } else if (patch.operation === "replace-substring") {
      assert.equal(patch.before.split(patch.matchText).length - 1, 1, patch.id);
      assert.equal(current, patch.before.replace(patch.matchText, patch.proposed), patch.id);
    } else {
      assert.equal(current, patch.proposed, patch.id);
    }
  }
});

test("ECG rate boundaries and the diagnostic likelihood ratio are reproducible from the original figures", () => {
  assert.match(ecg.originalLegend, /25 mm\/sec/);
  assert.equal(ecg.physicalPage, 9);
  assert.equal(ecg.officialAnswer, "4");
  for (const label of ["A", "B"]) {
    const row = ecg[label];
    const gaps = row.rPeakXPixel.slice(1).map((x, i) => x - row.rPeakXPixel[i]).sort((a, b) => a - b);
    const center = Math.floor(gaps.length / 2);
    const median = gaps.length % 2 ? gaps[center] : (gaps[center - 1] + gaps[center]) / 2;
    assert.equal(median, row.medianRrPixel);
    const rate = 300 * ecg.gridMajorSpacingPixelApprox / median;
    assert.ok(Math.abs(rate - row.heartRatePerMin) < 0.001);
  }
  assert.ok(ecg.A.heartRatePerMin > 60);
  assert.ok(ecg.B.heartRatePerMin < 120);
  const derived = readFileSync(new URL("qa/pm20-official-physical9-rotated-288dpi.png", import.meta.url));
  assert.equal(hash(derived), ecg.renderSha256);
  const sensitivity = 30 / (30 + 70);
  const falsePositiveRate = 40 / (40 + 60);
  assert.ok(Math.abs(sensitivity / falsePositiveRate - 0.75) < 1e-12);
  assert.equal(questionMap.get("rigaku-ryohoshi-2026-annual-pm-q26").answer, "オ");
});

test("the private bundle is absent from the PT production question registration", () => {
  const root = new URL("../../../", import.meta.url);
  const index = readFileSync(new URL("data/questions/rigaku-ryohoshi/index.ts", root), "utf8");
  assert.doesNotMatch(index, /saved-held70|candidates70|prepared-medical/);
  const production = new URL("data/questions/rigaku-ryohoshi/", root);
  for (const name of readdirSync(fileURLToPath(production)).filter((name) => name.endsWith(".json"))) {
    const data = JSON.parse(readFileSync(new URL(name, production), "utf8"));
    if (!Array.isArray(data)) continue;
    for (const q of data) assert.equal(questionMap.has(q.id), false, q.id);
  }
  assert.equal(manifest.imageUrlsReviewBundleRelative, true);
});

test("the incremental subset preserves the initial six, original fields and all prior clinical HOLDs", () => {
  const subset = read("adoption-candidates.json");
  const adoption = read("adoption-receipts.json");
  const increment = read("qa/incremental-finite-corrections.json");
  const proof = read("qa/adoption-increment-validation.json");
  const digest = (value) => hash(Buffer.from(JSON.stringify(canonical(value))));
  const protectedFields = (q) => Object.fromEntries(Object.entries(q).filter(([key]) =>
    !["explanation", "choiceExplanations", "officialReferenceUrls"].includes(key)));
  assert.equal(subset.length, 8);
  assert.equal(subset.reduce((sum, q) => sum + Object.keys(q.choiceExplanations).length, 0), 40);
  assert.equal(adoption.initialSixIds.length, 6);
  assert.equal(adoption.additionalBoundedReviewCandidateIds.length, 2);
  assert.equal(adoption.otherExplanationRequirementIds.length, 17);
  assert.equal(adoption.priorScopeDecisionIds.length, 2);
  assert.equal(adoption.assets.length, 9);
  assert.equal(subset.filter((q) => q.hasImage).length, 3);
  assert.equal(increment.length, 10);
  assert.deepEqual(sorted(new Set(increment.map((p) => p.id))), sorted(proof.changedQuestionIds));
  assert.equal(digest(reviews.contentHoldRecords), proof.priorContentHoldRecordsDigest);
  assert.equal(digest(reviews.contentHeldQuestionIds), proof.priorContentHeldIdsDigest);
  assert.equal(reviews.contentHeldQuestionIds.length, 43);
  assert.equal(reviews.contentHoldRecords.length, 75);
  for (const q of questions) assert.equal(digest(protectedFields(q)), proof.protectedQuestionDigests[q.id], q.id);
  for (const id of adoption.initialSixIds) assert.equal(digest(questionMap.get(id)), proof.initialSixCandidateDigests[id], id);
  for (const q of subset) {
    assert.deepEqual(q, questionMap.get(q.id), q.id);
    assert.equal(q.needsReview, true);
    const row = adoption.rows.find((r) => r.id === q.id);
    assert.equal(row.candidateDigest, digest(q));
    assert.equal(row.publicGo, false);
  }
  for (const row of adoption.assets) assert.equal(hash(readFileSync(new URL(row.path, import.meta.url))), row.sha256);
  const previous = structuredClone(questions);
  const previousMap = byId(previous);
  for (const patch of increment) {
    const q = previousMap.get(patch.id);
    const key = patch.field.split(".")[1];
    assert.equal(patch.field === "explanation" ? q.explanation : q.choiceExplanations[key], patch.after);
    if (patch.field === "explanation") q.explanation = patch.before;
    else q.choiceExplanations[key] = patch.before;
    assert.equal(patch.publicGo, false);
    assert.ok(patch.evidenceUrls.length);
  }
  delete previousMap.get("rigaku-ryohoshi-2026-annual-am-q4").officialReferenceUrls;
  assert.equal(digest(previous), proof.previousCandidatesCanonicalDigest);
  // Git normalizes JSON line endings; retain byte receipts but compare structured content here.
  for (const [name, value] of Object.entries(proof.priorJsonCanonicalDigests)) {
    assert.equal(digest(read(name)), value, name);
  }
  assert.equal(digest(subset), proof.subsetCanonicalDigest);
  assert.equal(digest(adoption), proof.receiptCanonicalDigest);
  assert.equal(adoption.expertAcceptance, null);
  assert.equal(adoption.publicationReview, null);
  assert.equal(adoption.publicGo, false);
  assert.equal(adoption.productionImported, false);
});
