import type { Question } from "@/lib/questions/types";

/**
 * Batch4 public projection of reviewed staging records.
 * Editorial-only fields (review state, hashes, transcription notes, raw labels)
 * stay in data/qualification-staging and never reach the public payload.
 */
const STAGING_ONLY_FIELDS = new Set([
  "publicAllowed", "publicationStatus", "needsReview", "explanationConfidence", "explanationNotes",
  "explanationAuthorship", "sourceTextSha256", "sourcePages", "sourcePage", "transcriptionNote",
  "officialPoints", "references", "sharedWith", "legacyCandidateId", "officialChoiceLabels", "scoring",
  "points", "officialAnswerText", "sharedContext", "slug", "images", "referenceImages", "figureDescription",
  "calculationCheck", "computedAnswerNumber", "scoringNote", "referenceOnly", "legalContextDate",
]);

export function projectStagedQuestions(rows: readonly object[], imageBase?: string): Question[] {
  return rows.map((row) => {
    const out: Record<string, unknown> = {};
    for (const [key, value] of Object.entries(row)) {
      if (STAGING_ONLY_FIELDS.has(key) || value === null) continue;
      out[key] = value;
    }
    if (imageBase && Array.isArray(out.imageUrls)) {
      out.imageUrls = (out.imageUrls as string[]).map((url) => `${imageBase}/${url.split("/").pop()}`);
    }
    return out as unknown as Question;
  });
}
