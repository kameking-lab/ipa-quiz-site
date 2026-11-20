import type { Question } from "@/lib/questions/types";
import round74Hardware from "./2025-early-joho-hardware.json";
import round74Programming from "./2025-early-joho-programming.json";
import round74Level2 from "./2025-early-joho-level2.json";
import round74Level3 from "./2025-early-joho-level3.json";
import round75Hardware from "./2025-late-joho-hardware.json";
import round75Programming from "./2025-late-joho-programming.json";
import round75Level2 from "./2025-late-joho-level2.json";
import round75Level3 from "./2025-late-joho-level3.json";
import round76Hardware from "./2026-early-joho-hardware.json";
import round76Programming from "./2026-early-joho-programming.json";
import round76Level2 from "./2026-early-joho-level2.json";
import round76Level3 from "./2026-early-joho-level3.json";

export const ZENKOU_JOHO_QUESTIONS = [
  ...round74Hardware, ...round74Programming, ...round74Level2, ...round74Level3,
  ...round75Hardware, ...round75Programming, ...round75Level2, ...round75Level3,
  ...round76Hardware, ...round76Programming, ...round76Level2, ...round76Level3,
] as Question[];
