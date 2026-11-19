import type { Question } from "@/lib/questions/types";
import early2023 from "./2023-early.json";
import late2023 from "./2023-late.json";
import early2024 from "./2024-early.json";
import late2024 from "./2024-late.json";

export const JOBPASS3_QUESTIONS = (late2024 as Question[]).concat(early2024 as Question[], late2023 as Question[], early2023 as Question[]);
