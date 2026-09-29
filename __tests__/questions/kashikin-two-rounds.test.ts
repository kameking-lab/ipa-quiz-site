import { readFileSync, readdirSync } from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";

import { ALL_QUESTIONS } from "@/data/questions";
import { KASHIKIN_QUESTIONS } from "@/data/questions/kashikin";
import { EXAM_CONFIGS } from "@/lib/exam-config";
import { getQualificationByExamCode } from "@/lib/qualifications/catalog";
import { choiceDisplayLabel } from "@/lib/questions/display";
import { isPracticeReadyQuestion } from "@/lib/questions/filter";
import type { ChoiceKey } from "@/lib/questions/types";

const report = path.join(process.cwd(), "reports/kashikin-2rounds-20260929");
const readJson = <T,>(file: string): T => JSON.parse(readFileSync(path.join(report, file), "utf8")) as T;

type Round = "R07" | "R06";
type SourceQuestion = { number: number; category: string; stem: string; choices: string[]; officialAnswer: number };
type Transcription = {
  exam: string;
  indexUrl: string;
  rounds: Record<
    Round,
    {
      roundNo: number; year: number; label: string; examDate: string; lawReferenceDate: string;
      lawReferenceDateJa: string; pdfUrl: string; answerUrl: string; questions: SourceQuestion[];
    }
  >;
};
type Final = {
  explanations: Record<string, { summary: string; category: string; choiceExplanations: string[]; lawSensitive: boolean }>;
  held: Record<string, string>;
  reviewLog: { number: number; history: [string, string][] }[];
};
type Receipt = { requestedModel: string; tools: string[]; exitCode: number; isError: boolean; modelUsage: Record<string, { provider: string }> };

const KEYS: readonly ChoiceKey[] = ["ア", "イ", "ウ", "エ"];
const ROUNDS: readonly Round[] = ["R07", "R06"];
const CATEGORIES = [
  "法及び関係法令に関すること",
  "貸付け及び貸付けに付随する取引に関する法令及び実務に関すること",
  "資金需要者等の保護に関すること",
  "財務及び会計に関すること",
];
const source = readJson<Transcription>("source-transcription.json");
const withheld = (round: Round) => readJson<{ number: number; reason: string }[]>(`withheld-${round}.json`);
const final = (round: Round) => readJson<Final>(`explanations/${round}-final.json`);

