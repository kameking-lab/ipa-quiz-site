import type { Question } from "@/lib/questions/types";
import y2025Am1 from "./2025-am1.json";
import y2025Am2 from "./2025-am2.json";
import y2025Pm from "./2025-pm.json";
import y2026Am1 from "./2026-am1.json";
import y2026Am2 from "./2026-am2.json";
import y2026Pm from "./2026-pm.json";

// JAEIC permission is pending. Public registries gate this complete local corpus.
export const KENCHIKU_SETSUBISHI_QUESTIONS: Question[] = (
  [y2025Am1, y2025Am2, y2025Pm, y2026Am1, y2026Am2, y2026Pm] as unknown as Question[][]
).flat();
