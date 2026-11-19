import annual2025 from "./2025-annual-gakka.json";
import type { Question } from "@/lib/questions/types";

export const KOGAI_TAIKI_TOKURON_QUESTIONS = [
  ...annual2025,
] as Question[];