describe("貸金業務取扱主任者資格試験（令和7年度・令和6年度、第20回・第19回）", () => {
  it("件数: 各回50問のうち査読PASSの問題だけを公開し、保留は理由付きで台帳に残す", () => {
    for (const round of ROUNDS) {
      const meta = source.rounds[round];
      const held = withheld(round).map((w) => w.number);
      const published = KASHIKIN_QUESTIONS.filter((q) => q.year === meta.year);
      expect(meta.questions.map((q) => q.number)).toEqual(Array.from({ length: 50 }, (_, i) => i + 1));
      expect(published.map((q) => q.qNumber)).toEqual(meta.questions.map((q) => q.number).filter((n) => !held.includes(n)));
      expect(Object.keys(final(round).held).map(Number).sort((a, b) => a - b)).toEqual(held);
      for (const w of withheld(round)) {
        expect(w.reason.length, `${round} ${w.number}`).toBeGreaterThan(5);
        expect(ALL_QUESTIONS.some((q) => q.exam === "kashikin" && q.year === meta.year && q.qNumber === w.number)).toBe(false);
      }
    }
    expect(new Set(KASHIKIN_QUESTIONS.map((q) => q.id)).size).toBe(KASHIKIN_QUESTIONS.length);
    expect(EXAM_CONFIGS.kashikin.yearRange).toEqual({ start: 2024, end: 2025 });
    expect(getQualificationByExamCode("kashikin")?.status).toBe("live");
  });

  it("正答: 公式正答PDFの表と全問一致し、1問1正答", () => {
    for (const round of ROUNDS) {
      const meta = source.rounds[round];
      for (const q of KASHIKIN_QUESTIONS.filter((item) => item.year === meta.year)) {
        const s = meta.questions.find((item) => item.number === q.qNumber)!;
        expect(q.answer).toBe(KEYS[s.officialAnswer - 1]);
        expect(q.officialAnswerNumber).toBe(String(s.officialAnswer));
      }
    }
  });

  it("転記: 独立2回抽出（PyMuPDF／pypdf）の差分は0件で、公開文面は原本転記と一致する", () => {
    for (const round of ROUNDS) {
      const meta = source.rounds[round];
      for (const q of KASHIKIN_QUESTIONS.filter((item) => item.year === meta.year)) {
        const s = meta.questions.find((item) => item.number === q.qNumber)!;
        expect(q.question).toBe(s.stem);
        expect(KEYS.map((k) => q.choices?.[k])).toEqual(s.choices);
      }
    }
  });

  it("出典・利用条件・法令基準日を各問に持ち、独自解説で日本貸金業協会と無関係である旨を表示する", () => {
    for (const round of ROUNDS) {
      const meta = source.rounds[round];
      for (const q of KASHIKIN_QUESTIONS.filter((item) => item.year === meta.year)) {
        expect(q.sourcePdfUrl).toBe(meta.pdfUrl);
        expect(q.sourceAnswerUrl).toBe(meta.answerUrl);
        expect(q.sourcePdfUrl.startsWith("https://www.j-fsa.or.jp/")).toBe(true);
        expect(q.sourceAttribution).toContain(`出典：一般社団法人日本貸金業協会 ${meta.label}（第${meta.roundNo}回）`);
        expect(q.sourceAttribution).toContain(`問${q.qNumber}`);
        expect(q.sourceAttribution).toContain("日本貸金業協会とは関係ありません");
        expect(q.officialReferenceUrls).toEqual([source.indexUrl]);
        expect(q.license).toBe("JFSA-attributed");
        expect(q.lawReferenceDate).toBe(meta.lawReferenceDate);
        expect(q.season).toBe("annual");
        expect(q.session).toBe("gakka");
      }
    }
    expect(choiceDisplayLabel("kashikin", "ア")).toBe("(1)");
    expect(choiceDisplayLabel("kashikin", "エ")).toBe("(4)");
  });

  it("解説: 全4肢に査読PASSの解説があり、4分野のいずれかに分類される", () => {
    for (const round of ROUNDS) {
      const meta = source.rounds[round];
      const fin = final(round);
      for (const q of KASHIKIN_QUESTIONS.filter((item) => item.year === meta.year)) {
        const entry = fin.explanations[String(q.qNumber)];
        expect(entry, `${round} ${q.qNumber}`).toBeDefined();
        expect(CATEGORIES).toContain(q.category);
        expect(q.category).toBe(entry.category);
        const notice = `\n\n※問題冊子が示す基準日（${meta.lawReferenceDateJa}）時点の法令・制度に基づく解説です。その後の改正に注意してください。`;
        expect(q.explanation).toBe(entry.summary + (entry.lawSensitive ? notice : ""));
        expect(q.explanationCoverage).toBe("full");
        expect(q.needsReview).toBe(false);
        expect(isPracticeReadyQuestion(q)).toBe(true);
        expect(Object.keys(q.choices ?? {})).toEqual(KEYS);
        expect(Object.keys(q.choiceExplanations ?? {})).toEqual(KEYS);
        KEYS.forEach((k, i) => {
          expect(q.choiceExplanations?.[k]).toBe(entry.choiceExplanations[i]);
          expect(q.choiceExplanations?.[k]?.length ?? 0).toBeGreaterThanOrEqual(20);
        });
        const log = fin.reviewLog.find((l) => l.number === q.qNumber)!;
        expect(log.history[0]?.[0]).toBe("draft");
        expect(log.history.some(([tag]) => tag.startsWith("review"))).toBe(true);
        expect(log.history.at(-1)?.[1]).not.toBe("FAIL");
      }
    }
  });

  it("receipt: 起稿(batchN.draft)はツールなし、査読(batchN.review)は WebFetch/WebSearch の claude-opus-5-5（firstParty）", () => {
    for (const round of ROUNDS) {
      const dir = path.join(report, "explanations", round);
      const files = readdirSync(dir);
      for (let b = 1; b <= 5; b++) {
        for (const [stage, tools] of [["draft", []], ["review", ["WebFetch", "WebSearch"]]] as const) {
          const file = `batch${b}.${stage}.receipt.json`;
          expect(files, file).toContain(file);
          const r = JSON.parse(readFileSync(path.join(dir, file), "utf8")) as Receipt;
          expect(r.requestedModel, file).toBe("claude-opus-5-5");
          expect(r.exitCode, file).toBe(0);
          expect(r.isError, file).toBe(false);
          expect(r.modelUsage["claude-opus-5-5"]?.provider, file).toBe("firstParty");
          expect(r.tools, file).toEqual(tools);
        }
      }
    }
  });
});
