import { describe, expect, it } from "vitest";
import { ALL_QUESTIONS, QUESTIONS_BY_EXAM } from "@/data/questions";
import { KENCHIKUSHI1_QUESTIONS } from "@/data/questions/kenchikushi1";
import { KENCHIKUSHI1_CANDIDATES } from "@/data/qualification-staging/kenchikushi1";
import { filterQuestions, isPracticeReadyQuestion } from "@/lib/questions/filter";
import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";
import manifest from "@/data/questions/kenchikushi1/source-manifest.json";
import { ALL_EXAM_CODES, ALL_QUIZ_EXAM_CODES, EXAM_CONFIGS } from "@/lib/exam-config";
import { getQuestionsForExam } from "@/lib/questions/get-questions";
import { getQualificationByExamCode, isExamPublished } from "@/lib/qualifications/catalog";
import { getHomeDirectory } from "@/lib/home/home-directory";
import { defaultPracticeSession, parsePracticeSession, practiceSessionLabel } from "@/lib/questions/practice-session";

// Publication boundaries must keep working when real candidate questions are added.
describe("一級建築士（学科）の公開前登録", () => {
  it("keeps synchronous and lazy registries and public navigation closed", async () => {
    expect(getQualificationByExamCode("kenchikushi1")?.status).toBe("ready-to-ingest");
    expect(isExamPublished("kenchikushi1")).toBe(false);
    expect(ALL_QUIZ_EXAM_CODES).not.toContain("kenchikushi1");
    expect(ALL_EXAM_CODES).not.toContain("kenchikushi1");
    expect(QUESTIONS_BY_EXAM.kenchikushi1).toBeUndefined();
    expect(ALL_QUESTIONS.some(q => q.exam === "kenchikushi1")).toBe(false);
    expect(await getQuestionsForExam("kenchikushi1")).toEqual([]);
    expect(JSON.stringify(getHomeDirectory())).not.toContain("kenchikushi1");
  });

  it("does not count a source manifest as completed past questions", () => {
    expect(KENCHIKUSHI1_QUESTIONS).toEqual([]);
    expect(manifest.publicationGo).toBe(false);
    expect(manifest.publicAllowed).toBe(false);
    expect(manifest.ingestionBlocked).toBe(false);
    expect(manifest.status).toBe("ready-to-ingest");
    expect(manifest.ownerDecision.decidedAt).toBe("2026-11-04T06:10:00+09:00");
    expect(manifest.ownerDecision.rightsHolderPermissionObtained).toBe(false);
    expect(manifest.rounds.map(r => [r.year, r.expectedQuestions, r.transcribedQuestions])).toEqual([
      [2026, 125, 20], [2025, 125, 20],
    ]);
    expect(manifest.sources).toHaveLength(8);
    for (const source of manifest.sources) {
      expect(source.url).toMatch(/^https:\/\/www\.jaeic\.or\.jp\//);
      expect(source.sha256).toMatch(/^[0-9a-f]{64}$/);
      expect(source.bytes).toBeGreaterThan(0);
    }
  });

  it("validates real staged originals and all four original explanations against the final official answers", () => {
    expect(KENCHIKUSHI1_CANDIDATES).toHaveLength(40);
    expect(new Set(KENCHIKUSHI1_CANDIDATES.map(q => q.id)).size).toBe(40);
    expect(KENCHIKUSHI1_CANDIDATES.map(q => q.officialAnswerNumber)).toEqual(
      [4,4,2,4,1,1,2,2,2,1,1,3,2,2,3,1,4,3,3,4,
       4,2,1,3,4,2,2,3,1,2,3,4,4,1,4,4,2,2,1,3].map(String),
    );
    for (const round of manifest.rounds) {
      const candidates = KENCHIKUSHI1_CANDIDATES.filter(q => q.year === round.year);
      expect(candidates).toHaveLength(round.transcribedQuestions);
      expect(candidates.map(q => q.qNumber)).toEqual(Array.from({ length: 20 }, (_, i) => i + 1));
    }
    for (const q of KENCHIKUSHI1_CANDIDATES) {
      const round = manifest.rounds.find(r => r.year === q.year)!;
      const subject = round.subjects.find(s => s.session === q.session)!;
      const official = subject.answers.find(a => a.qNumber === q.qNumber)!;
      expect(q.officialAnswerNumber).toBe(String(official.officialAnswerNumber));
      expect(q.answer).toBe("アイウエ"[official.officialAnswerNumber! - 1]);
      expect(q.sourcePdfUrl).toBe(subject.sourcePdfUrl);
      expect(q.sourceAnswerUrl).toBe(round.sourceAnswerUrl);
      expect(q.lawReferenceDate).toBe(round.lawReferenceDate);
      expect(q.questionNotice).toBe(round.lawReferenceNote);
      expect(q.originalContent?.body).toBe(q.question);
      expect(q.originalContent?.choices).toEqual(q.choices);
      expect(Object.keys(q.choices!)).toEqual(["ア", "イ", "ウ", "エ"]);
      expect(Object.keys(q.choiceExplanations!)).toEqual(["ア", "イ", "ウ", "エ"]);
      for (const text of Object.values(q.choiceExplanations!)) expect(text.length).toBeGreaterThan(20);
      expect(q.explanationCoverage).toBe("full");
      expect(JSON.stringify([q.question, q.choices])).not.toMatch(/\\u000[0-8b-f]|�/);
      expect(q.sourceAttribution).toContain("建築技術教育普及センター");
      expect(q.license).toBe("JAEIC-owner-approved-staging");
      expect(q.publicAllowed).toBe(false);
      expect(q.needsReview).toBe(true);
      // Even clearing a review flag must not make an unpublished original playable.
      expect(isPracticeReadyQuestion({ ...q, needsReview: false })).toBe(false);
    }
    expect(filterQuestions(KENCHIKUSHI1_CANDIDATES, { mode: "year", exam: "kenchikushi1" })).toEqual([]);
    const candidate = KENCHIKUSHI1_CANDIDATES[0];
    expect(isPracticeReadyQuestion({ ...candidate, needsReview: false, publicAllowed: true })).toBe(true);
    const area = KENCHIKUSHI1_CANDIDATES.find(q => q.year === 2025 && q.qNumber === 12)!;
    expect(area.choices?.ア).toContain("25 m²");
    expect(area.questionNotice).toContain("2025-04-01");
  });

  it("retains the original table and diagram outside the public directory", () => {
    const illustrated = KENCHIKUSHI1_CANDIDATES.filter(q => q.hasImage);
    expect(illustrated.map(q => [q.year, q.qNumber])).toEqual([[2026, 3], [2026, 19]]);
    for (const q of illustrated) {
      expect(q.originalContent?.tables?.[0].rows).toHaveLength(5);
      expect(q.imageUrls).toHaveLength(1);
      expect(q.imageAltTexts).toHaveLength(1);
      for (const url of q.imageUrls!) {
        expect(url).toMatch(/^data\/qualification-staging\/kenchikushi1\/assets\//);
        const path = resolve(process.cwd(), url);
        expect(existsSync(path)).toBe(true);
        expect(readFileSync(path).subarray(0, 8).toString("hex")).toBe("89504e470d0a1a0a");
        expect(existsSync(resolve(process.cwd(), "public", url))).toBe(false);
      }
    }
  });

  it("preserves official subject numbering and the corrected final answer", () => {
    for (const round of manifest.rounds) {
      expect(round.subjects.map(s => s.expectedQuestions)).toEqual([20, 20, 30, 30, 25]);
      for (const subject of round.subjects) {
        expect(subject.answers.map(a => a.qNumber)).toEqual(Array.from({ length: subject.expectedQuestions }, (_, i) => i + 1));
        for (const answer of subject.answers) {
          if (round.year === 2026 && subject.session === "houki" && answer.qNumber === 29) {
            expect(answer.officialAnswerNumber).toBeNull();
            expect(answer.grading).toBe("credit-for-all");
          } else {
            expect([1, 2, 3, 4]).toContain(answer.officialAnswerNumber);
            expect(answer.grading).toBe("single-choice");
          }
        }
      }
    }
    expect(manifest.rounds[0].subjects[0].answers.map(a => a.officialAnswerNumber)).toEqual([4,4,2,4,1,1,2,2,2,1,1,3,2,2,3,1,4,3,3,4]);
    expect(manifest.rounds[1].lawReferenceNote).toContain("2025-04-01");
  });

  it("routes five subjects independently without design drafting", () => {
    const config = EXAM_CONFIGS.kenchikushi1;
    expect(config.yearRange).toEqual({ start: 2025, end: 2026 });
    expect(config.sessions.map(s => s.session)).toEqual(manifest.rounds[0].subjects.map(s => s.session));
    expect(config.sessions.reduce((n, s) => n + s.expectedQuestions, 0)).toBe(125);
    expect(defaultPracticeSession("kenchikushi1")).toBe("keikaku");
    for (const subject of config.sessions) {
      expect(parsePracticeSession(subject.urlSlug)).toBe(subject.session);
      expect(practiceSessionLabel(subject.session)).toBeTruthy();
    }
  });
});
