import manuscript from "@/data/qualification-staging/juishi/2025.json";

import type { ChoiceKey, Question, Session } from "@/lib/questions/types";


const CHOICES = [["1", "ア"], ["2", "イ"], ["3", "ウ"], ["4", "エ"], ["5", "オ"]] as const;

const CHOICE_KEYS: readonly ChoiceKey[] = CHOICES.map(([, key]) => key);

const SESSIONS: Record<string, Session> = { hissu: "required", a: "mondai-a", b: "mondai-b" };

import round76 from "@/data/qualification-staging/juishi/2024.json";


const sessions: Record<string, Session> = {
  hissu: "required",
  a: "mondai-a",
  b: "mondai-b",
};


const choiceKeys = ["ア", "イ", "ウ", "エ", "オ"] as const;


function choiceKey(number: number): ChoiceKey {
  const key = choiceKeys[number - 1];
  if (!key) throw new Error(`Invalid veterinary exam choice: ${number}`);
  return key;
}


function mapChoices(source: Record<string, string>): Partial<Record<ChoiceKey, string>> {
  return Object.fromEntries(Object.entries(source).map(([number, text]) => [choiceKey(Number(number)), text]));
}


export const JUISHI_QUESTIONS = manuscript.map((row): Question => {
  const accepted = row.acceptedAnswerNumbers.map((number) => CHOICE_KEYS[number - 1]);
  return {
    id: row.id,
    exam: "juishi",
    session: SESSIONS[row.section],
    year: row.year,
    season: "annual",
    examDate: row.examDate,
    qNumber: row.qNumber,
    type: "multiple-choice",
    category: row.category,
    topicTags: [],
    difficulty: 3,
    question: row.question,
    choices: Object.fromEntries(CHOICES.map(([number, key]) => [key, row.choices[number]])),
    answer: accepted.length === 1 ? accepted[0] : accepted,
    officialAnswerNumber: row.officialAnswerNumber,
    explanation: row.explanation,
    choiceExplanations: Object.fromEntries(CHOICES.map(([number, key]) => [key, row.choiceExplanations[number]])),
    explanationSections: Object.entries(row.statementExplanations).map(([label, value]) => ({ label, text: value })),
    hasImage: false,
    sourcePdfUrl: row.sourcePdfUrl,
    sourceAnswerUrl: row.sourceAnswerUrl,
    sourceAttribution: row.sourceAttribution,
    license: "MAFF-attributed",
    lastUpdated: row.lastUpdated,
  };
});
