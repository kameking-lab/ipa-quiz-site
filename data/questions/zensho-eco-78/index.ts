import type { ChoiceKey, Question } from "@/lib/questions/types";
import basic2025 from "./2025-basic.json";
import law2025 from "./2025-businesshouki.json";
import management2025 from "./2025-businessmane.json";
import marketing2025 from "./2025-marketing.json";
import shouhin2025 from "./2025-shouhin.json";

const organization = "公益財団法人全国商業高等学校協会";

interface Paper {
  sourcePdfUrl: string;
  passages: Record<string, string>;
  questions: Array<{
    id: string;
    qNumber: number;
    topicTags: string[];
    officialQuestionLabel: string;
    page: number;
    passageKey?: string;
    question: string;
    answer: string;
    explanation: string;
    choices?: Partial<Record<ChoiceKey, string>>;
    choiceExplanations: Partial<Record<ChoiceKey, string>>;
    modelAnswer?: string;
    imageUrls?: string[];
    imageAltTexts?: string[];
  }>;
}

function convert(paper: Paper, subject: string, passageKey: (item: Paper["questions"][number]) => string | undefined): Question[] {
  return paper.questions.map((item) => {
    const { page, passageKey: _, question, ...data } = item;
    const key = passageKey(item);
    const passage = key ? paper.passages[key] : undefined;
    if (key && !passage) throw new Error(`Missing 商業経済検定 passage ${key} for ${item.id}`);

    return {
      ...data,
      exam: "zensho-eco-78",
      session: "gakka",
      year: 2025,
      fiscalYear: 2025,
      season: "annual",
      examDate: "2026-02-01",
      subject,
      category: subject,
      difficulty: 2,
      type: item.modelAnswer ? "descriptive" : "multiple-choice",
      question: passage ? `${passage}\n\n${question}` : question,
      hasImage: Boolean(item.imageUrls?.length),
      sourcePdfUrl: paper.sourcePdfUrl,
      sourceAnswerUrl: paper.sourcePdfUrl,
      sourceAttribution: `出典：${organization} 第40回（令和7年度）商業経済検定試験 ${subject} ${item.officialQuestionLabel}（問題PDF ${page}ページ、模範解答17ページ）。解説は過去問AI独自作成。`,
      license: "ZENSHO-owner-authorized",
      explanationCoverage: "full",
      lastUpdated: "2026-11-19",
    };
  });
}

export const ZENSHO_ECO_78_QUESTIONS: Question[] = [
  ...convert(marketing2025, "マーケティング", (item) => String(item.page)),
  ...convert(basic2025, "ビジネス基礎", (item) => item.passageKey),
  ...convert(shouhin2025, "商品開発と流通", (item) => String(item.page)),
  ...convert(management2025, "ビジネス・マネジメント", (item) => String(item.page)),
  ...convert(law2025, "ビジネス法規", (item) => item.passageKey ?? String(item.page)),
];
