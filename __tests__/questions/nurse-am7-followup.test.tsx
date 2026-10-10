import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import { KANGOSHI_QUESTIONS } from "@/data/questions/kangoshi";
import { isPracticeReadyQuestion } from "@/lib/questions/filter";
import { isCompleteSelectionCorrect } from "@/lib/questions/answers";
import type { Question } from "@/lib/questions/types";
import { EXAM_DESCRIPTIONS } from "@/lib/seo/exam-meta";
import { QUALIFICATION_CATALOG } from "@/lib/qualifications/catalog";
import { nurseObjectHash } from "./nurse-pm-category-hash";
import proof from "./nurse-am6-publication-proof";
import source114 from "@/docs/evidence/nurse-am7-followup-20261010/114-am-q91-120-source.json";
import source115 from "@/docs/evidence/nurse-am7-followup-20261010/115-am-q91-120-source.json";
import two from "@/docs/evidence/nurse-am7-followup-20261010/AM-FOLLOWUP-TWO-GO-CANDIDATES.json";
import q101 from "@/docs/evidence/nurse-am7-followup-20261010/AM-Q101-GO-CANDIDATE.json";
import q103 from "@/docs/evidence/nurse-am7-followup-20261010/AM-Q103-GO-CANDIDATE.json";
import q106 from "@/docs/evidence/nurse-am7-followup-20261010/AM-Q106-GO-CANDIDATE.json";
import q112 from "@/docs/evidence/nurse-am7-followup-20261010/AM-Q112-GO-CANDIDATE.json";
import hold from "@/docs/evidence/nurse-am112-publication-hold-20261010/DELTA.json";
import historical from "@/docs/evidence/nurse-am7-followup-20261010/INTEGRATION.json";
import pm4 from "@/docs/evidence/nurse-pm4-followup-20261010/INTEGRATION.json";
import q109 from "@/docs/evidence/nurse-am7-followup-20261010/AM-Q109-115-GO-CANDIDATE.json";

const byId = new Map(KANGOSHI_QUESTIONS.map(question => [question.id, question]));
const saved = [
  ...two.readyQuestions, ...q101.readyQuestions, ...q103.readyQuestions,
  ...q106.readyQuestions, ...q109.readyQuestions,
] as unknown as Question[];
const files = [source114, source115];
const sha = (bytes: string | Buffer) => createHash("sha256").update(bytes).digest("hex");

