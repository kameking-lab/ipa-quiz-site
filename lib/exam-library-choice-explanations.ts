import type {
  ExamChoiceExplanation,
  ExamChoiceExplanationItem,
  ExamQuestion,
} from "@/lib/exam-library-model";

const SHA256_PATTERN = /^[a-f0-9]{64}$/u;
const MIN_SUMMARY_LENGTH = 20;
const MIN_REASON_LENGTH = 40;

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function substantiveString(value: unknown, minimum: number): value is string {
  return typeof value === "string" && value.trim().length >= minimum;
}

function containsEmbeddedLink(value: unknown): boolean {
  return typeof value === "string" && /https?:\/\/|\[[^\]]+\]\([^)]+\)|<a\b/iu.test(value);
}

/** 解説の根拠リンクはHTTPSの日本政府ドメインだけを受け付ける。 */
export function isGovernmentPrimarySourceUrl(value: unknown): value is string {
  if (typeof value !== "string" || value !== value.trim() || !/^https:\/\/[^/\\]/u.test(value)) return false;
  try {
    const url = new URL(value);
    return (
      url.protocol === "https:" &&
      !url.username &&
      !url.password &&
      !url.port &&
      url.hostname.endsWith(".go.jp")
    );
  } catch {
    return false;
  }
}

/**
 * 構造化解説を現行の問題原文・公式正答と照合する。
 * 不完全・古い・政府一次資料以外を含むデータは丸ごと不採用にする。
 */
export function parseExamChoiceExplanation(
  value: unknown,
  question: ExamQuestion,
  sourceHash: string,
): ExamChoiceExplanation | null {
  if (
    !isRecord(value) ||
    question.answerAuthority !== "official" ||
    question.choiceCount !== 5 ||
    question.correctChoice === null ||
    !Number.isInteger(question.correctChoice) ||
    question.correctChoice < 1 ||
    question.correctChoice > question.choiceCount ||
    !SHA256_PATTERN.test(sourceHash) ||
    value.sourceHash !== sourceHash ||
    value.correctChoice !== question.correctChoice ||
    !substantiveString(value.summary, MIN_SUMMARY_LENGTH) ||
    containsEmbeddedLink(value.summary) ||
    !Array.isArray(value.choices) ||
    value.choices.length !== question.choiceCount ||
    !Array.isArray(value.sources) ||
    value.sources.length === 0
  ) {
    return null;
  }

  const choices = value.choices.flatMap((item): ExamChoiceExplanationItem[] => {
    const verdict = isRecord(item) ? item.verdict : undefined;
    if (
      !isRecord(item) ||
      typeof item.number !== "number" ||
      !Number.isInteger(item.number) ||
      item.number < 1 ||
      item.number > question.choiceCount ||
      (verdict !== "correct" && verdict !== "incorrect") ||
      !substantiveString(item.reason, MIN_REASON_LENGTH) ||
      containsEmbeddedLink(item.reason)
    ) {
      return [];
    }
    return [{
      number: item.number,
      verdict,
      reason: item.reason.trim(),
    }];
  });
  if (
    choices.length !== question.choiceCount ||
    new Set(choices.map((choice) => choice.number)).size !== question.choiceCount
  ) {
    return null;
  }
  choices.sort((left, right) => left.number - right.number);
  if (
    choices.some((choice) =>
      choice.verdict !== (choice.number === question.correctChoice ? "correct" : "incorrect"))
  ) {
    return null;
  }

  const sources = value.sources.flatMap((item) => {
    if (
      !isRecord(item) ||
      !substantiveString(item.title, 1) ||
      !isGovernmentPrimarySourceUrl(item.url)
    ) {
      return [];
    }
    return [{ title: item.title.trim(), url: item.url }];
  });
  if (
    sources.length !== value.sources.length ||
    new Set(sources.map((source) => source.url)).size !== sources.length
  ) {
    return null;
  }

  return {
    sourceHash,
    correctChoice: question.correctChoice,
    summary: value.summary.trim(),
    choices,
    sources,
  };
}
