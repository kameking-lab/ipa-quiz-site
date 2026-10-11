import type { Question } from "@/lib/questions/types";
import paper2026 from "./2026-annual.json";
import paper2025 from "./2025-annual.json";
import theory2025Q127 from "./2025-theory-q127-local.json";
import theory2025Q131Q132 from "./2025-theory-q131-q132-local.json";

/** Verified partial coverage of the 111th and 110th pharmacist exams. */
export const YAKUZAISHI_QUESTIONS: Question[] = [
  ...(paper2026 as Question[]),
  ...(paper2025 as Question[]),
  ...(theory2025Q127 as Question[]),
  ...(theory2025Q131Q132 as Question[]),
].sort((a, b) => b.year - a.year || a.qNumber - b.qNumber);
