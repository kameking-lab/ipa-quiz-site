import type { Question } from "@/lib/questions/types";
import first2025 from "./2025-first.json";
import second2025 from "./2025-second.json";
import second2024 from "./2024-second.json";
import first2024 from "./2024-first.json";
import second2023 from "./2023-second.json";
import first2023 from "./2023-first.json";
import second2022 from "./2022-second.json";
import first2022 from "./2022-first.json";

export const CFP_SOUZOKU_QUESTIONS: Question[] = [
  ...second2025 as Question[],
  ...first2025 as Question[],
  ...second2024 as Question[],
  ...first2024 as Question[],
  ...second2023 as Question[],
  ...first2023 as Question[],
  ...second2022 as Question[],
  ...first2022 as Question[],
];
