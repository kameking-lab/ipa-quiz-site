/** Private editorial registration. Never import from an application/runtime registry. */
import paper2025 from "./2025.json";
import paper2026 from "./2026.json";
import { benrishiPaperSchema, type BenrishiStagedQuestion } from "./schema";

export const BENRISHI_STAGED_QUESTIONS: readonly BenrishiStagedQuestion[] = [
  ...benrishiPaperSchema.parse(paper2025).questions,
  ...benrishiPaperSchema.parse(paper2026).questions,
];
export const BENRISHI_REGISTRATION = {
  slug: "benrishi", fullName: "弁理士試験 短答式筆記試験（特許庁）",
  publicAllowed: false, publication: "HOLD", questions: BENRISHI_STAGED_QUESTIONS,
} as const;
