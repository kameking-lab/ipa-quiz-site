import { readFileSync } from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";

import { ALL_QUESTIONS } from "@/data/questions";
import { SHAKAI_2024_WITHHELD, SHAKAI_QUESTIONS } from "@/data/questions/shakai";
import { SSSC_INDEPENDENCE_NOTICE } from "@/data/questions/sssc-welfare";
import { isCompleteSelectionCorrect, requiredSelectionCount } from "@/lib/questions/answers";
import type { ChoiceKey } from "@/lib/questions/types";
import { getQuestionCanonicalRepresentative } from "@/lib/seo/question-canonical";
import { findQuestionByRoute, questionPagePath } from "@/lib/seo/question-url";

const report = path.join(process.cwd(), "reports/sssc-shakai37-20260928");
const readJson = <T,>(name: string): T => JSON.parse(readFileSync(path.join(report, name), "utf8")) as T;
type SourceQuestion = { number: number; subject: string; stem: string; choices: string[]; notes: string[]; case: string | null; pdfFile: string };
type Source = { exam: string; sourceFiles: Record<string, string>; questions: SourceQuestion[] };
type Explanations = {
  reviewStatus: string;
  questions: Record<string, { summary: string; choiceExplanations: string[]; lawSensitive: boolean }>;
};

const KEYS: readonly ChoiceKey[] = ["ア", "イ", "ウ", "エ", "オ"];
const range = (from: number, to: number) => Array.from({ length: to - from + 1 }, (_, i) => from + i);
const compose = (q: SourceQuestion) => [...(q.case ? [q.case] : []), q.stem, ...q.notes].join("\n");
const HELD_KYOTSU = [4, 69, 76];

describe("第37回（令和6年度）社会福祉士国家試験", () => {
  const source = readJson<Source>("source-transcription.json");
  const keys = readJson<{ sourceFile: { sha256: string }; answers: Record<string, number[]> }>("answer-keys.json");
  const manifest = readJson<{ files: Record<string, { url: string; sha256: string }>; examDate: string }>("sources.json");
  const explanations = readJson<Explanations>("explanations-senmon.json");
  const shakai2024 = SHAKAI_QUESTIONS.filter((q) => q.year === 2024);
  const byNumber = new Map(source.questions.map((q) => [q.number, q]));

  it("共通科目81問（保留3問を除く）と専門科目45問を公開し、第38回129問と並ぶ", () => {
    expect(shakai2024.filter((q) => q.session === "kyotsu").map((q) => q.qNumber)).toEqual(range(1, 84).filter((n) => !HELD_KYOTSU.includes(n)));
    expect(shakai2024.filter((q) => q.session === "senmon").map((q) => q.qNumber)).toEqual(range(85, 129));
    expect(SHAKAI_QUESTIONS.filter((q) => q.year === 2025)).toHaveLength(129);
    expect(new Set(SHAKAI_QUESTIONS.map((q) => q.id)).size).toBe(SHAKAI_QUESTIONS.length);
    expect(SHAKAI_2024_WITHHELD.map((w) => w.number)).toEqual(HELD_KYOTSU);
    for (const n of HELD_KYOTSU) expect(ALL_QUESTIONS.some((q) => q.id === `shakai-2024-annual-kyotsu-q${n}`)).toBe(false);
    expect(shakai2024.every((q) => q.examDate === manifest.examDate && q.season === "annual")).toBe(true);
  });

  it("問題文・選択肢は文字照合済みの転記と一字一句同じ", () => {
    for (const q of shakai2024) {
      const s = byNumber.get(q.qNumber)!;
      expect(q.question, q.id).toBe(compose(s));
      expect(Object.values(q.choices ?? {}), q.id).toEqual(s.choices);
      expect(q.category, q.id).toBe(s.subject);
      expect(q.sourcePdfUrl, q.id).toBe(manifest.files[s.pdfFile]?.url);
    }
  });

  it("正答は公式「合格基準及び正答」PDFの129問と一致する", () => {
    expect(keys.sourceFile.sha256).toBe(manifest.files["s_kijun_seitou.pdf"]?.sha256);
    for (const q of shakai2024) {
      const answer = keys.answers[String(q.qNumber)]!;
      expect(q.officialAnswerNumber, q.id).toBe(answer.join(","));
      expect(requiredSelectionCount(q), q.id).toBe(answer.length);
      expect(isCompleteSelectionCorrect(q.answer, answer.map((n) => KEYS[n - 1]!)), q.id).toBe(true);
      expect(q.sourceAnswerUrl, q.id).toBe("https://www.sssc.or.jp/shakai/past_exam/pdf/no37/s_kijun_seitou.pdf");
    }
  });

  it("専門科目45問は独立査読を通った独自解説で、正答肢だけが「正しい。」で始まる", () => {
    expect(explanations.reviewStatus).toMatch(/^INDEPENDENT_REVIEW_PASS/);
    for (const q of shakai2024.filter((item) => item.session === "senmon")) {
      const expl = explanations.questions[String(q.qNumber)]!;
      const answer = keys.answers[String(q.qNumber)]!;
      expect(Object.values(q.choiceExplanations ?? {}), q.id).toEqual(expl.choiceExplanations);
      expl.choiceExplanations.forEach((text, i) => {
        expect(text.startsWith(answer.includes(i + 1) ? "正しい。" : "誤り。"), `${q.id}/${i + 1}`).toBe(true);
        expect(text.trim().length, `${q.id}/${i + 1}`).toBeGreaterThanOrEqual(25);
      });
      expect(q.explanation.startsWith(expl.summary), q.id).toBe(true);
      expect(q.explanation.includes("※出題時点（令和7年2月）の制度に基づく解説です。"), q.id).toBe(expl.lawSensitive);
    }
  });

  it("出典表記・URL・正規URLが年度ごとに一意に決まる", () => {
    for (const q of shakai2024) {
      expect(q.sourceAttribution, q.id).toBe(
        `出典：公益財団法人社会福祉振興・試験センター 第37回（令和6年度）社会福祉士国家試験 ${q.session === "senmon" ? "専門科目" : "共通科目"} 問題${q.qNumber}。${SSSC_INDEPENDENCE_NOTICE}`,
      );
      const [, , exam, yearSeason, section, qnum] = questionPagePath(q).split("/");
      expect(yearSeason, q.id).toBe("2024-annual");
      expect(findQuestionByRoute(SHAKAI_QUESTIONS, { exam: exam!, yearSeason: yearSeason!, section: section!, qnum: qnum! })?.id, q.id).toBe(q.id);
      expect(getQuestionCanonicalRepresentative(ALL_QUESTIONS, q).id, q.id).toBe(q.id);
    }
  });
});
