import type { ImageAsset, PrivateQuestion } from "@/lib/kisho-private/types";

/** This specialized reader has no grant-aware adapter yet. Keep its corpus
 * unavailable in strict/native builds, including from draft-validation imports.
 * Ordinary Web builds continue using lib/kisho-study unchanged. */
export const KISHO_STUDY_QUESTIONS: readonly Pick<PrivateQuestion, "raw" | "source" | "fields">[] = [];
export const KISHO_STUDY_ASSETS = new Map<string, ImageAsset>();
export function resolveKishoStudyImage(_asset: Pick<ImageAsset, "assetId">): string {
  void _asset;
  throw new Error("This specialized reader is unavailable under the content gate");
}
