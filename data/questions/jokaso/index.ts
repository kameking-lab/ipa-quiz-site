import type { ChoiceKey, Question } from "@/lib/questions/types";
import source2025 from "./2025.json";
import source2026 from "./2026.json";

const keys: ChoiceKey[] = ["ア", "イ", "ウ", "エ", "オ"];
interface SourceItem {
  number: number;
  session: string;
  pdfPage: number;
  question: string;
  choices: string[];
  officialAnswerNumber: number;
  explanation: string;
  choiceExplanations: string[];
  sourcePdfUrl: string;
  sourceAnswerUrl: string;
  imageUrl?: string;
  imageAltText?: string;
}
function convert(year: number, items: SourceItem[]): Question[] {
  if (items.length !== 80) throw new Error(`jokaso ${year}: expected 80 questions`);
  return items.map((item): Question => {
    if (item.choices.length !== 5 || item.choiceExplanations.length !== 5 || !keys[item.officialAnswerNumber - 1]) {
      throw new Error(`jokaso ${year} q${item.number}: invalid choices or answer`);
    }
    const legalNote = "法令・基準・統計に関する説明は出題時点の内容です。";
    return {
      id: `jokaso-${year}-annual-${item.session}-q${item.number}`,
      exam: "jokaso", session: item.number <= 40 ? "am" : "pm",
      year, season: "annual", qNumber: item.number, type: "multiple-choice",
      category: item.number <= 8 ? "浄化槽概論" : item.number <= 14 ? "浄化槽行政" : item.number <= 34 ? "浄化槽の構造及び機能" : item.number <= 40 ? "浄化槽工事概論" : item.number <= 68 ? "浄化槽の点検、調整及び修理" : item.number <= 78 ? "水質管理" : "浄化槽の清掃概論",
      topicTags: [item.number <= 40 ? "午前" : "午後"], difficulty: 3,
      question: item.question.replace(/\n/g, "  \n"),
      choices: Object.fromEntries(keys.map((key, i) => [key, item.choices[i]])),
      answer: keys[item.officialAnswerNumber - 1], officialAnswerNumber: String(item.officialAnswerNumber),
      explanation: `${item.explanation}\n\n${legalNote}`,
      choiceExplanations: Object.fromEntries(keys.map((key, i) => [key, item.choiceExplanations[i]])),
      explanationCoverage: "full", hasImage: Boolean(item.imageUrl),
      ...(item.imageUrl ? { imageUrls: [item.imageUrl], imageAltTexts: [item.imageAltText!] } : {}),
      sourcePdfUrl: `${item.sourcePdfUrl}#page=${item.pdfPage}`, sourceAnswerUrl: item.sourceAnswerUrl,
      sourceAttribution: `出典：公益財団法人日本環境整備教育センター 令和${year - 2018}年度浄化槽管理士試験 ${item.number <= 40 ? "午前" : "午後"} 問${item.number}。原本の数字選択肢をア〜オに対応付け、改行・空白・数式表記を整理。図示選択肢には原図に対応するテキストを補記。解説は過去問AIの独自作成。`,
      license: "JECES-owner-cleared", lastUpdated: "2026-11-03",
    };
  });
}
/** 公開前の全160問。公開レジストリは資格カタログの公開判定を通す。 */
export const JOKASO_CANDIDATES: Question[] = [
  ...convert(2026, source2026.questions), ...convert(2025, source2025.questions),
];
