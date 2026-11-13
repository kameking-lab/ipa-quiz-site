import type { Question } from "@/lib/questions/types";
import edition0 from "./2023-late.json";
import edition1 from "./2025-late.json";

export const PLANT_HAIKAN1_QUESTIONS: Question[] = [...edition1, ...edition0] as Question[];
