import type { Question } from "@/lib/questions/types";
import round2024Second from "./2024-round2.json";
import round2024First from "./2024-round1.json";
import round2023Second from "./2023-round2.json";
import round2023First from "./2023-round1.json";
import round2022Second from "./2022-round2.json";
import round2022First from "./2022-round1.json";

export const KOUNIN_QUESTIONS: Question[] = [
  ...(round2024Second as Question[]),
  ...(round2024First as Question[]),
  ...(round2023Second as Question[]),
  ...(round2023First as Question[]),
  ...(round2022Second as Question[]),
  ...(round2022First as Question[]),
];
