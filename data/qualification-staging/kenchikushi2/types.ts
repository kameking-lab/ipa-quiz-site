import type { Question } from "@/lib/questions/types";

/** Unpublished source records. This type deliberately does not extend ExamCode. */
export type StagedKenchikushiQuestion = Omit<Question, "exam" | "session" | "license"> & {
  exam: "kenchikushi2" | "mokuzo-kenchikushi";
  session: "gakka-I" | "gakka-II" | "gakka-III" | "gakka-IV";
  /** Provenance label, not a claim of permission from the copyright holder. */
  license: "JAEIC-owner-provided";
  publicAllowed: false;
  sourcePage: number;
  sourcePrintedPage: string;
  sourceRubies?: { base: string; reading: string }[];
};
