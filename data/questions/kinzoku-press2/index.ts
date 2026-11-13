import type { Question } from "@/lib/questions/types";
import edition0 from "./2023-early.json";
import edition1 from "./2025-early.json";

export const KINZOKU_PRESS2_QUESTIONS: Question[] = [...edition1, ...edition0] as Question[];
