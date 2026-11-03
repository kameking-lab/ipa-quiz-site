/** Cheap pre-admission guard for explicit new-question requests.
 * The system prompt also forbids invented questions for all free-form inputs;
 * this guard does not claim to classify every possible paraphrase.
 */
export function requestsNewQuestion(
  messages: readonly { role: string; content: string }[],
  quickAction?: string,
): boolean {
  if (quickAction === "similar") return true;
  const latest = [...messages].reverse().find((message) => message.role === "user")?.content ?? "";
  const japanese = /作問(?:して|しろ|してください|をお願い)/u.test(latest)
    || /(?:問題|類題|設問|クイズ|テスト)(?:を)?\s*(?:[0-9一二三数]+\s*問)?\s*(?:新しく)?(?:作って|作れ|作成して|作成しろ|作成してください|生成して|生成しろ|生成してください|出して|出題して|用意して)/u.test(latest)
    || /^(?:類題|練習問題|予想問題|模擬問題)(?:を)?(?:\s*[0-9一二三]+\s*問)?(?:ください|ちょうだい)?[。！!]?$/u.test(latest.trim());
  if (japanese || /(?:新しい問題|別の問題|類題|練習問題|予想問題|模擬問題)(?:を)?(?:[0-9一二三]+問)?考えて/u.test(latest)) return true;
  // Match the object being created, not an explanation/diagram of a question.
  // Negation applies to each request, never as a blanket exception for the text.
  const creation = /\b(?:generate|create|make|write|design|invent|give)\s+(?:(?:me|us|a|an|the|some|one|two|three|new|another|similar|practice|mock|original|sample|multiple-choice)\s+)*(?:questions?|quizzes|problems?|tests?)\b/gi;
  for (const match of latest.matchAll(creation)) {
    const prefix = latest.slice(0, match.index);
    if (/\b(?:not|never|without|avoid|don't)\s+(?:ever\s+)?$/i.test(prefix)) continue;
    return true;
  }
  return false;
}

export const ORIGINAL_QUESTION_ONLY_MESSAGE = "独自の問題・類題は作成しません。掲載済みの原問の問題文と選択肢をそのまま使い、根拠や解き方について質問してください。別の過去問は問題検索から選べます。";
