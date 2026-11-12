import { describe, expect, it } from "vitest";
import { SHASHIN2_QUESTIONS as questions } from "@/data/questions/shashin2";
import sources from "@/data/questions/shashin2/sources.json";
import { QUESTIONS_BY_EXAM } from "@/data/questions";
import { getQuestionsForExam } from "@/lib/questions/get-questions";
import { EXAM_CONFIGS } from "@/lib/exam-config";
import { choiceDisplayLabel, formatQuestionAnswerForDisplay, questionNumberLabel, usesNumberedChoices } from "@/lib/questions/display";
import { questionSourceEdition } from "@/lib/questions/source-label";
import { getQualificationByExamCode } from "@/lib/qualifications/catalog";
import { isPracticeReadyQuestion } from "@/lib/questions/filter";
import { findQuestionByRoute, questionPagePath } from "@/lib/seo/question-url";
import { buildQuestionJsonLd } from "@/lib/seo/question-jsonld";
import { countByExam, examMetaDescription } from "@/lib/seo/exam-meta";

const exam = "shashin2";
// 公式正答表の5問単位の各欄を、収録データとは別に転記。
const officialA = ["○××○○", "○×○○×", "○×○○×", "×○××○", "○○×○○"].join("").split("");
const officialB = ["ハロニハニ", "ニロイイロ", "ニハニニロ", "ハハイイロ", "ロハハニニ"].join("").split("");
const mapping: Record<string, string> = { イ: "ア", ロ: "イ", ハ: "ウ", ニ: "エ" };

describe("写真技能士2級（肖像写真デジタル作業）2025年度前期", () => {
  it("公式正答50件とA/B群の原本番号・選択順を保持する", () => {
    expect(questions).toHaveLength(50);
    expect(new Set(questions.map(q => q.id)).size).toBe(50);
    expect(sources.officialAnswers).toEqual({ A: officialA, B: officialB });
    questions.forEach((q, i) => {
      const a = i < 25;
      const n = i % 25 + 1;
      const official = (a ? officialA : officialB)[n - 1];
      const page = a ? (n <= 17 ? 2 : 3) : n <= 6 ? 4 : n <= 12 ? 5 : n <= 18 ? 6 : n <= 24 ? 7 : 8;
      expect(q.id).toBe(`${exam}-2025-early-gakka-${a ? "a" : "b"}-${String(n).padStart(3, "0")}`);
      expect(q.qNumber).toBe(i + 1);
      expect(q.officialAnswerNumber).toBe(official);
      expect(q.answer).toBe(a ? (official === "○" ? "ア" : "イ") : mapping[official]);
      expect(Object.keys(q.choices ?? {})).toEqual(a ? ["ア", "イ"] : ["ア", "イ", "ウ", "エ"]);
      expect(Object.keys(q.choiceExplanations ?? {})).toEqual(Object.keys(q.choices ?? {}));
      expect(q.explanationCoverage).toBe("full");
      expect(q.sourcePdfUrl).toBe(`${sources.sourcePdfUrl}#page=${page}`);
      expect(q.sourceAnswerUrl).toBe(sources.sourceAnswerUrl);
      expect(questionNumberLabel(q)).toBe(`${a ? "A" : "B"}群 ${n}`);
      expect(formatQuestionAnswerForDisplay(q, q.answer)).toBe(official);
      expect(questionSourceEdition(q)).toBe("2025年度前期");
    });
    expect(questions.reduce((n, q) => n + Object.keys(q.choiceExplanations ?? {}).length, 0)).toBe(150);
  });

  it("原文の指数・否定条件・照明比と英文選択肢を補正せず保持する", () => {
    expect(questions[1].question).toContain("10⁻⁶m");
    expect(questions[1].officialAnswerNumber).toBe("×");
    expect(questions[13].question).toContain("ガイドナンバー55");
    expect(questions[26].question).toContain("誤っている");
    expect(questions[36].question).toContain("5：1");
    expect(questions[36].choices?.ウ).toBe("2絞り");
    expect(questions[38].question).toContain("45°");
    expect(questions[38].choices?.エ).toBe("1：5");
    expect(questions[42].choices?.ア).toBe("Joint Photographic Experts Group");
    expect(questions[42].choices?.エ).toBe("Jointed Point Expand Genuin");
    expect(questions[44].question).toContain("適切でない");
    expect(sources.audit).toHaveLength(50);
    expect(questions.every(q => !q.hasImage)).toBe(true);
  });

  it("資格一覧・同期/遅延読込・分野・原本表記へ接続する", async () => {
    expect(await getQuestionsForExam(exam)).toEqual(questions);
    expect(QUESTIONS_BY_EXAM[exam]).toEqual(questions);
    expect(questions.filter(isPracticeReadyQuestion)).toHaveLength(50);
    expect(getQualificationByExamCode(exam)?.status).toBe("live");
    expect(getQualificationByExamCode(exam)?.fullName).toContain("肖像写真デジタル作業");
    expect(EXAM_CONFIGS[exam].sessions[0].expectedQuestions).toBe(50);
    expect(questions.every(q => EXAM_CONFIGS[exam].sessions[0].categories?.includes(q.category))).toBe(true);
    expect(usesNumberedChoices(exam)).toBe(true);
    expect(["ア", "イ", "ウ", "エ"].map(k => choiceDisplayLabel(exam, k as "ア"))).toEqual(["イ", "ロ", "ハ", "ニ"]);
  });

  it("個別URL50件を解決し、件数と出題者をSEO情報へ反映する", () => {
    expect(countByExam(exam)).toBe(50);
    expect(examMetaDescription(exam, 50)).toContain("50問・1回分・7分野");
    expect(new Set(questions.map(questionPagePath)).size).toBe(50);
    for (const q of questions) {
      expect(findQuestionByRoute(questions, { exam, yearSeason: "2025-early", section: "gakka", qnum: `q${q.qNumber}` })).toBe(q);
    }
    const q = questions[31]; // B群7：標準レンズはロ（内部キーはイ）。
    const resource = buildQuestionJsonLd({
      question: q,
      pageUrlAbs: `https://www.kakomon-ai.jp${questionPagePath(q)}`,
      title: "写真技能士2級 B群7",
      lastUpdatedISO: q.lastUpdated,
    })["@graph"][0];
    expect(resource).toMatchObject({
      creator: { name: "中央職業能力開発協会" },
      hasPart: { acceptedAnswer: { text: "ロ: 50" } },
    });
  });
});
