import { createHash } from "node:crypto";
import { existsSync, readFileSync } from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";

import {
  KAIGO_2024_QUESTIONS,
  KAIGO_2025_QUESTIONS,
  KAIGO_INDEPENDENCE_NOTICE,
  KAIGO_QUESTIONS,
} from "@/data/questions/kaigo";
import { EXAM_CONFIGS } from "@/lib/exam-config";
import { findQuestionByRoute, questionPagePath } from "@/lib/seo/question-url";

const root = process.cwd();
const evidence = path.join(root, "reports/sssc-kaigo37-20260928");
const readJson = <T,>(file: string): T => JSON.parse(readFileSync(path.join(evidence, file), "utf8")) as T;
const transcription = readJson<{
  sourceFiles: Record<string, string>;
  questions: { number: number; subject: string; stem: string; choices: string[]; notes: string[]; case: string | null }[];
}>("official-transcription.json");
const keys = readJson<{ answerUrl: string; answerSha256: string; answers: Record<string, number[]> }>("official-answer-keys.json");
const receipt = readJson<{
  draftModel: string;
  reviewModel: string;
  questions: { number: number; draftStatus: string; reviewStatus: string; fixedChoices: string[] }[];
}>("review-receipt.json");
const data = JSON.parse(readFileSync(path.join(root, "data/questions/kaigo/2024-annual.json"), "utf8")) as {
  answerSha256: string;
  questionPdfs: Record<string, { url: string; sha256: string }>;
  questions: { number: number; pdfFile: string; questionImages?: { publicPath: string; sha256: string }[] }[];
};
const choices = ["ア", "イ", "ウ", "エ", "オ"] as const;

describe("第37回介護福祉士国家試験の公式照合", () => {
  it("第37回と第38回を各125問、計2回分収録する", () => {
    expect(EXAM_CONFIGS.kaigo.yearRange).toEqual({ start: 2024, end: 2025 });
    expect(KAIGO_2024_QUESTIONS.map((q) => q.qNumber)).toEqual(Array.from({ length: 125 }, (_, i) => i + 1));
    expect(KAIGO_2025_QUESTIONS).toHaveLength(125);
    expect(KAIGO_QUESTIONS).toHaveLength(250);
    expect(new Set(KAIGO_QUESTIONS.map((q) => q.id)).size).toBe(250);
  });

  it("公式合格基準・正答一覧の125問と照合し、全肢解説と独立性を保つ", () => {
    expect(data.answerSha256).toBe(keys.answerSha256);
    expect(keys.answerUrl).toBe("https://www.sssc.or.jp/kaigo/past_exam/pdf/no37/k_kijun_seitou.pdf");
    expect(Object.keys(keys.answers)).toHaveLength(125);
    for (const q of KAIGO_2024_QUESTIONS) {
      const answer = keys.answers[String(q.qNumber)]!;
      expect(answer).toHaveLength(1);
      expect(q.officialAnswerNumber, q.id).toBe(String(answer[0]));
      expect(q.answer, q.id).toBe(choices[answer[0]! - 1]);
      expect(q.explanationCoverage).toBe("full");
      expect(Object.keys(q.choiceExplanations ?? {}), q.id).toEqual([...choices]);
      expect(Object.values(q.choiceExplanations ?? {}).every((reason) => reason.trim().length >= 25), q.id).toBe(true);
      expect(q.sourceAttribution, q.id).toContain(KAIGO_INDEPENDENCE_NOTICE);
      expect(q.license).toBe("SSSC-reuse");
      const source = data.questions[q.qNumber - 1]!;
      expect(q.sourcePdfUrl).toBe(data.questionPdfs[source.pdfFile]?.url);
      expect(data.questionPdfs[source.pdfFile]?.sha256).toBe(transcription.sourceFiles[source.pdfFile]);
      const [, , exam, yearSeason, section, qnum] = questionPagePath(q).split("/");
      expect(findQuestionByRoute(KAIGO_QUESTIONS, { exam: exam!, yearSeason: yearSeason!, section: section!, qnum: qnum! })?.id).toBe(q.id);
    }
  });

  it("問題文と選択肢を公式読み上げ用HTMLの抽出記録と照合する", () => {
    expect(transcription.questions).toHaveLength(125);
    for (const source of transcription.questions) {
      const q = KAIGO_2024_QUESTIONS[source.number - 1]!;
      if (source.number !== 121) {
        const official = [source.case, source.stem, ...source.notes].filter(Boolean).join("\n");
        expect(q.question, q.id).toBe(official);
      } else {
        expect(q.question).toContain("以下のジェノグラムから");
        expect(q.question).not.toContain("息子と３人で暮らしている");
      }
      expect(Object.values(q.choices ?? {}), q.id).toEqual(source.choices);
      expect(q.category).toBe(source.subject);
    }
  });

  it("図表問121は公式PDFの系図を表示し、画像ハッシュを固定する", () => {
    const q = KAIGO_2024_QUESTIONS[120]!;
    const [figure] = data.questions[120]!.questionImages ?? [];
    expect(figure).toBeDefined();
    const file = path.join(root, "public", figure!.publicPath.slice(1));
    expect(existsSync(file)).toBe(true);
    expect(createHash("sha256").update(readFileSync(file)).digest("hex")).toBe(figure!.sha256);
    expect(q.hasImage).toBe(true);
    expect(q.imageUrls).toEqual([figure!.publicPath]);
    expect(q.sourceAttribution).toContain("公式問題PDF（33ページ）");
  });

  it("生成後に独立査読を全125問へ実施し、修正4問を反映する", () => {
    expect(receipt).toMatchObject({ draftModel: "gemini-3.8-flash", reviewModel: "gemini-3.8-flash" });
    expect(receipt.questions.map((q) => q.number)).toEqual(Array.from({ length: 125 }, (_, i) => i + 1));
    expect(receipt.questions.every((q) => q.draftStatus === "PASS" && ["PASS", "FIX"].includes(q.reviewStatus))).toBe(true);
    expect(receipt.questions.filter((q) => q.reviewStatus === "FIX").map((q) => q.number)).toEqual([39, 88, 99, 114]);
    expect(KAIGO_2024_QUESTIONS[87]!.choiceExplanations?.イ).toContain("下顎から外し");
    expect(KAIGO_2024_QUESTIONS[98]!.choiceExplanations?.ウ).toContain("耐熱性の芽胞");
  });
});
