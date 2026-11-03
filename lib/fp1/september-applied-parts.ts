import { parseFp1AppliedExtension, type Fp1AppliedExtension } from "./applied-extension";

const officialSourceKeys = ["sourceQuestionUrl", "sourceAnswerUrl", "sourceIndexUrl", "sourceAnswerIndexUrl", "reuseConditionsUrl"] as const;

/**
 * September's finite source packets are owned independently. Merge their original
 * cases by official case number before applying the existing publication gate.
 * The owner of Q60 supplies the complete case 4 drawing and the owner of Q54-55
 * supplies the complete case 2. Questions and answer fields are never overwritten.
 */
export function parseFp1SeptemberAppliedParts(parts: readonly unknown[]): Fp1AppliedExtension {
  if (parts.length === 0) throw new Error("FP1 September applied parts are missing");
  const parsed = parts.map((part) => parseFp1AppliedExtension(part));
  for (const part of parsed) {
    if (part.edition !== "202609" || part.lawReferenceDate !== "2026-04-01") {
      throw new Error("FP1 September part has an unexpected edition or law date");
    }
    if (officialSourceKeys.some((key) => part[key] !== parsed[0]![key])) {
      throw new Error("FP1 September parts disagree on official sources");
    }
  }
  const questions = parsed.flatMap((part) => part.questions).sort((a, b) => a.number - b.number);
  if (new Set(questions.map((question) => question.number)).size !== questions.length) {
    throw new Error("FP1 September applied question overlap");
  }
  const caseNumbers = [...new Set(parsed.flatMap((part) => part.sharedCases.map((item) => item.number)))].sort((a, b) => a - b);
  const sharedCases = caseNumbers.map((number) => {
    const alternatives = parsed.flatMap((part) => part.sharedCases.filter((item) => item.number === number));
    // The Q54-55 part holds the full case 2; the Q56-60 part holds the full
    // case 4 diagram. For all other cases the unique original is selected.
    const preferredPart = number === 2
      ? parsed.find((part) => part.questions.some((question) => question.number === 55))
      : number === 4
        ? parsed.find((part) => part.questions.some((question) => question.number === 60))
        : undefined;
    const preferred = preferredPart?.sharedCases.find((item) => item.number === number);
    const chosen = preferred ?? alternatives[0]!;
    return {
      ...chosen,
      includedQuestionNumbers: [...new Set(alternatives.flatMap((item) => item.includedQuestionNumbers))].sort((a, b) => a - b),
    };
  });
  const first = parsed[0]!;
  return parseFp1AppliedExtension({
    ...first,
    sourceAttribution: "出典：一般社団法人金融財政事情研究会 ファイナンシャル・プランニング技能検定1級 学科試験 応用編（2026年9月13日）。",
    processingDisclosure: "原問の改行・空白を整形し、共通設例の表・図を構造化。公式正答を保持し、解説は独自制作。",
    sharedCases,
    questions,
  });
}
