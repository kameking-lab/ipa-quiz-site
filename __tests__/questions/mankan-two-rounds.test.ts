import { readFileSync, readdirSync } from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";

import { ALL_QUESTIONS } from "@/data/questions";
import { MANKAN_QUESTIONS } from "@/data/questions/mankan";
import { EXAM_CONFIGS } from "@/lib/exam-config";
import { getQualificationByExamCode } from "@/lib/qualifications/catalog";
import { choiceDisplayLabel } from "@/lib/questions/display";
import { isPracticeReadyQuestion } from "@/lib/questions/filter";
import type { ChoiceKey } from "@/lib/questions/types";

const report = path.join(process.cwd(), "reports/mankan-mansion-kanrishi-20260929");
const readJson = <T,>(file: string): T => JSON.parse(readFileSync(path.join(report, file), "utf8")) as T;

const KEYS: readonly ChoiceKey[] = ["ア", "イ", "ウ", "エ"];
const NUMBER_KEY: Record<string, ChoiceKey> = { "1": "ア", "2": "イ", "3": "ウ", "4": "エ" };
const ROUNDS = [
  { year: 2024, sourcePdfUrl: "https://www.mankan.org/pdf/R6_shiken.pdf", sourceAnswerUrl: "https://www.mankan.org/pdf/R6_answer.pdf", lawReferenceDate: "2024-04-01" },
  { year: 2025, sourcePdfUrl: "https://www.mankan.org/pdf/R7_shiken.pdf", sourceAnswerUrl: "https://www.mankan.org/pdf/R7_answer.pdf", lawReferenceDate: "2025-04-01" },
] as const;

const sources = readJson<{ R7: { year: number }; R6: { year: number } }>("sources.json");
const answerKeys = readJson<{ R7: { answers: Record<string, string> }; R6: { answers: Record<string, string> } }>("answer-keys.json");
const hold = readJson<{ qNumber: number; year: number; reason: string; officialAnswerNumber: string }[]>("hold.json");
const finalFor = (year: number) =>
  readJson<Record<string, { status: string; holdReason?: string; choiceStatus: Record<string, string>; fixedChoiceExplanations: Record<string, string>; evidence: { url: string; excerpt: string }[] }>>(
    `explanations/${year}-final.json`,
  );

