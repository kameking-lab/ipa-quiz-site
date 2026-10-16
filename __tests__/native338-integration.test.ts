import { describe, expect, it } from "vitest";
import { existsSync } from "node:fs";
import path from "node:path";
import { ALL_QUESTIONS, QUESTIONS_BY_EXAM } from "@/data/questions";
import { RIKU_TECH1_QUESTIONS } from "@/data/questions/riku-tech1";
import { MARITIME4_QUESTIONS } from "@/data/questions/maritime4";
import { LAND_SPECIAL1_QUESTIONS } from "@/data/questions/land-special1";
import { EXAM_CONFIGS, ALL_EXAM_CODES } from "@/lib/exam-config";
import { getRegisteredExamCodes, getQuestionsForExam } from "@/lib/questions/get-questions";
import { isPracticeReadyQuestion, shuffleChoices } from "@/lib/questions/filter";
import { choiceDisplayLabel, questionNumberLabel, usesNumberedChoices } from "@/lib/questions/display";
import { defaultPracticeSession, parsePracticeSession, practiceSessionLabel } from "@/lib/questions/practice-session";
import { findQuestionByRoute, questionPagePath } from "@/lib/seo/question-url";
import { gradeNativeB } from "@/lib/questions/native-b";
import { getQuestionsByExamStrict, groupByYearSeason } from "@/lib/seo/exam-meta";
import { getQualificationByExamCode } from "@/lib/qualifications/catalog";
import { formatYearSeason } from "@/lib/utils";
import { questionSourceEdition } from "@/lib/questions/source-label";

const pools = { "riku-tech1": RIKU_TECH1_QUESTIONS, maritime4: MARITIME4_QUESTIONS, "land-special1": LAND_SPECIAL1_QUESTIONS } as const;
const combined = Object.values(pools).flat();

