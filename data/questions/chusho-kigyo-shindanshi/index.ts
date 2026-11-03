import type { Question } from "@/lib/questions/types";
import { CHUSHO_2026_A_QUESTIONS } from "./2026-keizai";
import { CHUSHO_2026_B_QUESTIONS } from "./2026-zaimu";
import { CHUSHO_2026_C_QUESTIONS } from "./2026-kigyo";
import { CHUSHO_2026_D_QUESTIONS } from "./2026-unei";
import { CHUSHO_2026_E_QUESTIONS } from "./2026-keiei-houmu";
import { CHUSHO_2026_F_QUESTIONS } from "./2026-keiei-joho";
import { CHUSHO_2026_G_QUESTIONS } from "./2026-chusho-seisaku";
import { CHUSHO_2025_A_QUESTIONS } from "./2025-keizai";
import { CHUSHO_2025_B_QUESTIONS } from "./2025-zaimu";
import { CHUSHO_2025_C_QUESTIONS } from "./2025-kigyo";
import { CHUSHO_2025_D_QUESTIONS } from "./2025-unei";
import { CHUSHO_2025_E_QUESTIONS } from "./2025-keiei-houmu";
import { CHUSHO_2025_F_QUESTIONS } from "./2025-keiei-joho";
import { CHUSHO_2025_G_QUESTIONS } from "./2025-chusho-seisaku";

export const CHUSHO_KIGYO_SHINDANSHI_QUESTIONS: Question[] = [
  ...CHUSHO_2026_A_QUESTIONS,
  ...CHUSHO_2026_B_QUESTIONS,
  ...CHUSHO_2026_C_QUESTIONS,
  ...CHUSHO_2026_D_QUESTIONS,
  ...CHUSHO_2026_E_QUESTIONS,
  ...CHUSHO_2026_F_QUESTIONS,
  ...CHUSHO_2026_G_QUESTIONS,
  ...CHUSHO_2025_A_QUESTIONS,
  ...CHUSHO_2025_B_QUESTIONS,
  ...CHUSHO_2025_C_QUESTIONS,
  ...CHUSHO_2025_D_QUESTIONS,
  ...CHUSHO_2025_E_QUESTIONS,
  ...CHUSHO_2025_F_QUESTIONS,
  ...CHUSHO_2025_G_QUESTIONS,
];
