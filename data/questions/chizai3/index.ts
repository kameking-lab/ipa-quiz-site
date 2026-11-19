import type { Question } from "@/lib/questions/types";
import round52 from "./2025-autumn.json";
import round51 from "./2025-july.json";

export const CHIZAI3_QUESTIONS = [...round52, ...round51] as Question[];
