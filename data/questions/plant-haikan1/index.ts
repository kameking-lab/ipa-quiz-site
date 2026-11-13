import type { Question } from "@/lib/questions/types";
import edition0 from "./2023-late.json";
import edition1 from "./2025-late.json";
import edition2024 from "../haikan-plant1/2024-late.json";

export const PLANT_HAIKAN1_QUESTIONS: Question[] = [
  ...edition1 as Question[],
  ...(edition2024 as Question[]).map(q => ({ ...q, exam: "plant-haikan1" as const })),
  ...edition0 as Question[],
];