describe("three qualification native338 integration", () => {
  it("registers the same338 records through eager, lazy and practice routes", async () => {
    expect(combined).toHaveLength(338);
    expect(new Set(combined.map(q => q.id)).size).toBe(338);
    expect(getRegisteredExamCodes()).toHaveLength(75);
    for (const [exam, questions] of Object.entries(pools)) {
      const code = exam as keyof typeof pools;
      expect(getRegisteredExamCodes()).toContain(code);
      expect(ALL_EXAM_CODES).not.toContain(code);
      expect(await getQuestionsForExam(code)).toEqual(questions);
      expect(QUESTIONS_BY_EXAM[code]).toEqual(questions);
      expect(getQuestionsByExamStrict(code)).toEqual(questions);
      expect(ALL_QUESTIONS.filter(q => q.exam === code)).toEqual(questions);
      expect(questions.every(isPracticeReadyQuestion)).toBe(true);
      expect(getQualificationByExamCode(code)?.status).toBe("live");
    }
  });

  it("counts original questions separately from native B answer cells", () => {
    const native = combined.filter(q => q.type === "native-b");
    expect(native).toHaveLength(62);
    expect(native.reduce((n,q) => n + q.nativeB!.slots.length, 0)).toBe(310);
    expect(combined.filter(q => q.type === "multiple-choice")).toHaveLength(276);
    expect(combined.reduce((n,q) => n + (q.nativeB?.slots.length ?? 1), 0)).toBe(586);
    expect(RIKU_TECH1_QUESTIONS.filter(q => q.nativeB)).toHaveLength(40);
    expect(MARITIME4_QUESTIONS.filter(q => q.nativeB)).toHaveLength(22);
    expect(groupByYearSeason(RIKU_TECH1_QUESTIONS).map(g => g.count)).toEqual([95,95]);
    expect(groupByYearSeason(MARITIME4_QUESTIONS).map(g => g.count)).toEqual([38,38]);
    expect(groupByYearSeason(LAND_SPECIAL1_QUESTIONS).map(g => g.count)).toEqual([36,36]);
  });

  it("resolves all canonical URLs including August A/B with overlapping numbers", () => {
    const routes = combined.map(questionPagePath);
    expect(new Set(routes).size).toBe(338);
    for (const q of combined) {
      const [, , exam, yearSeason, section, qnum] = questionPagePath(q).split("/");
      expect(findQuestionByRoute(combined, { exam:exam!, yearSeason:yearSeason!, section:section!, qnum:qnum! })?.id).toBe(q.id);
    }
    const august = MARITIME4_QUESTIONS.filter(q => q.season === "august");
    expect(august).toHaveLength(38);
    expect(august.some(q => questionPagePath(q).endsWith("q1a"))).toBe(true);
    expect(august.some(q => questionPagePath(q).endsWith("q1b"))).toBe(true);
    expect(formatYearSeason(2026,"august")).toBe("2026年8月試験");
    expect(formatYearSeason(2026,"july")).toBe("令和8年度 7月試験");
    expect(questionSourceEdition(RIKU_TECH1_QUESTIONS.find(q => q.season === "july")!)).toBe("2026年7月試験");
  });

  it("keeps printed B labels and gives partial results without splitting originals", () => {
    let repeatedAnswerOriginals = 0;
    for (const q of combined.filter(q => q.nativeB)) {
      const data = q.nativeB!;
      expect(q.answer).toBe("");
      expect(questionNumberLabel(q)).toBe(data.officialLabel);
      expect(data.slots).toHaveLength(5);
      const selections = Object.fromEntries(data.slots.map(s => [s.label,s.answer]));
      expect(gradeNativeB(data,selections).correctSlots).toBe(5);
      const first = data.slots[0]!;
      delete selections[first.label];
      const partial = gradeNativeB(data,selections);
      expect(partial.correctSlots).toBe(4);
      expect(partial.slotResults[0]!.status).toBe("unanswered");
      expect(partial.isCorrect).toBe(false);
      if (new Set(data.slots.map(s => s.answer)).size < 5) repeatedAnswerOriginals++;
    }
    expect(repeatedAnswerOriginals).toBeGreaterThan(0);
  });

  it("keeps candidate order and numbered choices during shuffled practice", () => {
    for (const q of combined) {
      expect(shuffleChoices(q)).toBe(q);
      expect(usesNumberedChoices(q.exam)).toBe(true);
      expect(choiceDisplayLabel(q.exam,"ア")).toBe("1");
      expect(q.license).toBe("NICHIMU-educational-reuse");
      expect(q.sourcePdfUrl).toMatch(/^https:\/\/www\.nichimu\.or\.jp\//);
      expect(q.sourceAnswerUrl).toMatch(/^https:\/\/www\.nichimu\.or\.jp\//);
    }
  });

  it("registers actual subject entry points and original counts", () => {
    expect(defaultPracticeSession("riku-tech1")).toBe("kiso");
    expect(defaultPracticeSession("maritime4")).toBe("houki");
    for (const session of ["kiso","kogaku-a","kogaku-b"] as const) {
      expect(parsePracticeSession(session)).toBe(session);
      expect(practiceSessionLabel(session)).toMatch(/^無線工学/);
    }
    expect(EXAM_CONFIGS["riku-tech1"].sessions.map(s => s.expectedQuestions)).toEqual([25,25,25,20]);
    expect(EXAM_CONFIGS.maritime4.sessions.map(s => s.expectedQuestions)).toEqual([18,20]);
  });

  it("mounts original assets and preserves the two morning land72 scope", () => {
    const assets = new Set<string>();
    for (const q of combined) {
      for (const url of [...(q.imageUrls ?? []), ...Object.values(q.choiceImageUrls ?? {}), ...(q.nativeB?.bankImageUrls ?? [])]) {
        expect(url.startsWith("/")).toBe(true);
        expect(existsSync(path.join(process.cwd(),"public",url.slice(1)))).toBe(true);
        assets.add(url);
      }
    }
    expect(assets.size).toBe(206);
    expect(getQualificationByExamCode("land-special1")?.reuseSummary).toContain("13:30 B版72問は未収録");
  });
});
