import type { Question } from "@/lib/questions/types";
import paper2025 from "./2025-october.json";
import paper2026 from "./2026-april.json";

export const EISEI2_QUESTIONS: Question[] = [
  ...(paper2025 as Question[]),
  ...(paper2026 as Question[]),
].sort((a, b) => b.year - a.year || a.qNumber - b.qNumber);
