import analog1 from "./2024-round2-analog1.json";
import analog2 from "./2024-round2-analog2.json";
import digital2 from "./2024-round2-digital2.json";
import type { Question } from "@/lib/questions/types";

export const DEKYO_CHARGE_QUESTIONS = [
  ...digital2,
  ...analog2,
  ...analog1,
] as Question[];
