import generalSecond2022 from "./2022-round2-general.json";
import generalFirst2022 from "./2022-round1-general.json";
import analog1Second2022 from "./2022-round2-analog1.json";
import analog1First2022 from "./2022-round1-analog1.json";
import digital1Second2022 from "./2022-round2-digital1.json";
import digital1First2022 from "./2022-round1-digital1.json";
import digital2Second2022 from "./2022-round2-digital2.json";
import analog2Second2022 from "./2022-round2-analog2.json";
import generalSecond2023 from "./2023-round2-general.json";
import generalFirst2023 from "./2023-round1-general.json";
import analog1Second2023 from "./2023-round2-analog1.json";
import analog1First2023 from "./2023-round1-analog1.json";
import analog2Second2023 from "./2023-round2-analog2.json";
import analog2First2023 from "./2023-round1-analog2.json";
import digital1Second2023 from "./2023-round2-digital1.json";
import digital1First2023 from "./2023-round1-digital1.json";
import digital2Second2023 from "./2023-round2-digital2.json";
import digital2First2023 from "./2023-round1-digital2.json";
import digital1First2024 from "./2024-round1-digital1.json";
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
  ...digital1First2024,
  ...digital2First2024,
  ...analog1First2024,
  ...generalFirst2024,
  ...analog2First2024,
  ...digital2Second2023,
  ...digital2First2023,
  ...analog1Second2023,
  ...analog1First2023,
  ...analog2Second2023,
  ...analog2First2023,
  ...digital1Second2023,
  ...digital1First2023,
  ...generalSecond2023,
  ...generalFirst2023,
  ...generalSecond2022,
  ...analog1Second2022,
  ...digital1Second2022,
  ...digital2Second2022,
  ...analog2Second2022,
  ...generalFirst2022,
  ...analog1First2022,
  ...digital1First2022,
] as Question[];
