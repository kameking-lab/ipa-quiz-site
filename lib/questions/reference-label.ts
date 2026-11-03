import type { Question } from "./types";

function documentUrl(url: string): string {
  return url.split("#")[0] ?? url;
}

/** Describe the document's role, without treating an answer key as a textbook. */
export function questionReferenceLabel(q: Pick<Question, "exam" | "sourcePdfUrl" | "sourceAnswerUrl">, url: string): string {
  const value = documentUrl(url);
  if (value === documentUrl(q.sourcePdfUrl)) {
    return q.sourceAnswerUrl && value === documentUrl(q.sourceAnswerUrl)
      ? "公式問題・正答（同じ資料）" : "公式問題冊子";
  }
  if (q.sourceAnswerUrl && value === documentUrl(q.sourceAnswerUrl)) return "公式正答表";
  if (q.exam === "chosashi") {
    if (/\/(?:001452470|001429852)\.pdf$/.test(value)) return "公式出題の趣旨（公式解答ではありません）";
    if (/\/(?:001450012|001450013|001450014|001427203|001427204|001427205)\.pdf$/.test(value)) return "公式答案用紙";
  }
  if (q.exam === "shika-ishi" && /(?:a|b|c|d)_02\.pdf$/.test(value)) return "公式別冊図版";
  if (new URL(value).hostname === "laws.e-gov.go.jp") return "法令原文（適用時点を確認）";
  return "参照資料（資料内の対象・年度を確認）";
}
