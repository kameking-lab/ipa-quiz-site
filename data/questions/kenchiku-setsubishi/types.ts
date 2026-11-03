import type { Question } from "@/lib/questions/types";

/** Saved original candidate; does not widen the application's published ExamCode. */
export type KenchikuQuestion = Omit<Question, "exam" | "license"> & {
  exam: "kenchiku-setsubishi";
  license: "JAEIC-permission-required";
  assessmentMode?: "reference-only";
};
