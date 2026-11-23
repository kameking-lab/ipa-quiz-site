import late2025 from "./2025-late.json";
import late2024 from "./2024-late.json";
import type { Question } from "@/lib/questions/types";

/** A群1〜25・B群1〜25を内部番号1〜50に対応させる。 */
export const CONCRETE_ASSOU1_QUESTIONS: Question[] = [
  ...late2025,
  ...late2024,
] as Question[];
