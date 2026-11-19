import type { ChoiceKey, Question, Season, Session } from "@/lib/questions/types";
import source2022late from "./2022-late.json";
import source2023early from "./2023-early.json";
import source2023late from "./2023-late.json";
import source2024early from "./2024-early.json";
import source2024late from "./2024-late.json";
import source2025early from "./2025-early.json";
import source2025late from "./2025-late.json";
import source2026early from "./2026-early.json";

const keys: readonly ChoiceKey[] = ["ア", "イ", "ウ", "エ", "オ"];

/** 独自解説であることを各問題の出典欄に表示する。 */
export const HOIKUSHI_INDEPENDENCE_NOTICE = "解説は過去問AIの独自作成で、一般社団法人全国保育士養成協議会とは関係ありません。";

type HoikushiSourceQuestion = {
  number: number;
  question: string;
  choices: string[];
  officialAnswer: number[];
  requiredSelections?: number;
  allChoicesAccepted?: boolean;
  choiceExplanations: string[];
  imageUrls?: string[];
  imageAltTexts?: string[];
  topicTags: string[];
  lawSensitive: boolean;
  hold?: boolean;
  holdReason?: string | null;
  partialHold?: boolean;
  partialHoldReason?: string | null;
  reviewStatus: string;
};

type HoikushiSourceSubject = {
  subjectName: string;
  sourcePdfUrl: string;
  sourceAnswerUrl: string;
  questions: HoikushiSourceQuestion[];
};

type HoikushiSource = {
  year: number;
  season: Season;
  examLabel: string;
  lawReferenceDate: string;
  lastUpdated: string;
  subjects: Record<string, HoikushiSourceSubject>;
};

function toQuestion(item: HoikushiSourceQuestion, subjectSlug: string, subject: HoikushiSourceSubject, data: HoikushiSource): Question {
  const answerKeys = item.officialAnswer.map((n) => keys[n - 1]).filter((k): k is ChoiceKey => Boolean(k));
  if (item.choices.length < 2 || item.choiceExplanations.length !== item.choices.length || answerKeys.length === 0) {
    throw new Error(`Invalid hoikushi source record ${subjectSlug} 問${item.number}`);
  }
  const requiredSelections = item.requiredSelections && item.requiredSelections > 1 ? item.requiredSelections : undefined;
  const correctExplanations = answerKeys
    .map((key) => item.choiceExplanations[keys.indexOf(key)] ?? "")
    .filter(Boolean);
  const explanation = item.allChoicesAccepted
    ? "公式正答表に従い、受験者全員を正解とする設問です。"
    : correctExplanations.join(" ");
  const lawNotice = item.lawSensitive ? `\n※出題時点（${data.lawReferenceDate}）の法令・制度に基づく解説です。その後の改正等で結論が変わる場合があります。` : "";
  return {
    id: `hoikushi-${data.year}-${data.season}-${subjectSlug}-q${item.number}`,
    exam: "hoikushi",
    session: subjectSlug as Session,
    year: data.year,
    season: data.season,
    qNumber: item.number,
    subject: subject.subjectName,
    officialAnswerNumber: item.allChoicesAccepted ? "全" : item.officialAnswer.join(","),
    type: "multiple-choice",
    category: subject.subjectName,
    topicTags: item.topicTags,
    difficulty: 2,
    question: item.question,
    choices: Object.fromEntries(keys.map((key, index) => [key, item.choices[index]]).filter(([, v]) => v !== undefined)),
    answer: requiredSelections || item.allChoicesAccepted ? answerKeys : (answerKeys[0] ?? "ア"),
    requiredSelections,
    explanation: `${explanation}${lawNotice}`,
    choiceExplanations: Object.fromEntries(keys.map((key, index) => [key, item.choiceExplanations[index]]).filter(([, v]) => v !== undefined)),
    explanationCoverage: "full",
    hasImage: Boolean(item.imageUrls?.length),
    imageUrls: item.imageUrls,
    imageAltTexts: item.imageAltTexts,
    sourcePdfUrl: subject.sourcePdfUrl,
    sourceAnswerUrl: subject.sourceAnswerUrl,
    sourceAttribution: `出典：一般社団法人全国保育士養成協議会 ${data.examLabel} 筆記試験「${subject.subjectName}」問${item.number}。${HOIKUSHI_INDEPENDENCE_NOTICE}`,
    license: "HOYOKYO-attributed",
    lawReferenceDate: data.lawReferenceDate,
    lastUpdated: data.lastUpdated,
    needsReview: Boolean(item.partialHold) || item.reviewStatus !== "PASS",
  };
}

function buildRound(data: HoikushiSource): Question[] {
  const out: Question[] = [];
  for (const [subjectSlug, subject] of Object.entries(data.subjects)) {
    for (const item of subject.questions) {
      // HOLD questions (図・楽譜等に依存し忠実に再現できない設問) は出題プールに含めない。
      if (item.hold) continue;
      out.push(toQuestion(item, subjectSlug, subject, data));
    }
  }
  return out;
}

/** 令和8年度前期・地域限定保育士試験（筆記9科目）。 */
export const HOIKUSHI_2026_EARLY_QUESTIONS: Question[] = buildRound(source2026early as HoikushiSource);

export const HOIKUSHI_QUESTIONS: Question[] = [
  ...HOIKUSHI_2026_EARLY_QUESTIONS,
  ...buildRound(source2025late as HoikushiSource),
  ...buildRound(source2025early as HoikushiSource),
  ...buildRound(source2024late as HoikushiSource),
  ...buildRound(source2024early as HoikushiSource),
  ...buildRound(source2023late as HoikushiSource),
  ...buildRound(source2023early as HoikushiSource),
  ...buildRound(source2022late as HoikushiSource),
];
