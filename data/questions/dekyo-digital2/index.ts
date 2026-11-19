import type { Question } from "@/lib/questions/types";
import first2022 from "./2022-first.json";
import second2022 from "./2022-second.json";
import first2023 from "./2023-first.json";
import second2023 from "./2023-second.json";
import first2024 from "./2024-first.json";
import second2024 from "./2024-second.json";

export const DEKYO_DIGITAL2_QUESTIONS: Question[] = [
  ...second2024 as Question[],
  ...first2024 as Question[],
  ...second2023 as Question[],
  ...first2023 as Question[],
  ...second2022 as Question[],
  ...first2022 as Question[],
];
