import type { Question } from "@/lib/questions/types";
import edition0 from "./2024-late.json";
import edition2023 from "../haikan-plant2/2023-late.json";
import edition2025 from "../haikan-plant2/2025-late.json";

export const PLANT_HAIKAN2_QUESTIONS: Question[] = [
  ...(edition2025 as Question[]).map(q => ({ ...q, exam: "plant-haikan2" as const })),
  ...edition0 as Question[],
  ...(edition2023 as Question[]).map(q => ({ ...q, exam: "plant-haikan2" as const })),
];
