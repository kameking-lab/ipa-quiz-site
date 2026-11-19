import type { Question } from "@/lib/questions/types";
import marketing2025 from "./2025-marketing.json";

const organization = "公益財団法人全国商業高等学校協会";

export const ZENSHO_ECO_78_QUESTIONS: Question[] = marketing2025.questions.map((item) => {
  const { page, question, ...data } = item;
  const passage = marketing2025.passages[String(page) as keyof typeof marketing2025.passages];

  return {
    ...data,
    exam: "zensho-eco-78",
    session: "gakka",
    year: 2025,
    fiscalYear: 2025,
    season: "annual",
    examDate: "2026-02-01",
    subject: "マーケティング",
    category: "マーケティング",
    difficulty: 2,
    type: item.modelAnswer ? "descriptive" : "multiple-choice",
    question: `${passage}\n\n${question}`,
    hasImage: Boolean(item.imageUrls?.length),
    sourcePdfUrl: marketing2025.sourcePdfUrl,
    sourceAnswerUrl: marketing2025.sourcePdfUrl,
    sourceAttribution: `出典：${organization} 第40回（令和7年度）商業経済検定試験 マーケティング ${item.officialQuestionLabel}（問題PDF ${page}ページ、模範解答17ページ）。解説は過去問AI独自作成。`,
    license: "ZENSHO-owner-authorized",
    explanationCoverage: "full",
    lastUpdated: "2026-11-19",
  };
});
