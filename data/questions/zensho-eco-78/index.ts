import type { ChoiceKey, Question } from "@/lib/questions/types";
import basic2022 from "./2022-basic.json";
import businessA2022 from "./2022-business-a.json";
import businessB2022 from "./2022-business-b.json";
import law2022 from "./2022-keihou.json";
import marketing2022 from "./2022-marketing.json";
import basic2024 from "./2024-basic.json";
import law2024 from "./2024-businesshouki.json";
import management2024 from "./2024-businessmane.json";
import marketing2024 from "./2024-marketing.json";
import shouhin2024 from "./2024-shouhin.json";
import basic2025 from "./2025-basic.json";
import law2025 from "./2025-businesshouki.json";
import management2025 from "./2025-businessmane.json";
import marketing2025 from "./2025-marketing.json";
import shouhin2025 from "./2025-shouhin.json";

const organization = "公益財団法人全国商業高等学校協会";
const round40 = { year: 2025, date: "2026-02-01", label: "第40回（令和7年度）", answerPage: 17 };
const round39 = { year: 2024, date: "2025-02-02", label: "第39回（令和6年度）", answerPage: 17 };
const round37 = { year: 2022, date: "2023-02-05", label: "第37回（令和4年度）", answerPage: 18 };

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

function convert(
  paper: Paper,
  subject: string,
  passageKey: (item: Paper["questions"][number]) => string | undefined,
  round = round40,
): Question[] {
  return paper.questions.map((item) => {
    const { page, passageKey: _, question, ...data } = item;
    const key = passageKey(item);
    const passage = key ? paper.passages[key] : undefined;
    if (key && !passage) throw new Error(`Missing 商業経済検定 passage ${key} for ${item.id}`);

    return {
      ...data,
      exam: "zensho-eco-78",
      session: "gakka",
      year: round.year,
      fiscalYear: round.year,
      season: "annual",
      examDate: round.date,
      subject,
      category: subject,
      difficulty: 2,
      type: item.modelAnswer ? "descriptive" : "multiple-choice",
      question: passage ? `${passage}\n\n${question}` : question,
      hasImage: Boolean(item.imageUrls?.length),
      sourcePdfUrl: paper.sourcePdfUrl,
      sourceAnswerUrl: paper.sourcePdfUrl,
      sourceAttribution: `出典：${organization} ${round.label}商業経済検定試験 ${subject} ${item.officialQuestionLabel}（問題PDF ${page}ページ、模範解答${round.answerPage}ページ）。解説は過去問AI独自作成。`,
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
  ...convert(marketing2024, "マーケティング", (item) => String(item.page), round39),
  ...convert(basic2024, "ビジネス基礎", (item) => item.passageKey, round39),
  ...convert(shouhin2024, "商品開発と流通", (item) => String(item.page), round39),
  ...convert(management2024, "ビジネス・マネジメント", (item) => String(item.page), round39),
  ...convert(law2024, "ビジネス法規", (item) => item.passageKey ?? String(item.page), round39),
  ...convert(marketing2022, "マーケティング", (item) => String(item.page), round37),
  ...convert(basic2022, "ビジネス基礎", (item) => item.passageKey, round37),
  ...convert(businessA2022, "ビジネス経済A", (item) => String(item.page), round37),
  ...convert(businessB2022, "ビジネス経済B", (item) => String(item.page), round37),
  ...convert(law2022, "経済活動と法", (item) => item.passageKey, round37),
];
