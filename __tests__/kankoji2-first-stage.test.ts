import { createHash } from "node:crypto";
import { existsSync, readFileSync } from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";

import { KANKOJI2_2025_QUESTIONS, KANKOJI2_2026_QUESTIONS, KANKOJI2_QUESTIONS } from "@/data/questions/kankoji2";
import { getRegisteredExamCodes } from "@/lib/questions/get-questions";
import { isExamPublished } from "@/lib/qualifications/catalog";
import { findQuestionByRoute, questionPagePath } from "@/lib/seo/question-url";

const reportDir = path.join(process.cwd(), "reports/kankoji2-20260926");
const readJson = <T,>(name: string): T => JSON.parse(readFileSync(path.join(reportDir, name), "utf8")) as T;

type Ledger = {
  editions: Record<string, {
    questionSha256: string;
    answerSha256: string;
    accepted: number[];
    held: number[];
    receipts: Record<string, { rawSha256: string; range: [number, number] }>;
    reviewByQuestion: Record<string, string>;
    canonicalQuestionsSha256: string;
  }>;
};
const ledger = readJson<Ledger>("acceptance-ledger.json");
const figures = readJson<{ edition: string; number: number; publicPath: string; sha256: string; sourcePdfPage: number; clipRectPdfPoints: number[] }[]>("figures.json");

const EDITIONS = [
  { year: 2026, season: "early", questions: KANKOJI2_2026_QUESTIONS, file: "2026-early.json", questionSha: "7E473038142BDB7EFAFDE7089D7C74A3D66D51286D812E44F2261C9EFBAD29B3", answerSha: "08F1C3B49B4FB82CCA7262A71D1FF6CFBFC086825C98FEEDAA46740279660B32", figures: [8, 30] },
  { year: 2025, season: "late", questions: KANKOJI2_2025_QUESTIONS, file: "2025-late.json", questionSha: "E5101AFE8E76B244CA914EEA72BCADD409C1315556266891E644559F4757D14A", answerSha: "0599B25F1B4ED3460C70E51C77A803837357901A658916238BB93FC1D25E8AFE", figures: [3, 8, 30] },
] as const;

