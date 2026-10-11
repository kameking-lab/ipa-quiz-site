import type { Question } from "@/lib/questions/types";
import source from "./questions.json";

const STUDY_LABELS: Record<string, string> = {
  figure: "解答図",
  answerFigure: "解答図",
  description: "説明",
  cause: "原因",
  type: "誤差の種類",
  reason: "理由",
  correction: "訂正内容",
  curve: "曲率データ",
  distance1_5km: "1.5 kmの場合",
  distance20km: "20 kmの場合",
  route1: "路線1",
  route2: "路線2",
  heightP: "P点の標高",
  line1: "項目1",
  line2: "項目2",
  number: "番号",
  numbers: "番号",
  alongTrackSpacing: "飛行方向の計測間隔",
  maximumAboveGroundAltitude: "最大対地高度",
  location: "位置",
  processing: "処理",
  mark: "判定",
  calculatedM: "計算値（m）",
  measuredM: "測定値（m）",
  differenceM: "較差（m）",
  toleranceM: "許容値（m）",
};

/** Format study-only labels; source pages and the saved branch answers stay intact. */
function studyText(text: string, labelAnswers = false): string {
  const headings = text.replace(/^###\s+(.+)$/gm, "**$1**");
  return labelAnswers
    ? headings.replace(/\b([A-Za-z][A-Za-z0-9_]*)\s*[：:]\s*/g, (match, key: string) =>
      STUDY_LABELS[key] ? STUDY_LABELS[key] + "：" : match)
    : headings;
}

/** Validation candidates. Publication is controlled by the qualification catalog. */
export const SOKURYOSHI_QUESTIONS: Question[] = (source as Question[]).map(question =>
  question.session === "pm"
    ? {
      ...question,
      question: studyText(question.question),
      explanation: studyText(question.explanation),
      ...(question.modelAnswer ? { modelAnswer: studyText(question.modelAnswer, true) } : {}),
    }
    : question);
