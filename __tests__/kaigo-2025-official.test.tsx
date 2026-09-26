import { createHash } from "node:crypto";
import { existsSync, readFileSync, readdirSync } from "node:fs";
import path from "node:path";
import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { QuestionBody } from "@/components/quiz/QuestionBody";
import { KAIGO_INDEPENDENCE_NOTICE, KAIGO_QUESTIONS } from "@/data/questions/kaigo";
import { EXAM_CONFIGS } from "@/lib/exam-config";
import { isExamPublished } from "@/lib/qualifications/catalog";
import { choiceDisplayLabel } from "@/lib/questions/display";
import { defaultPracticeSession } from "@/lib/questions/practice-session";
import { findQuestionByRoute, questionPagePath } from "@/lib/seo/question-url";
import { formatYearSeason } from "@/lib/utils";

const report = path.join(process.cwd(), "reports/sssc-welfare-20260926");
const readJson = <T,>(file: string): T => JSON.parse(readFileSync(path.join(report, file), "utf8")) as T;

type Transcribed = { number: number; subject: string; stem: string; choices: string[]; notes: string[]; case: string | null };
const transcription = readJson<{ sourceFiles: Record<string, string>; normalizations: { op: string }[]; questions: Transcribed[] }>("kaigo-source-transcription.json");
const keys = readJson<{ sourceFiles: { kaigo: { sha256: string } }; kaigo: Record<string, number[]> }>("answer-keys.json");
const sources = readJson<{ kaigo: { files: Record<string, { url: string; sha256: string }> } }>("sources.json");
const data = JSON.parse(readFileSync(path.join(process.cwd(), "data/questions/kaigo/2025-annual.json"), "utf8")) as {
  answerSha256: string;
  questions: { number: number; choiceImages?: { publicPath: string; sha256: string }[] }[];
};
const keysOf = ["ア", "イ", "ウ", "エ", "オ"] as const;

/** 公式の科目別出題数（合格基準・正答一覧の問題番号区分）。 */
const SUBJECT_RANGES: [string, number, number][] = [
  ["人間の尊厳と自立", 1, 2], ["介護の基本", 3, 12], ["社会の理解", 13, 24],
  ["人間関係とコミュニケーション", 25, 28], ["コミュニケーション技術", 29, 34], ["生活支援技術", 35, 60],
  ["こころとからだのしくみ", 61, 72], ["発達と老化の理解", 73, 80], ["認知症の理解", 81, 90],
  ["障害の理解", 91, 100], ["医療的ケア", 101, 105], ["介護過程", 106, 113], ["総合問題", 114, 125],
];

function composeOfficial(q: Transcribed): string {
  // 問題49は選択肢が図のみ。読み上げ用HTMLの「視覚素材問題です」の前置きはPDFに無いので除く。
  const stem = q.number === 49 ? q.stem.split("\n").slice(1).join("\n").trim() : q.stem;
  return [...(q.case ? [q.case] : []), stem, ...q.notes].join("\n");
}

