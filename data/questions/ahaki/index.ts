import type { Question } from "@/lib/questions/types";
import anma2025 from "./ahaki-anma-2025.json";
import anma2026 from "./ahaki-anma-2026.json";
import hari2025 from "./ahaki-hari-kyu-2025.json";
import hari2026 from "./ahaki-hari-kyu-2026.json";

/** The 161–170 and 171–180 tracks remain in the single official hari/kyuu booklet. */
export const AHAKI_ANMA_QUESTIONS: Question[] = [
  ...(anma2026 as Question[]),
  ...(anma2025 as Question[]),
];

export const AHAKI_HARI_KYUU_QUESTIONS: Question[] = [
  ...(hari2026 as Question[]),
  ...(hari2025 as Question[]),
];
