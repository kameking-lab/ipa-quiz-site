import type { Question } from "@/lib/questions/types";

/** 内部の収録判断。権利者の転載許諾を取得したという意味ではない。 */
export interface Kenchikushi1StagedQuestion extends Question {
  publicAllowed: false;
  license: "JAEIC-owner-approved-staging";
  sourcePage: number;
}
