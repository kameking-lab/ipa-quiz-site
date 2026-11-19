import type { Question } from "@/lib/questions/types";
import { KYOIN_TOKYO_2025 } from "./2025";
import { KYOIN_TOKYO_2025_SENMON } from "./2025-senmon";
import { KYOIN_TOKYO_2026 } from "./2026";
import { KYOIN_TOKYO_2026_SENMON } from "./2026-senmon";

export const KYOIN_TOKYO_QUESTIONS: Question[] = [
  ...KYOIN_TOKYO_2026,
  ...KYOIN_TOKYO_2026_SENMON,
  ...KYOIN_TOKYO_2025,
  ...KYOIN_TOKYO_2025_SENMON,
];