describe("第38回介護福祉士国家試験・全125問の公式照合", () => {
  it("件数ゲート: 1〜125を欠落・重複なく、公式の科目区分どおりに公開する", () => {
    expect(isExamPublished("kaigo")).toBe(true);
    expect(EXAM_CONFIGS.kaigo.sessions[0]?.expectedQuestions).toBe(125);
    expect(KAIGO_QUESTIONS.map((q) => q.qNumber)).toEqual(Array.from({ length: 125 }, (_, i) => i + 1));
    for (const [subject, first, last] of SUBJECT_RANGES) {
      const numbers = KAIGO_QUESTIONS.filter((q) => q.category === subject).map((q) => q.qNumber);
      expect(numbers, subject).toEqual(Array.from({ length: last - first + 1 }, (_, i) => first + i));
    }
    expect(defaultPracticeSession("kaigo")).toBe("gakka");
    expect(formatYearSeason(2025, "annual")).toBe("令和7年度");
  });

  it("正答は公式「合格基準・正答一覧」PDFの抽出値と全問一致する", () => {
    expect(keys.sourceFiles.kaigo.sha256).toBe(sources.kaigo.files["k_kijun_seitou.pdf"]?.sha256);
    expect(data.answerSha256).toBe(keys.sourceFiles.kaigo.sha256);
    expect(Object.keys(keys.kaigo)).toHaveLength(125);
    for (const q of KAIGO_QUESTIONS) {
      const official = keys.kaigo[String(q.qNumber)];
      expect(official, q.id).toHaveLength(1);
      expect(q.officialAnswerNumber, q.id).toBe(String(official![0]));
      expect(q.answer, q.id).toBe(keysOf[official![0]! - 1]);
      expect(choiceDisplayLabel("kaigo", q.answer as (typeof keysOf)[number])).toBe(String(official![0]));
    }
  });

  it("問題文・選択肢は公式PDFテキストと一字一句同じ（OCR・言い換えなし）", () => {
    // 抽出はPDFテキストレイヤとセンター公式の読み上げ用HTMLを全文突合し、許容差は台帳に記録したものだけ。
    const allowed = new Set(["insert", "stem-continuation-in-dd", "pdf-paragraph-added"]);
    expect(transcription.normalizations.every((n) => allowed.has(n.op))).toBe(true);
    for (const [name, sha] of Object.entries(transcription.sourceFiles)) {
      expect(sources.kaigo.files[name]?.sha256, name).toBe(sha);
    }
    expect(transcription.questions).toHaveLength(125);
    for (const source of transcription.questions) {
      const q = KAIGO_QUESTIONS[source.number - 1]!;
      expect(q.question, q.id).toBe(composeOfficial(source));
      expect(Object.values(q.choices ?? {}), q.id).toEqual(source.choices);
      expect(q.category, q.id).toBe(source.subject);
      if (source.number !== 49) {
        // PDFの読点は「，」。読み上げ用HTMLの「、」が混入していないこと。
        expect([q.question, ...source.choices].join("").includes("、"), q.id).toBe(false);
      }
    }
  });

  it("ふりがなは「親文字｛よみ｝」で保持し、親文字は漢字列に限る", () => {
    let count = 0;
    for (const q of KAIGO_QUESTIONS) {
      for (const text of [q.question, ...Object.values(q.choices ?? {})]) {
        const opens = [...text.matchAll(/｛/g)].length;
        const valid = [...text.matchAll(/[㐀-鿿々]+｛[ぁ-ゖー]+｝/g)].length;
        expect(valid, q.id).toBe(opens);
        count += opens;
      }
    }
    expect(count).toBeGreaterThan(50);
    const { container } = render(<QuestionBody text={"水様から粥状｛じゅくじょう｝"} />);
    expect(container.querySelector("ruby")?.firstChild?.textContent).toBe("粥状");
    expect(container.querySelector("rt")?.textContent).toBe("じゅくじょう");
    expect(container.textContent).toContain("水様から");
  });

  it("全125問に5肢すべての独自解説と、センターと無関係である旨の表示がある", () => {
    for (const q of KAIGO_QUESTIONS) {
      expect(Object.keys(q.choiceExplanations ?? {}), q.id).toEqual([...keysOf]);
      expect(Object.values(q.choiceExplanations ?? {}).every((reason) => reason.trim().length >= 25), q.id).toBe(true);
      expect(q.explanation.trim().length, q.id).toBeGreaterThan(40);
      expect(q.explanationCoverage).toBe("full");
      expect(q.sourceAttribution, q.id).toContain("公益財団法人社会福祉振興・試験センター");
      expect(q.sourceAttribution, q.id).toContain("原文のまま");
      expect(q.sourceAttribution, q.id).toContain(KAIGO_INDEPENDENCE_NOTICE);
      expect(q.license).toBe("SSSC-reuse");
      expect(q.sourcePdfUrl.startsWith("https://www.sssc.or.jp/kaigo/past_exam/pdf/no38/"), q.id).toBe(true);
      expect(q.sourceAnswerUrl).toBe("https://www.sssc.or.jp/kaigo/past_exam/pdf/no38/k_kijun_seitou.pdf");
      const [, , exam, yearSeason, section, qnum] = questionPagePath(q).split("/");
      expect(findQuestionByRoute(KAIGO_QUESTIONS, { exam: exam!, yearSeason: yearSeason!, section: section!, qnum: qnum! })?.id).toBe(q.id);
    }
  });

  it("解説は claude-opus-5-5 の生成と独立査読の実応答receiptを持つ", () => {
    const dir = path.join(report, "explanations/kaigo");
    const receipts = readdirSync(dir).filter((f) => f.endsWith(".receipt.json"));
    expect(receipts).toHaveLength(12);
    for (const file of receipts) {
      const receipt = JSON.parse(readFileSync(path.join(dir, file), "utf8")) as {
        exitCode: number; isError: boolean; requestedModel: string; statuses: [number, string][];
        modelUsage: Record<string, { canonicalModel: string; provider: string }>;
      };
      expect(receipt.exitCode, file).toBe(0);
      expect(receipt.isError, file).toBe(false);
      expect(receipt.requestedModel).toBe("claude-opus-5-5");
      expect(Object.keys(receipt.modelUsage)).toEqual(["claude-opus-5-5"]);
      expect(receipt.modelUsage["claude-opus-5-5"]).toMatchObject({ canonicalModel: "claude-opus-5-5", provider: "firstParty" });
      if (file.includes(".draft.")) expect(receipt.statuses.every(([, status]) => status === "PASS"), file).toBe(true);
    }
    const reviewed = receipts.filter((f) => f.includes(".review.")).flatMap((file) =>
      (JSON.parse(readFileSync(path.join(dir, file), "utf8")) as { statuses: [number, string][] }).statuses.map(([n]) => n));
    expect(reviewed.sort((a, b) => a - b)).toEqual(Array.from({ length: 125 }, (_, i) => i + 1));
  });

  it("問題49の選択肢図は公式PDF 27ページから切り出し、ハッシュを固定する", () => {
    const q49 = KAIGO_QUESTIONS[48]!;
    const images = data.questions[48]!.choiceImages!;
    expect(images).toHaveLength(5);
    for (const [index, image] of images.entries()) {
      const file = path.join(process.cwd(), "public", image.publicPath.slice(1));
      expect(existsSync(file)).toBe(true);
      expect(createHash("sha256").update(readFileSync(file)).digest("hex")).toBe(image.sha256);
      expect(q49.choiceImageUrls?.[keysOf[index]!]).toBe(image.publicPath);
    }
    expect(q49.sourceAttribution).toContain("公式問題PDF（27ページ）から転載");
    expect(q49.question.startsWith("腹部の清拭の方法を図に示す。")).toBe(true);
  });
});
