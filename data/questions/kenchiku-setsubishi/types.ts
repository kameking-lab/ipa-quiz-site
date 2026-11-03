import type { Question } from "@/lib/questions/types";

/** Validated original, including the non-public Q18 preserved for source review. */
export type KenchikuQuestion = Omit<Question, "exam" | "license"> & {
  exam: "kenchiku-setsubishi";
  license: "JAEIC-permission-required";
  assessmentMode?: "reference-only";
};
