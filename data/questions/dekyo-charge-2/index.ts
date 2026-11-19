import type { Question } from "@/lib/questions/types";
import analog2024Round2 from "./2024-round2-analog.json";
import digital2024Round2 from "./2024-round2-digital.json";

export const DEKYO_CHARGE_2_QUESTIONS = (digital2024Round2 as Question[]).concat(analog2024Round2 as Question[]);