describe("2級管工事施工管理 第一次検定（令和8年度前期・令和7年度後期）", () => {
  it("公開済みの外部資格として登録される", () => {
    expect(isExamPublished("kankoji2")).toBe(true);
    expect(getRegisteredExamCodes()).toContain("kankoji2");
    expect(KANKOJI2_QUESTIONS).toHaveLength(104);
    expect(new Set(KANKOJI2_QUESTIONS.map((q) => q.id)).size).toBe(104);
  });

  for (const edition of EDITIONS) {
    describe(`${edition.year}-${edition.season}`, () => {
      const answers = readJson<Record<string, number[]>>(`answers-${edition.year}.json`);
      const extract = readJson<{ questionSha256: string; answerSha256: string }>(`extract-${edition.year}.json`);
      const record = ledger.editions[String(edition.year)]!;

      it("問番号1〜52を欠落・重複なく収録し、公式正答肢と一致する", () => {
        expect(extract.questionSha256).toBe(edition.questionSha);
        expect(extract.answerSha256).toBe(edition.answerSha);
        expect(record.questionSha256).toBe(edition.questionSha);
        expect(record.held).toEqual([]);
        expect(edition.questions.map((q) => q.qNumber)).toEqual(Array.from({ length: 52 }, (_, i) => i + 1));
        const keys = ["ア", "イ", "ウ", "エ"];
        for (const q of edition.questions) {
          const official = answers[String(q.qNumber)]!;
          const answerKeys = (Array.isArray(q.answer) ? q.answer : [q.answer]) as string[];
          expect(answerKeys).toEqual(official.map((n) => keys[n - 1]));
          expect(q.officialAnswerNumber).toBe(official.join("・"));
          expect(Object.keys(q.choices ?? {})).toEqual(keys);
          expect(Object.keys(q.choiceExplanations ?? {})).toEqual(keys);
          expect(Object.values(q.choiceExplanations ?? {}).every((reason) => reason.trim().length > 15)).toBe(true);
          expect(q.explanationCoverage).toBe("full");
          expect(q.sourcePdfUrl).toMatch(/^https:\/\/www\.jctc\.jp\/.+k_mondai/);
          expect(q.sourceAnswerUrl).toMatch(/^https:\/\/www\.jctc\.jp\/.+k_seitou\.pdf$/);
          expect(q.sourceAttribution).toContain("全国建設研修センター");
          expect(q.question + Object.values(q.choices ?? {}).join("")).not.toMatch(/\{\{sup:|穐|愛|◯\d/);
        }
      });

      it("No.49〜52 は二肢とも選ぶ形式として採点する", () => {
        for (const q of edition.questions) {
          if (q.qNumber >= 49) {
            expect(q.requiredSelections).toBe(2);
            expect(q.answer).toHaveLength(2);
            expect(q.category).toBe("施工管理法・基礎的な能力（必須）");
          } else {
            expect(q.requiredSelections).toBeUndefined();
          }
        }
      });

      it("公式図が必要な問に原本から切り出した図を載せ、バイト列を固定する", () => {
        for (const number of edition.figures) {
          const q = edition.questions[number - 1]!;
          const figure = figures.find((f) => f.edition === `${edition.year}-${edition.season}` && f.number === number)!;
          expect(q.hasImage).toBe(true);
          expect(q.imageUrls).toEqual([figure.publicPath]);
          expect(figure.clipRectPdfPoints).toHaveLength(4);
          const file = path.join(process.cwd(), "public", figure.publicPath.slice(1));
          expect(existsSync(file)).toBe(true);
          expect(createHash("sha256").update(readFileSync(file)).digest("hex")).toBe(figure.sha256);
        }
        expect(edition.questions.filter((q) => q.hasImage).map((q) => q.qNumber)).toEqual([...edition.figures]);
      });

      it("採用した解説はすべて実 claude-opus-5-5（firstParty）の PASS 査読に由来する", () => {
        const data = JSON.parse(readFileSync(path.join(process.cwd(), "data/questions/kankoji2", edition.file), "utf8")) as { questionSha256: string; answerSha256: string; questions: unknown[] };
        expect(data.questionSha256).toBe(edition.questionSha);
        expect(data.answerSha256).toBe(edition.answerSha);
        expect(createHash("sha256").update(JSON.stringify(data.questions)).digest("hex")).toBe(record.canonicalQuestionsSha256);
        for (const [tag, info] of Object.entries(record.receipts)) {
          const raw = readFileSync(path.join(reportDir, "evidence", `opus-${edition.year}-${tag}-raw.json`));
          expect(createHash("sha256").update(raw).digest("hex")).toBe(info.rawSha256);
          const parsed = JSON.parse(raw.toString("utf8")) as { is_error: boolean; modelUsage: Record<string, { canonicalModel: string; provider: string }> };
          expect(parsed.is_error).toBe(false);
          expect(Object.keys(parsed.modelUsage)).toEqual(["claude-opus-5-5"]);
          expect(parsed.modelUsage["claude-opus-5-5"]).toMatchObject({ canonicalModel: "claude-opus-5-5", provider: "firstParty" });
          const review = readJson<{ questions: { number: number; status: string }[] }>(`evidence/opus-${edition.year}-${tag}-explanations.json`);
          for (const q of review.questions) {
            if (record.reviewByQuestion[String(q.number)] === tag) expect(q.status).toBe("PASS");
          }
        }
        expect(Object.keys(record.reviewByQuestion)).toHaveLength(52);
      });

      it("問題ページのURLから同じ問題に戻れる", () => {
        for (const q of edition.questions) {
          const [, , exam, yearSeason, section, qnum] = questionPagePath(q).split("/");
          expect(findQuestionByRoute(KANKOJI2_QUESTIONS, { exam: exam!, yearSeason: yearSeason!, section: section!, qnum: qnum! })?.id).toBe(q.id);
        }
      });
    });
  }

  it("令和7年度後期No.16は実施機関の訂正どおり、イ・エのどちらを選んでも正解", () => {
    const q16 = KANKOJI2_2025_QUESTIONS[15]!;
    expect(q16.answer).toEqual(["イ", "エ"]);
    expect(q16.requiredSelections).toBeUndefined();
    expect(q16.explanation).toContain("訂正");
  });
});
