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
import { evaluateOfficialScore, officialScoringIssue } from "@/lib/questions/official-scoring";
import { formatQuestionAnswerForDisplay } from "@/lib/questions/display";
import { isAcceptedAnswer } from "@/lib/questions/answers";

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
      [2026, 125, 125], [2025, 125, 40],
    ]);
    expect(manifest.sources).toHaveLength(8);
    for (const source of manifest.sources) {
      expect(source.url).toMatch(/^https:\/\/www\.jaeic\.or\.jp\//);
      expect(source.sha256).toMatch(/^[0-9a-f]{64}$/);
      expect(source.bytes).toBeGreaterThan(0);
    }
  });

  it("validates real staged originals and all four original explanations against the final official answers", () => {
    expect(KENCHIKUSHI1_CANDIDATES).toHaveLength(165);
    expect(new Set(KENCHIKUSHI1_CANDIDATES.map(q => q.id)).size).toBe(165);
    expect(KENCHIKUSHI1_CANDIDATES.map(q => q.officialAnswerNumber)).toEqual(
      [4,4,2,4,1,1,2,2,2,1,1,3,2,2,3,1,4,3,3,4,
       4,2,1,3,4,2,2,3,1,2,3,4,4,1,4,4,2,2,1,3,
       2,1,4,3,3,4,1,4,4,2,1,4,2,2,3,1,4,3,2,3,
       2,3,2,4,4,1,3,2,1,2,2,2,4,3,2,3,3,1,3,1,4,1,3,2,4,3,4,4,null,4,
       2,3,3,1,1,2,2,4,4,3,2,4,1,3,3,2,4,2,1,3,3,1,4,1,4,2,4,3,4,3,
       3,2,2,4,3,1,1,1,3,2,2,4,1,3,1,3,4,1,4,4,4,1,3,2,2,
       1,2,2,4,4,4,1,1,4,2,3,3,3,2,3,2,1,4,3,4].map(a => a === null ? null : String(a)),
    );
    for (const round of manifest.rounds) {
      const candidates = KENCHIKUSHI1_CANDIDATES.filter(q => q.year === round.year);
      expect(candidates).toHaveLength(round.transcribedQuestions);
      for (const subject of round.subjects) {
        const paper = candidates.filter(q => q.session === subject.session);
        const count = subject.session === "keikaku" || subject.session === "kankyo-setsubi" ? 20 : round.year === 2026 ? (subject.session === "sekou" ? 25 : 30) : 0;
        expect(paper.map(q => q.qNumber)).toEqual(Array.from({ length: count }, (_, i) => i + 1));
        if ("transcribedQuestions" in subject) expect(paper).toHaveLength(subject.transcribedQuestions!);
      }
    }
    for (const q of KENCHIKUSHI1_CANDIDATES) {
      const round = manifest.rounds.find(r => r.year === q.year)!;
      const subject = round.subjects.find(s => s.session === q.session)!;
      const official = subject.answers.find(a => a.qNumber === q.qNumber)!;
      expect(q.officialAnswerNumber).toBe(official.officialAnswerNumber === null ? null : String(official.officialAnswerNumber));
      if (official.grading === "credit-for-all") expect(q.answer).toEqual([]);
      else expect(q.answer).toBe("アイウエ"[official.officialAnswerNumber! - 1]);
      expect(q.sourcePdfUrl).toBe(subject.sourcePdfUrl);
      expect(q.sourceAnswerUrl).toBe(round.sourceAnswerUrl);
      expect(q.lawReferenceDate).toBe(round.lawReferenceDate);
      expect(q.questionNotice).toContain(round.lawReferenceNote);
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

  it("preserves superscripts, unit divisions and sensor references from the environmental paper", () => {
    const env = KENCHIKUSHI1_CANDIDATES.filter(q => q.year === 2026 && q.session === "kankyo-setsubi");
    expect(env).toHaveLength(20);
    expect(env[1].choices?.エ).toContain("SET＊");
    expect(env[2].question).toContain("0.030 m³／（h・人）");
    for (const choice of Object.values(env[2].choices!)) expect(choice).toContain("m³／（h・人）");
    expect(env[7].choices?.ウ).toContain("５B 4／6");
    expect(env[7].choices?.ウ).toContain("５B 6／4");
    expect(env[9].choices?.エ).toContain("10⁻⁵倍");
    expect(env[9].choices?.ウ).not.toContain("倍にする");
    expect(env[17].choices?.ア).toContain("120 m³／min");
    expect(env[17].choices?.イ).toContain("120 kg／m³");
    expect(env[11].choices?.エ).toContain("TH②");
    expect(env[11].choices?.エ).toContain("TH③");
  });

  it("retains the original table and diagram outside the public directory", () => {
    const illustrated = KENCHIKUSHI1_CANDIDATES.filter(q => q.hasImage);
    expect(illustrated.map(q => [q.year, q.session, q.qNumber])).toEqual([
      [2026, "keikaku", 3], [2026, "keikaku", 19],
      [2026, "kankyo-setsubi", 4], [2026, "kankyo-setsubi", 12],
      [2026, "houki", 4], [2026, "houki", 16], [2026, "houki", 17],
      [2026, "kozo", 1], [2026, "kozo", 2], [2026, "kozo", 3], [2026, "kozo", 4],
      [2026, "kozo", 5], [2026, "kozo", 6], [2026, "kozo", 10], [2026, "kozo", 11],
      [2026, "sekou", 24], [2025, "kankyo-setsubi", 6], [2025, "kankyo-setsubi", 9], [2025, "kankyo-setsubi", 11],
    ]);
    for (const q of illustrated) {
      if (q.session === "keikaku") expect(q.originalContent?.tables?.[0].rows).toHaveLength(5);
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

  it("separates the corrected all-candidate credit from correct choices, including a blank response", () => {
    const q = KENCHIKUSHI1_CANDIDATES.find(q => q.session === "houki" && q.qNumber === 29)!;
    expect(q.officialAnswerNumber).toBeNull();
    expect(q.answer).toEqual([]);
    expect(q.officialScoring?.reason).toContain("完了検査");
    expect(officialScoringIssue(q)).toBeUndefined();
    for (const selected of [undefined, "", "ア", "イ", "ウ", "エ"]) {
      expect(evaluateOfficialScore(q, selected)).toEqual({ awarded: true, correctChoice: false, label: "正答肢なし（全員加点）" });
      expect(isAcceptedAnswer(q.answer, selected)).toBe(false);
    }
    expect(formatQuestionAnswerForDisplay(q, q.answer)).toBe("正答肢なし（全員加点）");
    expect(formatQuestionAnswerForDisplay(q, "ア")).not.toContain("全員加点");
    expect(officialScoringIssue({ ...q, answer: ["ア", "イ", "ウ", "エ"] })).toBeTruthy();
    expect(officialScoringIssue({ ...q, officialAnswerNumber: "1" })).toBeTruthy();
    expect(officialScoringIssue({ ...q, sourceAnswerUrl: undefined })).toBeTruthy();
    expect(isPracticeReadyQuestion({ ...q, publicAllowed: true, needsReview: false })).toBe(false);
    const normal = KENCHIKUSHI1_CANDIDATES[0];
    expect(evaluateOfficialScore(normal, String(normal.answer)).awarded).toBe(true);
    expect(evaluateOfficialScore(normal, undefined).awarded).toBe(false);
  });

  it("retains law fractions, units, original table cells and booklet assumptions", () => {
    const law = KENCHIKUSHI1_CANDIDATES.filter(q => q.session === "houki");
    expect(law).toHaveLength(30);
    expect(law[1].choices?.ア).toContain("1/100");
    expect(law[1].choices?.ウ).toContain("1/8");
    expect(law[2].choices?.イ).toContain("10 m²");
    expect(law[3].originalContent?.tables?.[0].rows).toHaveLength(5);
    expect(law[9].choices?.ア).toContain("m³／時");
    expect(law[11].choices?.イ).toContain("24 N／mm²");
    expect(law[11].choices?.イ).toContain("1/3");
    expect(law[15].choices).toEqual({ ア: "30/10", イ: "39/10", ウ: "42/10", エ: "45/10" });
    expect(law[19].choices?.イ).toContain("1/7");
    expect(law[19].choices?.ウ).toContain("歩行距離は、40 m以下");
    for (const q of law) {
      expect(q.questionNotice).toContain("区画避難安全検証法");
      expect(q.questionNotice).toContain("情報通信");
      expect(q.questionNotice).toContain("地方公共団体の条例");
    }
  });

  it("retains engineering symbols, radical formulas, tables and original diagram choices", () => {
    const kozo = KENCHIKUSHI1_CANDIDATES.filter(q => q.session === "kozo");
    expect(kozo).toHaveLength(30);
    expect(kozo[0].question).toContain("bh³/12、πh⁴/64");
    expect(kozo[1].choices?.ウ).toBe("PL³/(4EI)");
    expect(kozo[2].choices?.ウ).toContain("PL/3");
    expect(kozo[4].choices?.ア).toContain("＋√2P");
    expect(kozo[5].choices?.イ).toBe("T_A＜T_B＝T_C");
    expect(kozo[9].choices).toEqual({ ア: "図1", イ: "図2", ウ: "図3", エ: "図4" });
    const env = KENCHIKUSHI1_CANDIDATES.filter(q => q.year === 2025 && q.session === "kankyo-setsubi");
    expect(env).toHaveLength(20);
    expect(env[5].originalContent?.tables?.[0].rows).toHaveLength(5);
    expect(env[5].choices?.エ).toContain("√3J_N/2");
    expect(env[8].originalContent?.tables?.[0].rows[3]).toEqual(["Ｃ", "100", "0.40"]);
    expect(env[9].choices?.エ).toContain("1/√2倍");
    const sekou = KENCHIKUSHI1_CANDIDATES.filter(q => q.session === "sekou");
    expect(sekou).toHaveLength(25);
    expect(sekou[21].choices?.エ).toContain("比（h/d）が1.50");
    expect(sekou[22].choices?.ウ).toContain("20 kg／m²");
    expect(sekou[23].originalContent?.tables?.[0].rows).toHaveLength(5);
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
