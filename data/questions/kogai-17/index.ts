import type { Question } from "@/lib/questions/types";
import annual2025 from "./2025-annual.json";
import annual2024 from "./2024-annual.json";
import annual2023 from "./2023-annual.json";
import annual2022 from "./2022-annual.json";

export const KOGAI_17_QUESTIONS: Question[] = [
  ...(annual2025 as Question[]),
  ...(annual2024 as Question[]),
  ...(annual2023 as Question[]),
  ...(annual2022 as Question[]),
];
