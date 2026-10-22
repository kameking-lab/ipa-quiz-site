import manifest from "@/data/questions/pdl-reviewed-manifest.json";
import type { ChoiceKey, Question } from "./types";

// Scope is pinned to the individually screened sources and assets. A catalog
// entry alone never admits another qualification or a newly discovered image.
const reviewed = new Map(manifest.questions.map((row) => [row.id, row]));
const choiceKeys: readonly ChoiceKey[] = ["ア", "イ", "ウ", "エ", "オ", "カ"];

export function normalizePublicPdlQuestion(raw: unknown): Question {
  if (!raw || typeof raw !== "object") throw new Error("Invalid PDL question");
  const q = raw as Question;
  const receipt = reviewed.get(q.id);
  const source = q.sourcePresentation;
  const keys = Object.keys(q.choices ?? {});
  const imageUrls = q.imageUrls ?? [];
  if (!receipt || !["kanteishi", "kaikeishi"].includes(q.exam)
    || receipt.exam !== q.exam || q.needsReview !== false
    || receipt.license !== q.license
    || receipt.sourcePdfUrl !== q.sourcePdfUrl
    || receipt.sourceAnswerUrl !== q.sourceAnswerUrl
    || JSON.stringify(receipt.images) !== JSON.stringify(imageUrls)
    || q.hasImage !== (imageUrls.length > 0)
    || (imageUrls.length > 0 && q.imageAltTexts?.length !== imageUrls.length)
    || !q.originalContent?.body.trim() || !q.question?.trim()
    || !q.explanation?.trim() || !q.sourceAttribution?.trim()
    || !source?.documentTitle.trim() || !source.originalAuthor.trim()
    || source.processor !== "過去問AI" || source.processedParts.length < 3
    || source.licenseUrl !== "https://www.digital.go.jp/resources/open_data/public_data_license_v1.0"
    || source.termsUrl !== (q.exam === "kanteishi" ? "https://www.mlit.go.jp/link.html" : "https://www.fsa.go.jp/cpaaob/copyright.html")
    || keys.length < 5 || keys.length > 6
    || keys.some((key, i) => key !== choiceKeys[i]
      || !q.choices?.[key as ChoiceKey]?.trim()
      || !q.originalContent?.choices?.[key as ChoiceKey]?.trim()
      || !q.choiceExplanations?.[key as ChoiceKey]?.trim())
    || !keys.includes(String(q.answer))) {
    throw new Error(`Unreviewed PDL material: ${q.id ?? "unknown"}`);
  }
  if (q.id === "kanteishi-2025-gyosei-q19"
    && (q.answer !== "オ" || q.choiceFactTruth?.["エ"] !== null || !q.questionNotice?.includes("景観区域"))) {
    throw new Error("Missing original-wording notice for appraiser Q19");
  }
  return q;
}
