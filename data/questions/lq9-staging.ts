import type { ChoiceKey, Question } from "@/lib/questions/types";
export interface StagingSource {
  year: number; questionUrl: string; answerUrl: string;
  questions: { number: number; pdfPage: number; question: string; choices: string[];
    officialAnswerNumber: number; officialQuestionNumber?: number; subQuestion?: number;
    explanation: string; choiceExplanations: string[]; imageUrl?: string; imageAltText?: string; needsReview?: boolean; reviewReason?: string; officialReferenceUrls?: string[] }[];
}
const keys: ChoiceKey[] = ["ア", "イ", "ウ", "エ"];
export function convertLq9(source: StagingSource, exam: "shohi-sodan" | "reform-mgr"): Question[] {
  return source.questions.map(q => {
    if (q.choices.length !== q.choiceExplanations.length || q.choices.length < 2 || q.choices.length > 4 ||
        !Number.isInteger(q.officialAnswerNumber) || q.officialAnswerNumber < 1 || q.officialAnswerNumber > q.choices.length) {
      throw new Error(`Invalid ${exam} ${source.year} q${q.number}`);
    }
    const shohi = exam === "shohi-sodan";
    const originalLabel = shohi ? `大問${q.officialQuestionNumber} 小問${q.subQuestion}` : `問題${q.number}`;
    return {
      id: `${exam}-${source.year}-annual-gakka-q${q.number}`, exam, year: source.year,
      season: "annual", session: "gakka", qNumber: q.number, type: "multiple-choice",
      category: shohi ? "消費生活相談" : q.number <= 10 ? "計画・基礎知識" : q.number <= 20 ? "法規・規約・制度" : q.number <= 30 ? "マネジメント" : "住戸・設備のリフォーム",
      topicTags: [shohi ? "消費生活相談" : "マンションリフォーム"], difficulty: 2,
      question: q.question, choices: Object.fromEntries(q.choices.map((v,i) => [keys[i],v])),
      answer: keys[q.officialAnswerNumber-1], explanation: q.explanation,
      choiceExplanations: Object.fromEntries(q.choiceExplanations.map((v,i) => [keys[i],v])),
      explanationCoverage: "full", needsReview: q.needsReview, officialReferenceUrls: q.officialReferenceUrls, hasImage: Boolean(q.imageUrl),
      ...(q.imageUrl ? { imageUrls: [q.imageUrl], imageAltTexts: [q.imageAltText!] } : {}),
      sourcePdfUrl: source.questionUrl, sourceAnswerUrl: source.answerUrl,
      sourceAttribution: `出典：${shohi ? "独立行政法人国民生活センター 消費生活相談員資格試験" : "公益財団法人住宅リフォーム・紛争処理支援センター マンションリフォームマネジャー学科試験"} ${source.year}年度 ${originalLabel}（問題PDF ${q.pdfPage}ページ、正答PDF ${shohi ? source.year === 2025 ? 34 : 33 : 1}ページ）。改行・空白・ルビを整理。${shohi ? "○×・下線指摘・語句選択の公式ラベルは元データに保持し、画面の選択肢キーへ順番に対応。原文の下線を太字に変更。" : "選択肢１〜４をア〜エに対応。"}解説は当サイト独自作成。`,
      license: shohi ? "KOKUSEN-owner-authorized" : "CHORD-owner-authorized",
      questionNotice: `${q.reviewReason ? q.reviewReason + " " : ""}${source.year}年度の出題当時の制度・統計・法令に基づく問題です。原問：${originalLabel}。`,
      lawReferenceDate: `${source.year}-${shohi ? "05" : "04"}-01`,
      lastUpdated: "2026-11-04",
    };
  });
}