describe("マンション管理士試験（令和6・7年度）", () => {
  it("件数: 各年度50問のうち査読PASS/FIXの問題だけを公開し、HOLDは理由付きで台帳に残す", () => {
    for (const round of ROUNDS) {
      const roundKey = round.year === 2025 ? "R7" : "R6";
      const heldNumbers = hold.filter((h) => h.year === round.year).map((h) => h.qNumber);
      const published = MANKAN_QUESTIONS.filter((q) => q.year === round.year);
      const fin = finalFor(round.year);
      expect(Object.keys(answerKeys[roundKey].answers)).toHaveLength(50);
      expect(published.map((q) => q.qNumber)).toEqual(
        Array.from({ length: 50 }, (_, i) => i + 1).filter((n) => !heldNumbers.includes(n)),
      );
      for (const h of hold.filter((x) => x.year === round.year)) {
        expect(h.reason.length, `${round.year} 問${h.qNumber}`).toBeGreaterThan(20);
        expect(fin[String(h.qNumber)]?.status, `${round.year} 問${h.qNumber} review status`).toBe("HOLD");
        expect(ALL_QUESTIONS.some((q) => q.exam === "mankan" && q.year === round.year && q.qNumber === h.qNumber)).toBe(false);
      }
    }
    // 令和6年度は問40のみ保留、令和7年度は保留なし
    expect(hold.map((h) => `${h.year}-${h.qNumber}`)).toEqual(["2024-40"]);
    expect(MANKAN_QUESTIONS).toHaveLength(99);
    expect(new Set(MANKAN_QUESTIONS.map((q) => q.id)).size).toBe(MANKAN_QUESTIONS.length);
    expect(EXAM_CONFIGS.mankan.yearRange).toEqual({ start: 2024, end: 2025 });
    expect(getQualificationByExamCode("mankan")?.status).toBe("live");
  });

  it("正答: 公式正答PDFの表（answer-keys.json）と全問一致し、1問1正答", () => {
    for (const round of ROUNDS) {
      const roundKey = round.year === 2025 ? "R7" : "R6";
      for (const q of MANKAN_QUESTIONS.filter((item) => item.year === round.year)) {
        const official = answerKeys[roundKey].answers[String(q.qNumber)];
        expect(official, `${round.year} 問${q.qNumber}`).toBeDefined();
        expect(q.officialAnswerNumber).toBe(official);
        expect(q.answer).toBe(NUMBER_KEY[official!]);
        expect(q.requiredSelections).toBeUndefined();
      }
    }
  });

  it("出典・法令基準日を各問に持ち、独自解説でマンション管理センターと無関係である旨を試験トップに表示する", () => {
    for (const round of ROUNDS) {
      for (const q of MANKAN_QUESTIONS.filter((item) => item.year === round.year)) {
        expect(q.sourcePdfUrl).toBe(round.sourcePdfUrl);
        expect(q.sourceAnswerUrl).toBe(round.sourceAnswerUrl);
        expect(q.sourceAttribution).toContain(`問${q.qNumber}`);
        expect(q.sourceAttribution).toContain("公益財団法人マンション管理センター");
        expect(q.license).toBe("MANKAN-attributed");
        expect(q.lawReferenceDate).toBe(round.lawReferenceDate);
        expect(q.season).toBe("annual");
        expect(q.session).toBe("gakka");
        expect(q.hasImage).toBe(false);
      }
    }
    expect(choiceDisplayLabel("mankan", "ア")).toBe("1");
    expect(choiceDisplayLabel("mankan", "エ")).toBe("4");
  });

  it("解説: 公開問題は全4肢に25字以上の解説があり、査読PASS/FIXの結果と一致する", () => {
    for (const round of ROUNDS) {
      const fin = finalFor(round.year);
      for (const q of MANKAN_QUESTIONS.filter((item) => item.year === round.year)) {
        const entry = fin[String(q.qNumber)];
        expect(entry, `${round.year} 問${q.qNumber}`).toBeDefined();
        expect(["PASS", "FIX"]).toContain(entry.status);
        expect(q.explanationCoverage).toBe("full");
        expect(q.needsReview).toBe(false);
        expect(isPracticeReadyQuestion(q)).toBe(true);
        expect(Object.keys(q.choices ?? {})).toEqual(KEYS);
        expect(Object.keys(q.choiceExplanations ?? {})).toEqual(KEYS);
        for (const k of KEYS) {
          expect(q.choiceExplanations?.[k]?.length ?? 0, `${round.year} 問${q.qNumber} ${k}`).toBeGreaterThanOrEqual(20);
          // FIXで修正された選択肢は、査読の修正文と一致する
          if (entry.fixedChoiceExplanations[k]) {
            expect(q.choiceExplanations?.[k]).toBe(entry.fixedChoiceExplanations[k]);
          }
        }
        // 各問、少なくとも1件の一次資料の抜粋（excerpt）付き証跡を持つ
        expect(entry.evidence.some((e) => e.excerpt && e.excerpt.length >= 15), `${round.year} 問${q.qNumber} evidence`).toBe(true);
      }
    }
  });

  it("receipt: 起稿(claude CLI, ツールなし)と査読(claude CLI, WebFetch/WebSearch)は claude-opus-5-5・firstParty で実行され、査読は実際にツールを呼んでいる", () => {
    const receiptDir = path.join(report, "receipts");
    const files = readdirSync(receiptDir);
    const draftFiles = files.filter((f) => f.endsWith(".draft.receipt.json"));
    const reviewFiles = files.filter((f) => f.endsWith(".review.receipt.json"));
    expect(draftFiles).toHaveLength(4);
    expect(reviewFiles).toHaveLength(12);

    type Receipt = {
      is_error: boolean;
      subtype: string;
      modelUsage: Record<string, { provider: string }>;
      _exitCode: number;
      _requestedModel: string;
      _toolsAllowed: string[];
    };

    for (const file of draftFiles) {
      const r = JSON.parse(readFileSync(path.join(receiptDir, file), "utf8")) as Receipt;
      expect(r._requestedModel, file).toBe("claude-opus-5-5");
      expect(r._exitCode, file).toBe(0);
      expect(r.is_error, file).toBe(false);
      expect(r.subtype, file).toBe("success");
      expect(r.modelUsage["claude-opus-5-5"]?.provider, file).toBe("firstParty");
      // 起稿はツールなし: haiku サブコールが無い（WebFetch要約は使われていない）
      expect(Object.keys(r.modelUsage), file).toEqual(["claude-opus-5-5"]);
      expect(r._toolsAllowed, file).toEqual([]);
    }
    for (const file of reviewFiles) {
      const r = JSON.parse(readFileSync(path.join(receiptDir, file), "utf8")) as Receipt;
      expect(r._requestedModel, file).toBe("claude-opus-5-5");
      expect(r._exitCode, file).toBe(0);
      expect(r.is_error, file).toBe(false);
      expect(r.modelUsage["claude-opus-5-5"]?.provider, file).toBe("firstParty");
      expect(r._toolsAllowed, file).toEqual(["WebFetch", "WebSearch"]);
      // 査読は実際に WebFetch を呼んでいる: haiku サブコール（WebFetch要約）の存在で確認する
      const haikuKey = Object.keys(r.modelUsage).find((k) => k.includes("haiku"));
      expect(haikuKey, `${file} should show a haiku sub-call proving WebFetch actually ran`).toBeDefined();
    }
  });

  it("sources: 公式PDFのSHA-256を記録している", () => {
    expect(sources.R7.year).toBe(2025);
    expect(sources.R6.year).toBe(2024);
  });
});
