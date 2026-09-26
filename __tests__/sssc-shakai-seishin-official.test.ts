import { readFileSync, readdirSync } from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";

import { ALL_QUESTIONS } from "@/data/questions";
import { SEISHIN_QUESTIONS } from "@/data/questions/seishin";
import { SHAKAI_QUESTIONS } from "@/data/questions/shakai";
import { SSSC_INDEPENDENCE_NOTICE } from "@/data/questions/sssc-welfare";
import { EXAM_CONFIGS } from "@/lib/exam-config";
import { isExamPublished } from "@/lib/qualifications/catalog";
import { isCompleteSelectionCorrect, requiredSelectionCount } from "@/lib/questions/answers";
import { choiceDisplayLabel } from "@/lib/questions/display";
import { defaultPracticeSession } from "@/lib/questions/practice-session";
import type { ChoiceKey, Question } from "@/lib/questions/types";
import { getQuestionCanonicalRepresentative } from "@/lib/seo/question-canonical";
import { findQuestionByRoute, questionPagePath } from "@/lib/seo/question-url";

const report = path.join(process.cwd(), "reports/sssc-welfare-20260926");
const readJson = <T,>(file: string): T => JSON.parse(readFileSync(path.join(report, file), "utf8")) as T;
type Transcribed = { number: number; subject: string; stem: string; choices: string[]; notes: string[]; case: string | null };
type Transcription = { sourceFiles: Record<string, string>; normalizations: { op: string }[]; questions: Transcribed[] };
const keys = readJson<{ shakai: Record<string, number[]>; seishin: Record<string, number[]>; seishinCommonEqualsShakai1to84: boolean; sourceFiles: Record<string, { sha256: string }> }>("answer-keys.json");
const sources = readJson<Record<"shakai" | "seishin", { files: Record<string, { url: string; sha256: string }> }>>("sources.json");
const KEYS: readonly ChoiceKey[] = ["ア", "イ", "ウ", "エ", "オ"];
const compose = (q: Transcribed) => [...(q.case ? [q.case] : []), q.stem, ...q.notes].join("\n");
const range = (from: number, to: number) => Array.from({ length: to - from + 1 }, (_, i) => from + i);

function expectVerbatim(questions: Question[], transcription: Transcription, numbers: number[]) {
  const byNumber = new Map(transcription.questions.map((q) => [q.number, q]));
  expect(questions.map((q) => q.qNumber)).toEqual(numbers);
  for (const q of questions) {
    const source = byNumber.get(q.qNumber)!;
    expect(q.question, q.id).toBe(compose(source));
    expect(Object.values(q.choices ?? {}), q.id).toEqual(source.choices);
    expect(q.category, q.id).toBe(source.subject);
    // PDFの読点「，」のまま。読み上げ用HTMLの「、」は混入しない。
    expect([q.question, ...source.choices].join("").includes("、"), q.id).toBe(false);
  }
}

function expectAnswers(questions: Question[], official: Record<string, number[]>) {
  for (const q of questions) {
    const answer = official[String(q.qNumber)]!;
    const expectedKeys = answer.map((n) => KEYS[n - 1]!);
    expect(q.officialAnswerNumber, q.id).toBe(answer.join(","));
    expect(requiredSelectionCount(q), q.id).toBe(answer.length);
    expect(isCompleteSelectionCorrect(q.answer, expectedKeys), q.id).toBe(true);
    expect(q.question, q.id).toContain(`${answer.length}つ選びなさい`);
    expect(expectedKeys.map((key) => choiceDisplayLabel(q.exam, key)).join(","), q.id).toBe(answer.join(","));
  }
}

