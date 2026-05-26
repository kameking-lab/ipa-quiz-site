import type { ChoiceKey, Question } from "@/lib/questions/types";

const CHOICE_KEYS = "アイウエオカキクコ";

/**
 * High-confidence "the explanation disputes the official answer" detector.
 *
 * Phase 11 / F-1: AP 2025春 問1's explanation said
 * 「問題の指示によりエが正解とされていますが…真とはなりません」, openly
 * contradicting its own acceptedAnswer. These hedging phrases admit the
 * official key and then argue against it — a trust-destroying conflict.
 *
 * Kept deliberately narrow (low false-positive) so it can gate content in
 * validate:questions / CI without blocking legitimate explanations.
 */
// Only "admits the official answer, then argues against it" phrasings. A
// broader "(一般的に)…(誤りです)" rule was tried and rejected: it fired on
// perfectly normal MC explanations that say "choice X is 誤り" (6/8 of the
// initial hits were such false positives, e.g. ip-2016a-am-q60). Keeping the
// gate narrow is the point — it must not block legitimate content in CI.
const DISPUTE_PATTERNS: RegExp[] = [
  /正解とされて(い|お)ますが/,
  /正解とされるが/,
  /正答とされて(い|お)ますが/,
  /(問題文|正解)(の|が)(どちらかに|いずれかに)?誤りがある/,
];

export function detectAnswerDispute(q: Question): string | null {
  const text = q.explanation ?? "";
  for (const re of DISPUTE_PATTERNS) {
    if (re.test(text)) return `explanation disputes the official answer (matched /${re.source}/)`;
  }
  return null;
}

/**
 * Advisory detector: the explanation asserts a *specific* correct choice that
 * differs from `answer`. Higher false-positive rate (an explanation may quote
 * another choice in passing), so this is report-only — never a CI gate.
 */
export function detectStatedAnswerMismatch(q: Question): string | null {
  const text = q.explanation ?? "";
  const answerKey = Array.isArray(q.answer) ? q.answer[0] : q.answer;
  if (typeof answerKey !== "string" || !CHOICE_KEYS.includes(answerKey)) return null;

  const re = new RegExp(`(?:正解|正答|答え)は[「『]?([${CHOICE_KEYS}])`);
  const m = re.exec(text);
  if (m && m[1] !== answerKey) {
    return `explanation states 正解は${m[1]} but answer key is ${answerKey as ChoiceKey}`;
  }
  return null;
}

export interface ConsistencyFinding {
  id: string;
  kind: "dispute" | "stated-mismatch";
  reason: string;
}

/** Run both detectors over one question. */
export function checkExplanationConsistency(q: Question): ConsistencyFinding[] {
  const out: ConsistencyFinding[] = [];
  const dispute = detectAnswerDispute(q);
  if (dispute) out.push({ id: q.id, kind: "dispute", reason: dispute });
  const mismatch = detectStatedAnswerMismatch(q);
  if (mismatch) out.push({ id: q.id, kind: "stated-mismatch", reason: mismatch });
  return out;
}
