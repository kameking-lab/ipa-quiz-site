import analog2First2024 from "./2024-round1-analog2.json";
import generalFirst2024 from "./2024-round1-general.json";
import analog1First2024 from "./2024-round1-analog1.json";
import digital2First2024 from "./2024-round1-digital2.json";
import digital1 from "./2024-round2-digital1.json";
import general from "./2024-round2-general.json";
import analog1 from "./2024-round2-analog1.json";
import analog2 from "./2024-round2-analog2.json";
import digital2 from "./2024-round2-digital2.json";
import type { Question } from "@/lib/questions/types";

export const DEKYO_CHARGE_QUESTIONS = [
  ...digital2,
  ...analog2,
  ...analog1,
  ...general,
  ...digital1,
  ...digital2First2024,
  ...analog1First2024,
  ...generalFirst2024,
  ...analog2First2024,
] as Question[];