describe("第38回社会福祉士・第28回精神保健福祉士の公式照合", () => {
  const shakaiT = readJson<Transcription>("shakai-source-transcription.json");
  const seishinT = readJson<Transcription>("seishin-source-transcription.json");

  it("件数ゲート: 社会福祉士129問（共通84・専門45）、精神保健福祉士132問（専門48・共通84）", () => {
    expect(isExamPublished("shakai") && isExamPublished("seishin")).toBe(true);
    expect(EXAM_CONFIGS.shakai.sessions.map((s) => [s.session, s.expectedQuestions])).toEqual([["kyotsu", 84], ["senmon", 45]]);
    expect(EXAM_CONFIGS.seishin.sessions.map((s) => [s.session, s.expectedQuestions])).toEqual([["senmon", 48], ["kyotsu", 84]]);
    expect(SHAKAI_QUESTIONS.filter((q) => q.session === "kyotsu").map((q) => q.qNumber)).toEqual(range(1, 84));
    expect(SHAKAI_QUESTIONS.filter((q) => q.session === "senmon").map((q) => q.qNumber)).toEqual(range(85, 129));
    expect(SEISHIN_QUESTIONS.filter((q) => q.session === "senmon").map((q) => q.qNumber)).toEqual(range(1, 48));
    expect(SEISHIN_QUESTIONS.filter((q) => q.session === "kyotsu").map((q) => q.qNumber)).toEqual(range(1, 84));
    expect(defaultPracticeSession("shakai")).toBe("kyotsu");
    expect(defaultPracticeSession("seishin")).toBe("senmon");
  });

  it("問題文・選択肢は公式PDFテキストと一字一句同じ", () => {
    for (const [name, sha] of Object.entries(shakaiT.sourceFiles)) expect(sources.shakai.files[name]?.sha256, name).toBe(sha);
    for (const [name, sha] of Object.entries(seishinT.sourceFiles)) expect(sources.seishin.files[name]?.sha256, name).toBe(sha);
    const allowed = new Set(["insert", "replace", "stem-continuation-in-dd", "pdf-paragraph-added"]);
    expect(shakaiT.normalizations.every((n) => allowed.has(n.op))).toBe(true);
    expect(seishinT.normalizations.every((n) => allowed.has(n.op))).toBe(true);
    expectVerbatim(SHAKAI_QUESTIONS, shakaiT, range(1, 129));
    expectVerbatim(SEISHIN_QUESTIONS.filter((q) => q.session === "senmon"), seishinT, range(1, 48));
    expectVerbatim(SEISHIN_QUESTIONS.filter((q) => q.session === "kyotsu"), shakaiT, range(1, 84));
  });

  it("正答は公式「合格基準・正答一覧」と全問一致し、「2つ選びなさい」は2肢そろえて正解", () => {
    expect(keys.sourceFiles.shakai?.sha256).toBe(sources.shakai.files["s_kijun_seitou.pdf"]?.sha256);
    expect(keys.sourceFiles.seishin?.sha256).toBe(sources.seishin.files["se_kijun_seitou.pdf"]?.sha256);
    expect(keys.seishinCommonEqualsShakai1to84).toBe(true);
    expectAnswers(SHAKAI_QUESTIONS, keys.shakai);
    expectAnswers(SEISHIN_QUESTIONS.filter((q) => q.session === "senmon"), keys.seishin);
    expectAnswers(SEISHIN_QUESTIONS.filter((q) => q.session === "kyotsu"), keys.shakai);
    expect(SHAKAI_QUESTIONS.filter((q) => requiredSelectionCount(q) === 2)).toHaveLength(48);
    expect(SEISHIN_QUESTIONS.filter((q) => q.session === "senmon" && requiredSelectionCount(q) === 2)).toHaveLength(4);
    const q10 = SHAKAI_QUESTIONS.find((q) => q.qNumber === 10)!;
    expect(isCompleteSelectionCorrect(q10.answer, ["イ"])).toBe(false);
    expect(isCompleteSelectionCorrect(q10.answer, ["イ", "オ"])).toBe(true);
  });

  it("全問に5肢の独自解説と出典を持ち、URLが一意に解決する", () => {
    for (const q of [...SHAKAI_QUESTIONS, ...SEISHIN_QUESTIONS]) {
      expect(Object.keys(q.choiceExplanations ?? {}), q.id).toEqual([...KEYS]);
      expect(Object.values(q.choiceExplanations ?? {}).every((reason) => reason.trim().length >= 25), q.id).toBe(true);
      expect(q.sourceAttribution, q.id).toContain(SSSC_INDEPENDENCE_NOTICE);
      expect(q.sourceAttribution, q.id).not.toMatch(/転載|許諾|許可|利用条件|使用料|原文のまま/);
      expect(q.sourcePdfUrl.startsWith("https://www.sssc.or.jp/"), q.id).toBe(true);
      const [, , exam, yearSeason, section, qnum] = questionPagePath(q).split("/");
      const pool = q.exam === "shakai" ? SHAKAI_QUESTIONS : SEISHIN_QUESTIONS;
      expect(findQuestionByRoute(pool, { exam: exam!, yearSeason: yearSeason!, section: section!, qnum: qnum! })?.id).toBe(q.id);
    }
    const seishinCommon = SEISHIN_QUESTIONS.find((q) => q.session === "kyotsu" && q.qNumber === 1)!;
    expect(seishinCommon.sourcePdfUrl).toBe("https://www.sssc.or.jp/shakai/past_exam/pdf/no38/sp_am_01_38.pdf");
    expect(seishinCommon.sourceAnswerUrl).toBe("https://www.sssc.or.jp/seishin/past_exam/pdf/no28/se_kijun_seitou.pdf");
    expect(seishinCommon.sourceAttribution).toContain("第28回（令和7年度）精神保健福祉士国家試験 共通科目 問題1。");
  });

  it("共通科目の重複ページは社会福祉士側を正規URLにする", () => {
    for (const q of SEISHIN_QUESTIONS.filter((item) => item.session === "kyotsu")) {
      const representative = getQuestionCanonicalRepresentative(ALL_QUESTIONS, q);
      expect(representative.exam, q.id).toBe("shakai");
      expect(representative.qNumber).toBe(q.qNumber);
    }
    const senmon = SEISHIN_QUESTIONS.find((q) => q.session === "senmon")!;
    expect(getQuestionCanonicalRepresentative(ALL_QUESTIONS, senmon).id).toBe(senmon.id);
  });

  it("解説は claude-opus-5-5 の生成と独立査読の実応答receiptを持つ", () => {
    for (const [exam, total] of [["shakai", 129], ["seishin", 48]] as const) {
      const dir = path.join(report, "explanations", exam);
      const receipts = readdirSync(dir).filter((f) => f.endsWith(".receipt.json"));
      const reviewed: number[] = [];
      for (const file of receipts) {
        const receipt = JSON.parse(readFileSync(path.join(dir, file), "utf8")) as {
          exitCode: number; isError: boolean; statuses: [number, string][];
          modelUsage: Record<string, { canonicalModel: string; provider: string }>;
        };
        expect(receipt.exitCode, file).toBe(0);
        expect(receipt.isError, file).toBe(false);
        expect(Object.keys(receipt.modelUsage)).toEqual(["claude-opus-5-5"]);
        expect(receipt.modelUsage["claude-opus-5-5"]).toMatchObject({ canonicalModel: "claude-opus-5-5", provider: "firstParty" });
        if (file.includes(".draft.")) expect(receipt.statuses.every(([, status]) => status === "PASS"), file).toBe(true);
        else reviewed.push(...receipt.statuses.map(([n]) => n));
      }
      expect(reviewed.sort((a, b) => a - b), exam).toEqual(range(1, total));
    }
  });
});
