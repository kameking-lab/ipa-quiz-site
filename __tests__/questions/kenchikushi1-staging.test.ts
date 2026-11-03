import { describe, expect, it } from "vitest";
import { ALL_QUESTIONS, QUESTIONS_BY_EXAM } from "@/data/questions";
import { KENCHIKUSHI1_QUESTIONS } from "@/data/questions/kenchikushi1";
import manifest from "@/data/questions/kenchikushi1/source-manifest.json";
import { ALL_EXAM_CODES, ALL_QUIZ_EXAM_CODES, EXAM_CONFIGS } from "@/lib/exam-config";
import { getQuestionsForExam } from "@/lib/questions/get-questions";
import { getQualificationByExamCode, isExamPublished } from "@/lib/qualifications/catalog";
import { getHomeDirectory } from "@/lib/home/home-directory";
import { defaultPracticeSession, parsePracticeSession, practiceSessionLabel } from "@/lib/questions/practice-session";

// Rechecked against the downloaded final-answer PDFs; x means no correct option.
// These literals are independent of the manifest, which must not define its own oracle.
const FINAL_ANSWERS = [
  { year: 2026, rows: [
    "44241122211322314334",
    "21433414421422314323",
    "2324413212224323313141324344x4",
    "233112244324133242133141424343",
    "3224311132241313414441322",
  ] },
  { year: 2025, rows: [
    "42134223123441442213",
    "12244411423332321434",
    "323431342114232432432324113441",
    "122342143441132134232214343133",
    "2134241132244233424111331",
  ] },
];

// Publication boundaries must keep working when real candidate questions are added.
describe("一級建築士（学科）の公開前登録", () => {
  it("keeps synchronous and lazy registries and public navigation closed", async () => {
    expect(getQualificationByExamCode("kenchikushi1")?.status).toBe("permission-required");
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
    expect(manifest.rounds.map(r => [r.year, r.expectedQuestions, r.transcribedQuestions])).toEqual([
      [2026, 125, 0], [2025, 125, 0],
    ]);
    expect(manifest.sources).toHaveLength(8);
    for (const source of manifest.sources) {
      expect(source.url).toMatch(/^https:\/\/www\.jaeic\.or\.jp\//);
      expect(source.sha256).toMatch(/^[0-9a-f]{64}$/);
      expect(source.bytes).toBeGreaterThan(0);
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

  it.each(FINAL_ANSWERS)("pins all 125 final-answer metadata entries for $year", ({ year, rows }) => {
    const round = manifest.rounds.find(r => r.year === year)!;
    expect(round.subjects.map(s => s.session)).toEqual(["keikaku", "kankyo-setsubi", "houki", "kozo", "sekou"]);
    expect(round.subjects.flatMap(s => s.answers)).toHaveLength(125);
    round.subjects.forEach((subject, index) => {
      expect(subject.answers.map(a => a.officialAnswerNumber)).toEqual(
        [...rows[index]].map(value => value === "x" ? null : Number(value)),
      );
      expect(subject.answers.map(a => a.grading)).toEqual(
        [...rows[index]].map(value => value === "x" ? "credit-for-all" : "single-choice"),
      );
    });
  });

  it("records successful retrieval without changing the staging publication boundary", () => {
    expect(manifest.ownerDecision.recordedDecisionAt).toBe("2026-11-04T06:10");
    expect(manifest.publicationGo).toBe(false);
    for (const source of manifest.sources) {
      expect(source.retrieval.httpStatus).toBe(200);
      expect(source.retrieval.integrityVerified).toBe(true);
      expect(source.retrieval.localPath).toMatch(/^ops\/source-pdfs-20261104\/1k-/);
    }
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