describe("six publication-ready nursing AM originals", () => {
  it("retains every old object and registers exactly the six eligible IDs", () => {
    expect(proof.baseCommit).toBe("df57e8dcdf24ec46c2ea2f82f22f310fcbbf760b");
    expect(proof.previous451ObjectHashes).toHaveLength(451);
    for (const previous of proof.previous451ObjectHashes) {
      expect(nurseObjectHash(byId.get(previous.id)), previous.id).toBe(previous.sha256);
    }
    expect(proof.addedIds).toHaveLength(6);
    expect(saved.map(question => question.id).sort()).toEqual(proof.addedIds);
    expect(KANGOSHI_QUESTIONS).toHaveLength(pm4.totalOriginals + 1);
    expect(proof.totalOriginals).toBe(proof.previousOriginals + proof.addedOriginals);
    expect(proof.totalOriginals).toBe(457);
    expect(KANGOSHI_QUESTIONS.reduce((sum, question) => sum + Object.keys(question.choices ?? {}).length, 0)).toBe(pm4.totalChoices + 4);
    expect(proof.totalChoices).toBe(proof.previousChoices + proof.addedChoices);
    expect(new Set(KANGOSHI_QUESTIONS.map(question => question.id)).size).toBe(pm4.totalOriginals + 1);
    expect(proof.heldIdsUnchanged).toContain("kangoshi-2025-annual-am-q99");
    for (const id of proof.heldIdsUnchanged) {
      if (id === "kangoshi-2025-annual-am-q99") continue;
      expect(byId.has(id), id).toBe(false);
    }
  });

  it("keeps Q112 as a source-checked historical candidate but outside publication", () => {
    expect(historical.addedIds).toContain(hold.heldId);
    expect(nurseObjectHash(q112.readyQuestions[0])).toBe(hold.heldQuestionObjectSha256);
    expect(byId.has(hold.heldId)).toBe(false);
    expect(proof.heldIdsUnchanged).toContain(hold.heldId);
    expect(hold.officialAnswerNumber).toBe("35");
    expect(hold.addedOriginals).toBe(6);
    expect(hold.addedChoices).toBe(25);
  });

  it("matches each official stem, all choices, key, source page and saved explanation", () => {
    expect(proof.sourceChecks).toHaveLength(6);
    for (const item of proof.sourceFiles) {
      const source = readFileSync(`docs/evidence/nurse-am7-followup-20261010/${item.file}`, "utf8");
      expect(sha(source.replace(/\r\n/g, "\n"))).toBe(item.gitBlobSha256);
    }
    for (const check of proof.sourceChecks) {
      const actual = byId.get(check.id)!;
      const draft = saved.find(question => question.id === check.id)!;
      const source = files.find(file => file.questionPdfSha256 === check.sourceQuestionPdfSha256)!;
      const original = source.questions.find(question => question.number === check.qNumber)!;
      expect(original.officialAnswerDigits).toBe(check.officialAnswerDigits);
      expect(source.answerPdfSha256).toBe(check.sourceAnswerPdfSha256);
      expect(actual.id).toBe(`kangoshi-${check.year}-annual-am-q${check.qNumber}`);
      expect(actual.year).toBe(check.year);
      expect(actual.session).toBe("am");
      expect(actual.question.startsWith(original.fullSharedPremiseText), check.id).toBe(true);
      expect(actual.question.endsWith(check.officialStem), check.id).toBe(true);
      expect(Object.values(actual.choices ?? {})).toEqual(check.officialChoices);
      expect(Object.keys(actual.choiceExplanations ?? {}).sort()).toEqual(Object.keys(actual.choices ?? {}).sort());
      expect(actual.officialAnswerNumber).toBe(check.officialAnswerDigits);
      expect(actual.answer).toEqual(draft.answer);
      expect(actual.requiredSelections).toBe(draft.requiredSelections);
      expect(actual.explanation).toBe(draft.explanation);
      expect(actual.choiceExplanations).toEqual(draft.choiceExplanations);
      expect(actual.sourcePdfUrl).toContain(`#page=${check.physicalPage}`);
      expect(actual.sourceAnswerUrl).toContain("mhlw.go.jp");
      expect(nurseObjectHash(actual)).toBe(check.objectSha256);
      expect(isPracticeReadyQuestion(actual)).toBe(true);
    }
  });

  it("preserves the Q100 case for Q101 and grades both two-selection originals exactly", () => {
    const prior = byId.get("kangoshi-2024-annual-am-q100")!;
    const q101 = byId.get("kangoshi-2024-annual-am-q101")!;
    expect(q101.question).toContain("〔直前の問100で示された経過〕");
    expect(q101.question).toContain("femoral neck fracture");
    expect(q101.question).toContain("膀胱留置カテーテル");
    expect(prior.question).toContain(source114.questions.find(question => question.number === 101)!.fullSharedPremiseText);
    for (const number of [101]) {
      const question = byId.get(`kangoshi-2024-annual-am-q${number}`)!;
      expect(Object.keys(question.choices ?? {})).toHaveLength(5);
      expect(question.officialAnswerNumber).toBe("35");
      expect(question.requiredSelections).toBe(2);
      expect(question.answer).toEqual(["ウ", "オ"]);
      expect(isCompleteSelectionCorrect(question.answer, ["オ", "ウ"])).toBe(true);
      expect(isCompleteSelectionCorrect(question.answer, ["ウ"])).toBe(false);
      expect(isCompleteSelectionCorrect(question.answer, ["ウ", "エ"])).toBe(false);
    }
    const q92 = byId.get("kangoshi-2025-annual-am-q92")!;
    expect(q92.question).toContain("cerebral hemorrhage");
    expect(q92.question).toContain("infectious gastroenteritis");
    expect(q92.choices?.ア).toContain("infectious gastroenteritis");
    const q103 = byId.get("kangoshi-2024-annual-am-q103")!;
    expect(q103.question).toContain("lacunar infarction");
    expect(q103.question).toContain("hypertension");
  });

  it("shows the measured partial coverage without changing the official exclusion notice", () => {
    const home = readFileSync("app/[exam]/page.tsx", "utf8");
    const catalog = QUALIFICATION_CATALOG.find(item => item.examCode === "kangoshi")!;
    for (const text of [home, catalog.reuseSummary, EXAM_DESCRIPTIONS.kangoshi ?? ""]) {
      expect(text).toContain("計462原問");
      expect(text).toContain("全1910肢");
      expect(text).toContain("午後228原問");
      expect(text).toContain("第115回は午前117問・午後115問、第114回は午前117問・午後113問");
      expect(text).toContain("午前 問32は厚生労働省が採点対象から除外");
    }
    expect(home).toContain("午前234問と午後228問");
    expect(KANGOSHI_QUESTIONS.filter(question => question.year === 2024 && question.session === "am")).toHaveLength(117);
    expect(KANGOSHI_QUESTIONS.filter(question => question.year === 2025 && question.session === "am")).toHaveLength(117);
    expect(KANGOSHI_QUESTIONS.filter(question => question.year === 2024 && question.session === "pm")).toHaveLength(113);
    expect(KANGOSHI_QUESTIONS.filter(question => question.year === 2025 && question.session === "pm")).toHaveLength(115);
  });
});
