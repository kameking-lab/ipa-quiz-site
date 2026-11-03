import type { Question } from "@/lib/questions/types";

/** 掲載許可と基準日時点の法令照合を待つレビュー用原問題。公開Questionとは別型。 */
export interface PreparedChizai2Question extends Omit<Question, "exam" | "license" | "needsReview"> {
  exam: "chizai2";
  license: "IP-EDU-permission-pending";
  needsReview: true;
  round: 53 | 54;
  section: "gakka" | "practical";
  sharedCase: string;
  caseNumber?: number;
  basis: string;
  calculationSteps: string[];
  figureReviewStatus: "verified-text-and-table";
  sourcePdfSha256: string;
  sourceTextSha256: string;
  sourceHeadingPage: number;
  editorialStatus: "self-authored-draft";
  legalReviewStatus: "pending-historical-law-verification";
}
