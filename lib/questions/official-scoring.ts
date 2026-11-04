import { isAcceptedAnswer } from "./answers";
import type { Question } from "./types";

/** 正答肢なしの全員加点は、無回答も得点し、どの肢にも正答の意味を与えない。 */
export function officialScoringIssue(q: Question): string | undefined {
  if (!q.officialScoring) return undefined;
  if (q.officialScoring.kind !== "credit-for-all" || !q.officialScoring.reason.trim() ||
      q.type !== "multiple-choice" || q.officialAnswerNumber !== null ||
      !Array.isArray(q.answer) || q.answer.length !== 0 || q.requiredSelections !== undefined ||
      !q.sourceAnswerUrl || !q.sourceAttribution) {
    return "全員加点には正答番号null、空の正答肢、訂正理由、公式正答出典が必要";
  }
  return undefined;
}

/** 内部監査・採点用。通常の演習UIには全員加点問題をまだ配信しない。 */
export function evaluateOfficialScore(q: Question, selected: string | undefined) {
  const issue = officialScoringIssue(q);
  if (issue) throw new Error(issue);
  if (q.officialScoring?.kind === "credit-for-all") {
    return { awarded: true, correctChoice: false, label: "正答肢なし（全員加点）" };
  }
  const correct = isAcceptedAnswer(q.answer, selected);
  return { awarded: correct, correctChoice: correct, label: correct ? "正解" : "不正解" };
}
