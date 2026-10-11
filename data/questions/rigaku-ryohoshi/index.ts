import type { Question } from "@/lib/questions/types";
import y2026 from "./2026-annual.json";
import y2025 from "./2025-annual.json";
import remaining2026 from "./2026-remaining-ready.json";
import remaining2025 from "./2025-remaining-ready.json";
import overlay2026 from "./2026-literal-overlay9.json";
import overlay2025 from "./2025-literal-overlay9.json";
import clinical2025 from "./2025-clinical-key9-ready.json";
import clinical2026 from "./2026-clinical-key9-ready.json";

/** Ready-only originals. Held source drafts and figure assets stay outside this import graph. */
export const RIGAKU_RYOHOUSHI_QUESTIONS: Question[] = [
  ...(y2026 as Question[]),
  ...(y2025 as Question[]),
  ...(remaining2026 as Question[]),
  ...(remaining2025 as Question[]),
  ...(overlay2026 as Question[]),
  ...(overlay2025 as Question[]),
  ...(clinical2025 as Question[]),
  ...(clinical2026 as Question[]),
].filter(question => question.needsReview === false);
