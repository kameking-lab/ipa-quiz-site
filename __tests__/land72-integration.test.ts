import { describe, expect, it } from "vitest";
import { existsSync, readFileSync } from "node:fs";
import { createHash } from "node:crypto";
import path from "node:path";
import { ALL_QUESTIONS, QUESTIONS_BY_EXAM } from "@/data/questions";
import { getQuestionsForExam, getRegisteredExamCodes } from "@/lib/questions/get-questions";
import { isPracticeReadyQuestion, shuffleChoices } from "@/lib/questions/filter";
import { choiceDisplayLabel, usesNumberedChoices } from "@/lib/questions/display";
import { defaultPracticeSession } from "@/lib/questions/practice-session";
import { findQuestionByRoute, questionPagePath } from "@/lib/seo/question-url";
import { buildQuestionJsonLd } from "@/lib/seo/question-jsonld";
import { searchQuestions } from "@/lib/search/question-index";
import { getQualificationByExamCode } from "@/lib/qualifications/catalog";
import { EXAM_CONFIGS } from "@/lib/exam-config";
import { LAND_SPECIAL1_QUESTIONS } from "@/data/questions/land-special1";
import scope from "@/docs/evidence/land-special1-72/SCOPE.json";
import pins from "@/docs/evidence/land-special1-72/NATIVE-RUNTIME-BINDINGS.json";
import figures from "@/docs/evidence/land-special1-72/FIGURE-ASSETS.json";
import type { ChoiceKey } from "@/lib/questions/types";

const EXAM = "land-special1" as const;
const hash = (s: string) => createHash("sha256").update(s, "utf8").digest("hex");
const keys: ChoiceKey[] = ["ア", "イ", "ウ", "エ", "オ"];

describe("land special1 72 A-booklet candidate", () => {
  it("loads 72 identical eager/lazy playable records for exactly two09:30 A sittings", async () => {
    const lazy = await getQuestionsForExam(EXAM);
    expect(getRegisteredExamCodes()).toContain(EXAM);
    expect(lazy).toEqual(LAND_SPECIAL1_QUESTIONS);
    expect(QUESTIONS_BY_EXAM[EXAM]).toEqual(lazy);
    expect(ALL_QUESTIONS.filter(q => q.exam === EXAM)).toEqual(lazy);
    expect(lazy).toHaveLength(72);
    expect(new Set(lazy.map(q => q.id)).size).toBe(72);
    expect(lazy.every(isPracticeReadyQuestion)).toBe(true);
    expect(scope.twoSpecifiedASittingsAllSubjectsComplete).toBe(true);
    expect(scope.allPublishedABComplete).toBe(false);
    expect(scope.missingOtherSittings.map(s => s.time)).toEqual(["13:30", "13:30"]);
    for (const season of ["february", "june"]) for (const [session, count] of [["houki", 12], ["kogaku", 24]] as const) {
      const paper = lazy.filter(q => q.season === season && q.session === session);
      expect(paper).toHaveLength(count);
      expect(paper.map(q => q.qNumber)).toEqual(Array.from({ length: count }, (_, i) => i + 1));
      expect(paper.every(q => q.sourceAttribution?.includes("09:30 A版"))).toBe(true);
    }
    expect(getQualificationByExamCode(EXAM)?.reuseSummary).toContain("13:30 B版72問は未収録");
    expect(defaultPracticeSession(EXAM)).toBe("houki");
    expect(EXAM_CONFIGS[EXAM].sessions.map(s => s.expectedQuestions)).toEqual([12, 24]);
  });

  it("retains all320 accepted reason bytes, every key and original choice numbers through shuffle", () => {
    let reasons = 0;
    expect(usesNumberedChoices(EXAM)).toBe(true);
    expect(keys.map(k => choiceDisplayLabel(EXAM, k))).toEqual(["1", "2", "3", "4", "5"]);
    for (const q of LAND_SPECIAL1_QUESTIONS) {
      const binding = pins.rows.find(r => r.id === q.id)!;
      expect(binding).toBeDefined();
      expect(hash(q.question)).toBe(binding.nativeStemSha256);
      expect(q.answer).toBe(keys[Number(q.officialAnswerNumber) - 1]);
      expect(q.officialAnswerNumber).toBe(String(binding.officialAnswerNumber));
      expect(Object.keys(q.choices!)).toEqual(keys.slice(0, binding.reasonBindings.length));
      expect(Object.keys(q.choiceExplanations!)).toEqual(Object.keys(q.choices!));
      expect(shuffleChoices(q)).toBe(q);
      for (const b of binding.reasonBindings) {
        expect(hash(q.choiceExplanations![b.runtimeChoiceKey as ChoiceKey]!)).toBe(b.nativeReasonSha256);
        reasons++;
      }
      expect(q.explanation).toBe(q.choiceExplanations![q.answer as ChoiceKey]);
    }
    expect(reasons).toBe(320);
    expect(LAND_SPECIAL1_QUESTIONS.filter(q => Object.keys(q.choices!).length === 4)).toHaveLength(40);
    expect(LAND_SPECIAL1_QUESTIONS.filter(q => Object.keys(q.choices!).length === 5)).toHaveLength(32);
  });

  it("resolves all72 unique canonical routes and search facet records", async () => {
    const urls = LAND_SPECIAL1_QUESTIONS.map(questionPagePath);
    expect(new Set(urls).size).toBe(72);
    for (const [i, url] of urls.entries()) {
      const [, , exam, yearSeason, section, qnum] = url.split("/");
      expect(findQuestionByRoute(LAND_SPECIAL1_QUESTIONS, { exam: exam!, yearSeason: yearSeason!, section: section!, qnum: qnum! })?.id)
        .toBe(LAND_SPECIAL1_QUESTIONS[i]!.id);
    }
    const results = await searchQuestions({ exam: EXAM, limit: 1 });
    expect(results.total).toBe(72);
    expect(results.facets.exam[EXAM]).toBe(72);
  });

  it("serves only21 necessary official figure crops and credits Nichimu in JSON-LD", () => {
    expect(LAND_SPECIAL1_QUESTIONS.filter(q => q.hasImage)).toHaveLength(21);
    for (const asset of figures.assets) {
      const file = path.join(process.cwd(), asset.path);
      expect(existsSync(file)).toBe(true);
      expect(createHash("sha256").update(readFileSync(file)).digest("hex")).toBe(asset.sha256);
    }
    for (const q of LAND_SPECIAL1_QUESTIONS) {
      expect(q.license).toBe("NICHIMU-educational-reuse");
      expect(q.sourcePdfUrl).toMatch(/^https:\/\/www\.nichimu\.or\.jp\/.*-a\.pdf$/);
      expect(q.sourceAnswerUrl).toMatch(/-a-kaito\.pdf$/);
      if (q.hasImage) {
        expect(q.imageUrls).toHaveLength(1);
        expect(q.imageAltTexts).toHaveLength(1);
        expect(existsSync(path.join(process.cwd(), "public", q.imageUrls![0]!.slice(1)))).toBe(true);
      }
      const resource = buildQuestionJsonLd({ question: q, pageUrlAbs: `https://www.kakomon-ai.jp${questionPagePath(q)}`,
        title: "第一級陸上特殊無線技士 A版", lastUpdatedISO: "2026-10-15" })["@graph"][0] as {
          creator: { name: string }; hasPart: { author: { name: string } }; license?: string;
        };
      expect(resource.creator.name).toContain("日本無線協会");
      expect(resource.hasPart.author.name).toContain("日本無線協会");
      expect(resource.license).toBe("https://www.nichimu.or.jp/kshiken/siken/index.html");
    }
  });
});
