import type { Question } from "@/lib/questions/types";
import y2022 from "./2022.json";
import q0 from "./2023.json";
import q1 from "./2024.json";

export const QUESTIONS = [...y2022, ...q0, ...q1] as Question[];
